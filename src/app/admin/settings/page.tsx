"use client";

import React from 'react';
import CmsSettings from '@/components/CmsSettings';
import { usePortfolio } from '@/context/PortfolioContext';

export default function AdminSettingsPage() {
  const {
    appTitle,
    setAppTitle,
    appDescription,
    setAppDescription,
    handleResetFactoryData,
  } = usePortfolio();

  return (
    <div className="p-6 md:p-10">
      <CmsSettings
        onResetFactoryData={handleResetFactoryData}
        appTitle={appTitle}
        onUpdateTitle={setAppTitle}
        appDescription={appDescription}
        onUpdateDescription={setAppDescription}
      />
    </div>
  );
}

