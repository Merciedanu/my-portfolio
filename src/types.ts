export interface Project {
  id: string;
  title: string;
  description: string;
  liveUrl: string;
  repositoryUrl: string;
  techStack: string[];
  coverImage: string;
  isFeatured: boolean;
  isPublished: boolean;
  addedDate: string;
}

export interface HeroInfo {
  fullName: string;
  professionalTitle: string;
  tagline: string;
  location: string;
  bio: string;
  profilePhoto: string;
  cvName: string;
  cvLastUpdated: string;
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  url?: string;
}
