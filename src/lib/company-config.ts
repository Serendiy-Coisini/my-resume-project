export interface CompanyTypeOption {
  value: string;
  label: string;
  scale: string;
  stage: string;
  aiFocus: string;
  badgeColor?: string;
}

export const COMPANY_TYPE_OPTIONS: CompanyTypeOption[] = [
  {
    value: "头部大厂 (10000人以上 · 已上市)",
    label: "头部大厂",
    scale: "10000人以上",
    stage: "已上市",
    aiFocus: "强调海量数据/大流量指标、标准化流程、方法论沉淀与跨部门复杂协同",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    value: "大型企业 (1000-9999人 · 已上市/成熟期)",
    label: "大型企业",
    scale: "1000-9999人",
    stage: "已上市 / 成熟期",
    aiFocus: "强调中台资源整合、业务规模化复制、跨团队敏捷落地与体系构建",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    value: "中型企业 (100-499人 · C/D轮/拟上市)",
    label: "中型企业",
    scale: "100-499人",
    stage: "C/D轮 · 拟上市",
    aiFocus: "兼顾业务高速扩张与规范化，强调独挡一面的业务突破力与快速产出",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    value: "成长型公司 (20-99人 · A/B轮)",
    label: "成长型公司",
    scale: "20-99人",
    stage: "A/B轮",
    aiFocus: "强调业务快速落地、灵活应变、一人多能与核心关键指标增长",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    value: "初创团队 (0-20人 · 未融资/天使轮)",
    label: "初创团队",
    scale: "0-20人",
    stage: "未融资 / 天使轮",
    aiFocus: "强调 0 到 1 搭建能力、极致执行力、高自驱力与全栈落地实战",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    value: "外企/跨国公司 (1000-9999人 · 外资/已上市)",
    label: "外企/跨国公司",
    scale: "1000-9999人",
    stage: "外资 · 已上市",
    aiFocus: "强调跨文化协同、规范化交付、合规与结构化沟通。✨ 选定外企后 AI 将自动同步生成全英文专业简历 (English Resume)！",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    value: "国企/事业单位 (10000人以上 · 国有体制)",
    label: "国企/事业单位",
    scale: "10000人以上",
    stage: "国有企事业单位",
    aiFocus: "强调合规风控、稳定交付、公文/文档规范与体制内流程响应",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
  },
];

export function isForeignCompany(typeStr: string): boolean {
  if (!typeStr) return false;
  return typeStr.includes("外企") || typeStr.includes("跨国") || typeStr.includes("外资");
}

/** Normalize legacy companyType string into modern BOSS-style format if matched */
export function normalizeCompanyType(typeStr: string): string {
  if (!typeStr) return COMPANY_TYPE_OPTIONS[2].value;

  const matched = COMPANY_TYPE_OPTIONS.find((opt) => opt.value === typeStr);
  if (matched) return matched.value;

  if (typeStr === "大厂") return "头部大厂 (10000人以上 · 已上市)";
  if (typeStr === "中型公司") return "中型企业 (100-499人 · C/D轮/拟上市)";
  if (typeStr === "创业公司") return "初创团队 (0-20人 · 未融资/天使轮)";
  if (typeStr === "外企") return "外企/跨国公司 (1000-9999人 · 外资/已上市)";
  if (typeStr === "国企") return "国企/事业单位 (10000人以上 · 国有体制)";

  return typeStr;
}

export function getCompanyTypeOption(typeStr: string): CompanyTypeOption {
  const normalized = normalizeCompanyType(typeStr);
  return (
    COMPANY_TYPE_OPTIONS.find((opt) => opt.value === normalized) || {
      value: normalized,
      label: normalized.split(" ")[0] || normalized,
      scale: "定制规模",
      stage: "定制阶段",
      aiFocus: "基于用户指定企业规模与类型微调简历匹配侧重",
      badgeColor: "bg-neutral-100 text-neutral-700 border-neutral-200",
    }
  );
}
