import { z } from 'zod';

export const ContactMessageSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export type ContactMessageInput = z.infer<typeof ContactMessageSchema>;

export const ProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(5, "Description must be at least 5 characters"),
  liveUrl: z.string().trim().url("Invalid URL").or(z.literal("")),
  repositoryUrl: z.string().trim().url("Invalid URL").or(z.literal("")),
  techStack: z.array(z.string().trim()).min(1, "At least one tech stack item is required"),
  coverImage: z.string().trim().or(z.literal("")),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  addedDate: z.string().default(() => new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;

export const HeroInfoSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  professionalTitle: z.string().trim().min(2, "Title is required"),
  tagline: z.string().trim().min(5, "Tagline is required"),
  location: z.string().trim().min(2, "Location is required"),
  bio: z.string().trim().min(10, "Bio must be at least 10 characters"),
  profilePhoto: z.string().trim(),
  cvName: z.string().trim().min(1, "CV file name is required"),
  cvLastUpdated: z.string().trim(),
  email: z.string().trim().email().optional().or(z.literal("")),
  githubUrl: z.string().trim().url().optional().or(z.literal("")),
  linkedinUrl: z.string().trim().url().optional().or(z.literal("")),
});

export type HeroInfoInput = z.infer<typeof HeroInfoSchema>;

export const CertificationSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(2, "Title is required"),
  issuer: z.string().trim().min(2, "Issuer is required"),
  issueDate: z.string().trim().min(2, "Issue date is required"),
  url: z.string().trim().url().optional().or(z.literal("")),
});

export type CertificationInput = z.infer<typeof CertificationSchema>;

