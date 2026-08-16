import React, { useRef, useState } from 'react';
import { useLegoDesignerStore } from '@/store/lego-designer-store';
import { useResumeStore } from '@/store/resume-store';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Type,
  Move,
  Palette,
  Layers,
  ChevronLeft,
  ChevronRight,
  Upload,
  User,
  Trash2,
  Image as ImageIcon,
  RotateCw,
  Star,
  QrCode,
  Paintbrush,
  Briefcase
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
  const {
    getSelectedWidget,
    updateWidgetCss,
    updateWidgetDataSource,
    selectedWidgetId,
    selectedWidgetIds,
    isFormatPainterActive,
    toggleFormatPainter,
    alignWidgets
  } = useLegoDesignerStore();
  const { setUserInput } = useResumeStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedSelectionRangeRef = useRef<Range | null>(null);
  const [selectedCustomColor, setSelectedCustomColor] = useState('#2563eb');

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
      savedSelectionRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    if (savedSelectionRangeRef.current && window.getSelection) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelectionRangeRef.current);
      }
    }
  };

  const convertLegacyTagsToHTML = (text: string): string => {
    if (!text) return '';
    return text
      .replace(/\*{4,}/g, '')
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\[color=(.*?)\](.*?)\[\/color\]/g, '<span style="color:$1;">$2</span>')
      .replace(/\[bg=(.*?)\](.*?)\[\/bg\]/g, '<mark style="background-color:$1;padding:0 2px;">$2</mark>')
      .replace(/\[size=(.*?)\](.*?)\[\/size\]/g, '<span style="font-size:$1px;">$2</span>');
  };

  const execRichCommand = (command: string, value: string = '') => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    restoreSelection();
    document.execCommand(command, false, value);
    const updatedHtml = editorRef.current.innerHTML;
    if (selectedWidgetId) {
      updateWidgetDataSource(selectedWidgetId, {
        text: updatedHtml,
        workContent: updatedHtml
      });
    }
  };

  const applyForeColor = (colorHex: string) => {
    execRichCommand('foreColor', colorHex);
  };

  const stripAllInlineFormats = () => {
    if (!selectedWidgetId || !editorRef.current) return;
    const plainText = editorRef.current.innerText || editorRef.current.textContent || '';
    editorRef.current.innerText = plainText;
    updateWidgetDataSource(selectedWidgetId, { text: plainText, workContent: plainText });
  };

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

  const qrFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleRemoveAvatar = () => {
    if (!selectedWidgetId) return;
    updateWidgetDataSource(selectedWidgetId, { avatarSrc: '', src: '' });
    setUserInput({ avatarUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleQrFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedWidgetId) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        updateWidgetDataSource(selectedWidgetId, { qrCodeSrc: base64, src: base64, avatarSrc: base64 });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveQrCode = () => {
    if (!selectedWidgetId) return;
    updateWidgetDataSource(selectedWidgetId, { qrCodeSrc: '', src: '', avatarSrc: '' });
    if (qrFileInputRef.current) {
      qrFileInputRef.current.value = '';
    }
  };

  const selectedWidget = getSelectedWidget();

  const htmlContent = convertLegacyTagsToHTML(
    ((selectedWidget?.dataSource.workContent || selectedWidget?.dataSource.text || '') as string)
  );

  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== htmlContent) {
      editorRef.current.innerHTML = htmlContent;
    }
  }, [htmlContent, selectedWidget?.id]);

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

        <div className="flex items-center gap-1 shrink-0 ml-1">
          {selectedWidgetIds.length > 1 && (
            <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-medium">
              已选{selectedWidgetIds.length}项
            </span>
          )}
          <button
            type="button"
            className={`p-1 rounded transition-colors cursor-pointer border ${
              isFormatPainterActive
                ? 'bg-amber-500 text-white border-amber-500 font-bold ring-2 ring-amber-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            onClick={() => toggleFormatPainter()}
            title={isFormatPainterActive ? '关闭格式刷' : '提取当前组件样式，点击目标组件快速刷样式'}
          >
            <Paintbrush className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-mono">
            ID: {selectedWidget.id.slice(-6)}
          </span>
        </div>
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

        {/* QR Code Setter Panel */}
        {componentName === 'hj-other-2' && (
          <div className="space-y-2.5 p-3 bg-purple-50/60 border border-purple-200/80 rounded-xl shadow-sm">
            <label className="font-bold text-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-purple-600" /> 二维码图片管理
              </span>
            </label>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center shrink-0 shadow-inner relative p-1">
                {(dataSource.qrCodeSrc || dataSource.src || dataSource.avatarSrc) ? (
                  <img
                    src={(dataSource.qrCodeSrc || dataSource.src || dataSource.avatarSrc) as string}
                    alt="QR Code"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <QrCode className="w-8 h-8 text-slate-300" />
                )}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <input
                  ref={qrFileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  onChange={handleQrFileUpload}
                />

                <button
                  type="button"
                  className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
                  onClick={() => qrFileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4" />
                  {(dataSource.qrCodeSrc || dataSource.src || dataSource.avatarSrc) ? '更换二维码图片' : '上传二维码图片'}
                </button>

                {(dataSource.qrCodeSrc || dataSource.src || dataSource.avatarSrc) && (
                  <button
                    type="button"
                    className="w-full py-1 text-[11px] text-rose-600 hover:bg-rose-100 rounded-md text-center flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    onClick={handleRemoveQrCode}
                  >
                    <Trash2 className="w-3 h-3" />
                    删除 / 清空二维码图片
                  </button>
                )}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500">二维码说明文字</span>
              <input
                type="text"
                className="w-full p-1.5 border border-slate-200 rounded text-slate-800 text-xs bg-white"
                value={(dataSource.text as string) || ''}
                placeholder="例如：扫码查看个人微信 / 作品集"
                onChange={(e) =>
                  updateWidgetDataSource(selectedWidget.id, { text: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {/* Rate Widget Setter Panel */}
        {componentName.startsWith('hj-rate') && (
          <div className="space-y-2.5 p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl shadow-sm">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 评分等级与图形调节
            </label>

            {/* Rate Value */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-600 font-medium">当前评分得分 (Rate):</span>
                <span className="font-mono font-bold text-amber-700">
                  {dataSource.rate !== undefined ? dataSource.rate : 3}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={Number(dataSource.maxRate || (dataSource.shape === 'bar' ? 100 : 5))}
                step={dataSource.shape === 'bar' ? 5 : 1}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                value={dataSource.rate !== undefined ? dataSource.rate : 3}
                onChange={(e) =>
                  updateWidgetDataSource(selectedWidget.id, { rate: Number(e.target.value) })
                }
              />
            </div>

            {/* Max Rate */}
            <div>
              <span className="text-[10px] text-slate-500">满分/上限 (Max Rate)</span>
              <input
                type="number"
                min="1"
                className="w-full p-1.5 border border-slate-200 rounded text-slate-800 text-xs bg-white"
                value={dataSource.maxRate !== undefined ? dataSource.maxRate : (dataSource.shape === 'bar' ? 100 : 5)}
                onChange={(e) =>
                  updateWidgetDataSource(selectedWidget.id, { maxRate: Number(e.target.value) || 5 })
                }
              />
            </div>
          </div>
        )}

        {/* Experience Card Top Header Editor (Company, Job Title, Time) */}
        {(componentName === 'hj-[#exper-1]' ||
          dataSource.companyName !== undefined ||
          dataSource.jobTitle !== undefined ||
          dataSource.workTime !== undefined) && (
          <div className="space-y-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl shadow-2xs">
            <label className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
              <Briefcase className="w-4 h-4 text-blue-600 shrink-0" /> 经历顶栏标题与时间
            </label>

            <div>
              <span className="text-[10.5px] text-slate-500 font-medium">公司 / 单位 / 项目 / 学校名称</span>
              <input
                type="text"
                className="w-full p-1.5 mt-0.5 border border-slate-300 rounded text-slate-800 text-xs bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none font-medium"
                value={(dataSource.companyName as string) || ''}
                placeholder="例如：陆丰市人民检察院 / 某科技公司"
                onChange={(e) => {
                  const newCompany = e.target.value;
                  const role = (dataSource.jobTitle || '') as string;
                  const content = (dataSource.workContent || '') as string;
                  updateWidgetDataSource(selectedWidget.id, {
                    companyName: newCompany,
                    text: content ? `${newCompany} · ${role}\n${content}` : `${newCompany} · ${role}`
                  });
                }}
              />
            </div>

            <div>
              <span className="text-[10.5px] text-slate-500 font-medium">岗位 / 角色 / 职务 / 专业方向</span>
              <input
                type="text"
                className="w-full p-1.5 mt-0.5 border border-slate-300 rounded text-slate-800 text-xs bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none font-medium"
                value={(dataSource.jobTitle as string) || ''}
                placeholder="例如：信息化运维实习生 / AI 产品经理"
                onChange={(e) => {
                  const newRole = e.target.value;
                  const company = (dataSource.companyName || '') as string;
                  const content = (dataSource.workContent || '') as string;
                  updateWidgetDataSource(selectedWidget.id, {
                    jobTitle: newRole,
                    text: content ? `${company} · ${newRole}\n${content}` : `${company} · ${newRole}`
                  });
                }}
              />
            </div>

            <div>
              <span className="text-[10.5px] text-slate-500 font-medium">履历起止时间</span>
              <input
                type="text"
                className="w-full p-1.5 mt-0.5 border border-slate-300 rounded text-slate-800 text-xs bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono font-medium"
                value={(dataSource.workTime as string) || ''}
                placeholder="例如：2025-01 至 2025-02"
                onChange={(e) => {
                  updateWidgetDataSource(selectedWidget.id, {
                    workTime: e.target.value
                  });
                }}
              />
            </div>
          </div>
        )}

        {/* 1. DataSource Content Setter */}
        {(dataSource.text !== undefined || dataSource.workContent !== undefined || dataSource.companyName !== undefined) && (
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs">
                <Type className="w-3.5 h-3.5 text-blue-600" /> 文本与经历内容
              </span>
              <span className="text-[10px] text-slate-400">划选文本点击以下快捷标记</span>
            </label>

            {/* Quick WYSIWYG Formatting Toolbar */}
            <div className="space-y-1.5 bg-slate-50 p-2 border border-slate-200 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-600">所见即所得局部排版：</span>
                <button
                  type="button"
                  onClick={stripAllInlineFormats}
                  className="text-[10px] text-slate-500 hover:text-red-600 underline cursor-pointer"
                  title="一键清除所选文本的加粗与变色格式"
                >
                  🧹 清除格式
                </button>
              </div>

              <div className="flex items-center flex-wrap gap-1">
                <button
                  type="button"
                  className="px-2 py-0.5 bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 rounded text-[10px] font-bold shadow-2xs transition-colors cursor-pointer flex items-center gap-0.5"
                  onClick={() => execRichCommand('bold')}
                  title="划选文本后点击：局部文字加粗"
                >
                  <Bold className="w-3 h-3 text-blue-600" /> 局部加粗
                </button>

                {/* Custom Color Picker for Selected Text with Confirm Button */}
                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded px-1.5 py-0.5 shadow-2xs">
                  <span className="text-[10px] text-slate-600 font-medium flex items-center gap-0.5">🎨 调色:</span>
                  <input
                    type="color"
                    value={selectedCustomColor}
                    className="w-4 h-4 rounded cursor-pointer border-0 p-0"
                    onChange={(e) => {
                      setSelectedCustomColor(e.target.value);
                      applyForeColor(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    className="px-1.5 py-0.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold cursor-pointer transition-colors shadow-2xs"
                    onClick={() => applyForeColor(selectedCustomColor)}
                    title="确定将调色盘颜色应用到划选文字"
                  >
                    ✓ 确定应用颜色
                  </button>
                </div>

                <button
                  type="button"
                  className="px-1.5 py-0.5 bg-yellow-100 hover:bg-yellow-200 text-amber-900 border border-yellow-300 rounded text-[10px] font-medium shadow-2xs transition-colors cursor-pointer"
                  onClick={() => execRichCommand('hiliteColor', '#fef08a')}
                  title="划选文本后点击：添加浅黄底色高亮"
                >
                  💡 黄底高亮
                </button>
              </div>

              {/* 7 Preset Color Swatches */}
              <div className="flex items-center gap-1.5 pt-1 border-t border-slate-200/60">
                <span className="text-[10px] text-slate-400">快速变色:</span>
                {[
                  { name: '宝蓝', hex: '#2563eb', bg: 'bg-blue-600' },
                  { name: '翡翠', hex: '#059669', bg: 'bg-emerald-600' },
                  { name: '珊瑚', hex: '#dc2626', bg: 'bg-red-600' },
                  { name: '琥珀', hex: '#d97706', bg: 'bg-amber-600' },
                  { name: '优雅紫', hex: '#7c3aed', bg: 'bg-purple-600' },
                  { name: '玫瑰粉', hex: '#e11d48', bg: 'bg-rose-600' },
                  { name: '深灰黑', hex: '#0f172a', bg: 'bg-slate-900' }
                ].map((sw) => (
                  <button
                    key={sw.hex}
                    type="button"
                    onClick={() => applyForeColor(sw.hex)}
                    className={`w-4 h-4 rounded-full ${sw.bg} hover:scale-125 transition-transform cursor-pointer border border-white shadow-2xs`}
                    title={`划选文本变${sw.name}`}
                  />
                ))}
              </div>
            </div>

            {/* WYSIWYG ContentEditable Box */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onMouseUp={saveSelection}
              onKeyUp={saveSelection}
              onSelect={saveSelection}
              className="w-full min-h-[100px] max-h-[220px] overflow-y-auto p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 text-xs font-sans leading-relaxed bg-white shadow-inner"
              onInput={(e) => {
                const html = e.currentTarget.innerHTML;
                updateWidgetDataSource(selectedWidget.id, {
                  text: html,
                  workContent: html
                });
              }}
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

          {/* Alignment Tools Card */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                🎯 一键对齐与分布
              </span>
              <span className="text-[10px] text-slate-400">
                {selectedWidgetIds.length > 1 ? `${selectedWidgetIds.length}项相对对齐` : '画布居中/边沿'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              <button
                type="button"
                className="p-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 rounded text-[10px] font-medium flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
                onClick={() => alignWidgets('left')}
                title="左对齐"
              >
                ├ 左对齐
              </button>
              <button
                type="button"
                className="p-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 rounded text-[10px] font-medium flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
                onClick={() => alignWidgets('centerX')}
                title="水平居中对齐"
              >
                ┼ 水平居中
              </button>
              <button
                type="button"
                className="p-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 rounded text-[10px] font-medium flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
                onClick={() => alignWidgets('right')}
                title="右对齐"
              >
                ┤ 右对齐
              </button>
              <button
                type="button"
                className="p-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 rounded text-[10px] font-medium flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
                onClick={() => alignWidgets('top')}
                title="顶对齐"
              >
                ┬ 顶对齐
              </button>
              <button
                type="button"
                className="p-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 rounded text-[10px] font-medium flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
                onClick={() => alignWidgets('centerY')}
                title="垂直居中对齐"
              >
                ┼ 垂直居中
              </button>
              <button
                type="button"
                className="p-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 rounded text-[10px] font-medium flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
                onClick={() => alignWidgets('bottom')}
                title="底对齐"
              >
                ┴ 底对齐
              </button>
              <button
                type="button"
                disabled={selectedWidgetIds.length < 3}
                className="p-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40 disabled:hover:bg-slate-50 disabled:hover:text-slate-700 border border-slate-200 rounded text-[10px] font-medium flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
                onClick={() => alignWidgets('distributeH')}
                title="3个以上组件：水平等间距分布"
              >
                ≡ 水平等距
              </button>
              <button
                type="button"
                disabled={selectedWidgetIds.length < 3}
                className="p-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40 disabled:hover:bg-slate-50 disabled:hover:text-slate-700 border border-slate-200 rounded text-[10px] font-medium flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
                onClick={() => alignWidgets('distributeV')}
                title="3个以上组件：垂直等间距分布"
              >
                III 垂直等距
              </button>
            </div>
          </div>
        </div>

        {/* 2.5 Rotation Control */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-slate-700 flex items-center gap-1">
              <RotateCw className="w-3.5 h-3.5 text-blue-600" /> 旋转角度 (Rotate)
            </label>
            <span className="font-mono text-[11px] text-blue-600 font-bold">
              {css.rotate || 0}°
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              value={css.rotate || 0}
              onChange={(e) =>
                updateWidgetCss(selectedWidget.id, { rotate: Number(e.target.value) })
              }
            />
            <input
              type="number"
              min="0"
              max="360"
              className="w-14 p-1 border border-slate-200 rounded text-slate-800 text-[11px] text-center shrink-0"
              value={css.rotate || 0}
              onChange={(e) =>
                updateWidgetCss(selectedWidget.id, { rotate: Number(e.target.value) % 360 })
              }
            />
          </div>
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[10px] text-slate-400">快速角度:</span>
            {[0, 90, 180, 270].map((angle) => (
              <button
                key={angle}
                type="button"
                className={`px-2 py-0.5 text-[10px] rounded font-mono border transition-all cursor-pointer ${
                  (css.rotate || 0) === angle
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
                onClick={() => updateWidgetCss(selectedWidget.id, { rotate: angle })}
              >
                {angle}°
              </button>
            ))}
          </div>
        </div>

        {/* 3. Typography Styles */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <label className="font-semibold text-slate-700 flex items-center justify-between">
            <span>字体样式与排版</span>
          </label>

          {/* Font Family Selection */}
          <div>
            <span className="text-[10px] text-slate-400">选择字体 (Font Family)</span>
            <select
              className="w-full p-1.5 border border-slate-200 rounded text-slate-800 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer font-medium"
              value={css.fontFamily || '-apple-system, BlinkMacSystemFont, sans-serif'}
              onChange={(e) => updateWidgetCss(selectedWidget.id, { fontFamily: e.target.value })}
            >
              <option value='system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif'>
                默认无衬线 (现代系统黑体)
              </option>
              <option value='"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif'>
                思源黑体 (Noto Sans SC - 大厂清晰黑体)
              </option>
              <option value='"Noto Serif SC", "SimSun", "Songti SC", serif'>
                思源宋体 (Noto Serif SC - 高端雅致宋体)
              </option>
              <option value='"Long Cang", cursive'>
                行草风 (Long Cang - 灵动行草)
              </option>
              <option value='"Zhi Mang Xing", cursive'>
                狂放书法 (Zhi Mang Xing - 霸气书法体)
              </option>
              <option value='"Fira Code", monospace'>
                等宽代码体 (Fira Code - 极客程序员)
              </option>
              <option value='"JetBrains Mono", monospace'>
                JetBrains Mono (开发者专属代码体)
              </option>
              <option value='Inter, sans-serif'>
                Inter (现代商务美学)
              </option>
              <option value='"SimSun", "STSong", serif'>
                标准宋体 (公文典雅风)
              </option>
              <option value='"KaiTi", "STKaiti", cursive'>
                手书楷体 (书香风)
              </option>
            </select>
          </div>

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

          {/* Font Weight & Boldness */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-600">字重与加粗</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className={`px-2 py-1 text-[11px] rounded border transition-colors flex items-center gap-1 cursor-pointer ${
                  css.fontWeight === 'bold' || css.fontWeight === 700 || css.fontWeight === '700'
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
                onClick={() =>
                  updateWidgetCss(selectedWidget.id, {
                    fontWeight:
                      css.fontWeight === 'bold' || css.fontWeight === 700 || css.fontWeight === '700'
                        ? 'normal'
                        : 'bold'
                  })
                }
                title="切换文字加粗 / 常规"
              >
                <Bold className="w-3.5 h-3.5" />
                加粗
              </button>

              <select
                className="p-1 border border-slate-200 rounded text-slate-800 text-[11px] bg-white cursor-pointer"
                value={css.fontWeight || 'normal'}
                onChange={(e) => updateWidgetCss(selectedWidget.id, { fontWeight: e.target.value })}
              >
                <option value="normal">常规 (400)</option>
                <option value="500">中等 (500)</option>
                <option value="600">半粗 (600)</option>
                <option value="bold">加粗 (700)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-600">对齐方式</span>
            <div className="flex bg-slate-100 rounded p-0.5 border border-slate-200">
              <button
                className={`p-1 rounded cursor-pointer ${
                  css.textAlign === 'left' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
                }`}
                onClick={() => updateWidgetCss(selectedWidget.id, { textAlign: 'left' })}
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                className={`p-1 rounded cursor-pointer ${
                  css.textAlign === 'center' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
                }`}
                onClick={() => updateWidgetCss(selectedWidget.id, { textAlign: 'center' })}
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                className={`p-1 rounded cursor-pointer ${
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
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <label className="font-semibold text-slate-700 flex items-center justify-between">
            <span>背景与边框</span>
            <button
              type="button"
              onClick={() => updateWidgetCss(selectedWidget.id, { backgroundColor: 'transparent' })}
              className="text-[10px] text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 font-medium"
            >
              🚫 设置为透明背景
            </button>
          </label>

          {/* Quick Color Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">预设颜色：</span>
            <button
              type="button"
              onClick={() => updateWidgetCss(selectedWidget.id, { backgroundColor: 'transparent' })}
              className="px-1.5 py-0.5 text-[10px] border border-dashed border-slate-300 rounded text-slate-600 hover:bg-slate-100 font-mono"
            >
              🚫 透明
            </button>
            <button
              type="button"
              onClick={() => updateWidgetCss(selectedWidget.id, { backgroundColor: '#ffffff' })}
              className="w-5 h-5 rounded border border-slate-300 bg-white shadow-2xs"
              title="纯白"
            />
            <button
              type="button"
              onClick={() => updateWidgetCss(selectedWidget.id, { backgroundColor: '#f1f5f9' })}
              className="w-5 h-5 rounded border border-slate-300 bg-slate-100 shadow-2xs"
              title="淡灰 (1.3 边栏色)"
            />
            <button
              type="button"
              onClick={() => updateWidgetCss(selectedWidget.id, { backgroundColor: '#1e3a8a' })}
              className="w-5 h-5 rounded border border-slate-300 bg-blue-900 shadow-2xs"
              title="藏蓝"
            />
            <button
              type="button"
              onClick={() => updateWidgetCss(selectedWidget.id, { backgroundColor: '#2563eb' })}
              className="w-5 h-5 rounded border border-slate-300 bg-blue-600 shadow-2xs"
              title="宝蓝"
            />
            <button
              type="button"
              onClick={() => updateWidgetCss(selectedWidget.id, { backgroundColor: '#0f172a' })}
              className="w-5 h-5 rounded border border-slate-300 bg-slate-900 shadow-2xs"
              title="墨黑"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-slate-400">背景颜色</span>
              <div className="flex gap-1">
                <input
                  type="color"
                  className="w-8 h-7 border border-slate-200 rounded cursor-pointer"
                  value={css.backgroundColor === 'transparent' ? '#ffffff' : (css.backgroundColor || '#ffffff')}
                  onChange={(e) =>
                    updateWidgetCss(selectedWidget.id, { backgroundColor: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-full p-1 border border-slate-200 rounded text-slate-800 text-[11px]"
                  value={css.backgroundColor || 'transparent'}
                  placeholder="transparent"
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

          {/* Opacity Slider */}
          <div className="pt-2 border-t border-slate-100/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-600 font-semibold">透明度 / 不透明度 (Opacity)</span>
              <span className="font-mono text-[11px] text-blue-600 font-bold">
                {Math.round((css.opacity !== undefined ? css.opacity : 1.0) * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                value={css.opacity !== undefined ? css.opacity : 1.0}
                onChange={(e) =>
                  updateWidgetCss(selectedWidget.id, { opacity: parseFloat(e.target.value) })
                }
              />
              <button
                type="button"
                onClick={() => updateWidgetCss(selectedWidget.id, { opacity: 0 })}
                className="px-1.5 py-0.5 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 rounded shrink-0 border border-slate-200 font-mono"
              >
                0%
              </button>
              <button
                type="button"
                onClick={() => updateWidgetCss(selectedWidget.id, { opacity: 1.0 })}
                className="px-1.5 py-0.5 text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-700 rounded shrink-0 border border-blue-200 font-mono font-bold"
              >
                100%
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <span className="text-[10px] text-slate-400">边框颜色</span>
              <div className="flex gap-1">
                <input
                  type="color"
                  className="w-8 h-7 border border-slate-200 rounded cursor-pointer"
                  value={css.borderColor === 'transparent' ? '#cbd5e1' : (css.borderColor || '#cbd5e1')}
                  onChange={(e) =>
                    updateWidgetCss(selectedWidget.id, { borderColor: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => updateWidgetCss(selectedWidget.id, { borderColor: 'transparent', borderWidth: 0 })}
                  className="px-1 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 rounded border border-slate-200 shrink-0"
                  title="无边框"
                >
                  无边框
                </button>
              </div>
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
