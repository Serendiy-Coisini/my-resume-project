import { getAIConfig } from "@/lib/ai/config";
import type { AIMode } from "@/lib/ai/types";
import {
  runMockFollowUpBullet,
  runMockRegenerateOptimizedItems,
  runMockResumeAnalysis,
  runMockReoptimizeWithBullets,
  runMockExtractTemplate,
} from "@/services/ai/resumeAgent.mock";
import {
  runLLMFollowUpBullet,
  runLLMRegenerateOptimizedItems,
  runLLMReoptimizeWithBullets,
  runLLMResumeAnalysis,
  runLLMExtractTemplate,
} from "@/services/ai/resumeAgent.llm";
import type { FollowUpBulletEntry } from "@/lib/ai/prompts";
import type { AnalysisResult, OptimizeStyle, UserInput } from "@/types/resume";

function currentMode(): AIMode {
  return getAIConfig().mode;
}

export async function analyzeResumeServer(
  input: UserInput,
  optimizeStyle: OptimizeStyle = "ai-product"
): Promise<{ result: AnalysisResult; mode: AIMode }> {
  const mode = currentMode();

  if (mode === "llm") {
    const result = await runLLMResumeAnalysis(input, optimizeStyle);
    return { result, mode };
  }

  const result = await runMockResumeAnalysis(input, optimizeStyle);
  return { result, mode };
}

export async function regenerateOptimizedItemsServer(
  input: UserInput,
  style: OptimizeStyle
): Promise<{ optimizedItems: AnalysisResult["optimizedItems"]; mode: AIMode }> {
  const mode = currentMode();

  if (mode === "llm") {
    const optimizedItems = await runLLMRegenerateOptimizedItems(input, style);
    return { optimizedItems, mode };
  }

  const optimizedItems = await runMockRegenerateOptimizedItems(style);
  return { optimizedItems, mode };
}

export async function generateFollowUpBulletServer(
  input: UserInput,
  question: string,
  purpose: string,
  userAnswer: string
): Promise<{ bullet: string; mode: AIMode }> {
  const mode = currentMode();

  if (mode === "llm") {
    const bullet = await runLLMFollowUpBullet(input, question, purpose, userAnswer);
    return { bullet, mode };
  }

  const bullet = await runMockFollowUpBullet(purpose, userAnswer);
  return { bullet, mode };
}

export async function reoptimizeWithBulletsServer(
  input: UserInput,
  style: OptimizeStyle,
  bullets: FollowUpBulletEntry[]
): Promise<{ optimizedItems: AnalysisResult["optimizedItems"]; finalResume: AnalysisResult["finalResume"]; mode: AIMode }> {
  const mode = currentMode();

  if (mode === "llm") {
    const { optimizedItems, finalResume } = await runLLMReoptimizeWithBullets(input, style, bullets);
    return { optimizedItems, finalResume, mode };
  }

  const { optimizedItems, finalResume } = await runMockReoptimizeWithBullets(input, style, bullets);
  return { optimizedItems, finalResume, mode };
}

export async function extractTemplateServer(rawContent: string): Promise<{ html: string; mode: AIMode }> {
  const mode = currentMode();

  if (mode === "llm") {
    const html = await runLLMExtractTemplate(rawContent);
    return { html, mode };
  }

  const html = await runMockExtractTemplate(rawContent);
  return { html, mode };
}
