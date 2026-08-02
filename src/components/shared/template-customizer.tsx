"use client";

import { Check, Eye, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResumeStore } from "@/store/resume-store";
import type { TemplateOptions } from "@/lib/resume-templates";

const COLOR_PRESETS = [
  { name: "藏蓝大厂", color: "#1e3a8a" },
  { name: "极客宝蓝", color: "#2563eb" },
  { name: "翡翠竹绿", color: "#059669" },
  { name: "优雅玄黑", color: "#0f172a" },
  { name: "雅致深紫", color: "#6b21a8" },
  { name: "朱砂深红", color: "#991b1b" },
];

export function TemplateCustomizer() {
  const {
    templateOptions,
    setTemplateOptions,
    showPageBreakGuide,
    setShowPageBreakGuide,
  } = useResumeStore();

  const currentOptions: TemplateOptions = templateOptions || {
    themeColor: "#1e3a8a",
  };

  const updateOption = <K extends keyof TemplateOptions>(key: K, value: TemplateOptions[K]) => {
    setTemplateOptions({
      ...currentOptions,
      [key]: value,
    });
  };

  return (
    <Card className="mb-6 border-blue-100 bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-white shadow-xs">
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xs font-bold text-blue-950 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-blue-600" />
          可视化排版微调控制面板
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={showPageBreakGuide ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs gap-1.5"
            onClick={() => setShowPageBreakGuide(!showPageBreakGuide)}
          >
            <Eye className="h-3.5 w-3.5" />
            {showPageBreakGuide ? "已开启 A4 分页辅助线" : "显示 A4 分页辅助线"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-1">
        {/* Theme Color */}
        <div className="flex items-center gap-3">
          <label className="text-[11px] font-semibold text-neutral-600 shrink-0">🎨 主题配色：</label>
          <div className="flex flex-wrap gap-2.5 items-center">
            {COLOR_PRESETS.map((preset) => {
              const isSelected = (currentOptions.themeColor || "#1e3a8a") === preset.color;
              return (
                <button
                  key={preset.color}
                  type="button"
                  title={preset.name}
                  onClick={() => updateOption("themeColor", preset.color)}
                  className={`relative shrink-0 rounded-full border border-black/10 transition-all flex items-center justify-center ${
                    isSelected ? "ring-2 ring-blue-500 ring-offset-1 scale-110" : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: preset.color, width: "24px", height: "24px" }}
                >
                  {isSelected && <Check className="h-3.5 w-3.5 text-white stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
