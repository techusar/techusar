'use client';

import React, { useState, useEffect } from 'react';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Server,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  HardDrive,
  Copy,
  Check,
} from 'lucide-react';

interface DbStatusData {
  configured: boolean;
  connected: boolean;
  message: string;
  error?: string | null;
  counts?: {
    settings: number;
    projects: number;
    themes: number;
    designs: number;
    blogs: number;
    media: number;
    submissions: number;
  };
}

export function DatabaseManager() {
  const [status, setStatus] = useState<DbStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);
  const [actionMsg, setActionMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchStatus = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/db-status', { cache: 'no-store' });
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      console.error('Failed to load DB status:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/admin/db-status', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setStatus(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load DB status:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInitSchema = async () => {
    setInitializing(true);
    setActionMsg(null);
    try {
      const res = await fetch('/api/admin/db-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'init-schema' }),
      });
      const data = await res.json();
      setStatus(data);
      if (data.success || data.connected) {
        setActionMsg({
          text: 'Database schema and initial tables verified and seeded successfully!',
          type: 'success',
        });
      } else {
        setActionMsg({
          text: data.error || 'Failed to initialize database schema',
          type: 'error',
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error executing schema command';
      setActionMsg({ text: msg, type: 'error' });
    } finally {
      setInitializing(false);
    }
  };

  const sampleConnectionString = 'postgresql://username:password@ep-cool-sample.us-east-2.aws.neon.tech/neondb?sslmode=require';

  const handleCopySample = () => {
    navigator.clipboard.writeText(sampleConnectionString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Database className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">Neon PostgreSQL Database</h2>
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                  status?.connected
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : status?.configured
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    status?.connected
                      ? 'bg-emerald-400 animate-pulse'
                      : status?.configured
                      ? 'bg-amber-400'
                      : 'bg-blue-400'
                  }`}
                />
                {status?.connected
                  ? 'Connected & Active'
                  : status?.configured
                  ? 'Connecting / Error'
                  : 'JSON Fallback Active'}
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Connect your serverless PostgreSQL database from Neon.tech for high-performance cloud persistence.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-center">
          <button
            onClick={fetchStatus}
            disabled={loading}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl border border-slate-700 flex items-center gap-2 transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Status
          </button>
        </div>
      </div>

      {actionMsg && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-medium ${
            actionMsg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {actionMsg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{actionMsg.text}</span>
        </div>
      )}

      {/* Main Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Environment Config
            </span>
            <Server className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
            {status?.configured ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>DATABASE_URL Detected</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <span>Awaiting DATABASE_URL</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {status?.configured
              ? 'Database URI is configured in server environment.'
              : 'Add DATABASE_URL in Settings -> Environment Variables.'}
          </p>
        </div>

        {/* Status Card 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Database Connection
            </span>
            <HardDrive className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
            {status?.connected ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-700">Online & Synchronized</span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-slate-700">Using File System Storage</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {status?.connected
              ? 'All CRUD operations write directly to Neon PostgreSQL.'
              : 'Automatically falls back to local storage until Neon DB is connected.'}
          </p>
        </div>

        {/* Status Card 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Schema & Seeding
            </span>
            <Layers className="w-4 h-4 text-slate-400" />
          </div>
          <button
            onClick={handleInitSchema}
            disabled={initializing}
            className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${initializing ? 'animate-spin' : 'text-amber-400'}`} />
            {initializing ? 'Running Migration...' : 'Run Auto-Migration / Seed'}
          </button>
          <p className="text-xs text-slate-500 mt-2">
            Creates tables automatically & migrates existing projects, blogs, designs & settings.
          </p>
        </div>
      </div>

      {/* Table Records Count (if connected or fallback) */}
      {status?.counts && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            Active Records in Database
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-2xl font-black text-slate-900">{status.counts.projects}</span>
              <p className="text-xs font-semibold text-slate-500 mt-1">Web Projects</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-2xl font-black text-slate-900">{status.counts.themes}</span>
              <p className="text-xs font-semibold text-slate-500 mt-1">Themes</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-2xl font-black text-slate-900">{status.counts.designs}</span>
              <p className="text-xs font-semibold text-slate-500 mt-1">Graphic Designs</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-2xl font-black text-slate-900">{status.counts.blogs}</span>
              <p className="text-xs font-semibold text-slate-500 mt-1">Blog Posts</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-2xl font-black text-slate-900">{status.counts.media}</span>
              <p className="text-xs font-semibold text-slate-500 mt-1">Media Assets</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-2xl font-black text-slate-900">{status.counts.submissions}</span>
              <p className="text-xs font-semibold text-slate-500 mt-1">Inquiries</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-2xl font-black text-emerald-600">{status.counts.settings}</span>
              <p className="text-xs font-semibold text-slate-500 mt-1">Site Configs</p>
            </div>
          </div>
        </div>
      )}

      {/* How to Connect Step by Step Guide */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-900">How to Connect your Neon PostgreSQL Database</h3>
        </div>

        <div className="space-y-4 text-sm text-slate-700">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <p className="font-medium text-slate-900">Get your Connection String from Neon.tech</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Go to <a href="https://console.neon.tech" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">Neon Console <ExternalLink className="w-3 h-3" /></a>, select your project, and copy the Postgres connection string.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <p className="font-medium text-slate-900">Format of Connection String</p>
              <div className="mt-1.5 p-3 bg-slate-900 rounded-xl text-slate-300 font-mono text-xs flex items-center justify-between gap-3 overflow-x-auto">
                <span>{sampleConnectionString}</span>
                <button
                  onClick={handleCopySample}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 shrink-0 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <p className="font-medium text-slate-900">Set in AI Studio Settings</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Paste the connection string in the <strong>Settings</strong> &gt; <strong>Environment Variables</strong> as <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-900">DATABASE_URL</code>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
              4
            </span>
            <div>
              <p className="font-medium text-slate-900">Click &quot;Run Auto-Migration / Seed&quot;</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Once connected, click the button above to auto-create all database tables and seed them with your current portfolio content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
