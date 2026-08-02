"use client";

import { useEffect, useState } from "react";
import { FileText, Menu, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchAIStatus } from "@/services/ai/resumeAgent";
import { useResumeStore } from "@/store/resume-store";

export function TopNav({ onMenuClick }: { onMenuClick?: () => void }) {
  const { aiMode, setAiMode, analysisResult, reset } = useResumeStore();
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

  const handleReset = () => {
    if (window.confirm("确定要重新开始吗？当前所有输入和分析结果将被清除。")) {
      reset();
    }
  };

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-4">
      <div className="flex items-center gap-2.5">
        {onMenuClick && (
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-neutral-100 md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-4 w-4 text-neutral-600" />
          </button>
        )}
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50">
          <FileText className="h-3.5 w-3.5 text-neutral-700" />
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-tight text-neutral-900">简历专家</h1>
        </div>
        <span className="hidden rounded-md border border-neutral-200 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 sm:inline">
          JD 定制简历优化 Agent
        </span>
        {aiMode && (
          <Badge variant={aiMode === "llm" ? "success" : "secondary"} className="hidden font-normal sm:inline-flex">
            {aiMode === "llm" ? "AI 模式" : mockReason ? `Mock · ${mockReason}` : "Mock 模式"}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2">
        <p className="hidden text-xs text-neutral-400 lg:block">
          基于目标岗位 JD · 诊断 · 匹配 · 优化 · 面试准备
        </p>
        {analysisResult && (
          <Button variant="ghost" size="sm" className="h-7 text-xs text-neutral-500" onClick={handleReset}>
            <RotateCcw className="h-3 w-3" />
            <span className="hidden sm:inline">重新开始</span>
          </Button>
        )}
      </div>
    </header>
  );
}
