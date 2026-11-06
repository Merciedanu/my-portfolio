"use client";

import React, { useState } from 'react';
import { RefreshCw, Layout, AppWindow, Eye, ShieldAlert, Sparkles, Check, ShieldCheck, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CmsSettingsProps {
  onResetFactoryData: () => void;
  appTitle: string;
  onUpdateTitle: (title: string) => void;
  appDescription: string;
  onUpdateDescription: (desc: string) => void;
}

export default function CmsSettings({
  onResetFactoryData,
  appTitle,
  onUpdateTitle,
  appDescription,
  onUpdateDescription
}: CmsSettingsProps) {
  const [titleInput, setTitleInput] = useState(appTitle);
  const [descriptionInput, setDescriptionInput] = useState(appDescription);
  const [mercyEmailInput, setMercyEmailInput] = useState(() => {
    return (typeof window !== 'undefined' ? localStorage.getItem('portfolio_cms_mercy_admin_email') : null) || 'mercyndanu@tech.ke';
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Metadata configurations applied!');

  // Apply Changes
  const handleApplySettings = () => {
    onUpdateTitle(titleInput);
    onUpdateDescription(descriptionInput);
    
    setToastMessage('Metadata configurations applied!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveMercyEmail = () => {
    const trimmed = mercyEmailInput.trim();
    if (trimmed) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio_cms_mercy_admin_email', trimmed);
      }
      setToastMessage(`Mercy's admin email updated to ${trimmed}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Reset trigger with verification
  const handleResetTrigger = () => {
    if (window.confirm("Verify content restore: Are you sure you want to delete all customized dashboard, project, bio edits, and restore the original pre-seeded Mercy Ndanu portfolio content?")) {
      onResetFactoryData();
      alert("Application successfully synchronized to original seed data!");
      window.location.reload();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background relative font-sans text-left">
      <div className="absolute top-0 right-0 w-full h-64 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-200/20 via-transparent to-transparent pointer-events-none"></div>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-10 z-50 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-ambient-md flex items-center gap-2 border border-emerald-500"
          >
            <Check className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-8 w-full px-6 md:px-10 pt-6 border-b border-outline-variant/15 pb-4 h-20 shrink-0 sticky top-0 bg-background/90 backdrop-blur-md flex items-center justify-between z-10">
        <div>
          <h2 className="font-display text-2xl font-bold text-primary tracking-tight">Portal Configuration Settings</h2>
          <p className="font-sans text-xs text-on-surface-variant">Update the global theme settings, layout parameters, search metadata tags, and developer system options.</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 z-10 pb-24 max-w-5xl mx-auto w-full space-y-6 text-left">
        
        {/* Card: Authorized Administrators (Strict 2-Admin Limit) */}
        <section className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-display font-bold text-sm text-primary flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              Authorized Administrators (Strict 2-Admin Limit)
            </h3>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600" />
              Quota: 2/2 Active
            </span>
          </div>

          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            Per security policy, CMS administrative permissions and Firestore write access are strictly restricted to <strong>2 administrators:</strong> Primary Owner (Elisha Muuo) and Portfolio Subject (Mercy Ndanu). All other Google accounts attempting to sign in will be rejected automatically.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Admin 1: Elisha Muuo */}
            <div className="p-4 rounded-lg bg-neutral-50 border border-outline-variant/25 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-secondary tracking-wider">Admin 1 • Primary Owner</span>
                  <span className="bg-primary/10 text-primary font-mono text-[9px] font-bold px-2 py-0.5 rounded">Owner</span>
                </div>
                <p className="font-sans font-bold text-sm text-primary">Elisha Muuo</p>
                <p className="font-mono text-xs text-on-surface-variant mt-0.5">elishamuuo1@gmail.com</p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-neutral-200/60 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>Verified Cloud Root Administrator</span>
              </div>
            </div>

            {/* Admin 2: Mercy Ndanu */}
            <div className="p-4 rounded-lg bg-neutral-50 border border-outline-variant/25 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-secondary tracking-wider">Admin 2 • Portfolio Subject</span>
                  <span className="bg-secondary/15 text-secondary font-mono text-[9px] font-bold px-2 py-0.5 rounded">Admin</span>
                </div>
                <p className="font-sans font-bold text-sm text-primary">Mercy Ndanu</p>
                <div className="mt-2.5 space-y-1">
                  <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant block">Mercy's Google Account Email</label>
                  <input
                    type="email"
                    value={mercyEmailInput}
                    onChange={(e) => setMercyEmailInput(e.target.value)}
                    placeholder="mercyndanu@tech.ke or mercyndanu@gmail.com"
                    className="w-full bg-white border border-outline-variant/35 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-200/60 flex items-center justify-between">
                <span className="text-[10px] text-on-surface-variant font-mono">Default: mercyndanu@tech.ke</span>
                <button
                  type="button"
                  onClick={handleSaveMercyEmail}
                  className="bg-secondary text-white font-mono text-[10px] uppercase font-bold tracking-wider py-1 px-3 rounded hover:bg-secondary/90 cursor-pointer transition-colors"
                >
                  Save Email
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Card: Web SEO & Metadata Tags settings */}
        <section className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-5">
          <h3 className="font-display font-bold text-sm text-primary flex items-center gap-2">
            <AppWindow className="w-5 h-5 text-secondary" />
            SEO & Browser Metadata Tags
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Browser Title Tag</label>
              <input 
                type="text" 
                placeholder="Jane Doe - Portfolio"
                className="bg-neutral-50 border border-outline-variant/35 rounded-lg px-3 py-2.5 text-sm focus:outline-none"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Browser Meta Description Tag</label>
              <textarea 
                rows={3}
                placeholder="A professional engineering resume..."
                className="bg-neutral-50 border border-outline-variant/35 rounded-lg px-3 py-2.5 text-xs focus:outline-none resize-none"
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
              />
            </div>
            
            <div className="pt-2 flex justify-end">
              <button 
                onClick={handleApplySettings}
                className="bg-primary text-white font-mono text-xs uppercase font-bold tracking-wider py-2.5 px-6 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Apply Metadata
              </button>
            </div>
          </div>
        </section>

        {/* Card: Theme Style Branding specifications */}
        <section className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-4">
          <h3 className="font-display font-bold text-sm text-primary flex items-center gap-2">
            <Layout className="w-5 h-5 text-secondary" />
            Active Design Theme System
          </h3>

          <div className="p-4 bg-neutral-50 rounded-lg flex items-center justify-between text-xs">
            <div className="space-y-1">
              <p className="font-sans font-bold text-primary">Savannah Horizon Theme (Grounded Modern Corporate)</p>
              <p className="text-[11px] text-on-surface-variant/80">Uses JetBrains Mono typography markings, gold action anchors, and tactile geometric patterns.</p>
            </div>
            <span className="bg-secondary/15 text-secondary border border-secondary/20 font-mono font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
              Active Premium
            </span>
          </div>
        </section>

        {/* Card: Administrative Debug & Sandbox Utilities */}
        <section className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm border-l-4 border-l-red-600 space-y-4">
          <h3 className="font-display font-bold text-sm text-primary flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600 animate-pulse" />
            Administrative System Override
          </h3>
          
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            While prototyping, customized edits are locked cache-side. If you need to erase tests and revert directly back to Mercy Ndanu's original sleek biography description and projects, trigger the restore sequence beneath.
          </p>

          <div className="pt-2">
            <button 
              onClick={handleResetTrigger}
              className="inline-flex items-center gap-2 bg-red-50 border border-error/35 text-red-700 hover:bg-error hover:text-white font-mono text-xs uppercase font-bold py-3 px-6 rounded-lg transition-all cursor-pointer shadow-sm"
            >
              <RefreshCw className="w-4 h-4 shrink-0" />
              Reset Portal to Seeding Data
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
