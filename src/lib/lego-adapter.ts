import type { AnalysisResult, UserInput } from '@/types/resume';
import type { IHJSchema, IWidget } from '@/types/lego';

export function buildLegoSchemaFromResume(
  userInput: UserInput,
  analysisResult?: AnalysisResult | null
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
    school: '名牌大学',
    degree: '计算机科学与技术 · 学士',
    period: '2018.09 - 2022.06'
  };

  const avatarUrl = finalResume?.personalInfo?.avatarUrl || userInput.avatarUrl || '';

  const children: IWidget[] = [];
  let currentTop = 40;

  const hasAvatar = Boolean(avatarUrl);

  // 1. Header Banner Box (Background)
  children.push({
    id: `widget-header-bg`,
    componentName: 'hj-rectangle',
    title: '顶部背景框',
    css: {
      left: 30,
      top: currentTop,
      width: 760,
      height: 125,
      zIndex: 1,
      backgroundColor: '#f8fafc',
      borderColor: '#e2e8f0',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 12,
      padding: { top: 0, right: 0, bottom: 0, left: 0 }
    },
    dataSource: {}
  });

  if (hasAvatar) {
    // 1.5 Avatar Widget
    children.push({
      id: `widget-avatar-main`,
      componentName: 'hj-avatar-1',
      title: '个人头像',
      css: {
        left: 45,
        top: currentTop + 12,
        width: 80,
        height: 100,
        zIndex: 2,
        backgroundColor: '#e2e8f0',
        borderWidth: 2,
        borderColor: '#cbd5e1',
        borderStyle: 'solid',
        borderRadius: 8
      },
      dataSource: { avatarSrc: avatarUrl }
    });
  }

  const textLeftOffset = hasAvatar ? 140 : 50;

  // 2. Name
  children.push({
    id: `widget-name`,
    componentName: 'hj-text-1',
    title: '姓名',
    css: {
      left: textLeftOffset,
      top: currentTop + 15,
      width: 260,
      height: 38,
      zIndex: 2,
      fontColor: '#0f172a',
      fontSize: 26,
      fontWeight: 'bold',
      fontFamily: 'Inter, sans-serif'
    },
    dataSource: { text: name }
  });

  // 3. Job Intent
  children.push({
    id: `widget-job-intent`,
    componentName: 'hj-text-1',
    title: '求职意向',
    css: {
      left: textLeftOffset,
      top: currentTop + 55,
      width: hasAvatar ? 340 : 430,
      height: 55,
      zIndex: 2,
      fontColor: '#2563eb',
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 1.5
    },
    dataSource: { text: `意向岗位：${jobIntent}` }
  });

  // 4. Contact Info Line (Right aligned)
  children.push({
    id: `widget-contact`,
    componentName: 'hj-text-1',
    title: '联系方式',
    css: {
      left: 490,
      top: currentTop + 18,
      width: 280,
      height: 90,
      zIndex: 2,
      fontColor: '#475569',
      fontSize: 13,
      textAlign: 'right',
      lineHeight: 1.6
    },
    dataSource: { text: `📱 ${phone}\n✉️ ${email}\n📍 ${location}` }
  });

  currentTop += 145;

  // Helper for Section Titles
  const addSectionHeader = (title: string, topPos: number) => {
    children.push({
      id: `widget-sec-bg-${topPos}`,
      componentName: 'hj-rectangle',
      title: `${title} 标题背景`,
      css: {
        left: 30,
        top: topPos,
        width: 760,
        height: 32,
        zIndex: 1,
        backgroundColor: '#2563eb',
        borderRadius: 6
      },
      dataSource: {}
    });

    children.push({
      id: `widget-sec-text-${topPos}`,
      componentName: 'hj-text-1',
      title: `${title} 标题文本`,
      css: {
        left: 45,
        top: topPos + 4,
        width: 700,
        height: 24,
        zIndex: 2,
        fontColor: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold'
      },
      dataSource: { text: title }
    });
  };

  // 5. 个人总结 Section
  addSectionHeader('📌 个人总结', currentTop);
  currentTop += 42;

  const summaryLines = Math.ceil(summary.length / 45);
  const summaryHeight = Math.max(48, summaryLines * 24);

  children.push({
    id: `widget-summary`,
    componentName: 'hj-text-1',
    title: '个人总结内容',
    css: {
      left: 45,
      top: currentTop,
      width: 730,
      height: summaryHeight,
      zIndex: 2,
      fontColor: '#334155',
      fontSize: 13,
      lineHeight: 1.6
    },
    dataSource: { text: summary }
  });
  currentTop += summaryHeight + 20;

  // 6. 工作经历 Section
  addSectionHeader('💼 工作经历', currentTop);
  currentTop += 42;

  workList.forEach((work, wIdx) => {
    // Company & Role Header
    children.push({
      id: `widget-work-title-${wIdx}`,
      componentName: 'hj-text-1',
      title: `${work.company} - 职位`,
      css: {
        left: 45,
        top: currentTop,
        width: 480,
        height: 24,
        zIndex: 2,
        fontColor: '#0f172a',
        fontSize: 15,
        fontWeight: 'bold'
      },
      dataSource: { text: `${work.company}  |  ${work.role}` }
    });

    // Date
    children.push({
      id: `widget-work-date-${wIdx}`,
      componentName: 'hj-text-1',
      title: `${work.company} - 时间`,
      css: {
        left: 540,
        top: currentTop,
        width: 235,
        height: 24,
        zIndex: 2,
        fontColor: '#64748b',
        fontSize: 13,
        textAlign: 'right'
      },
      dataSource: { text: work.period }
    });
    currentTop += 28;

    // Bullets
    const bulletText = work.bullets.map((b) => `• ${b}`).join('\n');
    const bulletHeight = Math.max(40, work.bullets.length * 24);

    children.push({
      id: `widget-work-bullets-${wIdx}`,
      componentName: 'hj-text-1',
      title: `${work.company} - 业绩`,
      css: {
        left: 55,
        top: currentTop,
        width: 720,
        height: bulletHeight,
        zIndex: 2,
        fontColor: '#334155',
        fontSize: 13,
        lineHeight: 1.6
      },
      dataSource: { text: bulletText }
    });
    currentTop += bulletHeight + 16;
  });

  // 7. 项目经历 Section
  addSectionHeader('🚀 项目经历', currentTop);
  currentTop += 42;

  projectList.forEach((proj, pIdx) => {
    children.push({
      id: `widget-proj-title-${pIdx}`,
      componentName: 'hj-text-1',
      title: `${proj.name} - 项目`,
      css: {
        left: 45,
        top: currentTop,
        width: 480,
        height: 24,
        zIndex: 2,
        fontColor: '#0f172a',
        fontSize: 15,
        fontWeight: 'bold'
      },
      dataSource: { text: `${proj.name}  (${proj.role})` }
    });

    children.push({
      id: `widget-proj-date-${pIdx}`,
      componentName: 'hj-text-1',
      title: `${proj.name} - 时间`,
      css: {
        left: 540,
        top: currentTop,
        width: 235,
        height: 24,
        zIndex: 2,
        fontColor: '#64748b',
        fontSize: 13,
        textAlign: 'right'
      },
      dataSource: { text: proj.period }
    });
    currentTop += 28;

    const bulletText = proj.bullets.map((b) => `• ${b}`).join('\n');
    const bulletHeight = Math.max(40, proj.bullets.length * 24);

    children.push({
      id: `widget-proj-bullets-${pIdx}`,
      componentName: 'hj-text-1',
      title: `${proj.name} - 细节`,
      css: {
        left: 55,
        top: currentTop,
        width: 720,
        height: bulletHeight,
        zIndex: 2,
        fontColor: '#334155',
        fontSize: 13,
        lineHeight: 1.6
      },
      dataSource: { text: bulletText }
    });
    currentTop += bulletHeight + 16;
  });

  // 8. 核心技能 Section
  addSectionHeader('⚡ 技能清单', currentTop);
  currentTop += 42;

  const skillText = skills.join('  •  ');
  const skillLines = Math.ceil(skillText.length / 50);
  const skillHeight = Math.max(36, skillLines * 22);

  children.push({
    id: `widget-skills`,
    componentName: 'hj-text-1',
    title: '技能清单内容',
    css: {
      left: 45,
      top: currentTop,
      width: 730,
      height: skillHeight,
      zIndex: 2,
      fontColor: '#334155',
      fontSize: 13,
      lineHeight: 1.6
    },
    dataSource: { text: skillText }
  });
  currentTop += skillHeight + 20;

  // 9. 教育背景 Section
  addSectionHeader('🎓 教育背景', currentTop);
  currentTop += 42;

  children.push({
    id: `widget-edu-title`,
    componentName: 'hj-text-1',
    title: '学校与专业',
    css: {
      left: 45,
      top: currentTop,
      width: 480,
      height: 24,
      zIndex: 2,
      fontColor: '#0f172a',
      fontSize: 15,
      fontWeight: 'bold'
    },
    dataSource: { text: `${edu.school}  |  ${edu.degree}` }
  });

  children.push({
    id: `widget-edu-date`,
    componentName: 'hj-text-1',
    title: '教育时间',
    css: {
      left: 540,
      top: currentTop,
      width: 235,
      height: 24,
      zIndex: 2,
      fontColor: '#64748b',
      fontSize: 13,
      textAlign: 'right'
    },
    dataSource: { text: edu.period }
  });

  return {
    id: `lego-resume-${Date.now()}`,
    version: '1.0.0',
    componentsTree: [
      {
        id: 'page-1',
        componentName: 'page',
        commentType: 'page',
        children
      }
    ],
    css: {
      width: 820,
      height: Math.max(1160, currentTop + 60),
      background: '#ffffff',
      opacity: 1,
      fontFamily: 'Inter, sans-serif',
      themeColor: '#2563eb'
    },
    config: {
      title: `${name} 的积木简历`
    }
  };
}
