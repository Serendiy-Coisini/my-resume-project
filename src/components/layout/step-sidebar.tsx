"use client";

import {
  Brain,
  Check,
  Circle,
  Download,
  FileSearch,
  FileText,
  GitCompare,
  MessageSquare,
  Sparkles,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useResumeStore } from "@/store/resume-store";
import type { StepId } from "@/types/resume";

const STEPS: { id: StepId; label: string; icon: React.ElementType }[] = [
  { id: "input", label: "输入材料", icon: FileText },
  { id: "jd-analysis", label: "JD 解析", icon: FileSearch },
  { id: "diagnosis", label: "简历诊断", icon: Target },
  { id: "match", label: "匹配分析", icon: GitCompare },
  { id: "follow-up", label: "经历追问", icon: MessageSquare },
  { id: "optimize", label: "简历优化", icon: Sparkles },
  { id: "interview", label: "面试准备", icon: Brain },
  { id: "export", label: "最终简历导出", icon: Download },
];

export function StepSidebar({ onStepClick }: { onStepClick?: () => void }) {
  const { setCurrentStep, getStepStatus, analysisResult } = useResumeStore();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-neutral-200 bg-white">
      <div className="border-b border-neutral-200 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">分析流程</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        {STEPS.map((step, index) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;
          const isDisabled = status === "disabled";

          return (
            <button
              key={step.id}
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) {
                  setCurrentStep(step.id);
                  onStepClick?.();
                }
              }}
              className={cn(
                "mb-0.5 flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors",
                status === "active" && "bg-neutral-100 text-neutral-900",
                status === "completed" && "text-neutral-600 hover:bg-neutral-50",
                status === "pending" && "text-neutral-500 hover:bg-neutral-50",
                status === "disabled" && "cursor-not-allowed text-neutral-300"
              )}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                {status === "completed" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : status === "active" ? (
                  <Icon className="h-3.5 w-3.5" />
                ) : (
                  <Circle className="h-3 w-3" />
                )}
              </span>
              <span className="flex-1 truncate">{step.label}</span>
              <span className="text-[10px] tabular-nums text-neutral-400">{index + 1}</span>
            </button>
          );
        })}
      </nav>
      {analysisResult?.diagnosis?.overallScore != null && (
        <div className="border-t border-neutral-200 p-3">
          <p className="text-xs text-neutral-400">整体匹配度</p>
          <p className="text-2xl font-semibold tabular-nums text-neutral-900">
            {analysisResult.diagnosis.overallScore}
            <span className="text-sm font-normal text-neutral-400">/100</span>
          </p>
        </div>
      )}
    </aside>
  );
}
