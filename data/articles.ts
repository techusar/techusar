export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Design Systems' | 'Engineering' | 'Philosophy' | 'Architecture';
  date: string;
  readTime: string;
  tags: string[];
  content: string[];
}

export const articlesData: Article[] = [
  {
    slug: 'swiss-typography-nextjs',
    title: 'The Mathematical Harmony of Swiss Typography in Next.js 15',
    excerpt:
      'How the rationalist proportions of Josef Müller-Brockmann and the Zurich school can be translated into CSS grid fractions, variable font axes, and sub-pixel optical alignments.',
    category: 'Design Systems',
    date: 'February 2026',
    readTime: '6 min read',
    tags: ['Typography', 'CSS Architecture', 'Swiss Design', 'Next.js 15'],
    content: [
      'In 1957, Max Miedinger and Eduard Hoffmann cut the first punches of Neue Haas Grotesk. Their core objective was simple yet revolutionary: create a typeface of absolute neutral clarity, where the visual form does not impose emotional static upon the content.',
      'Fast forward seven decades. Modern web development often mistakes complexity for craftsmanship. We throw arbitrary animations, gratuitous drop-shadows, and uncalibrated padding across viewport breakpoints.',
      'By anchoring a Next.js application to strict Swiss typography scales (e.g., Major Second 1.125 or Perfect Fourth 1.333), typography becomes structural scaffolding rather than decorative icing. Baseline grids align seamlessly with Tailwind utility scales, ensuring every paragraph, label, and heading sits on a predictable mathematical cadence.',
      'When code and typography share a common geometric language, interfaces feel solid, calm, and unmistakably premium.',
    ],
  },
  {
    slug: 'zero-drift-design-tokens',
    title: 'Zero-Drift Design Systems: Unifying Figma Tokens with TypeScript Enums',
    excerpt:
      'Bridging the design-engineering chasm by establishing a single source of truth that synchronizes Figma Variables directly to strict TypeScript types and CSS custom properties.',
    category: 'Engineering',
    date: 'January 2026',
    readTime: '8 min read',
    tags: ['TypeScript', 'Figma API', 'Design Tokens', 'CI/CD'],
    content: [
      'The traditional handoff between designers and engineers is where design systems bleed to death. A designer shifts a border radius from 12px to 16px in Figma, but the pull request is never filed. Months later, the design file and the production codebase represent two completely divergent realities.',
      'Zero-drift architecture fixes this at the root. By querying the Figma REST API during CI/CD build steps, design tokens (color variables, spacing intervals, elevation shadows, corner radii) are ingested as canonical JSON and compiled into strict TypeScript enums and CSS custom properties.',
      'Any mismatch immediately breaks the TypeScript compiler, preventing regressions before code merges to main.',
      'The result is total fidelity: what is approved in the design studio is guaranteed to render in the user’s browser pixel-for-pixel.',
    ],
  },
  {
    slug: 'fullstack-developer-graphic-design',
    title: 'Why Every Full-Stack Engineer Must Master Graphic Composition',
    excerpt:
      'Understanding negative space, optical kerning, and visual hierarchy makes you an exponentially better systems architect and frontend programmer.',
    category: 'Philosophy',
    date: 'December 2025',
    readTime: '5 min read',
    tags: ['Career', 'Full-Stack', 'UI/UX', 'Creativity'],
    content: [
      'Historically, software engineering treated visual design as a decorative afterthought—something you "apply" with CSS after the business logic has been written. This mental model is profoundly broken.',
      'Graphic composition is not decoration; it is information architecture made manifest. An engineer who understands optical weight will write cleaner component trees. They will anticipate layout shifts, respect responsive breakpoints instinctively, and eliminate visual clutter before writing a single line of state management.',
      'When an engineer possesses both vector design fluency and server-side systems knowledge, they eliminate communication bottlenecks. They can build a complete product from concept to production without waiting on multi-team sign-offs.',
    ],
  },
  {
    slug: 'high-performance-creative-edge',
    title: 'Architecting High-Speed Creative Marketplaces on the Edge',
    excerpt:
      'Techniques for delivering responsive preview sandboxes, sub-20ms TTFB template demos, and live code generation across distributed edge networks.',
    category: 'Architecture',
    date: 'November 2025',
    readTime: '7 min read',
    tags: ['Edge Computing', 'Next.js 15', 'Marketplace', 'Performance'],
    content: [
      'Digital marketplace visitors have zero patience for sluggish preview iframes and lagging theme switchers. If a template preview takes more than 500ms to initialize, conversion plummets by over 30%.',
      'In building the TechUsar Marketplace, we adopted an edge-first architecture. Rather than relying on bulky full-screen iframe reloads, our preview system dynamically swaps lightweight layout primitives and injects theme tokens on the client edge.',
      'Asset delivery utilizes Next.js automatic image optimization alongside modern AVIF compression, delivering crisp retina visuals at a fraction of standard payload sizes.',
      'Speed is the ultimate luxury in web software—and precision design deserves nothing less.',
    ],
  },
];
