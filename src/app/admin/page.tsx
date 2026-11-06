"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import CmsDashboard from '@/components/CmsDashboard';
import { usePortfolio } from '@/context/PortfolioContext';

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    projects,
    messages,
    certifications,
    setOpenCreateImmediately,
    logout,
  } = usePortfolio();

  const handleNavigateToView = (view: 'dashboard' | 'hero-about' | 'certifications' | 'projects' | 'messages' | 'settings') => {
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

  return (
    <CmsDashboard
      projects={projects}
      messages={messages}
      certifications={certifications}
      onNavigateToView={handleNavigateToView}
      onAddNewProject={handleAddNewProject}
      onLogout={handleLogout}
      onReturnToPublic={() => router.push('/')}
    />
  );
}

