"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeTemplateView } from "@/components/shared/resume-template-view";
import { TemplateSelector } from "@/components/shared/template-selector";
import { EmptyState, SectionTitle } from "@/components/shared/ui-helpers";
import { useResumeStore } from "@/store/resume-store";

export function FinalResumeStep() {
  const { analysisResult, selectedTemplate, setCurrentStep } = useResumeStore();

  if (!analysisResult || !analysisResult.finalResume) {
    return (
      <EmptyState
        message="请先完成输入材料并开始分析"
        actionLabel="返回输入材料"
        onAction={() => setCurrentStep("input")}
      />
    );
  }

  const { finalResume } = analysisResult;

  return (
    <div>
      <SectionTitle
        title="最终简历"
        description="选择偏好的简历模板与排版风格，预览最终优化好的专属简历"
      />

      {/* Template Selection Cards */}
      <TemplateSelector />

      {/* Dynamic Template Preview View */}
      <div className="mb-6">
        <ResumeTemplateView resume={finalResume} templateId={selectedTemplate} />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep("optimize")}>
          <ChevronLeft className="h-4 w-4" />
          上一步：简历优化
        </Button>
        <Button variant="outline" size="sm" onClick={() => setCurrentStep("interview")}>
          下一步：面试准备
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
