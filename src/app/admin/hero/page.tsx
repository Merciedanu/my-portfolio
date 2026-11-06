"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import CmsHeroAbout from '@/components/CmsHeroAbout';
import { usePortfolio } from '@/context/PortfolioContext';

export default function AdminHeroPage() {
  const router = useRouter();
  const { heroInfo, handleSaveHeroInfo } = usePortfolio();

  return (
    <div className="p-6 md:p-10">
      <CmsHeroAbout
        heroInfo={heroInfo}
        onSaveHeroInfo={handleSaveHeroInfo}
        onCancel={() => router.push('/admin')}
      />
    </div>
  );
}

