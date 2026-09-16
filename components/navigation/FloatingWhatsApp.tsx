'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  // Hide on admin portal
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const phone = '923318917330';
  const displayPhone = '0331-8917330';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = userMsg.trim() || 'Assalam-o-Alaikum Usman! I would like to discuss a project / custom bot.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setUserMsg('');
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 flex flex-col items-end">
      {/* Popover Chat Prompt */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-1.5rem)] sm:w-96 max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-3.5 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs sm:text-sm">
                  HU
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-300 ring-2 ring-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-xs sm:text-sm leading-tight">Hafiz Muhammad Usman</h4>
                <p className="text-[10px] sm:text-[11px] text-emerald-100 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Online on WhatsApp ({displayPhone})
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3 sm:p-4 bg-neutral-50/70 dark:bg-neutral-900/90 text-xs space-y-2.5 sm:space-y-3">
            <div className="bg-white dark:bg-neutral-800 p-2.5 sm:p-3 rounded-xl rounded-tl-none border border-neutral-200/60 dark:border-neutral-700/60 shadow-2xs space-y-1">
              <p className="text-neutral-800 dark:text-neutral-200 font-medium">
                Assalam-o-Alaikum! 👋
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                Need a custom AI bot, full-stack web app, or graphic design? Send me a message directly on WhatsApp for an instant response.
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-1 pt-0.5">
              {[
                'Need a custom WhatsApp bot 🤖',
                'Web development quote 💻',
                'Graphic design & branding 🎨',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setUserMsg(suggestion)}
                  className="text-[10px] sm:text-[11px] px-2 py-1 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-emerald-500 transition-colors text-left"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSend} className="pt-1 flex items-center gap-2">
              <input
                type="text"
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                data-track="whatsapp_send_prompt"
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shrink-0 shadow-xs"
                title="Send on WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-track="whatsapp_floating_button"
        data-track-label="Floating WhatsApp 03318917330"
        aria-label="Chat on WhatsApp 03318917330"
        className="group relative flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-600/30 transition-all active:scale-95 duration-200"
      >
        <span className="relative flex h-2.5 sm:h-3 w-2.5 sm:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 sm:h-3 w-2.5 sm:w-3 bg-white" />
        </span>
        <MessageSquare className="w-4 sm:w-5 h-4 sm:h-5 fill-white" />
        <span className="text-xs font-semibold hidden sm:inline-block">WhatsApp Us</span>
        <span className="text-[11px] font-mono opacity-90 hidden md:inline-block">0331-8917330</span>
      </button>
    </div>
  );
}
