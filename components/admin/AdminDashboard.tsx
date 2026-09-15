'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  MousePointer,
  FileText,
  TrendingUp,
  ShieldCheck,
  Search,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
  Trash2,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  RefreshCw,
  LogOut,
  ChevronRight,
  Filter,
  BarChart3,
  Globe,
  Sparkles,
  ArrowUpRight,
  HelpCircle,
  Eye,
  EyeOff,
  Lock,
  Image as ImageIcon,
  Code,
} from 'lucide-react';
import { FormSubmission } from '@/app/api/submissions/route';
import { MediaManager } from './MediaManager';
import { WebProjectsManager } from './WebProjectsManager';
import { ThemesManager } from './ThemesManager';
import { DesignsManager } from './DesignsManager';
import { BlogsManager } from './BlogsManager';
import { ShoppingBag, Palette, BookOpen } from 'lucide-react';

interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  totalClicks: number;
  pageViews: Record<string, number>;
  clicksByTarget: Record<string, number>;
  recentClicks: Array<{
    id: string;
    element: string;
    label: string;
    page: string;
    timestamp: string;
  }>;
  dailyStats: Record<string, { visits: number; unique: number; clicks: number; formsFilled: number }>;
}

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<
    'overview' | 'submissions' | 'media' | 'webprojects' | 'themes' | 'designs' | 'blogs'
  >('overview');
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);

  // Dashboard state
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  // Manual Add Modal
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [manualForm, setManualForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Full-Stack Web App',
    budget: '$3k — $5k',
    message: '',
    status: 'contacted' as const,
  });

  const fetchData = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const [subRes, anaRes, setRes] = await Promise.all([
        fetch('/api/submissions', { cache: 'no-store' }),
        fetch('/api/analytics', { cache: 'no-store' }),
        fetch('/api/admin/settings', { cache: 'no-store' }),
      ]);

      if (subRes.ok) {
        const subData = await subRes.json();
        setSubmissions(subData.submissions || []);
      }

      if (anaRes.ok) {
        const anaData = await anaRes.json();
        setAnalytics(anaData.analytics || null);
      }

      if (setRes.ok) {
        const setData = await setRes.json();
        if (setData.settings?.logoUrl) {
          setCurrentLogo(setData.settings.logoUrl);
        }
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const sessionToken = localStorage.getItem('techusar_admin_auth');
      if (sessionToken) {
        setIsAuthenticated(true);
        await fetchData();
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkAuth();
  }, [fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUser, password: loginPass }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('techusar_admin_auth', data.token || 'authenticated');
        setIsAuthenticated(true);
        fetchData();
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch {
      setLoginError('Server error occurred during login');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('techusar_admin_auth');
    setIsAuthenticated(false);
  };

  const handleUpdateStatus = async (id: string, newStatus: FormSubmission['status']) => {
    try {
      const res = await fetch('/api/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    try {
      const res = await fetch(`/api/submissions?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete submission:', err);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manualForm),
      });
      if (res.ok) {
        setManualModalOpen(false);
        setManualForm({
          name: '',
          email: '',
          phone: '',
          projectType: 'Full-Stack Web App',
          budget: '$3k — $5k',
          message: '',
          status: 'contacted',
        });
        fetchData();
      }
    } catch (err) {
      console.error('Failed to save manual lead:', err);
    }
  };

  const exportToJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify({ submissions, analytics }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `techusar_analytics_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      (sub.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.projectType || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.message || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate client demands breakdown ("Kon Kya Chahta He")
  const demandsMap: Record<string, number> = {};
  submissions.forEach((sub) => {
    const key = sub.projectType || 'General Consultation';
    demandsMap[key] = (demandsMap[key] || 0) + 1;
  });

  const conversionRate =
    analytics && analytics.uniqueVisitors > 0
      ? ((submissions.length / analytics.uniqueVisitors) * 100).toFixed(1)
      : '0.0';

  if (loading && isAuthenticated === null) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
        <p className="text-sm font-mono text-neutral-500">Checking credentials &amp; telemetry...</p>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 sm:px-6">
        <div className="p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
              TechUsar Admin Portal
            </h1>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Authorized access for Hafiz Muhammad Usman. View visitor metrics, leads, and manage web assets.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs">
                {loginError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300">
                ADMIN USERNAME
              </label>
              <input
                type="text"
                required
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                <span>SECURITY KEY / PASSWORD</span>
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="text-[10px] text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 font-sans"
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white pr-10"
                />
                <div className="absolute right-3 top-3 text-neutral-400">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Access Admin Command Center</span>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-center">
            <p className="text-[11px] text-neutral-500">
              Default password: <code className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-neutral-800 dark:text-neutral-200">techusar17</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE TELEMETRY &amp; DATABASE
            </span>
            <span className="text-xs font-mono text-neutral-500">
              Admin: Hafiz Muhammad Usman
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1">
            TechUsar Command Center
          </h1>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Real-time telemetry on visits, clicks, submissions, web projects, and brand assets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/60 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => setManualModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Manual Lead</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics &amp; Traffic Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-2 ${
            activeTab === 'submissions'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Inquiries &amp; Demands ({submissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('media')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-2 ${
            activeTab === 'media'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Logo &amp; Screenshots Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('webprojects')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-2 ${
            activeTab === 'webprojects'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Web Dev Projects (50)</span>
        </button>

        <button
          onClick={() => setActiveTab('themes')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-2 ${
            activeTab === 'themes'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Themes &amp; Templates</span>
        </button>

        <button
          onClick={() => setActiveTab('designs')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-2 ${
            activeTab === 'designs'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Graphic Design Showcase</span>
        </button>

        <button
          onClick={() => setActiveTab('blogs')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-2 ${
            activeTab === 'blogs'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Blogs &amp; Articles</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & TRAFFIC */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* 4 PRIMARY METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Metric 1: Total Visits */}
            <div className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-neutral-500 uppercase tracking-wider">
                  TOTAL VISITS (LOG AAYE)
                </span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono tracking-tight text-neutral-950 dark:text-white">
                  {analytics?.totalVisits.toLocaleString() || '0'}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  +{analytics?.uniqueVisitors || 0} Unique
                </span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Total page impressions recorded across all pages.
              </p>
            </div>

            {/* Metric 2: Total Clicks */}
            <div className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-neutral-500 uppercase tracking-wider">
                  TOTAL CLICKS (KITNE CLICK)
                </span>
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <MousePointer className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono tracking-tight text-neutral-950 dark:text-white">
                  {analytics?.totalClicks.toLocaleString() || '0'}
                </span>
                <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  Interactions
                </span>
              </div>
              <p className="text-[11px] text-neutral-500">
                WhatsApp, CTA, template downloads &amp; button clicks.
              </p>
            </div>

            {/* Metric 3: Forms Filled */}
            <div className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-neutral-500 uppercase tracking-wider">
                  FORMS FILLED (INQUIRIES)
                </span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono tracking-tight text-neutral-950 dark:text-white">
                  {submissions.length}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  {submissions.filter((s) => s.status === 'new').length} New
                </span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Inquiries recorded in JSON database &amp; WhatsApp.
              </p>
            </div>

            {/* Metric 4: Conversion Rate */}
            <div className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-neutral-500 uppercase tracking-wider">
                  CONVERSION RATE
                </span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono tracking-tight text-neutral-950 dark:text-white">
                  {conversionRate}%
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  Forms / Unique
                </span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Visitor to project inquiry conversion efficiency.
              </p>
            </div>
          </div>

          {/* SECTION: "KON KYA CHAHTA HE" */}
          <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Client Intent Analysis</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  Kon Kya Chahta He? (Visitor Demands Breakdown)
                </h2>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Aggregated project requirements and requested services submitted by potential clients.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportToJson}
                  className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(demandsMap).length > 0 ? (
                Object.entries(demandsMap).map(([demand, count]) => {
                  const percentage =
                    submissions.length > 0
                      ? Math.round((count / submissions.length) * 100)
                      : 0;

                  return (
                    <div
                      key={demand}
                      className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-800/30 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                          {demand}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                          {count} {count === 1 ? 'client' : 'clients'}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-600 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                        <span>{percentage}% of all inquiries</span>
                        <span>Direct Lead</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-3 py-6 text-center text-xs text-neutral-500">
                  No submissions yet to aggregate demands. Inquiries will populate here automatically.
                </div>
              )}
            </div>
          </div>

          {/* Traffic Breakdown: Pages Visited & Click Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Top Pages Visited */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>Top Pages Visited (Traffic Distribution)</span>
                </h3>
                <span className="text-xs font-mono text-neutral-500">By URL</span>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {analytics?.pageViews &&
                Object.entries(analytics.pageViews).length > 0 ? (
                  Object.entries(analytics.pageViews)
                    .sort(([, a], [, b]) => b - a)
                    .map(([path, views]) => (
                      <div
                        key={path}
                        className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs"
                      >
                        <span className="font-mono text-neutral-700 dark:text-neutral-300 truncate max-w-[240px]">
                          {path}
                        </span>
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                          {views} views
                        </span>
                      </div>
                    ))
                ) : (
                  <p className="text-xs text-neutral-500 italic py-4">No page views logged yet.</p>
                )}
              </div>
            </div>

            {/* Click Targets Distribution */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <MousePointer className="w-4 h-4 text-purple-600" />
                  <span>Click Distribution (Where Users Clicked)</span>
                </h3>
                <span className="text-xs font-mono text-neutral-500">CTA &amp; Links</span>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {analytics?.clicksByTarget &&
                Object.entries(analytics.clicksByTarget).length > 0 ? (
                  Object.entries(analytics.clicksByTarget)
                    .sort(([, a], [, b]) => b - a)
                    .map(([target, count]) => (
                      <div
                        key={target}
                        className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs"
                      >
                        <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-[240px]">
                          {target}
                        </span>
                        <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                          {count} clicks
                        </span>
                      </div>
                    ))
                ) : (
                  <p className="text-xs text-neutral-500 italic py-4">No click interactions logged yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Live Clicks Stream (Real-Time Click Tracker) */}
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-950 dark:text-white flex items-center gap-2">
                    <span>Live Real-Time Clicks Stream</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold">
                      data/analytics.json (Live)
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Real-time log of buttons, links, tools, CV downloads &amp; WhatsApp interactions clicked by users.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchData}
                  className="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Real Clicks</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {analytics?.recentClicks && analytics.recentClicks.length > 0 ? (
                analytics.recentClicks.map((clk) => {
                  const clickDate = new Date(clk.timestamp);
                  const timeFormatted = clickDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  const dateFormatted = clickDate.toLocaleDateString([], { month: 'short', day: 'numeric' });

                  return (
                    <div
                      key={clk.id}
                      className="p-3.5 rounded-xl bg-neutral-50/80 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
                          <MousePointer className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-neutral-900 dark:text-white truncate">
                              {clk.label}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                              {clk.element}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 font-mono mt-0.5 truncate">
                            Page: <span className="text-blue-600 dark:text-blue-400">{clk.page}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 sm:text-right font-mono text-[11px] text-neutral-500">
                        <span className="text-neutral-700 dark:text-neutral-300 font-medium">{dateFormatted}</span>
                        <span>{timeFormatted}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center rounded-xl bg-neutral-50 dark:bg-neutral-800/30 border border-dashed border-neutral-200 dark:border-neutral-800 text-neutral-500 space-y-1">
                  <MousePointer className="w-6 h-6 mx-auto text-neutral-400 opacity-60" />
                  <p className="text-xs">No clicks recorded in this session yet.</p>
                  <p className="text-[11px]">Clicking any button, tool, or template on the live site will append here instantly.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INQUIRIES & SUBMISSIONS */}
      {activeTab === 'submissions' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
                  Form Submissions &amp; Client Inquiries
                </h2>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Every form filled on the site is saved in data/form-submissions.json with direct WhatsApp chat capability.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name, email, query..."
                    className="pl-9 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-neutral-900 dark:text-white w-48 sm:w-60"
                  />
                </div>

                <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl text-xs">
                  {['all', 'new', 'contacted', 'in-progress', 'completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                        statusFilter === status
                          ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white font-semibold shadow-2xs'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submissions List */}
            <div className="space-y-4">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((sub) => {
                  const whatsappPhone =
                    sub.phone && sub.phone.replace(/[^0-9]/g, '')
                      ? sub.phone.replace(/[^0-9]/g, '')
                      : '923318917330';
                  const whatsappChatUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                    `Hi ${sub.name}, thank you for contacting TechUsar regarding "${sub.projectType}". Let's discuss your project requirements.`
                  )}`;

                  return (
                    <div
                      key={sub.id}
                      className="p-5 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-sm flex items-center justify-center">
                            {sub.name ? sub.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                                {sub.name}
                              </h3>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium capitalize ${
                                  sub.status === 'new'
                                    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                    : sub.status === 'contacted'
                                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                    : sub.status === 'in-progress'
                                    ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                                }`}
                              >
                                {sub.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 font-mono mt-0.5">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                <a href={`mailto:${sub.email}`} className="hover:underline text-blue-600 dark:text-blue-400">
                                  {sub.email}
                                </a>
                              </span>
                              {sub.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  <a href={`tel:${sub.phone}`} className="hover:underline">
                                    {sub.phone}
                                  </a>
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {sub.createdAt ? new Date(sub.createdAt).toLocaleString() : 'Recent'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status Select & Action buttons */}
                        <div className="flex items-center gap-2 self-start sm:self-center">
                          <select
                            value={sub.status}
                            onChange={(e) =>
                              handleUpdateStatus(sub.id, e.target.value as FormSubmission['status'])
                            }
                            className="text-xs px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in-progress">In-Progress</option>
                            <option value="completed">Completed</option>
                          </select>

                          <a
                            href={whatsappChatUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs"
                            title="Chat on WhatsApp"
                          >
                            <span>WhatsApp</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-300 transition-colors"
                            title="Delete record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Request Specifications */}
                      <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800/80 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-medium text-neutral-500">
                            SERVICE REQUIRED:
                          </span>
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                            {sub.projectType}
                          </span>
                          {sub.budget && (
                            <>
                              <span className="text-xs font-mono font-medium text-neutral-500 ml-2">
                                BUDGET:
                              </span>
                              <span className="px-2 py-0.5 rounded text-xs font-mono bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                                {sub.budget}
                              </span>
                            </>
                          )}
                        </div>

                        {sub.message && (
                          <div className="pt-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            <span className="font-semibold text-neutral-900 dark:text-white block sm:inline mr-1">
                              Client Message:
                            </span>
                            &ldquo;{sub.message}&rdquo;
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-16 text-center rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/20 space-y-2">
                  <FileText className="w-8 h-8 text-neutral-400 mx-auto" />
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    No matching inquiries found.
                  </p>
                  <p className="text-xs text-neutral-500">
                    Submissions through the contact form or WhatsApp modal will be indexed here in real time.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LOGO & MEDIA MANAGER */}
      {activeTab === 'media' && (
        <MediaManager
          currentLogo={currentLogo}
          onLogoUpdated={(newLogo) => {
            setCurrentLogo(newLogo);
            fetchData();
          }}
        />
      )}

      {/* TAB 4: WEB PROJECTS MANAGER */}
      {activeTab === 'webprojects' && (
        <WebProjectsManager onProjectsUpdated={fetchData} />
      )}

      {/* TAB 5: THEMES & TEMPLATES MARKETPLACE */}
      {activeTab === 'themes' && <ThemesManager />}

      {/* TAB 6: GRAPHIC DESIGN SHOWCASE */}
      {activeTab === 'designs' && <DesignsManager />}

      {/* TAB 7: BLOGS & EDITORIAL GUIDES */}
      {activeTab === 'blogs' && <BlogsManager />}

      {/* MANUAL LEAD MODAL */}
      {manualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>Add Client Lead Manually</span>
              </h3>
              <button
                onClick={() => setManualModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-mono text-neutral-700 dark:text-neutral-300">Client Name *</label>
                <input
                  type="text"
                  required
                  value={manualForm.name}
                  onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-neutral-700 dark:text-neutral-300">Email *</label>
                  <input
                    type="email"
                    required
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    placeholder="client@company.com"
                    className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-neutral-700 dark:text-neutral-300">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={manualForm.phone}
                    onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                    placeholder="03318917330"
                    className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-neutral-700 dark:text-neutral-300">Service Required (Kon Kya Chahta He)</label>
                <select
                  value={manualForm.projectType}
                  onChange={(e) => setManualForm({ ...manualForm, projectType: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white"
                >
                  <option value="Full-Stack Web App">Full-Stack Web App</option>
                  <option value="Custom AI Agent / Bot Development">Custom AI Agent / Bot Development</option>
                  <option value="Graphic Design &amp; Branding">Graphic Design &amp; Branding</option>
                  <option value="SaaS UI/UX Design">SaaS UI/UX Design</option>
                  <option value="Website Template Requisition">Website Template Requisition</option>
                  <option value="Technical Consulting">Technical Consulting</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-neutral-700 dark:text-neutral-300">Client Requirements &amp; Scope</label>
                <textarea
                  rows={3}
                  value={manualForm.message}
                  onChange={(e) => setManualForm({ ...manualForm, message: e.target.value })}
                  placeholder="Notes from WhatsApp chat or call..."
                  className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setManualModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
