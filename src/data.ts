import { Project, HeroInfo, Message, Certification } from '@/types';

export const INITIAL_HERO_INFO: HeroInfo = {
  fullName: "Mercy Ndanu",
  professionalTitle: "Software Developer",
  tagline: "Building scalable web & mobile solutions with a focus on impact and technical excellence. Specialized in high-performance full-stack engineering.",
  location: "Nairobi, Kenya",
  bio: "I am a full-stack developer passionate about building robust, scalable systems that solve complex problems gracefully. With a deep appreciation for both elegant frontend interfaces and performant backend architectures, I bridge the gap between user experience and technical execution.\n\nMy approach is rooted in clean code principles, continuous integration, and a commitment to delivering solutions that not only work seamlessly but also scale efficiently as demands grow.",
  profilePhoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeIw0Oipdb8sW84jV5QfIgkqTV7T4UdOtR_Hb6LznofINC7yORXldb_zVJcM6s1OZvY1scBwxYjqT2PGOYQQG6-UHrWPBdRVv7_ec2BDatvHIJUpihmdTx3Lv1u0Mp26heL834bWfNB92MewFuTsufIOmcm7V_NBbguyb_az_CS-53BGhpoIgmvZAf7FiAudVk2i0_QzGElfbsIV_fGhJhKXFEJFXV6ad_YeOuGg_ec7Aef4Xr-h7qXfSuQbyAIrSTQofZysx4yRFR",
  cvName: "MercyNdanu_CV_2026.pdf",
  cvLastUpdated: "June 12, 2026",
  email: "mercyndanu@tech.ke",
  githubUrl: "https://github.com/mercyndanu",
  linkedinUrl: "https://linkedin.com/in/mercyndanu"
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "E-Commerce Data Analytics",
    description: "A sleek, modern dashboard interface design featuring dark mode aesthetics with neon blue accents, displaying complex data visualization charts and graphs.",
    liveUrl: "https://analytics-demo.example.com",
    repositoryUrl: "https://github.com/mercyndanu/ecommerce-analytics",
    techStack: ["React", "Typescript", "D3.js", "Tailwind CSS"],
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQeJtXInZGpZjOTTMMNn1WqFjr1JzDkwqA7HGqzXeCGeV_R8pGMTeq_0b4kS827UXpftixfJXgf_P6p-RP1Uo6cPRs25wFaRjiwNlmU3P6J9GdyTyXxoHWkGChYQsgXVxP6SWNt-fbYaeFq5LMt0xjLriCxeVipv-n4MVktRbkn9ISJctIod_bsGQIk1-X6ia8oVfON2bzwNR_BrkuirXlorQW2ukOlGhBrp3tm_GD7xJC7KqjUULUFO_sOApPbC_wPS05bqej_VW_",
    isFeatured: true,
    isPublished: true,
    addedDate: "Oct 12, 2023"
  },
  {
    id: "proj-2",
    title: "Fintech Mobile App",
    description: "A comprehensive personal finance tracking application built with React Native and Node.js. Features real-time transaction syncing and AI-driven spending insights.",
    liveUrl: "https://demo.example.com",
    repositoryUrl: "https://github.com/mercyndanu/fintech-app",
    techStack: ["React Native", "Node.js", "PostgreSQL"],
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqKM3Mc2B9oq7aew8WbLdMiU4hXTg8ZSh_gI6l4QNDUWroQWsLCfpmCFhJePPxwtW8_v_Rc1gWq37o6TJtPYnFkBLuk7BCr6NZ9HrWxBKSwGno2fS2ovnUS46vL2YVcV9oeURRKVQ46S5Mpm4Ovkeg2X4dIUp5ibnjJmQtsiE8kqG1X1gAtZa-bPqRLgfwA1CrgSWUTbSjt7bkkMSTDfg1pmQDGI3_XIGMzb5rsCr2b-VFK6j3yIHbeZxzkm6G9ybVDF9lD4Zvab6k",
    isFeatured: true,
    isPublished: true,
    addedDate: "Nov 01, 2024"
  },
  {
    id: "proj-3",
    title: "Developer Blog Platform",
    description: "A developer-focused markdown publication engine featuring high performance static render, code block highlight, and customizable layouts.",
    liveUrl: "https://devblog.example.com",
    repositoryUrl: "https://github.com/mercyndanu/dev-blog",
    techStack: ["Vite", "Markdown", "Tailwind CSS"],
    coverImage: "",
    isFeatured: false,
    isPublished: false,
    addedDate: "Nov 05, 2023"
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "msg-1",
    name: "John Kamau",
    email: "john@safarihealth.co.ke",
    subject: "Full-stack Platform Development",
    message: "Hi Mercy, we loved your portfolio and your focus on technical rigor. We have an upcoming telehealth platform project based in Nairobi and would love to consult with you on the backend server architecture. Let us know when you are available for a call.",
    timestamp: "2026-06-15T10:30:00Z",
    isRead: false
  },
  {
    id: "msg-2",
    name: "Elena Rostova",
    email: "elena@techfin.global",
    subject: "Fintech Consultation",
    message: "Hello! We are looking for a software engineer to help optimize our real-time transactions syncing engine on our React Native application. Is your Fintech Mobile App open source or available for contract licensing? Thank you!",
    timestamp: "2026-06-16T14:45:00Z",
    isRead: false
  },
  {
    id: "msg-3",
    name: "David Mwangi",
    email: "david@mtech.co.ke",
    subject: "Speaker invitation at DevFest",
    message: "Greetings Mercy, we would love to invite you as a panel speaker for the 'Clean Architectures in production scaling' track. Your experience with complex backend architectures is highly relevant to our community.",
    timestamp: "2026-06-17T09:15:00Z",
    isRead: false
  },
  {
    id: "msg-4",
    name: "Sarah Chen",
    email: "sarah@eastventures.com",
    subject: "Investment / Tech Demo Review",
    message: "Excellent portfolio, Mercy! I'm an associate at East Ventures, and we keep close tabs on highly qualified developers in Kenya. Let us know if you're ever building startup products of your own.",
    timestamp: "2026-06-17T18:00:00Z",
    isRead: false
  }
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  { id: "cert-1", title: "AWS Solutions Architect Professional", issuer: "Amazon Web Services", issueDate: "2025" },
  { id: "cert-2", title: "Google Cloud Professional Cloud Architect", issuer: "Google Cloud", issueDate: "2024" },
  { id: "cert-3", title: "Professional Scrum Master I", issuer: "Scrum.org", issueDate: "2023" },
  { id: "cert-4", title: "MongoDB Certified Developer", issuer: "MongoDB", issueDate: "2023" },
];

const KEYS = {
  HERO_INFO: "portfolio_cms_hero_info",
  PROJECTS: "portfolio_cms_projects",
  MESSAGES: "portfolio_cms_messages",
  CERTIFICATIONS: "portfolio_cms_certifications"
};

export const loadHeroInfo = (): HeroInfo => {
  if (typeof window === 'undefined') return INITIAL_HERO_INFO;
  const data = localStorage.getItem(KEYS.HERO_INFO);
  if (data) {
    try { return JSON.parse(data); } catch { return INITIAL_HERO_INFO; }
  }
  return INITIAL_HERO_INFO;
};

export const saveHeroInfo = (info: HeroInfo): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.HERO_INFO, JSON.stringify(info));
};

export const loadProjects = (): Project[] => {
  if (typeof window === 'undefined') return INITIAL_PROJECTS;
  const data = localStorage.getItem(KEYS.PROJECTS);
  if (data) {
    try { return JSON.parse(data); } catch { return INITIAL_PROJECTS; }
  }
  return INITIAL_PROJECTS;
};

export const saveProjects = (projects: Project[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
};

export const loadMessages = (): Message[] => {
  if (typeof window === 'undefined') return INITIAL_MESSAGES;
  const data = localStorage.getItem(KEYS.MESSAGES);
  if (data) {
    try { return JSON.parse(data); } catch { return INITIAL_MESSAGES; }
  }
  return INITIAL_MESSAGES;
};

export const saveMessages = (messages: Message[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.MESSAGES, JSON.stringify(messages));
};

export const loadCertifications = (): Certification[] => {
  if (typeof window === 'undefined') return INITIAL_CERTIFICATIONS;
  const data = localStorage.getItem(KEYS.CERTIFICATIONS);
  if (data) {
    try { return JSON.parse(data); } catch { return INITIAL_CERTIFICATIONS; }
  }
  return INITIAL_CERTIFICATIONS;
};

export const saveCertifications = (certs: Certification[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.CERTIFICATIONS, JSON.stringify(certs));
};

export const resetPersistentData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEYS.HERO_INFO);
  localStorage.removeItem(KEYS.PROJECTS);
  localStorage.removeItem(KEYS.MESSAGES);
  localStorage.removeItem(KEYS.CERTIFICATIONS);
};
