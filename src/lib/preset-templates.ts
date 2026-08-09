import type { IHJSchema, IWidget } from '@/types/lego';

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  schema: IHJSchema;
}

const classicWidgets: IWidget[] = [
  {
    id: 'preset-classic-1',
    componentName: 'hj-text-2',
    title: '姓名大标题',
    css: {
      width: 740,
      height: 44,
      left: 40,
      top: 40,
      zIndex: 2,
      fontColor: '#0f172a',
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    dataSource: { text: '张明 · AI 产品经理' }
  },
  {
    id: 'preset-classic-2',
    componentName: 'hj-text-3',
    title: '联系方式',
    css: {
      width: 740,
      height: 24,
      left: 40,
      top: 90,
      zIndex: 2,
      fontColor: '#475569',
      fontSize: 13,
      textAlign: 'center'
    },
    dataSource: { text: '138-0000-0000 | zhangming@example.com | 北京' }
  },
  {
    id: 'preset-classic-3',
    componentName: 'hj-other-1',
    title: '分割线',
    css: {
      width: 740,
      height: 2,
      left: 40,
      top: 124,
      zIndex: 1,
      backgroundColor: '#2563eb'
    },
    dataSource: {}
  },
  {
    id: 'preset-classic-4',
    componentName: 'hj-text-8',
    title: '工作经验标题',
    css: {
      width: 740,
      height: 36,
      left: 40,
      top: 140,
      zIndex: 2,
      fontColor: '#1e3a8a',
      fontSize: 16,
      fontWeight: 'bold',
      padding: { top: 0, right: 0, bottom: 0, left: 10 }
    },
    dataSource: { text: '▌ 工作经验 WORK EXPERIENCE' }
  },
  {
    id: 'preset-classic-5',
    componentName: 'hj-[#exper-1]',
    title: '工作经历1',
    css: {
      width: 740,
      height: 110,
      left: 40,
      top: 185,
      zIndex: 2,
      fontColor: '#334155',
      fontSize: 13,
      lineHeight: 1.6
    },
    dataSource: {
      companyName: '某知名科技公司',
      jobTitle: '高级 AI 产品经理',
      workTime: '2023.03 - 至今',
      workContent: '1. 主导企业级 AI 助手规划与落地，覆盖智能问答、文档分析与流程自动化；\n2. 优化 Prompt 架构与 RAG 链路，将知识库回答准确率提升 25%，响应时延降低 40%；\n3. 建立 AI 效果评估体系，推动月活跃用户突破 50 万。'
    }
  },
  {
    id: 'preset-classic-6',
    componentName: 'hj-[#exper-1]',
    title: '工作经历2',
    css: {
      width: 740,
      height: 95,
      left: 40,
      top: 305,
      zIndex: 2,
      fontColor: '#334155',
      fontSize: 13,
      lineHeight: 1.6
    },
    dataSource: {
      companyName: '某 SaaS 科技企业',
      jobTitle: '产品经理',
      workTime: '2021.07 - 2023.02',
      workContent: '1. 负责自动化流程构建产品的全栈设计，深入理解 200+ 中大型企业事业单位业务场景；\n2. 借助用户行为数据分析与漏斗模型，优化核心使用路径，推动首周留存率提升 18%。'
    }
  },
  {
    id: 'preset-classic-7',
    componentName: 'hj-text-8',
    title: '项目经验标题',
    css: {
      width: 740,
      height: 36,
      left: 40,
      top: 415,
      zIndex: 2,
      fontColor: '#1e3a8a',
      fontSize: 16,
      fontWeight: 'bold',
      padding: { top: 0, right: 0, bottom: 0, left: 10 }
    },
    dataSource: { text: '▌ 项目经验 PROJECT EXPERIENCE' }
  },
  {
    id: 'preset-classic-8',
    componentName: 'hj-[#exper-1]',
    title: '项目经历1',
    css: {
      width: 740,
      height: 90,
      left: 40,
      top: 460,
      zIndex: 2,
      fontColor: '#334155',
      fontSize: 13,
      lineHeight: 1.6
    },
    dataSource: {
      companyName: '智能文档协同助手',
      jobTitle: '项目负责人',
      workTime: '2023.09 - 2024.01',
      workContent: '1. 针对多格式长文档（PDF/Word/PPT）分析痛点，策划并构建 AI 智能摘要与对话功能；\n2. 协助工程团队搭建模型评测流水线，上线首周转化率提升 18%。'
    }
  },
  {
    id: 'preset-classic-9',
    componentName: 'hj-text-8',
    title: '教育背景标题',
    css: {
      width: 740,
      height: 36,
      left: 40,
      top: 565,
      zIndex: 2,
      fontColor: '#1e3a8a',
      fontSize: 16,
      fontWeight: 'bold',
      padding: { top: 0, right: 0, bottom: 0, left: 10 }
    },
    dataSource: { text: '▌ 教育背景 EDUCATION' }
  },
  {
    id: 'preset-classic-10',
    componentName: 'hj-[#exper-1]',
    title: '教育经历',
    css: {
      width: 740,
      height: 60,
      left: 40,
      top: 610,
      zIndex: 2,
      fontColor: '#334155',
      fontSize: 13
    },
    dataSource: {
      companyName: '北京科技大学',
      jobTitle: '计算机科学与技术 · 本科',
      workTime: '2017.09 - 2021.06',
      workContent: '主修课程：数据结构、算法分析、计算机网络、操作系统、软件工程'
    }
  },
  {
    id: 'preset-classic-11',
    componentName: 'hj-text-8',
    title: '技能特长标题',
    css: {
      width: 740,
      height: 36,
      left: 40,
      top: 685,
      zIndex: 2,
      fontColor: '#1e3a8a',
      fontSize: 16,
      fontWeight: 'bold',
      padding: { top: 0, right: 0, bottom: 0, left: 10 }
    },
    dataSource: { text: '▌ 技能特长 SKILLS & TOOLS' }
  },
  {
    id: 'preset-classic-12',
    componentName: 'hj-text-6',
    title: '技能详情',
    css: {
      width: 740,
      height: 50,
      left: 40,
      top: 730,
      zIndex: 2,
      fontColor: '#334155',
      fontSize: 13,
      lineHeight: 1.8
    },
    dataSource: { text: '• AI 产品应用：Prompt 工程、RAG 检索增强、Agent 工作流、LLM 评测流水线\n• 传统工具与技术：Axure、Figma、Python 数据分析、SQL、Agile/Scrum 敏捷管理' }
  }
];

const modernWidgets: IWidget[] = [
  // Left Sidebar Background
  {
    id: 'preset-modern-1',
    componentName: 'hj-rectangle',
    title: '侧边栏背景',
    css: {
      width: 240,
      height: 1160,
      left: 0,
      top: 0,
      zIndex: 1,
      backgroundColor: '#1e293b'
    },
    dataSource: {}
  },
  // Left Sidebar Avatar
  {
    id: 'preset-modern-2',
    componentName: 'hj-avatar-2',
    title: '头像',
    css: {
      width: 110,
      height: 110,
      left: 65,
      top: 40,
      zIndex: 2,
      backgroundColor: '#334155',
      borderColor: '#38bdf8',
      borderWidth: 3,
      borderStyle: 'solid'
    },
    dataSource: { avatarSrc: '' }
  },
  {
    id: 'preset-modern-3',
    componentName: 'hj-text-2',
    title: '姓名',
    css: {
      width: 220,
      height: 36,
      left: 10,
      top: 165,
      zIndex: 2,
      fontColor: '#ffffff',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    dataSource: { text: '李明' }
  },
  {
    id: 'preset-modern-4',
    componentName: 'hj-text-3',
    title: '头衔',
    css: {
      width: 220,
      height: 24,
      left: 10,
      top: 205,
      zIndex: 2,
      fontColor: '#38bdf8',
      fontSize: 13,
      textAlign: 'center'
    },
    dataSource: { text: '全栈开发工程师' }
  },
  {
    id: 'preset-modern-5',
    componentName: 'hj-text-6',
    title: '个人联系方式',
    css: {
      width: 210,
      height: 110,
      left: 15,
      top: 250,
      zIndex: 2,
      fontColor: '#cbd5e1',
      fontSize: 12,
      lineHeight: 2
    },
    dataSource: { text: '📱 电话: 139-8888-6666\n✉️ 邮箱: liming@code.com\n📍 城市: 上海市\n🔗 GitHub: github.com/liming' }
  },
  {
    id: 'preset-modern-sidebar-skills-title',
    componentName: 'hj-text-1',
    title: '侧栏技能标题',
    css: {
      width: 210,
      height: 30,
      left: 15,
      top: 380,
      zIndex: 2,
      fontColor: '#38bdf8',
      fontSize: 14,
      fontWeight: 'bold'
    },
    dataSource: { text: '▌ 核心技能' }
  },
  {
    id: 'preset-modern-sidebar-skills',
    componentName: 'hj-text-6',
    title: '侧栏技能',
    css: {
      width: 210,
      height: 160,
      left: 15,
      top: 415,
      zIndex: 2,
      fontColor: '#94a3b8',
      fontSize: 12,
      lineHeight: 1.8
    },
    dataSource: { text: '• TypeScript / React\n• Next.js / Node.js\n• Python / FastAPI\n• Docker / Kubernetes\n• PostgreSQL / Redis\n• Tailwind CSS' }
  },
  // Right Main Content Area
  {
    id: 'preset-modern-6',
    componentName: 'hj-text-8',
    title: '工作经验标题',
    css: {
      width: 530,
      height: 36,
      left: 260,
      top: 40,
      zIndex: 2,
      fontColor: '#0f172a',
      fontSize: 16,
      fontWeight: 'bold',
      padding: { top: 0, right: 0, bottom: 0, left: 10 }
    },
    dataSource: { text: '▌ 工作经验 WORK EXPERIENCE' }
  },
  {
    id: 'preset-modern-7',
    componentName: 'hj-[#exper-1]',
    title: '工作经历1',
    css: {
      width: 530,
      height: 110,
      left: 260,
      top: 85,
      zIndex: 2,
      fontColor: '#334155',
      fontSize: 13,
      lineHeight: 1.6
    },
    dataSource: {
      companyName: '科技独角兽企业',
      jobTitle: '高级全栈工程师',
      workTime: '2022.05 - 至今',
      workContent: '1. 主导前端微服务架构升级，将首屏渲染时间缩短 45%；\n2. 设计并实施高并发高可用后端服务，支撑日均千万级 API 请求；\n3. 构建 CI/CD 自动化流水线，降低版本发布故障率 60%。'
    }
  },
  {
    id: 'preset-modern-8',
    componentName: 'hj-[#exper-1]',
    title: '工作经历2',
    css: {
      width: 530,
      height: 95,
      left: 260,
      top: 205,
      zIndex: 2,
      fontColor: '#334155',
      fontSize: 13,
      lineHeight: 1.6
    },
    dataSource: {
      companyName: '知名互联网平台',
      jobTitle: '前端研发工程师',
      workTime: '2020.07 - 2022.04',
      workContent: '1. 负责核心业务中台系统前端开发，重构核心数据看板模块；\n2. 封装通用 UI 组件库，被公司 10+ 业务线广泛采纳。'
    }
  },
  {
    id: 'preset-modern-9',
    componentName: 'hj-text-8',
    title: '项目经验标题',
    css: {
      width: 530,
      height: 36,
      left: 260,
      top: 315,
      zIndex: 2,
      fontColor: '#0f172a',
      fontSize: 16,
      fontWeight: 'bold',
      padding: { top: 0, right: 0, bottom: 0, left: 10 }
    },
    dataSource: { text: '▌ 项目经验 PROJECTS' }
  },
  {
    id: 'preset-modern-10',
    componentName: 'hj-[#exper-1]',
    title: '项目经历1',
    css: {
      width: 530,
      height: 90,
      left: 260,
      top: 360,
      zIndex: 2,
      fontColor: '#334155',
      fontSize: 13,
      lineHeight: 1.6
    },
    dataSource: {
      companyName: '分布式实时数据可视化平台',
      jobTitle: '技术负责人',
      workTime: '2023.01 - 2023.08',
      workContent: '基于 Canvas 与 WebGL 打造高性能百万级数据大屏渲染引擎，实现毫秒级数据图表联动呈现。'
    }
  },
  {
    id: 'preset-modern-11',
    componentName: 'hj-text-8',
    title: '教育背景标题',
    css: {
      width: 530,
      height: 36,
      left: 260,
      top: 465,
      zIndex: 2,
      fontColor: '#0f172a',
      fontSize: 16,
      fontWeight: 'bold',
      padding: { top: 0, right: 0, bottom: 0, left: 10 }
    },
    dataSource: { text: '▌ 教育背景 EDUCATION' }
  },
  {
    id: 'preset-modern-12',
    componentName: 'hj-[#exper-1]',
    title: '教育经历',
    css: {
      width: 530,
      height: 60,
      left: 260,
      top: 510,
      zIndex: 2,
      fontColor: '#334155',
      fontSize: 13
    },
    dataSource: {
      companyName: '同济大学',
      jobTitle: '软件工程 · 本科',
      workTime: '2016.09 - 2020.06',
      workContent: '主修课程：软件体系结构、数据库原理、编译原理、分布式系统'
    }
  }
];

const minimalWidgets: IWidget[] = [
  {
    id: 'preset-minimal-1',
    componentName: 'hj-text-2',
    title: '姓名',
    css: {
      width: 400,
      height: 44,
      left: 40,
      top: 40,
      zIndex: 2,
      fontColor: '#065f46',
      fontSize: 24,
      fontWeight: 'bold'
    },
    dataSource: { text: '陈晨 · 资深 UI/UX 交互设计师' }
  },
  {
    id: 'preset-minimal-2',
    componentName: 'hj-text-3',
    title: '联系方式',
    css: {
      width: 320,
      height: 44,
      left: 460,
      top: 40,
      zIndex: 2,
      fontColor: '#4b5563',
      fontSize: 12,
      textAlign: 'right'
    },
    dataSource: { text: 'chenchen@design.com | 137-0000-1111 | 杭州' }
  },
  {
    id: 'preset-minimal-3',
    componentName: 'hj-other-1',
    title: '分隔线',
    css: {
      width: 740,
      height: 1,
      left: 40,
      top: 95,
      zIndex: 1,
      backgroundColor: '#059669'
    },
    dataSource: {}
  },
  {
    id: 'preset-minimal-4',
    componentName: 'hj-text-8',
    title: '个人优势',
    css: {
      width: 740,
      height: 36,
      left: 40,
      top: 110,
      zIndex: 2,
      fontColor: '#065f46',
      fontSize: 15,
      fontWeight: 'bold',
      padding: { top: 0, right: 0, bottom: 0, left: 10 },
      borderLeftColor: '#059669',
      borderLeftWidth: 3,
      borderLeftStyle: 'solid'
    },
    dataSource: { text: '▌ 个人优势 & 核心能力 PROFILE' }
  },
  {
    id: 'preset-minimal-5',
    componentName: 'hj-text-6',
    title: '个人优势内容',
    css: {
      width: 740,
      height: 50,
      left: 40,
      top: 155,
      zIndex: 2,
      fontColor: '#374151',
      fontSize: 13,
      lineHeight: 1.7
    },
    dataSource: { text: '6 年互联网大厂 UI/UX 交互设计经验，精通 B 端/C 端复杂系统设计规范建构、用户体验链路重塑与 Design System 设计组件库搭建。擅长通过数据洞察驱动体验迭代。' }
  },
  {
    id: 'preset-minimal-6',
    componentName: 'hj-text-8',
    title: '工作经验标题',
    css: {
      width: 740,
      height: 36,
      left: 40,
      top: 220,
      zIndex: 2,
      fontColor: '#065f46',
      fontSize: 15,
      fontWeight: 'bold',
      padding: { top: 0, right: 0, bottom: 0, left: 10 },
      borderLeftColor: '#059669',
      borderLeftWidth: 3,
      borderLeftStyle: 'solid'
    },
    dataSource: { text: '▌ 工作经历 WORK EXPERIENCE' }
  },
  {
    id: 'preset-minimal-7',
    componentName: 'hj-[#exper-1]',
    title: '工作经历1',
    css: {
      width: 740,
      height: 105,
      left: 40,
      top: 265,
      zIndex: 2,
      fontColor: '#374151',
      fontSize: 13,
      lineHeight: 1.6
    },
    dataSource: {
      companyName: '某知名互联网科技独角兽',
      jobTitle: '资深 UI/UX 设计专家',
      workTime: '2021.06 - 至今',
      workContent: '1. 负责核心 SaaS 产品的全链路体验重塑，将核心功能操作步骤缩减 30%，用户 NPS 指数提升 35%；\n2. 主导搭建企业级 Design System 设计组件库，覆盖 300+ 基础与业务组件，提升团队交付效率 40%。'
    }
  },
  {
    id: 'preset-minimal-8',
    componentName: 'hj-[#exper-1]',
    title: '工作经历2',
    css: {
      width: 740,
      height: 90,
      left: 40,
      top: 380,
      zIndex: 2,
      fontColor: '#374151',
      fontSize: 13,
      lineHeight: 1.6
    },
    dataSource: {
      companyName: '一线设计咨询公司',
      jobTitle: '体验设计组长',
      workTime: '2018.03 - 2021.05',
      workContent: '1. 主导多个世界 500 强客户的数字化产品体验重构项目，完成从用户研究到高保真原型的全流程闭环；\n2. 沉淀体验设计方法论，定期开展设计复盘与设计沉淀。'
    }
  },
  {
    id: 'preset-minimal-9',
    componentName: 'hj-text-8',
    title: '项目作品标题',
    css: {
      width: 740,
      height: 36,
      left: 40,
      top: 485,
      zIndex: 2,
      fontColor: '#065f46',
      fontSize: 15,
      fontWeight: 'bold',
      padding: { top: 0, right: 0, bottom: 0, left: 10 },
      borderLeftColor: '#059669',
      borderLeftWidth: 3,
      borderLeftStyle: 'solid'
    },
    dataSource: { text: '▌ 项目经验 PROJECT EXPERIENCE' }
  },
  {
    id: 'preset-minimal-10',
    componentName: 'hj-[#exper-1]',
    title: '项目经历1',
    css: {
      width: 740,
      height: 90,
      left: 40,
      top: 530,
      zIndex: 2,
      fontColor: '#374151',
      fontSize: 13,
      lineHeight: 1.6
    },
    dataSource: {
      companyName: '企业级云原生设计系统库搭建',
      jobTitle: '设计负责人',
      workTime: '2023.01 - 2023.10',
      workContent: '重构并规范化云产品设计资产 500+，达成桌面端与移动端体验一致性，荣获公司年度年度最佳产品设计创新奖。'
    }
  },
  {
    id: 'preset-minimal-11',
    componentName: 'hj-text-8',
    title: '教育背景标题',
    css: {
      width: 740,
      height: 36,
      left: 40,
      top: 635,
      zIndex: 2,
      fontColor: '#065f46',
      fontSize: 15,
      fontWeight: 'bold',
      padding: { top: 0, right: 0, bottom: 0, left: 10 },
      borderLeftColor: '#059669',
      borderLeftWidth: 3,
      borderLeftStyle: 'solid'
    },
    dataSource: { text: '▌ 教育背景 EDUCATION' }
  },
  {
    id: 'preset-minimal-12',
    componentName: 'hj-[#exper-1]',
    title: '教育经历',
    css: {
      width: 740,
      height: 60,
      left: 40,
      top: 680,
      zIndex: 2,
      fontColor: '#374151',
      fontSize: 13
    },
    dataSource: {
      companyName: '中国美术学院',
      jobTitle: '视觉传达设计 / 工业设计 · 本科',
      workTime: '2014.09 - 2018.06',
      workContent: '主修课程：交互设计、用户体验研究、视觉传达、人机工程学、设计心理学'
    }
  },
  {
    id: 'preset-minimal-13',
    componentName: 'hj-text-8',
    title: '技能软件标题',
    css: {
      width: 740,
      height: 36,
      left: 40,
      top: 755,
      zIndex: 2,
      fontColor: '#065f46',
      fontSize: 15,
      fontWeight: 'bold',
      padding: { top: 0, right: 0, bottom: 0, left: 10 },
      borderLeftColor: '#059669',
      borderLeftWidth: 3,
      borderLeftStyle: 'solid'
    },
    dataSource: { text: '▌ 技能软件 & 工具 SKILLS & TOOLS' }
  },
  {
    id: 'preset-minimal-14',
    componentName: 'hj-text-6',
    title: '技能详情',
    css: {
      width: 740,
      height: 50,
      left: 40,
      top: 800,
      zIndex: 2,
      fontColor: '#374151',
      fontSize: 13,
      lineHeight: 1.8
    },
    dataSource: { text: '• 设计与原型工具：Figma, Sketch, Adobe XD, Principle, Framer, Photoshop, Illustrator\n• 用户研究 & 体验工程：Design System 规范建构, 用户旅程图, 可用性测试, A/B 测试, 前端基础(HTML/CSS)' }
  }
];

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'classic',
    name: '经典单栏模板',
    description: '标准大厂单栏排版，层次分明，适合社招与校招简历',
    thumbnail: '📝',
    schema: {
      id: 'template-classic',
      version: '1.0.0',
      componentsTree: [
        {
          id: 'page-1',
          componentName: 'page',
          commentType: 'page',
          children: classicWidgets
        }
      ],
      css: {
        width: 820,
        height: 1160,
        background: '#ffffff',
        opacity: 1,
        fontFamily: 'Inter, sans-serif'
      },
      config: {
        title: '经典单栏模板'
      }
    }
  },
  {
    id: 'modern',
    name: '现代深色双栏',
    description: '深色左侧栏，高对比度设计，适合程序员与技术专家',
    thumbnail: '🖼️',
    schema: {
      id: 'template-modern',
      version: '1.0.0',
      componentsTree: [
        {
          id: 'page-1',
          componentName: 'page',
          commentType: 'page',
          children: modernWidgets
        }
      ],
      css: {
        width: 820,
        height: 1160,
        background: '#ffffff',
        opacity: 1,
        fontFamily: 'Inter, sans-serif'
      },
      config: {
        title: '现代深色双栏模板'
      }
    }
  },
  {
    id: 'minimal',
    name: '简约清新风格',
    description: '薄荷绿主题调，极大留白，适合设计师与产品经理',
    thumbnail: '🌿',
    schema: {
      id: 'template-minimal',
      version: '1.0.0',
      componentsTree: [
        {
          id: 'page-1',
          componentName: 'page',
          commentType: 'page',
          children: minimalWidgets
        }
      ],
      css: {
        width: 820,
        height: 1160,
        background: '#ffffff',
        opacity: 1,
        fontFamily: 'Inter, sans-serif'
      },
      config: {
        title: '简约清新模板'
      }
    }
  },
  {
    id: 'blank',
    name: '空白画布',
    description: '纯白干净画布，自由从零拖拽组合积木物料',
    thumbnail: '✨',
    schema: {
      id: 'template-blank',
      version: '1.0.0',
      componentsTree: [
        {
          id: 'page-1',
          componentName: 'page',
          commentType: 'page',
          children: []
        }
      ],
      css: {
        width: 820,
        height: 1160,
        background: '#ffffff',
        opacity: 1,
        fontFamily: 'Inter, sans-serif'
      },
      config: {
        title: '空白画布'
      }
    }
  }
];
