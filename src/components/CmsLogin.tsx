"use client";

import React, { useState } from 'react';
import { 
  ArrowLeft,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { signInWithGoogle } from '@/lib/firebase/services';

interface CmsLoginProps {
  onBackToPublic: () => void;
  onLoginSuccess: () => void;
}

export default function CmsLogin({ onBackToPublic, onLoginSuccess }: CmsLoginProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      await signInWithGoogle();
      setIsLoading(false);
      onLoginSuccess();
    } catch (error: any) {
      setIsLoading(false);
      console.error("Google authentication failed: ", error);
      let message = 'Google authentication failed or was cancelled.';
      if (error.message) {
        message = error.message;
      }
      setErrorMessage(message);
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col justify-center items-center p-6 bg-pattern relative overflow-hidden font-sans">
      
      {/* Top linear visual gradient highlight */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-secondary to-secondary-container opacity-90"></div>

      {/* Decorative floating lights */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>

      <main className="w-full max-w-[440px] bg-white rounded-2xl shadow-ambient-md border border-outline-variant/30 relative overflow-hidden z-10">
        
        {/* Subtle corner geometric watermark */}
        <div className="absolute -bottom-16 -right-16 w-36 h-36 opacity-[0.03] text-primary select-none pointer-events-none">
          <svg fill="currentColor" viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50 0 L100 50 L50 100 L0 50 Z"></path>
          </svg>
        </div>

        <div className="p-8 sm:p-10 text-left">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface-container mb-4 border border-outline-variant/30">
              <ShieldCheck className="w-7 h-7 text-secondary" />
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-primary mb-1">Portfolio CMS Login</h1>
            <p className="font-sans text-xs text-on-surface-variant font-medium">Authorized administrative access only</p>
          </div>

          {/* Validation Feedback */}
          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-lg bg-error-container text-on-error-container flex items-start gap-2 border border-error/25 text-xs line-clamp-3"
            >
              <AlertCircle className="w-4 h-4 text-error shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Google Sign-in instant login */}
          <button
            onClick={handleGoogleSignIn}
            type="button"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-neutral-800 text-white font-sans text-sm font-semibold py-3.5 rounded-lg transition-colors flex justify-center items-center gap-3 shadow-ambient-sm active:scale-[0.98] cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                className="opacity-90"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                className="opacity-80"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                className="opacity-95"
              />
            </svg>
            Continue with Google
          </button>

        </div>
      </main>

      {/* Return backlink */}
      <div className="mt-8 z-10">
        <button 
          onClick={onBackToPublic}
          className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-outline-variant/20 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant hover:text-primary transition-all py-2.5 px-5 rounded-full hover:bg-white"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-secondary" />
          Return to Public Site
        </button>
      </div>

    </div>
  );
}
