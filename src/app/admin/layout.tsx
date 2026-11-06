"use client";

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import CmsSidebar, { CmsView } from '@/components/CmsSidebar';
import { usePortfolio } from '@/context/PortfolioContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isAdmin,
    isFirebaseLoaded,
    messages,
    heroInfo,
    adminUser,
    setOpenCreateImmediately,
    logout,
  } = usePortfolio();

  // Guard against unauthenticated access
  useEffect(() => {
    if (isFirebaseLoaded && !isAdmin) {
      router.replace('/login');
    }
  }, [isFirebaseLoaded, isAdmin, router]);

  // Map route to CmsView
  const getCurrentView = (): CmsView => {
    if (pathname.includes('/admin/hero')) return 'hero-about';
    if (pathname.includes('/admin/projects')) return 'projects';
    if (pathname.includes('/admin/certifications')) return 'certifications';
    if (pathname.includes('/admin/messages')) return 'messages';
    if (pathname.includes('/admin/settings')) return 'settings';
    return 'dashboard';
  };

  const handleViewChange = (view: CmsView) => {
    if (view !== 'projects') {
      setOpenCreateImmediately(false);
    }
    switch (view) {
      case 'dashboard':
        router.push('/admin');
        break;
      case 'hero-about':
        router.push('/admin/hero');
        break;
      case 'projects':
        router.push('/admin/projects');
        break;
      case 'certifications':
        router.push('/admin/certifications');
        break;
      case 'messages':
        router.push('/admin/messages');
        break;
      case 'settings':
        router.push('/admin/settings');
        break;
    }
  };

  const handleAddNewProject = () => {
    setOpenCreateImmediately(true);
    router.push('/admin/projects');
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="flex min-h-screen bg-background">
      <CmsSidebar
        currentView={getCurrentView()}
        onViewChange={handleViewChange}
        onLogout={handleLogout}
        onAddNewProject={handleAddNewProject}
        unreadCount={unreadCount}
        profilePhoto={heroInfo.profilePhoto}
        adminName={adminUser?.displayName || heroInfo.fullName || 'Mercy Ndanu'}
      />
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

