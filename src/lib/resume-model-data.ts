// Default resume data model for standalone creation mode
// Ported from resume-design-main/src/schema/modelData.ts

export interface ResumeModuleData {
  model: string;
  show: boolean;
  title: string;
  [key: string]: unknown;
}

export const RESUME_MODEL_DATA = {
  RESUME_TITLE: {
    model: 'RESUME_TITLE',
    show: true,
    title: '我的简历',
  },
  BASE_INFO: {
    model: 'BASE_INFO',
    show: true,
    title: '基本资料',
    name: '您的姓名',
    age: 25,
    address: '所在城市',
    avatar: '',
    workService: 3,
    phoneNumber: '138-0000-0000',
    email: 'your@email.com',
    abstract: '一句话介绍自己',
    degree: '学历',
  },
  JOB_INTENTION: {
    model: 'JOB_INTENTION',
    show: true,
    title: '求职意向',
    intendedPositions: '目标岗位',
    intendedCity: '意向城市',
    expectSalary: '面议',
    jobStatus: '随时入职',
  },
  EDU_BACKGROUND: {
    model: 'EDU_BACKGROUND',
    show: true,
    title: '教育背景',
    LIST: [
      {
        date: ['2019-09', '2023-06'],
        schoolName: '学校名称',
        specialized: '专业名称',
        degree: '本科',
        majorCourse: '主修课程',
      },
    ],
  },
  SKILL_SPECIALTIES: {
    model: 'SKILL_SPECIALTIES',
    show: true,
    title: '技能特长',
    LIST: [
      { skillName: 'JavaScript', proficiency: '精通', introduce: '熟练掌握ES6+语法...' },
      { skillName: 'React', proficiency: '熟悉', introduce: '有多个React项目开发经验...' },
      { skillName: 'TypeScript', proficiency: '熟悉', introduce: '掌握TypeScript类型系统...' },
    ],
  },
  WORK_EXPERIENCE: {
    model: 'WORK_EXPERIENCE',
    show: true,
    title: '工作经验',
    LIST: [
      {
        date: ['2022-07', '至今'],
        companyName: '公司名称',
        posts: '岗位名称',
        jobContent: [{ content: '工作内容描述...' }],
      },
    ],
  },
  PROJECT_EXPERIENCE: {
    model: 'PROJECT_EXPERIENCE',
    show: true,
    title: '项目经验',
    LIST: [
      {
        date: ['2023-03', '2023-12'],
        projectName: '项目名称',
        posts: '项目角色',
        projectContent: [{ content: '项目描述...' }],
      },
    ],
  },
  CAMPUS_EXPERIENCE: {
    model: 'CAMPUS_EXPERIENCE',
    show: true,
    title: '校园经历',
    LIST: [
      {
        date: ['2020-09', '2022-06'],
        campusBriefly: '社团/组织名称',
        campusDuty: '职责',
        campusContent: '活动描述...',
      },
    ],
  },
  INTERNSHIP_EXPERIENCE: {
    model: 'INTERNSHIP_EXPERIENCE',
    show: true,
    title: '实习经验',
    LIST: [
      {
        date: ['2022-01', '2022-06'],
        companyName: '实习公司',
        posts: '实习岗位',
        jobContent: [{ content: '实习工作内容...' }],
      },
    ],
  },
  AWARDS: {
    model: 'AWARDS',
    show: true,
    title: '荣誉奖项',
    LIST: [
      { date: '2022-06', awardsName: '奖项名称', awardsGrade: '获奖等级' },
    ],
  },
  HOBBIES: {
    model: 'HOBBIES',
    show: true,
    title: '兴趣爱好',
    content: '阅读、运动、编程...',
  },
  SELF_EVALUATION: {
    model: 'SELF_EVALUATION',
    show: true,
    title: '自我评价',
    content: '具有较强的责任心和学习能力...',
  },
  WORKS_DISPLAY: {
    model: 'WORKS_DISPLAY',
    show: true,
    title: '作品展示',
    LIST: [
      {
        worksName: '作品名称',
        worksLink: 'https://example.com',
        worksIntroduce: '作品简介...',
      },
    ],
  },
};

export type ResumeModuleKey = keyof typeof RESUME_MODEL_DATA;
