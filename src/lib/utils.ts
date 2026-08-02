import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { renderTemplateHTML, type TemplateId } from "./resume-templates";

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

export function exportResumeAsWord(
  resume: import("@/types/resume").FinalResume,
  templateId: TemplateId = "modern-sidebar",
  customTemplateHTML?: string,
  options?: import("./resume-templates").TemplateOptions
) {
  const innerHtml = renderTemplateHTML(resume, templateId, customTemplateHTML, options);
  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    ${innerHtml}
    </html>
  `;

  const blob = new Blob(["\ufeff" + htmlContent], {
    type: "application/msword;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${resume.personalInfo.name}_个人简历.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportResumeAsPDF(
  resume: import("@/types/resume").FinalResume,
  templateId: TemplateId = "modern-sidebar",
  customTemplateHTML?: string,
  options?: import("./resume-templates").TemplateOptions
) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const docTitle = `${resume.personalInfo.name}_个人简历`;
  const htmlContent = renderTemplateHTML(resume, templateId, customTemplateHTML, options);

  const printStyle = `
    <style>
      @page {
        size: A4;
        margin: 4mm !important;
      }
      @media print {
        html, body {
          width: 100% !important;
          height: 100% !important;
          min-height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: visible !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          background: #ffffff !important;
        }
        .container {
          display: table !important;
          width: 100% !important;
          height: 100% !important;
          min-height: 100% !important;
        }
        .sidebar {
          display: table-cell !important;
          background-color: #f8fafc !important;
          border-right: 1px solid #e2e8f0 !important;
          height: 100% !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .main {
          display: table-cell !important;
          height: 100% !important;
        }
        .work-item, .project-item, .tl-item, .card-box, .sec-title, .sidebar-section {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        body > *:last-child,
        div:last-child,
        p:last-child,
        .card-box:last-child {
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
      }
    </style>
  `;

  const printScript = `
    <script>
      document.title = "${docTitle}";
      window.addEventListener('load', function() {
        var imgs = document.getElementsByTagName('img');
        var promises = [];
        for (var i = 0; i < imgs.length; i++) {
          if (!imgs[i].complete) {
            promises.push(new Promise(function(resolve) {
              imgs[i].onload = resolve;
              imgs[i].onerror = resolve;
            }));
          }
        }
        Promise.all(promises).then(function() {
          setTimeout(function() {
            window.print();
          }, 350);
        });
      });
    </script>
  `;

  const contentWithPrint = htmlContent
    .replace("<title>", `<title>${docTitle}</title><style>`)
    .replace("</head>", `${printStyle}</head>`)
    .replace("</body>", `${printScript}</body>`);

  printWindow.document.write(contentWithPrint);
  printWindow.document.title = docTitle;
  printWindow.document.close();
}
