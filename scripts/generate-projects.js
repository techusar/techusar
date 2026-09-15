import fs from 'fs';
import path from 'path';

const projectThemes = [
  {
    num: '01',
    variant: '002',
    slug: 'techusar-01-creative-agency-portfolio',
    title: 'Apex Studio — Creative Digital Agency & Portfolio',
    client: 'Apex Creative Lab',
    category: 'Web App',
    role: 'Lead UI/UX Designer & Full-Stack Architect',
    shortDescription: 'Cutting-edge digital agency showcase featuring smooth micro-interactions, dark aesthetic, and dynamic case study grids.',
    description: 'A high-performance modern web application engineered for creative agencies and design studios. Built with fluid layouts, interactive case study filters, dynamic project previews, and seamless mobile responsiveness.',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS v4', 'Motion', 'React 19'],
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
    challenge: 'Creating a high-impact visual agency portfolio that maintains sub-second page loads while rendering heavy media and interactive animations.',
    approach: 'Employed React Server Components and modern CSS hardware acceleration with optimized image lazy loading and glassmorphism styling.',
    designDirection: 'Dark futuristic luxury aesthetic with electric violet and crisp white typography.',
    developmentDetails: 'Built on Next.js App Router with client-side animation hooks and zero layout shifts.',
    metrics: [
      { label: 'PageSpeed Score', value: '99/100' },
      { label: 'Client Conversion', value: '+38%' },
      { label: 'Interaction Delay', value: '< 15ms' }
    ],
    keyFeatures: [
      'Interactive hero with dynamic typography and call-to-action triggers',
      'Filterable agency portfolio grid with instant tag switching',
      'WhatsApp consultation and direct lead generation form',
      'Fully responsive 4K-to-mobile adaptable layout'
    ]
  },
  {
    num: '02',
    variant: '001',
    slug: 'techusar-02-saas-metrics-dashboard',
    title: 'CloudPulse — Enterprise SaaS Analytics & Telemetry',
    client: 'CloudPulse Technologies',
    category: 'SaaS Platform',
    role: 'Full-Stack Developer & UI Architect',
    shortDescription: 'Real-time telemetry and cloud operational metrics dashboard with interactive charts and alerts.',
    description: 'Enterprise monitoring system displaying live server throughput, incident response metrics, and subscription billing graphs with lightning-fast query execution.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Lucide Icons'],
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    challenge: 'Visualizing thousands of telemetry data points without UI frame drops or high memory consumption.',
    approach: 'Implemented debounced chart rendering and modular widget cards with optimized state handling.',
    designDirection: 'Clean modern slate dashboard with neon cyan and amber status highlights.',
    developmentDetails: 'Client-side component architecture with modular widget pipelines and exportable reports.',
    metrics: [
      { label: 'Live Data Refresh', value: '100ms' },
      { label: 'Data Processing', value: '50k pts/sec' },
      { label: 'Uptime Reliability', value: '99.99%' }
    ],
    keyFeatures: [
      'Interactive multi-metric line and bar charts with time range toggles',
      'Real-time status alert feed and system health gauges',
      'Instant CSV and JSON report export utility',
      'Dark mode and high-contrast accessibility compliance'
    ]
  },
  {
    num: '03',
    variant: '001',
    slug: 'techusar-03-fintech-wealth-portal',
    title: 'Vanguard Wealth — Multi-Asset FinTech Investment Portal',
    client: 'Vanguard Financial Group',
    category: 'Full-Stack',
    role: 'Principal FinTech Engineer & UI Designer',
    shortDescription: 'Institutional wealth management portal with automated portfolio rebalancing and risk simulation.',
    description: 'A secure financial technology application providing family offices and investors with real-time portfolio analytics, dividend schedules, and asset allocation breakdowns.',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Financial APIs'],
    cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
    challenge: 'Balancing complex mathematical data modeling with a clear, trustworthy, and accessible financial UI.',
    approach: 'Engineered an intuitive card-based layout featuring high-contrast monetary typography and automated risk calculations.',
    designDirection: 'Swiss precision typography, emerald prosperity accents, and crisp card dividers.',
    developmentDetails: 'Built with strict decimal arithmetic and client-side simulation calculators.',
    metrics: [
      { label: 'Assets Visualized', value: '$120M+' },
      { label: 'Calculation Latency', value: '< 5ms' },
      { label: 'Client Satisfaction', value: '98%' }
    ],
    keyFeatures: [
      'Interactive asset allocation donut chart with dynamic weighting',
      'Historical performance timeline with benchmark comparisons',
      'Automated tax-loss harvesting and profit margin projections',
      'Direct WhatsApp advisor booking channel'
    ]
  },
  {
    num: '03',
    variant: '002',
    slug: 'techusar-03-002-luxury-ecommerce-store',
    title: 'LuxeLiving — High-End Lifestyle & Furniture E-Commerce',
    client: 'LuxeLiving Retail Co.',
    category: 'E-commerce',
    role: 'E-commerce Specialist & Frontend Developer',
    shortDescription: 'Immersive online store for luxury home decor with high-resolution galleries and one-click cart checkout.',
    description: 'A boutique shopping experience designed to convert affluent buyers. Features dynamic product filtering, interactive 360-style galleries, quick-cart sidebars, and direct WhatsApp order inquiries.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Zustand', 'Stripe Ready'],
    cover: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
    challenge: 'Providing ultra-smooth product browsing and instant cart operations without slow page reloads.',
    approach: 'Used optimistic state management and instant drawer previews for immediate user gratification.',
    designDirection: 'Warm minimalist neutral palette with serif headings and generous editorial spacing.',
    developmentDetails: 'Optimized product asset pipelines with responsive image sizes and responsive touch gestures.',
    metrics: [
      { label: 'Checkout Conversion', value: '4.8%' },
      { label: 'Average Order Value', value: '$420' },
      { label: 'Mobile Load Time', value: '0.8s' }
    ],
    keyFeatures: [
      'Interactive product catalog with color, size, and category filters',
      'Slide-over shopping cart with instant subtotal and tax calculation',
      'One-click WhatsApp order confirmation and inquiry button',
      'Customer reviews and rating breakdown module'
    ]
  },
  {
    num: '04',
    variant: '001',
    slug: 'techusar-04-medicare-health-clinic',
    title: 'MediCare Plus — Modern Healthcare Clinic & Booking Portal',
    client: 'MediCare Healthcare Group',
    category: 'Web App',
    role: 'Full-Stack Developer',
    shortDescription: 'Patient-centric medical clinic portal with online doctor appointments and digital service guides.',
    description: 'A clean, HIPAA-conscious medical website engineered to help patients find specialist physicians, explore treatments, schedule clinic visits, and access emergency consultation lines.',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Lucide React'],
    cover: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop',
    challenge: 'Ensuring absolute clarity, accessibility, and high contrast for elderly and distressed medical patients.',
    approach: 'Designed clear typographic hierarchies, prominent emergency phone and WhatsApp buttons, and intuitive booking steps.',
    designDirection: 'Trust-inspiring medical blue and clean white with calming mint accents.',
    developmentDetails: 'Static pre-rendering for lightning-fast doctor profiles and department listings.',
    metrics: [
      { label: 'Online Appointments', value: '1,400+/mo' },
      { label: 'Bounce Rate', value: '24%' },
      { label: 'Patient Retention', value: '92%' }
    ],
    keyFeatures: [
      'Doctor directory with specialty filtering and qualification credentials',
      'Interactive appointment booking widget with time-slot selection',
      'Instant WhatsApp emergency hotline integration',
      'Patient preparation guides and treatment pricing transparently displayed'
    ]
  },
  {
    num: '05',
    variant: '001',
    slug: 'techusar-05-real-estate-property-hub',
    title: 'Skyline Estates — Premium Real Estate & Property Marketplace',
    client: 'Skyline Realty Partners',
    category: 'Web App',
    role: 'Lead Frontend Engineer & UI Architect',
    shortDescription: 'Luxury property listing platform with dynamic search filters, virtual tour cards, and agent contact links.',
    description: 'An architectural property portal showcasing residential towers, commercial offices, and luxury villas with interactive price calculators, neighborhood amenity badges, and instant WhatsApp booking.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Leaflet Ready', 'Motion'],
    cover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    challenge: 'Displaying comprehensive property specs and photo galleries seamlessly across all devices.',
    approach: 'Created modular property cards with badge overlays for pricing, bedrooms, square footage, and status.',
    designDirection: 'Architectural charcoal and champagne gold accents with high-resolution imagery.',
    developmentDetails: 'Client-side query filtering by location, price range, property type, and bedroom count.',
    metrics: [
      { label: 'Lead Inquiries', value: '+64%' },
      { label: 'Time on Site', value: '4m 12s' },
      { label: 'Mobile Traffic', value: '78%' }
    ],
    keyFeatures: [
      'Multi-parameter property search (Price, Beds, Baths, Location, Type)',
      'High-resolution image gallery with fullscreen lightbox preview',
      'Mortgage EMI calculator directly integrated on listing pages',
      'Instant WhatsApp agent connection for private property showings'
    ]
  },
  {
    num: '06',
    variant: '001',
    slug: 'techusar-06-culinary-restaurant-bistro',
    title: 'Savoria Bistro — Artisanal Restaurant & Online Menu Hub',
    client: 'Savoria Hospitality Group',
    category: 'Web App',
    role: 'Creative UI Designer & Web Developer',
    shortDescription: 'Gourmet restaurant web app featuring interactive digital menus, chef specials, and table reservations.',
    description: 'An appetizing culinary web application designed for fine dining restaurants. Features categorized dietary menus (Vegan, Gluten-Free, Chef Specials), online table reservation forms, and direct WhatsApp takeaway ordering.',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Lucide React'],
    cover: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
    challenge: 'Inspiring culinary appetite through photography while ensuring quick menu browsing on mobile networks.',
    approach: 'Optimized high-fidelity food imagery with lazy loading and clean typography for ingredients and prices.',
    designDirection: 'Warm ambient dark charcoal with golden amber highlights and elegant typography.',
    developmentDetails: 'Built with categorized tab switching and one-touch telephone/WhatsApp reservation hooks.',
    metrics: [
      { label: 'Table Reservations', value: '850+/mo' },
      { label: 'Takeaway Inquiries', value: '+45%' },
      { label: 'Mobile Conversion', value: '6.2%' }
    ],
    keyFeatures: [
      'Interactive categorized menu with spice levels, dietary tags, and pricing',
      'Online table booking form with party size and calendar picker',
      'Direct WhatsApp takeaway food ordering system',
      'Customer reviews and food critic accolade showcase'
    ]
  },
  {
    num: '07',
    variant: '001',
    slug: 'techusar-07-fitpulse-gym-fitness-studio',
    title: 'FitPulse Studio — Modern Fitness Gym & Class Booking',
    client: 'FitPulse Athletic Club',
    category: 'Web App',
    role: 'Frontend Developer & UI Designer',
    shortDescription: 'High-energy fitness portal with membership tiers, trainer bios, and class schedules.',
    description: 'A dynamic athletic studio website built to convert gym memberships. Includes weekly class schedules (HIIT, Yoga, Strength), personal trainer profiles, and WhatsApp free trial passes.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Motion'],
    cover: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop',
    challenge: 'Conveying intensity and motivation while keeping class timetables clean and legible.',
    approach: 'Used high-contrast neon accents, action photography, and a weekly interactive schedule table.',
    designDirection: 'Bold athletic dark theme with electric lime and crimson energy accents.',
    developmentDetails: 'Optimized interactive schedule grid with filter by workout type and trainer.',
    metrics: [
      { label: 'Free Trial Signups', value: '320+/mo' },
      { label: 'Membership Growth', value: '+28%' },
      { label: 'Mobile Bounce Rate', value: '21%' }
    ],
    keyFeatures: [
      'Interactive weekly class timetable with category filters',
      'Membership pricing comparison table with monthly/annual toggle',
      'Trainer profiles with specialties and certifications',
      'Instant WhatsApp free day-pass pass claim button'
    ]
  },
  {
    num: '08',
    variant: '001',
    slug: 'techusar-08-nexus-edutech-lms-platform',
    title: 'EduNexus — Online Learning & Interactive Course Academy',
    client: 'Nexus Education Inc.',
    category: 'Web App',
    role: 'Full-Stack Developer & Course UI Specialist',
    shortDescription: 'Educational course hub with curriculum outlines, instructor bios, student reviews, and enrollment.',
    description: 'A comprehensive e-learning platform where students browse technical bootcamps, view lesson syllabi, watch preview videos, and enroll directly via WhatsApp and online checkout.',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Video Embeds'],
    cover: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1600&auto=format&fit=crop',
    challenge: 'Structuring dense educational course curricula into digestible, engaging lesson modules.',
    approach: 'Created accordion curriculum trees, progress indicators, and prominent enrollment CTAs.',
    designDirection: 'Engaging modern sapphire and indigo with clean white content cards.',
    developmentDetails: 'Optimized course metadata and schema for Google Course Search indexing.',
    metrics: [
      { label: 'Active Learners', value: '12,000+' },
      { label: 'Course Completion', value: '78%' },
      { label: 'Enrollment Rate', value: '5.6%' }
    ],
    keyFeatures: [
      'Comprehensive course curriculum accordion with module breakdown',
      'Instructor bio cards with credentials and student ratings',
      'WhatsApp student counselor consultation link',
      'Student certificate verification showcase'
    ]
  },
  {
    num: '09',
    variant: '001',
    slug: 'techusar-09-logix-cargo-freight-tracker',
    title: 'LogixCargo — Global Logistics & Shipment Tracking Portal',
    client: 'Logix International Freight',
    category: 'Web App',
    role: 'Principal Full-Stack Developer',
    shortDescription: 'Worldwide freight tracking, container rate calculator, and customs logistics portal.',
    description: 'An industrial logistics platform providing shippers and importers with real-time consignment status, ocean/air freight quote estimates, and customs brokerage inquiry workflows.',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    cover: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop',
    challenge: 'Allowing customers to quickly track multi-modal shipments with zero friction.',
    approach: 'Placed a high-visibility tracking input front-and-center with status milestone progress bars.',
    designDirection: 'Industrial navy blue and safety orange with high-contrast data tables.',
    developmentDetails: 'API-driven tracking lookup engine with instant status validation.',
    metrics: [
      { label: 'Tracking Lookups', value: '45k+/mo' },
      { label: 'Quote Requests', value: '+52%' },
      { label: 'Customer Support Load', value: '-35%' }
    ],
    keyFeatures: [
      'Live container and airway bill tracking search bar',
      'Instant freight rate calculator by weight and volume (CBM)',
      'Customs clearance document checklist guide',
      'Direct WhatsApp logistics manager hotline'
    ]
  },
  {
    num: '10',
    variant: '001',
    slug: 'techusar-10-lexis-legal-attorneys-portal',
    title: 'Lexis & Partners — Corporate Law Firm & Legal Advisors',
    client: 'Lexis Legal Group',
    category: 'Web App',
    role: 'Lead UI/UX Designer & Web Developer',
    shortDescription: 'Distinguished law firm portal showcasing corporate legal practices, attorney profiles, and consultation booking.',
    description: 'A prestigious legal counsel website engineered for corporate attorneys and barristers. Highlights practice areas (M&A, Intellectual Property, Litigation), partner biographies, and confidential case evaluation requests.',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Lucide React'],
    cover: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600&auto=format&fit=crop',
    challenge: 'Communicating authority, confidentiality, and legal prowess without overwhelming lay clients.',
    approach: 'Crafted structured practice area cards and confidential consultation intake workflows.',
    designDirection: 'Refined deep navy and muted gold serif styling with ample white space.',
    developmentDetails: 'Built with server-side rendered practice briefs and encrypted contact routing.',
    metrics: [
      { label: 'Case Inquiries', value: '180+/mo' },
      { label: 'Client Trust Score', value: '99%' },
      { label: 'Average Retainer', value: '$8,500' }
    ],
    keyFeatures: [
      'Comprehensive practice area breakdowns with precedent case studies',
      'Partner and associate attorney credentials and bar admissions',
      'Confidential consultation request form with document upload hint',
      'Direct WhatsApp legal clerk inquiry channel'
    ]
  }
];

// Generate the remaining projects up to 50
const categories = ['Web App', 'SaaS Platform', 'E-commerce', 'Full-Stack', 'Design System'];
const industries = [
  { name: 'Automotive & Luxury Cars Dealership', cover: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop', tag: 'Automotive' },
  { name: 'Modern Architecture & Interior Studio', cover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop', tag: 'Architecture' },
  { name: 'Hotel & Luxury Resort Booking Hub', cover: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop', tag: 'Hospitality' },
  { name: 'Dental Care & Orthodontic Specialists', cover: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop', tag: 'Healthcare' },
  { name: 'Event Management & Conference Summit', cover: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop', tag: 'Events' },
  { name: 'Digital Marketing & SEO Growth Engine', cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop', tag: 'Marketing' },
  { name: 'Cybersecurity & Zero-Trust Cloud Guard', cover: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop', tag: 'Security' },
  { name: 'Crypto Asset Tracker & DeFi Telemetry', cover: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1600&auto=format&fit=crop', tag: 'FinTech' },
  { name: 'Co-Working Space & Hot Desk Booking', cover: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop', tag: 'Workspaces' },
  { name: 'Artisanal Bakery & Gourmet Patisserie', cover: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1600&auto=format&fit=crop', tag: 'Food & Beverage' },
  { name: 'Solar Energy & Green Power Solutions', cover: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1600&auto=format&fit=crop', tag: 'CleanTech' },
  { name: 'Smart Home Automation & IoT Control', cover: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1600&auto=format&fit=crop', tag: 'IoT' },
  { name: 'Travel Agency & Adventure Tour Planner', cover: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop', tag: 'Travel' },
  { name: 'Pet Care & Veterinary Wellness Center', cover: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1600&auto=format&fit=crop', tag: 'Pet Care' },
  { name: 'Modern Barbershop & Grooming Lounge', cover: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1600&auto=format&fit=crop', tag: 'Lifestyle' },
  { name: 'Organic Farming & Fresh Harvest Delivery', cover: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop', tag: 'Agriculture' },
  { name: 'Music Production & Recording Studio', cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop', tag: 'Audio' },
  { name: 'Fashion Brand & Runway Collection', cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop', tag: 'Fashion' },
  { name: 'Construction & Civil Engineering Firm', cover: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1600&auto=format&fit=crop', tag: 'Construction' },
  { name: 'Non-Profit Charity & Global Aid Mission', cover: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop', tag: 'Non-Profit' }
];

const allProjects = [...projectThemes];

for (let i = 11; i <= 50; i++) {
  const numStr = i.toString().padStart(2, '0');
  const ind = industries[(i - 11) % industries.length];
  const cat = categories[i % categories.length];
  const slug = `techusar-${numStr}-${ind.tag.toLowerCase().replace(/[^a-z0-9]/g, '-')}-platform`;
  
  allProjects.push({
    num: numStr,
    variant: '001',
    slug,
    title: `TechUsar #${numStr} — ${ind.name}`,
    client: `${ind.tag} Global Enterprise`,
    category: cat,
    role: 'Lead Architect & Full-Stack Engineer',
    shortDescription: `Custom responsive web application engineered for ${ind.name} with instant live demo, clean Next.js code, and WhatsApp template downloads.`,
    description: `A production-ready digital application built by Hafiz Muhammad Usman (TechUsar) for the ${ind.name} vertical. Packed with modern UI components, lightning-fast Core Web Vitals, dynamic data states, and WhatsApp direct ordering/inquiry channels.`,
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS v4', 'Motion', 'React 19'],
    cover: ind.cover,
    challenge: `Creating an industry-specific user experience that maximizes customer acquisition, load speed, and search engine visibility.`,
    approach: `Structured accessible layouts with micro-interactions, responsive grids, and instant lead capture forms.`,
    designDirection: `Modern high-contrast aesthetic with custom typography pairings and bespoke color accents.`,
    developmentDetails: `Full TypeScript type-safety with component modularity, SEO JSON-LD schema, and zero cumulative layout shift.`,
    metrics: [
      { label: 'Lighthouse Performance', value: '98+' },
      { label: 'Mobile Conversion', value: '+40%' },
      { label: 'SEO Visibility', value: 'Top 5' }
    ],
    keyFeatures: [
      `Bespoke ${ind.tag} interface tailored to customer conversion journeys`,
      'Instant WhatsApp consultation and free template source download button',
      'Mobile-first responsive architecture with smooth scroll behaviors',
      'Optimized meta tags, OpenGraph previews, and Schema.org structured data'
    ]
  });
}

// Convert all into final Project schema
const finalProjects = allProjects.map((p, index) => {
  const netlifyUrl = `https://techusar-${p.num}-${p.variant}.netlify.app`;
  return {
    id: p.slug,
    slug: p.slug,
    projectNumber: p.num,
    title: p.title,
    client: p.client,
    category: p.category,
    year: '2025',
    role: p.role,
    shortDescription: p.shortDescription,
    description: p.description,
    technologies: p.technologies,
    cover: p.cover,
    gallery: [
      p.cover,
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop'
    ],
    liveUrl: netlifyUrl,
    githubUrl: 'https://github.com/techusar',
    featured: index < 6,
    status: 'live',
    isWebDev: true,
    challenge: p.challenge,
    approach: p.approach,
    designDirection: p.designDirection,
    developmentDetails: p.developmentDetails,
    metrics: p.metrics,
    keyFeatures: p.keyFeatures
  };
});

const output = { projects: finalProjects };

fs.writeFileSync(
  path.join(process.cwd(), 'data/projects.json'),
  JSON.stringify(output, null, 2),
  'utf-8'
);

console.log(`Successfully generated ${finalProjects.length} projects in data/projects.json`);
