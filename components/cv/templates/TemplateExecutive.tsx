'use client';

import React from 'react';
import { CVData } from '@/data/cv-data';
import { Phone, Mail, MapPin, Globe, Briefcase, Award, GraduationCap, CheckCircle2 } from 'lucide-react';

export function TemplateExecutive({ data }: { data: CVData }) {
  return (
    <div
      id="cv-template-executive"
      className="bg-white text-slate-800 font-sans max-w-[850px] mx-auto shadow-lg rounded-xl overflow-hidden print:shadow-none print:rounded-none"
    >
      {/* Dark Navy Executive Banner */}
      <header className="bg-[#0f172a] text-white p-8 sm:p-10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase font-sans">
              {data.name}
            </h1>
            <p className="text-sm font-medium text-blue-300 tracking-wide mt-1 font-sans">
              {data.title}
            </p>
          </div>
          <div className="text-xs space-y-1 text-slate-300 sm:text-right">
            <div className="flex items-center sm:justify-end gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{data.phone}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{data.email}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{data.location}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{data.website}</span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
          {data.profile}
        </p>
      </header>

      {/* Main Content */}
      <div className="p-8 sm:p-10 grid grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="col-span-12 sm:col-span-8 space-y-6">
          {/* Work Experience */}
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b-2 border-blue-900 pb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Professional Experience</span>
            </h2>

            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-[11px] font-semibold text-blue-800">{exp.period}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-600">{exp.company}</div>
                  <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
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

          {/* Key Projects */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b-2 border-blue-900 pb-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Key Software Projects</span>
            </h2>

            <div className="space-y-3">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
                    <span>{proj.title}</span>
                    <span className="text-blue-700 font-medium text-[11px]">{proj.period}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 sm:col-span-4 space-y-6">
          {/* Tech & Tools */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b-2 border-blue-900 pb-1">
              Tech & Tools
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {data.techTools.map((tool, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-[11px] font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b-2 border-blue-900 pb-1">
              Core Skills
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {data.skills.map((skill, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Education */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b-2 border-blue-900 pb-1 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education</span>
            </h2>
            <div className="space-y-2 text-xs">
              {data.education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-500 text-[11px]">{edu.status} {edu.period && `• ${edu.period}`}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b-2 border-blue-900 pb-1">
              Languages
            </h2>
            <div className="space-y-1 text-xs text-slate-700">
              {data.languages.map((l, i) => (
                <div key={i} className="flex justify-between">
                  <span className="font-medium">{l.language}</span>
                  <span className="text-slate-500">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
