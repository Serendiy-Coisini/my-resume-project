import React from 'react';
import type { IWidget } from '@/types/lego';
import { User } from 'lucide-react';

interface WidgetRendererProps {
  widget: IWidget;
}

export const WidgetRenderer: React.FC<WidgetRendererProps> = ({ widget }) => {
  const { componentName, css, dataSource } = widget;

  const avatarSrc = (dataSource.avatarSrc || dataSource.src) as string | undefined;

  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    color: css.fontColor,
    backgroundColor: css.backgroundColor || 'transparent',
    fontSize: css.fontSize ? `${css.fontSize}px` : undefined,
    fontWeight: css.fontWeight,
    fontFamily: css.fontFamily,
    letterSpacing: css.letterSpace ? `${css.letterSpace}px` : undefined,
    lineHeight: css.lineHeight,
    textAlign: css.textAlign,
    borderColor: css.borderColor || 'transparent',
    borderStyle: (css.borderStyle as React.CSSProperties['borderStyle']) || 'none',
    borderWidth: css.borderWidth !== undefined ? `${css.borderWidth}px` : '0px',
    borderRadius:
      typeof css.borderRadius === 'number'
        ? `${css.borderRadius}px`
        : css.borderRadius || undefined,
    opacity: css.opacity,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    display: 'flex',
    alignItems: componentName.includes('text') || componentName.includes('rectangle') ? 'flex-start' : 'center',
    justifyContent: css.textAlign === 'center' ? 'center' : css.textAlign === 'right' ? 'flex-end' : 'flex-start',
    overflow: 'hidden',
    position: 'relative'
  };

  switch (componentName) {
    case 'hj-avatar-1':
    case 'hj-avatar-2':
      return (
        <div style={{ ...style, backgroundColor: css.backgroundColor || '#f8fafc', borderWidth: css.borderWidth !== undefined ? `${css.borderWidth}px` : '1px', borderColor: css.borderColor || '#cbd5e1', borderStyle: (css.borderStyle as React.CSSProperties['borderStyle']) || 'solid' }}>
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt="Avatar"
              className="w-full h-full pointer-events-none"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                imageRendering: 'crisp-edges' as React.CSSProperties['imageRendering']
              }}
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-2 text-center select-none">
              <User className="w-8 h-8 text-slate-300 mb-1 shrink-0" />
              <span className="text-[11px] font-medium text-slate-500">点此上传形象照</span>
            </div>
          )}
        </div>
      );

    case 'hj-circle':
      return <div style={{ ...style, borderRadius: '50%', backgroundColor: css.backgroundColor || '#2563eb' }} />;

    case 'hj-rectangle':
      return <div style={{ ...style, backgroundColor: css.backgroundColor || '#f1f5f9' }}>{dataSource.text && <div>{dataSource.text}</div>}</div>;

    case 'hj-text-1':
    default:
      return <div style={style}>{dataSource.text || '双击/在右侧编辑文本'}</div>;
  }
};
