"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  EmptyState,
  ListSection,
  ScoreRing,
  SectionTitle,
} from "@/components/shared/ui-helpers";
import { useResumeStore } from "@/store/resume-store";

export function DiagnosisStep() {
  const { analysisResult, setCurrentStep } = useResumeStore();

  if (!analysisResult || !analysisResult.diagnosis) {
    return (
      <EmptyState
        message="请先完成输入材料并开始分析"
        actionLabel="返回输入材料"
        onAction={() => setCurrentStep("input")}
      />
    );
  }

  const { diagnosis } = analysisResult;

  return (
    <div>
      <SectionTitle
        title="简历诊断"
        description="基于 JD 要求评估当前简历的匹配度与主要问题"
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-[160px_1fr]">
        <Card className="flex items-center justify-center py-6">
          <ScoreRing score={diagnosis.overallScore} />
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">维度评分</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {diagnosis.dimensionScores.map((d) => (
              <div key={d.dimension}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{d.dimension}</span>
                  <span className="tabular-nums text-neutral-500">{d.score}</span>
                </div>
                <Progress value={d.score} className="mb-1" />
                <p className="text-xs text-neutral-500">{d.comment}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">主要问题</CardTitle>
          </CardHeader>
          <CardContent>
            <ListSection title="" items={diagnosis.mainIssues} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">优先修改建议</CardTitle>
          </CardHeader>
          <CardContent>
            <ListSection title="" items={diagnosis.prioritySuggestions} />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep("jd-analysis")}>
          <ChevronLeft className="h-4 w-4" />
          上一步：JD 解析
        </Button>
        <Button variant="outline" size="sm" onClick={() => setCurrentStep("match")}>
          下一步：匹配分析
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
