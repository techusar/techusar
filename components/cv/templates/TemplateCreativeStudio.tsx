'use client';

import React from 'react';
import { CVData } from '@/data/cv-data';
import { Palette, Sparkles, Layers, Phone, Mail, MapPin, Globe } from 'lucide-react';

export function TemplateCreativeStudio({ data }: { data: CVData }) {
  return (
    <div
      id="cv-template-creative"
      className="bg-[#fcfbf9] text-neutral-900 font-sans p-8 sm:p-12 max-w-[850px] mx-auto rounded-3xl border-2 border-purple-200/80 shadow-xl space-y-8 print:p-0 print:border-none print:shadow-none"
    >
      {/* Creative Hero Banner */}
      <header className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold">
              <Palette className="w-3.5 h-3.5" />
              <span>Creative Portfolio & Engineering Profile</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase pt-2 font-sans">
              {data.name}
            </h1>
            <p className="text-base font-bold text-purple-700">
              {data.title}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs text-xs space-y-1.5 shrink-0">
            <div className="flex items-center gap-2 text-neutral-700">
              <Phone className="w-3.5 h-3.5 text-purple-600" />
              <span>{data.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <Mail className="w-3.5 h-3.5 text-purple-600" />
              <span>{data.email}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <MapPin className="w-3.5 h-3.5 text-purple-600" />
              <span>{data.location}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <Globe className="w-3.5 h-3.5 text-purple-600" />
              <span>{data.website}</span>
            </div>
          </div>
        </div>

        {/* Highlight quote box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 border border-purple-100 text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
          &ldquo;{data.profile}&rdquo;
        </div>
      </header>

      {/* Grid Content */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column (Work & Projects) */}
        <div className="col-span-12 sm:col-span-7 space-y-6">
          {/* Work Experience */}
          <section className="space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-neutral-500 uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Experience & Roles</span>
            </h2>

            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-2xl bg-white border border-neutral-200/70 shadow-xs space-y-1.5"
                >
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-extrabold text-neutral-950">{exp.role}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-neutral-600">{exp.company}</div>
                  <ul className="space-y-1 text-xs text-neutral-700 pt-1 list-disc list-inside">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="leading-snug">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Key Projects */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold tracking-widest text-neutral-500 uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Flagship Projects</span>
            </h2>

            <div className="space-y-3">
              {data.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl bg-white border border-neutral-200/70 space-y-1"
                >
                  <div className="flex justify-between items-baseline text-xs font-bold text-neutral-900">
                    <span>{proj.title}</span>
                    <span className="text-neutral-500 text-[10px]">{proj.period}</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-snug">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (Skills & Tools) */}
        <div className="col-span-12 sm:col-span-5 space-y-6">
          {/* Tech & Design Tools */}
          <section className="p-4 rounded-2xl bg-white border border-neutral-200/70 space-y-3">
            <h3 className="text-xs font-bold text-neutral-900 uppercase">Tech & Tooling</h3>
            <div className="flex flex-wrap gap-1.5">
              {data.techTools.map((tool, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 text-neutral-800 text-[11px] font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="p-4 rounded-2xl bg-white border border-neutral-200/70 space-y-3">
            <h3 className="text-xs font-bold text-neutral-900 uppercase">Disciplines</h3>
            <ul className="space-y-1.5 text-xs text-neutral-700">
              {data.skills.map((skill, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Education */}
          <section className="p-4 rounded-2xl bg-white border border-neutral-200/70 space-y-3">
            <h3 className="text-xs font-bold text-neutral-900 uppercase">Education</h3>
            <div className="space-y-2 text-xs">
              {data.education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="font-bold text-neutral-900">{edu.degree}</div>
                  <div className="text-neutral-500 text-[11px]">
                    {edu.status} {edu.period && `(${edu.period})`}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="p-4 rounded-2xl bg-white border border-neutral-200/70 space-y-2">
            <h3 className="text-xs font-bold text-neutral-900 uppercase">Languages</h3>
            <div className="space-y-1 text-xs text-neutral-700">
              {data.languages.map((l, i) => (
                <div key={i} className="flex justify-between">
                  <span>{l.language}</span>
                  <span className="text-neutral-500">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
