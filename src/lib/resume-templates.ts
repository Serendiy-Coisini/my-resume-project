import type { FinalResume } from "@/types/resume";

export type TemplateId =
  | "modern-sidebar"
  | "timeline-tech"
  | "corporate-banner"
  | "grid-cards"
  | "custom";

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  tag: string;
  color: string;
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "modern-sidebar",
    name: "现代双栏卡片",
    description: "左侧深色侧边栏展示个人信息/技能/照片，右侧主区域展示履历",
    tag: "双栏高颜值",
    color: "#0f172a",
  },
  {
    id: "timeline-tech",
    name: "时间轴极客",
    description: "带有贯穿工作/项目经历的视觉时间轴点与线条，突出履历脉络",
    tag: "时间轴风格",
    color: "#2563eb",
  },
  {
    id: "corporate-banner",
    name: "商务色块 Header",
    description: "顶部带有深色背景 Header 块与个人照，下方搭配双列能力矩阵",
    tag: "大厂商务",
    color: "#1e1b4b",
  },
  {
    id: "grid-cards",
    name: "微阴影卡片流",
    description: "每个履历模块独立卡片包裹，现代化UI设计，阅读体感极佳",
    tag: "卡片风",
    color: "#059669",
  },
];

/**
 * Replaces placeholders in custom HTML templates.
 * Supports both English placeholders {{name}} and Chinese placeholders {{姓名}}.
 */
export function compileCustomTemplate(htmlTemplate: string, resume: FinalResume): string {
  const p = resume.personalInfo;
  const avatarUrl = p.avatarUrl || "";

  const workExpHTML = resume.workExperience
    .map(
      (w) => `
      <div style="margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 13.5px; color: #1e293b;">
          <span>${w.company} · ${w.role}</span>
          <span style="color: #64748b; font-weight: normal; font-size: 12px;">${w.period}</span>
        </div>
        <ul style="margin: 6px 0 10px 0; padding-left: 18px; color: #334155; font-size: 13px;">
          ${w.bullets.map((b) => `<li style="margin-bottom: 4px; line-height: 1.6;">${b}</li>`).join("")}
        </ul>
      </div>
    `
    )
    .join("");

  const projExpHTML = resume.projectExperience
    .map(
      (p) => `
      <div style="margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 13.5px; color: #1e293b;">
          <span>${p.name} · ${p.role}</span>
          <span style="color: #64748b; font-weight: normal; font-size: 12px;">${p.period}</span>
        </div>
        <ul style="margin: 6px 0 10px 0; padding-left: 18px; color: #334155; font-size: 13px;">
          ${p.bullets.map((b) => `<li style="margin-bottom: 4px; line-height: 1.6;">${b}</li>`).join("")}
        </ul>
      </div>
    `
    )
    .join("");

  const coreSkillsHTML = resume.coreSkills
    .map(
      (s) =>
        `<span style="display: inline-block; background: #eff6ff; color: #1d4ed8; padding: 3px 10px; border-radius: 4px; font-size: 12px; margin: 3px 6px 3px 0;">${s}</span>`
    )
    .join(" ");

  const avatarHTML = avatarUrl
    ? `<img src="${avatarUrl}" style="width: 72px; height: 90px; object-fit: cover; border-radius: 4px; border: 1px solid #cbd5e1; display: block; margin-bottom: 12px;" />`
    : "";

  let tpl = (htmlTemplate || "").trim();

  // Fallback: If template doesn't contain HTML tags, wrap it properly into readable HTML layout
  if (!tpl.includes("<html") && !tpl.includes("<div") && !tpl.includes("<body") && !tpl.includes("<p")) {
    tpl = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${p.name || "简历"}</title>
  <style>
    @page { size: A4; margin: 8mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: 13.5px; line-height: 1.65; color: #1e293b; margin: 0; padding: 12px 16px; background: #fff; }
    h1 { font-size: 24px; font-weight: 700; color: #1e1b4b; margin: 0 0 6px 0; }
    .contact { font-size: 12.5px; color: #64748b; margin-bottom: 18px; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; }
    .sec-title { font-size: 14px; font-weight: 700; color: #312e81; border-left: 4px solid #4f46e5; padding-left: 8px; margin-top: 22px; margin-bottom: 12px; text-transform: uppercase; }
    ul { margin: 6px 0 12px 0; padding-left: 18px; }
    li { margin-bottom: 4px; color: #334155; }
  </style>
</head>
<body>
  ${avatarHTML}
  <h1>{{姓名}}</h1>
  <div class="contact">{{邮箱}} · {{电话}} · {{城市}} · 求职意向：{{求职意向}}</div>

  <div class="sec-title">职业摘要</div>
  <p style="line-height:1.65;">{{职业摘要}}</p>

  <div class="sec-title">核心能力</div>
  <div>{{核心能力}}</div>

  <div class="sec-title">工作经历</div>
  <div>{{工作经历}}</div>

  <div class="sec-title">项目经历</div>
  <div>{{项目经历}}</div>

  <div class="sec-title">技能工具</div>
  <p>{{技能工具}}</p>

  <div class="sec-title">教育背景</div>
  <p>{{教育背景}}</p>
</body>
</html>`;
  }

  const replacements: Record<string, string> = {
    "{{avatar}}": avatarHTML,
    "{{证件照}}": avatarHTML,
    "{{头像}}": avatarHTML,
    "{{name}}": p.name,
    "{{姓名}}": p.name,
    "{{email}}": p.email,
    "{{邮箱}}": p.email,
    "{{phone}}": p.phone,
    "{{电话}}": p.phone,
    "{{location}}": p.location,
    "{{城市}}": p.location,
    "{{jobIntent}}": resume.jobIntent,
    "{{求职意向}}": resume.jobIntent,
    "{{summary}}": resume.summary,
    "{{职业摘要}}": resume.summary,
    "{{coreSkills}}": coreSkillsHTML,
    "{{核心能力}}": coreSkillsHTML,
    "{{workExperience}}": workExpHTML,
    "{{工作经历}}": workExpHTML,
    "{{projectExperience}}": projExpHTML,
    "{{项目经历}}": projExpHTML,
    "{{skillsAndTools}}": resume.skillsAndTools.join(" · "),
    "{{技能工具}}": resume.skillsAndTools.join(" · "),
    "{{school}}": resume.education.school,
    "{{学校}}": resume.education.school,
    "{{degree}}": resume.education.degree,
    "{{学历}}": resume.education.degree,
    "{{eduPeriod}}": resume.education.period,
    "{{教育时间}}": resume.education.period,
    "{{education}}": `${resume.education.school} · ${resume.education.degree} (${resume.education.period})`,
    "{{教育背景}}": `${resume.education.school} · ${resume.education.degree} (${resume.education.period})`,
  };

  let compiled = tpl;
  Object.entries(replacements).forEach(([key, val]) => {
    compiled = compiled.replaceAll(key, val);
  });

  return compiled;
}

/**
 * Renders HTML string for preview and PDF/Word export for chosen template ID.
 */
export function renderTemplateHTML(
  resume: FinalResume,
  templateId: TemplateId,
  customTemplateHTML?: string
): string {
  const p = resume.personalInfo;
  const avatarUrl = p.avatarUrl || "";

  const avatarTag = avatarUrl
    ? `<img src="${avatarUrl}" style="width:72px; height:90px; object-fit:cover; border-radius:4px; border:1px solid #cbd5e1;" />`
    : "";

  // Custom Uploaded Template
  if (templateId === "custom" && customTemplateHTML) {
    return compileCustomTemplate(customTemplateHTML, resume);
  }

  // 1. Timeline Tech Template
  if (templateId === "timeline-tech") {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${p.name} - 个人简历</title>
        <style>
          @page { size: A4; margin: 8mm; }
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: 13.5px; line-height: 1.65; color: #334155; margin: 0; padding: 12px 16px; background: #fff; }
          .header { border-bottom: 2px solid #2563eb; padding-bottom: 14px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-start; }
          .name { font-size: 24px; font-weight: 700; color: #0f172a; }
          .contact { font-size: 12.5px; color: #64748b; margin-top: 6px; }
          .sec-title { font-size: 14px; font-weight: 700; color: #1e40af; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 22px; margin-bottom: 12px; display: flex; align-items: center; }
          .sec-title::after { content: ""; flex: 1; margin-left: 10px; border-bottom: 1px solid #dbeafe; }
          .timeline { border-left: 2px solid #e2e8f0; margin-left: 6px; padding-left: 18px; position: relative; }
          .tl-item { position: relative; margin-bottom: 18px; page-break-inside: avoid; break-inside: avoid; }
          .tl-item::before { content: ""; position: absolute; left: -23px; top: 5px; width: 8px; height: 8px; border-radius: 50%; background: #2563eb; border: 2px solid #fff; }
          .item-head { display: flex; justify-content: space-between; font-weight: 600; font-size: 14px; color: #0f172a; }
          .tag { display: inline-block; background: #eff6ff; color: #1d4ed8; padding: 3px 10px; border-radius: 4px; font-size: 12px; margin: 3px 5px 3px 0; }
          ul { margin: 6px 0 8px 0; padding-left: 18px; }
          li { margin-bottom: 4px; color: #334155; line-height: 1.65; }
          p { margin: 6px 0; line-height: 1.65; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="name">${p.name}</div>
            <div class="contact">${p.email} &nbsp;|&nbsp; ${p.phone} &nbsp;|&nbsp; ${p.location} &nbsp;|&nbsp; 意向：${resume.jobIntent}</div>
          </div>
          ${avatarTag ? `<div>${avatarTag}</div>` : ""}
        </div>

        <div class="sec-title">职业摘要</div>
        <p>${resume.summary}</p>

        <div class="sec-title">核心能力</div>
        <div>${resume.coreSkills.map((s) => `<span class="tag">${s}</span>`).join(" ")}</div>

        <div class="sec-title">工作经历</div>
        <div class="timeline">
          ${resume.workExperience
            .map(
              (w) => `
            <div class="tl-item">
              <div class="item-head"><span>${w.company} · ${w.role}</span><span>${w.period}</span></div>
              <ul>${w.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="sec-title">项目经历</div>
        <div class="timeline">
          ${resume.projectExperience
            .map(
              (p) => `
            <div class="tl-item">
              <div class="item-head"><span>${p.name} · ${p.role}</span><span>${p.period}</span></div>
              <ul>${p.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="sec-title">技能工具</div>
        <p>${resume.skillsAndTools.join(" · ")}</p>

        <div class="sec-title">教育背景</div>
        <p>${resume.education.school} · ${resume.education.degree} · ${resume.education.period}</p>
      </body>
      </html>
    `;
  }

  // 2. Corporate Banner Template
  if (templateId === "corporate-banner") {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${p.name} - 简历</title>
        <style>
          @page { size: A4; margin: 8mm; }
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: 13.5px; line-height: 1.65; color: #1e293b; margin: 0; padding: 0; background: #fff; }
          .banner { background: #1e1b4b; color: #fff; padding: 24px 28px; width: 100%; display: flex; justify-content: space-between; align-items: center; border-radius: 6px; }
          .name { font-size: 24px; font-weight: 700; margin-bottom: 6px; }
          .contact { font-size: 12.5px; color: #c7d2fe; }
          .content { padding: 16px 8px; }
          .sec-title { font-size: 14px; font-weight: 700; color: #312e81; border-left: 4px solid #4f46e5; padding-left: 10px; margin-top: 22px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .item-head { display: flex; justify-content: space-between; font-weight: 600; font-size: 14px; margin-top: 14px; color: #0f172a; }
          .badge { display: inline-block; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 3px 10px; border-radius: 4px; font-size: 12px; margin: 3px 4px 3px 0; }
          ul { margin: 6px 0 12px 0; padding-left: 18px; }
          li { margin-bottom: 5px; color: #334155; line-height: 1.65; }
          p { margin: 6px 0; line-height: 1.65; }
        </style>
      </head>
      <body>
        <div class="banner">
          <div>
            <div class="name">${p.name}</div>
            <div class="contact">${p.email} | ${p.phone} | ${p.location} | 求职意向：${resume.jobIntent}</div>
          </div>
          ${avatarTag ? `<div><img src="${avatarUrl}" style="width:68px; height:85px; object-fit:cover; border-radius:4px; border:2px solid #fff;" /></div>` : ""}
        </div>

        <div class="content">
          <div class="sec-title">职业摘要</div>
          <p>${resume.summary}</p>

          <div class="sec-title">核心技能矩阵</div>
          <div>${resume.coreSkills.map((s) => `<span class="badge">${s}</span>`).join(" ")}</div>

          <div class="sec-title">工作经历</div>
          ${resume.workExperience
            .map(
              (w) => `
            <div class="item-head"><span>${w.company} · ${w.role}</span><span>${w.period}</span></div>
            <ul>${w.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
          `
            )
            .join("")}

          <div class="sec-title">项目经历</div>
          ${resume.projectExperience
            .map(
              (p) => `
            <div class="item-head"><span>${p.name} · ${p.role}</span><span>${p.period}</span></div>
            <ul>${p.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
          `
            )
            .join("")}

          <div class="sec-title">技能工具</div>
          <p>${resume.skillsAndTools.join(" · ")}</p>

          <div class="sec-title">教育背景</div>
          <p>${resume.education.school} · ${resume.education.degree} · ${resume.education.period}</p>
        </div>
      </body>
      </html>
    `;
  }

  // 3. Grid Cards Template
  if (templateId === "grid-cards") {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${p.name} - 简历</title>
        <style>
          @page { size: A4; margin: 8mm; }
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: 13.5px; line-height: 1.65; color: #334155; margin: 0; padding: 10px; background: #fff; }
          .card-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; margin-bottom: 14px; page-break-inside: avoid; break-inside: avoid; }
          .card-box:last-child { margin-bottom: 0 !important; }
          .name { font-size: 22px; font-weight: 700; color: #0f172a; }
          .contact { font-size: 12.5px; color: #64748b; margin-top: 4px; }
          .sec-title { font-size: 13.5px; font-weight: 700; color: #059669; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
          .item-head { display: flex; justify-content: space-between; font-weight: 600; font-size: 14px; margin-top: 8px; color: #0f172a; }
          .pill { display: inline-block; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 3px 10px; border-radius: 12px; font-size: 12px; margin: 3px 4px 3px 0; }
          ul { margin: 6px 0 8px 0; padding-left: 18px; }
          li { margin-bottom: 4px; color: #334155; line-height: 1.6; }
          p { margin: 4px 0; line-height: 1.65; }
        </style>
      </head>
      <body>
        <div class="card-box" style="background:#ecfdf5; border-color:#a7f3d0; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div class="name" style="color:#065f46;">${p.name}</div>
            <div class="contact" style="color:#047857;">${p.email} | ${p.phone} | ${p.location} | 意向：${resume.jobIntent}</div>
          </div>
          ${avatarTag ? `<div>${avatarTag}</div>` : ""}
        </div>

        <div class="card-box">
          <div class="sec-title">职业摘要</div>
          <p>${resume.summary}</p>
        </div>

        <div class="card-box">
          <div class="sec-title">核心技能</div>
          <div>${resume.coreSkills.map((s) => `<span class="pill">${s}</span>`).join(" ")}</div>
        </div>

        <div class="card-box">
          <div class="sec-title">工作经历</div>
          ${resume.workExperience
            .map(
              (w) => `
            <div class="item-head"><span>${w.company} · ${w.role}</span><span>${w.period}</span></div>
            <ul>${w.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
          `
            )
            .join("")}
        </div>

        <div class="card-box">
          <div class="sec-title">项目经历</div>
          ${resume.projectExperience
            .map(
              (p) => `
            <div class="item-head"><span>${p.name} · ${p.role}</span><span>${p.period}</span></div>
            <ul>${p.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
          `
            )
            .join("")}
        </div>

        <div class="card-box">
          <div class="sec-title">技能工具 & 教育背景</div>
          <p><strong>技能：</strong>${resume.skillsAndTools.join(" · ")}</p>
          <p style="margin-top:6px;"><strong>教育：</strong>${resume.education.school} · ${resume.education.degree} (${resume.education.period})</p>
        </div>
      </body>
      </html>
    `;
  }

  // Default Modern Sidebar Layout
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${p.name} - 简历</title>
      <style>
        @page { size: A4; margin: 8mm; }
        * { box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; font-size: 13.5px; line-height: 1.6; color: #334155; margin: 0; padding: 0; background: #fff; }
        .container { display: table; width: 100%; height: auto; table-layout: fixed; }
        .sidebar { display: table-cell; width: 31%; background: #f8fafc; border-right: 1px solid #e2e8f0; padding: 24px 18px; vertical-align: top; }
        .main { display: table-cell; width: 69%; padding: 24px 24px; vertical-align: top; }
        .name { font-size: 22px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0; }
        .role { font-size: 12px; font-weight: 600; color: #2563eb; margin-bottom: 16px; text-transform: uppercase; }
        .sidebar-section { margin-bottom: 22px; }
        .sidebar-title { font-size: 12px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 10px; }
        .contact-item { font-size: 12px; color: #475569; margin-bottom: 8px; word-break: break-all; }
        .badge { display: inline-block; background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 4px; font-size: 11.5px; margin: 2px 2px 2px 0; }
        .main-title { font-size: 14px; font-weight: 700; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 22px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .main-title:first-child { margin-top: 0; }
        .item-header { display: flex; justify-content: space-between; font-weight: 600; font-size: 14px; margin-top: 12px; color: #0f172a; }
        ul { margin: 6px 0 12px 0; padding-left: 16px; }
        li { margin-bottom: 5px; color: #334155; line-height: 1.6; }
        p { margin: 6px 0; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="sidebar">
          ${avatarTag ? `<div style="margin-bottom: 14px;">${avatarTag}</div>` : ""}
          <div class="name">${p.name}</div>
          <div class="role">${resume.jobIntent}</div>

          <div class="sidebar-section">
            <div class="sidebar-title">联系方式</div>
            <div class="contact-item">📧 ${p.email}</div>
            <div class="contact-item">📱 ${p.phone}</div>
            <div class="contact-item">📍 ${p.location}</div>
          </div>

          <div class="sidebar-section">
            <div class="sidebar-title">核心能力</div>
            ${resume.coreSkills.map((s) => `<span class="badge">${s}</span>`).join(" ")}
          </div>

          <div class="sidebar-section">
            <div class="sidebar-title">技能工具</div>
            <p style="font-size:12px; color:#475569; line-height:1.6;">${resume.skillsAndTools.join(" · ")}</p>
          </div>

          <div class="sidebar-section">
            <div class="sidebar-title">教育背景</div>
            <p style="font-size:12px; font-weight:600; margin-bottom:3px;">${resume.education.school}</p>
            <p style="font-size:11px; color:#64748b;">${resume.education.degree} (${resume.education.period})</p>
          </div>
        </div>

        <div class="main">
          <div class="main-title">职业摘要</div>
          <p>${resume.summary}</p>

          <div class="main-title">工作经历</div>
          ${resume.workExperience
            .map(
              (w) => `
            <div class="item-header"><span>${w.company} · ${w.role}</span><span>${w.period}</span></div>
            <ul>${w.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
          `
            )
            .join("")}

          <div class="main-title">项目经历</div>
          ${resume.projectExperience
            .map(
              (p) => `
            <div class="item-header"><span>${p.name} · ${p.role}</span><span>${p.period}</span></div>
            <ul>${p.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
          `
            )
            .join("")}
        </div>
      </div>
    </body>
    </html>
  `;
}

export const DEFAULT_CUSTOM_TEMPLATE_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{姓名}} - 自定义简历模板</title>
  <style>
    @page { size: A4; margin: 8mm; }
    body { font-family: sans-serif; padding: 24px; color: #1e293b; line-height: 1.65; }
    h1 { color: #2563eb; margin-bottom: 4px; }
    .contact { font-size: 13px; color: #64748b; margin-bottom: 16px; border-bottom: 2px solid #2563eb; padding-bottom: 8px; }
    .section-title { font-weight: bold; font-size: 15px; color: #0f172a; margin-top: 22px; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div>{{证件照}}</div>
  <h1>{{姓名}}</h1>
  <div class="contact">{{邮箱}} | {{电话}} | {{城市}} | 意向：{{求职意向}}</div>

  <div class="section-title">📌 职业摘要</div>
  <p>{{职业摘要}}</p>

  <div class="section-title">⚡ 核心能力</div>
  <div>{{核心能力}}</div>

  <div class="section-title">💼 工作经历</div>
  <div>{{工作经历}}</div>

  <div class="section-title">🚀 项目经历</div>
  <div>{{项目经历}}</div>

  <div class="section-title">🛠 技能工具</div>
  <p>{{技能工具}}</p>

  <div class="section-title">🎓 教育背景</div>
  <p>{{教育背景}}</p>
</body>
</html>`;
