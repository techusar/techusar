import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      status: 200,
      brand: 'TechUsar',
      title: 'Graphic Designer & Full-Stack Developer',
      tagline: 'Where design meets development. Designing interfaces, building digital products.',
      philosophy: {
        design: 'Swiss Modernism, disciplined typography, mathematical grid systems, zero-drift tokens',
        engineering: 'Type-safe TypeScript, Next.js 15 App Router, React Server Components, Tailwind CSS v4, resilient distributed backends',
      },
      skills: {
        frontend: ['TypeScript', 'Next.js 15', 'React 19', 'Tailwind CSS v4', 'Framer Motion', 'Canvas/WebGL'],
        backend: ['Node.js', 'C# .NET', 'PostgreSQL', 'RESTful APIs', 'Docker', 'Edge Runtime'],
        design: ['Figma Token Architecture', 'Vector Graphics', 'Design Systems', 'Brand Identity', 'Print/Typography'],
      },
      stats: {
        marketplaceDownloads: 15400,
        coreWebVitalsAverage: '99/100',
        largestContentfulPaintMs: 84,
        productionUptime: '99.98%',
      },
      contact: {
        email: 'techusar17@gmail.com',
        phone: '+92 331 8917330',
        whatsapp: 'https://wa.me/923318917330',
        github: 'https://github.com/techusar',
        linkedin: 'https://linkedin.com/in/techusar',
      },
      timestamp: new Date().toISOString(),
      runtime: 'Edge Runtime / Node.js 20',
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'X-Powered-By': 'Next.js 15.5 & TechUsar Architecture Engine',
      },
    }
  );
}
