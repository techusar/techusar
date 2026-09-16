'use client';

import React, { useState, useRef } from 'react';
import { CVData, usmanCVData, CVExperience, CVProject, CVEducation } from '@/data/cv-data';
import { TemplateOriginalPdf } from './templates/TemplateOriginalPdf';
import { TemplateObsidianCyber } from './templates/TemplateObsidianCyber';
import { TemplateSwissModern } from './templates/TemplateSwissModern';
import { TemplateExecutive } from './templates/TemplateExecutive';
import { TemplateCreativeStudio } from './templates/TemplateCreativeStudio';
import { TemplateAtsCompact } from './templates/TemplateAtsCompact';
import {
  Download,
  Edit3,
  Eye,
  RotateCcw,
  Sparkles,
  Plus,
  Trash2,
  Upload,
  FileText,
  Check,
  Layout,
  Share2,
  FileDown,
  Loader2,
} from 'lucide-react';
import { generateAndDownloadPdf, generateCvWithJsPdfAndAutoTable } from '@/lib/pdfGenerator';

export type CVTemplateId =
  | 'original'
  | 'obsidian'
  | 'swiss'
  | 'executive'
  | 'creative'
  | 'ats';

interface TemplateOption {
  id: CVTemplateId;
  name: string;
  description: string;
  tag: string;
}

const templates: TemplateOption[] = [
  {
    id: 'original',
    name: 'Original PDF Exact Replica',
    description: 'Exact replica of Usman’s two-column timeline CV with circular icons and classic layout',
    tag: 'Official PDF',
  },
  {
    id: 'obsidian',
    name: 'Obsidian Cyber (Developer)',
    description: 'TechUsar dark obsidian theme with glowing Blue/Purple borders and monospace badges',
    tag: 'Developer Favorite',
  },
  {
    id: 'swiss',
    name: 'Swiss Modernist',
    description: 'High-contrast editorial typography, numbered sections (01-04), and strict grid rules',
    tag: 'Typography / Editorial',
  },
  {
    id: 'executive',
    name: 'Executive Navy & Slate',
    description: 'Corporate executive banner with structured compartments and clean status tags',
    tag: 'Corporate / SaaS',
  },
  {
    id: 'creative',
    name: 'Creative Studio',
    description: 'Asymmetric layout with gradient pills and expressive modern styling for UI designers',
    tag: 'Design Studio',
  },
  {
    id: 'ats',
    name: 'Compact ATS-Optimized',
    description: 'Single-column high density format engineered for 100% Applicant Tracking System parsers',
    tag: '100% ATS-Friendly',
  },
];

export function CVViewerAndBuilder() {
  const [activeTemplate, setActiveTemplate] = useState<CVTemplateId>('original');
  const [mode, setMode] = useState<'view' | 'builder'>('view');
  const [cvData, setCvData] = useState<CVData>(usmanCVData);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadPdf = async (exportType: 'autoTable' | 'visual' = 'autoTable') => {
    if (pdfLoading) return;
    setPdfLoading(true);
    const cleanName = (cvData.name || 'CV').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${cleanName}_Resume.pdf`;

    if (exportType === 'autoTable') {
      // 100% Vector PDF using jsPDF and autoTable:
      const ok = generateCvWithJsPdfAndAutoTable(cvData, fileName);
      setPdfLoading(false);
      if (!ok) {
        // Fallback to visual capture
        await generateAndDownloadPdf({
          elementId: 'cv-print-container',
          fileName,
          onStart: () => setPdfLoading(true),
          onSuccess: () => setPdfLoading(false),
          onError: () => setPdfLoading(false),
        });
      }
    } else {
      // Visual capture of active custom template (Obsidian, Swiss, Creative, etc.)
      await generateAndDownloadPdf({
        elementId: 'cv-print-container',
        fileName,
        onStart: () => setPdfLoading(true),
        onSuccess: () => setPdfLoading(false),
        onError: () => setPdfLoading(false),
      });
    }
  };

  const handleResetToUsman = () => {
    if (confirm('Load Hafiz Muhammad Usman\'s original CV data? Any unsaved edits will be replaced.')) {
      setCvData(usmanCVData);
    }
  };

  const handleClear = () => {
    if (confirm('Clear all fields to start your fresh blank resume?')) {
      setCvData({
        name: 'YOUR NAME',
        title: 'YOUR PROFESSIONAL TITLE',
        phone: '+1 234 567 8900',
        email: 'your.email@example.com',
        location: 'City, Country',
        website: 'yourportfolio.dev',
        profile: 'Enter your professional profile summary here...',
        skills: ['Skill 1', 'Skill 2'],
        languages: [{ language: 'English', proficiency: 'Fluent' }],
        techTools: ['Tool 1', 'Tool 2'],
        experience: [
          {
            id: 'exp-new-1',
            role: 'Job Role',
            company: 'Company Name',
            period: '2023 - Present',
            bullets: ['Key achievement or responsibility'],
          },
        ],
        projects: [
          {
            id: 'proj-new-1',
            title: 'Project Name',
            period: '2024',
            description: 'Brief description of project outcomes.',
          },
        ],
        education: [
          {
            id: 'edu-new-1',
            degree: 'Degree / Program',
            institution: 'University / College',
            period: '2020 - 2024',
            status: 'Completed',
          },
        ],
      });
      setMode('builder');
    }
  };

  const handleExportJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(cvData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${cvData.name.toLowerCase().replace(/\s+/g, '-')}-resume.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.name && parsed.experience) {
            setCvData(parsed);
            alert('Resume data loaded successfully!');
          }
        } catch {
          alert('Invalid JSON resume file format.');
        }
      };
    }
  };

  // Helper updater for simple fields
  const updateField = (field: keyof CVData, val: unknown) => {
    setCvData((prev) => ({ ...prev, [field]: val }));
  };

  // Skills handlers
  const handleAddSkill = (skill: string) => {
    if (!skill.trim()) return;
    setCvData((prev) => ({ ...prev, skills: [...prev.skills, skill.trim()] }));
  };

  const handleRemoveSkill = (index: number) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Tech tools handlers
  const handleAddTool = (tool: string) => {
    if (!tool.trim()) return;
    setCvData((prev) => ({ ...prev, techTools: [...prev.techTools, tool.trim()] }));
  };

  const handleRemoveTool = (index: number) => {
    setCvData((prev) => ({
      ...prev,
      techTools: prev.techTools.filter((_, i) => i !== index),
    }));
  };

  // Experience handlers
  const handleAddExperience = () => {
    const newExp: CVExperience = {
      id: `exp-${Date.now()}`,
      role: 'New Role / Position',
      company: 'Company Name',
      period: '2024 - NOW',
      bullets: ['Key accomplishment or deliverable'],
    };
    setCvData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const handleUpdateExperience = (id: string, updated: Partial<CVExperience>) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, ...updated } : e)),
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  // Projects handlers
  const handleAddProject = () => {
    const newProj: CVProject = {
      id: `proj-${Date.now()}`,
      title: 'New Project Title',
      period: '2024',
      description: 'Description of software built and impact.',
    };
    setCvData((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const handleUpdateProject = (id: string, updated: Partial<CVProject>) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const handleRemoveProject = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  // Education handlers
  const handleAddEducation = () => {
    const newEdu: CVEducation = {
      id: `edu-${Date.now()}`,
      degree: 'Degree or Certificate',
      period: '2024',
      status: 'Completed',
    };
    setCvData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const handleUpdateEducation = (id: string, updated: Partial<CVEducation>) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((ed) => (ed.id === id ? { ...ed, ...updated } : ed)),
    }));
  };

  const handleRemoveEducation = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((ed) => ed.id !== id),
    }));
  };

  return (
    <div className="space-y-8">
      {/* Top Controls Toolbar (Hidden on print) */}
      <div className="p-4 sm:p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md shadow-xs space-y-5 no-print">
        {/* Row 1: Mode Switch & Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* View vs Builder Toggle */}
            <div className="p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center gap-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode('view')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  mode === 'view'
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-blue-500" />
                <span>Standard Preview</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('builder')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  mode === 'builder'
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Interactive CV Builder Tool</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 ml-1">Free</span>
              </button>
            </div>

            {/* Quick Data Presets */}
            <button
              type="button"
              onClick={handleResetToUsman}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
              title="Reset data to Hafiz Muhammad Usman's original resume"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Load Usman&apos;s CV</span>
            </button>

            {mode === 'builder' && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="Start from scratch"
              >
                Clear Form
              </button>
            )}
          </div>

          {/* Export / Print Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleDownloadPdf('autoTable')}
              disabled={pdfLoading}
              id="cv-download-pdf-btn"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-70 cursor-pointer"
              title="Download vector PDF generated via jsPDF and autoTable (Crisp, Single Page, Selectable Text)"
            >
              {pdfLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download PDF (jsPDF + autoTable)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleDownloadPdf('visual')}
              disabled={pdfLoading}
              id="cv-download-visual-pdf-btn"
              className="px-3 py-2 rounded-xl text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors flex items-center gap-1.5 disabled:opacity-70 cursor-pointer"
              title="Save current visual screen template as PDF"
            >
              <FileText className="w-3.5 h-3.5 text-neutral-500" />
              <span>Save Screen View</span>
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              className="px-3 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors flex items-center gap-1.5"
              title="Export resume data as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-2 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors flex items-center gap-1.5"
              title="Import previously saved JSON"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import JSON</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />
          </div>
        </div>

        {/* Row 2: Template Selector (6 Templates) */}
        <div className="space-y-2 pt-2 border-t border-neutral-200/80 dark:border-neutral-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Layout className="w-3.5 h-3.5 text-blue-500" />
              <span>Select Design Template ({templates.length} Options)</span>
            </span>
            <span className="text-[11px] text-neutral-500 font-mono">
              Live Preview Updates Instantly
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setActiveTemplate(tpl.id)}
                className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  activeTemplate === tpl.id
                    ? 'border-blue-500 dark:border-purple-500 bg-blue-50/50 dark:bg-purple-950/20 shadow-xs'
                    : 'border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/30'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 inline-block font-semibold">
                    {tpl.tag}
                  </span>
                  <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 leading-tight line-clamp-1">
                    {tpl.name}
                  </div>
                </div>

                {activeTemplate === tpl.id && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-blue-600 dark:text-purple-400 font-bold">
                    <Check className="w-3 h-3" />
                    <span>Active</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Container: If Builder Mode is on, show side-by-side or stacked editor */}
      {mode === 'builder' && (
        <div className="p-6 rounded-2xl border border-blue-500/30 bg-blue-50/20 dark:bg-neutral-900/80 space-y-6 no-print animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-500" />
                <span>Live Resume Content Editor</span>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Update fields below. Your preview at the bottom will re-render in real time across any selected template.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-semibold">
              ● Live Sync Enabled
            </span>
          </div>

          {/* Form Grids */}
          <div className="space-y-6">
            {/* Personal Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                1. Personal Credentials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={cvData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={cvData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={cvData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    value={cvData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={cvData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1">Portfolio / Website</label>
                  <input
                    type="text"
                    value={cvData.website}
                    onChange={(e) => updateField('website', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1">Profile Statement</label>
                <textarea
                  rows={3}
                  value={cvData.profile}
                  onChange={(e) => updateField('profile', e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white text-xs leading-relaxed"
                />
              </div>
            </div>

            {/* Skills & Tooling Chips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              {/* Skills */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Core Skills ({cvData.skills.length})
                </label>
                <div className="flex flex-wrap gap-1.5 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 min-h-[44px]">
                  {cvData.skills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300"
                    >
                      <span>{sk}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(idx)}
                        className="hover:text-rose-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = (e.currentTarget.elements.namedItem('newSkill') as HTMLInputElement);
                    handleAddSkill(input.value);
                    input.value = '';
                  }}
                  className="flex gap-2"
                >
                  <input
                    name="newSkill"
                    type="text"
                    placeholder="Type skill & press Enter..."
                    className="flex-1 p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs text-neutral-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold"
                  >
                    Add
                  </button>
                </form>
              </div>

              {/* Tech & Tools */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Tech & Tools ({cvData.techTools.length})
                </label>
                <div className="flex flex-wrap gap-1.5 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 min-h-[44px]">
                  {cvData.techTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300"
                    >
                      <span>{tool}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTool(idx)}
                        className="hover:text-rose-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = (e.currentTarget.elements.namedItem('newTool') as HTMLInputElement);
                    handleAddTool(input.value);
                    input.value = '';
                  }}
                  className="flex gap-2"
                >
                  <input
                    name="newTool"
                    type="text"
                    placeholder="Type tech/tool & press Enter..."
                    className="flex-1 p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs text-neutral-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>

            {/* Work Experiences */}
            <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Work Experience ({cvData.experience.length})
                </h3>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-3">
                {cvData.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                        <input
                          type="text"
                          value={exp.role}
                          placeholder="Role title"
                          onChange={(e) => handleUpdateExperience(exp.id, { role: e.target.value })}
                          className="p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 font-bold"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          placeholder="Company"
                          onChange={(e) => handleUpdateExperience(exp.id, { company: e.target.value })}
                          className="p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
                        />
                        <input
                          type="text"
                          value={exp.period}
                          placeholder="Period (e.g. 2022 - NOW)"
                          onChange={(e) => handleUpdateExperience(exp.id, { period: e.target.value })}
                          className="p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 font-mono"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveExperience(exp.id)}
                        className="p-2 rounded text-neutral-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title="Delete Experience"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-500 mb-1">
                        Bullet points (one per line):
                      </label>
                      <textarea
                        rows={2}
                        value={exp.bullets.join('\n')}
                        onChange={(e) =>
                          handleUpdateExperience(exp.id, {
                            bullets: e.target.value.split('\n').filter((b) => b.trim()),
                          })
                        }
                        className="w-full p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Projects */}
            <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Key Projects ({cvData.projects.length})
                </h3>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {cvData.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={proj.title}
                        placeholder="Project title"
                        onChange={(e) => handleUpdateProject(proj.id, { title: e.target.value })}
                        className="flex-1 p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 font-bold text-xs"
                      />
                      <input
                        type="text"
                        value={proj.period}
                        placeholder="Period"
                        onChange={(e) => handleUpdateProject(proj.id, { period: e.target.value })}
                        className="w-24 p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 font-mono text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(proj.id)}
                        className="p-2 text-neutral-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={proj.description}
                      placeholder="Project description and tech stack used"
                      onChange={(e) => handleUpdateProject(proj.id, { description: e.target.value })}
                      className="w-full p-2 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render Active Template in Canvas */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-500 dark:text-neutral-400 no-print px-1 font-mono">
          <span className="flex items-center gap-1.5">
            <span>Active Template:</span>
            <strong className="text-neutral-900 dark:text-white uppercase px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">{activeTemplate}</strong>
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-block md:hidden text-[11px] text-blue-600 dark:text-purple-400 font-sans">
              👉 Swipe horizontally to inspect full A4 page
            </span>
            <span className="hidden md:inline">Tip: Click &quot;Download PDF&quot; above to save clean PDF directly</span>
          </div>
        </div>

        <div className="w-full overflow-x-auto pb-6 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-100/40 dark:bg-neutral-950/40 p-2 sm:p-4 touch-pan-x">
          <div id="cv-print-container" className="min-w-[780px] max-w-[850px] mx-auto transition-all duration-300 shadow-sm rounded-xl overflow-hidden">
            {activeTemplate === 'original' && <TemplateOriginalPdf data={cvData} />}
            {activeTemplate === 'obsidian' && <TemplateObsidianCyber data={cvData} />}
            {activeTemplate === 'swiss' && <TemplateSwissModern data={cvData} />}
            {activeTemplate === 'executive' && <TemplateExecutive data={cvData} />}
            {activeTemplate === 'creative' && <TemplateCreativeStudio data={cvData} />}
            {activeTemplate === 'ats' && <TemplateAtsCompact data={cvData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
