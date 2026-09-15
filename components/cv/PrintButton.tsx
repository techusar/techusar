'use client';

import React, { useState } from 'react';
import { Download, FileDown, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { generateAndDownloadPdf, generateCvWithJsPdfAndAutoTable } from '@/lib/pdfGenerator';
import { usmanCVData } from '@/data/cv-data';

interface PrintButtonProps {
  elementId?: string;
  fileName?: string;
}

export function PrintButton({
  elementId = 'cv-print-container',
  fileName = 'Hafiz_Muhammad_Usman_CV.pdf',
}: PrintButtonProps) {
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Direct vector generation using jsPDF & autoTable
  const handleDownloadVectorPdf = () => {
    if (loading) return;
    setLoading(true);
    const ok = generateCvWithJsPdfAndAutoTable(usmanCVData, fileName);
    setLoading(false);
    if (ok) {
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }
  };

  // High-res visual capture
  const handleDownloadVisualPdf = async () => {
    if (loading) return;

    await generateAndDownloadPdf({
      elementId,
      fileName,
      onStart: () => setLoading(true),
      onSuccess: () => {
        setLoading(false);
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 3000);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  return (
    <div className="inline-flex items-center gap-2 no-print">
      <button
        onClick={handleDownloadVectorPdf}
        id="cv-download-pdf-primary-button"
        type="button"
        disabled={loading}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm active:scale-98 disabled:opacity-70 cursor-pointer"
        title="Generate direct vector PDF with jsPDF and autoTable (Crisp, Single Page, Clean Format)"
      >
        {loading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Generating...</span>
          </>
        ) : downloaded ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>Downloaded!</span>
          </>
        ) : (
          <>
            <FileDown className="w-3.5 h-3.5" />
            <span>Download PDF (jsPDF + autoTable)</span>
          </>
        )}
      </button>

      <button
        onClick={handleDownloadVisualPdf}
        id="cv-download-pdf-secondary-button"
        type="button"
        disabled={loading}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors disabled:opacity-70 cursor-pointer"
        title="Capture active visual template as PDF"
      >
        <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
        <span>Save Visual View</span>
      </button>
    </div>
  );
}
