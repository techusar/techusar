'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Direct programmatic click tracker for interactive buttons and tools
 */
export function trackSiteClick(element: string, label: string, category: string = 'action') {
  if (typeof window === 'undefined') return;
  try {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'click',
        element,
        label: label.slice(0, 100),
        page: window.location.pathname || '/',
        category,
      }),
    }).catch(() => {});
  } catch {
    // Ignore tracking failures
  }
}

export function SiteTracker() {
  const pathname = usePathname();
  const lastPathRef = useRef<string>('');

  useEffect(() => {
    // Avoid re-tracking identical path during quick re-renders
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    // Do not track admin portal visits to keep public analytics clean
    if (pathname?.startsWith('/admin')) return;

    try {
      // Determine if unique visitor
      const visitorKey = 'techusar_visitor_id';
      let isUnique = false;
      if (typeof window !== 'undefined' && window.localStorage) {
        if (!localStorage.getItem(visitorKey)) {
          localStorage.setItem(visitorKey, `vis_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`);
          isUnique = true;
        }
      }

      // Track page view
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'visit',
          page: pathname || '/',
          isUnique,
        }),
      }).catch(() => {
        // Silent fail
      });
    } catch {
      // Silent fail
    }
  }, [pathname]);

  useEffect(() => {
    // Global delegated click listener for tracking high-value interactions
    const handleGlobalClick = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        // Skip clicks inside admin dashboard to prevent admin actions polluting visitor metrics
        if (window.location.pathname.startsWith('/admin')) return;

        const anchor = target.closest('a') as HTMLAnchorElement | null;
        const button = target.closest('button') as HTMLButtonElement | null;
        const trackedElem = target.closest('[data-track]') as HTMLElement | null;

        let elementKey = '';
        let label = '';
        let category = 'interaction';

        if (trackedElem) {
          elementKey = trackedElem.getAttribute('data-track') || 'tracked_element';
          label = trackedElem.getAttribute('data-track-label') || trackedElem.innerText?.slice(0, 50) || 'Custom Element';
          category = trackedElem.getAttribute('data-track-cat') || 'custom';
        } else if (anchor) {
          const href = anchor.href || '';
          const text = (anchor.innerText || '').trim().replace(/\s+/g, ' ');

          if (href.includes('wa.me') || href.includes('whatsapp')) {
            elementKey = 'whatsapp_click';
            label = `WhatsApp Direct Click: ${text || 'Chat'}`;
            category = 'lead_contact';
          } else if (href.startsWith('mailto:')) {
            elementKey = 'email_click';
            label = `Email Link Click: ${href.replace('mailto:', '')}`;
            category = 'lead_contact';
          } else if (href.includes('github.com')) {
            elementKey = 'github_profile_click';
            label = `GitHub Profile: ${text || href}`;
            category = 'social';
          } else if (href.includes('linkedin.com')) {
            elementKey = 'linkedin_profile_click';
            label = `LinkedIn Profile: ${text || href}`;
            category = 'social';
          } else if (href.includes('/cv') || text.toLowerCase().includes('cv') || text.toLowerCase().includes('resume')) {
            elementKey = 'cv_view_click';
            label = `CV Section Viewed: ${text || 'Curriculum Vitae'}`;
            category = 'resume';
          } else if (href.includes('/templates') || href.includes('/themes')) {
            elementKey = 'theme_view_click';
            label = `Theme Marketplace Click: ${text || href}`;
            category = 'marketplace';
          } else if (href.includes('/tools')) {
            elementKey = 'tool_navigation_click';
            label = `Developer/Finance Tool Click: ${text || href}`;
            category = 'tools';
          } else if (href.includes('/work')) {
            elementKey = 'work_case_study_click';
            label = `Case Study Click: ${text || href}`;
            category = 'portfolio';
          } else if (href.includes('/blog') || href.includes('/articles')) {
            elementKey = 'blog_read_click';
            label = `Article / Blog Click: ${text || href}`;
            category = 'editorial';
          } else if (href.includes('/contact')) {
            elementKey = 'contact_nav_click';
            label = `Contact Page Nav: ${text || 'Hire Me'}`;
            category = 'lead_contact';
          }
        } else if (button) {
          const btnText = (button.innerText || '').trim().replace(/\s+/g, ' ');
          const lowerText = btnText.toLowerCase();

          if (lowerText.includes('pdf') || lowerText.includes('resume') || lowerText.includes('cv')) {
            elementKey = 'cv_download_click';
            label = `CV Download / Action: ${btnText.slice(0, 40)}`;
            category = 'resume';
          } else if (lowerText.includes('download') || lowerText.includes('get code') || lowerText.includes('buy')) {
            elementKey = 'template_download_click';
            label = `Template Action: ${btnText.slice(0, 40)}`;
            category = 'marketplace';
          } else if (lowerText.includes('commission') || lowerText.includes('inquiry') || lowerText.includes('estimate') || lowerText.includes('hire')) {
            elementKey = 'estimator_commission_click';
            label = `Project Estimator / CTA: ${btnText.slice(0, 40)}`;
            category = 'lead_contact';
          } else if (lowerText.includes('format') || lowerText.includes('validate') || lowerText.includes('generate') || lowerText.includes('calculate') || lowerText.includes('copy')) {
            elementKey = 'tool_use_click';
            label = `Tool Run: ${btnText.slice(0, 40)}`;
            category = 'tools';
          } else if (lowerText.includes('mode') || button.getAttribute('aria-label')?.includes('theme')) {
            elementKey = 'theme_toggle_click';
            label = 'Dark/Light Theme Toggle Click';
            category = 'preference';
          }
        }

        if (elementKey) {
          trackSiteClick(elementKey, label || elementKey, category);
        }
      } catch {
        // Silent fail
      }
    };

    window.addEventListener('click', handleGlobalClick, { capture: true, passive: true });
    return () => {
      window.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
}
