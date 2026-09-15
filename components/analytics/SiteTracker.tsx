'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

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

        const anchor = target.closest('a') as HTMLAnchorElement | null;
        const button = target.closest('button') as HTMLButtonElement | null;
        const trackedElem = target.closest('[data-track]') as HTMLElement | null;

        let elementKey = '';
        let label = '';

        if (trackedElem) {
          elementKey = trackedElem.getAttribute('data-track') || 'tracked_element';
          label = trackedElem.getAttribute('data-track-label') || trackedElem.innerText?.slice(0, 40) || 'Custom Element';
        } else if (anchor) {
          const href = anchor.href || '';
          if (href.includes('wa.me') || href.includes('whatsapp')) {
            elementKey = 'whatsapp_click';
            label = `WhatsApp chat click (${anchor.innerText?.slice(0, 30) || 'WhatsApp'})`;
          } else if (href.startsWith('mailto:')) {
            elementKey = 'email_click';
            label = `Email click: ${href.replace('mailto:', '')}`;
          } else if (href.includes('/contact')) {
            elementKey = 'contact_nav_click';
            label = `Navigated to Contact from ${window.location.pathname}`;
          } else if (href.includes('/templates')) {
            elementKey = 'template_view_click';
            label = `Clicked Template: ${anchor.innerText?.slice(0, 30) || href}`;
          } else if (href.includes('/tools')) {
            elementKey = 'tool_view_click';
            label = `Clicked Tool: ${anchor.innerText?.slice(0, 30) || href}`;
          }
        } else if (button) {
          const btnText = (button.innerText || '').trim();
          if (btnText.toLowerCase().includes('download')) {
            elementKey = 'template_download_click';
            label = `Download clicked: ${btnText.slice(0, 40)}`;
          } else if (btnText.toLowerCase().includes('commission') || btnText.toLowerCase().includes('inquiry')) {
            elementKey = 'estimator_commission_click';
            label = `Inquiry button clicked: ${btnText.slice(0, 40)}`;
          } else if (btnText.toLowerCase().includes('calculate') || btnText.toLowerCase().includes('generate')) {
            elementKey = 'tool_use_click';
            label = `Tool action: ${btnText.slice(0, 40)}`;
          }
        }

        if (elementKey) {
          fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'click',
              element: elementKey,
              label: label || elementKey,
              page: window.location.pathname || '/',
            }),
          }).catch(() => {});
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
