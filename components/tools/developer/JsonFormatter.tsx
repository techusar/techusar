'use client';

import React, { useState } from 'react';
import { Braces, Copy, Check, Sparkles, Minimize2, AlertCircle } from 'lucide-react';

export function JsonFormatter() {
  const [input, setInput] = useState(`{
  "name": "Hafiz Muhammad Usman",
  "role": "Graphic Designer & Full-Stack Developer",
  "verified": true,
  "stack": ["React", "Next.js", "Node.js", "PHP", ".NET", "Adobe"],
  "stats": {
    "yearsDesigning": 5,
    "yearsWebDev": 2,
    "hafizQuran": true
  }
}`);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (spaces = 2) => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (err: unknown) {
      setError((err as Error).message);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err: unknown) {
      setError((err as Error).message);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    const textToCopy = output || input;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Braces className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              JSON Formatter, Validator &amp; Minifier
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Clean, validate, and minify API payloads with instant syntax error detection.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => formatJson(2)}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Format (2 spaces)</span>
          </button>
          <button
            type="button"
            onClick={() => formatJson(4)}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors"
          >
            <span>Format (4 spaces)</span>
          </button>
          <button
            type="button"
            onClick={minifyJson}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Minify</span>
          </button>
          <button
            type="button"
            onClick={copyToClipboard}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Result'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="font-mono">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-neutral-500">Input Raw JSON</label>
          <textarea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 font-mono text-xs leading-relaxed text-neutral-900 dark:text-white outline-none focus:border-blue-500 resize-none"
            placeholder="Paste your JSON string here..."
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-neutral-500">Formatted Output</label>
          <textarea
            rows={12}
            readOnly
            value={output || (error ? '// Invalid JSON syntax' : '// Click Format or Minify above to generate result')}
            className="w-full p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950 font-mono text-xs leading-relaxed text-blue-600 dark:text-blue-400 outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}
