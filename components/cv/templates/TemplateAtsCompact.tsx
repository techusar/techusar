'use client';

import React from 'react';
import { CVData } from '@/data/cv-data';

export function TemplateAtsCompact({ data }: { data: CVData }) {
  return (
    <div
      id="cv-template-ats"
      className="bg-white text-black font-sans p-8 sm:p-12 max-w-[850px] mx-auto shadow-xs border border-neutral-300 print:p-0 print:border-none print:shadow-none space-y-5 text-xs"
    >
      {/* Centered ATS Standard Header */}
      <header className="text-center space-y-1 border-b border-black pb-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-950 font-sans">
          {data.name}
        </h1>
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-800 font-sans">
          {data.title}
        </p>
        <div className="text-[11px] text-neutral-700 flex flex-wrap justify-center gap-3 pt-1">
          <span>{data.phone}</span>
          <span>•</span>
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.location}</span>
          <span>•</span>
          <span>{data.website}</span>
        </div>
      </header>

      {/* Summary */}
      <section className="space-y-1">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5">
          Professional Summary
        </h2>
        <p className="text-neutral-800 leading-relaxed pt-1">{data.profile}</p>
      </section>

      {/* Technical & Core Skills */}
      <section className="space-y-1">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5">
          Technical Skills & Tooling
        </h2>
        <div className="space-y-1 pt-1 text-neutral-800">
          <div>
            <strong className="font-semibold">Technologies:</strong> {data.techTools.join(', ')}
          </div>
          <div>
            <strong className="font-semibold">Competencies:</strong> {data.skills.join(', ')}
          </div>
          <div>
            <strong className="font-semibold">Languages:</strong>{' '}
            {data.languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5">
          Work Experience
        </h2>
        <div className="space-y-3 pt-1">
          {data.experience.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <div className="flex justify-between items-baseline font-bold text-black">
                <span>
                  {exp.role}, <span className="font-normal">{exp.company}</span>
                </span>
                <span className="font-mono text-[11px]">{exp.period}</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-neutral-800 pl-1">
                {exp.bullets.map((b, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5">
          Key Projects & Software
        </h2>
        <div className="space-y-2 pt-1">
          {data.projects.map((proj) => (
            <div key={proj.id} className="space-y-0.5">
              <div className="flex justify-between items-baseline font-bold text-black">
                <span>{proj.title}</span>
                <span className="font-mono text-[11px]">{proj.period}</span>
              </div>
              <p className="text-neutral-800 leading-relaxed pl-1">• {proj.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5">
          Education
        </h2>
        <div className="space-y-1 pt-1">
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-baseline text-neutral-800">
              <div>
                <strong className="font-semibold text-black">{edu.degree}</strong> — {edu.status}
              </div>
              {edu.period && <span className="font-mono text-[11px]">{edu.period}</span>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
