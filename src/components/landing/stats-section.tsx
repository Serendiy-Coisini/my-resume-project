export function StatsSection() {
  const stats = [
    { number: "10,000+", label: "已完成优化简历" },
    { number: "35%", label: "平均 JD 匹配度提升" },
    { number: "4.9/5.0", label: "求职满意度评价" },
    { number: "< 60s", label: "平均 AI 诊断耗时" },
  ];

  return (
    <section className="py-16 bg-slate-900/30 border-b border-slate-900">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
