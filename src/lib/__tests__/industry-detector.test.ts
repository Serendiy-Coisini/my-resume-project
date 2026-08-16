import { detectIndustrySmart } from "../industry-detector";

interface TestCase {
  name: string;
  role: string;
  jd?: string;
  expectedIndustry: string;
}

const testCases: TestCase[] = [
  // 1. HR & Administration
  { name: "HRBP Role", role: "HRBP", expectedIndustry: "人力资源 / 综合行政" },
  { name: "招聘主管", role: "招聘主管", expectedIndustry: "人力资源 / 综合行政" },
  { name: "行政经理", role: "行政经理", expectedIndustry: "人力资源 / 综合行政" },

  // 2. Finance & Accounting
  { name: "财务经理", role: "高级财务经理", expectedIndustry: "财务 / 会计 / 审计" },
  { name: "总账会计", role: "总账会计", expectedIndustry: "财务 / 会计 / 审计" },
  { name: "CPA/审计", role: "风控审计经理", expectedIndustry: "财务 / 会计 / 审计" },

  // 3. AI & AIGC
  { name: "Prompt Engineer", role: "Prompt工程师", expectedIndustry: "人工智能 / AIGC" },
  { name: "LLM Algorithm", role: "大模型算法工程师", expectedIndustry: "人工智能 / AIGC" },
  { name: "AI PM", role: "AI产品经理", expectedIndustry: "人工智能 / AIGC" },

  // 4. Tech & Software
  { name: "Java Backend", role: "Java后端工程师", expectedIndustry: "软件 / 信息技术" },
  { name: "DevOps", role: "DevOps运维专家", expectedIndustry: "软件 / 信息技术" },
  { name: "Frontend Developer", role: "Web前端工程师", expectedIndustry: "软件 / 信息技术" },

  // 5. Hardware & Semiconductor & Auto
  { name: "Chip Design", role: "芯片数字前端工程师", expectedIndustry: "芯片 / 半导体" },
  { name: "Autonomous Driving", role: "自动驾驶算法工程师", expectedIndustry: "新能源 / 智能汽车" },
  { name: "Embedded Hardware", role: "嵌入式单片机工程师", expectedIndustry: "消费电子 / 智能硬件" },

  // 6. Traditional & Civil Engineering / Mechanical
  { name: "Civil Engineer", role: "土木工程师", expectedIndustry: "房地产 / 建筑设计" },
  { name: "Mechanical Engineer", role: "机械设计工程师", expectedIndustry: "高端装备 / 智能制造" },
  { name: "PLC Engineer", role: "PLC电气工程师", expectedIndustry: "工业自动化 / 机器人" },

  // 7. Commerce, Medical, Education & Legal
  { name: "Amazon Operator", role: "亚马逊跨境电商运营", expectedIndustry: "电商 / 跨境电商" },
  { name: "Medical Research", role: "临床试验CRA", expectedIndustry: "医疗健康 / 生物医药" },
  { name: "Teacher/Edu", role: "英语课程顾问", expectedIndustry: "在线教育 / 职业培训" },
  { name: "Legal Counsel", role: "法务合规经理", expectedIndustry: "专业服务 / 咨询 / 法律" },

  // 8. Context Disambiguation (Sales / Analyst + JD)
  {
    name: "Sales in Pharma JD",
    role: "销售经理",
    jd: "负责某大型药企的医院渠道拓展，推介处方药与临床创新药...",
    expectedIndustry: "医疗健康 / 生物医药",
  },
  {
    name: "Analyst in Brokerage JD",
    role: "数据分析师",
    jd: "负责券商研报数据挖掘、量化交易模型搭建与固收分析...",
    expectedIndustry: "银行 / 证券 / 基金",
  },
];

let passed = 0;
let failed = 0;

console.log("==========================================");
console.log("   Running Industry Detector Unit Tests   ");
console.log("==========================================");

for (const tc of testCases) {
  const result = detectIndustrySmart(tc.role, tc.jd);
  if (result === tc.expectedIndustry) {
    console.log(`[PASS] ${tc.name}: "${tc.role}" => "${result}"`);
    passed++;
  } else {
    console.error(`[FAIL] ${tc.name}: "${tc.role}" => Got "${result}", Expected "${tc.expectedIndustry}"`);
    failed++;
  }
}

console.log("------------------------------------------");
console.log(`Total: ${testCases.length} | Passed: ${passed} | Failed: ${failed}`);
console.log("==========================================");

if (failed > 0) {
  process.exit(1);
}
