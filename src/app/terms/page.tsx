import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="text-slate-400 hover:text-slate-100 gap-2 mb-8">
            <ArrowLeft className="w-4 h-4" /> 返回首页
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-50">用户服务协议 (Terms of Service)</h1>
        </div>

        <div className="space-y-6 text-slate-300 text-sm md:text-base leading-relaxed bg-slate-900/80 border border-slate-800 p-8 rounded-2xl shadow-xl">
          <p className="text-xs text-slate-400 font-semibold">最新更新日期：2026年8月11日</p>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-2">1. 服务协议的确认与接受</h2>
            <p>欢迎使用简历专家（Resume Expert）。当您访问或使用本系统提供的简历诊断、STAR 法则重构、排版及导出功能时，即表示您已阅读并同意本协议的所有条款。</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-2">2. 用户责任与履历真实性</h2>
            <p>本系统为基于大语言模型的求职辅助与排版工具。用户应保证所输入的个人经历、项目数据、学历及技能等信息的真实性与合规性。因填报虚假履历导致的招聘争议或法律责任由用户个人承担。</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-2">3. 免责声明与输出结果</h2>
            <p>AI 生成的诊断打分、关键词匹配度建议及 Bullet 重构仅供个人求职参考，不构成招聘结果的保证。简历专家不对任何特定的面试率、Offer 获得或求职成功率做出绝对承诺。</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-2">4. 知识产权与导出文档</h2>
            <p>用户使用本系统导出的 PDF 及 Word 格式简历，其著作权及所有权归用户本人所有。模板结构及系统设计的知识产权归简历专家团队所有。</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-2">5. 协议修改与更新</h2>
            <p>我们保留根据产品迭代与法律法规要求不定期修改本协议的权利，修改后的协议一经公布即生效。</p>
          </section>
        </div>
      </div>
    </div>
  );
}
