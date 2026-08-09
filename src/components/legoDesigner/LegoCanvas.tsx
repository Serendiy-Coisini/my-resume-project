import React, { useState, useRef } from 'react';
import { useLegoDesignerStore } from '@/store/lego-designer-store';
import { WidgetRenderer } from './widgets/WidgetRenderer';
import type { IWidget } from '@/types/lego';
import { Layers, Copy, Trash2, ArrowUp, ArrowDown, Maximize } from 'lucide-react';

// Text-based widget types that should auto-expand height
const isTextWidget = (componentName: string) =>
  componentName.startsWith('hj-text') ||
  componentName === 'hj-[#exper-1]' ||
  componentName === 'hj-li' ||
  componentName.startsWith('hj-date');

export const LegoCanvas: React.FC = () => {
  const {
    schema,
    selectedWidgetId,
    scale,
    setSelectedWidgetId,
    updateWidgetCss,
    deleteWidget,
    duplicateWidget,
    moveWidgetLayer,
    pushHistoryState,
    undo,
    redo
  } = useLegoDesignerStore();

  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    widgetId: string;
  } | null>(null);

  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    isResizing: boolean;
    resizeHandle?: string;
    startX: number;
    startY: number;
    initialLeft: number;
    initialTop: number;
    initialWidth: number;
    initialHeight: number;
    widgetId: string;
  } | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Close context menu on global click
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (contextMenu) setContextMenu(null);
    if ((e.target as HTMLElement).classList.contains('canvas-page-bg')) {
      setSelectedWidgetId(null);
    }
  };

  // Start dragging a widget
  const handleWidgetMouseDown = (e: React.MouseEvent, widget: IWidget) => {
    e.stopPropagation();
    setSelectedWidgetId(widget.id);

    if (e.button === 2) return; // Right click handled by contextmenu

    pushHistoryState();

    setDragState({
      isDragging: true,
      isResizing: false,
      startX: e.clientX,
      startY: e.clientY,
      initialLeft: widget.css.left,
      initialTop: widget.css.top,
      initialWidth: widget.css.width,
      initialHeight: widget.css.height,
      widgetId: widget.id
    });
  };

  // Start resizing a widget
  const handleResizeMouseDown = (e: React.MouseEvent, widget: IWidget, handle: string) => {
    e.stopPropagation();
    setSelectedWidgetId(widget.id);

    pushHistoryState();

    setDragState({
      isDragging: false,
      isResizing: true,
      resizeHandle: handle,
      startX: e.clientX,
      startY: e.clientY,
      initialLeft: widget.css.left,
      initialTop: widget.css.top,
      initialWidth: widget.css.width,
      initialHeight: widget.css.height,
      widgetId: widget.id
    });
  };

  // Drag & Resize Mouse Move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState) return;

    const deltaX = (e.clientX - dragState.startX) / scale;
    const deltaY = (e.clientY - dragState.startY) / scale;

    if (dragState.isDragging) {
      updateWidgetCss(
        dragState.widgetId,
        {
          left: Math.max(0, Math.round(dragState.initialLeft + deltaX)),
          top: Math.max(0, Math.round(dragState.initialTop + deltaY))
        },
        false
      );
    } else if (dragState.isResizing && dragState.resizeHandle) {
      const handle = dragState.resizeHandle;
      let newWidth = dragState.initialWidth;
      let newHeight = dragState.initialHeight;
      let newLeft = dragState.initialLeft;
      let newTop = dragState.initialTop;

      if (handle.includes('r')) newWidth = Math.max(20, Math.round(dragState.initialWidth + deltaX));
      if (handle.includes('b')) newHeight = Math.max(20, Math.round(dragState.initialHeight + deltaY));
      if (handle.includes('l')) {
        const possibleWidth = Math.max(20, Math.round(dragState.initialWidth - deltaX));
        newLeft = dragState.initialLeft + (dragState.initialWidth - possibleWidth);
        newWidth = possibleWidth;
      }
      if (handle.includes('t')) {
        const possibleHeight = Math.max(20, Math.round(dragState.initialHeight - deltaY));
        newTop = dragState.initialTop + (dragState.initialHeight - possibleHeight);
        newHeight = possibleHeight;
      }

      updateWidgetCss(
        dragState.widgetId,
        {
          left: newLeft,
          top: newTop,
          width: newWidth,
          height: newHeight
        },
        false
      );
    }
  };

  const handleMouseUp = () => {
    if (dragState) setDragState(null);
  };

  // Right-click Context Menu
  const handleContextMenu = (e: React.MouseEvent, widgetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedWidgetId(widgetId);
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      widgetId
    });
  };

  // Keybindings
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedWidgetId) {
        deleteWidget(selectedWidgetId);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) redo();
        else undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWidgetId, deleteWidget, undo, redo]);

  return (
    <div
      ref={canvasRef}
      className="relative flex-1 bg-slate-200/70 overflow-auto flex flex-col items-center py-8 select-none"
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="transition-transform origin-top duration-75 flex flex-col gap-8 items-center"
        style={{ transform: `scale(${scale})` }}
      >
        {(schema?.componentsTree || []).map((page) => (
          <div
            key={page.id || 'page-1'}
            id="lego-canvas-page"
            className="canvas-page-bg relative bg-white shadow-2xl rounded-sm border border-slate-300 overflow-hidden"
            style={{
              width: `${schema.css?.width || 820}px`,
              height: `${schema.css?.height || 1160}px`
            }}
          >
            {(page.children || []).map((widget) => {
              const isSelected = selectedWidgetId === widget.id;

              return (
                <div
                  key={widget.id}
                  className={`absolute group cursor-move ${
                    isSelected ? 'ring-2 ring-blue-500 ring-offset-0 z-50' : 'hover:ring-1 hover:ring-blue-300'
                  }`}
                  style={{
                    position: 'absolute',
                    left: `${widget.css.left}px`,
                    top: `${widget.css.top}px`,
                    width: `${widget.css.width}px`,
                    ...(isTextWidget(widget.componentName)
                      ? { minHeight: `${widget.css.height}px` }
                      : { height: `${widget.css.height}px` }),
                    transform: widget.css.rotate ? `rotate(${widget.css.rotate}deg)` : undefined,
                    zIndex: widget.css.zIndex || 1
                  }}
                  data-widget-id={widget.id}
                  onMouseDown={(e) => handleWidgetMouseDown(e, widget)}
                  onContextMenu={(e) => handleContextMenu(e, widget.id)}
                >
                  <WidgetRenderer widget={widget} />

                  {/* 8 Resize Handles */}
                  {isSelected && (
                    <>
                      {['tl', 'tr', 'bl', 'br', 't', 'b', 'l', 'r'].map((handle) => {
                        let posClass = '';
                        if (handle === 'tl') posClass = '-top-1.5 -left-1.5 cursor-nwse-resize';
                        if (handle === 'tr') posClass = '-top-1.5 -right-1.5 cursor-nesw-resize';
                        if (handle === 'bl') posClass = '-bottom-1.5 -left-1.5 cursor-nesw-resize';
                        if (handle === 'br') posClass = '-bottom-1.5 -right-1.5 cursor-nwse-resize';
                        if (handle === 't') posClass = '-top-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize';
                        if (handle === 'b') posClass = '-bottom-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize';
                        if (handle === 'l') posClass = 'top-1/2 -left-1.5 -translate-y-1/2 cursor-ew-resize';
                        if (handle === 'r') posClass = 'top-1/2 -right-1.5 -translate-y-1/2 cursor-ew-resize';

                        return (
                          <div
                            key={handle}
                            className={`absolute w-3 h-3 bg-white border-2 border-blue-600 rounded-full z-50 ${posClass}`}
                            onMouseDown={(e) => handleResizeMouseDown(e, widget, handle)}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-white shadow-xl rounded-lg border border-slate-200 py-1 z-[999] text-sm w-44 text-slate-700"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-full px-3 py-1.5 text-left hover:bg-slate-100 flex items-center gap-2"
            onClick={() => {
              moveWidgetLayer(contextMenu.widgetId, 'up');
              setContextMenu(null);
            }}
          >
            <ArrowUp className="w-4 h-4 text-slate-500" /> 向上一层
          </button>
          <button
            className="w-full px-3 py-1.5 text-left hover:bg-slate-100 flex items-center gap-2"
            onClick={() => {
              moveWidgetLayer(contextMenu.widgetId, 'down');
              setContextMenu(null);
            }}
          >
            <ArrowDown className="w-4 h-4 text-slate-500" /> 向下一层
          </button>
          <button
            className="w-full px-3 py-1.5 text-left hover:bg-slate-100 flex items-center gap-2"
            onClick={() => {
              moveWidgetLayer(contextMenu.widgetId, 'top');
              setContextMenu(null);
            }}
          >
            <Layers className="w-4 h-4 text-blue-500" /> 置于顶层
          </button>
          <div className="my-1 border-t border-slate-100" />
          <button
            className="w-full px-3 py-1.5 text-left hover:bg-slate-100 flex items-center gap-2"
            onClick={() => {
              duplicateWidget(contextMenu.widgetId);
              setContextMenu(null);
            }}
          >
            <Copy className="w-4 h-4 text-emerald-500" /> 复制组件
          </button>
          <button
            className="w-full px-3 py-1.5 text-left hover:bg-slate-100 flex items-center gap-2"
            onClick={() => {
              // Auto-fit: measure actual rendered height and update
              const widgetEl = document.querySelector(`[data-widget-id="${contextMenu.widgetId}"]`);
              if (widgetEl) {
                const contentEl = widgetEl.firstElementChild as HTMLElement;
                if (contentEl) {
                  const actualHeight = Math.max(20, contentEl.scrollHeight + 4);
                  updateWidgetCss(contextMenu.widgetId, { height: actualHeight });
                }
              }
              setContextMenu(null);
            }}
          >
            <Maximize className="w-4 h-4 text-indigo-500" /> 自适应高度
          </button>
          <button
            className="w-full px-3 py-1.5 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2"
            onClick={() => {
              deleteWidget(contextMenu.widgetId);
              setContextMenu(null);
            }}
          >
            <Trash2 className="w-4 h-4" /> 删除组件
          </button>
        </div>
      )}
    </div>
  );
};
