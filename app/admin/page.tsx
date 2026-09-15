import type { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Control Center | TechUsar Analytics & Submissions',
  description: 'Private administration portal for TechUsar metrics, visits, clicks, and form submissions.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <div id="techusar-admin-page" className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950/80">
      <AdminDashboard />
    </div>
  );
}
