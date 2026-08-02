"use client";

import { Card } from "@/components/ui/card";
import { renderTemplateHTML } from "@/lib/resume-templates";
import { useResumeStore } from "@/store/resume-store";
import type { FinalResume, TemplateId } from "@/types/resume";

interface ResumeTemplateViewProps {
  resume: FinalResume;
  templateId: TemplateId;
}

export function ResumeTemplateView({ resume, templateId }: ResumeTemplateViewProps) {
  const { customTemplateHTML, templateOptions, showPageBreakGuide } = useResumeStore();

  const compiledHTML = renderTemplateHTML(
    resume,
    templateId,
    customTemplateHTML,
    templateOptions
  );

  return (
    <Card className="relative overflow-hidden border-slate-200 shadow-md bg-white rounded-xl">
      {showPageBreakGuide && (
        <div className="pointer-events-none absolute inset-x-0 top-[1050px] z-30 flex items-center justify-between border-b-2 border-dashed border-rose-500 bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-700 backdrop-blur-[1px]">
          <span>✂️ A4 物理分页切割导轨 (标准 A4 纸高度 297mm / 1050px)</span>
          <span>第 1 页切割线</span>
        </div>
      )}
      <iframe
        key={`${templateId}-${JSON.stringify(templateOptions)}`}
        srcDoc={compiledHTML}
        title="Resume Template Live Preview"
        className="w-full min-h-[1100px] border-0 bg-white"
      />
    </Card>
  );
}
