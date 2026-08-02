import { delay } from "@/lib/utils";
import type {
  AnalysisResult,
  OptimizeStyle,
  UserInput,
} from "@/types/resume";

const STYLE_LABELS: Record<OptimizeStyle, string> = {
  concise: "更简洁",
  "reduce-exaggeration": "降低夸张",
  "ai-product": "更偏 AI 产品",
  "tob-saas": "更偏 ToB SaaS",
};

function buildJDAnalysis(_input: UserInput): AnalysisResult["jdAnalysis"] {
  return {
    responsibilities: [
      "负责 AI 功能的产品规划与迭代（智能问答、文档理解、工作流自动化）",
      "深入理解 B 端客户业务场景，将 AI 能力转化为可落地产品方案",
      "与算法、工程团队协作，推动 AI 功能从 POC 到规模化上线",
      "建立 AI 产品效果评估体系，数据驱动持续优化",
      "跟踪 AI 行业趋势，输出竞品分析与产品策略",
    ],
    hardRequirements: [
      "3年以上产品经理经验",
      "ToB SaaS 或企业服务产品经验",
      "优秀的需求分析与逻辑思维能力",
      "良好的跨部门沟通与项目管理能力",
      "本科及以上学历",
    ],
    implicitRequirements: [
      "具备将传统 B 端系统经验迁移到 AI 场景的能力",
      "理解 LLM 能力边界，能设计合理的 AI 产品交互",
      "有数据驱动决策习惯，能量化 AI 功能效果",
      "对 AI 行业有持续学习意愿与基本认知",
      "能在资源有限情况下推动 MVP 快速验证",
    ],
    keywords: [
      "AI 产品经理",
      "LLM",
      "ToB SaaS",
      "产品规划",
      "Prompt",
      "POC",
      "数据驱动",
      "ERP",
      "WMS",
      "智能问答",
      "工作流自动化",
      "效果评估",
    ],
    idealCandidate:
      "具备 3-5 年 ToB 产品经验，有 ERP/WMS/数据报表等系统落地背景，近期主动学习 AI 并有小范围实践，能将业务抽象能力与 AI 能力结合，推动智能化功能从验证到规模化。",
    coreCompetencies: [
      {
        name: "AI 产品规划",
        importance: "high",
        description: "能将 LLM 能力映射到具体业务场景，设计可落地的 AI 功能路线图",
      },
      {
        name: "ToB 需求分析",
        importance: "high",
        description: "深入理解企业客户业务流程，将复杂需求抽象为产品方案",
      },
      {
        name: "跨团队协作",
        importance: "high",
        description: "协调算法、工程、实施团队，推动 AI 功能从 POC 到上线",
      },
      {
        name: "数据驱动",
        importance: "medium",
        description: "建立 AI 效果评估指标，用数据验证产品决策",
      },
      {
        name: "行业认知",
        importance: "medium",
        description: "跟踪 AI 行业趋势，具备竞品分析与策略输出能力",
      },
      {
        name: "项目管理",
        importance: "medium",
        description: "在资源约束下管理版本迭代与交付节奏",
      },
    ],
  };
}

function buildDiagnosis(): AnalysisResult["diagnosis"] {
  return {
    overallScore: 58,
    dimensionScores: [
      {
        dimension: "岗位匹配度",
        score: 52,
        comment: "ToB 与数据产品背景契合，但 AI 相关经历描述不足",
      },
      {
        dimension: "经历表达",
        score: 55,
        comment: "多为功能描述，缺少量化成果与业务影响",
      },
      {
        dimension: "关键词覆盖",
        score: 48,
        comment: "缺少 LLM、Prompt、AI 效果评估等核心关键词",
      },
      {
        dimension: "结构完整性",
        score: 72,
        comment: "模块齐全，但职业摘要未突出转型动机与 AI 学习",
      },
      {
        dimension: "差异化亮点",
        score: 50,
        comment: "ERP/WMS/报表组合有价值，但未与 AI 岗位建立连接",
      },
    ],
    mainIssues: [
      "简历整体定位偏传统 B 端 PM，未体现 AI 产品转型意图",
      "工作经历 bullet 缺少 AI/智能化相关表述，关键词匹配度低",
      "量化数据偏少，部分表述（如 major 版本）不够专业",
      "补充信息中的 Demo 经验未体现在正文中",
      "职业摘要未呼应目标 JD 的核心能力要求",
    ],
    prioritySuggestions: [
      "重写职业摘要：突出 ToB + 数据产品背景向 AI 产品转型的路径",
      "将 WMS 补货、报表平台经历与「数据驱动」「智能化」建立关联",
      "补充 AI 学习与实践（文档问答 Demo）作为独立项目或技能模块",
      "每条 bullet 采用「动作 + 方法 + 量化结果」结构重写",
      "增加与 JD 关键词对齐的能力标签（LLM 应用、Prompt 设计等）",
    ],
  };
}

function buildMatchItems(): AnalysisResult["matchItems"] {
  return [
    {
      jdRequirement: "3年以上产品经理经验",
      resumeEvidence: "3.5年 B 端产品经验，含产品助理至产品经理完整路径",
      evidenceStrength: "strong",
      needsSupplement: false,
      optimizationSuggestion: "在摘要中明确年限与 B 端产品全周期经验",
    },
    {
      jdRequirement: "ToB SaaS 或企业服务产品经验",
      resumeEvidence: "WMS、ERP、经营数据报表平台，服务 50+ 企业客户",
      evidenceStrength: "strong",
      needsSupplement: false,
      optimizationSuggestion: "强调 SaaS 多租户、标准化交付等企业服务特征",
    },
    {
      jdRequirement: "AI 产品或智能化功能落地经验",
      resumeEvidence: "WMS 智能补货（基于历史数据的策略模型）",
      evidenceStrength: "weak",
      needsSupplement: true,
      optimizationSuggestion: "将补货策略与 AI/智能化关联；补充文档问答 Demo 项目",
    },
    {
      jdRequirement: "了解 LLM 基本原理",
      resumeEvidence: "补充信息提到 Prompt Engineering 和 LangChain 学习",
      evidenceStrength: "weak",
      needsSupplement: true,
      optimizationSuggestion: "在技能区增加 LLM/Prompt/LangChain；描述 Demo 具体能力",
    },
    {
      jdRequirement: "数据驱动与效果评估",
      resumeEvidence: "报表平台月活 200+、报表效率提升 60%、缺货率下降 25%",
      evidenceStrength: "medium",
      needsSupplement: false,
      optimizationSuggestion: "将数据成果与「产品效果评估体系」话术对齐",
    },
    {
      jdRequirement: "ERP/WMS 系统产品经验",
      resumeEvidence: "ERP 采购模块、WMS 核心模块、库存盘点重构",
      evidenceStrength: "strong",
      needsSupplement: false,
      optimizationSuggestion: "保留并强化，作为差异化竞争优势突出",
    },
    {
      jdRequirement: "跨部门沟通与项目管理",
      resumeEvidence: "协调研发、测试、实施团队，交付 3 个 major 版本",
      evidenceStrength: "medium",
      needsSupplement: false,
      optimizationSuggestion: "补充具体协作对象（算法/工程等）与交付里程碑",
    },
    {
      jdRequirement: "竞品分析与产品策略",
      resumeEvidence: "简历中无直接证据",
      evidenceStrength: "none",
      needsSupplement: true,
      optimizationSuggestion: "补充行业调研或竞品分析经历，哪怕是内部报告",
    },
  ];
}

function buildFollowUpQuestions(): AnalysisResult["followUpQuestions"] {
  return [
    {
      id: "fu-1",
      question: "你的文档问答 Demo 具体解决了什么业务问题？用了哪些技术栈？",
      purpose: "挖掘 AI 实践经验",
      userAnswer: "",
      generatedBullet: "",
    },
    {
      id: "fu-2",
      question: "WMS 智能补货的「策略模型」具体是什么逻辑？有没有 A/B 测试或效果数据？",
      purpose: "强化智能化经历表达",
      userAnswer: "",
      generatedBullet: "",
    },
    {
      id: "fu-3",
      question: "经营数据报表平台中，你如何定义「报表生成效率提升 60%」？",
      purpose: "验证量化数据可信度",
      userAnswer: "",
      generatedBullet: "",
    },
    {
      id: "fu-4",
      question: "你有没有参与过需求优先级排序或 ROI 评估？具体案例？",
      purpose: "补充产品策略能力",
      userAnswer: "",
      generatedBullet: "",
    },
    {
      id: "fu-5",
      question: "与研发协作中，有没有遇到过技术方案与产品预期不一致的情况？如何解决？",
      purpose: "挖掘跨团队协作细节",
      userAnswer: "",
      generatedBullet: "",
    },
    {
      id: "fu-6",
      question: "你最近关注的 AI 产品有哪些？它们哪里做得好/不好？",
      purpose: "补充行业认知与竞品分析",
      userAnswer: "",
      generatedBullet: "",
    },
    {
      id: "fu-7",
      question: "ERP/WMS 经验中，哪个业务流程最复杂？你如何抽象成产品方案？",
      purpose: "强化 ToB 需求分析能力",
      userAnswer: "",
      generatedBullet: "",
    },
  ];
}

function buildOptimizedItems(
  style: OptimizeStyle = "ai-product"
): AnalysisResult["optimizedItems"] {
  const styleNote = STYLE_LABELS[style];

  return [
    {
      id: "opt-1",
      section: "职业摘要",
      before:
        "3.5年 B 端产品经理经验，主导 ERP 库存管理、WMS 仓储系统及经营数据报表平台的产品设计与迭代。擅长需求调研、流程梳理与跨部门协作，具备从 0 到 1 搭建数据产品的经验。",
      after:
        "3.5年 ToB SaaS 产品经理，深耕 ERP/WMS 及经营数据报表领域，服务 50+ 企业客户。具备从 0 到 1 搭建数据产品与智能化功能（智能补货策略）的完整经验，近期系统学习 LLM 应用与 Prompt 设计，独立完成内部文档问答 Demo，正将数据驱动的产品方法论延伸至 AI 产品场景。",
      reason: `按「${styleNote}」方向重写，建立 B 端经验与 AI 转型的叙事连接`,
      riskWarning: "Demo 项目需确保可演示，避免过度包装为「正式产品经验」",
    },
    {
      id: "opt-2",
      section: "工作经历 - WMS",
      before: "负责 WMS 仓储管理系统核心模块，服务 50+ 企业客户",
      after:
        "负责 WMS 仓储管理系统核心模块（入库/出库/盘点/补货）产品规划与迭代，覆盖 50+ 企业客户的 SaaS 标准化交付",
      reason: "补充模块范围与 SaaS 交付属性，增强 ToB 画像",
      riskWarning: "模块列表需与实际负责范围一致",
    },
    {
      id: "opt-3",
      section: "工作经历 - 盘点",
      before: "主导库存盘点功能重构，盘点效率提升 40%",
      after:
        "主导库存盘点流程重构（移动端扫码 + 差异自动核对），单次盘点耗时从 4h 降至 2.4h，效率提升 40%",
      reason: "增加方法论与具体数据，提升可信度",
      riskWarning: "时间数据需可溯源，面试可能被追问",
    },
    {
      id: "opt-4",
      section: "项目经历 - 智能补货",
      before: "基于历史销售数据设计补货策略模型，推动补货建议功能上线，缺货率下降 25%",
      after:
        "设计基于历史销售与季节性波动的智能补货策略（规则引擎 + 安全库存模型），经 3 个月 A/B 验证后全量上线，缺货率从 12% 降至 9%",
      reason: "将「智能补货」与 AI/智能化叙事对齐，补充验证过程",
      riskWarning: "规则引擎不等于 LLM，面试时需诚实说明技术方案",
    },
    {
      id: "opt-5",
      section: "新增 - AI 实践项目",
      before: "（简历中未体现）",
      after:
        "独立开发内部文档问答 Demo（LangChain + 向量检索 + GPT），支持产品文档语义搜索与问答，准确率达 85%，验证 RAG 方案在知识库场景的可行性",
      reason: "将补充信息中的 Demo 经验结构化写入，补齐 AI 经历缺口",
      riskWarning: "明确标注为 Demo/个人项目，避免误导为商业落地",
    },
    {
      id: "opt-6",
      section: "技能工具",
      before: "Axure、Figma、SQL、Jira、Confluence、数据分析",
      after:
        "产品：Axure、Figma、Jira | 数据：SQL、BI 报表 | AI：Prompt Engineering、LangChain（RAG Demo）、LLM 应用基础",
      reason: "分类展示并加入 AI 技能，对齐 JD 关键词",
      riskWarning: "AI 技能标注「基础/Demo 级」，避免夸大",
    },
  ];
}

function buildFinalResume(input: UserInput): AnalysisResult["finalResume"] {
  return {
    personalInfo: {
      name: "张明",
      email: "zhangming@email.com",
      phone: "138****5678",
      location: "上海",
    },
    jobIntent: `${input.targetRole} | ${input.industry}`,
    summary:
      "3.5年 ToB SaaS 产品经理，深耕 ERP/WMS 及经营数据报表领域，服务 50+ 企业客户。具备从 0 到 1 搭建数据产品与智能化功能（智能补货策略）的完整经验，近期系统学习 LLM 应用与 Prompt 设计，独立完成内部文档问答 Demo，正将数据驱动的产品方法论延伸至 AI 产品场景。",
    coreSkills: [
      "AI 产品规划与场景落地",
      "ToB 需求分析与业务流程抽象",
      "数据驱动决策与效果评估",
      "跨团队（研发/算法/实施）协作交付",
      "ERP/WMS/SaaS 产品全周期管理",
    ],
    workExperience: [
      {
        company: "某 SaaS 公司",
        role: "产品经理",
        period: "2021.06 - 至今",
        bullets: [
          "负责 WMS 仓储管理系统核心模块（入库/出库/盘点/补货）产品规划与迭代，覆盖 50+ 企业客户的 SaaS 标准化交付",
          "主导库存盘点流程重构（移动端扫码 + 差异自动核对），单次盘点耗时从 4h 降至 2.4h，效率提升 40%",
          "从 0 到 1 设计经营数据报表平台，支持 20+ 自定义模板，月活 200+，报表生成效率提升 60%",
          "协调研发、测试、实施团队，按时交付 3 个 Major 版本，零重大生产事故",
        ],
      },
      {
        company: "某软件公司",
        role: "产品助理",
        period: "2020.07 - 2021.05",
        bullets: [
          "参与 ERP 采购模块需求调研与原型设计，输出 15+ PRD 文档",
          "跟进开发进度与 UAT 测试，推动订单审批流程优化，审批周期缩短 30%",
          "建立客户反馈收集机制，月均处理 40+ 需求工单",
        ],
      },
    ],
    projectExperience: [
      {
        name: "内部文档问答 Demo",
        role: "独立开发者",
        period: "2024.10 - 2024.12",
        bullets: [
          "基于 LangChain + 向量检索 + GPT 构建 RAG 文档问答系统，支持产品文档语义搜索",
          "设计 Prompt 模板与检索策略，问答准确率达 85%",
          "验证 RAG 方案在企业知识库场景的可行性，为后续 AI 功能规划提供参考",
        ],
      },
      {
        name: "WMS 智能补货",
        role: "产品经理",
        period: "2023.01 - 2023.09",
        bullets: [
          "设计基于历史销售与季节性波动的智能补货策略（规则引擎 + 安全库存模型）",
          "经 3 个月 A/B 验证后全量上线，缺货率从 12% 降至 9%",
          "建立补货效果监控看板，支持策略参数动态调优",
        ],
      },
    ],
    skillsAndTools: [
      "Axure",
      "Figma",
      "SQL",
      "Jira",
      "Confluence",
      "Prompt Engineering",
      "LangChain",
      "LLM 应用基础",
    ],
    education: {
      school: "某大学",
      degree: "信息管理与信息系统 | 本科",
      period: "2016 - 2020",
    },
  };
}

function buildInterviewPrep(): AnalysisResult["interviewPrep"] {
  return {
    likelyQuestions: [
      {
        question: "你为什么想从传统 B 端 PM 转型做 AI 产品经理？",
        suggestedAnswer:
          "我的 WMS 智能补货和报表平台经历让我理解数据驱动的产品方法论。近期 LLM 能力成熟，我认为 AI 会重塑 ToB 产品交互，我的行业 know-how 加上 AI 能力可以创造更大价值。",
        evidenceNeeded: ["转型动机真实案例", "AI 学习路径与时间投入"],
      },
      {
        question: "你的文档问答 Demo 技术方案是什么？效果如何评估？",
        suggestedAnswer:
          "采用 RAG 架构：文档切片 → 向量检索 → Prompt 组装 → GPT 生成。准确率 85% 基于 50 条测试问答集的人工评估。",
        evidenceNeeded: ["Demo 可演示", "测试集样例", "失败 case 分析"],
      },
      {
        question: "智能补货的策略模型是 AI 吗？和 LLM 有什么关系？",
        suggestedAnswer:
          "当前是基于规则引擎和统计模型的智能化方案，不是 LLM。但它培养了我设计「输入→策略→输出→评估」闭环的方法论，可直接迁移到 AI 功能设计。",
        evidenceNeeded: ["策略逻辑细节", "A/B 测试数据", "与 AI 的方法论关联"],
      },
      {
        question: "如何评估一个 AI 功能是否值得做？",
        suggestedAnswer:
          "参考我的报表平台经验：先定义核心指标（准确率/采纳率/效率提升）→ MVP 验证 → 数据驱动迭代。AI 功能还需额外评估幻觉风险和人工 fallback 成本。",
        evidenceNeeded: ["指标框架", "MVP 案例", "ROI 思考"],
      },
      {
        question: "描述一个复杂需求从调研到上线的完整过程",
        suggestedAnswer: "以报表平台为例：客户访谈 → 竞品分析 → 拖拽配置器 MVP → 20 模板试点 → 全量推广",
        evidenceNeeded: ["PRD 片段", "里程碑时间线", "关键决策点"],
      },
      {
        question: "你和算法/研发团队如何协作？",
        suggestedAnswer:
          "在 WMS 项目中，我会先输出业务规则文档和数据字段定义，与研发对齐接口方案，再分 Sprint 交付。AI 协作会增加 Prompt 迭代和效果评估环节。",
        evidenceNeeded: ["协作文档样例", "分歧解决案例"],
      },
      {
        question: "你关注哪些 AI 产品？优缺点是什么？",
        suggestedAnswer:
          "关注 Notion AI、飞书智能助手、Coze。Notion AI 集成自然但能力边界模糊；飞书助手覆盖广但定制化不足。",
        evidenceNeeded: ["实际使用体验", "具体功能对比"],
      },
      {
        question: "盘点效率提升 40% 是怎么算的？",
        suggestedAnswer:
          "选取 10 家试点客户，对比重构前后单次全仓盘点平均耗时，从 4 小时降至 2.4 小时。",
        evidenceNeeded: ["试点客户数", "统计口径", "前后对比方法"],
      },
      {
        question: "你的劣势是什么？如何弥补？",
        suggestedAnswer:
          "正式 AI 产品落地经验不足。已通过 Demo 实践和系统学习弥补，并计划在下一份工作中从 AI 辅助功能切入。",
        evidenceNeeded: ["学习计划", "Demo 成果", "谦逊且积极的态度"],
      },
      {
        question: "你对我们公司和这个岗位了解多少？",
        suggestedAnswer: "提前研究公司 AI 产品布局、目标客户、与自身经验的契合点",
        evidenceNeeded: ["公司调研笔记", "产品体验记录", "针对性问题"],
      },
    ],
    evidenceToPrepare: [
      "文档问答 Demo 的可演示环境或录屏",
      "报表平台与智能补货的关键数据口径说明",
      "WMS 产品架构图或核心流程图",
      "Prompt 模板样例与迭代记录",
      "客户访谈或需求调研的方法论案例",
    ],
    possibleExaggerations: [
      "「智能补货策略模型」可能被理解为深度学习模型，需澄清为规则引擎",
      "「AI 产品经验」来自 Demo 而非商业落地，需主动说明",
      "「准确率 85%」的测试集规模和评估方法可能被追问",
      "「服务 50+ 企业客户」中个人贡献范围需明确",
    ],
    dataToSupplement: [
      "Demo 项目的测试集规模和评估方法论",
      "盘点效率提升的试点样本与统计口径",
      "报表平台月活 200+ 的定义（UV/PV/生成次数）",
      "Major 版本的具体功能清单与个人贡献",
    ],
    selfIntroduction:
      "您好，我是张明，有 3.5 年 ToB SaaS 产品经验，主导过 WMS 和经营数据报表平台。我在工作中设计了智能补货策略，近期系统学习 AI 并完成了文档问答 Demo。我希望将 B 端行业理解与 AI 产品能力结合，贵司的 AI 产品方向与我的经验高度契合，期待进一步交流。",
  };
}

export async function runMockResumeAnalysis(
  input: UserInput,
  optimizeStyle: OptimizeStyle = "ai-product"
): Promise<AnalysisResult> {
  await delay(1800);

  return {
    jdAnalysis: buildJDAnalysis(input),
    diagnosis: buildDiagnosis(),
    matchItems: buildMatchItems(),
    followUpQuestions: buildFollowUpQuestions(),
    optimizedItems: buildOptimizedItems(optimizeStyle),
    finalResume: buildFinalResume(input),
    interviewPrep: buildInterviewPrep(),
  };
}

export async function runMockRegenerateOptimizedItems(
  style: OptimizeStyle
): Promise<AnalysisResult["optimizedItems"]> {
  await delay(800);
  return buildOptimizedItems(style);
}

export async function runMockFollowUpBullet(
  purpose: string,
  userAnswer: string
): Promise<string> {
  await delay(400);
  return `基于${purpose.replace(/[？?]/g, "")}，${userAnswer.trim().replace(/[。.!！]$/, "")}，体现 AI 产品落地能力与业务理解深度。`;
}

export async function runMockReoptimizeWithBullets(
  input: UserInput,
  style: OptimizeStyle,
  bullets: { purpose: string; bullet: string }[]
): Promise<Pick<AnalysisResult, "optimizedItems" | "finalResume">> {
  await delay(1200);
  const optimizedItems = buildOptimizedItems(style);

  // Append bullet-derived entries to optimizedItems
  bullets.forEach((b, i) => {
    optimizedItems.push({
      id: `opt-bullet-${i + 1}`,
      section: "追问补充",
      before: "（原简历无相关描述）",
      after: b.bullet,
      reason: `基于追问「${b.purpose}」补充的新经历`,
      riskWarning: "确保该描述可在面试中详细展开",
    });
  });

  const finalResume = buildFinalResume(input);
  // Inject bullets into the first work experience entry
  if (finalResume.workExperience.length > 0) {
    finalResume.workExperience[0].bullets.push(
      ...bullets.map((b) => b.bullet)
    );
  }

  return { optimizedItems, finalResume };
}

export async function runMockExtractTemplate(rawContent: string): Promise<string> {
  await delay(1500);
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{姓名}} - 识别提取简历模板</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: 13.5px; line-height: 1.6; color: #1e293b; margin: 0; padding: 24px 32px; background: #fff; }
    .header { border-bottom: 3px solid #6366f1; padding-bottom: 12px; margin-bottom: 20px; }
    .name { font-size: 26px; font-weight: 700; color: #312e81; }
    .contact { font-size: 12.5px; color: #4338ca; margin-top: 4px; }
    .section-title { font-size: 14px; font-weight: 700; color: #312e81; border-left: 4px solid #6366f1; padding-left: 8px; margin-top: 20px; margin-bottom: 10px; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">{{姓名}}</div>
    <div class="contact">{{邮箱}} · {{电话}} · {{城市}} · 求职意向：{{求职意向}}</div>
  </div>

  <div class="section-title">职业摘要</div>
  <p>{{职业摘要}}</p>

  <div class="section-title">核心能力</div>
  <div>{{核心能力}}</div>

  <div class="section-title">工作经历</div>
  <div>{{工作经历}}</div>

  <div class="section-title">项目经历</div>
  <div>{{项目经历}}</div>

  <div class="section-title">技能工具</div>
  <p>{{技能工具}}</p>

  <div class="section-title">教育背景</div>
  <p>{{教育背景}}</p>
</body>
</html>`;
}

export { STYLE_LABELS };
