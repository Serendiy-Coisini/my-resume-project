import { NextResponse } from "next/server";

// Import core pdf-parse library directly to bypass pdf-parse index.js top-level readFileSync side effects
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse/lib/pdf-parse.js");

/**
 * Smart layout-aware PDF page renderer.
 * Sorts text items naturally by top-to-bottom line hierarchy and left-to-right columns,
 * preventing fragmenting text into isolated single-line chunks.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderPageSmart(pageData: any) {
  return pageData
    .getTextContent({ normalizeWhitespace: true })
    .then((textContent: { items: { str: string; transform: number[]; width?: number }[] }) => {
      const items = textContent.items;
      if (!items || items.length === 0) return "";

      // Sort items primarily by visual Y position (top to bottom), secondarily by X (left to right)
      // Note: PDF Y coordinates start from bottom (0) to top (height)
      items.sort((a, b) => {
        const yDiff = b.transform[5] - a.transform[5];
        if (Math.abs(yDiff) > 6) {
          return yDiff;
        }
        return a.transform[4] - b.transform[4];
      });

      let lastY: number | null = null;
      let lastX: number | null = null;
      let text = "";

      for (const item of items) {
        const str = item.str;
        if (!str) continue;

        const currentY = item.transform[5];
        const currentX = item.transform[4];

        if (lastY === null) {
          text += str;
        } else {
          const yDiff = Math.abs(lastY - currentY);
          if (yDiff > 6) {
            // Significant vertical gap -> new line
            text += "\n" + str;
          } else {
            // Same visual line -> check horizontal gap between elements/columns
            const xGap = currentX - (lastX ?? 0);
            if (xGap > 15) {
              text += "   " + str;
            } else if (xGap > 2) {
              text += " " + str;
            } else {
              text += str;
            }
          }
        }

        lastY = currentY;
        lastX = currentX + (item.width ?? str.length * 6);
      }

      return text;
    });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "未接收到上传的文件" }, { status: 400 });
    }

    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      return NextResponse.json({ error: "仅支持 PDF 格式文件 (.pdf)" }, { status: 400 });
    }

    // Limit file size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "文件大小超过上限（最大支持 10MB）" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Mute all internal PDF.js console.warn / stdout / stderr font warnings during parsing
    const originalWarn = console.warn;
    const originalLog = console.log;
    const originalStdoutWrite = process.stdout.write;
    const originalStderrWrite = process.stderr.write;

    let pdfData;
    try {
      console.warn = () => {};
      console.log = () => {};
      process.stdout.write = (() => true) as unknown as typeof process.stdout.write;
      process.stderr.write = (() => true) as unknown as typeof process.stderr.write;

      pdfData = await pdfParse(buffer, { pagerender: renderPageSmart });
    } finally {
      console.warn = originalWarn;
      console.log = originalLog;
      process.stdout.write = originalStdoutWrite;
      process.stderr.write = originalStderrWrite;
    }

    const text = pdfData.text?.trim();

    if (!text || text.length === 0) {
      return NextResponse.json(
        { error: "无法识别 PDF 文本内容。原因：该 PDF 可能是纯图片扫描件，或包含无法提取的加密文本。" },
        { status: 400 }
      );
    }

    return NextResponse.json({ text, pages: pdfData.numpages });
  } catch (error) {
    console.error("PDF Parsing error:", error);
    const detail = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `PDF 解析异常: ${detail}` }, { status: 500 });
  }
}
