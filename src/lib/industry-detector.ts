export interface IndustryGroup {
  category: string;
  items: string[];
}

export const POPULAR_INDUSTRIES = [
  "互联网 / 软件工程",
  "人工智能 / AIGC",
  "互联网 / SaaS",
  "芯片 / 半导体",
  "新能源 / 智能汽车",
  "金融科技 / FinTech",
  "电商 / 跨境电商",
  "医疗健康 / 生物医药",
  "财务 / 会计 / 审计",
  "人力资源 / 综合行政",
];

export const ALL_INDUSTRY_GROUPS: IndustryGroup[] = [
  {
    category: "IT / 互联网 / 科技",
    items: [
      "人工智能 / AIGC",
      "互联网 / SaaS",
      "软件 / 信息技术",
      "游戏 / 动漫 / 娱乐",
      "网络安全",
      "区块链 / Web3",
    ],
  },
  {
    category: "电子 / 制造 / 汽车",
    items: [
      "芯片 / 半导体",
      "新能源 / 智能汽车",
      "工业自动化 / 机器人",
      "消费电子 / 智能硬件",
      "高端装备 / 智能制造",
      "航空航天 / 军工",
    ],
  },
  {
    category: "金融 / 商业 / 企服",
    items: [
      "金融科技 / FinTech",
      "银行 / 证券 / 基金",
      "投资 / 创投 / PE",
      "专业服务 / 咨询 / 法律",
      "财务 / 会计 / 审计",
    ],
  },
  {
    category: "消费 / 电商 / 传媒",
    items: [
      "电商 / 跨境电商",
      "新零售 / 快消品",
      "物流 / 供应链",
      "广告 / 传媒 / 公关",
    ],
  },
  {
    category: "医疗 / 能源 / 材料",
    items: [
      "医疗健康 / 生物医药",
      "医疗器械",
      "清洁能源 / 环保",
      "化工 / 新材料",
    ],
  },
  {
    category: "服务 / 教育 / 职能",
    items: [
      "在线教育 / 职业培训",
      "房地产 / 建筑设计",
      "文旅 / 餐饮 / 生活服务",
      "人力资源 / 综合行政",
    ],
  },
];

interface IndustryRule {
  industry: string;
  primaryRoleKeywords: string[];
  secondaryRoleKeywords: string[];
  contextKeywords: string[];
}

const INDUSTRY_RULES: IndustryRule[] = [
  // 1. 人力资源 / 综合行政
  {
    industry: "人力资源 / 综合行政",
    primaryRoleKeywords: [
      "hr", "hrbp", "hrd", "hrm", "招聘", "薪酬", "绩效", "培训主管", "组织发展", "od",
      "人力资源", "行政主管", "行政专员", "行政经理", "前台", "文秘", "助理", "企管", "综合部"
    ],
    secondaryRoleKeywords: ["考勤", "员工关系", "er", "社保", "求职顾问", "猎头"],
    contextKeywords: ["招聘", "入职", "离职", "绩效考核", "okr", "kpi", "薪酬体系", "组织架构", "行政支持", "办公用品"]
  },

  // 2. 财务 / 会计 / 审计
  {
    industry: "财务 / 会计 / 审计",
    primaryRoleKeywords: [
      "财务", "会计", "出纳", "审计", "税务", "核算", "cpa", "cfo", "财务总监",
      "财务经理", "财务主管", "总账会计", "成本会计", "风控审计", "内审"
    ],
    secondaryRoleKeywords: ["资金", "报税", "发票", "财报", "预算"],
    contextKeywords: ["财务报表", "资产负债表", "凭证", "税务筹划", "审计报告", "资金管理", "成本核算", "合并报表"]
  },

  // 3. 人工智能 / AIGC
  {
    industry: "人工智能 / AIGC",
    primaryRoleKeywords: [
      "aigc", "llm", "大模型", "nlp", "cv", "生成式ai", "深度学习", "机器学习",
      "算法工程师", "transformer", "prompt工程师", "大语言模型", "rag", "langchain",
      "模型微调", "ai产品经理", "智能体", "agent"
    ],
    secondaryRoleKeywords: ["pytorch", "tensorflow", "ai应用", "算法", "标注", "智能算法"],
    contextKeywords: ["prompt", "embedding", "向量数据库", "fine-tuning", "lora", "gpt", "deepseek", "claude", "sora", "midjourney"]
  },

  // 4. 互联网 / SaaS
  {
    industry: "互联网 / SaaS",
    primaryRoleKeywords: [
      "saas", "tob服务", "企业服务", "crm系统", "erp系统", "oa系统", "协同办公", "prm",
      "tob产品", "b端产品"
    ],
    secondaryRoleKeywords: ["云计算", "paas", "软件服务", "客户成功", "csm"],
    contextKeywords: ["多租户", "续费率", "mrr", "arr", "b端", "标准化交付", "企业级"]
  },

  // 5. 芯片 / 半导体
  {
    industry: "芯片 / 半导体",
    primaryRoleKeywords: [
      "半导体", "芯片", "ic设计", "晶圆", "eda", "fpga", "vlsi", "光刻", "封装测试",
      "数字前端", "模拟电路", "ic验证", "芯片设计", "流片"
    ],
    secondaryRoleKeywords: ["soc", "verilog", "vhdl", "asic", "集成电路"],
    contextKeywords: ["工艺节点", "硅片", "封测", "版图", "dft", "drc", "lvs"]
  },

  // 6. 新能源 / 智能汽车
  {
    industry: "新能源 / 智能汽车",
    primaryRoleKeywords: [
      "新能源汽车", "自动驾驶", "自动驾驶算法", "智驾", "动力电池", "储能", "三电系统", "智能座舱",
      "车联网", "adas", "整车", "汽车工程师", "底盘"
    ],
    secondaryRoleKeywords: ["特斯拉", "比亚迪", "蔚来", "小鹏", "理想", "汽车", "电池", "bms", "mcu"],
    contextKeywords: ["续航", "充电桩", "激光雷达", "can总线", "autosar", "车规级"]
  },

  // 7. 金融科技 / FinTech
  {
    industry: "金融科技 / FinTech",
    primaryRoleKeywords: [
      "金融科技", "fintech", "风控算法", "量化交易", "信贷风控", "支付结算",
      "保险科技", "核心交易系统", "量化研究员", "反欺诈"
    ],
    secondaryRoleKeywords: ["支付", "风控", "高频交易", "征信"],
    contextKeywords: ["风控模型", "scorecard", "授信", "清算", "网关", "防刷"]
  },

  // 8. 银行 / 证券 / 基金
  {
    industry: "银行 / 证券 / 基金",
    primaryRoleKeywords: [
      "银行", "证券", "基金", "券商", "财富管理", "信托", "柜员", "客户经理",
      "行长", "分析师", "行研", "证券分析师", "基金经理", "投资顾问"
    ],
    secondaryRoleKeywords: ["理财", "股票", "债券", "开户", "网点"],
    contextKeywords: ["研报", "资产配置", "权益类", "固收", "ipo", "合规检查"]
  },

  // 9. 投资 / 创投 / PE
  {
    industry: "投资 / 创投 / PE",
    primaryRoleKeywords: [
      "vc", "pe", "创投", "风险投资", "投资经理", "投资总监", "投资分析师",
      "尽职调查", "并购", "m&a"
    ],
    secondaryRoleKeywords: ["估值", "融资", "bp", "路演", "出资人", "lp", "gp"],
    contextKeywords: ["term sheet", "投后管理", "退场机制", "一二级市场", "项目源"]
  },

  // 10. 专业服务 / 咨询 / 法律
  {
    industry: "专业服务 / 咨询 / 法律",
    primaryRoleKeywords: [
      "管理咨询", "战略咨询", "法务", "律师", "合规", "咨询顾问", "顾问",
      "法务专员", "法务经理", "知识产权", "专利代理"
    ],
    secondaryRoleKeywords: ["麦肯锡", "波士顿", "四大", "律所", "诉讼", "合同"],
    contextKeywords: ["合同审查", "合规风控", "行业研究", "商业报告", "诉讼仲裁", "尽调"]
  },

  // 11. 电商 / 跨境电商
  {
    industry: "电商 / 跨境电商",
    primaryRoleKeywords: [
      "跨境电商", "亚马逊", "amazon", "shopee", "lazada", "ebay", "独立站", "淘宝",
      "京东", "拼多多", "直播带货", "店长", "店铺运营", "类目经理", "选品"
    ],
    secondaryRoleKeywords: ["电商", "gmv", "转化率", "直通车", "roi", "客单价"],
    contextKeywords: ["Listing", "FBA", "站外推广", "客服", "退换货", "店铺权"]
  },

  // 12. 游戏 / 动漫 / 娱乐
  {
    industry: "游戏 / 动漫 / 娱乐",
    primaryRoleKeywords: [
      "游戏策划", "手游", "端游", "unity", "unity3d", "unreal", "ue4", "ue5",
      "游戏原画", "游戏关卡", "游戏特效", "游戏引擎", "游戏运营", "主播", "二次元"
    ],
    secondaryRoleKeywords: ["游戏", "电竞", "3d建模", "渲染", "角色设计", "场景", "动画"],
    contextKeywords: ["数值策划", "数值平衡", "留存率", "arpu", "氪金", "关卡设计", "引擎"]
  },

  // 13. 消费电子 / 智能硬件
  {
    industry: "消费电子 / 智能硬件",
    primaryRoleKeywords: [
      "智能硬件", "消费电子", "可穿戴设备", "手环", "智能音箱", "智能家居", "硬件工程师",
      "结构工程师", "pcb", "单片机", "嵌入式"
    ],
    secondaryRoleKeywords: ["硬件", "电路", "模具", "数码"],
    contextKeywords: ["原理图", "BOM", "试产", "NPI", "固件", "开模"]
  },

  // 14. 软件 / 信息技术
  {
    industry: "软件 / 信息技术",
    primaryRoleKeywords: [
      "java", "后端", "服务端", "全栈", "软件工程师", "软件开发", "python", "golang",
      "go语言", "c++", "c#", ".net", "架构师", "测试工程师", "qa", "运维", "devops",
      "微服务", "前端", "web前端", "系统工程师", "技术专家", "系统架构",
      "程序员", "程序员", "代码", "基础架构", "中间件", "性能优化", "研发经理", "cto"
    ],
    secondaryRoleKeywords: ["软件", "代码", "开发", "技术", "重构"],
    contextKeywords: ["代码库", "高并发", "分布式", "mysql", "redis", "linux", "git", "ci/cd"]
  },

  // 15. 网络安全
  {
    industry: "网络安全",
    primaryRoleKeywords: [
      "网络安全", "信息安全", "渗透测试", "攻防演练", "secops", "防火墙",
      "零信任架构", "漏洞挖掘", "安全专家", "ciso"
    ],
    secondaryRoleKeywords: ["安全", "漏洞", "合规", "数据安全", "soc", "木马", "病毒"],
    contextKeywords: ["等保", "CVE", "SOC", "WAF", "基线检查", "应急响应"]
  },

  // 16. 工业自动化 / 机器人
  {
    industry: "工业自动化 / 机器人",
    primaryRoleKeywords: [
      "plc", "机器人", "工业自动化", "工控", "伺服", "变频器", "scada", "自动化设备",
      "电气工程师", "机器视觉", "运动控制"
    ],
    secondaryRoleKeywords: ["自动化", "控制", "机械臂", "传感器"],
    contextKeywords: ["梯形图", "调试", "生产线", "工位", "上位机"]
  },

  // 17. 高端装备 / 智能制造
  {
    industry: "高端装备 / 智能制造",
    primaryRoleKeywords: [
      "机械工程师", "数控", "cnc", "制造工程师", "生产经理", "车间主任", "精益生产",
      "品质工程师", "qc", "qa经理", "工艺工程师", "ie工程师", "模具工程师"
    ],
    secondaryRoleKeywords: ["机械", "制造", "加工", "装配", "质量"],
    contextKeywords: ["5S", "ISO9001", "良品率", "良率", "SOP", "看板", "生产调度"]
  },

  // 18. 医疗健康 / 生物医药
  {
    industry: "医疗健康 / 生物医药",
    primaryRoleKeywords: [
      "生物医药", "临床试验", "创新药", "基因测序", "靶点", "cra", "crc", "医药代表",
      "智慧医疗", "医疗软件", "医生", "护士", "药师", "药企", "医学经理"
    ],
    secondaryRoleKeywords: ["医疗", "医院", "药店", "健康管理", "护理", "临床"],
    contextKeywords: ["GCP", "GMP", "FDA", "NMPA", "双盲", "学术推广", "处方药"]
  },

  // 19. 医疗器械
  {
    industry: "医疗器械",
    primaryRoleKeywords: [
      "医疗器械", "体外诊断", "ivd", "超声设备", "监护仪", "监护设备", "影像设备", "ct", "核磁", "器械研发"
    ],
    secondaryRoleKeywords: ["器械", "耗材", "无菌"],
    contextKeywords: ["注册证", "体系认证", "CE认证", "YY0505", "无菌包装"]
  },

  // 20. 新零售 / 快消品
  {
    industry: "新零售 / 快消品",
    primaryRoleKeywords: [
      "快消", "fmcg", "新零售", "食品", "饮料", "美妆", "日化", "渠道经理", "督导",
      "KA经理", "导购", "导购主管", "品牌经理"
    ],
    secondaryRoleKeywords: ["零售", "门店", "陈列", "促销", "线下"],
    contextKeywords: ["铺货", "动销", "经销商", "进销存", "新品上市"]
  },

  // 21. 物流 / 供应链
  {
    industry: "物流 / 供应链",
    primaryRoleKeywords: [
      "物流", "供应链", "仓储", "wms", "采购专员", "采购经理", "货代", "报关",
      "关务", "关务主管", "调拨", "配送"
    ],
    secondaryRoleKeywords: ["运输", "快递", "海运", "空运", "仓库"],
    contextKeywords: ["供应商管理", "周转率", "安全库存", "询价", "比价", "物流跟踪"]
  },

  // 22. 广告 / 传媒 / 公关
  {
    industry: "广告 / 传媒 / 公关",
    primaryRoleKeywords: [
      "广告策划", "新媒体运营", "短视频运营", "公关", "pr", "文案", "文案策划",
      "品牌推广", "信息流", "媒介专员", "平面设计", "视觉设计", "ui设计"
    ],
    secondaryRoleKeywords: ["设计", "文案", "剪辑", "公众号", "抖音", "小红书", "b站"],
    contextKeywords: ["爆款", "阅读量", "曝光量", "脚本", "信息流广告", "视觉设计"]
  },

  // 23. 在线教育 / 职业培训
  {
    industry: "在线教育 / 职业培训",
    primaryRoleKeywords: [
      "教研", "教师", "老师", "课程顾问", "班主任", "助教", "edtech", "k12",
      "职业教育", "教学主管", "培训讲师"
    ],
    secondaryRoleKeywords: ["教育", "授课", "试听", "招生", "续报"],
    contextKeywords: ["课件", "大纲", "消课", "续费", "转介绍", "转化率"]
  },

  // 24. 房地产 / 建筑设计
  {
    industry: "房地产 / 建筑设计",
    primaryRoleKeywords: [
      "土木工程", "土木工程师", "施工员", "项目经理(施工)", "建筑师", "结构师",
      "造价师", "预算员", "室内设计", "物业经理", "地产销售", "置业顾问"
    ],
    secondaryRoleKeywords: ["房地产", "建筑", "施工", "工地", "楼盘", "装修"],
    contextKeywords: ["图纸", "BIM", "CAD", "验收", "工程量", "招投标", "预决算"]
  },

  // 25. 文旅 / 餐饮 / 生活服务
  {
    industry: "文旅 / 餐饮 / 生活服务",
    primaryRoleKeywords: [
      "酒店经理", "导游", "餐饮店长", "厨师", "店长(餐饮)", "旅游顾问", "美容师", "健身教练"
    ],
    secondaryRoleKeywords: ["文旅", "餐饮", "酒店", "旅游", "生活服务", "门店经理"],
    contextKeywords: ["翻台率", "入住率", "客流量", "满意度", "服务标准"]
  },

  // 26. 区块链 / Web3
  {
    industry: "区块链 / Web3",
    primaryRoleKeywords: [
      "web3", "区块链", "智能合约", "solidity", "defi", "nft", "dao", "链上"
    ],
    secondaryRoleKeywords: ["以太坊", "比特币", "去中心化", "代币"],
    contextKeywords: ["gas费", "主网", "跨链", "质押", "DApp"]
  },

  // 27. 清洁能源 / 环保
  {
    industry: "清洁能源 / 环保",
    primaryRoleKeywords: [
      "光伏", "风电", "储能工程", "环保工程师", "固废", "水处理", "碳中和", "碳减排"
    ],
    secondaryRoleKeywords: ["能源", "环保", "绿电", "减排"],
    contextKeywords: ["组件", "逆变器", "COD", "排放", "ESG"]
  },

  // 28. 化工 / 新材料
  {
    industry: "化工 / 新材料",
    primaryRoleKeywords: [
      "化工工程师", "高分子", "复合材料", "涂料", "精细化工", "冶金", "材料研发"
    ],
    secondaryRoleKeywords: ["化工", "材料", "化学", "炼化"],
    contextKeywords: ["反应釜", "配方", "合成", "拉伸强度"]
  },

  // 29. 航空航天 / 军工
  {
    industry: "航空航天 / 军工",
    primaryRoleKeywords: [
      "航天", "航空", "卫星", "军工", "雷达", "航电", "飞行器"
    ],
    secondaryRoleKeywords: ["国防", "兵器", "导弹"],
    contextKeywords: ["军标", "可靠性", "载荷", "测控"]
  }
];

function matchKeyword(text: string, keyword: string): boolean {
  if (!text || !keyword) return false;
  const lowerKw = keyword.toLowerCase();
  
  if (/^[a-z0-9+#]{1,5}$/i.test(keyword)) {
    const escaped = lowerKw.replace(/[+#]/g, "\\$&");
    const regex = new RegExp(`(?:^|[^a-z0-9+#])${escaped}(?:$|[^a-z0-9+#])`, "i");
    return regex.test(text);
  }

  return text.includes(lowerKw);
}

/**
 * Intelligent Industry Detection Algorithm
 * @param targetRole Target position title (e.g., "HRBP", "高级财务经理", "Prompt工程师", "土木工程师")
 * @param jobDescription Target job description text
 * @returns Best matching industry label
 */
export function detectIndustrySmart(targetRole: string = "", jobDescription: string = ""): string {
  const roleText = (targetRole || "").trim().toLowerCase();
  const jdText = (jobDescription || "").trim().toLowerCase();

  if (!roleText && !jdText) {
    return "软件 / 信息技术";
  }

  let bestIndustry = "";
  let maxScore = 0;

  for (const rule of INDUSTRY_RULES) {
    let score = 0;

    // 1. Role Primary Match (+100 per hit + keyword length specificity bonus)
    for (const kw of rule.primaryRoleKeywords) {
      if (matchKeyword(roleText, kw)) {
        score += 100 + kw.length * 5;
      }
    }

    // 2. Role Secondary Match (+35 per hit)
    for (const kw of rule.secondaryRoleKeywords) {
      if (matchKeyword(roleText, kw)) {
        score += 35 + kw.length * 2;
      }
    }

    // 3. Context/JD Primary Match (+15 per hit)
    for (const kw of rule.primaryRoleKeywords) {
      if (matchKeyword(jdText, kw)) {
        score += 15;
      }
    }

    // 4. Context/JD Secondary & Domain Match (+8 per hit)
    for (const kw of rule.contextKeywords) {
      if (matchKeyword(jdText, kw)) {
        score += 8;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestIndustry = rule.industry;
    }
  }

  if (maxScore > 0 && bestIndustry) {
    return bestIndustry;
  }

  if (roleText.includes("软件") || roleText.includes("开发") || roleText.includes("程序员") || roleText.includes("代码")) {
    return "软件 / 信息技术";
  }
  if (roleText.includes("经理") || roleText.includes("总监") || roleText.includes("主管")) {
    return "人力资源 / 综合行政";
  }

  return "软件 / 信息技术";
}
