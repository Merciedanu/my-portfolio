import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  query 
} from 'firebase/firestore';
import { 
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { db, auth } from './config';
import { Project, HeroInfo, Message, Certification } from '@/types';
import { 
  INITIAL_HERO_INFO, 
  INITIAL_PROJECTS, 
  INITIAL_CERTIFICATIONS, 
  INITIAL_MESSAGES 
} from '@/data';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error Detailed Context: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- AUTHENTICATION ---

export function isAllowedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const lower = email.toLowerCase().trim();
  // Admin 1: Elisha (Primary Owner)
  if (lower === 'elishamuuo1@gmail.com') return true;
  // Admin 2: Mercy Ndanu (Portfolio Subject)
  if (
    lower === 'mercyndanu@tech.ke' || 
    lower === 'mercyndanu@gmail.com' ||
    lower.includes('mercyndanu') || 
    (lower.startsWith('mercy') && lower.includes('ndanu'))
  ) {
    return true;
  }
  // Check custom configured Mercy Google email if saved in settings
  const customMercyEmail = typeof window !== 'undefined' ? localStorage.getItem('portfolio_cms_mercy_admin_email') : null;
  if (customMercyEmail && lower === customMercyEmail.toLowerCase().trim()) {
    return true;
  }
  return false;
}

// Trigger Google Sign-in and check dynamic database role constraints
export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');
  
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const userDocRef = doc(db, 'users', user.uid);
  
  if (!isAllowedAdminEmail(user.email)) {
    await signOutAdmin();
    throw new Error(`Access Denied: Only Elisha (elishamuuo1@gmail.com) and Mercy Ndanu are authorized administrators. The signed-in Google account (${user.email}) does not have admin permissions.`);
  }
  
  let docSnap;
  try {
    docSnap = await getDoc(userDocRef);
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
  }
  
  let role = 'admin';
  let disabled = false;

  if (docSnap && docSnap.exists()) {
    const data = docSnap.data();
    role = data.role || 'admin';
    disabled = !!data.disabled;
    if (role !== 'admin') {
      try {
        await setDoc(userDocRef, { ...data, role: 'admin' }, { merge: true });
        role = 'admin';
      } catch (err) {
        console.warn("Could not promote user role: ", err);
      }
    }
  } else {
    const userData = {
      userId: user.uid,
      email: user.email || '',
      fullName: user.displayName || (user.email?.toLowerCase() === 'elishamuuo1@gmail.com' ? 'Elisha Muuo' : 'Mercy Ndanu'),
      role: 'admin',
      disabled: false
    };
    try {
      await setDoc(userDocRef, userData);
      role = 'admin';
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
    }
  }

  if (disabled) {
    await signOutAdmin();
    throw new Error(`Your account has been disabled. Please contact your system administrator.`);
  }

  return user;
}

export async function signOutAdmin(): Promise<void> {
  await signOut(auth);
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (!isAllowedAdminEmail(user.email)) {
        console.warn(`Unauthorized login attempt by non-admin: ${user.email}`);
        await signOutAdmin();
        callback(null);
        return;
      }

      const userDocRef = doc(db, 'users', user.uid);
      try {
        const docSnap = await getDoc(userDocRef);
        let role = 'admin';
        let disabled = false;

        if (!docSnap.exists()) {
          const userData = {
            userId: user.uid,
            email: user.email || '',
            fullName: user.displayName || (user.email?.toLowerCase() === 'elishamuuo1@gmail.com' ? 'Elisha Muuo' : 'Mercy Ndanu'),
            role: 'admin',
            disabled: false
          };
          try {
            await setDoc(userDocRef, userData);
          } catch (err) {
            handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
          }
        } else {
          const data = docSnap.data();
          role = data.role || 'admin';
          disabled = !!data.disabled;
          if (role !== 'admin') {
            try {
              await setDoc(userDocRef, { ...data, role: 'admin' }, { merge: true });
              role = 'admin';
            } catch (err) {
              console.warn("Could not promote user role: ", err);
            }
          }
        }

        if (role === 'admin' && !disabled) {
          callback(user);
          return;
        }
        
        await signOutAdmin();
        callback(null);
      } catch (e) {
        console.error("Auth observer error: ", e);
        if (isAllowedAdminEmail(user.email)) {
          callback(user);
        } else {
          await signOutAdmin();
          callback(null);
        }
      }
    } else {
      callback(null);
    }
  });
}

// --- FIRESTORE DATABASE OPERATION ENGINE ---

export async function getHeroInfo(): Promise<HeroInfo> {
  try {
    const docRef = doc(db, 'hero_info', 'current');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as HeroInfo;
    } else {
      const data = { ...INITIAL_HERO_INFO };
      try {
        await setDoc(docRef, data);
      } catch (err) {
        console.warn("Could not seed default hero info into Firestore (guest user): ", err);
      }
      return data;
    }
  } catch (error) {
    console.error("Error fetching Hero Info from Firestore, falling back to local: ", error);
    return INITIAL_HERO_INFO;
  }
}

export async function saveHeroInfo(info: HeroInfo): Promise<void> {
  const docRef = doc(db, 'hero_info', 'current');
  await setDoc(docRef, info);
}

export async function getProjects(): Promise<Project[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    if (querySnapshot.empty) {
      const seeded: Project[] = [];
      for (const proj of INITIAL_PROJECTS) {
        try {
          await setDoc(doc(db, 'projects', proj.id), proj);
        } catch (err) {
          console.warn(`Could not seed project ${proj.id}: `, err);
        }
        seeded.push(proj);
      }
      return seeded;
    }
    const projects: Project[] = [];
    querySnapshot.forEach((docSnap) => {
      projects.push(docSnap.data() as Project);
    });
    return projects.sort((a, b) => b.id.localeCompare(a.id));
  } catch (error) {
    console.error("Error fetching projects from Firestore, falling back to local: ", error);
    return INITIAL_PROJECTS;
  }
}

export async function saveProject(project: Project): Promise<void> {
  await setDoc(doc(db, 'projects', project.id), project);
}

export async function deleteProject(projectId: string): Promise<void> {
  await deleteDoc(doc(db, 'projects', projectId));
}

export async function getCertifications(): Promise<Certification[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'certifications'));
    if (querySnapshot.empty) {
      const seeded: Certification[] = [];
      for (const cert of INITIAL_CERTIFICATIONS) {
        try {
          await setDoc(doc(db, 'certifications', cert.id), cert);
        } catch (err) {
          console.warn(`Could not seed certification ${cert.id}: `, err);
        }
        seeded.push(cert);
      }
      return seeded;
    }
    const certs: Certification[] = [];
    querySnapshot.forEach((docSnap) => {
      certs.push(docSnap.data() as Certification);
    });
    return certs.sort((a, b) => a.id.localeCompare(b.id));
  } catch (error) {
    console.error("Error fetching certifications from Firestore, falling back to local: ", error);
    return INITIAL_CERTIFICATIONS;
  }
}

export async function saveCertification(cert: Certification): Promise<void> {
  await setDoc(doc(db, 'certifications', cert.id), cert);
}

export async function deleteCertification(certId: string): Promise<void> {
  await deleteDoc(doc(db, 'certifications', certId));
}

export async function getMessages(): Promise<Message[]> {
  try {
    const q = query(collection(db, 'messages'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const seeded: Message[] = [];
      for (const msg of INITIAL_MESSAGES) {
        try {
          await setDoc(doc(db, 'messages', msg.id), msg);
        } catch (err) {
          console.warn(`Could not seed default message ${msg.id}: `, err);
        }
        seeded.push(msg);
      }
      return seeded;
    }
    const messages: Message[] = [];
    querySnapshot.forEach((docSnap) => {
      messages.push(docSnap.data() as Message);
    });
    return messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err && (err.code === 'permission-denied' || err.message?.includes('permission'))) {
      return [];
    }
    console.error("Error fetching messages from Firestore, falling back to local: ", error);
    return INITIAL_MESSAGES;
  }
}

export async function saveMessage(message: Message): Promise<void> {
  await setDoc(doc(db, 'messages', message.id), message);
}

export async function deleteMessage(messageId: string): Promise<void> {
  await deleteDoc(doc(db, 'messages', messageId));
}

