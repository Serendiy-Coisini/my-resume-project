"use client";

import { useRef, useState } from "react";
import { Camera, Check, ChevronLeft, Copy, Download, FileSpreadsheet, FileText, Printer, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ResumeTemplateView } from "@/components/shared/resume-template-view";
import { TemplateSelector } from "@/components/shared/template-selector";
import { EmptyState, SectionTitle } from "@/components/shared/ui-helpers";
import { useResumeStore } from "@/store/resume-store";
import { copyToClipboard, exportResumeAsPDF, exportResumeAsWord, formatResumeAsText } from "@/lib/utils";

import { LegoDesigner } from "@/components/legoDesigner";
import { LayoutGrid, Sparkles } from "lucide-react";

import { TemplateCustomizer } from "@/components/shared/template-customizer";

export function ExportStep() {
  const {
    userInput,
    setUserInput,
    analysisResult,
    setAnalysisResult,
    selectedTemplate,
    templateOptions,
    customTemplateHTML,
    copied,
    setCopied,
    setCurrentStep,
  } = useResumeStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"standard" | "lego">("standard");
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  if (!analysisResult) {
    return (
      <EmptyState
        message="请先完成输入材料并开始分析"
        actionLabel="返回输入材料"
        onAction={() => setCurrentStep("input")}
      />
    );
  }

  const { finalResume } = analysisResult;
  const resumeText = formatResumeAsText(finalResume);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setUserInput({ avatarUrl: base64 });
        setAnalysisResult({
          ...analysisResult,
          finalResume: {
            ...finalResume,
            personalInfo: {
              ...finalResume.personalInfo,
              avatarUrl: base64,
            },
          },
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setUserInput({ avatarUrl: "" });
    setAnalysisResult({
      ...analysisResult,
      finalResume: {
        ...finalResume,
        personalInfo: {
          ...finalResume.personalInfo,
          avatarUrl: "",
        },
      },
    });
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(resumeText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportWord = () => {
    exportResumeAsWord(finalResume, selectedTemplate, customTemplateHTML, templateOptions);
  };

  const handleExportPDF = () => {
    exportResumeAsPDF(finalResume, selectedTemplate, customTemplateHTML, templateOptions);
  };

  return (
    <div>
      <SectionTitle
        title="最终简历导出"
        description="预览与配置喜欢的排版模版，或使用积木设计器自由拖拽编辑，一键导出精美 Word / PDF 文件"
      />

      {/* Mode Switcher Tabs */}
      <div className="mb-6 flex justify-center">
        <div className="bg-slate-200/80 p-1 rounded-xl shadow-inner inline-flex border border-slate-300/60">
          <button
            type="button"
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === "standard"
                ? "bg-white text-blue-600 shadow-md scale-[1.02]"
                : "text-slate-600 hover:text-slate-900"
            }`}
            onClick={() => setViewMode("standard")}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            标准模版预览导出
          </button>
          <button
            type="button"
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === "lego"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-[1.02]"
                : "text-slate-600 hover:text-slate-900"
            }`}
            onClick={() => setViewMode("lego")}
          >
            <LayoutGrid className="w-4 h-4 text-emerald-400" />
            🧱 积木自由排版设计器
          </button>
        </div>
      </div>

      {viewMode === "lego" ? (
        <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mb-6 h-[88vh] min-h-[750px]">
          <LegoDesigner />
        </div>
      ) : (
        <>
          {/* Template Selector & Customizer */}
          <TemplateSelector />
          <TemplateCustomizer />

      {/* Photo Avatar Config Card */}
      <Card className="mb-6 border-indigo-100 bg-indigo-50/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm text-indigo-950">
            <Camera className="h-4 w-4 text-indigo-600" />
            配置个人证件照 / 形象照
          </CardTitle>
          <CardDescription>照片将自动呈现于双栏及自定义简历模板中，可随时上传或替换</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="relative flex h-24 w-20 items-center justify-center rounded-md border border-dashed border-indigo-300 bg-white overflow-hidden shadow-sm">
              {userInput.avatarUrl ? (
                <img
                  src={userInput.avatarUrl}
                  alt="证件照"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-neutral-300" />
              )}
            </div>
            <div className="space-y-2">
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
                    onClick={handleRemoveAvatar}
                  >
                    删除照片
                  </Button>
                )}
              </div>
              <p className="text-[11px] text-neutral-400">
                推荐尺寸：1寸 / 2寸免冠照或职业形象照，支持 .jpg / .png
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Copy className="h-4 w-4" />
              复制纯文本
            </CardTitle>
            <CardDescription>一键复制最终优化版简历纯文本到剪贴板</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={handleCopy} className="w-full">
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  已复制文本
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  复制最终简历文本
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Download className="h-4 w-4" />
              导出所选模板文件
            </CardTitle>
            <CardDescription>导出带所选样式的 Word (.doc) 或打印保存为高清 PDF</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleExportWord} variant="outline" className="flex-1">
              <FileSpreadsheet className="h-4 w-4 text-blue-600" />
              导出 Word 文档
            </Button>
            <Button onClick={handleExportPDF} variant="outline" className="flex-1">
              <Printer className="h-4 w-4 text-emerald-600" />
              导出 PDF 文件
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Live Preview of Chosen Template */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-900">当前模板实时预览</h3>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs text-neutral-500">
                <FileText className="h-3.5 w-3.5" />
                查看纯文本格式
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle>纯文本简历</DialogTitle>
                <DialogDescription>
                  无格式纯文本版本，方便复制粘贴到其他编辑器
                </DialogDescription>
              </DialogHeader>
              <Textarea
                readOnly
                className="min-h-[400px] font-mono text-xs leading-relaxed"
                value={resumeText}
              />
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? "已复制" : "复制文本"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <ResumeTemplateView resume={finalResume} templateId={selectedTemplate} />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">完整分析摘要</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-neutral-100 p-3">
            <p className="text-xs text-neutral-400">匹配度评分</p>
            <p className="text-2xl font-semibold tabular-nums">
              {analysisResult.diagnosis?.overallScore ?? 0}
              <span className="text-sm font-normal text-neutral-400">/100</span>
            </p>
          </div>
          <div className="rounded-md border border-neutral-100 p-3">
            <p className="text-xs text-neutral-400">匹配项分析</p>
            <p className="text-2xl font-semibold tabular-nums">
              {analysisResult.matchItems?.length ?? 0}
              <span className="text-sm font-normal text-neutral-400"> 条</span>
            </p>
          </div>
          <div className="rounded-md border border-neutral-100 p-3">
            <p className="text-xs text-neutral-400">优化修改</p>
            <p className="text-2xl font-semibold tabular-nums">
              {analysisResult.optimizedItems?.length ?? 0}
              <span className="text-sm font-normal text-neutral-400"> 处</span>
            </p>
          </div>
        </CardContent>
      </Card>
      </>
      )}

      <div className="mt-6 flex justify-start">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep("interview")}>
          <ChevronLeft className="h-4 w-4" />
          上一步：面试准备
        </Button>
      </div>
    </div>
  );
}
