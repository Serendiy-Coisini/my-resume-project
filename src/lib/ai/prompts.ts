import type {
  AnalysisResult,
  EvidenceStrength,
  OptimizeStyle,
  UserInput,
} from "@/types/resume";
import { STYLE_LABELS } from "@/lib/ai/types";

const ANALYSIS_JSON_SCHEMA = `{
  "jdAnalysis": {
    "responsibilities": string[],
    "hardRequirements": string[],
    "implicitRequirements": string[],
    "keywords": string[],
    "idealCandidate": string,
    "coreCompetencies": [{ "name": string, "importance": "high"|"medium"|"low", "description": string }]
  },
  "diagnosis": {
    "overallScore": number,
    "dimensionScores": [{ "dimension": string, "score": number, "comment": string }],
    "mainIssues": string[],
    "prioritySuggestions": string[]
  },
  "matchItems": [{
    "jdRequirement": string,
    "resumeEvidence": string,
    "evidenceStrength": "strong"|"medium"|"weak"|"none",
    "needsSupplement": boolean,
    "optimizationSuggestion": string
  }],
  "followUpQuestions": [{
    "id": string,
    "question": string,
    "purpose": string,
    "userAnswer": "",
    "generatedBullet": ""
  }],
  "optimizedItems": [{
    "id": string,
    "section": string,
    "before": string,
    "after": string,
    "reason": string,
    "riskWarning": string
  }],
  "finalResume": {
    "personalInfo": { "name": string, "email": string, "phone": string, "location": string },
    "jobIntent": string,
    "summary": string,
    "coreSkills": string[],
    "workExperience": [{ "company": string, "role": string, "period": string, "bullets": string[] }],
    "projectExperience": [{ "name": string, "role": string, "period": string, "bullets": string[] }],
    "skillsAndTools": string[],
    "education": { "school": string, "degree": string, "period": string }
  },
  "interviewPrep": {
    "likelyQuestions": [{ "question": string, "suggestedAnswer": string, "evidenceNeeded": string[] }],
    "evidenceToPrepare": string[],
    "possibleExaggerations": string[],
    "dataToSupplement": string[],
    "selfIntroduction": string
  }
}`;

export const RESUME_AGENT_SYSTEM_PROMPT = `你是「简历专家」，一位 JD 定制简历优化 Agent。
你的任务是基于目标岗位 JD 与用户原始简历，输出结构化 JSON 分析结果。
要求：
1. 所有内容使用中文
2. 分析必须基于用户提供的 JD 与简历，不得编造无法从材料推断的虚假经历
3. 对缺失证据要明确标注 needsSupplement 或 evidenceStrength 为 weak/none
4. followUpQuestions 生成 5-10 条，id 格式 fu-1, fu-2...
5. optimizedItems 至少 5 条，id 格式 opt-1, opt-2...
6. interviewPrep.likelyQuestions 恰好 10 条
7. overallScore 与各 dimensionScores.score 范围 0-100
8. 只输出合法 JSON，不要 markdown 代码块`;

const ANALYSIS_CORE_SCHEMA = `{
  "jdAnalysis": {
    "responsibilities": string[],
    "hardRequirements": string[],
    "implicitRequirements": string[],
    "keywords": string[],
    "idealCandidate": string,
    "coreCompetencies": [{ "name": string, "importance": "high"|"medium"|"low", "description": string }]
  },
  "diagnosis": {
    "overallScore": number,
    "dimensionScores": [{ "dimension": string, "score": number, "comment": string }],
    "mainIssues": string[],
    "prioritySuggestions": string[]
  },
  "matchItems": [{
    "jdRequirement": string,
    "resumeEvidence": string,
    "evidenceStrength": "strong"|"medium"|"weak"|"none",
    "needsSupplement": boolean,
    "optimizationSuggestion": string
  }],
  "followUpQuestions": [{
    "id": string,
    "question": string,
    "purpose": string,
    "userAnswer": "",
    "generatedBullet": ""
  }]
}`;

const ANALYSIS_OUTPUT_SCHEMA = `{
  "optimizedItems": [{
    "id": string,
    "section": string,
    "before": string,
    "after": string,
    "reason": string,
    "riskWarning": string
  }],
  "finalResume": {
    "personalInfo": { "name": string, "email": string, "phone": string, "location": string },
    "jobIntent": string,
    "summary": string,
    "coreSkills": string[],
    "workExperience": [{ "company": string, "role": string, "period": string, "bullets": string[] }],
    "projectExperience": [{ "name": string, "role": string, "period": string, "bullets": string[] }],
    "skillsAndTools": string[],
    "education": { "school": string, "degree": string, "period": string }
  },
  "interviewPrep": {
    "likelyQuestions": [{ "question": string, "suggestedAnswer": string, "evidenceNeeded": string[] }],
    "evidenceToPrepare": string[],
    "possibleExaggerations": string[],
    "dataToSupplement": string[],
    "selfIntroduction": string
  }
}`;

function buildInputContext(input: UserInput): string {
  return `【目标岗位】${input.targetRole}
【行业】${input.industry}
【公司类型】${input.companyType}
【求职阶段】${input.jobStage}
【希望突出能力】${input.highlightSkills || "无"}

【目标 JD】
${input.jobDescription}

【原始简历】
${input.originalResume}

【补充信息】
${input.additionalInfo || "无"}`;
}

export function buildAnalyzeCorePrompt(input: UserInput): string {
  return `请完成 JD 解析（第一部分）。
${buildInputContext(input)}

只输出合法 JSON，结构：
{
  "jdAnalysis": {
    "responsibilities": string[],
    "hardRequirements": string[],
    "implicitRequirements": string[],
    "keywords": string[],
    "idealCandidate": string,
    "coreCompetencies": [{ "name": string, "importance": "high"|"medium"|"low", "description": string }]
  }
}`;
}

export function buildAnalyzeDiagnosisPrompt(input: UserInput): string {
  return `请完成简历诊断、匹配分析、经历追问（第二部分）。
${buildInputContext(input)}

只输出合法 JSON，结构：
{
  "diagnosis": {
    "overallScore": number,
    "dimensionScores": [{ "dimension": string, "score": number, "comment": string }],
    "mainIssues": string[],
    "prioritySuggestions": string[]
  },
  "matchItems": [{
    "jdRequirement": string,
    "resumeEvidence": string,
    "evidenceStrength": "strong"|"medium"|"weak"|"none",
    "needsSupplement": boolean,
    "optimizationSuggestion": string
  }],
  "followUpQuestions": [{
    "id": string,
    "question": string,
    "purpose": string,
    "userAnswer": "",
    "generatedBullet": ""
  }]
}

要求：followUpQuestions 5-7 条，id 为 fu-1...；matchItems 6-8 条。`;
}

export function buildAnalyzeOutputPrompt(
  input: UserInput,
  optimizeStyle: OptimizeStyle,
  coreSummary: string
): string {
  return `请完成简历优化与最终简历（第三部分）。
优化风格：${STYLE_LABELS[optimizeStyle]}

${buildInputContext(input)}

${coreSummary ? `【前序分析摘要】\n${coreSummary}\n` : ""}
只输出合法 JSON，结构：
{
  "optimizedItems": [{
    "id": string,
    "section": string,
    "before": string,
    "after": string,
    "reason": string,
    "riskWarning": string
  }],
  "finalResume": {
    "personalInfo": { "name": string, "email": string, "phone": string, "location": string },
    "jobIntent": string,
    "summary": string,
    "coreSkills": string[],
    "workExperience": [{ "company": string, "role": string, "period": string, "bullets": string[] }],
    "projectExperience": [{ "name": string, "role": string, "period": string, "bullets": string[] }],
    "skillsAndTools": string[],
    "education": { "school": string, "degree": string, "period": string }
  }
}

要求：optimizedItems 5-6 条，id 为 opt-1...。`;
}

export function buildAnalyzeInterviewPrompt(input: UserInput, coreSummary: string): string {
  return `请完成面试准备（第四部分）。
${buildInputContext(input)}

${coreSummary ? `【前序分析摘要】\n${coreSummary}\n` : ""}
只输出合法 JSON，结构：
{
  "interviewPrep": {
    "likelyQuestions": [{ "question": string, "suggestedAnswer": string, "evidenceNeeded": string[] }],
    "evidenceToPrepare": string[],
    "possibleExaggerations": string[],
    "dataToSupplement": string[],
    "selfIntroduction": string
  }
}

要求：likelyQuestions 恰好 10 条。`;
}

export function buildOptimizeUserPrompt(input: UserInput, style: OptimizeStyle): string {
  return `请基于以下材料，按「${STYLE_LABELS[style]}」风格重新生成 optimizedItems（至少 5 条）。

【目标岗位】${input.targetRole}
【目标 JD】
${input.jobDescription}

【原始简历】
${input.originalResume}

【补充信息】
${input.additionalInfo || "无"}

输出 JSON：
{
  "optimizedItems": [{
    "id": string,
    "section": string,
    "before": string,
    "after": string,
    "reason": string,
    "riskWarning": string
  }]
}`;
}

export function buildFollowUpBulletPrompt(
  input: UserInput,
  question: string,
  purpose: string,
  userAnswer: string
): string {
  return `请将用户的追问回答改写为一条专业、可写入简历的中文 bullet。
要求：动作 + 方法/场景 + 量化结果（如有）；不要夸大；长度 1-2 句；不要引号包裹。

【目标岗位】${input.targetRole}
【追问目的】${purpose}
【追问】${question}
【用户回答】${userAnswer}

输出 JSON：{ "bullet": string }`;
}

const EVIDENCE_STRENGTHS: EvidenceStrength[] = ["strong", "medium", "weak", "none"];

export function normalizeAnalysisResult(raw: AnalysisResult, input?: UserInput): AnalysisResult {
  return {
    jdAnalysis: {
      responsibilities: raw.jdAnalysis?.responsibilities ?? [],
      hardRequirements: raw.jdAnalysis?.hardRequirements ?? [],
      implicitRequirements: raw.jdAnalysis?.implicitRequirements ?? [],
      keywords: raw.jdAnalysis?.keywords ?? [],
      idealCandidate: raw.jdAnalysis?.idealCandidate ?? "",
      coreCompetencies: (raw.jdAnalysis?.coreCompetencies ?? []).map((item) => ({
        name: item.name ?? "",
        importance: item.importance ?? "medium",
        description: item.description ?? "",
      })),
    },
    diagnosis: {
      overallScore: clampScore(raw.diagnosis?.overallScore ?? 0),
      dimensionScores: (raw.diagnosis?.dimensionScores ?? []).map((item) => ({
        dimension: item.dimension ?? "",
        score: clampScore(item.score ?? 0),
        comment: item.comment ?? "",
      })),
      mainIssues: raw.diagnosis?.mainIssues ?? [],
      prioritySuggestions: raw.diagnosis?.prioritySuggestions ?? [],
    },
    matchItems: (raw.matchItems ?? []).map((item) => ({
      jdRequirement: item.jdRequirement ?? "",
      resumeEvidence: item.resumeEvidence ?? "",
      evidenceStrength: EVIDENCE_STRENGTHS.includes(item.evidenceStrength)
        ? item.evidenceStrength
        : "none",
      needsSupplement: Boolean(item.needsSupplement),
      optimizationSuggestion: item.optimizationSuggestion ?? "",
    })),
    followUpQuestions: (raw.followUpQuestions ?? []).map((item, index) => ({
      id: item.id || `fu-${index + 1}`,
      question: item.question ?? "",
      purpose: item.purpose ?? "",
      userAnswer: item.userAnswer ?? "",
      generatedBullet: item.generatedBullet ?? "",
    })),
    optimizedItems: (raw.optimizedItems ?? []).map((item, index) => ({
      id: item.id || `opt-${index + 1}`,
      section: item.section ?? "",
      before: item.before ?? "",
      after: item.after ?? "",
      reason: item.reason ?? "",
      riskWarning: item.riskWarning ?? "",
    })),
    finalResume: {
      personalInfo: {
        name: raw.finalResume?.personalInfo?.name ?? "",
        email: raw.finalResume?.personalInfo?.email ?? "",
        phone: raw.finalResume?.personalInfo?.phone ?? "",
        location: raw.finalResume?.personalInfo?.location ?? "",
      },
      jobIntent: raw.finalResume?.jobIntent || (input ? `${input.targetRole} | ${input.industry}` : ""),
      summary: raw.finalResume?.summary ?? "",
      coreSkills: raw.finalResume?.coreSkills ?? [],
      workExperience: raw.finalResume?.workExperience ?? [],
      projectExperience: raw.finalResume?.projectExperience ?? [],
      skillsAndTools: raw.finalResume?.skillsAndTools ?? [],
      education: raw.finalResume?.education ?? { school: "", degree: "", period: "" },
    },
    interviewPrep: {
      likelyQuestions: raw.interviewPrep?.likelyQuestions ?? [],
      evidenceToPrepare: raw.interviewPrep?.evidenceToPrepare ?? [],
      possibleExaggerations: raw.interviewPrep?.possibleExaggerations ?? [],
      dataToSupplement: raw.interviewPrep?.dataToSupplement ?? [],
      selfIntroduction: raw.interviewPrep?.selfIntroduction ?? "",
    },
  };
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function normalizeOptimizedItems(
  items: AnalysisResult["optimizedItems"]
): AnalysisResult["optimizedItems"] {
  return (items ?? []).map((item, index) => ({
    id: item.id || `opt-${index + 1}`,
    section: item.section ?? "",
    before: item.before ?? "",
    after: item.after ?? "",
    reason: item.reason ?? "",
    riskWarning: item.riskWarning ?? "",
  }));
}
