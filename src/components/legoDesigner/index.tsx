import React, { useEffect, useState, useRef } from 'react';
import { Toolbar } from './Toolbar';
import { LeftComList } from './LeftComList';
import { LegoCanvas } from './LegoCanvas';
import { RightSetter } from './RightSetter';
import { useLegoDesignerStore } from '@/store/lego-designer-store';
import { useResumeStore } from '@/store/resume-store';
import { buildLegoSchemaFromResume } from '@/lib/lego-adapter';

export const LegoDesigner: React.FC = () => {
  const { setSchema, setScale } = useLegoDesignerStore();
  const { userInput, analysisResult } = useResumeStore();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [leftWidth, setLeftWidth] = useState(260);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightWidth, setRightWidth] = useState(260);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  const [isResizingLeft, setIsResizingLeft] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto populate Lego Canvas with AI-optimized resume data on load
    const initialSchema = buildLegoSchemaFromResume(userInput, analysisResult);
    setSchema(initialSchema, false);

    // Compute optimal fit scale on mount
    const updateAutoFitScale = () => {
      if (containerRef.current) {
        const availableHeight = containerRef.current.clientHeight - 80;
        if (availableHeight > 300) {
          const fitScale = Math.max(0.45, Math.min(1.0, Number((availableHeight / 1180).toFixed(2))));
          setScale(fitScale);
        }
      }
    };

    updateAutoFitScale();
    const timer = setTimeout(updateAutoFitScale, 100);
    return () => clearTimeout(timer);
  }, [userInput, analysisResult, setSchema, setScale]);

  // Handle Dragging Divider for Left Sidebar
  const handleLeftMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingLeft(true);
  };

  // Handle Dragging Divider for Right Sidebar
  const handleRightMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingRight(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingLeft && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newWidth = Math.max(180, Math.min(450, e.clientX - rect.left));
        setLeftWidth(newWidth);
      } else if (isResizingRight && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newWidth = Math.max(180, Math.min(450, rect.right - e.clientX));
        setRightWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizingLeft(false);
      setIsResizingRight(false);
    };

    if (isResizingLeft || isResizingRight) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingLeft, isResizingRight]);

  const containerClasses = isFullScreen
    ? 'fixed inset-0 z-[1000] w-screen h-screen bg-slate-900 flex flex-col overflow-hidden select-none'
    : 'w-full h-full bg-slate-100 flex flex-col rounded-xl overflow-hidden shadow-2xl border border-slate-300 select-none';

  return (
    <div ref={containerRef} className={containerClasses}>
      <Toolbar
        isFullScreen={isFullScreen}
        onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar */}
        <LeftComList
          width={leftWidth}
          isCollapsed={leftCollapsed}
          onToggleCollapse={() => setLeftCollapsed(!leftCollapsed)}
        />

        {/* Left Resizer Divider */}
        {!leftCollapsed && (
          <div
            className="w-1.5 hover:w-2 bg-slate-200 hover:bg-blue-500 cursor-col-resize transition-all shrink-0 z-10"
            onMouseDown={handleLeftMouseDown}
            title="按住拖拽调整左侧宽度"
          />
        )}

        {/* Main Canvas */}
        <LegoCanvas />

        {/* Right Resizer Divider */}
        {!rightCollapsed && (
          <div
            className="w-1.5 hover:w-2 bg-slate-200 hover:bg-blue-500 cursor-col-resize transition-all shrink-0 z-10"
            onMouseDown={handleRightMouseDown}
            title="按住拖拽调整右侧宽度"
          />
        )}

        {/* Right Sidebar */}
        <RightSetter
          width={rightWidth}
          isCollapsed={rightCollapsed}
          onToggleCollapse={() => setRightCollapsed(!rightCollapsed)}
        />
      </div>
    </div>
  );
};
