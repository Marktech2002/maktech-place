/** @type {Array<[title: string, description: string, link?: string]>} */
export const projects = [
  ['StudyWithBash', 'An exam preparation platform I built.', 'https://studywithbash.online/'],
  ['Wholesale ERP', 'Wholesale Inventory and pos System for Small Scale Businesses', ''],
  [
    'SIWES e-logbook',
    'My final-year project at FUT Minna. A digital logbook for students to record their industrial training.',
  ],
  [
    'Barbing Salon Platform',
    'Built subscription software for a live barbershop using TypeScript, Node.js, MongoDB and React, with Paystack payments, automated notifications and Jest tests.',
  ],
  [
    'OPay-inspired backend API',
    'Built a fintech API with Node.js and TypeScript, using Redis for caching and BullMQ for background jobs.',
  ],
  [
    'E-Commerce API',
    'Built a Node.js and MongoDB REST API with JWT authentication, Paystack payments and Cloudinary media management.',
  ],
];
/** @type {Array<[company: string, role: string, achievements: string[]]>} */
export const jobs = [
  [
    'Weeshr App',
    'Backend Engineer · From April 2024',
    [
      'Expanded event management from birthdays to weddings, graduations and anniversaries using Node.js, TypeScript, Supabase, Redis, Cloudinary and MongoDB. User engagement rose 60%.',
      'Integrated Paystack transfer controls for more than 500 daily transactions, with a 99.8% success rate on live payouts.',
      'Built a role-based admin panel with granular permissions for more than 50 administrators.',
      'Cut partner payout processing time by 40% by improving transaction handling and queue management.',
      'Reviewed code, triaged defects and gained experience deploying with Docker and cloud platforms.',
    ],
  ],
  [
    'Unee App',
    "Mid-Senior Backend Engineer · From November 2025 - June 2026",
    [
      'Improved API response time by 50% by implementing Redis caching and optimizing database queries.',
      'Spearheaded wallet system for events planning and management',
      'Architectured kyc and onboarding flows using tier based verification system to comply with psl regulations',
      'Optimised push notifications and sms gateways for 5k+ users'
    ],
  ],
  [
    'Interchat',
    'Backend Engineer, contract · May–September 2025',
    [
      'Designed a Node.js and WebSocket messaging backend for more than 1,000 active users, including group chat and status updates.',
      'Implemented Firebase Cloud Messaging for Android and iOS, reaching a 95% delivery success rate.',
      'Integrated Twilio HD video calls for group prayer and study sessions.',
      'Designed schemas for profiles, chat history and community content, and integrated S3 for media storage.',
    ],
  ],
  [
    'Fatherland Foundation',
    'Software Developer · March–September 2024',
    [
      'Migrated JavaScript to TypeScript and reorganised the Node.js backend into modular services, reducing bugs by 30%.',
      'Built a Socket.IO and Redis chat system supporting more than 10,000 concurrent connections at under 100 ms latency.',
      'Implemented multipart S3 uploads in 5 MB chunks, achieving a 95% success rate for large-media transfers.',
      'Led a cross-functional team of 10 engineers that delivered notifications, chat and marketplace features in four months.',
      'Wrote API documentation and Postman testing procedures to help new teammates get started.',
    ],
  ],
  [
    'BigFix Technologies',
    'Software Engineer Intern · January–March 2024',
    [
      'Built and customised more than four Python-based Odoo modules to automate client workflows.',
      'Fixed a UI synchronisation issue that threatened configuration persistence during upgrades for more than 200 users.',
      'Delivered Odoo models, views and QWeb templates to client specifications within two weeks of onboarding.',
    ],
  ],
];

export const profile = {
  name: 'Yaqub Tawab Olamilekan',
  location: 'Lagos, Nigeria',
  github: 'https://github.com/Marktech2002',
  education:
    'First Class B.Tech. in Computer Science, Federal University of Technology, Minna, 2025',
  teaching: [
    'Led weekly Java object-oriented programming tutorials for more than 10 students.',
    'Taught numerical analysis, probability and linear algebra to more than 20 second-year Computer Science students.',
  ],
  interests: ['Backend engineering', 'Frontend development and design', 'Geospatial technology'],
};

export const socialLinks = {
  x: 'https://x.com/D_maktech',
  github: profile.github,
  linkedin: 'https://ng.linkedin.com/in/yaqub-tawab-olamilekan-44965427b',
  instagram: 'https://www.instagram.com/yaqubtawab/',
};

export const article = {
  slug: 'beyond-the-piles-of-refuse',
  publishedAt: '2026-11-16',
  title: 'Beyond the Piles of Refuse: Waste Collection in Lagos',
  stickerTitle: 'Beyond the Piles of Refuse',
  stickerContext: 'Lagos waste collection',
  description:
    'What the smell at Obalende, Mile 12 Ilele and Berger bus stop made me ask about waste collection in Lagos',
};

export const visionArticle = {
  slug: 'the-drain-in-the-frame',
  publishedAt: '2026-11-24',
  title: 'The Drain in the Frame',
  stickerTitle: 'The Drain in the Frame',
  stickerContext: 'Computer vision',
  description: 'What a photograph can tell us about waste in Lagos, and how computer vision might help compare what changes.',
};

export const writing = [article, visionArticle];
