import type {
  AnalyzeResponseBody,
  ApplyFollowUpResponseBody,
  FollowUpBulletResponseBody,
  OptimizeResponseBody,
} from "@/lib/ai/types";
import type { AnalysisResult, OptimizeStyle, UserInput } from "@/types/resume";

export { STYLE_LABELS } from "@/lib/ai/types";

class ResumeAgentClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResumeAgentClientError";
  }
}

async function postJSON<T>(url: string, body: unknown, signal?: AbortSignal): Promise<T> {
  const effectiveSignal = signal ?? AbortSignal.timeout(60_000);

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: effectiveSignal,
    });
  } catch (error) {
    // User cancelled via AbortController — re-throw as-is so the caller
    // can distinguish cancellation from real errors
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }
    // Timeout from AbortSignal.timeout()
    if (error instanceof DOMException && error.name === "TimeoutError") {
      throw new ResumeAgentClientError("请求超时（60 秒），请缩短 JD / 简历内容后重试");
    }
    throw new ResumeAgentClientError("网络请求失败，请检查网络连接");
  }

  const data = (await response.json().catch(() => ({}))) as T & { error?: string };

  if (!response.ok) {
    throw new ResumeAgentClientError(data.error || `请求失败 (${response.status})`);
  }

  return data;
}

export async function fetchAIStatus() {
  const response = await fetch("/api/ai/status", { cache: "no-store" });
  if (!response.ok) {
    return { mode: "mock" as const };
  }
  return response.json() as Promise<{
    mode: "mock" | "llm";
    model?: string;
    provider?: string;
    reason?: "missing_api_key" | "forced";
  }>;
}

export async function runResumeAnalysis(
  input: UserInput,
  optimizeStyle: OptimizeStyle = "ai-product",
  signal?: AbortSignal
): Promise<AnalysisResult> {
  const data = await postJSON<AnalyzeResponseBody>("/api/analyze", { input, optimizeStyle }, signal);
  return data.result;
}

export async function regenerateOptimizedItems(
  input: UserInput,
  style: OptimizeStyle
): Promise<AnalysisResult["optimizedItems"]> {
  const data = await postJSON<OptimizeResponseBody>("/api/optimize", { input, style });
  return data.optimizedItems;
}

export async function generateFollowUpBullet(
  input: UserInput,
  question: string,
  purpose: string,
  userAnswer: string
): Promise<string> {
  const data = await postJSON<FollowUpBulletResponseBody>("/api/follow-up/bullet", {
    input,
    question,
    purpose,
    userAnswer,
  });
  return data.bullet;
}

/**
 * Apply follow-up generated bullets to regenerate optimizedItems + finalResume.
 */
export async function applyFollowUpBullets(
  input: UserInput,
  style: OptimizeStyle,
  bullets: { purpose: string; bullet: string }[]
): Promise<Pick<AnalysisResult, "optimizedItems" | "finalResume">> {
  const data = await postJSON<ApplyFollowUpResponseBody>("/api/apply-followup", {
    input,
    style,
    bullets,
  });
  return {
    optimizedItems: data.optimizedItems,
    finalResume: data.finalResume,
  };
}

export async function extractResumeTemplate(content: string): Promise<string> {
  const data = await postJSON<{ html: string }>("/api/extract-template", { content });
  return data.html;
}
