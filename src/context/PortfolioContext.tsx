"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { HeroInfo, Project, Certification, Message } from '@/types';
import { 
  INITIAL_HERO_INFO, 
  INITIAL_PROJECTS, 
  INITIAL_CERTIFICATIONS, 
  INITIAL_MESSAGES,
  loadHeroInfo,
  loadProjects,
  loadCertifications,
  loadMessages,
  saveHeroInfo as persistLocalHero,
  saveProjects as persistLocalProjects,
  saveCertifications as persistLocalCertifications,
  saveMessages as persistLocalMessages
} from '@/data';
import {
  subscribeToAuth,
  signOutAdmin,
  getHeroInfo as fetchHeroInfoFromFirebase,
  saveHeroInfo as saveHeroInfoInFirebase,
  getProjects as fetchProjectsFromFirebase,
  saveProject,
  deleteProject,
  getCertifications as fetchCertificationsFromFirebase,
  saveCertification,
  deleteCertification,
  getMessages as fetchMessagesFromFirebase,
  saveMessage,
  deleteMessage
} from '@/lib/firebase/services';

interface PortfolioContextType {
  heroInfo: HeroInfo;
  projects: Project[];
  certifications: Certification[];
  messages: Message[];
  adminUser: User | null;
  isAdmin: boolean;
  isFirebaseLoaded: boolean;
  appTitle: string;
  appDescription: string;
  openCreateImmediately: boolean;
  setOpenCreateImmediately: (val: boolean) => void;
  setAppTitle: (title: string) => void;
  setAppDescription: (desc: string) => void;
  handleSaveHeroInfo: (info: HeroInfo) => Promise<void>;
  handleSaveProjects: (projects: Project[]) => Promise<void>;
  handleSaveCertifications: (certs: Certification[]) => Promise<void>;
  handleSaveMessages: (messages: Message[]) => Promise<void>;
  handleSendMessage: (name: string, email: string, subject: string, messageBody: string) => Promise<void>;
  handleResetFactoryData: () => Promise<void>;
  logout: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(false);

  const [heroInfo, setHeroInfo] = useState<HeroInfo>(() => loadHeroInfo());
  const [projects, setProjects] = useState<Project[]>(() => loadProjects());
  const [certifications, setCertifications] = useState<Certification[]>(() => loadCertifications());
  const [messages, setMessages] = useState<Message[]>(() => loadMessages());

  const [appTitle, setAppTitle] = useState('Mercy Ndanu Portfolio');
  const [appDescription, setAppDescription] = useState('Senior Systems Architect Portfolio Site');
  const [openCreateImmediately, setOpenCreateImmediately] = useState(false);

  // Synchronize document title
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = appTitle;
    }
  }, [appTitle]);

  // Auth & Cloud Sync
  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setAdminUser(user);
      setIsAdmin(!!user);
    });

    const loadCloudData = async () => {
      try {
        const cloudHero = await fetchHeroInfoFromFirebase();
        setHeroInfo(cloudHero);
        persistLocalHero(cloudHero);

        const cloudProjects = await fetchProjectsFromFirebase();
        setProjects(cloudProjects);
        persistLocalProjects(cloudProjects);

        const cloudCertifications = await fetchCertificationsFromFirebase();
        setCertifications(cloudCertifications);
        persistLocalCertifications(cloudCertifications);

        const cloudMessages = await fetchMessagesFromFirebase();
        setMessages(cloudMessages);
        persistLocalMessages(cloudMessages);

        setIsFirebaseLoaded(true);
      } catch (err) {
        console.error("Failed to fetch Firestore attributes during sync: ", err);
        setIsFirebaseLoaded(true);
      }
    };

    loadCloudData();

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (name: string, email: string, subject: string, messageBody: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject,
      message: messageBody,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    persistLocalMessages(updated);

    try {
      await saveMessage(newMessage);
    } catch (e) {
      console.error("Failed syncing message to Firestore: ", e);
    }
  };

  const handleSaveHeroInfo = async (newInfo: HeroInfo) => {
    setHeroInfo(newInfo);
    persistLocalHero(newInfo);
    try {
      await saveHeroInfoInFirebase(newInfo);
    } catch (e) {
      console.error("Failed syncing hero_info to Firestore: ", e);
    }
  };

  const handleSaveProjects = async (newProjects: Project[]) => {
    const backup = [...projects];
    setProjects(newProjects);
    persistLocalProjects(newProjects);

    try {
      const deleted = backup.filter(p => !newProjects.some(np => np.id === p.id));
      for (const p of deleted) {
        await deleteProject(p.id);
      }
      for (const p of newProjects) {
        await saveProject(p);
      }
    } catch (e) {
      console.error("Failed syncing projects to Firestore: ", e);
    }
  };

  const handleSaveCertifications = async (newCerts: Certification[]) => {
    const backup = [...certifications];
    setCertifications(newCerts);
    persistLocalCertifications(newCerts);

    try {
      const deleted = backup.filter(c => !newCerts.some(nc => nc.id === c.id));
      for (const c of deleted) {
        await deleteCertification(c.id);
      }
      for (const c of newCerts) {
        await saveCertification(c);
      }
    } catch (e) {
      console.error("Failed syncing certifications to Firestore: ", e);
    }
  };

  const handleSaveMessages = async (updatedMessages: Message[]) => {
    const backup = [...messages];
    setMessages(updatedMessages);
    persistLocalMessages(updatedMessages);

    try {
      const deleted = backup.filter(m => !updatedMessages.some(nm => nm.id === m.id));
      for (const m of deleted) {
        await deleteMessage(m.id);
      }
      for (const m of updatedMessages) {
        await saveMessage(m);
      }
    } catch (e) {
      console.error("Failed syncing messages to Firestore: ", e);
    }
  };

  const handleResetFactoryData = async () => {
    setHeroInfo(INITIAL_HERO_INFO);
    setProjects(INITIAL_PROJECTS);
    setCertifications(INITIAL_CERTIFICATIONS);
    setMessages(INITIAL_MESSAGES);
    setAppTitle('Mercy Ndanu Portfolio');

    persistLocalHero(INITIAL_HERO_INFO);
    persistLocalProjects(INITIAL_PROJECTS);
    persistLocalCertifications(INITIAL_CERTIFICATIONS);
    persistLocalMessages(INITIAL_MESSAGES);

    try {
      await saveHeroInfoInFirebase(INITIAL_HERO_INFO);

      for (const p of projects) {
        await deleteProject(p.id);
      }
      for (const p of INITIAL_PROJECTS) {
        await saveProject(p);
      }

      for (const c of certifications) {
        await deleteCertification(c.id);
      }
      for (const c of INITIAL_CERTIFICATIONS) {
        await saveCertification(c);
      }

      for (const m of messages) {
        await deleteMessage(m.id);
      }
      for (const m of INITIAL_MESSAGES) {
        await saveMessage(m);
      }
    } catch (e) {
      console.error("Failed factory database sync reset: ", e);
    }
  };

  const logout = async () => {
    await signOutAdmin();
    setAdminUser(null);
    setIsAdmin(false);
  };

  return (
    <PortfolioContext.Provider
      value={{
        heroInfo,
        projects,
        certifications,
        messages,
        adminUser,
        isAdmin,
        isFirebaseLoaded,
        appTitle,
        appDescription,
        openCreateImmediately,
        setOpenCreateImmediately,
        setAppTitle,
        setAppDescription,
        handleSaveHeroInfo,
        handleSaveProjects,
        handleSaveCertifications,
        handleSaveMessages,
        handleSendMessage,
        handleResetFactoryData,
        logout,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

