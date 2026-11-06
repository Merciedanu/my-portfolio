"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import PublicPortfolio from '@/components/PublicPortfolio';
import { usePortfolio } from '@/context/PortfolioContext';

export default function HomePage() {
  const router = useRouter();
  const {
    heroInfo,
    projects,
    certifications,
    handleSendMessage,
    isAdmin,
  } = usePortfolio();

  return (
    <PublicPortfolio
      heroInfo={heroInfo}
      projects={projects}
      certifications={certifications}
      onNavigateToLogin={() => router.push(isAdmin ? '/admin' : '/login')}
      onSendMessage={handleSendMessage}
      isAdmin={isAdmin}
    />
  );
}

