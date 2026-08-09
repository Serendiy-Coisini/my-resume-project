"use client";

import Link from "next/link";
import { Brain, Sparkles, LayoutGrid, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="container max-w-6xl mx-auto px-4 py-16 relative z-10 flex flex-col items-center">
        <div className="text-center mb-16 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm font-medium text-slate-300 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>智能简历制作与优化平台</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent pb-2">
            让每一份简历都能发光
          </h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
            选择你需要的简历服务。无论是通过AI专家为你量身定制优化策略，还是自由排版设计出独一无二的简历，我们都能帮你在求职中脱颖而出。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* AI Expert Card */}
          <Link href="/expert" className="group block">
            <div className="h-full p-8 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all duration-300 flex flex-col relative overflow-hidden group-hover:-translate-y-1 group-hover:shadow-[0_8px_32px_rgba(59,130,246,0.2)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-blue-500/20" />
              
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400 border border-blue-500/20 shadow-inner">
                <Brain className="w-8 h-8" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                AI 简历专家
                <span className="text-xs font-semibold px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                  智能解析
                </span>
              </h2>
              
              <p className="text-slate-400 mb-8 flex-grow leading-relaxed">
                深度对齐JD要求，全方位诊断并优化你的简历。提供模拟面试准备，帮你挖掘隐藏亮点，提升面试通过率。
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "精准岗位匹配与诊断",
                  "深度优化项目经历",
                  "AI模拟面试辅导",
                  "一键生成优化后简历"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="inline-flex items-center gap-2 text-blue-400 font-medium group-hover:text-blue-300 transition-colors mt-auto">
                进入 AI 专家模式 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Standalone Designer Card */}
          <Link href="/designer" className="group block">
            <div className="h-full p-8 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/60 transition-all duration-300 flex flex-col relative overflow-hidden group-hover:-translate-y-1 group-hover:shadow-[0_8px_32px_rgba(168,85,247,0.2)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-purple-500/20" />
              
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400 border border-purple-500/20 shadow-inner">
                <LayoutGrid className="w-8 h-8" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                独立简历制作
                <span className="text-xs font-semibold px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                  自由度高
                </span>
              </h2>
              
              <p className="text-slate-400 mb-8 flex-grow leading-relaxed">
                拖拽式积木设计，提供海量优质模板。完全自由的排版体验，所见即所得，一键导出高清PDF。
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "海量精美简历模板",
                  "灵活的拖拽式布局",
                  "完全自由的样式定制",
                  "一键导出高清PDF"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="inline-flex items-center gap-2 text-purple-400 font-medium group-hover:text-purple-300 transition-colors mt-auto">
                开始设计简历 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
