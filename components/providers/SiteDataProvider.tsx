'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Project, Theme, DesignProject } from '@/types';
import { projects as defaultProjects } from '@/data/projects';
import { themes as defaultThemes } from '@/data/themes';
import { designProjects as defaultDesigns } from '@/data/design-projects';
import { getAllBlogPosts, BlogPost } from '@/lib/blog';

export interface SiteSettings {
  logoUrl: string;
  brandName: string;
  tagline: string;
  ownerName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroAvatarUrl: string;
  bannerUrl: string;
  phone: string;
  displayPhone: string;
  whatsapp: string;
  whatsappNumber: string;
  email: string;
  location: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  behanceUrl: string;
  dribbbleUrl: string;
  updatedAt?: string;
}

export const defaultSiteSettings: SiteSettings = {
  logoUrl: '',
  brandName: 'TechUsar',
  tagline: 'Graphic Designer & Full-Stack Developer | Custom AI Agents & Bot Builder',
  ownerName: 'Hafiz Muhammad Usman',
  heroTitle: 'Hafiz Muhammad Usman',
  heroSubtitle: 'Senior Graphic Designer (5+ Years) & Full-Stack Next.js Developer (2+ Years). Crafting high-converting web apps, digital brand identities, custom AI bots, and accounting tools.',
  heroBadge: 'Available for Custom AI Agents & Web Projects',
  heroAvatarUrl: '',
  bannerUrl: '',
  phone: '+92 331 8917330',
  displayPhone: '0331-8917330',
  whatsapp: 'https://wa.me/923318917330',
  whatsappNumber: '923318917330',
  email: 'techusar17@gmail.com',
  location: 'Kharadar Lyari, Karachi, Pakistan',
  bio: 'Hafiz-e-Quran, graphic designer with 5+ years experience and full-stack software engineer.',
  githubUrl: 'https://github.com/TechUsar',
  linkedinUrl: 'https://linkedin.com',
  behanceUrl: 'https://behance.net',
  dribbbleUrl: 'https://dribbble.com',
};

interface SiteDataContextType {
  settings: SiteSettings;
  projects: Project[];
  themes: Theme[];
  designs: DesignProject[];
  blogs: BlogPost[];
  loading: boolean;
  refreshContent: () => Promise<void>;
  updateSettingsLocally: (newSettings: Partial<SiteSettings>) => void;
}

const SiteDataContext = createContext<SiteDataContextType>({
  settings: defaultSiteSettings,
  projects: defaultProjects,
  themes: defaultThemes,
  designs: defaultDesigns,
  blogs: getAllBlogPosts(),
  loading: false,
  refreshContent: async () => {},
  updateSettingsLocally: () => {},
});

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [themes, setThemes] = useState<Theme[]>(defaultThemes);
  const [designs, setDesigns] = useState<DesignProject[]>(defaultDesigns);
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      return getAllBlogPosts();
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState<boolean>(true);

  const refreshContent = useCallback(async () => {
    try {
      const res = await fetch('/api/content?t=' + Date.now(), {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
          if (data.settings.logoUrl && typeof window !== 'undefined') {
            try {
              localStorage.setItem('techusar_custom_logo', data.settings.logoUrl);
            } catch {}
          }
        }
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        }
        if (Array.isArray(data.themes) && data.themes.length > 0) {
          setThemes(data.themes);
        }
        if (Array.isArray(data.designs) && data.designs.length > 0) {
          setDesigns(data.designs);
        }
        if (Array.isArray(data.blogs) && data.blogs.length > 0) {
          setBlogs(data.blogs);
        }
      }
    } catch (err) {
      console.warn('SiteDataProvider: failed to fetch dynamic content, using fallback:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettingsLocally = useCallback((newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (newSettings.logoUrl !== undefined && typeof window !== 'undefined') {
        try {
          if (newSettings.logoUrl) {
            localStorage.setItem('techusar_custom_logo', newSettings.logoUrl);
          } else {
            localStorage.removeItem('techusar_custom_logo');
          }
        } catch {}
      }
      return updated;
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadInitial = async () => {
      try {
        const res = await fetch('/api/content?t=' + Date.now(), {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        });
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.settings && isMounted) {
            setSettings((prev) => ({ ...prev, ...data.settings }));
            if (data.settings.logoUrl && typeof window !== 'undefined') {
              try {
                localStorage.setItem('techusar_custom_logo', data.settings.logoUrl);
              } catch {}
            }
          }
          if (isMounted && Array.isArray(data.projects) && data.projects.length > 0) {
            setProjects(data.projects);
          }
          if (isMounted && Array.isArray(data.themes) && data.themes.length > 0) {
            setThemes(data.themes);
          }
          if (isMounted && Array.isArray(data.designs) && data.designs.length > 0) {
            setDesigns(data.designs);
          }
          if (isMounted && Array.isArray(data.blogs) && data.blogs.length > 0) {
            setBlogs(data.blogs);
          }
        }
      } catch (err) {
        console.warn('SiteDataProvider: failed to fetch dynamic content, using fallback:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadInitial();

    // Listen for custom data updates from admin operations
    const handleDataUpdate = () => {
      refreshContent();
    };

    const handleLogoUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ logoUrl: string }>;
      if (customEvent.detail) {
        updateSettingsLocally({ logoUrl: customEvent.detail.logoUrl });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('techusar_data_updated', handleDataUpdate);
      window.addEventListener('techusar_logo_updated', handleLogoUpdate);
    }

    return () => {
      isMounted = false;
      if (typeof window !== 'undefined') {
        window.removeEventListener('techusar_data_updated', handleDataUpdate);
        window.removeEventListener('techusar_logo_updated', handleLogoUpdate);
      }
    };
  }, [refreshContent, updateSettingsLocally]);

  return (
    <SiteDataContext.Provider
      value={{
        settings,
        projects,
        themes,
        designs,
        blogs,
        loading,
        refreshContent,
        updateSettingsLocally,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}

export function useSiteSettings() {
  const { settings, updateSettingsLocally, refreshContent } = useContext(SiteDataContext);
  return { settings, updateSettingsLocally, refreshContent };
}
