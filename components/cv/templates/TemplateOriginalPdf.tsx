'use client';

import React from 'react';
import { CVData } from '@/data/cv-data';
import { Phone, Mail, MapPin, Globe, User, Briefcase, GraduationCap } from 'lucide-react';

export function TemplateOriginalPdf({ data }: { data: CVData }) {
  return (
    <div
      id="cv-template-original"
      className="bg-white text-neutral-900 font-sans p-8 sm:p-12 w-full max-w-[850px] mx-auto shadow-md print:shadow-none print:p-0 print:max-w-none"
    >
      {/* Top Header */}
      <header className="pb-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#253245] uppercase font-sans">
          {data.name}
        </h1>
        <p className="text-sm sm:text-base font-semibold tracking-wider text-neutral-700 uppercase mt-1">
          {data.title}
        </p>
        {/* Horizontal Divider Line */}
        <div className="w-full h-[2.5px] bg-[#253245] mt-4" />
      </header>

      {/* Two Column Grid */}
      <div className="grid grid-cols-12 gap-8 pt-6">
        {/* Left Column (~35%) */}
        <div className="col-span-4 space-y-6 pr-2">
          {/* CONTACT Section */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold tracking-widest text-[#253245] uppercase border-b-2 border-[#253245] pb-1 inline-block">
              CONTACT
            </h2>
            <div className="space-y-2.5 text-xs text-neutral-800 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#253245] shrink-0" />
                <a href={`tel:${data.phone}`} className="hover:underline">
                  {data.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#253245] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${data.email}`}
                  className="hover:underline break-all leading-tight"
                >
                  {data.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#253245] shrink-0" />
                <span>{data.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#253245] shrink-0" />
                <a
                  href={`https://${data.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline break-all"
                >
                  {data.website}
                </a>
              </div>
            </div>
          </section>

          {/* SKILLS Section */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold tracking-widest text-[#253245] uppercase border-b-2 border-[#253245] pb-1 inline-block">
              SKILLS
            </h2>
            <ul className="space-y-1.5 text-xs text-neutral-800 list-disc list-inside">
              {data.skills.map((skill, i) => (
                <li key={i} className="leading-snug">
                  <span className="font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* LANGUAGES Section */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold tracking-widest text-[#253245] uppercase border-b-2 border-[#253245] pb-1 inline-block">
              LANGUAGES
            </h2>
            <ul className="space-y-1.5 text-xs text-neutral-800 list-disc list-inside">
              {data.languages.map((lang, i) => (
                <li key={i} className="leading-snug">
                  <span className="font-medium">{lang.language}</span> — {lang.proficiency}
                </li>
              ))}
            </ul>
          </section>

          {/* TECH & TOOLS Section */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold tracking-widest text-[#253245] uppercase border-b-2 border-[#253245] pb-1 inline-block">
              TECH & TOOLS
            </h2>
            <ul className="space-y-1.5 text-xs text-neutral-800 list-disc list-inside">
              {data.techTools.map((tool, i) => (
                <li key={i} className="leading-snug">
                  <span className="font-medium">{tool}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Main Column (~65%) with vertical timeline */}
        <div className="col-span-8 pl-4 border-l border-neutral-300 space-y-7">
          {/* PROFILE */}
          <section className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                <User className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-sm font-extrabold tracking-widest text-black uppercase">
                PROFILE
              </h2>
            </div>
            <div className="pl-8">
              <p className="text-xs text-neutral-800 leading-relaxed italic">
                &ldquo;{data.profile}&rdquo;
              </p>
            </div>
          </section>

          {/* WORK EXPERIENCE */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-sm font-extrabold tracking-widest text-black uppercase">
                WORK EXPERIENCE
              </h2>
            </div>

            {/* Continuous timeline line */}
            <div className="pl-3 sm:pl-3 relative space-y-5 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-neutral-400">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 space-y-1">
                  {/* Timeline circle node */}
                  <span className="absolute left-[8px] top-1.5 w-2 h-2 rounded-full border border-neutral-700 bg-white" />
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-xs font-bold text-neutral-900">{exp.role}</h3>
                    <span className="text-[11px] font-medium text-neutral-600 font-mono">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-700 font-medium">{exp.company}</div>
                  <ul className="space-y-1 text-xs text-neutral-700 pt-1 list-disc list-inside">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-snug">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* KEY PROJECTS inside timeline */}
              <div className="relative pl-6 pt-2 space-y-3">
                <span className="absolute left-[8px] top-3.5 w-2 h-2 rounded-full border border-neutral-700 bg-white" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-black">
                  KEY PROJECTS
                </h3>

                <div className="space-y-3">
                  {data.projects.map((proj) => (
                    <div key={proj.id} className="space-y-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <span className="text-xs font-bold text-neutral-900">{proj.title}</span>
                        <span className="text-[11px] font-medium text-neutral-600 font-mono">
                          {proj.period}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-700 leading-snug pl-2 border-l border-neutral-200">
                        • {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* EDUCATION */}
          <section className="space-y-4 pt-2">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-sm font-extrabold tracking-widest text-black uppercase">
                EDUCATION
              </h2>
            </div>

            {/* Education timeline */}
            <div className="pl-3 sm:pl-3 relative space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-neutral-400">
              {data.education.map((edu) => (
                <div key={edu.id} className="relative pl-6 space-y-0.5">
                  <span className="absolute left-[8px] top-1.5 w-2 h-2 rounded-full border border-neutral-700 bg-white" />
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-xs font-bold text-neutral-900">{edu.degree}</h3>
                    {edu.period && (
                      <span className="text-[11px] font-medium text-neutral-600 font-mono">
                        {edu.period}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-neutral-600">{edu.status}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
