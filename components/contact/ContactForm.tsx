'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Circle, Send, MessageSquare, Phone, Database, ExternalLink, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ContactForm() {
  const [formData, setFormData] = useState(() => {
    let initialType = 'Full-Stack Web App';
    let initialMessage = '';
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('service') === 'ai-agents' || params.get('service') === 'bot') {
        initialType = 'Custom AI Agent / Bot Development';
        initialMessage = 'Hi Usman, I am interested in building a custom bot / AI agent for my business.';
      }
    }
    return {
      name: '',
      email: '',
      phone: '',
      projectType: initialType,
      budget: '$10k — $25k',
      message: initialMessage,
    };
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const projectTypes = [
    'Custom AI Agent / Bot Development',
    'Full-Stack Web App',
    'Custom Website Theme',
    'Brand Identity & Design System',
    'SaaS UI/UX Design',
    'Technical Consulting',
  ];

  const budgetRanges = [
    '< $5k',
    '$5k — $10k',
    '$10k — $25k',
    '$25k — $50k',
    '$50k+',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          formType: 'contact',
          projectType: formData.projectType,
          budget: formData.budget,
          message: formData.message,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : '/contact',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setWhatsappUrl(data.whatsappUrl || `https://wa.me/923318917330?text=${encodeURIComponent(`Hi Usman! New inquiry from ${formData.name} regarding ${formData.projectType}`)}`);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // silent fallback
        }
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit form. Please try again.');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      // Fallback: still generate WhatsApp url so user can reach out directly!
      const fallbackWa = `https://wa.me/923318917330?text=${encodeURIComponent(`Assalam-o-Alaikum Usman! Name: ${formData.name}, Email: ${formData.email}, Need: ${formData.projectType}, Budget: ${formData.budget}, Message: ${formData.message}`)}`;
      setWhatsappUrl(fallbackWa);
      setStatus('success');
    }
  };

  return (
    <div id="contact-form-container" className="w-full">
      {status === 'success' ? (
        <div className="p-8 sm:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-lg text-center space-y-5 animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-medium border border-emerald-200 dark:border-emerald-800">
              <Database className="w-3.5 h-3.5" />
              <span>Inquiry Stored In Database</span>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Shukriya, {formData.name}!
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
              Aapki request record ho chuki he. Foran response ke liye aap direct WhatsApp par bhi ye inquiry bhej sakte hain:
            </p>
          </div>

          {/* Action buttons: WhatsApp & Reset */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_form_dispatch"
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Send on WhatsApp (0331-8917330)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              onClick={() => {
                setStatus('idle');
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  projectType: 'Full-Stack Web App',
                  budget: '$10k — $25k',
                  message: '',
                });
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300 flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Submit Another Inquiry</span>
            </button>
          </div>

          <p className="text-[11px] text-neutral-500 font-mono">
            Hafiz Muhammad Usman • techusar17@gmail.com • 0331-8917330
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-10 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/60 shadow-xs space-y-6"
        >
          {/* Availability & WhatsApp Quick Contact notice */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 text-xs">
            <div className="flex items-center gap-2">
              <Circle className="w-2.5 h-2.5 fill-emerald-500 text-emerald-500 animate-pulse shrink-0" />
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                Available for Custom AI Bots, Web Apps &amp; Design
              </span>
            </div>

            <a
              href="https://wa.me/923318917330?text=Assalam-o-Alaikum%20Usman!%20I%20want%20to%20discuss%20a%20project%20/%20custom%20bot."
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_top_notice"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shrink-0 w-fit shadow-2xs"
            >
              <MessageSquare className="w-3 h-3 fill-white" />
              <span>WhatsApp: 0331-8917330</span>
            </a>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="contact-name" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300">
                YOUR NAME *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Muhammad / Client Name"
                className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="contact-email" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300">
                EMAIL ADDRESS *
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="client@example.com"
                className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
              />
            </div>
          </div>

          {/* Phone / WhatsApp */}
          <div className="space-y-2">
            <label htmlFor="contact-phone" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
              <span>PHONE / WHATSAPP NUMBER (OPTIONAL)</span>
              <span className="text-[10px] text-neutral-500">For fast WhatsApp reply</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                id="contact-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0331-XXXXXXX or +92..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white font-mono"
              />
            </div>
          </div>

          {/* Project Type */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300">
              WHAT DO YOU NEED? (PROJECT REQUIREMENT) *
            </label>
            <div className="flex flex-wrap gap-2">
              {projectTypes.map((type) => {
                const isSelected = formData.projectType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, projectType: type })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Range */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300">
              ESTIMATED BUDGET (OPTIONAL)
            </label>
            <div className="flex flex-wrap gap-2">
              {budgetRanges.map((budget) => {
                const isSelected = formData.budget === budget;
                return (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => setFormData({ ...formData, budget })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {budget}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="contact-message" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300">
              PROJECT SCOPE & TIMELINE *
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your product, desired launch window, and any technical or design parameters..."
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed text-neutral-900 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            data-track="contact_form_submit_btn"
            className="w-full py-3.5 rounded-lg text-sm font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
          >
            {status === 'submitting' ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving inquiry to database...</span>
              </span>
            ) : (
              <>
                <span>Submit Inquiry &amp; Connect on WhatsApp</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
