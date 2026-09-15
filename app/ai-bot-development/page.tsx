import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { constructMetadata, generateFAQSchema, SITE_URL } from '@/lib/seo';
import {
  Bot,
  MessageSquare,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  HelpCircle,
  Database,
  Cpu,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'AI Chatbot Development & Custom AI Bots | TechUsar Studio',
  description:
    'Custom AI chatbot and bot development services by TechUsar. We build intelligent WhatsApp bots, Telegram notifiers, 24/7 customer care chatbots, automated web scrapers, and business workflow automations.',
  path: '/ai-bot-development',
  keywords: [
    'AI chatbot development',
    'Custom AI bots',
    'WhatsApp bot builder',
    'Telegram bot developer',
    'AI customer support bot',
    'Business automation bots',
    'Chote mote bots developer',
    'Karachi bot developer',
    'Pakistan AI chatbot services',
    'Web scraping automation',
  ],
});

export default function AiBotDevelopmentPage() {
  const faqs = [
    {
      q: 'What types of bots and AI agents does TechUsar build?',
      a: 'We build custom WhatsApp automation bots, Telegram notification bots, 24/7 AI-powered customer support chatbots (integrated with OpenAI, Gemini, or Claude), web scrapers for market intelligence, and lightweight utility bots for repetitive manual business tasks.',
    },
    {
      q: 'Can a custom chatbot understand both English and Urdu/Roman Urdu?',
      a: 'Yes. By leveraging fine-tuned system instructions and multilingual large language models (LLMs), our bots naturally comprehend and reply in English, Urdu script, and conversational Roman Urdu with cultural context.',
    },
    {
      q: 'How does WhatsApp bot integration work for businesses?',
      a: 'We integrate with the official WhatsApp Business Cloud API or reliable webhook gateways. Bots can receive customer inquiries, look up order statuses in your database, confirm bookings, and route complex cases to a human agent.',
    },
    {
      q: 'Do I need technical knowledge to manage my bot once deployed?',
      a: 'No. We handle complete end-to-end setup, cloud server deployment, webhook configuration, and testing. You receive a fully functioning bot with simple instructions or an admin dashboard.',
    },
    {
      q: 'How long does it take to develop a custom bot?',
      a: 'Basic automation and notification bots are typically live within 48 to 72 hours (2 to 3 days), while complex conversational AI agents with database lookup usually take 5 to 7 days.',
    },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Custom AI Chatbot & Bot Development Services',
    provider: {
      '@type': 'Person',
      name: 'Hafiz Muhammad Usman',
      url: SITE_URL,
    },
    serviceType: 'AI Agent & Automation Engineering',
    description:
      'Development of intelligent WhatsApp bots, Telegram notifiers, customer support chatbots, and business automation workflows.',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Custom Bot Solutions',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'WhatsApp Business Automation Bots',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '24/7 AI Customer Support Chatbots',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Automated Web Scrapers & Notification Bots',
          },
        },
      ],
    },
  };

  const faqSchema = generateFAQSchema(faqs);

  const botCategories = [
    {
      icon: MessageSquare,
      title: 'WhatsApp & Telegram Business Bots',
      desc: 'Automate client intake, order confirmations, product catalogs, and instant alert dispatches directly on the messaging platforms your customers use every day.',
      features: [
        'Interactive button menus and catalog browsing',
        'Real-time order status and shipment tracking',
        'Automated payment link generation',
        'Direct human-agent handover trigger',
      ],
    },
    {
      icon: Bot,
      title: '24/7 Conversational AI Chatbots',
      desc: 'Powered by modern foundation models (OpenAI GPT-4o, Google Gemini, Anthropic Claude). Understands complex inquiries, resolves support tickets, and answers FAQ questions instantly.',
      features: [
        'Grounded strictly on your business knowledge base / PDF manuals',
        'Multilingual support: English, Urdu, and Roman Urdu',
        'Zero hallucination safeguards and safety prompts',
        'Embeddable on websites, Shopify stores, and web apps',
      ],
    },
    {
      icon: Terminal,
      title: 'Web Scrapers & Market Intelligence Bots',
      desc: 'Automated bots that scrape, extract, and monitor real-time data across competitor websites, directories, real estate portals, and supplier catalogs.',
      features: [
        'Scheduled daily or hourly price monitoring',
        'Automated CSV or Google Sheets export',
        'Instant Telegram / WhatsApp alerts on price drops or new listings',
        'Anti-blocking headless browser architectures',
      ],
    },
    {
      icon: Zap,
      title: 'Lightweight Utility Bots ("Chote Mote Bots")',
      desc: 'Small, agile tools designed for specific daily friction points: converting files, auto-generating invoices, sending reminders, or syncing inventory between two apps.',
      features: [
        'Affordable, fast 48-hour development turnaround',
        'No heavy monthly subscription overhead',
        'Zero-maintenance serverless cloud deployment',
        'Tailored 100% to your unique daily routine',
      ],
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Scope Definition & Logic Mapping',
      desc: 'We map out the exact trigger points, customer conversation flows, required data fields, and edge cases.',
    },
    {
      step: '02',
      title: 'Prompt Engineering & System Architecture',
      desc: 'We configure LLM system prompts, connect database endpoints, and build webhook listeners using Node.js/Python.',
    },
    {
      step: '03',
      title: 'Interactive Testing & Safety Guardrails',
      desc: 'Rigorous conversational testing to ensure the bot never goes off-script, answers accurately, and handles errors gracefully.',
    },
    {
      step: '04',
      title: 'Deployment, Hosting & Handover',
      desc: 'We deploy the bot to cloud infrastructure, connect your phone numbers or domains, and provide full operational instructions.',
    },
  ];

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-white dark:bg-[#050508]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/services' },
            { label: 'AI & Bot Development', href: '/ai-bot-development' },
          ]}
        />

        {/* Hero */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
            <Bot className="w-3.5 h-3.5" />
            <span>CUSTOM AI AGENTS &amp; AUTOMATION BOTS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
            AI Chatbot Development &amp; Custom Automation Bots
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            We build intelligent, custom bots and AI agents that automate repetitive business tasks,
            answer customer inquiries 24/7, and streamline sales flows. From small WhatsApp
            notifiers to advanced LLM-powered support agents.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
            >
              <span>Request a Custom Bot</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/blog/custom-ai-agents-and-bots-development-services"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              <span>Read Bot Case Study</span>
            </Link>
          </div>
        </header>

        {/* Core Bot Types */}
        <section className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="space-y-1">
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
              TAILORED SOLUTIONS
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
              What We Build: From Micro-Bots to Enterprise AI Agents
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {botCategories.map((bot, i) => {
              const Icon = bot.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-neutral-950 dark:text-white text-lg">
                      {bot.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {bot.desc}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-neutral-200/80 dark:border-neutral-800/80 text-xs text-neutral-700 dark:text-neutral-300">
                    {bot.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Development Workflow */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Our 4-Step Bot Engineering Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((ws, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                  {ws.step}
                </div>
                <h3 className="font-bold text-neutral-950 dark:text-white text-sm sm:text-base">
                  {ws.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {ws.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Custom Bots Beat Generic SaaS */}
        <section className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>THE TECHUSAR ADVANTAGE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
            Why Custom Engineered Bots Are Better Than Monthly Subscriptions
          </h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl">
            Off-the-shelf bot platforms lock you into recurring $100-$300/month fees and restrict
            database integrations. At TechUsar, we build custom bots that you own outright. We
            connect directly to your PostgreSQL/MySQL database, Google Sheets, or custom ERP, with
            zero recurring platform lock-in.
          </p>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-500" />
            <span>Frequently Asked Questions About AI Bots</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2"
              >
                <h3 className="font-semibold text-neutral-950 dark:text-white text-sm sm:text-base">
                  {faq.q}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-900/90 border border-neutral-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Have an idea for an automated bot?</h2>
          <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
            Whether you need a quick WhatsApp alert bot or a full AI customer care agent, contact
            Hafiz Muhammad Usman directly to get started today.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500 text-neutral-950 hover:bg-emerald-400 transition-colors"
            >
              <span>Get Your Custom Bot</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/923318917330?text=Assalam-o-Alaikum%20Usman!%20I%20need%20a%20Custom%20AI%20Bot."
              target="_blank"
              rel="noopener noreferrer"
              data-track="ai_bot_page_whatsapp"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-medium border border-neutral-700 text-white hover:bg-neutral-800 transition-colors"
            >
              <span>WhatsApp (0331-8917330)</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
