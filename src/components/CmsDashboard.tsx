"use client";

import React from 'react';
import { Project, Message, Certification } from '@/types';
import { 
  FiFolder,
  FiAward,
  FiMail,
  FiPlusSquare,
  FiEdit,
  FiMessageSquare,
  FiCheckCircle,
  FiEye,
  FiLogOut
} from 'react-icons/fi';
import { motion } from 'motion/react';

const IconFolder = FiFolder as any;
const IconAward = FiAward as any;
const IconMail = FiMail as any;
const IconPlusSquare = FiPlusSquare as any;
const IconEdit = FiEdit as any;
const IconMessageSquare = FiMessageSquare as any;
const IconCheckCircle = FiCheckCircle as any;
const IconEye = FiEye as any;
const IconLogOut = FiLogOut as any;

interface CmsDashboardProps {
  projects: Project[];
  messages: Message[];
  certifications: Certification[];
  onNavigateToView: (view: 'dashboard' | 'hero-about' | 'certifications' | 'projects' | 'messages' | 'settings') => void;
  onAddNewProject: () => void;
  onLogout: () => void;
  onReturnToPublic: () => void;
}

export default function CmsDashboard({
  projects,
  messages,
  certifications,
  onNavigateToView,
  onAddNewProject,
  onLogout,
  onReturnToPublic
}: CmsDashboardProps) {

  const totalProjects = projects.length;
  const publishedProjects = projects.filter(p => p.isPublished).length;
  const totalCerts = certifications.length;
  const unreadMessages = messages.filter(m => !m.isRead).length;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background relative font-sans text-left">
      
      {/* Ambient glass decoration */}
      <div className="absolute top-0 right-0 w-full h-80 bg-gradient-to-b from-surface-container-high/20 to-transparent pointer-events-none z-0"></div>

      {/* Top Header Area */}
      <header className="w-full px-6 md:px-10 py-6 flex items-center justify-between z-10 sticky top-0 bg-background/90 backdrop-blur-md border-b border-outline-variant/15 h-20 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-base md:text-lg font-bold text-primary tracking-tight">
            Dashboard Panel
          </h1>
          <span className="h-4 w-px bg-neutral-300"></span>
          <p className="text-xs text-on-surface-variant font-mono">Administration Suite</p>
        </div>

        {/* Global secondary navigation and CTAs */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={onReturnToPublic}
              className="font-sans text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              Public Profile
            </button>
            <button 
              onClick={() => onNavigateToView('projects')}
              className="font-sans text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              Drafts
            </button>
            <button 
              onClick={() => onNavigateToView('messages')}
              className="font-sans text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              Inquiries
            </button>
          </nav>

          <span className="hidden md:inline-block h-4 w-px bg-neutral-300"></span>
          
          <button 
            onClick={onReturnToPublic}
            className="flex items-center gap-2 bg-primary text-white hover:bg-neutral-800 px-4 py-2.5 rounded-lg font-mono text-xs font-bold uppercase transition-all shadow-ambient-sm cursor-pointer"
          >
            <IconEye className="w-4 h-4 text-secondary-container" />
            Save & Publish
          </button>
        </div>
      </header>

      {/* Main scrollable body layout */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 z-10 pb-24 space-y-8">
        
        {/* Entrance Greetings heading */}
        <div className="max-w-5xl">
          <h2 className="font-display text-3xl sm:text-4xl text-primary font-bold tracking-tight">
            Dashboard Overview
          </h2>
          <p className="font-sans text-sm text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
            Welcome back. Here is a high-level summary of your portfolio's current state and recent activity.
          </p>
        </div>

        {/* Dynamic Bento statistics boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          
          {/* Card 1: Projects Count */}
          <div className="bg-white border border-outline-variant/20 rounded-xl p-6 shadow-ambient-sm relative overflow-hidden group hover:border-outline transition-colors text-left">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-pattern-subtle opacity-30 group-hover:opacity-50 transition-all"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Total Projects</span>
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <IconFolder className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl leading-tight text-primary font-bold">{totalProjects}</span>
              <span className="font-mono text-[10px] text-secondary font-bold flex items-center gap-1">
                ↑ {publishedProjects} Live
              </span>
            </div>
          </div>

          {/* Card 2: Certifications Count */}
          <div className="bg-white border border-outline-variant/20 rounded-xl p-6 shadow-ambient-sm relative overflow-hidden group hover:border-outline transition-colors text-left">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-pattern-subtle opacity-30 group-hover:opacity-50 transition-all"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Certifications</span>
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <IconAward className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl leading-tight text-primary font-bold">{totalCerts}</span>
              <span className="font-mono text-[10px] text-neutral-500 font-bold">
                Level 1 Verified
              </span>
            </div>
          </div>

          {/* Card 3: Inbox Count (Warnings Alert) */}
          <div className="bg-white border border-outline-variant/25 rounded-xl p-6 shadow-ambient-sm relative overflow-hidden group hover:border-outline transition-colors border-l-4 border-l-secondary text-left">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-pattern-subtle opacity-30 group-hover:opacity-50 transition-all"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Unread Messages</span>
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <IconMail className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl leading-tight text-primary font-bold">{unreadMessages}</span>
              {unreadMessages > 0 ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-mono text-[9px] font-bold uppercase tracking-wider">
                  Needs Attention
                </span>
              ) : (
                <span className="text-xs text-neutral-500 font-mono">Inboxes Clear</span>
              )}
            </div>
          </div>

        </div>

        {/* Quick Operations and Telemetry segments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl">
          
          {/* Left Block: Quick operational links list */}
          <div className="lg:col-span-8 bg-white border border-outline-variant/25 rounded-xl p-6 shadow-ambient-sm">
            <h3 className="font-display text-lg font-bold text-primary mb-6">Quick Actions</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Action 1: Create Case study */}
              <button 
                onClick={onAddNewProject}
                className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant/30 hover:border-primary hover:bg-neutral-50/50 transition-all text-left group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                  <IconPlusSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-primary text-sm sm:text-base">Create New Project</h4>
                  <p className="font-sans text-xs text-on-surface-variant mt-0.5">Draft a new case study or repository.</p>
                </div>
              </button>

              {/* Action 2: Write narrative bio */}
              <button 
                onClick={() => onNavigateToView('hero-about')}
                className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant/30 hover:border-primary hover:bg-neutral-50/50 transition-all text-left group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                  <IconEdit className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-primary text-sm sm:text-base">Update Bio</h4>
                  <p className="font-sans text-xs text-on-surface-variant mt-0.5">Modify your hero section biography.</p>
                </div>
              </button>

              {/* Action 3: Review customer forms inbox */}
              <button 
                onClick={() => onNavigateToView('messages')}
                className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant/30 hover:border-primary hover:bg-neutral-50/50 transition-all text-left group sm:col-span-2 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:bg-secondary group-hover:text-white transition-colors shrink-0">
                  <IconMessageSquare className="w-5 h-5 animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-sans font-semibold text-primary text-sm sm:text-base">View Latest Messages</h4>
                  <p className="font-sans text-xs text-on-surface-variant mt-0.5">Respond to prospective requests, audits, and emails.</p>
                </div>
              </button>

            </div>
          </div>

          {/* Right Block: Live Preview Telemetry */}
          <div className="lg:col-span-4 bg-white border border-outline-variant/25 rounded-xl overflow-hidden shadow-ambient-sm flex flex-col justify-between">
            <div className="p-6 border-b border-outline-variant/15 bg-neutral-50/30 flex-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-base font-bold text-primary">System Status</h3>
                
                {/* Blinking visual status beacon */}
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-secondary"></span>
                </span>
              </div>

              <div className="flex items-center gap-3.5 p-4 bg-white rounded-lg border border-outline-variant/30 mt-4">
                <div className="text-secondary shrink-0 bg-secondary/10 p-2.5 rounded-lg">
                  <IconCheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-sans font-bold text-primary text-sm">Site is Live</p>
                  <p className="text-[11px] font-mono text-on-surface-variant">All server pods operational.</p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-background border border-outline-variant/25 text-left space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                  <span>Engine Load</span>
                  <span className="font-bold text-primary">0.03ms (idle)</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                  <span>CDN Hits</span>
                  <span className="font-bold text-primary">99.8% effective</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                  <span>OAuth Callback</span>
                  <span className="font-bold text-secondary">ACTIVE</span>
                </div>
              </div>

            </div>

            {/* Launch portfolio CTA external element */}
            <div className="p-4 bg-white flex justify-center">
              <button 
                onClick={onReturnToPublic}
                className="w-full flex items-center justify-center gap-2 border border-secondary text-secondary hover:bg-secondary hover:text-white py-3 px-4 rounded-lg font-mono text-xs uppercase font-bold transition-all cursor-pointer"
              >
                <IconEye className="w-4 h-4" />
                View Portfolio
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
