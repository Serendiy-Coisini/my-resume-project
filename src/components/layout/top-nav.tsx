"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchAIStatus } from "@/services/ai/resumeAgent";
import { useResumeStore } from "@/store/resume-store";

export function TopNav() {
  const { aiMode, setAiMode } = useResumeStore();
  const [mockReason, setMockReason] = useState<string | null>(null);

  useEffect(() => {
    fetchAIStatus()
      .then((status) => {
        setAiMode(status.mode);
        if (status.reason === "missing_api_key") {
          setMockReason("未配置 LLM_API_KEY");
        } else if (status.reason === "forced") {
          setMockReason("已强制 Mock");
        } else {
          setMockReason(null);
        }
      })
      .catch(() => setAiMode("mock"));
  }, [setAiMode]);

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50">
          <FileText className="h-3.5 w-3.5 text-neutral-700" />
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-tight text-neutral-900">简历专家</h1>
        </div>
        <span className="rounded-md border border-neutral-200 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">
          JD 定制简历优化 Agent
        </span>
        {aiMode && (
          <Badge variant={aiMode === "llm" ? "success" : "secondary"} className="font-normal">
            {aiMode === "llm" ? "AI 模式" : mockReason ? `Mock · ${mockReason}` : "Mock 模式"}
          </Badge>
        )}
      </div>
      <p className="hidden text-xs text-neutral-400 sm:block">
        基于目标岗位 JD · 诊断 · 匹配 · 优化 · 面试准备
      </p>
    </header>
  );
}
