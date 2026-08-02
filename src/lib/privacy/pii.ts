import type { AnalysisResult, UserInput } from "@/types/resume";

export interface PIIAnonymizeResult {
  anonymizedInput: UserInput;
  piiMap: Map<string, string>; // placeholder -> original
}

/**
 * Anonymize sensitive PII data in UserInput before sending to external LLM APIs.
 */
export function anonymizeUserInput(input: UserInput): PIIAnonymizeResult {
  const piiMap = new Map<string, string>();
  let phoneCounter = 1;
  let emailCounter = 1;
  let idCounter = 1;
  let wechatCounter = 1;
  let nameCounter = 1;

  const maskText = (text: string): string => {
    if (!text) return text;
    let result = text;

    // 1. Chinese 18-digit ID card
    result = result.replace(
      /\b[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dXx]\b/g,
      (match) => {
        const placeholder = `[PII_ID_${idCounter++}]`;
        piiMap.set(placeholder, match);
        return placeholder;
      }
    );

    // 2. Email addresses
    result = result.replace(
      /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g,
      (match) => {
        const placeholder = `[PII_EMAIL_${emailCounter++}]`;
        piiMap.set(placeholder, match);
        return placeholder;
      }
    );

    // 3. Mobile phone numbers (Chinese 11-digit & formats with spaces/dashes/country code)
    result = result.replace(
      /(?:\+?86[-\s]?)?1[3-9]\d[-\s]?\d{4}[-\s]?\d{4}\b/g,
      (match) => {
        const placeholder = `[PII_PHONE_${phoneCounter++}]`;
        piiMap.set(placeholder, match);
        return placeholder;
      }
    );

    // 4. WeChat / WX IDs (e.g. 微信：wxid_12345, WeChat: abc_123)
    result = result.replace(
      /(?:微信|微信号|WeChat|wechat|wx|WX)[:：\s]+([a-zA-Z0-9_-]{5,30})/gi,
      (fullMatch, capturedId) => {
        const placeholder = `[PII_WECHAT_${wechatCounter++}]`;
        piiMap.set(placeholder, capturedId);
        return fullMatch.replace(capturedId, placeholder);
      }
    );

    // 5. Explicit Name labels (e.g. 姓名：张三, 姓名: 李四)
    result = result.replace(
      /(?:姓名|候选人|求职者)[:：\s]+([\u4e00-\u9fa5]{2,4})\b/g,
      (fullMatch, capturedName) => {
        const placeholder = `[PII_NAME_${nameCounter++}]`;
        piiMap.set(placeholder, capturedName);
        return fullMatch.replace(capturedName, placeholder);
      }
    );

    return result;
  };

  const anonymizedInput: UserInput = {
    ...input,
    originalResume: maskText(input.originalResume),
    additionalInfo: maskText(input.additionalInfo),
    jobDescription: input.jobDescription, // JDs don't usually contain user PII, but keep as-is
  };

  return { anonymizedInput, piiMap };
}

/**
 * Restore placeholders back to original values in AnalysisResult or strings.
 */
export function restorePIIText(text: string, piiMap: Map<string, string>): string {
  if (!text || piiMap.size === 0) return text;
  let restored = text;
  for (const [placeholder, original] of piiMap.entries()) {
    restored = restored.replaceAll(placeholder, original);
  }
  return restored;
}

/**
 * Deeply restore AnalysisResult values replacing PII placeholders with original values.
 */
export function restoreAnalysisResult(
  result: AnalysisResult,
  piiMap: Map<string, string>
): AnalysisResult {
  if (!result || piiMap.size === 0) return result;

  const jsonStr = JSON.stringify(result);
  let restoredStr = jsonStr;

  for (const [placeholder, original] of piiMap.entries()) {
    restoredStr = restoredStr.replaceAll(placeholder, original);
  }

  try {
    return JSON.parse(restoredStr) as AnalysisResult;
  } catch {
    return result;
  }
}
