import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { EasterEggModal } from '@/components/ui/EasterEggModal';
import { SiteTracker } from '@/components/analytics/SiteTracker';
import { FloatingWhatsApp } from '@/components/navigation/FloatingWhatsApp';

export const metadata: Metadata = {
  metadataBase: new URL('https://techusar.dev'),
  title: {
    default: 'TechUsar — Graphic Designer & Full-Stack Developer | Custom AI Agents & Bot Builder',
    template: '%s | TechUsar',
  },
  description:
    'TechUsar is the official digital portfolio of Hafiz Muhammad Usman — Graphic Designer, Full-Stack Next.js Developer, and Custom AI Agent / Bot Builder based in Karachi, Pakistan. Explore web themes, free interactive CV builder, developer utilities, or hire us for custom bots and web software.',
  keywords: [
    'Hafiz Muhammad Usman',
    'TechUsar',
    'Graphic Designer Karachi',
    'Web Developer Pakistan',
    'Custom AI Agents',
    'Custom Bot Developer',
    'WhatsApp bot builder',
    'Telegram bot developer',
    'Next.js developer Karachi',
    'Lyari Karachi programmer',
    'Accounting inventory software Pakistan',
    'Interactive CV builder',
    'Hire freelance developer Pakistan',
    'Chote mote bots developer',
    'Full stack engineer Karachi',
    'Muhammad Usman Lyari',
  ],
  authors: [{ name: 'Hafiz Muhammad Usman', url: 'https://techusar.dev' }],
  creator: 'Hafiz Muhammad Usman',
  publisher: 'TechUsar',
  alternates: {
    canonical: 'https://techusar.dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'TechUsar — Graphic Designer, Full-Stack Developer & Custom AI Bot Builder',
    description:
      'Official portfolio of Hafiz Muhammad Usman. Explore web themes, developer tools, CV builder, and commission custom AI agents and automation bots.',
    type: 'website',
    url: 'https://techusar.dev',
    siteName: 'TechUsar',
    locale: 'en_US',
    images: [
      {
        url: 'https://techusar.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TechUsar — Hafiz Muhammad Usman Digital Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechUsar — Graphic Designer, Web Developer & Custom Bot Builder',
    description:
      'Portfolio, web theme store, interactive CV builder, and custom AI agent & bot development studio by Hafiz Muhammad Usman.',
    creator: '@TechUsar',
    images: ['https://techusar.dev/og-image.png'],
  },
};

const masterSchemaGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://techusar.dev/#person',
      name: 'Hafiz Muhammad Usman',
      alternateName: ['Muhammad Usman', 'Usman Attari', 'TechUsar'],
      jobTitle: 'Graphic Designer, Full-Stack Developer & AI Bot Engineer',
      description:
        'Self-driven developer and designer with 5 years in graphic design, 2 years in full-stack web development, and custom AI agent/bot engineering. Hafiz-e-Quran based in Kharadar Lyari, Karachi, Pakistan.',
      url: 'https://techusar.dev',
      email: 'techusar17@gmail.com',
      telephone: '+92-331-8917330',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kharadar Lyari',
        addressRegion: 'Karachi, Sindh',
        addressCountry: 'Pakistan',
      },
      knowsAbout: [
        'Graphic Design',
        'Full-Stack Web Development',
        'Next.js 15 & React',
        'Custom AI Agents & Bot Development',
        'WhatsApp & Telegram Bots',
        'Accounting & Inventory Software',
        'Adobe Illustrator & Photoshop',
        'TypeScript',
      ],
      sameAs: [
        'https://github.com/TechUsar',
        'https://linkedin.com',
        'https://tech-tools-new.vercel.app',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://techusar.dev/#business',
      name: 'TechUsar',
      url: 'https://techusar.dev',
      founder: {
        '@id': 'https://techusar.dev/#person',
      },
      description:
        'Bespoke digital product development, graphic brand identity, custom AI agents, automated bots, and web themes.',
      telephone: '+92-331-8917330',
      email: 'techusar17@gmail.com',
      priceRange: '$$',
      areaServed: ['Pakistan', 'Worldwide'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'TechUsar Digital Services & Solutions',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Web Design Services',
              url: 'https://techusar.dev/web-design',
              description:
                'Bespoke, conversion-focused responsive website design, typography systems, and modern landing pages.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Web Development Services',
              url: 'https://techusar.dev/web-development',
              description:
                'Production Next.js 15, React 19, and strict TypeScript software engineering with scalable databases.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Graphic Design & Brand Systems',
              url: 'https://techusar.dev/graphic-design',
              description:
                '5+ years crafting vector logomarks, Swiss typography systems, brand guidelines, and visual assets.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'UI/UX Design Services',
              url: 'https://techusar.dev/ui-ux-design',
              description:
                'Enterprise dashboards, interactive Figma prototyping, WCAG compliance, and tokenized design systems.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom AI Chatbots & Bot Development',
              url: 'https://techusar.dev/ai-bot-development',
              description:
                'Intelligent WhatsApp bots, Telegram notifiers, 24/7 AI customer support agents, and custom workflow automations.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Website Templates Marketplace',
              url: 'https://techusar.dev/templates',
              description:
                'Production-ready free and premium Next.js 15 website templates, SaaS starters, and minimal portfolios.',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://techusar.dev/#website',
      url: 'https://techusar.dev',
      name: 'TechUsar',
      publisher: {
        '@id': 'https://techusar.dev/#business',
      },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://techusar.dev/blog?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark scroll-smooth" data-theme="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('techusar-theme')||'dark';var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var isDark=t==='dark'||t==='matrix'||(t==='system'&&m);var root=document.documentElement;if(t==='matrix'){root.classList.add('dark','matrix');root.setAttribute('data-theme','matrix');}else if(isDark){root.classList.add('dark');root.classList.remove('matrix');root.setAttribute('data-theme','dark');}else{root.classList.remove('dark','matrix');root.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(masterSchemaGraph) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white bg-[#ffffff] dark:bg-[#050508] text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
        <ThemeProvider>
          <SiteTracker />
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <EasterEggModal />
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  );
}
