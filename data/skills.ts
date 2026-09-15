import { SkillCategory, ExperienceItem, EducationItem, CertificationItem } from '@/types';

export const skillsData: SkillCategory[] = [
  {
    category: 'Design & Visual Systems',
    description: 'Crafting intentional visual languages, vector geometry, design tokens, and editorial typography.',
    items: [
      { name: 'UI / UX Design', level: 'Expert', context: 'Systems, heuristics, micro-interactions, responsive architecture' },
      { name: 'Graphic Design', level: 'Expert', context: 'Editorial layout, poster design, Swiss grid systems, print craft' },
      { name: 'Brand Identity', level: 'Expert', context: 'Logomark exploration, brand guidelines, color theory, positioning' },
      { name: 'Design Systems', level: 'Expert', context: 'Token architecture, Figma Tokens API, Radix primitives, WCAG AAA' },
      { name: 'Motion Design', level: 'Advanced', context: 'Spring physics, layout transitions, CSS animation, Motion/Framer' },
      { name: 'Typography & Layout', level: 'Expert', context: 'Optical kerning, variable font pairing, baseline rhythm, print die-lines' },
    ],
  },
  {
    category: 'Frontend Engineering',
    description: 'Building snappy, accessible, and mathematically sound web experiences with modern frameworks.',
    items: [
      { name: 'React 19 & Next.js 15', level: 'Expert', context: 'App Router, React Server Components, Server Actions, suspense streaming' },
      { name: 'TypeScript', level: 'Expert', context: 'Strict typing, generic abstractions, AST parsing, utility types' },
      { name: 'Tailwind CSS', level: 'Expert', context: 'Tailwind v4, design token plugins, responsive layouts, zero runtime' },
      { name: 'JavaScript (ESNext)', level: 'Expert', context: 'Web Workers, Web Audio API, Canvas 2D, asynchronous concurrency' },
      { name: 'Responsive Web Design', level: 'Expert', context: 'Fluid typography, container queries, mobile touch ergonomics' },
      { name: 'State Management & Motion', level: 'Expert', context: 'Zustand, React Context, Motion (Framer), layout transitions' },
    ],
  },
  {
    category: 'Backend & Systems Engineering',
    description: 'Designing robust API contracts, high-concurrency gateways, and structured database architectures.',
    items: [
      { name: 'C# / .NET 9', level: 'Advanced', context: 'ASP.NET Core Web API, Entity Framework Core, background workers, LINQ' },
      { name: 'PHP 8.3 & Laravel', level: 'Advanced', context: 'RESTful services, Eloquent ORM, queue workers, transactional pipelines' },
      { name: 'Node.js & Edge Runtime', level: 'Expert', context: 'V8 internals, Express, Next.js API routes, Cloudflare Workers' },
      { name: 'PostgreSQL & SQL Server', level: 'Advanced', context: 'ACID transactions, indexed schemas, TimescaleDB, migrations' },
      { name: 'MySQL & Redis', level: 'Advanced', context: 'Pub/sub streaming, distributed cache, performance profiling' },
      { name: 'REST & WebSockets', level: 'Expert', context: 'Bidirectional streaming, event push, resilient reconnections' },
    ],
  },
  {
    category: 'Tooling & Creative Software',
    description: 'The creative and developer toolchain used daily to ideate, prototype, test, and ship.',
    items: [
      { name: 'Figma & FigJam', level: 'Expert', context: 'Components, auto-layout, interactive prototypes, variables' },
      { name: 'Adobe Creative Cloud', level: 'Expert', context: 'Illustrator (vector mastery), Photoshop, InDesign, After Effects' },
      { name: 'Git & GitHub', level: 'Expert', context: 'Semantic releases, CI/CD Actions, branch workflows, review discipline' },
      { name: 'VS Code & JetBrains', level: 'Expert', context: 'Rider, WebStorm, custom keybindings, debugging instrumentation' },
      { name: 'Docker & Containers', level: 'Proficient', context: 'Multi-stage Dockerfiles, compose environments, deployment packaging' },
      { name: 'Vercel & Cloudflare', level: 'Expert', context: 'Edge networks, preview deployments, DNS and domain routing' },
    ],
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Lead Designer & Principal Full-Stack Engineer',
    company: 'TechUsar Studio',
    location: 'Remote / Global',
    period: '2022 — Present',
    description: 'Operating an independent design and software engineering studio building bespoke digital products, brand identities, and high-conversion web themes for international clients.',
    achievements: [
      'Authored and published 8+ commercial web templates with over 15,000+ total downloads worldwide.',
      'Designed end-to-end brand identities and design systems for enterprise SaaS and Scandinavian architectural studios.',
      'Architected distributed client applications using Next.js 15, TypeScript, C#/.NET Core, and PostgreSQL.',
      'Maintained 100% on-time delivery across 24+ private client contracts with zero regressions.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'C# / .NET', 'PHP', 'PostgreSQL', 'Figma', 'Illustrator'],
  },
  {
    id: 'exp-2',
    role: 'Senior Product Designer & Frontend Lead',
    company: 'Kroma Systems',
    location: 'London / Hybrid',
    period: '2020 — 2022',
    description: 'Led a cross-functional squad of 8 engineers and 3 designers building an enterprise infrastructure observability dashboard.',
    achievements: [
      'Redesigned the flagship analytics console, reducing telemetry visualization latency from 320ms to 18ms.',
      'Established the organization-wide component library and Figma design tokens used across 4 core products.',
      'Spearheaded WCAG AAA accessibility compliance, winning internal product excellence distinction.',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'D3.js', 'Figma', 'Storybook', 'WebSockets'],
  },
  {
    id: 'exp-3',
    role: 'Full-Stack Developer & Brand Designer',
    company: 'Vortex Interactive',
    location: 'San Francisco, CA',
    period: '2018 — 2020',
    description: 'Developed custom web applications and bespoke visual identities for emerging tech startups and venture-backed founders.',
    achievements: [
      'Constructed 18+ high-converting marketing websites and custom Shopify/Laravel e-commerce platforms.',
      'Designed print collateral, poster campaigns, and investor pitch decks securing over $35M in client Series A funding.',
      'Mentored junior developers in TypeScript type safety and modern CSS architecture.',
    ],
    technologies: ['PHP / Laravel', 'JavaScript', 'MySQL', 'CSS3 / Sass', 'Adobe Illustrator', 'InDesign'],
  },
];

export const educationData: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'B.Sc. in Computer Science & Interactive Media',
    institution: 'Institute of Technology & Design',
    period: '2014 — 2018',
    focus: 'Dual focus in Distributed Systems, Algorithms, Graphic Communication, and Human-Computer Interaction.',
  },
];

export const certificationsData: CertificationItem[] = [
  {
    name: 'Microsoft Certified: Azure Developer Associate & .NET Architecture',
    issuer: 'Microsoft',
    year: '2023',
    credentialId: 'AZ-204-NET',
  },
  {
    name: 'Advanced Design Systems & Token Architecture',
    issuer: 'Interaction Design Foundation',
    year: '2022',
  },
  {
    name: 'Full-Stack Web Application Security & OWASP Standards',
    issuer: 'SANS Institute',
    year: '2021',
  },
];

export const currentExplorations: string[] = [
  'WebAssembly (Wasm) & Rust for real-time browser canvas rasterization',
  'Variable font axes orchestration via fluid physics spring drivers',
  'Local-first CRDT synchronization architectures using electric-sql and SQLite',
  'Fine-tuning custom typography vector models for generative packaging mockups',
  'Edge-rendered streaming micro-frontends with sub-5ms TTFB'
];

