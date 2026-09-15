'use client';

import React from 'react';
import { CVData } from '@/data/cv-data';
import { Phone, Mail, MapPin, Globe, Terminal, Sparkles, Code2, Briefcase, GraduationCap, Cpu } from 'lucide-react';

export function TemplateObsidianCyber({ data }: { data: CVData }) {
  return (
    <div
      id="cv-template-obsidian"
      className="bg-[#07090e] text-neutral-100 font-sans p-8 sm:p-12 max-w-[850px] mx-auto rounded-2xl border border-blue-500/30 shadow-2xl space-y-8 print:bg-black print:border-none print:p-0 print:text-white"
    >
      {/* Top Banner Header */}
      <header className="p-6 rounded-xl border border-blue-500/20 bg-neutral-900/60 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-bl from-blue-600/10 via-purple-600/10 to-transparent blur-2xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-[10px] font-mono text-blue-400 mb-2">
              <Terminal className="w-3 h-3" />
              <span>DEVELOPER_PROFILE.SYS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight gradient-text-blue-purple uppercase font-sans">
              {data.name}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-300 mt-1">
              &gt; {data.title}
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-400 space-y-1 sm:text-right">
            <div className="flex items-center sm:justify-end gap-1.5 text-neutral-300">
              <Phone className="w-3 h-3 text-blue-400" />
              <span>{data.phone}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5 text-neutral-300">
              <Mail className="w-3 h-3 text-purple-400" />
              <span>{data.email}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5 text-neutral-400">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>{data.location}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5 text-neutral-400">
              <Globe className="w-3 h-3 text-indigo-400" />
              <span>{data.website}</span>
            </div>
          </div>
        </div>

        {/* Profile quote */}
        <div className="mt-4 pt-4 border-t border-neutral-800 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
          <span className="text-blue-400 font-mono font-semibold">{'// MISSION: '}</span>
          <span>{data.profile}</span>
        </div>
      </header>

      {/* Grid Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Side: Skills & Tech stack */}
        <div className="col-span-12 sm:col-span-4 space-y-6">
          {/* Tech & Tools */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Tech &amp; Tools</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {data.techTools.map((tool, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-blue-950/50 border border-blue-800/60 text-blue-300 font-mono text-[10px]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Core Competencies */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Skills</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-neutral-300 font-sans">
              {data.skills.map((skill, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Languages
            </h3>
            <div className="space-y-1.5 text-xs text-neutral-300 font-sans">
              {data.languages.map((l, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span>{l.language}</span>
                  <span className="text-neutral-500 font-mono text-[11px]">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Experience, Projects, Education */}
        <div className="col-span-12 sm:col-span-8 space-y-6">
          {/* Experience */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span>Work Experience</span>
            </h3>

            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/30 space-y-2 hover:border-blue-500/40 transition-colors"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                    <span className="text-[10px] font-mono text-blue-400">{exp.period}</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">{exp.company}</div>
                  <ul className="space-y-1 text-xs text-neutral-300 pt-1">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Key Projects */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Key Projects</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl border border-neutral-800/80 bg-neutral-900/30 space-y-1"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-white">{proj.title}</span>
                    <span className="text-[10px] font-mono text-purple-400">{proj.period}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-snug">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2 border-b border-neutral-800 pb-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Education & Credentials</span>
            </h3>

            <div className="space-y-2">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-3 rounded-lg border border-neutral-800/60 bg-neutral-900/20 flex flex-wrap items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-neutral-200">{edu.degree}</span>
                    <span className="text-neutral-500 font-mono ml-2">({edu.status})</span>
                  </div>
                  {edu.period && (
                    <span className="text-[10px] font-mono text-neutral-400">{edu.period}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
