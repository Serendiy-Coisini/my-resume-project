import React, { useRef } from 'react';
import { useLegoDesignerStore } from '@/store/lego-designer-store';
import { useResumeStore } from '@/store/resume-store';
import { buildLegoSchemaFromResume } from '@/lib/lego-adapter';
import { printLegoCanvas } from './utils/printLego';
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
  Upload
} from 'lucide-react';

interface ToolbarProps {
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ isFullScreen, onToggleFullScreen }) => {
  const { scale, setScale, undo, redo, undoStack, redoStack, setSchema } =
    useLegoDesignerStore();
  const { userInput, analysisResult } = useResumeStore();
  const jsonFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleReloadAiData = () => {
    if (confirm('确定要用最新 AI 润色数据覆盖当前积木画布吗？未保存的手动拖拽调整将被重置。')) {
      const freshSchema = buildLegoSchemaFromResume(userInput, analysisResult);
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
        <button
          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1 border border-slate-700 transition-all"
          onClick={() => jsonFileInputRef.current?.click()}
          title="导入积木 JSON 配置"
        >
          <Upload className="w-3.5 h-3.5 text-blue-400" />
          导入 JSON
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
