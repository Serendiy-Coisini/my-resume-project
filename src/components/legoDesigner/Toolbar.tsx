import React, { useRef, useState, useEffect } from 'react';
import { useLegoDesignerStore } from '@/store/lego-designer-store';
import { useResumeStore } from '@/store/resume-store';
import { buildLegoSchemaFromResume } from '@/lib/lego-adapter';
import { printLegoCanvas } from './utils/printLego';
import type { TemplateId } from '@/types/resume';
import {
  ZoomIn,
  ZoomOut,
  Undo2,
  Redo2,
  Printer,
  Sparkles,
  FileText,
  Maximize2,
  Minimize2,
  Upload,
  Download,
  ChevronDown
} from 'lucide-react';

interface ToolbarProps {
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ isFullScreen, onToggleFullScreen }) => {
  const { scale, setScale, undo, redo, undoStack, redoStack, setSchema } =
    useLegoDesignerStore();
  const { userInput, analysisResult, selectedTemplate, templateOptions, customTemplateHTML } = useResumeStore();
  const jsonFileInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showTplMenu, setShowTplMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowTplMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleReloadAiData = () => {
    if (confirm('确定要用最新 AI 润色数据覆盖当前积木画布吗？未保存的手动拖拽调整将被重置。')) {
      const freshSchema = buildLegoSchemaFromResume(userInput, analysisResult, selectedTemplate, templateOptions, customTemplateHTML);
      setSchema(freshSchema, true);
    }
  };

  const handleImportTemplate = (tplId: TemplateId) => {
    setShowTplMenu(false);
    const tplNames: Record<string, string> = {
      'modern-sidebar': '1.3 现代双栏',
      'corporate-banner': '商务 Header 沉稳范',
      'timeline-tech': '时间轴极客型',
      'grid-cards': '微阴影卡片流',
      'classic-minimal': '经典极简单栏',
      'custom': '✨ AI 动态识别自定义模板'
    };

    const name = tplNames[tplId] || tplId;
    if (confirm(`确定要将【${name}】排版转换并导入到积木画布吗？当前画布中的手改样式将被此模板重置。`)) {
      const freshSchema = buildLegoSchemaFromResume(userInput, analysisResult, tplId, templateOptions, customTemplateHTML);
      setSchema(freshSchema, true);
    }
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.componentsTree) {
          setSchema(parsed, true);
        } else {
          alert('无效的积木配置文件');
        }
      } catch {
        alert('解析 JSON 失败，请检查文件格式');
      }
    };
    reader.readAsText(file);
  };

  const handleFitWidth = () => {
    const availableWidth = window.innerWidth - 650;
    const computedScale = Math.max(0.4, Math.min(1.2, Number((availableWidth / 820).toFixed(2))));
    setScale(computedScale);
  };

  const handleFitPage = () => {
    const availableHeight = isFullScreen ? window.innerHeight - 140 : 600;
    const computedScale = Math.max(0.35, Math.min(1.1, Number((availableHeight / 1160).toFixed(2))));
    setScale(computedScale);
  };

  return (
    <div className="h-14 bg-slate-900 border-b border-slate-800 text-slate-200 px-4 flex items-center justify-between select-none shrink-0">
      {/* Left Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
          <FileText className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white tracking-wide">积木简历排版设计器</h2>
          <p className="text-[10px] text-slate-400">
            全屏编辑 · 画布拖拽 · 撤销重做 · 像素级 PDF 导出
          </p>
        </div>
      </div>

      {/* Middle Controls */}
      <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60">
        {/* Undo / Redo */}
        <button
          className="p-1.5 rounded hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 transition-colors"
          disabled={undoStack.length === 0}
          onClick={undo}
          title="撤销 (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          className="p-1.5 rounded hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 transition-colors"
          disabled={redoStack.length === 0}
          onClick={redo}
          title="重做 (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-slate-700 mx-1" />

        {/* Zoom */}
        <button
          className="p-1.5 rounded hover:bg-slate-700 text-slate-300 transition-colors"
          onClick={() => setScale((s) => Math.max(0.3, Number((s - 0.1).toFixed(1))))}
          title="缩小"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs font-mono w-12 text-center text-slate-300">
          {Math.round(scale * 100)}%
        </span>
        <button
          className="p-1.5 rounded hover:bg-slate-700 text-slate-300 transition-colors"
          onClick={() => setScale((s) => Math.min(1.5, Number((s + 0.1).toFixed(1))))}
          title="放大"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-slate-700 mx-1" />

        {/* Fit Presets */}
        <button
          className="px-2 py-1 text-[11px] rounded hover:bg-slate-700 text-slate-300 transition-colors"
          onClick={handleFitPage}
          title="缩放以适合整页"
        >
          适合整页
        </button>
        <button
          className="px-2 py-1 text-[11px] rounded hover:bg-slate-700 text-slate-300 transition-colors"
          onClick={handleFitWidth}
          title="缩放以适合宽度"
        >
          适合宽度
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <input
          ref={jsonFileInputRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={handleImportJSON}
        />
        
        {/* Template Import Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowTplMenu(!showTplMenu)}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-500/20 border border-blue-400/30 transition-all cursor-pointer"
            title="选择将任意已生成/选择的固定模板转换并导入到积木设计器自由微调"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            导入固定模板排版
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showTplMenu ? 'rotate-180' : ''}`} />
          </button>

          {showTplMenu && (
            <div className="absolute right-0 top-full mt-1.5 w-64 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                选择要导入微调的固定模板
              </div>
              
              <button
                onClick={() => handleImportTemplate('modern-sidebar')}
                className="w-full px-3 py-2 text-left hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>🖼️ 现代双栏 (1.3 侧边栏型)</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">双栏推荐</span>
              </button>

              <button
                onClick={() => handleImportTemplate('corporate-banner')}
                className="w-full px-3 py-2 text-left hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>🏢 商务 Header 沉稳范</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">深色 Banner</span>
              </button>

              <button
                onClick={() => handleImportTemplate('timeline-tech')}
                className="w-full px-3 py-2 text-left hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>⏱️ 时间轴极客型</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">时间轴</span>
              </button>

              <button
                onClick={() => handleImportTemplate('grid-cards')}
                className="w-full px-3 py-2 text-left hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>🎴 微阴影卡片流</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">卡片切块</span>
              </button>

              <button
                onClick={() => handleImportTemplate('classic-minimal')}
                className="w-full px-3 py-2 text-left hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>📝 经典极简单栏</span>
                <span className="text-[10px] bg-slate-500/20 text-slate-300 px-1.5 py-0.5 rounded">清爽大厂</span>
              </button>

              <button
                onClick={() => handleImportTemplate('custom')}
                className="w-full px-3 py-2 text-left hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>✨ AI 动态识别自定义模板</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">自定义</span>
              </button>
            </div>
          )}
        </div>

        <button
          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1 border border-slate-700 transition-all"
          onClick={() => jsonFileInputRef.current?.click()}
          title="导入积木 JSON 配置"
        >
          <Upload className="w-3.5 h-3.5 text-blue-400" />
          JSON
        </button>

        <button
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-all"
          onClick={onToggleFullScreen}
          title={isFullScreen ? '退出全屏' : '全屏沉浸式编辑'}
        >
          {isFullScreen ? (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-blue-400" />
              退出全屏
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
              全屏编辑
            </>
          )}
        </button>

        <button
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-all"
          onClick={handleReloadAiData}
          title="用当前的 AI 润色结果重新装填积木"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          重填 AI 数据
        </button>

        <button
          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-all"
          onClick={printLegoCanvas}
        >
          <Printer className="w-3.5 h-3.5" />
          导出积木 PDF
        </button>
      </div>
    </div>
  );
};
