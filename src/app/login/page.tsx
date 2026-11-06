"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CmsLogin from '@/components/CmsLogin';
import { usePortfolio } from '@/context/PortfolioContext';

export default function LoginPage() {
  const router = useRouter();
  const { isAdmin } = usePortfolio();

  useEffect(() => {
    if (isAdmin) {
      router.replace('/admin');
    }
  }, [isAdmin, router]);

  return (
    <CmsLogin
      onBackToPublic={() => router.push('/')}
      onLoginSuccess={() => router.push('/admin')}
    />
  );
}

