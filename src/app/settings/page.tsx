"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Settings, ChevronRight, Check, Loader2, Eye, EyeOff,
  Sparkles, ExternalLink, AlertCircle, ArrowLeft, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PROVIDERS = [
  {
    id: "deepseek",
    name: "DeepSeek",
    label: "推荐 · 性价比最高",
    baseUrl: "https://api.deepseek.com/v1",
    model: "deepseek-chat",
    provider: "openai",
    guideUrl: "https://platform.deepseek.com/api_keys",
    guideSteps: ["打开 platform.deepseek.com 并注册", "登录后进入 API Keys 页面", "点击「创建 API Key」", "复制生成的密钥粘贴到下方"],
    freeQuota: "注册即送 500 万 Token 免费额度",
    bgColor: "bg-blue-500/10 border-blue-500/30 hover:border-blue-400",
  },
  {
    id: "siliconflow",
    name: "硅基流动 (SiliconFlow)",
    label: "部分模型完全免费",
    baseUrl: "https://api.siliconflow.cn/v1",
    model: "Qwen/Qwen2.5-7B-Instruct",
    provider: "openai",
    guideUrl: "https://cloud.siliconflow.cn/account/ak",
    guideSteps: ["打开 cloud.siliconflow.cn 并注册", "进入 账户 → API 密钥", "创建新密钥", "复制密钥粘贴到下方"],
    freeQuota: "多个开源模型完全免费调用",
    bgColor: "bg-purple-500/10 border-purple-500/30 hover:border-purple-400",
  },
  {
    id: "openai",
    name: "OpenAI (ChatGPT)",
    label: "全球最强模型",
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o-mini",
    provider: "openai",
    guideUrl: "https://platform.openai.com/api-keys",
    guideSteps: ["打开 platform.openai.com", "登录 OpenAI 账号", "进入 API Keys 页面", "创建新的 Secret Key 并复制"],
    freeQuota: "新账号赠送 $5 免费额度",
    bgColor: "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-400",
  },
  {
    id: "moonshot",
    name: "月之暗面 (Kimi)",
    label: "国产优质模型",
    baseUrl: "https://api.moonshot.cn/v1",
    model: "moonshot-v1-8k",
    provider: "openai",
    guideUrl: "https://platform.moonshot.cn/console/api-keys",
    guideSteps: ["打开 platform.moonshot.cn", "注册并登录", "进入 API 管理页面", "新建密钥并复制"],
    freeQuota: "新用户赠送 15 元额度",
    bgColor: "bg-amber-500/10 border-amber-500/30 hover:border-amber-400",
  },
  {
    id: "custom",
    name: "自定义 OpenAI 兼容接口",
    label: "高级用户",
    baseUrl: "",
    model: "",
    provider: "openai",
    guideUrl: "",
    guideSteps: [],
    freeQuota: "",
    bgColor: "bg-slate-500/10 border-slate-500/30 hover:border-slate-400",
  },
];

export default function SettingsPage() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>("deepseek");
  const [apiKey, setApiKey] = useState("");
  const [customBaseUrl, setCustomBaseUrl] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  const provider = PROVIDERS.find((p) => p.id === selectedProvider);

  const handleTest = async () => {
    if (!apiKey.trim()) return;
    setTesting(true);
    setTestResult(null);
    try {
      const baseUrl = selectedProvider === "custom" ? customBaseUrl : provider?.baseUrl;
      const model = selectedProvider === "custom" ? customModel : provider?.model;
      const res = await fetch("/api/settings/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: apiKey.trim(), baseUrl, model }),
      });
      const data = await res.json();
      setTestResult({ success: data.success, message: data.success ? "连接成功！AI 服务可正常使用" : data.error || "连接失败" });
    } catch {
      setTestResult({ success: false, message: "网络请求失败，请检查网络" });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async () => {
    if (!apiKey.trim()) return;
    setSaving(true);
    try {
      const baseUrl = selectedProvider === "custom" ? customBaseUrl : provider?.baseUrl;
      const model = selectedProvider === "custom" ? customModel : provider?.model;
      const providerType = provider?.provider || "openai";
      const res = await fetch("/api/settings/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: apiKey.trim(), baseUrl, model, provider: providerType }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 4000);
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">返回首页</span>
          </Link>
          <Link href="/expert">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white font-bold gap-1.5">
              <Zap className="w-3.5 h-3.5" /> 开始使用简历诊断
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 mb-6">
            <Settings className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-50">配置你的 AI 大模型</h1>
          <p className="text-slate-300 text-lg mt-3 max-w-2xl mx-auto">
            选择一个 AI 服务商，填入你自己的 API Key，即可无限使用简历分析与重构优化功能
          </p>
        </div>

        {/* Step 1: Select Provider */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold">1</span>
            选择 AI 服务商
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {PROVIDERS.map((p) => (
              <button
                key={p.id}
                onClick={() => { setSelectedProvider(p.id); setTestResult(null); setSaved(false); setShowGuide(true); }}
                className={`text-left p-5 rounded-xl border-2 transition-all ${
                  selectedProvider === p.id
                    ? p.bgColor.replace("hover:", "") + " ring-1 ring-blue-500/50"
                    : "border-slate-800 hover:border-slate-700 bg-slate-900/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-100 text-base">{p.name}</div>
                    <div className="text-sm text-slate-400 mt-0.5">{p.label}</div>
                  </div>
                  {selectedProvider === p.id && <Check className="w-5 h-5 text-blue-400" />}
                </div>
                {p.freeQuota && (
                  <div className="mt-2.5 text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {p.freeQuota}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Enter API Key */}
        {selectedProvider && (
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold">2</span>
              填写 API Key
            </h2>

            {/* Guide toggle */}
            {provider && provider.guideSteps.length > 0 && (
              <div className="mb-4">
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="text-sm text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  <ChevronRight className={`w-4 h-4 transition-transform ${showGuide ? "rotate-90" : ""}`} />
                  如何获取 {provider.name} 的 API Key？
                </button>
                {showGuide && (
                  <div className="mt-3 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                    {provider.guideSteps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-slate-200">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                        <span>{step}</span>
                      </div>
                    ))}
                    {provider.guideUrl && (
                      <a
                        href={provider.guideUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-semibold mt-2 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> 前往 {provider.name} 官网注册获取 API Key
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* API Key input */}
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 h-12 pr-12 font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Custom provider extra fields */}
              {selectedProvider === "custom" && (
                <>
                  <Input
                    value={customBaseUrl}
                    onChange={(e) => setCustomBaseUrl(e.target.value)}
                    placeholder="API Base URL (例如 https://api.example.com/v1)"
                    className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 h-12 text-sm"
                  />
                  <Input
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                    placeholder="模型名称 (例如 gpt-4o-mini)"
                    className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 h-12 text-sm"
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Test & Save */}
        {selectedProvider && (
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold">3</span>
              测试连接并保存
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleTest}
                disabled={testing || !apiKey.trim()}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-bold h-12 px-6 gap-2 justify-center"
              >
                {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 text-amber-400" />}
                测试连接
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving || !apiKey.trim()}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 px-8 gap-2 disabled:opacity-50 justify-center"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {saved ? "已保存 ✓" : "保存配置"}
              </Button>
            </div>


            {/* Test result */}
            {testResult && (
              <div className={`mt-4 p-4 rounded-xl border flex items-start gap-3 ${
                testResult.success
                  ? "bg-emerald-950/50 border-emerald-500/30 text-emerald-300"
                  : "bg-red-950/50 border-red-500/30 text-red-300"
              }`}>
                {testResult.success ? <Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />}
                <div>
                  <div className="font-bold text-sm">{testResult.success ? "连接成功" : "连接失败"}</div>
                  <div className="text-sm mt-0.5 opacity-80">{testResult.message}</div>
                </div>
              </div>
            )}

            {/* Success next step */}
            {saved && (
              <div className="mt-6 p-5 rounded-xl bg-blue-950/50 border border-blue-500/30 text-center">
                <p className="text-blue-300 font-bold text-lg">🎉 配置已成功保存！</p>
                <p className="text-slate-300 text-sm mt-1">你的 API Key 已成功写入系统配置，现在即可无限使用简历分析</p>
                <Link href="/expert" className="inline-block mt-4">
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 px-8 gap-2">
                    <Sparkles className="w-4 h-4" /> 立即开始分析重构简历
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* FAQ */}
        <div className="mt-16 pt-10 border-t border-slate-800">
          <h3 className="text-lg font-bold text-slate-200 mb-4">常见问题</h3>
          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="font-bold text-slate-200">Q: 使用自己的 API Key 大概需要多少费用？</div>
              <div className="text-slate-300 mt-1">A: 深度分析一份完整简历大约消耗 3000-5000 Token。以 DeepSeek 为例，分析一次成本仅约 0.01 元，非常便宜！</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="font-bold text-slate-200">Q: 我的 API Key 安全吗？</div>
              <div className="text-slate-300 mt-1">A: 完全安全。API Key 仅保存在你自己电脑本地的配置文件中，绝不会发送或上传给任何第三方服务器。</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="font-bold text-slate-200">Q: 推荐使用哪个 AI 服务商？</div>
              <div className="text-slate-300 mt-1">A: 推荐使用 DeepSeek，注册即赠送免费 Token 额度，且逻辑分析能力极高，性价比第一！</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
