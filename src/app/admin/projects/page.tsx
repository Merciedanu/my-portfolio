"use client";

import React from 'react';
import CmsProjects from '@/components/CmsProjects';
import { usePortfolio } from '@/context/PortfolioContext';

export default function AdminProjectsPage() {
  const {
    projects,
    handleSaveProjects,
    openCreateImmediately,
  } = usePortfolio();

  return (
    <div className="p-6 md:p-10">
      <CmsProjects
        projects={projects}
        onSaveProjects={handleSaveProjects}
        openCreateImmediately={openCreateImmediately}
      />
    </div>
  );
}

