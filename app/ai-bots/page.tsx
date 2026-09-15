import AiBotDevelopmentPage from '../ai-bot-development/page';
import { constructMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Custom AI Chatbot Development & Automation Bots | TechUsar',
  description:
    'Tailored WhatsApp bots, Telegram notification bots, 24/7 AI customer support agents, and custom workflow automations built by TechUsar.',
  path: '/ai-bot-development',
});

export default AiBotDevelopmentPage;
