import React from 'react';
import type { IWidget } from '@/types/lego';
import { User } from 'lucide-react';

export function renderFormattedText(text: string) {
  if (!text) return null;

  // Clean repeated or empty asterisks
  const cleaned = text.replace(/\*{4,}/g, '').replace(/\*\*\*\*/g, '');

  // Convert markdown and pseudo tags to clean HTML
  const html = cleaned
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[color=(.*?)\](.*?)\[\/color\]/g, '<span style="color:$1;font-weight:bold;">$2</span>')
    .replace(/\[size=(.*?)\](.*?)\[\/size\]/g, '<span style="font-size:$1px;">$2</span>')
    .replace(/\[bg=(.*?)\](.*?)\[\/bg\]/g, '<mark style="background-color:$1;padding:0 4px;border-radius:3px;">$2</mark>');

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

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

    case 'hj-[#exper-1]': {
      const company = (dataSource.companyName || '') as string;
      const role = (dataSource.jobTitle || '') as string;
      const time = (dataSource.workTime || '') as string;
      const content = (dataSource.workContent || dataSource.text || '') as string;
      const align = (css.textAlign as React.CSSProperties['textAlign']) || 'left';
      return (
        <div
          style={{
            ...style,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            padding: '6px 8px',
            backgroundColor: css.backgroundColor || 'transparent',
            alignItems: 'stretch',
            justifyContent: 'flex-start'
          }}
        >
          {(company || role || time) && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                fontWeight: css.fontWeight || 'bold',
                fontFamily: css.fontFamily,
                fontSize: '13.5px',
                color: css.fontColor || '#0f172a'
              }}
            >
              <span>{renderFormattedText(company)} {role ? `· ${role}` : ''}</span>
              {time && (
                <span style={{ color: '#475569', fontWeight: 'bold', fontSize: '12.5px', textAlign: 'right' }}>
                  {time}
                </span>
              )}
            </div>
          )}
          <div
            style={{
              fontSize: css.fontSize ? `${css.fontSize}px` : '12.5px',
              fontWeight: css.fontWeight,
              fontFamily: css.fontFamily,
              color: css.fontColor || '#334155',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              textAlign: align,
              width: '100%'
            }}
          >
            {content ? renderFormattedText(content) : '双击/在右侧编辑经历内容'}
          </div>
        </div>
      );
    }

    case 'hj-circle':
      return <div style={{ ...style, borderRadius: '50%', backgroundColor: css.backgroundColor || '#2563eb' }} />;

    case 'hj-rectangle':
      return (
        <div
          style={{
            ...style,
            display: 'flex',
            alignItems: 'center',
            justifyContent: css.textAlign === 'center' ? 'center' : css.textAlign === 'right' ? 'flex-end' : 'flex-start',
            padding: '2px 8px'
          }}
        >
          {dataSource.text && <div>{renderFormattedText(dataSource.text)}</div>}
        </div>
      );

    case 'hj-text-1':
    default:
      return (
        <div
          style={{
            ...style,
            textAlign: (css.textAlign as React.CSSProperties['textAlign']) || 'left'
          }}
        >
          {dataSource.text ? renderFormattedText(dataSource.text) : '双击/在右侧编辑文本'}
        </div>
      );
  }
};
