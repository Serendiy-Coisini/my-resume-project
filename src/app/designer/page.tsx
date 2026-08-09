"use client";

import Link from "next/link";
import { ArrowLeft, Save, FileText } from "lucide-react";
import { LegoDesigner } from "@/components/legoDesigner";

export default function DesignerPage() {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 text-slate-50 overflow-hidden">
      {/* Top Header Bar */}
      <header className="flex-none h-14 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <Link 
            href="/"
            className="p-2 hover:bg-slate-800 rounded-md transition-colors text-slate-400 hover:text-slate-100 flex items-center justify-center"
            title="返回首页"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FileText className="w-4 h-4" />
            </div>
            <h1 className="font-semibold text-sm tracking-wide">简历制作器</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-1.5 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors flex items-center gap-2 border border-slate-700">
            <Save className="w-4 h-4" />
            保存草稿
          </button>
        </div>
      </header>
      
      {/* Designer Content */}
      <main className="flex-1 overflow-hidden relative">
        <LegoDesigner standalone={true} />
      </main>
    </div>
  );
}
