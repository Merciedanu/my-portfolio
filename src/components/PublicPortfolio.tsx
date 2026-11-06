"use client";

import React, { useState } from 'react';
import { Project, HeroInfo, Certification } from '@/types';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Code2, 
  ChevronRight, 
  Lock, 
  Layers, 
  Rocket, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Send,
  X,
  Menu,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PublicPortfolioProps {
  heroInfo: HeroInfo;
  projects: Project[];
  certifications: Certification[];
  onNavigateToLogin: () => void;
  onSendMessage: (name: string, email: string, subject: string, message: string) => void;
  isAdmin?: boolean;
}

export default function PublicPortfolio({
  heroInfo,
  projects,
  certifications,
  onNavigateToLogin,
  onSendMessage,
  isAdmin = false
}: PublicPortfolioProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      onSendMessage(contactName, contactEmail, contactSubject || 'General Inquiry', contactMessage);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Clear fields
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
      
      // Clear success notification
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 800);
  };

  const publishedProjects = projects.filter(p => p.isPublished);

  return (
    <div className="bg-background text-on-surface font-sans selection:bg-secondary-container selection:text-on-secondary-container min-h-screen flex flex-col">
      
      {/* Dynamic Notification Toast */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 z-50 bg-secondary text-white px-6 py-4 rounded-lg shadow-ambient-md flex items-center gap-3 border border-secondary-container"
          >
            <div className="bg-white/20 p-1.5 rounded-full">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-sm">Message Sent Successfully!</p>
              <p className="text-xs text-white/80">Admin notified in the CMS panel.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TopNavBar */}
      <nav id="navbar-public" className="bg-white/70 backdrop-blur-md border-b border-outline-variant/15 shadow-sm sticky top-0 z-40 flex justify-between items-center w-full px-6 md:px-12 h-20 transition-all">
        <div className="flex items-center gap-3">
          <a href="#" className="font-display text-xl md:text-2xl font-bold tracking-tight text-primary hover:opacity-85 transition-opacity">
            {heroInfo.fullName}
          </a>
        </div>
        
        {/* Desktop nav links */}
        <div className="hidden md:flex gap-8 items-center">
          <a className="text-on-surface-variant hover:text-primary transition-colors font-medium font-sans text-sm" href="#projects">Projects</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-medium font-sans text-sm" href="#about">About</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-medium font-sans text-sm" href="#skills">Certifications</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-medium font-sans text-sm" href="#contact">Contact</a>
        </div>
        
        {/* Navigation CTAs */}
        <div className="flex items-center gap-3">
          <a className="hidden md:inline-flex bg-primary text-white hover:bg-zinc-800 transition-colors px-6 py-2.5 rounded-lg text-xs font-mono tracking-wider transition-all font-semibold uppercase shadow-ambient-sm" href="#projects">
            View Projects
          </a>
          <button 
            onClick={onNavigateToLogin}
            title={isAdmin ? "Access Portfolio CMS" : "Admin Login"}
            className="p-2 sm:px-3 sm:py-2 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary hover:bg-neutral-50 transition-all flex items-center justify-center cursor-pointer text-xs font-mono"
          >
            <Lock className="w-3.5 h-3.5 text-secondary mr-1.5" />
            <span className="font-semibold text-primary">{isAdmin ? 'CMS Panel' : 'Admin'}</span>
          </button>
          
          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary p-2 hover:bg-neutral-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-outline-variant/20 absolute top-20 left-0 w-full z-30 px-6 py-6 flex flex-col gap-4 shadow-ambient-md text-center"
          >
            <a 
              className="text-on-surface-variant hover:text-primary py-2 transition-colors font-semibold font-sans text-base border-b border-neutral-50" 
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a 
              className="text-on-surface-variant hover:text-primary py-2 transition-colors font-semibold font-sans text-base border-b border-neutral-50" 
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              className="text-on-surface-variant hover:text-primary py-2 transition-colors font-semibold font-sans text-base border-b border-neutral-50" 
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
            >
              Certifications
            </a>
            <a 
              className="text-on-surface-variant hover:text-primary py-2 transition-colors font-semibold font-sans text-base border-b border-neutral-50" 
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <a 
              className="bg-primary text-white py-3 rounded-lg text-sm font-semibold tracking-wider font-mono uppercase" 
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
            >
              View Projects
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToLogin();
              }}
              className="flex items-center justify-center gap-2 text-on-surface-variant hover:text-primary py-2.5 text-xs font-mono border border-outline-variant/30 rounded-lg cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-secondary" />
              <span className="font-semibold text-primary">{isAdmin ? 'CMS Panel' : 'Admin Login'}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full flex flex-col items-center flex-1">
        
        {/* Section 1: Hero Section */}
        <section className="relative w-full min-h-[80vh] flex items-center justify-center pt-12 pb-20 px-6 md:px-12 overflow-hidden geometric-pattern border-b border-outline-variant/10">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
            
            {/* Left Col: Hero Headline Content */}
            <div className="md:col-span-7 flex flex-col gap-6 order-2 md:order-1 text-left">
              <div className="flex items-center gap-2">
                <span className="w-8 h-[2px] bg-secondary"></span>
                <span className="font-mono text-xs text-secondary font-semibold uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 inline text-secondary" />
                  Based in {heroInfo.location.split(',')[1]?.trim() || 'Kenya'}
                </span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-primary font-bold leading-tight tracking-tight">
                {heroInfo.fullName} <br/>
                <span className="text-on-surface-variant font-display text-2xl sm:text-3xl md:text-3xl font-semibold block mt-3">
                  {heroInfo.professionalTitle}
                </span>
              </h1>
              
              <p className="font-sans text-base sm:text-lg md:text-lg text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
                {heroInfo.tagline}
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <a 
                  className="bg-primary text-white hover:bg-secondary transition-colors duration-300 px-8 py-3.5 rounded-lg text-xs font-mono font-semibold tracking-wider shadow-ambient-sm flex items-center gap-2 uppercase" 
                  href="#projects"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </a>
                
                <a 
                  className="border border-secondary text-secondary hover:bg-secondary/5 transition-colors px-8 py-3.5 rounded-lg text-xs font-mono font-semibold tracking-wider flex items-center gap-2 uppercase" 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Initiating download of portfolio CV: ${heroInfo.cvName}`);
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
                
                <a 
                  className="text-on-surface-variant hover:text-primary transition-colors px-6 py-3.5 text-xs font-mono font-semibold tracking-wider flex items-center gap-2 uppercase" 
                  href="#contact"
                >
                  Contact Me
                </a>
              </div>
            </div>

            {/* Right Col: Portrait with floating badge */}
            <div className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2 mb-8 md:mb-0 relative">
              <div className="absolute -inset-4 bg-surface-container rounded-full blur-2xl opacity-40"></div>
              
              <div className="relative">
                <img 
                  className="w-60 h-60 sm:w-72 sm:h-72 lg:w-96 lg:h-96 object-cover rounded-full shadow-ambient-md relative z-10 border-4 border-white"
                  src={heroInfo.profilePhoto} 
                  alt="Mercy Ndanuportrait"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Badge (Clean Code Advocate) */}
                <motion.div 
                  initial={{ rotate: -5, scale: 0.9 }}
                  animate={{ rotate: 1, scale: 1 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 }}
                  className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white p-4 rounded-xl shadow-ambient-md border border-outline-variant/30 z-20 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                    <Code2 className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="text-left">
                    <p className="font-mono text-[10px] uppercase text-on-surface-variant font-medium tracking-wider">Clean Code</p>
                    <p className="font-sans text-xs font-semibold text-primary">Advocate</p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 2: About & Stats Section */}
        <section className="w-full py-20 px-6 md:px-12 bg-white border-b border-outline-variant/10" id="about">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 flex flex-col gap-6 text-left">
              <h2 className="font-display text-3xl md:text-4xl text-primary font-bold tracking-tight">
                Technical Rigor Meets Visinary Thinking.
              </h2>
              
              <div className="space-y-4">
                {heroInfo.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="font-sans text-base text-on-surface-variant leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Stats Bento Box Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-background p-6 rounded-xl border border-outline-variant/20 flex flex-col gap-2 relative overflow-hidden group hover:shadow-ambient-sm transition-all text-left">
                <div className="absolute -bottom-6 -right-6 text-surface-container-high group-hover:text-secondary/15 transition-all">
                  <Clock className="w-24 h-24 stroke-[0.5]" />
                </div>
                <span className="font-display text-4xl font-bold text-primary relative z-10">5+</span>
                <span className="font-mono text-xs uppercase font-medium text-on-surface-variant tracking-wider relative z-10">
                  Years Experience
                </span>
                <p className="text-xs text-on-surface-variant/80 mt-1 relative z-10">Focused on enterprise server performance & scalability.</p>
              </div>

              <div className="bg-background p-6 rounded-xl border border-outline-variant/20 flex flex-col gap-2 relative overflow-hidden group hover:shadow-ambient-sm transition-all text-left">
                <div className="absolute -bottom-6 -right-6 text-surface-container-high group-hover:text-secondary/15 transition-all">
                  <Rocket className="w-24 h-24 stroke-[0.5]" />
                </div>
                <span className="font-display text-4xl font-bold text-primary relative z-10">20+</span>
                <span className="font-mono text-xs uppercase font-medium text-on-surface-variant tracking-wider relative z-10">
                  Projects Shipped
                </span>
                <p className="text-xs text-on-surface-variant/80 mt-1 relative z-10">Successfully deployed robust platforms worldwide.</p>
              </div>

              <div className="sm:col-span-2 bg-primary text-white p-6 rounded-xl flex items-center justify-between overflow-hidden relative text-left">
                <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="flex flex-col gap-2 relative z-10">
                  <span className="font-display text-xl font-bold tracking-tight">Full-Stack Mastery</span>
                  <p className="font-sans text-xs text-white/80 max-w-md">
                    From relational database normalization & low-latency index architectures up to responsive client interfaces.
                  </p>
                </div>
                <Layers className="w-12 h-12 text-secondary-container relative shrink-0 z-10 ml-4 stroke-[1.5]" />
              </div>

            </div>
          </div>
        </section>

        {/* Section 3: Certifications Segment */}
        <section className="w-full py-16 px-6 md:px-12 bg-neutral-50/50 border-b border-outline-variant/10" id="skills">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left">
              <div>
                <span className="font-mono text-xs text-secondary font-semibold uppercase tracking-wider">Credentials</span>
                <h2 className="font-display text-2xl md:text-3xl text-primary font-bold tracking-tight mt-1">
                  Professional Certifications
                </h2>
              </div>
              <p className="font-sans text-sm text-on-surface-variant max-w-md mt-2 md:mt-0">
                Holding industry-recognized certifications validating advanced proficiency in cloud computing, platform security, and agile processes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {certifications.map((cert) => (
                <div 
                  key={cert.id}
                  className="bg-white p-5 rounded-xl border border-outline-variant/20 shadow-ambient-sm hover:border-secondary hover:shadow-ambient-md transition-all text-left flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-secondary/10 p-2 rounded-lg text-secondary shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-primary leading-tight text-sm">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant mt-1">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-neutral-100 pt-3 mt-4 text-[11px] font-mono text-on-surface-variant">
                    <span>Issued in {cert.issueDate}</span>
                    <span className="text-secondary font-semibold">Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Projects Showcase */}
        <section className="w-full py-20 px-6 md:px-12 bg-white border-b border-outline-variant/10" id="projects">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-xs text-secondary font-semibold uppercase tracking-widest bg-secondary/5 px-2.5 py-1 rounded-full border border-secondary/10">Showcase</span>
              <h2 className="font-display text-3xl md:text-4xl text-primary font-bold mt-3 tracking-tight">Engineered Solutions</h2>
              <p className="font-sans text-sm text-on-surface-variant mt-2 leading-relaxed">
                Explore live web and mobile solutions utilizing performant data pipelines, responsive viewports, and highly maintainable components.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedProjects.length === 0 ? (
                <div className="col-span-full py-12 text-center text-on-surface-variant">
                  <p className="font-medium text-lg">No projects published yet.</p>
                  <p className="text-sm mt-1">Visit the admin panel to draft & publish case studies.</p>
                </div>
              ) : (
                publishedProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="bg-background rounded-xl border border-outline-variant/20 shadow-ambient-sm overflow-hidden flex flex-col h-full group hover:shadow-ambient-md hover:border-secondary-container transition-all text-left"
                  >
                    {/* Cover image or placeholder container */}
                    <div className="aspect-video w-full bg-neutral-100 border-b border-outline-variant/10 relative overflow-hidden shrink-0">
                      {project.coverImage ? (
                        <img 
                          src={project.coverImage} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-white p-4 text-center select-none bg-pattern-subtle">
                          <Layers className="w-8 h-8 text-secondary mb-2" />
                          <span className="font-display font-semibold text-xs tracking-wide">Developer Documentation</span>
                          <span className="text-[10px] text-on-secondary-container opacity-90 mt-1">Ready for deploy</span>
                        </div>
                      )}
                      
                      {project.isFeatured && (
                        <div className="absolute top-3 left-3 bg-secondary text-white text-[10px] px-2.5 py-1 rounded-md font-mono font-semibold tracking-wider uppercase">
                          ★ Featured
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div className="space-y-3">
                        <h3 className="font-display text-lg font-bold text-primary group-hover:accent-text-gold transition-colors">
                          {project.title}
                        </h3>
                        <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-6 space-y-4 pt-4 border-t border-outline-variant/10">
                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech) => (
                            <span 
                              key={tech} 
                              className="bg-neutral-100 text-neutral-800 font-mono text-[10px] px-2 py-0.5 rounded border border-neutral-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Interactive CTAs */}
                        <div className="flex items-center justify-between text-xs font-mono pt-1">
                          {project.liveUrl ? (
                            <a 
                              href={project.liveUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-primary hover:text-secondary font-bold inline-flex items-center gap-1 hover:underline"
                            >
                              Launch demo
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-outline-variant">Demo Offline</span>
                          )}

                          {project.repositoryUrl ? (
                            <a 
                              href={project.repositoryUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-on-surface-variant hover:text-primary inline-flex items-center gap-1 hover:underline"
                            >
                              <Github className="w-3.5 h-3.5 inline text-on-surface-variant" />
                              Source
                            </a>
                          ) : (
                            <span className="text-outline-variant">Private Codebase</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </section>

        {/* Section 5: Beautiful Contact Form */}
        <section className="w-full py-20 px-6 md:px-12 bg-neutral-50/70" id="contact">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-ambient-md border border-outline-variant/30 overflow-hidden text-left">
            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Left sidebar banner */}
              <div className="md:col-span-4 bg-primary text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 top-0 opacity-10 bg-pattern"></div>
                
                <div className="space-y-4 relative z-10">
                  <span className="font-mono text-xs uppercase tracking-widest text-secondary-container font-semibold">GET IN TOUCH</span>
                  <h3 className="font-display text-2xl font-bold tracking-tight">Let's create something together.</h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Have an interesting project, consulting gig, or speaking engagement proposal? Reach out with a detailed message.
                  </p>
                </div>

                <div className="space-y-4 pt-8 md:pt-0 relative z-10 text-xs font-mono text-white/80">
                  {heroInfo.email && (
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-secondary-container" />
                      {heroInfo.email}
                    </p>
                  )}
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary-container" />
                    {heroInfo.location || "Nairobi, Kenya"}
                  </p>
                  
                  {(heroInfo.githubUrl || heroInfo.linkedinUrl) && (
                    <div className="flex gap-4 pt-4 border-t border-white/20">
                      {heroInfo.githubUrl && (
                        <a href={heroInfo.githubUrl} target="_blank" rel="noreferrer" className="hover:text-secondary-container transition-colors" title="GitHub Repository">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {heroInfo.linkedinUrl && (
                        <a href={heroInfo.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-secondary-container transition-colors" title="LinkedIn Profile">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right form controls */}
              <form onSubmit={handleSubmitContact} className="md:col-span-8 p-8 md:p-10 flex flex-col gap-5">
                <h4 className="font-display text-xl font-bold text-primary mb-2">Send a Message</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">Your Name <span className="text-secondary">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-neutral-50 border border-outline-variant/35 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-secondary transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">Email Address <span className="text-secondary">*</span></label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-neutral-50 border border-outline-variant/35 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-secondary transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Consultation details"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full bg-neutral-50 border border-outline-variant/35 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-secondary transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">Message Description <span className="text-secondary">*</span></label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Describe your project requirements or timeline..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-neutral-50 border border-outline-variant/35 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-secondary transition-all"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary text-white font-mono text-xs uppercase font-semibold tracking-wider py-4 mt-2 px-6 rounded-lg hover:bg-secondary transition-colors duration-300 flex justify-center items-center gap-2 group cursor-pointer"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-12 bg-white border-t border-outline-variant/15 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 items-center md:items-start mb-6 md:mb-0 text-left">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-primary">{heroInfo.fullName}</span>
            <button 
              onClick={onNavigateToLogin}
              title="CMS Panel Gateway"
              className="p-1.5 rounded-md opacity-20 hover:opacity-100 hover:bg-neutral-100 transition-all cursor-pointer"
            >
              <Lock className="w-3 h-3 text-neutral-600" />
            </button>
          </div>
          <p className="font-sans text-xs text-on-surface-variant">
            &copy; 2026 Developer Portfolio. Built with technical rigor.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          <a className="font-sans text-xs text-on-surface-variant hover:text-secondary transition-colors font-semibold" href="#">Privacy Policy</a>
          <a className="font-sans text-xs text-on-surface-variant hover:text-secondary transition-colors font-semibold" href="#">Terms of Service</a>
          {heroInfo.githubUrl && (
            <a className="font-sans text-xs text-on-surface-variant hover:text-secondary transition-colors font-semibold" href={heroInfo.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          )}
          {heroInfo.linkedinUrl && (
            <a className="font-sans text-xs text-on-surface-variant hover:text-secondary transition-colors font-semibold" href={heroInfo.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
          )}
        </div>
        
        <button 
          className="mt-8 md:mt-0 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-primary hover:text-secondary transition-colors font-semibold"
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          Back to Top
          <ArrowRight className="-rotate-90 w-4 h-4" />
        </button>
      </footer>

    </div>
  );
}
