"use client";

import React from 'react';
import CmsMessages from '@/components/CmsMessages';
import { usePortfolio } from '@/context/PortfolioContext';

export default function AdminMessagesPage() {
  const { messages, handleSaveMessages } = usePortfolio();

  return (
    <div className="p-6 md:p-10">
      <CmsMessages
        messages={messages}
        onSaveMessages={handleSaveMessages}
      />
    </div>
  );
}

