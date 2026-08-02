export function printLegoCanvas() {
  const canvasElement = document.getElementById('lego-canvas-page');
  if (!canvasElement) {
    alert('无法找到积木画布容器');
    return;
  }

  // Create a temporary hidden iframe for printing
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    alert('创建打印任务失败');
    document.body.removeChild(iframe);
    return;
  }

  // Clone canvas content
  const clone = canvasElement.cloneNode(true) as HTMLElement;

  // Remove selection outlines / handles from clone
  const handles = clone.querySelectorAll('.ring-2, .ring-1, [class*="cursor-"]');
  handles.forEach((el) => {
    el.classList.remove('ring-2', 'ring-blue-500', 'ring-1', 'ring-blue-300');
    // Hide handles
    const handleDots = el.querySelectorAll('div[class*="border-blue-600"]');
    handleDots.forEach((dot) => dot.remove());
  });

  // Ensure absolute positioning is explicitly set in inline style for all child widgets
  const childWidgets = clone.children;
  for (let i = 0; i < childWidgets.length; i++) {
    const child = childWidgets[i] as HTMLElement;
    if (child && child.style) {
      child.style.position = 'absolute';
    }
  }

  // Collect all styles & stylesheets from main document
  const headStyles: string[] = [];
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
    headStyles.push(node.outerHTML);
  });

  // Construct print document HTML
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>积木简历导出</title>
        ${headStyles.join('\n')}
        <style>
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #lego-canvas-page {
            position: relative !important;
            margin: 0 auto !important;
            background: #ffffff !important;
            box-shadow: none !important;
            border: none !important;
            page-break-after: always;
            box-sizing: border-box;
          }
          #lego-canvas-page * {
            box-sizing: border-box;
          }
        </style>
      </head>
      <body>
        ${clone.outerHTML}
      </body>
    </html>
  `);
  doc.close();

  // Trigger print after styles load
  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 400);
}
