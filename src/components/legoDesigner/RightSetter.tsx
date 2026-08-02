import React, { useRef } from 'react';
import { useLegoDesignerStore } from '@/store/lego-designer-store';
import { useResumeStore } from '@/store/resume-store';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Move,
  Palette,
  Layers,
  ChevronLeft,
  ChevronRight,
  Upload,
  User,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';

interface RightSetterProps {
  width: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const RightSetter: React.FC<RightSetterProps> = ({
  width,
  isCollapsed,
  onToggleCollapse
}) => {
  const { getSelectedWidget, updateWidgetCss, updateWidgetDataSource, selectedWidgetId } =
    useLegoDesignerStore();
  const { userInput, setUserInput } = useResumeStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const selectedWidget = getSelectedWidget();

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedWidgetId) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        // Update widget dataSource
        updateWidgetDataSource(selectedWidgetId, { avatarSrc: base64, src: base64 });
        // Sync with global user input avatar
        setUserInput({ avatarUrl: base64 });
      }
    };
    reader.readAsDataURL(file);
    // Reset file input so re-selecting file always triggers onChange
    e.target.value = '';
  };

  const handleRemoveAvatar = () => {
    if (!selectedWidgetId) return;
    updateWidgetDataSource(selectedWidgetId, { avatarSrc: '', src: '' });
    setUserInput({ avatarUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-12 h-full bg-white border-l border-slate-200 flex flex-col items-center py-3 select-none shrink-0 transition-all">
        <button
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 mb-4"
          onClick={onToggleCollapse}
          title="展开右侧属性设置面板"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          className="p-2 rounded-lg bg-blue-50 text-blue-600"
          onClick={onToggleCollapse}
          title="组件属性设置"
        >
          <Palette className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (!selectedWidgetId || !selectedWidget) {
    return (
      <div
        className="h-full bg-white border-l border-slate-200 flex flex-col items-center justify-center p-6 text-center select-none shrink-0 relative overflow-hidden transition-all"
        style={{ width: `${width}px` }}
      >
        <button
          className="absolute top-3 left-2 p-1 hover:bg-slate-200 rounded text-slate-500"
          onClick={onToggleCollapse}
          title="折叠右侧面板"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          <Palette className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-semibold text-slate-700 mb-1">未选中任何积木</h4>
        <p className="text-xs text-slate-400">点击画布上的任意积木模块，在此处配置具体文本与样式属性。</p>
      </div>
    );
  }

  const { css, dataSource, componentName, title } = selectedWidget;
  const isAvatarOrImage =
    dataSource.avatarSrc !== undefined ||
    dataSource.src !== undefined ||
    componentName.includes('avatar') ||
    componentName.includes('image');

  const currentImageSrc = (dataSource.avatarSrc || dataSource.src) as string;

  return (
    <div
      className="h-full bg-white border-l border-slate-200 flex flex-col select-none shrink-0 overflow-hidden transition-all"
      style={{ width: `${width}px` }}
    >
      <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <button
          className="p-1 hover:bg-slate-200 rounded text-slate-500 mr-1"
          onClick={onToggleCollapse}
          title="折叠右侧面板"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 truncate flex-1">
          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
          {title || componentName} 属性设置
        </h3>
        <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-mono shrink-0 ml-1">
          ID: {selectedWidget.id.slice(-6)}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        {/* Local Image Uploader Panel */}
        {isAvatarOrImage && (
          <div className="space-y-2.5 p-3 bg-blue-50/60 border border-blue-200/80 rounded-xl shadow-sm">
            <label className="font-bold text-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-blue-600" /> 形象照 / 头像图片
              </span>
            </label>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-16 h-20 bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center shrink-0 shadow-inner relative">
                {currentImageSrc ? (
                  <img
                    src={currentImageSrc}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-7 h-7 text-slate-300" />
                )}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  onChange={handleAvatarFileUpload}
                />

                <button
                  type="button"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all active:scale-95"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4" />
                  {currentImageSrc ? '更换本地照片' : '上传本地照片'}
                </button>

                {currentImageSrc && (
                  <button
                    type="button"
                    className="w-full py-1 text-[11px] text-rose-600 hover:bg-rose-100 rounded-md text-center flex items-center justify-center gap-1 transition-colors"
                    onClick={handleRemoveAvatar}
                  >
                    <Trash2 className="w-3 h-3" />
                    清空照片
                  </button>
                )}
              </div>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              支持选择高清 PNG/JPG 免冠照或职业照，实时原图保真渲染。
            </p>
          </div>
        )}

        {/* 1. DataSource Content Setter */}
        {dataSource.text !== undefined && (
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-blue-600" /> 文本内容
            </label>
            <textarea
              rows={3}
              className="w-full p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 text-xs"
              value={dataSource.text as string}
              onChange={(e) =>
                updateWidgetDataSource(selectedWidget.id, { text: e.target.value })
              }
            />
          </div>
        )}

        {/* 2. Position & Size */}
        <div className="space-y-2">
          <label className="font-semibold text-slate-700 flex items-center gap-1">
            <Move className="w-3.5 h-3.5 text-blue-600" /> 位置与尺寸
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-slate-400">X (px)</span>
              <input
                type="number"
                className="w-full p-1.5 border border-slate-200 rounded text-slate-800"
                value={css.left}
                onChange={(e) =>
                  updateWidgetCss(selectedWidget.id, { left: Number(e.target.value) || 0 })
                }
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400">Y (px)</span>
              <input
                type="number"
                className="w-full p-1.5 border border-slate-200 rounded text-slate-800"
                value={css.top}
                onChange={(e) =>
                  updateWidgetCss(selectedWidget.id, { top: Number(e.target.value) || 0 })
                }
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400">宽度 W</span>
              <input
                type="number"
                className="w-full p-1.5 border border-slate-200 rounded text-slate-800"
                value={css.width}
                onChange={(e) =>
                  updateWidgetCss(selectedWidget.id, { width: Number(e.target.value) || 20 })
                }
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400">高度 H</span>
              <input
                type="number"
                className="w-full p-1.5 border border-slate-200 rounded text-slate-800"
                value={css.height}
                onChange={(e) =>
                  updateWidgetCss(selectedWidget.id, { height: Number(e.target.value) || 20 })
                }
              />
            </div>
          </div>
        </div>

        {/* 3. Typography Styles */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="font-semibold text-slate-700">字体样式</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-slate-400">字号 (px)</span>
              <input
                type="number"
                className="w-full p-1.5 border border-slate-200 rounded text-slate-800"
                value={css.fontSize || 14}
                onChange={(e) =>
                  updateWidgetCss(selectedWidget.id, { fontSize: Number(e.target.value) || 14 })
                }
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400">文字颜色</span>
              <div className="flex gap-1">
                <input
                  type="color"
                  className="w-8 h-7 border border-slate-200 rounded cursor-pointer"
                  value={css.fontColor || '#000000'}
                  onChange={(e) => updateWidgetCss(selectedWidget.id, { fontColor: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full p-1 border border-slate-200 rounded text-slate-800 text-[11px]"
                  value={css.fontColor || '#000000'}
                  onChange={(e) => updateWidgetCss(selectedWidget.id, { fontColor: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-600">对齐方式</span>
            <div className="flex bg-slate-100 rounded p-0.5 border border-slate-200">
              <button
                className={`p-1 rounded ${
                  css.textAlign === 'left' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
                }`}
                onClick={() => updateWidgetCss(selectedWidget.id, { textAlign: 'left' })}
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                className={`p-1 rounded ${
                  css.textAlign === 'center' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
                }`}
                onClick={() => updateWidgetCss(selectedWidget.id, { textAlign: 'center' })}
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                className={`p-1 rounded ${
                  css.textAlign === 'right' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
                }`}
                onClick={() => updateWidgetCss(selectedWidget.id, { textAlign: 'right' })}
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4. Background & Border */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="font-semibold text-slate-700">背景与边框</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-slate-400">背景颜色</span>
              <div className="flex gap-1">
                <input
                  type="color"
                  className="w-8 h-7 border border-slate-200 rounded cursor-pointer"
                  value={css.backgroundColor || '#ffffff'}
                  onChange={(e) =>
                    updateWidgetCss(selectedWidget.id, { backgroundColor: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-full p-1 border border-slate-200 rounded text-slate-800 text-[11px]"
                  value={css.backgroundColor || ''}
                  placeholder="无背景"
                  onChange={(e) =>
                    updateWidgetCss(selectedWidget.id, { backgroundColor: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400">圆角 Radius</span>
              <input
                type="number"
                className="w-full p-1.5 border border-slate-200 rounded text-slate-800"
                value={typeof css.borderRadius === 'number' ? css.borderRadius : 0}
                onChange={(e) =>
                  updateWidgetCss(selectedWidget.id, { borderRadius: Number(e.target.value) || 0 })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <span className="text-[10px] text-slate-400">边框颜色</span>
              <input
                type="color"
                className="w-full h-7 border border-slate-200 rounded cursor-pointer"
                value={css.borderColor || '#cbd5e1'}
                onChange={(e) =>
                  updateWidgetCss(selectedWidget.id, { borderColor: e.target.value })
                }
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400">边框宽度 (px)</span>
              <input
                type="number"
                className="w-full p-1.5 border border-slate-200 rounded text-slate-800"
                value={css.borderWidth || 0}
                onChange={(e) =>
                  updateWidgetCss(selectedWidget.id, {
                    borderWidth: Number(e.target.value) || 0,
                    borderStyle: Number(e.target.value) > 0 ? 'solid' : 'none'
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* 5. Layer Z-Index */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <label className="font-semibold text-slate-700 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-600" /> 图层层级 Z-Index
          </label>
          <input
            type="number"
            className="w-full p-1.5 border border-slate-200 rounded text-slate-800"
            value={css.zIndex || 1}
            onChange={(e) =>
              updateWidgetCss(selectedWidget.id, { zIndex: Number(e.target.value) || 1 })
            }
          />
        </div>
      </div>
    </div>
  );
};
