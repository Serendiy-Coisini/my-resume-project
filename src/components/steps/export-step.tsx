"use client";

import { useState } from "react";
import { Check, Copy, Download, FileText } from "lucide-react";
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
import { EmptyState, SectionTitle } from "@/components/shared/ui-helpers";
import { useResumeStore } from "@/store/resume-store";
import { copyToClipboard, formatResumeAsText } from "@/lib/utils";

export function ExportStep() {
  const { analysisResult, copied, setCopied } = useResumeStore();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!analysisResult) {
    return <EmptyState message="请先完成输入材料并开始分析" />;
  }

  const resumeText = formatResumeAsText(analysisResult.finalResume);

  const handleCopy = async () => {
    const success = await copyToClipboard(resumeText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <SectionTitle
        title="导出结果"
        description="复制优化后的简历或预览完整内容"
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Copy className="h-4 w-4" />
              复制到剪贴板
            </CardTitle>
            <CardDescription>一键复制最终优化版简历纯文本</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleCopy} className="w-full">
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  复制最终简历
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Download className="h-4 w-4" />
              导出文件
            </CardTitle>
            <CardDescription>PDF / Word 导出功能即将上线</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4" />
                  预览导出内容
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>简历预览</DialogTitle>
                  <DialogDescription>
                    以下为最终优化版简历纯文本，可复制后粘贴到 Word 或其他编辑器
                  </DialogDescription>
                </DialogHeader>
                <Textarea
                  readOnly
                  className="min-h-[400px] font-mono text-xs leading-relaxed"
                  value={resumeText}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleCopy}>
                    {copied ? "已复制" : "复制内容"}
                  </Button>
                  <Button variant="secondary" disabled>
                    导出 PDF（即将上线）
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">完整分析摘要</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-neutral-100 p-3">
            <p className="text-xs text-neutral-400">匹配度评分</p>
            <p className="text-2xl font-semibold tabular-nums">
              {analysisResult.diagnosis.overallScore}
              <span className="text-sm font-normal text-neutral-400">/100</span>
            </p>
          </div>
          <div className="rounded-md border border-neutral-100 p-3">
            <p className="text-xs text-neutral-400">匹配项分析</p>
            <p className="text-2xl font-semibold tabular-nums">
              {analysisResult.matchItems.length}
              <span className="text-sm font-normal text-neutral-400"> 条</span>
            </p>
          </div>
          <div className="rounded-md border border-neutral-100 p-3">
            <p className="text-xs text-neutral-400">优化修改</p>
            <p className="text-2xl font-semibold tabular-nums">
              {analysisResult.optimizedItems.length}
              <span className="text-sm font-normal text-neutral-400"> 处</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
