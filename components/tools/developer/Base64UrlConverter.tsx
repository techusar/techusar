'use client';

import React, { useState } from 'react';
import { Binary, Copy, Check, ArrowRightLeft } from 'lucide-react';

export function Base64UrlConverter() {
  const [input, setInput] = useState('Hello from Hafiz Muhammad Usman & TechUsar!');
  const [mode, setMode] = useState<'base64' | 'url'>('base64');
  const [direction, setDirection] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  let output = '';
  let error = '';

  try {
    if (mode === 'base64') {
      if (direction === 'encode') {
        output = btoa(unescape(encodeURIComponent(input)));
      } else {
        output = decodeURIComponent(escape(atob(input)));
      }
    } else {
      if (direction === 'encode') {
        output = encodeURIComponent(input);
      } else {
        output = decodeURIComponent(input);
      }
    }
  } catch (err: unknown) {
    error = 'Malformed input string for decoding.';
  }

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
            <Binary className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              Base64 &amp; URL Encoder / Decoder
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Safe encoding and decoding for tokens, credentials, and API query strings.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="p-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode('base64')}
              className={`px-2.5 py-1 rounded ${
                mode === 'base64' ? 'bg-white dark:bg-neutral-900 text-purple-600 dark:text-purple-400 shadow-xs' : 'text-neutral-500'
              }`}
            >
              Base64
            </button>
            <button
              type="button"
              onClick={() => setMode('url')}
              className={`px-2.5 py-1 rounded ${
                mode === 'url' ? 'bg-white dark:bg-neutral-900 text-purple-600 dark:text-purple-400 shadow-xs' : 'text-neutral-500'
              }`}
            >
              URL Encoding
            </button>
          </div>

          <div className="p-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center text-xs font-semibold">
            <button
              type="button"
              onClick={() => setDirection('encode')}
              className={`px-2.5 py-1 rounded ${
                direction === 'encode' ? 'bg-purple-600 text-white' : 'text-neutral-500'
              }`}
            >
              Encode
            </button>
            <button
              type="button"
              onClick={() => setDirection('decode')}
              className={`px-2.5 py-1 rounded ${
                direction === 'decode' ? 'bg-purple-600 text-white' : 'text-neutral-500'
              }`}
            >
              Decode
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1.5">
          <label className="block font-mono text-neutral-500">
            Input Text ({direction === 'encode' ? 'Plain Text' : `${mode.toUpperCase()} Encoded`})
          </label>
          <textarea
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 font-mono text-xs leading-relaxed text-neutral-900 dark:text-white outline-none focus:border-purple-500 resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="block font-mono text-neutral-500">Converted Output</label>
            {output && !error && (
              <button
                type="button"
                onClick={copyResult}
                className="text-xs text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
          </div>
          <textarea
            rows={8}
            readOnly
            value={error || output}
            className={`w-full p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 font-mono text-xs leading-relaxed outline-none resize-none ${
              error
                ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-600'
                : 'bg-neutral-50/50 dark:bg-neutral-950 text-purple-600 dark:text-purple-400'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
