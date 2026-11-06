"use client";

import React, { useState } from 'react';
import { Project } from '@/types';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  X, 
  Upload, 
  Link2, 
  ExternalLink, 
  Check, 
  AlertCircle,
  FileText,
  Image as ImageIcon,
  CheckSquare,
  GripVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CmsProjectsProps {
  projects: Project[];
  onSaveProjects: (allProjects: Project[]) => void;
  openCreateImmediately?: boolean;
}

export default function CmsProjects({ projects, onSaveProjects, openCreateImmediately }: CmsProjectsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  
  // Edit Form Fields State
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editLiveUrl, setEditLiveUrl] = useState('');
  const [editRepositoryUrl, setEditRepositoryUrl] = useState('');
  const [editTechStack, setEditTechStack] = useState<string[]>([]);
  const [editCoverImage, setEditCoverImage] = useState('');
  const [editIsFeatured, setEditIsFeatured] = useState(false);
  const [editIsPublished, setEditIsPublished] = useState(false);
  
  // Custom Tag input state
  const [newTagInput, setNewTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);

  // Creator state
  const [isCreatingNew, setIsCreatingNew] = useState(openCreateImmediately || false);

  // Search filter
  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Trigger Edit Mode
  const handleStartEdit = (p: Project) => {
    setEditingProjectId(p.id);
    setEditTitle(p.title);
    setEditDescription(p.description);
    setEditLiveUrl(p.liveUrl);
    setEditRepositoryUrl(p.repositoryUrl);
    setEditTechStack([...p.techStack]);
    setEditCoverImage(p.coverImage);
    setEditIsFeatured(p.isFeatured);
    setEditIsPublished(p.isPublished);
    setIsCreatingNew(false);
  };

  // Save changes
  const handleSaveChanges = () => {
    if (!editTitle) {
      alert("Project title is required.");
      return;
    }
    const updated = projects.map(p => {
      if (p.id === editingProjectId) {
        return {
          ...p,
          title: editTitle,
          description: editDescription,
          liveUrl: editLiveUrl,
          repositoryUrl: editRepositoryUrl,
          techStack: editTechStack,
          coverImage: editCoverImage,
          isFeatured: editIsFeatured,
          isPublished: editIsPublished
        };
      }
      return p;
    });

    onSaveProjects(updated);
    setEditingProjectId(null);
  };

  // Trigger Creator mode
  const handleStartCreate = () => {
    setIsCreatingNew(true);
    setEditingProjectId(null);
    setEditTitle('');
    setEditDescription('');
    setEditLiveUrl('https://example.com');
    setEditRepositoryUrl('https://github.com/mercyndanu/project');
    setEditTechStack(['React', 'Typescript', 'Tailwind CSS']);
    setEditCoverImage('');
    setEditIsFeatured(false);
    setEditIsPublished(true);
  };

  // Save newly created
  const handleSaveNewProject = () => {
    if (!editTitle) {
      alert("Project title is required.");
      return;
    }
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: editTitle,
      description: editDescription,
      liveUrl: editLiveUrl,
      repositoryUrl: editRepositoryUrl,
      techStack: editTechStack,
      coverImage: editCoverImage,
      isFeatured: editIsFeatured,
      isPublished: editIsPublished,
      addedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    onSaveProjects([newProj, ...projects]);
    setIsCreatingNew(false);
  };

  // Delete project
  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      const updated = projects.filter(p => p.id !== id);
      onSaveProjects(updated);
      if (editingProjectId === id) setEditingProjectId(null);
    }
  };

  // Quick tag modifiers
  const handleRemoveTag = (tagToRemove: string) => {
    setEditTechStack(editTechStack.filter(t => t !== tagToRemove));
  };

  const handleAddTag = () => {
    if (newTagInput.trim() && !editTechStack.includes(newTagInput.trim())) {
      setEditTechStack([...editTechStack, newTagInput.trim()]);
      setNewTagInput('');
      setShowTagInput(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background relative font-sans text-left">
      
      {/* Background radial layer */}
      <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-surface-container-high/20 to-transparent pointer-events-none z-0"></div>

      {/* Top Header Controls bar */}
      <header className="w-full px-6 md:px-10 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 sticky top-0 bg-background/90 backdrop-blur-md border-b border-outline-variant/15 shrink-0 min-h-20">
        <div className="flex items-center gap-4">
          <h2 className="font-display text-2xl font-bold text-primary tracking-tight">
            Manage Projects
          </h2>
        </div>

        {/* Filters and New creation buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Live Search text input */}
          <div className="relative flex-1 md:w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              <Search className="w-4 h-4 text-outline" />
            </span>
            <input 
              className="w-full bg-neutral-50 border border-outline-variant/40 rounded-lg pl-10 pr-4 py-2.5 text-xs font-sans placeholder-neutral-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" 
              placeholder="Search projects by tech stack or name..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button 
            title="Toggle Filter Options"
            className="bg-neutral-50 border border-outline-variant/30 text-on-surface p-2.5 rounded-lg hover:bg-neutral-100 transition-colors flex items-center justify-center cursor-pointer shrink-0"
          >
            <Filter className="w-4 h-4 text-outline" />
          </button>
          
          <button 
            onClick={handleStartCreate}
            className="bg-primary text-white hover:bg-neutral-800 px-4 py-2.5 rounded-lg font-mono text-xs uppercase font-semibold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 text-secondary-container" />
            Add New Project
          </button>
        </div>
      </header>

      {/* Scrollable Rows showcase */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 z-10 pb-24 space-y-4">
        
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          
          {/* Creator View Card (Expanded block layout) */}
          <AnimatePresence>
            {isCreatingNew && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white border-2 border-dashed border-secondary/35 rounded-xl p-6 shadow-ambient-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
                
                {/* Header operations row */}
                <div className="flex justify-between items-center mb-6 border-b border-outline-variant/10 pb-4">
                  <h3 className="font-display font-bold text-primary text-lg flex items-center gap-2">
                    <Plus className="w-5 h-5 text-secondary" />
                    Draft New Portfolio Showcase
                  </h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsCreatingNew(false)}
                      className="px-4 py-1.5 border border-outline-variant/35 rounded-lg text-on-surface-variant font-mono text-xs uppercase font-semibold hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveNewProject}
                      className="px-4 py-1.5 bg-primary text-white rounded-lg font-mono text-xs uppercase font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Create Project
                    </button>
                  </div>
                </div>

                {/* Form grid details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
                  
                  {/* Left Form controls side */}
                  <div className="lg:col-span-2 flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Project Title</label>
                      <input 
                        className="w-full bg-neutral-50 border border-outline-variant/30 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" 
                        type="text" 
                        placeholder="e.g. Fintech Mobile Platform"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Description Case Study</label>
                      <textarea 
                        className="w-full bg-neutral-50 border border-outline-variant/30 rounded-lg px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all resize-none" 
                        rows={3} 
                        placeholder="Provide details about engineering architecture, features, and code quality benchmarks achieved."
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Live Demo URL</label>
                        <input 
                          className="w-full bg-neutral-50 border border-outline-variant/30 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" 
                          type="text" 
                          placeholder="https://demoproject.com"
                          value={editLiveUrl}
                          onChange={(e) => setEditLiveUrl(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Git Code Repository URL</label>
                        <input 
                          className="w-full bg-neutral-50 border border-outline-variant/30 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" 
                          type="text" 
                          placeholder="https://github.com/username/project"
                          value={editRepositoryUrl}
                          onChange={(e) => setEditRepositoryUrl(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Tech stack tags list */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Tech Stack Tags</label>
                      <div className="flex flex-wrap gap-2 items-center">
                        {editTechStack.map(tag => (
                          <span 
                            key={tag}
                            className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-800 font-mono text-[10px] px-2.5 py-1 rounded border border-neutral-200"
                          >
                            {tag}
                            <button 
                              onClick={() => handleRemoveTag(tag)}
                              className="hover:text-error text-neutral-400 shrink-0 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        
                        {showTagInput ? (
                          <div className="flex items-center gap-1">
                            <input 
                              type="text" 
                              className="bg-neutral-50 border border-outline-variant/35 rounded px-2 py-0.5 text-[10px] font-mono tracking-wider focus:outline-none focus:border-secondary"
                              placeholder="Type tag"
                              value={newTagInput}
                              onChange={(e) => setNewTagInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddTag();
                                if (e.key === 'Escape') setShowTagInput(false);
                              }}
                              autoFocus
                            />
                            <button onClick={handleAddTag} className="bg-primary text-white text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer">
                              Add
                            </button>
                            <button onClick={() => setShowTagInput(false)} className="text-outline hover:text-error shrink-0 cursor-pointer">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setShowTagInput(true)}
                            className="inline-flex items-center gap-1 border border-dashed border-outline-variant text-[#825500] font-mono text-[10px] px-2.5 py-1 rounded hover:bg-neutral-50 transition-colors cursor-pointer font-bold"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Tag
                          </button>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Right side settings column */}
                  <div className="flex flex-col gap-5 text-left">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Cover Image URL</label>
                      <input 
                        className="w-full bg-neutral-50 border border-outline-variant/30 rounded-lg px-3 py-2.5 text-xs font-mono focus:outline-none" 
                        type="text" 
                        placeholder="Hotlink image URL address"
                        value={editCoverImage}
                        onChange={(e) => setEditCoverImage(e.target.value)}
                      />
                      <div className="w-full aspect-video bg-neutral-50 border border-dashed border-outline-variant/30 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-secondary hover:bg-neutral-100/45 transition-colors group relative overflow-hidden mt-2">
                        {editCoverImage ? (
                          <img 
                            src={editCoverImage} 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" 
                            alt="Cover Preview"
                            referrerPolicy="no-referrer"
                          />
                        ) : null}
                        <Upload className="w-8 h-8 text-outline group-hover:text-secondary z-10" />
                        <span className="font-mono text-[10px] uppercase text-on-surface-variant tracking-wider font-semibold z-10">Image Preview Live</span>
                      </div>
                    </div>

                    <div className="bg-neutral-50 p-4 rounded-xl border border-outline-variant/20 flex flex-col gap-3">
                      <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Visibility Settings</label>
                      
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-xs font-sans text-on-surface-variant font-semibold group-hover:text-primary transition-colors">Featured Project</span>
                        <input 
                          type="checkbox" 
                          checked={editIsFeatured}
                          onChange={(e) => setEditIsFeatured(e.target.checked)}
                          className="w-4 h-4 accent-secondary rounded"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-xs font-sans text-on-surface-variant font-semibold group-hover:text-primary transition-colors">Publish Now (Live)</span>
                        <input 
                          type="checkbox" 
                          checked={editIsPublished}
                          onChange={(e) => setEditIsPublished(e.target.checked)}
                          className="w-4 h-4 accent-secondary rounded"
                        />
                      </label>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Table display list */}
          {filteredProjects.map((project) => {
            const isEditing = editingProjectId === project.id;
            
            if (isEditing) {
              return (
                <motion.div 
                  key={project.id}
                  layout
                  className="bg-white border border-secondary/35 rounded-xl p-6 shadow-ambient-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
                  
                  {/* Header editing indicator bar */}
                  <div className="flex justify-between items-center mb-6 border-b border-outline-variant/10 pb-4">
                    <h3 className="font-display font-bold text-primary text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-secondary" />
                      Editing Case Study
                    </h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingProjectId(null)}
                        className="px-4 py-1.5 border border-outline-variant/35 rounded-lg text-on-surface-variant font-mono text-xs uppercase font-semibold hover:bg-neutral-50 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveChanges}
                        className="px-4 py-1.5 bg-primary text-white rounded-lg font-mono text-xs uppercase font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
                    {/* Left Form inputs */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Project Title</label>
                        <input 
                          className="w-full bg-neutral-50 border border-outline-variant/30 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-semibold transition-colors text-primary" 
                          type="text" 
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Description</label>
                        <textarea 
                          className="w-full bg-neutral-50 border border-outline-variant/30 rounded-lg px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors resize-none" 
                          rows={3}
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Live URL</label>
                          <input 
                            className="w-full bg-neutral-50 border border-outline-variant/30 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-secondary" 
                            type="text" 
                            value={editLiveUrl}
                            onChange={(e) => setEditLiveUrl(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Repository URL</label>
                          <input 
                            className="w-full bg-neutral-50 border border-outline-variant/30 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-secondary" 
                            type="text" 
                            value={editRepositoryUrl}
                            onChange={(e) => setEditRepositoryUrl(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Tech stack modifier list */}
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Tech Stack Tags</label>
                        <div className="flex flex-wrap gap-2 items-center">
                          {editTechStack.map(tag => (
                            <span 
                              key={tag}
                              className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-800 font-mono text-[10px] px-2.5 py-1 rounded border border-neutral-200"
                            >
                              {tag}
                              <button 
                                onClick={() => handleRemoveTag(tag)}
                                className="hover:text-error text-neutral-400 shrink-0 cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                          
                          {showTagInput ? (
                            <div className="flex items-center gap-1">
                              <input 
                                type="text" 
                                className="bg-neutral-50 border border-outline-variant/35 rounded px-2 py-0.5 text-[10px] font-mono tracking-wider focus:outline-none focus:border-secondary"
                                placeholder="Type tag"
                                value={newTagInput}
                                onChange={(e) => setNewTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleAddTag();
                                  if (e.key === 'Escape') setShowTagInput(false);
                                }}
                                autoFocus
                              />
                              <button onClick={handleAddTag} className="bg-primary text-white text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer">
                                Add
                              </button>
                              <button onClick={() => setShowTagInput(false)} className="text-outline hover:text-error shrink-0 cursor-pointer">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => setShowTagInput(true)}
                              className="inline-flex items-center gap-1 border border-dashed border-outline-variant text-[#825500] font-mono text-[10px] px-2.5 py-1 rounded hover:bg-neutral-50 transition-colors cursor-pointer font-bold"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add Tag
                            </button>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Right Cover Upload and settings options */}
                    <div className="flex flex-col gap-5 text-left">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Cover Image URL</label>
                        <input 
                          className="w-full bg-neutral-50 border border-outline-variant/30 rounded-lg px-3 py-2.5 text-xs font-mono focus:outline-none" 
                          type="text" 
                          value={editCoverImage}
                          onChange={(e) => setEditCoverImage(e.target.value)}
                        />
                        <div className="w-full aspect-video bg-neutral-50 border-2 border-dashed border-outline-variant/30 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-secondary hover:bg-neutral-100 transition-colors group relative overflow-hidden mt-1.5">
                          {editCoverImage ? (
                            <img 
                              src={editCoverImage} 
                              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" 
                              alt="Current cover preview"
                              referrerPolicy="no-referrer"
                            />
                          ) : null}
                          <Upload className="w-6 h-6 text-outline group-hover:text-secondary z-10" />
                          <span className="font-mono text-[10px] uppercase text-on-surface-variant tracking-wider font-semibold z-10">Click to replace image preview</span>
                        </div>
                      </div>

                      <div className="bg-neutral-50 p-4 rounded-xl border border-outline-variant/20 flex flex-col gap-3">
                        <label className="font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Visibility Settings</label>
                        
                        <label className="flex items-center justify-between cursor-pointer group">
                          <span className="text-xs font-sans text-on-surface-variant font-semibold group-hover:text-primary transition-colors">Featured Project</span>
                          <input 
                            type="checkbox" 
                            checked={editIsFeatured}
                            onChange={(e) => setEditIsFeatured(e.target.checked)}
                            className="w-4 h-4 accent-secondary rounded"
                          />
                        </label>
                        
                        <label className="flex items-center justify-between cursor-pointer group">
                          <span className="text-xs font-sans text-on-surface-variant font-semibold group-hover:text-primary transition-colors">Published (Live)</span>
                          <input 
                            type="checkbox" 
                            checked={editIsPublished}
                            onChange={(e) => setEditIsPublished(e.target.checked)}
                            className="w-4 h-4 accent-secondary rounded"
                          />
                        </label>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            }

            // Normal Row Layout (Mockup Rows #1 & #3)
            return (
              <motion.div 
                key={project.id}
                layout
                className="bg-white border border-outline-variant/15 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                {/* Visual patterns overlay */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-pattern-subtle"></div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto flex-1 min-w-0">
                  {/* Row drag layout indicators */}
                  <div className="text-outline-variant hidden sm:block shrink-0 cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-4 h-4 text-neutral-400" />
                  </div>

                  {/* Icon or image thumbnail */}
                  <div className="w-16 h-16 rounded-lg bg-surface-container overflow-hidden shrink-0 border border-outline-variant/20 flex items-center justify-center relative">
                    {project.coverImage ? (
                      <img 
                        src={project.coverImage} 
                        className="w-full h-full object-cover" 
                        alt={project.title}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-outline-variant/20">
                        <ImageIcon className="w-6 h-6 text-outline" />
                      </div>
                    )}
                  </div>

                  {/* Text descriptions */}
                  <div className="flex flex-col gap-1 min-w-0 text-left">
                    <h3 className="font-display font-semibold text-primary truncate text-sm sm:text-base">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-on-surface-variant font-mono text-[10px]">
                      <span>Added {project.addedDate}</span>
                      <span>•</span>
                      
                      {project.isFeatured && (
                        <span className="flex items-center gap-1 font-bold text-secondary">
                          <CheckSquare className="w-3 h-3 text-secondary" />
                          Featured
                        </span>
                      )}

                      {project.isPublished ? (
                        <span className="flex items-center gap-1 font-bold text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                          Live
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 font-semibold text-neutral-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                          Draft
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover operation triggers */}
                <div className="flex items-center gap-2 sm:w-auto justify-end mt-2 sm:mt-0 relative z-10 shrink-0">
                  <button 
                    onClick={() => handleStartEdit(project)}
                    className="p-2 text-on-surface-variant hover:text-primary hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer" 
                    title="Edit project structure"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project.id, project.title)}
                    className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-lg transition-colors cursor-pointer" 
                    title="Delete showcase"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>

              </motion.div>
            );
          })}
          
          {filteredProjects.length === 0 && (
            <div className="py-12 bg-white rounded-xl border border-outline-variant/20 text-center text-on-surface-variant space-y-2">
              <AlertCircle className="w-8 h-8 text-outline mx-auto stroke-1" />
              <p className="font-semibold text-sm">No showcase project meets criteria.</p>
              <p className="text-xs">Try clearing search parameters to discover other drafts.</p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
