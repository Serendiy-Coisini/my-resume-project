import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900 text-slate-400 text-sm">
      <div className="container max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-base">
            R
          </div>
          <span className="font-bold text-slate-200">简历专家 Resume Expert</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <Link href="/privacy" className="hover:text-slate-200 transition-colors">隐私政策</Link>
          <Link href="/terms" className="hover:text-slate-200 transition-colors">用户服务协议</Link>
          <Link href="/templates" className="hover:text-slate-200 transition-colors">模板画廊</Link>
          <a href="#pricing" className="hover:text-slate-200 transition-colors">套餐价格</a>
        </div>

        <div className="text-xs text-slate-500 text-center md:text-right">
          <p>© {new Date().getFullYear()} 简历专家. All rights reserved.</p>
          <p className="mt-1">京 ICP 备 20268888 号-1</p>
        </div>
      </div>
    </footer>
  );
}
