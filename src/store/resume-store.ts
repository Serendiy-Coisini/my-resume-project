import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AnalysisResult,
  OptimizeStyle,
  StepId,
  StepStatus,
  UserInput,
} from "@/types/resume";
import type { AIMode } from "@/lib/ai/types";
import { DEFAULT_CUSTOM_TEMPLATE_HTML } from "@/lib/resume-templates";

const STEPS: StepId[] = [
  "input",
  "jd-analysis",
  "diagnosis",
  "match",
  "follow-up",
  "optimize",
  "interview",
  "export",
];

interface ResumeStore {
  userInput: UserInput;
  currentStep: StepId;
  isAnalyzing: boolean;
  analysisResult: AnalysisResult | null;
  analysisError: string | null;
  aiMode: AIMode | null;
  optimizeStyle: OptimizeStyle;
  selectedTemplate: import("@/types/resume").TemplateId;
  customTemplateHTML: string;
  copied: boolean;

  setUserInput: (input: Partial<UserInput>) => void;
  loadExampleData: () => void;
  setCurrentStep: (step: StepId) => void;
  setAnalyzing: (analyzing: boolean) => void;
  setAnalysisResult: (result: AnalysisResult) => void;
  setAnalysisError: (error: string | null) => void;
  setAiMode: (mode: AIMode | null) => void;
  setOptimizeStyle: (style: OptimizeStyle) => void;
  setSelectedTemplate: (template: import("@/types/resume").TemplateId) => void;
  setCustomTemplateHTML: (html: string) => void;
  updateFollowUpAnswer: (id: string, answer: string) => void;
  setFollowUpBullet: (id: string, bullet: string) => void;
  getStepStatus: (step: StepId) => StepStatus;
  setCopied: (copied: boolean) => void;
  reset: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const defaultUserInput: UserInput = {
  targetRole: "",
  industry: "",
  companyType: "中型公司",
  jobStage: "社招-中级",
  highlightSkills: "",
  jobDescription: "",
  originalResume: "",
  additionalInfo: "",
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      userInput: defaultUserInput,
      currentStep: "input" as StepId,
      isAnalyzing: false,
      analysisResult: null,
      analysisError: null,
      aiMode: null,
      optimizeStyle: "ai-product" as OptimizeStyle,
      selectedTemplate: "modern-sidebar" as import("@/types/resume").TemplateId,
      customTemplateHTML: DEFAULT_CUSTOM_TEMPLATE_HTML,
      copied: false,

      setUserInput: (input) =>
        set((state) => ({
          userInput: { ...state.userInput, ...input },
        })),

      loadExampleData: () =>
        set({
          userInput: {
            targetRole: "AI 产品经理",
            industry: "企业服务 / SaaS",
            companyType: "大厂",
            jobStage: "社招-中级",
            highlightSkills: "AI 功能落地方案、提示词工程、数据驱动迭代",
            jobDescription: `岗位职责：
1. 负责核心 AI 功能（智能问答、文档理解、工作流自动化）的产品规划与设计；
2. 深入理解 B 端客户业务场景，将大模型能力转化为可落地的产品方案；
3. 与算法、工程团队紧密协作，推动 AI 功能从 POC 验证到规模化上线；
4. 建立 AI 产品效果评估体系，通过数据分析与用户反馈持续优化产品体验；
5. 跟踪 AI 行业前沿趋势，输出竞品分析与产品策略。

任职要求：
1. 3年以上 PM 经验，有 ToB SaaS 或企业服务产品背景；
2. 理解 LLM 能力边界与常见架构，有 AI 产品设计/落地经验者优先；
3. 具备优秀的需求分析、逻辑思维和跨部门沟通协作能力；
4. 熟练掌握数据分析方法，有良好的数据敏感度；
5. 本科及以上学历，计算机/信息管理相关专业优先。`,
            originalResume: `钟小龙
手机：18925600631 | 邮箱：3334002982@qq.com | 城市：广东潮州
求职意向：AI 产品经理 / 技术服务工程师

职业摘要：
软件工程专业本科在读，具备扎实的系统思维与逻辑分析能力。对 AI 产品有浓厚兴趣，擅长从用户数据中挖掘需求并推动优化。校园经历中展现出优秀的组织协调、文档编制与团队协作能力。

核心能力：
• 数据分析与问题解决
• 产品思维与用户洞察
• 系统化思维与故障排查
• 跨部门沟通与文档呈现

工作经历：
百度网盘 · 校园大使（产品运营方向）
2024.05 - 至今
• 负责小红书品牌推广，通过内容策划与用户互动提升曝光，单篇笔记最高获赞200+，积累用户反馈数据；
• 运营百人社群，组织话题讨论与活动，提高用户活跃度，收集产品使用意见并协助迭代；
• 基于互动率、转化率等数据优化内容策略，培养数据驱动决策习惯。

项目经历：
团支部组织与文书工作 · 团支书
2023.09 - 至今
• 策划并执行10次团日活动，协调30+人参与，确保活动流程零差错；
• 负责学院与支部间信息传达，100%触达率，体现严谨细致的工作态度；
• 制作10余份活动PPT及评选材料，提升文档整理与汇报能力。

校学生会综合部活动执行 · 成员
2022.09 - 2023.06
• 协助完成15场校园大型活动，累计参与人数超3000人，锻炼多线程任务协调能力；
• 及时完成部长下达的各项任务，个人工作考核分数满分。

技能工具：
Java · Microsoft Office · 数据分析基础 (Excel, 数据可视化) · 产品运营工具 (小红书, 社群运营)

教育背景：
韩山师范学院 · 本科 · 软件工程 · 2023.09 - 2027.06`,
            additionalInfo: "希望突出在 AI 功能落地、数据分析和产品设计方面的潜力。",
          },
        }),

      setCurrentStep: (step) => set({ currentStep: step }),

      setAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),

      setAnalysisResult: (result) => set({ analysisResult: result, analysisError: null }),

      setAnalysisError: (error) => set({ analysisError: error }),

      setAiMode: (mode) => set({ aiMode: mode }),

      setOptimizeStyle: (style) => set({ optimizeStyle: style }),

      setSelectedTemplate: (template) => set({ selectedTemplate: template }),

      setCustomTemplateHTML: (html) => set({ customTemplateHTML: html }),

      updateFollowUpAnswer: (id, answer) =>
        set((state) => {
          if (!state.analysisResult) return state;
          return {
            analysisResult: {
              ...state.analysisResult,
              followUpQuestions: state.analysisResult.followUpQuestions.map((q) =>
                q.id === id ? { ...q, userAnswer: answer } : q
              ),
            },
          };
        }),

      setFollowUpBullet: (id, bullet) =>
        set((state) => {
          if (!state.analysisResult) return state;
          return {
            analysisResult: {
              ...state.analysisResult,
              followUpQuestions: state.analysisResult.followUpQuestions.map((q) =>
                q.id === id ? { ...q, generatedBullet: bullet } : q
              ),
            },
          };
        }),

      getStepStatus: (stepId: StepId) => {
        const { currentStep, analysisResult } = get();
        if (stepId === currentStep) return "active";

        const currentIdx = STEPS.indexOf(currentStep);
        const targetIdx = STEPS.indexOf(stepId);

        if (targetIdx === 0) return "completed";
        if (!analysisResult) return "disabled";

        return targetIdx < currentIdx ? "completed" : "pending";
      },

      setCopied: (copied) => set({ copied }),

      reset: () =>
        set({
          userInput: defaultUserInput,
          currentStep: "input" as StepId,
          isAnalyzing: false,
          analysisResult: null,
          analysisError: null,
          optimizeStyle: "ai-product" as OptimizeStyle,
          selectedTemplate: "classic" as import("@/types/resume").TemplateId,
          customTemplateHTML: DEFAULT_CUSTOM_TEMPLATE_HTML,
          copied: false,
        }),

      goToNextStep: () => {
        const { currentStep } = get();
        const idx = STEPS.indexOf(currentStep);
        if (idx >= 0 && idx < STEPS.length - 1) {
          set({ currentStep: STEPS[idx + 1] });
        }
      },

      goToPreviousStep: () => {
        const { currentStep } = get();
        const idx = STEPS.indexOf(currentStep);
        if (idx > 0) {
          set({ currentStep: STEPS[idx - 1] });
        }
      },
    }),
    {
      name: "resume-expert-store",
      version: 1,
      partialize: (state) => ({
        userInput: state.userInput,
        currentStep: state.currentStep,
        analysisResult: state.analysisResult,
        optimizeStyle: state.optimizeStyle,
      }),
    }
  )
);
