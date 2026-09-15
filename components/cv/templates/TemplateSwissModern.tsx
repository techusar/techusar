'use client';

import React from 'react';
import { CVData } from '@/data/cv-data';

export function TemplateSwissModern({ data }: { data: CVData }) {
  return (
    <div
      id="cv-template-swiss"
      className="bg-[#fafafa] text-neutral-900 font-sans p-8 sm:p-14 max-w-[850px] mx-auto shadow-md border-t-8 border-neutral-950 print:p-0 print:border-none print:shadow-none"
    >
      {/* Massive Swiss Display Header */}
      <header className="pb-8 border-b-2 border-neutral-950 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 block mb-1">
              Curriculum Vitae / Portfolio Index
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight font-sans text-neutral-950">
              {data.name}
            </h1>
            <p className="text-sm sm:text-base font-semibold tracking-tight text-neutral-700 uppercase mt-2">
              {data.title}
            </p>
          </div>
          <div className="text-xs font-mono text-neutral-600 space-y-0.5 sm:text-right border-l-2 sm:border-l-0 sm:border-r-2 border-neutral-900 pl-3 sm:pl-0 sm:pr-3">
            <div>{data.phone}</div>
            <div>{data.email}</div>
            <div>{data.location}</div>
            <div>{data.website}</div>
          </div>
        </div>

        {/* Profile statement */}
        <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed max-w-3xl pt-2 font-normal font-sans">
          {data.profile}
        </p>
      </header>

      {/* Structured Sections with Swiss Numbering */}
      <div className="space-y-8 pt-8">
        {/* 01: Work Experience */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3 border-b border-neutral-300 pb-1">
            <span className="text-xs font-mono font-bold text-neutral-400">01</span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-950 font-sans">
              Work Experience
            </h2>
          </div>

          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-4 text-xs font-sans">
                  <div className="font-bold text-neutral-950">{exp.role}</div>
                  <div className="text-neutral-600">{exp.company}</div>
                  <div className="text-neutral-400 font-mono text-[11px] mt-0.5">{exp.period}</div>
                </div>
                <div className="col-span-12 sm:col-span-8 space-y-1.5 text-xs text-neutral-700 font-sans">
                  <ul className="space-y-1 list-disc list-inside">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 02: Key Projects */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3 border-b border-neutral-300 pb-1">
            <span className="text-xs font-mono font-bold text-neutral-400">02</span>
            <h2 className="text-sm font-black uppercase tracking-wider text-neutral-950">
              Selected Systems & Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {data.projects.map((proj) => (
              <div key={proj.id} className="p-3.5 border border-neutral-300 bg-white space-y-1">
                <div className="flex justify-between font-bold text-neutral-950">
                  <span>{proj.title}</span>
                  <span className="text-neutral-400 font-mono text-[10px]">{proj.period}</span>
                </div>
                <p className="text-neutral-600 leading-normal">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 03: Skills & Technology Matrix */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3 border-b border-neutral-300 pb-1">
            <span className="text-xs font-mono font-bold text-neutral-400">03</span>
            <h2 className="text-sm font-black uppercase tracking-wider text-neutral-950">
              Skills & Tooling Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1.5">
              <div className="font-bold text-neutral-950 uppercase text-[11px]">Core Skills</div>
              <ul className="space-y-1 text-neutral-600">
                {data.skills.map((s, i) => (
                  <li key={i}>— {s}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-neutral-950 uppercase text-[11px]">Tech & Tools</div>
              <div className="flex flex-wrap gap-1">
                {data.techTools.map((t, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 bg-neutral-200 text-neutral-800 text-[10px] font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-neutral-950 uppercase text-[11px]">Languages</div>
              <ul className="space-y-1 text-neutral-600">
                {data.languages.map((l, i) => (
                  <li key={i}>
                    — {l.language} ({l.proficiency})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 04: Education */}
        <section className="space-y-4">
          <div className="flex items-baseline gap-3 border-b border-neutral-300 pb-1">
            <span className="text-xs font-mono font-bold text-neutral-400">04</span>
            <h2 className="text-sm font-black uppercase tracking-wider text-neutral-950">
              Academic Background
            </h2>
          </div>

          <div className="space-y-2 text-xs">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-center py-1 border-b border-neutral-200">
                <div>
                  <span className="font-bold text-neutral-950">{edu.degree}</span>
                  <span className="text-neutral-500 ml-2">[{edu.status}]</span>
                </div>
                {edu.period && <span className="text-neutral-400 font-mono text-[11px]">{edu.period}</span>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
