export interface CVExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface CVProject {
  id: string;
  title: string;
  period: string;
  description: string;
}

export interface CVEducation {
  id: string;
  degree: string;
  institution?: string;
  period?: string;
  status: string;
}

export interface CVData {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  website: string;
  profile: string;
  skills: string[];
  languages: { language: string; proficiency: string }[];
  techTools: string[];
  experience: CVExperience[];
  projects: CVProject[];
  education: CVEducation[];
}

export const usmanCVData: CVData = {
  name: 'HAFIZ MUHAMMAD USMAN',
  title: 'GRAPHIC DESIGNER AND WEB DEVELOPER',
  phone: '+92 331 8917330',
  email: 'techusar17@gmail.com',
  location: 'Kharadar lyari, Karachi',
  website: 'tech-tools-new.vercel.app',
  profile:
    'Self-driven developer and designer with 5 years in graphic designing, 2 years in web development, and 1 year in backend development — despite being only 18. Independently built full-scale software including an Accounting + Inventory Management System and a mondaytools.com-style project tools website. Comfortable using AI tools and prompting to speed up development. Also a Hafiz-e-Quran.',
  skills: [
    'Graphic Designing',
    'Web Development',
    'Strategic Planning',
    'Problem Solving',
    'AI-Assisted Development',
    'AI Prompting',
  ],
  languages: [
    { language: 'Urdu', proficiency: 'Native' },
    { language: 'English', proficiency: 'Basic' },
  ],
  techTools: [
    'HTML/CSS',
    'JavaScript',
    'React',
    'Next.js',
    'PHP',
    '.Net (C#)',
    'Adobe Tools',
    'AI Tools',
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Graphic Designer',
      company: 'Freelance / Self-Employed',
      period: '2019 - NOW',
      bullets: [
        'Designed branding material, social media creatives, and UI mockups for various clients and personal projects',
        'Developed a strong visual sense for layout, color, and typography',
      ],
    },
    {
      id: 'exp-2',
      role: 'Web Developer',
      company: 'Work on Company',
      period: '2022 - NOW',
      bullets: [
        'Built responsive websites and web applications using modern frontend technologies',
        'Developed a tools/project-management website similar to mondaytools.com',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Accounting + Inventory Software',
      period: '2024 - NOW',
      description:
        'A complete business software handling accounts and stock/inventory management.',
    },
    {
      id: 'proj-2',
      title: 'AI-Assisted Software & Websites',
      period: '2024 - NOW',
      description:
        'Multiple websites and software built using AI tools and prompting to accelerate development.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Intermediate (First Year) — Commerce',
      period: 'In Progress',
      status: 'Completed First Year',
    },
    {
      id: 'edu-2',
      degree: 'Matriculation — Bio Science',
      period: '2025',
      status: 'Completed',
    },
    {
      id: 'edu-3',
      degree: 'Hafiz-e-Quran (Islamic Religious Education)',
      period: '',
      status: 'Completed',
    },
  ],
};
