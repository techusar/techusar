export type ThemeCategory =
  | 'All'
  | 'Landing Pages'
  | 'SaaS'
  | 'Portfolio'
  | 'E-commerce'
  | 'Dashboard'
  | 'Agency'
  | 'Personal'
  | 'Startup';

export type ThemeFilter = 'All' | 'Free' | 'Premium' | 'Featured' | 'Newest' | 'Popular';

export interface Theme {
  id: string;
  slug: string;
  name: string;
  description: string;
  tagline: string;
  category: ThemeCategory;
  price: number;
  isFree: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  technology: string[];
  previewImage: string;
  screenshots: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  demoUrl: string;
  purchaseUrl?: string;
  features: string[];
  sectionsIncluded: string[];
  releaseDate: string;
  version: string;
  downloadsCount: number;
  rating: number;
  license: string;
  overview: string;
  techStack: {
    framework: string;
    styling: string;
    animations: string;
    icons: string;
    typeSafety: string;
  };
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: 'Web App' | 'SaaS Platform' | 'Design System' | 'E-commerce' | 'Full-Stack';
  year: string;
  role: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  cover: string;
  gallery: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status?: 'live' | 'in_progress' | 'coming_soon';
  isWebDev?: boolean;
  isCustom?: boolean;
  challenge: string;
  approach: string;
  designDirection: string;
  developmentDetails: string;
  metrics: { label: string; value: string }[];
  keyFeatures: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface DesignProject {
  id: string;
  slug: string;
  title: string;
  category: 'Brand Identity' | 'UI/UX Design' | 'Visual System' | 'Logo Exploration' | 'Editorial & Print' | 'Marketing';
  year: string;
  client: string;
  cover: string;
  gallery: string[];
  description: string;
  brief: string;
  concept: string;
  tools: string[];
  colorPalette: { hex: string; name: string }[];
  typography: { family: string; role: string; sample: string }[];
  deliverables: string[];
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  items: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    context: string;
    iconName?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  focus: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
}
