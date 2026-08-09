import React, { useRef, useState, useEffect } from 'react';
import { useLegoDesignerStore } from '@/store/lego-designer-store';
import { useResumeStore } from '@/store/resume-store';
import { buildLegoSchemaFromResume } from '@/lib/lego-adapter';
import { printLegoCanvas } from './utils/printLego';
import { PRESET_TEMPLATES } from '@/lib/preset-templates';
import { SaveTemplateDialog } from './SaveTemplateDialog';
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
  ChevronDown,
  Save,
  FolderOpen,
  RotateCcw,
  BookmarkPlus
} from 'lucide-react';

interface ToolbarProps {
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
  standalone?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ isFullScreen, onToggleFullScreen, standalone }) => {
  const { scale, setScale, undo, redo, undoStack, redoStack, setSchema, resetSchema, schema } =
    useLegoDesignerStore();
  const { userInput, analysisResult, selectedTemplate, templateOptions, customTemplateHTML, setSelectedTemplate } = useResumeStore();

  const handleClearCanvas = () => {
    if (confirm('确定要重置并清空当前画布吗？所有已添加的积木物料将被清除。')) {
      resetSchema();
    }
  };
  const jsonFileInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showTplMenu, setShowTplMenu] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

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

  const handleImportTemplate = (tplId: string) => {
    setShowTplMenu(false);
    
    // 1. Check built-in preset templates
    const preset = PRESET_TEMPLATES.find(t => t.id === tplId);
    if (preset) {
      if (confirm(`确定要应用【${preset.name}】模板吗？当前画布中的内容与样式将被重置。`)) {
        setSchema(preset.schema, true);
      }
      return;
    }

    // 2. Dynamic AI templates built from resume data
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
      setSelectedTemplate(tplId as TemplateId);
      const freshSchema = buildLegoSchemaFromResume(userInput, analysisResult, tplId as TemplateId, templateOptions, customTemplateHTML);
      setSchema(freshSchema, true);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('legoDesignerDraft', JSON.stringify(schema));
    alert('草稿已成功保存到浏览器本地');
  };

  const handleLoadDraft = () => {
    const saved = localStorage.getItem('legoDesignerDraft');
    if (!saved) {
      alert('未找到本地草稿记录');
      return;
    }
    try {
      const parsed = JSON.parse(saved);
      if (confirm('确定要恢复上次保存的本地草稿吗？当前未保存的修改将被覆盖。')) {
        setSchema(parsed, true);
      }
    } catch {
      alert('草稿解析失败，数据可能受损');
    }
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed === 'object') {
          setSchema(parsed, true);
        } else {
          alert('无效的积木配置文件');
        }
      } catch {
        alert('解析 JSON 失败，请检查文件格式');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="h-12 bg-slate-900 border-b border-slate-800 text-slate-100 px-2 sm:px-3 flex items-center justify-between select-none shrink-0 shadow-md w-full relative z-30">
      {/* Left Title & Brand */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-600/30 shrink-0">
          <FileText className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xs sm:text-sm font-bold tracking-tight text-white flex items-center gap-1.5 whitespace-nowrap">
            {standalone ? '简历制作器' : '积木排版器'}
          </h1>
          <p className="text-[10px] text-slate-400 hidden xl:block truncate max-w-[200px]">
            百变排版 · 自由重组 · 高清 PDF
          </p>
        </div>
      </div>

      {/* Center Tools */}
      <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-800/80 p-0.5 sm:p-1 rounded-lg border border-slate-700/60 shrink-0 mx-1">
        <button
          className="p-1 sm:p-1.5 rounded hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 transition-colors cursor-pointer"
          disabled={undoStack.length === 0}
          onClick={undo}
          title="撤销 (Ctrl+Z)"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </button>
        <button
          className="p-1 sm:p-1.5 rounded hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 transition-colors cursor-pointer"
          disabled={redoStack.length === 0}
          onClick={redo}
          title="重做 (Ctrl+Y)"
        >
          <Redo2 className="w-3.5 h-3.5" />
        </button>

        <div className="h-3.5 w-px bg-slate-700 mx-0.5 sm:mx-1" />

        <button
          className="p-1 sm:p-1.5 rounded hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          onClick={() => setScale((s) => Math.max(0.3, Number((s - 0.05).toFixed(2))))}
          title="缩小画布"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="text-[10px] sm:text-[11px] font-mono w-8 sm:w-10 text-center text-slate-300 select-none">
          {Math.round(scale * 100)}%
        </span>
        <button
          className="p-1 sm:p-1.5 rounded hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          onClick={() => setScale((s) => Math.min(1.5, Number((s + 0.05).toFixed(2))))}
          title="放大画布"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <div className="h-3.5 w-px bg-slate-700 mx-0.5 hidden xl:block" />

        <button
          className="px-1.5 py-1 text-[10px] sm:text-[11px] font-medium text-slate-300 hover:bg-slate-700 rounded transition-colors hidden xl:block cursor-pointer whitespace-nowrap"
          onClick={() => setScale(0.65)}
          title="适应整页"
        >
          适应整页
        </button>
        <button
          className="px-1.5 py-1 text-[10px] sm:text-[11px] font-medium text-slate-300 hover:bg-slate-700 rounded transition-colors hidden xl:block cursor-pointer whitespace-nowrap"
          onClick={() => setScale(0.85)}
          title="适应页宽"
        >
          适应页宽
        </button>
      </div>

      {/* Right Action Bar */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <input
          ref={jsonFileInputRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={handleImportJSON}
        />
        <div className="relative" ref={dropdownRef}>
          <button
            className="px-2 sm:px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-all shadow-md shadow-blue-600/20 cursor-pointer whitespace-nowrap"
            onClick={() => setShowTplMenu(!showTplMenu)}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">固定模板 / 预设</span>
            <span className="xl:hidden">模板</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showTplMenu ? 'rotate-180' : ''}`} />
          </button>

          {showTplMenu && (
            <div className="absolute right-0 top-full mt-1.5 w-60 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl py-2 z-[999] animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                选择要导入装填的模板
              </div>
              <button
                onClick={() => handleImportTemplate('classic')}
                className="w-full px-3 py-2 text-left hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>📝 经典单栏模板</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">大厂</span>
              </button>

              <button
                onClick={() => handleImportTemplate('modern-sidebar')}
                className="w-full px-3 py-2 text-left hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>🖼️ 现代深色双栏</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">双栏</span>
              </button>

              <button
                onClick={() => handleImportTemplate('corporate-banner')}
                className="w-full px-3 py-2 text-left hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>🏢 商务 Header 沉稳范</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">Banner</span>
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
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">卡片</span>
              </button>

              <button
                onClick={() => handleImportTemplate('minimal')}
                className="w-full px-3 py-2 text-left hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>🌿 简约清新风格</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">清新</span>
              </button>

              <button
                onClick={() => handleImportTemplate('blank')}
                className="w-full px-3 py-2 text-left hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition-colors cursor-pointer border-t border-slate-800 mt-1 pt-1.5"
              >
                <span>✨ 重构为空白画布</span>
                <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">重置</span>
              </button>
            </div>
          )}
        </div>

        <button
          className="hidden sm:flex px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium items-center gap-1 border border-slate-700 transition-all whitespace-nowrap"
          onClick={() => jsonFileInputRef.current?.click()}
          title="导入积木 JSON 配置"
        >
          <Upload className="w-3.5 h-3.5 text-blue-400" />
          JSON
        </button>

        <button
          className="hidden md:flex px-2 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 rounded-lg text-xs font-medium items-center gap-1 border border-rose-800/50 transition-all cursor-pointer whitespace-nowrap"
          onClick={handleClearCanvas}
          title="重置并清空当前画布"
        >
          <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
          <span>清空</span>
        </button>

        <button
          className="hidden lg:flex px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium items-center gap-1 border border-slate-700 transition-all whitespace-nowrap"
          onClick={onToggleFullScreen}
          title={isFullScreen ? '退出全屏' : '全屏沉浸式编辑'}
        >
          {isFullScreen ? (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden xl:inline">退出全屏</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden xl:inline">全屏</span>
            </>
          )}
        </button>

        {standalone ? (
          <>
            <button
              className="hidden lg:flex px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium items-center gap-1 border border-slate-700 transition-all whitespace-nowrap"
              onClick={handleSaveDraft}
              title="保存草稿到本地浏览器"
            >
              <Save className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xl:inline">保存草稿</span>
            </button>
            <button
              className="hidden lg:flex px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium items-center gap-1 border border-slate-700 transition-all whitespace-nowrap"
              onClick={handleLoadDraft}
              title="加载本地保存的草稿"
            >
              <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xl:inline">加载草稿</span>
            </button>
          </>
        ) : (
          <button
            className="hidden lg:flex px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium items-center gap-1 border border-slate-700 transition-all whitespace-nowrap"
            onClick={handleReloadAiData}
            title="用当前的 AI 润色结果重新装填积木"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xl:inline">重填 AI 数据</span>
            <span className="xl:hidden">重填 AI</span>
          </button>
        )}

        <button
          className="hidden md:flex px-2 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold items-center gap-1 shadow-md shadow-emerald-600/20 transition-all cursor-pointer whitespace-nowrap"
          onClick={() => setSaveDialogOpen(true)}
          title="将当前画布保存为可复用模板"
        >
          <BookmarkPlus className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">存为模板</span>
          <span className="xl:hidden">存模板</span>
        </button>

        <button
          className="px-2.5 sm:px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-lg shadow-blue-600/30 transition-all whitespace-nowrap shrink-0"
          onClick={printLegoCanvas}
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">导出 PDF</span>
          <span className="sm:hidden">导出</span>
        </button>
      </div>

      <SaveTemplateDialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)} />
    </div>
  );
};
