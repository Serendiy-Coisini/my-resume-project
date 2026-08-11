import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 pt-14 pb-10">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Top Brand & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-600/30">
                R
              </div>
              <span className="font-extrabold text-lg text-slate-100 tracking-tight">
                简历专家 <span className="text-blue-400 font-semibold text-xs ml-1">Pro Agent</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              基于大模型对齐 JD 的深度简历优化 Agent，结合 STAR 法则与启发式追问，助你打造高含金量简历。
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>诊断引擎运行正常</span>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 tracking-wide uppercase">核心功能</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/expert" className="hover:text-blue-400 transition-colors">
                  AI JD 智能对齐诊断
                </Link>
              </li>
              <li>
                <Link href="/expert" className="hover:text-blue-400 transition-colors">
                  STAR Bullet 智能改写
                </Link>
              </li>
              <li>
                <Link href="/expert" className="hover:text-blue-400 transition-colors">
                  启发式追问引导
                </Link>
              </li>
              <li>
                <Link href="/designer" className="hover:text-purple-400 transition-colors">
                  积木自由排版设计器
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 tracking-wide uppercase">模型支持 & 配置</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/settings" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <span>DeepSeek (V3 / R1)</span>
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-blue-400 transition-colors">
                  OpenAI / Kimi / 阿里通义
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-blue-400 transition-colors">
                  自定义 API BaseURL
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-blue-400 transition-colors">
                  BYOK 秘钥安全设置
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 tracking-wide uppercase">条款与帮助</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#faq" className="hover:text-slate-200 transition-colors">
                  常见问题解答 (FAQ)
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-200 transition-colors">
                  隐私保护政策
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-200 transition-colors">
                  用户服务协议
                </Link>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">ATS 矢量导出兼容规范</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Fine Print / Small Text Section (底部小字) */}
        <div className="py-6 border-b border-slate-900/80 space-y-2.5 text-[11px] text-slate-500 leading-relaxed">
          <p className="flex items-start gap-1.5">
            <span className="text-slate-400 font-bold shrink-0">* 免责声明：</span>
            <span>
              简历专家（Resume Expert）基于大语言模型（LLM）算法与招聘对齐模型生成评估建议及表达修改，输出内容仅供个人求职参考。用户应确保填写的履历内容客观真实，简历专家不保证特定招聘岗位的面试邀请或录用结果。
            </span>
          </p>
          <p className="flex items-start gap-1.5">
            <span className="text-slate-400 font-bold shrink-0">* 隐私与安全：</span>
            <span>
              系统内置 PII（个人身份标识）前置脱敏保护，敏感个人信息在传输前被自动隐藏。用户设置的 API Key 均保存在本地存储或指定环境变量中，简历数据绝不转售或提交给公共数据集训练。
            </span>
          </p>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} 简历专家 (Resume Expert). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              隐私政策
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              服务条款
            </Link>
            <span>•</span>
            <span className="text-slate-500">京 ICP 备 20268888 号-1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
