import type { ReactNode } from "react";

export type TemplateId = import("@/lib/resume-templates").TemplateId;

export type StepId =
  | "input"
  | "jd-analysis"
  | "diagnosis"
  | "match"
  | "follow-up"
  | "optimize"
  | "final-resume"
  | "interview"
  | "export";

export type StepStatus = "pending" | "active" | "completed" | "disabled";

export type EvidenceStrength = "strong" | "medium" | "weak" | "none";

export type JobStage = "校招" | "社招-初级" | "社招-中级" | "社招-高级" | "转行";

export type CompanyType = "大厂" | "中型公司" | "创业公司" | "外企" | "国企";

export interface UserInput {
  targetRole: string;
  industry: string;
  companyType: CompanyType;
  jobStage: JobStage;
  highlightSkills: string;
  jobDescription: string;
  originalResume: string;
  additionalInfo: string;
  avatarUrl?: string;
}

export interface CoreCompetency {
  name: string;
  importance: "high" | "medium" | "low";
  description: string;
}

export interface JDAnalysis {
  responsibilities: string[];
  hardRequirements: string[];
  implicitRequirements: string[];
  keywords: string[];
  idealCandidate: string;
  coreCompetencies: CoreCompetency[];
}

export interface DimensionScore {
  dimension: string;
  score: number;
  comment: string;
}

export interface ResumeDiagnosis {
  overallScore: number;
  dimensionScores: DimensionScore[];
  mainIssues: string[];
  prioritySuggestions: string[];
}

export interface MatchItem {
  jdRequirement: string;
  resumeEvidence: string;
  evidenceStrength: EvidenceStrength;
  needsSupplement: boolean;
  optimizationSuggestion: string;
}

export interface FollowUpQuestion {
  id: string;
  question: string;
  purpose: string;
  userAnswer: string;
  generatedBullet: string;
}

export type OptimizeStyle =
  | "concise"
  | "reduce-exaggeration"
  | "ai-product"
  | "tob-saas";

export interface OptimizedItem {
  id: string;
  section: string;
  before: string;
  after: string;
  reason: string;
  riskWarning: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface ProjectExperience {
  name: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface FinalResume {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    avatarUrl?: string;
  };
  jobIntent: string;
  summary: string;
  coreSkills: string[];
  workExperience: WorkExperience[];
  projectExperience: ProjectExperience[];
  skillsAndTools: string[];
  education: {
    school: string;
    degree: string;
    period: string;
  };
}

export interface InterviewQuestion {
  question: string;
  suggestedAnswer: string;
  evidenceNeeded: string[];
}

export interface InterviewPrep {
  likelyQuestions: InterviewQuestion[];
  evidenceToPrepare: string[];
  possibleExaggerations: string[];
  dataToSupplement: string[];
  selfIntroduction: string;
}

export interface AnalysisResult {
  jdAnalysis: JDAnalysis;
  diagnosis: ResumeDiagnosis;
  matchItems: MatchItem[];
  followUpQuestions: FollowUpQuestion[];
  optimizedItems: OptimizedItem[];
  finalResume: FinalResume;
  interviewPrep: InterviewPrep;
}

export interface StepConfig {
  id: StepId;
  label: string;
  icon?: ReactNode;
}
