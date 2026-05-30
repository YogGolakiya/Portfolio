export const PERSONAL = {
  name:       'Yog Golakiya',
  role:       'Full-Stack Developer',
  location:   'Dubai, UAE',
  email:      'golakiyayog@gmail.com',
  phone:      '+971 503 07 8898',
  github:     'https://github.com/YogGolakiya',
  linkedin:   'https://www.linkedin.com/in/yog-golakiya-456b26238',
  portfolio:  'https://yog-golakiya.vercel.app',
  cv:         '/YogGolakiya.pdf',
  summary:    'Full-Stack Developer with 2+ years of experience delivering web applications across e-commerce, automotive, and construction sectors. Skilled in React, Node.js, PHP, and the MERN stack with hands-on use of AI tools including Claude, GPT-4o, and GitHub Copilot.',
}

export const STATS = [
  { n: '2+',  l: 'Years coding'    },
  { n: '6+',  l: 'Projects shipped' },
  { n: '3',   l: 'Live client sites' },
  { n: 'MSc', l: 'Pursuing'     },
]

export const SKILLS = [
  {
    category: 'Frontend',
    color: 'a1',
    items: [
      { name: 'React.js',       icon: 'SiReact'       },
      { name: 'Next.js',        icon: 'SiNextdotjs'   },
      { name: 'TypeScript',     icon: 'SiTypescript'  },
      { name: 'JavaScript',     icon: 'SiJavascript'  },
      { name: 'Tailwind CSS',   icon: 'SiTailwindcss' },
      { name: 'Framer Motion',  icon: 'TbBrandFramerMotion' },
      { name: 'Three.js',       icon: 'SiThreedotjs'  },
      { name: 'GSAP',           icon: 'TbBolt'        },
      { name: 'Shadcn UI',      icon: 'TbComponents'  },
      { name: 'Angular',        icon: 'SiAngular'     },
      { name: 'Vue.js',         icon: 'SiVuedotjs'    },
    ],
  },
  {
    category: 'Backend',
    color: 'a2',
    items: [
      { name: 'Node.js',    icon: 'SiNodedotjs'   },
      { name: 'Express.js', icon: 'SiExpress'     },
      { name: 'PHP',        icon: 'SiPhp'         },
      { name: 'REST APIs',  icon: 'TbApi'         },
      { name: 'JWT Auth',   icon: 'TbShieldLock'  },
      { name: 'Stripe',     icon: 'SiStripe'      },
      { name: 'Razorpay',   icon: 'TbCreditCard'  },
    ],
  },
  {
    category: 'Database & Cloud',
    color: 'a3',
    items: [
      { name: 'MongoDB',    icon: 'SiMongodb'  },
      { name: 'MySQL',      icon: 'SiMysql'    },
      { name: 'PostgreSQL', icon: 'SiPostgresql' },
      { name: 'Firebase',   icon: 'SiFirebase' },
      { name: 'IBM Cloud',  icon: 'SiIbm'      },
      { name: 'Vercel',     icon: 'SiVercel'   },
    ],
  },
  {
    category: 'AI & Emerging Tech',
    color: 'a4',
    items: [
      { name: 'Claude AI',       icon: 'TbBrain'       },
      { name: 'GPT-4o',         icon: 'SiOpenai'      },
      { name: 'LangChain',      icon: 'TbLink'        },
      { name: 'n8n Automation', icon: 'TbSettingsAutomation' },
      { name: 'Watson AI',      icon: 'SiIbm'         },
      { name: 'HuggingFace',    icon: 'TbRobot'       },
      { name: 'Pinecone',       icon: 'TbDatabase'    },
      { name: 'GitHub Copilot', icon: 'SiGithubcopilot' },
    ],
  },
]

export const EXPERIENCE = [
  {
    title:   'MSc Student — Digital Transformation',
    company: 'University of Wollongong in Dubai',
    period:  'APR 2026 – PRESENT',
    color:   'a3',
    bullets: [
      'Exploring AI automation, LLM integration, and enterprise cloud architecture.',
      'Building R&D projects with IBM Watson AI Studio and n8n automation.',
      'Studying data science fundamentals and digital business transformation strategy.',
    ],
    tags: ['IBM Watson','LangChain','n8n','Data Science','Cloud Architecture'],
  },
  {
    title:   'Freelance Full-Stack Developer',
    company: 'Self-Employed · Surat, India → Dubai',
    period:  'MAY 2024 – PRESENT',
    color:   'a1',
    bullets: [
      'Delivered 6+ custom web applications for clients across e-commerce, automotive, and construction sectors.',
      'Built full-stack solutions using MERN/MEAN stack with focus on performance and cross-browser compatibility.',
      'Implemented Stripe, Razorpay, EmailJS, Google AdSense, and booking system integrations.',
      'End-to-end client communication — requirements gathering, technical consultation, delivery, and post-launch support.',
    ],
    tags: ['React.js','Node.js','PHP','MongoDB','MySQL','Stripe','EmailJS','Framer Motion'],
  },
  {
    title:   'Trainee Full-Stack Developer',
    company: 'Goyani Technologies · Surat, India',
    period:  'MAY 2023 – APR 2024',
    color:   'a2',
    bullets: [
      'Developed dynamic web applications using React, Node.js, Express.js, and MongoDB.',
      'Built responsive frontend interfaces ensuring optimal UX across all devices.',
      'Collaborated in Agile environment to deliver projects on schedule.',
      'Participated in code reviews and drove continuous improvement of development practices.',
    ],
    tags: ['React.js','Express.js','MongoDB','REST APIs','Agile'],
  },
]

export const EDUCATION = [
  {
    degree:  'Master of Digital Transformation',
    school:  'University of Wollongong in Dubai (UOWD)',
    period:  'April 2026 – Present',
    color:   'a3',
    status:  'Pursuing',
  },
  {
    degree:  'Bachelor of Computer Application (B.C.A)',
    school:  'Veer Narmad South Gujarat University, Surat, India',
    period:  'June 2020 – April 2023',
    color:   'a2',
    status:  'Completed',
  },
]

export const PROJECTS = [
  {
    title:  'Dr. Wall Care Products',
    image:  '/drwallcare.png',
    desc:   'Corporate brand website for a construction chemicals company. Dynamic hero slider, animated product catalogue, and mobile-optimised visitor inquiry/booking flow.',
    stack:  ['React.js','Tailwind CSS','Framer Motion','EmailJS','JSON','Shared Hosting'],
    live:   'https://drwallcare.com',
    code:   'https://github.com/YogGolakiya',
    tags:   ['CLIENT','LIVE'],
    color:  'a1',
    period: 'Feb 2026 – Apr 2026',
  },
  {
    title:  'Krishna Motors',
    image:  '/krishna.png',
    desc:   'Automotive workshop web app with serverless EmailJS intake, mobile-first Shadcn UI, and smooth animations for premium client lead generation.',
    stack:  ['React.js','Tailwind CSS','Shadcn UI','Framer Motion','EmailJS'],
    live:   'https://krishnamotorss.com',
    code:   'https://github.com/YogGolakiya/KrishnaMotors',
    tags:   ['CLIENT','LIVE'],
    color:  'a2',
    period: 'Aug 2025 – Sep 2025',
  },
  {
    title:  'E-Commerce Platform',
    image:  '/Shopping.png',
    desc:   'Full MERN stack marketplace with product management, cart, Stripe checkout, admin dashboard, and JWT authentication.',
    stack:  ['React.js','Node.js','MongoDB','Express.js','Stripe API','JWT'],
    live:   'https://best-buy-04.vercel.app/',
    code:   'https://github.com/YogGolakiya/BestBuy-backend',
    tags:   ['PERSONAL','LIVE'],
    color:  'a3',
    period: 'Apr 2023',
  },
  {
    title:  'Coffee Shop App',
    image:  '/Coffee.png',
    desc:   'React + Firebase realtime ordering application with live order tracking, menu management, and clean mobile-first customer UX.',
    stack:  ['React.js','Firebase','Tailwind CSS'],
    live:   'https://vi-cafe-b963a.web.app/',
    code:   'https://github.com/YogGolakiya/Cafe-shop',
    tags:   ['PERSONAL','LIVE'],
    color:  'a4',
    period: '2023',
  },
  {
    title:  'Ad Management Platform',
    image:  '/Ad-managment.jpeg',
    desc:   'PHP & MySQL AdSense management system with admin panel for campaign control, placement analytics, and Google AdSense integration.',
    stack:  ['PHP','MySQL','JavaScript','Bootstrap'],
    live:   null,
    code:   'https://github.com/YogGolakiya',
    tags:   ['CLIENT','LIVE'],
    color:  'a1',
    period: '2024',
  },
  {
    title:  'Predictive Data Pipeline',
    image:  null,
    desc:   'Academic R&D project exploring IBM Watson AI Studio — models predictive data streams and experiments with LLM orchestration and vector DB retrieval.',
    stack:  ['IBM Cloud','Watson AI Studio','Python','Pinecone'],
    live:   null,
    code:   'https://github.com/YogGolakiya',
    tags:   ['R&D','AI'],
    color:  'a2',
    period: '2026',
  },
]

export const APPS = [
  {
    title:    'Dayly',
    tagline:  'Habit & Expense Tracker',
    desc:     'Offline-first Flutter app that combines daily habit tracking with expense management. Visual streaks, monthly heatmaps, smart budget alerts, and full analytics — zero accounts, all data stays on your device.',
    platform: ['iOS', 'Android'],
    tech:     ['Flutter', 'Hive DB', 'Provider', 'FL Chart'],
    ios:      null,   // add App Store link when published
    android:  null,   // add Play Store link when published
    live:     null,
    code:     'https://github.com/YogGolakiya/Apps/tree/main/dayly',
    color:    'a1',
    icon:     '📅',
    image:    '/dayly.jpeg',
    status:   'LIVE',
  },
  // ─── Second app coming soon — replace the object below with real data ───
  {
    title:    'Coming Soon',
    tagline:  'Next Flutter app',
    desc:     'Details will be added when the second app is ready to showcase.',
    platform: ['iOS', 'Android'],
    tech:     ['Flutter'],
    ios:      null,
    android:  null,
    live:     null,
    code:     'https://github.com/YogGolakiya',
    color:    'a3',
    icon:     '🚀',
    status:   'IN DEV',
  },
]

export const THEMES = [
  { id: 'earthy', label: 'Earthy',        swatch: 'linear-gradient(135deg,#c9913d,#5c7a5e)' },
  { id: 'sage',   label: 'Sage Green',    swatch: 'linear-gradient(135deg,#5c7a5e,#3a8a6e)' },
  { id: 'sky',    label: 'Sky Blue',      swatch: 'linear-gradient(135deg,#4a9bbe,#2a7aae)' },
  { id: 'dusk',   label: 'Dusk Purple',   swatch: 'linear-gradient(135deg,#b87aee,#1a1520)' },
  { id: 'crimson', label: 'Crimson Night',  swatch: 'linear-gradient(135deg,#e83a3a,#0f0a0a)' },
]

export const THEME_PALETTES = {
  earthy: [[201,145,61],[92,122,94],[74,155,190],[192,97,79]],
  sage:   [[92,122,94],[58,138,110],[106,170,94],[138,184,94]],
  sky:    [[74,155,190],[42,122,174],[90,184,212],[58,90,158]],
  dusk:   [[184,122,238],[122,90,184],[232,160,216],[240,176,96]],
  crimson: [[232,58,58],[192,32,32],[255,107,107],[240,160,48]],
}
