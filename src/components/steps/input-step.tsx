"use client";

import { useRef, useState } from "react";
import {
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileUp,
  Loader2,
  ShieldCheck,
  Sparkles,
  User,
  Wand2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SectionTitle } from "@/components/shared/ui-helpers";
import { runResumeAnalysisStream } from "@/services/ai/resumeAgent";
import { useResumeStore } from "@/store/resume-store";
import type { CompanyType, JobStage } from "@/types/resume";
import { COMPANY_TYPE_OPTIONS, getCompanyTypeOption } from "@/lib/company-config";
import { JOB_STAGE_OPTIONS, getJobStageOption } from "@/lib/job-stage-config";

const STAGE_STEPS = [
  { id: "jd-analysis", name: "JD 拆解", label: "正在拆解岗位 JD 核心要求", startPct: 15, endPct: 35 },
  { id: "diagnosis", name: "匹配诊断", label: "正在深度诊断与计算匹配打分", startPct: 40, endPct: 65 },
  { id: "optimize", name: "简历改写", label: "正在定制优化简历 Bullet Points", startPct: 70, endPct: 82 },
  { id: "interview", name: "面试预测", label: "正在预测高频面试考点与回答", startPct: 85, endPct: 95 },
];

function detectIndustrySmart(targetRole: string = "", jobDescription: string = ""): string {
  const roleText = (targetRole || "").trim().toLowerCase();
  const jdText = (jobDescription || "").trim().toLowerCase();


  if (!roleText && !jdText) {
    return "互联网 / 软件工程";
  }

  const rules: { industry: string; primary: string[]; secondary: string[] }[] = [
    {
      industry: "互联网 / 软件工程",
      primary: [
        "java", "后端", "服务端", "全栈", "软件工程师", "软件开发",
        "python", "golang", "go语言", "c++", "c#", ".net", "架构师",
        "测试工程师", "qa", "运维", "devops", "数据库", "微服务",
        "前端", "web前端", "系统工程师", "技术专家", "系统架构"
      ],
      secondary: ["软件", "程序员", "代码", "基础架构", "中间件", "性能优化", "研发"],
    },
    {
      industry: "人工智能 / AIGC",
      primary: [
        "aigc", "llm", "大模型", "nlp", "cv", "生成式ai", "深度学习",
        "算法工程师", "机器学习", "transformer", "prompt工程师", "大语言模型",
        "rag", "langchain", "模型微调"
      ],
      secondary: ["ai产品", "ai应用", "智能体", "agent", "pytorch", "tensorflow", "aigc应用"],
    },
    {
      industry: "互联网 / SaaS",
      primary: ["saas", "tob服务", "企业服务", "crm系统", "erp系统", "oa系统", "协同办公", "prm"],
      secondary: ["云计算", "paas", "软件服务", "b端产品"],
    },
    {
      industry: "芯片 / 半导体",
      primary: ["半导体", "芯片", "ic设计", "晶圆", "eda", "fpga", "vlsi", "光刻", "封装测试", "数字前端", "模拟电路"],
      secondary: ["soc", "verilog", "asic", "集成电路"],
    },
    {
      industry: "新能源 / 智能汽车",
      primary: ["新能源汽车", "自动驾驶", "智驾", "动力电池", "储能", "三电系统", "智能座舱", "车联网", "adas"],
      secondary: ["整车", "特斯拉", "比亚迪", "蔚来", "小鹏", "理想", "汽车", "底盘"],
    },
    {
      industry: "金融科技 / FinTech",
      primary: ["金融科技", "fintech", "风控算法", "量化交易", "证券", "基金", "信贷风控", "支付结算", "保险科技", "核心交易系统"],
      secondary: ["银行", "金融", "财富管理", "资产管理", "券商"],
    },
    {
      industry: "医疗健康 / 生物医药",
      primary: ["生物医药", "医疗器械", "临床试验", "创新药", "基因测序", "靶点", "体外诊断", "ivd", "智慧医疗", "医疗软件"],
      secondary: ["医疗", "医院", "药企", "健康管理", "护理"],
    },
    {
      industry: "电商 / 跨境电商",
      primary: ["跨境电商", "亚马逊", "amazon", "shopee", "lazada", "ebay", "独立站", "淘宝", "京东", "拼多多", "直播带货", "gmv"],
      secondary: ["电商", "选品", "类目经理", "供应链管理", "转化率", "店铺运营"],
    },
    {
      industry: "游戏 / 动漫 / 娱乐",
      primary: ["游戏策划", "手游", "端游", "unity3d", "unreal", "ue4", "ue5", "游戏原画", "游戏关卡", "游戏特效", "游戏引擎"],
      secondary: ["游戏", "电竞", "二次元", "3d建模", "渲染"],
    },
    {
      industry: "通信 / 物联网 / 硬件",
      primary: ["通信", "5g", "物联", "iot", "嵌入式", "单片机", "硬件工程师", "驱动开发", "rtos", "传感器", "芯片开发"],
      secondary: ["硬件", "电子", "电路板", "pcb"],
    },
    {
      industry: "网络安全",
      primary: ["网络安全", "信息安全", "渗透测试", "攻防演练", "secops", "防火墙", "零信任架构", "漏洞挖掘"],
      secondary: ["安全", "漏洞", "合规", "数据安全", "soc"],
    },
  ];

  const matchKeyword = (str: string, keyword: string): boolean => {
    if (/^[a-z0-9+#]{1,6}$/i.test(keyword)) {
      const escaped = keyword.replace(/[+#]/g, "\\$&");
      const regex = new RegExp(`(?:^|[^a-z0-9+#])${escaped}(?:$|[^a-z0-9+#])`, "i");
      return regex.test(str);
    }
    return str.includes(keyword.toLowerCase());
  };

  let bestIndustry = "互联网 / 软件工程";
  let maxScore = 0;

  for (const rule of rules) {
    let score = 0;

    for (const kw of rule.primary) {
      if (matchKeyword(roleText, kw)) {
        score += 100;
      }
      if (matchKeyword(jdText, kw)) {
        score += 10;
      }
    }

    for (const kw of rule.secondary) {
      if (matchKeyword(roleText, kw)) {
        score += 30;
      }
      if (matchKeyword(jdText, kw)) {
        score += 3;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestIndustry = rule.industry;
    }
  }

  return bestIndustry;
}

export function InputStep() {
  const {
    userInput,
    setUserInput,
    loadExampleData,
    setAnalysisResult,
    setAnalyzing,
    setAnalysisError,
    isAnalyzing,
    analysisError,
    setCurrentStep,
    enablePIIMasking,
    setEnablePIIMasking,
    analysisStage,
    setAnalysisStage,
    updatePartialAnalysisResult,
  } = useResumeStore();

  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const dragCounter = useRef(0);

  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showAllIndustries, setShowAllIndustries] = useState(false);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setUserInput({ avatarUrl: base64 });
      }
    };
    reader.readAsDataURL(file);
  };

  const processResumeFile = async (file: File) => {
    const fileName = file.name.toLowerCase();
    const isPdf = file.type === "application/pdf" || fileName.endsWith(".pdf");
    const isWord = fileName.endsWith(".docx") || fileName.endsWith(".doc");
    const isTxt = fileName.endsWith(".txt");

    if (!isPdf && !isWord && !isTxt) {
      setPdfError("仅支持上传 PDF (.pdf)、Word (.docx / .doc) 或文本 (.txt) 格式文件");
      return;
    }

    setUploadingPdf(true);
    setPdfError(null);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setUserInput({
          rawFileName: file.name,
          rawFileType: isPdf ? "pdf" : isWord ? "word" : "txt",
          rawFileDataUrl: dataUrl,
        });
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "解析文件失败");
      }

      setUserInput({ originalResume: data.text });
    } catch (err) {
      setPdfError(err instanceof Error ? err.message : "解析文件失败，请直接粘贴文本");
    } finally {
      setUploadingPdf(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processResumeFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processResumeFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!userInput.targetRole || !userInput.jobDescription || !userInput.originalResume) {
      return;
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setAnalyzing(true);
    setAnalysisError(null);

    const completedStagesList: string[] = [];

    setAnalysisStage({
      stageId: "jd-analysis",
      label: "正在发起 AI 大模型分析...",
      currentStepNumber: 1,
      totalSteps: 4,
      progressPercent: 8,
      completedStages: [],
    });

    try {
      const result = await runResumeAnalysisStream(
        userInput,
        "ai-product",
        {
          enablePIIMasking,
          onStageChange: (stageId, status) => {
            const stepIdx = STAGE_STEPS.findIndex((s) => s.id === stageId);
            const stepInfo = STAGE_STEPS[stepIdx];

            if (status === "start") {
              setAnalysisStage({
                stageId,
                label: stepInfo ? `${stepInfo.label}...` : "正在分析中...",
                currentStepNumber: stepIdx >= 0 ? stepIdx + 1 : 1,
                totalSteps: 4,
                progressPercent: stepInfo ? stepInfo.startPct : 50,
                completedStages: [...completedStagesList],
              });
            } else if (status === "complete") {
              if (!completedStagesList.includes(stageId)) {
                completedStagesList.push(stageId);
              }
              setAnalysisStage({
                stageId,
                label: stepInfo ? `${stepInfo.name} 完成` : "阶段完成",
                currentStepNumber: stepIdx >= 0 ? stepIdx + 1 : 1,
                totalSteps: 4,
                progressPercent: stepInfo ? stepInfo.endPct : 70,
                completedStages: [...completedStagesList],
              });
            }
          },
          onPartialResult: (partial) => {
            updatePartialAnalysisResult(partial);
          },
        },
        controller.signal
      );

      setAnalysisResult(result);
      setAnalysisStage({
        stageId: "complete",
        label: "🎉 分析完成！正在为您生成分析报告...",
        currentStepNumber: 4,
        totalSteps: 4,
        progressPercent: 100,
        completedStages: STAGE_STEPS.map((s) => s.id),
      });

      await new Promise((resolve) => setTimeout(resolve, 600));
      setCurrentStep("jd-analysis");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setAnalysisError(error instanceof Error ? error.message : "分析失败，请稍后重试");
    } finally {
      abortControllerRef.current = null;
      setAnalyzing(false);
      setAnalysisStage(null);
    }
  };

  const handleCancel = () => {
    abortControllerRef.current?.abort();
  };

  const canAnalyze =
    Boolean(userInput?.targetRole?.trim()) &&
    Boolean(userInput?.jobDescription?.trim()) &&
    Boolean(userInput?.originalResume?.trim());


  return (
    <div>
      <SectionTitle
        title="输入材料"
        description="填写目标岗位信息与原始简历，Agent 将基于 JD 进行定制分析与优化"
      />

      {/* PII Privacy Protection Switch Banner */}
      <div className="mb-4 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-emerald-900 shadow-sm">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
          <div>
            <span className="font-semibold text-emerald-950">AI 敏感隐私脱敏保护</span>
            <span className="ml-2 text-emerald-700">
              开启后，手机号、电子邮箱、姓名等个人隐私将在发送给 AI 前自动加密脱敏，分析完成后自动原位解密还原。
            </span>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer ml-3 shrink-0">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enablePIIMasking}
            onChange={(e) => setEnablePIIMasking(e.target.checked)}
          />
          <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
        </label>
      </div>

      {analysisError && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {analysisError}
        </div>
      )}

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">目标岗位信息</CardTitle>
            <CardDescription>帮助 Agent 理解你的求职方向</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="targetRole">目标岗位</Label>
              <Input
                id="targetRole"
                placeholder="如：AI 产品经理"
                value={userInput.targetRole}
                onChange={(e) => setUserInput({ targetRole: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2 md:col-span-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="industry" className="flex items-center gap-1.5">
                  <span>行业</span>
                  <span className="text-[11px] font-normal text-neutral-400">（可选）</span>
                </Label>
                <button
                  type="button"
                  onClick={() => {
                    const detected = detectIndustrySmart(userInput.targetRole, userInput.jobDescription);
                    setUserInput({ industry: detected });
                  }}
                  className="text-[11px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5 hover:underline"
                >
                  <Sparkles className="h-3 w-3" />
                  智能识别
                </button>
              </div>
              <Input
                id="industry"
                placeholder="如：企业服务 / SaaS（可选择或直接输入）"
                value={userInput.industry}
                onChange={(e) => setUserInput({ industry: e.target.value })}
              />

              {/* Popular tags preview */}
              <div className="space-y-2 pt-1">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "互联网 / 软件工程",
                      "人工智能 / AIGC",
                      "互联网 / SaaS",
                      "芯片 / 半导体",
                      "新能源 / 智能汽车",
                      "金融科技 / FinTech",
                      "电商 / 跨境电商",
                      "医疗健康",
                    ].map((ind) => (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => setUserInput({ industry: ind })}
                        className={`rounded-full px-2.5 py-0.5 text-[11px] transition-all ${
                          userInput.industry === ind
                            ? "bg-blue-600 text-white font-medium shadow-2xs"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80"
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAllIndustries(!showAllIndustries)}
                    className="text-[11px] font-medium text-blue-600 hover:text-blue-700 flex items-center gap-0.5 shrink-0 hover:underline ml-auto"
                  >
                    {showAllIndustries ? (
                      <>
                        收起分类 <ChevronUp className="h-3 w-3" />
                      </>
                    ) : (
                      <>
                        更多行业 (25+) <ChevronDown className="h-3 w-3" />
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded Full Categorized Industry Panel */}
                {showAllIndustries && (
                  <div className="mt-2.5 rounded-lg border border-neutral-200/90 bg-neutral-50/70 p-3 space-y-3 animate-in fade-in duration-200">
                    {[
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
                          "高端装备 / 制造",
                          "航空航天 / 军工",
                        ],
                      },
                      {
                        category: "金融 / 商业 / 企服",
                        items: [
                          "金融科技 / FinTech",
                          "银行 / 证券 / 基金",
                          "投资 / 创投 / PE",
                          "专业咨询 / 审计 / 法律",
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
                        category: "服务 / 教育 / 地产",
                        items: [
                          "在线教育 / EdTech",
                          "房地产 / 建筑设计",
                          "文旅 / 生活服务",
                        ],
                      },
                    ].map((group) => (
                      <div key={group.category} className="space-y-1.5">
                        <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
                          {group.category}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => setUserInput({ industry: item })}
                              className={`rounded-md px-2 py-0.5 text-[11px] transition-all ${
                                userInput.industry === item
                                  ? "bg-blue-600 text-white font-medium shadow-2xs"
                                  : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100/80"
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between">
                <Label>目标公司规模与类型（模仿 BOSS 直聘）</Label>
                <span className="text-xs text-neutral-400">选择目标企业规模以激活 AI 针对性模型调优</span>
              </div>
              <Select
                value={userInput.companyType}
                onValueChange={(v) => setUserInput({ companyType: v as CompanyType })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COMPANY_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      <div className="flex items-center justify-between gap-2 w-full py-0.5">
                        <span className="font-medium text-neutral-900">{opt.label}</span>
                        <span className="text-xs text-neutral-500 font-mono">
                          ({opt.scale} · {opt.stage})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(() => {
                const opt = getCompanyTypeOption(userInput.companyType);
                return (
                  <div className="mt-2 rounded-lg border border-blue-100 bg-blue-50/60 p-3 text-xs text-blue-950 flex flex-col gap-1.5 transition-all shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 font-medium">
                      <span className="flex items-center gap-1.5 text-blue-700">
                        <Sparkles className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                        AI 调优策略：针对【{opt.label}】进行定制分析
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] shrink-0">
                        <span className="bg-blue-100/90 px-2 py-0.5 rounded text-blue-800 font-semibold border border-blue-200">
                          规模: {opt.scale}
                        </span>
                        <span className="bg-indigo-100/90 px-2 py-0.5 rounded text-indigo-800 font-semibold border border-indigo-200">
                          阶段: {opt.stage}
                        </span>
                      </div>
                    </div>
                    <p className="text-neutral-600 leading-relaxed text-[12px]">
                      {opt.aiFocus}
                    </p>
                  </div>
                );
              })()}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between">
                <Label>求职阶段与经验定位（含实习/校招/社招/转型）</Label>
                <span className="text-xs text-neutral-400">选择当前求职阶段以匹配正确的考核预期</span>
              </div>
              <Select
                value={userInput.jobStage}
                onValueChange={(v) => setUserInput({ jobStage: v as JobStage })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_STAGE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      <div className="flex items-center justify-between gap-2 w-full py-0.5">
                        <span className="font-medium text-neutral-900">{opt.label}</span>
                        <span className="text-xs text-neutral-500 font-mono">
                          ({opt.experience})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(() => {
                const opt = getJobStageOption(userInput.jobStage);
                return (
                  <div className="mt-2 rounded-lg border border-purple-100 bg-purple-50/60 p-3 text-xs text-purple-950 flex flex-col gap-1.5 transition-all shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 font-medium">
                      <span className="flex items-center gap-1.5 text-purple-700">
                        <Sparkles className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                        AI 阶段侧重：针对【{opt.label}】量身评测
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] shrink-0">
                        <span className="bg-purple-100/90 px-2 py-0.5 rounded text-purple-800 font-semibold border border-purple-200">
                          人群: {opt.targetAudience}
                        </span>
                      </div>
                    </div>
                    <p className="text-neutral-600 leading-relaxed text-[12px]">
                      {opt.aiFocus}
                    </p>
                  </div>
                );
              })()}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="highlightSkills">希望突出的能力</Label>
              <Input
                id="highlightSkills"
                placeholder="如：AI 产品规划、数据驱动、ToB 需求分析"
                value={userInput.highlightSkills}
                onChange={(e) => setUserInput({ highlightSkills: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>个人证件照 / 头像（可选）</Label>
              <div className="flex items-center gap-4">
                <div className="relative flex h-20 w-16 items-center justify-center rounded-md border border-dashed border-neutral-300 bg-neutral-50 overflow-hidden">
                  {userInput.avatarUrl ? (
                    <img
                      src={userInput.avatarUrl}
                      alt="证件照"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-neutral-400" />
                  )}
                </div>
                <div className="space-y-1.5">
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => avatarInputRef.current?.click()}
                    >
                      <Camera className="h-3.5 w-3.5" />
                      {userInput.avatarUrl ? "更换照片" : "上传证件照"}
                    </Button>
                    {userInput.avatarUrl && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setUserInput({ avatarUrl: "" })}
                      >
                        删除照片
                      </Button>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    支持上传寸照/形象照，将自动呈现并应用于双栏及自定义简历模板中
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">目标 JD</CardTitle>
            <CardDescription>粘贴完整岗位描述，Agent 将解析职责与要求</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[200px] font-mono text-xs leading-relaxed"
              placeholder="粘贴岗位 JD..."
              value={userInput.jobDescription}
              onChange={(e) => setUserInput({ jobDescription: e.target.value })}
            />
          </CardContent>
        </Card>

        <Card
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative overflow-hidden transition-all ${
            isDragging
              ? "border-2 border-dashed border-blue-500 bg-blue-50/80 shadow-md"
              : ""
          }`}
        >
          <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm">原始简历</CardTitle>
              <CardDescription>
                支持拖拽 PDF / Word (.docx / .doc) 文件到框内直接上传，或点击按钮解析全文本
              </CardDescription>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/plain"
                className="hidden"
                onChange={handlePdfUpload}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploadingPdf}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadingPdf ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    解析文件中...
                  </>
                ) : (
                  <>
                    <FileUp className="h-3.5 w-3.5" />
                    上传 PDF / Word 简历
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-2">
            {isDragging && (
              <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center rounded-lg bg-blue-500/15 backdrop-blur-[2px]">
                <div className="flex items-center gap-2.5 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg animate-bounce">
                  <FileUp className="h-4 w-4" />
                  松开鼠标，自动解析 PDF / Word 简历
                </div>
              </div>
            )}
            {pdfError && (
              <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                {pdfError}
              </div>
            )}
            <Textarea
              className="min-h-[240px] font-mono text-xs leading-relaxed"
              placeholder="可以直接拖拽 PDF 或 Word 文件到这里，或直接粘贴简历文本内容..."
              value={userInput.originalResume}
              onChange={(e) => setUserInput({ originalResume: e.target.value })}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">补充信息（可选）</CardTitle>
            <CardDescription>项目细节、转型动机、特殊说明等</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[100px] text-sm"
              placeholder="补充 Agent 需要了解的信息..."
              value={userInput.additionalInfo}
              onChange={(e) => setUserInput({ additionalInfo: e.target.value })}
            />
          </CardContent>
        </Card>
      </div>

      {/* Static Bottom Action Bar & Progress Section */}
      <div className="mt-6 rounded-xl border border-blue-200/80 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-purple-50/70 p-5 shadow-md space-y-4 transition-all">
        {/* If analyzing: display high-end integrated progress bar & stage indicators */}
        {isAnalyzing && analysisStage ? (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-semibold text-blue-950">
                {analysisStage.progressPercent < 100 ? (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600 shrink-0" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                )}
                <span>{analysisStage.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/90 border border-blue-200 px-2 py-0.5 rounded-md">
                  {analysisStage.progressPercent}%
                </span>
                <Button variant="outline" size="sm" onClick={handleCancel} className="h-7 text-xs bg-white/80">
                  <X className="h-3.5 w-3.5 mr-1" />
                  取消分析
                </Button>
              </div>
            </div>

            <Progress
              value={analysisStage.progressPercent}
              className="h-2.5 bg-blue-100/80 shadow-inner"
              indicatorClassName="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md transition-all duration-500"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {STAGE_STEPS.map((step, idx) => {
                const isCompleted = analysisStage.completedStages.includes(step.id);
                const isActive = analysisStage.stageId === step.id && !isCompleted;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 text-[11px] font-medium transition-all ${
                      isCompleted
                        ? "bg-emerald-50/90 text-emerald-800 border border-emerald-200/80 shadow-2xs"
                        : isActive
                        ? "bg-white text-blue-900 border border-blue-400 font-semibold shadow-xs ring-2 ring-blue-400/20"
                        : "bg-white/40 text-neutral-400 border border-neutral-200/40"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                    ) : isActive ? (
                      <Loader2 className="h-3 w-3 animate-spin text-blue-600 shrink-0" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 shrink-0" />
                    )}
                    <span className="truncate">
                      {idx + 1}. {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              {!canAnalyze ? (
                <span className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200/70 px-3 py-1.5 rounded-lg font-medium">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  请填写目标岗位、目标 JD 及原始简历以开始分析
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-3 py-1.5 rounded-lg font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  材料已完整就绪，随时可发起 AI 智能解析
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto justify-end">
              <Button variant="outline" size="default" onClick={loadExampleData} disabled={isAnalyzing} className="w-full sm:w-auto justify-center">
                <Wand2 className="h-4 w-4 text-neutral-600" />
                使用示例数据
              </Button>
              <Button
                size="default"
                onClick={handleAnalyze}
                disabled={!canAnalyze || isAnalyzing}
                className="w-full sm:w-auto justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-md shadow-blue-500/20 px-6 py-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    AI 分析中...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
                    开始 AI 匹配分析
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
