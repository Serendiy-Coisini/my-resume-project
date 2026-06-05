import { NextResponse } from "next/server";
import { LLMError } from "@/lib/ai/client";
import type { AnalyzeRequestBody } from "@/lib/ai/types";
import { analyzeResumeServer } from "@/services/ai/resumeAgent.server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalyzeRequestBody;
    const { input, optimizeStyle = "ai-product" } = body;

    if (!input?.targetRole?.trim() || !input?.jobDescription?.trim() || !input?.originalResume?.trim()) {
      return NextResponse.json({ error: "请填写目标岗位、JD 和原始简历" }, { status: 400 });
    }

    const { result, mode } = await analyzeResumeServer(input, optimizeStyle);
    return NextResponse.json({ result, mode });
  } catch (error) {
    const message =
      error instanceof LLMError
        ? error.message
        : error instanceof Error
          ? error.message
          : "分析失败，请稍后重试";
    console.error("[analyze]", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
