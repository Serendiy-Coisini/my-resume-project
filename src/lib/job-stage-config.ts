export interface JobStageOption {
  value: string;
  label: string;
  experience: string;
  targetAudience: string;
  aiFocus: string;
  badgeColor?: string;
}

export const JOB_STAGE_OPTIONS: JobStageOption[] = [
  {
    value: "在校实习 (日常实习/暑期实习 · 在校生)",
    label: "在校实习",
    experience: "在校生 / 0年经验",
    targetAudience: "日常实习 · 暑期实习 · 留用实习",
    aiFocus: "挖掘学习能力、校园项目/课题研究、Demo实践与快速上手潜能，避免过分苛求多年工作落地",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    value: "应届校招 (应届生/秋招/春招 · 0-1年经验)",
    label: "应届校招",
    experience: "0-1年经验 / 应届毕业生",
    targetAudience: "秋招 · 春招 · 毕业首份正职",
    aiFocus: "突出专业基础、实习实战产出、自驱成长性与项目闭环，强化基础通用素质",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    value: "社招-初级 (1-3年工作经验 · 基础骨干)",
    label: "社招-初级",
    experience: "1-3年工作经验",
    targetAudience: "初入职场 · 基础独立交付",
    aiFocus: "强调具体模块的独立落地执行力、业务熟练度、协作交付与成长速度",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    value: "社招-中级 (3-5年工作经验 · 核心骨干)",
    label: "社招-中级",
    experience: "3-5年工作经验",
    targetAudience: "核心骨干 · 独挡一面",
    aiFocus: "强调复杂项目主导、业务难点突破、系统化思考与核心数据指标提振",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    value: "社招-高级/专家 (5-10年+经验 · 团队Lead/专家)",
    label: "社招-高级/专家",
    experience: "5-10年+工作经验",
    targetAudience: "资深专家 · 团队 Leader · 架构师/总监",
    aiFocus: "强调战略规划、团队带人/带项目、跨部门资源攻坚与大局商业影响力",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    value: "跨界/转型 (零相关经验/转行突破)",
    label: "跨界/转型",
    experience: "跨领域 / 跨岗位转型",
    targetAudience: "转行求职 · 跨方向切入",
    aiFocus: "重构可迁移能力（如逻辑思维、项目管理、数据分析），突出过往优势转化与跨界适应力",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
  },
];

/** Normalize legacy jobStage string into modern format */
export function normalizeJobStage(stageStr: string): string {
  if (!stageStr) return JOB_STAGE_OPTIONS[3].value;

  const matched = JOB_STAGE_OPTIONS.find((opt) => opt.value === stageStr);
  if (matched) return matched.value;

  if (stageStr === "实习" || stageStr === "在校实习") return "在校实习 (日常实习/暑期实习 · 在校生)";
  if (stageStr === "校招" || stageStr === "应届校招") return "应届校招 (应届生/秋招/春招 · 0-1年经验)";
  if (stageStr === "社招-初级") return "社招-初级 (1-3年工作经验 · 基础骨干)";
  if (stageStr === "社招-中级") return "社招-中级 (3-5年工作经验 · 核心骨干)";
  if (stageStr === "社招-高级") return "社招-高级/专家 (5-10年+经验 · 团队Lead/专家)";
  if (stageStr === "转行" || stageStr === "跨界/转型") return "跨界/转型 (零相关经验/转行突破)";

  return stageStr;
}

export function getJobStageOption(stageStr: string): JobStageOption {
  const normalized = normalizeJobStage(stageStr);
  return (
    JOB_STAGE_OPTIONS.find((opt) => opt.value === normalized) || {
      value: normalized,
      label: normalized.split(" ")[0] || normalized,
      experience: "定制经验",
      targetAudience: "通用求职者",
      aiFocus: "根据求职者当前阶段与经验年限定制简历匹配调优",
      badgeColor: "bg-neutral-100 text-neutral-700 border-neutral-200",
    }
  );
}
