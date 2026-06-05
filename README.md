# 简历专家

基于目标岗位 JD 的 AI 简历优化 Agent Web App。

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- lucide-react

## 快速开始

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)

## 使用流程

1. 点击「使用示例数据」填充示例
2. 点击「开始分析」触发 mock AI 分析
3. 按左侧流程导航逐步查看各模块结果
4. 在「经历追问」中填写回答并生成 bullet
5. 在「导出结果」中复制最终简历

## 大模型接入

1. 复制环境变量模板：

```bash
cp .env.example .env.local
```

2. 填写 API Key 与模型配置（支持 OpenAI 兼容接口）：

```env
LLM_API_KEY=sk-xxx
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o-mini
```

3. 重启开发服务器。顶部导航会显示 **AI 模式**；未配置 Key 时自动使用 **Mock 模式**。

### 常用 Provider 示例

| Provider | LLM_BASE_URL | LLM_MODEL |
|----------|--------------|-----------|
| OpenAI | https://api.openai.com/v1 | gpt-4o-mini |
| DeepSeek | https://api.deepseek.com/v1 | deepseek-chat |
| Moonshot | https://api.moonshot.cn/v1 | moonshot-v1-8k |

## 项目结构

```
src/
├── app/                 # Next.js App Router
├── components/
│   ├── layout/          # 布局组件
│   ├── steps/           # 流程步骤页面
│   ├── shared/          # 共享 UI 辅助
│   └── ui/              # shadcn/ui 组件
├── services/ai/         # AI 服务层
│   ├── resumeAgent.ts         # 客户端 API 调用
│   ├── resumeAgent.server.ts  # 服务端路由（Mock / LLM 切换）
│   ├── resumeAgent.llm.ts     # 真实大模型调用
│   └── resumeAgent.mock.ts    # Mock 数据
├── app/api/             # Next.js API Routes（保护 API Key）
│   ├── analyze/
│   ├── optimize/
│   └── follow-up/bullet/
├── store/               # Zustand 状态管理
└── types/               # TypeScript 类型定义
```
