
export interface Project {
  id?: string;
  title: string;
  description: string;
  tags?: string[];
  features?: string[];
  technologies?: string[];
  link?: string;
  image?: string;
  images?: string[];
  color?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  level: string; // Changed to string to support "Advanced", "Intermediate" text
  icon: React.ElementType;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  year: string;
  gpa?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  url?: string;
  image?: string;
}
