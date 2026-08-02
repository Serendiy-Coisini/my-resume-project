export const STYLE_LABELS = {
  concise: "更简洁",
  "reduce-exaggeration": "降低夸张",
  "ai-product": "更偏 AI 产品",
  "tob-saas": "更偏 ToB SaaS",
} as const;

export type AIMode = "mock" | "llm";

export interface AIStatus {
  mode: AIMode;
  model?: string;
  provider?: string;
  reason?: "missing_api_key" | "forced";
}

export interface AnalyzeRequestBody {
  input: import("@/types/resume").UserInput;
  optimizeStyle?: import("@/types/resume").OptimizeStyle;
}

export interface OptimizeRequestBody {
  input: import("@/types/resume").UserInput;
  style: import("@/types/resume").OptimizeStyle;
}

export interface FollowUpBulletRequestBody {
  input: import("@/types/resume").UserInput;
  question: string;
  purpose: string;
  userAnswer: string;
}

export interface APIErrorResponse {
  error: string;
}

export interface AnalyzeResponseBody {
  result: import("@/types/resume").AnalysisResult;
  mode: AIMode;
}

export interface OptimizeResponseBody {
  optimizedItems: import("@/types/resume").OptimizedItem[];
  mode: AIMode;
}

export interface FollowUpBulletResponseBody {
  bullet: string;
  mode: AIMode;
}

export interface ApplyFollowUpRequestBody {
  input: import("@/types/resume").UserInput;
  style: import("@/types/resume").OptimizeStyle;
  bullets: { purpose: string; bullet: string }[];
}

export interface ApplyFollowUpResponseBody {
  optimizedItems: import("@/types/resume").OptimizedItem[];
  finalResume: import("@/types/resume").AnalysisResult["finalResume"];
  mode: AIMode;
}
