import type { AnalysisResult, UserInput, TemplateId } from '@/types/resume';
import type { TemplateOptions } from '@/lib/resume-templates';
import { DEFAULT_TEMPLATE_OPTIONS } from '@/lib/resume-templates';
import type { IHJSchema, IWidget } from '@/types/lego';

function resolveEffectiveTemplateId(
  templateId: TemplateId,
  customTemplateHTML?: string
): TemplateId {
  if (templateId !== 'custom') return templateId;
  if (!customTemplateHTML) return 'modern-sidebar';

  const htmlLower = customTemplateHTML.toLowerCase();
  if (
    htmlLower.includes('layout-single-column') ||
    htmlLower.includes('header-center') ||
    htmlLower.includes('single-column')
  ) {
    return 'classic-minimal';
  }
  if (
    htmlLower.includes('layout-corporate-banner') ||
    htmlLower.includes('corporate-banner') ||
    htmlLower.includes('top-banner')
  ) {
    return 'corporate-banner';
  }
  if (
    htmlLower.includes('layout-timeline-tech') ||
    htmlLower.includes('timeline-container') ||
    htmlLower.includes('timeline')
  ) {
    return 'timeline-tech';
  }
  if (
    htmlLower.includes('layout-grid-cards') ||
    htmlLower.includes('grid-cards')
  ) {
    return 'grid-cards';
  }
  if (
    htmlLower.includes('layout-modern-sidebar') ||
    htmlLower.includes('sidebar')
  ) {
    return 'modern-sidebar';
  }

  return 'classic-minimal';
}

export function buildLegoSchemaFromResume(
  userInput: UserInput,
  analysisResult?: AnalysisResult | null,
  templateId: TemplateId = 'modern-sidebar',
  options: TemplateOptions = DEFAULT_TEMPLATE_OPTIONS,
  _customTemplateHTML?: string
): IHJSchema {
  const finalResume = analysisResult?.finalResume;

  const name = finalResume?.personalInfo?.name || '求职者';
  const jobIntent = finalResume?.jobIntent || userInput.targetRole || '软件工程师';
  const email = finalResume?.personalInfo?.email || 'user@example.com';
  const phone = finalResume?.personalInfo?.phone || '138-0000-0000';
  const location = finalResume?.personalInfo?.location || '北京';

  const summary =
    finalResume?.summary ||
    userInput.additionalInfo ||
    '具备扎实的专业基础与丰富的项目实践经验，善于解决复杂工程难题，注重团队协同与效率产出。';

  const workList = finalResume?.workExperience && finalResume.workExperience.length > 0
    ? finalResume.workExperience
    : [
        {
          company: '科技创新有限公司',
          role: jobIntent,
          period: '2022.03 - 至今',
          bullets: [
            '主导核心模块架构重构，提升业务处理吞吐量超过 35%。',
            '跨团队协同推进项目落地，保障上线按时交付率达到 98%。'
          ]
        }
      ];

  const projectList = finalResume?.projectExperience && finalResume.projectExperience.length > 0
    ? finalResume.projectExperience
    : [
        {
          name: '高并发业务中台升级',
          role: '核心研发工程师',
          period: '2023.01 - 2023.08',
          bullets: [
            '设计实现分布缓存方案，压测 QPS 提升至 10,000+。',
            '编写自动化测试套件，降低测试缺陷遗留率 40%。'
          ]
        }
      ];

  const skills = finalResume?.skillsAndTools && finalResume.skillsAndTools.length > 0
    ? finalResume.skillsAndTools
    : userInput.highlightSkills
    ? userInput.highlightSkills.split(/[,，\n]/).filter(Boolean)
    : ['JavaScript / TypeScript', 'React / Next.js', 'Node.js', 'Tailwind CSS', 'Git'];

  const edu = finalResume?.education || {
    school: '清华大学',
    degree: '本科',
    period: '2023.09 - 2027.06'
  };


  const avatarUrl = finalResume?.personalInfo?.avatarUrl || userInput.avatarUrl || '';
  const hasAvatar = Boolean(avatarUrl);

  const themeColor = options.themeColor || '#1e3a8a';
  const isCircleAvatar = options.avatarShape === 'circle';
  const avatarWidth = isCircleAvatar ? 85 : 95;
  const avatarHeight = isCircleAvatar ? 85 : 120;
  const avatarRadius = isCircleAvatar ? 50 : 4;

  const children: IWidget[] = [];
  let currentTop = 40;

  const effectiveTemplateId = resolveEffectiveTemplateId(templateId, _customTemplateHTML);

  // -------------------------------------------------------------
  // LAYOUT 1: Double Column Left Sidebar (1.3 简历 / 现代双栏型)
  // -------------------------------------------------------------
  if (effectiveTemplateId === 'modern-sidebar') {
    // Left Sidebar Background
    children.push({
      id: 'widget-sidebar-bg',
      componentName: 'hj-rectangle',
      title: '左侧边栏背景框',
      css: {
        left: 20,
        top: 20,
        width: 250,
        height: 1100,
        zIndex: 1,
        backgroundColor: '#f1f5f9',
        borderColor: '#cbd5e1',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8,
        padding: { top: 0, right: 0, bottom: 0, left: 0 }
      },
      dataSource: {}
    });

    if (hasAvatar) {
      children.push({
        id: 'widget-avatar-sidebar',
        componentName: 'hj-avatar-1',
        title: '个人头像照片',
        css: {
          left: isCircleAvatar ? 102 : 97,
          top: 40,
          width: avatarWidth,
          height: avatarHeight,
          zIndex: 2,
          backgroundColor: '#e2e8f0',
          borderWidth: 1,
          borderColor: '#cbd5e1',
          borderStyle: 'solid',
          borderRadius: avatarRadius
        },
        dataSource: { avatarSrc: avatarUrl }
      });
    }

    const nameTop = hasAvatar ? (isCircleAvatar ? 140 : 175) : 45;

    // Name
    children.push({
      id: 'widget-name-sidebar',
      componentName: 'hj-text-1',
      title: '姓名',
      css: {
        left: 30,
        top: nameTop,
        width: 230,
        height: 38,
        zIndex: 2,
        fontColor: '#0f172a',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
      },
      dataSource: { text: name }
    });

    // Intent
    children.push({
      id: 'widget-intent-sidebar',
      componentName: 'hj-text-1',
      title: '求职意向',
      css: {
        left: 30,
        top: nameTop + 40,
        width: 230,
        height: 30,
        zIndex: 2,
        fontColor: themeColor,
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
      },
      dataSource: { text: `🎯 意向：${jobIntent}` }
    });

    // Contact Card
    children.push({
      id: 'widget-contact-bg-sidebar',
      componentName: 'hj-rectangle',
      title: '基本信息框',
      css: {
        left: 30,
        top: nameTop + 78,
        width: 230,
        height: 145,
        zIndex: 2,
        backgroundColor: '#ffffff',
        borderColor: '#cbd5e1',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 6,
        padding: { top: 10, right: 12, bottom: 10, left: 12 }
      },
      dataSource: {}
    });

    children.push({
      id: 'widget-contact-sidebar-text',
      componentName: 'hj-text-1',
      title: '基本信息列表',
      css: {
        left: 42,
        top: nameTop + 88,
        width: 206,
        height: 125,
        zIndex: 3,
        fontColor: '#334155',
        fontSize: 12,
        lineHeight: 1.6
      },
      dataSource: {
        text: `🏫 院校：${edu.school}\n📞 电话：${phone}\n✉️ 邮箱：${email}\n📍 城市：${location}`
      }
    });

    // Summary Card
    children.push({
      id: 'widget-summary-sidebar-bg',
      componentName: 'hj-rectangle',
      title: '自我评价框',
      css: {
        left: 30,
        top: nameTop + 235,
        width: 230,
        height: 220,
        zIndex: 2,
        backgroundColor: '#ffffff',
        borderColor: '#cbd5e1',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 6,
        padding: { top: 10, right: 12, bottom: 10, left: 12 }
      },
      dataSource: {}
    });

    children.push({
      id: 'widget-summary-sidebar-text',
      componentName: 'hj-text-1',
      title: '自我评价内容',
      css: {
        left: 42,
        top: nameTop + 245,
        width: 206,
        height: 200,
        zIndex: 3,
        fontColor: '#475569',
        fontSize: 11.5,
        lineHeight: 1.65
      },
      dataSource: { text: `【自我评价】\n${summary}` }
    });

    // ---------------- Right Main Column ----------------
    let rightTop = 30;

    // Education Header & Card
    children.push({
      id: 'widget-edu-title-main',
      componentName: 'hj-text-1',
      title: '教育背景标题',
      css: {
        left: 290,
        top: rightTop,
        width: 500,
        height: 30,
        zIndex: 2,
        fontColor: themeColor,
        fontSize: 15,
        fontWeight: 'bold'
      },
      dataSource: { text: '| 教育背景' }
    });

    children.push({
      id: 'widget-edu-content-main',
      componentName: 'hj-text-1',
      title: '教育背景内容',
      css: {
        left: 290,
        top: rightTop + 32,
        width: 500,
        height: 40,
        zIndex: 2,
        fontColor: '#334155',
        fontSize: 13
      },
      dataSource: { text: `${edu.school} · ${edu.degree}  (${edu.period})` }
    });

    rightTop += 85;

    // Work Experience Header & Cards
    children.push({
      id: 'widget-work-title-main',
      componentName: 'hj-text-1',
      title: '工作经历标题',
      css: {
        left: 290,
        top: rightTop,
        width: 500,
        height: 30,
        zIndex: 2,
        fontColor: themeColor,
        fontSize: 15,
        fontWeight: 'bold'
      },
      dataSource: { text: '| 工作与校园经历' }
    });

    rightTop += 34;

    workList.forEach((w, idx) => {
      const formattedBullets = w.bullets.map((b) => (b.trim().startsWith('•') ? b : `• ${b}`)).join('\n');
      const cardHeight = Math.max(100, 45 + w.bullets.length * 26);
      children.push({
        id: `widget-work-card-${idx}`,
        componentName: 'hj-[#exper-1]',
        title: `经历卡片 ${idx + 1}`,
        css: {
          left: 290,
          top: rightTop,
          width: 500,
          height: cardHeight,
          zIndex: 2,
          backgroundColor: '#ffffff',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 6
        },
        dataSource: {
          companyName: w.company,
          jobTitle: w.role,
          workTime: w.period,
          workContent: formattedBullets,
          text: `${w.company} · ${w.role}\n${formattedBullets}`
        }
      });
      rightTop += cardHeight + 14;
    });

    rightTop += 10;

    // Project Experience Header & Cards
    children.push({
      id: 'widget-project-title-main',
      componentName: 'hj-text-1',
      title: '项目经历标题',
      css: {
        left: 290,
        top: rightTop,
        width: 500,
        height: 30,
        zIndex: 2,
        fontColor: themeColor,
        fontSize: 15,
        fontWeight: 'bold'
      },
      dataSource: { text: '| 项目经历' }
    });

    rightTop += 34;

    projectList.forEach((p, idx) => {
      const formattedBullets = p.bullets.map((b) => (b.trim().startsWith('•') ? b : `• ${b}`)).join('\n');
      const cardHeight = Math.max(100, 45 + p.bullets.length * 26);
      children.push({
        id: `widget-project-card-${idx}`,
        componentName: 'hj-[#exper-1]',
        title: `项目卡片 ${idx + 1}`,
        css: {
          left: 290,
          top: rightTop,
          width: 500,
          height: cardHeight,
          zIndex: 2,
          backgroundColor: '#ffffff',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 6
        },
        dataSource: {
          companyName: p.name,
          jobTitle: p.role,
          workTime: p.period,
          workContent: formattedBullets,
          text: `${p.name} · ${p.role}\n${formattedBullets}`
        }
      });
      rightTop += cardHeight + 14;
    });

    rightTop += 10;

    // Skills
    children.push({
      id: 'widget-skills-title-main',
      componentName: 'hj-text-1',
      title: '技能与荣誉标题',
      css: {
        left: 290,
        top: rightTop,
        width: 500,
        height: 30,
        zIndex: 2,
        fontColor: themeColor,
        fontSize: 15,
        fontWeight: 'bold'
      },
      dataSource: { text: '| 核心能力与技能工具' }
    });

    children.push({
      id: 'widget-skills-content-main',
      componentName: 'hj-text-1',
      title: '技能工具清单',
      css: {
        left: 290,
        top: rightTop + 34,
        width: 500,
        height: 70,
        zIndex: 2,
        fontColor: '#334155',
        fontSize: 12.5,
        lineHeight: 1.6
      },
      dataSource: { text: skills.join('  ·  ') }
    });

    currentTop = Math.max(1120, rightTop + 100);

    return {
      id: `lego-resume-sidebar-${Date.now()}`,
      version: '1.0.0',
      componentsTree: [{ id: 'page-1', componentName: 'page', commentType: 'page', children }],
      css: { width: 820, height: currentTop, background: '#ffffff', opacity: 1, fontFamily: 'Inter, sans-serif', themeColor },
      config: { title: `${name} 的【1.3 双栏侧边栏】积木简历` }
    };
  }

  // -------------------------------------------------------------
  // LAYOUT 2: Corporate Banner (商务 Header 沉稳范)
  // -------------------------------------------------------------
  if (effectiveTemplateId === 'corporate-banner') {
    // Dark Top Banner
    children.push({
      id: 'widget-banner-bg',
      componentName: 'hj-rectangle',
      title: '顶部商务 Banner 框',
      css: {
        left: 25,
        top: 25,
        width: 770,
        height: 145,
        zIndex: 1,
        backgroundColor: themeColor,
        borderColor: themeColor,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        padding: { top: 0, right: 0, bottom: 0, left: 0 }
      },
      dataSource: {}
    });

    if (hasAvatar) {
      children.push({
        id: 'widget-banner-avatar',
        componentName: 'hj-avatar-1',
        title: '个人头像照片',
        css: {
          left: 660,
          top: 35,
          width: avatarWidth,
          height: avatarHeight,
          zIndex: 2,
          backgroundColor: '#e2e8f0',
          borderWidth: 2,
          borderColor: '#ffffff',
          borderStyle: 'solid',
          borderRadius: avatarRadius
        },
        dataSource: { avatarSrc: avatarUrl }
      });
    }

    const bannerTextWidth = hasAvatar ? 600 : 700;

    children.push({
      id: 'widget-banner-name',
      componentName: 'hj-text-1',
      title: '姓名',
      css: {
        left: 50,
        top: 45,
        width: bannerTextWidth,
        height: 38,
        zIndex: 2,
        fontColor: '#ffffff',
        fontSize: 26,
        fontWeight: 'bold'
      },
      dataSource: { text: name }
    });

    children.push({
      id: 'widget-banner-contact',
      componentName: 'hj-text-1',
      title: '意向与联系方式',
      css: {
        left: 50,
        top: 88,
        width: bannerTextWidth,
        height: 60,
        zIndex: 2,
        fontColor: '#bfdbfe',
        fontSize: 13,
        lineHeight: 1.6
      },
      dataSource: { text: `求职意向：${jobIntent}\n${email}  |  ${phone}  |  ${location}` }
    });

    let topPos = 190;

    // 1. Summary
    children.push({
      id: 'widget-corp-summary-title',
      componentName: 'hj-text-1',
      title: '职业摘要标题',
      css: { left: 30, top: topPos, width: 760, height: 30, zIndex: 2, fontColor: themeColor, fontSize: 16, fontWeight: 'bold' },
      dataSource: { text: '📌 职业摘要' }
    });
    topPos += 32;

    children.push({
      id: 'widget-corp-summary-content',
      componentName: 'hj-text-1',
      title: '职业摘要内容',
      css: { left: 30, top: topPos, width: 760, height: 60, zIndex: 2, fontColor: '#334155', fontSize: 13, lineHeight: 1.6 },
      dataSource: { text: summary }
    });
    topPos += 75;

    // 2. Core Skills
    children.push({
      id: 'widget-corp-skills-title',
      componentName: 'hj-text-1',
      title: '核心能力标题',
      css: { left: 30, top: topPos, width: 760, height: 30, zIndex: 2, fontColor: themeColor, fontSize: 16, fontWeight: 'bold' },
      dataSource: { text: '⚡ 核心能力与技能工具' }
    });
    topPos += 34;

    let skillX = 30;
    let skillY = topPos;
    skills.forEach((sk, sIdx) => {
      const tagW = Math.max(85, sk.length * 11 + 22);
      if (skillX + tagW > 780) {
        skillX = 30;
        skillY += 34;
      }
      children.push({
        id: `widget-corp-skill-${sIdx}`,
        componentName: 'hj-rectangle',
        title: `技能标签 ${sIdx + 1}`,
        css: {
          left: skillX,
          top: skillY,
          width: tagW,
          height: 27,
          zIndex: 2,
          backgroundColor: '#eff6ff',
          borderColor: '#bfdbfe',
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 14,
          fontColor: themeColor,
          fontSize: 12,
          fontWeight: '500',
          textAlign: 'center'
        },
        dataSource: { text: sk }
      });
      skillX += tagW + 8;
    });
    topPos = skillY + 45;

    // 3. Work Experience
    children.push({
      id: 'widget-corp-work-title',
      componentName: 'hj-text-1',
      title: '工作经历标题',
      css: { left: 30, top: topPos, width: 760, height: 30, zIndex: 2, fontColor: themeColor, fontSize: 16, fontWeight: 'bold' },
      dataSource: { text: '💼 工作与校园经历' }
    });
    topPos += 34;

    workList.forEach((w, idx) => {
      const formattedBullets = w.bullets.map((b) => (b.trim().startsWith('•') ? b : `• ${b}`)).join('\n');
      const cardHeight = Math.max(100, 45 + w.bullets.length * 28);
      children.push({
        id: `widget-corp-work-${idx}`,
        componentName: 'hj-[#exper-1]',
        title: `工作卡片 ${idx + 1}`,
        css: {
          left: 30,
          top: topPos,
          width: 760,
          height: cardHeight,
          zIndex: 2,
          backgroundColor: '#ffffff',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 6
        },
        dataSource: {
          companyName: w.company,
          jobTitle: w.role,
          workTime: w.period,
          workContent: formattedBullets,
          text: `${w.company} · ${w.role}\n${formattedBullets}`
        }
      });
      topPos += cardHeight + 14;
    });
    topPos += 10;

    // 4. Project Experience
    children.push({
      id: 'widget-corp-proj-title',
      componentName: 'hj-text-1',
      title: '项目经历标题',
      css: { left: 30, top: topPos, width: 760, height: 30, zIndex: 2, fontColor: themeColor, fontSize: 16, fontWeight: 'bold' },
      dataSource: { text: '🚀 项目经历' }
    });
    topPos += 34;

    projectList.forEach((p, idx) => {
      const formattedBullets = p.bullets.map((b) => (b.trim().startsWith('•') ? b : `• ${b}`)).join('\n');
      const cardHeight = Math.max(100, 45 + p.bullets.length * 28);
      children.push({
        id: `widget-corp-proj-${idx}`,
        componentName: 'hj-[#exper-1]',
        title: `项目卡片 ${idx + 1}`,
        css: {
          left: 30,
          top: topPos,
          width: 760,
          height: cardHeight,
          zIndex: 2,
          backgroundColor: '#ffffff',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 6
        },
        dataSource: {
          companyName: p.name,
          jobTitle: p.role,
          workTime: p.period,
          workContent: formattedBullets,
          text: `${p.name} · ${p.role}\n${formattedBullets}`
        }
      });
      topPos += cardHeight + 14;
    });
    topPos += 10;

    // 5. Education
    children.push({
      id: 'widget-corp-edu-title',
      componentName: 'hj-text-1',
      title: '教育背景标题',
      css: { left: 30, top: topPos, width: 760, height: 30, zIndex: 2, fontColor: themeColor, fontSize: 16, fontWeight: 'bold' },
      dataSource: { text: '🎓 教育背景' }
    });
    topPos += 34;

    children.push({
      id: 'widget-corp-edu-content',
      componentName: 'hj-text-1',
      title: '教育背景内容',
      css: { left: 30, top: topPos, width: 760, height: 30, zIndex: 2, fontColor: '#334155', fontSize: 13 },
      dataSource: { text: `${edu.school}  ·  ${edu.degree}  ·  ${edu.period}` }
    });
    topPos += 45;

    return {
      id: `lego-resume-corporate-${Date.now()}`,
      version: '1.0.0',
      componentsTree: [{ id: 'page-1', componentName: 'page', commentType: 'page', children }],
      css: {
        width: 820,
        height: Math.max(1160, topPos + 40),
        background: '#ffffff',
        opacity: 1,
        fontFamily: 'Inter, sans-serif',
        themeColor
      },
      config: {
        title: `${name} 的【商务 Header 沉稳范】积木简历`
      }
    };
  }

  // -------------------------------------------------------------
  // LAYOUT 3: Timeline Tech (时间轴极客型 100% 还原)
  // -------------------------------------------------------------
  if (effectiveTemplateId === 'timeline-tech') {
    let topPos = 25;

    // Top Header
    children.push({
      id: 'widget-timeline-name',
      componentName: 'hj-text-1',
      title: '姓名',
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: 32,
        zIndex: 2,
        fontColor: '#0f172a',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left'
      },
      dataSource: { text: name }
    });
    topPos += 34;

    children.push({
      id: 'widget-timeline-contact',
      componentName: 'hj-text-1',
      title: '联系方式与意向',
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: 22,
        zIndex: 2,
        fontColor: '#64748b',
        fontSize: 12,
        textAlign: 'left'
      },
      dataSource: { text: `${email}  |  ${phone}  |  ${location}  |  求职意向：${jobIntent}` }
    });
    topPos += 26;

    // Header Bottom Accent Line
    children.push({
      id: 'widget-timeline-header-line',
      componentName: 'hj-rectangle',
      title: 'Header 下划线',
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: 2,
        zIndex: 2,
        backgroundColor: themeColor,
        borderWidth: 0
      },
      dataSource: {}
    });
    topPos += 18;

    // Helper for Section Titles
    const addTimelineSectionTitle = (titleText: string, idPrefix: string) => {
      children.push({
        id: `widget-tl-sec-title-${idPrefix}`,
        componentName: 'hj-text-1',
        title: `${titleText}标题`,
        css: {
          left: 30,
          top: topPos,
          width: 760,
          height: 24,
          zIndex: 2,
          fontColor: themeColor,
          fontSize: 13.5,
          fontWeight: 'bold',
          textAlign: 'left'
        },
        dataSource: { text: titleText }
      });
      topPos += 30;
    };

    // 1. Summary
    addTimelineSectionTitle('// 01. 职业摘要', 'summary');
    children.push({
      id: 'widget-summary-tl-content',
      componentName: 'hj-text-1',
      title: '职业摘要内容',
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: 55,
        zIndex: 2,
        fontColor: '#334155',
        fontSize: 12.5,
        lineHeight: 1.6,
        textAlign: 'left'
      },
      dataSource: { text: summary }
    });
    topPos += 68;

    // 2. Core Skills
    addTimelineSectionTitle('// 02. 核心能力与技能工具', 'coreskills');
    let skillX = 30;
    let skillY = topPos;
    skills.forEach((sk, sIdx) => {
      const tagW = Math.max(65, Math.min(360, sk.length * 10 + 20));
      if (skillX + tagW > 780) {
        skillX = 30;
        skillY += 30;
      }
      children.push({
        id: `widget-skill-tl-${sIdx}`,
        componentName: 'hj-rectangle',
        title: `技能 ${sIdx + 1}`,
        css: {
          left: skillX,
          top: skillY,
          width: tagW,
          height: 24,
          zIndex: 2,
          backgroundColor: '#f1f5f9',
          borderColor: '#cbd5e1',
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 4,
          fontColor: themeColor,
          fontSize: 11.5,
          textAlign: 'center'
        },
        dataSource: { text: sk }
      });
      skillX += tagW + 8;
    });
    topPos = skillY + 38;

    // 3. Work Experience (With Timeline Line & Dots)
    addTimelineSectionTitle('// 03. 工作经历', 'work');
    const workLineTop = topPos + 4;
    let workCurrentY = topPos;

    workList.forEach((w, idx) => {
      const formattedBullets = w.bullets.map((b) => (b.trim().startsWith('•') ? b : `• ${b}`)).join('\n');
      const cardHeight = Math.max(85, 38 + w.bullets.length * 24);

      // Circle Node Dot
      children.push({
        id: `widget-tl-dot-work-${idx}`,
        componentName: 'hj-circle',
        title: '时间轴节点',
        css: {
          left: 44.5,
          top: workCurrentY + 6,
          width: 9,
          height: 9,
          zIndex: 3,
          backgroundColor: themeColor
        },
        dataSource: {}
      });

      // Work Card (Indented to left: 68 to NOT overlap with line!)
      children.push({
        id: `widget-work-tl-${idx}`,
        componentName: 'hj-[#exper-1]',
        title: `工作 ${idx + 1}`,
        css: {
          left: 68,
          top: workCurrentY,
          width: 722,
          height: cardHeight,
          zIndex: 2,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
          textAlign: 'left'
        },
        dataSource: {
          companyName: w.company,
          jobTitle: w.role,
          workTime: w.period,
          workContent: formattedBullets,
          text: `${w.company} · ${w.role}\n${formattedBullets}`
        }
      });
      workCurrentY += cardHeight + 10;
    });

    // Timeline Line for Work Section Only
    const workLineHeight = Math.max(40, workCurrentY - workLineTop - 10);
    children.push({
      id: 'widget-timeline-line-work',
      componentName: 'hj-rectangle',
      title: '工作经历时间轴线',
      css: {
        left: 48,
        top: workLineTop,
        width: 2,
        height: workLineHeight,
        zIndex: 1,
        backgroundColor: '#cbd5e1',
        borderWidth: 0
      },
      dataSource: {}
    });

    topPos = workCurrentY + 10;

    // 4. Project Experience (With Timeline Line & Dots)
    addTimelineSectionTitle('// 04. 项目经历', 'project');
    const projLineTop = topPos + 4;
    let projCurrentY = topPos;

    projectList.forEach((p, idx) => {
      const formattedBullets = p.bullets.map((b) => (b.trim().startsWith('•') ? b : `• ${b}`)).join('\n');
      const cardHeight = Math.max(85, 38 + p.bullets.length * 24);

      // Circle Node Dot
      children.push({
        id: `widget-tl-dot-proj-${idx}`,
        componentName: 'hj-circle',
        title: '时间轴节点',
        css: {
          left: 44.5,
          top: projCurrentY + 6,
          width: 9,
          height: 9,
          zIndex: 3,
          backgroundColor: themeColor
        },
        dataSource: {}
      });

      // Project Card (Indented to left: 68)
      children.push({
        id: `widget-project-tl-${idx}`,
        componentName: 'hj-[#exper-1]',
        title: `项目 ${idx + 1}`,
        css: {
          left: 68,
          top: projCurrentY,
          width: 722,
          height: cardHeight,
          zIndex: 2,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
          textAlign: 'left'
        },
        dataSource: {
          companyName: p.name,
          jobTitle: p.role,
          workTime: p.period,
          workContent: formattedBullets,
          text: `${p.name} · ${p.role}\n${formattedBullets}`
        }
      });
      projCurrentY += cardHeight + 10;
    });

    // Timeline Line for Project Section Only
    const projLineHeight = Math.max(40, projCurrentY - projLineTop - 10);
    children.push({
      id: 'widget-timeline-line-proj',
      componentName: 'hj-rectangle',
      title: '项目经历时间轴线',
      css: {
        left: 48,
        top: projLineTop,
        width: 2,
        height: projLineHeight,
        zIndex: 1,
        backgroundColor: '#cbd5e1',
        borderWidth: 0
      },
      dataSource: {}
    });

    topPos = projCurrentY + 10;

    // 5. Education
    addTimelineSectionTitle('// 05. 教育背景', 'education');
    children.push({
      id: 'widget-edu-tl-content',
      componentName: 'hj-text-1',
      title: '教育背景信息',
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: 30,
        zIndex: 2,
        fontColor: '#334155',
        fontSize: 12.5,
        textAlign: 'left'
      },
      dataSource: { text: `${edu.school}  ·  ${edu.degree}  ·  ${edu.period}` }
    });
    topPos += 45;

    return {
      id: `lego-resume-timeline-${Date.now()}`,
      version: '1.0.0',
      componentsTree: [{ id: 'page-1', componentName: 'page', commentType: 'page', children }],
      css: {
        width: 820,
        height: Math.max(1160, topPos + 40),
        background: '#ffffff',
        opacity: 1,
        fontFamily: 'Inter, sans-serif',
        themeColor
      },
      config: {
        title: `${name} 的【时间轴极客型】积木简历`
      }
    };
  }

  // -------------------------------------------------------------
  // LAYOUT 4: Grid Cards (微阴影卡片流)
  // -------------------------------------------------------------
  if (effectiveTemplateId === 'grid-cards') {
    // Header Card
    children.push({
      id: 'widget-grid-header-bg',
      componentName: 'hj-rectangle',
      title: '顶部卡片',
      css: {
        left: 25,
        top: 25,
        width: 770,
        height: 120,
        zIndex: 1,
        backgroundColor: '#f0fdf4',
        borderColor: '#bbf7d0',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10
      },
      dataSource: {}
    });

    if (hasAvatar) {
      children.push({
        id: 'widget-grid-avatar',
        componentName: 'hj-avatar-1',
        title: '个人头像照片',
        css: {
          left: 670,
          top: 35,
          width: avatarWidth,
          height: avatarHeight,
          zIndex: 2,
          borderRadius: avatarRadius
        },
        dataSource: { avatarSrc: avatarUrl }
      });
    }

    children.push({
      id: 'widget-grid-name',
      componentName: 'hj-text-1',
      title: '姓名',
      css: {
        left: 45,
        top: 40,
        width: 600,
        height: 36,
        zIndex: 2,
        fontColor: themeColor,
        fontSize: 24,
        fontWeight: 'bold'
      },
      dataSource: { text: name }
    });

    children.push({
      id: 'widget-grid-contact',
      componentName: 'hj-text-1',
      title: '联系方式',
      css: {
        left: 45,
        top: 80,
        width: 600,
        height: 40,
        zIndex: 2,
        fontColor: '#047857',
        fontSize: 12.5
      },
      dataSource: { text: `${email}  |  ${phone}  |  ${location}  |  意向：${jobIntent}` }
    });

    currentTop = 160;
  }

  // -------------------------------------------------------------
  // LAYOUT: Classic Minimal (经典极简单栏 100% 保真还原)
  // -------------------------------------------------------------
  if (effectiveTemplateId === 'classic-minimal') {
    let topPos = 25;

    if (hasAvatar) {
      children.push({
        id: 'widget-avatar-classic',
        componentName: 'hj-avatar-1',
        title: '个人头像',
        css: {
          left: isCircleAvatar ? 367 : 362,
          top: topPos,
          width: isCircleAvatar ? 80 : 85,
          height: isCircleAvatar ? 80 : 105,
          zIndex: 2,
          borderRadius: avatarRadius
        },
        dataSource: { avatarSrc: avatarUrl }
      });
      topPos += isCircleAvatar ? 90 : 115;
    }

    // Centered Name
    children.push({
      id: 'widget-name-classic',
      componentName: 'hj-text-1',
      title: '姓名',
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: 32,
        zIndex: 2,
        fontColor: themeColor,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
      },
      dataSource: { text: name }
    });
    topPos += 36;

    // Centered Job Intent
    children.push({
      id: 'widget-intent-classic',
      componentName: 'hj-text-1',
      title: '求职意向',
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: 22,
        zIndex: 2,
        fontColor: '#475569',
        fontSize: 12.5,
        fontWeight: '600',
        textAlign: 'center'
      },
      dataSource: { text: `求职意向：${jobIntent}` }
    });
    topPos += 24;

    // Centered Contact Line
    children.push({
      id: 'widget-contact-classic',
      componentName: 'hj-text-1',
      title: '联系方式',
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: 22,
        zIndex: 2,
        fontColor: '#64748b',
        fontSize: 12,
        textAlign: 'center'
      },
      dataSource: { text: `${email}  |  ${phone}  |  ${location}` }
    });
    topPos += 28;

    // Header Bottom Accent Line
    children.push({
      id: 'widget-header-border-classic',
      componentName: 'hj-rectangle',
      title: ' Header 底部下划线',
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: 2,
        zIndex: 2,
        backgroundColor: themeColor,
        borderColor: themeColor,
        borderWidth: 0
      },
      dataSource: {}
    });
    topPos += 16;

    // Helper for Section Titles in Classic Minimal
    const addClassicSectionTitle = (titleText: string, idPrefix: string) => {
      children.push({
        id: `widget-sec-title-${idPrefix}`,
        componentName: 'hj-text-1',
        title: `${titleText}标题`,
        css: {
          left: 30,
          top: topPos,
          width: 760,
          height: 24,
          zIndex: 2,
          fontColor: themeColor,
          fontSize: 13.5,
          fontWeight: 'bold',
          textAlign: 'left'
        },
        dataSource: { text: titleText }
      });
      children.push({
        id: `widget-sec-line-${idPrefix}`,
        componentName: 'hj-rectangle',
        title: `${titleText}分割线`,
        css: {
          left: 30,
          top: topPos + 24,
          width: 760,
          height: 1,
          zIndex: 2,
          backgroundColor: '#cbd5e1',
          borderWidth: 0
        },
        dataSource: {}
      });
      topPos += 32;
    };

    // 1. Summary
    addClassicSectionTitle('职业摘要', 'summary');
    children.push({
      id: 'widget-summary-classic-content',
      componentName: 'hj-text-1',
      title: '职业摘要内容',
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: 55,
        zIndex: 2,
        fontColor: '#334155',
        fontSize: 12.5,
        lineHeight: 1.6,
        textAlign: 'left'
      },
      dataSource: { text: summary }
    });
    topPos += 68;

    // 2. Core Skills
    addClassicSectionTitle('核心能力', 'coreskills');
    let skillX = 30;
    let skillY = topPos;
    skills.forEach((sk, sIdx) => {
      const tagW = Math.max(65, Math.min(360, sk.length * 10 + 20));
      if (skillX + tagW > 780) {
        skillX = 30;
        skillY += 30;
      }
      children.push({
        id: `widget-skill-pill-${sIdx}`,
        componentName: 'hj-rectangle',
        title: `技能 ${sIdx + 1}`,
        css: {
          left: skillX,
          top: skillY,
          width: tagW,
          height: 24,
          zIndex: 2,
          backgroundColor: '#f1f5f9',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 4,
          fontColor: '#1e293b',
          fontSize: 11.5,
          textAlign: 'center'
        },
        dataSource: { text: sk }
      });
      skillX += tagW + 8;
    });
    topPos = skillY + 38;

    // 3. Work Experience
    addClassicSectionTitle('工作经历', 'work');
    workList.forEach((w, idx) => {
      const formattedBullets = w.bullets.map((b) => (b.trim().startsWith('•') ? b : `• ${b}`)).join('\n');
      const cardHeight = Math.max(85, 38 + w.bullets.length * 24);
      children.push({
        id: `widget-work-classic-${idx}`,
        componentName: 'hj-[#exper-1]',
        title: `工作 ${idx + 1}`,
        css: {
          left: 30,
          top: topPos,
          width: 760,
          height: cardHeight,
          zIndex: 2,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
          textAlign: 'left'
        },
        dataSource: {
          companyName: w.company,
          jobTitle: w.role,
          workTime: w.period,
          workContent: formattedBullets,
          text: `${w.company} · ${w.role}\n${formattedBullets}`
        }
      });
      topPos += cardHeight + 10;
    });

    topPos += 6;

    // 4. Project Experience
    addClassicSectionTitle('项目经历', 'project');
    projectList.forEach((p, idx) => {
      const formattedBullets = p.bullets.map((b) => (b.trim().startsWith('•') ? b : `• ${b}`)).join('\n');
      const cardHeight = Math.max(85, 38 + p.bullets.length * 24);
      children.push({
        id: `widget-project-classic-${idx}`,
        componentName: 'hj-[#exper-1]',
        title: `项目 ${idx + 1}`,
        css: {
          left: 30,
          top: topPos,
          width: 760,
          height: cardHeight,
          zIndex: 2,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
          textAlign: 'left'
        },
        dataSource: {
          companyName: p.name,
          jobTitle: p.role,
          workTime: p.period,
          workContent: formattedBullets,
          text: `${p.name} · ${p.role}\n${formattedBullets}`
        }
      });
      topPos += cardHeight + 10;
    });

    topPos += 6;

    // 5. Skills & Tools
    addClassicSectionTitle('技能工具', 'skills');
    children.push({
      id: 'widget-skills-classic-content',
      componentName: 'hj-text-1',
      title: '技能工具清单',
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: 40,
        zIndex: 2,
        fontColor: '#334155',
        fontSize: 12.5,
        lineHeight: 1.6,
        textAlign: 'left'
      },
      dataSource: { text: skills.join('  ·  ') }
    });
    topPos += 50;

    // 6. Education
    addClassicSectionTitle('教育背景', 'education');
    children.push({
      id: 'widget-edu-classic-content',
      componentName: 'hj-text-1',
      title: '教育背景信息',
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: 30,
        zIndex: 2,
        fontColor: '#334155',
        fontSize: 12.5,
        textAlign: 'left'
      },
      dataSource: { text: `${edu.school}  ·  ${edu.degree}  ·  ${edu.period}` }
    });
    topPos += 45;

    return {
      id: `lego-resume-classic-${Date.now()}`,
      version: '1.0.0',
      componentsTree: [{ id: 'page-1', componentName: 'page', commentType: 'page', children }],
      css: {
        width: 820,
        height: Math.max(1160, topPos + 40),
        background: '#ffffff',
        opacity: 1,
        fontFamily: 'Inter, sans-serif',
        themeColor
      },
      config: {
        title: `${name} 的【经典极简单栏】积木简历`
      }
    };
  }

  // -------------------------------------------------------------
  // LAYOUT 4 / FALLBACK: Github Tech / Default Single Column
  // -------------------------------------------------------------
  let topPos = 25;

  children.push({
    id: `widget-header-bg`,
    componentName: 'hj-rectangle',
    title: '顶部背景框',
    css: {
      left: 30,
      top: topPos,
      width: 760,
      height: 125,
      zIndex: 1,
      backgroundColor: '#0f172a',
      borderColor: '#334155',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 10
    },
    dataSource: {}
  });

  if (hasAvatar) {
    children.push({
      id: `widget-avatar-main`,
      componentName: 'hj-avatar-1',
      title: '个人头像',
      css: {
        left: 45,
        top: topPos + 12,
        width: avatarWidth,
        height: avatarHeight,
        zIndex: 2,
        backgroundColor: '#e2e8f0',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderStyle: 'solid',
        borderRadius: avatarRadius
      },
      dataSource: { avatarSrc: avatarUrl }
    });
  }

  const textLeftOffset = hasAvatar ? (isCircleAvatar ? 150 : 155) : 50;

  children.push({
    id: `widget-name`,
    componentName: 'hj-text-1',
    title: '姓名',
    css: {
      left: textLeftOffset,
      top: topPos + 15,
      width: 260,
      height: 38,
      zIndex: 2,
      fontColor: '#f8fafc',
      fontSize: 26,
      fontWeight: 'bold'
    },
    dataSource: { text: name }
  });

  children.push({
    id: `widget-job-intent`,
    componentName: 'hj-text-1',
    title: '求职意向',
    css: {
      left: textLeftOffset,
      top: topPos + 55,
      width: hasAvatar ? 340 : 430,
      height: 55,
      zIndex: 2,
      fontColor: '#38bdf8',
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 1.5
    },
    dataSource: { text: `意向岗位：${jobIntent}` }
  });

  children.push({
    id: `widget-contact`,
    componentName: 'hj-text-1',
    title: '联系方式',
    css: {
      left: 490,
      top: topPos + 18,
      width: 280,
      height: 90,
      zIndex: 2,
      fontColor: '#94a3b8',
      fontSize: 12.5,
      lineHeight: 1.6,
      textAlign: 'right'
    },
    dataSource: { text: `✉️ ${email}\n📱 ${phone}\n📍 ${location}` }
  });

  topPos += 145;

  // 1. Summary
  children.push({
    id: 'widget-summary-title',
    componentName: 'hj-text-1',
    title: '职业摘要标题',
    css: { left: 30, top: topPos, width: 760, height: 30, zIndex: 2, fontColor: themeColor, fontSize: 16, fontWeight: 'bold' },
    dataSource: { text: '📌 职业摘要' }
  });
  topPos += 32;

  children.push({
    id: 'widget-summary-content',
    componentName: 'hj-text-1',
    title: '职业摘要内容',
    css: { left: 30, top: topPos, width: 760, height: 60, zIndex: 2, fontColor: '#334155', fontSize: 13, lineHeight: 1.6, textAlign: 'left' },
    dataSource: { text: summary }
  });
  topPos += 75;

  // 2. Core Skills
  children.push({
    id: 'widget-skills-title',
    componentName: 'hj-text-1',
    title: '技能工具标题',
    css: { left: 30, top: topPos, width: 760, height: 30, zIndex: 2, fontColor: themeColor, fontSize: 16, fontWeight: 'bold' },
    dataSource: { text: '⚡ 核心能力与技能工具' }
  });
  topPos += 34;

  let skillLeft = 30;
  let skillTop = topPos;
  skills.forEach((sk, sIdx) => {
    const tagWidth = Math.max(85, sk.length * 11 + 22);
    if (skillLeft + tagWidth > 780) {
      skillLeft = 30;
      skillTop += 34;
    }
    children.push({
      id: `widget-skill-tag-${sIdx}`,
      componentName: 'hj-rectangle',
      title: `技能标签 ${sIdx + 1}`,
      css: {
        left: skillLeft,
        top: skillTop,
        width: tagWidth,
        height: 27,
        zIndex: 2,
        backgroundColor: '#f0fdf4',
        borderColor: '#bbf7d0',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 14,
        fontColor: themeColor,
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center'
      },
      dataSource: { text: sk }
    });
    skillLeft += tagWidth + 8;
  });
  topPos = skillTop + 42;

  // 3. Work Experience
  children.push({
    id: 'widget-work-title',
    componentName: 'hj-text-1',
    title: '工作经历标题',
    css: { left: 30, top: topPos, width: 760, height: 30, zIndex: 2, fontColor: themeColor, fontSize: 16, fontWeight: 'bold' },
    dataSource: { text: '💼 工作与校园经历' }
  });
  topPos += 34;

  workList.forEach((w, idx) => {
    const formattedBullets = w.bullets.map((b) => (b.trim().startsWith('•') ? b : `• ${b}`)).join('\n');
    const cardHeight = Math.max(100, 45 + w.bullets.length * 28);
    children.push({
      id: `widget-work-${idx}`,
      componentName: 'hj-[#exper-1]',
      title: `工作卡片 ${idx + 1}`,
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: cardHeight,
        zIndex: 2,
        backgroundColor: 'transparent',
        borderColor: '#cbd5e1',
        borderWidth: 0,
        borderStyle: 'solid',
        borderRadius: 6,
        textAlign: 'left'
      },
      dataSource: {
        companyName: w.company,
        jobTitle: w.role,
        workTime: w.period,
        workContent: formattedBullets,
        text: `${w.company} · ${w.role}\n${formattedBullets}`
      }
    });
    topPos += cardHeight + 14;
  });
  topPos += 10;

  // 4. Project Experience
  children.push({
    id: 'widget-project-title',
    componentName: 'hj-text-1',
    title: '项目经历标题',
    css: { left: 30, top: topPos, width: 760, height: 30, zIndex: 2, fontColor: themeColor, fontSize: 16, fontWeight: 'bold' },
    dataSource: { text: '🚀 项目经历' }
  });
  topPos += 34;

  projectList.forEach((p, idx) => {
    const formattedBullets = p.bullets.map((b) => (b.trim().startsWith('•') ? b : `• ${b}`)).join('\n');
    const cardHeight = Math.max(100, 45 + p.bullets.length * 28);
    children.push({
      id: `widget-project-${idx}`,
      componentName: 'hj-[#exper-1]',
      title: `项目卡片 ${idx + 1}`,
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: cardHeight,
        zIndex: 2,
        backgroundColor: 'transparent',
        borderColor: '#cbd5e1',
        borderWidth: 0,
        borderStyle: 'solid',
        borderRadius: 6,
        textAlign: 'left'
      },
      dataSource: {
        companyName: p.name,
        jobTitle: p.role,
        workTime: p.period,
        workContent: formattedBullets,
        text: `${p.name} · ${p.role}\n${formattedBullets}`
      }
    });
    topPos += cardHeight + 14;
  });
  topPos += 10;

  // 5. Education
  children.push({
    id: 'widget-edu-title',
    componentName: 'hj-text-1',
    title: '教育背景标题',
    css: { left: 30, top: topPos, width: 760, height: 30, zIndex: 2, fontColor: themeColor, fontSize: 16, fontWeight: 'bold' },
    dataSource: { text: '🎓 教育背景' }
  });
  topPos += 34;

  children.push({
    id: 'widget-edu-content',
    componentName: 'hj-text-1',
    title: '教育背景内容',
    css: { left: 30, top: topPos, width: 760, height: 30, zIndex: 2, fontColor: '#334155', fontSize: 13 },
    dataSource: { text: `${edu.school}  ·  ${edu.degree}  ·  ${edu.period}` }
  });
  topPos += 45;

  return {
    id: `lego-resume-${templateId}-${Date.now()}`,
    version: '1.0.0',
    componentsTree: [{ id: 'page-1', componentName: 'page', commentType: 'page', children }],
    css: {
      width: 820,
      height: Math.max(1160, topPos + 40),
      background: '#ffffff',
      opacity: 1,
      fontFamily: 'Inter, sans-serif',
      themeColor
    },
    config: {
      title: `${name} 的【${templateId}】积木简历`
    }
  };
}
