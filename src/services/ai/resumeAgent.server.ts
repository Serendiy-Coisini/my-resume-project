import { getAIConfig } from "@/lib/ai/config";
import type { AIMode } from "@/lib/ai/types";
import {
  runMockFollowUpBullet,
  runMockRegenerateOptimizedItems,
  runMockResumeAnalysis,
} from "@/services/ai/resumeAgent.mock";
import {
  runLLMFollowUpBullet,
  runLLMRegenerateOptimizedItems,
  runLLMResumeAnalysis,
} from "@/services/ai/resumeAgent.llm";
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
