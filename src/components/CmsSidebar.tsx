"use client";

import React from 'react';
import { 
  FiUser, 
  FiAward, 
  FiFolder, 
  FiMail, 
  FiSettings, 
  FiPlus, 
  FiBookOpen, 
  FiHelpCircle, 
  FiLogOut,
  FiLayout,
  FiFileText
} from 'react-icons/fi';

const IconUser = FiUser as any;
const IconAward = FiAward as any;
const IconFolder = FiFolder as any;
const IconMail = FiMail as any;
const IconSettings = FiSettings as any;
const IconPlus = FiPlus as any;
const IconBookOpen = FiBookOpen as any;
const IconHelpCircle = FiHelpCircle as any;
const IconLogOut = FiLogOut as any;
const IconLayout = FiLayout as any;
const IconFileText = FiFileText as any;

export type CmsView = 'dashboard' | 'hero-about' | 'certifications' | 'projects' | 'messages' | 'settings';

interface CmsSidebarProps {
  currentView: CmsView;
  onViewChange: (view: CmsView) => void;
  onLogout: () => void;
  onAddNewProject: () => void;
  unreadCount: number;
  profilePhoto?: string;
  adminName?: string;
}

export default function CmsSidebar({
  currentView,
  onViewChange,
  onLogout,
  onAddNewProject,
  unreadCount,
  profilePhoto,
  adminName
}: CmsSidebarProps) {
  
  const menuItems = [
    { id: 'dashboard' as CmsView, label: 'Dashboard', icon: <IconLayout className="w-4 h-4" /> },
    { id: 'hero-about' as CmsView, label: 'Hero/About', icon: <IconUser className="w-4 h-4" /> },
    { id: 'projects' as CmsView, label: 'Projects', icon: <IconFolder className="w-4 h-4" /> },
    { id: 'certifications' as CmsView, label: 'Certifications', icon: <IconAward className="w-4 h-4" /> },
    { id: 'messages' as CmsView, label: 'Messages', icon: <IconMail className="w-4 h-4" />, badge: unreadCount },
    { id: 'settings' as CmsView, label: 'Settings', icon: <IconSettings className="w-4 h-4" /> }
  ];

  return (
    <aside className="w-64 bg-surface-container border-r border-outline-variant/15 flex flex-col p-4 justify-between shrink-0 h-screen sticky top-0 font-sans">
      
      {/* Sidebar Top Content */}
      <div className="flex flex-col flex-1 min-h-0">
        
        {/* Brand / Title Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-3 shrink-0 text-left">
          <img 
            alt="Admin Avatar" 
            className="w-10 h-10 rounded-full object-cover shadow-sm border border-outline-variant/40" 
            referrerPolicy="no-referrer"
            src={profilePhoto || "https://lh3.googleusercontent.com/aida-public/AB6AXuBKRa2LzEMvtKCfSRwPlfc5ANwigcfSv7ILK9-hPzbkKtkBk5wnGDZhjpxoTqWcNF7X9jqk0b37QEQeFw8Z5fF1GjWOr4kfuStpEyzrccseirtregelHDqsXnWp2dvzO1lFZisjK7pYw2dPu1M4oUOBr_eQC7uw8DqRgWBhLqoNGkL5iN3Rh-9W3NnelYTlcii31rK0UmgY4iCgv984fSvsFx0Q8mg1utt50UBJcwTS0TQT9FGuCtICXUznsy1fPZgecNt28OZLbC6D"}
          />
          <div className="flex flex-col">
            <span className="font-display font-bold text-primary text-sm leading-tight truncate max-w-[150px]" title={adminName || "Portfolio CMS"}>
              {adminName || "Portfolio CMS"}
            </span>
            <span className="font-mono text-[9px] text-on-surface-variant/80 uppercase font-semibold tracking-wider">CMS admin suite</span>
          </div>
        </div>

        {/* Action button trigger */}
        <button 
          onClick={onAddNewProject}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-lg font-mono text-xs uppercase font-semibold hover:bg-neutral-800 transition-colors mb-5 shadow-sm shrink-0 cursor-pointer text-left"
        >
          <IconPlus className="w-4 h-4 text-secondary-container" />
          New Project
        </button>

        {/* Primary Navigation link list */}
        <nav className="flex-1 overflow-y-auto space-y-1 pr-1 text-left">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-mono text-xs uppercase font-semibold transition-all active:scale-[0.98] cursor-pointer ${
                  isActive 
                    ? 'bg-secondary-container text-on-secondary-container shadow-sm font-bold' 
                    : 'text-on-surface-variant hover:bg-surface-container-high transition-colors'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${isActive ? 'text-on-secondary-container' : 'text-neutral-500'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-error text-white font-mono text-[9px] px-2 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* Sidebar Footer Navigation */}
      <div className="mt-auto pt-4 border-t border-outline-variant/15 flex flex-col gap-1 shrink-0">
        <a 
          className="flex items-center gap-3 px-3.5 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg font-mono text-xs uppercase font-semibold transition-all text-left" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert('Opening Suite Developer Documentation guidelines.');
          }}
        >
          <IconFileText className="w-4 h-4 text-neutral-500" />
          Documentation
        </a>
        
        <a 
          className="flex items-center gap-3 px-3.5 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg font-mono text-xs uppercase font-semibold transition-all text-left mb-3" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert('CMS Technical Support contact forms activated.');
          }}
        >
          <IconHelpCircle className="w-4 h-4 text-neutral-500" />
          Support
        </a>

        {/* User Card & Logout option */}
        <div className="pt-3 border-t border-outline-variant/10 flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 bg-secondary rounded-full animate-pulse" title="System Live"></div>
            <span className="font-mono text-[10px] uppercase font-bold text-on-surface">Admin Mode</span>
          </div>
          <button 
            onClick={onLogout}
            className="p-1 px-2.5 py-1 text-[10px] border border-outline-variant/30 text-on-surface-variant hover:text-error hover:border-error hover:bg-error/5 font-mono uppercase font-semibold rounded-md transition-colors flex items-center gap-1 cursor-pointer"
          >
            <IconLogOut className="w-3 h-3 text-red-600" />
            Exit
          </button>
        </div>

      </div>

    </aside>
  );
}
