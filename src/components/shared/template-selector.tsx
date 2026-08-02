"use client";

import { useRef, useState } from "react";
import { Check, Code2, FileCode2, FileUp, Layout, Loader2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { TEMPLATES, type TemplateId } from "@/lib/resume-templates";
import { extractResumeTemplate } from "@/services/ai/resumeAgent";
import { useResumeStore } from "@/store/resume-store";

export function TemplateSelector() {
  const {
    selectedTemplate,
    setSelectedTemplate,
    customTemplateHTML,
    setCustomTemplateHTML,
  } = useResumeStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [tempHTML, setTempHTML] = useState(customTemplateHTML);

  const handleTemplateFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExtracting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      let content = "";
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/parse-pdf", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "解析 PDF 样本失败");
        content = data.text;
      } else if (file.type.startsWith("image/")) {
        content = `简历图片样本: ${file.name}`;
      } else {
        content = await file.text();
      }

      if (content.trim().startsWith("<") || content.includes("<html")) {
        setCustomTemplateHTML(content);
        setSelectedTemplate("custom");
        setSuccessMsg("🎉 成功载入你上传的 HTML 格式简历模板！");
        setTimeout(() => setSuccessMsg(null), 5000);
      } else {
        const extractedHTML = await extractResumeTemplate(content);
        if (extractedHTML) {
          setCustomTemplateHTML(extractedHTML);
          setSelectedTemplate("custom");
          setSuccessMsg("🎉 成功根据你上传的文件识别并生成专属 HTML/CSS 模板！已自动为你应用。");
          setTimeout(() => setSuccessMsg(null), 6000);
        } else {
          throw new Error("AI 未能识别出有效的 HTML 模板结构，请确认文件格式");
        }
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "识别并提取模板失败，请检查网络或更换样例文件");
    } finally {
      setExtracting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSaveEditor = () => {
    setCustomTemplateHTML(tempHTML);
    setSelectedTemplate("custom");
    setEditorOpen(false);
    setSuccessMsg("自定义模板代码更新成功！");
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layout className="h-4 w-4 text-neutral-500" />
          <h3 className="text-sm font-semibold text-neutral-900">选择简历排版模板</h3>
        </div>
        <span className="text-xs text-neutral-400">实时渲染所选样式，应用于预览与导出</span>
      </div>

      {successMsg && (
        <div className="mb-3 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs text-emerald-800 flex items-center gap-2 shadow-sm animate-in fade-in duration-300">
          <span className="font-semibold">{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-700 flex items-center justify-between shadow-sm">
          <span>❌ <strong>识别模板失败：</strong>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-red-500 hover:text-red-800 font-bold ml-2">✕</button>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {/* Built-in Templates */}
        {TEMPLATES.map((tpl) => {
          const isSelected = selectedTemplate === tpl.id;
          return (
            <Card
              key={tpl.id}
              onClick={() => setSelectedTemplate(tpl.id as TemplateId)}
              className={`relative cursor-pointer transition-all hover:border-blue-400 ${
                isSelected
                  ? "border-2 border-blue-600 bg-blue-50/20 shadow-sm"
                  : "border-neutral-200"
              }`}
            >
              <CardContent className="p-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: tpl.color }}
                    />
                    <span className="text-xs font-semibold text-neutral-900">{tpl.name}</span>
                  </div>
                  {isSelected && (
                    <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check className="h-2 w-2" />
                    </div>
                  )}
                </div>

                <p className="mb-2 text-[11px] text-neutral-500 line-clamp-2 leading-snug">
                  {tpl.description}
                </p>

                <Badge variant={isSelected ? "default" : "secondary"} className="text-[10px] font-normal px-1.5 py-0">
                  {tpl.tag}
                </Badge>
              </CardContent>
            </Card>
          );
        })}

        {/* Custom AI Visual Recognition Template Card */}
        <Card
          onClick={() => setSelectedTemplate("custom")}
          className={`relative cursor-pointer transition-all hover:border-purple-400 border-dashed ${
            selectedTemplate === "custom"
              ? "border-2 border-purple-600 bg-purple-50/30 shadow-sm"
              : "border-neutral-300"
          }`}
        >
          <CardContent className="p-3">
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-purple-600 animate-pulse" />
                <span className="text-xs font-semibold text-purple-900">AI 识别自定义模板</span>
              </div>
              {selectedTemplate === "custom" && (
                <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-purple-600 text-white">
                  <Check className="h-2 w-2" />
                </div>
              )}
            </div>

            <p className="mb-2 text-[11px] text-neutral-500 line-clamp-2 leading-snug">
              上传 PDF/图片样例，AI 自动提取生成匹配的 HTML/CSS 布局模板
            </p>

            <div className="flex flex-wrap gap-1">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.html"
                className="hidden"
                onChange={handleTemplateFileUpload}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={extracting}
                className="h-6 px-1.5 text-[10px] bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                {extracting ? (
                  <>
                    <Loader2 className="h-2.5 w-2.5 animate-spin" />
                    AI 提取中...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-2.5 w-2.5" />
                    上传 PDF/图片生成
                  </>
                )}
              </Button>

              <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 px-1.5 text-[10px] text-neutral-600 hover:bg-neutral-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTempHTML(customTemplateHTML);
                    }}
                  >
                    <Code2 className="h-2.5 w-2.5" />
                    查看代码
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <FileCode2 className="h-4 w-4 text-purple-600" />
                      自定义简历 HTML/CSS 模板代码
                    </DialogTitle>
                    <DialogDescription>
                      AI 已自动为你生成 HTML/CSS 样式代码。占位符说明：
                      <span className="font-mono text-purple-700">
                        {" {{姓名}} {{邮箱}} {{电话}} {{城市}} {{求职意向}} {{职业摘要}} {{核心能力}} {{工作经历}} {{项目经历}} {{技能工具}} {{教育背景}}"}
                      </span>
                    </DialogDescription>
                  </DialogHeader>

                  <Textarea
                    className="min-h-[380px] font-mono text-xs leading-relaxed"
                    value={tempHTML}
                    onChange={(e) => setTempHTML(e.target.value)}
                  />

                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => setEditorOpen(false)}>
                      取消
                    </Button>
                    <Button size="sm" onClick={handleSaveEditor}>
                      保存并应用模板
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
