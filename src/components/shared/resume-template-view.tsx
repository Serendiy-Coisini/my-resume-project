"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { compileCustomTemplate } from "@/lib/resume-templates";
import { useResumeStore } from "@/store/resume-store";
import type { FinalResume, TemplateId } from "@/types/resume";

interface ResumeTemplateViewProps {
  resume: FinalResume;
  templateId: TemplateId;
}

export function ResumeTemplateView({ resume, templateId }: ResumeTemplateViewProps) {
  const { personalInfo } = resume;
  const { userInput, customTemplateHTML } = useResumeStore();
  const avatar = personalInfo.avatarUrl || userInput.avatarUrl;

  // Custom Uploaded Template Render
  if (templateId === "custom") {
    const compiledHTML = compileCustomTemplate(customTemplateHTML, resume);
    return (
      <Card className="overflow-hidden border-purple-200 shadow-sm bg-white">
        <iframe
          srcDoc={compiledHTML}
          title="Custom Resume Template Preview"
          className="w-full min-h-[600px] border-0"
        />
      </Card>
    );
  }

  if (templateId === "timeline-tech") {
    return (
      <Card className="p-6 border-neutral-200 shadow-sm">
        <div className="border-b-2 border-blue-600 pb-3 mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{personalInfo.name}</h2>
            <p className="text-xs text-slate-500 mt-1">
              {personalInfo.email} &nbsp;|&nbsp; {personalInfo.phone} &nbsp;|&nbsp; {personalInfo.location} &nbsp;|&nbsp; 意向：{resume.jobIntent}
            </p>
          </div>
          {avatar && (
            <img
              src={avatar}
              alt={personalInfo.name}
              className="h-20 w-16 object-cover rounded border border-slate-300 shadow-sm shrink-0"
            />
          )}
        </div>

        <div className="space-y-5">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-blue-100 pb-1 mb-2">
              职业摘要
            </h4>
            <p className="text-xs leading-relaxed text-slate-700">{resume.summary}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-blue-100 pb-1 mb-2">
              核心能力
            </h4>
            <div className="flex flex-wrap gap-1">
              {resume.coreSkills.map((s) => (
                <Badge key={s} variant="secondary" className="text-[11px] font-normal bg-blue-50 text-blue-700 border border-blue-200">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-blue-100 pb-1 mb-3">
              工作经历
            </h4>
            <div className="border-l-2 border-slate-200 pl-4 ml-1 space-y-4">
              {resume.workExperience.map((w) => (
                <div key={`${w.company}-${w.period}`} className="relative">
                  <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-600 border-2 border-white" />
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs font-semibold text-slate-900">
                      {w.company} · {w.role}
                    </p>
                    <span className="text-[11px] text-slate-400">{w.period}</span>
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {w.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-xs text-slate-600">
                        <span className="text-slate-300">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-blue-100 pb-1 mb-3">
              项目经历
            </h4>
            <div className="border-l-2 border-slate-200 pl-4 ml-1 space-y-4">
              {resume.projectExperience.map((p) => (
                <div key={`${p.name}-${p.period}`} className="relative">
                  <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-600 border-2 border-white" />
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs font-semibold text-slate-900">
                      {p.name} · {p.role}
                    </p>
                    <span className="text-[11px] text-slate-400">{p.period}</span>
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-xs text-slate-600">
                        <span className="text-slate-300">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-blue-100 pb-1 mb-2">
              技能工具
            </h4>
            <p className="text-xs text-slate-600">{resume.skillsAndTools.join(" · ")}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b border-blue-100 pb-1 mb-2">
              教育背景
            </h4>
            <p className="text-xs text-slate-700">
              {resume.education.school} · {resume.education.degree} · {resume.education.period}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (templateId === "corporate-banner") {
    return (
      <Card className="overflow-hidden border-neutral-200 shadow-sm">
        <div className="bg-indigo-950 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{personalInfo.name}</h2>
            <p className="text-xs text-indigo-200 mt-1">
              {personalInfo.email} | {personalInfo.phone} | {personalInfo.location} | 求职意向：{resume.jobIntent}
            </p>
          </div>
          {avatar && (
            <img
              src={avatar}
              alt={personalInfo.name}
              className="h-20 w-16 object-cover rounded border-2 border-white shadow-sm shrink-0"
            />
          )}
        </div>

        <CardContent className="p-6 space-y-5">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-l-4 border-indigo-600 pl-2.5 mb-2">
              职业摘要
            </h4>
            <p className="text-xs leading-relaxed text-slate-700">{resume.summary}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-l-4 border-indigo-600 pl-2.5 mb-2">
              核心技能矩阵
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {resume.coreSkills.map((s) => (
                <Badge key={s} variant="outline" className="text-xs font-normal border-slate-300 text-slate-700 bg-slate-50">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-l-4 border-indigo-600 pl-2.5 mb-3">
              工作经历
            </h4>
            <div className="space-y-4">
              {resume.workExperience.map((w) => (
                <div key={`${w.company}-${w.period}`}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs font-semibold text-slate-900">
                      {w.company} · {w.role}
                    </p>
                    <span className="text-[11px] text-slate-400">{w.period}</span>
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {w.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-xs text-slate-600">
                        <span className="text-indigo-400">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-l-4 border-indigo-600 pl-2.5 mb-3">
              项目经历
            </h4>
            <div className="space-y-4">
              {resume.projectExperience.map((p) => (
                <div key={`${p.name}-${p.period}`}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs font-semibold text-slate-900">
                      {p.name} · {p.role}
                    </p>
                    <span className="text-[11px] text-slate-400">{p.period}</span>
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-xs text-slate-600">
                        <span className="text-indigo-400">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-l-4 border-indigo-600 pl-2.5 mb-2">
              技能工具
            </h4>
            <p className="text-xs text-slate-600">{resume.skillsAndTools.join(" · ")}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-l-4 border-indigo-600 pl-2.5 mb-2">
              教育背景
            </h4>
            <p className="text-xs text-slate-700">
              {resume.education.school} · {resume.education.degree} · {resume.education.period}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (templateId === "grid-cards") {
    return (
      <div className="space-y-4">
        <Card className="p-4 bg-emerald-50/60 border-emerald-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-emerald-950">{personalInfo.name}</h2>
            <p className="text-xs text-emerald-700 mt-1">
              {personalInfo.email} | {personalInfo.phone} | {personalInfo.location} | 意向：{resume.jobIntent}
            </p>
          </div>
          {avatar && (
            <img
              src={avatar}
              alt={personalInfo.name}
              className="h-20 w-16 object-cover rounded border border-emerald-300 shadow-sm shrink-0"
            />
          )}
        </Card>

        <Card className="p-4 border-neutral-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">职业摘要</h4>
          <p className="text-xs leading-relaxed text-slate-700">{resume.summary}</p>
        </Card>

        <Card className="p-4 border-neutral-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">核心技能</h4>
          <div className="flex flex-wrap gap-1.5">
            {resume.coreSkills.map((s) => (
              <Badge key={s} variant="secondary" className="text-xs bg-emerald-100/80 text-emerald-800 border-0">
                {s}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-4 border-neutral-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">工作经历</h4>
          <div className="space-y-4">
            {resume.workExperience.map((w) => (
              <div key={`${w.company}-${w.period}`}>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-semibold text-slate-900">
                    {w.company} · {w.role}
                  </p>
                  <span className="text-[11px] text-slate-400">{w.period}</span>
                </div>
                <ul className="mt-1.5 space-y-1">
                  {w.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-600">
                      <span className="text-emerald-400">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 border-neutral-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">项目经历</h4>
          <div className="space-y-4">
            {resume.projectExperience.map((p) => (
              <div key={`${p.name}-${p.period}`}>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-semibold text-slate-900">
                    {p.name} · {p.role}
                  </p>
                  <span className="text-[11px] text-slate-400">{p.period}</span>
                </div>
                <ul className="mt-1.5 space-y-1">
                  {p.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-600">
                      <span className="text-emerald-400">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 border-neutral-200 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700">技能工具 & 教育背景</h4>
          <p className="text-xs text-slate-600"><strong>技能：</strong>{resume.skillsAndTools.join(" · ")}</p>
          <p className="text-xs text-slate-700"><strong>教育：</strong>{resume.education.school} · {resume.education.degree} ({resume.education.period})</p>
        </Card>
      </div>
    );
  }

  // Default Modern Sidebar Layout
  return (
    <Card className="overflow-hidden border-neutral-200 shadow-sm">
      <div className="grid sm:grid-cols-[240px_1fr]">
        {/* Left Sidebar */}
        <div className="bg-slate-50 border-r border-slate-200 p-6 space-y-6">
          {avatar && (
            <div className="mb-3">
              <img
                src={avatar}
                alt={personalInfo.name}
                className="h-28 w-24 object-cover rounded border border-slate-300 shadow-sm"
              />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{personalInfo.name}</h2>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-1">
              {resume.jobIntent}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
              联系方式
            </h4>
            <div className="space-y-1 text-xs text-slate-600">
              <p className="truncate">📧 {personalInfo.email}</p>
              <p>📱 {personalInfo.phone}</p>
              <p>📍 {personalInfo.location}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
              核心能力
            </h4>
            <div className="flex flex-wrap gap-1">
              {resume.coreSkills.map((s) => (
                <Badge key={s} variant="secondary" className="text-[11px] font-normal bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-0">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
              技能工具
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {resume.skillsAndTools.join(" · ")}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
              教育背景
            </h4>
            <p className="text-xs font-semibold text-slate-900">{resume.education.school}</p>
            <p className="text-xs text-slate-500">
              {resume.education.degree} ({resume.education.period})
            </p>
          </div>
        </div>

        {/* Right Main Content */}
        <div className="p-6 space-y-5">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-blue-600 pb-1 mb-2">
              职业摘要
            </h4>
            <p className="text-xs leading-relaxed text-slate-700">{resume.summary}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-blue-600 pb-1 mb-3">
              工作经历
            </h4>
            <div className="space-y-4">
              {resume.workExperience.map((w) => (
                <div key={`${w.company}-${w.period}`}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs font-semibold text-slate-900">
                      {w.company} · {w.role}
                    </p>
                    <span className="text-[11px] text-slate-400">{w.period}</span>
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {w.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-xs text-slate-600">
                        <span className="text-slate-300">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-blue-600 pb-1 mb-3">
              项目经历
            </h4>
            <div className="space-y-4">
              {resume.projectExperience.map((p) => (
                <div key={`${p.name}-${p.period}`}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs font-semibold text-slate-900">
                      {p.name} · {p.role}
                    </p>
                    <span className="text-[11px] text-slate-400">{p.period}</span>
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-xs text-slate-600">
                        <span className="text-slate-300">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
