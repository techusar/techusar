export interface ToolData {
  slug: string;
  id: 'invoice' | 'margin' | 'emi' | 'hourly' | 'json' | 'base64' | 'shadow' | 'uuid';
  name: string;
  shortTitle: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  category: 'accountant' | 'developer';
  categoryLabel: string;
  tag: string;
  introduction: string;
  whatItDoes: string[];
  whoItIsFor: string[];
  howToUse: string[];
  examples: {
    title: string;
    input: string;
    output: string;
    explanation: string;
  }[];
  useCases: {
    title: string;
    desc: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
  relatedToolSlugs: string[];
}

export const toolsData: ToolData[] = [
  {
    slug: 'json-formatter',
    id: 'json',
    name: 'JSON Formatter & Validator',
    shortTitle: 'JSON Formatter',
    seoTitle: 'JSON Formatter Online — Free JSON Validator & Prettifier | TechUsar',
    metaDescription:
      'Free online JSON Formatter and Validator. Prettify messy JSON, minify payloads, validate syntax, fix missing quotes, and inspect API responses instantly in your browser.',
    h1: 'JSON Formatter & Validator Online',
    category: 'developer',
    categoryLabel: 'Developer Tools',
    tag: 'APIs & Web Dev',
    introduction:
      'JSON (JavaScript Object Notation) is the standard data interchange format for modern APIs, web applications, and databases. When working with serialized network payloads or minified log files, human readability is often compromised. TechUsar’s JSON Formatter & Validator provides a zero-latency, client-side environment to prettify, validate, minify, and inspect JSON structures securely without your data ever leaving your browser.',
    whatItDoes: [
      'Formats unreadable minified JSON into structured, indented hierarchies (2 or 4 spaces).',
      'Validates strict JSON syntax (RFC 8259) and identifies the exact line and character position of syntax errors.',
      'Minifies formatted JSON into a single compact line to minimize network payload size.',
      'Cleans up escaped characters and validates nested arrays, objects, booleans, and nulls.',
      'Provides one-click clipboard copying and instant payload statistics (character count, byte weight).',
    ],
    whoItIsFor: [
      'Frontend developers integrating REST and GraphQL endpoints.',
      'Backend engineers debugging API responses and database documents.',
      'QA testers verifying webhooks, payloads, and schema compliance.',
      'DevOps teams inspecting config files and container health metrics.',
    ],
    howToUse: [
      'Paste your raw, minified, or unformatted JSON text into the input editor.',
      'Click "Format JSON" to expand the payload with readable indentations and hierarchy.',
      'If your JSON contains syntax errors (such as trailing commas or unquoted keys), review the instant error feedback with line numbers.',
      'Click "Minify JSON" if you need to compress the payload for network transfer.',
      'Click "Copy to Clipboard" to paste the valid result directly into your code editor or API client.',
    ],
    examples: [
      {
        title: 'Formatting Raw Minified API Response',
        input: '{"status":"success","code":200,"data":{"user":{"id":42,"username":"techusar","roles":["admin","editor"]}}}',
        output: `{\n  "status": "success",\n  "code": 200,\n  "data": {\n    "user": {\n      "id": 42,\n      "username": "techusar",\n      "roles": [\n        "admin",\n        "editor"\n      ]\n    }\n  }\n}`,
        explanation:
          'Transforms a single-line compact response into a clean, human-scannable object tree.',
      },
      {
        title: 'Identifying Trailing Comma Defects',
        input: '{\n  "item": "Nexus SaaS",\n  "price": 49,\n}',
        output: 'SyntaxError: Unexpected token } in JSON at position 34',
        explanation:
          'Strict JSON does not allow trailing commas after the last key-value pair. The validator pinpoints the defect instantly.',
      },
    ],
    useCases: [
      {
        title: 'API Integration Debugging',
        desc: 'Inspect responses from third-party services (Stripe, OpenAI, Supabase) to verify expected properties before writing TypeScript interfaces.',
      },
      {
        title: 'Configuration File Verification',
        desc: 'Validate tsconfig.json, package.json, or Docker configuration snippets before committing to Git.',
      },
      {
        title: 'Database Export Inspection',
        desc: 'Format MongoDB BSON exports or PostgreSQL JSONB column dumps into readable records.',
      },
    ],
    faqs: [
      {
        q: 'Is my JSON data uploaded or saved to any server?',
        a: 'No. TechUsar JSON Formatter runs 100% client-side in your local browser runtime. None of your payload or sensitive keys ever touch a server.',
      },
      {
        q: 'Why does my valid JavaScript object fail in the JSON validator?',
        a: 'JavaScript objects allow unquoted keys, single quotes, and trailing commas. Strict JSON requires double quotes around both property names and strings, and forbids trailing commas.',
      },
      {
        q: 'What is the maximum JSON file size supported?',
        a: 'Because execution occurs in your browser memory, it effortlessly handles payloads up to 15MB without lag.',
      },
    ],
    relatedToolSlugs: ['base64-converter', 'uuid-generator', 'css-shadow-generator'],
  },
  {
    slug: 'invoice-generator',
    id: 'invoice',
    name: 'Invoice & Receipt Generator',
    shortTitle: 'Invoice Generator',
    seoTitle: 'Free Online Invoice & Receipt Generator — PDF Invoicing Tool | TechUsar',
    metaDescription:
      'Create professional PDF invoices and receipts online for free. Calculate subtotal, VAT/tax, discounts, payment details, and export print-ready vector invoices with zero watermarks.',
    h1: 'Free Online Invoice & Receipt Generator',
    category: 'accountant',
    categoryLabel: 'Accountant & Business Tools',
    tag: 'Accountants & Freelancers',
    introduction:
      'Sending clear, professional invoices is essential for timely client payments and accurate bookkeeping. TechUsar Invoice & Receipt Generator allows freelancers, agencies, small business owners, and accountants to create custom, itemized invoices in seconds. Compute line items, quantity, tax/VAT rates, and discounts automatically, and generate a clean vector PDF formatted for A4 printing or email dispatch.',
    whatItDoes: [
      'Calculates line item subtotals, custom sales tax/VAT percentages, and shipping or discounts.',
      'Supports customizable sender and recipient business profiles (name, address, tax ID, email).',
      'Outputs vector-quality PDF documents using modern client-side rendering engines.',
      'Stores invoice templates locally in your browser storage so you do not have to retype company information.',
      'Completely free with zero watermarks, subscription fees, or account sign-up requirements.',
    ],
    whoItIsFor: [
      'Freelancers and independent contractors billing international or local clients.',
      'Small business owners and service agencies needing clean commercial bills.',
      'Accountants drafting billing estimates and receipt records.',
      'Consultants and creators invoicing corporate retainers.',
    ],
    howToUse: [
      'Fill in your business name, contact info, and recipient client details.',
      'Add line items with descriptions, quantities, and unit rates.',
      'Set your tax or VAT percentage (or leave at 0% for tax-exempt services).',
      'Add payment bank account or IBAN details and customized payment terms.',
      'Click "Export PDF" or "Print" to download a crisp, publication-grade document.',
    ],
    examples: [
      {
        title: 'Freelance Web Design Invoice Example',
        input: 'Item: Custom Website Design (Qty: 1 @ $1,500), Tax: 0%, Terms: Net 15',
        output: 'Subtotal: $1,500.00 | Total Due: $1,500.00 | Clean A4 PDF Generated',
        explanation:
          'Generates a modern corporate bill ready to send to European, US, or Pakistani clients.',
      },
    ],
    useCases: [
      {
        title: 'Freelance Project Invoicing',
        desc: 'Send professional milestones and final project completion bills with bank transfer details.',
      },
      {
        title: 'Monthly Retainer Statements',
        desc: 'Quickly issue monthly recurring bills for maintenance, SEO, or software consulting.',
      },
      {
        title: 'Proof of Payment Receipts',
        desc: 'Convert standard billing records into payment received vouchers for client accounting records.',
      },
    ],
    faqs: [
      {
        q: 'Does this invoice generator put a watermark on my PDF?',
        a: 'No. All generated PDF invoices are 100% clean and unbranded with zero watermarks.',
      },
      {
        q: 'Can I choose different currencies (USD, PKR, EUR, GBP)?',
        a: 'Yes. You can customize the currency symbol to match your local or international client requirements.',
      },
      {
        q: 'Are client details kept private?',
        a: 'Yes. Everything is processed locally in your browser sandbox without transmission to external databases.',
      },
    ],
    relatedToolSlugs: ['profit-margin-calculator', 'freelance-rate-calculator', 'loan-emi-calculator'],
  },
  {
    slug: 'profit-margin-calculator',
    id: 'margin',
    name: 'Profit Margin & Markup Calculator',
    shortTitle: 'Margin Calculator',
    seoTitle: 'Profit Margin & Markup Calculator Online — Free Business Tool | TechUsar',
    metaDescription:
      'Calculate gross profit, net profit margin percentage, markup percentage, and total revenue online. Essential financial calculator for retail, e-commerce, and services.',
    h1: 'Profit Margin & Markup Calculator Online',
    category: 'accountant',
    categoryLabel: 'Accountant & Business Tools',
    tag: 'Business & Finance',
    introduction:
      'Understanding the mathematical difference between margin and markup is one of the most critical factors in business profitability. Confusing a 25% markup with a 25% margin can lead to catastrophic underpricing. TechUsar’s Profit Margin & Markup Calculator helps business owners, e-commerce managers, and financial analysts model cost of goods sold (COGS), selling prices, gross margins, and markups instantly.',
    whatItDoes: [
      'Computes Gross Margin Percentage: [(Revenue - Cost) / Revenue] × 100.',
      'Computes Markup Percentage: [(Revenue - Cost) / Cost] × 100.',
      'Calculates total Gross Profit in absolute currency units.',
      'Enables reverse calculations: determine required selling price based on desired margin.',
    ],
    whoItIsFor: [
      'E-commerce merchants pricing products on Shopify, Amazon, or Daraz.',
      'Retailers and wholesalers structuring inventory discount brackets.',
      'Service providers quoting fixed-bid project margins.',
      'Financial accountants forecasting quarterly profitability.',
    ],
    howToUse: [
      'Enter your unit Cost of Goods Sold (COGS).',
      'Enter your intended Revenue (Selling Price) or desired profit percentage.',
      'Review the calculated Gross Margin %, Markup %, and net dollar profit immediately.',
      'Adjust pricing sliders to evaluate competitive pricing scenarios.',
    ],
    examples: [
      {
        title: 'Standard Retail Product Pricing',
        input: 'Cost: $60.00 | Selling Price: $100.00',
        output: 'Gross Profit: $40.00 | Margin: 40.00% | Markup: 66.67%',
        explanation:
          'Notice how a 40% margin requires a 66.67% markup on cost. Confusing the two would result in lost profit.',
      },
    ],
    useCases: [
      {
        title: 'E-commerce Product Launch',
        desc: 'Calculate break-even and sustainable margins accounting for advertising and shipping overhead.',
      },
      {
        title: 'Wholesale Discount Modeling',
        desc: 'Evaluate whether a 20% distributor discount leaves adequate operational margin.',
      },
    ],
    faqs: [
      {
        q: 'What is the key difference between Margin and Markup?',
        a: 'Margin is the percentage of selling price that is profit, whereas markup is the percentage added to cost price to arrive at the selling price.',
      },
      {
        q: 'What is considered a healthy gross margin for digital services?',
        a: 'For software and digital design services, healthy gross margins typically range between 60% and 85%.',
      },
    ],
    relatedToolSlugs: ['invoice-generator', 'freelance-rate-calculator', 'loan-emi-calculator'],
  },
  {
    slug: 'loan-emi-calculator',
    id: 'emi',
    name: 'Loan EMI & Compound Interest Calculator',
    shortTitle: 'Loan EMI Calculator',
    seoTitle: 'Loan EMI & Compound Interest Calculator — Monthly Payment Tool | TechUsar',
    metaDescription:
      'Calculate monthly loan EMI payments, total interest payable, loan amortization schedules, and compound interest online. Free financial planning tool for business and personal loans.',
    h1: 'Loan EMI & Compound Interest Calculator',
    category: 'accountant',
    categoryLabel: 'Accountant & Business Tools',
    tag: 'Loans & Banking',
    introduction:
      'Whether financing enterprise IT hardware, commercial office real estate, or auto and personal loans, knowing your exact Equated Monthly Installment (EMI) helps protect cash flow. TechUsar’s Loan EMI Calculator applies standard reducing-balance amortization formulas to project monthly installments, cumulative interest liabilities, and principal balance trajectories.',
    whatItDoes: [
      'Calculates accurate monthly installments using standard financial compound interest models.',
      'Breaks down the total payment into Principal versus Interest proportions.',
      'Displays dynamic amortization timelines across loan tenures (1 to 30 years).',
      'Helps evaluate the impact of interest rate changes and prepayment scenarios.',
    ],
    whoItIsFor: [
      'Entrepreneurs evaluating equipment and business expansion loans.',
      'Individuals planning vehicle or home mortgage financing.',
      'Accountants preparing debt service coverage schedules.',
    ],
    howToUse: [
      'Enter the principal loan amount.',
      'Specify the annual interest rate percentage.',
      'Select the loan tenure in months or years.',
      'View the monthly EMI, total interest, and total payable amount instantly.',
    ],
    examples: [
      {
        title: 'Business Equipment Loan Scenario',
        input: 'Principal: $50,000 | Interest Rate: 8.5% | Tenure: 5 Years (60 Months)',
        output: 'Monthly EMI: $1,025.83 | Total Interest: $11,549.91 | Total Payment: $61,549.91',
        explanation:
          'Clearly shows that over 5 years, interest accounts for 18.7% of the total disbursement.',
      },
    ],
    useCases: [
      {
        title: 'Debt Service Planning',
        desc: 'Evaluate if company monthly cash flows comfortably cover new debt obligations.',
      },
      {
        title: 'Mortgage Comparison',
        desc: 'Compare 15-year versus 30-year terms to see how much cumulative interest can be saved.',
      },
    ],
    faqs: [
      {
        q: 'What formula is used for EMI calculation?',
        a: 'EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1], where P is Principal, r is monthly interest rate, and n is total monthly installments.',
      },
    ],
    relatedToolSlugs: ['profit-margin-calculator', 'invoice-generator', 'freelance-rate-calculator'],
  },
  {
    slug: 'freelance-rate-calculator',
    id: 'hourly',
    name: 'Freelancer Rate & Salary Calculator',
    shortTitle: 'Freelance Rate Calculator',
    seoTitle: 'Freelancer Hourly Rate & Salary Calculator Online | TechUsar Tools',
    metaDescription:
      'Calculate your target hourly rate, daily rate, and annual billable income based on living expenses, tax obligations, billable hours, and profit targets.',
    h1: 'Freelancer Hourly Rate & Salary Calculator',
    category: 'accountant',
    categoryLabel: 'Accountant & Business Tools',
    tag: 'Freelancers & Agencies',
    introduction:
      'Freelancers and independent designers frequently undercharge because they divide desired salary by 2,080 hours without factoring in non-billable time (marketing, invoicing, client calls), healthcare, taxes, vacations, and software overhead. TechUsar’s Freelance Rate Calculator reverse-engineers your minimum required hourly rate to ensure financial sustainability.',
    whatItDoes: [
      'Calculates real billable hours after accounting for holidays, sick days, and non-billable admin time.',
      'Factors in self-employment taxes, equipment depreciation, and software subscriptions.',
      'Calculates minimum hourly rate, daily rate, and monthly retainers required to meet your savings target.',
    ],
    whoItIsFor: [
      'Freelance web designers, frontend developers, and graphic artists.',
      'Agency contractors transitioning from full-time employment.',
      'Consultants scoping client retainer fees.',
    ],
    howToUse: [
      'Enter your desired net annual income.',
      'Add annual business expenses (software, equipment, internet, workspace).',
      'Specify expected non-billable hours and vacation weeks.',
      'Review your calculated minimum hourly and day rates.',
    ],
    examples: [
      {
        title: 'Full-Time Independent Developer Target',
        input: 'Desired Net Income: $60,000 | Expenses: $8,000 | Billable Hours: 25 hrs/week | Vacation: 4 weeks',
        output: 'Target Hourly Rate: ~$56.67/hr | Day Rate: ~$450.00/day',
        explanation:
          'Protects you from working 40 hours a week while getting paid for only 25 billable hours.',
      },
    ],
    useCases: [
      {
        title: 'Client Proposal Scoping',
        desc: 'Quote project milestones with confidence knowing your floor hourly rate.',
      },
    ],
    faqs: [
      {
        q: 'Why should I not assume 40 billable hours per week?',
        a: 'Solo operators spend 25% to 40% of their working hours on client communication, accounting, marketing, and self-education.',
      },
    ],
    relatedToolSlugs: ['invoice-generator', 'profit-margin-calculator'],
  },
  {
    slug: 'base64-converter',
    id: 'base64',
    name: 'Base64 & URL Encoder/Decoder',
    shortTitle: 'Base64 Converter',
    seoTitle: 'Base64 & URL Encoder/Decoder Online — Free Developer Tool | TechUsar',
    metaDescription:
      'Encode and decode Base64 strings, UTF-8 text, and URL parameters online. Fast, secure, client-side developer utility with live dual-direction translation.',
    h1: 'Base64 & URL Encoder/Decoder Online',
    category: 'developer',
    categoryLabel: 'Developer Tools',
    tag: 'Security & Encoding',
    introduction:
      'Base64 encoding is widely used in web technologies to safely transmit binary data, authorization headers, data URIs, and webhook secrets over text-based protocols like HTTP and SMTP. TechUsar’s Base64 & URL Encoder/Decoder provides two-way conversion for plain text, JSON payloads, and URI-encoded query strings.',
    whatItDoes: [
      'Converts plain text and UTF-8 strings into standard Base64 representation.',
      'Decodes Base64 encoded strings back into clean UTF-8 text.',
      'Provides URL encode/decode mode for safely handling query parameters and URI components.',
      'Operates 100% in your local browser sandbox.',
    ],
    whoItIsFor: [
      'Web developers inspecting Basic Auth tokens and JWT header segments.',
      'API developers debugging encoded query parameters and webhook callbacks.',
      'Frontend engineers creating inline Data URI strings for SVGs and CSS.',
    ],
    howToUse: [
      'Choose the operation mode: Encode or Decode.',
      'Paste your raw text or Base64 string into the input area.',
      'View the real-time converted output instantly.',
      'Click copy to transfer the result directly into your application code.',
    ],
    examples: [
      {
        title: 'Basic HTTP Authorization Header',
        input: 'admin:supersecretpassword',
        output: 'YWRtaW46c3VwZXJzZWNyZXRwYXNzd29yZA==',
        explanation: 'Standard format used in Authorization: Basic HTTP headers.',
      },
    ],
    useCases: [
      {
        title: 'JWT Payload Inspection',
        desc: 'Decode the base64-encoded middle section of a JSON Web Token to inspect claims without sending the token to third parties.',
      },
    ],
    faqs: [
      {
        q: 'Is Base64 an encryption algorithm?',
        a: 'No. Base64 is an encoding format designed for data representation, not encryption. Anyone can decode a Base64 string without a secret key.',
      },
    ],
    relatedToolSlugs: ['json-formatter', 'uuid-generator', 'css-shadow-generator'],
  },
  {
    slug: 'css-shadow-generator',
    id: 'shadow',
    name: 'CSS Box Shadow & Glow Generator',
    shortTitle: 'CSS Shadow Generator',
    seoTitle: 'CSS Box Shadow & Glow Generator — Visual UI Design Tool | TechUsar',
    metaDescription:
      'Generate modern, smooth CSS box shadows, colored glows, and ambient elevation layers visually. Copy clean CSS and Tailwind CSS classes with one click.',
    h1: 'CSS Box Shadow & Glow Generator Online',
    category: 'developer',
    categoryLabel: 'Developer Tools',
    tag: 'UI & Styling',
    introduction:
      'Natural, modern elevation in UI design requires multi-layered, smooth box shadows rather than harsh default browser shadows. TechUsar’s CSS Box Shadow & Glow Generator lets you visually manipulate horizontal offset, vertical offset, blur radius, spread, opacity, and color accents to craft refined card elevations, glowing neon buttons, and subtle dark-mode depths.',
    whatItDoes: [
      'Interactive visual sliders for X-offset, Y-offset, blur radius, spread, and shadow opacity.',
      'Real-time live preview container supporting light, dark, and colored surfaces.',
      'Generates standard CSS box-shadow declarations and equivalent Tailwind CSS custom utility classes.',
      'Supports smooth layered ambient glow effects.',
    ],
    whoItIsFor: [
      'UI/UX designers styling modern web components.',
      'Frontend engineers writing Tailwind CSS and custom stylesheets.',
      'Designers seeking realistic elevation and depth without Photoshop.',
    ],
    howToUse: [
      'Adjust the X and Y offset sliders to position the light source.',
      'Increase blur radius for softer, diffused ambient shadows.',
      'Adjust opacity and color to match your brand design tokens.',
      'Copy the generated CSS or Tailwind snippet directly into your project.',
    ],
    examples: [
      {
        title: 'Subtle Modern Card Elevation',
        input: 'X: 0px | Y: 8px | Blur: 24px | Spread: -4px | Color: rgba(0,0,0,0.08)',
        output: 'box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.08);',
        explanation: 'Provides natural physical elevation without harsh dark lines.',
      },
    ],
    useCases: [
      {
        title: 'Design System Token Creation',
        desc: 'Establish consistent elevation layers (shadow-sm, shadow-md, shadow-lg) for your React component library.',
      },
    ],
    faqs: [
      {
        q: 'Why do modern UIs use negative spread values?',
        a: 'A negative spread radius shrinks the shadow size relative to the box, preventing side bleed and creating a natural downward light perspective.',
      },
    ],
    relatedToolSlugs: ['json-formatter', 'uuid-generator', 'base64-converter'],
  },
  {
    slug: 'uuid-generator',
    id: 'uuid',
    name: 'Cryptographic UUID v4 Generator',
    shortTitle: 'UUID Generator',
    seoTitle: 'UUID Generator Online — Free RFC 4122 v4 UUID Tool | TechUsar',
    metaDescription:
      'Generate cryptographically secure random UUID v4 identifiers online. Fast bulk UUID generator with zero latency, compliant with RFC 4122 specifications.',
    h1: 'Cryptographic UUID v4 Generator Online',
    category: 'developer',
    categoryLabel: 'Developer Tools',
    tag: 'Databases & Backend',
    introduction:
      'Universally Unique Identifiers (UUID version 4) are 128-bit values mathematically designed to guarantee uniqueness across distributed systems without a central coordinating authority. TechUsar’s Cryptographic UUID v4 Generator utilizes your browser’s crypto.randomUUID() engine to generate secure, collision-free identifiers for database primary keys, session tokens, and distributed tracing.',
    whatItDoes: [
      'Generates cryptographically random RFC 4122 Version 4 compliant UUIDs.',
      'Supports single and bulk generation (generate 1, 5, 10, or 50 UUIDs at once).',
      'Provides one-click copying for individual UUIDs or bulk comma/newline-separated lists.',
      'Supports uppercase and lowercase formatting and optional hyphen removal.',
    ],
    whoItIsFor: [
      'Database architects generating primary keys for PostgreSQL, MongoDB, or MySQL.',
      'Backend developers mocking API payloads and seed fixtures.',
      'DevOps engineers assigning correlation IDs to distributed microservice traces.',
    ],
    howToUse: [
      'Select how many UUIDs you want to generate.',
      'Choose whether to include standard hyphens or uppercase formatting.',
      'Click "Generate UUIDs" for instant cryptographic random values.',
      'Click "Copy All" to paste into your database migration or code editor.',
    ],
    examples: [
      {
        title: 'Standard RFC 4122 v4 UUID Format',
        input: 'Generate 1 UUID v4',
        output: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        explanation: '32 hexadecimal digits displayed in 5 groups separated by hyphens (8-4-4-4-12).',
      },
    ],
    useCases: [
      {
        title: 'Database Mock Fixtures',
        desc: 'Quickly generate unique IDs when seeding user tables or test records.',
      },
    ],
    faqs: [
      {
        q: 'What is the probability of a UUID v4 collision?',
        a: 'The probability of a collision is virtually zero. You would need to generate approximately 1 billion UUIDs per second for 85 years to have a 50% probability of a single collision.',
      },
    ],
    relatedToolSlugs: ['json-formatter', 'base64-converter', 'css-shadow-generator'],
  },
];

export function getToolBySlug(slug: string): ToolData | undefined {
  return toolsData.find((t) => t.slug === slug || t.id === slug);
}
