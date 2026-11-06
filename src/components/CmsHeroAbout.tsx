"use client";

import React, { useState, useRef } from 'react';
import { HeroInfo } from '@/types';
import { 
  Home, 
  FileText, 
  MapPin, 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  List, 
  Upload, 
  Trash2,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Mail,
  Github,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CmsHeroAboutProps {
  heroInfo: HeroInfo;
  onSaveHeroInfo: (newInfo: HeroInfo) => void;
  onCancel: () => void;
}

export default function CmsHeroAbout({ heroInfo, onSaveHeroInfo, onCancel }: CmsHeroAboutProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState(heroInfo.fullName);
  const [professionalTitle, setProfessionalTitle] = useState(heroInfo.professionalTitle);
  const [tagline, setTagline] = useState(heroInfo.tagline);
  const [location, setLocation] = useState(heroInfo.location);
  const [bio, setBio] = useState(heroInfo.bio);
  const [email, setEmail] = useState(heroInfo.email || '');
  const [githubUrl, setGithubUrl] = useState(heroInfo.githubUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(heroInfo.linkedinUrl || '');
  
  // Extra elements
  const [profilePhoto, setProfilePhoto] = useState(heroInfo.profilePhoto);
  const [cvName, setCvName] = useState(heroInfo.cvName);
  const [cvLastUpdated, setCvLastUpdated] = useState(heroInfo.cvLastUpdated);
  
  const [showNotification, setShowNotification] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Maximum profile image size is 2MB to keep syncing fast. Please choose a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfilePhoto(event.target.result as string);
        }
      };
      reader.onerror = (err) => {
        console.error("FileReader failed reading device profile photo: ", err);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger Save Changes
  const handleSave = () => {
    if (!fullName || !professionalTitle) {
      alert("Name and Professional Title cannot be blank.");
      return;
    }

    const updatedInfo: HeroInfo = {
      fullName,
      professionalTitle,
      tagline,
      location,
      bio,
      profilePhoto,
      cvName,
      cvLastUpdated,
      email,
      githubUrl,
      linkedinUrl
    };

    onSaveHeroInfo(updatedInfo);
    
    // Play subtle success indicator
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  // Mock CV Delete and replacement upload simulation
  const handleDeleteCV = () => {
    if (window.confirm("Confirm deletion of current CV file? Clients will not be able to download your resume.")) {
      setCvName('');
      setCvLastUpdated('');
    }
  };

  const handleUploadCVMock = () => {
    const defaultName = `MercyNdanu_CV_Updated_${new Date().getFullYear()}.pdf`;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    setCvName(defaultName);
    setCvLastUpdated(today);
    alert(`Mock Upload Successful! Saved CV file: ${defaultName}`);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background relative font-sans text-left">
      
      {/* Background ambient shade layer */}
      <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-surface-container-high/20 to-transparent pointer-events-none z-0"></div>

      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-10 z-50 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-ambient-md flex items-center gap-2 border border-emerald-500"
          >
            <Check className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold">Hero & About metrics saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header title */}
      <header className="mb-8 w-full px-6 md:px-10 pt-6 shrink-0 z-10 sticky top-0 bg-background/90 backdrop-blur-md pb-4 border-b border-outline-variant/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 h-20">
        <div>
          <h2 className="font-display text-2xl font-bold text-primary tracking-tight">Hero & About Manager</h2>
          <p className="font-sans text-xs text-on-surface-variant">Configure the first impression of your portfolio. Update your core identity, tagline, and biographical narrative.</p>
        </div>
      </header>

      {/* Form content scrolling panel */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 z-10 pb-24 space-y-4">
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column forms */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Section Card: Hero Section */}
            <section className="bg-white rounded-xl border border-outline-variant/25 shadow-ambient-sm p-6 relative overflow-hidden text-left">
              <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none bg-pattern-subtle"></div>
              
              <h3 className="font-display font-bold text-primary text-base sm:text-lg mb-6 flex items-center gap-2">
                <Home className="w-5 h-5 text-secondary" />
                Hero Credentials
              </h3>

              <div className="space-y-6 relative z-10 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="block font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Full Name</label>
                    <input 
                      className="w-full bg-neutral-50 border border-outline-variant/35 rounded-lg px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-colors" 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="block font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Professional Title</label>
                    <input 
                      className="w-full bg-neutral-50 border border-outline-variant/35 rounded-lg px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-colors" 
                      type="text" 
                      value={professionalTitle}
                      onChange={(e) => setProfessionalTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="block font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Tagline (H1 Banner Text)</label>
                  <textarea 
                    rows={2}
                    className="w-full bg-neutral-50 border border-outline-variant/35 rounded-lg px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-colors resize-none" 
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="block font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Location / Geographic Region</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">
                      <MapPin className="w-4 h-4 text-outline" />
                    </span>
                    <input 
                      className="w-full bg-neutral-50 border border-outline-variant/35 rounded-lg pl-12 pr-4 py-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-colors font-medium" 
                      type="text" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="block font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Contact Email</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">
                        <Mail className="w-4 h-4 text-outline" />
                      </span>
                      <input 
                        className="w-full bg-neutral-50 border border-outline-variant/35 rounded-lg pl-12 pr-4 py-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-colors" 
                        type="email" 
                        placeholder="e.g. elishamuuo1@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="block font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">GitHub URL</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">
                        <Github className="w-4 h-4 text-outline" />
                      </span>
                      <input 
                        className="w-full bg-neutral-50 border border-outline-variant/35 rounded-lg pl-12 pr-4 py-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-colors" 
                        type="url" 
                        placeholder="https://github.com/..."
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="block font-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">LinkedIn URL</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">
                        <Linkedin className="w-4 h-4 text-outline" />
                      </span>
                      <input 
                        className="w-full bg-neutral-50 border border-outline-variant/35 rounded-lg pl-12 pr-4 py-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-colors" 
                        type="url" 
                        placeholder="https://linkedin.com/in/..."
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section Card: Narrative Biography rich editor mockup */}
            <section className="bg-white rounded-xl border border-outline-variant/25 shadow-ambient-sm p-6 relative overflow-hidden text-left">
              <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none bg-pattern-subtle"></div>
              
              <h3 className="font-display font-bold text-primary text-base sm:text-lg mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                Narrative Biography
              </h3>

              <div className="space-y-4 relative z-10">
                <div className="rounded-xl overflow-hidden border border-outline-variant/35 bg-neutral-50 flex flex-col focus-within:border-secondary transition-all">
                  
                  {/* Mock rich-text decoration toolbar */}
                  <div className="bg-neutral-100/70 border-b border-outline-variant/20 px-3 py-2 flex items-center gap-1.5 overflow-x-auto shrink-0 select-none">
                    <button 
                      type="button" 
                      onClick={() => setBio(bio + " **BoldText**")}
                      className="p-1.5 rounded hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                      title="Simulate bold typography"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setBio(bio + " *ItalicText*")}
                      className="p-1.5 rounded hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                      title="Simulate italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button 
                      type="button" 
                      className="p-1.5 rounded hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                      title="Simulate underline"
                    >
                      <Underline className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-neutral-300 mx-1.5"></div>
                    <button 
                      type="button" 
                      onClick={() => setBio(bio + " [Demo url](https://...)")}
                      className="p-1.5 rounded hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                      title="Simulate Link injection"
                    >
                      <Link className="w-4 h-4" />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setBio(bio + "\n- Item")}
                      className="p-1.5 rounded hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                      title="Simulate bullet item"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  <textarea 
                    className="w-full bg-white border-0 px-4 py-3 text-xs sm:text-sm text-on-surface focus:ring-0 focus:outline-none leading-relaxed resize-none" 
                    rows={8}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Provide a detailed chronicle of your developer origins, architectural frameworks, and engineering approach."
                  />
                </div>
              </div>
            </section>

          </div>

          {/* Right Column details */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Portrait configuration block */}
            <section className="bg-white rounded-xl border border-outline-variant/25 shadow-ambient-sm p-6 text-center">
              <h3 className="font-display font-bold text-primary text-sm mb-6 flex items-center gap-2 text-left">
                <ImageIcon className="w-4.5 h-4.5 text-secondary" />
                Profile Photo
              </h3>

              <div className="flex flex-col items-center space-y-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group cursor-pointer w-36 h-36 border-2 border-neutral-100 rounded-full overflow-hidden shadow-ambient-sm"
                  title="Click to upload standard image from your device"
                >
                  <img 
                    src={profilePhoto} 
                    alt="Active portrait"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/45 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-mono uppercase tracking-wider font-semibold">Upload Photo</span>
                  </div>
                </div>

                <div className="w-full">
                  <p className="text-[11px] font-mono text-on-surface-variant mb-3 leading-relaxed">
                    Recommended dimensions: 800x800px (JPG/PNG). Must be transparent or studio lit.
                  </p>
                  
                  <div className="flex flex-col gap-2">
                    {/* Hidden Native File Upload */}
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 bg-primary hover:bg-neutral-800 text-white font-mono text-xs uppercase font-bold rounded-lg transition-colors w-full flex items-center justify-center gap-1.5 cursor-pointer shadow-ambient-sm"
                    >
                      <Upload className="w-3.5 h-3.5 text-secondary-container" />
                      Upload From Device
                    </button>

                    <button 
                      onClick={() => {
                        const newUrl = prompt('Enter a custom portrait image URL link address:', profilePhoto);
                        if (newUrl) setProfilePhoto(newUrl);
                      }}
                      className="px-4 py-2 bg-neutral-150 border border-outline-variant/45 hover:border-primary text-primary font-mono text-[10px] uppercase font-bold rounded-lg transition-colors w-full flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Or Input URL instead
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* Resume CV Document Card block */}
            <section className="bg-white rounded-xl border border-outline-variant/25 shadow-ambient-sm p-6">
              <h3 className="font-display font-bold text-primary text-sm mb-6 flex items-center gap-2 text-left">
                <FileText className="w-4.5 h-4.5 text-secondary" />
                Curriculum Vitae
              </h3>

              <div className="space-y-4">
                {cvName ? (
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-outline-variant/30 text-left">
                    <div className="w-9 h-9 bg-neutral-200 rounded flex items-center justify-center text-on-surface-variant shrink-0">
                      <FileText className="w-5 h-5 text-red-600 shrink-0" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-xs font-semibold text-primary truncate" title={cvName}>
                        {cvName}
                      </p>
                      <p className="font-mono text-[9px] text-on-surface-variant mt-0.5 uppercase tracking-wider">
                        Updated {cvLastUpdated}
                      </p>
                    </div>
                    <button 
                      onClick={handleDeleteCV}
                      className="text-neutral-400 hover:text-error transition-colors shrink-0 p-1 cursor-pointer"
                      title="Remove current resume"
                    >
                      <Trash2 className="w-4 h-4 shrink-0 text-red-600" />
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-error-container/20 rounded-xl border border-error/15 text-center text-xs text-on-error-container">
                    No cv document resides on portal.
                  </div>
                )}

                <div 
                  onClick={handleUploadCVMock}
                  className="border-2 border-dashed border-outline-variant/40 rounded-xl p-6 text-center hover:bg-neutral-50 hover:border-primary transition-all cursor-pointer group"
                >
                  <Upload className="w-7 h-7 text-outline group-hover:text-primary transition-colors text-3xl mb-2 mx-auto" />
                  <p className="font-sans text-xs font-semibold text-primary mb-1">Upload New CV (PDF)</p>
                  <p className="font-mono text-[10px] text-on-surface-variant/85 uppercase tracking-wide">Max size: 5MB</p>
                </div>

              </div>
            </section>

          </div>

        </div>

        {/* Dynamic Action bar bottom segment */}
        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-outline-variant/20 flex flex-col-reverse sm:flex-row justify-end items-center gap-4 shrink-0">
          <button 
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-2.5 font-mono text-xs uppercase font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Cancel
          </button>
          
          <button 
            onClick={handleSave}
            className="w-full sm:w-auto px-8 py-2.5 bg-primary text-white hover:bg-neutral-800 font-mono text-xs uppercase font-bold rounded-lg transition-all shadow-ambient-sm cursor-pointer"
          >
            Save Changes
          </button>
        </div>

      </div>

    </div>
  );
}
