"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState, ListSection, SectionTitle } from "@/components/shared/ui-helpers";
import { useResumeStore } from "@/store/resume-store";

export function InterviewStep() {
  const { analysisResult, setCurrentStep } = useResumeStore();

  if (!analysisResult) {
    return <EmptyState message="请先完成输入材料并开始分析" />;
  }

  const { interviewPrep } = analysisResult;

  return (
    <div>
      <SectionTitle
        title="面试准备"
        description="基于简历与 JD 生成面试追问、证据准备与自我介绍"
      />

      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">自我介绍</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-neutral-700">{interviewPrep.selfIntroduction}</p>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">可能追问（10 题）</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {interviewPrep.likelyQuestions.map((q, i) => (
            <div key={i} className="rounded-md border border-neutral-100 p-4">
              <p className="mb-2 text-sm font-medium">
                Q{i + 1}. {q.question}
              </p>
              <p className="mb-2 text-sm text-neutral-600">
                <span className="font-medium text-neutral-700">建议回答：</span>
                {q.suggestedAnswer}
              </p>
              {q.evidenceNeeded.length > 0 && (
                <p className="text-xs text-neutral-500">
                  <span className="font-medium">需准备证据：</span>
                  {q.evidenceNeeded.join("；")}
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">需要准备的证据</CardTitle>
          </CardHeader>
          <CardContent>
            <ListSection title="" items={interviewPrep.evidenceToPrepare} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">可能夸大的表达</CardTitle>
          </CardHeader>
          <CardContent>
            <ListSection title="" items={interviewPrep.possibleExaggerations} />
          </CardContent>
        </Card>

        <Card className="sm:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">建议补充的数据</CardTitle>
          </CardHeader>
          <CardContent>
            <ListSection title="" items={interviewPrep.dataToSupplement} />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep("export")}>
          下一步：导出结果
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
