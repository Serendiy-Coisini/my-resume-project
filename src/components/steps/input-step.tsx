"use client";

import { useRef, useState } from "react";
import { Camera, CheckCircle2, FileUp, Loader2, ShieldCheck, Sparkles, User, Wand2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SectionTitle } from "@/components/shared/ui-helpers";
import { runResumeAnalysisStream } from "@/services/ai/resumeAgent";
import { useResumeStore } from "@/store/resume-store";
import type { CompanyType, JobStage } from "@/types/resume";

const STAGE_STEPS = [
  { id: "jd-analysis", name: "JD 拆解", label: "正在拆解岗位 JD 核心要求", startPct: 15, endPct: 35 },
  { id: "diagnosis", name: "匹配诊断", label: "正在深度诊断与计算匹配打分", startPct: 40, endPct: 65 },
  { id: "optimize", name: "简历改写", label: "正在定制优化简历 Bullet Points", startPct: 70, endPct: 82 },
  { id: "interview", name: "面试预测", label: "正在预测高频面试考点与回答", startPct: 85, endPct: 95 },
];

export function InputStep() {
  const {
    userInput,
    setUserInput,
    loadExampleData,
    setAnalysisResult,
    setAnalyzing,
    setAnalysisError,
    isAnalyzing,
    analysisError,
    setCurrentStep,
    enablePIIMasking,
    setEnablePIIMasking,
    analysisStage,
    setAnalysisStage,
    updatePartialAnalysisResult,
  } = useResumeStore();

  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const dragCounter = useRef(0);

  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setUserInput({ avatarUrl: base64 });
      }
    };
    reader.readAsDataURL(file);
  };

  const processPdfFile = async (file: File) => {
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      setPdfError("仅支持上传 PDF 格式文件 (.pdf)");
      return;
    }

    setUploadingPdf(true);
    setPdfError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "解析 PDF 失败");
      }

      setUserInput({ originalResume: data.text });
    } catch (err) {
      setPdfError(err instanceof Error ? err.message : "解析 PDF 失败，请直接粘贴文本");
    } finally {
      setUploadingPdf(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processPdfFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processPdfFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!userInput.targetRole || !userInput.jobDescription || !userInput.originalResume) {
      return;
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setAnalyzing(true);
    setAnalysisError(null);

    const completedStagesList: string[] = [];

    setAnalysisStage({
      stageId: "jd-analysis",
      label: "正在发起 AI 大模型分析...",
      currentStepNumber: 1,
      totalSteps: 4,
      progressPercent: 8,
      completedStages: [],
    });

    try {
      const result = await runResumeAnalysisStream(
        userInput,
        "ai-product",
        {
          enablePIIMasking,
          onStageChange: (stageId, status) => {
            const stepIdx = STAGE_STEPS.findIndex((s) => s.id === stageId);
            const stepInfo = STAGE_STEPS[stepIdx];

            if (status === "start") {
              setAnalysisStage({
                stageId,
                label: stepInfo ? `${stepInfo.label}...` : "正在分析中...",
                currentStepNumber: stepIdx >= 0 ? stepIdx + 1 : 1,
                totalSteps: 4,
                progressPercent: stepInfo ? stepInfo.startPct : 50,
                completedStages: [...completedStagesList],
              });
            } else if (status === "complete") {
              if (!completedStagesList.includes(stageId)) {
                completedStagesList.push(stageId);
              }
              setAnalysisStage({
                stageId,
                label: stepInfo ? `${stepInfo.name} 完成` : "阶段完成",
                currentStepNumber: stepIdx >= 0 ? stepIdx + 1 : 1,
                totalSteps: 4,
                progressPercent: stepInfo ? stepInfo.endPct : 70,
                completedStages: [...completedStagesList],
              });
            }
          },
          onPartialResult: (partial) => {
            updatePartialAnalysisResult(partial);
          },
        },
        controller.signal
      );

      setAnalysisResult(result);
      setAnalysisStage({
        stageId: "complete",
        label: "🎉 分析完成！正在为您生成分析报告...",
        currentStepNumber: 4,
        totalSteps: 4,
        progressPercent: 100,
        completedStages: STAGE_STEPS.map((s) => s.id),
      });

      await new Promise((resolve) => setTimeout(resolve, 600));
      setCurrentStep("jd-analysis");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setAnalysisError(error instanceof Error ? error.message : "分析失败，请稍后重试");
    } finally {
      abortControllerRef.current = null;
      setAnalyzing(false);
      setAnalysisStage(null);
    }
  };

  const handleCancel = () => {
    abortControllerRef.current?.abort();
  };

  const canAnalyze =
    userInput.targetRole.trim() &&
    userInput.jobDescription.trim() &&
    userInput.originalResume.trim();

  return (
    <div>
      <SectionTitle
        title="输入材料"
        description="填写目标岗位信息与原始简历，Agent 将基于 JD 进行定制分析与优化"
      />

      {/* PII Privacy Protection Switch Banner */}
      <div className="mb-4 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-emerald-900 shadow-sm">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
          <div>
            <span className="font-semibold text-emerald-950">AI 敏感隐私脱敏保护</span>
            <span className="ml-2 text-emerald-700">
              开启后，手机号、电子邮箱、姓名等个人隐私将在发送给 AI 前自动加密脱敏，分析完成后自动原位解密还原。
            </span>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer ml-3 shrink-0">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enablePIIMasking}
            onChange={(e) => setEnablePIIMasking(e.target.checked)}
          />
          <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
        </label>
      </div>

      <div className="mb-4 flex gap-2">
        <Button variant="outline" size="sm" onClick={loadExampleData}>
          <Wand2 className="h-3.5 w-3.5" />
          使用示例数据
        </Button>
        <Button size="sm" onClick={handleAnalyze} disabled={!canAnalyze || isAnalyzing}>
          {isAnalyzing ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              分析中...
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              开始分析
            </>
          )}
        </Button>
        {isAnalyzing && (
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            <X className="h-3.5 w-3.5" />
            取消
          </Button>
        )}
      </div>

      {/* Multi-stage High-End Progress Card */}
      {isAnalyzing && analysisStage && (
        <div className="mb-4 rounded-xl border border-blue-200/80 bg-gradient-to-b from-blue-50/90 via-indigo-50/40 to-white p-4 shadow-sm space-y-3.5 transition-all">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-semibold text-blue-950">
              {analysisStage.progressPercent < 100 ? (
                <Loader2 className="h-4 w-4 animate-spin text-blue-600 shrink-0" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              )}
              <span>{analysisStage.label}</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-xs font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
              <span>{analysisStage.progressPercent}%</span>
            </div>
          </div>

          <Progress
            value={analysisStage.progressPercent}
            className="h-2.5 bg-blue-100/80 shadow-inner"
            indicatorClassName="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md transition-all duration-500"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {STAGE_STEPS.map((step, idx) => {
              const isCompleted = analysisStage.completedStages.includes(step.id);
              const isActive = analysisStage.stageId === step.id && !isCompleted;

              return (
                <div
                  key={step.id}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 text-[11px] font-medium transition-all ${
                    isCompleted
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs"
                      : isActive
                      ? "bg-blue-100/90 text-blue-900 border border-blue-300 font-semibold ring-2 ring-blue-400/20"
                      : "bg-neutral-100/60 text-neutral-400 border border-neutral-200/40"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                  ) : isActive ? (
                    <Loader2 className="h-3 w-3 animate-spin text-blue-600 shrink-0" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 shrink-0" />
                  )}
                  <span className="truncate">
                    {idx + 1}. {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {analysisError && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {analysisError}
        </div>
      )}

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">目标岗位信息</CardTitle>
            <CardDescription>帮助 Agent 理解你的求职方向</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="targetRole">目标岗位</Label>
              <Input
                id="targetRole"
                placeholder="如：AI 产品经理"
                value={userInput.targetRole}
                onChange={(e) => setUserInput({ targetRole: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">行业</Label>
              <Input
                id="industry"
                placeholder="如：企业服务 / SaaS"
                value={userInput.industry}
                onChange={(e) => setUserInput({ industry: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>公司类型</Label>
              <Select
                value={userInput.companyType}
                onValueChange={(v) => setUserInput({ companyType: v as CompanyType })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="大厂">大厂</SelectItem>
                  <SelectItem value="中型公司">中型公司</SelectItem>
                  <SelectItem value="创业公司">创业公司</SelectItem>
                  <SelectItem value="外企">外企</SelectItem>
                  <SelectItem value="国企">国企</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>求职阶段</Label>
              <Select
                value={userInput.jobStage}
                onValueChange={(v) => setUserInput({ jobStage: v as JobStage })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="校招">校招</SelectItem>
                  <SelectItem value="社招-初级">社招-初级</SelectItem>
                  <SelectItem value="社招-中级">社招-中级</SelectItem>
                  <SelectItem value="社招-高级">社招-高级</SelectItem>
                  <SelectItem value="转行">转行</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="highlightSkills">希望突出的能力</Label>
              <Input
                id="highlightSkills"
                placeholder="如：AI 产品规划、数据驱动、ToB 需求分析"
                value={userInput.highlightSkills}
                onChange={(e) => setUserInput({ highlightSkills: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>个人证件照 / 头像（可选）</Label>
              <div className="flex items-center gap-4">
                <div className="relative flex h-20 w-16 items-center justify-center rounded-md border border-dashed border-neutral-300 bg-neutral-50 overflow-hidden">
                  {userInput.avatarUrl ? (
                    <img
                      src={userInput.avatarUrl}
                      alt="证件照"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-neutral-400" />
                  )}
                </div>
                <div className="space-y-1.5">
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => avatarInputRef.current?.click()}
                    >
                      <Camera className="h-3.5 w-3.5" />
                      {userInput.avatarUrl ? "更换照片" : "上传证件照"}
                    </Button>
                    {userInput.avatarUrl && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setUserInput({ avatarUrl: "" })}
                      >
                        删除照片
                      </Button>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    支持上传寸照/形象照，将自动呈现并应用于双栏及自定义简历模板中
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">目标 JD</CardTitle>
            <CardDescription>粘贴完整岗位描述，Agent 将解析职责与要求</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[200px] font-mono text-xs leading-relaxed"
              placeholder="粘贴岗位 JD..."
              value={userInput.jobDescription}
              onChange={(e) => setUserInput({ jobDescription: e.target.value })}
            />
          </CardContent>
        </Card>

        <Card
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative overflow-hidden transition-all ${
            isDragging
              ? "border-2 border-dashed border-blue-500 bg-blue-50/80 shadow-md"
              : ""
          }`}
        >
          <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm">原始简历</CardTitle>
              <CardDescription>
                支持拖拽 PDF 文件到框内直接上传，或点击按钮解析全文本
              </CardDescription>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handlePdfUpload}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploadingPdf}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadingPdf ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    解析 PDF 中...
                  </>
                ) : (
                  <>
                    <FileUp className="h-3.5 w-3.5" />
                    上传 PDF 简历
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-2">
            {isDragging && (
              <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center rounded-lg bg-blue-500/15 backdrop-blur-[2px]">
                <div className="flex items-center gap-2.5 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg animate-bounce">
                  <FileUp className="h-4 w-4" />
                  松开鼠标，自动解析 PDF 简历
                </div>
              </div>
            )}
            {pdfError && (
              <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                {pdfError}
              </div>
            )}
            <Textarea
              className="min-h-[240px] font-mono text-xs leading-relaxed"
              placeholder="可以直接拖拽 PDF 文件到这里，或粘贴简历内容..."
              value={userInput.originalResume}
              onChange={(e) => setUserInput({ originalResume: e.target.value })}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">补充信息（可选）</CardTitle>
            <CardDescription>项目细节、转型动机、特殊说明等</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[100px] text-sm"
              placeholder="补充 Agent 需要了解的信息..."
              value={userInput.additionalInfo}
              onChange={(e) => setUserInput({ additionalInfo: e.target.value })}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
