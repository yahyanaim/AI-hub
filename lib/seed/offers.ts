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
    tagline: 'Free agentic coding AI by Meta - 1M tokens free for OpenCode & terminal agents',
    description:
      'Muse Spark is Meta’s agentic coding model built for autonomous engineering loops: it reads your repo, plans multi-step changes, edits files, runs tests, and iterates. Muse Spark 1.2 is the contributor-free tier - sign up and get ~1M free tokens to power OpenCode, Hermes, OpenClaw and other terminal agents with zero subscription. Connect via OpenCode /connect or any OpenAI-compatible base URL, pick muse-spark-1.2, and start shipping.',
    url: 'https://www.meta.ai/muse-spark',
    logoUrl: 'https://icons.duckduckgo.com/ip3/meta.ai.ico',
    category: 'tool',
    tags: ['meta', 'muse-spark', 'coding-agent', 'free', 'opencode', 'llm'],
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
          'In the dashboard, generate an API key for Muse Spark. The contributor-free tier includes roughly 1M free tokens to get started with no credit card required for the trial.',
      },
      {
        title: 'Connect from OpenCode',
        description:
          'Run opencode in your project, type /connect, pick Muse Spark (or Custom OpenAI-compatible), and paste your API key. Alternatively set the base URL in your agent config to the Muse Spark endpoint.',
        url: 'https://opencode.ai/docs',
      },
      {
        title: 'Select muse-spark-1.2',
        description:
          'Run /models and choose muse-spark-1.2-contributor-free for zero-cost coding, or muse-spark-1.2 for higher rate limits. The model is fully instruction-tuned for file edits, shell execution, and repo search.',
      },
      {
        title: 'Ship with the agent loop',
        description:
          'Describe your task in plain language - Muse Spark will explore the codebase, edit files, run commands, and verify with builds/tests, all in one autonomous loop.',
      },
    ],
    nameAr: 'Muse Spark',
    taglineAr: 'ذكاء برمجي وكيلي مجاني من Meta - مليون رمز مجاناً لـ OpenCode',
    descriptionAr: 'Muse Spark نموذج وكيلي من Meta للهندسة المستقلة: يقرأ المستودع ويخطط ويعدّل وينفذ الاختبارات ويكرر. المستوى المجاني للمساهمين يعطي ~مليون رمز مجاناً لتشغيل OpenCode و Hermes و OpenClaw بدون اشتراك.',
    stepsAr: [
      {
        title: 'افتح Muse Spark',
        description: 'اذهب إلى صفحة Muse Spark وأنشئ حساب Meta AI.',
        url: 'https://www.meta.ai/muse-spark'
      },
      {
        title: 'أنشئ مفتاح API',
        description: 'أنشئ مفتاحاً - المستوى المجاني يضم ~مليون رمز للبدء.'
      },
      {
        title: 'اربط من OpenCode',
        description: 'شغّل opencode واكتب /connect واختر Muse Spark والصق المفتاح.',
        url: 'https://opencode.ai/docs'
      },
      {
        title: 'اختر muse-spark-1.2',
        description: 'شغّل /models واختر muse-spark-1.2-contributor-free.'
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
    tagline: '50% off Replit Core + free AI credits for students via GitHub Student',
    description:
      'Replit gives students 50% off Core ($13.50 vs $27/mo) plus free AI credits when linked to GitHub Student Pack. Includes hosted IDE for 50+ languages, Deployments, and AI assistant. Verifies via GitHub Student linkage or .edu email.',
    url: 'https://replit.com/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/replit.com.ico',
    category: 'tool',
    tags: ['replit', 'ide', 'hosting', 'students', 'discount'],
    pricing: 'paid',
    steps: [
      {
        title: 'Link GitHub Student or .edu',
        description:
          'STUDENT: Sign in to replit.com/students with GitHub already approved for Student Pack - Replit auto-detects. Or verify with .edu email. NON-STUDENT: Approve GitHub Pack first via CC file (see o9), then return to Replit to claim.',
        url: 'https://replit.com/students',
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
    taglineAr: 'خصم 50% على Replit Core + رصيد AI عبر GitHub Student',
    descriptionAr: 'يمنح Replit الطلاب خصم 50% على Core (13.50$ بدل 27$) ورصيد AI عند ربطه بـ GitHub Student Pack. يضم IDE مستضاف لـ 50+ لغة.',
    stepsAr: [
      {
        title: 'اربط GitHub Student أو .edu',
        description: 'سجّل في replit.com/students بحساب GitHub الموافق عليه - يكتشف تلقائياً.',
        url: 'https://replit.com/students'
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
      'The master guide for non-students: how to legitimately get an accredited US Community College .EDU mailbox + student ID + enrollment letter in 24-72h for ~$0-$60, and which offers on AI Hunt you can then claim. No paid mailbox shop needed.\\n\\n**All colleges below issue .EDU + Microsoft 365 + Canvas + transcript and are accepted by SheerID/GitHub/JetBrains/Adobe. Open-admission, no SAT, online apply in 15 min:**\\n\\n**Texas:** Dallas College (dallascollege.edu) - dallascollege.edu/admissions/application - $0 first semester many students\\n**California (all via OpenCCCApply - home.cccapply.org):** LA City College (lacitycollege.edu), Santa Monica College (smc.edu), Coastline (coastline.edu), Rio Hondo (riohondo.edu), El Camino (elcamino.edu), Pasadena City (pasadena.edu), Glendale (glendale.edu), Cerritos (cerritos.edu), Pierce College (piercecollege.edu), Cypress (cypresscollege.edu), Fullerton (fullcoll.edu), Orange Coast (orangecoastcollege.edu), Irvine Valley (ivc.edu), Saddleback (saddleback.edu), Palomar (palomar.edu), MiraCosta (miracosta.edu), Southwestern (swccd.edu), Berkeley City (peralta.edu/berkeley), Diablo Valley (dvc.edu), De Anza (deanza.edu), Foothill (foothill.edu), San Diego City (sdcity.edu), Mt San Antonio (mtsac.edu), Long Beach City (lbcc.edu)\\n**Other states:** Borough of Manhattan CC (bmcc.cuny.edu, NY), LaGuardia CC (laguardia.edu, NY), Houston CC (hccs.edu, TX), Bunker Hill CC (bhcc.edu, MA), Community College of Philadelphia (ccp.edu, PA)\\n\\n**Pick any ONE - you only need one CC to unlock all 40+ offers:** GitHub Pack, Azure $100, AWS Educate $100, Cloudflare Pro, JetBrains, Figma, Notion Plus, Canva, Autodesk, Zed, Gemini, ChatGPT Plus, Cursor, Perplexity, V0, Shodan, Hyperbolic, Consensus, Julius, Microsoft 365, Adobe 60% off, Apple 200GB, MATLAB, Replit, DigitalOcean $200, Namecheap domain, Sketch, YouTube/Amazon Prime, iLovePDF, Craft, Tower, Shapr3D, Mathpix, GoodNotes, Firecrawl, Dify, Kiro, Windsurf, Consensus, and more. Includes SheerID/UNiDAYS/manual file tips to get approved first try.',
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
    url: 'https://peralta.edu/berkeley/',
    logoUrl: 'https://icons.duckduckgo.com/ip3/peralta.edu.ico',
    category: 'edu',
    tags: ['cc', 'edu', 'college', 'peralta', 'us-cc', 'open-admission'],
    pricing: 'free',
    steps: [
      {
        title: 'Apply to Berkeley City College (15 min)',
        description:
          'Go to https://peralta.edu/berkeley/ → Apply. Choose “Non-degree / Personal Enrichment”. Use your real name/passport. No SAT, no essay. For CA colleges use OpenCCCApply account (NOTE: OpenCCC blocks anonymizing services with error 1775 even if you DON\'T use VPN - your ISP CGNAT/shared IP, iCloud Private Relay (iPhone/Mac), Brave/Opera VPN, or ad-blocker plugins like uBlock/Privacy Badger can trigger it. Disable Private Relay + ad-blockers, try incognito Chrome without extensions, or switch WiFi ↔ mobile data. If it still blocks, use Dallas/Houston/BMCC which do not use OpenCCC), for Texas use Dallas/CUNY portal.',
        url: 'https://peralta.edu/berkeley/',
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
        description: 'اذهب إلى https://peralta.edu/berkeley/ → Apply. اختر "Non-degree". استخدم اسمك الحقيقي وجوازك. بدون SAT. لكليات كاليفورنيا استخدم OpenCCC (ملاحظة: يحظره OpenCCC حتى بدون VPN - بسبب CGNAT لمزودك، iCloud Private Relay في آيفون/ماك، أو إضافات حجب الإعلانات. عطّل Private Relay والإضافات، جرّب متصفحاً بدون إضافات أو بدّل بين WiFi وبيانات الهاتف. إذا استمر الحظر استخدم Dallas/Houston/BMCC التي لا تستخدم OpenCCC).',
        url: 'https://peralta.edu/berkeley/',
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
    tagline: '$50 credit for open-source model API - SDXL, Llama, Whisper',
    description:
      'Replicate gives verified students $50 credit for its API: run SDXL, Llama 3, Whisper, and 1000+ open models pay-per-second via API. Verifies with .EDU email or GitHub Student. Non-students can get it via CC .EDU mailbox or GitHub Pack file.',
    url: 'https://replicate.com/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/replicate.com.ico',
    category: 'api-access',
    tags: ['replicate', 'api', 'sdxl', 'llama', 'students'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign up with .EDU or GitHub Student',
        description:
          'Go to replicate.com/students → Sign up with .EDU email or link GitHub already approved for Pack.',
        url: 'https://replicate.com/students',
      },
      {
        title: 'Claim $50 credit',
        description:
          'After verification, check Billing → Credits → $50 appears. No card required for the student tier.',
      },
      {
        title: 'Run models via API',
        description:
          'Use replicate API at api.replicate.com/v1/predictions with your token. Pay per second after credit.',
      },
    ],
    nameAr: 'Replicate للطلاب',
    taglineAr: 'رصيد 50$ لواجهة النماذج المفتوحة - SDXL و Llama',
    descriptionAr: 'يمنح Replicate الطلاب 50$ رصيداً لواجهته: شغّل SDXL و Llama 3 و 1000+ نموذج عبر API. يتحقق ببريد .EDU أو GitHub Student.',
    stepsAr: [
      {
        title: 'سجّل ببريد .EDU أو GitHub',
        description: 'اذهب إلى replicate.com/students وسجّل ببريد .EDU أو اربط GitHub.',
        url: 'https://replicate.com/students',
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
    tagline: '$50 credit + free Postgres/Auth for 1 year via .EDU',
    description:
      'Supabase gives students $50 credit plus free tier for 1 year: hosted Postgres, Auth, Storage, and Realtime via .EDU email. Non-students can get it with CC .EDU mailbox (email-only).',
    url: 'https://supabase.com/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/supabase.com.ico',
    category: 'api-access',
    tags: ['supabase', 'postgres', 'students', 'backend', 'credits'],
    pricing: 'free',
    steps: [
      {
        title: 'Sign up with .EDU',
        description:
          'Visit supabase.com/students → Sign up with .EDU email. NON-STUDENT: use CC .EDU mailbox.',
        url: 'https://supabase.com/students',
      },
      {
        title: 'Create project and claim credit',
        description:
          'Create a Supabase project → Settings → Billing → “Student credit” → $50 auto-applies for .EDU domains.',
      },
      {
        title: 'Build with free tier',
        description:
          'Use Postgres, Auth, and Storage for 1 year free. Credit covers overages after free limits.',
      },
    ],
    nameAr: 'Supabase للطلاب',
    taglineAr: 'رصيد 50$ + Postgres مجاناً لسنة ببريد .EDU',
    descriptionAr: 'يمنح Supabase الطلاب 50$ رصيداً وطبقة مجانية لسنة: Postgres و Auth و Storage. يتحقق ببريد .EDU فقط.',
    stepsAr: [
      {
        title: 'سجّل ببريد .EDU',
        description: 'اذهب إلى supabase.com/students وسجّل ببريد .EDU.',
        url: 'https://supabase.com/students',
      },
      {
        title: 'أنشئ مشروعاً واطلب الرصيد',
        description: 'أنشئ مشروعاً → الإعدادات → الفوترة → "Student credit" → يُضاف 50$ تلقائياً.',
      },
      {
        title: 'ابنِ بالطبقة المجانية',
        description: 'استخدم Postgres و Auth لسنة مجاناً - الرصيد يغطي التجاوز.',
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
    url: 'https://1password.com/students/',
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
    tagline: 'Free Pro (AI + themes) via .EDU/GitHub Pack for 1 year',
    description:
      'Warp gives students free Pro for 1 year: AI command search, themes, and team sharing. Verifies via .EDU email or GitHub Student. Non-students can get it via CC .EDU mailbox or GitHub Pack file.',
    url: 'https://www.warp.dev/students',
    logoUrl: 'https://icons.duckduckgo.com/ip3/warp.dev.ico',
    category: 'tool',
    tags: ['warp', 'terminal', 'students', 'ai', 'productivity'],
    pricing: 'free',
    steps: [
      {
        title: 'Download Warp and sign up',
        description:
          'Visit warp.dev/students → Download Warp → Sign up with .EDU email or link GitHub Student.',
        url: 'https://www.warp.dev/students',
      },
      {
        title: 'Verify',
        description:
          'Click Verify → .EDU email or GitHub Student. CC .EDU and Pack file both accepted.',
      },
      {
        title: 'Enable Pro',
        description:
          'After verification, Settings → Subscription shows Pro. Renewable while enrolled.',
      },
    ],
    nameAr: 'Warp للطلاب',
    taglineAr: 'Pro مجاناً (AI وثيمات) لسنة',
    descriptionAr: 'يمنح Warp الطلاب Pro مجاناً لسنة: بحث أوامر AI وثيمات ومشاركة فريق. يتحقق عبر .EDU أو GitHub Student.',
    stepsAr: [
      {
        title: 'حمّل Warp وسجّل',
        description: 'اذهب إلى warp.dev/students → حمّل وسجّل ببريد .EDU أو اربط GitHub.',
        url: 'https://www.warp.dev/students',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    id: 'o133',
    slug: 'tanger-med-foundation-bourses',
    name: 'Tanger Med Foundation Bourses',
    tagline: 'Merit & excellence bourses for top bac students from northern Morocco',
    description:
      'The Tanger Med Foundation awards merit and excellence scholarships to outstanding baccalaureate holders from the northern regions (Tanger-Tétouan-Al Hoceima and beyond) entering Moroccan public engineering, business and science schools. Selection combines bac grade, school ranking and family income criteria; the bourse covers registration, living support and sometimes transport throughout the multi-year cycle.',
    url: 'https://www.tangermed.com/en/foundation',
    logoUrl: 'https://www.google.com/s2/favicons?domain=tangermed.com&sz=64',
    category: 'scholarship',
    tags: ['morocco', 'tanger-med', 'northern-region', 'bac', 'excellence'],
    pricing: 'free',
    steps: [
      {
        title: 'Score high on your bac',
        description:
          'Target recent bac holders (sciences/technical streams) with strong grades from northern-region high schools.',
        url: 'https://www.tangermed.com/en/foundation',
      },
      {
        title: 'Gather the dossier',
        description:
          'Bac transcript, school certificates, family income documentation and CNIE as specified by the call.',
      },
      {
        title: 'Apply & follow selection',
        description:
          'Files are reviewed against merit + social criteria; awardees keep the bourse across years subject to results.',
      },
    ],
    nameAr: 'منح مؤسسة طنجة المتوسط',
    taglineAr: 'منح الجدارة والتميز لمتفوقي الباكالوريا من جهات الشمال',
    descriptionAr: 'تمنح مؤسسة طنجة المتوسط منح الجدارة والتميز لحاملي الباكالوريا المتفوقين من الجهات الشمالية (طنجة-تطوان-الحسيمة وما حولها) الملتحقين بالمدارس الوطنية للعلوم والتطبيقية والتجارة، بمعايير نقط الباك وترتيب المدرسة والوضعية الاجتماعية، وتغطي التسجيل والدعم المعيشي طيلة الدورة.',
    stepsAr: [
      {
        title: 'حقق نتيجة باقوية',
        description: 'موجهة لحاملي باكالوريا العلوم والتقنية بمعدلات مرتفعة من ثانويات الشمال.',
        url: 'https://www.tangermed.com/en/foundation',
      },
      {
        title: 'جهّز الملف',
        description: 'كشف نقط الباك، شهادات مدرسية، وثائق المدخول وبطاقة التعريف حسب الدعوة.',
      },
      {
        title: 'قدّم وتابع الانتقاء',
        description: 'الانتقاء يجمع بين الجدارة والمعايير الاجتماعية وتستمر المنحة سنوات حسب النتائج.',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    name: 'Open Startup – The Science Road 2026',
    tagline: 'Two-track acceleration platform: Pre-Seed validation and Seed scaling',
    description: `The Science Road 2026 is a streamlined acceleration platform offering two tracks: a Pre-Seed track for solution validation and a Seed track for scaling technology startups and DeepTech projects.`,
    url: 'https://www.start-up.ma/programmes-pour-startups/open-startup-the-science-road-2026/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
    logoUrl: 'https://www.google.com/s2/favicons?domain=start-up.ma&sz=64',
    category: 'competition',
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
- Free: $0 — 100-200 credits/day, 1GB
- Plus: $24.99/mo ($19.99/mo annual) — 10,000 credits/mo, 50GB, first month free
- Pro: $249.99/mo ($199.99/mo annual) — 125,000 credits/mo, 1TB`,
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
- مجاني: $0 — 100-200 رصيد/يوم، 1 جيجابايت
- Plus: $24.99/شهر ($19.99/شهر سنوي) — 10,000 رصيد/شهر، 50 جيجابايت، الشهر الأول مجاناً
- Pro: $249.99/شهر ($199.99/شهر سنوي) — 125,000 رصيد/شهر، 1 تيرابايت`,
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
]
