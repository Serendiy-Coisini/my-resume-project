import React, { useState } from 'react';
import { WIDGET_CONFIG_LIST } from './schema/widgetConfig';
import { useLegoDesignerStore } from '@/store/lego-designer-store';
import { useResumeStore } from '@/store/resume-store';
import {
  LayoutGrid,
  Layers,
  Code,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { IWidget } from '@/types/lego';

interface LeftComListProps {
  width: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const LeftComList: React.FC<LeftComListProps> = ({
  width,
  isCollapsed,
  onToggleCollapse
}) => {
  const [activeTab, setActiveTab] = useState<'widgets' | 'layers' | 'json'>('widgets');
  const { schema, selectedWidgetId, addWidget, setSelectedWidgetId, deleteWidget, moveWidgetLayer } =
    useLegoDesignerStore();
  const { userInput } = useResumeStore();

  const [copied, setCopied] = useState(false);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isCollapsed) {
    return (
      <div className="w-12 h-full bg-white border-r border-slate-200 flex flex-col items-center py-3 select-none shrink-0 transition-all">
        <button
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 mb-4"
          onClick={onToggleCollapse}
          title="展开左侧积木面板"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="flex flex-col gap-3">
          <button
            className={`p-2 rounded-lg ${
              activeTab === 'widgets' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'
            }`}
            onClick={() => {
              setActiveTab('widgets');
              onToggleCollapse();
            }}
            title="积木组件"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            className={`p-2 rounded-lg ${
              activeTab === 'layers' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'
            }`}
            onClick={() => {
              setActiveTab('layers');
              onToggleCollapse();
            }}
            title="图层管理"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            className={`p-2 rounded-lg ${
              activeTab === 'json' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'
            }`}
            onClick={() => {
              setActiveTab('json');
              onToggleCollapse();
            }}
            title="JSON 数据"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full bg-white border-r border-slate-200 flex flex-col select-none shrink-0 overflow-hidden transition-all"
      style={{ width: `${width}px` }}
    >
      {/* Sidebar Header */}
      <div className="flex items-center border-b border-slate-200 bg-slate-50 justify-between pr-2">
        <div className="flex flex-1">
          <button
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'widgets'
                ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => setActiveTab('widgets')}
          >
            <LayoutGrid className="w-4 h-4" /> 积木组件
          </button>
          <button
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'layers'
                ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => setActiveTab('layers')}
          >
            <Layers className="w-4 h-4" /> 图层
          </button>
          <button
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'json'
                ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => setActiveTab('json')}
          >
            <Code className="w-4 h-4" /> JSON
          </button>
        </div>

        <button
          className="p-1 hover:bg-slate-200 rounded text-slate-500 ml-1"
          onClick={onToggleCollapse}
          title="折叠左侧侧边栏"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Tab 1: Widgets Library */}
        {activeTab === 'widgets' && (
          <div className="space-y-4">
            {WIDGET_CONFIG_LIST.map((category) => (
              <div key={category.title} className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/80">
                <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-blue-600 rounded-full"></span>
                  {category.title}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {category.list.map((widget, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm rounded-md p-2 flex flex-col items-center justify-center cursor-pointer transition-all group"
                      onClick={() => {
                        const widgetToInsert = {
                          ...widget,
                          dataSource: {
                            ...widget.dataSource,
                            avatarSrc:
                              widget.componentName.includes('avatar') && userInput.avatarUrl
                                ? userInput.avatarUrl
                                : widget.dataSource.avatarSrc
                          }
                        };
                        addWidget(widgetToInsert);
                      }}
                    >
                      <div className="text-slate-700 font-medium text-xs mb-1 group-hover:text-blue-600">
                        {widget.title}
                      </div>
                      <div className="text-[10px] text-slate-400 text-center line-clamp-1">
                        {widget.description || '点击添加到画布'}
                      </div>
                      <button className="mt-2 text-[10px] text-blue-600 opacity-0 group-hover:opacity-100 flex items-center gap-0.5">
                        <Plus className="w-3 h-3" /> 添加
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Layers */}
        {activeTab === 'layers' && (
          <div className="space-y-1">
            <p className="text-xs text-slate-500 mb-2 px-1">当前页面包含的积木图层（上层在前）：</p>
            {schema.componentsTree[0]?.children.length === 0 ? (
              <div className="text-xs text-slate-400 text-center py-8">画布上暂无积木组件</div>
            ) : (
              [...(schema.componentsTree[0]?.children || [])].reverse().map((widget: IWidget) => {
                const isSelected = selectedWidgetId === widget.id;
                return (
                  <div
                    key={widget.id}
                    className={`flex items-center justify-between px-2.5 py-2 rounded-md text-xs border transition-colors ${
                      isSelected
                        ? 'bg-blue-50 border-blue-300 text-blue-700 font-medium'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    onClick={() => setSelectedWidgetId(widget.id)}
                  >
                    <span className="truncate max-w-[140px]">
                      {widget.title || widget.componentName}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        className="p-1 hover:bg-slate-200 rounded text-slate-600"
                        title="上移"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveWidgetLayer(widget.id, 'up');
                        }}
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        className="p-1 hover:bg-slate-200 rounded text-slate-600"
                        title="下移"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveWidgetLayer(widget.id, 'down');
                        }}
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button
                        className="p-1 hover:bg-rose-100 rounded text-rose-600"
                        title="删除"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteWidget(widget.id);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 3: JSON View */}
        {activeTab === 'json' && (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-500 font-mono">HJSchema JSON</span>
              <button
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                onClick={handleCopyJson}
              >
                {copied ? '已复制 ✓' : '复制 JSON'}
              </button>
            </div>
            <pre className="flex-1 bg-slate-900 text-slate-100 p-3 rounded-lg text-[11px] font-mono overflow-auto leading-relaxed">
              {JSON.stringify(schema, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
