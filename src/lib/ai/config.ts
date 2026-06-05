import type { AIMode } from "@/lib/ai/types";

export interface AIConfig {
  mode: AIMode;
  apiKey: string;
  baseUrl: string;
  model: string;
  provider: string;
}

export function getAIConfig(): AIConfig {
  const apiKey = process.env.LLM_API_KEY?.trim() ?? "";
  const forceMock = process.env.USE_MOCK_AI === "true";
  const mode: AIMode = !forceMock && apiKey ? "llm" : "mock";

  return {
    mode,
    apiKey,
    baseUrl: (process.env.LLM_BASE_URL?.trim() || "https://api.openai.com/v1").replace(/\/$/, ""),
    model: process.env.LLM_MODEL?.trim() || "gpt-4o-mini",
    provider: process.env.LLM_PROVIDER?.trim() || "openai-compatible",
  };
}

export function getPublicAIStatus() {
  const config = getAIConfig();
  const forceMock = process.env.USE_MOCK_AI === "true";
  const missingApiKey = !config.apiKey;

  return {
    mode: config.mode,
    model: config.mode === "llm" ? config.model : undefined,
    provider: config.mode === "llm" ? config.provider : undefined,
    reason:
      config.mode === "mock"
        ? forceMock
          ? "forced"
          : missingApiKey
            ? "missing_api_key"
            : undefined
        : undefined,
  };
}
