"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "简历专家如何保证我的个人信息与隐私安全？",
      a: "我们高度重视数据合规。系统在将简历发送给 AI 大模型之前，会自动运行 PII 隐私脱敏服务，移除姓名、手机号、邮箱、身份证号等敏感字段。你的简历内容仅用于本次分析诊断，绝不会泄露给第三方或用于公开训练。",
    },
    {
      q: "免费版与付费会员有什么区别？",
      a: "免费版每月包含 3 次完整 AI 诊断优化额度，支持基础模版预览；付费会员享无限次 AI 诊断重构、全场精品模版免费使用、支持导出高清无水印矢量 PDF 以及可编辑 Word 格式。",
    },
    {
      q: "如何使用 AI 结合具体的 JD（岗位职责）优化？",
      a: "在智能诊断页面，只需粘贴你心仪招聘岗位的 JD 描述与你现有的简历，AI 就会自动进行两者的对齐分析，找出关键词缺失、匹配度短板，并引导你补充针对性经历。",
    },
    {
      q: "导出的 PDF 格式是否支持 ATS（简历自动筛选系统）识别？",
      a: "是的！导出的 PDF 基于文本矢量规范渲染生成，文字可选择复制，方便 HR 筛选系统提取文本，不会变成无法识别的胶片图片。",
    },
    {
      q: "购买后如果遇到问题如何寻求支持？",
      a: "遇到任何支付、导出或账号问题，可通过控制台客服通道联系客服团队，我们将优先协助处理。",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-slate-950 border-b border-slate-800">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold text-blue-400 tracking-wider uppercase">Got Questions?</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 text-slate-50">
            常见问题解答
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between font-bold text-lg text-slate-100 hover:text-blue-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-300 transition-transform duration-200 ${
                  openIndex === idx ? "rotate-180 text-blue-400" : ""
                }`} />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 text-slate-200 text-base leading-relaxed border-t border-slate-800/80 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
