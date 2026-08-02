"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Loader2, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState, SectionTitle } from "@/components/shared/ui-helpers";
import { applyFollowUpBullets, generateFollowUpBullet } from "@/services/ai/resumeAgent";
import { useResumeStore } from "@/store/resume-store";

export function FollowUpStep() {
  const {
    analysisResult,
    userInput,
    optimizeStyle,
    updateFollowUpAnswer,
    setFollowUpBullet,
    setAnalysisResult,
    setCurrentStep,
  } = useResumeStore();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!analysisResult) {
    return (
      <EmptyState
        message="请先完成输入材料并开始分析"
        actionLabel="返回输入材料"
        onAction={() => setCurrentStep("input")}
      />
    );
  }

  const { followUpQuestions } = analysisResult;

  // Collect all non-empty generated bullets
  const generatedBullets = followUpQuestions
    .filter((q) => q.generatedBullet.trim())
    .map((q) => ({ purpose: q.purpose, bullet: q.generatedBullet }));

  const handleGenerateBullet = async (id: string) => {
    const question = followUpQuestions.find((q) => q.id === id);
    if (!question?.userAnswer.trim()) return;

    setLoadingId(id);
    setError(null);
    setApplied(false);
    try {
      const bullet = await generateFollowUpBullet(
        userInput,
        question.question,
        question.purpose,
        question.userAnswer
      );
      setFollowUpBullet(id, bullet);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bullet 生成失败");
    } finally {
      setLoadingId(null);
    }
  };

  const handleApplyBullets = async () => {
    if (!generatedBullets.length) return;
    setApplying(true);
    setError(null);
    try {
      const { optimizedItems, finalResume } = await applyFollowUpBullets(
        userInput,
        optimizeStyle,
        generatedBullets
      );
      setAnalysisResult({
        ...analysisResult,
        optimizedItems,
        finalResume,
      });
      setApplied(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "应用追问结果失败");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div>
      <SectionTitle
        title="经历追问"
        description="Agent 针对简历缺口生成追问，填写回答后可生成可用于简历的 bullet"
      />

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 space-y-4">
        {followUpQuestions.map((q, index) => (
          <Card key={q.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-medium text-neutral-400">
                      追问 {index + 1}
                    </span>
                    <Badge variant="outline" className="font-normal">
                      {q.purpose}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm font-medium leading-snug">{q.question}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor={`answer-${q.id}`}>你的回答</Label>
                <Textarea
                  id={`answer-${q.id}`}
                  className="min-h-[80px] text-sm"
                  placeholder="填写具体经历、数据和方法..."
                  value={q.userAnswer}
                  onChange={(e) => updateFollowUpAnswer(q.id, e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={!q.userAnswer.trim() || loadingId === q.id}
                onClick={() => handleGenerateBullet(q.id)}
              >
                {loadingId === q.id ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    生成简历 bullet
                  </>
                )}
              </Button>
              {q.generatedBullet && (
                <div className="rounded-md border border-emerald-200 bg-emerald-50/50 p-3">
                  <p className="mb-1 text-xs font-medium text-emerald-700">生成的 bullet</p>
                  <p className="text-sm leading-relaxed text-neutral-700">{q.generatedBullet}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Apply bullets to resume */}
      {generatedBullets.length > 0 && (
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50/50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-blue-900">
                已生成 {generatedBullets.length} 条 bullet
              </p>
              <p className="text-xs text-blue-700">
                点击应用后，追问补充的经历将融入简历优化和最终简历中
              </p>
            </div>
            <Button
              size="sm"
              disabled={applying}
              onClick={handleApplyBullets}
              className={applied ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              {applying ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  应用中...
                </>
              ) : applied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  已应用到简历
                </>
              ) : (
                <>
                  <Wand2 className="h-3.5 w-3.5" />
                  应用到简历
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep("match")}>
          <ChevronLeft className="h-4 w-4" />
          上一步：匹配分析
        </Button>
        <Button variant="outline" size="sm" onClick={() => setCurrentStep("optimize")}>
          下一步：简历优化
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
