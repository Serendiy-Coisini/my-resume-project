import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function formatResumeAsText(resume: import("@/types/resume").FinalResume): string {
  const lines: string[] = [];

  lines.push(resume.personalInfo.name);
  lines.push(
    `${resume.personalInfo.email} | ${resume.personalInfo.phone} | ${resume.personalInfo.location}`
  );
  lines.push("");
  lines.push(`求职意向：${resume.jobIntent}`);
  lines.push("");
  lines.push("职业摘要");
  lines.push(resume.summary);
  lines.push("");
  lines.push("核心能力");
  resume.coreSkills.forEach((s) => lines.push(`• ${s}`));
  lines.push("");
  lines.push("工作经历");
  resume.workExperience.forEach((w) => {
    lines.push(`${w.company} | ${w.role} | ${w.period}`);
    w.bullets.forEach((b) => lines.push(`  • ${b}`));
    lines.push("");
  });
  lines.push("项目经历");
  resume.projectExperience.forEach((p) => {
    lines.push(`${p.name} | ${p.role} | ${p.period}`);
    p.bullets.forEach((b) => lines.push(`  • ${b}`));
    lines.push("");
  });
  lines.push("技能工具");
  lines.push(resume.skillsAndTools.join(" · "));
  lines.push("");
  lines.push("教育背景");
  lines.push(`${resume.education.school} | ${resume.education.degree} | ${resume.education.period}`);

  return lines.join("\n");
}
