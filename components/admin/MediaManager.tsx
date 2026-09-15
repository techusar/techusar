'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Check,
  Copy,
  Trash2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  FolderOpen,
  Eye,
  AlertCircle,
} from 'lucide-react';

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
  title?: string;
  createdAt: string;
}

interface MediaManagerProps {
  currentLogo: string | null;
  onLogoUpdated: (newLogoUrl: string) => void;
}

export function MediaManager({ currentLogo, onLogoUpdated }: MediaManagerProps) {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Logo form
  const [customLogoInput, setCustomLogoInput] = useState(currentLogo || '');
  const [savingLogo, setSavingLogo] = useState(false);

  // File input refs
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const screenshotInputRef = useRef<HTMLInputElement | null>(null);

  const fetchMedia = React.useCallback(async () => {
    try {
      const res = await fetch('/api/admin/media', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setMediaList(data.media || []);
      }
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const loadMedia = async () => {
      try {
        const res = await fetch('/api/admin/media', { cache: 'no-store' });
        if (res.ok && !ignore) {
          const data = await res.json();
          setMediaList(data.media || []);
        }
      } catch (err) {
        console.error('Failed to load media:', err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };
    loadMedia();
    return () => {
      ignore = true;
    };
  }, []);

  const handleFileUpload = async (files: FileList | null, type: 'logo' | 'screenshot') => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      let lastUploadedUrl = '';

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Read as DataURL to ensure resilient upload
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
            type,
            title: file.name.replace(/\.[^/.]+$/, ''),
          }),
        });

        if (res.ok) {
          const result = await res.json();
          if (result.media?.url) {
            lastUploadedUrl = result.media.url;
          }
        }
      }

      await fetchMedia();

      if (type === 'logo' && lastUploadedUrl) {
        await applyLogo(lastUploadedUrl);
        setUploadSuccess('Logo uploaded and applied to website successfully!');
      } else {
        setUploadSuccess(`${files.length} screenshot(s) uploaded successfully!`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setUploadError('Failed to process image upload. Please try again.');
    } finally {
      setUploading(false);
      setTimeout(() => {
        setUploadSuccess('');
        setUploadError('');
      }, 5000);
    }
  };

  const applyLogo = async (logoUrl: string) => {
    setSavingLogo(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logoUrl }),
      });

      if (res.ok) {
        if (typeof window !== 'undefined') {
          if (logoUrl) {
            localStorage.setItem('techusar_custom_logo', logoUrl);
          } else {
            localStorage.removeItem('techusar_custom_logo');
          }
          window.dispatchEvent(new CustomEvent('techusar_logo_updated', { detail: { logoUrl } }));
        }
        onLogoUpdated(logoUrl);
        setCustomLogoInput(logoUrl);
        setUploadSuccess('Website logo updated instantly!');
      }
    } catch (err) {
      console.error('Failed to save logo:', err);
      setUploadError('Failed to update logo settings.');
    } finally {
      setSavingLogo(false);
      setTimeout(() => setUploadSuccess(''), 4000);
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;
    try {
      const res = await fetch(`/api/admin/media?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete media:', err);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Alert Notifications */}
      {uploadSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {uploadError && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* SECTION 1: SITE LOGO MANAGER */}
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Brand Identity</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Website Logo Manager
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Upload your official TechUsar logo. It will appear across the navbar, footer, and mobile drawer.
            </p>
          </div>

          {currentLogo && (
            <button
              onClick={() => applyLogo('')}
              disabled={savingLogo}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors self-start"
            >
              Reset to Default Vector Monogram
            </button>
          )}
        </div>

        {/* Live Preview & Upload Zone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Visual Previews */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-medium text-neutral-500">
              LIVE HEADER PREVIEW
            </span>
            {/* Light Preview */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-blue-600 text-white font-bold font-mono text-xs border border-neutral-200">
                  {currentLogo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={currentLogo} alt="Logo Preview" className="w-full h-full object-contain p-0.5" />
                  ) : (
                    <span>TU</span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-sm text-neutral-900 leading-none">TechUsar</div>
                  <div className="text-[10px] text-neutral-500 font-mono">dev</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-neutral-500 border border-neutral-200">
                Light Mode
              </span>
            </div>

            {/* Dark Preview */}
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-blue-600 text-white font-bold font-mono text-xs border border-neutral-800">
                  {currentLogo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={currentLogo} alt="Logo Preview" className="w-full h-full object-contain p-0.5" />
                  ) : (
                    <span>TU</span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-sm text-white leading-none">TechUsar</div>
                  <div className="text-[10px] text-neutral-400 font-mono">dev</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                Dark Mode
              </span>
            </div>
          </div>

          {/* Upload Dropzone */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-mono font-medium text-neutral-500">
              UPLOAD LOGO FILE (PNG, SVG, WEBP, JPG)
            </span>
            <div
              onClick={() => logoInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFileUpload(e.dataTransfer.files, 'logo');
              }}
              className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-neutral-50/50 dark:bg-neutral-800/30 group"
            >
              <input
                ref={logoInputRef}
                type="file"
                accept="image/png, image/svg+xml, image/jpeg, image/webp"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files, 'logo')}
              />
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {uploading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    Click to browse or drag &amp; drop logo here
                  </span>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Transparent PNG or SVG recommended for optimal contrast on both themes.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct URL input fallback */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Or paste direct image URL (e.g. https://... or /uploads/logo.png)"
                value={customLogoInput}
                onChange={(e) => setCustomLogoInput(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => applyLogo(customLogoInput)}
                disabled={savingLogo || !customLogoInput}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                {savingLogo ? 'Saving...' : 'Set Logo'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PROJECT SCREENSHOTS UPLOADER & REPOSITORY */}
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold uppercase">
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Project Media Gallery</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Web Development Project Screenshots
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Upload your web development screenshots. You can link them directly to case studies and showcase cards.
            </p>
          </div>

          <button
            onClick={() => screenshotInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs self-start"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Screenshots</span>
          </button>
          <input
            ref={screenshotInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files, 'screenshot')}
          />
        </div>

        {/* Multi-file Drag & Drop Area */}
        <div
          onClick={() => screenshotInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileUpload(e.dataTransfer.files, 'screenshot');
          }}
          className="border-2 border-dashed border-neutral-200 dark:border-neutral-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-neutral-50/30 dark:bg-neutral-800/20 group"
        >
          <div className="flex flex-col items-center gap-2.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                Drag &amp; drop project screenshots here (supports batch upload)
              </span>
              <p className="text-xs text-neutral-500 mt-1">
                Upload your 35 screenshots or add new web development project captures.
              </p>
            </div>
          </div>
        </div>

        {/* Uploaded Items Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold font-mono text-neutral-900 dark:text-white">
              MEDIA REPOSITORY ({mediaList.length} ITEMS)
            </h3>
            <button
              onClick={fetchMedia}
              className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh List</span>
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs font-mono text-neutral-500">
              Loading media repository...
            </div>
          ) : mediaList.length === 0 ? (
            <div className="py-12 px-4 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/20 text-center space-y-2">
              <FolderOpen className="w-8 h-8 text-neutral-400 mx-auto" />
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                No custom screenshots uploaded yet.
              </p>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                Use the drag-and-drop box above to upload your web development screenshots. They will be saved to your server and instantly ready for projects.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaList.map((item) => {
                const isCurrentLogo = currentLogo === item.url;

                return (
                  <div
                    key={item.id}
                    className="group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
                  >
                    {/* Image Preview */}
                    <div className="relative aspect-16/10 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={item.title || item.filename}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 text-white backdrop-blur-xs">
                        {item.type}
                      </div>

                      {isCurrentLogo && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500 text-white shadow-xs">
                          Active Logo
                        </div>
                      )}
                    </div>

                    {/* Metadata & Actions */}
                    <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-medium text-neutral-900 dark:text-white truncate" title={item.filename}>
                          {item.title || item.filename}
                        </p>
                        <p className="text-[10px] font-mono text-neutral-500 mt-0.5">
                          {(item.size / 1024).toFixed(1)} KB • {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-1">
                        <button
                          onClick={() => copyToClipboard(item.url, item.id)}
                          className="px-2 py-1 rounded text-[11px] font-mono border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1 transition-colors"
                          title="Copy Image URL"
                        >
                          {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                        </button>

                        <div className="flex items-center gap-1">
                          {!isCurrentLogo && (
                            <button
                              onClick={() => applyLogo(item.url)}
                              className="px-2 py-1 rounded text-[11px] font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
                              title="Set as website logo"
                            >
                              Set Logo
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteMedia(item.id)}
                            className="p-1 rounded text-neutral-400 hover:text-rose-500 transition-colors"
                            title="Delete Image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
