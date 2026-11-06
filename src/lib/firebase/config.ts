import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBtVe7ajKZTpUBF-P-qr6UnMw8Tk0uKFPY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "learned-vehicle-492012-a1.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "learned-vehicle-492012-a1",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "learned-vehicle-492012-a1.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "976314087766",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:976314087766:web:dd37bf2252574f0903fef7"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const CUSTOM_DATABASE_ID = "ai-studio-6a4231bd-e012-45b9-937f-375e624980de";

let firestoreInstance: Firestore;
try {
  firestoreInstance = initializeFirestore(app, {}, CUSTOM_DATABASE_ID);
} catch {
  firestoreInstance = getFirestore(app, CUSTOM_DATABASE_ID);
}

export const db: Firestore = firestoreInstance;
export const auth: Auth = getAuth(app);

