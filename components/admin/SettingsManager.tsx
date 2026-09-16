'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sliders,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Save,
  Globe,
  Image as ImageIcon,
  User,
  Mail,
  Phone,
  MessageSquare,
  Github,
  Linkedin,
  MapPin,
  FileText,
  Layers,
  Check,
  RefreshCw,
} from 'lucide-react';
import { SiteSettings, defaultSiteSettings } from '@/components/providers/SiteDataProvider';

interface SettingsManagerProps {
  onSettingsSaved?: () => void;
}

export function SettingsManager({ onSettingsSaved }: SettingsManagerProps) {
  const [formData, setFormData] = useState<SiteSettings>(defaultSiteSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const logoFileRef = useRef<HTMLInputElement>(null);
  const avatarFileRef = useRef<HTMLInputElement>(null);
  const bannerFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isMounted = true;
    const loadSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings?t=' + Date.now(), { cache: 'no-store' });
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.settings && isMounted) {
            setFormData((prev) => ({ ...prev, ...data.settings }));
          }
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (file: File, targetField: 'logoUrl' | 'heroAvatarUrl' | 'bannerUrl') => {
    if (targetField === 'logoUrl') setUploadingLogo(true);
    else if (targetField === 'heroAvatarUrl') setUploadingAvatar(true);
    else setUploadingBanner(true);

    try {
      const reader = new FileReader();
      const dataUrlPromise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const dataUrl = await dataUrlPromise;

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataUrl,
          filename: file.name,
          type: targetField === 'logoUrl' ? 'logo' : 'screenshot',
          title: file.name.replace(/\.[^/.]+$/, ''),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.media?.url) {
          setFormData((prev) => ({ ...prev, [targetField]: data.media.url }));
          setNotification({
            type: 'success',
            message: `${targetField === 'logoUrl' ? 'Logo' : targetField === 'heroAvatarUrl' ? 'Avatar' : 'Banner'} uploaded successfully! Click "Save All Settings" to apply permanently.`,
          });
        }
      } else {
        throw new Error('Upload API returned failure');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setNotification({ type: 'error', message: 'Failed to upload image. Please try another image.' });
    } finally {
      setUploadingLogo(false);
      setUploadingAvatar(false);
      setUploadingBanner(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotification(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setFormData((prev) => ({ ...prev, ...data.settings }));
        }

        if (typeof window !== 'undefined') {
          if (formData.logoUrl) {
            localStorage.setItem('techusar_custom_logo', formData.logoUrl);
          } else {
            localStorage.removeItem('techusar_custom_logo');
          }
          window.dispatchEvent(new CustomEvent('techusar_logo_updated', { detail: { logoUrl: formData.logoUrl } }));
          window.dispatchEvent(new CustomEvent('techusar_data_updated'));
        }

        setNotification({
          type: 'success',
          message: 'All branding, logo, and content settings saved to JSON and applied across the entire website!',
        });

        if (onSettingsSaved) onSettingsSaved();
      } else {
        throw new Error('Save failed');
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
      setNotification({ type: 'error', message: 'Failed to save settings to server. Please try again.' });
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleResetDefaults = async () => {
    if (!confirm('Reset all site settings and branding to original defaults?')) return;
    setFormData(defaultSiteSettings);
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(defaultSiteSettings),
      });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('techusar_custom_logo');
        window.dispatchEvent(new CustomEvent('techusar_logo_updated', { detail: { logoUrl: '' } }));
        window.dispatchEvent(new CustomEvent('techusar_data_updated'));
      }
      setNotification({ type: 'success', message: 'Settings reset to default configuration.' });
    } catch {
      setNotification({ type: 'error', message: 'Failed to reset settings.' });
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-neutral-500">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
        <span className="text-sm font-mono">Loading site settings & branding...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span>Site Branding, Logo, Banners &amp; Content Hub</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold">
                Live JSON Sync
              </span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Control your brand name, custom logo image, hero banners, contact info, and copy. Changes instantly reflect across all pages.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
            title="Reset to default settings"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs font-medium flex items-center gap-2.5 animate-in fade-in duration-200 ${
            notification.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* SECTION 1: Brand & Logo Identity */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3 flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white font-mono uppercase tracking-wider">
          <ImageIcon className="w-4 h-4 text-blue-500" />
          <span>1. Brand Identity &amp; Logo System</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Logo Preview & Uploader */}
          <div className="lg:col-span-5 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Active Website Logo</span>
              {formData.logoUrl && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                  Custom Logo Active
                </span>
              )}
            </div>

            {/* Visual Box */}
            <div className="w-full h-32 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col items-center justify-center p-4 relative overflow-hidden group">
              {formData.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={formData.logoUrl}
                  alt="Brand Logo"
                  className="max-h-24 max-w-full object-contain"
                />
              ) : (
                <div className="text-center space-y-1">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs">
                    TU
                  </div>
                  <p className="text-[11px] text-neutral-500">Default Geometric TU Monogram Active</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={logoFileRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'logoUrl');
                }}
              />
              <button
                type="button"
                onClick={() => logoFileRef.current?.click()}
                disabled={uploadingLogo}
                className="flex-1 py-2 px-3 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                {uploadingLogo ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Logo File</span>
                  </>
                )}
              </button>

              {formData.logoUrl && (
                <button
                  type="button"
                  onClick={() => handleChange('logoUrl', '')}
                  className="py-2 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors font-medium"
                  title="Remove custom logo and restore default geometric emblem"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Direct URL input */}
            <div>
              <label className="block text-[11px] font-mono text-neutral-500 mb-1">
                Or Paste Image Direct URL / Cloud Path:
              </label>
              <input
                type="text"
                value={formData.logoUrl}
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                placeholder="https://example.com/logo.png or /uploads/logo.png"
                className="w-full p-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono"
              />
            </div>
          </div>

          {/* Brand Name & Tagline Fields */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Brand Name (Displayed in Header, Navbar, Footer, Browser Title)
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => handleChange('brandName', e.target.value)}
                placeholder="TechUsar"
                className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Main Brand Tagline &amp; Specialty
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                placeholder="Graphic Designer & Full-Stack Developer | Custom AI Agents & Bot Builder"
                className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Owner / Founder Full Name
              </label>
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => handleChange('ownerName', e.target.value)}
                placeholder="Hafiz Muhammad Usman"
                className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Location &amp; Base of Operations
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Kharadar Lyari, Karachi, Pakistan"
                className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Hero Section & Banners */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3 flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white font-mono uppercase tracking-wider">
          <Layers className="w-4 h-4 text-purple-500" />
          <span>2. Hero Banner &amp; Homepage Headlines</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Hero Top Availability Badge Text
            </label>
            <input
              type="text"
              value={formData.heroBadge}
              onChange={(e) => handleChange('heroBadge', e.target.value)}
              placeholder="Available for Custom AI Agents & Web Projects"
              className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Hero Main Display Name / Headline
            </label>
            <input
              type="text"
              value={formData.heroTitle}
              onChange={(e) => handleChange('heroTitle', e.target.value)}
              placeholder="Hafiz Muhammad Usman"
              className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Profile Avatar / Photo URL (Optional)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formData.heroAvatarUrl}
                onChange={(e) => handleChange('heroAvatarUrl', e.target.value)}
                placeholder="https://... or /uploads/..."
                className="flex-1 p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono"
              />
              <input
                type="file"
                ref={avatarFileRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'heroAvatarUrl');
                }}
              />
              <button
                type="button"
                onClick={() => avatarFileRef.current?.click()}
                disabled={uploadingAvatar}
                className="p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="Upload Avatar Image"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Hero Subtitle Narrative
            </label>
            <textarea
              rows={3}
              value={formData.heroSubtitle}
              onChange={(e) => handleChange('heroSubtitle', e.target.value)}
              placeholder="Senior Graphic Designer (5+ Years) & Full-Stack Next.js Developer (2+ Years)..."
              className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Hero Banner / Cover Image URL (Optional)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formData.bannerUrl}
                onChange={(e) => handleChange('bannerUrl', e.target.value)}
                placeholder="https://... or /uploads/banner.jpg"
                className="flex-1 p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono"
              />
              <input
                type="file"
                ref={bannerFileRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'bannerUrl');
                }}
              />
              <button
                type="button"
                onClick={() => bannerFileRef.current?.click()}
                disabled={uploadingBanner}
                className="p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="Upload Banner Cover"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Full Bio &amp; About Story
            </label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="Detailed description about Usman's experience, technologies, and achievements..."
              className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Contact & Communication Channels */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3 flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white font-mono uppercase tracking-wider">
          <Phone className="w-4 h-4 text-emerald-500" />
          <span>3. Contact Numbers, WhatsApp &amp; Social Links</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Primary Phone (International format)
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+92 331 8917330"
              className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Display Phone (Local Pakistani format)
            </label>
            <input
              type="text"
              value={formData.displayPhone}
              onChange={(e) => handleChange('displayPhone', e.target.value)}
              placeholder="0331-8917330"
              className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Official Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="techusar17@gmail.com"
              className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              WhatsApp Link / Direct URL
            </label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              placeholder="https://wa.me/923318917330"
              className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              WhatsApp Numeric Digits (For floating widget)
            </label>
            <input
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => handleChange('whatsappNumber', e.target.value)}
              placeholder="923318917330"
              className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              GitHub Profile Link
            </label>
            <input
              type="text"
              value={formData.githubUrl}
              onChange={(e) => handleChange('githubUrl', e.target.value)}
              placeholder="https://github.com/TechUsar"
              className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              LinkedIn Profile Link
            </label>
            <input
              type="text"
              value={formData.linkedinUrl}
              onChange={(e) => handleChange('linkedinUrl', e.target.value)}
              placeholder="https://linkedin.com"
              className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Behance Portfolio Link
            </label>
            <input
              type="text"
              value={formData.behanceUrl}
              onChange={(e) => handleChange('behanceUrl', e.target.value)}
              placeholder="https://behance.net"
              className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Dribbble Portfolio Link
            </label>
            <input
              type="text"
              value={formData.dribbbleUrl}
              onChange={(e) => handleChange('dribbbleUrl', e.target.value)}
              placeholder="https://dribbble.com"
              className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-blue-900 dark:text-blue-300">
          <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
          <span>All inputs are written directly to <code className="font-mono bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">data/site-settings.json</code> and broadcast across all clients.</span>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save &amp; Apply All Settings</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
