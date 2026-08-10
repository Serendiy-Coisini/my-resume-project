import { Star } from "lucide-react";

export function TestimonialsSection() {
  const list = [
    {
      name: "李同学",
      role: "应届生 · 成功斩获大厂 PM Offer",
      content: "使用简历专家帮我把实习经历中的描述从'协助做产品调研'改成了含有具体数据指标的结构化描述，HR 面试时对我追问非常顺畅，极力推荐！",
    },
    {
      name: "张先生",
      role: "高级后端工程师 · 转行 AI 领域",
      content: "针对 AI 岗位的 JD 做了对齐分析后，系统精准帮我抽出了与大模型/RAG 结合的切入点，面试准备材料更是预判了面试官 80% 的技术问题。",
    },
    {
      name: "王女士",
      role: "ToB 营销专家 · 5年工作经验",
      content: "以前简历太干瘪，追问功能一步步启发我想起了之前的增长数据。导出的 PDF 排版非常舒服优雅，没有错行变形。",
    },
  ];

  return (
    <section className="py-24 bg-slate-950 border-b border-slate-800">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold text-purple-400 tracking-wider uppercase">User Success</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 text-slate-50">
            来自求职者的真实好评
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {list.map((t, idx) => (
            <div key={idx} className="p-7 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex gap-1 text-amber-400 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-100 text-base font-medium leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
              </div>
              <div className="border-t border-slate-800 pt-5">
                <div className="font-extrabold text-lg text-slate-50">{t.name}</div>
                <div className="text-sm font-medium text-purple-300 mt-1">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
