"use client";

import React, { useState } from 'react';
import { Message } from '@/types';
import { Check, MailOpen, Mail, Trash2, Calendar, User, Search, AlertCircle, Eye, ChevronDown, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CmsMessagesProps {
  messages: Message[];
  onSaveMessages: (updatedMessages: Message[]) => void;
}

export default function CmsMessages({ messages, onSaveMessages }: CmsMessagesProps) {
  const [filterMode, setFilterMode] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);

  // Formatter for timestamps
  const formatTime = (tsString: string) => {
    try {
      const d = new Date(tsString);
      return d.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    } catch {
      return tsString;
    }
  };

  // Mark single as read
  const handleToggleRead = (id: string, currentRead: boolean) => {
    const updated = messages.map(m => {
      if (m.id === id) {
        return { ...m, isRead: !currentRead };
      }
      return m;
    });
    onSaveMessages(updated);
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    const updated = messages.map(m => ({ ...m, isRead: true }));
    onSaveMessages(updated);
  };

  // Delete message
  const handleDeleteMessage = (id: string) => {
    if (window.confirm("Delete this inquiry from records?")) {
      onSaveMessages(messages.filter(m => m.id !== id));
      if (expandedMessageId === id) setExpandedMessageId(null);
    }
  };

  // Filter & Search logic
  const filtered = messages.filter(m => {
    // Read status filter
    if (filterMode === 'unread' && m.isRead) return false;
    if (filterMode === 'read' && !m.isRead) return false;

    // Word search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background relative font-sans text-left">
      <div className="absolute top-0 right-0 w-full h-64 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-200/20 via-transparent to-transparent pointer-events-none"></div>

      <header className="mb-8 w-full px-6 md:px-10 pt-6 border-b border-outline-variant/15 pb-4 h-20 shrink-0 sticky top-0 bg-background/90 backdrop-blur-md flex items-center justify-between z-10">
        <div>
          <h2 className="font-display text-2xl font-bold text-primary tracking-tight">Client Inquiries Inbox</h2>
          <p className="font-sans text-xs text-on-surface-variant">Review message details and contact proposals sent dynamically from the public inquiry form.</p>
        </div>
        
        {messages.some(m => !m.isRead) && (
          <button 
            onClick={handleMarkAllAsRead}
            className="border border-secondary text-secondary hover:bg-secondary/5 px-4 py-2 rounded-lg font-mono text-xs uppercase font-semibold flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <CheckCheck className="w-4 h-4 text-secondary" />
            Mark all read
          </button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 z-10 pb-24 max-w-5xl mx-auto w-full space-y-4">
        
        {/* Search & Filter Mode Controllers Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-outline-variant/20 shadow-sm shrink-0">
          
          {/* Unread tab switches */}
          <div className="flex bg-neutral-100 p-1 rounded-lg self-start sm:self-center">
            <button 
              onClick={() => setFilterMode('all')}
              className={`px-4 py-1.5 rounded-md font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-all ${filterMode === 'all' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
            >
              All ({messages.length})
            </button>
            <button 
              onClick={() => setFilterMode('unread')}
              className={`px-4 py-1.5 rounded-md font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-all ${filterMode === 'unread' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
            >
              Unread ({messages.filter(m => !m.isRead).length})
            </button>
            <button 
              onClick={() => setFilterMode('read')}
              className={`px-4 py-1.5 rounded-md font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-all ${filterMode === 'read' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
            >
              Archived ({messages.filter(m => m.isRead).length})
            </button>
          </div>

          {/* Search bar input elements */}
          <div className="relative w-full sm:w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <Search className="w-3.5 h-3.5 text-outline" />
            </span>
            <input 
              type="text" 
              placeholder="Search keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-50 border border-outline-variant/35 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none"
            />
          </div>

        </div>

        {/* Messages List accordion */}
        <div className="space-y-3">
          {filtered.map((msg) => {
            const isExpanded = expandedMessageId === msg.id;
            return (
              <div 
                key={msg.id}
                className={`bg-white rounded-xl border border-outline-variant/20 shadow-sm transition-all overflow-hidden ${
                  msg.isRead ? 'opacity-80' : 'border-l-4 border-l-secondary ring-1 ring-secondary/5'
                }`}
              >
                {/* Header summary component click to expand */}
                <div 
                  onClick={() => {
                    setExpandedMessageId(isExpanded ? null : msg.id);
                    if (!msg.isRead) handleToggleRead(msg.id, false); // auto-read on expand
                  }}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none rounded-xl hover:bg-neutral-55"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1 text-left">
                    <div className={`p-2.5 rounded-lg shrink-0 ${msg.isRead ? 'bg-neutral-100 text-neutral-500' : 'bg-secondary/10 text-secondary'}`}>
                      {msg.isRead ? <MailOpen className="w-5 h-5" /> : <Mail className="w-5 h-5 animate-bounce" />}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 gap-x-3 mb-1">
                        <span className="font-sans font-bold text-primary truncate text-sm">
                          {msg.name} &bull; <span className="text-xs text-on-surface-variant font-medium font-mono">{msg.email}</span>
                        </span>
                        <span className="font-mono text-[9px] uppercase font-bold text-on-surface-variant flex items-center gap-1 shrink-0">
                          <Calendar className="w-3 h-3 text-secondary" />
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <h4 className="font-sans font-semibold text-primary truncate leading-tight text-xs sm:text-sm">
                        {msg.subject}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-neutral-50 rounded pl-2">
                    <ChevronDown className={`w-4 h-4 text-outline transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {/* Expanded content view */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-outline-variant/10 bg-neutral-50/50 p-5 text-left"
                    >
                      <div className="space-y-4 max-w-4xl">
                        <p className="font-sans text-xs sm:text-sm text-neutral-800 leading-relaxed whitespace-pre-line p-4 bg-white border border-outline-variant/15 rounded-xl text-left shadow-sm">
                          {msg.message}
                        </p>

                        <div className="flex flex-wrap items-center justify-between pt-2 gap-2 text-xs">
                          <a 
                            href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                            className="bg-primary text-white font-mono text-[10px] uppercase font-semibold py-2 px-4 rounded hover:bg-secondary transition-colors"
                          >
                            Send Email Reply
                          </a>

                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleToggleRead(msg.id, msg.isRead)}
                              className="px-3.5 py-2 border border-outline-variant text-on-surface-variant hover:text-black rounded font-mono text-[10px] uppercase font-bold tracking-wide hover:bg-white transition-all cursor-pointer"
                            >
                              {msg.isRead ? 'Mark Unread' : 'Archive Inquiry'}
                            </button>
                            <button 
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="px-3.5 py-2 border border-error/35 text-red-700 hover:text-white hover:bg-error rounded font-mono text-[10px] uppercase font-bold tracking-wide transition-colors cursor-pointer"
                            >
                              Delete Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-12 bg-white rounded-xl border border-outline-variant/20 text-center text-on-surface-variant space-y-2">
              <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto" />
              <p className="font-semibold text-sm">No incoming proposals in categories.</p>
              <p className="text-xs">Your workspace inboxes are tidy!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
