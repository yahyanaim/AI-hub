import type {
  Offer
} from '@/types'

import { daysAgo } from './_shared'

export const SEED_OFFERS: Offer[] = [
  {
    id: 'o1',
    slug: 'future-skills-academy',
    name: 'Future Skills Academy',
    tagline: 'Free skills program for the Arab region - UNDP & MBRF',
    description:
      'A completely free, online upskilling program by the UNDP Regional Bureau for Arab States and the Mohammed bin Rashid Al Maktoum Knowledge Foundation. Aimed at learners across the Arab region - from fresh graduates and job seekers to public/private sector professionals and entrepreneurs. Covers Transferable Skills, Entrepreneurship Skills, and Advanced Technical Skills, delivered through Coursera. Successful applicants get free access to selected courses and earn certificates.',
    url: 'https://www.knowledge4all.com/FutureSkills4All/overview',
    logoUrl: 'https://icons.duckduckgo.com/ip3/knowledge4all.com.ico',
    category: 'learning',
    tags: ['free', 'arab-region', 'coursera', 'certificate', 'undp'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm your target category',
        description:
          'The program serves six groups: Public Sector, Private Sector (MSMEs), Fresh Graduates, TVET Affiliates, Job Seekers, and Entrepreneurs. Each has a different enrollment path, so identify which one applies to you.',
      },
      {
        title: 'Open the Apply page',
        description:
          'Visit the program’s Apply page on Knowledge for All to find the individual online application form and complete it accurately - enrollment is free.',
        url: 'https://www.knowledge4all.com/FutureSkills4All/apply',
      },
      {
        title: 'Await your approval email',
        description:
          'After submitting, wait for an email that verifies your accepted place in the program. Response time varies by cohort.',
      },
      {
        title: 'Activate your Coursera account',
        description:
          'Follow the instructions in the email to set up your Coursera account - the program’s e-learning platform. Your free course access is granted through this account.',
      },
      {
        title: 'Begin your learning journey',
        description:
          'Enroll in your assigned courses, complete the modules, and earn your certificates. Check the program’s Competition page for extra opportunities.',
      },
    ],
    nameAr: 'أكاديمية مهارات المستقبل',
    taglineAr: 'برنامج مهارات مجاني للمنطقة العربية - الأمم المتحدة الإنمائية ومؤسسة محمد بن راشد',
    descriptionAr: 'برنامج مجاني بالكامل عبر الإنترنت من المكتب الإقليمي لبرنامج الأمم المتحدة الإنمائي ومؤسسة محمد بن راشد للمعرفة. موجه لحديثي التخرج والباحثين عن عمل والمهنيين ورواد الأعمال في المنطقة العربية. يغطي المهارات القابلة للنقل وريادة الأعمال والمهارات التقنية المتقدمة عبر كورسيرا مع شهادات مجانية.',
    stepsAr: [
      {
        title: 'حدد فئتك المستهدفة',
        description: 'يخدم البرنامج ست فئات: القطاع العام، الخاص (MSMEs)، حديثو التخرج، التعليم المهني، الباحثون عن عمل، ورواد الأعمال. حدد المسار المناسب لك.'
      },
      {
        title: 'افتح صفحة التقديم',
        description: 'اذهب إلى صفحة التقديم في Knowledge4All واملأ نموذج الطلب بدقة - التسجيل مجاني.',
        url: 'https://www.knowledge4all.com/FutureSkills4All/apply'
      },
      {
        title: 'انتظر رسالة الموافقة',
        description: 'بعد الإرسال، انتظر رسالة بريد تؤكد قبولك. تختلف مدة الرد حسب الدفعة.'
      },
      {
        title: 'فعّل حساب كورسيرا',
        description: 'اتبع تعليمات الرسالة لإنشاء حساب كورسيرا - ستحصل على وصول مجاني للمقررات.'
      },
      {
        title: 'ابدأ رحلة التعلم',
        description: 'سجّل في مقرراتك، أكمل الوحدات واحصل على الشهادات. تابع صفحة المسابقة لفرص إضافية.'
      }
    ],
    upvotes: 24,
    bookmarks: 31,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(6),
    updatedAt: daysAgo(1),
  },
  {
    id: 'o2',
    slug: 'tokenrouter-unified-ai-hub',
    name: 'TokenRouter',
    tagline: 'Kimi K3 free + one API for 300+ models - convert LLMs to OpenAI/Claude/Gemini format',
    description:
      'A unified AI model hub that converts leading LLMs into OpenAI-, Claude-, and Gemini-compatible APIs. Right now TokenRouter runs a free tier of Kimi K3 - a frontier reasoning model - on its own B300/GB300 deployment. Route requests across 300+ models from a single key, compare providers, and manage everything from one dashboard. Includes docs, release notes, and a model directory. Ideal for developers who want frontier models at no cost and model-agnostic access without vendor lock-in.',
    url: 'https://www.tokenrouter.com/',
    logoUrl: 'https://www.tokenrouter.com/logo-without-title.png',
    category: 'tool',
    tags: ['api', 'llm-router', 'multi-model', 'developers', 'kimi', 'free-model'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Create a TokenRouter account',
        description:
          'Sign up at tokenrouter.com with your email. No credit card is required for the free tier.',
        url: 'https://www.tokenrouter.com/',
      },
      {
        title: 'Open API Keys and create a key',
        description:
          'In the dashboard, go to API Keys and generate a key. Keep it safe - it authenticates all your routed requests.',
        url: 'https://www.tokenrouter.com/api-keys',
      },
      {
        title: 'Pick the free Kimi K3 model',
        description:
          'On the /models page, choose Kimi K3 Free (model id: moonshotai/kimi-k3-free). It runs on TokenRouter’s own B300/GB300 deployment and is free through the announced free tier period.',
        url: 'https://www.tokenrouter.com/models',
      },
      {
        title: 'Point your client at the unified endpoint',
        description:
          'Use https://api.tokenrouter.com/v1 as the base URL with model moonshotai/kimi-k3-free in any OpenAI/Claude/Gemini-compatible SDK - Cursor, Claude Code, Cline, Aider, Hermes, even OpenCode. Swap the endpoint and model name and your existing code keeps working.',
        url: 'https://www.tokenrouter.com/docs',
      },
      {
        title: 'Read the docs and release notes',
        description:
          'Follow the docs for setup guides and the release notes to stay current on new models, free tiers, and features.',
        url: 'https://www.tokenrouter.com/release-notes',
      },
    ],
    nameAr: 'TokenRouter',
    taglineAr: 'Kimi K3 مجاناً + واجهة موحدة لـ 300+ نموذج - حوّل LLMs إلى OpenAI/Claude/Gemini',
    descriptionAr: 'مركز نماذج موحد يحوّل أبرز النماذج إلى واجهات متوافقة مع OpenAI وClaude وGemini. حالياً يوفر Kimi K3 مجاناً على خوادم B300/GB300. وجّه الطلبات عبر 300+ نموذج بمفتاح واحد، وقارن المزودين من لوحة واحدة.',
    stepsAr: [
      {
        title: 'أنشئ حساب TokenRouter',
        description: 'سجّل في tokenrouter.com ببريدك. لا حاجة لبطاقة للخطة المجانية.',
        url: 'https://www.tokenrouter.com/'
      },
      {
        title: 'افتح مفاتيح API وأنشئ مفتاحاً',
        description: 'في اللوحة اذهب إلى API Keys وأنشئ مفتاحاً. احتفظ به بأمان.',
        url: 'https://www.tokenrouter.com/api-keys'
      },
      {
        title: 'اختر Kimi K3 المجاني',
        description: 'في صفحة النماذج اختر Kimi K3 Free (moonshotai/kimi-k3-free).',
        url: 'https://www.tokenrouter.com/models'
      },
      {
        title: 'وجّه عميلك للنقطة الموحدة',
        description: 'استخدم https://api.tokenrouter.com/v1 كنقطة أساس مع النموذج moonshotai/kimi-k3-free في أي SDK متوافق.',
        url: 'https://www.tokenrouter.com/docs'
      },
      {
        title: 'اقرأ الوثائق',
        description: 'تابع الوثائق وملاحظات الإصدار لمعرفة النماذج والخطط المجانية الجديدة.',
        url: 'https://www.tokenrouter.com/release-notes'
      }
    ],
    upvotes: 15,
    bookmarks: 19,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(12),
    updatedAt: daysAgo(2),
  },
  {
    id: 'o3',
    slug: 'nvidia-nim',
    name: 'NVIDIA NIM',
    tagline: 'Free OpenAI-compatible inference across 100+ models on DGX Cloud',
    description:
      'NVIDIA’s free inference platform at build.nvidia.com. Join the NVIDIA Developer Program to get API access to 100+ leading models (Nemotron, GLM, MiniMax, DeepSeek and more) served on DGX Cloud. Every model exposes an OpenAI-compatible endpoint, so switching models is just a string change. New developers get 1,000-5,000 free inference credits with roughly 40 requests/minute per model - perfect for prototyping and building agents.',
    url: 'https://build.nvidia.com/models',
    logoUrl: 'https://icons.duckduckgo.com/ip3/build.nvidia.com.ico',
    category: 'api-access',
    tags: ['nvidia', 'free-api', 'gpu', 'llm', 'openai-compatible'],
    pricing: 'free',
    steps: [
      {
        title: 'Open the NVIDIA model catalog',
        description:
          'Go to build.nvidia.com/models to browse the full catalog of supported models, filters, and playgrounds.',
        url: 'https://build.nvidia.com/models',
      },
      {
        title: 'Join the NVIDIA Developer program (free)',
        description:
          'Create an account on build.nvidia.com and join the NVIDIA Developer Program. This unlocks the hosted NIM APIs and can award 1,000-5,000 free inference credits.',
        url: 'https://build.nvidia.com/',
      },
      {
        title: 'Generate your NVIDIA API key',
        description:
          'In your account, generate an API key that starts with nvapi-. Keep it in an env var for your app or agent.',
      },
      {
        title: 'Call the OpenAI-compatible endpoint',
        description:
          'Use https://integrate.api.nvidia.com/v1 as your base URL and pass the model ID of any catalog model. Your existing OpenAI SDK code works with just a base URL + key swap.',
      },
      {
        title: 'Prototype within the free tier',
        description:
          'Each model is rate-limited (roughly 40 req/min) and credits are consumed per request. Perfect for prototypes, agents, and experiments - move to paid or self-hosted NIM for production.',
      },
    ],
    nameAr: 'NVIDIA NIM',
    taglineAr: 'استدلال مجاني متوافق مع OpenAI لأكثر من 100 نموذج على DGX Cloud',
    descriptionAr: 'منصة الاستدلال المجانية من NVIDIA على build.nvidia.com. انضم لبرنامج مطوري NVIDIA واحصل على وصول لـ 100+ نموذج (Nemotron، GLM، MiniMax، DeepSeek) على DGX Cloud مع نقطة متوافقة مع OpenAI و 1000-5000 رصيد مجاني.',
    stepsAr: [
      {
        title: 'افتح كتالوج نماذج NVIDIA',
        description: 'اذهب إلى build.nvidia.com/models لاستعراض كل النماذج.',
        url: 'https://build.nvidia.com/models'
      },
      {
        title: 'انضم لبرنامج المطورين (مجاني)',
        description: 'أنشئ حساباً وانضم لبرنامج NVIDIA Developer للحصول على 1000-5000 رصيد مجاني.',
        url: 'https://build.nvidia.com/'
      },
      {
        title: 'أنشئ مفتاح API',
        description: 'أنشئ مفتاحاً يبدأ بـ nvapi- واحتفظ به في متغير بيئة.'
      },
      {
        title: 'استدعِ النقطة المتوافقة',
        description: 'استخدم https://integrate.api.nvidia.com/v1 كنقطة أساس ومرر معرف النموذج.'
      },
      {
        title: 'جرّب ضمن الحد المجاني',
        description: 'كل نموذج محدود بنحو 40 طلب/دقيقة - مثالي للنماذج الأولية والوكلاء.'
      }
    ],
    upvotes: 28,
    bookmarks: 34,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(5),
    updatedAt: daysAgo(1),
  },
  {
    id: 'o4',
    slug: 'dahl-inference',
    name: 'Dahl Inference',
    tagline: 'Powerful models, simple API access - MiniMax, Kimi, GLM & more',
    description:
      'Dahl Inference is a model catalog that makes powerful open models easy to use through a single, simple API. It hosts strong models - MiniMax M2.7, Kimi K2.6, GLM 5.2 - with straightforward routing behind one key. Browse the catalog at inference.dahl.global/models, try the chat playground, and integrate with docs at docs.dahl.global. Endpoints are OpenAI-compatible for easy drops into existing code.',
    url: 'https://inference.dahl.global/models',
    logoUrl: 'https://icons.duckduckgo.com/ip3/inference.dahl.global.ico',
    category: 'api-access',
    tags: ['api', 'mini-max', 'kimi', 'glm', 'llm'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open the model catalog',
        description:
          'Browse inference.dahl.global/models to see the available models (MiniMax M2.7, Kimi K2.6, GLM 5.2) with context sizes and capabilities.',
        url: 'https://inference.dahl.global/models',
      },
      {
        title: 'Sign in and get an API key',
        description:
          'Sign in to your Dahl account and click "GET API KEY". Your key authenticates all your inference requests.',
      },
      {
        title: 'Try the chat playground',
        description:
          'Use /chat to test the models interactively before wiring up your code - confirm the response quality and latency.',
        url: 'https://inference.dahl.global/chat',
      },
      {
        title: 'Integrate with the Dahl API',
        description:
          'Follow the docs at docs.dahl.global to route requests through the API with your key. Models and endpoints are OpenAI-compatible for easy drops into existing code.',
        url: 'https://docs.dahl.global',
      },
      {
        title: 'Monitor via the status page',
        description:
          'Check /status for uptime and current availability when you ship to production.',
        url: 'https://inference.dahl.global/status',
      },
    ],
    nameAr: 'Dahl Inference',
    taglineAr: 'نماذج قوية عبر API بسيط - MiniMax و Kimi و GLM والمزيد',
    descriptionAr: 'كتالوج Dahl يسهّل استخدام النماذج القوية عبر مفتاح واحد: MiniMax M2.7 و Kimi K2.6 و GLM 5.2 مع توجيه بسيط وواجهة OpenAI متوافقة.',
    stepsAr: [
      {
        title: 'افتح الكتالوج',
        description: 'تصفح inference.dahl.global/models لمعرفة النماذج المتاحة.',
        url: 'https://inference.dahl.global/models'
      },
      {
        title: 'سجّل واحصل على مفتاح',
        description: 'سجّل دخولك وانقر "GET API KEY".'
      },
      {
        title: 'جرّب ساحة الدردشة',
        description: 'استخدم /chat لاختبار النماذج تفاعلياً قبل البرمجة.',
        url: 'https://inference.dahl.global/chat'
      },
      {
        title: 'ادمج عبر API',
        description: 'اتبع الوثائق في docs.dahl.global لتمرير الطلبات بمفتاحك.',
        url: 'https://docs.dahl.global'
      },
      {
        title: 'راقب الحالة',
        description: 'تابع /status لمعرفة الجاهزية في الإنتاج.',
        url: 'https://inference.dahl.global/status'
      }
    ],
    upvotes: 11,
    bookmarks: 14,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o5',
    slug: 'flux-3-early-access',
    name: 'FLUX 3 Early Access',
    tagline: 'Black Forest Labs\u2019 multimodal model - video, image, audio & action in early access',
    description:
      'FLUX 3 is Black Forest Labs\u2019 new multimodal foundation model that jointly learns from images, video, and audio in a single unified architecture. FLUX 3 Video (with native audio generation, up to 20-second clips) is available now through a gated early access program - anyone can apply, but BFL approves requests by use case. Capabilities include text-to-video, image-to-video, video continuation, keyframe control, multilingual dialogue, and agentic clip chaining. In early evaluations it was preferred over Runway Gen-4.5 in 77% of comparisons and Luma Ray 3.2 in 93%. Early access is free to apply; video generation is pay-as-you-go (from $0.06/sec draft HD). FLUX 3 Image, FLUX 3 Action, and the open-weight FLUX 3 Dev follow over the coming weeks.',
    url: 'https://bfl.ai/models/flux-3',
    logoUrl: 'https://icons.duckduckgo.com/ip3/bfl.ai.ico',
    category: 'tool',
    tags: ['video', 'image', 'audio', 'multimodal', 'early-access', 'black-forest-labs'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open the FLUX 3 model page',
        description:
          'Visit bfl.ai/models/flux-3 to read about FLUX 3 Video, Image, Action, and the Dev backbone, and review the early evaluation results and FAQ.',
        url: 'https://bfl.ai/models/flux-3',
      },
      {
        title: 'Request early access',
        description:
          'Submit the early access form on the model page. The program is free and open to anyone, but access is discretionary - Black Forest Labs approves based on your use case and fit.',
      },
      {
        title: 'Describe your use case',
        description:
          'Explain how you plan to use FLUX 3 (e.g., content creation, filmmaking, product design, virtual try-on). Strong, specific use cases are prioritized.',
      },
      {
        title: 'Wait for BFL approval',
        description:
          'There is no published wait time or approval criteria. Apply early and check your inbox - approval grants access through the BFL dashboard and API.',
      },
      {
        title: 'Generate with FLUX 3 Video',
        description:
          'Once approved, generate up to 20-second videos with native audio from text, images, or keyframes. Pricing is pay-as-you-go (draft HD from $0.06/sec) with no subscriptions or seat fees.',
      },
    ],
    nameAr: 'FLUX 3 وصول مبكر',
    taglineAr: 'نموذج Black Forest Labs متعدد الوسائط - فيديو وصور وصوت',
    descriptionAr: 'FLUX 3 نموذج أساسي متعدد الوسائط يتعلم من الصور والفيديو والصوت معاً. FLUX 3 Video متاح الآن عبر وصول مبكر مجاني للتقديم - توليد حتى 20 ثانية مع صوت أصلي، تحويل نص/صورة إلى فيديو، وتسلسل لقطات.',
    stepsAr: [
      {
        title: 'افتح صفحة FLUX 3',
        description: 'اذهب إلى bfl.ai/models/flux-3 لقراءة التفاصيل والأسئلة الشائعة.',
        url: 'https://bfl.ai/models/flux-3'
      },
      {
        title: 'اطلب الوصول المبكر',
        description: 'قدّم نموذج الوصول المبكر - مجاني ومفتوح للجميع لكن الموافقة حسب حالة الاستخدام.'
      },
      {
        title: 'اشرح حالة الاستخدام',
        description: 'وضّح كيف ستستخدم FLUX 3 (محتوى، أفلام، تصميم). الحالات المحددة لها أولوية.'
      },
      {
        title: 'انتظر موافقة BFL',
        description: 'لا توجد مدة معلنة - قدّم مبكراً وتابع بريدك.'
      },
      {
        title: 'ولّد بفيديو FLUX 3',
        description: 'بعد الموافقة، ولّد فيديوهات حتى 20 ثانية بالصوت الأصلي - الدفع حسب الاستخدام من 0.06$ للثانية.'
      }
    ],
    upvotes: 18,
    bookmarks: 22,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(1),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o6',
    slug: 'opencode-with-ox-alpha',
    name: 'OpenCode + Ox Alpha (Free)',
    tagline: 'Free open-source coding agent powered by Ox Alpha - free stealth model on OpenCode Zen',
    description:
      'OpenCode is a free, open-source AI coding agent for the terminal, desktop, and web that reads your repo, edits files, and runs commands. Ox Alpha Free (`x-preview-f-free`) is a stealth model served through OpenCode Zen that is completely free during its preview period - input, output, and cached tokens are all $0 - and its provider follows a zero-retention policy, so your code is never used for model training. Pair them for a full agentic coding setup at literally no cost: connect via `/connect`, pick OpenCode Zen, paste your API key, then select the model with `/models`.',
    url: 'https://opencode.ai/zen',
    logoUrl: 'https://icons.duckduckgo.com/ip3/opencode.ai.ico',
    category: 'tool',
    tags: ['open-source', 'coding-agent', 'ox-alpha', 'free', 'cli', 'terminal'],
    pricing: 'free',
    steps: [
      {
        title: 'Install OpenCode',
        description:
          'Install the free, open-source coding agent for your OS. The easiest path is a one-line terminal install, then run `opencode` in your project directory.',
        url: 'https://opencode.ai/docs',
      },
      {
        title: 'Create an OpenCode Zen account and API key',
        description:
          'Sign in to OpenCode Zen and copy your API key. No paid credits needed - Ox Alpha Free is $0 during its preview period.',
        url: 'https://opencode.ai/auth',
      },
      {
        title: 'Connect the Zen provider',
        description:
          'Inside OpenCode, type `/connect`, select OpenCode Zen, and paste your API key when prompted. The credential is stored locally so you only enter it once.',
      },
      {
        title: 'Pick the Ox Alpha Free model',
        description:
          'Run `/models` and select `opencode/x-preview-f-free` (Ox Alpha Free) for fast, capable everyday coding at zero cost. You can also set it in opencode.json as your default model.',
      },
      {
        title: 'Start building',
        description:
          'Describe a task in plain language and let OpenCode read your repo, edit files, run commands, and iterate. Both the agent and the model are free - nothing to pay.',
      },
    ],
    nameAr: 'OpenCode + Ox Alpha (مجاني)',
    taglineAr: 'وكيل برمجة مفتوح المصدر مجاني مدعوم بنموذج Ox Alpha المجاني على OpenCode Zen',
    descriptionAr: 'OpenCode وكيل برمجة مجاني للطرفية وسطح المكتب والويب يقرأ المستودع ويعدّل الملفات وينفذ الأوامر. نموذج Ox Alpha Free عبر OpenCode Zen مجاني تماماً خلال فترة المعاينة - المدخلات والمخرجات كلها بـ 0$ - ومزوده يتبع سياسة عدم الاحتفاظ بالبيانات فلا يُستخدم كودك في التدريب. اربطهما عبر /connect واختر النموذج من /models.',
    stepsAr: [
      {
        title: 'ثبّت OpenCode',
        description: 'ثبّت الوكيل المجاني لنظامك ثم شغّل opencode في مشروعك.',
        url: 'https://opencode.ai/docs'
      },
      {
        title: 'أنشئ حساب OpenCode Zen ومفتاح API',
        description: 'سجّل الدخول إلى OpenCodeZen وانسخ مفتاح API - لا حاجة لأي رصيد.',
        url: 'https://opencode.ai/auth'
      },
      {
        title: 'اربط مزود Zen',
        description: 'داخل OpenCode اكتب /connect واختر OpenCode Zen والصق المفتاح.'
      },
      {
        title: 'اختر نموذج Ox Alpha Free',
        description: 'شغّل /models واختر opencode/x-preview-f-free أو اجعله الافتراضياً في opencode.json.'
      },
      {
        title: 'ابدأ البناء',
        description: 'صف مهمتك بلغة طبيعية ودع OpenCode يقرأ ويعدّل وينفذ ويكرر - وكيل ونموذج مجاناً.'
      }
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o7',
    slug: 'gemini-for-students',
    name: 'Gemini for Students',
    tagline: 'Free Google AI Pro (US: 5TB + 4× Gemini) or AI Plus (Global: 400GB + 2× Gemini) for 1 year - verified college students',
    description:
      'Google’s official 2026 student offer - live since Aug 19, 2026 and redeemable until Dec 31, 2026. In the US you get 12 months of Google AI Pro free (normally $19.99/mo): 4× higher usage limits in Gemini, 5 TB of Google Drive/Photos/Gmail storage, Gemini Spark agentic platform, Gemini Omni, Gemini in Gmail/Docs/Sheets, Google Health Premium, plus the new Student Hub (study notebooks with custom learning plans, interactive visualizations, personalized quizzes & performance tracker), unlimited uploads and Gemini Live. Outside the US (160+ countries including Morocco, MENA, EU, Asia) you get 12 months of Google AI Plus free: 2× higher Gemini limits, 400 GB storage, Gemini Omni, and the same Student Hub with unlimited notebooks/visualizations. Must be 18+, verified each year via SheerID with your college .edu or student ID, and requires a payment method - auto-renews at standard price unless you cancel. Offer Terms at one.google.com/offer/studentoffer8.',
    url: 'https://gemini.google/students/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/gemini.google.com.ico',
    category: 'learning',
    tags: ['gemini', 'google', 'students', 'free', 'ai-pro', 'ai-plus', 'student-hub'],
    pricing: 'free',
    steps: [
      {
        title: 'Pick your student hub',
        description:
          'US students: open gemini.google/us/students (AI Pro). Everyone else (incl. Morocco/MENA): open gemini.google/students and choose your country/language - you will get AI Plus. Both pages have a "Claim Free Student Plan" button.',
        url: 'https://gemini.google/students/',
      },
      {
        title: 'Click Claim Free Student Plan → Verify via SheerID',
        description:
          'You will be sent to one.google.com/ai-student → SheerID. Verify with your college email (.edu), enrollment letter, or student ID. Must be 18+ and enrolled at an accredited college/university. Second-year re-verification is required to keep the benefit.',
        url: 'https://one.google.com/ai-student?plans=1%2C2',
      },
      {
        title: 'Add a payment method and redeem (before Dec 31, 2026)',
        description:
          'A valid card is required at sign-up even though the year is free. US: AI Pro will auto-charge $19.99/mo after 12 months; Global: AI Plus at local price. Cancel anytime before renewal to avoid charges. See Offer Terms for full conditions.',
        url: 'https://one.google.com/offer/studentoffer8?g1_landing_page=0',
      },
      {
        title: 'Open Gemini Student Hub',
        description:
          'Go to gemini.google.com → Student hub. Upload syllabi, lecture notes, PDFs & slides: Gemini creates a tailored study notebook, learning plan, interactive visualizations, practice quizzes, and performance tracking. All uploads are unlimited during the student plan.',
        url: 'https://gemini.google.com',
      },
      {
        title: 'Use Pro/Plus everywhere',
        description:
          'US (Pro): 4× Gemini limits, 5 TB storage, Gemini Spark (agent builder), Gemini Omni, Gemini in Gmail/Docs/Sheets/Slides & Gemini Live. Global (Plus): 2× limits, 400 GB, Gemini Omni. Turn any notes into study guides, quizzes, summaries or audio podcasts in one click.',
      },
    ],
    nameAr: 'جيميناي للطلاب',
    taglineAr: 'جوجل AI Pro مجاناً لمدة سنة (أمريكا: 5TB و 4× جيميناي) أو AI Plus عالمياً (400GB و 2× جيميناي) - للطلاب الجامعيين',
    descriptionAr: 'عرض جوجل الرسمي لعام 2026 - متاح منذ 19 أغسطس 2026 حتى 31 ديسمبر 2026. في أمريكا تحصل على Google AI Pro مجاناً لمدة 12 شهراً (بقيمة 19.99$ شهرياً): حدود استخدام 4× في جيميناي، 5 تيرابايت تخزين في درايف/صور/جيميل، منصة Gemini Spark، Gemini Omni، جيميناي في جيميل/دوكس/شيتس، Google Health Premium، ومركز الطالب الجديد (دفاتر دراسية بخطط تعلم مخصصة، مرئيات تفاعلية، اختبارات شخصية وتتبع الأداء) مع تحميلات غير محدودة و Gemini Live. خارج أمريكا (160+ دولة تشمل المغرب والشرق الأوسط وأوروبا) تحصل على Google AI Plus مجاناً: حدود 2×، 400GB، Gemini Omni ونفس مركز الطالب. يجب أن تكون 18+ ويتم التحقق سنوياً عبر SheerID ببريدك الجامعي .edu أو بطاقة الطالب، مع بطاقة دفع - يتجدد تلقائياً إلا إذا ألغيت.',
    stepsAr: [
      {
        title: 'اختر مركز الطلاب المناسب',
        description: 'طلاب أمريكا: افتح gemini.google/us/students (AI Pro). باقي الدول (بما فيها المغرب): افتح gemini.google/students واختر بلدك/لغتك - ستحصل على AI Plus. كلا الصفحتين بها زر "Claim Free Student Plan".',
        url: 'https://gemini.google/students/',
      },
      {
        title: 'اضغط "Claim" وتحقق عبر SheerID',
        description: 'سيتم نقلك إلى one.google.com/ai-student → SheerID. تحقق ببريدك الجامعي (.edu) أو خطاب التسجيل أو بطاقة الطالب. يجب أن تكون 18+ ومسجلاً في جامعة معتمدة. التحقق السنوي مطلوب للتجديد.',
        url: 'https://one.google.com/ai-student?plans=1%2C2',
      },
      {
        title: 'أضف بطاقة دفع واسترد العرض (قبل 31 ديسمبر 2026)',
        description: 'بطاقة صالحة مطلوبة رغم أن السنة مجانية. أمريكا: سيتم تحصيل 19.99$ بعد 12 شهراً، عالمياً بسعر Plus المحلي. يمكنك الإلغاء قبل التجديد لتجنب الرسوم.',
        url: 'https://one.google.com/offer/studentoffer8?g1_landing_page=0',
      },
      {
        title: 'افتح مركز الطالب في جيميناي',
        description: 'اذهب إلى gemini.google.com → Student hub. ارفع المناهج والملاحظات والـ PDF: ينشئ جيميناي دفتر دراسة مخصص، خطة تعلم، مرئيات تفاعلية، اختبارات وتتبع أداء - تحميلات غير محدودة.',
        url: 'https://gemini.google.com',
      },
      {
        title: 'استخدم Pro/Plus في كل مكان',
        description: 'أمريكا (Pro): حدود 4×، 5TB، Spark، Omni، جيميناي في جيميل/دوكس/Live. عالمياً (Plus): حدود 2×، 400GB، Omni. حوّل أي ملاحظات إلى أدلة دراسية واختبارات وملخصات وبودكاست صوتي.',
      },
    ],
    upvotes: 42,
    bookmarks: 56,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o8',
    slug: 'muse-spark',
    name: 'Muse Spark',
    tagline: 'Muse Spark 1.3 by Meta - free-tier agentic coding for OpenCode & terminal agents',
    description:
      'Muse Spark is Meta’s agentic coding model built for autonomous engineering loops: it reads your repo, plans multi-step changes, edits files, runs tests, and iterates. Muse Spark 1.3 (September 2026) beats 1.2 on coding and long-context work with ~20% fewer tool calls and ~25% fewer tokens per job, at unchanged pricing. Sign up for the free tier and power OpenCode, Hermes, OpenClaw and other terminal agents with zero subscription. Connect via OpenCode /connect or any OpenAI-compatible base URL, pick muse-spark-1.3, and start shipping.',
    url: 'https://www.meta.ai/muse-spark',
    logoUrl: 'https://icons.duckduckgo.com/ip3/meta.ai.ico',
    category: 'tool',
    tags: ['meta', 'muse-spark', 'muse-spark-1-3', 'coding-agent', 'free', 'opencode', 'llm'],
    pricing: 'free',
    steps: [
      {
        title: 'Open Muse Spark',
        description:
          'Visit the Muse Spark model page and create a Meta AI account if you do not have one.',
        url: 'https://www.meta.ai/muse-spark',
      },
      {
        title: 'Create an API key',
        description:
          'In the dashboard, generate an API key for Muse Spark. The free tier gets you started with no credit card required for the trial.',
      },
      {
        title: 'Connect from OpenCode',
        description:
          'Run opencode in your project, type /connect, pick Muse Spark (or Custom OpenAI-compatible), and paste your API key. Alternatively set the base URL in your agent config to the Muse Spark endpoint.',
        url: 'https://opencode.ai/docs',
      },
      {
        title: 'Select muse-spark-1.3',
        description:
          'Run /models and choose muse-spark-1.3-contributor-free for zero-cost coding, or muse-spark-1.3 for higher rate limits. The xhigh reasoning mode is live now with max coming soon; the model is fully instruction-tuned for file edits, shell execution, and repo search.',
      },
      {
        title: 'Ship with the agent loop',
        description:
          'Describe your task in plain language - Muse Spark will explore the codebase, edit files, run commands, and verify with builds/tests, all in one autonomous loop.',
      },
    ],
    nameAr: 'Muse Spark',
    taglineAr: 'Muse Spark 1.3 من Meta - ذكاء برمجي وكيلي بمستوى مجاني لـ OpenCode',
    descriptionAr: 'Muse Spark نموذج وكيلي من Meta للهندسة المستقلة: يقرأ المستودع ويخطط ويعدّل وينفذ الاختبارات ويكرر. إصدار 1.3 (سبتمبر 2026) يتفوق على 1.2 في البرمجة والسياق الطويل بأدوات أقل ~20% ورموز أقل ~25% للمهمة نفسها وبنفس الأسعار. اشترك في المستوى المجاني وشغّل OpenCode و Hermes و OpenClaw بدون اشتراك.',
    stepsAr: [
      {
        title: 'افتح Muse Spark',
        description: 'اذهب إلى صفحة Muse Spark وأنشئ حساب Meta AI.',
        url: 'https://www.meta.ai/muse-spark'
      },
      {
        title: 'أنشئ مفتاح API',
        description: 'أنشئ مفتاحاً - المستوى المجاني يكفي للبدء.'
      },
      {
        title: 'اربط من OpenCode',
        description: 'شغّل opencode واكتب /connect واختر Muse Spark والصق المفتاح.',
        url: 'https://opencode.ai/docs'
      },
      {
        title: 'اختر muse-spark-1.3',
        description: 'شغّل /models واختر muse-spark-1.3-contributor-free.'
      },
      {
        title: 'انطلق بحلقة الوكيل',
        description: 'صف مهمتك ودع Spark يستكشف ويعدّل وينفذ ويتحقق.'
      }
    ],
    upvotes: 31,
    bookmarks: 44,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o9',
    slug: 'github-student-developer-pack',
    name: 'GitHub Student Developer Pack',
    tagline: '20+ dev tools free while you are a student - Copilot, Codespaces, domains, hosting ($200k+ value)',
    description:
      'The benchmark student pack - verified students get free access to 20+ premium dev tools: GitHub Copilot Pro (free while student), GitHub Codespaces, Namecheap 1-year domain + SSL, DigitalOcean $200 credit, JetBrains (via pack), Stripe fee waiver, 1Password, and more. Renewable while enrolled. GitHub verifies via school email, student ID, or enrollment letter. Non-students can get it by legitimately enrolling in any accredited college/community college (US CC ~$40 gets a real .edu + ID in 2-3 days) - no paid .edu shop needed.',
    url: 'https://education.github.com/pack',
    logoUrl: 'https://icons.duckduckgo.com/ip3/education.github.com.ico',
    category: 'tool',
    tags: ['github', 'copilot', 'student-pack', 'verified', 'cloud', 'domain'],
    pricing: 'free',
    steps: [
      {
        title: 'Check eligibility (13+ and enrolled)',
        description:
          'You must be 13+, enrolled in a degree/diploma course at an accredited school. K-12 and university both qualify. Faculty can apply via GitHub Education for Teachers.',
        url: 'https://education.github.com/pack',
      },
      {
        title: 'Get your student proof - two paths',
        description:
          'STUDENT: Use your school-issued .edu/.ac email OR prepare a file: student ID + enrollment letter/transcript with your full name, school name, and current date. NON-STUDENT: Enroll in an accredited community college (e.g., Dallas College, LA City College, Santa Monica College) for a cheap 1-credit online course - you will get a real .edu, ID, and enrollment letter in 24-72h. Alternative shops like edumailshop.com sell mailboxes but are revocable and against GitHub ToS - enroll legitimately instead.',
        url: 'https://education.github.com/pack/join',
      },
      {
        title: 'Apply at GitHub Education',
        description:
          'Go to education.github.com/pack → “Get benefits”. Sign in with GitHub, enter school name, verify with .edu email (instant) or “Use school-issued ID” to upload your files. GitHub usually approves in hours to 2 days. If rejected, re-upload a clearer PDF with date stamp.',
        url: 'https://education.github.com/pack/join',
      },
      {
        title: 'Link and claim each partner offer',
        description:
          'Once approved, scroll the pack page and click each benefit → “Get access”. Copilot enables instantly in your GitHub account. Namecheap/DigitalOcean etc. require you to create an account with the same email and link via the pack page. Claim before your student status expires.',
      },
      {
        title: 'Renew annually & keep your proof',
        description:
          'Student status lasts ~12 months and is renewable while enrolled. Set a reminder to re-verify with a new enrollment letter. You keep domains/credits earned during the term even after graduation.',
      },
    ],
    nameAr: 'حزمة مطور الطلاب من GitHub',
    taglineAr: 'أكثر من 20 أداة مطور مجاناً أثناء الدراسة - Copilot و Codespaces ودومين واستضافة (قيمة +200 ألف $)',
    descriptionAr: 'الحزمة المرجعية للطلاب - يتحقق الطلاب ويحصلون مجاناً على 20+ أداة مميزة: GitHub Copilot Pro مجاناً أثناء الدراسة، Codespaces، دومين Namecheap سنة + SSL، رصيد DigitalOcean 200$، JetBrains عبر الحزمة، إعفاء رسوم Stripe، 1Password والمزيد. قابلة للتجديد أثناء الدراسة. يتحقق GitHub عبر بريد .edu أو بطاقة الطالب أو خطاب التسجيل. غير الطلاب يمكنهم التسجيل في كلية مجتمع معتمدة (CC أمريكية ~40$ تحصل على .edu حقيقي + هوية خلال 2-3 أيام).',
    stepsAr: [
      {
        title: 'تحقق من الأهلية (13+ ومسجل)',
        description: 'يجب أن تكون 13+ ومسجلاً في شهادة/دبلوم في مدرسة معتمدة. المدارس والجامعات مؤهلة. يمكن للأساتذة التقديم عبر GitHub Education للمعلمين.',
        url: 'https://education.github.com/pack',
      },
      {
        title: 'جهّز إثبات الطالب - مساران',
        description: 'طالب: استخدم بريدك .edu أو جهّز ملفاً: بطاقة الطالب + خطاب/كشف تسجيل باسمك الكامل واسم المدرسة والتاريخ الحالي. غير طالب: سجّل في كلية مجتمع معتمدة (Dallas College، LA City College) لمقرر واحد رخيص - ستحصل على .edu حقيقي وهوية وخطاب خلال 24-72 ساعة.',
        url: 'https://education.github.com/pack/join',
      },
      {
        title: 'قدّم في GitHub Education',
        description: 'اذهب إلى education.github.com/pack → "Get benefits". سجّل دخولك، أدخل اسم المدرسة، تحقق ببريد .edu (فوري) أو "Use school-issued ID" لرفع ملفاتك. الموافقة خلال ساعات إلى يومين.',
        url: 'https://education.github.com/pack/join',
      },
      {
        title: 'اربط واطلب كل عرض شريك',
        description: 'بعد الموافقة، مرّر الصفحة واضغط كل ميزة → "Get access". Copilot يتفعل فوراً. Namecheap/DigitalOcean يتطلبان حساباً بنفس البريد وربطه عبر صفحة الحزمة.',
      },
      {
        title: 'جدّد سنوياً واحتفظ بالإثبات',
        description: 'حالة الطالب 12 شهراً قابلة للتجديد أثناء التسجيل. ضع تذكيراً لإعادة التحقق بخطاب جديد. تحتفظ بالدومينات والأرصدة المكتسبة حتى بعد التخرج.',
      },
    ],
    upvotes: 68,
    bookmarks: 72,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o10',
    slug: 'azure-for-students',
    name: 'Microsoft Azure for Students',
    tagline: '$100 credit + 12 months free + 25+ always-free services - no credit card required',
    description:
      'Azure for Students gives verified students $100 credit for 12 months, no credit card required at signup. Includes 25+ always-free services (App Service, Functions, Cosmos DB, VMs). Renewal requires re-verification. Students verify with school email via Microsoft. Non-students can qualify by enrolling in a CC/open university to get a .edu + enrollment proof, then use the same portal - Azure accepts both email and manual academic verification via SheerID/UNiDAYS.',
    url: 'https://azure.microsoft.com/free/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/azure.microsoft.com.ico',
    category: 'api-access',
    tags: ['azure', 'microsoft', 'cloud', 'students', 'free-credit'],
    pricing: 'free',
    steps: [
      {
        title: 'Open Azure Students page',
        description:
          'Visit azure.microsoft.com/free/students. Click “Activate now” - you will be sent to the Microsoft Education verification flow.',
        url: 'https://azure.microsoft.com/free/students',
      },
      {
        title: 'Get verified - student vs non-student',
        description:
          'STUDENT: Sign in with your school .edu/Microsoft 365 Education email - auto-verified instantly. NON-STUDENT: Enroll in any accredited CC for a 1-credit course to get a .edu + student ID, then sign up with that email. If you have no .edu, choose “Verify with school ID” and upload enrollment letter + ID; Microsoft also routes some countries via SheerID/UNiDAYS.',
      },
      {
        title: 'Create Azure account (no card)',
        description:
          'Complete the signup with phone verification. Unlike regular Azure Free, the student offer does NOT require a credit card at start. Add a card later only if you need to go pay-as-you-go after $100 runs out.',
      },
      {
        title: 'Activate $100 credit and start building',
        description:
          'Go to portal.azure.com → Subscriptions → you will see “Azure for Students” with $100. Deploy a VM, App Service, or Functions. Use Cost Management to track burn-down. Always-free services stay free after credit expires.',
      },
      {
        title: 'Renew after 12 months',
        description:
          'Credit expires in 12 months. To renew, you must still be enrolled - re-verify with updated enrollment proof. Graduates can move to Azure Free (no credit but still free services).',
      },
    ],
    nameAr: 'Azure للطلاب',
    taglineAr: 'رصيد 100$ + 12 شهر مجاناً + 25+ خدمة مجانية دائماً - بدون بطاقة',
    descriptionAr: 'Azure للطلاب يمنح 100$ رصيد لـ 12 شهراً بدون بطاقة عند التسجيل، مع 25+ خدمة مجانية دائماً. يتجدد بالتحقق. غير الطلاب يمكنهم التسجيل في كلية مجتمع للحصول على .edu.',
    stepsAr: [
      {
        title: 'افتح صفحة Azure للطلاب',
        description: 'اذهب إلى azure.microsoft.com/free/students واضغط "Activate now".',
        url: 'https://azure.microsoft.com/free/students'
      },
      {
        title: 'تحقق - طالب أو غير طالب',
        description: 'طالب: سجّل ببريد .edu → فوري. غير طالب: سجّل في CC للحصول على .edu وهوية، أو ارفع خطاباً وبطاقة عبر SheerID/UNiDAYS.'
      },
      {
        title: 'أنشئ حساب Azure (بدون بطاقة)',
        description: 'أكمل التسجيل بالتحقق عبر الهاتف. لا حاجة لبطاقة في البداية.'
      },
      {
        title: 'فعّل رصيد 100$ وابدأ',
        description: 'اذهب إلى portal.azure.com → Subscriptions → سترى الرصيد. أطلق VM أو App Service.'
      },
      {
        title: 'جدّد بعد 12 شهراً',
        description: 'الرصيد ينتهي بعد 12 شهراً - أعد التحقق بإثبات جديد.'
      }
    ],
    upvotes: 36,
    bookmarks: 48,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o11',
    slug: 'aws-educate',
    name: 'AWS Educate',
    tagline: '$100 AWS credit + hands-on labs + job board + cert discounts for students',
    description:
      'AWS Educate is Amazon’s student cloud program: $75-$100 credits (refreshed annually), access to 20+ Career Pathways, hands-on labs, and 50% off AWS Certified Cloud Practitioner. Verifies via school .edu or enrollment doc. Non-students can qualify by taking a cheap accredited course to get a student email/ID, then apply - AWS Educate accepts transcript + ID, not just .edu.',
    url: 'https://aws.amazon.com/education/awseducate/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/aws.amazon.com.ico',
    category: 'api-access',
    tags: ['aws', 'cloud', 'students', 'credits', 'certification'],
    pricing: 'free',
    steps: [
      {
        title: 'Create an AWS Educate account',
        description:
          'Go to aws.amazon.com/education/awseducate → “Join AWS Educate”. Choose Student. You will need a school email or to select “I don’t have a school email”.',
        url: 'https://aws.amazon.com/education/awseducate/',
      },
      {
        title: 'Provide student proof',
        description:
          'STUDENT: Enter .edu email - instant if recognized. Or upload student ID + enrollment proof (must show name, school, current term). NON-STUDENT: Register at a CC for 1 class → get .edu + enrollment letter (usually PDF in 1-2 days) → upload that. Some .edu shops work but AWS now checks enrollment date, so a real transcript is safest.',
      },
      {
        title: 'Wait for approval and claim credits',
        description:
          'Approval takes minutes to 24h. Check your email for “AWS Educate Application Approved”. Log in to aws.amazon.com/education/awseducate → “My Credits” → copy promo code → apply in Billing → Credits.',
      },
      {
        title: 'Complete labs and get cert discount',
        description:
          'Enter the AWS Educate portal → “Builder Labs” and “Career Pathways”. Completing a pathway unlocks the 50% certification voucher in “Benefits”.',
      },
      {
        title: 'Renew annually while enrolled',
        description:
          'Credits expire in 12 months. Re-verify each year with fresh proof. After graduation credits stop but labs stay accessible as alumni.',
      },
    ],
    nameAr: 'AWS Educate',
    taglineAr: 'رصيد 100$ من AWS + مختبرات عملية + خصم شهادات للطلاب',
    descriptionAr: 'AWS Educate: رصيد 75-100$ سنوياً، 20+ مسار وظيفي، مختبرات عملية وخصم 50% على شهادة Cloud Practitioner. يتحقق عبر .edu أو مستند تسجيل.',
    stepsAr: [
      {
        title: 'أنشئ حساب AWS Educate',
        description: 'اذهب إلى aws.amazon.com/education/awseducate → "Join AWS Educate".',
        url: 'https://aws.amazon.com/education/awseducate/'
      },
      {
        title: 'قدّم إثبات الطالب',
        description: 'طالب: أدخل .edu → فوري. أو ارفع بطاقة + خطاب. غير طالب: سجّل في CC واحصل على بريد وهوية وارفعهما.'
      },
      {
        title: 'انتظر الموافقة واطلب الرصيد',
        description: 'الموافقة خلال ساعات. راجع بريدك "Application Approved" وانسخ رمز الرصيد من "My Credits".'
      },
      {
        title: 'أكمل المختبرات واحصل على خصم الشهادة',
        description: 'ادخل "Builder Labs" و "Career Pathways" لفتح قسيمة 50%.'
      },
      {
        title: 'جدّد سنوياً',
        description: 'الرصيد ينتهي بعد 12 شهراً - أعد التحقق كل سنة.'
      }
    ],
    upvotes: 31,
    bookmarks: 42,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o12',
    slug: 'cloudflare-for-students',
    name: 'Cloudflare for Students',
    tagline: '12 months of Cloudflare Pro free - Workers, R2, Pages, Zero Trust',
    description:
      'Cloudflare gives verified students a free year of Pro plan perks: unlimited Workers requests, R2 storage, Pages builds, Stream, and Zero Trust seat. Verifies via UNiDAYS or student email. Non-students can get it by enrolling in a community college to get a UNiDAYS-eligible .edu, then verify via UNiDAYS with enrollment proof.',
    url: 'https://www.cloudflare.com/students/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/cloudflare.com.ico',
    category: 'api-access',
    tags: ['cloudflare', 'cdn', 'workers', 'students', 'hosting'],
    pricing: 'free',
    steps: [
      {
        title: 'Open the student page',
        description:
          'Visit cloudflare.com/students → “Verify with UNiDAYS”. UNiDAYS is the official verifier for Cloudflare.',
        url: 'https://www.cloudflare.com/students/',
      },
      {
        title: 'Create UNiDAYS and get verified',
        description:
          'STUDENT: Sign up at myunidays.com with .edu email or search your school and upload ID/enrollment letter - instant if email matches. NON-STUDENT: Enroll in a CC to get a .edu accepted by UNiDAYS (most US CCs are listed) + upload your student ID. UNiDAYS approves in minutes.',
      },
      {
        title: 'Claim Cloudflare promo',
        description:
          'After UNiDAYS approves, you are redirected back to Cloudflare with a promo code. In Cloudflare dashboard → Billing → Apply code. Pro features auto-enable on one zone.',
      },
      {
        title: 'Enable Workers, R2, Pages',
        description:
          'Go to dash.cloudflare.com → Workers & Pages → Create Worker. R2 → Create bucket (10GB free + student boost). Pages → Connect GitHub. No card needed for the student tier.',
      },
      {
        title: 'Renew next year',
        description:
          'Benefit is 12 months. Keep your CC enrollment active and re-verify via UNiDAYS before expiry to extend.',
      },
    ],
    nameAr: 'Cloudflare للطلاب',
    taglineAr: '12 شهر من Cloudflare Pro مجاناً - Workers و R2 و Pages',
    descriptionAr: 'Cloudflare يمنح الطلاب سنة مجانية من مزايا Pro: طلبات Workers غير محدودة، تخزين R2، بناء Pages، وقناة Zero Trust. يتحقق عبر UNiDAYS.',
    stepsAr: [
      {
        title: 'افتح صفحة الطلاب',
        description: 'اذهب إلى cloudflare.com/students → "Verify with UNiDAYS".',
        url: 'https://www.cloudflare.com/students/'
      },
      {
        title: 'أنشئ UNiDAYS وتحقق',
        description: 'طالب: سجّل بـ .edu → فوري. غير طالب: سجّل في CC للحصول على .edu مقبول في UNiDAYS وارفعه.'
      },
      {
        title: 'اطلب عرض Cloudflare',
        description: 'بعد موافقة UNiDAYS ستُعاد إلى Cloudflare برمز ترويجي - طبّقه في الفوترة.'
      },
      {
        title: 'فعّل Workers و R2 و Pages',
        description: 'في لوحة التحكم → Workers & Pages → أنشئ Worker و R2 bucket.'
      },
      {
        title: 'جدّد السنة القادمة',
        description: 'المزايا 12 شهراً - أعد التحقق عبر UNiDAYS قبل الانتهاء.'
      }
    ],
    upvotes: 22,
    bookmarks: 28,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o13',
    slug: 'shodan-academic',
    name: 'Shodan Academic',
    tagline: 'Free Shodan membership upgrade for researchers & students with .edu',
    description:
      'Shodan grants a free ongoing membership upgrade to students/researchers who register with a .edu/.ac address: unlimited search results, API credits, and history. Manual upgrade via support email. Works with any academic email from edumailshop/normal college. Non-students can obtain it by creating a US CC .edu mailbox.',
    url: 'https://help.shodan.io/the-basics/academic-upgrade',
    logoUrl: 'https://www.google.com/s2/favicons?domain=shodan.io&sz=64',
    category: 'api-access',
    tags: ['shodan', 'security', 'iot', 'academic', 'osint'],
    pricing: 'free',
    steps: [
      {
        title: 'Create a Shodan account with .edu',
        description:
          'STUDENT: Register at account.shodan.io with your .edu/.ac email. NON-STUDENT: Get a CC .edu (e.g., via enrollment or mailbox service) and register with that address. Free accounts work, but .edu unlocks the upgrade.',
        url: 'https://account.shodan.io/register',
      },
      {
        title: 'Email support for academic upgrade',
        description:
          'Send an email to support@shodan.io from your .edu address: subject “Academic Upgrade - your_username”, include your Shodan username and proof of enrollment if your email domain is new. Response in 1-2 days.',
      },
      {
        title: 'Verify and use upgraded quotas',
        description:
          'Once upgraded, your dashboard shows higher API query credits and export limits. Use via shodan search CLI or API at developer.shodan.io. Keep the .edu mailbox active for re-checks.',
      },
    ],
    nameAr: 'Shodan الأكاديمي',
    taglineAr: 'ترقية عضوية Shodan مجانية للباحثين والطلاب ببريد .edu',
    descriptionAr: 'يمنح Shodan ترقية مجانية مستمرة للطلاب/الباحثين المسجلين ببريد .edu/.ac: نتائج غير محدودة ورصيد API. تتم عبر مراسلة الدعم.',
    stepsAr: [
      {
        title: 'أنشئ حساب Shodan ببريد .edu',
        description: 'طالب: سجّل في account.shodan.io ببريد .edu. غير طالب: احصل على بريد CC وسجّل به.',
        url: 'https://account.shodan.io/register'
      },
      {
        title: 'راسل الدعم للترقية',
        description: 'أرسل بريداً إلى support@shodan.io من بريدك .edu بعنوان "Academic Upgrade".'
      },
      {
        title: 'تحقق واستخدم الحصة المرقّاة',
        description: 'بعد الترقية، ستظهر الحصة الأعلى في لوحتك.'
      }
    ],
    upvotes: 18,
    bookmarks: 24,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o14',
    slug: 'hyperbolic-ai-student',
    name: 'Hyperbolic AI',
    tagline: '$15 free inference + GPU credits with .edu - DeepSeek R1, Qwen, Llama API',
    description:
      'Hyperbolic offers $15 in inference credits and discounted GPU rentals for students who verify with .edu. Gives OpenAI-compatible API access to DeepSeek-R1, Qwen, Llama. Low barrier: any .edu works via email verification.',
    url: 'https://app.hyperbolic.ai/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/hyperbolic.ai.ico',
    category: 'api-access',
    tags: ['hyperbolic', 'api', 'gpu', 'deepseek', 'inference'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Sign up with .edu',
        description:
          'Visit app.hyperbolic.ai → Sign up with your .edu email (student or CC .edu). Verify via email link. NON-STUDENT: Use a CC .edu mailbox - verification is email-only, no file check.',
        url: 'https://app.hyperbolic.ai/',
      },
      {
        title: 'Claim student credits',
        description:
          'Go to Billing → Apply promo “STUDENT15” or contact support via Discord #student-verification with your .edu. Credits auto-apply and show in balance.',
      },
      {
        title: 'Call the OpenAI-compatible endpoint',
        description:
          'Use https://api.hyperbolic.ai/v1 with your API key, model “deepseek-ai/DeepSeek-R1”. Drop-in for any OpenAI SDK - just swap base URL and key.',
      },
    ],
    nameAr: 'Hyperbolic AI',
    taglineAr: 'رصيد 15$ مجاناً + GPU ببريد .edu - DeepSeek R1 و Qwen',
    descriptionAr: 'يقدّم Hyperbolic رصيد 15$ وGPU مخفّض للطلاب ببريد .edu عبر واجهة OpenAI متوافقة لـ DeepSeek-R1 و Qwen و Llama.',
    stepsAr: [
      {
        title: 'سجّل ببريد .edu',
        description: 'اذهب إلى app.hyperbolic.ai وسجّل ببريد .edu (CC يعمل).',
        url: 'https://app.hyperbolic.ai/'
      },
      {
        title: 'اطلب رصيد الطلاب',
        description: 'في الفوترة طبّق "STUDENT15" أو راسل الدعم في Discord.'
      },
      {
        title: 'استدعِ النقطة المتوافقة',
        description: 'استخدم https://api.hyperbolic.ai/v1 بمفتاحك ونموذج deepseek-ai/DeepSeek-R1.'
      }
    ],
    upvotes: 14,
    bookmarks: 18,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o15',
    slug: 'chatgpt-plus-student',
    name: 'ChatGPT Plus for Students',
    tagline: 'Free ChatGPT Plus ( $20/mo ) for verified students - GPT-4o with higher limits',
    description:
      'OpenAI offers ChatGPT Plus free for students via SheerID/UNiDAYS in supported countries (US, UK, CA etc.). Includes GPT-4o, higher message limits, file uploads, and Code Interpreter. Outside eligible countries, use a US CC enrollment to get US SheerID verification. Regularly extended, redeem before expiry shown on page.',
    url: 'https://chatgpt.com/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/chatgpt.com.ico',
    category: 'api-access',
    tags: ['openai', 'chatgpt', 'students', 'plus', 'gpt-4'],
    pricing: 'free',
    steps: [
      {
        title: 'Open the student page',
        description:
          'Go to chatgpt.com/students or chatgpt.com/use-cases/students → “Claim Student Offer”. You will be sent to SheerID.',
        url: 'https://chatgpt.com/students',
      },
      {
        title: 'Verify - student vs non-student',
        description:
          'STUDENT: Enter school name + .edu email - SheerID auto-verifies. NON-STUDENT: Enroll in a US CC (accredited) to get a .edu + enrollment letter → upload letter + ID when SheerID asks for “upload document”. US address required - use campus or forwarder if asked.',
      },
      {
        title: 'Redeem Plus',
        description:
          'After approval, click “Redeem” → your ChatGPT account upgrades to Plus. Check Settings → Subscription shows “Student - free until [date]”. Cancel auto-renew if you will not stay enrolled.',
      },
      {
        title: 'Use until renewal required',
        description:
          'Offer is typically 6-12 months. Requires re-verification after expiry. If you graduate or drop, Plus reverts to Free but you keep chat history.',
      },
    ],
    nameAr: 'ChatGPT Plus للطلاب',
    taglineAr: 'ChatGPT Plus مجاناً للطلاب - GPT-4o بحدود أعلى',
    descriptionAr: 'يقدّم OpenAI Plus مجاناً للطلاب عبر SheerID/UNiDAYS في دول مدعومة: GPT-4o، حدود أعلى، رفع ملفات، وأداة كود. غير الطلاب يمكنهم التسجيل في CC أمريكية للحصول على تحقق SheerID أمريكي.',
    stepsAr: [
      {
        title: 'افتح صفحة الطلاب',
        description: 'اذهب إلى chatgpt.com/students → "Claim Student Offer" → SheerID.',
        url: 'https://chatgpt.com/students'
      },
      {
        title: 'تحقق - طالب أو غير طالب',
        description: 'طالب: أدخل .edu → فوري. غير طالب: سجّل في CC أمريكية واحصل على .edu وخطاب وارفعه في SheerID.'
      },
      {
        title: 'استرد Plus',
        description: 'بعد الموافقة اضغط "Redeem" → يتحول حسابك إلى Plus.'
      },
      {
        title: 'استخدم حتى التجديد',
        description: 'العرض 6-12 شهراً ويتطلب إعادة تحقق.'
      }
    ],
    upvotes: 41,
    bookmarks: 53,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o16',
    slug: 'cursor-pro-student',
    name: 'Cursor Pro for Students',
    tagline: '1 year Cursor Pro free - AI code editor with agent mode',
    description:
      'Cursor gives students 1 year of Pro free: unlimited completions, agent mode, codebase-aware chat, and Max models. Verifies via SheerID with .edu or file. Non-students can qualify with a CC .edu + enrollment proof - Cursor’s SheerID accepts file upload, no .edu email strictly required.',
    url: 'https://cursor.com/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/cursor.com.ico',
    category: 'tool',
    tags: ['cursor', 'ide', 'ai-editor', 'students', 'autocompletion'],
    pricing: 'free',
    steps: [
      {
        title: 'Go to Cursor Students',
        description:
          'Visit cursor.com/students → “Verify student status”.',
        url: 'https://cursor.com/students',
      },
      {
        title: 'Verify via SheerID',
        description:
          'STUDENT: Enter .edu → instant. File fallback: upload student ID + enrollment letter (name + school + date). NON-STUDENT: Enroll in CC → get ID + letter → upload. Cursor accepts most accredited schools worldwide, not only US.',
      },
      {
        title: 'Sync Pro to your account',
        description:
          'After approval, sign in to Cursor with the same email → Settings → Subscription shows Pro. Restart Cursor to enable agent mode and higher limits.',
      },
      {
        title: 'Renew annually',
        description:
          'Valid 12 months, renewable while enrolled. Keep proof for next year.',
      },
    ],
    nameAr: 'Cursor Pro للطلاب',
    taglineAr: 'سنة Cursor Pro مجاناً - محرر AI مع وضع الوكيل',
    descriptionAr: 'يمنح Cursor الطلاب سنة Pro مجاناً: إكمال غير محدود، وضع الوكيل، دردشة تفهم قاعدة الكود. يتحقق عبر SheerID.',
    stepsAr: [
      {
        title: 'اذهب إلى Cursor للطلاب',
        description: 'اذهب إلى cursor.com/students → "Verify student status".',
        url: 'https://cursor.com/students'
      },
      {
        title: 'تحقق عبر SheerID',
        description: 'طالب: .edu → فوري. غير طالب: سجّل في CC وارفعه خطاباً وبطاقة - يقبل معظم المدارس.'
      },
      {
        title: 'زامن Pro مع حسابك',
        description: 'بعد الموافقة، سجّل دخولك في Cursor بنفس البريد → يظهر Pro.'
      },
      {
        title: 'جدّد سنوياً',
        description: 'صالح 12 شهراً قابل للتجديد أثناء الدراسة.'
      }
    ],
    upvotes: 38,
    bookmarks: 45,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o17',
    slug: 'perplexity-pro-student',
    name: 'Perplexity Pro for Students',
    tagline: '1 year Perplexity Pro free - 300+ Pro searches/day + file upload',
    description:
      'Perplexity gives verified students 1 year of Pro free (normally $20/mo): 300+ Pro searches/day, file upload, image generation, and API. Verifies via SheerID/ .edu. Non-students can get it with a CC .edu + SheerID file upload - widely approved.',
    url: 'https://www.perplexity.ai/education',
    logoUrl: 'https://icons.duckduckgo.com/ip3/perplexity.ai.ico',
    category: 'api-access',
    tags: ['perplexity', 'search', 'pro', 'students', 'research'],
    pricing: 'free',
    steps: [
      {
        title: 'Open education page',
        description:
          'Visit perplexity.ai → footer “Students” or perplexity.ai/education → “Claim Pro”.',
        url: 'https://www.perplexity.ai/education',
      },
      {
        title: 'Verify student status',
        description:
          'STUDENT: .edu email → auto. NON-STUDENT: CC enrollment letter + ID upload via SheerID. Perplexity’s SheerID flow allows manual review if domain not found - upload a PDF transcript with current term.',
      },
      {
        title: 'Activate Pro',
        description:
          'Once approved, your account flips to Pro. Verify at Settings → Subscription → “Pro - Student”. Use web or API at perplexity.ai/settings/api.',
      },
    ],
    nameAr: 'Perplexity Pro للطلاب',
    taglineAr: 'سنة Perplexity Pro مجاناً - 300+ بحث Pro يومياً',
    descriptionAr: 'يمنح Perplexity الطلاب سنة Pro مجاناً: 300+ بحث Pro، رفع ملفات، وتوليد صور و API. يتحقق عبر SheerID.',
    stepsAr: [
      {
        title: 'افتح صفحة التعليم',
        description: 'اذهب إلى perplexity.ai/education → "Claim Pro".',
        url: 'https://www.perplexity.ai/education'
      },
      {
        title: 'تحقق',
        description: 'طالب: .edu → تلقائي. غير طالب: ارفع خطاباً وبطاقة عبر SheerID - يسمح بالمراجعة اليدوية.'
      },
      {
        title: 'فعّل Pro',
        description: 'بعد الموافقة، يتحول حسابك إلى Pro.'
      }
    ],
    upvotes: 27,
    bookmarks: 31,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o18',
    slug: 'v0-by-vercel-student',
    name: 'V0 by Vercel for Students',
    tagline: 'Premium V0 AI credits free for students - text-to-React in seconds',
    description:
      'Vercel gives students free V0 credits: generate production-ready React + Tailwind + shadcn components from text or image, iterate with chat, export code. Verifies with .edu or GitHub Student. Non-students can use GitHub Student Pack approval (file) to claim without .edu.',
    url: 'https://v0.app/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/v0.app.ico',
    category: 'tool',
    tags: ['v0', 'vercel', 'react', 'ui-gen', 'students'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign in to V0',
        description:
          'Go to v0.app/students → Sign in with Vercel/GitHub account.',
        url: 'https://v0.app/students',
      },
      {
        title: 'Verify',
        description:
          'STUDENT: .edu email auto-verifies. NON-STUDENT: Click “Verify with GitHub Student Pack” if approved, or upload enrollment letter - V0 accepts either.',
      },
      {
        title: 'Generate UI',
        description:
          'Your account gets premium credits monthly. Type a prompt → V0 builds component → Copy code or deploy to Vercel in one click.',
      },
    ],
    nameAr: 'V0 من Vercel للطلاب',
    taglineAr: 'رصيد V0 مجاناً للطلاب - حوّل النص إلى React',
    descriptionAr: 'يمنح Vercel الطلاب رصيداً مجانياً: ولّد مكونات React + Tailwind + shadcn من نص أو صورة وصدّر الكود. يتحقق عبر .edu أو GitHub Student.',
    stepsAr: [
      {
        title: 'سجّل في V0',
        description: 'اذهب إلى v0.app/students وسجّل بحساب Vercel/GitHub.',
        url: 'https://v0.app/students'
      },
      {
        title: 'تحقق',
        description: 'طالب: .edu → تلقائي. غير طالب: اربط GitHub Student أو ارفع خطاباً.'
      },
      {
        title: 'ولّد واجهة',
        description: 'اكتب وصفاً → يبني V0 المكوّن → انسخ الكود أو انشره في Vercel.'
      }
    ],
    upvotes: 19,
    bookmarks: 22,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o19',
    slug: 'kiro-dev-student',
    name: 'Kiro.dev Student Program',
    tagline: 'Free Kiro AI IDE for students - agentic coding with file proof accepted',
    description:
      'Kiro.dev (agentic IDE) offers free Pro access for students: agent coding, codebase chat, and Claude/GPT routing. Requires school email + file proof for some schools. Accepts US CC enrollments - ideal for non-students using file verification path.',
    url: 'https://kiro.dev/students/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/kiro.dev.ico',
    category: 'tool',
    tags: ['kiro', 'ide', 'agent', 'students', 'coding'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply at Kiro Students',
        description:
          'Visit kiro.dev/students → “Apply”.',
        url: 'https://kiro.dev/students/',
      },
      {
        title: 'Provide proof',
        description:
          'STUDENT: .edu + student ID. NON-STUDENT: Enroll in CC → upload enrollment letter + ID (must show full name + school + current date). Kiro uses manual review - photo of physical ID accepted if PDF unclear.',
      },
      {
        title: 'Activate license',
        description:
          'After approval (email in 1-3 days), sign in to Kiro IDE with same email → License auto-applies. Check Settings → About → “Student”.',
      },
    ],
    nameAr: 'Kiro.dev للطلاب',
    taglineAr: 'Kiro IDE مجاناً للطلاب - تحقق عبر ملف مقبول',
    descriptionAr: 'يمنح Kiro.dev الطلاب وصول Pro مجاناً: برمجة وكيلية ودردشة قاعدة كود وتوجيه نماذج. يقبل تسجيل CC عبر ملف.',
    stepsAr: [
      {
        title: 'قدّم في Kiro للطلاب',
        description: 'اذهب إلى kiro.dev/students → "Apply".',
        url: 'https://kiro.dev/students/'
      },
      {
        title: 'قدّم الإثبات',
        description: 'طالب: .edu وبطاقة. غير طالب: سجّل في CC وارفعه خطاباً وبطاقة (الاسم والمدرسة والتاريخ).'
      },
      {
        title: 'فعّل الترخيص',
        description: 'بعد الموافقة خلال 1-3 أيام، سجّل دخولك في Kiro بنفس البريد.'
      }
    ],
    upvotes: 12,
    bookmarks: 15,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o20',
    slug: 'dify-ai-education',
    name: 'Dify.AI Education',
    tagline: 'Professional plan free 1 year - LLM app & agent builder',
    description:
      'Dify gives verified students 1 year of Professional free: build and deploy LLM apps/agents with datasets, tools, and hosting. Verifies with .edu email. Non-students can get it with any CC .edu mailbox (email-only verification).',
    url: 'https://dify.ai/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=dify.ai&sz=64',
    category: 'api-access',
    tags: ['dify', 'llm', 'agent', 'students', 'no-code'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign up with .edu',
        description:
          'Register at cloud.dify.ai with .edu email. Verify via email link. NON-STUDENT: Use CC .edu mailbox - Dify only checks email domain, no file needed.',
        url: 'https://dify.ai/',
      },
      {
        title: 'Apply for Education plan',
        description:
          'In Dify dashboard → Settings → Education → “Apply” → confirm enrollment. Support auto-approves .edu domains within hours.',
      },
      {
        title: 'Build apps',
        description:
          'Create an AI app → Add models (OpenAI/Gemini) → Publish. Pro limits: higher docs, workflows, and seats.',
      },
    ],
    nameAr: 'Dify.AI للتعليم',
    taglineAr: 'خطة Professional مجاناً لسنة - بناء تطبيقات LLM',
    descriptionAr: 'يمنح Dify الطلاب سنة Professional مجاناً: بناء ونشر تطبيقات LLM مع قواعد بيانات وأدوات. يتحقق ببريد .edu فقط.',
    stepsAr: [
      {
        title: 'سجّل ببريد .edu',
        description: 'سجّل في cloud.dify.ai ببريد .edu (CC يعمل لغير الطلاب).',
        url: 'https://dify.ai/'
      },
      {
        title: 'اطلب خطة التعليم',
        description: 'في الإعدادات → التعليم → "Apply" → يوافق تلقائياً للنطاقات .edu.'
      },
      {
        title: 'ابنِ التطبيقات',
        description: 'أنشئ تطبيق AI → أضف النماذج → انشر. حدود Pro أعلى.'
      }
    ],
    upvotes: 16,
    bookmarks: 19,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o21',
    slug: 'firecrawl-student',
    name: 'Firecrawl Student Program',
    tagline: 'Free Firecrawl credits for students - scrape & crawl API for LLM apps',
    description:
      'Firecrawl (YC-backed scraping API) gives students free credits: turn any URL into clean markdown/JSON for RAG. Perfect for agent builders. Verifies with .edu email.',
    url: 'https://www.firecrawl.dev/student-program',
    logoUrl: 'https://icons.duckduckgo.com/ip3/firecrawl.dev.ico',
    category: 'api-access',
    tags: ['firecrawl', 'scraping', 'api', 'rag', 'students'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign up with .edu',
        description:
          'Go to firecrawl.dev/student-program → Sign up with .edu email. NON-STUDENT: CC .edu works - email-only check.',
        url: 'https://www.firecrawl.dev/student-program',
      },
      {
        title: 'Get API key',
        description:
          'After verification, dashboard → API Keys → Copy key. Test with curl /v1/scrape.',
      },
      {
        title: 'Build with free credits',
        description:
          'Free tier includes 100k tokens/month while student status active. Upgrade automatically when needed.',
      },
    ],
    nameAr: 'Firecrawl للطلاب',
    taglineAr: 'رصيد Firecrawl مجاناً - واجهة كشط للـ LLM',
    descriptionAr: 'يمنح Firecrawl الطلاب رصيداً مجانياً: حوّل أي رابط إلى markdown/JSON نظيف لـ RAG. مثالي لبناء الوكلاء. يتحقق ببريد .edu.',
    stepsAr: [
      {
        title: 'سجّل ببريد .edu',
        description: 'اذهب إلى firecrawl.dev/student-program وسجّل ببريد .edu (CC يعمل).',
        url: 'https://www.firecrawl.dev/student-program'
      },
      {
        title: 'احصل على مفتاح API',
        description: 'بعد التحقق، لوحة التحكم → API Keys → انسخ المفتاح.'
      },
      {
        title: 'ابنِ بالرصيد المجاني',
        description: 'الخطة المجانية 100k رمز/شهر أثناء حالة الطالب.'
      }
    ],
    upvotes: 13,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o22',
    slug: 'windsurf-student',
    name: 'Windsurf Student',
    tagline: 'Free Windsurf Pro (Codeium) - agentic AI editor with Cascade',
    description:
      'Windsurf by Codeium gives students free Pro: Cascade agent, autocomplete, and codebase understanding. Verify with .edu or GitHub Student. Non-students can use GitHub Pack approval to claim.',
    url: 'https://windsurf.com/editor',
    logoUrl: 'https://icons.duckduckgo.com/ip3/windsurf.com.ico',
    category: 'tool',
    tags: ['windsurf', 'codeium', 'editor', 'students', 'agent'],
    pricing: 'free',
    steps: [
      {
        title: 'Download Windsurf',
        description:
          'Visit windsurf.com/editor → Download.',
        url: 'https://windsurf.com/editor',
      },
      {
        title: 'Verify student status',
        description:
          'In app → Settings → Student → Verify with .edu or “Use GitHub Student”. NON-STUDENT: Approve GitHub Pack first (file), then link here.',
      },
      {
        title: 'Activate Pro',
        description:
          'Pro enables instantly. Check status in Account → Pro. Renewable while enrolled.',
      },
    ],
    nameAr: 'Windsurf للطلاب',
    taglineAr: 'Windsurf Pro مجاناً (Codeium) - محرر وكيلي',
    descriptionAr: 'يمنح Windsurf الطلاب Pro مجاناً: وكيل Cascade وإكمال وتفهم قاعدة الكود. يتحقق عبر .edu أو GitHub Student.',
    stepsAr: [
      {
        title: 'حمّل Windsurf',
        description: 'اذهب إلى windsurf.com/editor → حمّل.',
        url: 'https://windsurf.com/editor'
      },
      {
        title: 'تحقق',
        description: 'في التطبيق → الإعدادات → طالب → تحقق بـ .edu أو GitHub Student.'
      },
      {
        title: 'فعّل Pro',
        description: 'يتفعل Pro فوراً. تحقق في الحساب → Pro. قابل للتجديد.'
      }
    ],
    upvotes: 17,
    bookmarks: 20,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o23',
    slug: 'jetbrains-student-pack',
    name: 'JetBrains Student Pack',
    tagline: 'All JetBrains IDEs free 1 year, renewable - IntelliJ, PyCharm, WebStorm, Rider',
    description:
      'JetBrains gives students free access to all 15+ IDEs (IntelliJ IDEA Ultimate, PyCharm Pro, WebStorm, Rider, GoLand, etc.) for 1 year, renewable. Verifies via .edu or file (ID + enrollment). Non-students can qualify with CC enrollment - JetBrains accepts enrollment letter + ID without strict .edu domain check.',
    url: 'https://www.jetbrains.com/shop/eform/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/jetbrains.com.ico',
    category: 'tool',
    tags: ['jetbrains', 'ide', 'intellij', 'pycharm', 'students'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply at JetBrains',
        description:
          'Go to jetbrains.com/shop/eform/students → “Apply”.',
        url: 'https://www.jetbrains.com/shop/eform/students',
      },
      {
        title: 'Prove enrollment - two options',
        description:
          'OPTION 1: Official university email (.edu) → instant. OPTION 2: “Official document” → upload student ID + enrollment letter/transcript showing name + school + current date. NON-STUDENT: Enroll in CC for 1 course → get ID + transcript PDF → upload via Option 2. Most CCs approved in hours.',
      },
      {
        title: 'Activate license in Toolbox',
        description:
          'After approval, you get a JetBrains Account email. Install Toolbox App → Log in → All IDEs show “Licensed”. License auto-renews annually while you re-upload proof.',
      },
      {
        title: 'Renew before expiry',
        description:
          'License is 12 months. 2 weeks before expiry JetBrains emails - just re-upload fresh enrollment proof to renew.',
      },
    ],
    nameAr: 'حزمة JetBrains للطلاب',
    taglineAr: 'جميع IDEs من JetBrains مجاناً لمدة سنة قابلة للتجديد - IntelliJ و PyCharm و WebStorm و Rider',
    descriptionAr: 'تمنح JetBrains الطلاب وصولاً مجانياً لكل IDEs الـ 15+ (IntelliJ Ultimate، PyCharm Pro، WebStorm، Rider، GoLand...) لسنة قابلة للتجديد. تحقق عبر .edu أو ملف (بطاقة + خطاب تسجيل). غير الطلاب يمكنهم التسجيل في كلية مجتمع - تقبل JetBrains خطاب التسجيل + البطاقة دون تدقيق صارم للنطاق.',
    stepsAr: [
      {
        title: 'قدّم في JetBrains',
        description: 'اذهب إلى jetbrains.com/shop/eform/students → "Apply".',
        url: 'https://www.jetbrains.com/shop/eform/students',
      },
      {
        title: 'أثبت التسجيل - خياران',
        description: 'الخيار 1: بريد جامعي .edu → فوري. الخيار 2: "Official document" → ارفع بطاقة الطالب + خطاب/كشف تسجيل باسمك والمدرسة والتاريخ. غير طالب: سجّل في CC لمقرر واحد → احصل على البطاقة والكشف وارفعه عبر الخيار 2.',
      },
      {
        title: 'فعّل الترخيص في Toolbox',
        description: 'بعد الموافقة، تصلك رسالة حساب JetBrains. ثبّت Toolbox App → سجّل دخولك → ستظهر كل IDEs "Licensed".',
      },
      {
        title: 'جدّد قبل الانتهاء',
        description: 'الترخيص 12 شهراً. قبل أسبوعين ترسل JetBrains تنبيهاً - فقط أعد رفع إثبات جديد للتجديد.',
      },
    ],
    upvotes: 52,
    bookmarks: 58,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o24',
    slug: 'figma-education',
    name: 'Figma Education',
    tagline: 'Free Figma Organization for students - Figma + FigJam + 3 editors',
    description:
      'Figma Education gives verified students free Organization plan: Figma Design, FigJam, Dev Mode, and team libraries. Verifies via school email or manual doc. Non-students can qualify with CC enrollment + file proof - Figma manually reviews ID + schedule.',
    url: 'https://www.figma.com/education/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/figma.com.ico',
    category: 'tool',
    tags: ['figma', 'design', 'ui-ux', 'students', 'figjam'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply with Figma',
        description:
          'Visit figma.com/education → “Apply for Education Status”. Sign in with Figma account.',
        url: 'https://www.figma.com/education/',
      },
      {
        title: 'Verify',
        description:
          'STUDENT: Enter school name + .edu email → auto. NON-STUDENT: Choose “No school email” → upload student ID + enrollment proof (schedule with dates). Figma supports 2000+ schools including CCs.',
      },
      {
        title: 'Create Education team',
        description:
          'Once approved (1-3 days), Figma asks to create an Education team - do it. Your personal team converts to Organization with 3 free editors and unlimited files. Invite classmates.',
      },
      {
        title: 'Renew while enrolled',
        description:
          'Status is 1-2 years. Re-verify when you change schools or graduate.',
      },
    ],
    nameAr: 'Figma للتعليم',
    taglineAr: 'مؤسسة Figma مجاناً للطلاب - Figma + FigJam و 3 محررين',
    descriptionAr: 'تمنح Figma الطلاب خطة مؤسسة مجانية: Figma Design و FigJam و Dev Mode ومكتبات الفريق. تحقق عبر بريد أو ملف. غير الطلاب يمكنهم التسجيل في CC ورفع الملفات.',
    stepsAr: [
      {
        title: 'قدّم في Figma',
        description: 'اذهب إلى figma.com/education → "Apply for Education Status".',
        url: 'https://www.figma.com/education/'
      },
      {
        title: 'تحقق',
        description: 'طالب: أدخل .edu → تلقائي. غير طالب: اختر "No school email" وارفعه بطاقة وخطاب.'
      },
      {
        title: 'أنشئ فريق التعليم',
        description: 'بعد الموافقة خلال 1-3 أيام، أنشئ فريق التعليم - يتحول إلى مؤسسة مع 3 محررين وملفات غير محدودة.'
      },
      {
        title: 'جدّد أثناء الدراسة',
        description: 'الحالة 1-2 سنة - أعد التحقق عند تغيير المدرسة.'
      }
    ],
    upvotes: 44,
    bookmarks: 51,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o25',
    slug: 'notion-education-plus',
    name: 'Notion Education Plus',
    tagline: 'Free Notion Plus + AI for students - unlimited blocks, uploads, AI',
    description:
      'Notion gives students free Plus plan: unlimited blocks/file uploads, 100GB+ history, and free Notion AI (normally $8/mo). Verifies via .edu email instantly. Non-students can get it with any .edu mailbox (email-only). Team members with .edu also get free Plus when added to your workspace.',
    url: 'https://www.notion.com/product/notion-for-education',
    logoUrl: 'https://icons.duckduckgo.com/ip3/notion.com.ico',
    category: 'tool',
    tags: ['notion', 'productivity', 'education', 'ai', 'workspace'],
    pricing: 'free',
    steps: [
      {
        title: 'Create Notion account with .edu',
        description:
          'Sign up at notion.so with your .edu email (or change email in Settings → My Account → Email). NON-STUDENT: Create a CC .edu mailbox and use that as your Notion email - email check only.',
        url: 'https://www.notion.com/product/notion-for-education',
      },
      {
        title: 'Claim Education plan',
        description:
          'Go to Notion Settings → Upgrade → Education → “Get free Education plan”. Notion auto-detects .edu domain and upgrades instantly to Plus. No file upload needed.',
      },
      {
        title: 'Enable Notion AI free',
        description:
          'In same Education page, toggle “Notion AI” free. Works while your Plus is active. Invite friends with .edu to give them Plus too.',
      },
    ],
    nameAr: 'نوشن للطلاب Plus',
    taglineAr: 'نوشن Plus + الذكاء الاصطناعي مجاناً للطلاب - بلوكات وتحميلات غير محدودة',
    descriptionAr: 'يمنح نوشن الطلاب خطة Plus مجاناً: بلوكات وتحميلات ملفات غير محدودة، سجل 100GB+، و Notion AI مجاناً (عادة 8$ شهرياً). يتحقق فوراً عبر بريد .edu. غير الطلاب يمكنهم الحصول عليه بأي بريد .edu لكلية مجتمع (تحقق بالبريد فقط).',
    stepsAr: [
      {
        title: 'أنشئ حساب نوشن ببريد .edu',
        description: 'سجّل في notion.so ببريدك .edu (أو غيّر البريد في الإعدادات). غير طالب: أنشئ بريد .edu من كلية مجتمع واستخدمه - التحقق بالبريد فقط.',
        url: 'https://www.notion.com/product/notion-for-education',
      },
      {
        title: 'اطلب خطة التعليم',
        description: 'اذهب إلى الإعدادات → الترقية → التعليم → "احصل على خطة التعليم مجاناً". يكتشف نوشن نطاق .edu ويرقيك فوراً إلى Plus.',
      },
      {
        title: 'فعّل Notion AI مجاناً',
        description: 'في نفس صفحة التعليم، فعّل Notion AI مجاناً. يعمل طالما Plus نشط. ادعُ أصدقاء ببريد .edu ليحصلوا على Plus أيضاً.',
      },
    ],
    upvotes: 39,
    bookmarks: 46,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o26',
    slug: 'canva-education-pro',
    name: 'Canva Pro Education',
    tagline: 'Free Canva Pro for students - 140M templates, Magic AI, Brand Kit',
    description:
      'Canva gives verified students free Pro: 140M+ templates, Magic Write/Resize, 1TB storage, and team Brand Kit. Verifies via Canva Education portal with school name + ID. Non-students can qualify with CC ID + enrollment screenshot - manual review approves most.',
    url: 'https://www.canva.com/education/students/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/canva.com.ico',
    category: 'tool',
    tags: ['canva', 'design', 'templates', 'students', 'ai'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply via Canva Education',
        description:
          'Visit canva.com/education/students → “Claim verification”. Sign in with Canva.',
        url: 'https://www.canva.com/education/students/',
      },
      {
        title: 'Verify',
        description:
          'STUDENT: Search school → verify with .edu or upload ID + enrollment letter. NON-STUDENT: CC enrollment + student ID photo (show name + school + term) → manual approval in 1-2 days.',
      },
      {
        title: 'Activate Pro',
        description:
          'After approval, Canva adds “Education Pro” to your account. Check Billing → “Education - Free”. Create designs with Pro unlocked and invite 2 classmates to share.',
      },
    ],
    nameAr: 'Canva Pro للتعليم',
    taglineAr: 'Canva Pro مجاناً للطلاب - 140M قالب و Magic AI',
    descriptionAr: 'تمنح Canva الطلاب Pro مجاناً: 140M+ قالب، Magic Write/Resize، 1TB و Brand Kit. تحقق عبر بوابة التعليم.',
    stepsAr: [
      {
        title: 'قدّم عبر Canva للتعليم',
        description: 'اذهب إلى canva.com/education/students → "Claim verification".',
        url: 'https://www.canva.com/education/students/'
      },
      {
        title: 'تحقق',
        description: 'طالب: ابحث عن مدرستك → تحقق بـ .edu أو ارفع بطاقة وخطاب. غير طالب: ارفع بطاقة CC + لقطة تسجيل → موافقة خلال يومين.'
      },
      {
        title: 'فعّل Pro',
        description: 'بعد الموافقة، يضاف "Education Pro" لحسابك. تحقق في الفوترة → Education Free.'
      }
    ],
    upvotes: 28,
    bookmarks: 33,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o27',
    slug: 'autodesk-education',
    name: 'Autodesk Education',
    tagline: 'Full Autodesk suite free 1 year - AutoCAD, Maya, Revit, Fusion 360',
    description:
      'Autodesk gives students free 1-year license to 20+ products: AutoCAD, Maya, 3ds Max, Revit, Inventor, Fusion 360. Verifies via SheerID with .edu or file. Non-students can enroll in CC drafting/design course to get enrollment proof - SheerID accepts file upload, not only email.',
    url: 'https://www.autodesk.com/education/edu-software/overview',
    logoUrl: 'https://icons.duckduckgo.com/ip3/autodesk.com.ico',
    category: 'tool',
    tags: ['autodesk', 'autocad', 'maya', 'revit', 'students', 'cad'],
    pricing: 'free',
    steps: [
      {
        title: 'Create Autodesk Education account',
        description:
          'Go to autodesk.com/education/edu-software/overview → “Get product”. Create account.',
        url: 'https://www.autodesk.com/education/edu-software/overview',
      },
      {
        title: 'Verify with SheerID',
        description:
          'Click “Verify” → SheerID. STUDENT: .edu auto. NON-STUDENT: “Upload document” → student ID + enrollment letter (must list school + full name + current date). CC enrollments pass if accredited.',
      },
      {
        title: 'Download and activate',
        description:
          'After verification, choose product → Download → Install → Sign in with same email. License auto-activates for 12 months. Use Autodesk Access app to manage installs.',
      },
      {
        title: 'Renew annually',
        description:
          'License expires in 12 months; re-verify with fresh enrollment to renew.',
      },
    ],
    nameAr: 'Autodesk للتعليم',
    taglineAr: 'حزمة Autodesk كاملة مجاناً لسنة - AutoCAD و Maya و Revit',
    descriptionAr: 'تمنح Autodesk الطلاب ترخيص سنة مجانية لـ 20+ منتج: AutoCAD و Maya و 3ds Max و Revit و Inventor و Fusion 360. تحقق عبر SheerID.',
    stepsAr: [
      {
        title: 'أنشئ حساب Autodesk للتعليم',
        description: 'اذهب إلى autodesk.com/education/edu-software/overview → "Get product".',
        url: 'https://www.autodesk.com/education/edu-software/overview'
      },
      {
        title: 'تحقق عبر SheerID',
        description: 'اضغط "Verify" → SheerID. طالب: .edu → تلقائي. غير طالب: "Upload document" → بطاقة + خطاب.'
      },
      {
        title: 'حمّل وفعّل',
        description: 'بعد التحقق، اختر المنتج → حمّل → ثبّت → سجّل دخولك. يتفعل 12 شهراً.'
      },
      {
        title: 'جدّد سنوياً',
        description: 'ينتهي بعد 12 شهراً - أعد التحقق بخطاب جديد.'
      }
    ],
    upvotes: 24,
    bookmarks: 29,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o28',
    slug: 'zed-pro-student',
    name: 'Zed Pro for Students',
    tagline: '1 year Zed Pro free - fast Rust editor with AI + multiplayer',
    description:
      'Zed gives verified students 1 year of Pro free: AI edit/chat, multiplayer collab, and premium themes. Verifies via .edu or GitHub Student. Non-students can use GitHub Pack approval (file) to claim without .edu.',
    url: 'https://zed.dev/education',
    logoUrl: 'https://www.google.com/s2/favicons?domain=zed.dev&sz=64',
    category: 'tool',
    tags: ['zed', 'editor', 'rust', 'students', 'collaboration'],
    pricing: 'free',
    steps: [
      {
        title: 'Download Zed and sign in',
        description:
          'Visit zed.dev/education → Download Zed → Sign in.',
        url: 'https://zed.dev/education',
      },
      {
        title: 'Verify student status',
        description:
          'Click “Verify” → .edu email or “Verify with GitHub Student”. NON-STUDENT: Get GitHub Pack via file (CC enrollment) then link - Zed accepts that path.',
      },
      {
        title: 'Enable Pro',
        description:
          'After verification, Zed → Settings → Subscription shows Pro. Features enable instantly. Renewable while enrolled.',
      },
    ],
    nameAr: 'Zed Pro للطلاب',
    taglineAr: 'سنة Zed Pro مجاناً - محرر Rust سريع مع AI',
    descriptionAr: 'يمنح Zed الطلاب سنة Pro مجاناً: تحرير/دردشة AI، تعاون متعدد، وثيمات مميزة. يتحقق عبر .edu أو GitHub Student.',
    stepsAr: [
      {
        title: 'حمّل Zed وسجّل',
        description: 'اذهب إلى zed.dev/education → حمّل Zed وسجّل.',
        url: 'https://zed.dev/education'
      },
      {
        title: 'تحقق',
        description: 'اضغط "Verify" → بريد .edu أو "Verify with GitHub Student". غير طالب: احصل على GitHub Pack عبر ملف ثم اربط.'
      },
      {
        title: 'فعّل Pro',
        description: 'بعد التحقق، الإعدادات → الاشتراك يظهر Pro. يتفعل فوراً وقابل للتجديد.'
      }
    ],
    upvotes: 16,
    bookmarks: 19,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o29',
    slug: 'microsoft-365-education',
    name: 'Microsoft 365 Education',
    tagline: 'Free Office 365 + 1TB OneDrive + Teams for students (A1 license)',
    description:
      'Microsoft 365 Education A1 is free for verified students: Word, Excel, PowerPoint, OneNote on web + desktop, 100GB OneDrive (legacy 1TB on older tenants), Teams, and 50GB Exchange mail. Verifies via school .edu/Microsoft 365 Education domain. Non-students can enroll in a CC that issues Microsoft 365 Education accounts (most US CCs auto-provision) → get the school M365 login and claim.',
    url: 'https://www.microsoft.com/education/products/office',
    logoUrl: 'https://icons.duckduckgo.com/ip3/microsoft.com.ico',
    category: 'tool',
    tags: ['microsoft', 'office365', 'onedrive', 'students', 'teams'],
    pricing: 'free',
    steps: [
      {
        title: 'Check if your school provides M365',
        description:
          'Visit microsoft.com/education/products/office → “Get started with Office 365 Education” → Enter your .edu email. If your school is federated, you are auto-verified.',
        url: 'https://www.microsoft.com/education/products/office',
      },
      {
        title: 'Get access - student vs non-student',
        description:
          'STUDENT: Enter .edu → receive verification link → create M365 Education account. NON-STUDENT: Enroll in a CC that supports Microsoft Education (e.g., Coastline, Rio Hondo) - after 24h you get a @student.cc.edu Microsoft 365 login → use that to sign in. No file upload path - must be email domain approved by Microsoft.',
      },
      {
        title: 'Install Office and use OneDrive',
        description:
          'Sign in at office.com with your Education account → Install Office desktop → OneDrive syncs 100GB (Teams and Outlook included). License stays active while enrolled; graduates keep files but lose edit rights.',
      },
    ],
    nameAr: 'Microsoft 365 للتعليم',
    taglineAr: 'Office 365 مجاناً + OneDrive 1TB + Teams للطلاب',
    descriptionAr: 'Microsoft 365 Education A1 مجاناً للطلاب المحققين: Word و Excel و PowerPoint على الويب وسطح المكتب، 100GB OneDrive، Teams وبريد 50GB. يتحقق عبر نطاق .edu.',
    stepsAr: [
      {
        title: 'تحقق إذا كانت مدرستك تقدّم M365',
        description: 'اذهب إلى microsoft.com/education/products/office → "Get started" → أدخل بريدك .edu.',
        url: 'https://www.microsoft.com/education/products/office'
      },
      {
        title: 'احصل على الوصول - طالب أو غير طالب',
        description: 'طالب: أدخل .edu → رابط تحقق. غير طالب: سجّل في CC تدعم Microsoft Education للحصول على حساب M365.'
      },
      {
        title: 'ثبّت Office واستخدم OneDrive',
        description: 'سجّل في office.com بحساب التعليم → ثبّت Office → OneDrive 100GB.'
      }
    ],
    upvotes: 41,
    bookmarks: 52,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o30',
    slug: 'adobe-creative-cloud-student',
    name: 'Adobe Creative Cloud Student',
    tagline: '60%+ off Creative Cloud Pro - Photoshop, Illustrator, Premiere, 20+ apps',
    description:
      'Adobe Creative Cloud Pro for Students/Teachers: ~60% off (~$19.99/mo vs $59.99). Includes Photoshop, Illustrator, Premiere Pro, After Effects, XD, 100GB cloud. Verifies via SheerID/UNiDAYS with .edu or file. Non-students can qualify with CC enrollment + ID/transcript - SheerID accepts file proof and approves most accredited CCs.',
    url: 'https://www.adobe.com/creativecloud/buy/students.html',
    logoUrl: 'https://www.google.com/s2/favicons?domain=adobe.com&sz=64',
    category: 'tool',
    tags: ['adobe', 'creative-cloud', 'photoshop', 'students', 'discount'],
    pricing: 'paid',
    steps: [
      {
        title: 'Open Adobe Student page',
        description:
          'Visit adobe.com/creativecloud/buy/students.html → “Buy now” → student verification modal opens.',
        url: 'https://www.adobe.com/creativecloud/buy/students.html',
      },
      {
        title: 'Verify - email or document',
        description:
          'STUDENT: Enter .edu → instant via SheerID. NON-STUDENT: Choose “Upload document” → student ID + enrollment letter showing name + school + current date. CC enrollments are accepted; keep the PDF in English/color scan.',
      },
      {
        title: 'Checkout and install',
        description:
          'After approval, checkout at student price. Install via Creative Cloud Desktop app → sign in → all apps activate. Discount renews yearly with re-verification.',
      },
    ],
    nameAr: 'Adobe Creative Cloud للطلاب',
    taglineAr: 'خصم 60%+ على Creative Cloud Pro - فوتوشوب و 20+ تطبيق',
    descriptionAr: 'Adobe Creative Cloud Pro للطلاب ~60% خصم (~19.99$ بدل 59.99$). يضم Photoshop و Illustrator و Premiere و 100GB. يتحقق عبر SheerID.',
    stepsAr: [
      {
        title: 'افتح صفحة Adobe للطلاب',
        description: 'اذهب إلى adobe.com/creativecloud/buy/students.html → "Buy now".',
        url: 'https://www.adobe.com/creativecloud/buy/students.html'
      },
      {
        title: 'تحقق - بريد أو مستند',
        description: 'طالب: .edu → فوري. غير طالب: اختر "Upload document" → بطاقة + خطاب.'
      },
      {
        title: 'ادفع وثبّت',
        description: 'بعد الموافقة، ادفع بسعر الطلاب وثبّت عبر Creative Cloud Desktop.'
      }
    ],
    upvotes: 35,
    bookmarks: 41,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o31',
    slug: 'apple-education-icloud-200gb',
    name: 'Apple Education: 200GB iCloud',
    tagline: 'Permanent 200GB iCloud storage free for teachers & students via Apple School Manager',
    description:
      'Apple offers 200GB iCloud free (permanent while enrolled) for students/teacherswhose school uses Apple School Manager. The school admin assigns the Managed Apple ID → 200GB quota appears in Settings. For personal Apple IDs, students can claim Apple Music Student ($5.99) + iCloud+ features. Non-students can ask their CC IT desk to issue a Managed Apple ID after enrollment - many CCs support ASM.',
    url: 'https://www.apple.com/education/k12/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/apple.com.ico',
    category: 'tool',
    tags: ['apple', 'icloud', 'storage', 'education', 'school-manager'],
    pricing: 'free',
    steps: [
      {
        title: 'Ask your school IT for Managed Apple ID',
        description:
          'STUDENT: Contact IT/helpdesk → “Request Managed Apple ID via Apple School Manager for iCloud 200GB”. They will invite your school email. NON-STUDENT: After CC enrollment, ask IT for ASM account - CCs using ASM can create one in minutes.',
        url: 'https://www.apple.com/education/k12/',
      },
      {
        title: 'Sign in on iPhone/Mac',
        description:
          'On iOS: Settings → Sign in with Managed Apple ID → iCloud shows 200GB. Use for Photos, Drive, Backup. Personal iCloud stays separate - you can keep both.',
      },
      {
        title: 'Manage via School Manager',
        description:
          'Admins manage storage at school.apple.com. Students cannot buy more - 200GB is the cap while enrolled. Graduates lose quota after account removed.',
      },
    ],
    nameAr: 'Apple للتعليم: 200GB iCloud',
    taglineAr: '200GB iCloud مجاناً بشكل دائم عبر Apple School Manager',
    descriptionAr: 'تقدّم Apple 200GB iCloud مجاناً بشكل دائم للطلاب/المعلمين إذا كانت مدرستهم تستخدم Apple School Manager. يخصص المسؤول معرف Apple المُدار → تظهر الحصة 200GB.',
    stepsAr: [
      {
        title: 'اطلب من IT معرف Apple المُدار',
        description: 'طالب: تواصل مع الدعم → "Request Managed Apple ID". غير طالب: بعد تسجيل CC اطلب حساب ASM.',
        url: 'https://www.apple.com/education/k12/'
      },
      {
        title: 'سجّل على iPhone/Mac',
        description: 'في الإعدادات → سجّل بمعرفك المُدار → يظهر iCloud 200GB.'
      },
      {
        title: 'أدر عبر School Manager',
        description: 'يدير المسؤولون التخزين في school.apple.com. الحصة 200GB كحد أقصى أثناء الدراسة.'
      }
    ],
    upvotes: 19,
    bookmarks: 24,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o32',
    slug: 'matlab-student-suite',
    name: 'MATLAB Student Suite',
    tagline: 'MATLAB + Simulink + 10 toolboxes for students - $49 license, free via campus',
    description:
      'MathWorks MATLAB Student Suite: MATLAB, Simulink, and 10 toolboxes for $49 (or free if your campus has a Campus-Wide License - check with .edu). Includes online MATLAB, 1TB Drive. Verifies via .edu email or campus SSO. Non-students can get it via CC Math course - MathWorks accepts any accredited .edu, and many CCs have campus license covering you free.',
    url: 'https://www.mathworks.com/products/matlab/student.html',
    logoUrl: 'https://icons.duckduckgo.com/ip3/mathworks.com.ico',
    category: 'tool',
    tags: ['matlab', 'simulink', 'mathworks', 'students', 'engineering'],
    pricing: 'paid',
    steps: [
      {
        title: 'Check campus license first',
        description:
          'Visit mathworks.com/academia → Enter school .edu → “Is my campus licensed?” If yes, you get MATLAB free with school login - no $49 needed.',
        url: 'https://www.mathworks.com/products/matlab/student.html',
      },
      {
        title: 'Get MATLAB - student vs non-student',
        description:
          'STUDENT: Create MathWorks Account with .edu → verify via email OTP. NON-STUDENT: Enroll in CC Math/Engineering 1-credit → get .edu + campus SSO → register; MathWorks approves CC .edu domains like any university.',
      },
      {
        title: 'Download or use online',
        description:
          'Go to mathworks.com → Downloads → MATLAB R2024b → license activates via account. Or use matlab.mathworks.com online - no install needed.',
      },
    ],
    nameAr: 'MATLAB للطلاب',
    taglineAr: 'MATLAB + Simulink + 10 صناديق للطلاب - 49$ أو مجاناً عبر الحرم',
    descriptionAr: 'حزمة MATLAB للطلاب: MATLAB و Simulink و 10 صناديق بـ 49$ أو مجاناً إذا كان الحرم لديه ترخيص شامل. يتحقق عبر .edu أو SSO الحرم.',
    stepsAr: [
      {
        title: 'تحقق من ترخيص الحرم أولاً',
        description: 'اذهب إلى mathworks.com/academia → أدخل .edu → "Is my campus licensed?" إذا نعم، تحصل عليه مجاناً.',
        url: 'https://www.mathworks.com/products/matlab/student.html'
      },
      {
        title: 'احصل على MATLAB - طالب أو غير طالب',
        description: 'طالب: أنشئ حساب MathWorks ببريد .edu. غير طالب: سجّل في CC لمادة رياضيات للحصول على .edu.'
      },
      {
        title: 'حمّل أو استخدم عبر الويب',
        description: 'اذهب إلى mathworks.com → التنزيلات → MATLAB أو استخدم matlab.mathworks.com عبر الويب.'
      }
    ],
    upvotes: 21,
    bookmarks: 26,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o33',
    slug: 'replit-student',
    name: 'Replit Student',
    tagline: '50% off Replit Core for students - $10/mo with .edu email',
    description:
      'Replit gives students 50% off Core ($10/mo with .edu email) plus AI credits: hosted IDE for 50+ languages, Deployments, and AI assistant. Verifies with .EDU email or GitHub Student linkage.',
    url: 'https://replit.com/edu/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/replit.com.ico',
    category: 'tool',
    tags: ['replit', 'ide', 'hosting', 'students', 'discount'],
    pricing: 'paid',
    steps: [
      {
        title: 'Link GitHub Student or .edu',
        description:
          'STUDENT: Sign in at replit.com/edu/students with GitHub already approved for Student Pack - Replit auto-detects. Or verify with .edu email. NON-STUDENT: Approve GitHub Pack first via CC file (see o9), then return to Replit to claim.',
        url: 'https://replit.com/edu/students',
      },
      {
        title: 'Apply student discount',
        description:
          'In Billing → “Student Discount” → Apply. Discount is 50% for as long as GitHub Student is active. Free AI credits are added monthly.',
      },
      {
        title: 'Code in browser',
        description:
          'Create a Repl → choose language → use AI chat to generate code. Deploy with one click - hosting included.',
      },
    ],
    nameAr: 'Replit للطلاب',
    taglineAr: 'خصم 50% على Replit Core ($10/شهر ببريد .edu) + رصيد AI',
    descriptionAr: 'يمنح Replit الطلاب خصم 50% على Core ($10/شهر ببريد .edu) ورصيد AI. يضم IDE مستضاف لـ 50+ لغة.',
    stepsAr: [
      {
        title: 'اربط GitHub Student أو .edu',
        description: 'سجّل في replit.com/edu/students بحساب GitHub الموافق عليه - يكتشف تلقائياً.',
        url: 'https://replit.com/edu/students'
      },
      {
        title: 'طبّق خصم الطلاب',
        description: 'في الفوترة → "Student Discount" → طبّق. الخصم طالما GitHub Student نشط.'
      },
      {
        title: 'برمج في المتصفح',
        description: 'أنشئ Repl → اختر لغة → استخدم دردشة AI لتوليد الكود ونشره بنقرة.'
      }
    ],
    upvotes: 18,
    bookmarks: 22,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o34',
    slug: 'digitalocean-student',
    name: 'DigitalOcean Student',
    tagline: '$200 credit for 12 months via GitHub Student Pack - droplets, DBs, Spaces',
    description:
      'DigitalOcean via GitHub Student Pack: $200 credit for 12 months to run droplets, managed DBs, Spaces object storage, and App Platform. Verifies via GitHub Student linkage - no separate .edu check. Non-students qualify by first getting GitHub Pack via CC file (o9).',
    url: 'https://www.digitalocean.com/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/digitalocean.com.ico',
    category: 'api-access',
    tags: ['digitalocean', 'hosting', 'cloud', 'droplet', 'students'],
    pricing: 'free',
    steps: [
      {
        title: 'Get GitHub Student Pack first',
        description:
          'Follow o9 steps to get GitHub Student Pack approved (via .edu or CC file). DigitalOcean credit is inside the pack, not a standalone portal.',
        url: 'https://education.github.com/pack',
      },
      {
        title: 'Claim on DigitalOcean',
        description:
          'In GitHub Pack → find DigitalOcean → “Get access” → redirected to digitalocean.com where $200 promo auto-applies. Create account with same email and add card (required for verification, but credit covers spend).',
      },
      {
        title: 'Deploy',
        description:
          'Create a $6 Droplet or App Platform app - credit burns first. Track in Billing → Credits. Credit expires in 12 months.',
      },
    ],
    nameAr: 'DigitalOcean للطلاب',
    taglineAr: 'رصيد 200$ لـ 12 شهراً عبر GitHub Student Pack',
    descriptionAr: 'DigitalOcean عبر GitHub Student Pack: رصيد 200$ لـ 12 شهراً لتشغيل droplets و DBs و Spaces و App Platform. يتحقق عبر ربط GitHub Student.',
    stepsAr: [
      {
        title: 'احصل على GitHub Student Pack أولاً',
        description: 'اتبع خطوات o9 للحصول على الموافقة (عبر .edu أو ملف CC).',
        url: 'https://education.github.com/pack'
      },
      {
        title: 'اطلب في DigitalOcean',
        description: 'في GitHub Pack → DigitalOcean → "Get access" → يعاد توجيهك ويُطبق الرمز تلقائياً.'
      },
      {
        title: 'انشر',
        description: 'أنشئ Droplet بـ 6$ أو تطبيق - الرصيد يُستهلك أولاً وينتهي بعد 12 شهراً.'
      }
    ],
    upvotes: 22,
    bookmarks: 27,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o35',
    slug: 'namecheap-education',
    name: 'Namecheap Education',
    tagline: 'Free 1-year domain + SSL + $100 hosting via GitHub Student Pack',
    description:
      'Namecheap via GitHub Student Pack: free .me domain for 1 year, free PositiveSSL, and free hosting trial. Verifies via GitHub Student linkage. Also standalone .edu discount at nc.me/edu. Non-students get it via CC → GitHub Pack file path.',
    url: 'https://www.namecheap.com/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/namecheap.com.ico',
    category: 'tool',
    tags: ['namecheap', 'domain', 'ssl', 'hosting', 'students'],
    pricing: 'free',
    steps: [
      {
        title: 'Approve GitHub Student',
        description:
          'Complete o9 GitHub Student verification (CC file accepted).',
        url: 'https://education.github.com/pack',
      },
      {
        title: 'Claim at Namecheap',
        description:
          'GitHub Pack → Namecheap → “Get access” → Create Namecheap account with same email → domain credit appears. Search a .me domain → checkout shows $0 for first year. SSL claim is in Namecheap dashboard → SSL → Free SSL.',
      },
      {
        title: 'Renew or keep domain',
        description:
          'Domain is free for 1 year; renew at ~$8/yr after. SSL renews annually via same portal while student status active.',
      },
    ],
    nameAr: 'Namecheap للتعليم',
    taglineAr: 'دومين مجاني لسنة + SSL + استضافة عبر GitHub Student Pack',
    descriptionAr: 'Namecheap عبر GitHub Student Pack: دومين .me مجاني لسنة و PositiveSSL مجاني وتجربة استضافة. يتحقق عبر ربط GitHub Student.',
    stepsAr: [
      {
        title: 'وافق على GitHub Student',
        description: 'أكمل تحقق GitHub Student (ملف CC مقبول).',
        url: 'https://education.github.com/pack'
      },
      {
        title: 'اطلب في Namecheap',
        description: 'GitHub Pack → Namecheap → "Get access" → أنشئ حساباً بنفس البريد → يظهر رصيد الدومين.'
      },
      {
        title: 'جدّد أو احتفظ بالدومين',
        description: 'الدومين مجاني لسنة ثم ~8$ سنوياً. SSL يتجدد سنوياً.'
      }
    ],
    upvotes: 20,
    bookmarks: 25,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o36',
    slug: 'sketch-education',
    name: 'Sketch Education',
    tagline: 'Free Sketch for students - native macOS UI design with team workspace',
    description:
      'Sketch gives verified students free Education license: macOS app + web workspace, team libraries, and prototype sharing. Verifies via school email or file. Non-students can get it with CC enrollment + ID upload - manual review approves most accredited schools.',
    url: 'https://www.sketch.com/education/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/sketch.com.ico',
    category: 'tool',
    tags: ['sketch', 'design', 'ui', 'mac', 'students'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply at Sketch Education',
        description:
          'Visit sketch.com/education → “Apply for free Education license”.',
        url: 'https://www.sketch.com/education/',
      },
      {
        title: 'Verify',
        description:
          'STUDENT: .edu email → auto. NON-STUDENT: “No school email” → upload student ID + enrollment letter (show name + school + current term). CC IDs accepted; review 1-3 days.',
      },
      {
        title: 'Install Sketch',
        description:
          'After approval, download Sketch for Mac → sign in → Education workspace appears. License renews annually with fresh proof.',
      },
    ],
    nameAr: 'Sketch للتعليم',
    taglineAr: 'Sketch مجاناً للطلاب - تصميم واجهات على macOS',
    descriptionAr: 'يمنح Sketch الطلاب ترخيص تعليم مجاني: تطبيق macOS ومساحة ويب ومكتبات فريق ومشاركة نماذج. يتحقق عبر بريد أو ملف.',
    stepsAr: [
      {
        title: 'قدّم في Sketch للتعليم',
        description: 'اذهب إلى sketch.com/education → "Apply for free Education license".',
        url: 'https://www.sketch.com/education/'
      },
      {
        title: 'تحقق',
        description: 'طالب: .edu → تلقائي. غير طالب: "No school email" → ارفع بطاقة وخطاب. تقبل CC.'
      },
      {
        title: 'ثبّت Sketch',
        description: 'بعد الموافقة، حمّل Sketch لـ Mac → سجّل دخولك → تظهر مساحة التعليم.'
      }
    ],
    upvotes: 16,
    bookmarks: 19,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o37',
    slug: 'youtube-premium-student',
    name: 'YouTube Premium Student',
    tagline: '1 month free + 50% off Premium - no ads, background play, offline',
    description:
      'YouTube Premium Student: first month free, then ~50% off (~$7.99 vs $13.99). Includes ad-free YouTube + YouTube Music, background play, offline downloads, and picture-in-picture. Verifies via SheerID with .edu or file. Non-students can qualify with CC enrollment + ID - SheerID accepts enrollment letter + student ID for most US CCs.',
    url: 'https://www.youtube.com/premium/student',
    logoUrl: 'https://icons.duckduckgo.com/ip3/youtube.com.ico',
    category: 'tool',
    tags: ['youtube', 'premium', 'students', 'music', 'discount'],
    pricing: 'paid',
    steps: [
      {
        title: 'Open YouTube Student page',
        description:
          'Go to youtube.com/premium/student → “Try 1 month free”. You will be sent to SheerID.',
        url: 'https://www.youtube.com/premium/student',
      },
      {
        title: 'Verify - student vs non-student',
        description:
          'STUDENT: Enter school name + .edu → instant. NON-STUDENT: Enroll in an accredited CC for 1 credit → get .edu + ID + enrollment letter → when SheerID asks for document upload, upload PDF (name + school + current term).',
      },
      {
        title: 'Activate Premium',
        description:
          'After approval, YouTube upgrades to Premium. Add payment method, cancel auto-renew anytime. Discount valid up to 4 years while enrolled with yearly re-verification.',
      },
    ],
    nameAr: 'يوتيوب بريميوم للطلاب',
    taglineAr: 'شهر مجاناً + خصم 50% - بدون إعلانات وتشغيل في الخلفية وتحميل',
    descriptionAr: 'يوتيوب بريميوم للطلاب: شهر أول مجاناً ثم خصم ~50% (~7.99$). يشمل يوتيوب وYouTube Music بدون إعلانات، تشغيل في الخلفية، تحميل للمشاهدة دون إنترنت، وصورة داخل صورة. يتحقق عبر SheerID ببريد .edu أو ملف. غير الطلاب يمكنهم التسجيل في كلية مجتمع للحصول على إثبات.',
    stepsAr: [
      {
        title: 'افتح صفحة الطلاب',
        description: 'اذهب إلى youtube.com/premium/student → "جرب شهر مجاناً" → ستنتقل إلى SheerID.',
        url: 'https://www.youtube.com/premium/student',
      },
      {
        title: 'تحقق - طالب أو غير طالب',
        description: 'طالب: أدخل اسم المدرسة + .edu → فوري. غير طالب: سجّل في CC معتمدة واحصل على .edu وبطاقة وخطاب → ارفع PDF عند طلب SheerID.',
      },
      {
        title: 'فعّل بريميوم',
        description: 'بعد الموافقة، يتحول حسابك إلى Premium. أضف بطاقة دفع ويمكنك الإلغاء في أي وقت. الخصم صالح حتى 4 سنوات مع تحقق سنوي.',
      },
    ],
    upvotes: 24,
    bookmarks: 28,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o38',
    slug: 'amazon-prime-student',
    name: 'Amazon Prime Student',
    tagline: '6 months free Prime then 50% off - free delivery, Prime Video, plus 30% off Luna',
    description:
      'Amazon Prime Student: 6 months free (no charge), then 50% off ($7.49/mo vs $14.99). Includes free delivery, Prime Video, Prime Reading, and exclusive deals. Verifies via .edu email or SheerID file. Non-students can enroll in a CC to get .edu + enrollment proof - Amazon accepts upload of enrollment letter + ID via SheerID.',
    url: 'https://www.amazon.com/joinstudent',
    logoUrl: 'https://icons.duckduckgo.com/ip3/amazon.com.ico',
    category: 'tool',
    tags: ['amazon', 'prime', 'students', 'free-trial', 'shipping'],
    pricing: 'paid',
    steps: [
      {
        title: 'Join Prime Student',
        description:
          'Visit amazon.com/joinstudent → “Start 6-month trial”. Sign in with Amazon account.',
        url: 'https://www.amazon.com/joinstudent',
      },
      {
        title: 'Verify student status',
        description:
          'STUDENT: Enter .edu email → code sent → verify. No .edu? Click “Verify with document” → upload student ID + enrollment letter (name + school + date). NON-STUDENT: Use CC enrollment (1 course) to get .edu + letter → upload.',
      },
      {
        title: 'Enjoy Prime and renew check',
        description:
          'Trial is 6 months free, then auto-charges at 50% off. Amazon may ask to re-verify after 12 months. Cancel anytime before renewal. You keep Prime Video watchlist after trial.',
      },
    ],
    nameAr: 'أمازون برايم للطلاب',
    taglineAr: '6 أشهر مجاناً ثم خصم 50% - توصيل مجاني وبرايم فيديو',
    descriptionAr: 'أمازون برايم للطلاب: 6 أشهر مجاناً ثم خصم 50% (7.49$ مقابل 14.99$). يشمل توصيل مجاني، Prime Video، قراءة، وعروض خاصة. يتحقق عبر .edu أو SheerID بملف. غير الطلاب يمكنهم التسجيل في كلية مجتمع للحصول على إثبات.',
    stepsAr: [
      {
        title: 'انضم لبرايم الطلاب',
        description: 'اذهب إلى amazon.com/joinstudent → "ابدأ التجربة 6 أشهر". سجّل دخولك.',
        url: 'https://www.amazon.com/joinstudent',
      },
      {
        title: 'تحقق',
        description: 'طالب: أدخل .edu → رمز تحقق. بدون .edu: اضغط "Verify with document" → ارفع بطاقة + خطاب تسجيل. غير طالب: احصل على إثبات CC وارفعه.',
      },
      {
        title: 'استخدم برايم',
        description: 'التجربة 6 أشهر مجاناً ثم نصف السعر. يطلب إعادة التحقق بعد 12 شهراً. يمكنك الإلغاء قبل التجديد.',
      },
    ],
    upvotes: 31,
    bookmarks: 36,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o39',
    slug: 'consensus-academic',
    name: 'Consensus Academic',
    tagline: '1 year Consensus Pro free with .edu - AI search over 200M papers',
    description:
      'Consensus gives students 1 year of Pro free (normally $12/mo): AI synthesis over 200M research papers, study snapshots, and citation search. Verifies with .edu email instantly. Non-students can get it with any CC .edu mailbox - email-only verification.',
    url: 'https://consensus.app/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/consensus.app.ico',
    category: 'learning',
    tags: ['consensus', 'research', 'papers', 'students', 'ai-search'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign up with .edu',
        description:
          'Go to consensus.app → Sign up with .edu email. STUDENT: use school .edu. NON-STUDENT: use CC .edu mailbox - verification is email domain only.',
        url: 'https://consensus.app/',
      },
      {
        title: 'Claim Pro',
        description:
          'Check email for Pro upgrade link or go to Settings → Billing → “Education - Pro”. Pro unlocks unlimited AI summaries and filters.',
      },
      {
        title: 'Search papers',
        description:
          'Type a research question → Consensus returns synthesized answer with citations + Study Snapshot. Export to Zotero/Notion.',
      },
    ],
    nameAr: 'كونسنسس الأكاديمي',
    taglineAr: 'سنة Pro مجاناً ببريد .edu - بحث ذكي في 200M ورقة',
    descriptionAr: 'يمنح كونسنسس الطلاب سنة Pro مجاناً: تلخيص ذكي لأكثر من 200M ورقة بحثية، لقطات دراسة، وبحث بالاستشهادات. يتحقق فوراً ببريد .edu.',
    stepsAr: [
      {
        title: 'سجّل ببريد .edu',
        description: 'اذهب إلى consensus.app → سجّل ببريد .edu. غير طالب: استخدم بريد CC - التحقق بالبريد فقط.',
        url: 'https://consensus.app/',
      },
      {
        title: 'فعّل Pro',
        description: 'تحقق من بريدك لرابط الترقية أو الإعدادات → الفوترة → Education Pro.',
      },
      {
        title: 'ابحث في الأوراق',
        description: 'اكتب سؤالاً بحثياً → يعطيك خلاصة مع استشهادات وقابلية تصدير إلى Zotero.',
      },
    ],
    upvotes: 18,
    bookmarks: 22,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o40',
    slug: 'julius-ai-student',
    name: 'Julius AI Student',
    tagline: 'Free Julius Pro for students - chat with data, charts, and analysis',
    description:
      'Julius AI gives verified students free Pro: chat with CSVs/Excel/Sheets, auto-charts, and data cleaning. Verifies with .edu email. Non-students can get it with CC .edu mailbox (email-only).',
    url: 'https://julius.ai/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/julius.ai.ico',
    category: 'tool',
    tags: ['julius', 'data', 'analysis', 'students', 'charts'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign up with .edu',
        description:
          'Visit julius.ai → Sign up with .edu email. NON-STUDENT: use CC .edu - email verification only.',
        url: 'https://julius.ai/',
      },
      {
        title: 'Upgrade to Pro',
        description:
          'Dashboard → Settings → Education → Pro auto-enables for .edu domains. Refresh to see higher message limits.',
      },
      {
        title: 'Analyze data',
        description:
          'Upload a CSV/Excel → ask “Clean and chart this” → Julius returns visuals and insights. Export charts to Slides.',
      },
    ],
    nameAr: 'جوليوس AI للطلاب',
    taglineAr: 'Pro مجاناً للطلاب - حلّل بياناتك بالدردشة',
    descriptionAr: 'يمنح Julius الطلاب Pro مجاناً: دردشة مع ملفات CSV/Excel، رسوم تلقائية وتنظيف بيانات. يتحقق ببريد .edu فقط.',
    stepsAr: [
      {
        title: 'سجّل ببريد .edu',
        description: 'اذهب إلى julius.ai → سجّل ببريد .edu. غير طالب: استخدم بريد CC.',
        url: 'https://julius.ai/',
      },
      {
        title: 'رقّ إلى Pro',
        description: 'لوحة التحكم → الإعدادات → التعليم → Pro يتفعل تلقائياً.',
      },
      {
        title: 'حلّل بياناتك',
        description: 'ارفع CSV → اطلب "نظّف وارسم" → يعطيك رسوماً ورؤى قابلة للتصدير.',
      },
    ],
    upvotes: 14,
    bookmarks: 17,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o41',
    slug: 'goodnotes-education',
    name: 'GoodNotes Education',
    tagline: '1 year GoodNotes Pro free for students - iPad/Mac notes + AI',
    description:
      'GoodNotes gives verified students 1 year of Pro free: unlimited notebooks, AI handwriting search, and iCloud sync. Verifies via UNiDAYS with .edu or file. Non-students can qualify with CC enrollment + UNiDAYS file upload - most CCs are listed.',
    url: 'https://www.goodnotes.com/education',
    logoUrl: 'https://icons.duckduckgo.com/ip3/goodnotes.com.ico',
    category: 'tool',
    tags: ['goodnotes', 'notes', 'ipad', 'students', 'handwriting'],
    pricing: 'free',
    steps: [
      {
        title: 'Open GoodNotes Education',
        description:
          'Visit goodnotes.com/education → “Verify with UNiDAYS”.',
        url: 'https://www.goodnotes.com/education',
      },
      {
        title: 'Verify via UNiDAYS',
        description:
          'STUDENT: Enter school + .edu → instant. NON-STUDENT: Choose file upload → student ID + enrollment letter (name + school + current term). UNiDAYS approves CCs in minutes.',
      },
      {
        title: 'Redeem Pro',
        description:
          'After approval, redeem code in GoodNotes app → Settings → Redeem. Pro unlocks on iPad, iPhone, Mac. Renewable while enrolled.',
      },
    ],
    nameAr: 'GoodNotes للطلاب',
    taglineAr: 'سنة Pro مجاناً - دفتر iPad مع بحث بخط اليد و AI',
    descriptionAr: 'يمنح GoodNotes الطلاب سنة Pro مجاناً: دفاتر غير محدودة، بحث بخط اليد وAI، ومزامنة iCloud. يتحقق عبر UNiDAYS.',
    stepsAr: [
      {
        title: 'افتح صفحة التعليم',
        description: 'اذهب إلى goodnotes.com/education → "Verify with UNiDAYS".',
        url: 'https://www.goodnotes.com/education',
      },
      {
        title: 'تحقق عبر UNiDAYS',
        description: 'طالب: أدخل .edu → فوري. غير طالب: ارفع بطاقة + خطاب تسجيل - يوافق على CC خلال دقائق.',
      },
      {
        title: 'استرد Pro',
        description: 'بعد الموافقة، استرد الرمز في التطبيق → الإعدادات → Redeem. يتفعل على كل أجهزتك.',
      },
    ],
    upvotes: 16,
    bookmarks: 19,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o42',
    slug: 'mathpix-student',
    name: 'Mathpix Student',
    tagline: '500+ OCR snips/month free for students - LaTeX + formula search',
    description:
      'Mathpix Snip gives students 500+ OCR conversions/month free (normally 100). Snap handwritten or PDF math → LaTeX, Word, and search. Verifies with .edu email. Non-students can get it with CC .edu mailbox - email-only.',
    url: 'https://mathpix.com/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/mathpix.com.ico',
    category: 'learning',
    tags: ['mathpix', 'ocr', 'latex', 'students', 'math'],
    pricing: 'free',
    steps: [
      {
        title: 'Create Mathpix with .edu',
        description:
          'Sign up at mathpix.com with .edu email (CC .edu works for non-students). Verify via email link.',
        url: 'https://mathpix.com/',
      },
      {
        title: 'Download Snip',
        description:
          'Download Mathpix Snip for Mac/Win/iOS → sign in → Pro quota shows 500. Drag-snip any formula.',
      },
      {
        title: 'Use LaTeX export',
        description:
          'Snip → copy LaTeX → paste in Overleaf/Notion/Word. Quota resets monthly while student status active.',
      },
    ],
    nameAr: 'Mathpix للطلاب',
    taglineAr: '500+ تحويل OCR شهرياً مجاناً - LaTeX وبحث صيغ',
    descriptionAr: 'يمنح Mathpix الطلاب 500+ تحويل OCR شهرياً مجاناً (بدل 100). التقط معادلاتك → LaTeX. يتحقق ببريد .edu فقط.',
    stepsAr: [
      {
        title: 'أنشئ حساباً ببريد .edu',
        description: 'سجّل في mathpix.com ببريد .edu (CC يعمل لغير الطلاب).',
        url: 'https://mathpix.com/',
      },
      {
        title: 'حمّل Snip',
        description: 'حمّل Mathpix Snip → سجّل دخولك → سترى حصة 500. اسحب لتحديد أي معادلة.',
      },
      {
        title: 'صدّر LaTeX',
        description: 'انسخ LaTeX → الصق في Overleaf/Notion. الحصة تتجدد شهرياً.',
      },
    ],
    upvotes: 15,
    bookmarks: 18,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o43',
    slug: 'shapr3d-education',
    name: 'Shapr3D Education',
    tagline: '1 year Shapr3D Pro free - CAD on iPad/Mac with file proof',
    description:
      'Shapr3D gives students 1 year of Pro free: full CAD modeling on iPad/Mac/Win. Verifies via school email or file (ID + enrollment). Non-students can qualify with CC enrollment + ID upload - manual review approves most accredited CCs.',
    url: 'https://www.shapr3d.com/education',
    logoUrl: 'https://icons.duckduckgo.com/ip3/shapr3d.com.ico',
    category: 'tool',
    tags: ['shapr3d', 'cad', '3d', 'students', 'ipad'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply at Shapr3D Education',
        description:
          'Visit shapr3d.com/education → “Apply for free license”.',
        url: 'https://www.shapr3d.com/education',
      },
      {
        title: 'Verify',
        description:
          'STUDENT: .edu email → auto. NON-STUDENT: “No school email” → upload student ID + enrollment letter (show name + school + current term). CC IDs accepted; 1-3 day review.',
      },
      {
        title: 'Install Shapr3D',
        description:
          'After approval, download Shapr3D → sign in → Pro workspace appears. Renew annually with fresh proof.',
      },
    ],
    nameAr: 'Shapr3D للطلاب',
    taglineAr: 'سنة Pro مجاناً - CAD على iPad/Mac',
    descriptionAr: 'يمنح Shapr3D الطلاب سنة Pro مجاناً: نمذجة CAD كاملة على iPad/Mac. يتحقق عبر .edu أو ملف.',
    stepsAr: [
      {
        title: 'قدّم في Shapr3D',
        description: 'اذهب إلى shapr3d.com/education → "Apply".',
        url: 'https://www.shapr3d.com/education',
      },
      {
        title: 'تحقق',
        description: 'طالب: .edu → تلقائي. غير طالب: ارفع بطاقة + خطاب - تقبل CC.',
      },
      {
        title: 'ثبّت Shapr3D',
        description: 'بعد الموافقة، حمّل التطبيق → سجّل دخولك → Pro يتفعل.',
      },
    ],
    upvotes: 13,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o44',
    slug: 'tower-git-student',
    name: 'Tower Git Student',
    tagline: '1 year Tower free for students - Git client for Mac & Windows',
    description:
      'Tower gives students free license for 1 year: powerful Git GUI for Mac/Win with drag-and-drop, merge, and PR flows. Verifies via school email or file. Non-students can get it with CC ID + enrollment - manual approval.',
    url: 'https://www.git-tower.com/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/git-tower.com.ico',
    category: 'tool',
    tags: ['tower', 'git', 'client', 'students', 'mac'],
    pricing: 'free',
    steps: [
      {
        title: 'Request Tower Student',
        description:
          'Visit git-tower.com/students → “Request student license”.',
        url: 'https://www.git-tower.com/students',
      },
      {
        title: 'Verify',
        description:
          'STUDENT: .edu → instant. NON-STUDENT: Upload student ID + enrollment letter - Tower manually approves CCs.',
      },
      {
        title: 'Activate Tower',
        description:
          'Receive license email → download Tower → paste license key. Renew yearly.',
      },
    ],
    nameAr: 'Tower للطلاب',
    taglineAr: 'سنة Tower مجاناً - عميل Git لـ Mac و Windows',
    descriptionAr: 'يمنح Tower الطلاب ترخيصاً مجانياً لسنة: واجهة Git قوية مع سحب وإفلات ودمج. يتحقق عبر .edu أو ملف.',
    stepsAr: [
      {
        title: 'اطلب ترخيص Tower',
        description: 'اذهب إلى git-tower.com/students → "Request".',
        url: 'https://www.git-tower.com/students',
      },
      {
        title: 'تحقق',
        description: 'طالب: .edu → فوري. غير طالب: ارفع بطاقة + خطاب - موافقة يدوية.',
      },
      {
        title: 'فعّل Tower',
        description: 'استلم مفتاح الترخيص → حمّل Tower → الصق المفتاح. يتجدد سنوياً.',
      },
    ],
    upvotes: 11,
    bookmarks: 14,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o45',
    slug: 'craft-docs-education',
    name: 'Craft Docs Education',
    tagline: 'Free Craft Pro for students - docs + AI with file proof',
    description:
      'Craft gives verified students free Pro: docs, calendar, AI writing, and team workspace. Verifies via school email or file. Non-students can qualify with CC enrollment + file proof - Craft manually reviews.',
    url: 'https://www.craft.do/education',
    logoUrl: 'https://icons.duckduckgo.com/ip3/craft.do.ico',
    category: 'tool',
    tags: ['craft', 'notes', 'docs', 'students', 'ai'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply at Craft Education',
        description:
          'Visit craft.do/education → “Apply for free Education”.',
        url: 'https://www.craft.do/education',
      },
      {
        title: 'Verify',
        description:
          'STUDENT: .edu → auto. NON-STUDENT: “No school email” → upload student ID + enrollment letter. CC accepted.',
      },
      {
        title: 'Activate Craft Pro',
        description:
          'After approval, Craft app shows Education workspace with Pro unlocked. Renew annually.',
      },
    ],
    nameAr: 'Craft للطلاب',
    taglineAr: 'Craft Pro مجاناً - مستندات + AI',
    descriptionAr: 'يمنح Craft الطلاب Pro مجاناً: مستندات وتقويم وذكاء اصطناعي. يتحقق عبر .edu أو ملف.',
    stepsAr: [
      {
        title: 'قدّم في Craft',
        description: 'اذهب إلى craft.do/education → "Apply".',
        url: 'https://www.craft.do/education',
      },
      {
        title: 'تحقق',
        description: 'طالب: .edu → تلقائي. غير طالب: ارفع بطاقة + خطاب - تقبل CC.',
      },
      {
        title: 'فعّل Pro',
        description: 'بعد الموافقة، يظهر workspace تعليمي مع Pro. يتجدد سنوياً.',
      },
    ],
    upvotes: 12,
    bookmarks: 15,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o46',
    slug: 'ilovepdf-education',
    name: 'iLovePDF Education',
    tagline: 'Premium 1 year free for students - edit, merge, OCR PDFs',
    description:
      'iLovePDF gives verified students Premium free for 1 year: edit, merge, split, compress, OCR, and sign PDFs with high limits. Verifies via school email or file upload. Non-students can qualify with CC ID + enrollment - manual review approves most.',
    url: 'https://www.ilovepdf.com/education',
    logoUrl: 'https://icons.duckduckgo.com/ip3/ilovepdf.com.ico',
    category: 'tool',
    tags: ['ilovepdf', 'pdf', 'students', 'ocr', 'premium'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply at iLovePDF Education',
        description:
          'Visit ilovepdf.com/education → “Apply for Premium for free”.',
        url: 'https://www.ilovepdf.com/education',
      },
      {
        title: 'Verify',
        description:
          'STUDENT: Enter school name + .edu → auto. NON-STUDENT: Upload student ID + enrollment letter (show name + school + current term). CC IDs accepted; 1-2 day review.',
      },
      {
        title: 'Use Premium',
        description:
          'After approval, your account shows Premium. Use iLovePDF tools with high limits. Renew annually while enrolled.',
      },
    ],
    nameAr: 'iLovePDF للطلاب',
    taglineAr: 'Premium سنة مجاناً - تحرير ودمج وOCR للـ PDF',
    descriptionAr: 'يمنح iLovePDF الطلاب Premium مجاناً لسنة: تحرير ودمج وضغط وOCR وتوقيع PDF بحدود عالية. يتحقق عبر .edu أو ملف.',
    stepsAr: [
      {
        title: 'قدّم في iLovePDF',
        description: 'اذهب إلى ilovepdf.com/education → "Apply".',
        url: 'https://www.ilovepdf.com/education',
      },
      {
        title: 'تحقق',
        description: 'طالب: أدخل .edu → تلقائي. غير طالب: ارفع بطاقة + خطاب - تقبل CC.',
      },
      {
        title: 'استخدم Premium',
        description: 'بعد الموافقة، يظهر Premium في حسابك. يتجدد سنوياً أثناء الدراسة.',
      },
    ],
    upvotes: 17,
    bookmarks: 20,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o47',
    slug: 'how-to-get-us-community-college-edu',
    name: 'How to Get a US Community College .EDU (American CC Guide)',
    tagline: 'Legit American CC enrollment in 24-72h - unlock 40+ student offers with .edu + ID',
    description:
      'The master guide for non-students: how to legitimately get an accredited US Community College .EDU mailbox + student ID + enrollment letter in 24-72h for ~$0-$60, and which offers on AI Hunt you can then claim. No paid mailbox shop needed.\\n\\n**All colleges below issue .EDU + Microsoft 365 + Canvas + transcript and are accepted by SheerID/GitHub/JetBrains/Adobe. Open-admission, no SAT, online apply in 15 min:**\\n\\n**Texas:** Dallas College (dallascollege.edu) - dallascollege.edu/admissions/application - $0 first semester many students\\n**California (all via OpenCCCApply - home.cccapply.org):** LA City College (lacitycollege.edu), Santa Monica College (smc.edu), Coastline (coastline.edu), Rio Hondo (riohondo.edu), El Camino (elcamino.edu), Pasadena City (pasadena.edu), Glendale (glendale.edu), Cerritos (cerritos.edu), Pierce College (piercecollege.edu), Cypress (cypresscollege.edu), Fullerton (fullcoll.edu), Orange Coast (orangecoastcollege.edu), Irvine Valley (ivc.edu), Saddleback (saddleback.edu), Palomar (palomar.edu), MiraCosta (miracosta.edu), Southwestern (swccd.edu), Berkeley City (berkeleycitycollege.edu/admissions), Diablo Valley (dvc.edu), De Anza (deanza.edu), Foothill (foothill.edu), San Diego City (sdcity.edu), Mt San Antonio (mtsac.edu), Long Beach City (lbcc.edu)\\n**Other states:** Borough of Manhattan CC (bmcc.cuny.edu, NY), LaGuardia CC (laguardia.edu, NY), Houston CC (hccs.edu, TX), Bunker Hill CC (bhcc.edu, MA), Community College of Philadelphia (ccp.edu, PA)\\n\\n**Pick any ONE - you only need one CC to unlock all 40+ offers:** GitHub Pack, Azure $100, AWS Educate $100, Cloudflare Pro, JetBrains, Figma, Notion Plus, Canva, Autodesk, Zed, Gemini, ChatGPT Plus, Cursor, Perplexity, V0, Shodan, Hyperbolic, Consensus, Julius, Microsoft 365, Adobe 60% off, Apple 200GB, MATLAB, Replit, DigitalOcean $200, Namecheap domain, Sketch, YouTube/Amazon Prime, iLovePDF, Craft, Tower, Shapr3D, Mathpix, GoodNotes, Firecrawl, Dify, Kiro, Windsurf, Consensus, and more. Includes SheerID/UNiDAYS/manual file tips to get approved first try.',
    url: 'https://www.dallascollege.edu/admissions/application',
    logoUrl: 'https://icons.duckduckgo.com/ip3/dallascollege.edu.ico',
    category: 'edu',
    tags: ['cc', 'community-college', 'edu', 'american', 'guide', 'how-to', 'sheerid', 'unidays'],
    pricing: 'free',
    steps: [
      {
        title: 'Pick an open-admission CC (no SAT needed) - full list below',
        description:
          'Choose ONE accredited CC from this list - all issue .EDU + Canvas + transcript and are accepted by SheerID/GitHub: Texas: Dallas College (dallascollege.edu/admissions/application) | California OpenCCC (home.cccapply.org): LA City College, Santa Monica College, Coastline, Rio Hondo, El Camino, Pasadena City, Glendale, Cerritos, Pierce, Cypress, Fullerton, Orange Coast, Irvine Valley, Saddleback, Palomar, MiraCosta, Southwestern, Berkeley City, Diablo Valley, De Anza, Foothill, San Diego City, Mt SAC, Long Beach City | Other states: BMCC (bmcc.cuny.edu, NY), LaGuardia (laguardia.edu, NY), Houston CC (hccs.edu, TX), Bunker Hill (bhcc.edu, MA), CCP (ccp.edu, PA). All open-admission, no SAT, online 15-min apply. Copy any college name + “apply” into Google to get direct link, or use Dallas College link below as universal fallback (works for internationals).',
        url: 'https://www.dallascollege.edu/admissions/application',
      },
      {
        title: 'Apply as non-degree / dual-enrollment student (15 min) - IMPORTANT: disable VPN for OpenCCC',
        description:
          'On the CC site click Apply → OpenCCC (California) or Dallas College App. Select “Non-degree / Personal Enrichment”. Use your real name + passport; address can be your home country + US forwarder if asked. No essay needed. ⚠️ OpenCCCApply (home.cccapply.org) BLOCKS VPN/proxy/Tor - you will see “proxy connection detected” error 1775… if you use VPN/anonymizer. Disable VPN, Tor, anonymizing plugins, iCloud Private Relay (Settings → iCloud → Private Relay OFF on iPhone/Mac), and ad-blockers (uBlock/Privacy Badger/AdGuard), use your normal residential IP or mobile data for this step only - try incognito Chrome with no extensions or switch WiFi ↔ mobile data. Maroc Telecom/Orange/Inwi sometimes use transparent proxy that triggers this even without VPN. If you must use VPN (Morocco), pick Dallas College, Houston CC, or BMCC instead - they do NOT use OpenCCC and work fine with VPN.',
      },
      {
        title: 'Enroll in 1 cheap online course ($0-$60)',
        description:
          'After admission (often same day), log into Canvas/myCollege portal and enroll in 1 one-credit online class: e.g., Couns 1, CS 101, Art 101, College Success. Many CCs offer free tuition for first-time or promise-program students; otherwise ~$46/unit in CA = $46 total. You do NOT need to finish - enrollment alone generates proof.',
      },
      {
        title: 'Collect your 3 proofs in 24-72h',
        description:
          'Within 1-3 days you will get: (1) @student.cc.edu Microsoft 365 .EDU mailbox (check myCollege → Email), (2) Student ID (downloadable PDF in portal → Student Services → ID), (3) Enrollment verification letter / class schedule PDF (with name + school + current term + date). Download all as color PDFs - SheerID/GitHub require date within 30 days.',
      },
      {
        title: 'Use the 3 proofs to unlock offers - which ones?',
        description:
          'With one CC enrollment you can claim all these on AI Hunt: EMAIL-ONLY (Notion, Hyperbolic, Dify, Firecrawl, Consensus, Julius, Mathpix, Shodan-email) - just use .EDU mailbox. SHEERID FILE (GitHub Pack, JetBrains, Autodesk, Adobe, Cursor, ChatGPT Plus, Perplexity, Gemini US, YouTube/Amazon Prime) - upload ID + enrollment letter PDF. UNiDAYS (Cloudflare, GoodNotes) - add school in UNiDAYS and verify with file. GitHub Pack then unlocks DigitalOcean $200 + Namecheap .me + Replit 50% automatically. Microsoft 365 appears automatically with your new .EDU. Keep Canvas enrollment active until all verifications pass, then you may drop the class (check refund deadline to keep proof date fresh).',
      },
      {
        title: 'Renew yearly & stay compliant',
        description:
          'All offers are 12 months. Before expiry, re-enroll in another 1-credit course to get a fresh dated letter and re-verify via SheerID/UNiDAYS. Keep your .EDU mailbox active (log in monthly). This is legitimate enrollment - never buy a sold .EDU mailbox (edumailshop etc.) - it can be revoked and violates ToS. Your real transcript is the safest proof.',
      },
    ],
    nameAr: 'كيف تحصل على بريد .EDU من كلية مجتمع أمريكية (دليل CC)',
    taglineAr: 'التسجيل في كلية مجتمع أمريكية معتمدة خلال 24-72 ساعة - افتح 40+ عرض طلابي ببريد .EDU',
    descriptionAr: 'الدليل الشامل لغير الطلاب: كيف تحصل بشكل شرعي على بريد .EDU من كلية مجتمع أمريكية معتمدة + بطاقة طالب + خطاب تسجيل خلال 24-72 ساعة مقابل ~0-60$، وقائمة العروض التي يمكنك فتحها في AI Hunt بذلك التسجيل الواحد. بدون متاجر بريد مدفوعة.\\n\\n**جميع الكليات التالية تعطي .EDU + Microsoft 365 + Canvas + كشف ومقبولة في SheerID/GitHub:**\\n\\nتكساس: Dallas College - dallascollege.edu/admissions/application\\nكاليفورنيا (عبر OpenCCC - home.cccapply.org): LA City College، Santa Monica، Coastline، Rio Hondo، El Camino، Pasadena City، Glendale، Cerritos، Pierce، Cypress، Fullerton، Orange Coast، Irvine Valley، Saddleback، Palomar، MiraCosta، Southwestern، Berkeley City، Diablo Valley، De Anza، Foothill، San Diego City، Mt SAC، Long Beach City\\nولايات أخرى: BMCC بنيويورك، LaGuardia بنيويورك، Houston CC بتكساس، Bunker Hill بماساتشوستس، CCP بفيلادلفيا\\n\\nاختر واحدة فقط - تسجيل واحد يفتح 40+ عرضاً: GitHub Pack، Azure 100$، AWS 100$، Cloudflare Pro، JetBrains، Figma، Notion Plus، Canva، Autodesk، Zed، Gemini، ChatGPT Plus، Cursor، Perplexity، V0، Shodan، Hyperbolic وغيرها.',
    stepsAr: [
      {
        title: 'اختر كلية مفتوحة القبول (بدون SAT) - القائمة الكاملة',
        description: 'اختر واحدة من هذه القائمة - كلها تعطي .EDU ومقبولة: Dallas College، LA City College، Santa Monica، Coastline، Rio Hondo، El Camino، Pasadena City، Glendale، Cerritos، Pierce، Cypress، Fullerton، Orange Coast، Irvine Valley، Saddleback، Palomar، MiraCosta، Southwestern، Berkeley City، Diablo Valley، De Anza، Foothill، San Diego City، Mt SAC، Long Beach City (كاليفورنيا عبر home.cccapply.org) + BMCC و LaGuardia بنيويورك و Houston CC و Bunker Hill و CCP. كلها بدون SAT وتسجيل 15 دقيقة عبر الإنترنت.',
        url: 'https://www.dallascollege.edu/admissions/application',
      },
      {
        title: 'قدّم كطالب غير متفرغ (15 دقيقة) - مهم: عطّل VPN لـ OpenCCC',
        description: 'اضغط Apply → OpenCCC (كاليفورنيا) أو Dallas App. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. ⚠️ OpenCCC يحظر VPN/البروكسي/Tor - ستظهر رسالة "proxy connection detected" خطأ 1775… إذا استخدمت VPN. عطّل VPN/Tor و iCloud Private Relay (الإعدادات → iCloud → إيقاف) والإضافات المجهولة وحجب الإعلانات، واستخدم اتصالك العادي أو بيانات الهاتف - جرّب متصفحاً خاصاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. مزودو المغرب أحياناً يستخدمون بروكسي شفاف يسبب الحظر حتى بدون VPN. إذا كنت مضطراً لاستخدام VPN في المغرب، اختر Dallas College أو Houston CC أو BMCC - لا تستخدم OpenCCC وتعمل مع VPN.',
      },
      {
        title: 'سجّل في مقرر واحد رخيص ($0-$60)',
        description: 'بعد القبول (غالباً نفس اليوم)، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت (Couns 1، CS 101...). كثير من الكليات مجانية للمستجدين وإلا ~46$ للوحدة في كاليفورنيا. لا تحتاج لإنهاء المقرر - التسجيل وحده يولد الإثبات.',
      },
      {
        title: 'اجمع إثباتاتك الثلاثة خلال 24-72 ساعة',
        description: 'ستحصل على: (1) بريد @student.cc.edu عبر Microsoft 365، (2) بطاقة طالب PDF قابلة للتنزيل، (3) خطاب/جدول تسجيل PDF باسمك والمدرسة والتاريخ. حمّلها كملفات ملونة - يطلب SheerID تاريخاً خلال 30 يوماً.',
      },
      {
        title: 'استخدمها لفتح العروض - ما الذي يفتح؟',
        description: 'بتسجيل واحد تفتح: بالبريد فقط (Notion، Hyperbolic، Dify، Firecrawl، Consensus، Julius، Mathpix، Shodan). عبر SheerID بملف (GitHub Pack، JetBrains، Autodesk، Adobe، Cursor، ChatGPT Plus، Perplexity، Gemini أمريكا، YouTube/Amazon). عبر UNiDAYS (Cloudflare، GoodNotes). ثم GitHub Pack يفتح DigitalOcean 200$ + Namecheap .me + Replit 50% تلقائياً.',
      },
      {
        title: 'جدّد سنوياً والتزم',
        description: 'كل العروض 12 شهراً. قبل الانتهاء، سجّل في مقرر واحد جديد للحصول على خطاب بتاريخ جديد وأعد التحقق. حافظ على بريد .EDU نشطاً. هذا تسجيل شرعي - لا تشترِ بريداً مباعاً قد يُسحب وينتهك الشروط.',
      },
    ],
    upvotes: 58,
    bookmarks: 64,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o48',
    slug: 'dallas-college-edu',
    name: 'Dallas College - .EDU Mailbox',
    tagline: 'Dallas College - #1 for internationals, $0 first semester, instant .EDU',
    description:
      'Dallas College (dallascollege.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via college portal. Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.dallascollege.edu/admissions/application',
    logoUrl: 'https://icons.duckduckgo.com/ip3/dallascollege.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'dallascollege', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Dallas College (15 min)',
        description:
          'Go to https://www.dallascollege.edu/admissions/application → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.dallascollege.edu/admissions/application',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.dallascollege.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Dallas كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Dallas College - تسجيل 24-72 ساعة',
    descriptionAr: 'Dallas College (dallascollege.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Dallas College',
        description: 'اذهب إلى https://www.dallascollege.edu/admissions/application → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.dallascollege.edu/admissions/application',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.dallascollege.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o49',
    slug: 'lacc-edu',
    name: 'Los Angeles City College - .EDU Mailbox',
    tagline: 'LACC - OpenCCC, LA district, .EDU + Canvas in 24h',
    description:
      'Los Angeles City College (lacitycollege.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.lacitycollege.edu/Admissions/Apply',
    logoUrl: 'https://icons.duckduckgo.com/ip3/lacitycollege.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'lacitycollege', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Los Angeles City College (15 min)',
        description:
          'Go to https://www.lacitycollege.edu/Admissions/Apply → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.lacitycollege.edu/Admissions/Apply',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.lacitycollege.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Los Angeles City كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Los Angeles City College - تسجيل 24-72 ساعة',
    descriptionAr: 'Los Angeles City College (lacitycollege.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Los Angeles City College',
        description: 'اذهب إلى https://www.lacitycollege.edu/Admissions/Apply → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.lacitycollege.edu/Admissions/Apply',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.lacitycollege.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o50',
    slug: 'smc-edu',
    name: 'Santa Monica College - .EDU Mailbox',
    tagline: 'SMC - top transfer CC, high SheerID acceptance',
    description:
      'Santa Monica College (smc.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.smc.edu/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=smc.edu&sz=64',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'smc', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Santa Monica College (15 min)',
        description:
          'Go to https://www.smc.edu/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.smc.edu/',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.smc.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Santa Monica كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Santa Monica College - تسجيل 24-72 ساعة',
    descriptionAr: 'Santa Monica College (smc.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Santa Monica College',
        description: 'اذهب إلى https://www.smc.edu/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.smc.edu/',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.smc.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o51',
    slug: 'coastline-edu',
    name: 'Coastline College - .EDU Mailbox',
    tagline: 'Coastline - 100% online, .EDU in 24h',
    description:
      'Coastline College (coastline.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.coastline.edu/admissions-aid/apply-now.php',
    logoUrl: 'https://www.google.com/s2/favicons?domain=coastline.edu&sz=64',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'coastline', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Coastline College (15 min)',
        description:
          'Go to https://www.coastline.edu/admissions-aid/apply-now.php → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.coastline.edu/admissions-aid/apply-now.php',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.coastline.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Coastline كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Coastline College - تسجيل 24-72 ساعة',
    descriptionAr: 'Coastline College (coastline.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Coastline College',
        description: 'اذهب إلى https://www.coastline.edu/admissions-aid/apply-now.php → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.coastline.edu/admissions-aid/apply-now.php',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.coastline.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o52',
    slug: 'rio-hondo-edu',
    name: 'Rio Hondo College - .EDU Mailbox',
    tagline: 'Rio Hondo - OpenCCC, low fees, quick ID',
    description:
      'Rio Hondo College (riohondo.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.riohondo.edu/admissions/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/riohondo.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'riohondo', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Rio Hondo College (15 min)',
        description:
          'Go to https://www.riohondo.edu/admissions/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.riohondo.edu/admissions/',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.riohondo.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Rio Hondo كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Rio Hondo College - تسجيل 24-72 ساعة',
    descriptionAr: 'Rio Hondo College (riohondo.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Rio Hondo College',
        description: 'اذهب إلى https://www.riohondo.edu/admissions/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.riohondo.edu/admissions/',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.riohondo.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o53',
    slug: 'el-camino-edu',
    name: 'El Camino College - .EDU Mailbox',
    tagline: 'El Camino - $46/unit, Microsoft 365 .EDU',
    description:
      'El Camino College (elcamino.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.elcamino.edu/admissions/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/www.elcamino.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'elcamino', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to El Camino College (15 min)',
        description:
          'Go to https://www.elcamino.edu/admissions/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.elcamino.edu/admissions/',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.elcamino.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'El Camino كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من El Camino College - تسجيل 24-72 ساعة',
    descriptionAr: 'El Camino College (elcamino.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى El Camino College',
        description: 'اذهب إلى https://www.elcamino.edu/admissions/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.elcamino.edu/admissions/',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.elcamino.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o54',
    slug: 'pasadena-city-edu',
    name: 'Pasadena City College - .EDU Mailbox',
    tagline: 'Pasadena City - large CA CC, auto .EDU',
    description:
      'Pasadena City College (pasadena.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://pasadena.edu/admissions/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/pasadena.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'pasadena', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Pasadena City College (15 min)',
        description:
          'Go to https://pasadena.edu/admissions/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://pasadena.edu/admissions/',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.pasadena.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Pasadena City كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Pasadena City College - تسجيل 24-72 ساعة',
    descriptionAr: 'Pasadena City College (pasadena.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Pasadena City College',
        description: 'اذهب إلى https://pasadena.edu/admissions/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://pasadena.edu/admissions/',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.pasadena.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o55',
    slug: 'glendale-cc-edu',
    name: 'Glendale Community College - .EDU Mailbox',
    tagline: 'Glendale - OpenCCC, fast Canvas access',
    description:
      'Glendale Community College (glendale.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.glendale.edu/apply',
    logoUrl: 'https://www.google.com/s2/favicons?domain=glendale.edu&sz=64',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'glendale', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Glendale Community College (15 min)',
        description:
          'Go to https://www.glendale.edu/apply → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.glendale.edu/apply',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.glendale.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Glendale Community كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Glendale Community College - تسجيل 24-72 ساعة',
    descriptionAr: 'Glendale Community College (glendale.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Glendale Community College',
        description: 'اذهب إلى https://www.glendale.edu/apply → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.glendale.edu/apply',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.glendale.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o56',
    slug: 'cerritos-edu',
    name: 'Cerritos College - .EDU Mailbox',
    tagline: 'Cerritos - $46/unit, SheerID OK',
    description:
      'Cerritos College (cerritos.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.cerritos.edu/admissions/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/www.cerritos.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'cerritos', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Cerritos College (15 min)',
        description:
          'Go to https://www.cerritos.edu/admissions/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.cerritos.edu/admissions/',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.cerritos.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Cerritos كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Cerritos College - تسجيل 24-72 ساعة',
    descriptionAr: 'Cerritos College (cerritos.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Cerritos College',
        description: 'اذهب إلى https://www.cerritos.edu/admissions/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.cerritos.edu/admissions/',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.cerritos.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o57',
    slug: 'pierce-college-edu',
    name: 'Pierce College - .EDU Mailbox',
    tagline: 'Pierce College - LA district, .EDU in 48h',
    description:
      'Pierce College (piercecollege.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.piercecollege.edu/admissions/apply.asp',
    logoUrl: 'https://icons.duckduckgo.com/ip3/piercecollege.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'piercecollege', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Pierce College (15 min)',
        description:
          'Go to https://www.piercecollege.edu/admissions/apply.asp → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.piercecollege.edu/admissions/apply.asp',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.piercecollege.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Pierce كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Pierce College - تسجيل 24-72 ساعة',
    descriptionAr: 'Pierce College (piercecollege.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Pierce College',
        description: 'اذهب إلى https://www.piercecollege.edu/admissions/apply.asp → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.piercecollege.edu/admissions/apply.asp',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.piercecollege.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o58',
    slug: 'cypress-edu',
    name: 'Cypress College - .EDU Mailbox',
    tagline: 'Cypress - North Orange, OpenCCC',
    description:
      'Cypress College (cypresscollege.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.cypresscollege.edu/admissions/apply/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/cypresscollege.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'cypresscollege', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Cypress College (15 min)',
        description:
          'Go to https://www.cypresscollege.edu/admissions/apply/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.cypresscollege.edu/admissions/apply/',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.cypresscollege.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Cypress كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Cypress College - تسجيل 24-72 ساعة',
    descriptionAr: 'Cypress College (cypresscollege.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Cypress College',
        description: 'اذهب إلى https://www.cypresscollege.edu/admissions/apply/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.cypresscollege.edu/admissions/apply/',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.cypresscollege.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o59',
    slug: 'fullerton-edu',
    name: 'Fullerton College - .EDU Mailbox',
    tagline: 'Fullerton - Fullerton, CA, .EDU instant',
    description:
      'Fullerton College (fullerton.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.fullcoll.edu/admissions/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/fullerton.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'fullerton', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Fullerton College (15 min)',
        description:
          'Go to https://www.fullcoll.edu/admissions/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.fullcoll.edu/admissions/',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.fullerton.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Fullerton كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Fullerton College - تسجيل 24-72 ساعة',
    descriptionAr: 'Fullerton College (fullerton.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Fullerton College',
        description: 'اذهب إلى https://www.fullcoll.edu/admissions/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.fullcoll.edu/admissions/',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.fullerton.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o60',
    slug: 'orange-coast-edu',
    name: 'Orange Coast College - .EDU Mailbox',
    tagline: 'OCC - Costa Mesa, large, .EDU',
    description:
      'Orange Coast College (orangecoastcollege.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.orangecoastcollege.edu/admissions',
    logoUrl: 'https://icons.duckduckgo.com/ip3/orangecoastcollege.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'orangecoastcollege', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Orange Coast College (15 min)',
        description:
          'Go to https://www.orangecoastcollege.edu/admissions → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.orangecoastcollege.edu/admissions',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.orangecoastcollege.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Orange Coast كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Orange Coast College - تسجيل 24-72 ساعة',
    descriptionAr: 'Orange Coast College (orangecoastcollege.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Orange Coast College',
        description: 'اذهب إلى https://www.orangecoastcollege.edu/admissions → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.orangecoastcollege.edu/admissions',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.orangecoastcollege.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o61',
    slug: 'ivc-edu',
    name: 'Irvine Valley College - .EDU Mailbox',
    tagline: 'IVC - Irvine, .EDU + transcript PDF',
    description:
      'Irvine Valley College (ivc.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.ivc.edu/admissions/apply',
    logoUrl: 'https://icons.duckduckgo.com/ip3/ivc.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'ivc', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Irvine Valley College (15 min)',
        description:
          'Go to https://www.ivc.edu/admissions/apply → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.ivc.edu/admissions/apply',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.ivc.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Irvine Valley كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Irvine Valley College - تسجيل 24-72 ساعة',
    descriptionAr: 'Irvine Valley College (ivc.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Irvine Valley College',
        description: 'اذهب إلى https://www.ivc.edu/admissions/apply → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.ivc.edu/admissions/apply',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.ivc.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o62',
    slug: 'saddleback-edu',
    name: 'Saddleback College - .EDU Mailbox',
    tagline: 'Saddleback - Mission Viejo, .EDU 24h',
    description:
      'Saddleback College (saddleback.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.saddleback.edu/admissions',
    logoUrl: 'https://www.google.com/s2/favicons?domain=saddleback.edu&sz=64',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'saddleback', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Saddleback College (15 min)',
        description:
          'Go to https://www.saddleback.edu/admissions → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.saddleback.edu/admissions',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.saddleback.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Saddleback كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Saddleback College - تسجيل 24-72 ساعة',
    descriptionAr: 'Saddleback College (saddleback.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Saddleback College',
        description: 'اذهب إلى https://www.saddleback.edu/admissions → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.saddleback.edu/admissions',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.saddleback.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o63',
    slug: 'palomar-edu',
    name: 'Palomar College - .EDU Mailbox',
    tagline: 'Palomar - San Diego area, OpenCCC',
    description:
      'Palomar College (palomar.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.palomar.edu/admissions',
    logoUrl: 'https://icons.duckduckgo.com/ip3/palomar.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'palomar', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Palomar College (15 min)',
        description:
          'Go to https://www.palomar.edu/admissions → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.palomar.edu/admissions',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.palomar.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Palomar كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Palomar College - تسجيل 24-72 ساعة',
    descriptionAr: 'Palomar College (palomar.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Palomar College',
        description: 'اذهب إلى https://www.palomar.edu/admissions → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.palomar.edu/admissions',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.palomar.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o64',
    slug: 'miracosta-edu',
    name: 'MiraCosta College - .EDU Mailbox',
    tagline: 'MiraCosta - Oceanside, .EDU quick',
    description:
      'MiraCosta College (miracosta.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.miracosta.edu/admissions/apply.html',
    logoUrl: 'https://icons.duckduckgo.com/ip3/miracosta.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'miracosta', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to MiraCosta College (15 min)',
        description:
          'Go to https://www.miracosta.edu/admissions/apply.html → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.miracosta.edu/admissions/apply.html',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.miracosta.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'MiraCosta كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من MiraCosta College - تسجيل 24-72 ساعة',
    descriptionAr: 'MiraCosta College (miracosta.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى MiraCosta College',
        description: 'اذهب إلى https://www.miracosta.edu/admissions/apply.html → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.miracosta.edu/admissions/apply.html',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.miracosta.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o65',
    slug: 'southwestern-edu',
    name: 'Southwestern College - .EDU Mailbox',
    tagline: 'Southwestern College - Chula Vista, $46/unit',
    description:
      'Southwestern College (swccd.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.swccd.edu/admissions/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/swccd.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'swccd', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Southwestern College (15 min)',
        description:
          'Go to https://www.swccd.edu/admissions/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.swccd.edu/admissions/',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.swccd.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Southwestern كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Southwestern College - تسجيل 24-72 ساعة',
    descriptionAr: 'Southwestern College (swccd.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Southwestern College',
        description: 'اذهب إلى https://www.swccd.edu/admissions/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.swccd.edu/admissions/',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.swccd.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o66',
    slug: 'berkeley-city-edu',
    name: 'Berkeley City College - .EDU Mailbox',
    tagline: 'Berkeley City - Peralta district, Bay Area .EDU',
    description:
      'Berkeley City College (peralta.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.berkeleycitycollege.edu/admissions/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/peralta.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'peralta', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Berkeley City College (15 min)',
        description:
          'Go to https://www.berkeleycitycollege.edu/admissions/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.berkeleycitycollege.edu/admissions/',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.peralta.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Berkeley City كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Berkeley City College - تسجيل 24-72 ساعة',
    descriptionAr: 'Berkeley City College (peralta.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Berkeley City College',
        description: 'اذهب إلى https://www.berkeleycitycollege.edu/admissions/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.berkeleycitycollege.edu/admissions/',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.peralta.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o67',
    slug: 'dvc-edu',
    name: 'Diablo Valley College - .EDU Mailbox',
    tagline: 'DVC - Pleasant Hill, high GitHub acceptance',
    description:
      'Diablo Valley College (dvc.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.dvc.edu/admissions',
    logoUrl: 'https://icons.duckduckgo.com/ip3/dvc.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'dvc', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Diablo Valley College (15 min)',
        description:
          'Go to https://www.dvc.edu/admissions → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.dvc.edu/admissions',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.dvc.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Diablo Valley كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Diablo Valley College - تسجيل 24-72 ساعة',
    descriptionAr: 'Diablo Valley College (dvc.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Diablo Valley College',
        description: 'اذهب إلى https://www.dvc.edu/admissions → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.dvc.edu/admissions',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.dvc.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o68',
    slug: 'de-anza-edu',
    name: 'De Anza College - .EDU Mailbox',
    tagline: 'De Anza - Cupertino/Silicon Valley, .EDU',
    description:
      'De Anza College (deanza.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.deanza.edu/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/deanza.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'deanza', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to De Anza College (15 min)',
        description:
          'Go to https://www.deanza.edu/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.deanza.edu/',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.deanza.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'De Anza كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من De Anza College - تسجيل 24-72 ساعة',
    descriptionAr: 'De Anza College (deanza.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى De Anza College',
        description: 'اذهب إلى https://www.deanza.edu/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.deanza.edu/',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.deanza.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o69',
    slug: 'foothill-edu',
    name: 'Foothill College - .EDU Mailbox',
    tagline: 'Foothill - Los Altos, .EDU in 24h',
    description:
      'Foothill College (foothill.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.foothill.edu/apply/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/foothill.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'foothill', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Foothill College (15 min)',
        description:
          'Go to https://www.foothill.edu/apply/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.foothill.edu/apply/',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.foothill.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Foothill كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Foothill College - تسجيل 24-72 ساعة',
    descriptionAr: 'Foothill College (foothill.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Foothill College',
        description: 'اذهب إلى https://www.foothill.edu/apply/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.foothill.edu/apply/',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.foothill.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o70',
    slug: 'sdcity-edu',
    name: 'San Diego City College - .EDU Mailbox',
    tagline: 'SD City College - San Diego, .EDU',
    description:
      'San Diego City College (sdcity.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via OpenCCCApply (home.cccapply.org). Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.sdcity.edu/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=sdcity.edu&sz=64',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'sdcity', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to San Diego City College (15 min)',
        description:
          'Go to https://www.sdcity.edu/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.sdcity.edu/',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.sdcity.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'San Diego City كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من San Diego City College - تسجيل 24-72 ساعة',
    descriptionAr: 'San Diego City College (sdcity.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى San Diego City College',
        description: 'اذهب إلى https://www.sdcity.edu/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.sdcity.edu/',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.sdcity.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o71',
    slug: 'bmcc-edu',
    name: 'Borough of Manhattan CC - .EDU Mailbox',
    tagline: 'BMCC - CUNY New York, .EDU for GitHub/Azure',
    description:
      'Borough of Manhattan CC (bmcc.cuny.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via college portal. Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.bmcc.cuny.edu/admissions/apply/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/cuny.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'bmcc', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Borough of Manhattan CC (15 min)',
        description:
          'Go to https://www.bmcc.cuny.edu/admissions/apply/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.bmcc.cuny.edu/admissions/apply/',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.bmcc.cuny.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'كلية مانهاتن - بريد .EDU',
    taglineAr: 'بريد .EDU من Borough of Manhattan CC - تسجيل 24-72 ساعة',
    descriptionAr: 'Borough of Manhattan CC (bmcc.cuny.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Borough of Manhattan CC',
        description: 'اذهب إلى https://www.bmcc.cuny.edu/admissions/apply/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.bmcc.cuny.edu/admissions/apply/',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.bmcc.cuny.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o72',
    slug: 'hcc-edu',
    name: 'Houston Community College - .EDU Mailbox',
    tagline: 'HCC - Houston, TX, .EDU + Canvas',
    description:
      'Houston Community College (hccs.edu) is an accredited US community college offering instant .EDU Microsoft 365 mailbox + Canvas portal + official enrollment letter/ID for ~$0-$46. Open-admission (no SAT), 15-min online apply via college portal. Once enrolled in 1 online course (e.g., Couns 1), you get .EDU within 24-72h and can unlock 40+ offers on AI Hunt: GitHub Pack, Azure $100, AWS $100, Cloudflare, JetBrains, Figma, Notion, Autodesk, Gemini, ChatGPT Plus, etc. See master guide o47 for full unlock list.',
    url: 'https://www.hccs.edu/applying-and-paying/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/hccs.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'hccs', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Houston Community College (15 min)',
        description:
          'Go to https://www.hccs.edu/applying-and-paying/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://www.hccs.edu/applying-and-paying/',
      },
      {
        title: 'Enroll in 1 online course ($0-$46)',
        description:
          'After admission (often same day), log into Canvas and enroll in 1 one-credit online course (College Success/Couns 1). Many offer free first semester; otherwise ~$46 in CA. You do NOT need to finish - enrollment generates proof.',
      },
      {
        title: 'Collect .EDU + ID + letter in 24-72h',
        description:
          'Check portal → Email for @student.hccs.edu mailbox, Student Services → download ID PDF, and Enrollment Verification / Schedule PDF (name + school + current date). Save as color PDFs.',
      },
      {
        title: 'Unlock 40+ offers with that proof',
        description:
          'Use .EDU mailbox for Notion/Hyperbolic/Dify; upload ID + letter PDF to SheerID for GitHub Pack/JetBrains/Autodesk/Adobe/Cursor/ChatGPT/Gemini/YouTube; verify via UNiDAYS for Cloudflare/GoodNotes. See o47 guide for full list. Keep enrollment active until verified.',
      },
    ],
    nameAr: 'Houston Community كلية - بريد .EDU',
    taglineAr: 'بريد .EDU من Houston Community College - تسجيل 24-72 ساعة',
    descriptionAr: 'Houston Community College (hccs.edu) كلية مجتمع أمريكية معتمدة تعطي بريد .EDU عبر Microsoft 365 + Canvas + خطاب تسجيل رسمي مقابل ~0-46$. قبول مفتوح بدون SAT وتسجيل 15 دقيقة عبر OpenCCC. بعد التسجيل في مقرر واحد تحصل على .EDU خلال 24-72 ساعة وتفتح 40+ عرضاً في AI Hunt (GitHub Pack، Azure، AWS، JetBrains...). راجع الدليل o47 للقائمة الكاملة.',
    stepsAr: [
      {
        title: 'قدّم إلى Houston Community College',
        description: 'اذهب إلى https://www.hccs.edu/applying-and-paying/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://www.hccs.edu/applying-and-paying/',
      },
      {
        title: 'سجّل في مقرر واحد ($0-$46)',
        description: 'بعد القبول، ادخل Canvas وسجّل في مقرر واحد عبر الإنترنت. كثير من الكليات مجانية وإلا ~46$. لا تحتاج لإنهائه.',
      },
      {
        title: 'اجمع .EDU والهوية والخطاب خلال 24-72 ساعة',
        description: 'تحقق من البوابة → بريد @student.hccs.edu + بطاقة طالب PDF + خطاب تسجيل بتاريخ حديث. احفظها كملفات ملونة.',
      },
      {
        title: 'افتح 40+ عرضاً بذلك الإثبات',
        description: 'استخدم البريد لـ Notion وغيرها؛ ارفع البطاقة والخطاب إلى SheerID لـ GitHub/JetBrains/Adobe؛ و UNiDAYS لـ Cloudflare. راجع الدليل o47.',
      },
    ],
    upvotes: 12,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },

  {
    id: 'o73',
    slug: 'huggingface-student',
    name: 'Hugging Face Student',
    tagline: 'Pro free for students - private models + $100 inference credits',
    description:
      'Hugging Face gives verified students free Pro (normally $9/mo): unlimited private models/datasets, Inference Endpoints, and $100 credits for Serverless Inference API. Verifies via .edu email. Non-students can get it with any CC .EDU mailbox (email-only).',
    url: 'https://huggingface.co/join',
    logoUrl: 'https://icons.duckduckgo.com/ip3/huggingface.co.ico',
    category: 'api-access',
    tags: ['huggingface', 'students', 'inference', 'models', 'api'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign up with .EDU',
        description:
          'Go to huggingface.co/join → Sign up with .EDU email. STUDENT: use school .EDU. NON-STUDENT: use CC .EDU mailbox - email domain only.',
        url: 'https://huggingface.co/join',
      },
      {
        title: 'Apply for Student Pro',
        description:
          'In Settings → Billing → “Student Program” → Verify. Hugging Face auto-detects .EDU domains and upgrades to Pro within hours.',
      },
      {
        title: 'Use Pro + credits',
        description:
          'Create private repos, deploy Inference Endpoints, call Serverless Inference API at huggingface.co/docs/inference. $100 credits appear in Billing.',
      },
    ],
    nameAr: 'Hugging Face للطلاب',
    taglineAr: 'Pro مجاناً للطلاب - نماذج خاصة + 100$ رصيد استدلال',
    descriptionAr: 'يمنح Hugging Face الطلاب Pro مجاناً: نماذج ومجموعات بيانات خاصة غير محدودة و $100 رصيد لـ Serverless Inference. يتحقق ببريد .EDU فقط.',
    stepsAr: [
      {
        title: 'سجّل ببريد .EDU',
        description: 'اذهب إلى huggingface.co/join وسجّل ببريد .EDU (CC يعمل لغير الطلاب).',
        url: 'https://huggingface.co/join',
      },
      {
        title: 'اطلب Pro للطلاب',
        description: 'الإعدادات → الفوترة → "Student Program" → يترقى تلقائياً للنطاقات .EDU.',
      },
      {
        title: 'استخدم Pro والرصيد',
        description: 'أنشئ مستودعات خاصة واستدعِ واجهة الاستدلال - يظهر الرصيد 100$ في الفوترة.',
      },
    ],
    upvotes: 18,
    bookmarks: 22,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o74',
    slug: 'openrouter-student',
    name: 'OpenRouter Student',
    tagline: '$25 credit + free tier for 200+ LLMs via one API',
    description:
      'OpenRouter gives students $25 credit plus permanent free tier for 200+ LLMs (GPT-4o, Claude 3.5, Gemini, Llama) via OpenAI-compatible API. Verifies via .EDU email. Non-students can get it with CC .EDU mailbox (email-only).',
    url: 'https://openrouter.ai/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/openrouter.ai.ico',
    category: 'api-access',
    tags: ['openrouter', 'api', 'llm', 'students', 'credits'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign up with .EDU',
        description:
          'Visit openrouter.ai → Sign up with .EDU email. NON-STUDENT: use CC .EDU mailbox.',
        url: 'https://openrouter.ai/',
      },
      {
        title: 'Claim student credit',
        description:
          'Go to Credits → “Student Program” → Enter .EDU - $25 auto-applies. Check Dashboard → Credits.',
      },
      {
        title: 'Call the unified API',
        description:
          'Use https://openrouter.ai/api/v1 with your key, model “openai/gpt-4o” or “anthropic/claude-3.5-sonnet”. Free models remain free after credit.',
      },
    ],
    nameAr: 'OpenRouter للطلاب',
    taglineAr: '25$ رصيد + طبقة مجانية لـ 200+ نموذج عبر API واحد',
    descriptionAr: 'يمنح OpenRouter الطلاب 25$ رصيداً وطبقة مجانية دائمة لـ 200+ نموذج عبر واجهة OpenAI متوافقة. يتحقق ببريد .EDU فقط.',
    stepsAr: [
      {
        title: 'سجّل ببريد .EDU',
        description: 'اذهب إلى openrouter.ai وسجّل ببريد .EDU.',
        url: 'https://openrouter.ai/',
      },
      {
        title: 'اطلب رصيد الطلاب',
        description: 'الرصيد → "Student Program" → أدخل .EDU - يُضاف 25$ تلقائياً.',
      },
      {
        title: 'استدعِ API الموحد',
        description: 'استخدم https://openrouter.ai/api/v1 بمفتاحك ونموذج openai/gpt-4o.',
      },
    ],
    upvotes: 16,
    bookmarks: 19,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o75',
    slug: 'replicate-student',
    name: 'Replicate Student',
    tagline: 'Pay-per-second open-model API with student discounts - SDXL, Llama, Whisper',
    description:
      'Replicate runs SDXL, Llama 3, Whisper, and 1000+ open models pay-per-second via API - check their education discount with .EDU email or GitHub Student. Non-students can get it via CC .EDU mailbox or GitHub Pack file.',
    url: 'https://replicate.com/pricing',
    logoUrl: 'https://icons.duckduckgo.com/ip3/replicate.com.ico',
    category: 'api-access',
    tags: ['replicate', 'api', 'sdxl', 'llama', 'students'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign up with .EDU or GitHub Student',
        description:
          'Go to Replicate pricing → Sign up with .EDU email or link GitHub already approved for Pack.',
        url: 'https://replicate.com/pricing',
      },
      {
        title: 'Claim student discount',
        description:
          'After verification, check Billing → Credits for any student credit. No card required for the free tier.',
      },
      {
        title: 'Run models via API',
        description:
          'Use replicate API at api.replicate.com/v1/predictions with your token. Pay per second after credit.',
      },
    ],
    nameAr: 'Replicate للطلاب',
    taglineAr: 'واجهة النماذج المفتوحة بالدفع حسب الاستعمال مع خصم طلابي',
    descriptionAr: 'يشغّل Replicate نماذج SDXL و Llama 3 وأكثر من 1000 نموذج عبر API - تحقق من خصم التعليم ببريد .EDU.',
    stepsAr: [
      {
        title: 'سجّل ببريد .EDU أو GitHub',
        description: 'اذهب إلى صفحة الأسعار وسجّل ببريد .EDU أو اربط GitHub.',
        url: 'https://replicate.com/pricing',
      },
      {
        title: 'اطلب 50$',
        description: 'بعد التحقق، الفوترة → Credits → يظهر 50$.',
      },
      {
        title: 'شغّل النماذج عبر API',
        description: 'استخدم api.replicate.com/v1/predictions برمزك.',
      },
    ],
    upvotes: 15,
    bookmarks: 18,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o76',
    slug: 'supabase-student',
    name: 'Supabase Student',
    tagline: 'Free-tier Postgres/Auth + student discounts via .EDU',
    description:
      'Supabase offers a generous free tier plus student discounts: hosted Postgres, Auth, Storage, and Realtime. Check their education pricing with .EDU email. Non-students can start free with any email.',
    url: 'https://supabase.com/pricing',
    logoUrl: 'https://icons.duckduckgo.com/ip3/supabase.com.ico',
    category: 'api-access',
    tags: ['supabase', 'postgres', 'students', 'backend', 'credits'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign up with .EDU',
        description:
          'Visit Supabase pricing → Sign up. Students: check education discounts with .EDU email.',
        url: 'https://supabase.com/pricing',
      },
      {
        title: 'Create project',
        description:
          'Create a Supabase project → Settings → Billing to see credits and free-tier limits.',
      },
      {
        title: 'Build with free tier',
        description:
          'Use Postgres, Auth, and Storage free. Credits cover overages after free limits.',
      },
    ],
    nameAr: 'Supabase للطلاب',
    taglineAr: 'Postgres مجاني + خصومات طلابية ببريد .EDU',
    descriptionAr: 'يقدم Supabase طبقة مجانية سخية وخصومات طلابية: Postgres و Auth و Storage. تحقق من أسعار التعليم ببريد .EDU.',
    stepsAr: [
      {
        title: 'سجّل ببريد .EDU',
        description: 'اذهب لصفحة الأسعار وسجّل - تحقق من خصومات التعليم.',
        url: 'https://supabase.com/pricing',
      },
      {
        title: 'أنشئ مشروعاً',
        description: 'أنشئ مشروعاً → الإعدادات → الفوترة لرؤية الأرصدة والحدود المجانية.',
      },
      {
        title: 'ابنِ بالطبقة المجانية',
        description: 'استخدم Postgres و Auth مجاناً - الرصيد يغطي التجاوز.',
      },
    ],
    upvotes: 14,
    bookmarks: 17,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o77',
    slug: 'mongodb-atlas-student',
    name: 'MongoDB Atlas Student',
    tagline: '$50 Atlas credit + free 512MB cluster via GitHub Pack',
    description:
      'MongoDB Atlas via GitHub Student Pack: $50 credit for Atlas + free 512MB shared cluster forever. Verifies via GitHub Student linkage - get Pack first via CC file (o9), then claim.',
    url: 'https://www.mongodb.com/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/mongodb.com.ico',
    category: 'api-access',
    tags: ['mongodb', 'atlas', 'students', 'database', 'credits'],
    pricing: 'free',
    steps: [
      {
        title: 'Get GitHub Student Pack first',
        description:
          'Follow o9 to get Pack approved (via .EDU or CC file). Atlas credit is inside the pack.',
        url: 'https://education.github.com/pack',
      },
      {
        title: 'Claim on MongoDB',
        description:
          'In GitHub Pack → MongoDB → “Get access” → redirected to mongodb.com where $50 promo auto-applies. Create Atlas account with same email.',
      },
      {
        title: 'Deploy free cluster',
        description:
          'Create a free 512MB Atlas cluster - credit burns only for larger clusters. Free cluster stays forever.',
      },
    ],
    nameAr: 'MongoDB Atlas للطلاب',
    taglineAr: 'رصيد 50$ + عنقود 512MB مجاناً عبر GitHub Pack',
    descriptionAr: 'MongoDB Atlas عبر GitHub Pack: رصيد 50$ وعنقود 512MB مجاني للأبد. يتحقق عبر ربط GitHub Student.',
    stepsAr: [
      {
        title: 'احصل على GitHub Pack أولاً',
        description: 'اتبع o9 للحصول على الموافقة.',
        url: 'https://education.github.com/pack',
      },
      {
        title: 'اطلب في MongoDB',
        description: 'GitHub Pack → MongoDB → "Get access" → يُطبق الرمز تلقائياً.',
      },
      {
        title: 'أنشئ عنقوداً مجانياً',
        description: 'أنشئ عنقود 512MB مجاني - الرصيد للعناقيد الأكبر فقط.',
      },
    ],
    upvotes: 13,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o78',
    slug: 'vercel-pro-student',
    name: 'Vercel Pro Student',
    tagline: 'Pro features + $100 credit for students via GitHub Pack/.EDU',
    description:
      'Vercel gives students Pro-like features and $100 credit via GitHub Student Pack or .EDU: hobby deployments with higher limits, analytics, and team seats. Verifies via GitHub Pack linkage or .EDU email.',
    url: 'https://vercel.com/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/vercel.com.ico',
    category: 'tool',
    tags: ['vercel', 'hosting', 'students', 'nextjs', 'credits'],
    pricing: 'free',
    steps: [
      {
        title: 'Link GitHub Student or .EDU',
        description:
          'Go to vercel.com/students → Sign in with GitHub already approved for Pack, or verify with .EDU email.',
        url: 'https://vercel.com/students',
      },
      {
        title: 'Claim Pro credit',
        description:
          'After verification, check Billing → Credits → $100 appears for .EDU/GitHub Pack accounts.',
      },
      {
        title: 'Deploy with Pro limits',
        description:
          'Deploy Next.js app → Pro bandwidth/edge limits apply while student status active.',
      },
    ],
    nameAr: 'Vercel Pro للطلاب',
    taglineAr: 'مزايا Pro + رصيد 100$ للطلاب',
    descriptionAr: 'يمنح Vercel الطلاب مزايا Pro ورصيد 100$ عبر GitHub Pack أو .EDU: نشر بحدود أعلى وتحليلات.',
    stepsAr: [
      {
        title: 'اربط GitHub أو .EDU',
        description: 'اذهب إلى vercel.com/students وسجّل بحساب GitHub الموافق عليه أو بريد .EDU.',
        url: 'https://vercel.com/students',
      },
      {
        title: 'اطلب رصيد Pro',
        description: 'بعد التحقق، الفوترة → Credits → يظهر 100$.',
      },
      {
        title: 'انشر بحدود Pro',
        description: 'انشر تطبيق Next.js - تطبق حدود Pro أثناء حالة الطالب.',
      },
    ],
    upvotes: 15,
    bookmarks: 18,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o79',
    slug: '1password-student',
    name: '1Password Student',
    tagline: '1 year free Families (5 accounts) via GitHub Pack',
    description:
      '1Password via GitHub Student Pack: 1 year free Families plan (5 accounts, vaults, 1GB storage). Verifies via GitHub Student linkage - get Pack first via CC file (o9).',
    url: 'https://1password.com/developers/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/1password.com.ico',
    category: 'tool',
    tags: ['1password', 'security', 'students', 'vault', 'github-pack'],
    pricing: 'free',
    steps: [
      {
        title: 'Get GitHub Pack first',
        description:
          'Follow o9 to get Pack approved.',
        url: 'https://education.github.com/pack',
      },
      {
        title: 'Claim on 1Password',
        description:
          'GitHub Pack → 1Password → “Get access” → Create 1Password Families account with same email → 1yr free auto-applies.',
      },
      {
        title: 'Invite family',
        description:
          'Invite 4 family members to vaults. Renew yearly while Pack active.',
      },
    ],
    nameAr: '1Password للطلاب',
    taglineAr: 'سنة مجانية لعائلة (5 حسابات) عبر GitHub Pack',
    descriptionAr: '1Password عبر GitHub Pack: سنة مجانية لخطة العائلة (5 حسابات، خزائن، 1GB). يتحقق عبر ربط GitHub Student.',
    stepsAr: [
      {
        title: 'احصل على GitHub Pack أولاً',
        description: 'اتبع o9 للحصول على الموافقة.',
        url: 'https://education.github.com/pack',
      },
      {
        title: 'اطلب في 1Password',
        description: 'GitHub Pack → 1Password → "Get access" → أنشئ حساب عائلة.',
      },
      {
        title: 'ادعُ العائلة',
        description: 'ادعُ 4 أفراد للخزائن - يتجدد سنوياً أثناء نشاط Pack.',
      },
    ],
    upvotes: 12,
    bookmarks: 15,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o80',
    slug: 'miro-education',
    name: 'Miro Education',
    tagline: 'Free Education plan (100+ boards, AI) via .EDU/file',
    description:
      'Miro gives verified students free Education plan: 100+ boards, Miro AI, and team workspaces. Verifies via school email or file (ID + enrollment). Non-students can qualify with CC enrollment + file proof.',
    url: 'https://miro.com/education/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/miro.com.ico',
    category: 'tool',
    tags: ['miro', 'whiteboard', 'students', 'collaboration', 'ai'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply at Miro Education',
        description:
          'Visit miro.com/education/ → “Apply for free Education”.',
        url: 'https://miro.com/education/',
      },
      {
        title: 'Verify',
        description:
          'STUDENT: .EDU email → auto. NON-STUDENT: “No school email” → upload student ID + enrollment letter. CC accepted, 1-3 day review.',
      },
      {
        title: 'Create Education team',
        description:
          'After approval, create Education team - 100+ boards unlock. Invite classmates.',
      },
    ],
    nameAr: 'Miro للتعليم',
    taglineAr: 'خطة تعليم مجانية (100+ لوحة، AI)',
    descriptionAr: 'يمنح Miro الطلاب خطة تعليم مجانية: 100+ لوحة و Miro AI ومساحات فريق. يتحقق عبر بريد أو ملف.',
    stepsAr: [
      {
        title: 'قدّم في Miro للتعليم',
        description: 'اذهب إلى miro.com/education/ → "Apply".',
        url: 'https://miro.com/education/',
      },
      {
        title: 'تحقق',
        description: 'طالب: .EDU → تلقائي. غير طالب: ارفع بطاقة + خطاب - تقبل CC.',
      },
      {
        title: 'أنشئ فريق التعليم',
        description: 'بعد الموافقة، أنشئ فريقاً - تفتح 100+ لوحة.',
      },
    ],
    upvotes: 11,
    bookmarks: 14,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o81',
    slug: 'linear-for-students',
    name: 'Linear for Students',
    tagline: 'Free Standard for 1 year via .EDU - issue tracking for teams',
    description:
      'Linear gives verified students free Standard for 1 year: unlimited issues, cycles, and integrations. Verifies via .EDU email. Non-students can get it with CC .EDU mailbox (email-only).',
    url: 'https://linear.app/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/linear.app.ico',
    category: 'tool',
    tags: ['linear', 'project-management', 'students', 'tracking', 'team'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign up with .EDU',
        description:
          'Visit linear.app/students → Sign up with .EDU email. NON-STUDENT: use CC .EDU mailbox.',
        url: 'https://linear.app/students',
      },
      {
        title: 'Create workspace and verify',
        description:
          'Create Linear workspace → Settings → Billing → “Student” → auto-verifies for .EDU domains.',
      },
      {
        title: 'Track issues',
        description:
          'Invite team and use Standard features for 1 year. Renew with fresh .EDU.',
      },
    ],
    nameAr: 'Linear للطلاب',
    taglineAr: 'Standard مجاناً لسنة - تتبع مهام الفرق',
    descriptionAr: 'يمنح Linear الطلاب Standard مجاناً لسنة: مهام ودورات وتكامل غير محدود. يتحقق ببريد .EDU فقط.',
    stepsAr: [
      {
        title: 'سجّل ببريد .EDU',
        description: 'اذهب إلى linear.app/students وسجّل ببريد .EDU.',
        url: 'https://linear.app/students',
      },
      {
        title: 'أنشئ مساحة وتحقق',
        description: 'أنشئ مساحة → الإعدادات → الفوترة → "Student" → يتحقق تلقائياً.',
      },
      {
        title: 'تتبع المهام',
        description: 'ادعُ الفريق واستخدم مزايا Standard لسنة.',
      },
    ],
    upvotes: 10,
    bookmarks: 13,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o82',
    slug: 'warp-terminal-student',
    name: 'Warp Terminal Student',
    tagline: 'AI-powered terminal free to start - students onboard free',
    description:
      'Warp is an AI-powered terminal free to start: AI command search, themes, and team sharing with a free plan for everyone including students. Download, sign up, and build - no student verification needed.',
    url: 'https://www.warp.dev',
    logoUrl: 'https://icons.duckduckgo.com/ip3/warp.dev.ico',
    category: 'tool',
    tags: ['warp', 'terminal', 'students', 'ai', 'productivity'],
    pricing: 'free',
    steps: [
      {
        title: 'Download Warp and sign up',
        description:
          'Visit warp.dev → Download Warp → Sign up free with any email - students included.',
        url: 'https://www.warp.dev',
      },
      {
        title: 'Use the free plan',
        description:
          'The free plan covers AI command search, themes, and sharing - no verification needed.',
      },
      {
        title: 'Upgrade only if needed',
        description:
          'Paid tiers add higher AI limits; compare on the pricing page if you outgrow free.',
      },
    ],
    nameAr: 'Warp للطلاب',
    taglineAr: 'طرفية ذكية مجانية للبدء - للطلاب أيضاً',
    descriptionAr: 'طرفية Warp الذكية مجانية للبدء: بحث أوامر AI وثيمات ومشاركة فريق بخطة مجانية للجميع بما فيهم الطلاب.',
    stepsAr: [
      {
        title: 'حمّل Warp وسجّل',
        description: 'اذهب إلى warp.dev → حمّل وسجّل مجاناً بأي بريد.',
        url: 'https://www.warp.dev',
      },
      {
        title: 'تحقق',
        description: 'اضغط Verify → بريد .EDU أو GitHub Student.',
      },
      {
        title: 'فعّل Pro',
        description: 'بعد التحقق، الإعدادات → الاشتراك يظهر Pro.',
      },
    ],
    upvotes: 12,
    bookmarks: 15,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },

  {
    id: 'o83',
    slug: 'revenuecat-shipaton-2026',
    name: 'RevenueCat Shipaton 2026',
    tagline: '$740k cash + Times Square billboard + NYC trip - ship apps with RevenueCat',
    description:
      'RevenueCat global hackathon Aug 1-Sep 30, 2026: ship an iOS/Android/macOS app using RevenueCat SDK for at least one purchase. $740k cash, $1M+ total including sponsor prizes. Grand $100k + NYC Shippies red carpet + Times Square billboard + 9to5Mac press. Category 1sts $20k-$30k. Student-only Next Gen category requires no App Store release. Sponsors: Replit, OneSignal, JetBrains, Stripe, Samsung.',
    url: 'https://revenuecat-shipaton-2026.devpost.com/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/devpost.com.ico',
    category: 'forstartups',
    tags: ['hackathon', 'revenuecat', 'apps', 'prizes', 'shipaton'],
    pricing: 'free',
    steps: [
      {
        title: 'Create Devpost and join hackathon',
        description:
          'Go to revenuecat-shipaton-2026.devpost.com → Join hackathon. Create/reuse RevenueCat account.',
        url: 'https://revenuecat-shipaton-2026.devpost.com/',
      },
      {
        title: 'Build app with RevenueCat SDK (Aug 1-Sep 30)',
        description:
          'Build iOS/iPadOS/macOS/Android app with at least one RevenueCat purchase. First public version must be released in the window. Use sponsors: Replit, Stripe, etc. for bonus categories.',
      },
      {
        title: 'Ship and submit with traction story',
        description:
          'Submit on Devpost with App Store/TestFlight link + video + description of post-release growth tactics. Grand Prize judges traction/growth momentum, not just code.',
      },
      {
        title: 'Judging and Shippies NYC',
        description:
          'Winners get $100k + Times Square billboard + NYC trip. Student Next Gen needs only video + open-source code (no store release).',
      },
    ],
    nameAr: 'RevenueCat Shipaton 2026',
    taglineAr: '740 ألف $ + لوحة Times Square + رحلة نيويورك - أطلق تطبيقاتك',
    descriptionAr: 'هاكاثون عالمي 1 أغسطس - 30 سبتمبر 2026: أطلق تطبيق iOS/Android باستخدام RevenueCat SDK. جوائز 740 ألف $ نقداً وأكثر من مليون إجمالي، الجائزة الكبرى 100 ألف $ + نيويورك + Times Square.',
    stepsAr: [
      {
        title: 'أنشئ حساب Devpost وانضم',
        description: 'اذهب إلى revenuecat-shipaton-2026.devpost.com → انضم.',
        url: 'https://revenuecat-shipaton-2026.devpost.com/',
      },
      {
        title: 'ابنِ تطبيقاً بـ RevenueCat SDK',
        description: 'ابنِ تطبيقاً مع عملية شراء واحدة على الأقل عبر RevenueCat. الإصدار الأول يجب أن يكون ضمن الفترة.',
      },
      {
        title: 'أطلق وقدّم قصة النمو',
        description: 'قدّم رابط المتجر + فيديو + كيف روّجت للتطبيق بعد الإطلاق.',
      },
      {
        title: 'التحكيم وحفل نيويورك',
        description: 'الفائزون يحصلون على 100 ألف $ و Times Square. فئة الطلاب لا تتطلب نشراً في المتجر.',
      },
    ],
    upvotes: 22,
    bookmarks: 28,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o84',
    slug: 'xprize-build-with-gemini',
    name: 'XPRIZE Build with Gemini',
    tagline: '$2M with Google - build AI businesses with real users & revenue',
    description:
      'XPRIZE + Google $2M hackathon May 19-Aug 17, 2026: build AI business in 5 categories (Education, Entrepreneurship, Small Business, Financial Access, Professional Services). Grand $500k, 2nd $200k, 3×$100k, 15×$50k runner + 5×$50k category. Judged on business viability, AI-native ops, impact. Must launch real business with real users/revenue in 90 days. Finals Sep 25 LA.',
    url: 'https://www.geminixprize.com/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/xprize.org.ico',
    category: 'forstartups',
    tags: ['xprize', 'gemini', 'hackathon', 'google', '2m'],
    pricing: 'free',
    steps: [
      {
        title: 'Register on XPRIZE',
        description:
          'Go to geminixprize.com → Register. Open worldwide.',
        url: 'https://www.geminixprize.com/',
      },
      {
        title: 'Build 90 days with real traction',
        description:
          'May 19-Aug 17 build: launch business, acquire users, generate revenue. Projections alone fail - need real traction.',
      },
      {
        title: 'Submit and Hacker Fund screen',
        description:
          'Submit by Aug 17. Hacker Fund screens/verify, then expert panel selects 5 finalists for live final Sep 25 in LA.',
      },
    ],
    nameAr: 'XPRIZE ابنِ مع Gemini',
    taglineAr: 'مليونا $ مع جوجل - ابنِ شركات ذكاء اصطناعي بمستخدمين حقيقيين',
    descriptionAr: 'هاكاثون XPRIZE وجوجل 2 مليون $ من 19 مايو إلى 17 أغسطس 2026: ابنِ شركة ذكاء اصطناعي في 5 فئات. الجائزة الكبرى 500 ألف $.',
    stepsAr: [
      {
        title: 'سجّل في XPRIZE',
        description: 'اذهب إلى geminixprize.com وسجّل.',
        url: 'https://www.geminixprize.com/',
      },
      {
        title: 'ابنِ 90 يوماً بزخم حقيقي',
        description: 'أطلق عملاً واحصل على مستخدمين وإيرادات حقيقية - التوقعات وحدها لا تكفي.',
      },
      {
        title: 'قدّم وانتظر النهائي في LA',
        description: 'آخر موعد 17 أغسطس، النهائي 25 سبتمبر في لوس أنجلوس.',
      },
    ],
    upvotes: 18,
    bookmarks: 22,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o85',
    slug: 'treehacks-2026',
    name: 'TreeHacks 2026',
    tagline: '$1,030,875 at Stanford - largest US collegiate hackathon',
    description:
      'Stanford TreeHacks Feb 14-15, 2026 - invite-only collegiate, $1,030,875 pool. YC interview, OpenAI lunch + 1yr ChatGPT Pro, Anthropic/Modal credits, Human Capital $50k per member (up to $200k), Cloudflare $250k credits, HeyGen, etc. Invite via application.',
    url: 'https://treehacks-2026.devpost.com/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/devpost.com.ico',
    category: 'forstartups',
    tags: ['treehacks', 'stanford', 'hackathon', 'collegiate', '1m'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply for invite (Stanford)',
        description:
          'Go to treehacks-2026.devpost.com → Apply. Invite-only, collegiate ID required.',
        url: 'https://treehacks-2026.devpost.com/',
      },
      {
        title: 'Hack Feb 14-15 at Stanford',
        description:
          'Onsite 36h. Tracks: OpenAI AI, Anthropic Human Flourishing, Modal Inference, YC Iconic Company, etc.',
      },
      {
        title: 'Demo and win',
        description:
          'Present to judges - YC 1st gets guaranteed interview, 2nd/3rd office hours. Human Capital fellowship $50k per member.',
      },
    ],
    nameAr: 'TreeHacks 2026',
    taglineAr: '1,030,875$ في ستانفورد - أكبر هاكاثون جامعي أمريكي',
    descriptionAr: 'هاكاثون ستانفورد 14-15 فبراير 2026 بدعوة فقط - جوائز أكثر من مليون $. مقابلة YC مضمونة.',
    stepsAr: [
      {
        title: 'قدّم للحصول على دعوة',
        description: 'اذهب إلى treehacks-2026.devpost.com وقدّم.',
        url: 'https://treehacks-2026.devpost.com/',
      },
      {
        title: 'شارك في 14-15 فبراير بستانفورد',
        description: '36 ساعة حضورياً - مسارات OpenAI و Anthropic و YC.',
      },
      {
        title: 'اعرض مشروعك',
        description: 'الفائز الأول يحصل على مقابلة YC مضمونة.',
      },
    ],
    upvotes: 15,
    bookmarks: 18,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o86',
    slug: 'sui-overflow-2026',
    name: 'Sui Overflow 2026',
    tagline: 'Virtual global hackathon - $30k per track + $70k pools',
    description:
      'Sui Overflow virtual 2026: build AI agents, DeFi/payments, DeepBook, EVE on Sui. Per track $30k 1st/$15k 2nd/$10k 3rd/$7.5k 4th + specialized $70k/$50k pools. Global online.',
    url: 'https://overflow.sui.io/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/sui.io.ico',
    category: 'forstartups',
    tags: ['sui', 'hackathon', 'web3', 'agents', 'defi'],
    pricing: 'free',
    steps: [
      {
        title: 'Register on Sui Overflow',
        description:
          'Go to overflow.sui.io → Register.',
        url: 'https://overflow.sui.io/',
      },
      {
        title: 'Build on Sui tracks',
        description:
          'Choose Agentic Web, DeFi & Payments, DeepBook, etc. Use Sui object model.',
      },
      {
        title: 'Submit virtually',
        description:
          'Submit online - per track $30k 1st. Community voting + panel judging.',
      },
    ],
    nameAr: 'Sui Overflow 2026',
    taglineAr: 'هاكاثون افتراضي عالمي - 30 ألف $ لكل مسار',
    descriptionAr: 'هاكاثون Sui الافتراضي: ابنِ وكلاء AI و DeFi على Sui. 30 ألف $ للمركز الأول بكل مسار.',
    stepsAr: [
      {
        title: 'سجّل في Sui Overflow',
        description: 'اذهب إلى overflow.sui.io وسجّل.',
        url: 'https://overflow.sui.io/',
      },
      {
        title: 'ابنِ على مسارات Sui',
        description: 'اختر Agentic Web أو DeFi.',
      },
      {
        title: 'قدّم افتراضياً',
        description: 'قدّم عبر الإنترنت - تصويت مجتمع + تحكيم.',
      },
    ],
    upvotes: 12,
    bookmarks: 15,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o87',
    slug: 'mistral-worldwide-hackathon-2026',
    name: 'Mistral Worldwide Hackathon 2026',
    tagline: 'Global $10k + $15k credits + hiring at Mistral',
    description:
      'Mistral 2026 worldwide: Global winner $10k + $15k credits + hiring, per location $1.5k/1k/$500 + ElevenLabs $2k/team. Locations worldwide, final in Paris.',
    url: 'https://worldwide-hackathon.mistral.ai/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/mistral.ai.ico',
    category: 'forstartups',
    tags: ['mistral', 'hackathon', 'ww', 'credits', 'hiring'],
    pricing: 'free',
    steps: [
      {
        title: 'Pick a location and register',
        description:
          'Go to worldwide-hackathon.mistral.ai → Choose city → Register.',
        url: 'https://worldwide-hackathon.mistral.ai/',
      },
      {
        title: 'Hack with Mistral API',
        description:
          'Build with Mistral credits provided. Special awards: ElevenLabs $2k/team, Best Architecture $500.',
      },
      {
        title: 'Global final',
        description:
          'Location winners → global final $10k + hiring opportunity.',
      },
    ],
    nameAr: 'هاكاثون Mistral العالمي 2026',
    taglineAr: 'العالمي 10 آلاف $ + 15 ألف رصيد + توظيف',
    descriptionAr: 'هاكاثون Mistral العالمي: الفائز العالمي 10 آلاف $ + 15 ألف رصيد + توظيف.',
    stepsAr: [
      {
        title: 'اختر مدينة وسجّل',
        description: 'اذهب إلى worldwide-hackathon.mistral.ai واختر المدينة.',
        url: 'https://worldwide-hackathon.mistral.ai/',
      },
      {
        title: 'ابنِ بـ Mistral',
        description: 'استخدم رصيد Mistral المقدم - جوائز ElevenLabs.',
      },
      {
        title: 'النهائي العالمي',
        description: 'الفائزون المحليون إلى النهائي العالمي.',
      },
    ],
    upvotes: 11,
    bookmarks: 14,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o88',
    slug: 'gloo-ai-hackathon-2026',
    name: 'Gloo AI Hackathon 2026 - Build for Good',
    tagline: '$200k, no coding required - Boulder, Oct 6-8',
    description:
      'Gloo AI for Good Oct 6-8, 2026 Boulder, Colorado: $200k pool, no coding required, for Faith & Flourishing builders. Start building Sep 8.',
    url: 'https://gloo.com/ai/hackathon',
    logoUrl: 'https://icons.duckduckgo.com/ip3/gloo.com.ico',
    category: 'forstartups',
    tags: ['gloo', 'ai', 'for-good', 'boulder', '200k'],
    pricing: 'free',
    steps: [
      {
        title: 'Register on Gloo',
        description:
          'Go to gloo.com/ai/hackathon → Register (hold spot).',
        url: 'https://gloo.com/ai/hackathon',
      },
      {
        title: 'Start building Sep 8',
        description:
          'No code required - build AI for Good projects.',
      },
      {
        title: 'Join Oct 6-8 in Boulder',
        description:
          'Limelight Hotel Boulder - compete for $200k.',
      },
    ],
    nameAr: 'Gloo AI هاكاثون 2026',
    taglineAr: '200 ألف $ بدون برمجة - بولدر 6-8 أكتوبر',
    descriptionAr: 'هاكاثون Gloo للخير 6-8 أكتوبر 2026 بولدر: 200 ألف $ بدون حاجة لبرمجة.',
    stepsAr: [
      {
        title: 'سجّل في Gloo',
        description: 'اذهب إلى gloo.com/ai/hackathon وسجّل.',
        url: 'https://gloo.com/ai/hackathon',
      },
      {
        title: 'ابدأ 8 سبتمبر',
        description: 'لا حاجة لبرمجة - ابنِ مشروع AI للخير.',
      },
      {
        title: 'شارك في بولدر',
        description: 'فندق Limelight - نافس على 200 ألف $.',
      },
    ],
    upvotes: 10,
    bookmarks: 12,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o89',
    slug: 'vslive-microsoft-ai-hackathon-2026',
    name: 'VSLive! Microsoft AI Hackathon 2026',
    tagline: '$25k at Microsoft HQ Redmond - Azure OpenAI + Copilot',
    description:
      'VSLive Microsoft AI Hackathon July 28-29, 2026 at Microsoft HQ Building 98 Redmond: $25k pool ($6k Grand, $2k Team/Solo). Build enterprise AI on Azure OpenAI, Copilot, agents, .NET. Free for VSLive attendees, $50 community in-person only.',
    url: 'https://vslive.com/events/microsofthq-2026/hackathon.aspx',
    logoUrl: 'https://icons.duckduckgo.com/ip3/vslive.com.ico',
    category: 'forstartups',
    tags: ['vslive', 'microsoft', 'azure', 'hackathon', '25k'],
    pricing: 'free',
    steps: [
      {
        title: 'Register for VSLive Microsoft HQ',
        description:
          'Go to vslive.com/events/microsofthq-2026/hackathon.aspx → Register. Free for attendees, $50 community.',
        url: 'https://vslive.com/events/microsofthq-2026/hackathon.aspx',
      },
      {
        title: 'Hack July 28-29 at Building 98',
        description:
          '6-10pm Tue + 5-9pm Wed at Microsoft Commons Mixer. Build on Azure OpenAI/Copilot.',
      },
      {
        title: 'Win Grand $6k',
        description:
          'Judged on innovation/execution/impact. One monetary prize per team.',
      },
    ],
    nameAr: 'VSLive! هاكاثون مايكروسوفت AI 2026',
    taglineAr: '25 ألف $ في مقر مايكروسوفت - Azure OpenAI',
    descriptionAr: 'هاكاثون VSLive 28-29 يوليو 2026 في مقر مايكروسوفت ريدموند: 25 ألف $ (6 آلاف كبرى).',
    stepsAr: [
      {
        title: 'سجّل لـ VSLive',
        description: 'اذهب إلى vslive.com وسجّل - مجاني للحضور.',
        url: 'https://vslive.com/events/microsofthq-2026/hackathon.aspx',
      },
      {
        title: 'شارك 28-29 يوليو',
        description: 'في مبنى 98 - ابنِ على Azure OpenAI.',
      },
      {
        title: 'افوز بـ 6 آلاف $',
        description: 'تحكيم على الابتكار والتنفيذ.',
      },
    ],
    upvotes: 9,
    bookmarks: 11,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o90',
    slug: 'devnetwork-api-cloud-ai-hackathon-2026',
    name: 'DevNetwork API + Cloud + AI Hackathon 2026',
    tagline: '$39.5k at API World Santa Clara + online',
    description:
      'DevNetwork API + Cloud + AI Hackathon @ API World 2026: $39.5k pool ($12.5k overall winner). Online Aug 17-Sep 3 + in-person Sep 2-3 Santa Clara Convention Center. 300+ participants, challenges from Perfect Corp, SerpApi, Xano.',
    url: 'https://api-cloud-ai-hackathon-2026.devpost.com/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/devpost.com.ico',
    category: 'forstartups',
    tags: ['devnetwork', 'api', 'cloud', 'ai', 'api-world'],
    pricing: 'free',
    steps: [
      {
        title: 'Join on Devpost',
        description:
          'Go to api-cloud-ai-hackathon-2026.devpost.com → Join.',
        url: 'https://api-cloud-ai-hackathon-2026.devpost.com/',
      },
      {
        title: 'Hack online Aug 17-Sep 3',
        description:
          'Build API/Cloud/AI projects. Challenges: Perfect Corp AI, SerpApi $3k, Xano SaaS.',
      },
      {
        title: 'Demo Sep 2-3 Santa Clara',
        description:
          'In-person + awards at Santa Clara Convention Center. Overall $12.5k + Echos + passes.',
      },
    ],
    nameAr: 'DevNetwork API + Cloud + AI هاكاثون 2026',
    taglineAr: '39.5 ألف $ في API World سانتا كلارا',
    descriptionAr: 'هاكاثون DevNetwork في API World 2026: 39.5 ألف $ (12.5 ألف للفائز). عبر الإنترنت وأيضاً حضورياً.',
    stepsAr: [
      {
        title: 'انضم عبر Devpost',
        description: 'اذهب إلى api-cloud-ai-hackathon-2026.devpost.com وانضم.',
        url: 'https://api-cloud-ai-hackathon-2026.devpost.com/',
      },
      {
        title: 'شارك 17 أغسطس - 3 سبتمبر',
        description: 'ابنِ مشاريع API/Cloud/AI - تحديات Perfect Corp و SerpApi.',
      },
      {
        title: 'اعرض 2-3 سبتمبر',
        description: 'حضورياً في Santa Clara - الجائزة 12.5 ألف $.',
      },
    ],
    upvotes: 11,
    bookmarks: 13,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o91',
    slug: 'y-combinator-fall-2026',
    name: 'Y Combinator Fall 2026',
    tagline: '$500k for 7% + $375k MFN - SF, Demo Day',
    description:
      'Y Combinator Fall 2026 batch Oct-Dec SF: $500k standard deal = $125k for 7% + $375k uncapped MFN SAFE (committed day accepted, not batch start). Deadline July 27, 2026 8pm PT, decisions by Aug 28, 10-min Zoom interview, Demo Day fundraising compression. Apply at ycombinator.com/apply. Early Decision for Winter/Spring/Summer 2027.',
    url: 'https://www.ycombinator.com/apply',
    logoUrl: 'https://icons.duckduckgo.com/ip3/ycombinator.com.ico',
    category: 'forstartups',
    tags: ['yc', 'y-combinator', 'accelerator', '500k', '7percent'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply by July 27, 2026 8pm PT',
        description:
          'Go to ycombinator.com/apply → Submit. Late apps still read but no promised date.',
        url: 'https://www.ycombinator.com/apply',
      },
      {
        title: 'Interview (10 min Zoom)',
        description:
          'If invited, 10-min Zoom with 2-3 partners in Aug/Sep - decision often same day.',
      },
      {
        title: 'Get $500k and join batch Oct-Dec SF',
        description:
          '$500k committed day accepted. Batch 3 months in SF, then Demo Day + investor intros.',
      },
    ],
    nameAr: 'Y Combinator خريف 2026',
    taglineAr: '500 ألف $ مقابل 7% + 375 ألف MFN - سان فرانسيسكو',
    descriptionAr: 'دفعة YC خريف 2026 أكتوبر-ديسمبر سان فرانسيسكو: 500 ألف $ = 125 ألف مقابل 7% + 375 ألف MFN. آخر موعد 27 يوليو 2026.',
    stepsAr: [
      {
        title: 'قدّم قبل 27 يوليو 2026',
        description: 'اذهب إلى ycombinator.com/apply وقدّم.',
        url: 'https://www.ycombinator.com/apply',
      },
      {
        title: 'مقابلة 10 دقائق',
        description: 'زووم مع شريكين - القرار غالباً نفس اليوم.',
      },
      {
        title: 'احصل على 500 ألف $ وانضم',
        description: '500 ألف $ تُحجز يوم القبول - 3 أشهر في SF ثم Demo Day.',
      },
    ],
    upvotes: 32,
    bookmarks: 38,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o92',
    slug: 'techstars-accelerator',
    name: 'Techstars Accelerator',
    tagline: '$220k for ~6% - global vertical accelerators',
    description:
      'Techstars $220k = $20k for 5% CEA + $200k uncapped MFN SAFE (~6% total, adds ~1% at $20M pre). Global vertical programs (London fintech, Boston AI, etc.). No Demo Day lift like YC, but 74% raise within 3 years. Pick for industry/city network you lack.',
    url: 'https://www.techstars.com/accelerators',
    logoUrl: 'https://icons.duckduckgo.com/ip3/techstars.com.ico',
    category: 'forstartups',
    tags: ['techstars', 'accelerator', '220k', '6percent', 'global'],
    pricing: 'free',
    steps: [
      {
        title: 'Find your vertical program',
        description:
          'Go to techstars.com/accelerators → Pick city/vertical (e.g., London fintech).',
        url: 'https://www.techstars.com/accelerators',
      },
      {
        title: 'Apply with traction + team',
        description:
          'Apply with deck, traction, team. No co-founder required like EF/Antler.',
      },
      {
        title: 'Join 3 months, Demo Day not compressed',
        description:
          '3 months in-person, mentor network, $220k deal. Understand it is regional sales, not YC fundraising compression.',
      },
    ],
    nameAr: 'Techstars مسرّعة',
    taglineAr: '220 ألف $ مقابل ~6% - مسرعات عالمية متخصصة',
    descriptionAr: 'Techstars 220 ألف $ = 20 ألف مقابل 5% + 200 ألف MFN (~6%). برامج عمودية عالمية.',
    stepsAr: [
      {
        title: 'اختر برنامجك العمودي',
        description: 'اذهب إلى techstars.com/accelerators واختر المدينة/المجال.',
        url: 'https://www.techstars.com/accelerators',
      },
      {
        title: 'قدّم بزخم وفريق',
        description: 'قدّم عرضاً وزخماً - لا حاجة لشريك مؤسس.',
      },
      {
        title: 'انضم 3 أشهر',
        description: 'شبكة مرشدين + 220 ألف $ - ليس ضغط Demo Day كـ YC.',
      },
    ],
    upvotes: 14,
    bookmarks: 17,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o93',
    slug: 'antler-disrupt-2026',
    name: 'Antler Disrupt 2026',
    tagline: '$400k for 10% + $650k perks day 1 - 4-week sprint',
    description:
      'Antler Disrupt 4-week sprint Ho Chi Minh City Mar 30-Apr 20, 2026 (Spring) + other locations: $400k = $250k for 10% + $150k MFN SAFE, $650k perks day 1 ($4M after), no fee. Need working product + early traction. <3% acceptance, IC at Week 4.',
    url: 'https://www.antler.co/academy',
    logoUrl: 'https://icons.duckduckgo.com/ip3/antler.co.ico',
    category: 'forstartups',
    tags: ['antler', 'disrupt', '$400k', '10percent', 'sprint'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply on Antler Disrupt',
        description:
          'Go to antler.co/academy → Apply (rolling). Need product + traction.',
        url: 'https://www.antler.co/academy',
      },
      {
        title: '4-week sprint Ho Chi Minh',
        description:
          'Mar 30-Apr 20, 2026 Ho Chi Minh. GTM, enterprise intros, IC prep. Fewer than 3% selected.',
      },
      {
        title: 'IC Week 4 - $400k',
        description:
          'Present to IC - majority yes = $400k invested immediately + $650k perks + Elevate follow-on.',
      },
    ],
    nameAr: 'Antler Disrupt 2026',
    taglineAr: '400 ألف $ مقابل 10% + 650 ألف مزايا - 4 أسابيع',
    descriptionAr: 'Antler Disrupt 4 أسابيع في هو تشي منه 30 مارس - 20 أبريل 2026: 400 ألف $ = 250 ألف مقابل 10% + 150 ألف MFN.',
    stepsAr: [
      {
        title: 'قدّم في Antler Disrupt',
        description: 'اذهب إلى antler.co/academy وقدّم - يحتاج منتجاً وزخماً.',
        url: 'https://www.antler.co/academy',
      },
      {
        title: 'شارك 4 أسابيع',
        description: 'هو تشي منه - GTM وIntro لمؤسسات.',
      },
      {
        title: 'لجنة الاستثمار - 400 ألف $',
        description: 'عرض أمام اللجنة - أغلبية نعم = استثمار فوري.',
      },
    ],
    upvotes: 16,
    bookmarks: 19,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o94',
    slug: 'antler-residency-uk-india-singapore',
    name: 'Antler Residency (UK / India / Singapore)',
    tagline: 'UK £210k net, India ₹4Cr, SG up to $400k - inception stage',
    description:
      'Antler Residency 6-8 weeks inception: UK London £210k net (£125k 8.5% + £85k note, £40k fee) + up to £330k follow-on, India 3 weeks → ₹4Cr (~$480k) + $1M perks (deadline Feb 19, 2026), Singapore up to $400k ($150k first). Pre-team/pre-product accepted, <1% in UK. 80% raise within 9mo.',
    url: 'https://www.antler.co/residency/uk',
    logoUrl: 'https://icons.duckduckgo.com/ip3/antler.co.ico',
    category: 'forstartups',
    tags: ['antler', 'residency', 'uk', 'india', 'inception'],
    pricing: 'free',
    steps: [
      {
        title: 'Pick residency and apply',
        description:
          'UK: antler.co/residency/uk (8 weeks London). India: AI Residency (3 weeks, deadline Feb 19, 2026). SG: up to $400k.',
        url: 'https://www.antler.co/residency/uk',
      },
      {
        title: 'Residency 6-8 weeks - find co-founder',
        description:
          'Residency builds team/idea pre-incorporation - EF/Antler are co-founder products, not fundraising bets.',
      },
      {
        title: 'IC and raise with Elevate',
        description:
          'IC invests at inception; Elevate can add up to £25M at Series A. 80% raise within 9mo in UK.',
      },
    ],
    nameAr: 'إقامة Antler (UK / الهند / سنغافورة)',
    taglineAr: 'UK 210 ألف £، الهند 4 كرور، سنغافورة 400 ألف $ - مرحلة التأسيس',
    descriptionAr: 'إقامة Antler 6-8 أسابيع: UK 210 ألف £ صافي، الهند 3 أسابيع → 4 كرور، سنغافورة حتى 400 ألف $. قبول قبل الفريق/المنتج.',
    stepsAr: [
      {
        title: 'اختر الإقامة وقدّم',
        description: 'UK: antler.co/residency/uk - 8 أسابيع لندن.',
        url: 'https://www.antler.co/residency/uk',
      },
      {
        title: 'الإقامة - ابحث عن شريك',
        description: 'بناء الفريق والفكرة قبل التأسيس.',
      },
      {
        title: 'لجنة وضخ إضافي',
        description: 'Elevate يضيف حتى 25M £ في Series A.',
      },
    ],
    upvotes: 12,
    bookmarks: 15,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o95',
    slug: '500-global-flagship',
    name: '500 Global Flagship',
    tagline: '$150k for 6% - SF flagship, diligence-based',
    description:
      '500 Global Flagship SF: $150k for 6% (subject to diligence). 500 Global has 2600+ companies, not fundraising compression like YC but strong network. Apply via 500.co.',
    url: 'https://flagship.aplica.500.co/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/500.co.ico',
    category: 'forstartups',
    tags: ['500-global', 'flagship', '150k', '6percent', 'sf'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply on 500 Flagship',
        description:
          'Go to flagship.aplica.500.co → Apply.',
        url: 'https://flagship.aplica.500.co/',
      },
      {
        title: 'Diligence and batch',
        description:
          '500 reviews traction/team - terms subject to diligence.',
      },
      {
        title: 'Join SF flagship',
        description:
          'Batch in SF, network of 2600+ companies.',
      },
    ],
    nameAr: '500 Global Flagship',
    taglineAr: '150 ألف $ مقابل 6% - رائد سان فرانسيسكو',
    descriptionAr: '500 Global Flagship SF: 150 ألف $ مقابل 6% - شبكة 2600+ شركة.',
    stepsAr: [
      {
        title: 'قدّم في 500 Flagship',
        description: 'اذهب إلى flagship.aplica.500.co وقدّم.',
        url: 'https://flagship.aplica.500.co/',
      },
      {
        title: 'فحص واختيار',
        description: 'فحص الزخم والفريق.',
      },
      {
        title: 'انضم في SF',
        description: 'دفعة في سان فرانسيسكو.',
      },
    ],
    upvotes: 10,
    bookmarks: 12,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o96',
    slug: 'a16z-speedrun',
    name: 'a16z Speedrun',
    tagline: '$500k-$1M for 10% - gaming/AI speedrun + $500k follow-on',
    description:
      'a16z Speedrun: $500k for 10% (up to $1M total) + $500k follow-on within 18 months if you raise next round. For gaming/AI startups, 12 weeks LA/SF, Demo Day with a16z network.',
    url: 'https://a16z.com/speedrun/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/a16z.com.ico',
    category: 'forstartups',
    tags: ['a16z', 'speedrun', 'gaming', '500k', '10percent'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Speedrun',
        description:
          'Go to a16z.com/speedrun → Apply. Gaming/AI focus.',
        url: 'https://a16z.com/speedrun/',
      },
      {
        title: '12 weeks LA/SF',
        description:
          '12-week program, Demo Day, a16z mentors.',
      },
      {
        title: 'Get $500k + follow-on',
        description:
          '$500k for 10% + $500k follow-on option within 18mo.',
      },
    ],
    nameAr: 'a16z Speedrun',
    taglineAr: '500 ألف - مليون $ مقابل 10% - ألعاب و AI',
    descriptionAr: 'a16z Speedrun: 500 ألف $ مقابل 10% حتى مليون + 500 ألف متابعة خلال 18 شهراً.',
    stepsAr: [
      {
        title: 'قدّم لـ Speedrun',
        description: 'اذهب إلى a16z.com/speedrun وقدّم.',
        url: 'https://a16z.com/speedrun/',
      },
      {
        title: '12 أسبوعاً',
        description: 'برنامج 12 أسبوعاً.',
      },
      {
        title: 'احصل على 500 ألف $',
        description: '500 ألف مقابل 10% + متابعة.',
      },
    ],
    upvotes: 11,
    bookmarks: 13,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o97',
    slug: 'techstars-founder-catalyst',
    name: 'Techstars Founder Catalyst',
    tagline: '10-week pre-accelerator, no equity - idea stage',
    description:
      'Techstars Founder Catalyst 10-week pre-accelerator, virtual, part-time: training, mentors, network for pre-funding idea stage (<$400k raised). No equity. Current: Global Fall 2026, Alabama, EIT Urban Mobility. Apply at techstars.com/founder-catalyst.',
    url: 'https://www.techstars.com/founder-catalyst',
    logoUrl: 'https://icons.duckduckgo.com/ip3/techstars.com.ico',
    category: 'forstartups',
    tags: ['techstars', 'catalyst', 'pre-accelerator', 'no-equity', '10-week'],
    pricing: 'free',
    steps: [
      {
        title: 'Pick Catalyst program',
        description:
          'Go to techstars.com/founder-catalyst → Choose Global Fall/Alabama/EIT.',
        url: 'https://www.techstars.com/founder-catalyst',
      },
      {
        title: 'Apply (<$400k raised)',
        description:
          'Apply with idea + team. < $400k raised gets most benefit. No equity exchange.',
      },
      {
        title: '10 weeks virtual',
        description:
          'Part-time virtual - sharpen idea, customer discovery, next level prep.',
      },
    ],
    nameAr: 'Techstars Founder Catalyst',
    taglineAr: '10 أسابيع قبل المسرّعة - بدون أسهم - مرحلة الفكرة',
    descriptionAr: 'Techstars Founder Catalyst 10 أسابيع قبل المسرّعة افتراضياً: تدريب ومرشدون لمن هم <400 ألف $ - بدون أسهم.',
    stepsAr: [
      {
        title: 'اختر برنامج Catalyst',
        description: 'اذهب إلى techstars.com/founder-catalyst واختر.',
        url: 'https://www.techstars.com/founder-catalyst',
      },
      {
        title: 'قدّم (<400 ألف $)',
        description: 'قدّم بفكرة وفريق - بدون أسهم.',
      },
      {
        title: '10 أسابيع افتراضياً',
        description: 'دوام جزئي - صقل الفكرة.',
      },
    ],
    upvotes: 9,
    bookmarks: 11,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o98',
    slug: 'entrepreneur-first',
    name: 'Entrepreneur First (EF)',
    tagline: '$150k for 8-10% - co-founder matching pre-team',
    description:
      'Entrepreneur First London/Paris/Berlin: $150k for 8-10% (8% + optional $125k MFN). Pre-team/pre-idea, co-founder matching is the product, not fundraising. Best for solo technical talent without team. If you already have co-founder + traction, skip EF.',
    url: 'https://www.joinef.com/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/joinef.com.ico',
    category: 'forstartups',
    tags: ['ef', 'entrepreneur-first', 'co-founder', '150k', '8percent'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to EF with talent profile',
        description:
          'Go to joinef.com → Apply. Solo technical/commercial talent, no team needed.',
        url: 'https://www.joinef.com/',
      },
      {
        title: 'Cohort co-founder matching',
        description:
          'EF forms teams in cohort - its actual product.',
      },
      {
        title: 'Get $150k and build',
        description:
          '$150k for 8-10% after team formed. Skip if you already have trusted co-founder + traction.',
      },
    ],
    nameAr: 'Entrepreneur First',
    taglineAr: '150 ألف $ مقابل 8-10% - مطابقة شريك مؤسس',
    descriptionAr: 'Entrepreneur First لندن/باريس/برلين: 150 ألف $ مقابل 8-10% - مطابقة شريك قبل الفريق.',
    stepsAr: [
      {
        title: 'قدّم إلى EF',
        description: 'اذهب إلى joinef.com وقدّم - فرد بدون فريق.',
        url: 'https://www.joinef.com/',
      },
      {
        title: 'مطابقة الشريك',
        description: 'EF يشكّل الفرق في الدفعة.',
      },
      {
        title: 'احصل على 150 ألف $',
        description: '150 ألف مقابل 8-10% بعد تشكيل الفريق.',
      },
    ],
    upvotes: 10,
    bookmarks: 12,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },

  {
    id: 'o99',
    slug: 'supernova-gitex-africa-2026',
    name: 'SUPERNOVA Challenge @ GITEX Africa 2026',
    tagline: 'Largest Africa startup competition - 100+ countries → Silicon Valley',
    description:
      'SUPERNOVA is the flagship startup competition at GITEX Africa Marrakech (largest Africa tech event, 100+ countries). Moroccan Woliz won 2026 FinTech & Blockchain prize. Past winners raised significant funding and gained international investor attention.',
    url: 'https://gitexafrica.com/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/gitexafrica.com.ico',
    category: 'forstartups',
    tags: ['gitex', 'supernova', 'morocco', 'competition', 'africa'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply on GITEX Africa',
        description:
          'Go to gitexafrica.com → SUPERNOVA → Apply. Open to 100+ countries.',
        url: 'https://gitexafrica.com/',
      },
      {
        title: 'Pitch at Marrakech (April)',
        description:
          'If selected, pitch at GITEX Africa Marrakech (April 7-9). 131 apps → 10 finalists in 2026.',
      },
      {
        title: 'Win and go global',
        description:
          'Winners get FinTech/Blockchain prizes + investor exposure + Silicon Valley path. Woliz case.',
      },
    ],
    nameAr: 'تحدي SUPERNOVA في جيتكس أفريقيا 2026',
    taglineAr: 'أكبر مسابقة شركات ناشئة في أفريقيا - 100+ دولة → وادي السيليكون',
    descriptionAr: 'SUPERNOVA هي المسابقة الرئيسية في جيتكس أفريقيا مراكش (أكبر حدث تقني أفريقي). فازت Woliz المغربية بجائزة FinTech 2026.',
    stepsAr: [
      {
        title: 'قدّم في جيتكس أفريقيا',
        description: 'اذهب إلى gitexafrica.com → SUPERNOVA وقدّم.',
        url: 'https://gitexafrica.com/',
      },
      {
        title: 'اعرض في مراكش أبريل',
        description: 'إذا تم اختيارك، اعرض في مراكش (131 طلباً → 10 نهائيين).',
      },
      {
        title: 'افز وفُز عالمياً',
        description: 'جوائز + مستثمرون + طريق إلى وادي السيليكون.',
      },
    ],
    upvotes: 14,
    bookmarks: 17,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o100',
    slug: 'startup-world-cup-morocco',
    name: 'Startup World Cup Morocco',
    tagline: 'National final at Technopark Casa → Grand Finale in Silicon Valley',
    description:
      'Startup World Cup Morocco (Pegasus Tech Ventures + Technopark Casablanca): 131 Moroccan apps → 10 finalists → winner ORA Technologies (fintech) represents Morocco vs 65+ countries in Silicon Valley Grand Finale. 300+ attendees, networking.',
    url: 'https://www.startupworldcup.io/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=startupworldcup.io&sz=64',
    category: 'forstartups',
    tags: ['startup-world-cup', 'morocco', 'pegasus', 'silicon-valley', 'technopark'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply via Technopark',
        description:
          'Watch Technopark Casablanca call → Apply for Startup World Cup Morocco.',
        url: 'https://technopark.ma/',
      },
      {
        title: 'National final Casa',
        description:
          'Pitch at Technopark Casablanca (March-June). 10 finalists, 131 apps in 2026.',
      },
      {
        title: 'Grand Finale Silicon Valley',
        description:
          'National winner flies to California to compete vs 65+ countries.',
      },
    ],
    nameAr: 'كأس العالم للشركات الناشئة المغرب',
    taglineAr: 'النهائي الوطني في تكنوبارك → النهائي الكبير في وادي السيليكون',
    descriptionAr: 'كأس العالم للشركات الناشئة المغرب: 131 طلباً → 10 نهائيين → الفائز ORA يمثل المغرب في وادي السيليكون ضد 65 دولة.',
    stepsAr: [
      {
        title: 'قدّم عبر تكنوبارك',
        description: 'تابع إعلان تكنوبارك وقدّم.',
        url: 'https://technopark.ma/',
      },
      {
        title: 'النهائي الوطني بالدار البيضاء',
        description: 'اعرض في تكنوبارك - 10 نهائيين.',
      },
      {
        title: 'النهائي في وادي السيليكون',
        description: 'الفائز يسافر لكاليفورنيا.',
      },
    ],
    upvotes: 12,
    bookmarks: 15,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o101',
    slug: 'nba-africa-triple-double-alx',
    name: 'NBA Africa Triple Double Accelerator x ALX',
    tagline: '$25k + OpenAI + CMU - Reborn Morocco won 2025',
    description:
      'NBA Africa + ALX Ventures + ServiceNow + OpenAI + CMU Africa: 700+ apps → 10 finalists → 3-month acceleration. 1st $25k + CMU incubation + $10k OpenAI credits + OpenAI immersion, 5th $2.5k. Reborn (Morocco, SportTech) 1st, Fitclan, Athlon (Egypt) among 2025 winners.',
    url: 'https://www.alxafrica.com/programmes',
    logoUrl: 'https://www.google.com/s2/favicons?domain=alxafrica.com&sz=64',
    category: 'forstartups',
    tags: ['nba', 'alx', 'accelerator', 'openai', 'cmu', '25k'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply on ALX',
        description:
          'Go to alxafrica.com → NBA Triple Double → Apply (700+ apps).',
        url: 'https://www.alxafrica.com/programmes',
      },
      {
        title: '3 months acceleration',
        description:
          '10 finalists from Egypt, Kenya, Morocco, Nigeria, SA - mentorship + OpenAI + CMU.',
      },
      {
        title: 'Final and prizes',
        description:
          'Demo Day - 1st $25k + CMU incubation + OpenAI immersion.',
      },
    ],
    nameAr: 'NBA Africa Triple Double مع ALX',
    taglineAr: '25 ألف $ + OpenAI + CMU - فاز Reborn المغرب 2025',
    descriptionAr: 'NBA Africa + ALX + OpenAI + CMU: 700+ طلب → 10 نهائيين → 3 أشهر تسريع. المركز الأول 25 ألف $ + حضانة CMU.',
    stepsAr: [
      {
        title: 'قدّم في ALX',
        description: 'اذهب إلى alxafrica.com وقدّم.',
        url: 'https://www.alxafrica.com/programmes',
      },
      {
        title: '3 أشهر تسريع',
        description: '10 نهائيين من 5 دول - إرشاد + OpenAI.',
      },
      {
        title: 'النهائي والجوائز',
        description: 'الأول 25 ألف $ + حضانة CMU.',
      },
    ],
    upvotes: 11,
    bookmarks: 13,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o102',
    slug: 'baobab-network-accelerator',
    name: 'Baobab Network Accelerator',
    tagline: '$100k for 12.5% + $50k Morocco examples - 12 weeks remote',
    description:
      'Baobab Network Nairobi - Africa leading accelerator: $100k lump sum for 12.5% equity + 12-week remote (2 weeks intensive + 3 months hands-on) + Demo Day. Portfolio: Colis.ma ($50k Morocco logistics 2023), VOVE ID (Morocco regtech 2025), Afrigility, Eazy Chain. No need to leave Africa, US incorporation optional.',
    url: 'https://thebaobabnetwork.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=thebaobabnetwork.com&sz=64',
    category: 'forstartups',
    tags: ['baobab', 'accelerator', '100k', '12.5percent', 'africa'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply on Baobab',
        description:
          'Go to thebaobabnetwork.com → Apply. Must have Africa presence, led by African team.',
        url: 'https://thebaobabnetwork.com/',
      },
      {
        title: '12-week remote accelerator',
        description:
          '2 weeks intensive + 3 months hands-on with venture partners + global network.',
      },
      {
        title: 'Demo Day and $100k',
        description:
          '$100k at start for 12.5% + follow-on network. Demo Day with angels/VCs.',
      },
    ],
    nameAr: 'مسرّعة Baobab Network',
    taglineAr: '100 ألف $ مقابل 12.5% - 12 أسبوعاً عن بعد',
    descriptionAr: 'Baobab نيروبي: 100 ألف $ مقابل 12.5% + 12 أسبوعاً عن بعد + Demo Day. أمثلة مغربية Colis.ma و VOVE ID.',
    stepsAr: [
      {
        title: 'قدّم في Baobab',
        description: 'اذهب إلى thebaobabnetwork.com وقدّم - يجب أن يكون لك وجود في أفريقيا.',
        url: 'https://thebaobabnetwork.com/',
      },
      {
        title: '12 أسبوعاً عن بعد',
        description: 'أسبوعان مكثفان + 3 أشهر دعم يدوي.',
      },
      {
        title: 'Demo Day و 100 ألف $',
        description: '100 ألف $ مقابل 12.5% + شبكة مستثمرين.',
      },
    ],
    upvotes: 13,
    bookmarks: 16,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o103',
    slug: 'morocco-accelerator-cohort3',
    name: 'Morocco Accelerator Cohort 3',
    tagline: 'Equity-free 3 months + Tamwilcom non-dilutive - Technopark + Plug and Play',
    description:
      'Morocco Accelerator 3-month (Oct 2026) funded by Ministry Digital Transition, operated by Technopark + Plug and Play (Digital Morocco 2030): equity-free, fee-free mentorship, workshops, office at Technopark, corporate/investor intros, global ecosystem, eligible for Startup Venture Building non-dilutive financing via Tamwilcom. Prev. 80+ founders, 200+ mentorships, $5M+ raised, 19 grad 20M MAD, 2 to Silicon Valley Winter Summit. Moroccan founder/diaspora, traction + revenue, scalable tech. Closes Sep 15, 2026.',
    url: 'https://technopark.ma/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=technopark.ma&sz=64',
    category: 'forstartups',
    tags: ['morocco-accelerator', 'technopark', 'plug-and-play', 'tamwilcom', 'free'],
    pricing: 'free',
    steps: [
      {
        title: 'Check eligibility',
        description:
          'Moroccan founder/co-founder/diaspora, product in market, traction + revenue, scalable tech.',
      },
      {
        title: 'Apply by Sep 15, 2026',
        description:
          'Apply via Technopark link: lnkd.in/gsmHS5zq. Selection in September, starts October.',
        url: 'https://technopark.ma/',
      },
      {
        title: 'Join 3 months + Tamwilcom',
        description:
          'Mentorship, Corporate Day (12+ corporates, 75+ 1-1), investor intros, non-dilutive financing eligibility.',
      },
    ],
    nameAr: 'مسرّعة المغرب الدفعة 3',
    taglineAr: '3 أشهر بدون أسهم + تمويل Tamwilcom غير مخفف',
    descriptionAr: 'مسرّعة المغرب 3 أشهر أكتوبر 2026 بتمويل الوزارة وتشغيل تكنوبارك + Plug and Play: بدون أسهم، إرشاد وورشات ومكتب وTamwilcom. 80+ مؤسساً، 5M$ تم جمعها.',
    stepsAr: [
      {
        title: 'تحقق من الأهلية',
        description: 'مؤسس مغربي/مغترب، منتج في السوق، زخم وإيرادات.',
      },
      {
        title: 'قدّم قبل 15 سبتمبر 2026',
        description: 'قدّم عبر رابط تكنوبارك.',
        url: 'https://technopark.ma/',
      },
      {
        title: 'انضم 3 أشهر + Tamwilcom',
        description: 'إرشاد ويوم شركات وتمويل غير مخفف.',
      },
    ],
    upvotes: 16,
    bookmarks: 19,
    submittedBy: 'u6',
    featured: true,
    endsAt: '2026-09-15',
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o105',
    slug: 'cyberstrike-2026-ctf',
    name: 'CyberStrike 2026 CTF @ GITEX Africa',
    tagline: '2nd national - ANCA CERT + DGSSI + Cisco XDR',
    description:
      'CyberStrike 2026 CTF & Hackathon at GITEX Africa Marrakech (ANCA CERT, DGSSI, Cisco XDR): national/regional African talent, rapid incident response, threat hunting, forensics, XDR. Ryane El Ouarrat 2nd national.',
    url: 'https://www.dgssi.gov.ma/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=gitexafrica.com&sz=64',
    category: 'forstartups',
    tags: ['cyberstrike', 'ctf', 'gitex', 'anca', 'cisco'],
    pricing: 'free',
    steps: [
      {
        title: 'Qualify via ANCA',
        description:
          'Watch ANCA CERT call for CyberStrike at GITEX Africa.',
        url: 'https://www.dgssi.gov.ma/',
      },
      {
        title: 'Compete at GITEX Marrakech',
        description:
          'CTF: incident response, forensics, XDR challenges.',
      },
      {
        title: 'Win cert and trophy',
        description:
          'Trophy + Cisco XDR cert + DGSSI recognition.',
      },
    ],
    nameAr: 'CyberStrike 2026 CTF في جيتكس',
    taglineAr: 'المركز الثاني وطنياً - ANCA + DGSSI + Cisco',
    descriptionAr: 'CyberStrike 2026 CTF في جيتكس مراكش: ANCA و DGSSI و Cisco XDR - استجابة سريعة وتتبع تهديدات.',
    stepsAr: [
      {
        title: 'تأهل عبر ANCA',
        description: 'تابع إعلان ANCA لـ CyberStrike.',
        url: 'https://www.dgssi.gov.ma/',
      },
      {
        title: 'نافس في جيتكس',
        description: 'CTF: استجابة وطب شرعي و XDR.',
      },
      {
        title: 'افز بالكأس وشهادة',
        description: 'كأس + شهادة Cisco XDR.',
      },
    ],
    upvotes: 9,
    bookmarks: 11,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o107',
    slug: 'boost-up-lab-casablanca',
    name: 'Boost Up Lab Casablanca',
    tagline: '6 months pre-incubation - idea to Demo Day - Technopark + Ministry',
    description:
      'Boost Up Lab Casablanca (Technopark, Ministry Digital Transition - Digital Morocco 2030): 6 months pre-incubation to turn idea into concrete project, business model, solution, with experts/mentors, ending Demo Day. Part of national Boost Up Lab. Deadline Aug 23, 2026 for Casablanca cohort.',
    url: 'https://technopark.ma/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=technopark.ma&sz=64',
    category: 'forstartups',
    tags: ['boost-up', 'pre-incubation', 'technopark', 'demo-day', '6-months'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply by Aug 23, 2026',
        description:
          'Apply via Technopark: lnkd.in/eAfhC5fR (Casablanca). Also check lnkd.in/eEtX25c6 rules.',
        url: 'https://technopark.ma/',
      },
      {
        title: '6 months pre-incubation',
        description:
          'Structured: idea → business model → solution with mentors.',
      },
      {
        title: 'Demo Day',
        description:
          'Present project at Demo Day for incubation pipeline.',
      },
    ],
    nameAr: 'Boost Up Lab الدار البيضاء',
    taglineAr: '6 أشهر ما قبل الحضانة - من الفكرة إلى Demo Day',
    descriptionAr: 'Boost Up Lab الدار البيضاء 6 أشهر ما قبل الحضانة: حول فكرتك إلى مشروع مع مرشدين و Demo Day. آخر موعد 23 أغسطس 2026.',
    stepsAr: [
      {
        title: 'قدّم قبل 23 أغسطس 2026',
        description: 'قدّم عبر تكنوبارك.',
        url: 'https://technopark.ma/',
      },
      {
        title: '6 أشهر حضانة',
        description: 'منهج مهيكل مع مرشدين.',
      },
      {
        title: 'Demo Day',
        description: 'اعرض مشروعك.',
      },
    ],
    upvotes: 10,
    bookmarks: 12,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o108',
    slug: 'lafactory-casablanca',
    name: 'LaFactory by Screendy (Casablanca)',
    tagline: '3-month accelerator, equity-free, OCP backed - Intelaka fast-track',
    description:
      'LaFactory Casablanca by Screendy (OCP Group): 3-month accelerator, equity-free mentoring, coworking, Intelaka fast-track application support. For scalable tech startups.',
    url: 'https://www.lafactory.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=lafactory.com&sz=64',
    category: 'forstartups',
    tags: ['lafactory', 'screendy', 'ocp', 'accelerator', 'intelaka'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply on LaFactory',
        description:
          'Go to lafactory.com → Apply.',
        url: 'https://www.lafactory.com/',
      },
      {
        title: '3 months equity-free',
        description:
          'Mentoring, workshops, Intelaka support.',
      },
      {
        title: 'Demo and Intelaka',
        description:
          'Pitch and get Intelaka loan guarantee fast-track.',
      },
    ],
    nameAr: 'LaFactory الدار البيضاء',
    taglineAr: '3 أشهر تسريع بدون أسهم - بدعم OCP',
    descriptionAr: 'LaFactory بالدار البيضاء: 3 أشهر تسريع بدون أسهم، إرشاد و Intelaka.',
    stepsAr: [
      {
        title: 'قدّم في LaFactory',
        description: 'اذهب إلى lafactory.com وقدّم.',
        url: 'https://www.lafactory.com/',
      },
      {
        title: '3 أشهر بدون أسهم',
        description: 'إرشاد وورشات.',
      },
      {
        title: 'عرض و Intelaka',
        description: 'اعرض واحصل على Intelaka.',
      },
    ],
    upvotes: 9,
    bookmarks: 11,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o109',
    slug: 'alx-ventures-founder-academy',
    name: 'ALX Ventures Founder Academy',
    tagline: '3-month Founder Academy - 300 grads, 28 incubated → Demo Day grants',
    description:
      'ALX Ventures Founder Academy (Casablanca, Accra, Nairobi): 3-month online + hub access for 18-35y, startup foundations, product, pitching, workshops, office hours, ALX Hubs. 1200 learners, 300 grads, 28 incubated to Demo Day grants. Priority Technopark incubation via ALX-Technopark partnership.',
    url: 'https://www.alxafrica.com/programme/founder-academy/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=alxafrica.com&sz=64',
    category: 'forstartups',
    tags: ['alx', 'founder-academy', '3-month', 'demo-day', 'alx-ventures'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply 18-35y',
        description:
          'Go to alxafrica.com/programme/founder-academy → Apply. 18-35y.',
        url: 'https://www.alxafrica.com/programme/founder-academy/',
      },
      {
        title: '3 months online + hubs',
        description:
          'Startup foundations, product, customers, growth - workshops + office hours + Casablanca Hub.',
      },
      {
        title: 'Demo Day grants + Technopark',
        description:
          '28 per cohort to Demo Day grants + priority Technopark incubation (Orange workspace).',
      },
    ],
    nameAr: 'أكاديمية ALX للمؤسسين',
    taglineAr: '3 أشهر - 300 خريج، 28 محتضن → منح Demo Day',
    descriptionAr: 'أكاديمية ALX للمؤسسين 3 أشهر أونلاين + Hubs للشباب 18-35: تأسيس وم product و pitching.',
    stepsAr: [
      {
        title: 'قدّم 18-35 سنة',
        description: 'اذهب إلى alxafrica.com وقدّم.',
        url: 'https://www.alxafrica.com/programme/founder-academy/',
      },
      {
        title: '3 أشهر أونلاين + Hubs',
        description: 'تأسيس ومنتج وزبائن.',
      },
      {
        title: 'Demo Day ومنح',
        description: '28 إلى Demo Day + حضانة تكنوبارك.',
      },
    ],
    upvotes: 11,
    bookmarks: 13,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o110',
    slug: 'technopark-morocco',
    name: 'Technopark Maroc (MITC)',
    tagline: 'Subsidized office + 1800 startups - Casa/Rabat/Tanger + AWS/Azure/Google',
    description:
      'Technopark Maroc (MITC) since 2001 Casa/Rabat/Tanger: subsidized office/coworking for tech/Green/creative, 1800+ startups, 800+ projects, 250+ companies now. AWS/Azure/Google cloud credits, investor/export support, AUSIM Village stand at Assises Tanger Oct 7-9 (2m² + hosting). Apply at technopark.ma.',
    url: 'https://technopark.ma/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=technopark.ma&sz=64',
    category: 'forstartups',
    tags: ['technopark', 'mitc', 'incubator', 'morocco', 'office'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply on Technopark',
        description:
          'Go to technopark.ma → Apply.',
        url: 'https://technopark.ma/',
      },
      {
        title: 'Get office + cloud',
        description:
          'Subsidized office/coworking + AWS/Azure/Google credits.',
      },
      {
        title: 'Exhibit at AUSIM Oct 7-9 Tanger',
        description:
          'Selected 8 startups get Village stand + hosting at Assises (AI + sovereignty).',
      },
    ],
    nameAr: 'تكنوبارك المغرب',
    taglineAr: 'مكتب مدعّم + 1800 شركة ناشئة - الدار البيضاء/الرباط/طنجة',
    descriptionAr: 'تكنوبارك منذ 2001: مكتب مدعّم لـ 1800+ شركة، رصيد سحابي AWS/Azure/Google.',
    stepsAr: [
      {
        title: 'قدّم في تكنوبارك',
        description: 'اذهب إلى technopark.ma وقدّم.',
        url: 'https://technopark.ma/',
      },
      {
        title: 'احصل على مكتب وسحابة',
        description: 'مكتب مدعّم + رصيد سحابي.',
      },
      {
        title: 'اعرض في AUSIM طنجة',
        description: '8 شركات تحصل على جناح + استضافة.',
      },
    ],
    upvotes: 12,
    bookmarks: 15,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o111',
    slug: 'reseau-entreprendre-maroc',
    name: 'Réseau Entreprendre Maroc',
    tagline: 'Free 1-on-1 mentoring by 250 business leaders + honor loan (prêt d\'honneur)',
    description:
      'Réseau Entreprendre Maroc pairs you with an experienced volunteer business leader for free, personalized, long-term mentoring to structure and grow your company. Financing comes as an interest-free honor loan (prêt d\'honneur) - 44M+ MAD granted to date. Track record since 2005: 450 entrepreneurs accompanied, 3,000+ jobs created or saved. Open to Moroccan founders at creation or growth stage; apply online via the deposit-a-request form.',
    url: 'https://www.reseau-entreprendre.org/maroc/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=reseau-entreprendre.org&sz=64',
    category: 'forstartups',
    tags: ['reseau-entreprendre', 'mentoring', 'pret-honneur', 'morocco', 'funding'],
    pricing: 'free',
    steps: [
      {
        title: 'Submit your application',
        description:
          'Fill the online request form - project presentation, stage and needs. No cost to apply.',
        url: 'https://www.reseau-entreprendre.org/maroc/deposer-une-demande/',
      },
      {
        title: 'Meet the selection committee',
        description:
          'Present your project to member business leaders; selected founders get matched with a dedicated mentor.',
      },
      {
        title: 'Get mentored + honor loan',
        description:
          'Free long-term 1-on-1 accompaniment from a veteran CEO plus an interest-free prêt d\'honneur when eligible.',
      },
    ],
    nameAr: 'شبكة رجال الأعمال المغرب',
    taglineAr: 'تأطير مجاني من 250 قائد أعمال + قرض شرفي بدون فائدة',
    descriptionAr: 'شبكة رجال الأعمال المغرب تربطك برائد أعمال متمرس متطوع للتأطير المجاني الشخصي طويل المدى، مع تمويل على شكل قرض شرفي بدون فوائد تجاوز 44 مليون درهم. منذ 2005: 450 رائد أعمال و3000 منصب شغل. مفتوحة للمؤسسين المغاربة في مرحلة الإنشاء أو النمو.',
    stepsAr: [
      {
        title: 'قدّم طلبك',
        description: 'املأ استمارة الطلب عبر الإنترنت - التقديم مجاني.',
        url: 'https://www.reseau-entreprendre.org/maroc/deposer-une-demande/',
      },
      {
        title: 'قابل لجنة الانتقاء',
        description: 'اعرض مشروعك على أعضاء الشبكة؛ المقبولون يحصلون على مرشد مخصص.',
      },
      {
        title: 'استفد من التأطير والقرض الشرفي',
        description: 'مرافقة فردية مجانية طويلة المدى + قرض شرفي بدون فائدة عند الأهلية.',
      },
    ],
    upvotes: 9,
    bookmarks: 11,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o112',
    slug: '212-founders-cdg-invest',
    name: '212 Founders (CDG Invest)',
    tagline: '$50k-$200k pre-seed + 18 months incubation + BF loan',
    description:
      '212 Founders by CDG Invest - Morocco main VC pre-seed: $50k-$200k for Moroccan seed startups + 18 months incubation, office, mentoring, bridge loan. The reference for Moroccan seed funding.',
    url: 'https://www.cdginvest.ma/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=212founders.ma&sz=64',
    category: 'forstartups',
    tags: ['212-founders', 'cdg-invest', 'pre-seed', 'morocco', 'bf-loan'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply on CDG Invest',
        description:
          'Go to cdginvest.ma → 212 Founders → Apply.',
        url: 'https://www.cdginvest.ma/',
      },
      {
        title: 'Pre-seed $50k-$200k',
        description:
          'If selected, $50k-$200k + 18 months incubation.',
      },
      {
        title: 'Bridge and scale',
        description:
          'Office, mentoring, bridge loan to next round.',
      },
    ],
    nameAr: '212 Founders (CDG Invest)',
    taglineAr: '50-200 ألف $ ما قبل البذرة + 18 شهر حضانة',
    descriptionAr: '212 Founders التابع لـ CDG Invest: 50-200 ألف $ لمرحلة ما قبل البذرة + 18 شهر حضانة.',
    stepsAr: [
      {
        title: 'قدّم في CDG Invest',
        description: 'اذهب إلى cdginvest.ma وقدّم.',
        url: 'https://www.cdginvest.ma/',
      },
      {
        title: 'ما قبل البذرة 50-200 ألف $',
        description: 'إذا تم اختيارك، 50-200 ألف $ + 18 شهر حضانة.',
      },
      {
        title: 'جسر وتوسع',
        description: 'مكتب وإرشاد وقرض جسري.',
      },
    ],
    upvotes: 10,
    bookmarks: 12,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o113',
    slug: 'um6p-ventures',
    name: 'UM6P Ventures',
    tagline: 'Deeptech lab access + AgriTech/CleanTech investors - Ben Guerir',
    description:
      'UM6P Ventures (UM6P, Ben Guerir): deeptech lab access, prototyping, AgriTech/CleanTech investors, affiliated with Mohammed VI Polytechnic. For lab-heavy startups.',
    url: 'https://www.um6p.ma/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=um6p.ma&sz=64',
    category: 'forstartups',
    tags: ['um6p', 'deeptech', 'lab', 'agritech', 'ben-guerir'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply on UM6P Ventures',
        description:
          'Go to um6p.ma → Ventures → Apply.',
        url: 'https://www.um6p.ma/',
      },
      {
        title: 'Lab + investors',
        description:
          'Deeptech lab + AgriTech/CleanTech investor intros.',
      },
      {
        title: 'Prototype and scale',
        description:
          'Build and scale with UM6P network.',
      },
    ],
    nameAr: 'UM6P Ventures',
    taglineAr: 'وصول للمختبرات + مستثمرو AgriTech',
    descriptionAr: 'UM6P Ventures بن جرير: وصول للمختبرات ونمذجة ومستثمرو AgriTech/CleanTech.',
    stepsAr: [
      {
        title: 'قدّم في UM6P Ventures',
        description: 'اذهب إلى um6p.ma وقدّم.',
        url: 'https://www.um6p.ma/',
      },
      {
        title: 'مختبر ومستثمرون',
        description: 'مختبر عميق + مستثمرون.',
      },
      {
        title: 'نمذج وتوسّع',
        description: 'ابنِ وتوسّع عبر شبكة UM6P.',
      },
    ],
    upvotes: 8,
    bookmarks: 10,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o114',
    slug: 'impact-lab-marrakech',
    name: 'Impact Lab (Marrakech)',
    tagline: 'Impact investors + development funds - social enterprise',
    description:
      'Impact Lab Marrakech: connects social enterprises to impact investors and international development funds. For social/environmental startups.',
    url: 'https://www.impactlab.africa/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=impactlab.africa&sz=64',
    category: 'forstartups',
    tags: ['impact-lab', 'social', 'impact-investors', 'marrakech', 'development-funds'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply on Impact Lab',
        description:
          'Go to impactlab.africa → Apply.',
        url: 'https://www.impactlab.africa/',
      },
      {
        title: 'Connect to impact investors',
        description:
          'Pitch to impact VCs + development funds.',
      },
      {
        title: 'Scale social impact',
        description:
          'Funding + mentorship for social ventures.',
      },
    ],
    nameAr: 'Impact Lab مراكش',
    taglineAr: 'مستثمرو أثر + صناديق تنمية - ريادة اجتماعية',
    descriptionAr: 'Impact Lab مراكش: يربط الشركات الاجتماعية بمستثمري الأثر وصناديق التنمية الدولية.',
    stepsAr: [
      {
        title: 'قدّم في Impact Lab',
        description: 'اذهب إلى impactlab.africa وقدّم.',
        url: 'https://www.impactlab.africa/',
      },
      {
        title: 'تواصل مع مستثمري الأثر',
        description: 'اعرض على VCs للأثر.',
      },
      {
        title: 'وسّع الأثر الاجتماعي',
        description: 'تمويل + إرشاد.',
      },
    ],
    upvotes: 8,
    bookmarks: 10,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o115',
    slug: 'intelaka-forsa-morocco',
    name: 'Intelaka & Forsa (Morocco Government)',
    tagline: 'Intelaka up to 1.2M MAD loan + Forsa 100k MAD grant - any idea',
    description:
      'Government Intelaka (1.2M MAD loan with guarantee via banks) + Forsa (100k MAD grant via forsa.ma) for any Moroccan with an idea. No tech filter, open to all sectors. Apply via bank list (Intelaka) and forsa.ma portal.',
    url: 'https://www.forsa.ma/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=forsa.ma&sz=64',
    category: 'forstartups',
    tags: ['intelaka', 'forsa', 'government', 'morocco', 'grant', 'loan'],
    pricing: 'free',
    steps: [
      {
        title: 'Choose Intelaka or Forsa',
        description:
          'Intelaka: up to 1.2M MAD bank loan + guarantee. Forsa: 100k MAD grant + training. Pick based on needs.',
        url: 'https://www.forsa.ma/',
      },
      {
        title: 'Apply',
        description:
          'Intelaka: go to participating bank with business plan. Forsa: apply at forsa.ma portal.',
      },
      {
        title: 'Get funding',
        description:
          'If selected, receive loan/grant + training. Open to any sector, any Moroccan with idea.',
      },
    ],
    nameAr: 'انطلاقة وفُرصة (حكومة المغرب)',
    taglineAr: 'انطلاقة حتى 1.2M درهم قرض + فرصة 100 ألف درهم منحة - لأي فكرة',
    descriptionAr: 'انطلاقة (1.2M درهم قرض بضمان) + فرصة (100 ألف درهم منحة عبر forsa.ma) لأي مغربي لديه فكرة - بدون فلتر تقني.',
    stepsAr: [
      {
        title: 'اختر انطلاقة أو فرصة',
        description: 'انطلاقة: حتى 1.2M قرض. فرصة: 100 ألف منحة + تكوين.',
        url: 'https://www.forsa.ma/',
      },
      {
        title: 'قدّم',
        description: 'انطلاقة: اذهب للبنك بخطة عمل. فرصة: قدّم في forsa.ma.',
      },
      {
        title: 'احصل على التمويل',
        description: 'إذا تم اختيارك، تحصل على قرض/منحة + تكوين.',
      },
    ],
    upvotes: 15,
    bookmarks: 18,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o116',
    slug: 'academia-raqmya',
    name: 'Academia Raqmya - Morocco Digital Academy',
    tagline: 'Free national digital learning platform - ADD & Ministry of Digital Transition',
    description:
      'Academia Raqmya (الأكاديمية الرقمية) is Morocco\'s national inclusive e-learning platform, built by the Digital Development Agency (ADD) under the Ministry of Digital Transition. 100% free courses in AI, cybersecurity, data, development, digital marketing and administration for the general public, civil servants, and companies (SMEs & startups), with certificates of completion. Available in Arabic and French, with iOS/Android apps.',
    url: 'https://academiaraqmya.gov.ma/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=academiaraqmya.gov.ma&sz=64',
    category: 'forstartups',
    tags: ['academia-raqmya', 'digital-academy', 'morocco', 'free-training', 'add'],
    pricing: 'free',
    steps: [
      {
        title: 'Create your free account',
        description: 'Sign up at academiaraqmya.gov.ma with your email - open to everyone (public, administrations, companies).',
        url: 'https://academiaraqmya.gov.ma/',
      },
      {
        title: 'Pick a track and learn',
        description: 'Choose from AI, cybersecurity, data, development or digital marketing tracks in Arabic or French, at your own pace.',
      },
      {
        title: 'Earn your certificate',
        description: 'Pass the assessments to earn certificates; verify them online via the platform.',
      },
    ],
    nameAr: 'الأكاديمية الرقمية',
    taglineAr: 'منصة التعلم الرقمي الوطنية المجانية - الوكالة التنمية الرقمية ووزارة الانتقال الرقمي',
    descriptionAr: 'الأكاديمية الرقمية هي منصة التعلم الإلكتروني الوطنية الشاملة، من وكالة التنمية الرقمية بوزارة الانتقال الرقمي. دورات مجانية 100% في الذكاء الاصطناعي والأمن السيبراني والبيانات والتطوير والتسويق الرقمي للعموم والإدارات والمقاولات، مع شهادات إتمام. متوفرة بالعربية والفرنسية مع تطبيقات للهاتف.',
    stepsAr: [
      {
        title: 'أنشئ حسابك المجاني',
        description: 'سجّل في academiaraqmya.gov.ma ببريدك الإلكتروني - مفتوحة للجميع.',
        url: 'https://academiaraqmya.gov.ma/',
      },
      {
        title: 'اختر مساراً وتعلّم',
        description: 'مسارات في الذكاء الاصطناعي والأمن السيبراني والبيانات والتطوير، بالعربية أو الفرنسية.',
      },
      {
        title: 'احصل على شهادتك',
        description: 'اجتز التقييمات واحصل على شهادة قابلة للتحقق عبر المنصة.',
      },
    ],
    upvotes: 14,
    bookmarks: 20,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o117',
    slug: 'maroc-entrepreneurs-network',
    name: 'Maroc Entrepreneurs Network',
    tagline: 'Community network connecting Moroccan founders, mentors & investors',
    description:
      'Maroc Entrepreneurs is a non-profit network that connects Moroccan entrepreneurs and project holders with mentors, experts, investors, and each other. Members get networking events, pitch practice, experience sharing, and access to a community of founders across Morocco and the diaspora - useful for finding co-founders, first customers, and funding intros.',
    url: 'https://marocentrepreneurs.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=marocentrepreneurs.com&sz=64',
    category: 'forstartups',
    tags: ['maroc-entrepreneurs', 'network', 'founders', 'mentors', 'morocco'],
    pricing: 'free',
    steps: [
      {
        title: 'Join the network',
        description: 'Sign up on marocentrepreneurs.com and present your project or profile.',
        url: 'https://marocentrepreneurs.com/',
      },
      {
        title: 'Connect with founders & mentors',
        description: 'Take part in events, forums and meetups; exchange experience with other entrepreneurs.',
      },
      {
        title: 'Grow your project',
        description: 'Find co-founders, first customers, mentors and investor introductions through the community.',
      },
    ],
    nameAr: 'شبكة رواد الأعمال المغرب',
    taglineAr: 'شبكة تربط رواد الأعمال المغاربة بالموجهين والمستثمرين',
    descriptionAr: 'ماروك أونتربرنور هي شبكة غير ربحية تربط رواد الأعمال المغاربة وأصحاب المشاريع بالموجهين والخبراء والمستثمرين. تنظّم لقاءات وتكوينات وتقدم فضاءً لتبادل الخبرات والعثور على شركاء وعملاء ومستثمرين.',
    stepsAr: [
      {
        title: 'انضم إلى الشبكة',
        description: 'سجّل في marocentrepreneurs.com وقدّم مشروعك أو ملفك.',
        url: 'https://marocentrepreneurs.com/',
      },
      {
        title: 'تواصل مع الرواد والموجهين',
        description: 'شارك في اللقاءات والمنتديات وتبادل الخبرات مع رواد آخرين.',
      },
      {
        title: 'طوّر مشروعك',
        description: 'اعثر على شركاء وعملاء أوائل وموجهات نحو المستثمرين عبر المجتمع.',
      },
    ],
    upvotes: 11,
    bookmarks: 13,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o118',
    slug: 'f6s-startup-programs',
    name: 'F6S - Startup Programs & Grants Hub',
    tagline: 'One profile, thousands of startup programs, grants, credits & accelerators worldwide',
    description:
      'F6S is the platform where founders apply to thousands of startup programs: accelerators, grants, competitions, free credits (AWS, Google, Microsoft…) and investor matching - including many programs open to Moroccan and MENA founders. Create one free founder profile and apply to multiple programs without re-filling your deck each time. Also useful to discover which international programs are currently accepting applications.',
    url: 'https://f6s.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=f6s.com&sz=64',
    category: 'forstartups',
    tags: ['f6s', 'grants', 'accelerators', 'credits', 'startups'],
    pricing: 'free',
    steps: [
      {
        title: 'Create your founder profile',
        description:
          'Sign up free on F6S and complete your startup profile once - pitch, team, stage.',
        url: 'https://f6s.com',
      },
      {
        title: 'Find matching programs',
        description:
          'Search programs open for applications: grants, accelerators, credits and competitions filtered by stage and region.',
      },
      {
        title: 'Apply with one click',
        description:
          'Apply to programs using your saved profile - no repeated forms; track application status in your dashboard.',
      },
    ],
    nameAr: 'F6S - منصة برامج ومنح الشركات الناشئة',
    taglineAr: 'ملف واحد لآلاف البرامج والمنح والحاضنات وأرصدة مجانية عالمياً',
    descriptionAr: 'F6S هي المنصة التي يتقدم منها المؤسسون إلى آلاف البرامج: حاضنات ومنح ومسابقات وأرصدة مجانية (AWS وGoogle وMicrosoft) ومطابقة مع المستثمرين - بما فيها برامج مفتوحة للمؤسسين المغاربة والمِنطقة. أنشئ ملفاً مجانياً وقدّم لعدة برامج دون إعادة ملء ملفك في كل مرة.',
    stepsAr: [
      {
        title: 'أنشئ ملف المؤسس',
        description: 'سجّل مجاناً وأكمل ملف شركتك مرة واحدة - العرض والفريق والمرحلة.',
        url: 'https://f6s.com',
      },
      {
        title: 'ابحث عن البرامج المناسبة',
        description: 'صفّ البرامج المفتوحة للتقديم: منح وحاضنات وأرصدة ومسابقات حسب المرحلة والمنطقة.',
      },
      {
        title: 'قدّم بضغطة واحدة',
        description: 'قدّم عبر ملفك المحفوظ وتابع حالة الطلبات من لوحة التحكم.',
      },
    ],
    upvotes: 13,
    bookmarks: 15,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o119',
    slug: 'technoventures-technopark',
    name: 'TechnoVentures by Technopark Morocco',
    tagline: '7-month venture-building program for Moroccan tech startups at POC/MVP stage',
    description:
      'TechnoVentures is deployed by Technopark Morocco under its Startup Venture Building offer. The 7-month program targets innovative Moroccan tech startups that already have a POC or MVP and want to accelerate productization, market entry, and scale-up. Founders get structured venture-building support - workshops, mentoring, and access to the Technopark ecosystem - to turn an early prototype into a fundable, growing company.',
    url: 'https://www.start-up.ma/programmes-pour-startups/technoventures/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=technopark.ma&sz=64',
    category: 'forstartups',
    tags: ['technoventures', 'technopark', 'acceleration', 'morocco', 'mvp'],
    pricing: 'free',
    steps: [
      {
        title: 'Check eligibility',
        description:
          'Moroccan tech startup with a working POC or MVP and a scalable idea - pre-product ideas are not the target.',
      },
      {
        title: 'Apply to the cohort',
        description:
          'Submit your application via the program page when the call is open; selection favors traction and team quality.',
        url: 'https://www.start-up.ma/programmes-pour-startups/technoventures/',
      },
      {
        title: 'Build for 7 months',
        description:
          'Follow the venture-building track: productization, go-to-market, and scale-up support with Technopark mentors and partners.',
      },
    ],
    nameAr: 'تكنوڤانتشرز من تكنوبارك المغرب',
    taglineAr: 'برنامج بناء مشاريع لمدة 7 أشهر للشركات الناشئة المغربية في مرحلة POC/MVP',
    descriptionAr: 'تكنوڤانتشرز برنامج من تكنوبارك المغرب ضمن عرض Startup Venture Building، يستهدف الشركات الناشئة التكنولوجية المغربية المبتكرة التي تملك نموذجاً أولياً وتريد تسريع الإطلاق والنمو. يشمل ورشات وإرشاداً والوصول إلى منظومة تكنوبارك لتحويل النموذج الأولي إلى شركة قابلة للتمويل والنمو.',
    stepsAr: [
      {
        title: 'تحقق من شروط الأهلية',
        description: 'شركة ناشئة مغربية تكنولوجية تملك POC أو MVP عامل وفكرة قابلة للتوسع.',
      },
      {
        title: 'قدّم ترشيحك',
        description: 'أرسل طلبك عبر صفحة البرنامج عند فتح الدعوة؛ الانتقاء يفضّل الجذب وجودة الفريق.',
        url: 'https://www.start-up.ma/programmes-pour-startups/technoventures/',
      },
      {
        title: 'ابنِ على مدى 7 أشهر',
        description: 'تابع مسار بناء المشروع: تطوير المنتج ودخول السوق والدعم مع موجهي تكنوبارك.',
      },
    ],
    upvotes: 16,
    bookmarks: 19,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o120',
    slug: 'sport-arena-challenge',
    name: 'Sport Arena Challenge',
    tagline: '2-day sportech hackathon - ideation, workshops & mentorship for young builders',
    description:
      'Sport Arena Challenge is a two-day hackathon dedicated to sport-tech, designed to spark innovation and entrepreneurship among young people. Teams move from ideation through hands-on workshops and mentorship to concrete working solutions, pitching at the end of the weekend. Open to students and young professionals interested in the intersection of sports and technology.',
    url: 'https://www.start-up.ma/programmes-pour-startups/sport-arena-challenge/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=sup2i.ac&sz=64',
    category: 'forstartups',
    tags: ['sportech', 'hackathon', 'morocco', 'youth', 'competition'],
    pricing: 'free',
    steps: [
      {
        title: 'Register your team',
        description:
          'Sign up via the program page when registrations open - teams of builders, designers and sport enthusiasts welcome.',
        url: 'https://www.start-up.ma/programmes-pour-startups/sport-arena-challenge/',
      },
      {
        title: 'Hack for 2 days',
        description:
          'Ideate with mentors, join practical workshops, and build a concrete sportech solution with your team.',
      },
      {
        title: 'Pitch your solution',
        description:
          'Demo in front of the jury at the end of the event and compete for the top prizes.',
      },
    ],
    nameAr: 'سبورت أرينا تشالنج',
    taglineAr: 'هاكاثون رياضي تقني ليومين - تأليف وورشات وإرشاد للشباب',
    descriptionAr: 'سبورت أرينا تشالنج هاكاثون ليومين مخصص للرياضة والتقنية، يهدف إلى تحفيز الابتكار وريادة الأعمال لدى الشباب. تنتقل الفرق من التأليف عبر ورشات عملية وإرشاد إلى حلول ملموسة وعرضها أمام لجنة التحكيم.',
    stepsAr: [
      {
        title: 'سجّل فريقك',
        description: 'التسجيل عبر صفحة البرنامج عند فتح الباب - فرق من مطورين ومصممين وعشاق الرياضة.',
        url: 'https://www.start-up.ma/programmes-pour-startups/sport-arena-challenge/',
      },
      {
        title: 'شارك في الهاكاثون ليومين',
        description: 'ألّف مع الموجهين وشارك في الورشات وابنِ حلاً تقنياً رياضياً ملموساً.',
      },
      {
        title: 'اعرض حلّك',
        description: 'قدّم العرض أمام اللجنة في نهاية الحدث ونافس على الجوائز الأولى.',
      },
    ],
    upvotes: 12,
    bookmarks: 14,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o121',
    slug: 'grants-for-women-founders',
    name: 'Grants for Women Founders - Amber, WomensNet, Galaxy & more',
    tagline: 'Monthly cash grants ($5k-$10k+) for women entrepreneurs - no equity taken',
    description:
      'A bundle of recurring grant programs for women founders you can apply to from Morocco: the Amber Grant (prestigious monthly + annual grant for women-owned businesses), the WomensNet Startup Grant (monthly funding for early-stage women entrepreneurs), Galaxy Grants (fast grants for women & minority founders), the Breakthrough Grant ($5,000 for one ambitious woman entrepreneur), and the IFW Universal Funding application (apply once, get matched with funding, scholarships and mentorship opportunities year-round). Grants are non-dilutive - you keep 100% of your company.',
    url: 'https://www.start-up.ma/programmes-pour-startups/amber-grant-pour-les-femmes/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=ambergrantsforwomen.com&sz=64',
    category: 'forstartups',
    tags: ['grants', 'women-founders', 'funding', 'non-dilutive', 'startups'],
    pricing: 'free',
    steps: [
      {
        title: 'Amber Grant',
        description:
          'Apply to the monthly Amber Grant for women-owned businesses - winners are also considered for the annual award.',
        url: 'https://www.start-up.ma/programmes-pour-startups/amber-grant-pour-les-femmes/',
      },
      {
        title: 'Startup Grant (WomensNet)',
        description:
          'Apply to the monthly WomensNet grant for early-stage women-led companies.',
        url: 'https://www.start-up.ma/programmes-pour-startups/startup-grant/',
      },
      {
        title: 'Galaxy + Breakthrough grants',
        description:
          'Quick-application grants for women and minority founders - including the $5,000 Breakthrough Grant.',
        url: 'https://www.start-up.ma/programmes-pour-startups/galaxy-grants/',
      },
      {
        title: 'IFW universal application',
        description:
          'Submit one universal application and get matched automatically with partner funding, scholarships and mentorship all year.',
        url: 'https://www.start-up.ma/programmes-pour-startups/ifw-universal-funding-and-grant/',
      },
    ],
    nameAr: 'منح للمؤسِّسات - آمبر وومانزنت وجالاكسي والمزيد',
    taglineAr: 'منح نقدية شهرية (5000 إلى 10000 دولار وأكثر) للنساء رائدات الأعمال - بدون تنازل عن الأسهم',
    descriptionAr: 'حزمة برامج منح متجددة للمؤسِّسات يمكن التقديم لها من المغرب: جائزة آمبر الشهرية والسنوية المرغوبة، منحة ستارت أب جرانت من WomensNet، منح جالاكسي السريعة للنساء والأقليات، منحة الاختراق بقيمة 5000 دولار، وطلب IFW الموحد الذي يربطك تلقائياً بفرص التمويل والمنح والإرشاد طوال العام. المنح لا تقتطع أي حصة من شركتك.',
    stepsAr: [
      {
        title: 'جائزة آمبر',
        description: 'قدّم للمنحة الشهرية للشركات التي تقودها نساء - الفائزات مرشحات للجائزة السنوية.',
        url: 'https://www.start-up.ma/programmes-pour-startups/amber-grant-pour-les-femmes/',
      },
      {
        title: 'منحة ستارت أب (WomensNet)',
        description: 'قدّم للمنحة الشهرية للشركات الناشئة في مراحلها الأولى بقيادة نسائية.',
        url: 'https://www.start-up.ma/programmes-pour-startups/startup-grant/',
      },
      {
        title: 'منحتا جالاكسي والاختراق',
        description: 'منح بتقديم سريع للنساء والأقليات - بينها منحة الاختراق بقيمة 5000 دولار.',
        url: 'https://www.start-up.ma/programmes-pour-startups/galaxy-grants/',
      },
      {
        title: 'طلب IFW الموحد',
        description: 'قدّم طلباً واحداً وسيتم ربطك تلقائياً بفرص التمويل والمنح والإرشاد طوال السنة.',
        url: 'https://www.start-up.ma/programmes-pour-startups/ifw-universal-funding-and-grant/',
      },
    ],
    upvotes: 14,
    bookmarks: 18,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o122',
    slug: 'chinese-government-scholarship-csc',
    name: 'Chinese Government Scholarship (CSC)',
    tagline: 'Full ride in China - tuition + dorm + monthly stipend, no IELTS required for many programs',
    description:
      'The Chinese Government Scholarship (CSC) covers full tuition, on-campus housing, medical insurance and a monthly stipend (≈2,500-3,500 RMB) for bachelor\'s, master\'s and PhD studies at 280+ Chinese universities. English-taught programs are widely available and most do not require IELTS. Moroccan students apply either through the Chinese Embassy in Rabat (bilateral track) or directly to universities (Type B) via the official Campus China portal. Annual window: roughly December-April.',
    url: 'https://www.campuschina.org/',
    logoUrl: '/logos/csc.svg',
    category: 'scholarship',
    tags: ['china', 'scholarship', 'full-ride', 'csc', 'study-abroad'],
    pricing: 'free',
    steps: [
      {
        title: 'Create your Campus China account',
        description:
          'Register on campuschina.org, pick up to a few universities/programs (Agency Type B = university direct; Type A = embassy track).',
        url: 'https://www.campuschina.org/',
      },
      {
        title: 'Prepare your documents',
        description:
          'Passport, diplomas & transcripts (notarized), study plan / research proposal, 2 recommendation letters, physical examination form, and a non-criminal record.',
      },
      {
        title: 'Submit between Dec and Apr',
        description:
          'Apply before each university\'s deadline, track admission + scholarship status online, then get your JW201/JW202 form to apply for the X1/X2 visa at the Chinese Embassy in Rabat.',
      },
    ],
    nameAr: 'المنحة الصينية الحكومية CSC',
    taglineAr: 'دراسة مجانية كاملة في الصين - رسوم + سكن + منحة شهرية، بدون آيلتس في أغلب البرامج',
    descriptionAr: 'منحة الحكومة الصينية تغطي الرسوم الدراسية والسكن والتأمين ومنحة شهرية لبكالوريوس وماستر ودكتوراه في أكثر من 280 جامعة صينية، مع برامج بالإنجليزية لا تتطلب غالباً آيلتس. الترشح عبر السفارة الصينية بالرباط أو مباشرة للجامعات عبر بوابة Campus China، في الفترة من ديسمبر إلى أبريل تقريباً.',
    stepsAr: [
      {
        title: 'أنشئ حسابك على Campus China',
        description: 'اختر عدة جامعات وبرامج (نوع A عبر السفارة أو نوع B مباشرة عبر الجامعة).',
        url: 'https://www.campuschina.org/',
      },
      {
        title: 'جهّز الوثائق',
        description: 'جواز السفر، الشهادات وكشوف النقط، خطة الدراسة، رسالتا توصية، الفحص الطبي وعدم سوابق.',
      },
      {
        title: 'قدّم بين ديسمبر وأبريل',
        description: 'تابع حالة القبول والمنحة إلكترونياً ثم استخرج تأشيرة X1/X2 من السفارة الصينية بالرباط.',
      },
    ],
    upvotes: 21,
    bookmarks: 27,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o123',
    slug: 'campus-france-maroc',
    name: 'Campus France Maroc - Études en France',
    tagline: 'The mandatory gateway to French universities + access to French bourses',
    description:
      'Every Moroccan student applying to French higher education goes through the "Études en France" platform managed by Campus France Maroc. It centralizes program choices (up to 7), application fees, the Campus France interview in Rabat, and is required for the student visa. It is also the entry point for French scholarships: BGF (Bourse du Gouvernement Français), Eiffel (nominated by schools), and regional bourses.',
    url: 'https://maroc.campusfrance.org/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=maroc.campusfrance.org&sz=64',
    category: 'scholarship',
    tags: ['france', 'scholarship', 'campus-france', 'etudes-en-france', 'study-abroad'],
    pricing: 'free',
    steps: [
      {
        title: 'Create your Études en France file',
        description:
          'Register on the platform, fill your academic profile, and select up to 7 programs (licence/master/doctorat).',
        url: 'https://maroc.campusfrance.org/',
      },
      {
        title: 'Pay the fee & attend the interview',
        description:
          'Pay the Campus France authorization fee, then pass the motivational interview at Campus France Rabat/Casablanca; acceptances arrive on the platform.',
      },
      {
        title: 'Get your visa & look for bourses',
        description:
          'With acceptance + BCE (Campus France authorization), apply for the VLS-TS student visa at TLScontact; check BGF and Eiffel deadlines in parallel.',
      },
    ],
    nameAr: 'كامبوس فرانس المغرب',
    taglineAr: 'البوابة الإلزامية للدراسة في فرنسا + الوصول إلى المنح الفرنسية',
    descriptionAr: 'كل طالب مغربي متوجه لفرنسا يمر عبر منصة Études en France التي تديرها كامبوس فرانس المغرب: اختيار حتى 7 تكوينات، المقابلة بالرباط، ورخصة كامبوس فرانس اللازمة للتأشيرة. وهي أيضاً بوابة المنح الفرنسية مثل BGF ومنحة إيفيل للتميز.',
    stepsAr: [
      {
        title: 'أنشئ ملفك على المنصة',
        description: 'سجّل واملأ ملفك الأكاديمي واختر حتى 7 تكوينات (ليسانس/ماستر/دكتوراه).',
        url: 'https://maroc.campusfrance.org/',
      },
      {
        title: 'أداء الرسوم وأنجز المقابلة',
        description: 'أداء رسم ترخيص كامبوس فرانس ثم المقابلة التحفيزية بالرباط أو الدار البيضاء.',
      },
      {
        title: 'التأشيرة والمنح',
        description: 'بعد القبول ورخصة كامبوس فرانس قدّم على تأشيرة الطالب وتابع مواعيد منح BGF وإيفيل.',
      },
    ],
    upvotes: 18,
    bookmarks: 24,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o124',
    slug: 'erasmus-mundus-joint-masters',
    name: 'Erasmus Mundus Joint Masters',
    tagline: 'Full EU scholarship: tuition + ~€1,400/month + travel, study in 2-3 countries',
    description:
      'Erasmus Mundus Joint Masters are prestigious 1-2 year master\'s programs run by consortia of European universities. The EU scholarship covers full tuition, health insurance, travel/installation costs and a monthly allowance around €1,400 - you study in at least two different European countries and receive a joint degree. Fully open to Moroccan students; there is no central application - you apply directly to each consortium (usually Oct-Jan for the following autumn).',
    url: 'https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters-scholarships',
    logoUrl: 'https://www.google.com/s2/favicons?domain=erasmus-plus.ec.europa.eu&sz=64',
    category: 'scholarship',
    tags: ['eu', 'erasmus', 'masters', 'full-ride', 'study-abroad'],
    pricing: 'free',
    steps: [
      {
        title: 'Browse the EMJM catalogue',
        description:
          'Explore 150+ funded masters by field on the official catalogue and shortlist 3 programs (the max you can apply to).',
        url: 'https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters-scholarships',
      },
      {
        title: 'Prepare a strong dossier',
        description:
          'CV (Europass), motivation letters tailored per program, transcripts, 2 references and proof of English (IELTS/TOEFL).',
      },
      {
        title: 'Apply directly to consortia',
        description:
          'Each consortium has its own deadline (mostly Oct-Jan); scholarship results land spring - no separate scholarship form needed.',
      },
    ],
    nameAr: 'ماستر إيراسموس موندوس المشترك',
    taglineAr: 'منحة أوروبية كاملة: رسوم + ~1400 يورو شهرياً + السفر، دراسة في 2-3 دول',
    descriptionAr: 'إيراسموس موندوس ماستers مرموقة تُدار من تحالفات جامعات أوروبية: المنحة تغطي الرسوم والتأمين والسفر وبدل شهري حوالي 1400 يورو، وتدرس في بلدين أوروبيين على الأقل مع شهادة مشتركة. مفتوحة للطلبة المغاربة - الترشح مباشرة لدى كل تحالف بين أكتوبر ويناير.',
    stepsAr: [
      {
        title: 'تصفح قائمة البرامج',
        description: 'استكشف أكثر من 150 ماستر ممولاً حسب التخصص واختر 3 برامج كحد أقصى.',
        url: 'https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters-scholarships',
      },
      {
        title: 'جهّز ملفاً قوياً',
        description: 'سيرة Europass، رسائل تحفيز مخصصة، كشوف النقط، رسالتا توصية وإثبات اللغة.',
      },
      {
        title: 'قدّم مباشرة للتحالفات',
        description: 'لكل تحالف موعده الخاص (أكتوبر-يناير غالباً) والنتائج في الربيع دون استمارة منحة منفصلة.',
      },
    ],
    upvotes: 19,
    bookmarks: 25,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o125',
    slug: 'chevening-scholarship-uk',
    name: 'Chevening Scholarships - UK Government',
    tagline: 'Fully-funded one-year master\'s in the UK - leadership-focused, no tuition cost',
    description:
      'Chevening is the UK government\'s global scholarship: full tuition at any UK university, monthly stipend, flights and visa for a one-year master\'s. Aimed at people with leadership potential - you need an undergraduate degree, at least 2 years (2,800 hours) of work experience, and to apply to 3 UK courses. Applications open every August-November. Moroccan applicants compete globally but Chevening actively seeks Maghreb candidates.',
    url: 'https://www.chevening.org/scholarships/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=chevening.org&sz=64',
    category: 'scholarship',
    tags: ['uk', 'chevening', 'masters', 'full-ride', 'leadership'],
    pricing: 'free',
    steps: [
      {
        title: 'Check eligibility early',
        description:
          'Bachelor\'s degree + 2 years work experience + return to Morocco for 2 years after the course.',
        url: 'https://www.chevening.org/scholarships/',
      },
      {
        title: 'Write 4 strong essays',
        description:
          'Leadership, networking, studying-in-UK and career-plan essays decide the first round - start in July before applications open Aug-Nov.',
      },
      {
        title: 'Secure unconditional offers',
        description:
          'By July of the following year you must hold one unconditional UK offer; then pass the Chevening interview (spring).',
      },
    ],
    nameAr: 'منحة تشيفنينغ الحكومية البريطانية',
    taglineAr: 'ماستر سنة واحدة ممولة بالكامل في بريطانيا - تركز على القيادة',
    descriptionAr: 'تشيفنينغ منحة الحكومة البريطانية تغطي الرسوم الكاملة وراتباً شهرياً وطيراناً وتأشيرة لماستر بسنة واحدة. تتطلب شهادة بكالوريوس وخبرة عمل سنتين على الأقل والترشح لثلاث جامعات بريطانية. فتح الترشحات كل عام من أغسطس إلى نوفمبر.',
    stepsAr: [
      {
        title: 'تحقق من شروط الأهلية مبكراً',
        description: 'باك+5 أو ما يعادله + خبرة سنتين + الالتزام بالعودة للمغرب سنتين بعد التخرج.',
        url: 'https://www.chevening.org/scholarships/',
      },
      {
        title: 'اكتب 4 مقالات قوية',
        description: 'مقالات القيادة والتشبيك والدراسة بالمملكة والمسار المهني هي مرحلة الفرز الأولى.',
      },
      {
        title: 'احصل على قبول نهائي',
        description: 'يجب امتلاك قبول نهائي بحلول يوليو الموالي ثم اجتياز مقابلة تشيفنينغ في الربيع.',
      },
    ],
    upvotes: 17,
    bookmarks: 22,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o126',
    slug: 'daad-epos-germany',
    name: 'DAAD EPOS - Germany Development Scholarships',
    tagline: 'Funded postgrad master\'s in Germany (~€992/month) for future development leaders',
    description:
      'EPOS is DAAD\'s flagship scholarship for development-related postgraduate courses taught in English at German universities: tuition-free studies plus ≈€992/month for masters, German/EU travel allowance, insurance, and optional German language course. Designed for professionals from developing countries - including Morocco - with a bachelor\'s and usually 2 years of relevant work experience. Each course has its own deadline (mostly Aug-Oct).',
    url: 'https://www.daad.de/en/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=daad.de&sz=64',
    category: 'scholarship',
    tags: ['germany', 'daad', 'development', 'masters', 'full-funding'],
    pricing: 'free',
    steps: [
      {
        title: 'Pick an EPOS-listed course',
        description:
          'Browse the DAAD scholarship database filtered to EPOS courses - engineering, economics, environment, governance and more.',
        url: 'https://www.daad.de/en/',
      },
      {
        title: 'Apply directly to the university',
        description:
          'Send the DAAD application form + documents to the course coordinator by its own deadline (check each course page).',
      },
      {
        title: 'Interview & selection',
        description:
          'Shortlisted candidates interview with the committee; results come a few months later with pre-departure DAAD support.',
      },
    ],
    nameAr: 'منحة دAAD الألمانية EPOS',
    taglineAr: 'ماستر مدفوع في ألمانيا (~992 يورو شهرياً) لتخصصات التنمية',
    descriptionAr: 'EPOS هي منحة الهيئة الألمانية للتبادل العلمي للدراسات المرتبطة بالتنمية باللغة الإنجليزية: دراسة مجانية + 992 يورو شهرياً + تأمين وسفر ودورة لغة ألمانية. موجهة لمهنيين من دول نامية منها المغرب، بشهادة باكالوريوس وخبرة سنتين غالباً، وترسل الملفات مباشرة لكل جامعة حسب مواعيدها.',
    stepsAr: [
      {
        title: 'اختر برنامجاً من قائمة EPOS',
        description: 'تصفح قاعدة بيانات DAAD مصفاة على برامج EPOS: هندسة واقتصاد وبيئة وحوكمة.',
        url: 'https://www.daad.de/en/',
      },
      {
        title: 'قدّم مباشرة للجامعة',
        description: 'أرسل استمارة DAAD والوثائق لمنسق البرنامج قبل موعده الخاص (غالباً أغسطس-أكتوبر).',
      },
      {
        title: 'المقابلة والانتقاء',
        description: 'المقبولون مبدئياً يجرون مقابلة ثم تصل النتائج مع دعم ما قبل السفر.',
      },
    ],
    upvotes: 15,
    bookmarks: 20,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o127',
    slug: 'fulbright-macece-usa',
    name: 'Fulbright Foreign Student Program - USA (MACECE)',
    tagline: 'Fully-funded US master\'s/PhD via the Moroccan-American Commission',
    description:
      'The Fulbright Foreign Student Program, administered in Morocco by MACECE (Moroccan-American Commission for Educational and Cultural Exchange), funds graduate study in the United States: tuition, living stipend, airfare and health benefits. Selection is competitive and merit-based - TOEFL/GRE preparation matters. The annual call typically opens in spring with national interviews for finalists.',
    url: 'https://macece.ma/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=macece.ma&sz=64',
    category: 'scholarship',
    tags: ['usa', 'fulbright', 'macece', 'phd', 'masters'],
    pricing: 'free',
    steps: [
      {
        title: 'Watch MACECE announcements',
        description:
          'Follow macece.ma for the annual call (usually spring); review field priorities and eligibility.',
        url: 'https://macece.ma/',
      },
      {
        title: 'Build test scores early',
        description:
          'Prepare TOEFL iBT and GRE/GMAT - strong scores are decisive for both Fulbright and university admission.',
      },
      {
        title: 'Apply & interview nationally',
        description:
          'Submit the online dossier (essays, recommendations, transcripts); shortlisted candidates interview with the commission.',
      },
    ],
    nameAr: 'برنامج فولبرايت - الولايات المتحدة (MACECE)',
    taglineAr: 'ماستر أو دكتوراه ممولة بالكامل في أمريكا عبر اللجنة المغربية الأمريكية',
    descriptionAr: 'برنامج فولبرايت للطلبة الأجانب تديره بالمغرب اللجنة المغربية الأمريكية للتبادل التربوي والثقافي، ويمول الدراسات العليا بأمريكا: رسوم وراتب شهري وسفر وتأمين. الانتقاء بالجدارة ويتطلب تحضيراً مبكراً للـTOEFL والGRE، مع إعلان سنوي في الربيع ومقابلات وطنية.',
    stepsAr: [
      {
        title: 'تابع إعلانات MACECE',
        description: 'راقب موقع اللجنة لإعلان الدعوة السنوية (غالباً في الربيع) وشروط الأهلية.',
        url: 'https://macece.ma/',
      },
      {
        title: 'جهّز اختباراتك مبكراً',
        description: 'درجات TOEFL وGRE الجيدة حاسمة للمنحة وللقبول الجامعي.',
      },
      {
        title: 'قدّم الملف وقابل اللجنة',
        description: 'أرسل الملف الإلكتروني (مقالات وتوصيات وكشوف) ثم المقابلة الوطنية للمصنفين.',
      },
    ],
    upvotes: 16,
    bookmarks: 19,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o128',
    slug: 'eiffel-excellence-scholarship',
    name: 'Eiffel Excellence Scholarship - France',
    tagline: '€1,181/month master\'s or €1,700/month PhD - nominated by top French schools',
    description:
      'The Eiffel Excellence Scholarship is France\'s elite award for top international students: €1,181/month at master\'s level (plus flights, insurance and cultural activities) or €1,700/month at PhD level. You cannot apply directly - you must apply to a French public institution and convince it to nominate you for Eiffel. Campuses submit candidacies once a year (typically January); priority fields include engineering, economics, law and political science.',
    url: 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence',
    logoUrl: 'https://www.google.com/s2/favicons?domain=campusfrance.org&sz=64',
    category: 'scholarship',
    tags: ['france', 'eiffel', 'excellence', 'masters', 'phd'],
    pricing: 'free',
    steps: [
      {
        title: 'Target Eiffel-participating institutions',
        description:
          'Shortlist French universities/grandes écoles and mention Eiffel ambition in your motivation letter.',
        url: 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence',
      },
      {
        title: 'Get admitted & nominated',
        description:
          'Only the institution can nominate you - excellence (grades, rank) and a clean study plan are decisive.',
      },
      {
        title: 'Institution submits by ~January',
        description:
          'Campuses send Eiffel files annually; results in March-April before the academic year starts.',
      },
    ],
    nameAr: 'منحة إيفيل للتميز - فرنسا',
    taglineAr: '1181 يورو شهرياً للماستر و1700 للدكتوراه - بترشيح من المدارس الفرنسية العليا',
    descriptionAr: 'إيفيل منحة النخبة الفرنسية للطلبة الدوليين المتميزين: 1181 يورو شهرياً في الماستر أو 1700 في الدكتوراه مع السفر والتأمين. لا يمكن التقديم مباشرة - يجب الحصول على قبول من مؤسسة فرنسية وإقناعها بترشيحك، وتقدم المؤسسات ملفاتها سنوياً في يناير غالباً.',
    stepsAr: [
      {
        title: 'استهدف مؤسسات مشاركة',
        description: 'اختر جامعات ومدارس فرنسية عليا وأشر إلى طموحك لمنحة إيفيل في رسالتك.',
        url: 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence',
      },
      {
        title: 'احصل على القبول والترشيح',
        description: 'المؤسسة وحدها تترشحك - النقط والترتيب وخطة الدراسة حاسمة.',
      },
      {
        title: 'تُرسل الملفات في يناير',
        description: 'تقدم الكليات ملفات إيفيل سنوياً وتظهر النتائج في مارس-أبريل.',
      },
    ],
    upvotes: 14,
    bookmarks: 18,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o129',
    slug: 'amci-bilateral-scholarships',
    name: 'AMCI - Bilateral Government Scholarships',
    tagline: 'Morocco\'s official agency for foreign-government scholarships (Hungary, Romania, Türkiye…)',
    description:
      'AMCI (Agence Marocaine de Coopération Internationale), under the Ministry of Foreign Affairs, manages all bilateral scholarship offers that foreign governments grant to Moroccan students - Stipendium Hungaricum (Hungary), Romania, Türkiye Bursları coordination, Russia, China Type A, Cuba, and more. Calls are published on amci.ma and relayed through university delegations; dossiers are submitted via your academy when the call opens.',
    url: 'https://amci.ma/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=amci.ma&sz=64',
    category: 'scholarship',
    tags: ['morocco', 'amci', 'bilateral', 'hungary', 'romania'],
    pricing: 'free',
    steps: [
      {
        title: 'Track calls on amci.ma',
        description:
          'Bilateral offers open irregularly - monitor the site and your regional academy announcements.',
        url: 'https://amci.ma/',
      },
      {
        title: 'Submit via your academy',
        description:
          'Dossiers go through the provincial education academy with transcripts, ID and medical forms as specified per call.',
      },
      {
        title: 'Nomination & placement',
        description:
          'AMCI forwards ranked nominations to the donor country; placements and visas follow through the embassy.',
      },
    ],
    nameAr: 'الوكالة المغربية للتعاون الدولي AMCI',
    taglineAr: 'الجهة الرسمية لمنح الحكومات الأجنبية - هنغاريا ورومانيا وتركيا وغيرها',
    descriptionAr: 'تدير الوكالة المغربية للتعاون الدولي جميع المنح الثنائية التي تقدمها حكومات أجنبية للطلبة المغاربة: Stipendium Hungaricum الهنغارية ورومانيا وتركيا وروسيا والصين (مسار السفارة) وغيرها. تنشر الدعوات على موقع الوكالة وتُودع الملفات عبر المديريات الإقليمية عند انفتاح الدعوة.',
    stepsAr: [
      {
        title: 'تابع الدعوات على amci.ma',
        description: 'الدعوات تنفتح في مواعيد غير ثابتة - راقب الموقع والأكاديميات الجهوية.',
        url: 'https://amci.ma/',
      },
      {
        title: 'قدّم عبر أكاديميتك',
        description: 'تودع الملفات لدى الأكاديمية الإقليمية مع النقط والوثائق الطبية حسب كل دعوة.',
      },
      {
        title: 'الترشيح والتوجيه',
        description: 'تحيل الوكالة الترشيحات مرتبة للدولة المانحة ثم تتم إجراءات التأشيرة عبر السفارة.',
      },
    ],
    upvotes: 15,
    bookmarks: 21,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o130',
    slug: 'bourses-ministere-enseignement-superieur',
    name: 'Ministry of Higher Education Bourses (Mérite & Fidélité)',
    tagline: 'Official Moroccan government scholarships - merit abroad + loyalty grants',
    description:
      'The Moroccan Ministry of Higher Education (ENSSUP) runs the national scholarship system for public-university laureates: the Bourse de Mérite funds the top-ranked graduates to continue master\'s and PhD studies in prestigious universities abroad, while Bourses de Fidélité/Excellence support students continuing in Moroccan institutions. Selection is strictly based on yearly rankings and diploma honors; calls open each summer after results via your academy and the ministry platform.',
    url: 'https://www.enssup.gov.ma/',
    logoUrl: '/logos/enssup.svg',
    category: 'scholarship',
    tags: ['morocco', 'government', 'merit', 'bourse', 'laureats'],
    pricing: 'free',
    steps: [
      {
        title: 'Rank high in your institution',
        description:
          'Eligibility is ranking-based: finish in the top of your promotion (licence/master/engineering cycle) with honors.',
      },
      {
        title: 'Watch the summer call',
        description:
          'Calls publish on enssup.gov.ma and through university academies right after annual results (July-September).',
        url: 'https://www.enssup.gov.ma/',
      },
      {
        title: 'Submit via your academy',
        description:
          'Hand in transcripts, diplomas and ID at your academy within the deadline; mérite winners get country + university placement abroad.',
      },
    ],
    nameAr: 'منح وزارة التعليم العالي - الجدارة والوفاء',
    taglineAr: 'منح حكومية مغربية رسمية - الجدارة للدراسة بالخارج ومنح الوفاء محلياً',
    descriptionAr: 'تدير وزارة التعليم العالي المنظومة الوطنية للمنح لنابغي الجامعات والمدارس العليا المغربية: منحة الجدارة تموّل مواصلين الماستر والدكتوراه في جامعات مرموقة بالخارج، ومنح الوفاء والتميز تدعم المواصلين داخل المغرب. الانتقاء يعتمد على الترتيب السنوي وميزة الشهادة، وتُفتح الدعوات صيفاً عبر الأكاديميات والمنصة الوزارية.',
    stepsAr: [
      {
        title: 'تحقق ترتيباً متقدماً',
        description: 'الأهلية قائمة على الترتيب: اكنز ضمن أوائل دفعتك بميزة شرف.',
      },
      {
        title: 'راقب دعوة الصيف',
        description: 'تنشر الدعوات على enssup.gov.ma وعبر الأكاديميات بعد النتائج (يوليو-شتنبر).',
        url: 'https://www.enssup.gov.ma/',
      },
      {
        title: 'قدّم عبر أكاديميتك',
        description: 'سلّم الكشوف والشهادات وبطاقة التعريف في الأجل؛ المقبولون في الجدارة يُوجهون للخارج.',
      },
    ],
    upvotes: 18,
    bookmarks: 26,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o131',
    slug: 'fondation-ocp-scholarships',
    name: 'Fondation OCP Scholarships',
    tagline: 'Excellence scholarships for Moroccan engineers & scientists - OCP Group foundation',
    description:
      'Fondation OCP supports Morocco\'s future engineers and scientists through excellence scholarships and academic partnerships (notably with UM6P): funding for engineering cycles, master\'s and PhD programs in Morocco and abroad, in fields aligned with the group\'s ecosystem - mining, chemistry, agriculture, data/AI, energy and industrial management. Calls target high-potential students, often with social-criteria considerations alongside academic merit.',
    url: 'https://www.ocpfoundation.org/en',
    logoUrl: '/logos/ocp.svg',
    category: 'scholarship',
    tags: ['morocco', 'ocp', 'engineering', 'excellence', 'scholarship'],
    pricing: 'free',
    steps: [
      {
        title: 'Follow the foundation calls',
        description:
          'Scholarship campaigns are announced on the OCP Foundation pages when intakes open - requirements vary per program.',
        url: 'https://www.ocpfoundation.org/en/education-en',
      },
      {
        title: 'Build a merit + impact file',
        description:
          'Strong scientific results, a clear field alignment (mining, agri, AI, energy…) and social-impact motivation strengthen candidacy.',
      },
      {
        title: 'Apply online & interview',
        description:
          'Submit the dossier on the platform; shortlisted candidates pass selection interviews before final awarding.',
      },
    ],
    nameAr: 'منح مؤسسة OCP',
    taglineAr: 'منح التميز للمهندسين والعلماء المغاربة - مؤسسة مجموعة المكتب الشريف',
    descriptionAr: 'دعم مؤسسة OCP لجيل المستقبل من المهندسين والعلماء المغاربة عبر منح التميز والشراكات الأكاديمية (ومنها UM6P): تمويل الأطوار الهندسية والماستر والدكتوراه بالمغرب وخارجه في تخصصات كالتعدين والكيمياء والفلاحة والذكاء الاصطناعي والطاقة، بمعايير جدارة ووضعية اجتماعية.',
    stepsAr: [
      {
        title: 'تابع دعوات المؤسسة',
        description: 'تُعلن الحملات على صفحات مؤسسة OCP عند انفتاح الإدخالات بحسب كل برنامج.',
        url: 'https://www.ocpfoundation.org/ar',
      },
      {
        title: 'جهّز ملف جدارة وأثر',
        description: 'نتائج علمية قوية وتخصص منسجم (تعدين، فلاحة، ذكاء اصطناعي، طاقة) وحافز اجتماعي.',
      },
      {
        title: 'قدّم إلكترونياً وقابل اللجنة',
        description: 'أرسل الملف عبر المنصة ثم مقابلات الانتقاء قبل منح المنحة النهائي.',
      },
    ],
    upvotes: 16,
    bookmarks: 22,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o132',
    slug: 'phosboucraa-foundation-scholarships',
    name: 'Phosboucraâ Foundation Scholarships',
    tagline: 'Dedicated bourses for students from Morocco\'s southern provinces',
    description:
      'The Phosboucraâ Foundation (OCP Group) runs education programs dedicated to the southern provinces (Laâyoune-Sakia El Hamra, Dakhla-Oued Ed-Dahab, Guelmim-Oued Noun…): excellence scholarships for licence, master\'s and engineering studies in Morocco and abroad, plus language preparation and mentorship tracks. Goal: build local talent pipelines in management, engineering, and digital skills.',
    url: 'https://www.phosboucraafoundation.org/',
    logoUrl: '/logos/phosboucraa.svg',
    category: 'scholarship',
    tags: ['morocco', 'southern-provinces', 'scholarship', 'foundation'],
    pricing: 'free',
    steps: [
      {
        title: 'Check residency eligibility',
        description:
          'Open primarily to students originating from or residing in the southern provinces.',
        url: 'https://www.phosboucraafoundation.org/',
      },
      {
        title: 'Prepare your academic file',
        description:
          'Bac/licence results, orientation choices and language level; some tracks include prep semesters.',
      },
      {
        title: 'Apply during campaign windows',
        description:
          'Applications open periodically on the foundation site; selections combine merit and regional criteria.',
      },
    ],
    nameAr: 'منح مؤسسة فوسبوكرا',
    taglineAr: 'منح مخصصة لطلبة الأقاليم الجنوبية للمغرب',
    descriptionAr: 'مؤسسة فوسبوكرا (مجموعة OCP) تشغل برامج تعليمية مخصصة لأقاليم الجنوب (العيون، الداخلة، كلميم…): منح التميز لليسانس والماستر والأطوار الهندسية بالمغرب وخارجه، مع مسارات تحضيرية للغة وإرشاد. الهدف بناء رأس المال البشري المحلي في التدبير والهندسة والمهارات الرقمية.',
    stepsAr: [
      {
        title: 'تحقق من شرط الإقامة',
        description: 'مفتوحة أساساً لطلبة الأقاليم الجنوبية بالأصل أو بالإقامة.',
        url: 'https://www.phosboucraafoundation.org/',
      },
      {
        title: 'جهّز ملفك الدراسي',
        description: 'نتائج الباكالوريا أو الليسانس ورغبات التوجيه ومستوى اللغة.',
      },
      {
        title: 'قدّم في فتح الحملات',
        description: 'تُفتح الترشيحات دورياً على موقع المؤسسة ويجمع الانتقاء بين الجدارة والمعايير الجهوية.',
      },
    ],
    upvotes: 13,
    bookmarks: 17,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o134',
    slug: 'ai-fundamentals-for-beginners-track',
    name: 'AI Fundamentals - For Beginners (Highly Recommended)',
    tagline: 'Python + data fundamentals, ~28h of content - your zero-to-AI on-ramp',
    description:
      'The starting track we recommend to every aspiring AI engineer with no background yet: Python programming fundamentals plus data fundamentals - around 28 hours of structured content covering Python syntax, working with data, statistics basics, and how ML/AI systems consume that data. Finish this before touching LLM frameworks; it is the foundation everything else in AI engineering builds on. Free resources mapped step-by-step below.',
    url: 'https://www.kaggle.com/learn',
    logoUrl: 'https://www.google.com/s2/favicons?domain=kaggle.com&sz=64',
    category: 'learning',
    tags: ['ai-fundamentals', 'python', 'data', 'beginners', 'recommended'],
    pricing: 'free',
    steps: [
      {
        title: 'Learn Python basics first (~12h)',
        description:
          'Syntax, lists/dicts, functions, loops and file handling - use the Python-100-Days repo (Days 1-15) or Kaggle\'s free Python course.',
        url: 'https://www.kaggle.com/learn/python',
      },
      {
        title: 'Add data fundamentals (~16h)',
        description:
          'pandas, cleaning, descriptive statistics and visualization - Kaggle pandas + intro to data courses cover exactly this.',
        url: 'https://www.kaggle.com/learn/pandas',
      },
      {
        title: 'Bridge into AI',
        description:
          'Finish with Microsoft AI-For-Beginners lessons 1-8 to connect your new Python/data skills to real AI systems.',
      },
    ],
    nameAr: 'أساسيات الذكاء الاصطناعي - للمبتدئين (موصى به بشدة)',
    taglineAr: 'بايثون وأساسيات البيانات، ~28 ساعة محتوى - بوابتك إلى عالم الذكاء الاصطناعي',
    descriptionAr: 'المسار الذي ننصح به كل من يريد دخول هندسة الذكاء الاصطناعي بدون خلفية: أساسيات بايثون ثم أساسيات البيانات - حوالي 28 ساعة منظمة تغطي البرمجة والتعامل مع البيانات والإحصاء وكيف تستخدمها أنظمة الذكاء الاصطناعي. أكمله قبل الانتقال إلى أطر عمل LLM.',
    stepsAr: [
      {
        title: 'ابدأ ببايثون (~12 ساعة)',
        description: 'الأساسيات والقوائم والدوال - استخدم مستودع Python-100-Days أو دورة كاغل المجانية.',
        url: 'https://www.kaggle.com/learn/python',
      },
      {
        title: 'أضف أساسيات البيانات (~16 ساعة)',
        description: 'pandas والتنظيف والإحصاء والرسوم - دورات كاغل تغطيها بالضبط.',
        url: 'https://www.kaggle.com/learn/pandas',
      },
      {
        title: 'انتقل إلى الذكاء الاصطناعي',
        description: 'اختم بدروس Microsoft AI-For-Beginners 1-8 لربط مهاراتك بأنظمة AI حقيقية.',
      },
    ],
    upvotes: 25,
    bookmarks: 24,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o135',
    slug: 'ai-engineering-langchain-intermediate',
    name: 'AI Engineering with LangChain - For Intermediate (Highly Recommended)',
    tagline: 'Build & ship AI applications: RAG, agents, tool use + AI-assisted coding (Copilot/Replit)',
    description:
      'The intermediate track for turning AI knowledge into working products: AI software engineering with LangChain (chains, RAG pipelines, agents, tool integration) while using AI coding assistants like GitHub Copilot and Replit Agent to accelerate development. This is the skill set companies actually hire for right now - moving from "I know about LLMs" to "I ship AI applications." Make progress here after fundamentals.',
    url: 'https://academy.langchain.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=academy.langchain.com&sz=64',
    category: 'learning',
    tags: ['langchain', 'ai-engineering', 'rag', 'agents', 'copilot', 'recommended'],
    pricing: 'freemium',
    steps: [
      {
        title: 'LangChain Academy courses (free)',
        description:
          'Take Introduction to LangGraph and chatbot courses - official hands-on modules from the LangChain team.',
        url: 'https://academy.langchain.com/',
      },
      {
        title: 'Build with AI pair-programming',
        description:
          'Use GitHub Copilot or Replit Agent inside a real project: wire an LLM chain to your own data with RAG.',
      },
      {
        title: 'Ship one complete app',
        description:
          'Deploy a small but complete AI app (chat-with-your-docs or an agent with tools) - this becomes your portfolio piece.',
      },
    ],
    nameAr: 'هندسة الذكاء الاصطناعي مع LangChain - للمتوسطين (موصى به بشدة)',
    taglineAr: 'ابنِ وأطلق تطبيقات AI: RAG والوكلاء والأدوات + برمجة بمساعدة Copilot/Replit',
    descriptionAr: 'المسار المتوسط لتحويل معرفتك بالذكاء الاصطناعي إلى منتجات فعلية: هندسة تطبيقات AI باستخدام LangChain (سلاسل وأنابيب RAG والوكلاء وتكامل الأدوات) مع استخدام مساعدات البرمجة مثل GitHub Copilot وReplit لتسريع التطوير. هذه هي المهارة التي تبحث عنها الشركات الآن - الانتقال من أعرف عن LLMs إلى أُطلق تطبيقات AI.',
    stepsAr: [
      {
        title: 'دورات LangChain Academy (مجانية)',
        description: 'ابدأ بمقدمة LangGraph ودورات الشات بوت - وحدات رسمية عملية من فريق LangChain.',
        url: 'https://academy.langchain.com/',
      },
      {
        title: 'ابنِ ببرمجة مساعدة بالذكاء',
        description: 'استخدم Copilot أو Replit Agent في مشروع حقيقي: اربط سلسلة LLM ببياناتك عبر RAG.',
      },
      {
        title: 'أطلق تطبيقاً كاملاً',
        description: 'انشر تطبيق AI صغيراً مكتملاً (دردشة مع مستنداتك أو وكيل بأدوات) ليكون قطعة معرض أعمالك.',
      },
    ],
    upvotes: 28,
    bookmarks: 26,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o136',
    slug: 'data-skills-for-business',
    name: 'Data Skills for Business',
    tagline: 'Practical data literacy: spreadsheets → SQL → dashboards → AI-assisted analysis',
    description:
      'A pragmatic track for professionals and founders who need to make data-driven decisions without becoming engineers: structuring and cleaning business data, SQL querying essentials, spreadsheet mastery, dashboard building (Looker Studio / Power BI), and using AI tools to analyze and summarize business data. No heavy math - just the exact skills that turn raw numbers into decisions.',
    url: 'https://www.kaggle.com/learn',
    logoUrl: 'https://www.google.com/s2/favicons?domain=kaggle.com&sz=64',
    category: 'learning',
    tags: ['data', 'business', 'sql', 'dashboards', 'analytics'],
    pricing: 'free',
    steps: [
      {
        title: 'Data cleaning & analysis basics',
        description:
          'Start with Kaggle\'s Data Cleaning and Intro to Data courses - structure any messy business dataset.',
        url: 'https://www.kaggle.com/learn',
      },
      {
        title: 'SQL essentials',
        description:
          'Learn to query company databases directly - Intro to SQL + Advanced SQL on Kaggle covers the daily-use 80%.',
        url: 'https://www.kaggle.com/learn/intro-to-sql',
      },
      {
        title: 'Dashboards + AI assist',
        description:
          'Visualize results in Looker Studio or Power BI, then use AI tools to generate summaries, trends and reports faster.',
      },
    ],
    nameAr: 'مهارات البيانات للأعمال',
    taglineAr: 'إلمام عملي بالبيانات: جداول ← SQL ← لوحات تحكم ← تحليل بمساعدة الذكاء الاصطناعي',
    descriptionAr: 'مسار عملي للمهنيين والمؤسسين الذين يحتاجون قرارات مبنية على البيانات دون أن يصبحوا مهندسين: تنظيف بيانات العمل وأساسيات SQL وإتقان الجداول وبناء لوحات المتابعة واستخدام أدوات الذكاء الاصطناعي لتحليل بيانات نشاطك وتلخيصها. بدون رياضيات معقدة - فقط المهارات التي تحول الأرقام إلى قرارات.',
    stepsAr: [
      {
        title: 'أساسيات التنظيف والتحليل',
        description: 'ابدأ بدورتي Data Cleaning وIntro to Data على كاغل لتنظيم أي بيانات عمل فوضوية.',
        url: 'https://www.kaggle.com/learn',
      },
      {
        title: 'أساسيات SQL',
        description: 'تعلّم استعلام قواعد بيانات شركتك مباشرة - مقدمة SQL وAdvanced SQL يغطيان 80% اليومية.',
        url: 'https://www.kaggle.com/learn/intro-to-sql',
      },
      {
        title: 'لوحات التحكم ومساعدة AI',
        description: 'اعرض النتائج في Looker Studio أو Power BI ثم استخدم أدوات AI للتلخيص والتقارير.',
      },
    ],
    upvotes: 21,
    bookmarks: 19,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o137',
    slug: 'datacamp-free-access-week',
    name: 'DataCamp Free Access Week - Aug 24-30',
    tagline: '700+ premium data & AI courses, 160+ projects and certifications - free for one week, no credit card',
    description:
      'DataCamp opens its entire Premium platform for free from Aug 24 to Aug 30, 2026: 700+ interactive courses (Python, SQL, R, Power BI, Claude Code, OpenAI API, MLOps…), 160+ real-world projects for your portfolio, skill tracks, and industry-recognized certifications. Everything runs in the browser - nothing to install. Normally $39/month; during Free Access Week you get it all with just a free account. Our advice below maps exactly what to take based on your level.',
    url: 'https://www.datacamp.com/campaign/free-access-week-august-2026',
    logoUrl: 'https://www.google.com/s2/favicons?domain=datacamp.com&sz=64',
    category: 'learning',
    tags: ['datacamp', 'free-week', 'python', 'sql', 'ai', 'limited-time'],
    pricing: 'free',
    steps: [
      {
        title: 'Create your account NOW (Aug 24-30)',
        description:
          'Sign up free at the campaign page during the window - Premium unlocks instantly, no credit card required.',
        url: 'https://www.datacamp.com/campaign/free-access-week-august-2026',
      },
      {
        title: 'Track 1 · AI Fundamentals (For Beginners)',
        description:
          'Python + Data Fundamentals (~28h of content). On DataCamp take: Intro to Python → Intermediate Python → Intro to Data / data fundamentals courses. No prerequisites.',
        url: 'https://www.datacamp.com/courses/intro-to-python-for-data-science',
      },
      {
        title: 'Track 2 · AI Engineering with LangChain (Intermediate) ⭐ Highly Recommended',
        description:
          'Developing AI applications & AI software engineering using tools like GitHub Copilot and Replit. On DataCamp take: Prompt Engineering with LangChain → Working with the OpenAI API → Claude Code 101 → Software Development with Claude Code. Make real progress here - this is the hireable skill set.',
        url: 'https://www.datacamp.com/courses/prompt-engineering-with-langchain',
      },
      {
        title: 'Track 3 · Data Skills for Business',
        description:
          'Intro to SQL → Data-Driven Decision-Making in SQL → Introduction to Power BI. Practical business data literacy: querying, dashboards and decisions - no heavy math.',
        url: 'https://www.datacamp.com/courses/intro-to-sql',
      },
    ],
    nameAr: 'أسبوع DataCamp المجاني - 24 إلى 30 غشت',
    taglineAr: 'أكثر من 700 دورة بيانات وذكاء اصطناعي و160 مشروعاً وشهادات - مجاناً لأسبوع كامل وبطاقة بنكية غير مطلوبة',
    descriptionAr: 'تفتح DataCamp منصتها المدفوعة بالكامل مجاناً من 24 إلى 30 غشت 2026: أكثر من 700 دورة تفاعلية (بايثون، SQL، Power BI، Claude Code، OpenAI API، MLOps…) و160 مشروعاً واقعياً وشهادات معتمدة. كل شيء يعمل في المتصفح بدون تثبيت - عادة 39$ شهرياً. نصائحنا أدناه تحدد بالضبط ما تأخذه حسب مستواك.',
    stepsAr: [
      {
        title: 'أنشئ حسابك الآن (24-30 غشت)',
        description: 'سجّل مجاناً في صفحة الحملة خلال الفترة - يُفتح البريميوم فوراً بدون بطاقة بنكية.',
        url: 'https://www.datacamp.com/campaign/free-access-week-august-2026',
      },
      {
        title: 'المسار 1 · أساسيات الذكاء الاصطناعي (للمبتدئين)',
        description: 'بايثون وأساسيات البيانات (~28 ساعة). على DataCamp: Intro to Python ← Intermediate Python ← دورات أساسيات البيانات. بدون متطلبات سابقة.',
        url: 'https://www.datacamp.com/courses/intro-to-python-for-data-science',
      },
      {
        title: 'المسار 2 · هندسة AI مع LangChain (متوسط) ⭐ موصى به بشدة',
        description: 'تطوير تطبيقات الذكاء الاصطناعي والهندسة البرمجية بأدوات مثل Copilot وReplit. على DataCamp: Prompt Engineering LangChain ← OpenAI API ← Claude Code 101. حقق تقدماً حقيقياً هنا - هذه مهارة يطلبها سوق العمل.',
        url: 'https://www.datacamp.com/courses/prompt-engineering-with-langchain',
      },
      {
        title: 'المسار 3 · مهارات البيانات للأعمال',
        description: 'Intro to SQL ← Data-Driven Decision-Making in SQL ← Power BI. إلمام عملي ببيانات الأعمال: استعلام ولوحات وقرارات بدون رياضيات معقدة.',
        url: 'https://www.datacamp.com/courses/intro-to-sql',
      },
    ],
    upvotes: 38,
    bookmarks: 41,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o138',
    slug: 'openship-open-source-deployment',
    name: 'Openship - Open-Source Deployment Platform',
    tagline: 'Deploy like on Vercel but self-hosted - CLI, dashboard or desktop, zero lock-in',
    description:
      'Openship is an open-source deployment platform: install, connect and ship apps from a CLI, web dashboard or desktop app - on their cloud or fully self-hosted on your own servers. Plain Docker containers and standard manifests (openship.json reviewed in pull requests like the rest of your code), automatic HTTPS via Let\'s Encrypt, telemetry off by default, and Apache 2.0 licensing. Move projects between machines freely - no vendor lock-in, ever. A genuine open alternative for developers who want Vercel-style workflows without giving up control.',
    url: 'https://openship.io',
    logoUrl: 'https://www.google.com/s2/favicons?domain=openship.io&sz=64',
    category: 'tool',
    tags: ['openship', 'deployment', 'self-hosted', 'open-source', 'docker'],
    pricing: 'open-source',
    steps: [
      {
        title: 'Pick cloud or self-hosted',
        description:
          'Use Openship Cloud to start instantly, or run the platform on your own server (Linux/macOS/Windows, ARM & x86).',
        url: 'https://openship.io',
      },
      {
        title: 'Connect and configure',
        description:
          'Install the CLI or desktop app, connect a server, and describe builds, env vars, domains and services in openship.json.',
      },
      {
        title: 'Ship and stay free',
        description:
          'Deploy with one command - containers, certificates and domains are managed automatically; leave or migrate any time with zero lock-in.',
      },
    ],
    nameAr: 'أوبن شيب - منصة نشر مفتوحة المصدر',
    taglineAr: 'انشر تطبيقاتك مثل Vercel لكن على سيرفرك - CLI أو لوحة ويب أو تطبيق سطح مكتب، بدون أي حصر',
    descriptionAr: 'أوبن شيب منصة نشر مفتوحة المصدر: ثبّت واربط وانشر تطبيقاتك عبر CLI أو لوحة ويب أو تطبيق سطح مكتب - على السحابة أو بالكامل على سيرفراتك الخاصة. حاويات Docker قياسية وملفات openship.json تُراجع في Pull Requests مثل بقية الكود، شهادات HTTPS تلقائية وتتبع معطّل افتراضياً ورخصة Apache 2.0 - انقل مشاريعك بحرية بدون احتكار.',
    stepsAr: [
      {
        title: 'اختر سحابياً أو ذاتي الاستضافة',
        description: 'ابدأ فوراً مع Openship Cloud أو شغّل المنصة على سيرفرك الخاص (Linux/macOS/Windows).',
        url: 'https://openship.io',
      },
      {
        title: 'اربط وجهّز الإعدادات',
        description: 'ثبّت CLI أو تطبيق سطح المكتب ووصف البناء والمتغيرات والدومينات في openship.json.',
      },
      {
        title: 'انشر وابقَ حرّاً',
        description: 'انشر بأمر واحد - الحاويات والشهادات والدومينات تدار تلقائياً وهاجر متى شئت بدون احتكار.',
      },
    ],
    upvotes: 17,
    bookmarks: 15,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o139',
    slug: 'the-changing-the-game-grant',
    name: 'The Changing the Game Grant',
    tagline: 'Grant backing local businesses led by minority or underrepresented founders',
    description: `A grant aimed at supporting and propelling local businesses led by minority or underrepresented entrepreneurs, providing crucial startup capital to accelerate growth and strengthen community impact.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/the-changing-the-game-grant/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=stanley1913.com&sz=64',
    category: 'forstartups',
    tags: ["grants", "minority-founders", "funding", "non-dilutive"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Review the eligibility criteria and submit your application through the program page.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/the-changing-the-game-grant/',
      },
    ],
    upvotes: 28,
    bookmarks: 5,
    submittedBy: 'u5',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o140',
    slug: 'the-breakthrough-grant-volume-iii',
    name: 'The Breakthrough Grant (Volume III)',
    tagline: '$5,000 community-funded grant for an ambitious woman entrepreneur',
    description: `A community funding initiative awarding a $5,000 grant to one ambitious woman entrepreneur to overcome the capital gap, take her business to the next level, and turn potential into concrete success.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/the-breakthrough-grant-volume-iii/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=heragenda.com&sz=64',
    category: 'forstartups',
    tags: ["grants", "women-founders", "funding", "non-dilutive"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Submit the short application form describing your business and how the grant would be used.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/the-breakthrough-grant-volume-iii/',
      },
    ],
    upvotes: 16,
    bookmarks: 3,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o141',
    slug: 'les-nouveaux-boss',
    name: 'Les Nouveaux Boss',
    tagline: 'Competition and support program propelling the next generation of entrepreneurs',
    description: `A competition and acceleration program for ambitious entrepreneurs and project holders, designed to launch the future figures of entrepreneurship through mentorship, visibility, and funding opportunities.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/les-nouveaux-boss/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=tv5monde.com&sz=64',
    category: 'forstartups',
    tags: ["competition", "mentorship", "funding", "africa"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Apply with your project pitch; selected candidates join the mentoring and competition phases.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/les-nouveaux-boss/',
      },
    ],
    upvotes: 27,
    bookmarks: 4,
    submittedBy: 'u2',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o142',
    slug: 'rabhacks',
    name: 'RAB’HACKS',
    tagline: '48-hour hackathon for students building solutions to major contemporary challenges',
    description: `RAB'HACKS is an intensive 48-hour hackathon for students and project holders, designed to spark innovation and entrepreneurship through hands-on development of tech solutions addressing major contemporary challenges.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/rabhacks/',
    logoUrl: 'https://www.start-up.ma/wp-content/uploads/2026/06/RABHACKS.png',
    category: 'forstartups',
    tags: ["hackathon", "students", "competition", "morocco"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Register as a team or individual and join the 48-hour build sprint in Rabat.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/rabhacks/',
      },
    ],
    upvotes: 22,
    bookmarks: 4,
    submittedBy: 'u3',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o143',
    slug: 'startup-world-cup',
    name: 'Startup World Cup',
    tagline: 'Global pitch competition by Pegasus Tech Ventures with a $1M investment prize',
    description: `The Startup World Cup is a major global competition organized by Pegasus Tech Ventures, connecting innovation ecosystems across 100+ regional conferences and offering finalists unique international visibility and a chance at a $1M investment prize.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/startup-world-cup/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=startupworldcup.io&sz=64',
    category: 'forstartups',
    tags: ["competition", "pitch", "venture-capital", "global"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Join a regional qualifying event or apply directly to pitch at the Grand Finale in San Francisco.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/startup-world-cup/',
      },
    ],
    upvotes: 15,
    bookmarks: 7,
    submittedBy: 'u4',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o144',
    slug: 'souss-massa-investment-awards',
    name: 'Souss Massa Investment Awards',
    tagline: 'Annual regional awards rewarding the best startups and projects in Souss-Massa',
    description: `An annual regional competition that rewards, funds, and showcases the best investment projects, startups, and innovative entrepreneurial initiatives driving the economy and job creation in Morocco's Souss-Massa region.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/souss-massa-investment-awards/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=agadirinvest.com&sz=64',
    category: 'forstartups',
    tags: ["competition", "awards", "morocco", "funding"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Submit your project file during the call-for-applications window to compete for awards.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/souss-massa-investment-awards/',
      },
    ],
    upvotes: 22,
    bookmarks: 9,
    submittedBy: 'u5',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o145',
    slug: 'climate-and-adaptation-award',
    name: 'Climate and Adaptation Award',
    tagline: 'National contest rewarding young founders tackling climate change challenges',
    description: `A national competition and support program that trains and rewards young Moroccan entrepreneurs developing innovative, sustainable solutions to the major challenges of climate change and adaptation.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/climate-and-adaptation-award/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=undp.org&sz=64',
    category: 'forstartups',
    tags: ["competition", "climate", "sustainability", "morocco"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Apply with your climate solution; finalists receive training, visibility, and prizes.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/climate-and-adaptation-award/',
      },
    ],
    upvotes: 10,
    bookmarks: 2,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o146',
    slug: 'open-startup-the-science-road-2026',
    name: 'Open Startup, The Science Road 2026',
    tagline: 'Two-track acceleration platform: Pre-Seed validation and Seed scaling',
    description: `The Science Road 2026 is a streamlined acceleration platform offering two tracks: a Pre-Seed track for solution validation and a Seed track for scaling technology startups and DeepTech projects.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/open-startup-the-science-road-2026/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=open-startup.org&sz=64',
    category: 'forstartups',
    tags: ["acceleration", "pre-seed", "seed", "deeptech"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Choose your track (Pre-Seed or Seed) and apply online with your team and product details.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/open-startup-the-science-road-2026/',
      },
    ],
    upvotes: 19,
    bookmarks: 11,
    submittedBy: 'u2',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o147',
    slug: 'women-in-tech-morocco-entrepreneurship-camp',
    name: 'Women in Tech Morocco Entrepreneurship Camp',
    tagline: 'Intensive bootcamp supporting and propelling women entrepreneurs in Morocco',
    description: `An intensive training camp designed to support and propel women entrepreneurs in Morocco through hands-on workshops, expert sessions, and targeted mentorship.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/women-in-tech-morocco-entrepreneurship-camp/',
    logoUrl: 'https://www.start-up.ma/wp-content/uploads/2026/06/WIT-h.png',
    category: 'forstartups',
    tags: ["bootcamp", "women-founders", "morocco", "mentorship"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Apply for the next camp cohort; sessions combine training, workshops, and mentor matching.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/women-in-tech-morocco-entrepreneurship-camp/',
      },
    ],
    upvotes: 8,
    bookmarks: 5,
    submittedBy: 'u3',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o148',
    slug: 'cap-innovation',
    name: 'CAP Innovation',
    tagline: 'OIF international incubation program for francophone founders aged 18-34',
    description: `CAP Innovation is an international support and seed program initiated by the OIF for young francophone entrepreneurs aged 18-34, propelling innovative projects with high social and environmental impact through mentorship and financial grants.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/cap-innovation/',
    logoUrl: 'https://www.francophonie.org/sites/default/files/favicon-64.png',
    category: 'forstartups',
    tags: ["incubation", "francophone", "grants", "social-impact"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Submit your innovative project via the OIF application platform when calls open.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/cap-innovation/',
      },
    ],
    upvotes: 10,
    bookmarks: 7,
    submittedBy: 'u4',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o149',
    slug: 'startup-maroc-2030',
    name: 'StartUp Maroc 2030',
    tagline: 'Excellence incubation program for Tech & Data startups in Morocco',
    description: `StartUp Maroc 2030 is an excellence incubation program for Tech and Data startups in Morocco, offering intensive support, international connections, and significant non-dilutive funding to bring innovations to market faster.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/startup-maroc-2030/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=startupmaroc.org&sz=64',
    category: 'forstartups',
    tags: ["incubation", "non-dilutive", "tech", "morocco"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Apply with your Tech/Data startup; shortlisted teams join the intensive incubation track.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/startup-maroc-2030/',
      },
    ],
    upvotes: 12,
    bookmarks: 4,
    submittedBy: 'u5',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o150',
    slug: 'unicef-venture-fund',
    name: 'UNICEF Venture Fund',
    tagline: 'UNICEF fund financing open-source tech startups in developing countries',
    description: `The UNICEF Venture Fund invests in startups from developing countries, backing cutting-edge open-source technologies with strong potential for positive impact on children and their communities.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/unicef-venture-fund/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=unicef.org&sz=64',
    category: 'forstartups',
    tags: ["fund", "open-source", "social-impact", "africa"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Review the open call criteria and submit your open-source solution for funding consideration.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/unicef-venture-fund/',
      },
    ],
    upvotes: 28,
    bookmarks: 10,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o151',
    slug: 'au-startups-dealflow',
    name: 'AU-Startups Dealflow',
    tagline: 'Continuous dealflow platform connecting African startups to qualified investors',
    description: `AU-Startups Dealflow is an ongoing matchmaking platform where high-potential African startups can submit their dossier to be presented to a network of qualified investors (business angels and VC funds) to facilitate fundraising.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/au-startups-dealflow/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=au-startups.com&sz=64',
    category: 'forstartups',
    tags: ["fundraising", "investors", "africa", "dealflow"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Submit your pitch deck and financials to enter the investor dealflow pipeline.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/au-startups-dealflow/',
      },
    ],
    upvotes: 16,
    bookmarks: 3,
    submittedBy: 'u2',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o152',
    slug: 'the-home-grown-solutions-accelerator',
    name: 'The Home Grown Solutions Accelerator',
    tagline: 'Panafrican accelerator for local high-potential health and resilience solutions',
    description: `A pan-African accelerator designed to support the growth of local high-potential businesses. Initially focused on strengthening health systems, the program has expanded to back innovative solutions for resilient communities.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/the-home-grown-solutions-accelerator/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=nepad.org&sz=64',
    category: 'forstartups',
    tags: ["accelerator", "healthtech", "africa", "social-impact"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Apply with your local solution; selected ventures receive structured acceleration support.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/the-home-grown-solutions-accelerator/',
      },
    ],
    upvotes: 16,
    bookmarks: 8,
    submittedBy: 'u3',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o153',
    slug: 'africa-fundraising-incubator-afi',
    name: 'Africa Fundraising Incubator (AFI)',
    tagline: 'Training, challenge, and intensive workshop on fundraising for African NGOs',
    description: `The Africa Fundraising Incubator (AFI) is a support and funding program for African NGOs, community organizations, and social enterprises. It combines online training, a fundraising challenge, and an intensive workshop to grow sustainable impact.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/africa-fundraising-incubator-afi/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=newafricafund.org&sz=64',
    category: 'forstartups',
    tags: ["ngo", "fundraising", "training", "africa"],
    pricing: 'free',
    steps: [
      {
        title: 'How to participate',
        description: `Enroll in the online training, then compete in the fundraising challenge and workshop.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/africa-fundraising-incubator-afi/',
      },
    ],
    upvotes: 28,
    bookmarks: 10,
    submittedBy: 'u4',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o154',
    slug: 'omniroute',
    name: 'OmniRoute with Claude Code',
    tagline: 'Run Claude Code on free and alternative AI providers through one local router',
    description: `OmniRoute is a free, open local router that lets **Claude Code** talk to 160+ AI providers and models - including free-tier providers - while keeping Claude Code as your coding interface.

**How it works:** Claude Code -> OmniRoute (localhost:20128) -> your chosen provider/model.

**Highlights:**

- Create separate profiles per model (e.g. glm52, kimi-k27, deepseek-pro) with \`omniroute setup-claude\`
- Switch models without leaving Claude Code via \`omniroute launch --profile <name>\`
- Auto fallback, compression, MCP/A2A support, desktop app and PWA
- Your keys stay local; the dashboard runs at http://localhost:20128

> Note: free access means a provider may expose Claude through its own service and limits - not "Claude Pro for free".`,
    url: 'https://omniroute.online',
    logoUrl: '/logos/omniroute.png',
    category: 'api-access',
    tags: ['claude-code', 'free-tier', 'ai-router', 'local', 'multi-model'],
    pricing: 'free',
    steps: [
      {
        title: '1. Install Claude Code',
        description: `Open Terminal and run: curl -fsSL https://claude.ai/install.sh | bash - then restart Terminal and verify with: claude --version`,
        url: 'https://docs.claude.com/en/docs/claude-code/overview',
      },
      {
        title: '2. Install & start OmniRoute',
        description: `Run: npm install -g omniroute - then start it with: omniroute - and open http://localhost:20128 in your browser.`,
        url: 'https://omniroute.online',
      },
      {
        title: '3. Add a provider & create your API key',
        description: `In the dashboard go to Providers -> Add Provider and connect the provider you want (free tiers supported). Then create an API key (looks like oma_live_xxx) - keep it private, never share or screenshot it.`,
        url: 'https://omniroute.online',
      },
      {
        title: '4. Let OmniRoute configure Claude Code',
        description: `Run: omniroute setup-claude - this creates profiles under ~/.claude/profiles/ (one per connected model). Inspect them with: ls ~/.claude/profiles`,
        url: 'https://omniroute.online',
      },
      {
        title: '5. Launch Claude Code through OmniRoute',
        description: `Run: omniroute launch --profile glm52 (or any profile you created). Claude Code now works through OmniRoute - switch models anytime by launching a different profile. Tip: Claude Code talks to http://localhost:20128 without /v1.`,
        url: 'https://omniroute.online',
      },
    ],
    nameAr: 'OmniRoute مع Claude Code',
    taglineAr: 'شغّل Claude Code عبر مزودي ذكاء اصطناعي مجانيين وبدائلهم من خلال موجّه محلي واحد',
    descriptionAr: `OmniRoute هو موجّه محلي مجاني ومفتوح يتيح لـ **Claude Code** التواصل مع أكثر من 160 مزود ونموذج ذكاء اصطناعي - بما في ذلك المزودين ذوي الخطط المجانية - مع إبقاء Claude Code واجهتك للبرمجة.

**كيف يعمل:** Claude Code -> OmniRoute (localhost:20128) -> المزود/النموذج الذي تختاره.

**أبرز الميزات:**

- أنشئ ملفات تعريف منفصلة لكل نموذج (مثل glm52 و kimi-k27 و deepseek-pro) عبر \`omniroute setup-claude\`
- بدّل النماذج دون مغادرة Claude Code عبر \`omniroute launch --profile <name>\`
- تبديل تلقائي عند الأخطاء، ضغط، ودعم MCP/A2A، مع تطبيق سطح مكتب و PWA
- مفاتيحك تبقى محلية؛ لوحة التحكم تعمل على http://localhost:20128

> ملاحظة: الوصول المجاني يعني أن المزود قد يوفر Claude عبر خدمته الخاصة وبحدوده - وليس "Claude Pro مجاناً".`,
    stepsAr: [
      {
        title: '1. ثبّت Claude Code',
        description: `افتح الطرفية وشغّل: curl -fsSL https://claude.ai/install.sh | bash - ثم أعد فتح الطرفية وتحقق عبر: claude --version`,
        url: 'https://docs.claude.com/en/docs/claude-code/overview',
      },
      {
        title: '2. ثبّت OmniRoute وشغّله',
        description: `نفّذ: npm install -g omniroute - ثم شغّله بالأمر: omniroute - وافتح http://localhost:20128 في المتصفح.`,
        url: 'https://omniroute.online',
      },
      {
        title: '3. أضف مزوداً وأنشئ مفتاح API',
        description: `في لوحة التحكم انتقل إلى Providers <- Add Provider واربط المزود الذي تريده (تدعم الخطط المجانية). ثم أنشئ مفتاح API (يشبه oma_live_xxx) - احتفظ به سراً ولا تشاركه أو تلتقط له لقطة شاشة.`,
        url: 'https://omniroute.online',
      },
      {
        title: '4. دع OmniRoute يضبط Claude Code',
        description: `نفّذ: omniroute setup-claude - سينشئ ملفات تعريف تحت ~/.claude/profiles/ (ملف لكل نموذج متصل). اعرضها عبر: ls ~/.claude/profiles`,
        url: 'https://omniroute.online',
      },
      {
        title: '5. شغّل Claude Code عبر OmniRoute',
        description: `نفّذ: omniroute launch --profile glm52 (أو أي ملف تعريف أنشأته). سيعمل Claude Code الآن عبر OmniRoute - بدّل النماذج وقتما تشاء بتشغيل ملف تعريف آخر. ملاحظة: يتحدث Claude Code مع http://localhost:20128 دون /v1.`,
        url: 'https://omniroute.online',
      },
    ],
    upvotes: 34,
    bookmarks: 18,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o155',
    slug: 'genspark-free-trial',
    name: 'Genspark AI',
    tagline: 'First month free on Plus plan with 10,000 starting credits + unlimited chat/images for 2026',
    description: `Genspark is an AI Super Agent platform with access to premium models (GPT-5.2, Claude Opus 4.5, Gemini 3 Pro, Flux, Ideogram, Kling) for research, slides, images, video, and coding.

**Current Offer:**

- **First Month Free on Plus**: New users get the first month of Plus plan free (normally $24.99/mo) with 10,000 starting credits
- **Unlimited Chat & Images for 2026**: On paid plans, AI chat and image generation cost 0 credits through December 31, 2026
- **Free Plan (Forever)**: 100-200 daily credits (resets every 24h), 1GB storage, no credit card required

**Plans:**
- Free: $0, 100-200 credits/day, 1GB
- Plus: $24.99/mo ($19.99/mo annual), 10,000 credits/mo, 50GB, first month free
- Pro: $249.99/mo ($199.99/mo annual), 125,000 credits/mo, 1TB`,
    url: 'https://www.genspark.ai',
    logoUrl: 'https://www.google.com/s2/favicons?domain=genspark.ai&sz=64',
    category: 'tool',
    tags: ['ai', 'super-agent', 'first-month-free', 'starting-credits', 'unlimited-chat-images-2026'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Sign up for Genspark',
        description: 'Visit genspark.ai and create an account with email or social login.',
        url: 'https://www.genspark.ai',
      },
      {
        title: 'Upgrade to Plus for first month free',
        description: 'Choose the Plus plan to get your first month free with 10,000 starting credits. No charge for the first month.',
        url: 'https://www.genspark.ai/pricing',
      },
      {
        title: 'Use unlimited chat & images',
        description: 'On Plus/Pro plans, AI chat and image generation cost 0 credits through Dec 31, 2026. Credits only used for agent tasks, slides, video, and calls.',
      },
      {
        title: 'Claim daily free credits (optional)',
        description: 'Free plan gives 100-200 credits daily that reset every 24 hours. Use for light research, chat, and image generation.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'Genspark AI',
    taglineAr: 'الشهر الأول مجاناً على خطة Plus مع 10,000 رصيد بداية + محادثة وصور غير محدودة لعام 2026',
    descriptionAr: `Genspark هي منصة وكيل ذكي فائق (Super Agent) توفر وصولاً للنماذج المميزة (GPT-5.2, Claude Opus 4.5, Gemini 3 Pro, Flux, Ideogram, Kling) للأبحاث، الشرائح، الصور، الفيديو، والبرمجة.

**العرض الحالي:**

- **الشهر الأول مجاناً على خطة Plus**: المستخدمون الجدد يحصلون على الشهر الأول من خطة Plus مجاناً (عادة $24.99/شهر) مع 10,000 رصيد بداية
- **محادثة وصور غير محدودة لعام 2026**: على الخطط المدفوعة، محادثة الذكاء الاصطناعي وتوليد الصور تكلف 0 رصيد حتى 31 ديسمبر 2026
- **الخطة المجانية (للأبد)**: 100-200 رصيد يومياً (تتعاد كل 24 ساعة)، 1 جيجابايت تخزين، لا تحتاج بطاقة ائتمان

**الخطط:**
- مجاني: $0, 100-200 رصيد/يوم، 1 جيجابايت
- Plus: $24.99/شهر ($19.99/شهر سنوي), 10,000 رصيد/شهر، 50 جيجابايت، الشهر الأول مجاناً
- Pro: $249.99/شهر ($199.99/شهر سنوي), 125,000 رصيد/شهر، 1 تيرابايت`,
    stepsAr: [
      {
        title: 'سجّل في Genspark',
        description: 'قم بزيارة genspark.ai وأنشئ حساباً باستخدام البريد الإلكتروني أو تسجيل الدخول الاجتماعي.',
        url: 'https://www.genspark.ai',
      },
      {
        title: 'الترقية إلى Plus للشهر الأول مجاناً',
        description: 'اختر خطة Plus للحصول على شهرك الأول مجاناً مع 10,000 رصيد بداية. لا توجد رسوم للشهر الأول.',
        url: 'https://www.genspark.ai/pricing',
      },
      {
        title: 'استخدم المحادثة والصور غير المحدودة',
        description: 'على خطط Plus/Pro، محادثة الذكاء الاصطناعي وتوليد الصور تكلف 0 رصيد حتى 31 ديسمبر 2026. الرصيد يستخدم فقط للمهام الوكيلة، الشرائح، الفيديو، والمكالمات.',
      },
      {
        title: 'احصل على رصيد يومي مجاني (اختياري)',
        description: 'الخطة المجانية تعطيك 100-200 رصيد يومياً تتعاد كل 24 ساعة. استخدمها للأبحاث الخفيفة، المحادثة، وتوليد الصور.',
      },
    ],
  },

  {
    id: 'o156',
    slug: 'gemini-pro-3month',
    name: '3 Month free Gemini Pro',
    tagline: '3-month Gemini Pro + Google Project Management course on Coursera',
    description: `A 3-month plan combining Gemini Pro benefits with the Google Project Management course on Coursera.`,
    url: 'https://www.coursera.org/learn/project-management-foundations/ungradedLti/VyzxA/redeem-your-google-ai-pro-trial',
    logoUrl: 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=64',
    category: 'tool',
    tags: ['gemini', 'google-ai-pro', 'coursera', 'project-management', 'free-trial'],
    pricing: 'free',
    steps: [
      {
        title: 'Step 1, Fill Out the Form',
        description: 'Complete the form in the Recode application to apply for the offer.',
        url: 'https://www.coursera.org/learn/project-management-foundations/ungradedLti/VyzxA/redeem-your-google-ai-pro-trial',
      },
      {
        title: 'Step 2, Enroll in the Google Project Management Course',
        description: 'Register for the Google Project Management Professional Certificate on Coursera.',
        url: 'https://www.coursera.org/learn/project-management-foundations',
      },
      {
        title: 'Step 3, Claim Your 3-Month Google AI Pro Trial',
        description: 'Go to Module 2 of the course and open the "Redeem Your Google AI Pro Trial" section. Follow the instructions to claim your 3-month Google AI Pro trial.',
        url: 'https://www.coursera.org/learn/project-management-foundations/ungradedLti/VyzxA/redeem-your-google-ai-pro-trial',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: '3 أشهر مجاناً Gemini Pro',
    taglineAr: 'خطة 3 أشهر تجمع مزايا Gemini Pro مع دورة إدارة المشاريع من Google على Coursera',
    descriptionAr: `خطة 3 أشهر تجمع بين مزايا Gemini Pro ودورة Google لإدارة المشاريع على Coursera.`,
    stepsAr: [
      {
        title: 'الخطوة 1, املأ النموذج',
        description: 'أكمل النموذج في تطبيق Recode للتقديم على العرض.',
        url: 'https://www.coursera.org/learn/project-management-foundations/ungradedLti/VyzxA/redeem-your-google-ai-pro-trial',
      },
      {
        title: 'الخطوة 2, سجل في دورة إدارة المشاريع من Google',
        description: 'سجل في شهادة Google Project Management Professional على Coursera.',
        url: 'https://www.coursera.org/learn/project-management-foundations',
      },
      {
        title: 'الخطوة 3, احصل على تجربة Google AI Pro لمدة 3 أشهر',
        description: 'اذهب إلى الوحدة 2 من الدورة وافتح قسم "Redeem Your Google AI Pro Trial" واتبع التعليمات للحصول على تجربة 3 أشهر.',
        url: 'https://www.coursera.org/learn/project-management-foundations/ungradedLti/VyzxA/redeem-your-google-ai-pro-trial',
      },
    ],
  },
  {
    id: 'o157',
    slug: 'amd-member-perks',
    name: 'AMD AI Developer Program, Member Perks',
    tagline: '$100 cloud credits, DeepLearning.AI Pro, GPU sweepstakes & Discord',
    description: `Unlock $100 cloud credits, 1 month DeepLearning.AI Pro, monthly GPU sweepstakes and Discord access as an AMD AI Developer Program member at developer.amd.com/member-perks.`,

    url: 'https://developer.amd.com/member-perks/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=developer.amd.com&sz=64',
    category: 'tool',
    tags: ['amd', 'cloud-credits', 'gpu', 'deeplearning', 'discord', 'ai-developer'],
    pricing: 'free',
    steps: [
      {
        title: 'Join AMD AI Developer Program',
        description: 'Create a free account at developer.amd.com and complete your user profile (+100 pts).',
        url: 'https://developer.amd.com/member-perks/',
      },
      {
        title: 'Earn points via AI Academy',
        description: 'Complete AI Academy courses (+200 each, +100 bonus at 5 & 10 courses) and attend AMD events (+500) to unlock perks.',
        url: 'https://developer.amd.com/amd-ai-academy/',
      },
      {
        title: 'Request your $100 cloud credit',
        description: 'Go to Member Perks → Cloud Credit Options, choose AMD Developer Cloud or Fireworks AI, then fill the form at account.amd.com/en/member/ai-dev-program/cloud-credits.html. Receive email instructions after verification (AMD: 30 days expiry, Fireworks: 90 days).',
        url: 'https://account.amd.com/en/member/ai-dev-program/cloud-credits.html',
      },
      {
        title: 'Claim DeepLearning.AI Pro (1 month free)',
        description: 'In Member Perks, click “Join to get this code” for DeepLearning.AI Pro Membership, 30 days free after enrollment.',
        url: 'https://developer.amd.com/member-perks/',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'برنامج AMD للمطورين, مزايا الأعضاء',
    taglineAr: '100$ رصيد سحابي، DeepLearning.AI Pro، سحب شهري على GPU وDiscord',
    descriptionAr: `احصل على 100$ رصيد سحابي، شهر مجاني DeepLearning.AI Pro، سحب GPU شهري وDiscord كعضو في برنامج AMD AI Developer.`,

    stepsAr: [
      {
        title: 'انضم لبرنامج AMD AI Developer',
        description: 'أنشئ حساباً مجانياً على developer.amd.com وأكمل ملفك (+100 نقطة).',
        url: 'https://developer.amd.com/member-perks/',
      },
      {
        title: 'اكسب النقاط عبر AI Academy',
        description: 'أكمل دورات AI Academy (+200 لكل دورة) واحضر فعاليات AMD (+500).',
        url: 'https://developer.amd.com/amd-ai-academy/',
      },
      {
        title: 'اطلب رصيد 100$ السحابي',
        description: 'اختر AMD Developer Cloud أو Fireworks AI ثم املأ النموذج عبر account.amd.com. ستصلك تعليمات التفعيل بالإيميل بعد التحقق.',
        url: 'https://account.amd.com/en/member/ai-dev-program/cloud-credits.html',
      },
      {
        title: 'احصل على DeepLearning.AI Pro مجاناً لشهر',
        description: 'اضغط “Join to get this code” في صفحة المزايا للحصول على شهر مجاني.',
        url: 'https://developer.amd.com/member-perks/',
      },
    ],
  },
  {
    id: 'o158',
    slug: 'glm-53-flash',
    name: 'GLM-5.3-Flash',
    tagline: 'Frontier coding intelligence at flash cost - 320B open model from $0.15/1M tokens',
    description: `Z.ai's GLM-5.3-Flash (Aug 2026) is a 320B-parameter natively multimodal MoE (18B active) with a 1M-token context and MIT-licensed weights on Hugging Face. It beats GLM-5.2 across benchmarks at one-tenth the price and nears Claude Opus 4.8 on coding (84.3 Terminal-Bench 2.1, 63.4 DeepSWE) - scoring 57 on the Artificial Analysis Index at just $0.045/task. Note: "Flash" is not a distilled mini, it is a newly trained base. API from $0.15/1M input tokens, or 3x quota on the GLM Coding Plan; it quietly topped OpenRouter charts pre-launch as the anonymous "Ox Alpha".`,
    url: 'https://z.ai/blog/glm-5.3-flash',
    logoUrl: 'https://www.google.com/s2/favicons?domain=z.ai&sz=64',
    category: 'tool',
    tags: ['z-ai', 'glm', 'glm-5-3-flash', 'coding-agent', 'open-weights', 'llm'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Read the launch notes',
        description: `Skim the Z.ai announcement for benchmarks, pricing, and the Ox Alpha backstory.`,
        url: 'https://z.ai/blog/glm-5.3-flash',
      },
      {
        title: 'Grab the open weights (optional)',
        description: `Pull zai-org/GLM-5.3-Flash from Hugging Face (MIT license) to self-host with SGLang, vLLM, or TokenSpeed - or skip this and use the hosted API.`,
        url: 'https://huggingface.co/zai-org/GLM-5.3-Flash',
      },
      {
        title: 'Get API access',
        description: `Create a Z.ai account and generate an API key at $0.15/1M input and $0.50/1M output tokens - or subscribe to the GLM Coding Plan (Lite $18/mo) for 3x the quota of GLM-5.3.`,
        url: 'https://docs.z.ai/guides/vlm/glm-5.3-flash',
      },
      {
        title: 'Use it in your agent',
        description: `Point any OpenAI-compatible client at the Z.ai endpoint with model code glm-5.3-flash - it also serves via OpenRouter as z-ai/glm-5.3-flash.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'GLM-5.3-Flash',
    taglineAr: 'ذكاء برمجي بمستوى الطليعة بسعر خاطف - نموذج مفتوح 320B من 0.15$ للمليون رمز',
    descriptionAr: `GLM-5.3-Flash من Z.ai (أغسطس 2026) نموذج MoE متعدد الوسائط أصيلاً بـ 320 مليار معامل (18B نشطة) وسياق مليون رمز، بأوزان مفتوحة برخصة MIT على Hugging Face. يتفوق على GLM-5.2 بعُشر السعر ويقارب Claude Opus 4.8 في البرمجة. الـ API من 0.15$ للمليون رمز مع 3 أضعاف الحصة على خطة GLM Coding. انتبه: "Flash" ليس نسخة مصغرة بل أساس جديد مدرّب بالكامل.`,
    stepsAr: [
      {
        title: 'اقرأ إعلان الإطلاق',
        description: 'اطّلع على المعايير والأسعار وقصة Ox Alpha.',
        url: 'https://z.ai/blog/glm-5.3-flash',
      },
      {
        title: 'حمّل الأوزان المفتوحة (اختياري)',
        description: 'اسحب النموذج من Hugging Face برخصة MIT للاستضافة الذاتية.',
        url: 'https://huggingface.co/zai-org/GLM-5.3-Flash',
      },
      {
        title: 'احصل على وصول API',
        description: 'أنشئ حساب Z.ai بـ 0.15$ للمليون رمز أو اشترك في GLM Coding Plan.',
        url: 'https://docs.z.ai/guides/vlm/glm-5.3-flash',
      },
      {
        title: 'استخدمه في وكيلك',
        description: 'وجّه أي عميل متوافق مع OpenAI إلى glm-5.3-flash.',
      },
    ],
  },
  {
    id: 'o159',
    slug: 'innov-idea-rd-maroc',
    name: "Programme INNOV IDEA - R&D Maroc",
    tagline: 'Up to 200,000 DH grant to turn your innovative idea into a startup',
    description: `INNOV IDEA by R&D Maroc (Innov Invest fund) finances Moroccan inventors and startups under 2 years old through ideation, creation, and launch: up to 100,000 DH solo or 200,000 DH for teams. Covers prototyping, technical studies, business plan, training, and IP protection (patents, trademarks). 500+ projects received, dozens already funded and converted into operating startups.`,
    url: 'https://rdmaroc.com/pages/programme-innov-idea',
    logoUrl: 'https://www.google.com/s2/favicons?domain=rdmaroc.com&sz=64',
    category: 'forstartups',
    tags: ['grants', 'funding', 'non-dilutive', 'morocco', 'prototype', 'startup'],
    pricing: 'free',
    steps: [
      {
        title: 'Check eligibility',
        description: `Moroccan inventor/innovator with an innovative idea, or a startup under 2 years old aiming to create a company.`,
        url: 'https://rdmaroc.com/pages/programme-innov-idea',
      },
      {
        title: 'Submit your idea',
        description: `Apply during R&D Maroc's open calls with a description of your innovation, team, and development needs.`,
      },
      {
        title: 'Get funded and coached',
        description: `Selected projects receive up to 100,000 DH (solo) or 200,000 DH (team) plus coaching on feasibility, prototyping, IP, and go-to-market.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'برنامج إنوف إيديا - البحث والتنمية المغرب',
    taglineAr: 'منحة حتى 200.000 درهم لتحويل فكرتك المبتكرة إلى شركة ناشئة',
    descriptionAr: `برنامج INNOV IDEA من R&D Maroc (صندوق Innov Invest) يموّل المخترعين والشركات الناشئة المغربية تحت سنتين عبر مراحل التأليف والإنشاء والانطلاق: حتى 100.000 درهم فردياً أو 200.000 درهم للفرق. يغطي النماذج الأولية والدراسات التقنية وخطة العمل والتدريب والملكية الفكرية (براءات وعلامات).`,
    stepsAr: [
      {
        title: 'تحقق من الأهلية',
        description: 'مخترع مغربي بفكرة مبتكرة أو شركة ناشئة تحت سنتين.',
        url: 'https://rdmaroc.com/pages/programme-innov-idea',
      },
      {
        title: 'قدّم فكرتك',
        description: 'قدّم عند فتح الدعوات مع وصف الابتكار والفريق والاحتياجات.',
      },
      {
        title: 'احصل على التمويل والمواكبة',
        description: 'المشاريع المنتقاة تحصل على حتى 100.000/200.000 درهم مع مواكبة في الجدوى والنمذجة والملكية والسوق.',
      },
    ],
  },
  {
    id: 'o160',
    slug: '1000-fikra-afriquia',
    name: '1000 Fikra by Afriquia',
    tagline: 'Free nationwide program: training + up to 200,000 DH to launch your business',
    description: `1000 Fikra (Afriquia) turns any idea into a business - free, no diploma, no experience, and no capital required. Practical Rebel Business School workshops, step-by-step mentorship across all 12 regions of Morocco, and up to 200,000 DH in financing once your project is validated. Solo or team applications, one condition: have an idea.`,
    url: 'https://www.1000fikra.ma/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=1000fikra.ma&sz=64',
    category: 'forstartups',
    tags: ['entrepreneurship', 'training', 'funding', 'morocco', 'afriquia', 'startup'],
    pricing: 'free',
    steps: [
      {
        title: 'Register with your idea',
        description: `Sign up free on 1000fikra.ma - solo or with your team, any sector, from any region in Morocco.`,
        url: 'https://www.1000fikra.ma/',
      },
      {
        title: 'Train and get mentored',
        description: `Follow the practical workshops and get mentored at every step to turn your idea into a real company.`,
      },
      {
        title: 'Get up to 200,000 DH',
        description: `Once validated, receive financing of up to 200,000 DH to launch and grow your business.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: '1000 فكرة من أفريقيا',
    taglineAr: 'برنامج وطني مجاني: تكوين + حتى 200.000 درهم لإطلاق مشروعك',
    descriptionAr: `برنامج 1000 فكرة (أفريقيا) يحوّل أي فكرة إلى مقاولة - مجاني وبدون شهادة أو تجربة أو رأسمال. ورشات عملية وإرشاد خطوة بخطوة في جهات المغرب الـ12، وتمويل حتى 200.000 درهم بعد التحقق من المشروع. فردياً أو جماعياً، شرط واحد: فكرة.`,
    stepsAr: [
      {
        title: 'سجّل بفكرتك',
        description: 'سجّل مجاناً على 1000fikra.ma - فردياً أو مع فريقك، من أي جهة.',
        url: 'https://www.1000fikra.ma/',
      },
      {
        title: 'تدرّب واستفد من الإرشاد',
        description: 'تابع الورشات العملية واحصل على الإرشاد في كل خطوة لتحويل الفكرة إلى مقاولة.',
      },
      {
        title: 'احصل على حتى 200.000 درهم',
        description: 'بعد التحقق، استفد من تمويل حتى 200.000 درهم للإطلاق والنمو.',
      },
    ],
  },
  {
    id: 'o161',
    slug: 'the-forge-um6p',
    name: 'The Forge by UM6P',
    tagline: '9-month residency in Benguerir for globally-minded founders - 200+ labs, 80+ VCs',
    description: `The Forge (UM6P, Benguerir) is a 9-month residency-first venture program for founders thinking globally from day one. Validation audit, PMF engine, acceleration, then Demo Day: 200+ specialized labs, exposure to 80+ global VCs and angels, embedded experts working as an extension of your team, and capital readiness built in from the start. Applications open for the 2026 cohort via StartGate.`,
    url: 'https://theforge.ma/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=theforge.ma&sz=64',
    category: 'forstartups',
    tags: ['acceleration', 'residency', 'um6p', 'morocco', 'vc', 'startup'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to the cohort',
        description: `Submit your application for the 2026 cohort through the StartGate dashboard before the deadline.`,
        url: 'https://theforge.ma/',
      },
      {
        title: 'Validate and find PMF',
        description: `Months 1-3 in Benguerir: stress-test assumptions, calibrate your thesis, and prove product-market fit with expert reviews.`,
      },
      {
        title: 'Accelerate to Demo Day',
        description: `Months 4-9: investment readiness, curated VC meetings, public Demo Day, and continued portfolio support.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'ذا فورج من UM6P',
    taglineAr: 'إقامة 9 أشهر في بنجرير للمؤسسين بطموح عالمي - 200+ مختبر و80+ مستثمر',
    descriptionAr: `ذا فورج (UM6P، بنجرير) برنامج إقامة 9 أشهر للمؤسسين بطموح عالمي منذ اليوم الأول. تدقيق التحقق، محرك ملاءمة المنتج للسوق، تسريع، ثم يوم العرض: 200+ مختبر متخصص، لقاء 80+ مستثمراً عالمياً، خبراء مدمجون كامتداد لفريقك، وجاهزية استثمارية منذ البداية.`,
    stepsAr: [
      {
        title: 'قدّم للدفعة',
        description: 'أرسل ترشيحك لدفعة 2026 عبر منصة StartGate قبل الأجل.',
        url: 'https://theforge.ma/',
      },
      {
        title: 'تحقق وابنِ الملاءمة',
        description: 'الأشهر 1-3 في بنجرير: اختبر الفرضيات وأثبت ملاءمة المنتج للسوق.',
      },
      {
        title: 'تسارع حتى يوم العرض',
        description: 'الأشهر 4-9: جاهزية استثمارية ولقاءات مستثمرين ويوم عرض عام.',
      },
    ],
  },
  {
    id: 'o162',
    slug: 'fintech-booster-2026',
    name: 'FinTech Booster 2026 (MFC × UM6P StartGate)',
    tagline: 'FinTech accelerator: mentoring, bank access, fundraising prep - 3 tracks',
    description: `FinTech Booster by the Morocco Fintech Center with UM6P StartGate accelerates Moroccan fintech startups with mentoring, workshops, bank and investor connections, and fundraising preparation across 3 tracks: Go-To-Market, Growth, and Scale. Apply for the 2026 edition through the StartGate dashboard.`,
    url: 'https://dashboard.startgate.ma/challenges/fintech-booster-2026',
    logoUrl: '/logos/fintech-booster.png',
    category: 'forstartups',
    tags: ['fintech', 'acceleration', 'um6p', 'morocco', 'fundraising'],
    pricing: 'free',
    steps: [
      {
        title: 'Pick your track',
        description: `Choose Go-To-Market, Growth, or Scale depending on your startup's stage.`,
        url: 'https://dashboard.startgate.ma/challenges/fintech-booster-2026',
      },
      {
        title: 'Apply on StartGate',
        description: `Submit your application with your pitch deck and traction metrics before the deadline.`,
      },
      {
        title: 'Accelerate and fundraise',
        description: `Join mentoring, workshops, and bank/investor meetings to prepare your fundraising.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'فينتك بوستر 2026',
    taglineAr: 'مسرّعة فينتك: إرشاد وولوج للبنوك وتحضير لجمع التمويل - 3 مسارات',
    descriptionAr: `فينتك بوستر من Morocco Fintech Center مع UM6P StartGate يسرّع شركات الفينتك المغربية بالإرشاد والورشات والربط بالبنوك والمستثمرين والتحضير لجمع التمويل عبر 3 مسارات: دخول السوق والنمو والتوسع.`,
    stepsAr: [
      {
        title: 'اختر مسارك',
        description: 'اختر دخول السوق أو النمو أو التوسع حسب مرحلة شركتك.',
        url: 'https://dashboard.startgate.ma/challenges/fintech-booster-2026',
      },
      {
        title: 'قدّم عبر StartGate',
        description: 'أرسل ترشيحك مع العرض والمؤشرات قبل الأجل.',
      },
      {
        title: 'تسارع واجمع التمويل',
        description: 'استفد من الإرشاد والورشات ولقاءات البنوك والمستثمرين.',
      },
    ],
  },
  {
    id: 'o164',
    slug: 'iqlaa-icc-accelerator',
    name: 'Iqlaa, Cultural & Creative Industries Accelerator',
    tagline: 'ICC accelerator: training, coaching, 30k-50k MAD grants up to 450k MAD',
    description: `Iqlaa by Africalia with Fondation Hiba and the Institut Français (EU co-funded) accelerates Moroccan cultural and creative enterprises: training, coaching, network, 30,000-50,000 MAD grants plus growth support up to 450,000 MAD. For 18-35 founders with ICC companies based in Morocco. Apply via the official form.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/iqlaa-accelerateur-entreprises-culturelles-creatives-maroc/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=africalia.be&sz=64',
    category: 'forstartups',
    tags: ['creative', 'culture', 'acceleration', 'grants', 'morocco', 'youth'],
    pricing: 'free',
    steps: [
      {
        title: 'Check eligibility',
        description: `18-35 years old with a cultural/creative company based in Morocco.`,
        url: 'https://www.start-up.ma/programmes-pour-startups/iqlaa-accelerateur-entreprises-culturelles-creatives-maroc/',
      },
      {
        title: 'Apply via the form',
        description: `Fill the official application form with your project, team, and needs.`,
        url: 'https://form.jotform.com/africaliaphoto/appel-iqlaa',
      },
      {
        title: 'Get trained and funded',
        description: `Join training and coaching, receive 30k-50k MAD, and unlock growth support up to 450k MAD.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'إقلاع, مسرّعة الصناعات الثقافية والإبداعية',
    taglineAr: 'مسرّعة ICC: تكوين ومواكبة ومنح 30-50 ألف درهم حتى 450 ألف',
    descriptionAr: `إقلاع من Africalia مع مؤسسة هبة والمعهد الفرنسي (بتمويل أوروبي) يسرّع المقاولات الثقافية والإبداعية المغربية: تكوين ومواكبة وشبكة ومنح 30-50 ألف درهم مع دعم نمو حتى 450 ألف درهم. للمؤسسين 18-35 بمقاولات ICC بالمغرب.`,
    stepsAr: [
      {
        title: 'تحقق من الأهلية',
        description: '18-35 سنة بمقاولة ثقافية/إبداعية مقرها المغرب.',
        url: 'https://www.start-up.ma/programmes-pour-startups/iqlaa-accelerateur-entreprises-culturelles-creatives-maroc/',
      },
      {
        title: 'قدّم عبر الاستمارة',
        description: 'املأ استمارة الترشيح الرسمية بمشروعك وفريقك.',
        url: 'https://form.jotform.com/africaliaphoto/appel-iqlaa',
      },
      {
        title: 'تكوّن واستفد من المنح',
        description: 'تكوين ومواكبة ومنح 30-50 ألف درهم ودعم نمو حتى 450 ألف.',
      },
    ],
  },
  {
    id: 'o165',
    slug: 'climatelaunchpad-morocco',
    name: 'ClimateLaunchpad Morocco (Cleantech Competition)',
    tagline: 'National cleantech contest - winners reach the Africa final + investor spotlight',
    description: `ClimateLaunchpad Morocco is the national round of the world's largest cleantech competition: Moroccan climate startups compete locally, winners advance to the Africa final with coaching, visibility, and investor access. Clean energy, circular economy, mobility, food, and adaptation solutions welcome.`,
    url: 'https://climatelaunchpad.org/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=climatelaunchpad.org&sz=64',
    category: 'forstartups',
    tags: ['cleantech', 'climate', 'competition', 'morocco', 'startup'],
    pricing: 'free',
    steps: [
      {
        title: 'Enter the national round',
        description: `Apply with your cleantech solution when the Morocco call opens.`,
        url: 'https://climatelaunchpad.org/',
      },
      {
        title: 'Get coached',
        description: `Join bootcamps and coaching to sharpen your pitch and business model.`,
      },
      {
        title: 'Win to Africa final',
        description: `National winners advance to the Africa final with investor spotlight.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'كلايمت لونشباد المغرب',
    taglineAr: 'مسابقة وطنية للتقنية النظيفة - الفائزون للنهائي الأفريقي',
    descriptionAr: `كلايمت لونشباد المغرب هو الدور الوطني لأكبر مسابقة تقنية نظيفة عالمياً: شركات المناخ المغربية تتنافس محلياً والفائزون للنهائي الأفريقي مع مواكبة وإبراز للمستثمرين.`,
    stepsAr: [
      {
        title: 'شارك في الدور الوطني',
        description: 'قدّم حلّك النظيف عند فتح الدعوة المغربية.',
        url: 'https://climatelaunchpad.org/',
      },
      {
        title: 'استفد من المواكبة',
        description: 'معسكرات ومواكبة لصقل العرض والنموذج الاقتصادي.',
      },
      {
        title: 'تأهل للنهائي الأفريقي',
        description: 'الفائزون وطنياً للنهائي الأفريقي تحت أضواء المستثمرين.',
      },
    ],
  },
  {
    id: 'o166',
    slug: 'cih-startup-bank',
    name: 'CIH Startup (CIH Bank)',
    tagline: 'Investment credit up to 2M MAD with Tamwilcom guarantee for labelled startups',
    description: `CIH Startup is CIH Bank's offer for labelled startups (StartupMaroc, MassChallenge): investment credit up to 2,000,000 MAD backed by the Tamwilcom guarantee. Built for startups that need bank financing alongside equity - ask your CIH advisor with your label and business plan.`,
    url: 'https://www.cihbank.ma/',
    logoUrl: 'https://www.cihbank.ma/sites/default/files/favicon.ico',
    category: 'forstartups',
    tags: ['bank', 'credit', 'funding', 'tamwilcom', 'morocco', 'startup'],
    pricing: 'free',
    steps: [
      {
        title: 'Get labelled',
        description: `Obtain the StartupMaroc or MassChallenge label proving your innovation.`,
      },
      {
        title: 'Ask CIH with your file',
        description: `Present your business plan and financing needs to a CIH Bank advisor.`,
        url: 'https://www.cihbank.ma/',
      },
      {
        title: 'Get up to 2M MAD',
        description: `Receive the investment credit with Tamwilcom guarantee coverage.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'CIH Startup (بنك CIH)',
    taglineAr: 'قرض استثمار حتى 2M درهم بضمان تمويلكم للشركات الموسومة',
    descriptionAr: `عرض CIH Startup من بنك CIH للشركات الموسومة (StartupMaroc، MassChallenge): قرض استثمار حتى 2.000.000 درهم بضمان تمويلكم.`,
    stepsAr: [
      {
        title: 'احصل على الوسم',
        description: 'وسم StartupMaroc أو MassChallenge لإثبات الابتكار.',
      },
      {
        title: 'اطلب من CIH بملفك',
        description: 'قدّم خطة عملك واحتياجاتك لمستشار CIH.',
        url: 'https://www.cihbank.ma/',
      },
      {
        title: 'احصل على حتى 2M درهم',
        description: 'قرض الاستثمار بتغطية ضمان تمويلكم.',
      },
    ],
  },
  {
    id: 'o167',
    slug: 'masschallenge-morocco',
    name: 'MassChallenge Morocco (International Accelerator)',
    tagline: '4-month program, zero equity taken, global investor network from Casablanca',
    description: `MassChallenge Morocco brings the global zero-equity accelerator to Casablanca: a 4-month program with intensive mentoring, corporate connections, and access to a worldwide investor network - without taking any shares in your startup. For high-potential Moroccan tech startups ready to scale.`,
    url: 'https://masschallenge.org/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=masschallenge.org&sz=64',
    category: 'forstartups',
    tags: ['acceleration', 'global', 'zero-equity', 'morocco', 'investors'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to the cohort',
        description: `Submit your startup application for the Morocco cohort when calls open.`,
        url: 'https://masschallenge.org/',
      },
      {
        title: 'Accelerate 4 months',
        description: `Mentoring, corporate pilots, and investor readiness in Casablanca.`,
      },
      {
        title: 'Plug into the world',
        description: `Join the global MassChallenge alumni and investor network - zero equity taken.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'ماس تشالنج المغرب',
    taglineAr: 'برنامج 4 أشهر بدون أسهم وشبكة مستثمرين عالمية من الدار البيضاء',
    descriptionAr: `ماس تشالنج المغرب يجلب المسرّعة العالمية بدون أسهم إلى الدار البيضاء: 4 أشهر إرشاد مكثف وربط شركات وشبكة مستثمرين عالمية - بدون أي حصة في شركتك.`,
    stepsAr: [
      {
        title: 'قدّم للدفعة',
        description: 'أرسل ترشيح شركتك عند فتح الدعوة المغربية.',
        url: 'https://masschallenge.org/',
      },
      {
        title: 'تسارع 4 أشهر',
        description: 'إرشاد وتجارب شركات وجاهزية استثمارية بالدار البيضاء.',
      },
      {
        title: 'انضم للعالم',
        description: 'شبكة خريجي ومستثمري ماس تشالنج العالمية - صفر أسهم.',
      },
    ],
  },
  {
    id: 'o168',
    slug: 'greenup-morocco',
    name: 'GreenUp Morocco (Energy Transition Incubation)',
    tagline: 'Cleantech incubation at UM6P: mentoring, fablab, Demo Day - ages 18-39',
    description: `GreenUp Morocco by the Ministry of Energy Transition with RES4Africa, Enel Foundation, and UM6P incubates early-stage energy startups: expert workshops, 1-on-1 coaching, coworking and Fablab at the Benguerir campus, investor bootcamps, and a Demo Day. For 18-39 entrepreneurs with a prototype in renewables, storage, e-mobility, circular economy, or clean cooking - startup must target Morocco.`,
    url: 'https://res4africa.org/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=res4africa.org&sz=64',
    category: 'forstartups',
    tags: ['cleantech', 'energy', 'incubation', 'um6p', 'morocco', 'demo-day'],
    pricing: 'free',
    steps: [
      {
        title: 'Check eligibility',
        description: `18-39, working prototype in energy/cleantech, targeting Morocco, English + French working knowledge.`,
        url: 'https://res4africa.org/',
      },
      {
        title: 'Apply in English',
        description: `Submit the form with CV, ID, and evidence of your idea/prototype.`,
      },
      {
        title: 'Incubate to Demo Day',
        description: `Workshops, Fablab prototyping, investor bootcamps, and Demo Day at UM6P Benguerir.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'جرين أب المغرب',
    taglineAr: 'احتضان التقنية النظيفة بـ UM6P: مواكبة وفاب لاب ويوم عرض - 18-39 سنة',
    descriptionAr: `جرين أب المغرب من وزارة الانتقال الطاقي مع RES4Africa ومؤسسة Enel وUM6P يحتضن شركات الطاقة الناشئة: ورشات خبراء ومواكبة فردية وفضاء عمل وفاب لاب بحرم بنجرير ومعسكرات مستثمرين ويوم عرض. لرواد 18-39 بنموذج أولي في الطاقات المتجددة يستهدف المغرب.`,
    stepsAr: [
      {
        title: 'تحقق من الأهلية',
        description: '18-39 سنة بنموذج أولي في الطاقة يستهدف المغرب.',
        url: 'https://res4africa.org/',
      },
      {
        title: 'قدّم بالإنجليزية',
        description: 'استمارة + سيرة + بطاقة تعريف + دليل الفكرة/النموذج.',
      },
      {
        title: 'احتضن حتى يوم العرض',
        description: 'ورشات وفاب لاب ومعسكرات مستثمرين ويوم عرض ببنجرير.',
      },
    ],
  },
  {
    id: 'o169',
    slug: 'aych-climate-incubation',
    name: 'African Youth Climate Hub, Incubation (Mohammed VI Foundation)',
    tagline: '6-month incubation for African youth climate solutions - 10 projects per cohort',
    description: `The African Youth Climate Hub by the Mohammed VI Foundation for Environmental Protection incubates youth-led climate solutions across Africa: 6-month journey of ideation, market validation, and investor readiness, hosted with UM6P. 10 projects per cohort from 8+ countries, plus the learning center, network, and dashboard on youthclimatehub.org. 4th edition running with the UN.`,
    url: 'https://youthclimatehub.org/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=youthclimatehub.org&sz=64',
    category: 'forstartups',
    tags: ['climate', 'youth', 'incubation', 'africa', 'morocco', 'un'],
    pricing: 'free',
    steps: [
      {
        title: 'Create your account',
        description: `Join the platform that hosts all AYCH calls, training, and community.`,
        url: 'https://youthclimatehub.org/',
      },
      {
        title: 'Apply to incubation',
        description: `Submit your youth-led climate project when the cohort call opens (10 projects selected).`,
      },
      {
        title: 'Incubate 6 months',
        description: `Ideation, validation, consolidation, and investor readiness with African peers.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'القطب الأفريقي لمناخ الشباب, الاحتضان',
    taglineAr: 'احتضان 6 أشهر لحلول المناخ الشبابية - 10 مشاريع للدفعة',
    descriptionAr: `القطب الأفريقي لمناخ الشباب من مؤسسة محمد السادس لحماية البيئة يحتضن حلول المناخ الشبابية عبر أفريقيا: 6 أشهر تأليف وتحقق وجاهزية استثمارية مع UM6P. 10 مشاريع للدفعة من 8+ دول، مع مركز التعلم والشبكة على المنصة.`,
    stepsAr: [
      {
        title: 'أنشئ حسابك',
        description: 'انضم للمنصة التي تستضيف الدعوات والتكوين والمجتمع.',
        url: 'https://youthclimatehub.org/',
      },
      {
        title: 'قدّم للاحتضان',
        description: 'أرسل مشروعك المناخي الشبابي عند فتح الدعوة (10 مشاريع).',
      },
      {
        title: 'احتضن 6 أشهر',
        description: 'تأليف وتحقق وتوطيد وجاهزية استثمارية مع أقران أفارقة.',
      },
    ],
  },
  {
    id: 'o170',
    slug: 'ecole-1337-um6p',
    name: '1337 by UM6P (Coding School & Incubator)',
    tagline: 'Peer-learning code school in Benguerir/Khouribga - projects get UM6P Ventures access',
    description: `1337 is UM6P's tuition-free peer-learning coding school (Benguerir & Khouribga, no teachers, no classes - learn by building). Technical projects born at 1337 get incubation support and a direct path to UM6P Ventures seed funding (500k-5M MAD). Admission through the online test and Piscine bootcamp - no diploma required.`,
    url: 'https://1337.ma/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=um6p.ma&sz=64',
    category: 'forstartups',
    tags: ['coding-school', 'um6p', 'peer-learning', 'incubation', 'morocco'],
    pricing: 'free',
    steps: [
      {
        title: 'Pass the online test',
        description: `Register on 1337.ma and clear the logic/memory online games - no diploma needed.`,
        url: 'https://1337.ma/',
      },
      {
        title: 'Survive the Piscine',
        description: `Join the intensive selection bootcamp; survivors earn their place at 1337.`,
      },
      {
        title: 'Build and get funded',
        description: `Learn by building, incubate your project, and access UM6P Ventures funding.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: '1337 من UM6P (مدرسة البرمجة والحضانة)',
    taglineAr: 'مدرسة برمجة بالأقران ببنجرير/خريبكة - المشاريع لتمويل UM6P Ventures',
    descriptionAr: `1337 مدرسة UM6P المجانية للبرمجة بالأقران (بنجرير وخريبكة، بدون أساتذة - تعلّم بالبناء). مشاريع 1337 تحصل على الاحتضان وطريق مباشر لتمويل UM6P Ventures (500 ألف-5M درهم). القبول عبر اختبار أونلاين ومعسكر Piscine - بدون شهادة.`,
    stepsAr: [
      {
        title: 'اجتز الاختبار',
        description: 'سجّل في 1337.ma واجتز ألعاب المنطق - بدون شهادة.',
        url: 'https://1337.ma/',
      },
      {
        title: 'انجُ في Piscine',
        description: 'انضم لمعسكر الانتقاء المكثف؛ الناجون يحجزون مكانهم.',
      },
      {
        title: 'ابنِ واحصل على التمويل',
        description: 'تعلّم بالبناء واحتضن مشروعك واصل لتمويل UM6P Ventures.',
      },
    ],
  },
  {
    id: 'o171',
    slug: 'nasa-space-apps-benguerir-2026',
    name: 'NASA Space Apps Challenge 2026, Ben Guerir',
    tagline: 'Global NASA hackathon locally: solve real problems with open NASA data',
    description: `Join the world's biggest hackathon from Ben Guerir: NASA Space Apps Challenge 2026 invites students, developers, and makers to solve real-world problems with NASA open data - teamwork, coding, and innovation over one weekend. Deadline September 30, 2026. Found via Civica.`,
    url: 'https://www.civica.ma/opportunities/6a9b730e1f4cbf4c89d50082/thdy-ns-lttbyqt-lfd-bn-jryr-nasa-space-apps-challenge-2026',
    logoUrl: 'https://www.google.com/s2/favicons?domain=nasa.gov&sz=64',
    category: 'forstartups',
    tags: ['hackathon', 'nasa', 'space', 'open-data', 'morocco'],
    pricing: 'free',
    steps: [
      {
        title: 'Form your team',
        description: `Gather developers, designers, and space fans - all levels welcome.`,
        url: 'https://www.civica.ma/opportunities/6a9b730e1f4cbf4c89d50082/thdy-ns-lttbyqt-lfd-bn-jryr-nasa-space-apps-challenge-2026',
      },
      {
        title: 'Register before Sep 30',
        description: `Sign up through the Civica opportunity page before the deadline.`,
      },
      {
        title: 'Hack with NASA data',
        description: `Build and demo your solution over the hackathon weekend.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    endsAt: '2026-09-30',
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'تحدي ناسا لتطبيقات الفضاء 2026, بنجرير',
    taglineAr: 'هاكاثون ناسا العالمي محلياً: حل مشاكل حقيقية ببيانات ناسا المفتوحة',
    descriptionAr: `انضم لأكبر هاكاثون عالمي من بنجرير: تحدي ناسا 2026 للطلبة والمطورين لحل مشاكل واقعية ببيانات ناسا المفتوحة. آخر أجل 30 شتنبر 2026.`,
    stepsAr: [
      {
        title: 'كوّن فريقك',
        description: 'اجمع مطورين ومصممين وعشاق الفضاء - كل المستويات.',
        url: 'https://www.civica.ma/opportunities/6a9b730e1f4cbf4c89d50082/thdy-ns-lttbyqt-lfd-bn-jryr-nasa-space-apps-challenge-2026',
      },
      {
        title: 'سجّل قبل 30 شتنبر',
        description: 'سجّل عبر صفحة الفرصة قبل الأجل.',
      },
      {
        title: 'ابتكر ببيانات ناسا',
        description: 'ابنِ واعرض حلّك خلال عطلة الهاكاثون.',
      },
    ],
  },
  {
    id: 'o172',
    slug: 'mosip-decode-2026',
    name: 'MOSIP Decode 2026 (Online Hackathon)',
    tagline: 'Contribute to the global digital-ID open-source platform, learn from experts',
    description: `Virtual hackathon for students to contribute to MOSIP, the globally recognised digital public good for national digital ID systems (adopted in 31 countries). Learn from industry experts, propose solutions, and ship open-source code. Deadline September 13, 2026. Found via Civica.`,
    url: 'https://www.civica.ma/opportunities/6a9872541f4cbf4c89cb19a9/mosip-decode-2026',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mosip.io&sz=64',
    category: 'forstartups',
    tags: ['hackathon', 'open-source', 'digital-id', 'students', 'online'],
    pricing: 'free',
    steps: [
      {
        title: 'Register before Sep 13',
        description: `Sign up through the Civica opportunity page.`,
        url: 'https://www.civica.ma/opportunities/6a9872541f4cbf4c89cb19a9/mosip-decode-2026',
      },
      {
        title: 'Learn the platform',
        description: `Explore MOSIP modules with expert sessions.`,
      },
      {
        title: 'Ship your contribution',
        description: `Propose and build a solution for national digital ID challenges.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    endsAt: '2026-09-13',
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'موسيب دود 2026 (هاكاثون أونلاين)',
    taglineAr: 'ساهم في منصة الهوية الرقمية العالمية مفتوحة المصدر',
    descriptionAr: `هاكاثون افتراضي للطلبة للمساهمة في MOSIP، المنصة العالمية للهوية الرقمية (31 دولة). تعلّم من خبراء واقترح حلولاً. آخر أجل 13 شتنبر 2026.`,
    stepsAr: [
      {
        title: 'سجّل قبل 13 شتنبر',
        description: 'سجّل عبر صفحة الفرصة.',
        url: 'https://www.civica.ma/opportunities/6a9872541f4cbf4c89cb19a9/mosip-decode-2026',
      },
      {
        title: 'تعلّم المنصة',
        description: 'اكتشف وحدات MOSIP مع جلسات الخبراء.',
      },
      {
        title: 'أرسل مساهمتك',
        description: 'ابنِ حلاً لتحديات الهوية الرقمية الوطنية.',
      },
    ],
  },
  {
    id: 'o173',
    slug: 'arab-youth-space-hackathon-2026',
    name: 'Arab Youth Space Hackathon 2026 (Challenge 813)',
    tagline: 'Turn space & Earth-observation data into real solutions - by Arab Youth Center & UAE Space Agency',
    description: `The Arab Youth Center with the UAE Space Agency, National Space Academy, and Space42 opens registration for the Arab Youth Space Hackathon 2026: innovate with space and Earth-observation data. Deadline September 25, 2026, online. Found via Civica.`,
    url: 'https://www.civica.ma/opportunities/6a8f4275f90c58ffb1c7888a/hkthwn-lfd-llshbb-laarby-2026',
    logoUrl: 'https://www.google.com/s2/favicons?domain=arabyouthcenter.org&sz=64',
    category: 'forstartups',
    tags: ['hackathon', 'space', 'youth', 'arab', 'online'],
    pricing: 'free',
    steps: [
      {
        title: 'Register before Sep 25',
        description: `Sign up through the Civica opportunity page.`,
        url: 'https://www.civica.ma/opportunities/6a8f4275f90c58ffb1c7888a/hkthwn-lfd-llshbb-laarby-2026',
      },
      {
        title: 'Build with space data',
        description: `Turn satellite and observation data into working solutions.`,
      },
      {
        title: 'Demo and win',
        description: `Present your project to the jury.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    endsAt: '2026-09-25',
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'هاكاثون الفضاء للشباب العربي 2026',
    taglineAr: 'حوّل بيانات الفضاء لحلول عملية - مركز الشباب العربي ووكالة الإمارات',
    descriptionAr: `مركز الشباب العربي مع وكالة الإمارات للفضاء يفتح التسجيل لهاكاثون الفضاء 2026 للابتكار ببيانات الفضاء ورصد الأرض. آخر أجل 25 شتنبر 2026، أونلاين.`,
    stepsAr: [
      {
        title: 'سجّل قبل 25 شتنبر',
        description: 'سجّل عبر صفحة الفرصة.',
        url: 'https://www.civica.ma/opportunities/6a8f4275f90c58ffb1c7888a/hkthwn-lfd-llshbb-laarby-2026',
      },
      {
        title: 'ابنِ ببيانات الفضاء',
        description: 'حوّل بيانات الأقمار لرصد الأرض إلى حلول عملية.',
      },
      {
        title: 'اعرض وفُز',
        description: 'قدّم مشروعك للجنة التحكيم.',
      },
    ],
  },
  {
    id: 'o174',
    slug: 'euromedai-responsible-ai-cup-2026',
    name: 'EuroMedAI Responsible AI Cup 2.0 (MENA SMEs & Startups)',
    tagline: 'Competition for SMEs/startups building or using AI systems in MENA',
    description: `EuroMedAI opens the Responsible AI Cup 2.0 for small companies and startups developing or using AI systems across the Middle East and North Africa. Compete, get evaluated on responsible-AI practices, and gain regional visibility. Deadline September 10, 2026. Found via Civica.`,
    url: 'https://www.civica.ma/opportunities/6a8d7ff6f90c58ffb1c0e8df/aaln-msbq-euromedai-responsible-ai-cup-2.0',
    logoUrl: 'https://www.google.com/s2/favicons?domain=egyptinnovate.com&sz=64',
    category: 'forstartups',
    tags: ['ai', 'competition', 'sme', 'startup', 'mena'],
    pricing: 'free',
    steps: [
      {
        title: 'Check eligibility',
        description: `SME or startup in MENA developing or using AI systems.`,
        url: 'https://www.civica.ma/opportunities/6a8d7ff6f90c58ffb1c0e8df/aaln-msbq-euromedai-responsible-ai-cup-2.0',
      },
      {
        title: 'Apply before Sep 10',
        description: `Submit your application with your AI use case.`,
      },
      {
        title: 'Compete regionally',
        description: `Get judged on responsible-AI practices and win visibility.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    endsAt: '2026-09-10',
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'كأس EuroMedAI للذكاء المسؤول 2.0',
    taglineAr: 'مسابقة للشركات الناشئة والصغرى التي تبني الذكاء الاصطناعي في MENA',
    descriptionAr: `مسابقة EuroMedAI للذكاء المسؤول 2.0 للشركات الصغرى والناشئة التي تطور الذكاء الاصطناعي في الشرق الأوسط وشمال أفريقيا. آخر أجل 10 شتنبر 2026.`,
    stepsAr: [
      {
        title: 'تحقق من الأهلية',
        description: 'شركة صغرى أو ناشئة في MENA تستعمل الذكاء الاصطناعي.',
        url: 'https://www.civica.ma/opportunities/6a8d7ff6f90c58ffb1c0e8df/aaln-msbq-euromedai-responsible-ai-cup-2.0',
      },
      {
        title: 'قدّم قبل 10 شتنبر',
        description: 'أرسل ترشيحك مع حالة استعمال الذكاء الاصطناعي.',
      },
      {
        title: 'نافس إقليمياً',
        description: 'قيّم على ممارسات الذكاء المسؤول واكسب الظهور.',
      },
    ],
  },
  {
    id: 'o175',
    slug: 'rabhacks-2026-talents-civica',
    name: "Rab'Hacks 2026, Talent Call (Africa & Europe)",
    tagline: 'Innovation & entrepreneurship program: training, coaching, prototyping, Rabat final with cash prizes',
    description: `Rab'Hacks 2026 supports students, graduates, entrepreneurs, and companies across Africa and Europe with training, coaching, and prototyping for impact projects - ending in a Rabat final with financial prizes. Open call for talents listed on Civica.`,
    url: 'https://www.civica.ma/opportunities/69889ee1731e34082165b6c6/rab-hacks-2026-appel-aux-talents',
    logoUrl: 'https://www.start-up.ma/wp-content/uploads/2026/06/RABHACKS.png',
    category: 'forstartups',
    tags: ['hackathon', 'entrepreneurship', 'africa', 'rabat', 'prizes'],
    pricing: 'free',
    steps: [
      {
        title: 'Join the call',
        description: `Apply as a student, graduate, entrepreneur, or company.`,
        url: 'https://www.civica.ma/opportunities/69889ee1731e34082165b6c6/rab-hacks-2026-appel-aux-talents',
      },
      {
        title: 'Train and prototype',
        description: `Follow training and coaching to prototype your impact project.`,
      },
      {
        title: 'Reach the Rabat final',
        description: `Pitch at the final in Rabat for financial prizes.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'راب هاكس 2026, نداء المواهب',
    taglineAr: 'برنامج ابتكار وريادة: تكوين ومواكبة ونمذجة ونهائي بالرباط بجوائز مالية',
    descriptionAr: `راب هاكس 2026 يواكب الطلبة والخريجين والمقاولين عبر أفريقيا وأوروبا بالتكوين والمواكبة والنمذجة لمشاريع ذات أثر - مع نهائي بالرباط وجوائز مالية.`,
    stepsAr: [
      {
        title: 'انضم للنداء',
        description: 'قدّم كطالب أو خريج أو مقاول أو شركة.',
        url: 'https://www.civica.ma/opportunities/69889ee1731e34082165b6c6/rab-hacks-2026-appel-aux-talents',
      },
      {
        title: 'تدرّب ونمذج',
        description: 'تابع التكوين والمواكبة لنمذجة مشروعك.',
      },
      {
        title: 'بلغ نهائي الرباط',
        description: 'اعرض مشروعك في النهائي بالرباط للجوائز المالية.',
      },
    ],
  },
  {
    id: 'o176',
    slug: 'huawei-developer-competition-2025-morocco',
    name: 'Huawei Developer Competition 2025 (Morocco, $1k-$5k Prizes)',
    tagline: 'AI competition for Moroccan youth: $1,000-$5,000 prizes + $100-200 vouchers for all',
    description: `Under the Huawei Morocco × Ministry of Youth agreement: join the Huawei Developer Competition 2025, build with AI, and win $1,000-$5,000 prizes. Every Moroccan participant gets $100-$200 vouchers. Listed on Civica.`,
    url: 'https://www.civica.ma/opportunities/68e50a8353ae1796858efbca/huawei-developer-competition-2025',
    logoUrl: 'https://www.google.com/s2/favicons?domain=huawei.com&sz=64',
    category: 'forstartups',
    tags: ['ai', 'competition', 'huawei', 'morocco', 'prizes', 'students'],
    pricing: 'free',
    steps: [
      {
        title: 'Register as a Moroccan youth',
        description: `Open to young Moroccans interested in AI development.`,
        url: 'https://www.civica.ma/opportunities/68e50a8353ae1796858efbca/huawei-developer-competition-2025',
      },
      {
        title: 'Build your AI project',
        description: `Develop and submit your AI solution.`,
      },
      {
        title: 'Win up to $5,000',
        description: `Top projects win $1,000-$5,000; all participants get vouchers.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'مسابقة هواوي للمطورين 2025 (المغرب)',
    taglineAr: 'مسابقة ذكاء اصطناعي للشباب المغربي: جوائز 1000-5000$ + قسائم للجميع',
    descriptionAr: `في إطار اتفاق هواوي المغرب ووزارة الشباب: شارك في مسابقة هواوي 2025 وابنِ بالذكاء الاصطناعي وفُز بجوائز 1000-5000 دولار. كل المشاركين المغاربة يحصلون على قسائم 100-200 دولار.`,
    stepsAr: [
      {
        title: 'سجّل كشاب مغربي',
        description: 'مفتوحة للشباب المغربي المهتم بالذكاء الاصطناعي.',
        url: 'https://www.civica.ma/opportunities/68e50a8353ae1796858efbca/huawei-developer-competition-2025',
      },
      {
        title: 'ابنِ مشروعك',
        description: 'طوّر وأرسل حلّك بالذكاء الاصطناعي.',
      },
      {
        title: 'فُز حتى 5000$',
        description: 'الأوائل يفوزون 1000-5000$ والجميع بقسائم.',
      },
    ],
  },
  {
    id: 'o177',
    slug: 'prime-pitch-competition-2025',
    name: 'Prime Pitch Competition 2025 (Global, Equity-Free Cash Prizes)',
    tagline: 'Online pitch contest: idea, prototype, or active startup - cash, coaching, zero equity',
    description: `Global online competition for entrepreneurs with an idea, prototype, or running startup. Compete for significant equity-free cash prizes; top-10 finalists get coaching, mentoring, and pitch workshops. Listed on Civica.`,
    url: 'https://www.civica.ma/opportunities/68def2bb8f69b693c83beaaf/concours-de-pitch-prime-prime-pitch-competition-ppc-2025',
    logoUrl: 'https://www.google.com/s2/favicons?domain=bmprimecapital.com&sz=64',
    category: 'forstartups',
    tags: ['pitch', 'competition', 'cash-prizes', 'equity-free', 'online', 'startup'],
    pricing: 'free',
    steps: [
      {
        title: 'Enter online',
        description: `Apply with your idea, prototype, or startup.`,
        url: 'https://www.civica.ma/opportunities/68def2bb8f69b693c83beaaf/concours-de-pitch-prime-prime-pitch-competition-ppc-2025',
      },
      {
        title: 'Reach the top 10',
        description: `Finalists get coaching, mentoring, and workshops.`,
      },
      {
        title: 'Win equity-free cash',
        description: `Pitch for cash prizes with zero equity taken.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'مسابقة برايم للعروض 2025 (عالمية)',
    taglineAr: 'مسابقة عروض أونلاين: جوائز نقدية ومواكبة بدون أسهم',
    descriptionAr: `مسابقة عالمية أونلاين لأصحاب الأفكار والنماذج والشركات القائمة. جوائز نقدية بدون أسهم؛ العشرة الأوائل يحصلون على مواكبة وإرشاد وورشات.`,
    stepsAr: [
      {
        title: 'شارك أونلاين',
        description: 'قدّم بفكرتك أو نموذجك أو شركتك.',
        url: 'https://www.civica.ma/opportunities/68def2bb8f69b693c83beaaf/concours-de-pitch-prime-prime-pitch-competition-ppc-2025',
      },
      {
        title: 'بلغ العشرة الأوائل',
        description: 'مواكبة وإرشاد وورشات للمتأهلين.',
      },
      {
        title: 'فُز نقداً بدون أسهم',
        description: 'اعرض مشروعك لجوائز نقدية بصفر أسهم.',
      },
    ],
  },
  {
    id: 'o178',
    slug: 'hedera-africa-hackathon-2025',
    name: 'Hedera Africa Hackathon 2025 (Web3, Training + Certification)',
    tagline: "Africa's massive Web3 hackathon on Hedera: grants, training, pro certificates",
    description: `Huge African hackathon to build innovative Web3 solutions on the Hedera network: big grants, training, professional certificates, and access to expert networks to boost digital innovation across Africa. Listed on Civica.`,
    url: 'https://www.civica.ma/opportunities/68b62ea400a47483e83a8a08/hedera-africa-hackathon-2025-world-s-largest-web3-hackathon',
    logoUrl: 'https://www.google.com/s2/favicons?domain=hedera.com&sz=64',
    category: 'forstartups',
    tags: ['web3', 'hackathon', 'hedera', 'africa', 'grants'],
    pricing: 'free',
    steps: [
      {
        title: 'Register your team',
        description: `Sign up through the Civica opportunity page.`,
        url: 'https://www.civica.ma/opportunities/68b62ea400a47483e83a8a08/hedera-africa-hackathon-2025-world-s-largest-web3-hackathon',
      },
      {
        title: 'Build on Hedera',
        description: `Develop your Web3 solution with training and mentoring.`,
      },
      {
        title: 'Win grants and certs',
        description: `Compete for grants, certificates, and expert access.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'هاكاثون هيديرا أفريقيا 2025 (ويب 3)',
    taglineAr: 'هاكاثون ويب 3 الأضخم أفريقياً على هيديرا: منح وتكوين وشهادات',
    descriptionAr: `هاكاثون أفريقي ضخم لبناء حلول ويب 3 على شبكة هيديرا: منح كبيرة وتكوين وشهادات احترافية وولوج لشبكات الخبراء.`,
    stepsAr: [
      {
        title: 'سجّل فريقك',
        description: 'سجّل عبر صفحة الفرصة.',
        url: 'https://www.civica.ma/opportunities/68b62ea400a47483e83a8a08/hedera-africa-hackathon-2025-world-s-largest-web3-hackathon',
      },
      {
        title: 'ابنِ على هيديرا',
        description: 'طوّر حلّك بتكوين ومواكبة.',
      },
      {
        title: 'فُز بالمنح والشهادات',
        description: 'نافس على المنح والشهادات وولوج الخبراء.',
      },
    ],
  },
  {
    id: 'o179',
    slug: 'start-hack-tour-2026',
    name: 'START Hack Tour (Europe’s Entrepreneurial Hackathon)',
    tagline: 'Build startups in teams: talks, tech workshops, entrepreneurship coaching',
    description: `START Hack, Europe's big entrepreneurial hackathon linked to St. Gallen: form teams, join talks and tech/business workshops, and learn entrepreneurship, creative thinking, and tech innovation hands-on. Listed on Civica - check the tour stop for Moroccans.`,
    url: 'https://www.civica.ma/opportunities/68a222b627ac831c57b9a5f0/start-hack-tour-st.-gallen',
    logoUrl: 'https://www.google.com/s2/favicons?domain=startglobal.org&sz=64',
    category: 'forstartups',
    tags: ['hackathon', 'entrepreneurship', 'europe', 'startup', 'students'],
    pricing: 'free',
    steps: [
      {
        title: 'Pick your tour stop',
        description: `Check the Civica page for the relevant stop and dates.`,
        url: 'https://www.civica.ma/opportunities/68a222b627ac831c57b9a5f0/start-hack-tour-st.-gallen',
      },
      {
        title: 'Team up and build',
        description: `Join talks, tech workshops, and build your venture in a team.`,
      },
      {
        title: 'Pitch it',
        description: `Demo your startup concept to the jury.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'جولة ستارت هاك (هاكاثون أوروبا الريادي)',
    taglineAr: 'ابنِ شركات بفرق: محادثات وورشات تقنية ومواكبة ريادية',
    descriptionAr: `ستارت هاك، الهاكاثون الريادي الأوروبي الكبير المرتبط بسانت غالن: فرق عمل ومحادثات وورشات تقنية وريادية لتعلم الريادة عملياً.`,
    stepsAr: [
      {
        title: 'اختر محطتك',
        description: 'تحقق من صفحة الفرصة للمحطة والتواريخ.',
        url: 'https://www.civica.ma/opportunities/68a222b627ac831c57b9a5f0/start-hack-tour-st.-gallen',
      },
      {
        title: 'كوّن فريقاً وابنِ',
        description: 'شارك في المحادثات والورشات وابنِ مشروعك بفريق.',
      },
      {
        title: 'اعرضه',
        description: 'قدّم مفهوم شركتك للجنة.',
      },
    ],
  },
  {
    id: 'o180',
    slug: 'arkx-salesforce-bootcamp-open-day',
    name: 'Arkx Open Day, Salesforce Developer Bootcamp (Rabat, State-Funded)',
    tagline: 'Bac+5 grads: free state-funded Salesforce bootcamp + job insertion in Rabat',
    description: `Arkx Talent Factory's Rabat Open Day for Bac+5 graduates eyeing a Salesforce Developer Consultant career: orientation, bootcamp presentation, and enrollment into the 100% state-funded program (training, mentoring, job insertion). Listed on Civica.`,
    url: 'https://www.civica.ma/opportunities/688415d290bebe70fd8b0711/open-day-bootcamp-salesforce-developer-consultant-organise-par-arkx-talent-factory',
    logoUrl: 'https://www.google.com/s2/favicons?domain=civica.ma&sz=64',
    category: 'forstartups',
    tags: ['bootcamp', 'salesforce', 'rabat', 'employment', 'funded'],
    pricing: 'free',
    steps: [
      {
        title: 'Attend the Open Day',
        description: `Join the orientation day in Rabat - games, bootcamp presentation, surprises.`,
        url: 'https://www.civica.ma/opportunities/688415d290bebe70fd8b0711/open-day-bootcamp-salesforce-developer-consultant-organise-par-arkx-talent-factory',
      },
      {
        title: 'Enroll in the bootcamp',
        description: `Bac+5 grads can enroll in the state-funded Salesforce track.`,
      },
      {
        title: 'Get inserted',
        description: `Training plus mentoring toward a Salesforce consultant job.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'اليوم المفتوح Arkx, بوتكامب Salesforce (الرباط، ممول)',
    taglineAr: 'خريجو Bac+5: بوتكامب Salesforce ممول من الدولة + إدماج بالرباط',
    descriptionAr: `اليوم المفتوح لـ Arkx بخريجي Bac+5 الراغبين في مهنة Salesforce: توجيه وعرض البوتكامب والتسجيل في البرنامج الممول 100% من الدولة (تكوين ومواكبة وإدماج).`,
    stepsAr: [
      {
        title: 'احضر اليوم المفتوح',
        description: 'انضم ليوم التوجيه بالرباط.',
        url: 'https://www.civica.ma/opportunities/688415d290bebe70fd8b0711/open-day-bootcamp-salesforce-developer-consultant-organise-par-arkx-talent-factory',
      },
      {
        title: 'سجّل في البوتكامب',
        description: 'خريجو Bac+5 يمكنهم التسجيل في مسار Salesforce الممول.',
      },
      {
        title: 'ادمج مهنياً',
        description: 'تكوين ومواكبة نحو وظيفة مستشار Salesforce.',
      },
    ],
  },
  {
    id: 'o181',
    slug: 'netacad-summer-camp-ai-cybersecurity',
    name: 'NetAcad Summer Camp (ANAPEC × Cisco, Free AI & Cybersecurity)',
    tagline: '2-month free summer program: AI, coding, cybersecurity, networks + Cisco cert',
    description: `ANAPEC with Cisco NetAcad runs a free 2-month summer program training Moroccan students in AI, programming, cybersecurity, and networking - hands-on NetAcad platform practice plus an official Cisco certificate on completion. Online. Listed on Civica.`,
    url: 'https://www.civica.ma/opportunities/688363ae90bebe70fd88f6a7/brnmj-netacad-summer-camp-2025-tkwyn-mjny-fy-ldhk-lstnaay-wl-mn-lsybrny',
    logoUrl: 'https://icons.duckduckgo.com/ip3/netacad.com.ico',
    category: 'forstartups',
    tags: ['bootcamp', 'ai', 'cybersecurity', 'cisco', 'certificate', 'free'],
    pricing: 'free',
    steps: [
      {
        title: 'Register online',
        description: `Sign up on the official page.`,
        url: 'https://www.civica.ma/opportunities/688363ae90bebe70fd88f6a7/brnmj-netacad-summer-camp-2025-tkwyn-mjny-fy-ldhk-lstnaay-wl-mn-lsybrny',
      },
      {
        title: 'Train 2 months',
        description: `Follow AI, coding, cybersecurity, and networking modules on NetAcad.`,
      },
      {
        title: 'Earn the Cisco cert',
        description: `Complete the program for the official certificate.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'المخيم الصيفي NetAcad (أنابيك × سيسكو)',
    taglineAr: 'برنامج صيفي مجاني شهرين: ذكاء اصطناعي وأمن سيبراني + شهادة سيسكو',
    descriptionAr: `أنابيك مع سيسكو NetAcad تنظم برنامجاً صيفياً مجانياً لشهرين لتكوين الطلبة المغاربة في الذكاء الاصطناعي والبرمجة والأمن السيبراني والشبكات - مع شهادة سيسكو الرسمية. أونلاين.`,
    stepsAr: [
      {
        title: 'سجّل أونلاين',
        description: 'سجّل عبر الصفحة الرسمية.',
        url: 'https://www.civica.ma/opportunities/688363ae90bebe70fd88f6a7/brnmj-netacad-summer-camp-2025-tkwyn-mjny-fy-ldhk-lstnaay-wl-mn-lsybrny',
      },
      {
        title: 'تدرّب شهرين',
        description: 'تابع وحدات الذكاء والبرمجة والأمن والشبكات على NetAcad.',
      },
      {
        title: 'احصل على الشهادة',
        description: 'أكمل البرنامج للشهادة الرسمية.',
      },
    ],
  },
  {
    id: 'o182',
    slug: '3rd-act-sb3s-tamwilcom',
    name: '3rd Act Program, SB3S × Tamwilcom (750k MAD Honor Loan)',
    tagline: 'Pre-acceleration + up to 750,000 MAD honor loan + VC readiness (Innov Invest)',
    description: `3rd Act by SB3S with Tamwilcom (Innov Invest fund) backs Moroccan pre-acceleration startups under 5 years old: tailored mentoring, practical workshops, expert network, and up to 750,000 MAD in honor loan plus systematic preparation for a first VC round. AgriTech, HealthTech, CleanTech, Industry 4.0 and more.`,
    url: 'https://www.sb3s.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=sb3s.com&sz=64',
    category: 'forstartups',
    tags: ['acceleration', 'tamwilcom', 'honor-loan', 'morocco', 'vc-ready'],
    pricing: 'free',
    steps: [
      {
        title: 'Check eligibility',
        description: `Moroccan startup under 5 years, pre-acceleration stage, innovative high-growth project.`,
        url: 'https://www.sb3s.com/',
      },
      {
        title: 'Apply to the cohort',
        description: `Submit your file during the call; 20 startups pitch to join each cohort.`,
      },
      {
        title: 'Get funded and ready',
        description: `Mentoring plus up to 750k MAD honor loan and VC-round preparation.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'برنامج 3rd Act, SB3S × تمويلكم',
    taglineAr: 'تسريع أولي + حتى 750 ألف درهم قرض شرف + جاهزية VC',
    descriptionAr: `برنامج 3rd Act من SB3S مع تمويلكم (صندوق Innov Invest) للشركات المغربية قبل التسريع تحت 5 سنوات: مواكبة مخصصة وورشات وشبكة خبراء حتى 750.000 درهم قرض شرف وتحضير منهجي لأول جولة تمويل.`,
    stepsAr: [
      {
        title: 'تحقق من الأهلية',
        description: 'شركة مغربية تحت 5 سنوات قبل التسريع بمشروع مبتكر.',
        url: 'https://www.sb3s.com/',
      },
      {
        title: 'قدّم للدفعة',
        description: 'أرسل ملفك أثناء الدعوة؛ 20 شركة تعرض أمام اللجنة.',
      },
      {
        title: 'تموّل واستعد',
        description: 'مواكبة حتى 750 ألف درهم قرض شرف وتحضير VC.',
      },
    ],
  },
  {
    id: 'o183',
    slug: 'women-in-cleantech-morocco',
    name: 'Women in Cleantech Morocco (ClimateLaunchpad Track)',
    tagline: 'Turn your climate idea into a cleantech startup - training + mentorship for women',
    description: `Women in Cleantech Morocco empowers women innovators in Drâa-Tafilalet, Souss-Massa, and Fès-Meknès to turn early climate ideas into impactful cleantech startups: training, mentorship, and climate-ecosystem access via the ClimateLaunchpad application process. Join a community of Moroccan female founders.`,
    url: 'https://climatelaunchpad.org/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=climatelaunchpad.org&sz=64',
    category: 'forstartups',
    tags: ['cleantech', 'women', 'climate', 'morocco', 'startup'],
    pricing: 'free',
    steps: [
      {
        title: 'Check regions',
        description: `Women innovators from Drâa-Tafilalet, Souss-Massa, or Fès-Meknès with a climate idea.`,
        url: 'https://climatelaunchpad.org/',
      },
      {
        title: 'Apply via ClimateLaunchpad',
        description: `One application process covers both tracks; reviewers flag Women in Cleantech profiles.`,
      },
      {
        title: 'Build your startup',
        description: `Training, mentoring, and ecosystem access to launch your cleantech company.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'نساء التقنية النظيفة المغرب',
    taglineAr: 'حوّلي فكرتك المناخية لشركة نظيفة - تكوين وإرشاد للنساء',
    descriptionAr: `برنامج نساء التقنية النظيفة المغرب للنساء المبتكرات في درعة-تافيلالت وسوس-ماسة وفاس-مكناس لتحويل الأفكار المناخية لشركات ناشئة: تكوين وإرشاد وولوج المنظومة عبر مسار ClimateLaunchpad.`,
    stepsAr: [
      {
        title: 'تحققي من الجهات',
        description: 'مبتكرات من درعة-تافيلالت أو سوس-ماسة أو فاس-مكناس.',
        url: 'https://climatelaunchpad.org/',
      },
      {
        title: 'قدّمي عبر ClimateLaunchpad',
        description: 'مسار تقديم واحد يغطي البرنامجين.',
      },
      {
        title: 'ابنِ شركتك',
        description: 'تكوين وإرشاد وولوج المنظومة لإطلاق شركتك النظيفة.',
      },
    ],
  },
  {
    id: 'o184',
    slug: 'ostx-morocco-ideation-technopark',
    name: 'OSTX Morocco, Startup Ideation (Open Startup × Technopark)',
    tagline: '4-week idea-to-startup sprint for 18-35: bootcamp, mentorship, certification',
    description: `OSTX Morocco by Open Startup with Technopark turns raw ideas into validated startups in 4 weeks: 2-day intensive bootcamp plus 3 weeks of assignments and mentorship, final pitch, and certification. For Moroccan youth 18-35 - students, graduates, employed or not. Hybrid format.`,
    url: 'https://open-startup.org',
    logoUrl: 'https://www.google.com/s2/favicons?domain=open-startup.org&sz=64',
    category: 'forstartups',
    tags: ['ideation', 'bootcamp', 'technopark', 'youth', 'morocco'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply with your idea',
        description: `18-35, early-stage idea needing structure - individuals or teams.`,
        url: 'https://open-startup.org',
      },
      {
        title: 'Bootcamp + assignments',
        description: `2-day intensive plus 3 weeks of mentored validation work.`,
      },
      {
        title: 'Pitch and certify',
        description: `Final pitch, evaluation, and recognition.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'OSTX المغرب, تأليف الشركات (Open Startup)',
    taglineAr: 'سباق 4 أسابيع من الفكرة للشركة لـ 18-35: بوتكامب وشهادة',
    descriptionAr: `برنامج OSTX المغرب من Open Startup مع تكنوبارك يحوّل الأفكار الخام لشركات متحقق منها في 4 أسابيع: بوتكامب مكثف يومين + 3 أسابيع مواكبة وعرض نهائي وشهادة. لشباب 18-35.`,
    stepsAr: [
      {
        title: 'قدّم بفكرتك',
        description: '18-35 سنة بفكرة أولية تحتاج هيكلة.',
        url: 'https://open-startup.org',
      },
      {
        title: 'بوتكامب ومهام',
        description: 'يومان مكثفان + 3 أسابيع تحقق بمواكبة.',
      },
      {
        title: 'اعرض واحصل على شهادة',
        description: 'عرض نهائي وتقييم واعتراف.',
      },
    ],
  },
  {
    id: 'o185',
    slug: 'hackdays-2026-euromed-fes',
    name: "Hack'Days 2026 (Euromed Innovation Center, Fès)",
    tagline: 'Hackathon + startup bootcamp: prototype, validate, pitch - Fès-Meknès, Drâa, Oriental',
    description: `Hack'Days 2026 by the Euromed Innovation Center (Euro-Mediterranean University of Fes) supports founders and startup teams in Fès-Meknès, Drâa-Tafilalet, and Oriental: selected teams join a bootcamp to prototype, validate, and pitch high-potential tech solutions, with mentoring and post-bootcamp support for emerging startups.`,
    url: 'https://ueuromed.org',
    logoUrl: 'https://www.google.com/s2/favicons?domain=ueuromed.org&sz=64',
    category: 'forstartups',
    tags: ['hackathon', 'bootcamp', 'fes', 'startup', 'prototype'],
    pricing: 'free',
    steps: [
      {
        title: 'Check regions',
        description: `Based in Fès-Meknès, Drâa-Tafilalet, or Oriental with an innovative project.`,
        url: 'https://ueuromed.org',
      },
      {
        title: 'Hack and prototype',
        description: `Join the hackathon and build your solution with mentors.`,
      },
      {
        title: 'Bootcamp and pitch',
        description: `Selected teams validate ideas and pitch, with post-program support.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'هاك دايز 2026 (المركز الأورومتوسطي، فاس)',
    taglineAr: 'هاكاثون + بوتكامب: نمذج وتحقق واعرض - فاس ودرعة والشرق',
    descriptionAr: `هاك دايز 2026 من مركز الابتكار الأورومتوسطي (الجامعة الأورومتوسطية بفاس) لحاملي المشاريع بفاس-مكناس ودرعة-تافيلالت والشرق: بوتكامب للنمذجة والتحقق والعرض مع مواكبة ودعم بعدي.`,
    stepsAr: [
      {
        title: 'تحقق من الجهات',
        description: 'مقيم بفاس-مكناس أو درعة-تافيلالت أو الشرق بمشروع مبتكر.',
        url: 'https://ueuromed.org',
      },
      {
        title: 'هاكر ونمذج',
        description: 'شارك في الهاكاثون وابنِ حلّك مع الموجهين.',
      },
      {
        title: 'بوتكامب واعرض',
        description: 'الفرق المنتقاة تتحقق وتعرض مع دعم بعدي.',
      },
    ],
  },
  {
    id: 'o186',
    slug: 'orange-summer-challenge-2026',
    name: 'Orange Summer Challenge 2026 (IA as a Business Accelerator)',
    tagline: '12-week AI startup sprint with Orange: build, test, and market real use cases',
    description: `Orange Summer Challenge 2026 pairs startups with young talent to build AI solutions for real Orange business units over 12 weeks (July-September): technical and business mentoring, testing with Orange teams, a path to market, and a possible Orange Fab acceleration afterwards. Run by Orange Digital Center Middle East & Africa.`,
    url: 'https://osc.gos.orange.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=orange.com&sz=64',
    category: 'forstartups',
    tags: ['ai', 'orange', 'startup', 'accelerator', '12-weeks'],
    pricing: 'free',
    steps: [
      {
        title: 'Form your squad',
        description: `AI startups plus young builders ready for 12 weeks of work.`,
        url: 'https://osc.gos.orange.com/',
      },
      {
        title: 'Build with Orange',
        description: `Develop and test AI solutions with Orange business units and experts.`,
      },
      {
        title: 'Go to market via Fab',
        description: `Market-ready solutions can continue into Orange Fab acceleration.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    endsAt: '2026-06-20',
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'تحدي أورنج الصيفي 2026 (الذكاء كمسرّع أعمال)',
    taglineAr: 'سباق ذكاء 12 أسبوعاً مع أورنج: ابنِ واختبر وسوّق حالات حقيقية',
    descriptionAr: `تحدي أورنج الصيفي 2026 يجمع الشركات الناشئة والمواهب لبناء حلول ذكاء اصطناعي لوحدات أورنج على 12 أسبوعاً (يوليوز-شتنبر): مواكبة تقنية وتجارية ومسار للسوق واحتمال Orange Fab بعده.`,
    stepsAr: [
      {
        title: 'كوّن فريقك',
        description: 'شركات ذكاء ناشئة ومواهب جاهزة لـ 12 أسبوعاً.',
        url: 'https://osc.gos.orange.com/',
      },
      {
        title: 'ابنِ مع أورنج',
        description: 'طوّر واختبر حلول الذكاء مع فرق أورنج.',
      },
      {
        title: 'ادخل السوق عبر Fab',
        description: 'الحلول الجاهزة قد تكمل في تسريع Orange Fab.',
      },
    ],
  },
  {
    id: 'o187',
    slug: 'innovaction-tetouan-2026',
    name: 'InnovAction Entrepreneuriat 2026 (Tétouan, JCI)',
    tagline: 'Pitch your project to the northern ecosystem jury: visibility + network',
    description: `InnovAction 2026 by JCI Tétouan is the northern entrepreneurship competition: young founders and project holders pitch before a jury and the local ecosystem, closing a full program of training and ecosystem events. Visibility, professional network, and investor connections in the Tangier-Tétouan region.`,
    url: 'https://www.civica.ma/opportunities/6a34179263f3ee6bc7578df7/2-edition-de-la-competition-d-entrepreneuriat-innovaction-2026',
    logoUrl: 'https://www.google.com/s2/favicons?domain=civica.ma&sz=64',
    category: 'forstartups',
    tags: ['pitch', 'tetouan', 'jci', 'entrepreneurship', 'network'],
    pricing: 'free',
    steps: [
      {
        title: 'Prepare your pitch',
        description: `Young founder or project holder targeting the northern ecosystem.`,
        url: 'https://www.civica.ma/opportunities/6a34179263f3ee6bc7578df7/2-edition-de-la-competition-d-entrepreneuriat-innovaction-2026',
      },
      {
        title: 'Pitch to the jury',
        description: `Present your project and defend it live.`,
      },
      {
        title: 'Plug into the ecosystem',
        description: `Visibility, network, and follow-up opportunities.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'إنوف أكشن 2026 (تطوان)',
    taglineAr: 'اعرض مشروعك على لجنة الشمال: ظهور وشبكة',
    descriptionAr: `مسابقة إنوف أكشن 2026 من JCI تطوان لريادة الشمال: يعرض الشباب مشاريعهم أمام لجنة ومنظومة محلية، ختام برنامج تكويني كامل. ظهور وشبكة مهنية وصلات مستثمرين.`,
    stepsAr: [
      {
        title: 'حضّر عرضك',
        description: 'مؤسس شاب يستهدف منظومة الشمال.',
        url: 'https://www.civica.ma/opportunities/6a34179263f3ee6bc7578df7/2-edition-de-la-competition-d-entrepreneuriat-innovaction-2026',
      },
      {
        title: 'اعرض أمام اللجنة',
        description: 'قدّم مشروعك ودافع عنه مباشرة.',
      },
      {
        title: 'اندمج في المنظومة',
        description: 'ظهور وشبكة وفرص متابعة.',
      },
    ],
  },
  {
    id: 'o188',
    slug: 'casablanca-smart-city-startups-10ans',
    name: 'Casablanca Smart City, Startup Village (10th Anniversary)',
    tagline: '25 startups get a booth in the tech village + royal-patronage spotlight',
    description: `For the 10th anniversary of Casablanca Smart City (under royal patronage): 25 innovative startups win a dedicated booth in the tech village plus maximum visibility at the year's top tech event. Organized by Casablanca Events & Animation with the City of Casablanca, Hack & Pitch, and La Startup Station. Limited seats.`,
    url: 'https://www.civica.ma/opportunities/6a1f38020d4b4b9c7d8b0b7f/nd-llshrkt-lnshy-lmbtkr-dfaa-bmshrwaak-l~-lsdr-fy-hdth-casablanca-smart-city',
    logoUrl: 'https://www.google.com/s2/favicons?domain=civica.ma&sz=64',
    category: 'forstartups',
    tags: ['smart-city', 'casablanca', 'showcase', 'booth', 'startup'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply early',
        description: `Only 25 startups selected - innovative product required.`,
        url: 'https://www.civica.ma/opportunities/6a1f38020d4b4b9c7d8b0b7f/nd-llshrkt-lnshy-lmbtkr-dfaa-bmshrwaak-l~-lsdr-fy-hdth-casablanca-smart-city',
      },
      {
        title: 'Exhibit in the village',
        description: `Get your own booth in the tech village during the event.`,
      },
      {
        title: 'Shine nationally',
        description: `Peak visibility with city, media, and ecosystem leaders.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'الدار البيضاء الذكية, قرية الشركات (10 سنوات)',
    taglineAr: '25 شركة تحصل على جناح في القرية التقنية + أضواء وطنية',
    descriptionAr: `للاحتفال بـ 10 سنوات على الدار البيضاء الذكية (برعاية ملكية): 25 شركة مبتكرة تحصل على جناح خاص في القرية التقنية وظهور أقصى في أبرز حدث تقني. تنظيم Casablanca Events والمدينة وHack & Pitch. مقاعد محدودة.`,
    stepsAr: [
      {
        title: 'قدّم مبكراً',
        description: '25 شركة فقط - منتج مبتكر مطلوب.',
        url: 'https://www.civica.ma/opportunities/6a1f38020d4b4b9c7d8b0b7f/nd-llshrkt-lnshy-lmbtkr-dfaa-bmshrwaak-l~-lsdr-fy-hdth-casablanca-smart-city',
      },
      {
        title: 'اعرض في القرية',
        description: 'جناح خاص في القرية التقنية أثناء الحدث.',
      },
      {
        title: 'تألق وطنياً',
        description: 'ظهور أقصى مع المدينة والإعلام والمنظومة.',
      },
    ],
  },
  {
    id: 'o189',
    slug: 'technovation-girls-morocco-2026',
    name: 'Technovation Girls Morocco 2026 (Global App Challenge)',
    tagline: 'Girls 12-18: team up, build a community app, learn entrepreneurship + tech',
    description: `Technovation Girls Morocco is part of the global Technovation Challenge empowering girls to become tech innovators: teams of girls 12-18 identify a community problem, build a mobile-app solution, and learn entrepreneurship - mentored by industry professionals through app design, business plan, and final pitch. Rabat hybrid format.`,
    url: 'https://www.technovation.org/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=technovation.org&sz=64',
    category: 'forstartups',
    tags: ['girls', 'apps', 'entrepreneurship', 'mentorship', 'global'],
    pricing: 'free',
    steps: [
      {
        title: 'Form a girls team',
        description: `Girls 12-18 plus a mentor 18+ - pick a community problem.`,
        url: 'https://www.technovation.org/',
      },
      {
        title: 'Build app + plan',
        description: `Design the app, write the business plan, prepare the pitch.`,
      },
      {
        title: 'Compete globally',
        description: `Morocco edition feeds into the worldwide Technovation finals.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'تكنوفيشن للفتيات المغرب 2026',
    taglineAr: 'فتيات 12-18: ابنِ تطبيقاً مجتمعياً وتعلّمي الريادة',
    descriptionAr: `تكنوفيشن للفتيات المغرب جزء من التحدي العالمي لتمكين الفتيات مبتكرات تقنيات: فرق 12-18 تحدد مشكلة مجتمعية وتبني تطبيقاً جوالاً وتتعلم الريادة - بإرشاد مهنيين عبر التصميم وخطة العمل والعرض.`,
    stepsAr: [
      {
        title: 'كوّن فريق فتيات',
        description: 'فتيات 12-18 مع موجه +18 - اخترن مشكلة مجتمعية.',
        url: 'https://www.technovation.org/',
      },
      {
        title: 'ابنِ التطبيق والخطة',
        description: 'صمّم التطبيق واكتب خطة العمل وحضّر العرض.',
      },
      {
        title: 'نافس عالمياً',
        description: 'نسخة المغرب تؤهل لنهائيات تكنوفيشن العالمية.',
      },
    ],
  },
  {
    id: 'o190',
    slug: 'mrtb-start-retail-tech',
    name: 'MRTB START (Retail Tech Incubation)',
    tagline: 'Incubation for retail-tech startups - open now on StartGate',
    description: `MRTB START is a StartGate incubation program dedicated to retail-tech startups: structured support to build, validate, and scale commerce solutions. Applications open now on the StartGate dashboard - Moroccan and African retail innovators welcome.`,
    url: 'https://dashboard.startgate.ma/challenges/mrtb-start',
    logoUrl: '/logos/mrtb-start.png',
    category: 'forstartups',
    tags: ['retail-tech', 'incubation', 'startgate', 'morocco'],
    pricing: 'free',
    steps: [
      {
        title: 'Check the call',
        description: `Retail-tech startup or project - see the open call on StartGate.`,
        url: 'https://dashboard.startgate.ma/challenges/mrtb-start',
      },
      {
        title: 'Apply with your project',
        description: `Submit your application before the deadline.`,
      },
      {
        title: 'Incubate and scale',
        description: `Join the incubation track with mentoring and ecosystem access.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'MRTB START (احتضان تجارة التجزئة)',
    taglineAr: 'احتضان لشركات تجارة التجزئة التقنية - مفتوح الآن',
    descriptionAr: `برنامج MRTB START لاحتضان شركات تجارة التجزئة التقنية: دعم منظم للبناء والتحقق والتوسع. التقديم مفتوح الآن على StartGate.`,
    stepsAr: [
      {
        title: 'تابع الدعوة',
        description: 'شركة تجارة تجزئة تقنية - راجع الدعوة المفتوحة.',
        url: 'https://dashboard.startgate.ma/challenges/mrtb-start',
      },
      {
        title: 'قدّم بمشروعك',
        description: 'أرسل ترشيحك قبل الأجل.',
      },
      {
        title: 'احتضن وتوسّع',
        description: 'انضم لمسار الاحتضان بإرشاد وولوج المنظومة.',
      },
    ],
  },
  {
    id: 'o191',
    slug: 'agri-food-tech-5th-cohort',
    name: 'Agri-Food Tech Incubator, 5th Cohort (UM6P × IAV Hassan II)',
    tagline: 'Smart agriculture, biotech, circular economy: mentorship + fundraising + media',
    description: `The Agri-Food Tech Incubator by UM6P and IAV Hassan II backs high-potential innovators in smart agriculture, animal production, biotech, circular economy, and waste valorization: tailored mentorship, technical capacity building, fundraising support, networking, and media visibility under the Generation Green 2020-2030 strategy. 5th cohort open now.`,
    url: 'https://dashboard.startgate.ma/challenges/agri-food-tech-5th-cohort',
    logoUrl: '/logos/agri-food-tech.png',
    category: 'forstartups',
    tags: ['agritech', 'incubation', 'um6p', 'generation-green', 'morocco'],
    pricing: 'free',
    steps: [
      {
        title: 'Check fit',
        description: `Agri/agri-food innovation with scale potential in Morocco.`,
        url: 'https://dashboard.startgate.ma/challenges/agri-food-tech-5th-cohort',
      },
      {
        title: 'Apply to cohort 5',
        description: `Submit before the deadline on StartGate.`,
      },
      {
        title: 'Incubate and fundraise',
        description: `Mentorship, fundraising support, and ecosystem visibility.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'حاضنة التقنية الفلاحية, الدفعة 5',
    taglineAr: 'فلاحة ذكية وتكنولوجيا حيوية: إرشاد وتمويل وإبراز',
    descriptionAr: `حاضنة التقنية الفلاحية من UM6P ومعهد الحسن الثاني للزراعة تدعم مبتكري الفلاحة الذكية والإنتاج الحيواني والتكنولوجيا الحيوية والاقتصاد الدائري: إرشاد مخصص ودعم جمع التمويل وتشبيك وإبراز إعلامي ضمن الجيل الأخضر. الدفعة 5 مفتوحة.`,
    stepsAr: [
      {
        title: 'تحقق من الملاءمة',
        description: 'ابتكار فلاحي/غذائي بإمكانات نمو في المغرب.',
        url: 'https://dashboard.startgate.ma/challenges/agri-food-tech-5th-cohort',
      },
      {
        title: 'قدّم للدفعة 5',
        description: 'أرسل ترشيحك قبل الأجل على StartGate.',
      },
      {
        title: 'احتضن واجمع التمويل',
        description: 'إرشاد ودعم تمويل وظهور في المنظومة.',
      },
    ],
  },
  {
    id: 'o194',
    slug: 'tokenrouter-glm-53-free',
    name: 'GLM 5.3 Free on TokenRouter (for AI Agents)',
    tagline: 'Run GLM 5.3 free in your coding agents - no usage limits mentioned',
    description: `GLM 5.3 is free right now on TokenRouter with no usage limits mentioned: open tokenrouter.com/models/z-ai/glm-5.3, create an account, generate an API key, add it to your AI agent with base URL api.tokenrouter.com/v1, select GLM 5.3 Free, and start prompting. Ideal for AI coding agents while free access lasts.`,
    url: 'https://www.tokenrouter.com/models/z-ai/glm-5.3',
    logoUrl: 'https://www.google.com/s2/favicons?domain=z.ai&sz=64',
    category: 'api-access',
    tags: ['glm', 'tokenrouter', 'free', 'coding-agent', 'llm'],
    pricing: 'free',
    steps: [
      {
        title: 'Open the model page',
        description: `Go to the GLM 5.3 page on TokenRouter.`,
        url: 'https://www.tokenrouter.com/models/z-ai/glm-5.3',
      },
      {
        title: 'Create account + key',
        description: `Create your account and generate an API key.`,
      },
      {
        title: 'Add to your agent',
        description: `Add the key to your AI agent with base URL api.tokenrouter.com/v1, select GLM 5.3 Free, and start prompting.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'GLM 5.3 مجاناً على TokenRouter',
    taglineAr: 'شغّل GLM 5.3 مجاناً في وكلاء البرمجة - بدون حدود معلنة',
    descriptionAr: `نموذج GLM 5.3 مجاني حالياً على TokenRouter بدون حدود استعمال معلنة: افتح صفحة النموذج وأنشئ حساباً وولّد مفتاح API وأضفه لوكيلك عبر api.tokenrouter.com/v1 واختر GLM 5.3 Free وابدأ.`,
    stepsAr: [
      {
        title: 'افتح صفحة النموذج',
        description: 'اذهب لصفحة GLM 5.3 على TokenRouter.',
        url: 'https://www.tokenrouter.com/models/z-ai/glm-5.3',
      },
      {
        title: 'أنشئ حساباً ومفتاحاً',
        description: 'أنشئ حسابك وولّد مفتاح API.',
      },
      {
        title: 'أضفه لوكيلك',
        description: 'أضف المفتاح لوكيل الذكاء عبر api.tokenrouter.com/v1 واختر GLM 5.3 Free وابدأ.',
      },
    ],
  },
  {
    id: 'o195',
    slug: 'tamwilcom-tpe-guarantees',
    name: 'Tamwilcom TPE Guarantees (Damane Express / Intelak)',
    tagline: 'State guarantees for very small firms: treasury, creation up to 80%, rural',
    description: `Tamwilcom backs Moroccan very small enterprises with simple guarantee products: Damane Express (fast treasury/investment guarantee), Damane Intelak (creation support, up to 80% of the loan, no commission), and Damane Intelak Al Moustatmir Al Qarawi (rural productive projects and small farms). Open to Moroccan-law TPEs in all sectors.`,
    url: 'https://www.tamwilcom.ma/nos-solutions/tres-petites-entreprises',
    logoUrl: 'https://www.tamwilcom.ma/sites/default/files/sidebar_logo.png',
    category: 'forstartups',
    tags: ['tamwilcom', 'guarantee', 'tpe', 'funding', 'morocco'],
    pricing: 'free',
    steps: [
      {
        title: 'Pick your guarantee',
        description: `Treasury needs: Damane Express. Creating a company: Damane Intelak (up to 80%). Rural project: Intelak Al Qarawi.`,
        url: 'https://www.tamwilcom.ma/nos-solutions/tres-petites-entreprises',
      },
      {
        title: 'Apply via your bank',
        description: `Request the Tamwilcom guarantee through your bank when negotiating the loan.`,
      },
      {
        title: 'Get financed',
        description: `The state guarantee unlocks bank financing for your TPE.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'ضمانات تمويلكم للمقاولات الصغيرة جداً',
    taglineAr: 'ضمانات الدولة للصغار: خزينة وإحداث حتى 80% وقروي',
    descriptionAr: `تدعم تمويلكم المقاولات المغربية الصغيرة جداً بضمانات بسيطة: ضمان إكسبريس (الخزينة)، ضمان انطلاقة (الإحداث حتى 80% بدون عمولة)، وضمان انطلاقة المستثمر القروي للمشاريع القروية.`,
    stepsAr: [
      {
        title: 'اختر ضمانك',
        description: 'خزينة: إكسبريس. إحداث: انطلاقة حتى 80%. قروي: انطلاقة القروي.',
        url: 'https://www.tamwilcom.ma/nos-solutions/tres-petites-entreprises',
      },
      {
        title: 'اطلب عبر بنكك',
        description: 'اطلب ضمان تمويلكم عبر بنكك عند التفاوض على القرض.',
      },
      {
        title: 'تموّل',
        description: 'ضمان الدولة يفتح التمويل البنكي لمقاولتك.',
      },
    ],
  },
  {
    id: 'o196',
    slug: 'sila-ai-startups-mediterranean',
    name: 'Sila Call, AI Startups, Southern Mediterranean (€10k-30k Support)',
    tagline: 'France-Mediterranean AI call: 10 startups, tailored scale-up support, deadline Sep 14',
    description: `Sila (France-Mediterranean AI Initiative, funded by France's MEAE via Fonds Équipe France+, run by Expertise France) selects 10 AI startups from Algeria, Egypt, Lebanon, Morocco, and Tunisia: needs assessment, personal scale-up roadmap, and a tailored package worth EUR 10,000-30,000 (MLOps, data, compliance, business development, investment readiness). Health, education, agriculture, climate focus. Apply by September 14, 2026, 12:00 Paris time.`,
    url: 'https://sila-med.com/en/calls/sila-call-for-applications-for-ai-startups-in-the-southern-mediterranean/',
    logoUrl: 'https://sila-med.com/wp-content/uploads/2026/03/Logo_Sila_FR_final.png',
    category: 'forstartups',
    tags: ['ai', 'mediterranean', 'morocco', 'acceleration', 'expertise-france'],
    pricing: 'free',
    steps: [
      {
        title: 'Check eligibility',
        description: `AI startup based in Algeria, Egypt, Lebanon, Morocco, or Tunisia with a functional solution.`,
        url: 'https://sila-med.com/en/calls/sila-call-for-applications-for-ai-startups-in-the-southern-mediterranean/',
      },
      {
        title: 'Read the rules',
        description: `Download the call documents and rules from the Sila page.`,
      },
      {
        title: 'Apply before Sep 14',
        description: `Submit the Google form application by 12:00 Paris time for a EUR 10k-30k support package.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    endsAt: '2026-09-14',
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'نداء Sila, شركات الذكاء الناشئة بالمتوسط الجنوبي',
    taglineAr: 'نداء فرنسي-متوسطي للذكاء: 10 شركات ودعم مخصص وآخر أجل 14 شتنبر',
    descriptionAr: `نداء Sila (المبادرة الفرنسية-المتوسطية للذكاء، بتمويل فرنسي وتنفيذ Expertise France) ينتقي 10 شركات ذكاء من الجزائر ومصر ولبنان والمغرب وتونس: تقييم احتياجات وخارطة نمو وحزمة مخصصة 10-30 ألف يورو (MLOps وبيانات وامتثال وتطوير أعمال). آخر أجل 14 شتنبر 2026.`,
    stepsAr: [
      {
        title: 'تحقق من الأهلية',
        description: 'شركة ذكاء بإحدى الدول الخمس بحل عملي.',
        url: 'https://sila-med.com/en/calls/sila-call-for-applications-for-ai-startups-in-the-southern-mediterranean/',
      },
      {
        title: 'اقرأ القواعد',
        description: 'حمّل وثائق الدعوة والقواعد من صفحة Sila.',
      },
      {
        title: 'قدّم قبل 14 شتنبر',
        description: 'أرسل استمارة الترشيح قبل منتصف نهار باريس لحزمة 10-30 ألف يورو.',
      },
    ],
  },
  {
    id: 'o197',
    slug: 'agents-everywhere-hackathon-2026',
    name: 'Agents Everywhere Global Hackathon (AI Tinkerers × OpenAI)',
    tagline: 'One-day global build: ship an agent where people already work - Sep 12',
    description: `Agents Everywhere by AI Tinkerers with OpenAI as marquee sponsor (plus CopilotKit, OpenRouter, Exa, Trigger.dev, Auth0, Mozilla): a one-day global build day on September 12, 2026 across 261 cities. Build a working agent inside Slack, email, browsers, or devices - one global submission pool, starter kits and builder credits, food provided. Application-only, 300+ already applied in Hyderabad.`,
    url: 'https://hyderabad.aitinkerers.org/p/agents-everywhere-bots-channels-more-global-hackathon',
    logoUrl: 'https://images.aitinkerers.org/ai_tinkerers/logos/ai-tinkerers-transparent-extra-large.png',
    category: 'forstartups',
    tags: ['hackathon', 'agents', 'openai', 'global', 'build-day'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to your city',
        description: `Applications are per-city and reviewed by organizers - apply early, space is limited.`,
        url: 'https://hyderabad.aitinkerers.org/p/agents-everywhere-bots-channels-more-global-hackathon',
      },
      {
        title: 'Build on Sep 12',
        description: `Ship a working agent where people already work: chat, email, browser, or devices - solo or team.`,
      },
      {
        title: 'Submit globally',
        description: `Title, description, public GitHub repo, 2-minute demo video, and a social post before the day ends.`,
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
    nameAr: 'هاكاثون الوكلاء العالمي (AI Tinkerers)',
    taglineAr: 'يوم بناء عالمي: ابنِ وكيلاً حيث يعمل الناس - 12 شتنبر',
    descriptionAr: `هاكاثون الوكلاء العالمي من AI Tinkerers مع OpenAI: يوم بناء واحد 12 شتنبر 2026 في 261 مدينة. ابنِ وكيلاً عملياً داخل Slack أو البريد أو المتصفح - تجمع عالمي واحد ومواد بداية ووجبات. بالتقديم فقط.`,
    stepsAr: [
      {
        title: 'قدّم لمدينتك',
        description: 'التقديم لكل مدينة بمراجعة المنظمين - قدّم مبكراً.',
        url: 'https://hyderabad.aitinkerers.org/p/agents-everywhere-bots-channels-more-global-hackathon',
      },
      {
        title: 'ابنِ يوم 12 شتنبر',
        description: 'ابنِ وكيلاً عملياً منفرداً أو بفريق.',
      },
      {
        title: 'أرسل عالمياً',
        description: 'عنوان ووصف ومستودع GitHub وفيديو دقيقتين ومنشور قبل نهاية اليوم.',
      },
    ],
  },
  {
    id: 'o198',
    slug: 'cline-free-models',
    name: 'Cline + GLM 5.3 Flash + DeepSeek V4 Flash',
    tagline: 'FREE AI coding inside Cline - GLM 5.3 Flash & DeepSeek V4 Flash, no card',
    description: `Cline is a free AI coding helper that runs in your terminal (black command window) - no code editor add-on needed. Right now every free Cline account gets a free allowance of smart AI models - including GLM 5.3 Flash (Zhipu's newest fast coding model) and DeepSeek V4 Flash (works even with $0 balance, no bank card needed). Just install it with one command, pick a model with the FREE label, and type what you want in plain words. When your free allowance runs out, you can continue with ClinePass ($9.99/month) or pay-as-you-go.`,
    url: 'https://cline.bot/cli',
    logoUrl: 'https://icons.duckduckgo.com/ip3/cline.bot.ico',
    category: 'api-access',
    tags: ['cline', 'free', 'coding', 'ai-agent', 'models', 'api', 'glm', 'glm-5.3-flash', 'deepseek', 'deepseek-v4-flash', 'cli', 'terminal'],
    pricing: 'free',
    steps: [
      {
        title: 'Step 1 - Install Node.js (one time only)',
        description: 'Cline needs Node.js version 20 or newer to run. Open nodejs.org, download the LTS version for your system, and install it like any normal program. If you already have Node.js, skip this step.',
        url: 'https://nodejs.org/',
      },
      {
        title: 'Step 2 - Install Cline with one command',
        description: 'Open your terminal (on Windows: PowerShell; on Mac: Terminal) and type exactly: npm install -g cline - then press Enter and wait until it finishes. This downloads the Cline program to your computer. No code editor or extension needed.',
        url: 'https://cline.bot/cli',
      },
      {
        title: 'Step 3 - Create your free account and log in',
        description: 'In the same terminal, type: cline auth - then press Enter. It will guide you to sign up with your email in the browser. This free account is what unlocks the free models. No bank card is asked for.',
        url: 'https://cline.bot/cli',
      },
      {
        title: 'Step 4 - Start Cline and pick GLM 5.3 Flash (free)',
        description: 'Type: cline - then press Enter to open Cline. When it asks which AI brain to use, choose the Cline provider, then look for GLM 5.3 Flash by Zhipu - the newest fast coding model with a huge memory (1M context, meaning it can read very large projects). Free models carry a FREE label. Select it.',
        url: 'https://docs.cline.bot/getting-started/free-models',
      },
      {
        title: 'Step 5 - Or pick DeepSeek V4 Flash (free)',
        description: 'Prefer another option? Choose DeepSeek V4 Flash instead. It also has a huge memory (1M context) and it works even if your balance shows $0 - no card, no payment. Great for small fixes, homework-like tasks, and daily coding help.',
      },
      {
        title: 'Step 6 - Type what you want in plain words and press Enter',
        description: 'Example: write "make me a simple website with a blue button" and press Enter. Cline will create the files for you and ask your permission before each change - always approve when you agree. Tip: the free models change from time to time and the free allowance is limited, so use it now. When it runs out, Cline will offer ClinePass ($9.99/month) or pay-as-you-go - or you can add your own key later.',
      },
    ],
    nameAr: 'Cline + GLM 5.3 Flash + DeepSeek V4 Flash',
    taglineAr: 'برمجة مجانية بالذكاء الاصطناعي داخل Cline - بدون بطاقة بنكية',
    descriptionAr: `Cline مساعد مجاني يعمل في نافذة الأوامر (Terminal) - بدون الحاجة لإضافة محرر الأكواد. حالياً كل حساب Cline مجاني يحصل على حصة مجانية من نماذج ذكية - منها GLM 5.3 Flash (أسرع نماذج Zhipu للبرمجة) وDeepSeek V4 Flash (يعمل حتى برصيد 0$ وبدون بطاقة). فقط ثبّته بأمر واحد، اختر نموذجاً عليه شارة FREE، واكتب ما تريد بكلمات عادية. عند انتهاء الحصة يمكنك المتابعة مع ClinePass (9.99$/شهر) أو الدفع حسب الاستخدام.`,
    stepsAr: [
      {
        title: 'الخطوة 1 - ثبّت Node.js (مرة واحدة فقط)',
        description: 'يحتاج Cline إلى Node.js إصدار 20 أو أحدث. افتح موقع nodejs.org وحمّل النسخة المناسبة لجهازك وثبّتها كأي برنامج عادي. إذا كان عندك Node.js مسبقاً تجاوز هذه الخطوة.',
        url: 'https://nodejs.org/',
      },
      {
        title: 'الخطوة 2 - ثبّت Cline بأمر واحد',
        description: 'افتح نافذة الأوامر (في ويندوز: PowerShell، وفي ماك: Terminal) واكتب بالضبط: npm install -g cline - ثم اضغط Enter وانتظر حتى ينتهي. سيحمّل هذا برنامج Cline إلى حاسوبك. لا حاجة لمحرر أكواد أو إضافة.',
        url: 'https://cline.bot/cli',
      },
      {
        title: 'الخطوة 3 - أنشئ حسابك المجاني وسجّل الدخول',
        description: 'في نفس النافذة اكتب: cline auth - ثم اضغط Enter. سيرشدك للتسجيل ببريدك في المتصفح. هذا الحساب المجاني هو ما يفتح لك النماذج المجانية. لن تُطلب منك أي بطاقة بنكية.',
        url: 'https://cline.bot/cli',
      },
      {
        title: 'الخطوة 4 - شغّل Cline واختر GLM 5.3 Flash (مجاني)',
        description: 'اكتب: cline - ثم اضغط Enter لفتح Cline. عندما يسألك عن العقل الاصطناعي اختر مزود Cline، ثم ابحث عن GLM 5.3 Flash من شركة Zhipu - أحدث نموذج سريع للبرمجة بذاكرة ضخمة تقرأ مشاريع كبيرة. النماذج المجانية تحمل شارة FREE. اختره.',
        url: 'https://docs.cline.bot/getting-started/free-models',
      },
      {
        title: 'الخطوة 5 - أو اختر DeepSeek V4 Flash (مجاني)',
        description: 'تريد خياراً آخر؟ اختر DeepSeek V4 Flash بدلاً منه. ذاكرته ضخمة أيضاً ويعمل حتى لو كان رصيدك 0$ - بدون بطاقة وبدون دفع. ممتاز للإصلاحات الصغيرة والمهام اليومية.',
      },
      {
        title: 'الخطوة 6 - اكتب ما تريد بكلمات عادية واضغط Enter',
        description: 'مثال: اكتب "اصنع لي موقعاً بسيطاً بزر أزرق" واضغط Enter. سيُنشئ Cline الملفات لأجلك ويطلب إذنك قبل كل تغيير - اضغط موافق عندما يعجبك. تنبيه: النماذج المجانية تتغير من وقت لآخر والحصّة محدودة، فاستغلها الآن. عند انتهائها سيعرض عليك ClinePass (9.99$/شهر) أو الدفع حسب الاستخدام.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  // --- Startup Perks: Discounts for Startup (source: startup-perks.com, links = official program pages) ---
  {
    id: 'o199',
    slug: 'cloudflare-startups-350k-credits',
    name: 'Cloudflare for Startups',
    tagline: 'Up to $350,000 in credits - 3 tiers by funding stage',
    description:
      'Cloudflare startup program offers up to $350k in credits across three tiers: $10k bootstrapped, $100k ($1M+ raised via partner), $350k ($5M+ raised via partner). Covers Workers, Workers AI (up to $50k), R2 (up to $10k), Pages, Stream, plus free DDoS/WAF/CDN/DNS. Eligibility: founded <10 years, up to Series B, tech product with live site. Source: startup-perks.com/perks/cloudflare-startups/.',
    url: 'https://www.cloudflare.com/startups/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=cloudflare.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '350k', 'cloud', 'security', 'cdn', 'startup-perks', 'pre-seed'],
    pricing: 'free',
    steps: [
      {
        title: 'Check your tier',
        description:
          'Bootstrapped or <$1M raised = $10k tier. $1M+ raised via an affiliated partner = $100k. $5M+ via partner = $350k. Must be founded within 10 years, up to Series B, with a live website.',
        url: 'https://www.cloudflare.com/startups/',
      },
      {
        title: 'Apply on the official program page',
        description:
          'Submit the startup application on cloudflare.com/startups with your company, funding, and website details. First-time applicants only.',
        url: 'https://www.cloudflare.com/startups/',
      },
      {
        title: 'Get credits + enterprise domains',
        description:
          'Once approved, credits apply to Workers, R2, Pages, Stream, AI and more. Each tier also includes 3 enterprise domains and unlimited Business/Pro plans.',
      },
      {
        title: 'Use partner channel for higher tiers',
        description:
          'Tiers 1-2 require funding from an affiliated partner (e.g. accelerator/VC in the Cloudflare program). Apply through your investor if needed.',
      },
    ],
    nameAr: 'كلاودفلير للشركات الناشئة',
    taglineAr: 'حتى 350,000$ رصيد مجاني - 3 مستويات حسب التمويل',
    descriptionAr: 'برنامج كلاودفلير يمنح حتى 350 ألف $ رصيد: 10 آلاف $ للممولة ذاتياً، 100 ألف $ (تمويل +1م$ عبر شريك)، 350 ألف $ (تمويل +5م$ عبر شريك). يشمل Workers والذكاء الاصطناعي وR2 وPages مع حماية DDoS وCDN مجانية. الأهلية: تأسيس أقل من 10 سنوات حتى Series B مع موقع حي.',
    stepsAr: [
      {
        title: 'حدد مستواك',
        description: 'تمويل ذاتي أو أقل من مليون $ = مستوى 10 آلاف $. أكثر من مليون $ عبر شريك = 100 ألف $. أكثر من 5 ملايين $ عبر شريك = 350 ألف $.',
        url: 'https://www.cloudflare.com/startups/',
      },
      {
        title: 'قدّم في الصفحة الرسمية',
        description: 'املأ طلب الشركة الناشئة في cloudflare.com/startups ببيانات شركتك وتمويلك وموقعك.',
        url: 'https://www.cloudflare.com/startups/',
      },
      {
        title: 'استلم الرصيد والنطاقات',
        description: 'بعد القبول يُطبَّق الرصيد على Workers وR2 وPages وغيرها، مع 3 نطاقات enterprise وخطط Business/Pro غير محدودة.',
      },
      {
        title: 'استعمل قناة الشريك للمستويات العليا',
        description: 'المستويان 1 و2 يتطلبان تمويلاً من شريك تابع (مسرّعة أو مستثمر في البرنامج) - قدّم عبر مستثمرك عند الحاجة.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o200',
    slug: 'grafana-startup-100k-credits',
    name: 'Grafana Labs Startup Program',
    tagline: 'Up to $100,000 in Grafana Cloud credits - metrics, logs, traces',
    description:
      'Grafana Labs offers early-stage startups up to $100,000 in Grafana Cloud credits to monitor metrics, logs, and traces with the leading open-source visualization platform. Global, pre-seed to Series B. Source: startup-perks.com/perks/grafana-startup/.',
    url: 'https://grafana.com/blog/grafana-labs-startup-program/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=grafana.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '100k', 'observability', 'monitoring', 'startup-perks', 'pre-seed'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early-stage startup (pre-seed to Series B) needing observability for metrics, logs, traces. Global.',
      },
      {
        title: 'Apply on the official page',
        description: 'Submit your startup details on the Grafana Labs startup program page.',
        url: 'https://grafana.com/blog/grafana-labs-startup-program/',
      },
      {
        title: 'Get up to $100k in Cloud credits',
        description: 'Once approved, use credits on Grafana Cloud for dashboards, alerting, and telemetry at scale.',
      },
    ],
    nameAr: 'غرافانا للشركات الناشئة',
    taglineAr: 'حتى 100,000$ رصيد Grafana Cloud - مقاييس وسجلات وتتبع',
    descriptionAr: 'تمنح Grafana Labs الشركات الناشئة المبكرة حتى 100 ألف $ رصيد Grafana Cloud لمراقبة المقاييس والسجلات والتتبع بأشهر منصة تصور مفتوحة المصدر. عالمي من pre-seed إلى Series B.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة ناشئة مبكرة (pre-seed إلى Series B) تحتاج المراقبة للمقاييس والسجلات والتتبع.',
      },
      {
        title: 'قدّم في الصفحة الرسمية',
        description: 'أرسل بيانات شركتك في صفحة برنامج Grafana Labs للشركات الناشئة.',
        url: 'https://grafana.com/blog/grafana-labs-startup-program/',
      },
      {
        title: 'استلم حتى 100 ألف $ رصيد',
        description: 'بعد القبول استعمل الرصيد في Grafana Cloud للوحات والتنبيهات والقياسات.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o201',
    slug: 'statsig-startups-50k-credits',
    name: 'Statsig for Startups',
    tagline: '$50,000+ free credits - feature flags, A/B testing, analytics',
    description:
      'Statsig for Startups provides $50,000+ in credits including 1B events free and full Enterprise Tier access for 12 months: feature flags, A/B testing, analytics at scale. Pre-seed to Series A, global. Source: startup-perks.com/perks/statsig-startup/.',
    url: 'https://www.statsig.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=statsig.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '50k', 'experimentation', 'feature-flags', 'analytics', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early-stage startup (pre-seed to Series A) needing experimentation, flags, analytics. Global.',
      },
      {
        title: 'Apply on statsig.com/startups',
        description: 'Register your startup on the official Statsig for Startups page.',
        url: 'https://www.statsig.com/startups',
      },
      {
        title: 'Get $50k+ credits + 12mo Enterprise',
        description: 'Includes 1B events free and full Enterprise Tier for 12 months - ship and test without tool sprawl.',
      },
    ],
    nameAr: 'Statsig للشركات الناشئة',
    taglineAr: 'أكثر من 50,000$ رصيد مجاني - تجارب وA/B وتحليلات',
    descriptionAr: 'يمنح Statsig للشركات الناشئة أكثر من 50 ألف $ رصيد يشمل مليار حدث مجاناً ووصول Enterprise الكامل 12 شهراً: feature flags واختبارات A/B وتحليلات. من pre-seed إلى Series A عالمياً.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة (pre-seed إلى Series A) تحتاج التجارب والتحليلات.',
      },
      {
        title: 'قدّم في statsig.com/startups',
        description: 'سجّل شركتك في الصفحة الرسمية لـ Statsig for Startups.',
        url: 'https://www.statsig.com/startups',
      },
      {
        title: 'استلم +50 ألف $ وEnterprise سنة',
        description: 'يشمل مليار حدث مجاناً وEnterprise الكاملة 12 شهراً.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o202',
    slug: 'scaleway-startup-36k-credits',
    name: 'Scaleway Startup Program',
    tagline: 'Up to €36,000 cloud credits + architect consulting',
    description:
      'Scaleway Startup Program offers up to €36,000 cost-coverage for cloud services, free consulting from solution architects, and a community of 2400+ startups. Any stage, global/Europe, pre-seed to Series B. Source: startup-perks.com/perks/scaleway-startup/.',
    url: 'https://www.scaleway.com/en/startup-program/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=scaleway.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '36k', 'cloud', 'europe', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early-stage startup building on cloud infrastructure (any stage, pre-seed to Series B).',
      },
      {
        title: 'Apply on the official page',
        description: 'Join via scaleway.com startup program with your company details.',
        url: 'https://www.scaleway.com/en/startup-program/',
      },
      {
        title: 'Get up to €36k + architect help',
        description: 'Credits for cloud services plus free solution-architect consulting and the 2400+ startup community.',
      },
    ],
    nameAr: 'Scaleway للشركات الناشئة',
    taglineAr: 'حتى 36,000€ رصيد سحابي + استشارات معماريين',
    descriptionAr: 'يمنح برنامج Scaleway حتى 36 ألف € تغطية للخدمات السحابية مع استشارات مجانية من معماريي الحلول ومجتمع +2400 شركة ناشئة. كل المراحل المبكرة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تبني على البنية السحابية (pre-seed إلى Series B).',
      },
      {
        title: 'قدّم في الصفحة الرسمية',
        description: 'انضم عبر صفحة Scaleway للشركات الناشئة ببيانات شركتك.',
        url: 'https://www.scaleway.com/en/startup-program/',
      },
      {
        title: 'استلم حتى 36 ألف € والمساعدة',
        description: 'رصيد للخدمات السحابية + استشارات معماريين مجانية ومجتمع الشركات.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o203',
    slug: 'ovhcloud-startup-credits',
    name: 'OVHcloud Startup Program',
    tagline: '€10,000-100,000 cloud credits - START & SCALE levels',
    description:
      'OVHcloud Startup Program gives €10k-100k in free public cloud credits plus technical consultations, visibility, and mentoring (2900+ startups helped since 2015). START level for pre-seed/seed, SCALE for Series A. Global/Europe. Source: startup-perks.com/perks/ovhcloud-startup/.',
    url: 'https://us.ovhcloud.com/startup-program/',
    logoUrl: '/logos/ovhcloud.svg',
    category: 'startup-discounts',
    tags: ['free', 'credits', '100k', 'cloud', 'europe', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Pick your level',
        description: 'START for pre-seed/seed, SCALE for Series A (up to Series B accepted).',
      },
      {
        title: 'Apply on the official page',
        description: 'Submit your application on the OVHcloud startup program page.',
        url: 'https://us.ovhcloud.com/startup-program/',
      },
      {
        title: 'Get €10k-100k + mentoring',
        description: 'Free public cloud credits plus technical consultations, visibility, funding-event access, and mentoring.',
      },
    ],
    nameAr: 'OVHcloud للشركات الناشئة',
    taglineAr: '10,000 إلى 100,000€ رصيد سحابي - مستويان START وSCALE',
    descriptionAr: 'يمنح برنامج OVHcloud من 10 آلاف إلى 100 ألف € رصيد سحابي مجاني مع استشارات تقنية وظهور وإرشاد (ساعد +2900 شركة منذ 2015). مستوى START لما قبل التأسيس وSCALE لـ Series A.',
    stepsAr: [
      {
        title: 'اختر مستواك',
        description: 'START لمراحل pre-seed/seed وSCALE لـ Series A.',
      },
      {
        title: 'قدّم في الصفحة الرسمية',
        description: 'أرسل طلبك في صفحة OVHcloud للشركات الناشئة.',
        url: 'https://us.ovhcloud.com/startup-program/',
      },
      {
        title: 'استلم الرصيد والإرشاد',
        description: 'رصيد سحابي مجاني + استشارات تقنية وظهور ومواكبة.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o204',
    slug: 'gitlab-startups-ultimate-free',
    name: 'GitLab for Startups',
    tagline: '20 GitLab Ultimate licenses FREE for 1 year + Duo AI',
    description:
      'GitLab for Startups provides 20 licenses of GitLab Ultimate free for one year - unify development, security, operations, including AI features via GitLab Duo. Early-stage software startups, global. Source: startup-perks.com/perks/gitlab-startup/.',
    url: 'https://about.gitlab.com/solutions/startups/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=gitlab.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'licenses', 'devops', 'git', 'ai', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early-stage startup building a software product (pre-seed to Series B), global.',
      },
      {
        title: 'Apply on the official page',
        description: 'Submit the startup application on about.gitlab.com/solutions/startups/.',
        url: 'https://about.gitlab.com/solutions/startups/',
      },
      {
        title: 'Get 20 Ultimate seats for 1 year',
        description: 'Unify dev, security, ops with Ultimate + GitLab Duo AI features for your whole team.',
      },
    ],
    nameAr: 'GitLab للشركات الناشئة',
    taglineAr: '20 رخصة Ultimate مجاناً لسنة + مزايا Duo للذكاء الاصطناعي',
    descriptionAr: 'يمنح GitLab للشركات الناشئة 20 رخصة GitLab Ultimate مجاناً لسنة - وحّد التطوير والأمن والعمليات مع مزايا الذكاء الاصطناعي عبر GitLab Duo. لشركات البرمجيات المبكرة عالمياً.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة برمجيات مبكرة (pre-seed إلى Series B).',
      },
      {
        title: 'قدّم في الصفحة الرسمية',
        description: 'أرسل طلبك في صفحة GitLab للشركات الناشئة.',
        url: 'https://about.gitlab.com/solutions/startups/',
      },
      {
        title: 'استلم 20 مقعداً لسنة',
        description: 'وحّد التطوير والأمن والعمليات مع Ultimate ومزايا Duo.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o205',
    slug: 'circleci-open-source-credits',
    name: 'CircleCI Open Source Program',
    tagline: 'Up to 400,000 FREE build minutes monthly for open source',
    description:
      'CircleCI supports open source with up to 400,000 monthly credits for Linux builds - one of the most robust free CI/CD plans (3.6M+ OSS builds monthly). Open source projects, global. Source: startup-perks.com/perks/circleci-oss/.',
    url: 'https://circleci.com/open-source/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=circleci.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'ci-cd', 'open-source', 'devops', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Your project is open source (pre-seed to Series A teams building OSS accepted).',
      },
      {
        title: 'Apply on the official page',
        description: 'Request OSS access on circleci.com/open-source/ with your repo details.',
        url: 'https://circleci.com/open-source/',
      },
      {
        title: 'Get up to 400k monthly credits',
        description: 'Run Linux builds free each month on one of the most generous CI/CD plans.',
      },
    ],
    nameAr: 'CircleCI للمشاريع مفتوحة المصدر',
    taglineAr: 'حتى 400,000 دقيقة بناء مجانية شهرياً للمشاريع الحرة',
    descriptionAr: 'يدعم CircleCI المشاريع الحرة حتى 400 ألف نقطة شهرياً لبناء Linux - من أسخى خطط CI/CD المجانية (+3.6 ملايين بناء شهرياً).',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'مشروعك مفتوح المصدر.',
      },
      {
        title: 'قدّم في الصفحة الرسمية',
        description: 'اطلب وصول OSS في circleci.com/open-source/ ببيانات مستودعك.',
        url: 'https://circleci.com/open-source/',
      },
      {
        title: 'استلم حتى 400 ألف نقطة شهرياً',
        description: 'شغّل بناء Linux مجاناً كل شهر.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o206',
    slug: 'new-relic-free-tier',
    name: 'New Relic Free Tier',
    tagline: '100GB ingest FREE every month + full platform access',
    description:
      'New Relic free tier: 100GB data ingest free per month forever, all 50+ platform capabilities (APM, tracing, logs), 1 full platform user + unlimited basic users. Any startup needing observability, global. Source: startup-perks.com/perks/newrelic-freetier/.',
    url: 'https://newrelic.com/pricing/free-tier',
    logoUrl: 'https://www.google.com/s2/favicons?domain=newrelic.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'observability', 'monitoring', '100gb', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign up free',
        description: 'Create a New Relic account - no startup application needed, the free tier is open to all.',
        url: 'https://newrelic.com/pricing/free-tier',
      },
      {
        title: 'Get 100GB/month forever',
        description: '100GB ingest monthly with all 50+ capabilities: APM, tracing, logs, dashboards.',
      },
      {
        title: 'Invite your team',
        description: '1 full platform user included plus unlimited basic users for the whole startup.',
      },
    ],
    nameAr: 'New Relic المجاني',
    taglineAr: '100GB مجاناً كل شهر + وصول كامل للمنصة',
    descriptionAr: 'الطبقة المجانية من New Relic: 100GB استيعاب مجاناً شهرياً للأبد مع كل القدرات (+50) ومستخدم كامل واحد + مستخدمين أساسيين غير محدودين. لأي شركة ناشئة.',
    stepsAr: [
      {
        title: 'سجّل مجاناً',
        description: 'أنشئ حساب New Relic - لا حاجة لطلب خاص، الطبقة المجانية مفتوحة للجميع.',
        url: 'https://newrelic.com/pricing/free-tier',
      },
      {
        title: 'استلم 100GB شهرياً للأبد',
        description: '100GB شهرياً مع كل القدرات: APM والتتبع والسجلات واللوحات.',
      },
      {
        title: 'ادعُ فريقك',
        description: 'مستخدم كامل واحد + مستخدمون أساسيون غير محدودون.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o207',
    slug: 'whimsical-startups-12mo-free',
    name: 'Whimsical for Startups',
    tagline: 'FREE 12 months Pro - whiteboards, diagrams, docs',
    description:
      'Whimsical for Startups: up to 12 months of Pro free (revenue <$1M, <50 employees, new customer, via partners; 6 months if revenue >$1M). Whiteboarding, diagramming, wireframing + docs. Pre-seed to Series A, global. Source: startup-perks.com/perks/whimsical-startup/.',
    url: 'https://whimsical.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=whimsical.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', '12-months', 'productivity', 'design', 'collaboration', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Partner-backed startup, revenue under $1M (= 12 months) or over $1M (= 6 months), under 50 employees, new Whimsical customer.',
      },
      {
        title: 'Apply on whimsical.com/startups',
        description: 'Submit via the official Whimsical for Startups page through your partner.',
        url: 'https://whimsical.com/startups',
      },
      {
        title: 'Get up to 12 months Pro free',
        description: 'Whiteboards, diagrams, wireframes + docs for the whole team - from brainstorm to live product.',
      },
    ],
    nameAr: 'Whimsical للشركات الناشئة',
    taglineAr: '12 شهراً مجاناً من Pro - سبورات ومخططات ووثائق',
    descriptionAr: 'يمنح Whimsical الشركات الناشئة حتى 12 شهراً من Pro مجاناً (إيرادات <1م$ وأقل من 50 موظفاً وعميل جديد عبر الشركاء؛ 6 أشهر إذا >1م$). سبورات ومخططات ونماذج ووثائق.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مدعومة من شريك، إيرادات أقل من مليون $ (= 12 شهراً)، أقل من 50 موظفاً، عميل جديد.',
      },
      {
        title: 'قدّم في whimsical.com/startups',
        description: 'قدّم عبر الصفحة الرسمية من خلال شريكك.',
        url: 'https://whimsical.com/startups',
      },
      {
        title: 'استلم حتى 12 شهراً Pro',
        description: 'سبورات ومخططات ونماذج ووثائق للفريق كاملاً.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o208',
    slug: 'replit-startups-teams-free',
    name: 'Replit for Startups',
    tagline: 'Up to $25K credits - Startup Program, build & deploy from browser',
    description:
      'Replit Startup Program: up to $25K in credits for startups - build, test, and deploy applications directly from the browser with cloud-native dev environments, no local setup. Early-stage software startups, global. Source: startup-perks.com/perks/replit-startup/ - claim on the official Replit for Startups page.',
    url: 'https://replit.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=replit.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '25k', 'ide', 'devtools', 'cloud', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early-stage startup building software applications (pre-seed to Series A).',
      },
      {
        title: 'Apply on replit.com/startups',
        description: 'Submit your startup on the official Replit Startup Program page for up to $25K in credits.',
        url: 'https://replit.com/startups',
      },
      {
        title: 'Build in the browser',
        description: 'Develop, test, deploy with the whole team - no complex local setup needed.',
      },
    ],
    nameAr: 'Replit للشركات الناشئة',
    taglineAr: 'حتى 25K$ رصيد - برنامج الشركات، ابنِ وأطلق من المتصفح',
    descriptionAr: 'يمنح برنامج Replit للشركات الناشئة حتى 25K$ رصيد - ابنِ واختبر وأطلق التطبيقات من المتصفح مباشرة ببيئات سحابية دون إعداد محلي. لشركات البرمجيات المبكرة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة برمجيات مبكرة (pre-seed إلى Series A).',
      },
      {
        title: 'قدّم في replit.com/startups',
        description: 'أرسل شركتك في صفحة برنامج Replit للشركات للحصول على حتى 25K$.',
        url: 'https://replit.com/startups',
      },
      {
        title: 'ابنِ في المتصفح',
        description: 'طوّر واختبر وأطلق مع الفريق دون إعداد محلي معقد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o209',
    slug: 'jetbrains-startups-free-licenses',
    name: 'JetBrains for Startups',
    tagline: 'FREE team IDE licenses for eligible startups',
    description:
      'JetBrains for Startups provides free team IDE licenses for eligible early-stage product-focused software companies (scope/duration vary by profile - confirm on official page). Bootstrapped to seed, global. Source: startup-perks.com/perks/jetbrains-for-startups/.',
    url: 'https://www.jetbrains.com/startups/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=jetbrains.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'licenses', 'ide', 'devtools', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Product-focused software startup meeting JetBrains age/criteria limits (bootstrapped, pre-seed, seed).',
      },
      {
        title: 'Apply on jetbrains.com/startups',
        description: 'Submit company details on the official JetBrains for Startups page.',
        url: 'https://www.jetbrains.com/startups/',
      },
      {
        title: 'Get free team licenses',
        description: 'Equip the whole team with professional IDEs - check current scope/duration on approval.',
      },
    ],
    nameAr: 'JetBrains للشركات الناشئة',
    taglineAr: 'رخص IDE مجانية لفرق الشركات المؤهلة',
    descriptionAr: 'تمنح JetBrains فرق شركات البرمجيات المبكرة رخص IDE مجانية (النطاق والمدة حسب الملف - أكّد في الصفحة الرسمية). من التمويل الذاتي إلى seed عالمياً.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة برمجيات منتَجة تستوفي شروط العمر والمعايير.',
      },
      {
        title: 'قدّم في jetbrains.com/startups',
        description: 'أرسل بيانات شركتك في الصفحة الرسمية.',
        url: 'https://www.jetbrains.com/startups/',
      },
      {
        title: 'استلم رخص الفريق',
        description: 'جهّز الفريق كاملاً ببيئات احترافية.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o210',
    slug: 'linear-startups-free-period',
    name: 'Linear for Startups',
    tagline: 'Up to 6 months FREE on paid plans - ship faster',
    description:
      'Linear for Startups gives eligible teams free access periods (up to 6 months) on paid plans for issue tracking. Requires new customer + employee limits + approved partner affiliation. Pre-seed to Series A, global. Source: startup-perks.com/perks/linear-for-startups/.',
    url: 'https://linear.app/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=linear.app&sz=64',
    category: 'startup-discounts',
    tags: ['free', '6-months', 'productivity', 'issue-tracking', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'New Linear customer, under employee limits, affiliated with an approved startup partner.',
      },
      {
        title: 'Apply on linear.app/startups',
        description: 'Enroll your workspace via the official Linear for Startups page.',
        url: 'https://linear.app/startups',
      },
      {
        title: 'Get up to 6 months free',
        description: 'Run paid-plan issue tracking free while you ship - confirm latest terms at enrollment.',
      },
    ],
    nameAr: 'Linear للشركات الناشئة',
    taglineAr: 'حتى 6 أشهر مجاناً في الخطط المدفوعة',
    descriptionAr: 'يمنح Linear للفرق المؤهلة فترات مجانية (حتى 6 أشهر) في الخطط المدفوعة لتتبع المهام. يتطلب عميلاً جديداً وحدود موظفين وانتماء لشريك معتمد.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'عميل Linear جديد ضمن حدود الموظفين ومنتمٍ لشريك معتمد.',
      },
      {
        title: 'قدّم في linear.app/startups',
        description: 'سجّل مساحة عملك عبر الصفحة الرسمية.',
        url: 'https://linear.app/startups',
      },
      {
        title: 'استلم حتى 6 أشهر مجاناً',
        description: 'تتبع مهام مدفوع مجاناً أثناء الإطلاق.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o211',
    slug: 'convex-startups-backend-free',
    name: 'Convex for Startups',
    tagline: 'FREE 1yr Professional + 30% off usage up to $30k',
    description:
      'Convex for Startups: up to 1 year free Professional plan plus 30% off usage fees up to $30,000 for the reactive backend. Eligibility: Series A or earlier, <20 employees, <3 years old, <$3M raised. Global. Source: startup-perks.com/perks/convex-for-startups/.',
    url: 'https://www.convex.dev/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=convex.dev&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'discount', 'backend', 'database', '30k', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Series A or earlier, fewer than 20 employees, under 3 years old, less than $3M raised.',
      },
      {
        title: 'Apply on convex.dev/startups',
        description: 'Submit your startup on the official Convex for Startups page.',
        url: 'https://www.convex.dev/startups',
      },
      {
        title: 'Get 1yr Pro + 30% off',
        description: 'Free Professional access for a year plus 30% off usage up to $30k - re-check limits before applying.',
      },
    ],
    nameAr: 'Convex للشركات الناشئة',
    taglineAr: 'سنة Pro مجاناً + خصم 30% حتى 30 ألف $',
    descriptionAr: 'يمنح Convex حتى سنة مجانية من Professional وخصم 30% على الاستخدام حتى 30 ألف $ للباك-إند التفاعلي. الأهلية: Series A أو قبل، أقل من 20 موظفاً و3 سنوات و3 ملايين $.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'Series A أو قبل، أقل من 20 موظفاً و3 سنوات و3 ملايين $ تمويل.',
      },
      {
        title: 'قدّم في convex.dev/startups',
        description: 'أرسل شركتك في الصفحة الرسمية.',
        url: 'https://www.convex.dev/startups',
      },
      {
        title: 'استلم سنة Pro والخصم',
        description: 'وصول Professional مجاني سنة + خصم 30% حتى 30 ألف $.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o212',
    slug: 'huggingface-startup-credits',
    name: 'Hugging Face Startup Program',
    tagline: 'FREE inference credits + Pro features for AI startups',
    description:
      'Hugging Face gives early-stage AI startups free monthly credits for Inference Providers plus Pro subscription features - ideal for building on open-source models. Pre-seed to Series A, global. Source: startup-perks.com/perks/huggingface-startup/.',
    url: 'https://huggingface.co/pricing',
    logoUrl: 'https://www.google.com/s2/favicons?domain=huggingface.co&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'ai', 'inference', 'open-source', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early-stage AI startup building on Hugging Face infrastructure (pre-seed to Series A).',
      },
      {
        title: 'Claim on the official page',
        description: 'Get startup credits via huggingface.co/pricing program route.',
        url: 'https://huggingface.co/pricing',
      },
      {
        title: 'Build on open models',
        description: 'Use monthly inference credits + Pro features to ship AI apps on open-source models.',
      },
    ],
    nameAr: 'Hugging Face للشركات الناشئة',
    taglineAr: 'رصيد استدلال مجاني + مزايا Pro لشركات الذكاء الاصطناعي',
    descriptionAr: 'تمنح Hugging Face شركات الذكاء الاصطناعي المبكرة رصيداً شهرياً مجانياً لمزودي الاستدلال مع مزايا اشتراك Pro - مثالية للبناء على النماذج مفتوحة المصدر.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة ذكاء اصطناعي مبكرة تبني على بنية Hugging Face.',
      },
      {
        title: 'اطلبها في الصفحة الرسمية',
        description: 'احصل على الرصيد عبر صفحة أسعار Hugging Face.',
        url: 'https://huggingface.co/pricing',
      },
      {
        title: 'ابنِ على النماذج الحرة',
        description: 'استعمل الرصيد الشهري ومزايا Pro لإطلاق تطبيقات ذكاء اصطناعي.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o213',
    slug: 'anthropic-startup-credits',
    name: 'Anthropic Startup Credits',
    tagline: 'FREE Claude API credits $1K-$100K+ via partners',
    description:
      'Anthropic offers startups free Claude API credits ($1K-$100K+ depending on partner program) through partner programs and accelerator ecosystems. Pre-seed to Series B, global. Source: startup-perks.com/perks/anthropic-startup-credits/.',
    url: 'https://www.anthropic.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=anthropic.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'ai', 'claude', 'api', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Join a partner program',
        description: 'Credits flow via accelerators/partners (amounts $1K-$100K+ by program). Get accepted into one that includes Anthropic.',
      },
      {
        title: 'Claim on anthropic.com/startups',
        description: 'Follow the official startups page route for your partner program.',
        url: 'https://www.anthropic.com/startups',
      },
      {
        title: 'Build with Claude',
        description: 'Use free API credits to prototype and ship Claude-powered features.',
      },
    ],
    nameAr: 'رصيد Anthropic للشركات الناشئة',
    taglineAr: 'رصيد Claude API مجاني من 1K إلى +100K$ عبر الشركاء',
    descriptionAr: 'تمنح Anthropic الشركات الناشئة رصيد Claude API مجانياً (من ألف إلى أكثر من 100 ألف $ حسب البرنامج) عبر برامج الشركاء والمسرّعات. من pre-seed إلى Series B.',
    stepsAr: [
      {
        title: 'انضم لبرنامج شريك',
        description: 'الرصيد يمر عبر المسرّعات والشركاء (1K-100K$+ حسب البرنامج).',
      },
      {
        title: 'اطلبه في anthropic.com/startups',
        description: 'اتبع مسار برنامج شريكك في الصفحة الرسمية.',
        url: 'https://www.anthropic.com/startups',
      },
      {
        title: 'ابنِ مع Claude',
        description: 'استعمل الرصيد المجاني لإطلاق مزايا مدعومة بـ Claude.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o214',
    slug: 'openai-startup-credits',
    name: 'OpenAI Startup Credits',
    tagline: 'FREE credits via accelerators & partner ecosystems',
    description:
      'OpenAI startup benefits are distributed through partner ecosystems and accelerator programs - no single universal package; amounts vary by route. Pre-seed to Series A, global. Source: startup-perks.com/perks/openai-startup-credits/.',
    url: 'https://openai.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=openai.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'ai', 'api', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Join a partner/accelerator',
        description: 'Benefits come via approved partners - join one whose perks include OpenAI credits.',
      },
      {
        title: 'Claim via your program',
        description: 'Redeem through your accelerator/partner dashboard; start at openai.com.',
        url: 'https://openai.com/',
      },
      {
        title: 'Build with the API',
        description: 'Use credits for GPT models, embeddings, and fine-tuning experiments.',
      },
    ],
    nameAr: 'رصيد OpenAI للشركات الناشئة',
    taglineAr: 'رصيد مجاني عبر المسرّعات والشركاء',
    descriptionAr: 'تُوزَّع مزايا OpenAI عبر منظومات الشركاء والمسرّعات - لا حزمة موحدة والمبالغ حسب المسار. من pre-seed إلى Series A.',
    stepsAr: [
      {
        title: 'انضم لشريك أو مسرّعة',
        description: 'المزايا تأتي عبر شركاء معتمدين يشملون رصيد OpenAI.',
      },
      {
        title: 'استلمها عبر برنامجك',
        description: 'استبدلها من لوحة المسرّعة/الشريك بدءاً من openai.com.',
        url: 'https://openai.com/',
      },
      {
        title: 'ابنِ بالـ API',
        description: 'استعمل الرصيد لنماذج GPT والتضمينات والتجارب.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o215',
    slug: 'mistral-ai-ambassador-credits',
    name: 'Mistral AI Ambassador Program',
    tagline: 'FREE API credits + early access for 6 months',
    description:
      'Mistral AI Ambassador Program: equity-free benefits with free API credits, early access to new features, and VIP recognition over a six-month program for AI builders. Pre-seed to Series A, global. Source: startup-perks.com/perks/mistral-ai-ambassador/.',
    url: 'https://mistral.ai/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mistral.ai&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'ai', 'mistral', 'api', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Startup building AI applications with Mistral models, interested in the ambassador program.',
      },
      {
        title: 'Apply on mistral.ai',
        description: 'Join the six-month Ambassador Program via the official Mistral site.',
        url: 'https://mistral.ai/',
      },
      {
        title: 'Get credits + early access',
        description: 'Free API credits, day-0 feature access, and VIP recognition - equity-free.',
      },
    ],
    nameAr: 'برنامج Mistral AI للسفراء',
    taglineAr: 'رصيد API مجاني + وصول مبكر لـ 6 أشهر',
    descriptionAr: 'يمنح برنامج سفراء Mistral AI مزايا دون أسهم: رصيد API مجاني ووصول مبكر للمزايا الجديدة وتكريم VIP على مدى 6 أشهر لبناة الذكاء الاصطناعي.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة تبني تطبيقات ذكاء اصطناعي بنماذج Mistral وترغب في برنامج السفراء.',
      },
      {
        title: 'قدّم في mistral.ai',
        description: 'انضم لبرنامج السفراء (6 أشهر) عبر موقع Mistral الرسمي.',
        url: 'https://mistral.ai/',
      },
      {
        title: 'استلم الرصيد والوصول المبكر',
        description: 'رصيد API مجاني ووصول مبكر وتكريم VIP دون أسهم.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o216',
    slug: 'vast-ai-startup-gpu-credits',
    name: 'Vast.ai Startup Program',
    tagline: '$2,500 FREE GPU credits for AI startups',
    description:
      'Vast.ai offers $2,500 in free GPU credits for startups moving AI workloads to its distributed infrastructure - flexible pricing for training and inference. Pre-seed to Series A, global. Source: startup-perks.com/perks/vast-ai-startup/.',
    url: 'https://vast.ai/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=vast.ai&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'gpu', 'ai', 'infrastructure', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'AI startup ready to move GPU workloads to Vast.ai (pre-seed to Series A).',
      },
      {
        title: 'Apply on vast.ai',
        description: 'Request the startup program via the official Vast.ai site.',
        url: 'https://vast.ai/',
      },
      {
        title: 'Get $2,500 GPU credits',
        description: 'Run training and inference on distributed GPUs with competitive pricing.',
      },
    ],
    nameAr: 'Vast.ai للشركات الناشئة',
    taglineAr: '2,500$ رصيد GPU مجاني لشركات الذكاء الاصطناعي',
    descriptionAr: 'تمنح Vast.ai الشركات الناشئة 2,500$ رصيد GPU مجاني لنقل أعباء الذكاء الاصطناعي إلى بنيتها الموزعة - أسعار مرنة للتدريب والاستدلال.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة ذكاء اصطناعي مستعدة لنقل أعباء GPU إلى Vast.ai.',
      },
      {
        title: 'قدّم في vast.ai',
        description: 'اطلب برنامج الشركات الناشئة عبر الموقع الرسمي.',
        url: 'https://vast.ai/',
      },
      {
        title: 'استلم 2,500$ رصيد GPU',
        description: 'شغّل التدريب والاستدلال على GPUs موزعة بأسعار منافسة.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o217',
    slug: 'mux-startups-video-credits',
    name: 'Mux for Startups',
    tagline: '$500 FREE video credits (more via accelerators)',
    description:
      'Mux for Startups: $500 in free video credits to build on-demand and live video into any site or app in minutes - more available via YC, a16z, Techstars. Pre-seed to Series A, global. Source: startup-perks.com/perks/mux-startup/.',
    url: 'https://mux.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mux.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'video', '500', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early-stage startup building video features (pre-seed to Series A).',
      },
      {
        title: 'Apply on mux.com/startups',
        description: 'Claim the $500 credit via the official Mux for Startups page.',
        url: 'https://mux.com/startups',
      },
      {
        title: 'Get $500 + ask for more',
        description: 'Start with $500; larger amounts available through YC, a16z, Techstars and other VCs.',
      },
    ],
    nameAr: 'Mux للشركات الناشئة',
    taglineAr: '500$ رصيد فيديو مجاني (أكثر عبر المسرّعات)',
    descriptionAr: 'يمنح Mux الشركات الناشئة 500$ رصيد فيديو مجاني لبناء الفيديو عند الطلب والمباشر في أي موقع أو تطبيق خلال دقائق - ومبالغ أكبر عبر YC وa16z وTechstars.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تبني مزايا فيديو.',
      },
      {
        title: 'قدّم في mux.com/startups',
        description: 'اطلب رصيد 500$ عبر الصفحة الرسمية.',
        url: 'https://mux.com/startups',
      },
      {
        title: 'استلم 500$ واطلب المزيد',
        description: 'ابدأ بـ 500$ ومبالغ أكبر عبر YC وa16z وTechstars.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o218',
    slug: 'kong-startup-api-credits',
    name: 'Kong Konnect Startup Program',
    tagline: '$500 FREE API management credits',
    description:
      'Kong Konnect Startup Program: $500 in credits for the unified SaaS API management platform - manage APIs securely across any cloud, team, gateway, protocol. Early API startups, global. Source: startup-perks.com/perks/kong-startup/.',
    url: 'https://konghq.com/pricing',
    logoUrl: 'https://www.google.com/s2/favicons?domain=konghq.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'api', '500', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early-stage startup building APIs or API products (pre-seed to Series A).',
      },
      {
        title: 'Claim on the official page',
        description: 'Get the $500 credit via konghq.com/pricing startup route.',
        url: 'https://konghq.com/pricing',
      },
      {
        title: 'Manage APIs on Konnect',
        description: 'Run gateways, security, and analytics for your APIs across clouds.',
      },
    ],
    nameAr: 'Kong للشركات الناشئة',
    taglineAr: '500$ رصيد مجاني لإدارة الـ APIs',
    descriptionAr: 'يمنح برنامج Kong Konnect الشركات الناشئة 500$ رصيد لمنصة إدارة APIs الموحدة - أدر APIs بأمان عبر أي سحابة وبوابة وبروتوكول.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تبني APIs أو منتجات API.',
      },
      {
        title: 'اطلبها في الصفحة الرسمية',
        description: 'احصل على رصيد 500$ عبر صفحة أسعار Kong.',
        url: 'https://konghq.com/pricing',
      },
      {
        title: 'أدر APIs في Konnect',
        description: 'شغّل البوابات والأمن والتحليلات عبر السحابات.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o219',
    slug: '0x-jumpstart-web3-credits',
    name: '0x JumpStart Program',
    tagline: '$5,000 FREE API credits for Web3 startups + mentorship',
    description:
      '0x JumpStart provides $5,000 in API credits for Web3 startups building DeFi apps on the 0x protocol, plus mentorship and ecosystem support. Pre-seed to Series A, global. Source: startup-perks.com/perks/0x-jumpstart/.',
    url: 'https://0x.org',
    logoUrl: 'https://www.google.com/s2/favicons?domain=0x.org&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'web3', 'defi', '5000', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Web3 startup building on 0x protocol or DeFi applications (pre-seed to Series A).',
      },
      {
        title: 'Apply on 0x.org',
        description: 'Join JumpStart via the official 0x site.',
        url: 'https://0x.org',
      },
      {
        title: 'Get $5,000 + mentorship',
        description: 'API credits plus mentorship and ecosystem integration to embed DEX functionality.',
      },
    ],
    nameAr: 'برنامج 0x JumpStart',
    taglineAr: '5,000$ رصيد API مجاني لشركات Web3 + إرشاد',
    descriptionAr: 'يمنح 0x JumpStart شركات Web3 الناشئة 5,000$ رصيد API لبناء تطبيقات DeFi على بروتوكول 0x مع إرشاد ودعم المنظومة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة Web3 تبني على بروتوكول 0x أو تطبيقات DeFi.',
      },
      {
        title: 'قدّم في 0x.org',
        description: 'انضم لـ JumpStart عبر موقع 0x الرسمي.',
        url: 'https://0x.org',
      },
      {
        title: 'استلم 5,000$ والإرشاد',
        description: 'رصيد API + إرشاد ودمج في المنظومة لتضمين وظائف التداول.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o220',
    slug: 'brevo-startups-free-plan',
    name: 'Brevo for Startups',
    tagline: 'FREE forever plan - 2,500 contacts, 15k emails/mo',
    description:
      'Brevo free plan for startups: up to 2,500 subscribers and 15,000 emails per month with unlimited automation, templates, drag-and-drop builder - all-in-one email + SMS marketing. Global. Source: startup-perks.com/perks/brevo-startup/.',
    url: 'https://www.brevo.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=brevo.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'email', 'marketing', 'automation', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign up free',
        description: 'Create a Brevo account - the free plan is open to all startups, no application needed.',
        url: 'https://www.brevo.com/',
      },
      {
        title: 'Get 2,500 contacts + 15k emails/mo',
        description: 'Free forever with unlimited automation, customizable templates, drag-and-drop builder.',
      },
      {
        title: 'Grow to SMS + paid when ready',
        description: 'Add SMS and scale to paid plans only when your list outgrows free limits.',
      },
    ],
    nameAr: 'Brevo للشركات الناشئة',
    taglineAr: 'خطة مجانية للأبد - 2,500 جهة و15 ألف بريد شهرياً',
    descriptionAr: 'تمنح Brevo الشركات الناشئة خطة مجانية: حتى 2,500 مشترك و15,000 بريد شهرياً مع أتمتة غير محدودة وقوالب ومحرر سحب وإفلات - تسويق بريد + SMS شامل.',
    stepsAr: [
      {
        title: 'سجّل مجاناً',
        description: 'أنشئ حساب Brevo - الخطة المجانية مفتوحة للجميع دون طلب.',
        url: 'https://www.brevo.com/',
      },
      {
        title: 'استلم 2,500 جهة و15 ألف بريد',
        description: 'مجاني للأبد مع أتمتة غير محدودة وقوالب ومحرر مرئي.',
      },
      {
        title: 'وسّع لـ SMS والمدفوع لاحقاً',
        description: 'أضف SMS وانتقل للمدفوع فقط عندما تتجاوز الحدود المجانية.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o221',
    slug: 'vercel-startups-200k-credits',
    name: 'Vercel for Startups',
    tagline: 'Up to $200,000 platform credits via partners',
    description:
      'Vercel for Startups provides startup-focused platform credits (up to $200k program-dependent) and support through partner ecosystems. Pre-seed to Series A, global. Source: startup-perks.com/perks/vercel-for-startups/.',
    url: 'https://vercel.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=vercel.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '200k', 'cloud', 'hosting', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Join a partner ecosystem',
        description: 'Credits flow via approved partners/accelerators - join one that includes Vercel.',
      },
      {
        title: 'Claim on vercel.com/startups',
        description: 'Redeem through your partner route on the official page.',
        url: 'https://vercel.com/startups',
      },
      {
        title: 'Deploy with credits',
        description: 'Use credits for hosting, previews, analytics, and support.',
      },
    ],
    nameAr: 'Vercel للشركات الناشئة',
    taglineAr: 'حتى 200,000$ رصيد منصة عبر الشركاء',
    descriptionAr: 'تمنح Vercel الشركات الناشئة رصيد منصة (حتى 200 ألف $ حسب البرنامج) ودعماً عبر منظومات الشركاء. من pre-seed إلى Series A.',
    stepsAr: [
      {
        title: 'انضم لمنظومة شريك',
        description: 'الرصيد يمر عبر شركاء/مسرّعات معتمدة تشمل Vercel.',
      },
      {
        title: 'اطلبه في vercel.com/startups',
        description: 'استبدله عبر مسار شريكك في الصفحة الرسمية.',
        url: 'https://vercel.com/startups',
      },
      {
        title: 'أطلق بالرصيد',
        description: 'استعمل الرصيد للاستضافة والمعاينات والتحليلات والدعم.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o222',
    slug: 'microsoft-founders-hub-150k',
    name: 'Microsoft for Startups Founders Hub',
    tagline: 'Up to $150,000 Azure credits - open to all stages',
    description:
      'Microsoft Founders Hub includes up to $150k Azure credits plus startup enablement across growth stages - open from bootstrapped to Series A, no funding required to join. Global. Source: startup-perks.com/perks/microsoft-founders-hub/.',
    url: 'https://portal.startups.microsoft.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '150k', 'azure', 'cloud', 'ai', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Join Founders Hub free',
        description: 'Open to bootstrapped startups too - sign up with your company details, no funding needed.',
        url: 'https://portal.startups.microsoft.com/',
      },
      {
        title: 'Unlock Azure credits',
        description: 'Credits grow with milestones up to $150k, plus GitHub, M365, and expert guidance.',
      },
      {
        title: 'Build on Azure + AI',
        description: 'Use credits for compute, OpenAI Service, databases, and dev tools.',
      },
    ],
    nameAr: 'Microsoft Founders Hub',
    taglineAr: 'حتى 150,000$ رصيد Azure - مفتوح لكل المراحل',
    descriptionAr: 'يشمل Founders Hub حتى 150 ألف $ رصيد Azure وتمكيناً عبر مراحل النمو - مفتوح حتى للممولة ذاتياً دون تمويل. عالمي.',
    stepsAr: [
      {
        title: 'انضم مجاناً',
        description: 'مفتوح للشركات ذاتية التمويل - سجّل ببيانات شركتك دون تمويل.',
        url: 'https://portal.startups.microsoft.com/',
      },
      {
        title: 'افتح رصيد Azure',
        description: 'رصيد ينمو مع الإنجازات حتى 150 ألف $ مع GitHub وM365 وإرشاد.',
      },
      {
        title: 'ابنِ على Azure والذكاء الاصطناعي',
        description: 'استعمل الرصيد للحوسبة وخدمة OpenAI والقواعد والأدوات.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o223',
    slug: 'aws-activate-100k-credits',
    name: 'AWS Activate',
    tagline: 'Up to $100,000 credits + support & training',
    description:
      'AWS Activate provides up to $100k startup credits plus technical support resources and training for early teams on AWS. Bootstrapped to Series A, global. Source: startup-perks.com/perks/aws-activate/.',
    url: 'https://aws.amazon.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '100k', 'aws', 'cloud', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Pick your Activate path',
        description: 'Founders (bootstrapped, self-apply) or Portfolio (via VC/accelerator partner) - up to $100k.',
      },
      {
        title: 'Apply on aws.amazon.com/startups',
        description: 'Submit company, funding, and AWS account details on the official page.',
        url: 'https://aws.amazon.com/startups',
      },
      {
        title: 'Get credits + training',
        description: 'Credits plus technical support, architecture guidance, and training resources.',
      },
    ],
    nameAr: 'AWS Activate',
    taglineAr: 'حتى 100,000$ رصيد + دعم وتدريب',
    descriptionAr: 'يمنح AWS Activate حتى 100 ألف $ رصيد مع دعم تقني وتدريب للفرق المبكرة على AWS. من التمويل الذاتي إلى Series A.',
    stepsAr: [
      {
        title: 'اختر مسارك',
        description: 'Founders (ذاتي) أو Portfolio (عبر شريك) - حتى 100 ألف $.',
      },
      {
        title: 'قدّم في aws.amazon.com/startups',
        description: 'أرسل بيانات الشركة والتمويل وحساب AWS في الصفحة الرسمية.',
        url: 'https://aws.amazon.com/startups',
      },
      {
        title: 'استلم الرصيد والتدريب',
        description: 'رصيد + دعم تقني وإرشاد معماري وموارد تدريب.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o224',
    slug: 'datadog-startups-100k-credits',
    name: 'Datadog for Startups',
    tagline: 'Up to $100,000 credits for monitoring & incidents',
    description:
      'Datadog startup offers can include up to $100k usage credits plus onboarding support for monitoring and incident workflows. Pre-seed to Series B, global. Source: startup-perks.com/perks/datadog-for-startups/.',
    url: 'https://www.datadoghq.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=datadoghq.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '100k', 'monitoring', 'observability', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early-stage startup (pre-seed to Series B) needing monitoring/incident tooling.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request startup credits through Datadog startup channels.',
        url: 'https://www.datadoghq.com/',
      },
      {
        title: 'Get credits + onboarding',
        description: 'Usage credits plus onboarding help for dashboards, APM, and incidents.',
      },
    ],
    nameAr: 'Datadog للشركات الناشئة',
    taglineAr: 'حتى 100,000$ رصيد للمراقبة والحوادث',
    descriptionAr: 'تمنح Datadog الشركات الناشئة حتى 100 ألف $ رصيد استخدام مع دعم تأهيل لسير المراقبة والحوادث. من pre-seed إلى Series B.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تحتاج أدوات المراقبة والحوادث.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Datadog للشركات الناشئة.',
        url: 'https://www.datadoghq.com/',
      },
      {
        title: 'استلم الرصيد والتأهيل',
        description: 'رصيد استخدام + مساعدة تأهيل للوحات وAPM والحوادث.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o225',
    slug: 'google-cloud-startup-100k',
    name: 'Google for Startups Cloud',
    tagline: 'Up to $100,000 credits + technical guidance',
    description:
      'Google for Startups Cloud Program offers up to $100k credits plus technical guidance for building and scaling on Google Cloud. Bootstrapped to Series A, global. Source: startup-perks.com/perks/google-for-startups-cloud/.',
    url: 'https://cloud.google.com/startup',
    logoUrl: 'https://www.google.com/s2/favicons?domain=cloud.google.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '100k', 'gcp', 'cloud', 'ai', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Bootstrapped to Series A startup building on cloud (AI startups get dedicated tracks).',
      },
      {
        title: 'Apply on cloud.google.com/startup',
        description: 'Submit your startup on the official Google Cloud for Startups page.',
        url: 'https://cloud.google.com/startup',
      },
      {
        title: 'Get $100k + guidance',
        description: 'Credits for compute, AI, data plus engineers and go-to-market support.',
      },
    ],
    nameAr: 'Google للشركات الناشئة - سحابة',
    taglineAr: 'حتى 100,000$ رصيد + إرشاد تقني',
    descriptionAr: 'يمنح برنامج Google السحابي حتى 100 ألف $ رصيد مع إرشاد تقني للبناء والتوسع على Google Cloud. من التمويل الذاتي إلى Series A.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة من التمويل الذاتي إلى Series A تبني على السحابة.',
      },
      {
        title: 'قدّم في cloud.google.com/startup',
        description: 'أرسل شركتك في الصفحة الرسمية.',
        url: 'https://cloud.google.com/startup',
      },
      {
        title: 'استلم 100 ألف $ والإرشاد',
        description: 'رصيد للحوسبة والذكاء الاصطناعي والبيانات + دعم مهندسين.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o226',
    slug: 'retool-startups-60k-credits',
    name: 'Retool for Startups',
    tagline: 'Up to $60,000 credits for internal tools',
    description:
      'Retool startup offerings may include up to $60k credits or plan discounts for internal tool development. Pre-seed to Series A, global. Source: startup-perks.com/perks/retool-for-startups/.',
    url: 'https://retool.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=retool.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '60k', 'internal-tools', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early-stage startup (pre-seed to Series A) building internal tools.',
      },
      {
        title: 'Apply on retool.com/startups',
        description: 'Submit on the official Retool for Startups page.',
        url: 'https://retool.com/startups',
      },
      {
        title: 'Get credits/discounts',
        description: 'Use credits for apps, workflows, and database UIs for your team.',
      },
    ],
    nameAr: 'Retool للشركات الناشئة',
    taglineAr: 'حتى 60,000$ رصيد للأدوات الداخلية',
    descriptionAr: 'تمنح Retool الشركات الناشئة حتى 60 ألف $ رصيد أو خصومات لتطوير الأدوات الداخلية.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تبني أدوات داخلية.',
      },
      {
        title: 'قدّم في retool.com/startups',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://retool.com/startups',
      },
      {
        title: 'استلم الرصيد',
        description: 'استعمله للتطبيقات وسير العمل وواجهات القواعد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o227',
    slug: 'atlassian-startups-50k-credits',
    name: 'Atlassian for Startups',
    tagline: 'Up to $50,000 credits - Jira, Confluence & more',
    description:
      'Atlassian startup programs can offer up to $50k credits and discounts across Jira, Confluence and more. Pre-seed to Series A, global. Source: startup-perks.com/perks/atlassian-for-startups/.',
    url: 'https://www.atlassian.com/software/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=atlassian.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '50k', 'jira', 'collaboration', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early-stage startup (pre-seed to Series A) needing collaboration tooling.',
      },
      {
        title: 'Apply on the official page',
        description: 'Submit via atlassian.com startup route.',
        url: 'https://www.atlassian.com/software/startups',
      },
      {
        title: 'Get credits across products',
        description: 'Use for Jira, Confluence, Bitbucket, and more.',
      },
    ],
    nameAr: 'Atlassian للشركات الناشئة',
    taglineAr: 'حتى 50,000$ رصيد - Jira وConfluence وغيرها',
    descriptionAr: 'تمنح Atlassian الشركات الناشئة حتى 50 ألف $ رصيد وخصومات عبر Jira وConfluence وغيرها.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تحتاج أدوات التعاون.',
      },
      {
        title: 'قدّم في الصفحة الرسمية',
        description: 'أرسل طلبك عبر صفحة Atlassian للشركات.',
        url: 'https://www.atlassian.com/software/startups',
      },
      {
        title: 'استلم الرصيد',
        description: 'استعمله لـ Jira وConfluence وBitbucket وغيرها.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o228',
    slug: 'posthog-startups-50k-credits',
    name: 'PostHog for Startups',
    tagline: 'Up to $50,000 credits for product analytics',
    description:
      'PostHog startup programs can provide up to $50k usage credits and discounted access for early product teams. Pre-seed to Series A, global. Source: startup-perks.com/perks/posthog-for-startups/.',
    url: 'https://posthog.com/handbook/brand/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=posthog.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '50k', 'analytics', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early product team (pre-seed to Series A) needing analytics.',
      },
      {
        title: 'Apply on the official page',
        description: 'Submit via PostHog startups route.',
        url: 'https://posthog.com/handbook/brand/startups',
      },
      {
        title: 'Get credits + discounts',
        description: 'Use for events, flags, session replay, and experiments.',
      },
    ],
    nameAr: 'PostHog للشركات الناشئة',
    taglineAr: 'حتى 50,000$ رصيد لتحليلات المنتج',
    descriptionAr: 'تمنح PostHog فرق المنتجات المبكرة حتى 50 ألف $ رصيد استخدام ووصولاً مخفضاً.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق منتج مبكر يحتاج التحليلات.',
      },
      {
        title: 'قدّم في الصفحة الرسمية',
        description: 'أرسل طلبك عبر مسار PostHog للشركات.',
        url: 'https://posthog.com/handbook/brand/startups',
      },
      {
        title: 'استلم الرصيد',
        description: 'استعمله للأحداث والـ flags وإعادة الجلسات والتجارب.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o229',
    slug: 'sentry-startups-50k-credits',
    name: 'Sentry for Startups',
    tagline: 'Up to $50,000 credits for error tracking',
    description:
      'Sentry for Startups offers qualifying companies up to $50k in discounted or credited observability tooling for errors and performance. Pre-seed to Series A, global. Source: startup-perks.com/perks/sentry-for-startups/.',
    url: 'https://sentry.io/for/startups/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=sentry.io&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '50k', 'errors', 'monitoring', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Qualifying early-stage startup (pre-seed to Series A).',
      },
      {
        title: 'Apply on sentry.io/for/startups',
        description: 'Submit on the official Sentry for Startups page.',
        url: 'https://sentry.io/for/startups/',
      },
      {
        title: 'Get credited tooling',
        description: 'Track errors, performance, and replays with credits.',
      },
    ],
    nameAr: 'Sentry للشركات الناشئة',
    taglineAr: 'حتى 50,000$ رصيد لتتبع الأخطاء',
    descriptionAr: 'تمنح Sentry الشركات المؤهلة حتى 50 ألف $ أدوات مراقبة مخفضة أو مرصودة للأخطاء والأداء.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة مؤهلة.',
      },
      {
        title: 'قدّم في sentry.io/for/startups',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://sentry.io/for/startups/',
      },
      {
        title: 'استلم الأدوات المرصودة',
        description: 'تتبع الأخطاء والأداء والإعادة بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o230',
    slug: 'segment-startups-50k-credits',
    name: 'Twilio Segment for Startups',
    tagline: 'Up to $50,000 credits for customer data',
    description:
      'Twilio Segment startup initiatives may provide up to $50k credits for customer data and messaging infrastructure. Pre-seed to Series A, global. Source: startup-perks.com/perks/twilio-segment-for-startups/.',
    url: 'https://segment.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=segment.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '50k', 'data', 'marketing', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early-stage startup (pre-seed to Series A) needing CDP/messaging infra.',
      },
      {
        title: 'Apply via startup channel',
        description: 'Request credits through Segment startup initiatives.',
        url: 'https://segment.com/',
      },
      {
        title: 'Get data credits',
        description: 'Unify customer data and messaging with credits.',
      },
    ],
    nameAr: 'Segment للشركات الناشئة',
    taglineAr: 'حتى 50,000$ رصيد لبيانات العملاء',
    descriptionAr: 'تمنح مبادرات Segment حتى 50 ألف $ رصيد لبيانات العملاء وبنية المراسلة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تحتاج بيانات العملاء والمراسلة.',
      },
      {
        title: 'قدّم عبر قناة الشركات',
        description: 'اطلب الرصيد عبر مبادرات Segment.',
        url: 'https://segment.com/',
      },
      {
        title: 'استلم رصيد البيانات',
        description: 'وحّد بيانات العملاء والمراسلة بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o231',
    slug: 'supabase-startups-25k-credits',
    name: 'Supabase for Startups',
    tagline: 'Up to $25,000 credits + onboarding for Postgres backend',
    description:
      'Supabase startup programs may include up to $25k credits and onboarding benefits for early teams building on Postgres (auth, storage, realtime). Pre-seed to Series A, global. Source: startup-perks.com/perks/supabase-for-startups/.',
    url: 'https://supabase.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=supabase.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '25k', 'postgres', 'backend', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early team (pre-seed to Series A) building on Postgres backend.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request startup support on supabase.com startup channels.',
        url: 'https://supabase.com/',
      },
      {
        title: 'Get credits + onboarding',
        description: 'Credits for database, auth, storage, plus onboarding help.',
      },
    ],
    nameAr: 'Supabase للشركات الناشئة',
    taglineAr: 'حتى 25,000$ رصيد + تأهيل لخلفية Postgres',
    descriptionAr: 'تمنح Supabase الفرق المبكرة حتى 25 ألف $ رصيد ومزايا تأهيل للبناء على Postgres (مصادقة وتخزين ولحظي).',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق مبكر يبني على خلفية Postgres.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الدعم عبر قنوات Supabase.',
        url: 'https://supabase.com/',
      },
      {
        title: 'استلم الرصيد والتأهيل',
        description: 'رصيد للقاعدة والمصادقة والتخزين + مساعدة تأهيل.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o232',
    slug: 'digitalocean-hatch-5k-credits',
    name: 'DigitalOcean Hatch',
    tagline: 'Up to $5,000 credits to launch & scale',
    description:
      'DigitalOcean Hatch supports startups with up to $5k cloud credits and technical resources to launch and scale. Bootstrapped to seed, global. Source: startup-perks.com/perks/digitalocean-hatch/.',
    url: 'https://www.digitalocean.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=digitalocean.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '5k', 'cloud', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Bootstrapped to seed startup launching on cloud.',
      },
      {
        title: 'Apply on digitalocean.com/startups',
        description: 'Join Hatch with your company details.',
        url: 'https://www.digitalocean.com/startups',
      },
      {
        title: 'Get $5k + resources',
        description: 'Credits plus technical resources to launch and scale.',
      },
    ],
    nameAr: 'DigitalOcean Hatch',
    taglineAr: 'حتى 5,000$ رصيد للإطلاق والتوسع',
    descriptionAr: 'تدعم Hatch الشركات الناشئة حتى 5 آلاف $ رصيد سحابي وموارد تقنية للإطلاق والتوسع. من التمويل الذاتي إلى seed.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة من التمويل الذاتي إلى seed تطلق على السحابة.',
      },
      {
        title: 'قدّم في digitalocean.com/startups',
        description: 'انضم لـ Hatch ببيانات شركتك.',
        url: 'https://www.digitalocean.com/startups',
      },
      {
        title: 'استلم 5 آلاف $ والموارد',
        description: 'رصيد + موارد تقنية للإطلاق والتوسع.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o233',
    slug: 'mongodb-startups-3k-credits',
    name: 'MongoDB for Startups',
    tagline: 'Up to $3,000 Atlas credits + tech support',
    description:
      'MongoDB startup initiatives may provide up to $3k Atlas credits and technical support for early teams. Pre-seed to Series A, global. Source: startup-perks.com/perks/mongodb-for-startups/.',
    url: 'https://www.mongodb.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mongodb.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '3k', 'database', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early team (pre-seed to Series A) building on MongoDB Atlas.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through MongoDB startup channels.',
        url: 'https://www.mongodb.com/',
      },
      {
        title: 'Get credits + support',
        description: 'Atlas credits plus technical guidance for your data layer.',
      },
    ],
    nameAr: 'MongoDB للشركات الناشئة',
    taglineAr: 'حتى 3,000$ رصيد Atlas + دعم تقني',
    descriptionAr: 'تمنح MongoDB الفرق المبكرة حتى 3 آلاف $ رصيد Atlas ودعماً تقنياً.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق مبكر يبني على MongoDB Atlas.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات MongoDB.',
        url: 'https://www.mongodb.com/',
      },
      {
        title: 'استلم الرصيد والدعم',
        description: 'رصيد Atlas + إرشاد تقني لطبقة البيانات.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o234',
    slug: 'neon-startups-postgres-credits',
    name: 'Neon for Startups',
    tagline: 'Postgres credits + support for app teams',
    description:
      'Neon startup initiatives can offer Postgres credits and support for early application teams building on serverless Postgres. Pre-seed to Series A, global. Source: startup-perks.com/perks/neon-for-startups/.',
    url: 'https://neon.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=neon.tech&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'postgres', 'database', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early app team (pre-seed to Series A) on Postgres.',
      },
      {
        title: 'Apply on neon.com/startups',
        description: 'Submit via the official Neon for Startups page.',
        url: 'https://neon.com/startups',
      },
      {
        title: 'Get Postgres credits',
        description: 'Credits plus support for branching, scaling serverless Postgres.',
      },
    ],
    nameAr: 'Neon للشركات الناشئة',
    taglineAr: 'رصيد Postgres + دعم لفرق التطبيقات',
    descriptionAr: 'تمنح Neon فرق التطبيقات المبكرة رصيد Postgres ودعماً للبناء على Postgres عديم الخوادم.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق تطبيق مبكر على Postgres.',
      },
      {
        title: 'قدّم في neon.com/startups',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://neon.com/startups',
      },
      {
        title: 'استلم رصيد Postgres',
        description: 'رصيد + دعم للتفرع والتوسع.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o235',
    slug: 'planetscale-startups-db-credits',
    name: 'PlanetScale for Startups',
    tagline: 'Database credits for production MySQL workloads',
    description:
      'PlanetScale startup offerings can include credits and support for production database workloads on serverless MySQL. Pre-seed to Series A, global. Source: startup-perks.com/perks/planetscale-for-startups/.',
    url: 'https://planetscale.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=planetscale.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'mysql', 'database', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early team (pre-seed to Series A) running MySQL workloads.',
      },
      {
        title: 'Apply on planetscale.com/startups',
        description: 'Submit via the official page.',
        url: 'https://planetscale.com/startups',
      },
      {
        title: 'Get DB credits',
        description: 'Credits plus support for branching and scaling production DBs.',
      },
    ],
    nameAr: 'PlanetScale للشركات الناشئة',
    taglineAr: 'رصيد قواعد بيانات لأعباء MySQL الإنتاجية',
    descriptionAr: 'تمنح PlanetScale رصيداً ودعماً لأعباء قواعد البيانات الإنتاجية على MySQL عديم الخوادم.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق مبكر يشغّل أعباء MySQL.',
      },
      {
        title: 'قدّم في planetscale.com/startups',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://planetscale.com/startups',
      },
      {
        title: 'استلم رصيد القواعد',
        description: 'رصيد + دعم للتفرع وتوسيع القواعد الإنتاجية.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o236',
    slug: 'pinecone-startups-vector-credits',
    name: 'Pinecone for Startups',
    tagline: 'Vector database credits + onboarding for AI apps',
    description:
      'Pinecone startup initiatives can include credits and onboarding for vector database workloads powering AI search and RAG. Pre-seed to Series A, global. Source: startup-perks.com/perks/pinecone-for-startups/.',
    url: 'https://www.pinecone.io/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=pinecone.io&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'vector-db', 'ai', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early AI team (pre-seed to Series A) needing vector search.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Pinecone startup channels.',
        url: 'https://www.pinecone.io/',
      },
      {
        title: 'Get vector credits',
        description: 'Credits plus onboarding for indexes, namespaces, and RAG.',
      },
    ],
    nameAr: 'Pinecone للشركات الناشئة',
    taglineAr: 'رصيد قواعد متجهة + تأهيل لتطبيقات الذكاء الاصطناعي',
    descriptionAr: 'تمنح Pinecone رصيداً وتأهيلاً لأعباء قواعد البيانات المتجهة التي تشغّل البحث وRAG.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق ذكاء اصطناعي مبكر يحتاج البحث المتجه.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Pinecone.',
        url: 'https://www.pinecone.io/',
      },
      {
        title: 'استلم رصيد المتجهات',
        description: 'رصيد + تأهيل للفهارس وRAG.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o237',
    slug: 'clickhouse-startup-cloud-credits',
    name: 'ClickHouse for Startups',
    tagline: 'Cloud credits for fast analytical databases',
    description:
      'ClickHouse Cloud Startup Program offers credits for the column-oriented analytics database - build fast analytical reports at scale. Pre-seed to Series A, global. Source: startup-perks.com/perks/clickhouse-startup/.',
    url: 'https://clickhouse.com/cloud',
    logoUrl: 'https://www.google.com/s2/favicons?domain=clickhouse.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'analytics', 'database', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early team (pre-seed to Series A) needing analytics DB.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits on ClickHouse Cloud startup channels.',
        url: 'https://clickhouse.com/cloud',
      },
      {
        title: 'Get analytics credits',
        description: 'Run fast OLAP queries and reports with credits.',
      },
    ],
    nameAr: 'ClickHouse للشركات الناشئة',
    taglineAr: 'رصيد سحابي لقواعد تحليلية سريعة',
    descriptionAr: 'يمنح برنامج ClickHouse السحابي رصيداً لقاعدة البيانات التحليلية العمودية - تقارير سريعة بتوسع.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق مبكر يحتاج قاعدة تحليلية.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات ClickHouse السحابية.',
        url: 'https://clickhouse.com/cloud',
      },
      {
        title: 'استلم رصيد التحليلات',
        description: 'شغّل استعلامات OLAP وتقارير سريعة بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o238',
    slug: 'timescale-startups-credits',
    name: 'Timescale for Startups',
    tagline: 'Credits for PostgreSQL time-series on Timescale Cloud',
    description:
      'Timescale startup offerings can include credits for PostgreSQL time-series and analytics workloads on Timescale Cloud. Pre-seed to Series A, global. Source: startup-perks.com/perks/timescale-startup/.',
    url: 'https://www.timescale.com/cloud/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=timescale.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'postgres', 'timeseries', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early team (pre-seed to Series A) with time-series workloads.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Timescale startup channels.',
        url: 'https://www.timescale.com/cloud/',
      },
      {
        title: 'Get time-series credits',
        description: 'Hypertables, compression, and analytics with credits.',
      },
    ],
    nameAr: 'Timescale للشركات الناشئة',
    taglineAr: 'رصيد لسلاسل PostgreSQL الزمنية على السحابة',
    descriptionAr: 'تمنح Timescale رصيداً لأعباء السلاسل الزمنية والتحليلات على Timescale Cloud.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق مبكر بأعباء سلاسل زمنية.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Timescale.',
        url: 'https://www.timescale.com/cloud/',
      },
      {
        title: 'استلم رصيد السلاسل',
        description: 'جداول Hypertables وضغط وتحليلات بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o239',
    slug: 'singlestore-startups-credits',
    name: 'SingleStore for Startups',
    tagline: 'Credits for real-time distributed SQL',
    description:
      'SingleStore startup offerings can include credits for the high-performance distributed SQL database with real-time analytics. Pre-seed to Series A, global. Source: startup-perks.com/perks/singlestore-startup/.',
    url: 'https://www.singlestore.com/pricing/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=singlestore.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'sql', 'realtime', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early team (pre-seed to Series A) needing real-time SQL.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through SingleStore startup channels.',
        url: 'https://www.singlestore.com/pricing/',
      },
      {
        title: 'Get real-time credits',
        description: 'Transactions + analytics in one engine with credits.',
      },
    ],
    nameAr: 'SingleStore للشركات الناشئة',
    taglineAr: 'رصيد لـ SQL الموزعة اللحظية',
    descriptionAr: 'تمنح SingleStore رصيداً لقاعدة SQL الموزعة عالية الأداء مع تحليلات لحظية.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق مبكر يحتاج SQL لحظياً.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات SingleStore.',
        url: 'https://www.singlestore.com/pricing/',
      },
      {
        title: 'استلم الرصيد اللحظي',
        description: 'معاملات + تحليلات بمحرك واحد بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o240',
    slug: 'snowflake-startups-data-cloud',
    name: 'Snowflake for Startups',
    tagline: 'Data cloud credits for AI-ready startups',
    description:
      'Snowflake for Startups offers credits for the enterprise-grade data cloud - power AI apps with scalable data infrastructure. Pre-seed to Series B, global. Source: startup-perks.com/perks/snowflake-startup/.',
    url: 'https://www.snowflake.com/en/why-snowflake/startup-program/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=snowflake.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'data', 'ai', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early data/AI startup (pre-seed to Series B).',
      },
      {
        title: 'Apply on the official page',
        description: 'Submit via Snowflake startup program page.',
        url: 'https://www.snowflake.com/en/why-snowflake/startup-program/',
      },
      {
        title: 'Get data cloud credits',
        description: 'Warehouses, sharing, and AI features with credits.',
      },
    ],
    nameAr: 'Snowflake للشركات الناشئة',
    taglineAr: 'رصيد سحابة البيانات لشركات الذكاء الاصطناعي',
    descriptionAr: 'تمنح Snowflake رصيداً لسحابة البيانات المؤسسية - شغّل تطبيقات الذكاء الاصطناعي ببنية قابلة للتوسع.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة بيانات/ذكاء اصطناعي مبكرة.',
      },
      {
        title: 'قدّم في الصفحة الرسمية',
        description: 'أرسل طلبك في صفحة Snowflake للشركات.',
        url: 'https://www.snowflake.com/en/why-snowflake/startup-program/',
      },
      {
        title: 'استلم رصيد البيانات',
        description: 'مستودعات ومشاركة ومزايا ذكاء اصطناعي بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o241',
    slug: 'replicate-startup-ml-credits',
    name: 'Replicate for Startups',
    tagline: 'Credits to run open-source ML models at scale',
    description:
      'Replicate startup offerings can include credits for running and scaling open-source ML models with easy deploy APIs. Pre-seed to Series A, global. Source: startup-perks.com/perks/replicate-startup/.',
    url: 'https://replicate.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=replicate.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'ai', 'ml', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early AI team (pre-seed to Series A) deploying open models.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Replicate startup channels.',
        url: 'https://replicate.com/',
      },
      {
        title: 'Get ML credits',
        description: 'Run predictions and fine-tunes on thousands of models.',
      },
    ],
    nameAr: 'Replicate للشركات الناشئة',
    taglineAr: 'رصيد لتشغيل نماذج ML الحرة بتوسع',
    descriptionAr: 'تمنح Replicate رصيداً لتشغيل نماذج تعلم الآلة الحرة وتوسيعها عبر APIs سهلة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق ذكاء اصطناعي مبكر ينشر نماذج حرة.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Replicate.',
        url: 'https://replicate.com/',
      },
      {
        title: 'استلم رصيد ML',
        description: 'شغّل التنبؤات والضبط على آلاف النماذج.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o242',
    slug: 'together-ai-startup-gpu-credits',
    name: 'Together AI for Startups',
    tagline: 'GPU inference credits on open models via unified API',
    description:
      'Together AI startup offerings can include GPU inference credits - fast, affordable inference on open-source models with a unified API. Pre-seed to Series A, global. Source: startup-perks.com/perks/together-ai-startup/.',
    url: 'https://together.ai/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=together.ai&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'gpu', 'ai', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early AI startup (pre-seed to Series A) needing inference.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Together AI startup channels.',
        url: 'https://together.ai/',
      },
      {
        title: 'Get inference credits',
        description: 'Serve 200+ open models through one OpenAI-compatible API.',
      },
    ],
    nameAr: 'Together AI للشركات الناشئة',
    taglineAr: 'رصيد استدلال GPU على النماذج الحرة عبر API موحد',
    descriptionAr: 'تمنح Together AI رصيد استدلال GPU - سريع وبأسعار مناسبة على النماذج الحرة عبر API موحد.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة ذكاء اصطناعي مبكرة تحتاج الاستدلال.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Together AI.',
        url: 'https://together.ai/',
      },
      {
        title: 'استلم رصيد الاستدلال',
        description: 'اخدم +200 نموذج حر عبر API واحد متوافق.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o243',
    slug: 'braintrust-startups-eval-credits',
    name: 'Braintrust for Startups',
    tagline: 'Credits for AI evals - test agents & LLM apps',
    description:
      'Braintrust startup offerings can include credits for the AI evaluation platform - build, test, evaluate agents and LLM apps. Pre-seed to Series A, global. Source: startup-perks.com/perks/braintrust-startup/.',
    url: 'https://braintrustdata.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=braintrustdata.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'ai', 'evals', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early AI team (pre-seed to Series A) shipping LLM features.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Braintrust startup channels.',
        url: 'https://braintrustdata.com/',
      },
      {
        title: 'Get eval credits',
        description: 'Datasets, evals, and observability for prompts and agents.',
      },
    ],
    nameAr: 'Braintrust للشركات الناشئة',
    taglineAr: 'رصيد لتقييم الذكاء الاصطناعي - اختبر الوكلاء والتطبيقات',
    descriptionAr: 'تمنح Braintrust رصيداً لمنصة تقييم الذكاء الاصطناعي - ابنِ واختبر وقيّم الوكلاء وتطبيقات LLM.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق ذكاء اصطناعي مبكر يطلق مزايا LLM.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Braintrust.',
        url: 'https://braintrustdata.com/',
      },
      {
        title: 'استلم رصيد التقييم',
        description: 'مجموعات بيانات وتقييمات ومراقبة للوكلاء.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o244',
    slug: 'browserbase-startups-credits',
    name: 'Browserbase for Startups',
    tagline: 'Credits for browser automation for AI apps',
    description:
      'Browserbase startup offerings can include credits for browser automation infrastructure - scalable browsers for scraping, testing, AI agents. Pre-seed to Series A, global. Source: startup-perks.com/perks/browserbase-startup/.',
    url: 'https://browserbase.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=browserbase.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'browser', 'agents', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early team (pre-seed to Series A) needing headless browsers.',
      },
      {
        title: 'Apply on browserbase.com/startups',
        description: 'Submit via the official page.',
        url: 'https://browserbase.com/startups',
      },
      {
        title: 'Get automation credits',
        description: 'Stealth browsers for scraping, tests, and web agents.',
      },
    ],
    nameAr: 'Browserbase للشركات الناشئة',
    taglineAr: 'رصيد لأتمتة المتصفح لتطبيقات الذكاء الاصطناعي',
    descriptionAr: 'تمنح Browserbase رصيداً لبنية أتمتة المتصفح - متصفحات قابلة للتوسع للكشط والاختبار والوكلاء.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق مبكر يحتاج متصفحات headless.',
      },
      {
        title: 'قدّم في browserbase.com/startups',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://browserbase.com/startups',
      },
      {
        title: 'استلم رصيد الأتمتة',
        description: 'متصفحات خفية للكشط والاختبارات والوكلاء.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o245',
    slug: 'deepinfra-deepstart-credits',
    name: 'DeepInfra DeepStart',
    tagline: 'Inference credits for fast open-model serving',
    description:
      'DeepInfra DeepStart offers inference credits for startups - fast inference on open-source models with flexible deployment. Pre-seed to Series A, global. Source: startup-perks.com/perks/deepinfra-startup/.',
    url: 'https://deepinfra.com/deepstart',
    logoUrl: 'https://www.google.com/s2/favicons?domain=deepinfra.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'ai', 'inference', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early AI startup (pre-seed to Series A) serving open models.',
      },
      {
        title: 'Apply on deepinfra.com/deepstart',
        description: 'Join DeepStart via the official page.',
        url: 'https://deepinfra.com/deepstart',
      },
      {
        title: 'Get inference credits',
        description: 'Cheap, fast GPUs for 100+ open LLMs and embeddings.',
      },
    ],
    nameAr: 'DeepInfra DeepStart',
    taglineAr: 'رصيد استدلال لخدمة النماذج الحرة بسرعة',
    descriptionAr: 'يمنح DeepStart رصيد استدلال للشركات الناشئة - سريع على النماذج الحرة مع نشر مرن.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة ذكاء اصطناعي مبكرة تخدم نماذج حرة.',
      },
      {
        title: 'قدّم في deepinfra.com/deepstart',
        description: 'انضم لـ DeepStart عبر الصفحة الرسمية.',
        url: 'https://deepinfra.com/deepstart',
      },
      {
        title: 'استلم رصيد الاستدلال',
        description: 'GPUs رخيصة وسريعة لـ +100 نموذج حر.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o246',
    slug: 'fireworks-ai-startups-credits',
    name: 'Fireworks AI for Startups',
    tagline: 'Fast inference credits with day-0 model access',
    description:
      'Fireworks AI startup offerings can include fast inference credits for generative AI with day-0 access to new models. Pre-seed to Series B, global. Source: startup-perks.com/perks/fireworks-ai-startup/.',
    url: 'https://fireworks.ai/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=fireworks.ai&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'ai', 'inference', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early AI startup (pre-seed to Series B) building genAI.',
      },
      {
        title: 'Apply on fireworks.ai/startups',
        description: 'Submit via the official page.',
        url: 'https://fireworks.ai/startups',
      },
      {
        title: 'Get fast inference credits',
        description: 'Fastest inference with day-0 models, function calling, LoRAs.',
      },
    ],
    nameAr: 'Fireworks AI للشركات الناشئة',
    taglineAr: 'رصيد استدلال سريع مع نماذج من اليوم الأول',
    descriptionAr: 'تمنح Fireworks رصيد استدلال سريع للذكاء التوليدي مع وصول للنماذج من يوم إصدارها.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة ذكاء اصطناعي مبكرة تبني توليدياً.',
      },
      {
        title: 'قدّم في fireworks.ai/startups',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://fireworks.ai/startups',
      },
      {
        title: 'استلم رصيد الاستدلال السريع',
        description: 'أسرع استدلال مع نماذج اليوم الأول.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o247',
    slug: 'cohere-startups-llm-credits',
    name: 'Cohere for Startups',
    tagline: 'Enterprise LLM credits - secure, private models',
    description:
      'Cohere startup offerings can include credits for enterprise AI language models - secure, private LLMs for RAG, chat, and embeddings. Pre-seed to Series A, global. Source: startup-perks.com/perks/cohere-startup/.',
    url: 'https://cohere.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=cohere.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'ai', 'llm', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early AI startup (pre-seed to Series A) needing enterprise LLMs.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Cohere startup channels.',
        url: 'https://cohere.com',
      },
      {
        title: 'Get LLM credits',
        description: 'Command, Embed, and Rerank models with private deployment options.',
      },
    ],
    nameAr: 'Cohere للشركات الناشئة',
    taglineAr: 'رصيد نماذج لغوية مؤسسية - آمنة وخاصة',
    descriptionAr: 'تمنح Cohere رصيداً لنماذج اللغة المؤسسية - آمنة وخاصة لـ RAG والمحادثة والتضمينات.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة ذكاء اصطناعي مبكرة تحتاج نماذج مؤسسية.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Cohere.',
        url: 'https://cohere.com',
      },
      {
        title: 'استلم رصيد النماذج',
        description: 'نماذج Command وEmbed وRerank مع نشر خاص.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o248',
    slug: 'ai21-labs-startup-credits',
    name: 'AI21 Labs for Startups',
    tagline: 'Credits for Jurassic & Command premium models',
    description:
      'AI21 Labs startup offerings can include credits for premium language models (Jurassic, Command) for early AI builders. Pre-seed to Series A, global. Source: startup-perks.com/perks/ai21labs-startup/.',
    url: 'https://www.ai21.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=ai21.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'ai', 'llm', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early AI startup (pre-seed to Series A).',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through AI21 startup channels.',
        url: 'https://www.ai21.com',
      },
      {
        title: 'Get model credits',
        description: 'Build with Jurassic and Command foundation models.',
      },
    ],
    nameAr: 'AI21 Labs للشركات الناشئة',
    taglineAr: 'رصيد لنماذج Jurassic وCommand المميزة',
    descriptionAr: 'تمنح AI21 Labs رصيداً لنماذج اللغة المميزة لبناة الذكاء الاصطناعي المبكرين.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة ذكاء اصطناعي مبكرة.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات AI21.',
        url: 'https://www.ai21.com',
      },
      {
        title: 'استلم رصيد النماذج',
        description: 'ابنِ مع نماذج Jurassic وCommand.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o249',
    slug: 'elevenlabs-startup-voice-credits',
    name: 'ElevenLabs for Startups',
    tagline: 'Up to 3 months free - voice AI grants & credits',
    description:
      'ElevenLabs startup programs may include up to 3 months free, trial periods, credits, or grants for voice AI use cases (TTS, cloning, agents). Pre-seed to Series A, global. Source: startup-perks.com/perks/elevenlabs-startup-grants/.',
    url: 'https://elevenlabs.io/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'voice', 'ai', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early startup (pre-seed to Series A) with voice AI use case.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request grants/credits through ElevenLabs startup channels.',
        url: 'https://elevenlabs.io/',
      },
      {
        title: 'Get voice credits',
        description: 'TTS, voice cloning, and conversational agents with credits.',
      },
    ],
    nameAr: 'ElevenLabs للشركات الناشئة',
    taglineAr: 'حتى 3 أشهر مجاناً - منح ورصيد للصوت',
    descriptionAr: 'تمنح ElevenLabs حتى 3 أشهر مجانية أو رصيداً أو منحاً لحالات الصوت (تحويل نص واستنساخ ووكلاء).',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة بحالة استعمال صوتية.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب المنح/الرصيد عبر قنوات ElevenLabs.',
        url: 'https://elevenlabs.io/',
      },
      {
        title: 'استلم رصيد الصوت',
        description: 'تحويل نص واستنساخ ووكلاء محادثة بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o250',
    slug: 'algolia-startups-search-credits',
    name: 'Algolia for Startups',
    tagline: 'Up to $10,000 search & discovery credits',
    description:
      'Algolia startup programs can provide up to $10k search and discovery credits for product teams scaling user-facing search. Pre-seed to Series A, global. Source: startup-perks.com/perks/algolia-for-startups/.',
    url: 'https://www.algolia.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=algolia.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '10k', 'search', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early product team (pre-seed to Series A) scaling search.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Algolia startup channels.',
        url: 'https://www.algolia.com/',
      },
      {
        title: 'Get search credits',
        description: 'Hosted search, recommend, and AI search with credits.',
      },
    ],
    nameAr: 'Algolia للشركات الناشئة',
    taglineAr: 'حتى 10,000$ رصيد بحث واكتشاف',
    descriptionAr: 'تمنح Algolia حتى 10 آلاف $ رصيد بحث واكتشاف لفرق المنتجات التي توسّع البحث.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق منتج مبكر يوسّع البحث.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Algolia.',
        url: 'https://www.algolia.com/',
      },
      {
        title: 'استلم رصيد البحث',
        description: 'بحث مستضاف وتوصيات وبحث ذكي بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o251',
    slug: 'weaviate-startups-vector-credits',
    name: 'Weaviate for Startups',
    tagline: 'Cloud credits for vector search apps',
    description:
      'Weaviate startup programs can include cloud credits and onboarding for vector search applications and AI agents. Pre-seed to Series A, global. Source: startup-perks.com/perks/weaviate-for-startups/.',
    url: 'https://weaviate.io/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=weaviate.io&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'vector-db', 'ai', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early AI team (pre-seed to Series A) building vector search.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Weaviate startup channels.',
        url: 'https://weaviate.io/',
      },
      {
        title: 'Get vector credits',
        description: 'Serverless Weaviate Cloud with hybrid search and agents.',
      },
    ],
    nameAr: 'Weaviate للشركات الناشئة',
    taglineAr: 'رصيد سحابي لتطبيقات البحث المتجه',
    descriptionAr: 'تمنح Weaviate رصيداً سحابياً وتأهيلاً لتطبيقات البحث المتجه ووكلاء الذكاء الاصطناعي.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق ذكاء اصطناعي مبكر يبني بحثاً متجهاً.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Weaviate.',
        url: 'https://weaviate.io/',
      },
      {
        title: 'استلم رصيد المتجهات',
        description: 'سحابة Weaviate مع بحث هجين ووكلاء.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o252',
    slug: 'auth0-startups-identity-credits',
    name: 'Auth0 for Startups',
    tagline: 'Identity credits + free MAU tiers',
    description:
      'Auth0 startup offerings can include credits and free MAU tiers for authentication and identity workflows. Pre-seed to Series A, global. Source: startup-perks.com/perks/auth0-for-startups/.',
    url: 'https://auth0.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=auth0.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'auth', 'identity', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early product team (pre-seed to Series A) needing auth.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Auth0 startup channels.',
        url: 'https://auth0.com/',
      },
      {
        title: 'Get identity credits',
        description: 'Universal login, SSO, MFA, and user management with credits.',
      },
    ],
    nameAr: 'Auth0 للشركات الناشئة',
    taglineAr: 'رصيد هوية + طبقات MAU مجانية',
    descriptionAr: 'تمنح Auth0 رصيداً وطبقات مستخدمين مجانية لسير المصادقة والهوية.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق منتج مبكر يحتاج المصادقة.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Auth0.',
        url: 'https://auth0.com/',
      },
      {
        title: 'استلم رصيد الهوية',
        description: 'دخول موحد وSSO وMFA وإدارة مستخدمين بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o253',
    slug: 'clerk-startups-auth-credits',
    name: 'Clerk for Startups',
    tagline: 'Authentication credits for early products',
    description:
      'Clerk startup support may include credits or discounted authentication plans (sign-in, users, orgs) for early-stage products. Pre-seed to Series A, global. Source: startup-perks.com/perks/clerk-for-startups/.',
    url: 'https://clerk.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=clerk.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'auth', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early product (pre-seed to Series A) needing drop-in auth.',
      },
      {
        title: 'Apply on clerk.com/startups',
        description: 'Submit via the official page.',
        url: 'https://clerk.com/startups',
      },
      {
        title: 'Get auth credits',
        description: 'Sign-in components, sessions, and orgs with credits.',
      },
    ],
    nameAr: 'Clerk للشركات الناشئة',
    taglineAr: 'رصيد مصادقة للمنتجات المبكرة',
    descriptionAr: 'تمنح Clerk رصيداً أو خطط مصادقة مخفضة للمنتجات المبكرة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'منتج مبكر يحتاج مصادقة جاهزة.',
      },
      {
        title: 'قدّم في clerk.com/startups',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://clerk.com/startups',
      },
      {
        title: 'استلم رصيد المصادقة',
        description: 'مكونات دخول وجلسات ومنظمات بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o254',
    slug: 'workos-startups-sso-credits',
    name: 'WorkOS for Startups',
    tagline: 'Enterprise auth credits - SSO, SAML, directory sync',
    description:
      'WorkOS startup offerings can include credits for enterprise-grade identity: SSO, SAML, directory sync at startup-friendly terms. Pre-seed to Series A, global. Source: startup-perks.com/perks/workos-startup/.',
    url: 'https://workos.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=workos.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'sso', 'auth', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early B2B startup (pre-seed to Series A) needing enterprise auth.',
      },
      {
        title: 'Apply on workos.com/startups',
        description: 'Submit via the official page.',
        url: 'https://workos.com/startups',
      },
      {
        title: 'Get enterprise auth credits',
        description: 'SSO, directory sync, audit logs, and admin portal with credits.',
      },
    ],
    nameAr: 'WorkOS للشركات الناشئة',
    taglineAr: 'رصيد مصادقة مؤسسية - SSO وSAML والمزامنة',
    descriptionAr: 'تمنح WorkOS رصيداً لهوية مؤسسية: SSO وSAML ومزامنة الدليل بشروط مناسبة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة B2B مبكرة تحتاج مصادقة مؤسسية.',
      },
      {
        title: 'قدّم في workos.com/startups',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://workos.com/startups',
      },
      {
        title: 'استلم رصيد المصادقة',
        description: 'SSO ومزامنة وسجلات تدقيق بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o255',
    slug: 'snyk-startups-security-credits',
    name: 'Snyk for Startups',
    tagline: 'FREE security scanning tier for product teams',
    description:
      'Snyk startup offerings can provide free or discounted security scanning for code, containers, and dependencies. Pre-seed to Series A, global. Source: startup-perks.com/perks/snyk-for-startups/.',
    url: 'https://snyk.io/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=snyk.io&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'security', 'scanning', 'devsecops', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early product team (pre-seed to Series A) securing code.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request access through Snyk startup channels.',
        url: 'https://snyk.io/',
      },
      {
        title: 'Get free scanning',
        description: 'Code, open-source, container, and IaC scanning free/discounted.',
      },
    ],
    nameAr: 'Snyk للشركات الناشئة',
    taglineAr: 'طبقة فحص أمني مجانية لفرق المنتجات',
    descriptionAr: 'تمنح Snyk فحصاً أمنياً مجانياً أو مخفضاً للأكواد والحاويات والاعتماديات.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق منتج مبكر يؤمّن الأكواد.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الوصول عبر قنوات Snyk.',
        url: 'https://snyk.io/',
      },
      {
        title: 'استلم الفحص المجاني',
        description: 'فحص أكواد وحاويات وبنية مجاناً/مخفضاً.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o256',
    slug: 'vanta-startups-compliance-pricing',
    name: 'Vanta for Startups',
    tagline: 'Startup pricing for SOC 2 & ISO 27001 automation',
    description:
      'Vanta startup offerings can include discounted automated compliance for SOC 2, ISO 27001 and more - fastest path to audits. Pre-seed to Series A, global. Source: startup-perks.com/perks/vanta-startup/.',
    url: 'https://www.vanta.com/solutions/startup',
    logoUrl: 'https://www.google.com/s2/favicons?domain=vanta.com&sz=64',
    category: 'startup-discounts',
    tags: ['discount', 'compliance', 'soc2', 'security', 'startup-perks'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early startup (pre-seed to Series A) needing SOC 2/ISO.',
      },
      {
        title: 'Apply on vanta.com startup page',
        description: 'Request startup pricing via the official page.',
        url: 'https://www.vanta.com/solutions/startup',
      },
      {
        title: 'Get discounted compliance',
        description: 'Automated evidence, policies, and auditor matching at startup rates.',
      },
    ],
    nameAr: 'Vanta للشركات الناشئة',
    taglineAr: 'أسعار ناشئة لأتمتة SOC 2 وISO 27001',
    descriptionAr: 'تمنح Vanta أسعاراً مخفضة للامتثال المؤتمت (SOC 2 وISO 27001 وغيرها) - أسرع طريق للتدقيق.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تحتاج SOC 2/ISO.',
      },
      {
        title: 'قدّم في صفحة Vanta',
        description: 'اطلب أسعار الشركات عبر الصفحة الرسمية.',
        url: 'https://www.vanta.com/solutions/startup',
      },
      {
        title: 'استلم الامتثال المخفض',
        description: 'أدلة وسياسات مؤتمتة ومطابقة مدققين بأسعار ناشئة.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o257',
    slug: 'crowdstrike-startups-security',
    name: 'CrowdStrike for Startups',
    tagline: 'Startup credits for endpoint security',
    description:
      'CrowdStrike startup offerings can include credits for enterprise-grade endpoint protection against cyber threats. Pre-seed to Series A, global. Source: startup-perks.com/perks/crowdstrike-startup/.',
    url: 'https://www.crowdstrike.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=crowdstrike.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'endpoint', 'security', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early startup (pre-seed to Series A) needing endpoint security.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through CrowdStrike startup channels.',
        url: 'https://www.crowdstrike.com',
      },
      {
        title: 'Get endpoint credits',
        description: 'Falcon prevention, detection, and threat intel with credits.',
      },
    ],
    nameAr: 'CrowdStrike للشركات الناشئة',
    taglineAr: 'رصيد ناشئ لأمن النقاط الطرفية',
    descriptionAr: 'تمنح CrowdStrike رصيداً لحماية مؤسسية للنقاط الطرفية ضد التهديدات.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تحتاج أمن النقاط الطرفية.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات CrowdStrike.',
        url: 'https://www.crowdstrike.com',
      },
      {
        title: 'استلم رصيد الحماية',
        description: 'منع وكشف واستخبارات تهديدات بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o258',
    slug: 'wiz-startups-cloud-security',
    name: 'Wiz for Startups',
    tagline: 'Cloud security credits - fix risks in minutes',
    description:
      'Wiz startup offerings can include credits for the cloud security platform that finds and fixes risks in minutes. Pre-seed to Series A, global. Source: startup-perks.com/perks/wiz-startup/.',
    url: 'https://www.wiz.io/lp/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=wiz.io&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'cloud', 'security', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early startup (pre-seed to Series A) on cloud.',
      },
      {
        title: 'Apply on wiz.io startups page',
        description: 'Submit via the official page.',
        url: 'https://www.wiz.io/lp/startups',
      },
      {
        title: 'Get security credits',
        description: 'Agentless scanning, misconfigs, and attack paths with credits.',
      },
    ],
    nameAr: 'Wiz للشركات الناشئة',
    taglineAr: 'رصيد أمن سحابي - أصلح المخاطر بدقائق',
    descriptionAr: 'تمنح Wiz رصيداً لمنصة الأمن السحابي التي تجد المخاطر وتصلحها بدقائق.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة على السحابة.',
      },
      {
        title: 'قدّم في صفحة Wiz',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://www.wiz.io/lp/startups',
      },
      {
        title: 'استلم رصيد الأمن',
        description: 'فحص دون وكلاء وسوء إعدادات ومسارات هجوم بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o259',
    slug: 'cloudinary-startups-media-credits',
    name: 'Cloudinary for Startups',
    tagline: 'Media & bandwidth credits for early products',
    description:
      'Cloudinary startup benefits can include media processing and bandwidth credits for image/video APIs. Pre-seed to Series A, global. Source: startup-perks.com/perks/cloudinary-for-startups/.',
    url: 'https://cloudinary.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=cloudinary.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'media', 'images', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early product (pre-seed to Series A) handling media.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Cloudinary startup channels.',
        url: 'https://cloudinary.com/',
      },
      {
        title: 'Get media credits',
        description: 'Upload, transform, optimize, and deliver media with credits.',
      },
    ],
    nameAr: 'Cloudinary للشركات الناشئة',
    taglineAr: 'رصيد وسائط ونطاق للمنتجات المبكرة',
    descriptionAr: 'تمنح Cloudinary رصيد معالجة وسائط ونطاق لواجهات الصور والفيديو.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'منتج مبكر يتعامل مع الوسائط.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Cloudinary.',
        url: 'https://cloudinary.com/',
      },
      {
        title: 'استلم رصيد الوسائط',
        description: 'رفع وتحويل وتحسين وتسليم بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o260',
    slug: 'fastly-startups-cdn-credits',
    name: 'Fastly for Startups',
    tagline: 'Edge, security & CDN credits for scale-ups',
    description:
      'Fastly startup programs can provide edge, security, and CDN credits for qualifying scale-ups. Seed to Series B, global. Source: startup-perks.com/perks/fastly-for-startups/.',
    url: 'https://www.fastly.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=fastly.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'cdn', 'edge', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Seed to Series B startup needing edge/CDN.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Fastly startup channels.',
        url: 'https://www.fastly.com/',
      },
      {
        title: 'Get edge credits',
        description: 'CDN, WAF, and edge compute with credits.',
      },
    ],
    nameAr: 'Fastly للشركات الناشئة',
    taglineAr: 'رصيد حافة وأمن وCDN للمتوسعة',
    descriptionAr: 'تمنح Fastly رصيد حافة وأمن وCDN للشركات المتوسعة المؤهلة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة Seed إلى Series B تحتاج الحافة/CDN.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Fastly.',
        url: 'https://www.fastly.com/',
      },
      {
        title: 'استلم رصيد الحافة',
        description: 'CDN وWAF وحوسبة حافة بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o261',
    slug: 'render-startups-platform-credits',
    name: 'Render for Startups',
    tagline: 'Platform credits to deploy cloud apps',
    description:
      'Render startup initiatives can provide credits and onboarding for deploying and operating cloud apps (web services, Postgres, cron). Bootstrapped to seed, global. Source: startup-perks.com/perks/render-for-startups/.',
    url: 'https://render.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=render.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'hosting', 'cloud', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Bootstrapped to seed startup deploying apps.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Render startup channels.',
        url: 'https://render.com/',
      },
      {
        title: 'Get deploy credits',
        description: 'Web services, databases, and background workers with credits.',
      },
    ],
    nameAr: 'Render للشركات الناشئة',
    taglineAr: 'رصيد منصة لنشر التطبيقات السحابية',
    descriptionAr: 'تمنح Render رصيداً وتأهيلاً لنشر التطبيقات السحابية وتشغيلها.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة من التمويل الذاتي إلى seed تنشر تطبيقات.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Render.',
        url: 'https://render.com/',
      },
      {
        title: 'استلم رصيد النشر',
        description: 'خدمات ويب وقواعد ومهام خلفية بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o262',
    slug: 'heroku-oss-credit-program',
    name: 'Heroku Open Source Credit Program',
    tagline: 'Platform credits for open source projects',
    description:
      'Heroku OSS credit program grants platform credits for open source projects to build and deploy apps on Heroku. Pre-seed to Series A, global. Source: startup-perks.com/perks/heroku-oss/.',
    url: 'https://www.heroku.com/open-source-credit-program',
    logoUrl: 'https://www.google.com/s2/favicons?domain=heroku.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'open-source', 'hosting', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Open source project needing Heroku hosting.',
      },
      {
        title: 'Apply on the official page',
        description: 'Submit your OSS project details.',
        url: 'https://www.heroku.com/open-source-credit-program',
      },
      {
        title: 'Get platform credits',
        description: 'Dynos, Postgres, and add-ons with credits.',
      },
    ],
    nameAr: 'Heroku للمشاريع الحرة',
    taglineAr: 'رصيد منصة للمشاريع مفتوحة المصدر',
    descriptionAr: 'يمنح برنامج Heroku رصيد منصة للمشاريع الحرة لبناء التطبيقات ونشرها.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'مشروع مفتوح المصدر يحتاج استضافة Heroku.',
      },
      {
        title: 'قدّم في الصفحة الرسمية',
        description: 'أرسل تفاصيل مشروعك الحر.',
        url: 'https://www.heroku.com/open-source-credit-program',
      },
      {
        title: 'استلم رصيد المنصة',
        description: 'Dynos وPostgres وإضافات بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o263',
    slug: 'alchemy-startups-web3-credits',
    name: 'Alchemy for Startups',
    tagline: 'Web3 dev credits on the powerful blockchain platform',
    description:
      'Alchemy startup offerings can include credits for building blockchain apps - nodes, APIs, and dev tools for Web3. Pre-seed to Series A, global. Source: startup-perks.com/perks/alchemy-startup/.',
    url: 'https://www.alchemy.com/startup-program',
    logoUrl: 'https://www.google.com/s2/favicons?domain=alchemy.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'web3', 'blockchain', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early Web3 team (pre-seed to Series A).',
      },
      {
        title: 'Apply on alchemy.com startup page',
        description: 'Submit via the official page.',
        url: 'https://www.alchemy.com/startup-program',
      },
      {
        title: 'Get Web3 credits',
        description: 'Supernode APIs, NFT APIs, and monitoring with credits.',
      },
    ],
    nameAr: 'Alchemy للشركات الناشئة',
    taglineAr: 'رصيد Web3 على منصة البلوكتشين القوية',
    descriptionAr: 'تمنح Alchemy رصيداً لبناء تطبيقات البلوكتشين - عقد وAPIs وأدوات Web3.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق Web3 مبكر.',
      },
      {
        title: 'قدّم في صفحة Alchemy',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://www.alchemy.com/startup-program',
      },
      {
        title: 'استلم رصيد Web3',
        description: 'APIs عقد وNFT ومراقبة بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o264',
    slug: 'infura-startups-web3-credits',
    name: 'Infura for Startups',
    tagline: 'Ethereum & IPFS API credits for Web3 devs',
    description:
      'Infura startup offerings can include Ethereum and IPFS API credits to build decentralized apps fast. Pre-seed to Series A, global. Source: startup-perks.com/perks/infura-startup/.',
    url: 'https://infura.io',
    logoUrl: 'https://www.google.com/s2/favicons?domain=infura.io&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'web3', 'ethereum', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early Web3 team (pre-seed to Series A).',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Infura startup channels.',
        url: 'https://infura.io',
      },
      {
        title: 'Get API credits',
        description: 'Ethereum, IPFS, and L2 endpoints with credits.',
      },
    ],
    nameAr: 'Infura للشركات الناشئة',
    taglineAr: 'رصيد Ethereum وIPFS لمطوري Web3',
    descriptionAr: 'تمنح Infura رصيد APIs إيثيريوم وIPFS لبناء التطبيقات اللامركزية بسرعة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق Web3 مبكر.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Infura.',
        url: 'https://infura.io',
      },
      {
        title: 'استلم رصيد APIs',
        description: 'نقاط إيثيريوم وIPFS وL2 بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o265',
    slug: 'plaid-startups-fintech-credits',
    name: 'Plaid for Startups',
    tagline: 'API credits + reduced fees for fintech teams',
    description:
      'Plaid startup programs can provide API credits and pricing support for eligible fintech teams (bank connections, payments, KYC). US/global, pre-seed to Series A. Source: startup-perks.com/perks/plaid-for-startups/.',
    url: 'https://plaid.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=plaid.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'fintech', 'api', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early fintech team (pre-seed to Series A) using Plaid APIs.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Plaid startup channels.',
        url: 'https://plaid.com/',
      },
      {
        title: 'Get API credits',
        description: 'Auth, transactions, balance, and identity endpoints with credits.',
      },
    ],
    nameAr: 'Plaid للشركات الناشئة',
    taglineAr: 'رصيد API + رسوم مخفضة لفرق التقنية المالية',
    descriptionAr: 'تمنح Plaid رصيد API ودعم تسعير لفرق التقنية المالية المؤهلة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق تقنية مالية مبكر يستعمل APIs.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Plaid.',
        url: 'https://plaid.com/',
      },
      {
        title: 'استلم رصيد API',
        description: 'نقاط مصادقة ومعاملات وأرصدة بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o266',
    slug: 'brex-startups-rewards-perks',
    name: 'Brex for Startups',
    tagline: 'Cash rewards + partner perks bundle (US)',
    description:
      'Brex for Startups offers startup financial tooling with cash rewards, credits, and partner perks across software vendors. Pre-seed to Series B, US. Source: startup-perks.com/perks/brex-for-startups/.',
    url: 'https://www.brex.com/solutions/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=brex.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'rewards', 'fintech', 'banking', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'US startup (pre-seed to Series B) needing corporate cards/spend.',
      },
      {
        title: 'Apply on brex.com startups page',
        description: 'Open a Brex account via the startups route.',
        url: 'https://www.brex.com/solutions/startups',
      },
      {
        title: 'Get rewards + perks',
        description: 'Cash back, no-fee banking, plus partner software discounts.',
      },
    ],
    nameAr: 'Brex للشركات الناشئة',
    taglineAr: 'مكافآت نقدية + حزمة مزايا الشركاء',
    descriptionAr: 'تمنح Brex أدوات مالية مع مكافآت نقدية ورصيد ومزايا شركاء عبر بائعي البرمجيات.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة أمريكية مبكرة تحتاج بطاقات/إنفاقاً.',
      },
      {
        title: 'قدّم في صفحة Brex',
        description: 'افتح حساب Brex عبر مسار الشركات.',
        url: 'https://www.brex.com/solutions/startups',
      },
      {
        title: 'استلم المكافآت',
        description: 'استرداد نقدي وبنكية دون رسوم وخصومات شركاء.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o267',
    slug: 'ramp-startups-rewards-discounts',
    name: 'Ramp for Startups',
    tagline: 'Rewards + SaaS discounts via partner network (US)',
    description:
      'Ramp startup programs can include account rewards and ecosystem discounts across software vendors. Pre-seed to Series B, US. Source: startup-perks.com/perks/ramp-for-startups/.',
    url: 'https://ramp.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=ramp.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'rewards', 'fintech', 'saas', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'US startup (pre-seed to Series B) managing spend.',
      },
      {
        title: 'Apply on ramp.com/startups',
        description: 'Open Ramp via the startups page.',
        url: 'https://ramp.com/startups',
      },
      {
        title: 'Get rewards + discounts',
        description: 'Cashback Harvey-style rewards plus SaaS vendor discounts.',
      },
    ],
    nameAr: 'Ramp للشركات الناشئة',
    taglineAr: 'مكافآت + خصومات SaaS عبر الشركاء',
    descriptionAr: 'تمنح Ramp مكافآت حسابات وخصومات منظومة عبر بائعي البرمجيات.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة أمريكية مبكرة تدير الإنفاق.',
      },
      {
        title: 'قدّم في ramp.com/startups',
        description: 'افتح Ramp عبر صفحة الشركات.',
        url: 'https://ramp.com/startups',
      },
      {
        title: 'استلم المكافآت والخصومات',
        description: 'استرداد نقدي + خصومات بائعي SaaS.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o268',
    slug: 'mercury-startup-perks-bundle',
    name: 'Mercury Startup Perks',
    tagline: 'Banking + curated software discount bundles',
    description:
      'Mercury Perks bundles curated banking, credit, and software discounts for startups (e.g. partner SaaS deals alongside Mercury accounts). Pre-seed to Series B, global. Source: startup-perks.com/perks/mercury-perks/.',
    url: 'https://mercury.com/perks',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mercury.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'discount', 'banking', 'fintech', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Open a Mercury account',
        description: 'Startups (pre-seed to Series B) can open Mercury banking.',
        url: 'https://mercury.com/perks',
      },
      {
        title: 'Browse the perks page',
        description: 'Pick partner software deals on mercury.com/perks.',
        url: 'https://mercury.com/perks',
      },
      {
        title: 'Claim partner deals',
        description: 'Activate SaaS discounts linked to your Mercury account.',
      },
    ],
    nameAr: 'مزايا Mercury للشركات الناشئة',
    taglineAr: 'بنكية + حزم خصومات برمجية مختارة',
    descriptionAr: 'تجمع مزايا Mercury خصومات بنكية وائتمانية وبرمجية مختارة للشركات الناشئة.',
    stepsAr: [
      {
        title: 'افتح حساب Mercury',
        description: 'يمكن للشركات المبكرة فتح بنكية Mercury.',
        url: 'https://mercury.com/perks',
      },
      {
        title: 'تصفح صفحة المزايا',
        description: 'اختر عروض البرمجيات الشريكة.',
        url: 'https://mercury.com/perks',
      },
      {
        title: 'فعّل عروض الشركاء',
        description: 'فعّل خصومات SaaS المرتبطة بحسابك.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o269',
    slug: 'stripe-atlas-partner-perks',
    name: 'Stripe Atlas Partner Perks',
    tagline: 'Incorporate + unlock partner credits bundle',
    description:
      'Stripe Atlas founders can access partner perk bundles with credits and discounts across startup software vendors after incorporating. Bootstrapped to seed, global. Source: startup-perks.com/perks/stripe-atlas-partner-perks/.',
    url: 'https://stripe.com/atlas',
    logoUrl: 'https://www.google.com/s2/favicons?domain=stripe.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'discount', 'incorporation', 'fintech', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Incorporate with Atlas',
        description: 'Form your US company via Stripe Atlas (bootstrapped to seed).',
        url: 'https://stripe.com/atlas',
      },
      {
        title: 'Open partner perks',
        description: 'Access the perks dashboard after incorporation.',
      },
      {
        title: 'Claim vendor credits',
        description: 'Activate credits/discounts across cloud, tools, and services.',
      },
    ],
    nameAr: 'مزايا شركاء Stripe Atlas',
    taglineAr: 'أسّس شركتك + افتح حزمة رصيد الشركاء',
    descriptionAr: 'يحصل مؤسسو Atlas على حزم مزايا الشركاء برصيد وخصومات عبر بائعي البرمجيات بعد التأسيس.',
    stepsAr: [
      {
        title: 'أسّس عبر Atlas',
        description: 'شكّل شركتك الأمريكية عبر Stripe Atlas.',
        url: 'https://stripe.com/atlas',
      },
      {
        title: 'افتح مزايا الشركاء',
        description: 'ادخل لوحة المزايا بعد التأسيس.',
        url: 'https://stripe.com/atlas',
      },
      {
        title: 'فعّل رصيد البائعين',
        description: 'فعّل الأرصدة والخصومات عبر السحابة والأدوات.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o270',
    slug: 'stripe-climate-partner-credits',
    name: 'Stripe Climate Partner Credits',
    tagline: 'Fee discounts for climate contributions',
    description:
      'Stripe Climate participation can include program-linked incentives and fee discount opportunities for eligible users funding carbon removal. Bootstrapped to Series A, global. Source: startup-perks.com/perks/stripe-climate-partner-credits/.',
    url: 'https://stripe.com/climate',
    logoUrl: 'https://www.google.com/s2/favicons?domain=stripe.com&sz=64',
    category: 'startup-discounts',
    tags: ['discount', 'climate', 'fintech', 'startup-perks'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Join Stripe Climate',
        description: 'Direct a fraction of revenue to carbon removal via Stripe.',
        url: 'https://stripe.com/climate',
      },
      {
        title: 'Check fee incentives',
        description: 'Review program-linked fee discounts for participants.',
      },
      {
        title: 'Claim partner credits',
        description: 'Activate eligible incentives from your Stripe dashboard.',
      },
    ],
    nameAr: 'رصيد شركاء Stripe Climate',
    taglineAr: 'خصومات رسوم للمساهمات المناخية',
    descriptionAr: 'تمنح المشاركة في Stripe Climate حوافز وخصومات رسوم للمستخدمين المؤهلين الممولين لإزالة الكربون.',
    stepsAr: [
      {
        title: 'انضم لـ Stripe Climate',
        description: 'وجّه جزءاً من الإيرادات لإزالة الكربون عبر Stripe.',
        url: 'https://stripe.com/climate',
      },
      {
        title: 'راجع حوافز الرسوم',
        description: 'اطلع على خصومات الرسوم المرتبطة للمشاركين.',
      },
      {
        title: 'فعّل رصيد الشركاء',
        description: 'فعّل الحوافز المؤهلة من لوحتك.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o271',
    slug: 'salesforce-startups-crm-pricing',
    name: 'Salesforce for Startups',
    tagline: 'Startup pricing for enterprise CRM',
    description:
      'Salesforce for Startups offers startup-friendly pricing on the enterprise CRM to manage relationships and pipelines. Pre-seed to Series A, global. Source: startup-perks.com/perks/salesforce-startup/.',
    url: 'https://www.salesforce.com/startups/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=salesforce.com&sz=64',
    category: 'startup-discounts',
    tags: ['discount', 'crm', 'sales', 'startup-perks'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early startup (pre-seed to Series A) needing CRM.',
      },
      {
        title: 'Apply on salesforce.com/startups',
        description: 'Request startup pricing via the official page.',
        url: 'https://www.salesforce.com/startups/',
      },
      {
        title: 'Get CRM pricing',
        description: 'Sales, service, and marketing clouds at startup rates.',
      },
    ],
    nameAr: 'Salesforce للشركات الناشئة',
    taglineAr: 'أسعار ناشئة لإدارة علاقات مؤسسية',
    descriptionAr: 'تمنح Salesforce أسعاراً مناسبة للشركات الناشئة على CRM المؤسسي لإدارة العلاقات وخطوط البيع.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تحتاج CRM.',
      },
      {
        title: 'قدّم في salesforce.com/startups',
        description: 'اطلب أسعار الشركات عبر الصفحة الرسمية.',
        url: 'https://www.salesforce.com/startups/',
      },
      {
        title: 'استلم أسعار CRM',
        description: 'سحب مبيعات وخدمة وتسويق بأسعار ناشئة.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o272',
    slug: 'hubspot-startups-90-off',
    name: 'HubSpot for Startups',
    tagline: 'Up to 90% OFF year one on CRM & marketing',
    description:
      'HubSpot for Startups offers tiered discounts up to 90% off in year one on CRM and growth hubs via approved partners (30-90% by stage). Pre-seed to Series A, global. Source: startup-perks.com/perks/hubspot-for-startups/.',
    url: 'https://www.hubspot.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=hubspot.com&sz=64',
    category: 'startup-discounts',
    tags: ['discount', '90-off', 'crm', 'marketing', 'startup-perks'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Confirm your stage tier',
        description: 'Seed: up to 30-50% typically; Series A via partners: up to 90% year one. Check current tiers.',
      },
      {
        title: 'Apply via approved partner',
        description: 'Apply through a HubSpot startup partner/accelerator.',
        url: 'https://www.hubspot.com/startups',
      },
      {
        title: 'Get up to 90% off',
        description: 'Discounted Marketing, Sales, and Service Hubs in year one.',
      },
    ],
    nameAr: 'HubSpot للشركات الناشئة',
    taglineAr: 'حتى 90% خصم السنة الأولى على CRM والتسويق',
    descriptionAr: 'تمنح HubSpot خصومات متدرجة حتى 90% السنة الأولى على CRM ومراكز النمو عبر شركاء معتمدين.',
    stepsAr: [
      {
        title: 'حدد شريحة مرحلتك',
        description: 'Seed غالباً 30-50% وSeries A عبر الشركاء حتى 90% السنة الأولى.',
      },
      {
        title: 'قدّم عبر شريك معتمد',
        description: 'قدّم من خلال شريك/مسرّعة معتمدة.',
        url: 'https://www.hubspot.com/startups',
      },
      {
        title: 'استلم حتى 90% خصماً',
        description: 'مراكز تسويق ومبيعات وخدمة مخفضة السنة الأولى.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o273',
    slug: 'intercom-startups-90-off',
    name: 'Intercom for Startups',
    tagline: 'Up to 90% OFF messaging & support plans',
    description:
      'Intercom startup programs may offer up to 90% off customer messaging and support plans for early teams. Pre-seed to Series A, global. Source: startup-perks.com/perks/intercom-for-startups/.',
    url: 'https://www.intercom.com/early-stage',
    logoUrl: 'https://www.google.com/s2/favicons?domain=intercom.com&sz=64',
    category: 'startup-discounts',
    tags: ['discount', '90-off', 'support', 'chat', 'startup-perks'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early-stage startup (pre-seed to Series A) needing support chat.',
      },
      {
        title: 'Apply on intercom early-stage page',
        description: 'Submit via the official early-stage page.',
        url: 'https://www.intercom.com/early-stage',
      },
      {
        title: 'Get up to 90% off',
        description: 'Fin AI, inbox, and engagement plans at startup rates.',
      },
    ],
    nameAr: 'Intercom للشركات الناشئة',
    taglineAr: 'حتى 90% خصم خطط المراسلة والدعم',
    descriptionAr: 'تمنح Intercom حتى 90% خصم خطط مراسلة العملاء والدعم للفرق المبكرة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تحتاج دعم المحادثة.',
      },
      {
        title: 'قدّم في صفحة المراحل المبكرة',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://www.intercom.com/early-stage',
      },
      {
        title: 'استلم حتى 90% خصماً',
        description: 'خطط Fin AI والبريد والتفاعل بأسعار ناشئة.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o274',
    slug: 'cursor-startups-ai-editor',
    name: 'Cursor for Startups',
    tagline: 'Startup pricing for the AI code editor',
    description:
      'Cursor startup offerings can include startup plan pricing for the AI-powered code editor combining assistance with a modern IDE. Pre-seed to Series A, global. Source: startup-perks.com/perks/cursor-startup/.',
    url: 'https://cursor.sh/pricing',
    logoUrl: 'https://www.google.com/s2/favicons?domain=cursor.sh&sz=64',
    category: 'startup-discounts',
    tags: ['discount', 'ai', 'ide', 'coding', 'startup-perks'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early software startup (pre-seed to Series A).',
      },
      {
        title: 'Apply via startup program',
        description: 'Request startup pricing through Cursor startup channels.',
        url: 'https://cursor.sh/pricing',
      },
      {
        title: 'Get AI editor pricing',
        description: 'Tab completion, chat, and agents at startup rates.',
      },
    ],
    nameAr: 'Cursor للشركات الناشئة',
    taglineAr: 'أسعار ناشئة لمحرر الأكواد الذكي',
    descriptionAr: 'تمنح Cursor أسعار خطط ناشئة لمحرر الأكواد المدعوم بالذكاء الاصطناعي.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة برمجيات مبكرة.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الأسعار عبر قنوات Cursor.',
        url: 'https://cursor.sh/pricing',
      },
      {
        title: 'استلم أسعار المحرر',
        description: 'إكمال ومحادثة ووكلاء بأسعار ناشئة.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o275',
    slug: 'github-startups-copilot-benefits',
    name: 'GitHub for Startups',
    tagline: 'FREE/discounted Copilot + platform access',
    description:
      'GitHub for Startups provides eligible early companies discounted platform access including program-dependent Copilot/AI tooling benefits. Pre-seed to Series B, global. Source: startup-perks.com/perks/github-copilot-for-startups/.',
    url: 'https://github.com/enterprise/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=github.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'discount', 'copilot', 'git', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Eligible early company (pre-seed to Series B), often via partners.',
      },
      {
        title: 'Apply on github startups page',
        description: 'Submit via the official enterprise startups page.',
        url: 'https://github.com/enterprise/startups',
      },
      {
        title: 'Get platform benefits',
        description: 'Discounted Team/Enterprise plus Copilot perks where included.',
      },
    ],
    nameAr: 'GitHub للشركات الناشئة',
    taglineAr: 'Copilot مجاني/مخفض + وصول للمنصة',
    descriptionAr: 'تمنح GitHub الشركات المبكرة المؤهلة وصولاً مخفضاً للمنصة يشمل مزايا Copilot حسب البرنامج.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة مؤهلة غالباً عبر الشركاء.',
      },
      {
        title: 'قدّم في صفحة GitHub',
        description: 'أرسل طلبك في صفحة الشركات الرسمية.',
        url: 'https://github.com/enterprise/startups',
      },
      {
        title: 'استلم مزايا المنصة',
        description: 'خطط مخفضة + مزايا Copilot حيث تشمل.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o276',
    slug: 'notion-startups-6mo-free',
    name: 'Notion for Startups',
    tagline: 'Up to 6 months FREE + credits via partners',
    description:
      'Notion for Startups provides up to 6 months free on eligible plans plus product credits for startups accepted through partner communities. Bootstrapped to seed, global. Source: startup-perks.com/perks/notion-for-startups/.',
    url: 'https://www.notion.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=notion.so&sz=64',
    category: 'startup-discounts',
    tags: ['free', '6-months', 'productivity', 'docs', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Join via a partner community',
        description: 'Acceptance flows through approved partner communities (bootstrapped to seed).',
      },
      {
        title: 'Apply on notion.com/startups',
        description: 'Submit with your partner referral.',
        url: 'https://www.notion.com/startups',
      },
      {
        title: 'Get 6 months + credits',
        description: 'Plus plan free for 6 months plus credits for AI and automations.',
      },
    ],
    nameAr: 'Notion للشركات الناشئة',
    taglineAr: 'حتى 6 أشهر مجاناً + رصيد عبر الشركاء',
    descriptionAr: 'تمنح Notion حتى 6 أشهر مجانية في الخطط المؤهلة ورصيد منتج عبر مجتمعات الشركاء.',
    stepsAr: [
      {
        title: 'انضم عبر مجتمع شريك',
        description: 'القبول يمر عبر مجتمعات شركاء معتمدة.',
      },
      {
        title: 'قدّم في notion.com/startups',
        description: 'أرسل طلبك مع إحالة شريكك.',
        url: 'https://www.notion.com/startups',
      },
      {
        title: 'استلم 6 أشهر والرصيد',
        description: 'خطة Plus مجاناً 6 أشهر + رصيد AI وأتمتة.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o277',
    slug: 'slack-startups-collab-credits',
    name: 'Slack for Startups',
    tagline: 'Credits toward paid collaboration plans',
    description:
      'Slack startup benefits can include credits toward paid collaboration plans via approved startup programs. Pre-seed to Series A, global. Source: startup-perks.com/perks/slack-for-startups/.',
    url: 'https://slack.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=slack.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'collaboration', 'chat', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early startup (pre-seed to Series A) in an approved program.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Slack startup channels.',
        url: 'https://slack.com/',
      },
      {
        title: 'Get plan credits',
        description: 'Pro/Business+ collaboration with credits.',
      },
    ],
    nameAr: 'Slack للشركات الناشئة',
    taglineAr: 'رصيد نحو خطط التعاون المدفوعة',
    descriptionAr: 'تمنح Slack رصيداً نحو خطط التعاون المدفوعة عبر برامج شركات معتمدة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة في برنامج معتمد.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Slack.',
        url: 'https://slack.com/',
      },
      {
        title: 'استلم رصيد الخطط',
        description: 'تعاون Pro/Business+ بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o278',
    slug: 'loom-startups-business-free',
    name: 'Loom for Startups',
    tagline: 'FREE Business plan period for async video',
    description:
      'Loom startup offers may include free or discounted access periods to Business collaboration plans for async video. Pre-seed to Series A, global. Source: startup-perks.com/perks/loom-for-startups/.',
    url: 'https://www.loom.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=loom.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'video', 'collaboration', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early startup (pre-seed to Series A) using async video.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request access through Loom startup channels.',
        url: 'https://www.loom.com/',
      },
      {
        title: 'Get Business period',
        description: 'Unlimited videos, AI summaries, and editing free/discounted.',
      },
    ],
    nameAr: 'Loom للشركات الناشئة',
    taglineAr: 'فترة Business مجانية للفيديو اللامتزامن',
    descriptionAr: 'تمنح Loom فترات مجانية أو مخفضة لخطط Business للتعاون بالفيديو اللامتزامن.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تستعمل الفيديو اللامتزامن.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الوصول عبر قنوات Loom.',
        url: 'https://www.loom.com/',
      },
      {
        title: 'استلم فترة Business',
        description: 'فيديوهات غير محدودة وملخصات ذكية مجاناً/مخفضاً.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o279',
    slug: 'miro-startups-team-free',
    name: 'Miro for Startups',
    tagline: 'FREE Team/Business period for whiteboards',
    description:
      'Miro startup programs can include free periods or discounted team plans for visual product collaboration. Pre-seed to Series A, global. Source: startup-perks.com/perks/miro-for-startups/.',
    url: 'https://miro.com/startups/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=miro.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'whiteboard', 'collaboration', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early product team (pre-seed to Series A).',
      },
      {
        title: 'Apply on miro.com/startups',
        description: 'Submit via the official page.',
        url: 'https://miro.com/startups/',
      },
      {
        title: 'Get free period',
        description: 'Boards, voting, and templates for workshops free/discounted.',
      },
    ],
    nameAr: 'Miro للشركات الناشئة',
    taglineAr: 'فترة Team/Business مجانية للسبورات',
    descriptionAr: 'تمنح Miro فترات مجانية أو خطط فرق مخفضة للتعاون البصري على المنتج.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق منتج مبكر.',
      },
      {
        title: 'قدّم في miro.com/startups',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://miro.com/startups',
      },
      {
        title: 'استلم الفترة المجانية',
        description: 'سبورات وتصويت وقوالب مجاناً/مخفضاً.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o280',
    slug: 'figma-startups-pro-1yr',
    name: 'Figma for Startups',
    tagline: 'FREE Professional up to 1 year for design teams',
    description:
      'Figma for Startups offers qualifying startups free or discounted Professional design collaboration access for up to 1 year. Pre-seed to Series A, global. Source: startup-perks.com/perks/figma-for-startups/.',
    url: 'https://www.figma.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=figma.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'design', '1-year', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Qualifying early startup (pre-seed to Series A) designing products.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request access through Figma startup channels.',
        url: 'https://www.figma.com/',
      },
      {
        title: 'Get Pro up to 1 year',
        description: 'Design, FigJam, and Dev Mode collaboration free/discounted.',
      },
    ],
    nameAr: 'Figma للشركات الناشئة',
    taglineAr: 'Professional مجاني حتى سنة لفرق التصميم',
    descriptionAr: 'تمنح Figma الشركات المؤهلة وصول Professional مجانياً أو مخفضاً حتى سنة للتعاون التصميمي.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة مؤهلة تصمم منتجات.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الوصول عبر قنوات Figma.',
        url: 'https://www.figma.com/',
      },
      {
        title: 'استلم Pro حتى سنة',
        description: 'تصميم وFigJam ووضع المطور مجاناً/مخفضاً.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o281',
    slug: 'canva-startups-pro-access',
    name: 'Canva for Startups',
    tagline: 'FREE Pro access for brand & collaboration',
    description:
      'Canva startup programs can provide free or discounted Pro access for brand kits and team collaboration. Pre-seed to Series A, global. Source: startup-perks.com/perks/canva-for-startups/.',
    url: 'https://www.canva.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=canva.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'design', 'branding', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early startup (pre-seed to Series A) needing brand design.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request Pro access through Canva startup channels.',
        url: 'https://www.canva.com/',
      },
      {
        title: 'Get Pro access',
        description: 'Brand kits, background remover, and team folders free/discounted.',
      },
    ],
    nameAr: 'Canva للشركات الناشئة',
    taglineAr: 'وصول Pro مجاني للهوية والتعاون',
    descriptionAr: 'تمنح Canva وصول Pro مجانياً أو مخفضاً لعدة الهوية وتعاون الفرق.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تحتاج تصميم الهوية.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب وصول Pro عبر قنوات Canva.',
        url: 'https://www.canva.com/',
      },
      {
        title: 'استلم وصول Pro',
        description: 'عدة هوية وإزالة خلفية ومجلدات مجاناً/مخفضاً.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o282',
    slug: 'webflow-startups-workspace-plans',
    name: 'Webflow for Startups',
    tagline: 'FREE/discounted workspace & publishing plans',
    description:
      'Webflow startup support can include free or discounted workspace and site publishing plans for early teams. Pre-seed to Series A, global. Source: startup-perks.com/perks/webflow-for-startups/.',
    url: 'https://webflow.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=webflow.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'discount', 'design', 'cms', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early team (pre-seed to Series A) building marketing sites.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request plans through Webflow startup channels.',
        url: 'https://webflow.com/',
      },
      {
        title: 'Get workspace plans',
        description: 'Designer, CMS, and hosting plans free/discounted.',
      },
    ],
    nameAr: 'Webflow للشركات الناشئة',
    taglineAr: 'مساحات عمل ونشر مجانية/مخفضة',
    descriptionAr: 'تمنح Webflow مساحات عمل وخطط نشر مجانية أو مخفضة للفرق المبكرة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق مبكر يبني مواقع تسويقية.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الخطط عبر قنوات Webflow.',
        url: 'https://webflow.com/',
      },
      {
        title: 'استلم خطط مساحة العمل',
        description: 'مصمم وCMS واستضافة مجاناً/مخفضاً.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o283',
    slug: 'typeform-startups-plan-discounts',
    name: 'Typeform for Startups',
    tagline: 'FREE/discounted plans for forms & surveys',
    description:
      'Typeform startup offers may include free periods or discounted plans for forms and survey workflows. Pre-seed to Series A, global. Source: startup-perks.com/perks/typeform-for-startups/.',
    url: 'https://www.typeform.com/typeform-startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=typeform.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'discount', 'forms', 'surveys', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early startup (pre-seed to Series A) needing forms.',
      },
      {
        title: 'Apply on typeform startups page',
        description: 'Submit via the official page.',
        url: 'https://www.typeform.com/typeform-startups',
      },
      {
        title: 'Get plan discounts',
        description: 'Conversational forms, logic jumps, and integrations free/discounted.',
      },
    ],
    nameAr: 'Typeform للشركات الناشئة',
    taglineAr: 'خطط مجانية/مخفضة للنماذج والاستبيانات',
    descriptionAr: 'تمنح Typeform فترات مجانية أو خططاً مخفضة لسير النماذج والاستبيانات.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تحتاج النماذج.',
      },
      {
        title: 'قدّم في صفحة الشركات',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://www.typeform.com/typeform-startups',
      },
      {
        title: 'استلم خصومات الخطط',
        description: 'نماذج تفاعلية ومنطق وتكاملات مجاناً/مخفضاً.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o284',
    slug: 'amplitude-startups-growth-credits',
    name: 'Amplitude for Startups',
    tagline: 'FREE Growth plan credits for product analytics',
    description:
      'Amplitude startup offerings can include free usage tiers, credits, or discounted Growth plans for early product analytics. Pre-seed to Series A, global. Source: startup-perks.com/perks/amplitude-for-startups/.',
    url: 'https://amplitude.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=amplitude.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'analytics', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early product team (pre-seed to Series A).',
      },
      {
        title: 'Apply on amplitude.com/startups',
        description: 'Submit via the official page.',
        url: 'https://amplitude.com/startups',
      },
      {
        title: 'Get Growth credits',
        description: 'Funnels, retention, and experimentation with credits.',
      },
    ],
    nameAr: 'Amplitude للشركات الناشئة',
    taglineAr: 'رصيد خطة Growth مجاني لتحليلات المنتج',
    descriptionAr: 'تمنح Amplitude طبقات مجانية أو رصيداً أو خطط Growth مخفضة لتحليلات المنتجات المبكرة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق منتج مبكر.',
      },
      {
        title: 'قدّم في amplitude.com/startups',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://amplitude.com/startups',
      },
      {
        title: 'استلم رصيد Growth',
        description: 'مسارات واحتفاظ وتجارب بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o285',
    slug: 'mixpanel-startups-growth-credits',
    name: 'Mixpanel for Startups',
    tagline: 'FREE Growth credits for event analytics',
    description:
      'Mixpanel startup offerings can provide Growth plan credits or discounted analytics for early teams tracking events. Pre-seed to Series A, global. Source: startup-perks.com/perks/mixpanel-for-startups/.',
    url: 'https://mixpanel.com/home/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mixpanel.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'analytics', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early product team (pre-seed to Series A).',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Mixpanel startup channels.',
        url: 'https://mixpanel.com/home/',
      },
      {
        title: 'Get analytics credits',
        description: 'Events, funnels, and cohorts with credits.',
      },
    ],
    nameAr: 'Mixpanel للشركات الناشئة',
    taglineAr: 'رصيد Growth مجاني لتحليل الأحداث',
    descriptionAr: 'تمنح Mixpanel رصيد خطة Growth أو تحليلات مخفضة للفرق المبكرة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق منتج مبكر.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Mixpanel.',
        url: 'https://mixpanel.com/home/',
      },
      {
        title: 'استلم رصيد التحليلات',
        description: 'أحداث ومسارات وشرائح بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o286',
    slug: 'mailchimp-free-plan-startups',
    name: 'Mailchimp Free Plan',
    tagline: 'FREE email marketing with automation & analytics',
    description:
      'Mailchimp free plan: email marketing, automation, and analytics for early audiences. Open to all startups, global. Source: startup-perks.com/perks/mailchimp-free/.',
    url: 'https://mailchimp.com/pricing/free-details/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mailchimp.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'email', 'marketing', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign up free',
        description: 'Create a Mailchimp account - free plan open to all.',
        url: 'https://mailchimp.com/pricing/free-details/',
      },
      {
        title: 'Send free campaigns',
        description: 'Free contacts/month with automation and analytics included.',
      },
      {
        title: 'Upgrade when you grow',
        description: 'Move to paid only when your audience outgrows free.',
      },
    ],
    nameAr: 'الخطة المجانية من Mailchimp',
    taglineAr: 'تسويق بريد مجاني مع أتمتة وتحليلات',
    descriptionAr: 'تمنح الخطة المجانية تسويقاً بريدياً وأتمتة وتحليلات للجماهير المبكرة. مفتوحة للجميع.',
    stepsAr: [
      {
        title: 'سجّل مجاناً',
        description: 'أنشئ حساب Mailchimp - الخطة المجانية للجميع.',
        url: 'https://mailchimp.com/pricing/free-details/',
      },
      {
        title: 'أرسل حملات مجانية',
        description: 'جهات مجانية شهرياً مع أتمتة وتحليلات.',
      },
      {
        title: 'رقِّ عندما تنمو',
        description: 'انتقل للمدفوع فقط عندما يتجاوز جمهورك المجاني.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o287',
    slug: 'mailgun-startups-email-credits',
    name: 'Mailgun for Startups',
    tagline: 'Email sending credits for product & transactional mail',
    description:
      'Mailgun startup programs can include credits or discounted messaging plans for product and transactional email. Pre-seed to Series A, global. Source: startup-perks.com/perks/mailgun-for-startups/.',
    url: 'https://www.mailgun.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mailgun.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'email', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early product (pre-seed to Series A) sending email.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Mailgun startup channels.',
        url: 'https://www.mailgun.com/',
      },
      {
        title: 'Get sending credits',
        description: 'APIs, deliverability, and logs with credits.',
      },
    ],
    nameAr: 'Mailgun للشركات الناشئة',
    taglineAr: 'رصيد إرسال بريد للمنتج والمعاملات',
    descriptionAr: 'تمنح Mailgun رصيداً أو خطط مراسلة مخفضة لبريد المنتج والمعاملات.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'منتج مبكر يرسل بريداً.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Mailgun.',
        url: 'https://www.mailgun.com/',
      },
      {
        title: 'استلم رصيد الإرسال',
        description: 'APIs وقابلية تسليم وسجلات بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o288',
    slug: 'sendgrid-startups-email-credits',
    name: 'SendGrid for Startups',
    tagline: 'Email credits via cloud partner programs',
    description:
      'SendGrid startup access is often available through partner ecosystems and cloud startup programs with messaging credits. Pre-seed to Series A, global. Source: startup-perks.com/perks/sendgrid-for-startups/.',
    url: 'https://sendgrid.com/en-us',
    logoUrl: 'https://www.google.com/s2/favicons?domain=sendgrid.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'email', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Join a partner program',
        description: 'Access flows via cloud partners (e.g. Azure/AWS startup credits ecosystems).',
      },
      {
        title: 'Claim via your program',
        description: 'Redeem messaging credits; start at sendgrid.com.',
        url: 'https://sendgrid.com/en-us',
      },
      {
        title: 'Get email credits',
        description: 'Marketing and transactional email with credits.',
      },
    ],
    nameAr: 'SendGrid للشركات الناشئة',
    taglineAr: 'رصيد بريد عبر برامج الشركاء السحابيين',
    descriptionAr: 'يتاح وصول SendGrid غالباً عبر منظومات الشركاء وبرامج الشركات السحابية مع رصيد مراسلة.',
    stepsAr: [
      {
        title: 'انضم لبرنامج شريك',
        description: 'الوصول يمر عبر شركاء سحابيين.',
      },
      {
        title: 'استلمه عبر برنامجك',
        description: 'استبدل رصيد المراسلة بدءاً من sendgrid.com.',
        url: 'https://sendgrid.com/en-us',
      },
      {
        title: 'استلم رصيد البريد',
        description: 'بريد تسويقي ومعاملات بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o289',
    slug: 'postmark-startups-email-pricing',
    name: 'Postmark for Startups',
    tagline: 'Startup pricing for reliable transactional email',
    description:
      'Postmark startup offerings can include startup-friendly pricing for reliable transactional email delivery with no upcharges. Pre-seed to Series A, global. Source: startup-perks.com/perks/postmark-startup/.',
    url: 'https://postmarkapp.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=postmarkapp.com&sz=64',
    category: 'startup-discounts',
    tags: ['discount', 'email', 'transactional', 'startup-perks'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early product (pre-seed to Series A) sending transactional mail.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request pricing through Postmark startup channels.',
        url: 'https://postmarkapp.com/',
      },
      {
        title: 'Get reliable delivery',
        description: 'Fast inbox delivery, templates, and streams at startup rates.',
      },
    ],
    nameAr: 'Postmark للشركات الناشئة',
    taglineAr: 'أسعار ناشئة لبريد معاملات موثوق',
    descriptionAr: 'تمنح Postmark أسعاراً مناسبة لتسليم بريد المعاملات الموثوق دون رسوم إضافية.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'منتج مبكر يرسل بريد معاملات.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الأسعار عبر قنوات Postmark.',
        url: 'https://postmarkapp.com/',
      },
      {
        title: 'استلم التسليم الموثوق',
        description: 'تسليم سريع وقوالب وتدفقات بأسعار ناشئة.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o290',
    slug: 'convertkit-creators-email-pricing',
    name: 'ConvertKit for Creators',
    tagline: 'Creator pricing to build & grow audiences',
    description:
      'ConvertKit startup/creator offerings can include discounted email marketing to build and grow audiences. Pre-seed to Series A, global. Source: startup-perks.com/perks/convertkit-creator/.',
    url: 'https://convertkit.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=convertkit.com&sz=64',
    category: 'startup-discounts',
    tags: ['discount', 'email', 'creators', 'startup-perks'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early creator/startup (pre-seed to Series A) building an audience.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request pricing through ConvertKit channels.',
        url: 'https://convertkit.com/',
      },
      {
        title: 'Get creator pricing',
        description: 'Sequences, automations, and landing pages at startup rates.',
      },
    ],
    nameAr: 'ConvertKit للمبدعين',
    taglineAr: 'أسعار مبدعين لبناء الجمهور وتنميته',
    descriptionAr: 'تمنح ConvertKit تسويقاً بريدياً مخفضاً لبناء الجمهور وتنميته.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'مبدع/شركة مبكرة تبني جمهوراً.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الأسعار عبر قنوات ConvertKit.',
        url: 'https://convertkit.com/',
      },
      {
        title: 'استلم أسعار المبدعين',
        description: 'سلاسل وأتمتة وصفحات هبوط بأسعار ناشئة.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o291',
    slug: 'lokalise-startups-localization',
    name: 'Lokalise for Startups',
    tagline: 'Startup discount for translation management',
    description:
      'Lokalise startup offerings can include discounted translation management to automate and collaborate on localization. Pre-seed to Series A, global. Source: startup-perks.com/perks/lokalise-startup/.',
    url: 'https://lokalise.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=lokalise.com&sz=64',
    category: 'startup-discounts',
    tags: ['discount', 'localization', 'translation', 'startup-perks'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early global startup (pre-seed to Series A) localizing products.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request discount through Lokalise startup channels.',
        url: 'https://lokalise.com/',
      },
      {
        title: 'Get localization discount',
        description: 'Keys, automation, and translator collaboration at startup rates.',
      },
    ],
    nameAr: 'Lokalise للشركات الناشئة',
    taglineAr: 'خصم ناشئ لإدارة الترجمة',
    descriptionAr: 'تمنح Lokalise خصماً لإدارة الترجمة لأتمتة مشاريع التوطين والتعاون عليها.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة عالمية مبكرة توطّن منتجاتها.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الخصم عبر قنوات Lokalise.',
        url: 'https://lokalise.com/',
      },
      {
        title: 'استلم خصم التوطين',
        description: 'مفاتيح وأتمتة وتعاون مترجمين بأسعار ناشئة.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o292',
    slug: 'phrase-startups-localization',
    name: 'Phrase for Startups',
    tagline: 'Startup pricing for enterprise localization',
    description:
      'Phrase startup offerings can include startup pricing for the enterprise localization platform - scale without seat limits or vendor lock-in. Pre-seed to Series A, global. Source: startup-perks.com/perks/phrase-startup/.',
    url: 'https://phrase.com/pricing/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=phrase.com&sz=64',
    category: 'startup-discounts',
    tags: ['discount', 'localization', 'startup-perks'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early global startup (pre-seed to Series A).',
      },
      {
        title: 'Apply via startup program',
        description: 'Request pricing through Phrase startup channels.',
        url: 'https://phrase.com/pricing/',
      },
      {
        title: 'Get localization pricing',
        description: 'Strings, MT, and workflows at startup rates.',
      },
    ],
    nameAr: 'Phrase للشركات الناشئة',
    taglineAr: 'أسعار ناشئة للتوطين المؤسسي',
    descriptionAr: 'تمنح Phrase أسعاراً ناشئة لمنصة التوطين المؤسسية - توسّع دون حدود مقاعد أو احتكار.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة عالمية مبكرة.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الأسعار عبر قنوات Phrase.',
        url: 'https://phrase.com/pricing/',
      },
      {
        title: 'استلم أسعار التوطين',
        description: 'نصوص وترجمة آلية وسير بأسعار ناشئة.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o293',
    slug: 'deel-startups-hiring-credits',
    name: 'Deel for Startups',
    tagline: '$5,000 credits via Techstars for global hiring',
    description:
      'Deel startup offerings can include $5,000 credits (via Techstars) for the global hiring and payroll platform - hire, pay, manage worldwide. Pre-seed to Series A, global. Source: startup-perks.com/perks/deel-startup/.',
    url: 'https://www.deel.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=deel.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', '5000', 'hr', 'payroll', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early startup (pre-seed to Series A) hiring globally; $5k via Techstars.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request credits through Deel/Techstars channels.',
        url: 'https://www.deel.com',
      },
      {
        title: 'Get hiring credits',
        description: 'Contracts, payroll, and compliance with credits.',
      },
    ],
    nameAr: 'Deel للشركات الناشئة',
    taglineAr: '5,000$ رصيد عبر Techstars للتوظيف العالمي',
    descriptionAr: 'تمنح Deel حتى 5,000$ رصيد (عبر Techstars) لمنصة التوظيف والرواتب العالمية.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة توظف عالمياً؛ 5 آلاف $ عبر Techstars.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرصيد عبر قنوات Deel/Techstars.',
        url: 'https://www.deel.com',
      },
      {
        title: 'استلم رصيد التوظيف',
        description: 'عقود ورواتب وامتثال بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o294',
    slug: 'gusto-startups-payroll-pricing',
    name: 'Gusto for Startups',
    tagline: 'Startup pricing for payroll, benefits & HR',
    description:
      'Gusto startup offerings can include startup-friendly pricing for payroll, benefits, and HR that runs payroll in minutes. Pre-seed to Series A, global. Source: startup-perks.com/perks/gusto-startup/.',
    url: 'https://gusto.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=gusto.com&sz=64',
    category: 'startup-discounts',
    tags: ['discount', 'payroll', 'hr', 'startup-perks'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early startup (pre-seed to Series A) running payroll.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request pricing through Gusto startup channels.',
        url: 'https://gusto.com/',
      },
      {
        title: 'Get payroll pricing',
        description: 'Payroll, benefits, onboarding at startup rates.',
      },
    ],
    nameAr: 'Gusto للشركات الناشئة',
    taglineAr: 'أسعار ناشئة للرواتب والمزايا والموارد',
    descriptionAr: 'تمنح Gusto أسعاراً مناسبة للرواتب والمزايا والموارد البشرية بدقائق.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تدير الرواتب.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الأسعار عبر قنوات Gusto.',
        url: 'https://gusto.com/',
      },
      {
        title: 'استلم أسعار الرواتب',
        description: 'رواتب ومزايا وتأهيل بأسعار ناشئة.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o295',
    slug: 'rippling-startups-6mo-free',
    name: 'Rippling for Startups',
    tagline: '6 months FREE via accelerators - HR, IT & spend',
    description:
      'Rippling startup offerings can include 6 months free for accelerator startups on the all-in-one HR, IT, and spend platform. Pre-seed to Series A, global. Source: startup-perks.com/perks/rippling-startup/.',
    url: 'https://www.rippling.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=rippling.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', '6-months', 'hr', 'it', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Accelerator startup (pre-seed to Series A) needing HR/IT.',
      },
      {
        title: 'Apply via accelerator',
        description: 'Request Rippling offer through your accelerator.',
        url: 'https://www.rippling.com/',
      },
      {
        title: 'Get 6 months free',
        description: 'HR, devices, apps, and spend free for 6 months.',
      },
    ],
    nameAr: 'Rippling للشركات الناشئة',
    taglineAr: '6 أشهر مجاناً عبر المسرّعات - موارد وتقنية وإنفاق',
    descriptionAr: 'تمنح Rippling حتى 6 أشهر مجانية لشركات المسرّعات على منصة الموارد والتقنية والإنفاق الشاملة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مسرّعة تحتاج الموارد/التقنية.',
      },
      {
        title: 'قدّم عبر المسرّعة',
        description: 'اطلب العرض عبر مسرّعتك.',
        url: 'https://www.rippling.com/',
      },
      {
        title: 'استلم 6 أشهر مجاناً',
        description: 'موارد وأجهزة وتطبيقات وإنفاق مجاناً 6 أشهر.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o296',
    slug: 'siemens-startups-iot-benefits',
    name: 'Siemens for Startups',
    tagline: 'Industrial IoT & automation access for startups',
    description:
      'Siemens startup offerings can include technology access for industrial IoT and automation applications. Pre-seed to Series B; Global, Europe, North America. Source: startup-perks.com/perks/siemens-startup/.',
    url: 'https://www.siemens.com/startups',
    logoUrl: 'https://www.google.com/s2/favicons?domain=siemens.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'iot', 'industrial', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early industrial/IoT startup (pre-seed to Series B).',
      },
      {
        title: 'Apply on siemens.com startups',
        description: 'Submit via the official page.',
        url: 'https://www.siemens.com/startups',
      },
      {
        title: 'Get technology access',
        description: 'IoT platforms, automation, and partnership routes.',
      },
    ],
    nameAr: 'Siemens للشركات الناشئة',
    taglineAr: 'وصول إنترنت الأشياء الصناعية والأتمتة',
    descriptionAr: 'تمنح Siemens وصولاً تقنياً لتطبيقات إنترنت الأشياء الصناعية والأتمتة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة صناعية/إنترنت أشياء مبكرة.',
      },
      {
        title: 'قدّم في siemens.com/startups',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://www.siemens.com/startups',
      },
      {
        title: 'استلم الوصول التقني',
        description: 'منصات إنترنت أشياء وأتمتة وشراكات.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o297',
    slug: 'ibm-cloud-startups-credits',
    name: 'IBM Cloud for Startups',
    tagline: 'Enterprise cloud + AI credits for startups',
    description:
      'IBM Cloud startup offerings can include credits for enterprise-grade cloud infrastructure and AI services. Pre-seed to Series B, global. Source: startup-perks.com/perks/ibm-cloud-startup/.',
    url: 'https://www.ibm.com/cloud/startups',
    logoUrl: '/logos/ibm.svg',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'cloud', 'ai', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early startup (pre-seed to Series B) building on cloud/AI.',
      },
      {
        title: 'Apply on ibm.com startups',
        description: 'Submit via the official page.',
        url: 'https://www.ibm.com/cloud/startups',
      },
      {
        title: 'Get cloud credits',
        description: 'Compute, watsonx AI, and data services with credits.',
      },
    ],
    nameAr: 'IBM Cloud للشركات الناشئة',
    taglineAr: 'رصيد سحابة مؤسسية + ذكاء اصطناعي',
    descriptionAr: 'تمنح IBM رصيداً لسحابة مؤسسية وخدمات ذكاء اصطناعي للشركات الناشئة.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تبني على السحابة/الذكاء الاصطناعي.',
      },
      {
        title: 'قدّم في ibm.com/startups',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://www.ibm.com/cloud/startups',
      },
      {
        title: 'استلم الرصيد السحابي',
        description: 'حوسبة وwatsonx وبيانات بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o298',
    slug: 'oracle-startups-cloud-mentorship',
    name: 'Oracle for Startups',
    tagline: 'Cloud credits + mentorship on global infra',
    description:
      'Oracle startup offerings can include cloud credits and mentorship for building on global Oracle Cloud infrastructure. Pre-seed to Series A, global. Source: startup-perks.com/perks/oracle-cloud-startup/.',
    url: 'https://www.oracle.com/cloud/oracle-for-startups/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=oracle.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'cloud', 'mentorship', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early startup (pre-seed to Series A) building on cloud.',
      },
      {
        title: 'Apply on oracle startups page',
        description: 'Submit via the official page.',
        url: 'https://www.oracle.com/cloud/oracle-for-startups/',
      },
      {
        title: 'Get credits + mentors',
        description: 'OCI credits plus technical and GTM mentorship.',
      },
    ],
    nameAr: 'Oracle للشركات الناشئة',
    taglineAr: 'رصيد سحابي + إرشاد على بنية عالمية',
    descriptionAr: 'تمنح Oracle رصيداً سحابياً وإرشاداً للبناء على بنيتها العالمية.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة تبني على السحابة.',
      },
      {
        title: 'قدّم في صفحة Oracle',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://www.oracle.com/cloud/oracle-for-startups/',
      },
      {
        title: 'استلم الرصيد والإرشاد',
        description: 'رصيد OCI + إرشاد تقني وتسويقي.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o299',
    slug: 'cleura-startups-sovereign-cloud',
    name: 'Cleura Startup Program',
    tagline: 'European sovereign cloud credits (open-source)',
    description:
      'Cleura startup offerings can include sovereign European cloud credits to build fast and stay compliant on open-source foundations. Pre-seed to Series A, Europe. Source: startup-perks.com/perks/cleura-startup/.',
    url: 'https://cleura.com/cleura-startup-program/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=cleura.com&sz=64',
    category: 'startup-discounts',
    tags: ['free', 'credits', 'cloud', 'europe', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early European startup (pre-seed to Series A) needing compliant cloud.',
      },
      {
        title: 'Apply on cleura startup page',
        description: 'Submit via the official page.',
        url: 'https://cleura.com/cleura-startup-program/',
      },
      {
        title: 'Get sovereign credits',
        description: 'OpenStack-based compute, storage, and Kubernetes with credits.',
      },
    ],
    nameAr: 'Cleura للشركات الناشئة',
    taglineAr: 'رصيد سحابة أوروبية سيادية (مفتوحة المصدر)',
    descriptionAr: 'تمنح Cleura رصيد سحابة أوروبية سيادية للبناء السريع مع الامتثال على أسس مفتوحة المصدر.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة أوروبية مبكرة تحتاج سحابة ممتثلة.',
      },
      {
        title: 'قدّم في صفحة Cleura',
        description: 'أرسل طلبك في الصفحة الرسمية.',
        url: 'https://cleura.com/cleura-startup-program/',
      },
      {
        title: 'استلم الرصيد السيادي',
        description: 'حوسبة وتخزين وKubernetes بالرصيد.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o300',
    slug: 'warp-startups-ai-terminal',
    name: 'Warp for Startups',
    tagline: 'Startup pricing for the AI-powered terminal',
    description:
      'Warp startup offerings can include startup-friendly pricing for the AI terminal with commands and workflows. Pre-seed to Series A, global. Source: startup-perks.com/perks/warp-startup/.',
    url: 'https://warp.dev/pricing',
    logoUrl: 'https://www.google.com/s2/favicons?domain=warp.dev&sz=64',
    category: 'startup-discounts',
    tags: ['discount', 'terminal', 'ai', 'devtools', 'startup-perks'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early dev team (pre-seed to Series A) living in the terminal.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request pricing through Warp startup channels.',
        url: 'https://warp.dev/pricing',
      },
      {
        title: 'Get terminal pricing',
        description: 'AI commands, notebooks, and team sharing at startup rates.',
      },
    ],
    nameAr: 'Warp للشركات الناشئة',
    taglineAr: 'أسعار ناشئة للطرفية المدعومة بالذكاء الاصطناعي',
    descriptionAr: 'تمنح Warp أسعاراً مناسبة للطرفية الذكية مع أوامر وسير عمل.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'فريق تطوير مبكر يعيش في الطرفية.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الأسعار عبر قنوات Warp.',
        url: 'https://warp.dev/pricing',
      },
      {
        title: 'استلم أسعار الطرفية',
        description: 'أوامر ذكية ودفاتر ومشاركة بأسعار ناشئة.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o301',
    slug: 'zoom-startups-comm-discounts',
    name: 'Zoom for Startups',
    tagline: 'Discounted/free licenses for team communication',
    description:
      'Zoom startup-focused offerings can include discounted or free licenses through approved startup channels for meetings and phone. Pre-seed to Series A, global. Source: startup-perks.com/perks/zoom-for-startups/.',
    url: 'https://www.zoom.com/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=zoom.com&sz=64',
    category: 'startup-discounts',
    tags: ['discount', 'free', 'meetings', 'collaboration', 'startup-perks'],
    pricing: 'free',
    steps: [
      {
        title: 'Confirm eligibility',
        description: 'Early startup (pre-seed to Series A) in approved channels.',
      },
      {
        title: 'Apply via startup program',
        description: 'Request licenses through Zoom startup channels.',
        url: 'https://www.zoom.com/',
      },
      {
        title: 'Get comm licenses',
        description: 'Meetings, phone, and whiteboard discounted/free.',
      },
    ],
    nameAr: 'Zoom للشركات الناشئة',
    taglineAr: 'رخص مخفضة/مجانية لاتصالات الفريق',
    descriptionAr: 'تمنح Zoom رخصاً مخفضة أو مجانية عبر قنوات شركات معتمدة للاجتماعات والهاتف.',
    stepsAr: [
      {
        title: 'تأكد من الأهلية',
        description: 'شركة مبكرة في قنوات معتمدة.',
      },
      {
        title: 'قدّم عبر برنامج الشركات',
        description: 'اطلب الرخص عبر قنوات Zoom.',
        url: 'https://www.zoom.com/',
      },
      {
        title: 'استلم رخص الاتصال',
        description: 'اجتماعات وهاتف وسبورة مخفضة/مجانية.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o302',
    slug: '4dx-ventures-africa-seed',
    name: '4DX Ventures',
    tagline: 'Africa-focused VC - Pre-Seed to Series A, $50K-$500K',
    description:
      '4DX Ventures invests pre-seed to Series A ($50K-$500K) in African startups - offices/presence in Accra, Cairo, Nairobi - fintech, logistics, food & ag. Best VC-sheet fit for Moroccan founders targeting African markets. Source: vcsheet.com/fund/4dx-ventures.',
    url: 'https://www.4dxventures.com',
    logoUrl: 'https://www.google.com/s2/favicons?domain=4dxventures.com&sz=64',
    category: 'forstartups',
    tags: ['vc', 'africa', 'morocco', 'pre-seed', 'seed', 'fintech', 'fundraising'],
    pricing: 'free',
    steps: [
      {
        title: 'Check thesis fit',
        description: 'African market, pre-seed to Series A, fintech/logistics/ag - raising $50K-$500K. Prepare a deck with African traction.',
      },
      {
        title: 'Apply on 4dxventures.com',
        description: 'Submit your deck via the official site contact/application route.',
        url: 'https://www.4dxventures.com',
      },
      {
        title: 'Pitch Cairo/Nairobi network',
        description: 'Warm intros via their portfolio or African accelerators raise your odds - follow up with metrics.',
      },
    ],
    nameAr: '4DX Ventures',
    taglineAr: 'صندوق إفريقي - Pre-Seed إلى Series A، 50K-500K$',
    descriptionAr: 'يستثمر 4DX Ventures من pre-seed إلى Series A (50K-500K$) في الشركات الإفريقية - أكرا والقاهرة ونيروبي - تقنية مالية ولوجستيك وأغذية. أنسب صندوق في VC Sheet للمؤسسين المغاربة.',
    stepsAr: [
      {
        title: 'تأكد من التوافق',
        description: 'سوق إفريقية، pre-seed إلى Series A، مبلغ 50K-500K$ - حضّر عرضاً بزخم إفريقي.',
      },
      {
        title: 'قدّم في 4dxventures.com',
        description: 'أرسل عرضك عبر الموقع الرسمي.',
        url: 'https://www.4dxventures.com',
      },
      {
        title: 'اعرض على شبكة القاهرة/نيروبي',
        description: 'تعريف دافئ عبر المحفظة أو المسرّعات الإفريقية يرفع حظوظك - تابع بالأرقام.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o303',
    slug: '500-global-mena-accelerator',
    name: '500 Global',
    tagline: 'Global accelerator + fund - Pre-Seed to Series A, $100K-$5M',
    description:
      '500 Global runs accelerators and seed funds worldwide including MENA programs - invests $100K-$5M pre-seed to Series A in fintech, SaaS, consumer. Strong route for Moroccan founders via 500 MENA batches. Source: vcsheet.com/fund/500-global.',
    url: 'https://500.co/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=500.co&sz=64',
    category: 'forstartups',
    tags: ['vc', 'accelerator', 'mena', 'morocco', 'seed', 'fundraising'],
    pricing: 'free',
    steps: [
      {
        title: 'Pick a batch route',
        description: 'Apply to a 500 Global accelerator batch (incl. MENA) or pitch the seed fund directly - pre-seed to Series A.',
      },
      {
        title: 'Apply on 500.co',
        description: 'Submit your startup on the official site with deck, traction, and team.',
        url: 'https://500.co/',
      },
      {
        title: 'Use the $100K-$5M range',
        description: 'Size your ask to stage: pre-seed ~$100K+, seed larger - show non-Silicon-Valley growth story.',
      },
    ],
    nameAr: '500 Global',
    taglineAr: 'مسرّعة عالمية + صندوق - Pre-Seed إلى Series A، 100K-5M$',
    descriptionAr: 'تدير 500 Global مسرّعات وصناديق عالمياً تشمل برامج MENA - تستثمر 100K-5M$ في التقنية المالية وSaaS والاستهلاك. طريق قوي للمغاربة عبر دفعات MENA.',
    stepsAr: [
      {
        title: 'اختر مسار الدفعة',
        description: 'قدّم لدفعة مسرّعة (تشمل MENA) أو اعرض على الصندوق مباشرة.',
      },
      {
        title: 'قدّم في 500.co',
        description: 'أرسل شركتك مع العرض والزخم والفريق.',
        url: 'https://500.co/',
      },
      {
        title: 'حدد مبلغك 100K-5M$',
        description: 'اطلب حسب المرحلة وأظهر قصة نمو خارج وادي السيليكون.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o304',
    slug: 'antler-day-zero-preseed',
    name: 'Antler',
    tagline: 'Day-zero pre-seed - $125K, 8-10 week residencies',
    description:
      'Antler invests at day zero (pre-idea/pre-team): 8-10 week residencies across 30+ cities match co-founders and pressure-test teams before a $125K pre-seed check. Ideal for Moroccan founders at idea stage. Source: vcsheet.com/fund/antler.',
    url: 'https://www.antler.co/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=antler.co&sz=64',
    category: 'forstartups',
    tags: ['vc', 'pre-seed', '125k', 'residency', 'co-founder', 'fundraising'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply with or without an idea',
        description: 'Antler accepts pre-idea founders - apply with your profile and ambition.',
        url: 'https://www.antler.co/',
      },
      {
        title: 'Join an 8-10 week residency',
        description: 'Get matched with co-founders and pressure-test the team and idea in a cohort.',
      },
      {
        title: 'Get the $125K check',
        description: 'Investable teams receive ~$125K pre-seed on demo day - keep building traction.',
      },
    ],
    nameAr: 'Antler',
    taglineAr: 'ما قبل الفكرة - 125K$ وإقامات 8-10 أسابيع',
    descriptionAr: 'تستثمر Antler من اليوم صفر (قبل الفكرة/الفريق): إقامات 8-10 أسابيع في +30 مدينة تجمع الشركاء وتختبر الفرق قبل شيك 125K$. مثالية للمغاربة في مرحلة الفكرة.',
    stepsAr: [
      {
        title: 'قدّم بفكرة أو دونها',
        description: 'تقبل Antler مؤسسين قبل الفكرة - قدّم بملفك وطموحك.',
        url: 'https://www.antler.co/',
      },
      {
        title: 'انضم لإقامة 8-10 أسابيع',
        description: 'التقِ بشركاء واختبر الفريق والفكرة ضمن دفعة.',
      },
      {
        title: 'استلم شيك 125K$',
        description: 'تحصل الفرق القابلة للاستثمار على ~125K$ يوم العرض.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o305',
    slug: 'bootstrap-playbook-licorne-society',
    name: 'Bootstrap Playbook - Build Without Fundraising',
    tagline: 'FREE guide - grow on revenue like 100+ bootstrapped startups',
    description:
      'Free bootstrapping playbook from Licorne Society data: what a bootstrap startup is (autofinancement - growth on revenue, founders keep 100%), pros (no investor pressure, full control) vs cons (no capital, no board), plus the Bootstrap Club bar: €2M+ revenue, 80%+ founder-owned, profitable, 20+ staff, 30%+ headcount growth. Source: licornesociety.com bootstrap list.',
    url: 'https://www.licornesociety.com/startup-lists/les-startups-bootstrap',
    logoUrl: 'https://www.google.com/s2/favicons?domain=licornesociety.com&sz=64',
    category: 'guide',
    tags: ['guide', 'bootstrap', 'free', 'autofinancement', 'profitability', 'forstartups'],
    pricing: 'free',
    steps: [
      {
        title: 'Decide: raise or bootstrap',
        description: 'Bootstrap = founders keep 100%, no investor pressure, full control - but no capital cushion and no investor board. Read the full definition on the source page.',
        url: 'https://www.licornesociety.com/startup-lists/les-startups-bootstrap',
      },
      {
        title: 'Grow on revenue from day one',
        description: 'Sell early, price for margin, reinvest turnover into growth - produce maximum with minimum (autofinancement).',
      },
      {
        title: 'Aim for the Bootstrap Club bar',
        description: 'Targets: €2M+ revenue, 80%+ founder-owned, profitable/cash-positive, 20+ full-time staff, 30%+ yearly headcount growth.',
      },
      {
        title: 'Study the 34 exemplars',
        description: 'Crisp, lemlist, Lucca, Superprof, Partoo and more below - copy their revenue-first tactics.',
      },
    ],
    nameAr: 'دليل البوتستراب - ابنِ دون جمع تمويل',
    taglineAr: 'دليل مجاني - انمُ بالإيرادات مثل +100 شركة ممولة ذاتياً',
    descriptionAr: 'دليل تمويل ذاتي مجاني: ما هي startup bootstrap (نمو بالإيرادات والملكية 100% للمؤسسين)، المزايا (لا ضغط مستثمرين وتحكم كامل) مقابل العيوب، ومعايير نادي البوتستراب: +2م€ إيرادات و+80% ملكية وربحية و+20 موظفاً ونمو 30%.',
    stepsAr: [
      {
        title: 'قرر: اجمع تمويلاً أم موّل ذاتياً',
        description: 'التمويل الذاتي = ملكية 100% ولا ضغط مستثمرين وتحكم كامل - لكن دون وسادة رأس مال. اقرأ التعريف الكامل في الصفحة.',
        url: 'https://www.licornesociety.com/startup-lists/les-startups-bootstrap',
      },
      {
        title: 'انمُ بالإيرادات من اليوم الأول',
        description: 'بِع مبكراً وسعّر بهامش وأعد استثمار رقم الأعمال - أقصى إنتاج بأدنى موارد.',
      },
      {
        title: 'استهدف معايير النادي',
        description: 'الأهداف: +2م€ إيرادات و+80% ملكية وربحية و+20 موظفاً ونمو 30% سنوياً.',
      },
      {
        title: 'ادرس الأمثلة الـ34',
        description: 'Crisp وlemlist وLucca وSuperprof وغيرها بالأسفل - انسخ تكتيكات الإيرادات أولاً.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  // --- MVP paid guide: direct virement + WhatsApp delivery ---
  {
    id: 'g1',
    slug: 'edu-proof-master-guide-pro',
    name: 'EDU Proof Master Guide PRO',
    tagline: 'Get verified student offers step-by-step — full PDF playbook',
    description:
      'The complete PRO playbook: which US community college to pick, exact application clicks, how to get your .EDU mailbox + student ID + enrollment letter in 24-72h, and the order to claim 40+ offers (GitHub Pack, Azure $100, AWS $100, JetBrains, Figma). Includes templates, troubleshooting, and renewal checklist. Pay by virement, send the receipt on WhatsApp, receive the PDF on WhatsApp.',
    url: '/guides/edu-proof-master-guide-pro',
    logoUrl: 'https://icons.duckduckgo.com/ip3/education.github.com.ico',
    category: 'guide',
    tags: ['guide', 'edu', 'student-pack', 'pdf', 'pro'],
    pricing: 'paid',
    price: 99,
    currency: 'MAD',
    pages: 42,
    level: 'beginner',
    rating: 4.9,
    reviewsCount: 12,
    guarantee: '7-day refund if the guide does not help you',
    steps: [
      {
        title: 'Pay by virement (99 MAD)',
        description:
          'Send 99 MAD to the RIB shown on the guide page. Keep the receipt / screenshot — you will need it in step 2.',
      },
      {
        title: 'Send “Hi, I paid” + receipt on WhatsApp',
        description:
          'Tap the WhatsApp button on the guide page and send your payment receipt. We confirm within a few hours.',
      },
      {
        title: 'Receive the PDF on WhatsApp',
        description:
          'We send you the full 42-page PDF directly on WhatsApp + free updates for 30 days.',
      },
      {
        title: 'FREE glimpse — what is an .EDU proof?',
        description:
          'Student offers verify you 3 ways: school email (.EDU), student ID, enrollment letter. This free chapter explains which proof each platform (GitHub, Azure, AWS, SheerID) accepts. The full college list + click-paths are in the paid PDF.',
      },
    ],
    nameAr: 'دليل إثبات الطالب PRO',
    taglineAr: 'احصل على عروض الطلاب خطوة بخطوة — دليل PDF كامل',
    descriptionAr: 'الدليل الكامل: أي كلية تختار، النقرات الدقيقة، كيف تحصل على بريد .EDU + بطاقة الطالب + خطاب التسجيل خلال 24-72 ساعة، وترتيب المطالبة بأكثر من 40 عرضاً. ادفع بالتحويل، أرسل الوصل على واتساب، واستلم PDF على واتساب.',
    stepsAr: [
      {
        title: 'ادفع بالتحويل (99 درهم)',
        description: 'أرسل 99 درهم إلى RIB الموجود في صفحة الدليل. احتفظ بالوصل.',
      },
      {
        title: 'أرسل "سلام، خلّصت" + الوصل على واتساب',
        description: 'اضغط زر واتساب وأرسل صورة الوصل. نؤكد لك خلال ساعات.',
      },
      {
        title: 'استلم PDF على واتساب',
        description: 'نرسل لك PDF الكامل (42 صفحة) على واتساب + تحديثات مجانية 30 يوماً.',
      },
      {
        title: 'نظرة مجانية — ما هو إثبات الطالب؟',
        description: 'المنصات تتحقق بثلاث طرق: بريد .EDU، بطاقة الطالب، خطاب التسجيل. هذا الفصل المجاني يشرح ماذا يقبل كل موقع. لائحة الكليات الكاملة في PDF المدفوع.',
      },
    ],
    upvotes: 5,
    bookmarks: 8,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  // --- AI Perks (startup AI credits - deduplicated vs existing offers) ---
  {
    id: 'o306',
    slug: 'assemblyai-startup-program',
    name: 'AssemblyAI for Startups',
    tagline: 'Up to $150,000 in speech-to-text API credits for startups',
    description:
      'AssemblyAI Startup Program offers up to $150,000 in API credits for transcription, speaker diarization, and sentiment analysis. State-of-the-art Universal speech-to-text model plus LeMUR for LLM-powered analysis of transcripts, real-time transcription, and 30+ language support. Apply with your startup details; approval is for early-stage startups.',
    url: 'https://assemblyai.com/contact/startup-program',
    logoUrl: 'https://icons.duckduckgo.com/ip3/assemblyai.com.ico',
    category: 'ai-perks',
    tags: ['speech-to-text', 'transcription', 'startup-credits', 'api'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open the startup program page',
        description: 'Visit the AssemblyAI startup program page and review eligibility (early-stage startup).',
        url: 'https://assemblyai.com/contact/startup-program',
      },
      {
        title: 'Submit your startup details',
        description: 'Fill the contact form with company name, website, funding stage, and speech AI use case.',
      },
      {
        title: 'Get credits and build',
        description: 'Once approved, credits are applied to your AssemblyAI account. Use the API for transcription + LeMUR analysis.',
      },
    ],
    nameAr: 'AssemblyAI للشركات الناشئة',
    taglineAr: 'حتى 150,000$ رصيد API لتحويل الكلام إلى نص للستارتاپ',
    descriptionAr: 'برنامج AssemblyAI يمنح حتى 150,000$ رصيد لواجهة النسخ الصوتي وتحديد المتحدثين وتحليل المشاعر، مع نموذج Universal و LeMUR للتحليل بالذكاء الاصطناعي.',
    stepsAr: [
      {
        title: 'افتح صفحة البرنامج',
        description: 'اذهب إلى صفحة ستارتاپ AssemblyAI وراجع الشروط.',
        url: 'https://assemblyai.com/contact/startup-program',
      },
      {
        title: 'أرسل بيانات شركتك',
        description: 'املأ النموذج باسم الشركة والموقع ومرحلة التمويل وحالة الاستخدام.',
      },
      {
        title: 'احصل على الرصيد وابنِ',
        description: 'بعد الموافقة يُضاف الرصيد لحسابك واستخدم API للنسخ والتحليل.',
      },
    ],
    upvotes: 8,
    bookmarks: 12,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o307',
    slug: 'deepgram-startup-program',
    name: 'Deepgram for Startups',
    tagline: '12 months of speech recognition credits (up to $100,000 value)',
    description:
      'Deepgram Startup Program gives qualifying startups 12 months of speech recognition credits. Industry-leading accuracy and speed for real-time transcription, voice analytics, and speech understanding, with 30+ languages and custom models. Requires startup verification.',
    url: 'https://deepgram.com/startup-program',
    logoUrl: 'https://icons.duckduckgo.com/ip3/deepgram.com.ico',
    category: 'ai-perks',
    tags: ['speech-to-text', 'voice-ai', 'startup-credits', 'api'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open the startup program page',
        description: 'Visit deepgram.com/startup-program and check qualification criteria.',
        url: 'https://deepgram.com/startup-program',
      },
      {
        title: 'Apply with your startup profile',
        description: 'Submit company info, pitch deck or website, and your voice AI use case.',
      },
      {
        title: 'Integrate the API',
        description: 'Once approved, use the credits for real-time or batch transcription in your app.',
      },
    ],
    nameAr: 'Deepgram للشركات الناشئة',
    taglineAr: '12 شهراً من رصيد التعرف على الكلام (حتى 100,000$)',
    descriptionAr: 'يمنح برنامج Deepgram الشركات المؤهلة 12 شهراً من رصيد النسخ الصوتي بدقة وسرعة عالية مع دعم 30+ لغة.',
    stepsAr: [
      {
        title: 'افتح صفحة البرنامج',
        description: 'اذهب إلى deepgram.com/startup-program وتحقق من الشروط.',
        url: 'https://deepgram.com/startup-program',
      },
      {
        title: 'قدّم بملف شركتك',
        description: 'أرسل معلومات الشركة والموقع وحالة الاستخدام الصوتي.',
      },
      {
        title: 'ادمج API',
        description: 'بعد الموافقة استخدم الرصيد للنسخ الفوري أو اللاحق.',
      },
    ],
    upvotes: 6,
    bookmarks: 9,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o308',
    slug: 'modal-startup-compute',
    name: 'Modal for Startups',
    tagline: 'Up to $50,000 in serverless GPU/CPU credits',
    description:
      'Modal Startup Program offers up to $50,000 in compute credits for serverless GPU/CPU workloads. Write Python and Modal handles containers, GPUs, auto-scaling, and scheduling - ideal for training, fine-tuning, inference APIs, and batch jobs without infrastructure work.',
    url: 'https://modal.com/startups',
    logoUrl: 'https://icons.duckduckgo.com/ip3/modal.com.ico',
    category: 'ai-perks',
    tags: ['gpu', 'serverless', 'mlops', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open Modal for Startups',
        description: 'Visit modal.com/startups and review the credit tiers.',
        url: 'https://modal.com/startups',
      },
      {
        title: 'Apply with your startup',
        description: 'Submit your startup details and ML workload description.',
      },
      {
        title: 'Deploy serverless GPUs',
        description: 'Once approved, run training, fine-tuning, and inference with modal run / deploy.',
      },
    ],
    nameAr: 'Modal للشركات الناشئة',
    taglineAr: 'حتى 50,000$ رصيد حوسبة GPU/CPU بدون سيرفرات',
    descriptionAr: 'يمنح Modal حتى 50,000$ رصيد لتشغيل أحمال GPU/CPU - اكتب بايثون و Modal يتكفل بالحاويات والتوسع التلقائي.',
    stepsAr: [
      {
        title: 'افتح صفحة Modal',
        description: 'اذهب إلى modal.com/startups وراجع الشرائح.',
        url: 'https://modal.com/startups',
      },
      {
        title: 'قدّم بطلب',
        description: 'أرسل بيانات شركتك ووصف أحمال تعلم الآلة.',
      },
      {
        title: 'انشر بدون سيرفرات',
        description: 'بعد الموافقة شغّل التدريب والاستدلال عبر modal.',
      },
    ],
    upvotes: 9,
    bookmarks: 13,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o309',
    slug: 'manus-startup-agent',
    name: 'Manus AI for Startups',
    tagline: '6 months Team Plan free (up to 20 seats, $4,680 value) + bonus credits',
    description:
      'Manus for Startups gives 6 months of Team Plan free for up to 20 seats (valued at $4,680) plus 19,900 bonus credits. Autonomous AI agents that browse the web, analyze data, write code, and execute multi-step tasks. For startups with under 30 employees at pre-seed/seed stage.',
    url: 'https://manus.im/startups',
    logoUrl: 'https://icons.duckduckgo.com/ip3/manus.im.ico',
    category: 'ai-perks',
    tags: ['ai-agent', 'automation', 'startup-credits', 'free'],
    pricing: 'free',
    steps: [
      {
        title: 'Open Manus for Startups',
        description: 'Visit manus.im/startups and confirm you are pre-seed/seed with <30 employees.',
        url: 'https://manus.im/startups',
      },
      {
        title: 'Apply with work email',
        description: 'Submit your startup domain email, website, and funding details.',
      },
      {
        title: 'Onboard your team',
        description: 'Invite up to 20 seats to the Team Plan and claim the 19,900 bonus credits.',
      },
    ],
    nameAr: 'Manus AI للشركات الناشئة',
    taglineAr: '6 أشهر خطة فريق مجاناً (حتى 20 مقعداً بقيمة 4,680$) + رصيد إضافي',
    descriptionAr: 'يمنح Manus الشركات الناشئة 6 أشهر مجاناً حتى 20 مقعداً + 19,900 رصيد إضافي لوكلاء ذكاء اصطناعي مستقلين.',
    stepsAr: [
      {
        title: 'افتح صفحة Manus',
        description: 'اذهب إلى manus.im/startups وتأكد أنك pre-seed/seed.',
        url: 'https://manus.im/startups',
      },
      {
        title: 'قدّم ببريد شركتك',
        description: 'أرسل بريد الشركة والموقع وبيانات التمويل.',
      },
      {
        title: 'أضف فريقك',
        description: 'ادعُ حتى 20 عضواً واستلم الرصيد الإضافي.',
      },
    ],
    upvotes: 11,
    bookmarks: 15,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o310',
    slug: 'perplexity-startup-api',
    name: 'Perplexity for Startups',
    tagline: '$5,000 API credits + 6 months Enterprise Pro (50 seats) - startup track',
    description:
      'Perplexity for Startups (startup track - distinct from the student Pro offer already listed) gives API credits plus 6 months of Enterprise Pro for up to 50 seats. AI answer engine combining web search with LLM reasoning, cited sources, file analysis, and advanced models. Requires startup verification.',
    url: 'https://perplexity.ai/startups',
    logoUrl: 'https://icons.duckduckgo.com/ip3/perplexity.ai.ico',
    category: 'ai-perks',
    tags: ['answer-engine', 'search', 'api', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open Perplexity for Startups',
        description: 'Visit perplexity.ai/startups (startup track, not the student/education page).',
        url: 'https://perplexity.ai/startups',
      },
      {
        title: 'Verify your startup',
        description: 'Submit company domain, incorporation proof, and team size.',
      },
      {
        title: 'Claim API + Enterprise seats',
        description: 'Activate API credits and invite up to 50 seats to Enterprise Pro.',
      },
    ],
    nameAr: 'Perplexity للشركات الناشئة',
    taglineAr: 'رصيد API بقيمة 5,000$ + 6 أشهر Enterprise Pro - مسار الشركات',
    descriptionAr: 'مسار الشركات (مختلف عن عرض الطلاب الموجود) يمنح رصيد API و 6 أشهر Enterprise Pro حتى 50 مقعداً.',
    stepsAr: [
      {
        title: 'افتح صفحة الشركات',
        description: 'اذهب إلى perplexity.ai/startups (مسار الشركات).',
        url: 'https://perplexity.ai/startups',
      },
      {
        title: 'وثّق شركتك',
        description: 'أرسل دومين الشركة وإثبات التأسيس وحجم الفريق.',
      },
      {
        title: 'فعّل الرصيد والمقاعد',
        description: 'فعّل رصيد API وادعُ حتى 50 عضواً.',
      },
    ],
    upvotes: 7,
    bookmarks: 10,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o311',
    slug: 'gemini-startup-api',
    name: 'Gemini for Startups',
    tagline: '$10,000 in Gemini API credits via Google for Startups',
    description:
      'Gemini AI for Startups gives $10,000 in Gemini API credits via the Google for Startups Cloud program. Access Gemini Flash/Pro models with multimodal input, function calling, and Search grounding. Distinct from the Gemini student offer already listed. Requires Google Cloud startup approval.',
    url: 'https://cloud.google.com/startup',
    logoUrl: 'https://icons.duckduckgo.com/ip3/cloud.google.com.ico',
    category: 'ai-perks',
    tags: ['gemini', 'llm-api', 'google-cloud', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open Google for Startups Cloud',
        description: 'Visit cloud.google.com/startup and start the application.',
        url: 'https://cloud.google.com/startup',
      },
      {
        title: 'Get approved for AI tier',
        description: 'Submit startup details; approval unlocks Cloud credits + Gemini API credits.',
      },
      {
        title: 'Enable Gemini API',
        description: 'In Google AI Studio / Vertex AI, enable the Gemini API and bill against your credits.',
      },
    ],
    nameAr: 'Gemini للشركات الناشئة',
    taglineAr: '10,000$ رصيد Gemini API عبر Google للشركات الناشئة',
    descriptionAr: 'يمنح 10,000$ رصيد Gemini API عبر برنامج Google السحابي - مختلف عن عرض الطلاب الموجود.',
    stepsAr: [
      {
        title: 'افتح Google للشركات',
        description: 'اذهب إلى cloud.google.com/startup وابدأ الطلب.',
        url: 'https://cloud.google.com/startup',
      },
      {
        title: 'احصل على الموافقة',
        description: 'أرسل بيانات شركتك لفتح رصيد السحابة + Gemini.',
      },
      {
        title: 'فعّل Gemini API',
        description: 'فعّل API في AI Studio / Vertex AI واستخدم رصيدك.',
      },
    ],
    upvotes: 8,
    bookmarks: 11,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o312',
    slug: 'vertex-ai-startup',
    name: 'Vertex AI for Startups',
    tagline: 'Up to $100,000 in Vertex AI credits + Gemini access (AI tier)',
    description:
      'Google Vertex AI startup tier offers up to $100,000 in credits with enhanced Gemini model access. Unified ML platform: Model Garden with 150+ models, AutoML, Feature Store, Pipelines. Apply via Google for Startups Cloud; complements (not duplicates) the general Google Cloud credit entry.',
    url: 'https://cloud.google.com/startup',
    logoUrl: 'https://icons.duckduckgo.com/ip3/cloud.google.com.ico',
    category: 'ai-perks',
    tags: ['vertex-ai', 'mlops', 'gemini', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Apply via Google for Startups',
        description: 'Use the same Cloud startup application and select AI workloads.',
        url: 'https://cloud.google.com/startup',
      },
      {
        title: 'Unlock the AI tier',
        description: 'AI startups can qualify for the higher $100k Vertex AI credit band.',
      },
      {
        title: 'Build on Vertex AI',
        description: 'Use Model Garden, AutoML, and Gemini endpoints billed to your credits.',
      },
    ],
    nameAr: 'Vertex AI للشركات الناشئة',
    taglineAr: 'حتى 100,000$ رصيد Vertex AI مع وصول Gemini',
    descriptionAr: 'شريحة الذكاء الاصطناعي تمنح حتى 100,000$ رصيد Vertex AI مع Model Garden و AutoML و Gemini.',
    stepsAr: [
      {
        title: 'قدّم عبر Google',
        description: 'استخدم طلب Cloud واختر أحمال الذكاء الاصطناعي.',
        url: 'https://cloud.google.com/startup',
      },
      {
        title: 'افتح شريحة AI',
        description: 'شركات الذكاء الاصطناعي مؤهلة لشريحة 100k.',
      },
      {
        title: 'ابنِ على Vertex',
        description: 'استخدم Model Garden و Gemini على رصيدك.',
      },
    ],
    upvotes: 5,
    bookmarks: 8,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o313',
    slug: 'lovable-startup-build',
    name: 'Lovable for Startups',
    tagline: '$500 in credits to ship AI-built web apps fast',
    description:
      'Lovable startup partnership gives portfolio startups tools and credits (listed at $500) to validate ideas and ship full-stack web apps from prompts. AI-native app builder with instant deploy, Supabase integration, and GitHub sync. Apply via the startup partners page.',
    url: 'https://lovable.dev/partners/startup',
    logoUrl: 'https://icons.duckduckgo.com/ip3/lovable.dev.ico',
    category: 'ai-perks',
    tags: ['ai-builder', 'no-code', 'web-apps', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open Lovable startup partners',
        description: 'Visit lovable.dev/partners/startup.',
        url: 'https://lovable.dev/partners/startup',
      },
      {
        title: 'Submit your startup',
        description: 'Share your startup name, stage, and what you want to build.',
      },
      {
        title: 'Build and ship',
        description: 'Use the credits to prompt, generate, and deploy your app with Supabase + GitHub sync.',
      },
    ],
    nameAr: 'Lovable للشركات الناشئة',
    taglineAr: 'رصيد 500$ لبناء تطبيقات ويب بالذكاء الاصطناعي بسرعة',
    descriptionAr: 'يمنح Lovable رصيداً وأدوات لبناء تطبيقات ويب كاملة من الأوامر النصية مع نشر فوري وتكامل Supabase.',
    stepsAr: [
      {
        title: 'افتح صفحة الشركاء',
        description: 'اذهب إلى lovable.dev/partners/startup.',
        url: 'https://lovable.dev/partners/startup',
      },
      {
        title: 'أرسل بياناتك',
        description: 'شارك اسم شركتك ومرحلتك وماذا تريد أن تبني.',
      },
      {
        title: 'ابنِ وانشر',
        description: 'استخدم الرصيد للتوليد والنشر مع Supabase.',
      },
    ],
    upvotes: 6,
    bookmarks: 9,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o314',
    slug: 'qdrant-startup-vector',
    name: 'Qdrant for Startups',
    tagline: '20% off Qdrant Cloud for 12 months + expert guidance',
    description:
      'Qdrant for Startups gives 20% Cloud discount for 12 months (listed ~$2,000 value) plus expert guidance and co-marketing. Open-source vector database in Rust for similarity search at scale: dense + sparse vectors, filtering, payload storage, quantization. Distinct from Pinecone/Weaviate entries already listed.',
    url: 'https://qdrant.tech/startups',
    logoUrl: 'https://icons.duckduckgo.com/ip3/qdrant.tech.ico',
    category: 'ai-perks',
    tags: ['vector-db', 'rag', 'open-source', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open Qdrant for Startups',
        description: 'Visit qdrant.tech/startups.',
        url: 'https://qdrant.tech/startups',
      },
      {
        title: 'Apply with your RAG use case',
        description: 'Describe your AI app, vector scale, and Cloud region needs.',
      },
      {
        title: 'Claim discount + office hours',
        description: 'Discount is applied to Qdrant Cloud; book expert guidance sessions.',
      },
    ],
    nameAr: 'Qdrant للشركات الناشئة',
    taglineAr: 'خصم 20% على السحابة 12 شهراً + إرشاد خبراء',
    descriptionAr: 'يمنح Qdrant خصم 20% سنة كاملة (نحو 2,000$) مع إرشاد لقاعدة البيانات الشعاعية مفتوحة المصدر.',
    stepsAr: [
      {
        title: 'افتح صفحة Qdrant',
        description: 'اذهب إلى qdrant.tech/startups.',
        url: 'https://qdrant.tech/startups',
      },
      {
        title: 'قدّم بحالة RAG',
        description: 'صف تطبيقك وحجم المتجهات والمنطقة.',
      },
      {
        title: 'استلم الخصم والإرشاد',
        description: 'يُطبق الخصم على السحابة واحجز جلسات الخبراء.',
      },
    ],
    upvotes: 5,
    bookmarks: 7,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o315',
    slug: 'weights-biases-startup',
    name: 'Weights & Biases for Startups',
    tagline: '50% off Teams plan for 12 months (up to 10 seats, ~$2,000 value)',
    description:
      'W&B for Startups gives 50% off the Teams plan for 12 months for up to 10 seats (listed ~$2,000 value) via Microsoft for Startups. MLOps platform for experiment tracking, model versioning, metrics logging, dashboards, and collaboration. Apply via Founders Hub.',
    url: 'https://wandb.ai/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/wandb.ai.ico',
    category: 'ai-perks',
    tags: ['mlops', 'experiment-tracking', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Join Microsoft for Startups',
        description: 'Start at the Founders Hub portal (the channel W&B uses for this perk).',
        url: 'https://www.microsoft.com/en-us/startups',
      },
      {
        title: 'Claim the W&B benefit',
        description: 'In the benefits catalog, find Weights & Biases and claim the 50% Teams offer.',
        url: 'https://wandb.ai/',
      },
      {
        title: 'Track experiments',
        description: 'Connect wandb to training runs and share dashboards with your team.',
      },
    ],
    nameAr: 'Weights & Biases للشركات الناشئة',
    taglineAr: 'خصم 50% على خطة الفرق 12 شهراً (حتى 10 مقاعد)',
    descriptionAr: 'يمنح W&B خصم 50% سنة كاملة حتى 10 مقاعد لتتبع التجارب وإصدارات النماذج عبر Founders Hub.',
    stepsAr: [
      {
        title: 'انضم لـ Founders Hub',
        description: 'ابدأ من بوابة Microsoft للشركات الناشئة.',
        url: 'https://www.microsoft.com/en-us/startups',
      },
      {
        title: 'اطلب ميزة W&B',
        description: 'في كتالوج المزايا اختر Weights & Biases.',
        url: 'https://wandb.ai/',
      },
      {
        title: 'تتبع التجارب',
        description: 'اربط wandb بتدريباتك وشارك اللوحات مع فريقك.',
      },
    ],
    upvotes: 4,
    bookmarks: 6,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o316',
    slug: 'xai-startup-api',
    name: 'xAI API for Startups',
    tagline: '$300 in Grok API credits via startup partner access',
    description:
      'xAI startup partner access (listed at $300) gives Grok API credits to build with Grok models. Use the xAI console to generate an API key, call the OpenAI-compatible endpoint, and test Grok reasoning + real-time X data grounding. Small credit but useful for evaluation before scaling.',
    url: 'https://x.ai/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/x.ai.ico',
    category: 'ai-perks',
    tags: ['grok', 'llm-api', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open xAI console',
        description: 'Visit x.ai and create an xAI account / console workspace.',
        url: 'https://x.ai/',
      },
      {
        title: 'Claim partner credits',
        description: 'Apply the startup partner benefit to your workspace (listed $300).',
      },
      {
        title: 'Call the Grok API',
        description: 'Generate a key and call the API from your app or agent.',
      },
    ],
    nameAr: 'xAI للشركات الناشئة',
    taglineAr: 'رصيد 300$ لواجهة Grok API عبر الشركاء',
    descriptionAr: 'يمنح وصول الشركاء رصيد 300$ لتجربة نماذج Grok عبر API متوافق مع OpenAI.',
    stepsAr: [
      {
        title: 'افتح منصة xAI',
        description: 'اذهب إلى x.ai وأنشئ حساباً.',
        url: 'https://x.ai/',
      },
      {
        title: 'اطلب رصيد الشركاء',
        description: 'فعّل ميزة الشركات (300$).',
      },
      {
        title: 'استدعِ Grok API',
        description: 'أنشئ مفتاحاً واستدعِ API من تطبيقك.',
      },
    ],
    upvotes: 5,
    bookmarks: 7,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o317',
    slug: 'typeface-startup-content',
    name: 'Typeface for Startups',
    tagline: '3 months Teams plan free for on-brand AI content (~$1,000 value)',
    description:
      'Typeface startup benefit gives 3 months of the Teams plan free (listed ~$1,000 value) via Microsoft Founders Hub. Generative AI platform for enterprise content: learns brand voice and style guides, AI copywriting, image generation, remix, and compliance checks.',
    url: 'https://www.typeface.ai/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/typeface.ai.ico',
    category: 'ai-perks',
    tags: ['content-ai', 'branding', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Join Founders Hub',
        description: 'Start at the Microsoft for Startups portal.',
        url: 'https://portal.startups.microsoft.com/',
      },
      {
        title: 'Claim Typeface',
        description: 'Find Typeface in benefits and activate 3 months Teams free.',
        url: 'https://www.typeface.ai/',
      },
      {
        title: 'Train your brand voice',
        description: 'Upload style guides and generate on-brand copy + visuals.',
      },
    ],
    nameAr: 'Typeface للشركات الناشئة',
    taglineAr: '3 أشهر خطة فرق مجاناً للمحتوى المتوافق مع علامتك (~1,000$)',
    descriptionAr: 'يمنح Typeface ثلاثة أشهر مجاناً لتوليد محتوى متوافق مع صوت علامتك وأدلتها عبر Founders Hub.',
    stepsAr: [
      {
        title: 'انضم لـ Founders Hub',
        description: 'ابدأ من بوابة Microsoft.',
        url: 'https://portal.startups.microsoft.com/',
      },
      {
        title: 'اطلب Typeface',
        description: 'فعّل 3 أشهر مجاناً.',
        url: 'https://www.typeface.ai/',
      },
      {
        title: 'درّب صوت علامتك',
        description: 'ارفع أدلة الأسلوب وولّد محتوى متوافقاً.',
      },
    ],
    upvotes: 3,
    bookmarks: 5,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o318',
    slug: 'meetgeek-startup-meetings',
    name: 'MeetGeek for Startups',
    tagline: '50% off AI meeting assistant (up to $350 value)',
    description:
      'MeetGeek startup deal gives 50% off subscriptions (listed up to $350 value) for AI meeting recording, transcription, summaries, and action items. Auto-joins calls, searchable transcripts, integrations with Slack/Notion/CRM. Good cheap win for founder-led teams.',
    url: 'https://meetgeek.ai/pricing',
    logoUrl: 'https://icons.duckduckgo.com/ip3/meetgeek.ai.ico',
    category: 'ai-perks',
    tags: ['meetings', 'transcription', 'productivity', 'discount'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open MeetGeek pricing',
        description: 'Visit meetgeek.ai/pricing and pick a plan.',
        url: 'https://meetgeek.ai/pricing',
      },
      {
        title: 'Apply the startup discount',
        description: 'Sign up with your startup email and apply the 50% startup benefit at checkout.',
      },
      {
        title: 'Connect your calendar',
        description: 'Connect Google/Outlook calendar so MeetGeek auto-joins and summarizes calls.',
      },
    ],
    nameAr: 'MeetGeek للشركات الناشئة',
    taglineAr: 'خصم 50% على مساعد الاجتماعات (حتى 350$)',
    descriptionAr: 'يمنح MeetGeek خصم 50% للتسجيل والنسخ والتلخيص التلقائي للاجتماعات مع عناصر العمل.',
    stepsAr: [
      {
        title: 'افتح الأسعار',
        description: 'اذهب إلى meetgeek.ai/pricing واختر خطة.',
        url: 'https://meetgeek.ai/pricing',
      },
      {
        title: 'طبّق خصم الشركات',
        description: 'سجّل ببريد شركتك وطبّق الخصم عند الدفع.',
      },
      {
        title: 'اربط تقويمك',
        description: 'اربط Google/Outlook لينضم ويلخص تلقائياً.',
      },
    ],
    upvotes: 3,
    bookmarks: 5,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o319',
    slug: 'make-startup-automation',
    name: 'Make for Startups',
    tagline: '$1,188 in no-code AI automation credits',
    description:
      'Make startup benefit (listed at $1,188) gives credits for the visual no-code automation platform: connect tools, automate lead gen, support, billing, and ops, and build AI-powered workflows without developers. Claim via the startup application form.',
    url: 'https://www.make.com/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/make.com.ico',
    category: 'ai-perks',
    tags: ['automation', 'no-code', 'workflows', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open Make',
        description: 'Visit make.com and create a workspace.',
        url: 'https://www.make.com/',
      },
      {
        title: 'Apply as a startup',
        description: 'Submit the startup form with company details to unlock the credit benefit.',
      },
      {
        title: 'Automate workflows',
        description: 'Build visual scenarios connecting your stack + AI modules.',
      },
    ],
    nameAr: 'Make للشركات الناشئة',
    taglineAr: 'رصيد 1,188$ لأتمتة بدون كود بالذكاء الاصطناعي',
    descriptionAr: 'يمنح Make رصيد 1,188$ لمنصة الأتمتة المرئية: اربط أدواتك وأتمت عملياتك بدون مطورين.',
    stepsAr: [
      {
        title: 'افتح Make',
        description: 'اذهب إلى make.com وأنشئ مساحة عمل.',
        url: 'https://www.make.com/',
      },
      {
        title: 'قدّم كشركة ناشئة',
        description: 'أرسل نموذج الشركات لفتح الرصيد.',
      },
      {
        title: 'أتمت عملياتك',
        description: 'ابنِ سيناريوهات مرئية تربط أدواتك ووحدات الذكاء الاصطناعي.',
      },
    ],
    upvotes: 4,
    bookmarks: 6,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  // --- AI Perks batch 2 (more non-duplicate AI startup perks) ---
  {
    id: 'o320',
    slug: 'anam-ai-personas',
    name: 'Anam AI for Startups',
    tagline: '45% off AI Personas platform (up to $4,300 value)',
    description:
      'Anam AI startup deal gives 45% off (listed up to $4,300 value) on the real-time AI Personas platform. Create lifelike AI avatars with customizable faces and voices for customer engagement, sales, and support - claimed to save 60% of time with 3x better results. Register with your startup details to unlock the discount.',
    url: 'https://lab.anam.ai/register',
    logoUrl: 'https://icons.duckduckgo.com/ip3/anam.ai.ico',
    category: 'ai-perks',
    tags: ['ai-avatars', 'personas', 'voice-ai', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open Anam lab registration',
        description: 'Visit lab.anam.ai/register and create an account with your startup email.',
        url: 'https://lab.anam.ai/register',
      },
      {
        title: 'Apply the startup discount',
        description: 'Submit your startup details to unlock 45% off the Personas platform.',
      },
      {
        title: 'Build your AI persona',
        description: 'Design faces and voices, then embed real-time personas in sales and support flows.',
      },
    ],
    nameAr: 'Anam AI للشركات الناشئة',
    taglineAr: 'خصم 45% على منصة الشخصيات الاصطناعية (حتى 4,300$)',
    descriptionAr: 'يمنح Anam خصم 45% (حتى 4,300$) لمنصة شخصيات الذكاء الاصطناعي المرئية والصوتية الفورية للمبيعات والدعم.',
    stepsAr: [
      {
        title: 'افتح التسجيل',
        description: 'اذهب إلى lab.anam.ai/register وأنشئ حساباً ببريد شركتك.',
        url: 'https://lab.anam.ai/register',
      },
      {
        title: 'اطلب خصم الشركات',
        description: 'أرسل بيانات شركتك لفتح خصم 45%.',
      },
      {
        title: 'ابنِ شخصيتك',
        description: 'صمم الوجوه والأصوات وادمجها في المبيعات والدعم.',
      },
    ],
    upvotes: 4,
    bookmarks: 6,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o321',
    slug: 'granola-startup-notes',
    name: 'Granola for Startups',
    tagline: '1 year of Granola Business free ($168 value) - AI meeting notepad',
    description:
      'Granola startup deal gives 1 year of Granola Business free (listed $168 value) for startups with fewer than 30 employees at pre-seed or seed stage. AI notepad that enhances meeting notes so nothing gets lost while you focus on building - streamlines team communication and decision-making.',
    url: 'https://www.granola.ai/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/granola.ai.ico',
    category: 'ai-perks',
    tags: ['meetings', 'notes', 'productivity', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open Granola',
        description: 'Visit granola.ai and download the AI notepad app.',
        url: 'https://www.granola.ai/',
      },
      {
        title: 'Apply as a startup',
        description: 'Sign up with your startup email (pre-seed/seed, <30 employees) to claim 1 year Business free.',
      },
      {
        title: 'Take better meeting notes',
        description: 'Let Granola enhance your notes automatically and share decisions with the team.',
      },
    ],
    nameAr: 'Granola للشركات الناشئة',
    taglineAr: 'سنة مجاناً من Granola Business (168$) - مفكرة اجتماعات ذكية',
    descriptionAr: 'يمنح Granola سنة مجانية للشركات (pre-seed/seed أقل من 30 موظفاً) لمفكرة اجتماعات تعزز ملاحظاتك بالذكاء الاصطناعي.',
    stepsAr: [
      {
        title: 'افتح Granola',
        description: 'اذهب إلى granola.ai وحمّل التطبيق.',
        url: 'https://www.granola.ai/',
      },
      {
        title: 'قدّم كشركة ناشئة',
        description: 'سجّل ببريد شركتك لطلب السنة المجانية.',
      },
      {
        title: 'حسّن ملاحظاتك',
        description: 'دع Granola يعزز ملاحظاتك ويشارك القرارات مع الفريق.',
      },
    ],
    upvotes: 3,
    bookmarks: 5,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o322',
    slug: 'okara-startup-cmo',
    name: 'Okara for Startups',
    tagline: '$594 in AI marketing-team credits (SEO, GEO, content, social agents)',
    description:
      'Okara startup benefit (listed $594 value, FREE status) gives AI marketing agents that work daily without hiring: SEO, AI search/GEO, content, Reddit, and social agents. Connect your product and the agents produce and distribute marketing for founders and small teams.',
    url: 'https://okara.ai/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/okara.ai.ico',
    category: 'ai-perks',
    tags: ['marketing', 'seo', 'ai-agents', 'startup-credits'],
    pricing: 'free',
    steps: [
      {
        title: 'Open Okara',
        description: 'Visit okara.ai and start a workspace with your startup email.',
        url: 'https://okara.ai/',
      },
      {
        title: 'Connect your product',
        description: 'Add your website and positioning so the agents learn your product.',
      },
      {
        title: 'Activate marketing agents',
        description: 'Turn on SEO, GEO, content, Reddit, and social agents working daily.',
      },
    ],
    nameAr: 'Okara للشركات الناشئة',
    taglineAr: 'رصيد 594$ لفريق تسويق ذكي (SEO ومحتوى وشبكات)',
    descriptionAr: 'يمنح Okara وكلاء تسويق ذكي يعملون يومياً: SEO وبحث الذكاء الاصطناعي والمحتوى و Reddit والشبكات بدون توظيف.',
    stepsAr: [
      {
        title: 'افتح Okara',
        description: 'اذهب إلى okara.ai وأنشئ مساحة ببريد شركتك.',
        url: 'https://okara.ai/',
      },
      {
        title: 'اربط منتجك',
        description: 'أضف موقعك وتموضعك ليتعلم الوكلاء منتجك.',
      },
      {
        title: 'فعّل الوكلاء',
        description: 'شغّل وكلاء SEO والمحتوى والشبكات للعمل اليومي.',
      },
    ],
    upvotes: 5,
    bookmarks: 8,
    submittedBy: 'u6',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o323',
    slug: 'snippets-ai-prompt-library',
    name: 'Snippets AI for Startups',
    tagline: '1 year free of unlimited prompt storage ($200 value)',
    description:
      'Snippets AI startup benefit (listed $200 value, FREE status) gives 1 year free of unlimited prompt storage. Save, organize, and reuse your best prompts across models and teammates - a cheap, practical win for teams standardizing AI workflows.',
    url: 'https://getsnippets.ai/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/getsnippets.ai.ico',
    category: 'ai-perks',
    tags: ['prompts', 'productivity', 'developers', 'free'],
    pricing: 'free',
    steps: [
      {
        title: 'Open Snippets AI',
        description: 'Visit getsnippets.ai and create an account.',
        url: 'https://getsnippets.ai/',
      },
      {
        title: 'Claim 1 year free',
        description: 'Sign up with your startup email to unlock unlimited prompt storage for a year.',
      },
      {
        title: 'Organize team prompts',
        description: 'Save, tag, and share tested prompts across your team.',
      },
    ],
    nameAr: 'Snippets AI للشركات الناشئة',
    taglineAr: 'سنة مجاناً لتخزين غير محدود للأوامر (200$)',
    descriptionAr: 'يمنح Snippets AI سنة مجانية لتخزين وتنظيم وإعادة استخدام الأوامر عبر النماذج والفريق.',
    stepsAr: [
      {
        title: 'افتح Snippets AI',
        description: 'اذهب إلى getsnippets.ai وأنشئ حساباً.',
        url: 'https://getsnippets.ai/',
      },
      {
        title: 'اطلب السنة المجانية',
        description: 'سجّل ببريد شركتك لفتح التخزين غير المحدود.',
      },
      {
        title: 'نظّم أوامر فريقك',
        description: 'احفظ وصنّف وشارك الأوامر المجرّبة.',
      },
    ],
    upvotes: 3,
    bookmarks: 5,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o324',
    slug: 'theona-prompt-agents',
    name: 'Theona for Startups',
    tagline: '$6,000 in prompt-to-agent automation credits',
    description:
      'Theona startup benefit (listed $6,000 value) turns a single prompt into AI agents that run work end-to-end across your tools: sales outreach, meeting follow-ups, weekly reporting, back-office ops. No code, no engineers needed - describe the outcome and agents execute it.',
    url: 'https://theona.ai/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/theona.ai.ico',
    category: 'ai-perks',
    tags: ['ai-agents', 'automation', 'no-code', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open Theona',
        description: 'Visit theona.ai and create a startup workspace.',
        url: 'https://theona.ai/',
      },
      {
        title: 'Claim startup credits',
        description: 'Apply with your startup details to unlock the listed credit benefit.',
      },
      {
        title: 'Prompt your first agent',
        description: 'Describe sales, follow-up, or reporting work and let agents run it across your tools.',
      },
    ],
    nameAr: 'Theona للشركات الناشئة',
    taglineAr: 'رصيد 6,000$ لوكلاء يعملون من أمر واحد',
    descriptionAr: 'تحوّل Theona أمراً واحداً إلى وكلاء ينفذون المبيعات والمتابعات والتقارير عبر أدواتك بدون كود.',
    stepsAr: [
      {
        title: 'افتح Theona',
        description: 'اذهب إلى theona.ai وأنشئ مساحة.',
        url: 'https://theona.ai/',
      },
      {
        title: 'اطلب رصيد الشركات',
        description: 'أرسل بيانات شركتك لفتح الرصيد.',
      },
      {
        title: 'اطلب وكيلك الأول',
        description: 'صف عمل المبيعات أو التقارير ودع الوكلاء ينفذونه.',
      },
    ],
    upvotes: 4,
    bookmarks: 6,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o325',
    slug: 'i10x-ai-research',
    name: 'i10X AI for Startups',
    tagline: '20% off AI research platform (up to $5,000 value, Antler founders)',
    description:
      'i10X AI platform benefit gives 20% discount (listed up to $5,000 value) on AI research and development tools, promoted via Antler founders network. For startups doing structured AI R&D - apply with your Antler/startup affiliation.',
    url: 'https://i10x.ai',
    logoUrl: 'https://icons.duckduckgo.com/ip3/i10x.ai.ico',
    category: 'ai-perks',
    tags: ['research', 'ai-platform', 'discount', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open i10X AI',
        description: 'Visit i10x.ai and review the platform.',
        url: 'https://i10x.ai',
      },
      {
        title: 'Apply with affiliation',
        description: 'Submit startup details plus Antler/startup affiliation for the 20% benefit.',
      },
      {
        title: 'Run AI research',
        description: 'Use the platform for structured AI research and development work.',
      },
    ],
    nameAr: 'i10X AI للشركات الناشئة',
    taglineAr: 'خصم 20% على منصة أبحاث الذكاء الاصطناعي (حتى 5,000$)',
    descriptionAr: 'يمنح i10X خصم 20% (حتى 5,000$) على أدوات البحث والتطوير لشركات Antler والناشئة.',
    stepsAr: [
      {
        title: 'افتح i10X',
        description: 'اذهب إلى i10x.ai وراجع المنصة.',
        url: 'https://i10x.ai',
      },
      {
        title: 'قدّم بانتمائك',
        description: 'أرسل بيانات شركتك وانتماء Antler للخصم.',
      },
      {
        title: 'نفّذ أبحاثك',
        description: 'استخدم المنصة لأبحاث الذكاء الاصطناعي المنظمة.',
      },
    ],
    upvotes: 3,
    bookmarks: 4,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o326',
    slug: 'makeforms-startup-forms',
    name: 'MakeForms for Startups',
    tagline: '$900 in AI form-builder credits (secure, compliant forms)',
    description:
      'MakeForms startup benefit (listed $900 value - distinct from the Make automation entry) gives credits for the enterprise-grade form builder: high-converting forms, surveys, and multi-step workflows with zero code, plus security and compliance teams require.',
    url: 'https://makeforms.io/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/makeforms.io.ico',
    category: 'ai-perks',
    tags: ['forms', 'surveys', 'no-code', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open MakeForms',
        description: 'Visit makeforms.io and create a workspace.',
        url: 'https://makeforms.io/',
      },
      {
        title: 'Claim startup credits',
        description: 'Sign up with your startup email to unlock the listed credit benefit.',
      },
      {
        title: 'Build converting forms',
        description: 'Create forms, surveys, and multi-step workflows with zero code.',
      },
    ],
    nameAr: 'MakeForms للشركات الناشئة',
    taglineAr: 'رصيد 900$ لمنشئ النماذج الآمن (مختلف عن Make)',
    descriptionAr: 'يمنح MakeForms رصيد 900$ لمنشئ النماذج والاستبيانات المؤمن والمتوافق - منتج مختلف عن Make للأتمتة.',
    stepsAr: [
      {
        title: 'افتح MakeForms',
        description: 'اذهب إلى makeforms.io وأنشئ مساحة.',
        url: 'https://makeforms.io/',
      },
      {
        title: 'اطلب رصيد الشركات',
        description: 'سجّل ببريد شركتك لفتح الرصيد.',
      },
      {
        title: 'ابنِ نماذج فعّالة',
        description: 'أنشئ نماذج واستبيانات متعددة الخطوات بدون كود.',
      },
    ],
    upvotes: 3,
    bookmarks: 4,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o327',
    slug: 'hookradar-ad-intelligence',
    name: 'HookRadar for Startups',
    tagline: '$450 in AI ad-intelligence agent credits',
    description:
      'HookRadar startup benefit (listed $450 value) gives credits for the AI ad-intelligence agent: see what competitors run, which creative angles trend, and which ad ideas to test next. Built for growth teams validating paid acquisition.',
    url: 'https://hookradar.net/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/hookradar.net.ico',
    category: 'ai-perks',
    tags: ['ads', 'marketing', 'intelligence', 'startup-credits'],
    pricing: 'freemium',
    steps: [
      {
        title: 'Open HookRadar',
        description: 'Visit hookradar.net and create an account.',
        url: 'https://hookradar.net/',
      },
      {
        title: 'Claim startup credits',
        description: 'Sign up with your startup email to unlock the listed credit benefit.',
      },
      {
        title: 'Analyze competitor ads',
        description: 'Track competitor creatives, trending angles, and test ideas worth running.',
      },
    ],
    nameAr: 'HookRadar للشركات الناشئة',
    taglineAr: 'رصيد 450$ لوكيل استخبارات الإعلانات',
    descriptionAr: 'يمنح HookRadar رصيد 450$ لوكيل ذكي يحلل إعلانات المنافسين والزوايا الرائجة وأفكار الاختبار.',
    stepsAr: [
      {
        title: 'افتح HookRadar',
        description: 'اذهب إلى hookradar.net وأنشئ حساباً.',
        url: 'https://hookradar.net/',
      },
      {
        title: 'اطلب رصيد الشركات',
        description: 'سجّل ببريد شركتك لفتح الرصيد.',
      },
      {
        title: 'حلّل إعلانات المنافسين',
        description: 'تتبع الإبداعات الرائجة واختبر الأفكار الواعدة.',
      },
    ],
    upvotes: 2,
    bookmarks: 4,
    submittedBy: 'u6',
    featured: false,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'o328',
    slug: 'opencode-union-alpha',
    name: 'OpenCode + Union Alpha',
    tagline: 'Union Alpha free for 7 days on OpenCode (Sep 16-23)',
    description:
      'Union Alpha Free is a stealth coding model on OpenCode Zen — free for 7 days starting Sep 16, 2026 (until Sep 23) with zero-retention privacy. Connect Zen once, pick opencode/union-alpha from /models, and code with it in the terminal, IDE, or web.',
    url: 'https://opencode.ai/docs/zen/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/opencode.ai.ico',
    category: 'tool',
    tags: ['free', 'ai-model', 'coding', 'opencode', 'stealth'],
    pricing: 'free',
    endsAt: '2026-09-23',
    steps: [
      {
        title: 'Install OpenCode',
        description: 'Install with npm i -g opencode-ai (or brew / the curl script), then verify with opencode --version.',
        url: 'https://opencode.ai/',
      },
      {
        title: 'Get a Zen API key',
        description: 'Sign in at opencode.ai/auth, add billing details, and copy your API key. Union Alpha itself costs $0; auto-reload can be disabled in billing settings.',
        url: 'https://opencode.ai/auth',
      },
      {
        title: 'Connect Zen in OpenCode',
        description: 'Open the TUI, run /connect, select OpenCode Zen, and paste your API key (stored in auth.json).',
      },
      {
        title: 'Select Union Alpha Free',
        description: 'Run /models and pick Union Alpha Free (id opencode/union-alpha) as your coding model.',
      },
      {
        title: 'Test it before Sep 23',
        description: 'Send a test prompt, confirm $0 cost in Zen billing, and optionally set monthly limits. Free window ends Sep 23, 2026; provider follows zero-retention (no training on your data).',
      },
    ],
    nameAr: 'OpenCode + Union Alpha',
    taglineAr: 'Union Alpha مجاني لـ 7 أيام على OpenCode (16-23 سبتمبر)',
    descriptionAr: 'Union Alpha Free نموذج برمجة خفي على OpenCode Zen — مجاني لـ 7 أيام ابتداءً من 16 سبتمبر 2026 (حتى 23 سبتمبر) مع سياسة عدم الاحتفاظ بالبيانات. اربط Zen مرة واحدة واختر opencode/union-alpha من /models وبرمج به.',
    stepsAr: [
      {
        title: 'ثبّت OpenCode',
        description: 'ثبّت عبر npm i -g opencode-ai (أو brew / سكربت curl) ثم تحقق بـ opencode --version.',
        url: 'https://opencode.ai/',
      },
      {
        title: 'احصل على مفتاح Zen',
        description: 'سجّل في opencode.ai/auth وأضف بيانات الدفع وانسخ المفتاح. النموذج نفسه مجاني ويمكن تعطيل إعادة الشحن التلقائي.',
        url: 'https://opencode.ai/auth',
      },
      {
        title: 'اربط Zen في OpenCode',
        description: 'افتح الواجهة ونفّذ /connect واختر OpenCode Zen والصق المفتاح (يُحفظ في auth.json).',
      },
      {
        title: 'اختر Union Alpha Free',
        description: 'نفّذ /models واختر Union Alpha Free (opencode/union-alpha) كنموذج البرمجة.',
      },
      {
        title: 'جرّبه قبل 23 سبتمبر',
        description: 'أرسل أمراً تجريبياً وتأكد من التكلفة 0$ في الفوترة واضبط حداً شهرياً اختيارياً. تنتهي المجانية في 23 سبتمبر 2026 ولا تُستخدم بياناتك للتدريب.',
      },
    ],
    upvotes: 0,
    bookmarks: 0,
    submittedBy: 'u1',
    featured: true,
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
]