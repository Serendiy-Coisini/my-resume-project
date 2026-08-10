# 绠€鍘嗕笓瀹?鍟嗕笟鍖栧疄鏂芥枃妗ｏ紙缁?Gemini 鐨勫畬鏁存墽琛屾墜鍐岋級

> **鐩爣**锛氬皢銆岀畝鍘嗕笓瀹躲€嶄粠涓汉椤圭洰鍗囩骇涓哄彲鍟嗙敤鍞崠鐨?SaaS 浜у搧銆?> **绾︽潫**锛氶潰鍚戝浗鍐呯敤鎴枫€侀儴缃插湪鍥藉唴浜戞湇鍔°€乺esume-design-main 閲囩敤鏂规 A 娣卞害闆嗘垚銆佷笉鍋氬璇█銆?
---

## 涓€銆佸綋鍓嶉」鐩灦鏋勬瑙?
### 1.1 鎶€鏈爤
- **妗嗘灦**: Next.js 15 (App Router) + TypeScript
- **鏍峰紡**: Tailwind CSS 3 + shadcn/ui (Radix UI)
- **鐘舵€佺鐞?*: Zustand (persist 鍒?localStorage)
- **AI 鏈嶅姟**: OpenAI 鍏煎鎺ュ彛 (DeepSeek/OpenAI/Moonshot)锛屾敮鎸?Mock 妯″紡
- **瑙ｆ瀽**: pdf-parse (PDF)銆乵ammoth (Word)
- **瀵煎嚭**: html2canvas
- **鏍￠獙**: Zod

### 1.2 椤圭洰鐩綍缁撴瀯
```
d:\desktop\resume-expert\
鈹溾攢鈹€ src/
鈹?  鈹溾攢鈹€ app/                         # Next.js App Router
鈹?  鈹?  鈹溾攢鈹€ page.tsx                 # 棣栭〉锛堢潃闄嗛〉锛?鈹?  鈹?  鈹溾攢鈹€ layout.tsx               # 鏍瑰竷灞€
鈹?  鈹?  鈹溾攢鈹€ error.tsx                # 鍏ㄥ眬閿欒杈圭晫
鈹?  鈹?  鈹溾攢鈹€ globals.css              # 鍏ㄥ眬鏍峰紡
鈹?  鈹?  鈹溾攢鈹€ expert/page.tsx          # AI 绠€鍘嗕笓瀹堕〉闈?鈹?  鈹?  鈹溾攢鈹€ designer/               # 绠€鍘嗚璁″櫒椤甸潰
鈹?  鈹?  鈹?  鈹溾攢鈹€ layout.tsx
鈹?  鈹?  鈹?  鈹斺攢鈹€ page.tsx
鈹?  鈹?  鈹溾攢鈹€ builder/                 # (绌虹洰褰?
鈹?  鈹?  鈹斺攢鈹€ api/                     # API 璺敱
鈹?  鈹?      鈹溾攢鈹€ ai/                  # AI 鐘舵€佹煡璇?鈹?  鈹?      鈹溾攢鈹€ analyze/             # 绠€鍘嗗垎鏋?API
鈹?  鈹?      鈹溾攢鈹€ optimize/            # 閲嶆柊浼樺寲 API
鈹?  鈹?      鈹溾攢鈹€ follow-up/           # 杩介棶鐢熸垚 bullet API
鈹?  鈹?      鈹溾攢鈹€ apply-followup/      # 搴旂敤杩介棶缁撴灉 API
鈹?  鈹?      鈹溾攢鈹€ extract-template/    # 鎻愬彇妯℃澘 API
鈹?  鈹?      鈹斺攢鈹€ parse-pdf/           # PDF 瑙ｆ瀽 API
鈹?  鈹溾攢鈹€ components/
鈹?  鈹?  鈹溾攢鈹€ layout/                  # 甯冨眬缁勪欢锛堝鑸爮銆佷晶杈规爮绛夛級
鈹?  鈹?  鈹溾攢鈹€ steps/                   # 娴佺▼姝ラ椤甸潰缁勪欢
鈹?  鈹?  鈹?  鈹溾攢鈹€ input-step.tsx       # 杈撳叆姝ラ (40KB锛屾渶澶х粍浠?
鈹?  鈹?  鈹?  鈹溾攢鈹€ jd-analysis-step.tsx # JD 鍒嗘瀽灞曠ず
鈹?  鈹?  鈹?  鈹溾攢鈹€ diagnosis-step.tsx   # 绠€鍘嗚瘖鏂?鈹?  鈹?  鈹?  鈹溾攢鈹€ match-step.tsx       # 鍖归厤搴﹀垎鏋?鈹?  鈹?  鈹?  鈹溾攢鈹€ follow-up-step.tsx   # 缁忓巻杩介棶
鈹?  鈹?  鈹?  鈹溾攢鈹€ optimize-step.tsx    # 浼樺寲寤鸿
鈹?  鈹?  鈹?  鈹溾攢鈹€ interview-step.tsx   # 闈㈣瘯鍑嗗
鈹?  鈹?  鈹?  鈹溾攢鈹€ export-step.tsx      # 瀵煎嚭缁撴灉 (29KB)
鈹?  鈹?  鈹?  鈹斺攢鈹€ step-content.tsx     # 姝ラ瀹瑰櫒
鈹?  鈹?  鈹溾攢鈹€ shared/                  # 鍏变韩杈呭姪缁勪欢
鈹?  鈹?  鈹溾攢鈹€ legoDesigner/            # 绉湪寮忕畝鍘嗚璁″櫒缁勪欢
鈹?  鈹?  鈹斺攢鈹€ ui/                      # shadcn/ui 鍩虹缁勪欢
鈹?  鈹溾攢鈹€ services/ai/                 # AI 鏈嶅姟灞?鈹?  鈹?  鈹溾攢鈹€ resumeAgent.ts           # 瀹㈡埛绔?API 璋冪敤灞?鈹?  鈹?  鈹溾攢鈹€ resumeAgent.server.ts    # 鏈嶅姟绔矾鐢憋紙Mock/LLM 鍒囨崲锛?鈹?  鈹?  鈹溾攢鈹€ resumeAgent.llm.ts       # 鐪熷疄 LLM 璋冪敤
鈹?  鈹?  鈹斺攢鈹€ resumeAgent.mock.ts      # Mock 鏁版嵁 (49KB)
鈹?  鈹溾攢鈹€ store/
鈹?  鈹?  鈹溾攢鈹€ resume-store.ts          # 涓荤姸鎬?(Zustand + persist)
鈹?  鈹?  鈹斺攢鈹€ lego-designer-store.ts   # 璁捐鍣ㄧ姸鎬?鈹?  鈹溾攢鈹€ lib/
鈹?  鈹?  鈹溾攢鈹€ ai/                      # AI 閰嶇疆鍜屽伐鍏?鈹?  鈹?  鈹?  鈹溾攢鈹€ client.ts            # LLM 瀹㈡埛绔皝瑁?鈹?  鈹?  鈹?  鈹溾攢鈹€ config.ts            # AI 閰嶇疆璇诲彇
鈹?  鈹?  鈹?  鈹溾攢鈹€ prompts.ts           # Prompt 妯℃澘 (30KB)
鈹?  鈹?  鈹?  鈹溾攢鈹€ schemas.ts           # Zod 鏍￠獙 schema
鈹?  鈹?  鈹?  鈹溾攢鈹€ parse-json.ts        # JSON 瑙ｆ瀽宸ュ叿
鈹?  鈹?  鈹?  鈹溾攢鈹€ types.ts             # AI 绫诲瀷瀹氫箟
鈹?  鈹?  鈹?  鈹斺攢鈹€ errors.ts            # 閿欒绫诲瀷
鈹?  鈹?  鈹溾攢鈹€ privacy/pii.ts           # PII 鑴辨晱锛堟墜鏈?閭/韬唤璇?寰俊鍙?濮撳悕锛?鈹?  鈹?  鈹溾攢鈹€ resume-templates.ts      # 绠€鍘嗘ā鏉?HTML (40KB)
鈹?  鈹?  鈹溾攢鈹€ preset-templates.ts      # 棰勮妯℃澘 (21KB)
鈹?  鈹?  鈹溾攢鈹€ lego-adapter.ts          # 绉湪閫傞厤鍣?(48KB)
鈹?  鈹?  鈹溾攢鈹€ schema-normalizer.ts     # Schema 鏍囧噯鍖?(22KB)
鈹?  鈹?  鈹溾攢鈹€ export-analysis-pdf.ts   # 鍒嗘瀽鎶ュ憡 PDF 瀵煎嚭 (24KB)
鈹?  鈹?  鈹溾攢鈹€ english-resume-builder.ts # 鑻辨枃绠€鍘嗘瀯寤?(13KB)
鈹?  鈹?  鈹溾攢鈹€ company-config.ts        # 鍏徃绫诲瀷閰嶇疆
鈹?  鈹?  鈹溾攢鈹€ job-stage-config.ts      # 姹傝亴闃舵閰嶇疆
鈹?  鈹?  鈹溾攢鈹€ resume-model-data.ts     # 绠€鍘嗘ā鍨嬫暟鎹?鈹?  鈹?  鈹斺攢鈹€ utils.ts                 # 宸ュ叿鍑芥暟
鈹?  鈹斺攢鈹€ types/
鈹?      鈹溾攢鈹€ resume.ts                # 绠€鍘嗙浉鍏崇被鍨嬪畾涔?鈹?      鈹斺攢鈹€ lego.ts                  # 绉湪璁捐鍣ㄧ被鍨?鈹溾攢鈹€ resume-design-main/              # 鐙珛 Vue 绠€鍘嗚璁￠」鐩紙寰呮繁搴﹂泦鎴愶級
鈹溾攢鈹€ public/                          # 闈欐€佽祫婧?鈹溾攢鈹€ .env.example                     # 鐜鍙橀噺妯℃澘
鈹溾攢鈹€ .env.local                       # 瀹為檯鐜鍙橀噺
鈹溾攢鈹€ package.json
鈹溾攢鈹€ tailwind.config.ts
鈹溾攢鈹€ tsconfig.json
鈹斺攢鈹€ next.config.ts
```

### 1.3 鍏抽敭鏁版嵁娴?
```
鐢ㄦ埛杈撳叆 (UserInput)
    鈫?[瀹㈡埛绔痌 resumeAgent.ts 鈫?fetch("/api/analyze/stream")
    鈫?[鏈嶅姟绔痌 API Route 鈫?resumeAgent.server.ts 鈫?resumeAgent.llm.ts / .mock.ts
    鈫?[LLM] 4 闃舵涓茶/骞惰璋冪敤锛欽D鍒嗘瀽 鈫?璇婃柇+鍖归厤 鈫?浼樺寲+绠€鍘嗙敓鎴?鈫?闈㈣瘯鍑嗗
    鈫?[瀹㈡埛绔痌 SSE 娴佸紡鎺ユ敹 鈫?Zustand store 鏇存柊 鈫?鍚?Step 缁勪欢娓叉煋
    鈫?[瀵煎嚭] html2canvas 鈫?鍥剧墖/PDF
```

### 1.4 鍏抽敭绫诲瀷瀹氫箟锛堜綅浜?src/types/resume.ts锛?
```typescript
interface UserInput {
  targetRole: string;        // 鐩爣宀椾綅
  industry: string;          // 琛屼笟
  companyType: CompanyType;  // 鍏徃绫诲瀷
  jobStage: JobStage;        // 姹傝亴闃舵
  highlightSkills: string;   // 閲嶇偣鎶€鑳?  jobDescription: string;    // JD 鍐呭
  originalResume: string;    // 鍘熷绠€鍘?  additionalInfo: string;    // 琛ュ厖淇℃伅
  avatarUrl?: string;
  rawFileName?: string;
  rawFileType?: string;
  rawFileDataUrl?: string;
}

interface AnalysisResult {
  jdAnalysis: JDAnalysis;              // JD 瑙ｆ瀽缁撴灉
  diagnosis: ResumeDiagnosis;          // 绠€鍘嗚瘖鏂?  matchItems: MatchItem[];             // 鍖归厤搴﹀垎鏋?  followUpQuestions: FollowUpQuestion[]; // 杩介棶闂
  optimizedItems: OptimizedItem[];     // 浼樺寲寤鸿
  finalResume: FinalResume;            // 浼樺寲鍚庣畝鍘?  englishResume?: FinalResume;         // 鑻辨枃绠€鍘?  interviewPrep: InterviewPrep;        // 闈㈣瘯鍑嗗
}
```

---

## 浜屻€佹柊澧炰緷璧栨竻鍗?
鍦ㄥ紑濮嬪疄鏂藉墠锛岄渶瑕佸畨瑁呬互涓嬩緷璧栵細

```bash
# ============ 鏍稿績鍩虹璁炬柦 ============
# 鏁版嵁搴?ORM
npm install prisma @prisma/client
npx prisma init

# 鐢ㄦ埛璁よ瘉
npm install next-auth@5 @auth/prisma-adapter bcryptjs
npm install -D @types/bcryptjs

# ============ 鏀粯 ============
# 寰俊鏀粯 + 鏀粯瀹濓紙浣跨敤 alipay-sdk锛?npm install wechatpay-node-v3 alipay-sdk

# ============ 瀹夊叏 ============
# 閫熺巼闄愬埗
npm install @upstash/ratelimit @upstash/redis
# CSRF 闃叉姢锛圢ext.js 15 鑷甫閮ㄥ垎鑳藉姏锛岃ˉ鍏?CSP锛?# 鏃犻渶棰濆瀹夎

# ============ 鐩戞帶 ============
npm install @sentry/nextjs
# 鏃ュ織
npm install pino

# ============ 瀵煎嚭澧炲己 ============
# 鏈嶅姟绔?PDF
npm install puppeteer
# Word 瀵煎嚭
npm install docx file-saver
npm install -D @types/file-saver

# ============ 鏂囦欢瀛樺偍 ============
# 闃块噷浜?OSS
npm install ali-oss
npm install -D @types/ali-oss

# ============ 宸ュ叿 ============
# 鐭俊楠岃瘉鐮侊紙闃块噷浜戠煭淇★級
npm install @alicloud/dysmsapi20170525 @alicloud/openapi-client @alicloud/tea-util
# 鍞竴 ID
npm install nanoid
# 閭欢鍙戦€?npm install nodemailer
npm install -D @types/nodemailer
```

---

## 涓夈€佺幆澧冨彉閲忛厤缃?
鏇存柊 `.env.example`锛屾柊澧炰互涓嬪彉閲忥細

```env
# ========== 鍘熸湁 AI 閰嶇疆 ==========
LLM_API_KEY=sk-your-key-here
LLM_BASE_URL=https://api.deepseek.com/v1
LLM_MODEL=deepseek-chat
LLM_PROVIDER=deepseek

# ========== 鏁版嵁搴?==========
DATABASE_URL="postgresql://user:password@localhost:5432/resume_expert?schema=public"

# ========== NextAuth ==========
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here-generate-with-openssl-rand-base64-32

# ========== 闃块噷浜戠煭淇?==========
ALIYUN_ACCESS_KEY_ID=your-access-key
ALIYUN_ACCESS_KEY_SECRET=your-access-secret
ALIYUN_SMS_SIGN_NAME=绠€鍘嗕笓瀹?ALIYUN_SMS_TEMPLATE_CODE=SMS_123456789

# ========== 寰俊鐧诲綍 ==========
WECHAT_APP_ID=wx-your-app-id
WECHAT_APP_SECRET=your-wechat-secret

# ========== 寰俊鏀粯 ==========
WECHAT_PAY_MCH_ID=your-merchant-id
WECHAT_PAY_API_KEY=your-api-v3-key
WECHAT_PAY_SERIAL_NO=your-cert-serial
WECHAT_PAY_PRIVATE_KEY_PATH=./certs/apiclient_key.pem
WECHAT_PAY_NOTIFY_URL=https://yourdomain.com/api/payment/wechat/notify

# ========== 鏀粯瀹?==========
ALIPAY_APP_ID=your-alipay-app-id
ALIPAY_PRIVATE_KEY=your-private-key
ALIPAY_PUBLIC_KEY=alipay-public-key
ALIPAY_NOTIFY_URL=https://yourdomain.com/api/payment/alipay/notify

# ========== 闃块噷浜?OSS ==========
OSS_REGION=oss-cn-beijing
OSS_ACCESS_KEY_ID=your-oss-key
OSS_ACCESS_KEY_SECRET=your-oss-secret
OSS_BUCKET=resume-expert-files

# ========== Upstash Redis (閫熺巼闄愬埗) ==========
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# ========== Sentry ==========
SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_AUTH_TOKEN=your-sentry-auth-token

# ========== 閭欢 (SMTP) ==========
SMTP_HOST=smtp.exmail.qq.com
SMTP_PORT=465
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-smtp-password

# ========== 搴旂敤閰嶇疆 ==========
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=绠€鍘嗕笓瀹?```

---

## 鍥涖€佹暟鎹簱璁捐 (Prisma Schema)

### 鍒涘缓鏂囦欢: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============ 鐢ㄦ埛璁よ瘉鐩稿叧 ============

model User {
  id            String    @id @default(cuid())
  phone         String?   @unique        // 鎵嬫満鍙风櫥褰?  email         String?   @unique        // 閭鐧诲綍
  emailVerified DateTime?
  passwordHash  String?                  // 閭瀵嗙爜鐧诲綍鏃朵娇鐢?  name          String?
  avatar        String?
  
  // 浼氬憳淇℃伅
  plan          PlanType  @default(FREE)
  planExpiresAt DateTime?               // 浼氬憳鍒版湡鏃堕棿
  
  // 浣跨敤缁熻
  totalAnalyses   Int     @default(0)   // 绱鍒嗘瀽娆℃暟
  monthlyUsed     Int     @default(0)   // 鏈湀宸茬敤娆℃暟
  monthlyResetAt  DateTime?             // 鏈堝害閲嶇疆鏃堕棿
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // 鍏宠仈
  accounts      Account[]
  sessions      Session[]
  projects      ResumeProject[]
  payments      Payment[]
  usageLogs     UsageLog[]
  verificationCodes VerificationCode[]
  
  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String  // "wechat" | "credentials"
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationCode {
  id        String   @id @default(cuid())
  userId    String?
  target    String             // 鎵嬫満鍙锋垨閭
  code      String             // 楠岃瘉鐮?  type      VerificationType   // LOGIN / REGISTER / RESET_PASSWORD
  expiresAt DateTime
  used      Boolean  @default(false)
  createdAt DateTime @default(now())

  user User? @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([target, code])
  @@map("verification_codes")
}

// ============ 绠€鍘嗛」鐩?============

model ResumeProject {
  id        String   @id @default(cuid())
  userId    String
  title     String   @default("鏈懡鍚嶇畝鍘?)
  
  // 鐢ㄦ埛杈撳叆 (JSON)
  userInput       Json          // 瀛樺偍 UserInput 绫诲瀷
  optimizeStyle   String        @default("concise")
  
  // 鍒嗘瀽缁撴灉 (JSON, 鍙兘寰堝ぇ)
  analysisResult  Json?         // 瀛樺偍 AnalysisResult 绫诲瀷
  
  // 璁捐鍣ㄧ浉鍏?  templateId      String        @default("modern-sidebar")
  templateOptions Json?         // 瀛樺偍 TemplateOptions
  customTemplateHTML String?    @db.Text
  legoDesignerState  Json?      // 绉湪璁捐鍣ㄧ姸鎬?  
  // 瀵煎嚭鐩稿叧
  lastExportedPdfUrl  String?   // 鏈€杩戝鍑虹殑 PDF 鍦?OSS 涓婄殑 URL
  shareToken          String?   @unique  // 鍒嗕韩浠ょ墝
  shareEnabled        Boolean   @default(false)
  
  // 鍏冧俊鎭?  status    ProjectStatus @default(DRAFT)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, updatedAt(sort: Desc)])
  @@map("resume_projects")
}

// ============ 鏀粯鐩稿叧 ============

model Payment {
  id            String        @id @default(cuid())
  userId        String
  
  // 璁㈠崟淇℃伅
  orderId       String        @unique     // 涓氬姟璁㈠崟鍙?  outTradeNo    String?       @unique     // 绗笁鏂规敮浠樿鍗曞彿
  amount        Int                       // 閲戦锛堝垎锛?  productType   ProductType               // 璐拱鐨勪骇鍝佺被鍨?  productDetail String?                   // 浜у搧璇︽儏鎻忚堪
  
  // 鏀粯淇℃伅
  payMethod     PayMethod                 // 鏀粯鏂瑰紡
  status        PaymentStatus @default(PENDING)
  paidAt        DateTime?
  
  // 浼氬憳鐩稿叧
  planType      PlanType?                 // 濡傛灉鏄細鍛樿喘涔?  planDuration  Int?                      // 浼氬憳鏃堕暱锛堝ぉ锛?  
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, createdAt(sort: Desc)])
  @@index([status])
  @@map("payments")
}

// ============ 浣跨敤鏃ュ織 ============

model UsageLog {
  id          String   @id @default(cuid())
  userId      String
  
  action      UsageAction              // 浣跨敤鍔ㄤ綔绫诲瀷
  projectId   String?                  // 鍏宠仈鐨勭畝鍘嗛」鐩?  
  // AI 璋冪敤璇︽儏
  llmProvider String?                  // deepseek / openai 绛?  llmModel    String?
  tokensUsed  Int?                     // token 娑堣€?  durationMs  Int?                     // 鑰楁椂姣
  success     Boolean  @default(true)
  errorMsg    String?
  
  // 璇锋眰鍏冧俊鎭?  ip          String?
  userAgent   String?
  
  createdAt   DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, createdAt(sort: Desc)])
  @@index([action])
  @@map("usage_logs")
}

// ============ 妯℃澘鍟嗗簵 ============

model ResumeTemplate {
  id            String   @id @default(cuid())
  name          String
  description   String?
  thumbnailUrl  String?                 // 棰勮鍥?URL
  htmlContent   String   @db.Text       // 妯℃澘 HTML
  
  category      String   @default("general")  // 鍒嗙被
  tags          String[] @default([])          // 鏍囩
  
  isFree        Boolean  @default(false)
  price         Int      @default(0)           // 浠锋牸锛堝垎锛?  
  // 缁熻
  useCount      Int      @default(0)
  
  isPublished   Boolean  @default(false)
  sortOrder     Int      @default(0)
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@map("resume_templates")
}

// ============ 绯荤粺閰嶇疆 ============

model SystemConfig {
  id    String @id @default(cuid())
  key   String @unique
  value String @db.Text
  
  updatedAt DateTime @updatedAt

  @@map("system_configs")
}

// ============ 鏋氫妇 ============

enum PlanType {
  FREE          // 鍏嶈垂鐗?  SINGLE_USE    // 鍗曟浠樿垂锛堥潪浼氬憳锛?  MONTHLY       // 鏈堝害浼氬憳
  YEARLY        // 骞村害浼氬憳
}

enum ProjectStatus {
  DRAFT         // 鑽夌
  ANALYZED      // 宸插垎鏋?  EXPORTED      // 宸插鍑?  ARCHIVED      // 宸插綊妗?}

enum ProductType {
  SINGLE_ANALYSIS  // 鍗曟鍒嗘瀽
  MONTHLY_PLAN     // 鏈堝害浼氬憳
  YEARLY_PLAN      // 骞村害浼氬憳
  TEMPLATE         // 妯℃澘璐拱
}

enum PayMethod {
  WECHAT    // 寰俊鏀粯
  ALIPAY    // 鏀粯瀹?}

enum PaymentStatus {
  PENDING    // 寰呮敮浠?  PAID       // 宸叉敮浠?  FAILED     // 澶辫触
  REFUNDED   // 宸查€€娆?  EXPIRED    // 宸茶繃鏈?}

enum UsageAction {
  ANALYZE           // 绠€鍘嗗垎鏋?  OPTIMIZE          // 閲嶆柊浼樺寲
  FOLLOW_UP_BULLET  // 杩介棶鐢熸垚
  APPLY_FOLLOWUP    // 搴旂敤杩介棶
  EXPORT_PDF        // 瀵煎嚭 PDF
  EXPORT_WORD       // 瀵煎嚭 Word
  EXTRACT_TEMPLATE  // 鎻愬彇妯℃澘
}

enum VerificationType {
  LOGIN
  REGISTER
  RESET_PASSWORD
}
```

---

## 浜斻€佺洰褰曠粨鏋勮鍒掞紙鏂板鏂囦欢锛?
浠ヤ笅鏄墍鏈夐渶瑕佹柊澧炲拰淇敼鐨勬枃浠舵竻鍗曪紝鎸夋ā鍧楀垎缁勶細

```
src/
鈹溾攢鈹€ app/
鈹?  鈹溾攢鈹€ api/
鈹?  鈹?  鈹溾攢鈹€ auth/[...nextauth]/route.ts          # [NEW] NextAuth 璺敱
鈹?  鈹?  鈹溾攢鈹€ auth/send-code/route.ts              # [NEW] 鍙戦€侀獙璇佺爜
鈹?  鈹?  鈹溾攢鈹€ auth/verify-code/route.ts            # [NEW] 楠岃瘉鐮佺櫥褰?鈹?  鈹?  鈹溾攢鈹€ payment/
鈹?  鈹?  鈹?  鈹溾攢鈹€ create-order/route.ts            # [NEW] 鍒涘缓璁㈠崟
鈹?  鈹?  鈹?  鈹溾攢鈹€ wechat/notify/route.ts           # [NEW] 寰俊鏀粯鍥炶皟
鈹?  鈹?  鈹?  鈹溾攢鈹€ alipay/notify/route.ts           # [NEW] 鏀粯瀹濆洖璋?鈹?  鈹?  鈹?  鈹斺攢鈹€ status/route.ts                  # [NEW] 鏌ヨ璁㈠崟鐘舵€?鈹?  鈹?  鈹溾攢鈹€ projects/
鈹?  鈹?  鈹?  鈹溾攢鈹€ route.ts                         # [NEW] 椤圭洰鍒楄〃 + 鍒涘缓
鈹?  鈹?  鈹?  鈹溾攢鈹€ [id]/route.ts                    # [NEW] 椤圭洰璇︽儏/鏇存柊/鍒犻櫎
鈹?  鈹?  鈹?  鈹斺攢鈹€ [id]/share/route.ts              # [NEW] 鐢熸垚鍒嗕韩閾炬帴
鈹?  鈹?  鈹溾攢鈹€ templates/
鈹?  鈹?  鈹?  鈹溾攢鈹€ route.ts                         # [NEW] 妯℃澘鍒楄〃
鈹?  鈹?  鈹?  鈹斺攢鈹€ [id]/route.ts                    # [NEW] 妯℃澘璇︽儏
鈹?  鈹?  鈹溾攢鈹€ export/
鈹?  鈹?  鈹?  鈹溾攢鈹€ pdf/route.ts                     # [NEW] 鏈嶅姟绔?PDF 鐢熸垚
鈹?  鈹?  鈹?  鈹斺攢鈹€ word/route.ts                    # [NEW] Word 瀵煎嚭
鈹?  鈹?  鈹溾攢鈹€ user/
鈹?  鈹?  鈹?  鈹溾攢鈹€ profile/route.ts                 # [NEW] 鐢ㄦ埛淇℃伅
鈹?  鈹?  鈹?  鈹斺攢鈹€ usage/route.ts                   # [NEW] 浣跨敤缁熻
鈹?  鈹?  鈹溾攢鈹€ analyze/route.ts                     # [MODIFY] 娣诲姞閴存潈+闄愰
鈹?  鈹?  鈹溾攢鈹€ analyze/stream/route.ts              # [MODIFY] 娣诲姞閴存潈+闄愰
鈹?  鈹?  鈹溾攢鈹€ optimize/route.ts                    # [MODIFY] 娣诲姞閴存潈
鈹?  鈹?  鈹溾攢鈹€ follow-up/bullet/route.ts            # [MODIFY] 娣诲姞閴存潈
鈹?  鈹?  鈹斺攢鈹€ apply-followup/route.ts              # [MODIFY] 娣诲姞閴存潈
鈹?  鈹溾攢鈹€ dashboard/
鈹?  鈹?  鈹溾攢鈹€ page.tsx                             # [NEW] 鐢ㄦ埛浠〃鐩?鈹?  鈹?  鈹斺攢鈹€ layout.tsx                           # [NEW] 浠〃鐩樺竷灞€
鈹?  鈹溾攢鈹€ share/[token]/page.tsx                   # [NEW] 绠€鍘嗗垎浜〉
鈹?  鈹溾攢鈹€ pricing/page.tsx                         # [NEW] 瀹氫环椤甸潰
鈹?  鈹溾攢鈹€ privacy/page.tsx                         # [NEW] 闅愮鏀跨瓥
鈹?  鈹溾攢鈹€ terms/page.tsx                           # [NEW] 鐢ㄦ埛鍗忚
鈹?  鈹溾攢鈹€ templates/page.tsx                       # [NEW] 妯℃澘鍟嗗簵
鈹?  鈹溾攢鈹€ page.tsx                                 # [MODIFY] 閲嶆瀯鐫€闄嗛〉
鈹?  鈹溾攢鈹€ layout.tsx                               # [MODIFY] 鍖呰９ Provider
鈹?  鈹斺攢鈹€ error.tsx                                # [MODIFY] 闆嗘垚 Sentry
鈹?鈹溾攢鈹€ components/
鈹?  鈹溾攢鈹€ auth/
鈹?  鈹?  鈹溾攢鈹€ login-modal.tsx                      # [NEW] 鐧诲綍寮圭獥
鈹?  鈹?  鈹溾攢鈹€ phone-login-form.tsx                 # [NEW] 鎵嬫満鍙风櫥褰曡〃鍗?鈹?  鈹?  鈹溾攢鈹€ email-login-form.tsx                 # [NEW] 閭鐧诲綍琛ㄥ崟
鈹?  鈹?  鈹溾攢鈹€ wechat-login-button.tsx              # [NEW] 寰俊鐧诲綍鎸夐挳
鈹?  鈹?  鈹斺攢鈹€ auth-guard.tsx                       # [NEW] 鐧诲綍鎬佸畧鍗?鈹?  鈹溾攢鈹€ pricing/
鈹?  鈹?  鈹溾攢鈹€ pricing-cards.tsx                    # [NEW] 瀹氫环鍗＄墖缁勪欢
鈹?  鈹?  鈹溾攢鈹€ pricing-modal.tsx                    # [NEW] 鍗囩骇寮圭獥
鈹?  鈹?  鈹斺攢鈹€ usage-limit-banner.tsx               # [NEW] 棰濆害涓嶈冻鎻愮ず
鈹?  鈹溾攢鈹€ dashboard/
鈹?  鈹?  鈹溾攢鈹€ project-list.tsx                     # [NEW] 椤圭洰鍒楄〃
鈹?  鈹?  鈹溾攢鈹€ project-card.tsx                     # [NEW] 椤圭洰鍗＄墖
鈹?  鈹?  鈹溾攢鈹€ usage-stats.tsx                      # [NEW] 浣跨敤缁熻
鈹?  鈹?  鈹斺攢鈹€ user-profile-card.tsx                # [NEW] 鐢ㄦ埛淇℃伅鍗?鈹?  鈹溾攢鈹€ payment/
鈹?  鈹?  鈹溾攢鈹€ payment-modal.tsx                    # [NEW] 鏀粯寮圭獥
鈹?  鈹?  鈹溾攢鈹€ qrcode-payment.tsx                   # [NEW] 鎵爜鏀粯缁勪欢
鈹?  鈹?  鈹斺攢鈹€ payment-success.tsx                  # [NEW] 鏀粯鎴愬姛椤?鈹?  鈹溾攢鈹€ templates/
鈹?  鈹?  鈹溾攢鈹€ template-gallery.tsx                 # [NEW] 妯℃澘鐢诲粖
鈹?  鈹?  鈹斺攢鈹€ template-preview-modal.tsx           # [NEW] 妯℃澘棰勮寮圭獥
鈹?  鈹溾攢鈹€ landing/
鈹?  鈹?  鈹溾攢鈹€ hero-section.tsx                     # [NEW] 棣栧睆 Hero
鈹?  鈹?  鈹溾攢鈹€ features-section.tsx                 # [NEW] 鍔熻兘浠嬬粛
鈹?  鈹?  鈹溾攢鈹€ testimonials-section.tsx             # [NEW] 鐢ㄦ埛璇勪环
鈹?  鈹?  鈹溾攢鈹€ pricing-section.tsx                  # [NEW] 瀹氫环鍖哄煙
鈹?  鈹?  鈹溾攢鈹€ faq-section.tsx                      # [NEW] FAQ
鈹?  鈹?  鈹溾攢鈹€ stats-section.tsx                    # [NEW] 鏁版嵁缁熻
鈹?  鈹?  鈹斺攢鈹€ footer.tsx                           # [NEW] 椤佃剼锛堝妗堢瓑锛?鈹?  鈹溾攢鈹€ shared/
鈹?  鈹?  鈹斺攢鈹€ watermark.tsx                        # [NEW] 姘村嵃缁勪欢
鈹?  鈹溾攢鈹€ layout/                                  # [MODIFY] 娣诲姞鐢ㄦ埛鑿滃崟
鈹?  鈹斺攢鈹€ steps/
鈹?      鈹溾攢鈹€ export-step.tsx                      # [MODIFY] 澧炲姞 Word/姘村嵃
鈹?      鈹斺攢鈹€ input-step.tsx                       # [MODIFY] 鍏宠仈椤圭洰淇濆瓨
鈹?鈹溾攢鈹€ lib/
鈹?  鈹溾攢鈹€ db.ts                                    # [NEW] Prisma 瀹㈡埛绔崟渚?鈹?  鈹溾攢鈹€ auth.ts                                  # [NEW] NextAuth 閰嶇疆
鈹?  鈹溾攢鈹€ auth-helpers.ts                          # [NEW] 閴存潈杈呭姪鍑芥暟
鈹?  鈹溾攢鈹€ rate-limit.ts                            # [NEW] 閫熺巼闄愬埗
鈹?  鈹溾攢鈹€ subscription.ts                          # [NEW] 浼氬憳/棰濆害妫€鏌?鈹?  鈹溾攢鈹€ payment/
鈹?  鈹?  鈹溾攢鈹€ wechat-pay.ts                        # [NEW] 寰俊鏀粯灏佽
鈹?  鈹?  鈹溾攢鈹€ alipay.ts                            # [NEW] 鏀粯瀹濆皝瑁?鈹?  鈹?  鈹斺攢鈹€ order.ts                             # [NEW] 璁㈠崟绠＄悊
鈹?  鈹溾攢鈹€ sms.ts                                   # [NEW] 鐭俊鍙戦€?鈹?  鈹溾攢鈹€ email.ts                                 # [NEW] 閭欢鍙戦€?鈹?  鈹溾攢鈹€ oss.ts                                   # [NEW] OSS 鏂囦欢涓婁紶
鈹?  鈹溾攢鈹€ logger.ts                                # [NEW] 缁撴瀯鍖栨棩蹇?鈹?  鈹溾攢鈹€ analytics.ts                             # [NEW] 鍩嬬偣涓婃姤
鈹?  鈹溾攢鈹€ export/
鈹?  鈹?  鈹溾攢鈹€ pdf-server.ts                        # [NEW] 鏈嶅姟绔?PDF 鐢熸垚
鈹?  鈹?  鈹斺攢鈹€ word-export.ts                       # [NEW] Word 鏂囨。鐢熸垚
鈹?  鈹斺攢鈹€ constants.ts                             # [NEW] 鍏ㄥ眬甯搁噺锛堝畾浠风瓑锛?鈹?鈹溾攢鈹€ middleware.ts                                # [NEW] 鍏ㄥ眬涓棿浠?鈹?鈹溾攢鈹€ services/ai/
鈹?  鈹溾攢鈹€ resumeAgent.ts                           # [MODIFY] 璋冪敤鍓嶆鏌ラ搴?鈹?  鈹斺攢鈹€ resumeAgent.server.ts                    # [MODIFY] 璁板綍浣跨敤鏃ュ織
鈹?鈹溾攢鈹€ store/
鈹?  鈹斺攢鈹€ resume-store.ts                          # [MODIFY] 澧炲姞浜戝悓姝?鈹?鈹斺攢鈹€ types/
    鈹溾攢鈹€ resume.ts                                # [MODIFY] 鍙兘寰皟
    鈹斺攢鈹€ next-auth.d.ts                           # [NEW] NextAuth 绫诲瀷鎵╁睍
```
# 绠€鍘嗕笓瀹?鍟嗕笟鍖栧疄鏂芥枃妗?- Part 2: 妯″潡 1-5 璇︾粏瀹炵幇

---

## 妯″潡 1锛氭暟鎹簱鍩虹璁炬柦

### 1.1 Prisma 瀹㈡埛绔崟渚?
#### [NEW] `src/lib/db.ts`

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
```

### 1.2 鍒濆鍖栨暟鎹簱

```bash
# 鐢熸垚 Prisma Client
npx prisma generate

# 鍒涘缓骞跺簲鐢ㄨ縼绉?npx prisma migrate dev --name init

# 鏌ョ湅鏁版嵁搴擄紙鍙€夛級
npx prisma studio
```

---

## 妯″潡 2锛氱敤鎴疯璇佷笌璐︽埛浣撶郴

### 2.1 NextAuth 閰嶇疆

#### [NEW] `src/lib/auth.ts`

```typescript
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 澶?  },
  pages: {
    signIn: "/",   // 鐧诲綍椤碉紙鐢ㄥ脊绐楋紝鎵€浠ユ寚鍚戦椤碉級
    error: "/",
  },
  providers: [
    // ========== 鎵嬫満楠岃瘉鐮佺櫥褰?==========
    CredentialsProvider({
      id: "phone",
      name: "鎵嬫満鍙风櫥褰?,
      credentials: {
        phone: { label: "鎵嬫満鍙?, type: "text" },
        code: { label: "楠岃瘉鐮?, type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.code) return null;

        const phone = credentials.phone as string;
        const code = credentials.code as string;

        // 楠岃瘉楠岃瘉鐮?        const verification = await prisma.verificationCode.findFirst({
          where: {
            target: phone,
            code,
            type: "LOGIN",
            used: false,
            expiresAt: { gt: new Date() },
          },
          orderBy: { createdAt: "desc" },
        });

        if (!verification) return null;

        // 鏍囪楠岃瘉鐮佸凡浣跨敤
        await prisma.verificationCode.update({
          where: { id: verification.id },
          data: { used: true },
        });

        // 鏌ユ壘鎴栧垱寤虹敤鎴?        let user = await prisma.user.findUnique({ where: { phone } });
        if (!user) {
          user = await prisma.user.create({
            data: {
              phone,
              name: `鐢ㄦ埛${phone.slice(-4)}`,
              plan: "FREE",
            },
          });
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.avatar,
        };
      },
    }),

    // ========== 閭瀵嗙爜鐧诲綍 ==========
    CredentialsProvider({
      id: "email",
      name: "閭鐧诲綍",
      credentials: {
        email: { label: "閭", type: "email" },
        password: { label: "瀵嗙爜", type: "password" },
        action: { label: "鎿嶄綔", type: "text" }, // "login" | "register"
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;
        const action = (credentials.action as string) || "login";

        if (action === "register") {
          // 娉ㄥ唽
          const existing = await prisma.user.findUnique({ where: { email } });
          if (existing) throw new Error("璇ラ偖绠卞凡娉ㄥ唽");

          const passwordHash = await bcrypt.hash(password, 12);
          const user = await prisma.user.create({
            data: {
              email,
              passwordHash,
              name: email.split("@")[0],
              plan: "FREE",
            },
          });

          return { id: user.id, name: user.name, email: user.email, image: user.avatar };
        }

        // 鐧诲綍
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) return null;

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) return null;

        return { id: user.id, name: user.name, email: user.email, image: user.avatar };
      },
    }),

    // ========== 寰俊鎵爜鐧诲綍 ==========
    // 寰俊鐧诲綍闇€瑕佽嚜瀹氫箟 Provider锛屽洜涓哄井淇?OAuth 涓嶅畬鍏ㄥ吋瀹规爣鍑嗗崗璁?    {
      id: "wechat",
      name: "寰俊鐧诲綍",
      type: "oauth",
      authorization: {
        url: "https://open.weixin.qq.com/connect/qrconnect",
        params: {
          appid: process.env.WECHAT_APP_ID,
          response_type: "code",
          scope: "snsapi_login",
          state: "",  // NextAuth 浼氳嚜鍔ㄥ～鍏?        },
      },
      token: {
        url: "https://api.weixin.qq.com/sns/oauth2/access_token",
        params: {
          appid: process.env.WECHAT_APP_ID,
          secret: process.env.WECHAT_APP_SECRET,
          grant_type: "authorization_code",
        },
      },
      userinfo: {
        url: "https://api.weixin.qq.com/sns/userinfo",
      },
      profile(profile: { openid: string; nickname: string; headimgurl: string }) {
        return {
          id: profile.openid,
          name: profile.nickname,
          image: profile.headimgurl,
        };
      },
      clientId: process.env.WECHAT_APP_ID!,
      clientSecret: process.env.WECHAT_APP_SECRET!,
    },
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      // 姣忔閮戒粠鏁版嵁搴撹幏鍙栨渶鏂扮殑 plan 淇℃伅
      if (token.userId) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.userId as string },
          select: { plan: true, planExpiresAt: true, name: true, avatar: true, monthlyUsed: true },
        });
        if (dbUser) {
          // 妫€鏌ヤ細鍛樻槸鍚﹁繃鏈?          if (dbUser.plan !== "FREE" && dbUser.planExpiresAt && dbUser.planExpiresAt < new Date()) {
            await prisma.user.update({
              where: { id: token.userId as string },
              data: { plan: "FREE", planExpiresAt: null },
            });
            token.plan = "FREE";
          } else {
            token.plan = dbUser.plan;
          }
          token.name = dbUser.name;
          token.picture = dbUser.avatar;
          token.monthlyUsed = dbUser.monthlyUsed;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.plan = token.plan as string;
        session.user.monthlyUsed = token.monthlyUsed as number;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
```

### 2.2 NextAuth 绫诲瀷鎵╁睍

#### [NEW] `src/types/next-auth.d.ts`

```typescript
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan: string;
      monthlyUsed: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    plan?: string;
    monthlyUsed?: number;
  }
}
```

### 2.3 NextAuth API 璺敱

#### [NEW] `src/app/api/auth/[...nextauth]/route.ts`

```typescript
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
```

### 2.4 鐭俊楠岃瘉鐮佹湇鍔?
#### [NEW] `src/lib/sms.ts`

```typescript
import Dysmsapi20170525, * as $Dysmsapi from "@alicloud/dysmsapi20170525";
import * as $OpenApi from "@alicloud/openapi-client";
import * as $Util from "@alicloud/tea-util";

let client: Dysmsapi20170525 | null = null;

function getClient(): Dysmsapi20170525 {
  if (client) return client;

  const config = new $OpenApi.Config({
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
    endpoint: "dysmsapi.aliyuncs.com",
  });

  client = new Dysmsapi20170525(config);
  return client;
}

export async function sendSmsCode(phone: string, code: string): Promise<boolean> {
  try {
    const sendReq = new $Dysmsapi.SendSmsRequest({
      phoneNumbers: phone,
      signName: process.env.ALIYUN_SMS_SIGN_NAME,
      templateCode: process.env.ALIYUN_SMS_TEMPLATE_CODE,
      templateParam: JSON.stringify({ code }),
    });

    const runtime = new $Util.RuntimeOptions({});
    const result = await getClient().sendSmsWithOptions(sendReq, runtime);

    return result.body?.code === "OK";
  } catch (error) {
    console.error("鍙戦€佺煭淇″け璐?", error);
    return false;
  }
}
```

### 2.5 鍙戦€侀獙璇佺爜 API

#### [NEW] `src/app/api/auth/send-code/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendSmsCode } from "@/lib/sms";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    // 鏍￠獙鎵嬫満鍙锋牸寮?    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "鎵嬫満鍙锋牸寮忎笉姝ｇ‘" }, { status: 400 });
    }

    // 閫熺巼闄愬埗锛氬悓涓€鎵嬫満鍙?60s 鍐呭彧鑳藉彂涓€娆?    const rateLimitResult = await rateLimit(`sms:${phone}`, 1, "60s");
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "楠岃瘉鐮佸彂閫佸お棰戠箒锛岃 60 绉掑悗閲嶈瘯" },
        { status: 429 }
      );
    }

    // 鐢熸垚 6 浣嶉獙璇佺爜
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 瀛樺偍楠岃瘉鐮侊紙5 鍒嗛挓杩囨湡锛?    await prisma.verificationCode.create({
      data: {
        target: phone,
        code,
        type: "LOGIN",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    // 鍙戦€佺煭淇?    const sent = await sendSmsCode(phone, code);
    if (!sent) {
      return NextResponse.json({ error: "鐭俊鍙戦€佸け璐ワ紝璇风◢鍚庨噸璇? }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "楠岃瘉鐮佸凡鍙戦€? });
  } catch (error) {
    console.error("Send code error:", error);
    return NextResponse.json({ error: "鏈嶅姟鍣ㄩ敊璇? }, { status: 500 });
  }
}
```

### 2.6 閴存潈杈呭姪鍑芥暟

#### [NEW] `src/lib/auth-helpers.ts`

```typescript
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { Session } from "next-auth";

/**
 * 浠?API 璺敱涓幏鍙栧綋鍓嶇敤鎴?session銆? * 鏈櫥褰曟椂杩斿洖 null銆? */
export async function getServerSession(): Promise<Session | null> {
  return await auth();
}

/**
 * 瑕佹眰鐧诲綍鐨?API 璺敱瀹堝崼銆? * 鏈櫥褰曡繑鍥?401 鍝嶅簲锛屽凡鐧诲綍杩斿洖 session銆? */
export async function requireAuth(): Promise<
  { session: Session; response?: never } | { session?: never; response: NextResponse }
> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      response: NextResponse.json(
        { error: "璇峰厛鐧诲綍" },
        { status: 401 }
      ),
    };
  }

  return { session };
}

/**
 * 鑾峰彇褰撳墠鐢ㄦ埛 ID锛屾湭鐧诲綍杩斿洖 null銆? */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}
```

### 2.7 鍏ㄥ眬涓棿浠?
#### [NEW] `src/middleware.ts`

```typescript
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 闇€瑕佺櫥褰曟墠鑳借闂殑璺敱
const PROTECTED_ROUTES = [
  "/dashboard",
  "/expert",
  "/designer",
];

// 闇€瑕佺櫥褰曠殑 API 璺敱
const PROTECTED_API_ROUTES = [
  "/api/analyze",
  "/api/optimize",
  "/api/follow-up",
  "/api/apply-followup",
  "/api/extract-template",
  "/api/projects",
  "/api/export",
  "/api/user",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // 妫€鏌ユ槸鍚︽槸鍙椾繚鎶ょ殑椤甸潰璺敱
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // 妫€鏌ユ槸鍚︽槸鍙椾繚鎶ょ殑 API 璺敱
  const isProtectedAPI = PROTECTED_API_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!req.auth?.user) {
    if (isProtectedRoute) {
      // 椤甸潰璺敱锛氶噸瀹氬悜鍒伴椤碉紙浼氬脊鍑虹櫥褰曟锛?      const url = req.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("login", "required");
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    if (isProtectedAPI) {
      // API 璺敱锛氳繑鍥?401
      return NextResponse.json({ error: "璇峰厛鐧诲綍" }, { status: 401 });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // 鍖归厤鎵€鏈夐渶瑕佹鏌ョ殑璺敱锛屾帓闄ら潤鎬佹枃浠?    "/((?!_next/static|_next/image|favicon|icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

### 2.8 鐧诲綍寮圭獥缁勪欢

#### [NEW] `src/components/auth/login-modal.tsx`

```tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, MessageSquare, Loader2 } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callbackUrl?: string;
}

export function LoginModal({ open, onOpenChange, callbackUrl = "/dashboard" }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<"phone" | "email">("phone");

  // ---------- 鎵嬫満鍙风櫥褰曠姸鎬?----------
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);

  // ---------- 閭鐧诲綍鐘舵€?----------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const [error, setError] = useState("");

  // 鍙戦€侀獙璇佺爜
  const handleSendCode = async () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError("璇疯緭鍏ユ纭殑鎵嬫満鍙?);
      return;
    }
    setError("");
    setSendingCode(true);

    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "鍙戦€佸け璐?);
        return;
      }

      setCodeSent(true);
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setError("缃戠粶閿欒锛岃閲嶈瘯");
    } finally {
      setSendingCode(false);
    }
  };

  // 鎵嬫満鍙风櫥褰?  const handlePhoneLogin = async () => {
    setError("");
    setPhoneLoading(true);

    try {
      const result = await signIn("phone", {
        phone,
        code,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError("楠岃瘉鐮侀敊璇垨宸茶繃鏈?);
      } else if (result?.ok) {
        onOpenChange(false);
        window.location.href = callbackUrl;
      }
    } catch {
      setError("鐧诲綍澶辫触锛岃閲嶈瘯");
    } finally {
      setPhoneLoading(false);
    }
  };

  // 閭鐧诲綍/娉ㄥ唽
  const handleEmailLogin = async () => {
    if (!email || !password) {
      setError("璇峰～鍐欓偖绠卞拰瀵嗙爜");
      return;
    }
    setError("");
    setEmailLoading(true);

    try {
      const result = await signIn("email", {
        email,
        password,
        action: isRegister ? "register" : "login",
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError(isRegister ? "娉ㄥ唽澶辫触锛岃閭鍙兘宸茶浣跨敤" : "閭鎴栧瘑鐮侀敊璇?);
      } else if (result?.ok) {
        onOpenChange(false);
        window.location.href = callbackUrl;
      }
    } catch {
      setError("鎿嶄綔澶辫触锛岃閲嶈瘯");
    } finally {
      setEmailLoading(false);
    }
  };

  // 寰俊鐧诲綍
  const handleWechatLogin = () => {
    signIn("wechat", { callbackUrl });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] bg-slate-950 border-slate-800 text-slate-50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            鐧诲綍绠€鍘嗕笓瀹?          </DialogTitle>
          <p className="text-sm text-slate-400 text-center">
            鐧诲綍鍚庡彲淇濆瓨绠€鍘嗐€佷娇鐢?AI 鍒嗘瀽绛夊叏閮ㄥ姛鑳?          </p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "phone" | "email")} className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-slate-900">
            <TabsTrigger value="phone" className="gap-2">
              <Phone className="w-4 h-4" /> 鎵嬫満鍙?            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2">
              <Mail className="w-4 h-4" /> 閭
            </TabsTrigger>
          </TabsList>

          {/* 鎵嬫満鍙风櫥褰?*/}
          <TabsContent value="phone" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>鎵嬫満鍙?/Label>
              <Input
                placeholder="璇疯緭鍏ユ墜鏈哄彿"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-slate-900 border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>楠岃瘉鐮?/Label>
              <div className="flex gap-2">
                <Input
                  placeholder="6浣嶉獙璇佺爜"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                  className="bg-slate-900 border-slate-700"
                />
                <Button
                  variant="outline"
                  onClick={handleSendCode}
                  disabled={sendingCode || countdown > 0}
                  className="whitespace-nowrap min-w-[110px] border-slate-700"
                >
                  {sendingCode ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : countdown > 0 ? (
                    `${countdown}s`
                  ) : (
                    "鑾峰彇楠岃瘉鐮?
                  )}
                </Button>
              </div>
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handlePhoneLogin}
              disabled={phoneLoading || !codeSent}
            >
              {phoneLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              鐧诲綍 / 鑷姩娉ㄥ唽
            </Button>
          </TabsContent>

          {/* 閭鐧诲綍 */}
          <TabsContent value="email" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>閭</Label>
              <Input
                type="email"
                placeholder="璇疯緭鍏ラ偖绠?
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900 border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label>瀵嗙爜</Label>
              <Input
                type="password"
                placeholder="璇疯緭鍏ュ瘑鐮?
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-900 border-slate-700"
              />
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleEmailLogin}
              disabled={emailLoading}
            >
              {emailLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {isRegister ? "娉ㄥ唽" : "鐧诲綍"}
            </Button>
            <p className="text-center text-sm text-slate-400">
              {isRegister ? "宸叉湁璐﹀彿锛? : "娌℃湁璐﹀彿锛?}
              <button
                className="text-blue-400 hover:underline ml-1"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "鍘荤櫥褰? : "鍘绘敞鍐?}
              </button>
            </p>
          </TabsContent>
        </Tabs>

        {/* 寰俊鐧诲綍 */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-950 px-2 text-slate-500">鍏朵粬鐧诲綍鏂瑰紡</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full gap-2 border-slate-700 hover:bg-slate-900"
          onClick={handleWechatLogin}
        >
          <MessageSquare className="w-4 h-4 text-green-500" />
          寰俊鎵爜鐧诲綍
        </Button>

        {error && (
          <p className="text-red-400 text-sm text-center mt-2">{error}</p>
        )}

        <p className="text-xs text-slate-500 text-center mt-4">
          鐧诲綍鍗宠〃绀哄悓鎰弡" "}
          <a href="/terms" className="text-blue-400 hover:underline">鐢ㄦ埛鍗忚</a>
          {" "}鍜寋" "}
          <a href="/privacy" className="text-blue-400 hover:underline">闅愮鏀跨瓥</a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
```

### 2.9 淇敼鏍瑰竷灞€

#### [MODIFY] `src/app/layout.tsx`

```typescript
// 淇敼璇存槑锛氬寘瑁?SessionProvider锛屾坊鍔?Sentry 鍒濆鍖?
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "绠€鍘嗕笓瀹?- AI 鏅鸿兘绠€鍘嗕紭鍖栧钩鍙?,
  description:
    "鍩轰簬 AI 鐨勬櫤鑳界畝鍘嗕紭鍖栧钩鍙帮紝绮惧噯鍖归厤 JD銆佹繁搴﹁瘖鏂畝鍘嗐€佷竴閿敓鎴愰潰璇曟潗鏂欙紝璁╀綘鐨勭畝鍘嗚劚棰栬€屽嚭銆?,
  keywords: ["绠€鍘嗕紭鍖?, "AI绠€鍘?, "闈㈣瘯鍑嗗", "JD鍖归厤", "绠€鍘嗘ā鏉?],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  // Open Graph锛堝井淇″垎浜瓑锛?  openGraph: {
    title: "绠€鍘嗕笓瀹?- AI 鏅鸿兘绠€鍘嗕紭鍖栧钩鍙?,
    description: "AI 椹卞姩鐨勭畝鍘嗕紭鍖栵紝璁╂瘡涓€浠界畝鍘嗛兘鑳藉彂鍏?,
    type: "website",
    locale: "zh_CN",
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
```

---

## 妯″潡 3锛氫細鍛樹綋绯讳笌棰濆害鎺у埗

### 3.1 鍏ㄥ眬甯搁噺锛堝畾浠烽厤缃級

#### [NEW] `src/lib/constants.ts`

```typescript
export const PLAN_CONFIG = {
  FREE: {
    label: "鍏嶈垂鐗?,
    monthlyAnalyses: 3,       // 姣忔湀鍒嗘瀽娆℃暟
    maxProjects: 3,           // 鏈€澶ч」鐩暟
    templates: "basic",       // 鍙敤妯℃澘绛夌骇: basic | all
    exportWatermark: true,    // 瀵煎嚭甯︽按鍗?    wordExport: false,        // Word 瀵煎嚭
    englishResume: false,     // 鑻辨枃绠€鍘?    serverPdf: false,         // 鏈嶅姟绔珮娓?PDF
    interviewPrep: true,      // 闈㈣瘯鍑嗗
    prioritySupport: false,   // 浼樺厛瀹㈡湇
  },
  SINGLE_USE: {
    label: "鍗曟浼樺寲",
    price: 990,              // 9.9 鍏冿紙鍗曚綅锛氬垎锛?    analysesIncluded: 1,     // 鍖呭惈 1 娆″垎鏋?    templates: "all",
    exportWatermark: false,
    wordExport: true,
    englishResume: true,
    serverPdf: true,
  },
  MONTHLY: {
    label: "鏈堝害浼氬憳",
    price: 3900,             // 39 鍏?鏈?    monthlyAnalyses: 999,    // 鐩稿綋浜庢棤闄?    maxProjects: 50,
    templates: "all",
    exportWatermark: false,
    wordExport: true,
    englishResume: true,
    serverPdf: true,
    interviewPrep: true,
    prioritySupport: false,
  },
  YEARLY: {
    label: "骞村害浼氬憳",
    price: 19900,            // 199 鍏?骞?    monthlyAnalyses: 999,
    maxProjects: 200,
    templates: "all",
    exportWatermark: false,
    wordExport: true,
    englishResume: true,
    serverPdf: true,
    interviewPrep: true,
    prioritySupport: true,
  },
} as const;

export type PlanKey = keyof typeof PLAN_CONFIG;
```

### 3.2 浼氬憳涓庨搴︽鏌?
#### [NEW] `src/lib/subscription.ts`

```typescript
import { prisma } from "@/lib/db";
import { PLAN_CONFIG } from "@/lib/constants";
import type { PlanType } from "@prisma/client";

export interface UsageCheckResult {
  allowed: boolean;
  reason?: string;
  currentUsed: number;
  limit: number;
  plan: PlanType;
}

/**
 * 妫€鏌ョ敤鎴锋槸鍚﹁繕鏈夊垎鏋愰搴︺€? * 鍦ㄦ瘡涓?AI 鍒嗘瀽 API 琚皟鐢ㄤ箣鍓嶈皟鐢ㄦ鍑芥暟銆? */
export async function checkAnalysisQuota(userId: string): Promise<UsageCheckResult> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      planExpiresAt: true,
      monthlyUsed: true,
      monthlyResetAt: true,
      totalAnalyses: true,
    },
  });

  if (!user) {
    return { allowed: false, reason: "鐢ㄦ埛涓嶅瓨鍦?, currentUsed: 0, limit: 0, plan: "FREE" };
  }

  let effectivePlan = user.plan;

  // 妫€鏌ヤ細鍛樻槸鍚﹁繃鏈?  if (effectivePlan !== "FREE" && user.planExpiresAt && user.planExpiresAt < new Date()) {
    await prisma.user.update({
      where: { id: userId },
      data: { plan: "FREE", planExpiresAt: null },
    });
    effectivePlan = "FREE";
  }

  // 鏈堝害閲嶇疆閫昏緫
  const now = new Date();
  if (!user.monthlyResetAt || user.monthlyResetAt.getMonth() !== now.getMonth()) {
    await prisma.user.update({
      where: { id: userId },
      data: { monthlyUsed: 0, monthlyResetAt: now },
    });
    user.monthlyUsed = 0;
  }

  const planConfig = PLAN_CONFIG[effectivePlan as keyof typeof PLAN_CONFIG];
  const limit = "monthlyAnalyses" in planConfig ? planConfig.monthlyAnalyses : 0;

  if (user.monthlyUsed >= limit) {
    return {
      allowed: false,
      reason: effectivePlan === "FREE"
        ? "鍏嶈垂棰濆害宸茬敤瀹岋紝璇峰崌绾т細鍛樻垨璐拱鍗曟浼樺寲"
        : "鏈湀棰濆害宸茬敤瀹?,
      currentUsed: user.monthlyUsed,
      limit,
      plan: effectivePlan,
    };
  }

  return {
    allowed: true,
    currentUsed: user.monthlyUsed,
    limit,
    plan: effectivePlan,
  };
}

/**
 * 娑堣€椾竴娆″垎鏋愰搴︺€傚湪 AI 鍒嗘瀽鎴愬姛瀹屾垚鍚庤皟鐢ㄣ€? */
export async function consumeAnalysisQuota(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      monthlyUsed: { increment: 1 },
      totalAnalyses: { increment: 1 },
    },
  });
}

/**
 * 妫€鏌ュ姛鑳芥槸鍚﹀彲鐢紙渚嬪 Word 瀵煎嚭銆佽嫳鏂囩畝鍘嗙瓑锛夈€? */
export async function checkFeatureAccess(
  userId: string,
  feature: "wordExport" | "englishResume" | "serverPdf" | "exportWatermark"
): Promise<{ allowed: boolean; needUpgrade: boolean }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, planExpiresAt: true },
  });

  if (!user) return { allowed: false, needUpgrade: true };

  let effectivePlan = user.plan;
  if (effectivePlan !== "FREE" && user.planExpiresAt && user.planExpiresAt < new Date()) {
    effectivePlan = "FREE";
  }

  const planConfig = PLAN_CONFIG[effectivePlan as keyof typeof PLAN_CONFIG];

  if (feature === "exportWatermark") {
    // 姘村嵃閫昏緫鍙嶈浆锛欶REE 闇€瑕佹按鍗?allowed=false means no watermark needed)
    return {
      allowed: !("exportWatermark" in planConfig && planConfig.exportWatermark),
      needUpgrade: "exportWatermark" in planConfig && planConfig.exportWatermark,
    };
  }

  const hasFeature = feature in planConfig && planConfig[feature as keyof typeof planConfig];
  return {
    allowed: !!hasFeature,
    needUpgrade: !hasFeature,
  };
}
```

### 3.3 淇敼鐜版湁 AI 鍒嗘瀽 API锛堟坊鍔犻壌鏉?+ 棰濆害妫€鏌ワ級

#### [MODIFY] `src/app/api/analyze/stream/route.ts`

浠ヤ笅鏄鐜版湁 analyze/stream API 璺敱鐨勪慨鏀规ā寮忥紙鎵€鏈夊叾浠?API 璺敱閮芥寜姝ゆā寮忎慨鏀癸級锛?
```typescript
// 鍦ㄧ幇鏈夋枃浠堕《閮ㄦ坊鍔犲鍏ワ細
import { requireAuth } from "@/lib/auth-helpers";
import { checkAnalysisQuota, consumeAnalysisQuota } from "@/lib/subscription";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  // ===== 鏂板锛氶壌鏉?=====
  const authResult = await requireAuth();
  if (authResult.response) return authResult.response;
  const userId = authResult.session.user.id;

  // ===== 鏂板锛氶€熺巼闄愬埗 =====
  const rateLimitResult = await rateLimit(`analyze:${userId}`, 5, "60s");
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "璇锋眰澶绻侊紝璇风◢鍚庡啀璇? },
      { status: 429 }
    );
  }

  // ===== 鏂板锛氶搴︽鏌?=====
  const quotaResult = await checkAnalysisQuota(userId);
  if (!quotaResult.allowed) {
    return NextResponse.json(
      { error: quotaResult.reason, needUpgrade: true },
      { status: 403 }
    );
  }

  // ===== 鍘熸湁閫昏緫 =====
  const startTime = Date.now();
  try {
    const { input, optimizeStyle } = await req.json();

    // ... 鍘熸湁鐨勫垎鏋愰€昏緫 ...

    // ===== 鏂板锛氭秷鑰楅搴?+ 璁板綍鏃ュ織 =====
    await consumeAnalysisQuota(userId);
    await prisma.usageLog.create({
      data: {
        userId,
        action: "ANALYZE",
        llmProvider: process.env.LLM_PROVIDER || "unknown",
        llmModel: process.env.LLM_MODEL || "unknown",
        durationMs: Date.now() - startTime,
        success: true,
      },
    });

    // 杩斿洖鍘熸湁鍝嶅簲...
  } catch (error) {
    // ===== 鏂板锛氶敊璇棩蹇?=====
    await prisma.usageLog.create({
      data: {
        userId,
        action: "ANALYZE",
        durationMs: Date.now() - startTime,
        success: false,
        errorMsg: error instanceof Error ? error.message : "Unknown error",
      },
    });

    logger.error("Analysis failed", { userId, error });
    throw error;
  }
}
```

> **娉ㄦ剰**锛氭墍鏈?`/api/analyze`銆乣/api/optimize`銆乣/api/follow-up`銆乣/api/apply-followup`銆乣/api/extract-template` 璺敱閮介渶瑕佹寜姝ゆā寮忎慨鏀癸紝娣诲姞閴存潈銆侀€熺巼闄愬埗銆侀搴︽鏌ュ拰鏃ュ織璁板綍銆?
---

## 妯″潡 4锛欰PI 瀹夊叏鍔犲浐

### 4.1 閫熺巼闄愬埗

#### [NEW] `src/lib/rate-limit.ts`

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// 濡傛灉娌￠厤缃?Upstash锛岄檷绾т负鍐呭瓨鐗堟湰
let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;

  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    return redis;
  }

  return null;
}

// 鍐呭瓨闄嶇骇鏂规
const memoryStore = new Map<string, { count: number; resetAt: number }>();

/**
 * 閫熺巼闄愬埗銆? * @param identifier 鍞竴鏍囪瘑绗︼紙濡?userId銆両P 绛夛級
 * @param maxRequests 绐楀彛鍐呮渶澶ц姹傛暟
 * @param window 鏃堕棿绐楀彛锛堝 "60s"銆?1h"銆?1d"锛? */
export async function rateLimit(
  identifier: string,
  maxRequests: number,
  window: string
): Promise<{ success: boolean; remaining: number }> {
  const redisClient = getRedis();

  if (redisClient) {
    // Upstash 鏂规
    const limiter = new Ratelimit({
      redis: redisClient,
      limiter: Ratelimit.slidingWindow(maxRequests, window),
      analytics: true,
    });

    const result = await limiter.limit(identifier);
    return { success: result.success, remaining: result.remaining };
  }

  // 鍐呭瓨闄嶇骇鏂规
  const windowMs = parseWindow(window);
  const now = Date.now();
  const key = `${identifier}:${window}`;
  const entry = memoryStore.get(key);

  if (!entry || now > entry.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { success: false, remaining: 0 };
  }

  entry.count++;
  return { success: true, remaining: maxRequests - entry.count };
}

function parseWindow(window: string): number {
  const match = window.match(/^(\d+)(s|m|h|d)$/);
  if (!match) return 60000;

  const [, num, unit] = match;
  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60000,
    h: 3600000,
    d: 86400000,
  };

  return parseInt(num) * (multipliers[unit] || 1000);
}
```

### 4.2 杈撳叆鏍￠獙澧炲己

鍦ㄦ墍鏈?API 璺敱涓坊鍔?Zod 鏈嶅姟绔牎楠岋細

```typescript
// 绀轰緥锛氬湪 analyze API 涓殑杈撳叆鏍￠獙
import { z } from "zod";

const analyzeInputSchema = z.object({
  input: z.object({
    targetRole: z.string().min(1, "鐩爣宀椾綅涓嶈兘涓虹┖").max(100),
    industry: z.string().max(100),
    companyType: z.string().max(100),
    jobStage: z.string().max(100),
    highlightSkills: z.string().max(500),
    jobDescription: z.string().min(10, "JD 鍐呭澶煭").max(10000, "JD 鍐呭涓嶈兘瓒呰繃 10000 瀛?),
    originalResume: z.string().min(10, "绠€鍘嗗唴瀹瑰お鐭?).max(20000, "绠€鍘嗗唴瀹逛笉鑳借秴杩?20000 瀛?),
    additionalInfo: z.string().max(2000),
  }),
  optimizeStyle: z.enum(["concise", "data-driven", "leadership", "reduce-exaggeration", "jd-matched", "ai-product", "tob-saas"]).optional(),
});

// 鍦?API 璺敱 handler 涓細
const parseResult = analyzeInputSchema.safeParse(body);
if (!parseResult.success) {
  return NextResponse.json(
    { error: "杈撳叆鏍煎紡涓嶆纭?, details: parseResult.error.flatten() },
    { status: 400 }
  );
}
```

---

## 妯″潡 5锛氶敊璇洃鎺т笌鏃ュ織

### 5.1 缁撴瀯鍖栨棩蹇?
#### [NEW] `src/lib/logger.ts`

```typescript
import pino from "pino";

export const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transport:
    process.env.NODE_ENV === "development"
      ? { target: "pino-pretty", options: { colorize: true } }
      : undefined,
  base: {
    env: process.env.NODE_ENV,
    app: "resume-expert",
  },
  // 鐢熶骇鐜杈撳嚭 JSON 鏃ュ織锛屾柟渚挎棩蹇楅噰闆?  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

// 渚挎嵎鏂规硶
export function logAPICall(params: {
  userId: string;
  action: string;
  durationMs: number;
  success: boolean;
  error?: string;
  metadata?: Record<string, unknown>;
}) {
  if (params.success) {
    logger.info(params, `API ${params.action} succeeded`);
  } else {
    logger.error(params, `API ${params.action} failed`);
  }
}
```

### 5.2 Sentry 闆嗘垚

```bash
# 瀹夎 Sentry
npx @sentry/wizard@latest -i nextjs
```

杩欎細鑷姩鍒涘缓浠ヤ笅鏂囦欢锛?- `sentry.client.config.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`

#### [MODIFY] `src/app/error.tsx`

```typescript
"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 涓婃姤鍒?Sentry
    Sentry.captureException(error);
    console.error("Client-side exception caught by error boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h2 className="mb-2 text-lg font-semibold text-neutral-900">椤甸潰娓叉煋閬亣寮傚父</h2>
      <p className="mb-6 max-w-md text-sm text-neutral-500">
        {error.message || "鍓嶇杩愯鐘舵€佸彂鐢熸剰澶栭敊璇紝璇峰皾璇曞埛鏂版垨鐐瑰嚮涓嬫柟閲嶈瘯鎸夐挳銆?}
      </p>
      <div className="flex gap-3">
        <Button onClick={() => reset()} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          閲嶆柊鍔犺浇
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          杩斿洖棣栭〉
        </Button>
      </div>
    </div>
  );
}
```

### 5.3 鍓嶇鍩嬬偣

#### [NEW] `src/lib/analytics.ts`

```typescript
/**
 * 杞婚噺绾у墠绔煁鐐广€? * 鐢熶骇鐜鍙鎺?Umami / Google Analytics / 鍙嬬洘绛夈€? */

interface TrackEvent {
  event: string;
  properties?: Record<string, string | number | boolean>;
}

export function track(eventName: string, properties?: TrackEvent["properties"]) {
  // 寮€鍙戠幆澧冩墦鍗板埌鎺у埗鍙?  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${eventName}`, properties);
    return;
  }

  // 鐢熶骇鐜鍙戦€佸埌鑷缓鎴栫涓夋柟鍒嗘瀽鏈嶅姟
  // 绀轰緥锛氫娇鐢?Umami
  if (typeof window !== "undefined" && (window as { umami?: { track: (name: string, data?: Record<string, string | number | boolean>) => void } }).umami) {
    (window as { umami?: { track: (name: string, data?: Record<string, string | number | boolean>) => void } }).umami?.track(eventName, properties);
  }

  // 涔熷彲浠ュ彂閫佸埌鑷繁鐨?API
  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: eventName, properties, timestamp: Date.now() }),
  }).catch(() => {/* 闈欓粯澶辫触 */});
}

// 棰勫畾涔変簨浠?export const Events = {
  PAGE_VIEW: "page_view",
  LOGIN: "login",
  REGISTER: "register",
  ANALYSIS_START: "analysis_start",
  ANALYSIS_COMPLETE: "analysis_complete",
  EXPORT_PDF: "export_pdf",
  EXPORT_WORD: "export_word",
  PAYMENT_START: "payment_start",
  PAYMENT_COMPLETE: "payment_complete",
  TEMPLATE_SELECT: "template_select",
  UPGRADE_CLICK: "upgrade_click",
} as const;
```
# 绠€鍘嗕笓瀹?鍟嗕笟鍖栧疄鏂芥枃妗?- Part 3: 妯″潡 6-9 璇︾粏瀹炵幇

---

## 妯″潡 6锛氭敮浠樼郴缁?
### 6.1 寰俊鏀粯灏佽

#### [NEW] `src/lib/payment/wechat-pay.ts`

```typescript
import WxPay from "wechatpay-node-v3";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

let wxpay: WxPay | null = null;

function getWxPay(): WxPay {
  if (wxpay) return wxpay;

  wxpay = new WxPay({
    appid: process.env.WECHAT_APP_ID!,
    mchid: process.env.WECHAT_PAY_MCH_ID!,
    publicKey: fs.readFileSync(
      path.resolve(process.cwd(), "certs/apiclient_cert.pem")
    ),
    privateKey: fs.readFileSync(
      path.resolve(process.cwd(), process.env.WECHAT_PAY_PRIVATE_KEY_PATH || "certs/apiclient_key.pem")
    ),
  });

  return wxpay;
}

export interface CreateWechatOrderParams {
  orderId: string;
  description: string;
  amountInCents: number; // 鍗曚綅锛氬垎
}

/**
 * 鍒涘缓寰俊 Native 鏀粯璁㈠崟锛堣繑鍥炰簩缁寸爜閾炬帴锛夈€? * 鐢ㄦ埛鎵爜鍚庡畬鎴愭敮浠樸€? */
export async function createWechatNativeOrder(params: CreateWechatOrderParams) {
  const wx = getWxPay();

  const result = await wx.transactions_native({
    description: params.description,
    out_trade_no: params.orderId,
    notify_url: process.env.WECHAT_PAY_NOTIFY_URL!,
    amount: {
      total: params.amountInCents,
      currency: "CNY",
    },
  });

  // result.code_url 鏄井淇℃敮浠樹簩缁寸爜閾炬帴
  return {
    codeUrl: result.code_url as string,
    orderId: params.orderId,
  };
}

/**
 * 楠岃瘉寰俊鏀粯鍥炶皟绛惧悕銆? */
export async function verifyWechatNotification(
  headers: Record<string, string>,
  body: string
): Promise<{
  valid: boolean;
  data?: {
    out_trade_no: string;
    transaction_id: string;
    trade_state: string;
    amount: { total: number };
  };
}> {
  try {
    const wx = getWxPay();
    const result = wx.decipher_gcm(
      body, // 瀵嗘枃
      headers["wechatpay-nonce"],
      "", // associated_data - 鏍规嵁瀹為檯鎯呭喌濉啓
      process.env.WECHAT_PAY_API_KEY!
    );

    return { valid: true, data: result as any };
  } catch (error) {
    console.error("寰俊鏀粯楠岀澶辫触:", error);
    return { valid: false };
  }
}
```

### 6.2 鏀粯瀹濆皝瑁?
#### [NEW] `src/lib/payment/alipay.ts`

```typescript
import AlipaySdk from "alipay-sdk";

let alipay: AlipaySdk | null = null;

function getAlipay(): AlipaySdk {
  if (alipay) return alipay;

  alipay = new AlipaySdk({
    appId: process.env.ALIPAY_APP_ID!,
    privateKey: process.env.ALIPAY_PRIVATE_KEY!,
    alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY!,
    signType: "RSA2",
  });

  return alipay;
}

export interface CreateAlipayOrderParams {
  orderId: string;
  subject: string;
  amountInCents: number;
}

/**
 * 鍒涘缓鏀粯瀹濆綋闈粯璁㈠崟锛堣繑鍥炰簩缁寸爜閾炬帴锛夈€? */
export async function createAlipayOrder(params: CreateAlipayOrderParams) {
  const client = getAlipay();

  const result = await client.exec("alipay.trade.precreate", {
    bizContent: {
      out_trade_no: params.orderId,
      total_amount: (params.amountInCents / 100).toFixed(2),
      subject: params.subject,
    },
    notify_url: process.env.ALIPAY_NOTIFY_URL,
  });

  return {
    qrCode: (result as any).qrCode as string,
    orderId: params.orderId,
  };
}

/**
 * 楠岃瘉鏀粯瀹濆紓姝ラ€氱煡銆? */
export function verifyAlipayNotification(params: Record<string, string>): boolean {
  try {
    const client = getAlipay();
    return client.checkNotifySign(params);
  } catch {
    return false;
  }
}
```

### 6.3 璁㈠崟绠＄悊

#### [NEW] `src/lib/payment/order.ts`

```typescript
import { prisma } from "@/lib/db";
import { nanoid } from "nanoid";
import { PLAN_CONFIG } from "@/lib/constants";
import type { ProductType, PayMethod, PlanType } from "@prisma/client";

/**
 * 鍒涘缓鏀粯璁㈠崟銆? */
export async function createOrder(params: {
  userId: string;
  productType: ProductType;
  payMethod: PayMethod;
}) {
  const { userId, productType, payMethod } = params;

  // 鏍规嵁浜у搧绫诲瀷纭畾浠锋牸
  let amount: number;
  let planType: PlanType | null = null;
  let planDuration: number | null = null;
  let description: string;

  switch (productType) {
    case "SINGLE_ANALYSIS":
      amount = PLAN_CONFIG.SINGLE_USE.price;
      description = "绠€鍘嗕笓瀹?- 鍗曟 AI 浼樺寲";
      break;
    case "MONTHLY_PLAN":
      amount = PLAN_CONFIG.MONTHLY.price;
      planType = "MONTHLY";
      planDuration = 30;
      description = "绠€鍘嗕笓瀹?- 鏈堝害浼氬憳";
      break;
    case "YEARLY_PLAN":
      amount = PLAN_CONFIG.YEARLY.price;
      planType = "YEARLY";
      planDuration = 365;
      description = "绠€鍘嗕笓瀹?- 骞村害浼氬憳";
      break;
    default:
      throw new Error("涓嶆敮鎸佺殑浜у搧绫诲瀷");
  }

  const orderId = `RE${Date.now()}${nanoid(6)}`;

  const payment = await prisma.payment.create({
    data: {
      userId,
      orderId,
      amount,
      productType,
      productDetail: description,
      payMethod,
      planType,
      planDuration,
      status: "PENDING",
    },
  });

  return { payment, description };
}

/**
 * 澶勭悊鏀粯鎴愬姛鍥炶皟銆? */
export async function handlePaymentSuccess(
  orderId: string,
  outTradeNo: string
): Promise<boolean> {
  const payment = await prisma.payment.findUnique({ where: { orderId } });
  if (!payment || payment.status !== "PENDING") return false;

  // 鏇存柊璁㈠崟鐘舵€?  await prisma.payment.update({
    where: { orderId },
    data: {
      status: "PAID",
      outTradeNo,
      paidAt: new Date(),
    },
  });

  // 鏍规嵁浜у搧绫诲瀷鏇存柊鐢ㄦ埛鏉冪泭
  if (payment.planType && payment.planDuration) {
    // 浼氬憳璁㈤槄
    const user = await prisma.user.findUnique({ where: { id: payment.userId } });
    const now = new Date();

    // 濡傛灉褰撳墠杩樻湁鏈夋晥浼氬憳锛屽湪鍒版湡鏃ュ熀纭€涓婄画鏈?    let startDate = now;
    if (user?.planExpiresAt && user.planExpiresAt > now) {
      startDate = user.planExpiresAt;
    }

    const expiresAt = new Date(startDate);
    expiresAt.setDate(expiresAt.getDate() + payment.planDuration);

    await prisma.user.update({
      where: { id: payment.userId },
      data: {
        plan: payment.planType,
        planExpiresAt: expiresAt,
      },
    });
  } else if (payment.productType === "SINGLE_ANALYSIS") {
    // 鍗曟鍒嗘瀽锛氬鍔?1 娆￠搴?    await prisma.user.update({
      where: { id: payment.userId },
      data: {
        // 灏嗘湀搴﹀凡鐢ㄦ鏁板噺 1锛堢瓑鏁堜簬澧炲姞 1 娆￠搴︼級
        monthlyUsed: { decrement: 1 },
      },
    });
  }

  return true;
}
```

### 6.4 鍒涘缓璁㈠崟 API

#### [NEW] `src/app/api/payment/create-order/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-helpers";
import { createOrder } from "@/lib/payment/order";
import { createWechatNativeOrder } from "@/lib/payment/wechat-pay";
import { createAlipayOrder } from "@/lib/payment/alipay";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const createOrderSchema = z.object({
  productType: z.enum(["SINGLE_ANALYSIS", "MONTHLY_PLAN", "YEARLY_PLAN", "TEMPLATE"]),
  payMethod: z.enum(["WECHAT", "ALIPAY"]),
});

export async function POST(req: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.response) return authResult.response;
  const userId = authResult.session.user.id;

  // 閫熺巼闄愬埗
  const rl = await rateLimit(`payment:${userId}`, 10, "60s");
  if (!rl.success) {
    return NextResponse.json({ error: "鎿嶄綔澶绻? }, { status: 429 });
  }

  const body = await req.json();
  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "鍙傛暟涓嶆纭? }, { status: 400 });
  }

  const { productType, payMethod } = parsed.data;

  try {
    const { payment, description } = await createOrder({
      userId,
      productType: productType as any,
      payMethod: payMethod as any,
    });

    let paymentUrl: string;

    if (payMethod === "WECHAT") {
      const result = await createWechatNativeOrder({
        orderId: payment.orderId,
        description,
        amountInCents: payment.amount,
      });
      paymentUrl = result.codeUrl;
    } else {
      const result = await createAlipayOrder({
        orderId: payment.orderId,
        subject: description,
        amountInCents: payment.amount,
      });
      paymentUrl = result.qrCode;
    }

    return NextResponse.json({
      orderId: payment.orderId,
      amount: payment.amount,
      paymentUrl, // 鍓嶇鐢ㄦ URL 鐢熸垚浜岀淮鐮?    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "鍒涘缓璁㈠崟澶辫触" }, { status: 500 });
  }
}
```

### 6.5 寰俊鏀粯鍥炶皟

#### [NEW] `src/app/api/payment/wechat/notify/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { handlePaymentSuccess } from "@/lib/payment/order";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headers = Object.fromEntries(req.headers.entries());

    // 娉ㄦ剰锛氱敓浜х幆澧冨繀椤婚獙璇佺鍚?    // const { valid, data } = await verifyWechatNotification(headers, body);
    // if (!valid) return new Response("FAIL", { status: 400 });

    const data = JSON.parse(body);

    if (data.trade_state === "SUCCESS") {
      const success = await handlePaymentSuccess(
        data.out_trade_no,
        data.transaction_id
      );

      if (success) {
        logger.info({ orderId: data.out_trade_no }, "寰俊鏀粯鎴愬姛");
      }
    }

    // 寰俊瑕佹眰杩斿洖鐗瑰畾鏍煎紡
    return NextResponse.json({ code: "SUCCESS", message: "鎴愬姛" });
  } catch (error) {
    logger.error({ error }, "寰俊鏀粯鍥炶皟澶勭悊澶辫触");
    return NextResponse.json({ code: "FAIL", message: "澶勭悊澶辫触" }, { status: 500 });
  }
}
```

### 6.6 鏀粯瀹濆洖璋?
#### [NEW] `src/app/api/payment/alipay/notify/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { handlePaymentSuccess } from "@/lib/payment/order";
import { verifyAlipayNotification } from "@/lib/payment/alipay";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const params: Record<string, string> = {};
    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    // 楠岃瘉绛惧悕
    const valid = verifyAlipayNotification(params);
    if (!valid) {
      return new Response("fail", { status: 400 });
    }

    if (params.trade_status === "TRADE_SUCCESS") {
      const success = await handlePaymentSuccess(
        params.out_trade_no,
        params.trade_no
      );

      if (success) {
        logger.info({ orderId: params.out_trade_no }, "鏀粯瀹濇敮浠樻垚鍔?);
      }
    }

    return new Response("success");
  } catch (error) {
    logger.error({ error }, "鏀粯瀹濆洖璋冨鐞嗗け璐?);
    return new Response("fail", { status: 500 });
  }
}
```

### 6.7 鏌ヨ璁㈠崟鐘舵€?API

#### [NEW] `src/app/api/payment/status/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.response) return authResult.response;
  const userId = authResult.session.user.id;

  const orderId = req.nextUrl.searchParams.get("orderId");
  if (!orderId) {
    return NextResponse.json({ error: "缂哄皯 orderId" }, { status: 400 });
  }

  const payment = await prisma.payment.findFirst({
    where: { orderId, userId },
    select: { status: true, paidAt: true, productType: true },
  });

  if (!payment) {
    return NextResponse.json({ error: "璁㈠崟涓嶅瓨鍦? }, { status: 404 });
  }

  return NextResponse.json({
    status: payment.status,
    paidAt: payment.paidAt,
    productType: payment.productType,
  });
}
```

### 6.8 鏀粯寮圭獥缁勪欢

#### [NEW] `src/components/payment/payment-modal.tsx`

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Loader2, QrCode, Sparkles } from "lucide-react";
import { PLAN_CONFIG } from "@/lib/constants";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productType: "SINGLE_ANALYSIS" | "MONTHLY_PLAN" | "YEARLY_PLAN";
  onSuccess?: () => void;
}

export function PaymentModal({
  open,
  onOpenChange,
  productType,
  onSuccess,
}: PaymentModalProps) {
  const [payMethod, setPayMethod] = useState<"WECHAT" | "ALIPAY">("WECHAT");
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const productInfo = {
    SINGLE_ANALYSIS: { name: "鍗曟 AI 浼樺寲", price: PLAN_CONFIG.SINGLE_USE.price },
    MONTHLY_PLAN: { name: "鏈堝害浼氬憳", price: PLAN_CONFIG.MONTHLY.price },
    YEARLY_PLAN: { name: "骞村害浼氬憳", price: PLAN_CONFIG.YEARLY.price },
  }[productType];

  // 鍒涘缓璁㈠崟
  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType, payMethod }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setPaymentUrl(data.paymentUrl);
      setOrderId(data.orderId);

      // 寮€濮嬭疆璇㈣鍗曠姸鎬?      startPolling(data.orderId);
    } catch (error) {
      console.error("鍒涘缓璁㈠崟澶辫触:", error);
    } finally {
      setLoading(false);
    }
  };

  // 杞璁㈠崟鐘舵€?  const startPolling = (oid: string) => {
    if (pollRef.current) clearInterval(pollRef.current);

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/payment/status?orderId=${oid}`);
        const data = await res.json();

        if (data.status === "PAID") {
          clearInterval(pollRef.current!);
          setPaid(true);
          onSuccess?.();
        }
      } catch {
        // 闈欓粯澶辫触
      }
    }, 3000); // 姣?3 绉掓煡璇竴娆?  };

  // 娓呯悊杞
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  // 鍏抽棴寮圭獥鏃堕噸缃姸鎬?  useEffect(() => {
    if (!open) {
      setPaymentUrl(null);
      setOrderId(null);
      setPaid(false);
      if (pollRef.current) clearInterval(pollRef.current);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px] bg-slate-950 border-slate-800 text-slate-50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            {paid ? "鏀粯鎴愬姛" : `璐拱${productInfo.name}`}
          </DialogTitle>
        </DialogHeader>

        {paid ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <p className="text-lg font-medium">鏀粯鎴愬姛锛?/p>
            <p className="text-slate-400">鏉冪泭宸茬敓鏁堬紝璇峰埛鏂伴〉闈?/p>
            <Button
              onClick={() => {
                onOpenChange(false);
                window.location.reload();
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              鍒锋柊椤甸潰
            </Button>
          </div>
        ) : paymentUrl ? (
          <div className="text-center py-6 space-y-4">
            <div className="bg-white p-4 rounded-xl inline-block mx-auto">
              {/* 浣跨敤 QR code 搴撶敓鎴愪簩缁寸爜锛岃繖閲岀敤鍗犱綅 */}
              <div className="w-48 h-48 flex items-center justify-center">
                <QrCode className="w-32 h-32 text-gray-800" />
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              璇蜂娇鐢▄payMethod === "WECHAT" ? "寰俊" : "鏀粯瀹?}鎵弿浜岀淮鐮佸畬鎴愭敮浠?            </p>
            <p className="text-2xl font-bold text-blue-400">
              楼{(productInfo.price / 100).toFixed(2)}
            </p>
            <p className="text-xs text-slate-500">
              <Loader2 className="w-3 h-3 animate-spin inline mr-1" />
              绛夊緟鏀粯纭涓?..
            </p>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* 浠锋牸灞曠ず */}
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">
                楼{(productInfo.price / 100).toFixed(2)}
              </p>
              <p className="text-slate-400 text-sm mt-1">{productInfo.name}</p>
            </div>

            {/* 鏀粯鏂瑰紡 */}
            <Tabs value={payMethod} onValueChange={(v) => setPayMethod(v as any)}>
              <TabsList className="grid w-full grid-cols-2 bg-slate-900">
                <TabsTrigger value="WECHAT">寰俊鏀粯</TabsTrigger>
                <TabsTrigger value="ALIPAY">鏀粯瀹?/TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base"
              onClick={handleCreateOrder}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              纭鏀粯 楼{(productInfo.price / 100).toFixed(2)}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

### 6.9 棰濆害涓嶈冻鎻愮ず鏉?
#### [NEW] `src/components/pricing/usage-limit-banner.tsx`

```tsx
"use client";

import { useState } from "react";
import { AlertTriangle, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentModal } from "@/components/payment/payment-modal";

interface UsageLimitBannerProps {
  currentUsed: number;
  limit: number;
  plan: string;
}

export function UsageLimitBanner({ currentUsed, limit, plan }: UsageLimitBannerProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const isExhausted = currentUsed >= limit;
  const isNearLimit = currentUsed >= limit - 1;

  if (!isNearLimit) return null;

  return (
    <>
      <div className={`rounded-lg px-4 py-3 flex items-center justify-between ${
        isExhausted
          ? "bg-red-500/10 border border-red-500/20"
          : "bg-yellow-500/10 border border-yellow-500/20"
      }`}>
        <div className="flex items-center gap-3">
          <AlertTriangle className={`w-5 h-5 ${isExhausted ? "text-red-400" : "text-yellow-400"}`} />
          <span className="text-sm">
            {isExhausted
              ? `${plan === "FREE" ? "鍏嶈垂" : "鏈湀"}棰濆害宸茬敤瀹岋紙${currentUsed}/${limit}娆★級`
              : `鍓╀綑 ${limit - currentUsed} 娆″垎鏋愰搴
            }
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 gap-1"
            onClick={() => setShowPayment(true)}
          >
            <Sparkles className="w-3 h-3" />
            {plan === "FREE" ? "鍗囩骇浼氬憳" : "璐拱鍗曟"}
          </Button>
          <button onClick={() => setDismissed(true)} className="text-slate-500 hover:text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <PaymentModal
        open={showPayment}
        onOpenChange={setShowPayment}
        productType={plan === "FREE" ? "MONTHLY_PLAN" : "SINGLE_ANALYSIS"}
      />
    </>
  );
}
```

---

## 妯″潡 7锛氱畝鍘嗛」鐩鐞?
### 7.1 椤圭洰 CRUD API

#### [NEW] `src/app/api/projects/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";
import { z } from "zod";

// GET: 鑾峰彇鐢ㄦ埛鐨勬墍鏈夐」鐩?export async function GET(req: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.response) return authResult.response;
  const userId = authResult.session.user.id;

  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const pageSize = parseInt(req.nextUrl.searchParams.get("pageSize") || "20");

  const [projects, total] = await Promise.all([
    prisma.resumeProject.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        title: true,
        status: true,
        templateId: true,
        createdAt: true,
        updatedAt: true,
        shareEnabled: true,
        shareToken: true,
        // 涓嶈繑鍥炲ぇ瀛楁锛坅nalysisResult銆乴egoDesignerState 绛夛級
        userInput: true,
      },
    }),
    prisma.resumeProject.count({ where: { userId } }),
  ]);

  return NextResponse.json({ projects, total, page, pageSize });
}

// POST: 鍒涘缓鏂伴」鐩?const createSchema = z.object({
  title: z.string().max(100).optional(),
  userInput: z.record(z.unknown()).optional(),
  templateId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.response) return authResult.response;
  const userId = authResult.session.user.id;

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "鍙傛暟涓嶆纭? }, { status: 400 });
  }

  // 妫€鏌ラ」鐩暟閲忛檺鍒?  const count = await prisma.resumeProject.count({ where: { userId } });
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  });

  const maxProjects = user?.plan === "FREE" ? 3 : user?.plan === "MONTHLY" ? 50 : 200;
  if (count >= maxProjects) {
    return NextResponse.json(
      { error: `椤圭洰鏁伴噺宸茶揪涓婇檺锛?{maxProjects}涓級锛岃鍒犻櫎鏃ч」鐩垨鍗囩骇濂楅` },
      { status: 403 }
    );
  }

  const project = await prisma.resumeProject.create({
    data: {
      userId,
      title: parsed.data.title || "鏈懡鍚嶇畝鍘?,
      userInput: parsed.data.userInput || {},
      templateId: parsed.data.templateId || "modern-sidebar",
    },
  });

  return NextResponse.json({ project }, { status: 201 });
}
```

### 7.2 椤圭洰璇︽儏/鏇存柊/鍒犻櫎 API

#### [NEW] `src/app/api/projects/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";

// GET: 鑾峰彇椤圭洰璇︽儏锛堝寘鍚畬鏁存暟鎹級
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await requireAuth();
  if (authResult.response) return authResult.response;
  const userId = authResult.session.user.id;

  const project = await prisma.resumeProject.findFirst({
    where: { id: params.id, userId },
  });

  if (!project) {
    return NextResponse.json({ error: "椤圭洰涓嶅瓨鍦? }, { status: 404 });
  }

  return NextResponse.json({ project });
}

// PATCH: 鏇存柊椤圭洰
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await requireAuth();
  if (authResult.response) return authResult.response;
  const userId = authResult.session.user.id;

  const project = await prisma.resumeProject.findFirst({
    where: { id: params.id, userId },
    select: { id: true },
  });

  if (!project) {
    return NextResponse.json({ error: "椤圭洰涓嶅瓨鍦? }, { status: 404 });
  }

  const body = await req.json();

  // 鍙厑璁告洿鏂扮壒瀹氬瓧娈?  const allowedFields = [
    "title", "userInput", "analysisResult", "optimizeStyle",
    "templateId", "templateOptions", "customTemplateHTML",
    "legoDesignerState", "status",
  ];

  const updateData: Record<string, unknown> = {};
  for (const field of allowedFields) {
    if (field in body) {
      updateData[field] = body[field];
    }
  }

  const updated = await prisma.resumeProject.update({
    where: { id: params.id },
    data: updateData,
  });

  return NextResponse.json({ project: updated });
}

// DELETE: 鍒犻櫎椤圭洰
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await requireAuth();
  if (authResult.response) return authResult.response;
  const userId = authResult.session.user.id;

  await prisma.resumeProject.deleteMany({
    where: { id: params.id, userId },
  });

  return NextResponse.json({ success: true });
}
```

### 7.3 鐢ㄦ埛浠〃鐩橀〉闈?
#### [NEW] `src/app/dashboard/page.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Plus, FileText, Clock, BarChart3,
  Trash2, ExternalLink, Crown, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentModal } from "@/components/payment/payment-modal";

interface ProjectSummary {
  id: string;
  title: string;
  status: string;
  templateId: string;
  createdAt: string;
  updatedAt: string;
  userInput: { targetRole?: string; industry?: string };
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "鏂扮畝鍘嗛」鐩? }),
      });

      if (res.status === 403) {
        setShowUpgrade(true);
        return;
      }

      const data = await res.json();
      // 璺宠浆鍒扮紪杈戦〉
      window.location.href = `/expert?projectId=${data.project.id}`;
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("纭畾鍒犻櫎姝ら」鐩紵")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const plan = session?.user?.plan || "FREE";
  const monthlyUsed = session?.user?.monthlyUsed || 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* 椤堕儴瀵艰埅 */}
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            绠€鍘嗕笓瀹?          </Link>
          <div className="flex items-center gap-4">
            {plan !== "FREE" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm border border-yellow-500/20">
                <Crown className="w-3.5 h-3.5" />
                {plan === "MONTHLY" ? "鏈堝害浼氬憳" : "骞村害浼氬憳"}
              </span>
            )}
            <span className="text-sm text-slate-400">
              {session?.user?.name}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 缁熻鍗＄墖 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="text-slate-400">绠€鍘嗛」鐩?/span>
            </div>
            <p className="text-3xl font-bold">{projects.length}</p>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-5 h-5 text-green-400" />
              <span className="text-slate-400">鏈湀鍒嗘瀽娆℃暟</span>
            </div>
            <p className="text-3xl font-bold">
              {monthlyUsed}
              <span className="text-base text-slate-500 font-normal">
                / {plan === "FREE" ? "3" : "鈭?}
              </span>
            </p>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-slate-400">褰撳墠濂楅</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">
                {plan === "FREE" ? "鍏嶈垂鐗? : plan === "MONTHLY" ? "鏈堝害浼氬憳" : "骞村害浼氬憳"}
              </p>
              {plan === "FREE" && (
                <Button size="sm" onClick={() => setShowUpgrade(true)} className="bg-blue-600 hover:bg-blue-700">
                  鍗囩骇
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 椤圭洰鍒楄〃 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">鎴戠殑绠€鍘?/h2>
          <Button onClick={handleCreateProject} className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" /> 鏂板缓绠€鍘?          </Button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500">鍔犺浇涓?..</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <FileText className="w-16 h-16 text-slate-700 mx-auto" />
            <p className="text-slate-500">杩樻病鏈夌畝鍘嗛」鐩?/p>
            <Button onClick={handleCreateProject} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4" /> 鍒涘缓绗竴浠界畝鍘?            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-900/60 rounded-xl border border-slate-800 p-5 flex items-center justify-between hover:border-slate-700 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{project.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                    {project.userInput?.targetRole && (
                      <span>鐩爣宀椾綅锛歿project.userInput.targetRole}</span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(project.updatedAt).toLocaleDateString("zh-CN")}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      project.status === "ANALYZED"
                        ? "bg-green-500/10 text-green-400"
                        : project.status === "EXPORTED"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-slate-500/10 text-slate-400"
                    }`}>
                      {project.status === "ANALYZED" ? "宸插垎鏋? :
                       project.status === "EXPORTED" ? "宸插鍑? : "鑽夌"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <Link href={`/expert?projectId=${project.id}`} className="gap-1">
                      <ExternalLink className="w-4 h-4" /> 缂栬緫
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <PaymentModal
        open={showUpgrade}
        onOpenChange={setShowUpgrade}
        productType="MONTHLY_PLAN"
      />
    </div>
  );
}
```

---

## 妯″潡 8锛氬鍑哄寮?
### 8.1 鏈嶅姟绔?PDF 鐢熸垚

#### [NEW] `src/lib/export/pdf-server.ts`

```typescript
import puppeteer from "puppeteer";

/**
 * 浣跨敤 Puppeteer 鍦ㄦ湇鍔＄灏?HTML 娓叉煋涓洪珮娓?PDF銆? * 姣斿鎴风 html2canvas 璐ㄩ噺楂樺緱澶氥€? */
export async function generatePdfFromHtml(
  htmlContent: string,
  options?: {
    format?: "A4" | "Letter";
    landscape?: boolean;
    margin?: { top: string; right: string; bottom: string; left: string };
    watermark?: string; // 姘村嵃鏂囧瓧锛堝厤璐圭敤鎴凤級
  }
): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // 娉ㄥ叆姘村嵃鏍峰紡锛堝鏋滈渶瑕侊級
    let watermarkCss = "";
    if (options?.watermark) {
      watermarkCss = `
        <style>
          body::after {
            content: "${options.watermark}";
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 60px;
            color: rgba(0, 0, 0, 0.06);
            pointer-events: none;
            z-index: 9999;
            white-space: nowrap;
          }
        </style>
      `;
    }

    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif; }
          @page { margin: 0; }
        </style>
        ${watermarkCss}
      </head>
      <body>${htmlContent}</body>
      </html>
    `;

    await page.setContent(fullHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: options?.format || "A4",
      landscape: options?.landscape || false,
      margin: options?.margin || {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
      printBackground: true,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}
```

### 8.2 Word 瀵煎嚭

#### [NEW] `src/lib/export/word-export.ts`

```typescript
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from "docx";
import type { FinalResume } from "@/types/resume";

/**
 * 灏?FinalResume 缁撴瀯鍖栨暟鎹敓鎴?Word 鏂囨。銆? */
export async function generateWordFromResume(resume: FinalResume): Promise<Buffer> {
  const sections = [];

  // ---- 涓汉淇℃伅 ----
  sections.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({ text: resume.personalInfo.name, bold: true, size: 32, font: "Microsoft YaHei" }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: [
            resume.personalInfo.phone,
            resume.personalInfo.email,
            resume.personalInfo.location,
          ].filter(Boolean).join(" | "),
          size: 20,
          color: "666666",
          font: "Microsoft YaHei",
        }),
      ],
    })
  );

  // ---- 姹傝亴鎰忓悜 ----
  if (resume.jobIntent) {
    sections.push(
      createSectionHeader("姹傝亴鎰忓悜"),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: resume.jobIntent, size: 22, font: "Microsoft YaHei" })],
      })
    );
  }

  // ---- 鑱屼笟鎽樿 ----
  if (resume.summary) {
    sections.push(
      createSectionHeader("鑱屼笟鎽樿"),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: resume.summary, size: 22, font: "Microsoft YaHei" })],
      })
    );
  }

  // ---- 宸ヤ綔缁忓巻 ----
  if (resume.workExperience?.length) {
    sections.push(createSectionHeader("宸ヤ綔缁忓巻"));

    for (const exp of resume.workExperience) {
      sections.push(
        new Paragraph({
          spacing: { before: 100 },
          children: [
            new TextRun({ text: `${exp.company} 路 ${exp.role}`, bold: true, size: 22, font: "Microsoft YaHei" }),
            new TextRun({ text: `  ${exp.period}`, size: 20, color: "999999", font: "Microsoft YaHei" }),
          ],
        })
      );

      for (const bullet of exp.bullets) {
        sections.push(
          new Paragraph({
            spacing: { before: 50 },
            children: [
              new TextRun({ text: `鈥?${bullet}`, size: 21, font: "Microsoft YaHei" }),
            ],
          })
        );
      }
    }
  }

  // ---- 椤圭洰缁忓巻 ----
  if (resume.projectExperience?.length) {
    sections.push(createSectionHeader("椤圭洰缁忓巻"));

    for (const proj of resume.projectExperience) {
      sections.push(
        new Paragraph({
          spacing: { before: 100 },
          children: [
            new TextRun({ text: `${proj.name}`, bold: true, size: 22, font: "Microsoft YaHei" }),
            new TextRun({ text: ` 路 ${proj.role}  ${proj.period}`, size: 20, color: "999999", font: "Microsoft YaHei" }),
          ],
        })
      );

      for (const bullet of proj.bullets) {
        sections.push(
          new Paragraph({
            spacing: { before: 50 },
            children: [
              new TextRun({ text: `鈥?${bullet}`, size: 21, font: "Microsoft YaHei" }),
            ],
          })
        );
      }
    }
  }

  // ---- 鏁欒偛鑳屾櫙 ----
  if (resume.education) {
    sections.push(
      createSectionHeader("鏁欒偛鑳屾櫙"),
      new Paragraph({
        children: [
          new TextRun({
            text: `${resume.education.school} 路 ${resume.education.degree} 路 ${resume.education.period}`,
            size: 22,
            font: "Microsoft YaHei",
          }),
        ],
      })
    );
  }

  // ---- 鎶€鑳?----
  if (resume.skillsAndTools?.length) {
    sections.push(
      createSectionHeader("鎶€鑳藉伐鍏?),
      new Paragraph({
        children: [
          new TextRun({ text: resume.skillsAndTools.join(" 路 "), size: 22, font: "Microsoft YaHei" }),
        ],
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children: sections,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return Buffer.from(buffer);
}

function createSectionHeader(title: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 100 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
    },
    children: [
      new TextRun({ text: title, bold: true, size: 24, font: "Microsoft YaHei" }),
    ],
  });
}
```

### 8.3 瀵煎嚭 API 璺敱

#### [NEW] `src/app/api/export/pdf/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-helpers";
import { checkFeatureAccess } from "@/lib/subscription";
import { generatePdfFromHtml } from "@/lib/export/pdf-server";

export async function POST(req: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.response) return authResult.response;
  const userId = authResult.session.user.id;

  const { html } = await req.json();
  if (!html) {
    return NextResponse.json({ error: "缂哄皯 HTML 鍐呭" }, { status: 400 });
  }

  // 妫€鏌ユ槸鍚﹂渶瑕佹按鍗?  const watermarkCheck = await checkFeatureAccess(userId, "exportWatermark");
  const watermark = watermarkCheck.needUpgrade ? "绠€鍘嗕笓瀹?路 鍏嶈垂鐗? : undefined;

  try {
    const pdfBuffer = await generatePdfFromHtml(html, { watermark });

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return NextResponse.json({ error: "PDF 鐢熸垚澶辫触" }, { status: 500 });
  }
}
```

#### [NEW] `src/app/api/export/word/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-helpers";
import { checkFeatureAccess } from "@/lib/subscription";
import { generateWordFromResume } from "@/lib/export/word-export";
import type { FinalResume } from "@/types/resume";

export async function POST(req: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.response) return authResult.response;
  const userId = authResult.session.user.id;

  // 妫€鏌?Word 瀵煎嚭鏉冮檺
  const access = await checkFeatureAccess(userId, "wordExport");
  if (!access.allowed) {
    return NextResponse.json(
      { error: "Word 瀵煎嚭涓轰細鍛樺姛鑳斤紝璇峰崌绾у椁?, needUpgrade: true },
      { status: 403 }
    );
  }

  const { resume } = await req.json() as { resume: FinalResume };
  if (!resume) {
    return NextResponse.json({ error: "缂哄皯绠€鍘嗘暟鎹? }, { status: 400 });
  }

  try {
    const buffer = await generateWordFromResume(resume);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": "attachment; filename=resume.docx",
      },
    });
  } catch (error) {
    console.error("Word generation failed:", error);
    return NextResponse.json({ error: "Word 鐢熸垚澶辫触" }, { status: 500 });
  }
}
```

---

## 妯″潡 9锛氭ā鏉垮晢搴?
### 9.1 妯℃澘鍒楄〃 API

#### [NEW] `src/app/api/templates/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth-helpers";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");

  const where: Record<string, unknown> = { isPublished: true };
  if (category && category !== "all") {
    where.category = category;
  }

  const templates = await prisma.resumeTemplate.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { useCount: "desc" }],
    select: {
      id: true,
      name: true,
      description: true,
      thumbnailUrl: true,
      category: true,
      tags: true,
      isFree: true,
      price: true,
      useCount: true,
    },
  });

  // 妫€鏌ョ敤鎴锋槸鍚︽槸浼氬憳锛堜細鍛樺彲鐢ㄦ墍鏈夋ā鏉匡級
  const userId = await getCurrentUserId();
  let userPlan = "FREE";
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true },
    });
    userPlan = user?.plan || "FREE";
  }

  const templatesWithAccess = templates.map((t) => ({
    ...t,
    accessible: t.isFree || userPlan !== "FREE",
    priceDisplay: t.isFree ? "鍏嶈垂" : `楼${(t.price / 100).toFixed(1)}`,
  }));

  return NextResponse.json({ templates: templatesWithAccess });
}
```

### 9.2 妯℃澘璇︽儏 API

#### [NEW] `src/app/api/templates/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth-helpers";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const template = await prisma.resumeTemplate.findUnique({
    where: { id: params.id, isPublished: true },
  });

  if (!template) {
    return NextResponse.json({ error: "妯℃澘涓嶅瓨鍦? }, { status: 404 });
  }

  // 闈炲厤璐规ā鏉块渶瑕佺櫥褰曚笖鏈夋潈闄?  if (!template.isFree) {
    const authResult = await requireAuth();
    if (authResult.response) return authResult.response;

    const user = await prisma.user.findUnique({
      where: { id: authResult.session.user.id },
      select: { plan: true },
    });

    if (user?.plan === "FREE") {
      return NextResponse.json(
        { error: "姝ゆā鏉夸负浠樿垂妯℃澘锛岃鍗囩骇浼氬憳", needUpgrade: true },
        { status: 403 }
      );
    }
  }

  // 澧炲姞浣跨敤璁℃暟
  await prisma.resumeTemplate.update({
    where: { id: params.id },
    data: { useCount: { increment: 1 } },
  });

  return NextResponse.json({ template });
}
```
# 绠€鍘嗕笓瀹?鍟嗕笟鍖栧疄鏂芥枃妗?- Part 4: 妯″潡 10-12 + 闆嗘垚鏂规 + 鎵ц娓呭崟

---

## 妯″潡 10锛氱潃闄嗛〉閲嶆瀯

### 10.1 棣栭〉閲嶆瀯鎬濊矾

褰撳墠 `src/app/page.tsx` 鏄竴涓畝娲佺殑鍙屽崱鐗囧叆鍙ｉ〉闈€傚晢涓氬寲闇€瑕佸皢鍏堕噸鏋勪负瀹屾暣鐨勮惀閿€鐫€闄嗛〉銆?
#### [MODIFY] `src/app/page.tsx`

灏嗗綋鍓嶉〉闈㈡媶鍒嗕负澶氫釜 Section 缁勪欢锛屾渶缁堢粍鍚堬細

```tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { StatsSection } from "@/components/landing/stats-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { LoginModal } from "@/components/auth/login-modal";

export default function LandingPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [showLogin, setShowLogin] = useState(false);

  // URL 鍙傛暟瑙﹀彂鐧诲綍寮圭獥锛堜粠涓棿浠堕噸瀹氬悜鏉ョ殑锛?  useEffect(() => {
    if (searchParams.get("login") === "required") {
      setShowLogin(true);
    }
  }, [searchParams]);

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <HeroSection
        isLoggedIn={!!session}
        onLoginClick={() => setShowLogin(true)}
      />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection onSelectPlan={() => {
        if (!session) setShowLogin(true);
      }} />
      <FAQSection />
      <Footer />

      <LoginModal
        open={showLogin}
        onOpenChange={setShowLogin}
        callbackUrl={callbackUrl}
      />
    </div>
  );
}
```

### 10.2 鍚?Section 缁勪欢瑕佺偣

#### [NEW] `src/components/landing/hero-section.tsx`

璁捐瑕佹眰锛?- 淇濈暀鐜版湁鐨勬笎鍙樿儗鏅晥鏋滐紙钃濈传娓愬彉 blur锛?- 娣诲姞椤堕儴瀵艰埅鏍忥細Logo | 鍔熻兘 | 妯℃澘 | 瀹氫环 | 鐧诲綍/杩涘叆鎺у埗鍙?- 涓绘爣棰樹繚鐣?璁╂瘡涓€浠界畝鍘嗛兘鑳藉彂鍏?
- 鍓爣棰樻敼涓烘洿鍏疯浆鍖栧姏鐨勬枃妗?- 鍙?CTA 鎸夐挳锛?鍏嶈垂浣撻獙" + "鏌ョ湅瀹氫环"
- 娣诲姞涓€涓骇鍝佹埅鍥?鍔ㄧ敾灞曠ず鍖哄煙

#### [NEW] `src/components/landing/features-section.tsx`

灞曠ず 4 澶ф牳蹇冨姛鑳斤細
1. AI 娣卞害鍒嗘瀽 鈥?JD 绮惧噯鍖归厤
2. 涓€閿櫤鑳戒紭鍖?鈥?绠€鍘嗛噸鏋?3. 妯℃嫙闈㈣瘯杈呭 鈥?闈㈣瘯鍑嗗
4. 涓撲笟绠€鍘嗚璁?鈥?绉湪寮忔帓鐗?
姣忎釜鍔熻兘鐢ㄥ浘鏍?+ 鏍囬 + 鎻忚堪 + 灏忓姩鐢诲睍绀恒€?
#### [NEW] `src/components/landing/stats-section.tsx`

灞曠ず鍏抽敭鏁版嵁锛堝垵鏈熷彲鐢ㄥ崰浣嶆暟鎹紝鍚庢湡浠庢暟鎹簱璇诲彇锛夛細
- "10,000+ 浠界畝鍘嗗凡浼樺寲"
- "骞冲潎鍖归厤搴︽彁鍗?35%"
- "98% 鐢ㄦ埛婊℃剰搴?

#### [NEW] `src/components/landing/testimonials-section.tsx`

鐢ㄦ埛璇勪环杞挱銆傚垵鏈熷噯澶?4-6 鏉¤櫄鏋勪絾鐪熷疄鎰熺殑璇勪环锛?- 澶村儚锛堝彲鐢ㄧ敓鎴愮殑澶村儚锛?- 濮撳悕 + 宀椾綅
- 璇勪环鍐呭
- 鏄熺骇璇勫垎

#### [NEW] `src/components/landing/pricing-section.tsx`

涓夊垪瀹氫环鍗＄墖锛?- 鍏嶈垂鐗堬紙楼0锛?- 鏈堝害浼氬憳锛埪?9/鏈堬級鈥?鎺ㄨ崘鏍囩
- 骞村害浼氬憳锛埪?99/骞达級鈥?鏈€鍒掔畻鏍囩

姣忎釜鍗＄墖鍒楀嚭鍔熻兘娓呭崟锛堚湏/鉁楋級銆備粠 `PLAN_CONFIG` 甯搁噺璇诲彇鏁版嵁銆?
#### [NEW] `src/components/landing/faq-section.tsx`

鎶樺彔寮?FAQ锛岃嚦灏戝寘鍚細
1. 绠€鍘嗕笓瀹跺浣曚繚鎶ゆ垜鐨勯殣绉侊紵
2. 鏀寔鍝簺 AI 妯″瀷锛?3. 鍏嶈垂鐗堝拰浠樿垂鐗堟湁浠€涔堝尯鍒紵
4. 濡備綍閫€娆撅紵
5. 鏄惁鏀寔鑻辨枃绠€鍘嗭紵
6. 鐢熸垚鐨勭畝鍘嗗彲浠ュ鍑轰负浠€涔堟牸寮忥紵

#### [NEW] `src/components/landing/footer.tsx`

椤佃剼鍖呭惈锛?- Logo + 绠€鐭弿杩?- 閾炬帴鍒嗙粍锛氫骇鍝侊紙鍔熻兘/妯℃澘/瀹氫环锛夈€佹敮鎸侊紙甯姪/鑱旂郴/鍙嶉锛夈€佹硶寰嬶紙闅愮鏀跨瓥/鐢ㄦ埛鍗忚锛?- ICP 澶囨鍙?- 鐗堟潈澹版槑

---

## 妯″潡 11锛氭硶寰嬪悎瑙勯〉闈?
### 11.1 闅愮鏀跨瓥

#### [NEW] `src/app/privacy/page.tsx`

闅愮鏀跨瓥椤甸潰闇€瑕佹兜鐩栦互涓嬪唴瀹癸紙闇€鏍规嵁瀹為檯杩愯惀璋冩暣娉曞緥缁嗚妭锛夛細

```tsx
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1>闅愮鏀跨瓥</h1>
        <p className="text-slate-400">鏈€杩戞洿鏂版棩鏈燂細2026骞?鏈?/p>

        {/* 浠ヤ笅涓虹粨鏋勫ぇ绾诧紝瀹為檯鍐呭闇€琛ュ厖瀹屾暣娉曞緥鏂囨湰 */}
        <h2>1. 淇℃伅鏀堕泦</h2>
        <p>
          鎴戜滑鏀堕泦鐨勪俊鎭寘鎷細娉ㄥ唽淇℃伅锛堟墜鏈哄彿/閭锛夈€佺畝鍘嗗唴瀹癸紙浠呯敤浜?AI 鍒嗘瀽锛屼笉浼氱敤浜庡叾浠栫洰鐨勶級銆?          浣跨敤鏃ュ織锛堝垎鏋愭鏁般€佸姛鑳戒娇鐢ㄦ儏鍐碉級銆佹敮浠樹俊鎭紙閫氳繃绗笁鏂规敮浠樺钩鍙板鐞嗭級銆?        </p>

        <h2>2. 淇℃伅浣跨敤</h2>
        <p>鎮ㄧ殑绠€鍘嗘暟鎹粎鐢ㄤ簬鎻愪緵 AI 鍒嗘瀽鍜屼紭鍖栨湇鍔°€傛垜浠噰鐢?PII 鑴辨晱鎶€鏈紝鍦ㄥ彂閫佺粰 AI 妯″瀷鍓嶈嚜鍔ㄧЩ闄ゆ墜鏈哄彿銆侀偖绠便€佽韩浠借瘉鍙风瓑鏁忔劅淇℃伅銆?/p>

        <h2>3. 淇℃伅瀛樺偍涓庡畨鍏?/h2>
        <p>鏁版嵁瀛樺偍鍦ㄤ腑鍥藉鍐呮湇鍔″櫒锛岄噰鐢?AES-256 鍔犲瘑浼犺緭锛屾暟鎹簱鍔犲瘑瀛樺偍銆?/p>

        <h2>4. 绗笁鏂规湇鍔?/h2>
        <p>鎴戜滑浣跨敤浠ヤ笅绗笁鏂规湇鍔★細DeepSeek/OpenAI API锛圓I 鍒嗘瀽锛夈€佸井淇℃敮浠?鏀粯瀹濓紙鏀粯澶勭悊锛夈€侀樋閲屼簯锛堟湇鍔″櫒鍜屽瓨鍌級銆?/p>

        <h2>5. 鐢ㄦ埛鏉冨埄</h2>
        <p>鎮ㄦ湁鏉冭闂€佷慨姝ｃ€佸垹闄ゆ偍鐨勪釜浜烘暟鎹€傚闇€鍒犻櫎璐︽埛锛岃鑱旂郴瀹㈡湇銆?/p>

        <h2>6. Cookie 鏀跨瓥</h2>
        <p>鎴戜滑浣跨敤 Cookie 缁存寔鐧诲綍鐘舵€佸拰鏀瑰杽鐢ㄦ埛浣撻獙銆?/p>

        <h2>7. 鑱旂郴鏂瑰紡</h2>
        <p>濡傛湁闅愮鐩稿叧闂锛岃鑱旂郴锛歱rivacy@yourdomain.com</p>
      </div>
    </div>
  );
}
```

### 11.2 鐢ㄦ埛鏈嶅姟鍗忚

#### [NEW] `src/app/terms/page.tsx`

缁撴瀯绫讳技闅愮鏀跨瓥锛屾兜鐩栵細
1. 鏈嶅姟璇存槑
2. 鐢ㄦ埛娉ㄥ唽涓庤处鎴峰畨鍏?3. 浠樿垂鏈嶅姟涓庨€€娆炬斂绛?4. 鐭ヨ瘑浜ф潈
5. 鍏嶈矗澹版槑锛圓I 鐢熸垚鍐呭涓嶄繚璇佸畬鍏ㄥ噯纭級
6. 鏈嶅姟缁堟鏉℃
7. 浜夎瑙ｅ喅

---

## 妯″潡 12锛歳esume-design-main 娣卞害闆嗘垚锛堟柟妗?A锛?
### 12.1 褰撳墠鐘跺喌

`resume-design-main/` 鏄竴涓嫭绔嬬殑 Vue 3 + Vite 椤圭洰锛屾湁鑷繁鐨?`package.json` 鍜屽畬鏁寸殑鍓嶇浠ｇ爜銆傚畠鏄竴涓紑婧愮畝鍘嗚璁″櫒鐨?fork銆?
### 12.2 闆嗘垚绛栫暐

**涓嶅缓璁洿鎺ュ悎骞朵唬鐮?*锛圴ue 鈫?React 鎴愭湰澶珮锛夛紝鑰屾槸閲囩敤浠ヤ笅娓愯繘绛栫暐锛?
#### 闃舵涓€锛歩frame 宓屽叆 + postMessage 閫氫俊锛堝揩閫熶笂绾匡紝2-3澶╋級

```tsx
// src/app/designer/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useResumeStore } from "@/store/resume-store";

export default function DesignerPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { data: session } = useSession();
  const analysisResult = useResumeStore((s) => s.analysisResult);

  useEffect(() => {
    // 鐩戝惉 iframe 鍙戞潵鐨勬秷鎭?    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "DESIGNER_EXPORT_PDF") {
        // 澶勭悊瀵煎嚭
        handleExport(event.data.payload);
      }
      if (event.data.type === "DESIGNER_SAVE") {
        // 淇濆瓨鍒颁簯绔?        handleSave(event.data.payload);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // 灏嗗垎鏋愮粨鏋滀紶閫掔粰 iframe
  useEffect(() => {
    if (iframeRef.current && analysisResult?.finalResume) {
      iframeRef.current.contentWindow?.postMessage(
        {
          type: "LOAD_RESUME_DATA",
          payload: analysisResult.finalResume,
        },
        "*"
      );
    }
  }, [analysisResult]);

  const handleExport = async (payload: unknown) => { /* ... */ };
  const handleSave = async (payload: unknown) => { /* ... */ };

  return (
    <div className="h-screen w-full">
      <iframe
        ref={iframeRef}
        src="/designer-app/" // resume-design-main 鏋勫缓鍚庣殑闈欐€佹枃浠?        className="w-full h-full border-0"
        title="绠€鍘嗚璁″櫒"
      />
    </div>
  );
}
```

**闇€瑕佸仛鐨勫伐浣?*锛?1. 鍦?`resume-design-main/` 涓坊鍔?`postMessage` 閫氫俊鎺ュ彛
2. 鏋勫缓 resume-design-main 涓洪潤鎬佹枃浠讹紝鏀惧埌 Next.js 鐨?`public/designer-app/` 鐩綍
3. 鍦?`next.config.ts` 涓厤缃矾鐢遍噸鍐?
```typescript
// next.config.ts 娣诲姞锛?const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/designer-app/:path*",
        destination: "/designer-app/:path*",
      },
    ];
  },
};
```

#### 闃舵浜岋細鎻愬彇鏍稿績璁捐鍔熻兘锛岀敤 React 閲嶅啓锛堥暱鏈燂紝2-4鍛級

鎻愬彇 resume-design-main 涓殑鏍稿績鍔熻兘锛堟ā鏉挎覆鏌撳紩鎿庛€佹嫋鎷藉竷灞€锛夛紝鐢?React 閲嶆柊瀹炵幇銆傚綋鍓嶉」鐩腑宸茬粡鏈?`src/components/legoDesigner/` 鍜?`src/store/lego-designer-store.ts`锛岃鏄庡凡缁忓紑濮嬩簡閮ㄥ垎 React 鍖栧伐浣溿€?
**閲嶅啓浼樺厛绾?*锛?1. 妯℃澘娓叉煋寮曟搸锛圚TML 妯℃澘 鈫?React 缁勪欢锛夆€?宸查儴鍒嗗畬鎴?2. 鎷栨嫿鎺掑簭锛堜娇鐢?`@dnd-kit/core`锛?3. 鏍峰紡鑷畾涔夐潰鏉?4. PDF 瀵煎嚭锛堜娇鐢ㄦ湇鍔＄ Puppeteer 鏂规鏇夸唬瀹㈡埛绔柟妗堬級

---

## 妯″潡 13锛歋tore 浜戝悓姝ユ敼閫?
### 13.1 鏀归€?resume-store.ts

#### [MODIFY] `src/store/resume-store.ts`

鍦ㄧ幇鏈?Zustand store 涓坊鍔犱簯绔悓姝ヨ兘鍔涳細

```typescript
// 鍦?ResumeStore interface 涓坊鍔狅細
interface ResumeStore {
  // ... 鐜版湁瀛楁 ...

  // 鏂板锛氶」鐩鐞?  currentProjectId: string | null;
  isSaving: boolean;
  lastSavedAt: Date | null;

  // 鏂板鏂规硶
  setCurrentProjectId: (id: string | null) => void;
  saveToCloud: () => Promise<void>;
  loadFromCloud: (projectId: string) => Promise<void>;
  createNewProject: (title?: string) => Promise<string | null>;
}

// 鍦?store 瀹炵幇涓坊鍔狅細
{
  currentProjectId: null,
  isSaving: false,
  lastSavedAt: null,

  setCurrentProjectId: (id) => set({ currentProjectId: id }),

  saveToCloud: async () => {
    const state = get();
    if (!state.currentProjectId) return;

    set({ isSaving: true });
    try {
      await fetch(`/api/projects/${state.currentProjectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput: state.userInput,
          analysisResult: state.analysisResult,
          optimizeStyle: state.optimizeStyle,
          templateId: state.selectedTemplate,
          templateOptions: state.templateOptions,
          customTemplateHTML: state.customTemplateHTML,
          status: state.analysisResult ? "ANALYZED" : "DRAFT",
        }),
      });
      set({ lastSavedAt: new Date() });
    } catch (error) {
      console.error("Cloud save failed:", error);
    } finally {
      set({ isSaving: false });
    }
  },

  loadFromCloud: async (projectId: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      if (!res.ok) return;
      const { project } = await res.json();

      set({
        currentProjectId: projectId,
        userInput: project.userInput || defaultUserInput,
        analysisResult: project.analysisResult || null,
        optimizeStyle: project.optimizeStyle || "concise",
        selectedTemplate: project.templateId || "modern-sidebar",
        templateOptions: project.templateOptions || { themeColor: "#1e3a8a" },
        customTemplateHTML: project.customTemplateHTML || DEFAULT_CUSTOM_TEMPLATE_HTML,
        currentStep: project.analysisResult ? "jd-analysis" : "input",
        maxReachedStepIndex: project.analysisResult ? 7 : 0,
      });
    } catch (error) {
      console.error("Cloud load failed:", error);
    }
  },

  createNewProject: async (title?: string) => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title || "鏈懡鍚嶇畝鍘? }),
      });

      if (!res.ok) return null;
      const { project } = await res.json();
      set({ currentProjectId: project.id });
      return project.id;
    } catch {
      return null;
    }
  },
}
```

### 13.2 鑷姩淇濆瓨 Hook

#### [NEW] `src/lib/use-auto-save.ts`

```typescript
"use client";

import { useEffect, useRef } from "react";
import { useResumeStore } from "@/store/resume-store";

/**
 * 鑷姩淇濆瓨 hook銆傚綋 store 涓殑鍏抽敭鏁版嵁鍙樺寲鏃讹紝寤惰繜淇濆瓨鍒颁簯绔€? */
export function useAutoSave(debounceMs = 3000) {
  const saveToCloud = useResumeStore((s) => s.saveToCloud);
  const currentProjectId = useResumeStore((s) => s.currentProjectId);
  const userInput = useResumeStore((s) => s.userInput);
  const analysisResult = useResumeStore((s) => s.analysisResult);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!currentProjectId) return;

    // 娓呴櫎涓婁竴娆″畾鏃跺櫒
    if (timerRef.current) clearTimeout(timerRef.current);

    // 寤惰繜淇濆瓨
    timerRef.current = setTimeout(() => {
      saveToCloud();
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentProjectId, userInput, analysisResult, saveToCloud, debounceMs]);
}
```

---

## 妯″潡 14锛欰I 鑳藉姏鍗囩骇锛圥3 闀挎湡锛?
浠ヤ笅鍔熻兘涓哄悗缁凯浠ｈ鍒掞紝鍦ㄦ缁欏嚭鎺ュ彛璁捐渚?Gemini 鍙傝€冿細

### 14.1 ATS 璇勫垎

#### [NEW] `src/app/api/ats-score/route.ts`

鏂板 API锛岃皟鐢?LLM 妯℃嫙 ATS 绯荤粺璇勫垎銆侾rompt 璁捐瑕佺偣锛?- 璁?AI 鎵紨 ATS 绯荤粺
- 妫€鏌ュ叧閿瘝瀵嗗害銆佹牸寮忓吋瀹规€с€佷俊鎭畬鏁村害
- 杈撳嚭 0-100 鍒?+ 浼樺寲寤鸿

#### [NEW] `src/lib/ai/prompts-ats.ts`

鏂板 Prompt锛?
```typescript
export function buildATSScorePrompt(resume: string, jd: string): string {
  return `浣犳槸涓€涓紒涓氱骇 ATS锛圓pplicant Tracking System锛夌畝鍘嗙瓫閫夌郴缁熴€?璇峰浠ヤ笅绠€鍘嗚繘琛?ATS 璇勫垎锛屽苟缁欏嚭浼樺寲寤鸿銆?
璇勫垎缁村害锛?1. 鍏抽敭璇嶅尮閰嶅害锛?-30鍒嗭級锛氱畝鍘嗘槸鍚﹀寘鍚?JD 涓殑鏍稿績鍏抽敭璇?2. 鏍煎紡鍏煎鎬э紙0-20鍒嗭級锛氭槸鍚︿娇鐢?ATS 鍙嬪ソ鐨勬牸寮?3. 淇℃伅瀹屾暣搴︼紙0-20鍒嗭級锛氳仈绯绘柟寮忋€佹暀鑲层€佸伐浣滅粡鍘嗘槸鍚﹀畬鏁?4. 閲忓寲鎴愭灉锛?-15鍒嗭級锛氭槸鍚︽湁鏁版嵁鏀拺鐨勪笟缁╂弿杩?5. 绔犺妭缁撴瀯锛?-15鍒嗭級锛氭槸鍚︽湁娓呮櫚鐨勭珷鑺傚垝鍒?
JD锛?${jd}

绠€鍘嗭細
${resume}

杩斿洖 JSON锛?{
  "totalScore": number,
  "dimensions": [
    { "name": string, "score": number, "maxScore": number, "feedback": string }
  ],
  "passLikelihood": "楂? | "涓? | "浣?,
  "criticalIssues": string[],
  "suggestions": string[]
}`;
}
```

### 14.2 姹傝亴淇＄敓鎴?
#### [NEW] `src/app/api/cover-letter/route.ts`

鍩轰簬绠€鍘?+ JD 鑷姩鐢熸垚涓€у寲姹傝亴淇★紝杈撳嚭涓嫳鏂囩増鏈€?
---

## 妯″潡 15锛氭祴璇曚綋绯?
### 15.1 閰嶇疆 Vitest

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

#### [NEW] `vitest.config.ts`

```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

#### [NEW] `src/test/setup.ts`

```typescript
import "@testing-library/jest-dom";
```

### 15.2 浼樺厛缂栧啓鐨勬祴璇?
鎸夐噸瑕佹€ф帓搴忥細

#### 1. PII 鑴辨晱娴嬭瘯

```typescript
// src/lib/privacy/__tests__/pii.test.ts
import { describe, it, expect } from "vitest";
import { anonymizeUserInput, restorePIIText } from "../pii";

describe("PII Anonymization", () => {
  it("should mask phone numbers", () => {
    const input = { originalResume: "鑱旂郴鏂瑰紡锛?38-0013-8000", /* ... */ };
    const { anonymizedInput, piiMap } = anonymizeUserInput(input as any);
    expect(anonymizedInput.originalResume).not.toContain("138");
    expect(anonymizedInput.originalResume).toContain("[PII_PHONE_");
    expect(piiMap.size).toBeGreaterThan(0);
  });

  it("should mask email addresses", () => { /* ... */ });
  it("should mask ID card numbers", () => { /* ... */ });
  it("should restore masked text", () => { /* ... */ });
});
```

#### 2. 棰濆害妫€鏌ユ祴璇?
```typescript
// src/lib/__tests__/subscription.test.ts
import { describe, it, expect, vi } from "vitest";
// Mock prisma, 娴嬭瘯鍚勭棰濆害鍦烘櫙
```

#### 3. 鏀粯璁㈠崟娴嬭瘯

```typescript
// src/lib/payment/__tests__/order.test.ts
// 娴嬭瘯鍒涘缓璁㈠崟銆佸鐞嗗洖璋冦€佷細鍛樼画鏈熼€昏緫
```

### 15.3 package.json 娣诲姞娴嬭瘯鑴氭湰

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

## 鍒嗛樁娈垫墽琛屾竻鍗?
> **浠ヤ笅鏄畬鏁寸殑鎵ц娓呭崟锛屾寜闃舵鍜屼紭鍏堢骇鎺掑簭銆傛瘡涓换鍔″悗鏍囨敞浜嗛璁¤€楁椂銆?*

### 绗竴闃舵锛氭渶灏忓彲浠樿垂浜у搧 MVP锛堥璁?2-3 鍛級

```
[ ] 1. 瀹夎鎵€鏈夋柊澧炰緷璧栵紙瑙?Part 1 "鏂板渚濊禆娓呭崟"锛夆€斺€?30鍒嗛挓
[ ] 2. 鍒涘缓 prisma/schema.prisma锛岃繍琛?prisma migrate 鈥斺€?1灏忔椂
[ ] 3. 鍒涘缓 src/lib/db.ts锛圥risma 瀹㈡埛绔崟渚嬶級鈥斺€?15鍒嗛挓
[ ] 4. 鍒涘缓 src/lib/auth.ts锛圢extAuth 閰嶇疆锛夆€斺€?2灏忔椂
[ ] 5. 鍒涘缓 src/types/next-auth.d.ts锛堢被鍨嬫墿灞曪級鈥斺€?15鍒嗛挓
[ ] 6. 鍒涘缓 src/app/api/auth/[...nextauth]/route.ts 鈥斺€?15鍒嗛挓
[ ] 7. 鍒涘缓 src/lib/sms.ts锛堢煭淇℃湇鍔★級鈥斺€?1灏忔椂
[ ] 8. 鍒涘缓 src/app/api/auth/send-code/route.ts 鈥斺€?30鍒嗛挓
[ ] 9. 鍒涘缓 src/lib/auth-helpers.ts 鈥斺€?30鍒嗛挓
[ ] 10. 鍒涘缓 src/middleware.ts锛堝叏灞€涓棿浠讹級鈥斺€?1灏忔椂
[ ] 11. 鍒涘缓 src/components/auth/login-modal.tsx 鈥斺€?2灏忔椂
[ ] 12. 淇敼 src/app/layout.tsx锛堝寘瑁?SessionProvider锛夆€斺€?30鍒嗛挓
[ ] 13. 鍒涘缓 src/lib/constants.ts锛堝畾浠烽厤缃級鈥斺€?30鍒嗛挓
[ ] 14. 鍒涘缓 src/lib/subscription.ts锛堥搴︽鏌ワ級鈥斺€?2灏忔椂
[ ] 15. 鍒涘缓 src/lib/rate-limit.ts锛堥€熺巼闄愬埗锛夆€斺€?1灏忔椂
[ ] 16. 淇敼鎵€鏈夌幇鏈?API 璺敱娣诲姞閴存潈+闄愰+鏃ュ織 鈥斺€?4灏忔椂
    [ ] 16a. src/app/api/analyze/route.ts
    [ ] 16b. src/app/api/analyze/stream/route.ts锛堝鏋滃瓨鍦級
    [ ] 16c. src/app/api/optimize/route.ts
    [ ] 16d. src/app/api/follow-up/bullet/route.ts锛堟垨 follow-up/ 涓嬪叾浠栬矾鐢憋級
    [ ] 16e. src/app/api/apply-followup/route.ts
    [ ] 16f. src/app/api/extract-template/route.ts
    [ ] 16g. src/app/api/parse-pdf/route.ts
[ ] 17. 鍒涘缓 src/lib/payment/wechat-pay.ts 鈥斺€?2灏忔椂
[ ] 18. 鍒涘缓 src/lib/payment/alipay.ts 鈥斺€?2灏忔椂
[ ] 19. 鍒涘缓 src/lib/payment/order.ts 鈥斺€?2灏忔椂
[ ] 20. 鍒涘缓 src/app/api/payment/create-order/route.ts 鈥斺€?1灏忔椂
[ ] 21. 鍒涘缓 src/app/api/payment/wechat/notify/route.ts 鈥斺€?1灏忔椂
[ ] 22. 鍒涘缓 src/app/api/payment/alipay/notify/route.ts 鈥斺€?1灏忔椂
[ ] 23. 鍒涘缓 src/app/api/payment/status/route.ts 鈥斺€?30鍒嗛挓
[ ] 24. 鍒涘缓 src/components/payment/payment-modal.tsx 鈥斺€?2灏忔椂
[ ] 25. 鍒涘缓 src/components/pricing/usage-limit-banner.tsx 鈥斺€?1灏忔椂
[ ] 26. 淇敼 src/services/ai/resumeAgent.ts锛堣皟鐢ㄥ墠妫€鏌ラ搴︼級鈥斺€?1灏忔椂
[ ] 27. 鏇存柊 .env.example 娣诲姞鎵€鏈夋柊鐜鍙橀噺 鈥斺€?15鍒嗛挓
[ ] 28. 娴嬭瘯瀹屾暣娴佺▼锛氭敞鍐屸啋鐧诲綍鈫掑垎鏋愨啋棰濆害鑰楀敖鈫掍粯璐光啋缁х画 鈥斺€?2灏忔椂
```

### 绗簩闃舵锛氫綋楠屼紭鍖栵紙棰勮 2 鍛級

```
[ ] 29. 鍒涘缓 src/app/api/projects/route.ts锛堥」鐩垪琛?鍒涘缓锛夆€斺€?1灏忔椂
[ ] 30. 鍒涘缓 src/app/api/projects/[id]/route.ts锛圕RUD锛夆€斺€?1.5灏忔椂
[ ] 31. 鍒涘缓 src/app/dashboard/page.tsx锛堢敤鎴蜂华琛ㄧ洏锛夆€斺€?3灏忔椂
[ ] 32. 淇敼 src/store/resume-store.ts锛堟坊鍔犱簯鍚屾锛夆€斺€?2灏忔椂
[ ] 33. 鍒涘缓 src/lib/use-auto-save.ts 鈥斺€?1灏忔椂
[ ] 34. 淇敼 src/app/expert/page.tsx锛堝姞杞?淇濆瓨椤圭洰鏁版嵁锛夆€斺€?2灏忔椂
[ ] 35. 鍒涘缓 src/lib/export/pdf-server.ts锛圥uppeteer PDF锛夆€斺€?3灏忔椂
[ ] 36. 鍒涘缓 src/app/api/export/pdf/route.ts 鈥斺€?1灏忔椂
[ ] 37. 鍒涘缓 src/lib/logger.ts 鈥斺€?1灏忔椂
[ ] 38. 鍒涘缓 src/lib/analytics.ts 鈥斺€?1灏忔椂
[ ] 39. 闆嗘垚 Sentry锛坣px @sentry/wizard锛夆€斺€?1灏忔椂
[ ] 40. 淇敼 src/app/error.tsx锛圫entry 涓婃姤锛夆€斺€?30鍒嗛挓
[ ] 41. 鍒涘缓 src/app/privacy/page.tsx 鈥斺€?1灏忔椂
[ ] 42. 鍒涘缓 src/app/terms/page.tsx 鈥斺€?1灏忔椂
[ ] 43. 閲嶆瀯 src/app/page.tsx 鐫€闄嗛〉 鈥斺€?4灏忔椂
    [ ] 43a. 鍒涘缓 src/components/landing/hero-section.tsx
    [ ] 43b. 鍒涘缓 src/components/landing/features-section.tsx
    [ ] 43c. 鍒涘缓 src/components/landing/stats-section.tsx
    [ ] 43d. 鍒涘缓 src/components/landing/testimonials-section.tsx
    [ ] 43e. 鍒涘缓 src/components/landing/pricing-section.tsx
    [ ] 43f. 鍒涘缓 src/components/landing/faq-section.tsx
    [ ] 43g. 鍒涘缓 src/components/landing/footer.tsx
```

### 绗笁闃舵锛氬鍊煎姛鑳斤紙棰勮 2 鍛級

```
[ ] 44. 鍒涘缓 src/lib/export/word-export.ts 鈥斺€?2灏忔椂
[ ] 45. 鍒涘缓 src/app/api/export/word/route.ts 鈥斺€?1灏忔椂
[ ] 46. 淇敼 src/components/steps/export-step.tsx锛堝鍔?Word 瀵煎嚭鎸夐挳+姘村嵃+楂樻竻 PDF锛夆€斺€?3灏忔椂
[ ] 47. 鍒涘缓 src/components/shared/watermark.tsx 鈥斺€?1灏忔椂
[ ] 48. 鍒涘缓 src/app/api/templates/route.ts 鈥斺€?1灏忔椂
[ ] 49. 鍒涘缓 src/app/api/templates/[id]/route.ts 鈥斺€?1灏忔椂
[ ] 50. 鍒涘缓 src/app/templates/page.tsx锛堟ā鏉垮晢搴楅〉闈級鈥斺€?3灏忔椂
[ ] 51. 鍒涘缓 src/components/templates/template-gallery.tsx 鈥斺€?2灏忔椂
[ ] 52. 鍒涘缓 src/components/templates/template-preview-modal.tsx 鈥斺€?1.5灏忔椂
[ ] 53. 淇敼 src/lib/preset-templates.ts锛堟坊鍔犳ā鏉垮厓鏁版嵁锛夆€斺€?1灏忔椂
[ ] 54. resume-design-main 闆嗘垚锛坕frame + postMessage锛夆€斺€?3澶?    [ ] 54a. 鍦?resume-design-main 涓坊鍔?postMessage API
    [ ] 54b. 鏋勫缓涓洪潤鎬佹枃浠跺埌 public/designer-app/
    [ ] 54c. 淇敼 src/app/designer/page.tsx锛坕frame 宓屽叆 + 閫氫俊锛?    [ ] 54d. 閰嶇疆 next.config.ts 璺敱閲嶅啓
    [ ] 54e. 娴嬭瘯鏁版嵁浜掗€氾紙AI鍒嗘瀽缁撴灉 鈫?璁捐鍣級
```

### 绗洓闃舵锛氭寔缁凯浠?
```
[ ] 55. 閰嶇疆 Vitest + 缂栧啓鏍稿績娴嬭瘯 鈥斺€?2澶?[ ] 56. ATS 璇勫垎鍔熻兘 鈥斺€?2澶?[ ] 57. 姹傝亴淇＄敓鎴?鈥斺€?1澶?[ ] 58. 鐢ㄦ埛鍙嶉绯荤粺 鈥斺€?1澶?[ ] 59. 绠＄悊鍚庡彴锛堟煡鐪嬬敤鎴?璁㈠崟/鏁版嵁缁熻锛夆€斺€?3澶?[ ] 60. 閮ㄧ讲涓婄嚎锛堥樋閲屼簯 + 澶囨锛夆€斺€?3澶?```

---

## 閮ㄧ讲娓呭崟锛堥樋閲屼簯鏂规锛?
```
[ ] 1. 璐拱闃块噷浜?ECS锛?鏍?G 鎴?4鏍?G锛?[ ] 2. 璐拱闃块噷浜?RDS PostgreSQL
[ ] 3. 璐拱闃块噷浜?Redis锛堢敤浜庨€熺巼闄愬埗鍜?Session锛?[ ] 4. 璐拱闃块噷浜?OSS bucket
[ ] 5. 璐拱鍩熷悕 + 瀹屾垚 ICP 澶囨
[ ] 6. 閰嶇疆 SSL 璇佷功锛堝彲鐢ㄥ厤璐?Let's Encrypt锛?[ ] 7. 閰嶇疆 Nginx 鍙嶅悜浠ｇ悊
[ ] 8. 瀹夎 Node.js 18+ + PM2
[ ] 9. 閰嶇疆 .env.production
[ ] 10. 杩愯 prisma migrate deploy
[ ] 11. npm run build && pm2 start
[ ] 12. 閰嶇疆寰俊鏀粯鍜屾敮浠樺疂鍟嗘埛鍙?[ ] 13. 閰嶇疆闃块噷浜戠煭淇℃湇鍔?[ ] 14. 閰嶇疆 Sentry 椤圭洰
[ ] 15. 閰嶇疆鑷姩閮ㄧ讲锛圙itHub Actions / 闃块噷浜?DevOps锛?```

---

> **鎻愮ず**锛氬皢姝ゆ枃妗ｅ畬鏁村鍒剁粰 Gemini锛岃瀹冩寜鐓с€屽垎闃舵鎵ц娓呭崟銆嶉€愭瀹炴柦銆傛瘡瀹屾垚涓€涓樁娈靛缓璁厛娴嬭瘯鍐嶈繘鍏ヤ笅涓€闃舵銆?
