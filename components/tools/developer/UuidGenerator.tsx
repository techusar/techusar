'use client';

import React, { useState } from 'react';
import { KeyRound, Copy, Check, RefreshCw } from 'lucide-react';

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([
    crypto.randomUUID ? crypto.randomUUID() : 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
    crypto.randomUUID ? crypto.randomUUID() : 'c9a646d3-9c61-4cb7-bc7a-ee59c46b619c',
    crypto.randomUUID ? crypto.randomUUID() : '7e4b9ef4-d3a9-450f-a3d2-31121d5119df',
  ]);
  const [quantity, setQuantity] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateBatch = () => {
    const list: string[] = [];
    for (let i = 0; i < quantity; i++) {
      let id = crypto.randomUUID
        ? crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          });
      if (uppercase) id = id.toUpperCase();
      list.push(id);
    }
    setUuids(list);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copySingle = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              Cryptographic UUID v4 Generator
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Generate RFC 4122 compliant version-4 universally unique identifiers for databases and APIs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium"
          >
            <option value={1}>1 UUID</option>
            <option value={5}>5 UUIDs</option>
            <option value={10}>10 UUIDs</option>
            <option value={25}>25 UUIDs</option>
          </select>

          <button
            type="button"
            onClick={generateBatch}
            className="px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate</span>
          </button>

          <button
            type="button"
            onClick={copyAll}
            className="px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy All'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-4 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => {
                setUppercase(e.target.checked);
                setUuids((prev) =>
                  prev.map((id) => (e.target.checked ? id.toUpperCase() : id.toLowerCase()))
                );
              }}
              className="rounded"
            />
            <span className="font-mono text-neutral-600 dark:text-neutral-400">Uppercase Hex</span>
          </label>
        </div>

        <div className="space-y-1.5">
          {uuids.map((id, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-950 hover:border-violet-500/50 transition-colors group"
            >
              <span className="font-mono text-xs text-neutral-900 dark:text-neutral-200 select-all font-semibold">
                {id}
              </span>
              <button
                type="button"
                onClick={() => copySingle(id)}
                className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-violet-500 p-1 text-xs transition-opacity"
                title="Copy single UUID"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
