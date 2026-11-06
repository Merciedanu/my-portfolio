"use client";

import React from 'react';
import CmsCertifications from '@/components/CmsCertifications';
import { usePortfolio } from '@/context/PortfolioContext';

export default function AdminCertificationsPage() {
  const { certifications, handleSaveCertifications } = usePortfolio();

  return (
    <div className="p-6 md:p-10">
      <CmsCertifications
        certifications={certifications}
        onSaveCertifications={handleSaveCertifications}
      />
    </div>
  );
}

