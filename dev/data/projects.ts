export interface Project {
  slug: string;
  title: string;
  headline: string;
  tags: string[];
  filterTags: FilterTag[];
  body: string;
  thumb?: string; // card thumbnail (light palette)
  thumbDark?: string; // card thumbnail (dark palette)
  images?: string[]; // case study images
  videos?: string[]; // case study videos (first = primary)
}

export type FilterTag =
  | "Animation"
  | "Brand Campaign"
  | "CRM & Data"
  | "WordPress"
  | "Platform Build"
  | "DevOps"
  | "Mobile";

export const ALL_FILTER_TAGS: FilterTag[] = [
  "Animation",
  "Brand Campaign",
  "CRM & Data",
  "WordPress",
  "Platform Build",
  "DevOps",
  "Mobile",
];

export const projects: Project[] = [
  {
    slug: "real-time-campaign-gsap-animation",
    title: "Porsche Expedition Cayenne",
    headline: "Animated as it happened — Porsche Expedition Cayenne.",
    tags: [
      "JavaScript",
      "GSAP",
      "SVG Animation",
      "Brand Landing Page",
      "Campaign",
      "Sass",
      "CSS",
    ],
    filterTags: ["Animation", "Brand Campaign"],
    body: "Porsche's Expedition Cayenne campaign needed a website that could keep pace with a real journey across South America. GSAP-driven SVG animations tracked the Cayenne's progress region by region, surfacing the car features that made each leg of the drive possible. The site updated in near real time as drivers uploaded images and video from remote locations along the route. Deployed across all Latin American markets, the experience wove together feature storytelling and social media activations from the road.",
    thumb: "/work/images/real-time-campaign-gsap-animation-thumb-light.jpg",
    thumbDark: "/work/images/real-time-campaign-gsap-animation-thumb-dark.jpg",
    videos: ["/work/video/real-time-campaign-gsap-animation.mp4"],
  },
  {
    slug: "covergirl-parallax-scroll-animation",
    title: "Covergirl Supersizer",
    headline: "Motion as product story — Covergirl Supersizer.",
    tags: [
      "JavaScript",
      "Parallax",
      "Scroll Animation",
      "Campaign Landing Page",
      "Responsive Web Design",
      "Mobile",
      "GSAP",
    ],
    filterTags: ["Animation", "Brand Campaign"],
    body: "Covergirl's Supersizer campaign needed a landing page built for a young audience. Animation was the core feature, a horizontal parallax side scroller letting the product story unfold without interrupting native interactions. Responsive across early mobile devices and legacy browsers, the experience held consistently wherever users landed. The campaign earned 40,000+ impressions over three months through in-store QR placements at Walmart.",
    thumb: "/work/images/covergirl-parallax-scroll-animation-thumb-light.jpg",
    thumbDark:
      "/work/images/covergirl-parallax-scroll-animation-thumb-dark.jpg",
    images: ["/work/images/covergirl-parallax-scroll-animation.png"],
    videos: ["/work/video/covergirl-parallax-scroll-animation.mp4"],
  },

  {
    slug: "multi-market-landing-pages-crm",
    title: "Porsche Latin America Dealer Landing Pages",
    headline:
      "After-sales infrastructure built for 16 markets — Porsche LATAM.",
    tags: [
      "CRM Integration",
      "Lead Collection",
      "Email Templates",
      "Component Library",
      "Landing Page",
      "JavaScript",
      "Version Control",
    ],
    filterTags: ["CRM & Data", "Brand Campaign"],
    body: "Latin American Porsche needed help integrating their custom CRM into a new generation of market landing pages across 16 countries. The solution required engineering the data flow between the website, CRM, and after-sales systems, connecting lead data from campaign pages to existing Porsche customer records. That data fed directly into their custom CRM platform, enabling personalized after-sales email communication at scale. The second part of the project was a suite of marketing websites across all 16 markets, each carrying regional language, dealer activations, and the latest brand campaigns. The sites also served as a portal for existing customers and after-sales management. The biggest technical challenge was building a modular template library that could work within Porsche's rigid CMS requirements.",
    thumb: "/work/images/multi-market-landing-pages-crm-thumb-light.jpg",
    thumbDark: "/work/images/multi-market-landing-pages-crm-thumb-dark.jpg",
    images: [
      "/work/images/multi-market-landing-pages-crm.jpg",
      "/work/images/multi-market-landing-pages-crm-2.jpg",
      "/work/images/multi-market-landing-pages-crm-3.jpg",
    ],
  },
  {
    slug: "wordpress-boat-dealer-locator-crm",
    title: "Invincible Boats",
    headline: "From boat builder to dealer network — Invincible Boats.",
    tags: [
      "WordPress",
      "PHP",
      "JavaScript",
      "Google Maps API",
      "CRM Integration",
      "API Integration",
      "Lead Generation",
      "Dealer Locator",
      "Brand Website",
    ],
    filterTags: ["WordPress", "CRM & Data"],
    body: "Invincible Boats needed a new branded website that could serve both customers and their dealer network. I built a territory-based dealer locator with CRM lead routing, ensuring each inquiry reached the right dealer based on their sales territory. A custom boat builder was integrated via API, alongside a classifieds section for used boat listings, giving customers a complete ownership experience in one platform. Ongoing news and events maintenance kept the brand presence current after launch.",
    thumb: "/work/images/wordpress-boat-dealer-locator-crm-thumb-light.jpg",
    thumbDark: "/work/images/wordpress-boat-dealer-locator-crm-thumb-dark.jpg",
  },
  {
    slug: "nextjs-stripe-tournament-registration-portal",
    title: "Herman Lucerne Memorial Tournament",
    headline:
      "Tournament registration built for a fishing community — Herman Lucerne.",
    tags: [
      "Next.js",
      "Stripe",
      "Zod",
      "Registration Portal",
      "Payment Integration",
      "Nonprofit",
      "Form Validation",
    ],
    filterTags: ["Platform Build", "CRM & Data"],
    body: "The Herman Lucerne Memorial Tournament needed a website to support their ongoing philanthropy efforts and a registration portal for their annual fishing tournaments. I built the portal in Next.js, handling fisherman registration, tournament fees, and sponsorship collection through Stripe. Zod was used for input validation, ensuring data integrity and security across all form submissions.",
    thumb:
      "/work/images/nextjs-stripe-tournament-registration-portal-thumb-light.jpg",
    thumbDark:
      "/work/images/nextjs-stripe-tournament-registration-portal-thumb-dark.jpg",
  },
  {
    slug: "higher-education-lead-generation-salesforce",
    title: "University of Miami Graduate Business School",
    headline: "14 programs, one lead generation system — University of Miami.",
    tags: [
      "PHP",
      "JavaScript",
      "Lead Generation",
      "CRM Integration",
      "Salesforce",
      "Backend Development",
      "Landing Page",
      "Higher Education",
    ],
    filterTags: ["CRM & Data", "Platform Build"],
    body: "The University of Miami Graduate Business School needed a lead generation system across 14 graduate programs. I developed all 14 landing pages using a shared component library, keeping each program consistent while allowing for program-specific content. The backend infrastructure routed each submission into a central database tied to the specific program. A data export integrated directly with Salesforce, giving the University's sales and marketing team clean, actionable lead data.",
    thumb:
      "/work/images/higher-education-lead-generation-salesforce-thumb-light.jpg",
    thumbDark:
      "/work/images/higher-education-lead-generation-salesforce-thumb-dark.jpg",
    images: [
      "/work/images/higher-education-lead-generation-salesforce-2.jpg",
      "/work/images/higher-education-lead-generation-salesforce-3.jpg",
    ],
  },
  {
    slug: "nonprofit-gsap-svg-animation-wordpress",
    title: "Captains for Clean Water",
    headline:
      "The story of local captains fighting for Florida's water — Captains for Clean Water.",
    tags: [
      "JavaScript",
      "GSAP",
      "SVG Animation",
      "WordPress",
      "Salesforce",
      "CRM Integration",
      "Nonprofit",
      "Sass",
    ],
    filterTags: ["Animation", "WordPress", "CRM & Data"],
    body: "Captains for Clean Water needed a website that could turn an environmental crisis into a call to action. I created a GSAP-driven SVG timeline animation of the story of Lake Okeechobee, mapping how agricultural runoff had overtaken South Florida's water supply and the downstream effects of algae blooms on the environment. Built within the constraints of an existing WordPress template, the animation fit seamlessly into their platform without a full rebuild. Fundraising and shop functionality were integrated with Salesforce. Donor records, shop transactions, and supporter engagement, previously managed across separate platforms, were consolidated into a single CRM view for the first time. That unified visibility gave the organization the infrastructure to build and sustain a grassroots campaign at scale.",
    thumb:
      "/work/images/nonprofit-gsap-svg-animation-wordpress-thumb-light.jpg",
    thumbDark:
      "/work/images/nonprofit-gsap-svg-animation-wordpress-thumb-dark.jpg",
    videos: ["/work/video/nonprofit-gsap-svg-animation-wordpress.mp4"],
  },

  {
    slug: "mobile-first-event-schedule-web-app",
    title: "Porsche Convention Events",
    headline: "The convention in your pocket — Porsche Convention Events.",
    tags: [
      "Mobile Web App",
      "Real-Time",
      "Event Management",
      "Mobile-First",
      "Cross-Browser",
      "JavaScript",
    ],
    filterTags: ["Mobile", "Platform Build"],
    body: "Porsche needed a mobile web app to manage event schedules for their international dealer convention, a project that ran across two consecutive years. The app tracked events in real time, allowing attendees to follow different tracks and stay current across a full convention schedule. Built mobile-first and cross-browser compatible, the experience held consistently across devices for a global audience.",
    thumb: "/work/images/mobile-first-event-schedule-web-app-thumb-light.jpg",
    thumbDark:
      "/work/images/mobile-first-event-schedule-web-app-thumb-dark.jpg",
  },
  {
    slug: "wordpress-boat-dealer-website-crm",
    title: "Yellowfin Boats",
    headline: "Same platform, distinct identity — Yellowfin Boats.",
    tags: [
      "WordPress",
      "PHP",
      "JavaScript",
      "Google Maps API",
      "CRM Integration",
      "API Integration",
      "Lead Generation",
      "Dealer Locator",
      "Brand Website",
    ],
    filterTags: ["WordPress", "CRM & Data"],
    body: "Yellowfin Boats required the same core feature set as Invincible Boats, including a territory-based dealer locator, CRM lead routing, API-integrated boat builder, and a used boat classifieds section, built to a distinct brand identity and layout. Each component was adapted to match Yellowfin's branding, ensuring a cohesive experience across the full platform. Ongoing news and events maintenance kept the brand presence current after launch.",
    thumb: "/work/images/wordpress-boat-dealer-website-crm-thumb-light.jpg",
    thumbDark: "/work/images/wordpress-boat-dealer-website-crm-thumb-dark.jpg",
  },
  {
    slug: "multi-site-cms-platform-features-maintenance",
    title: "NWA Online",
    headline: "17 sites, two platforms, eight years of news — NWA Online.",
    tags: [
      "CMS Management",
      "Solr",
      "Search Architecture",
      "API Integration",
      "UI Development",
      "Platform Migration",
      "PHP",
      "JavaScript",
    ],
    filterTags: ["Platform Build", "CRM & Data"],
    body: "I was part of a team handling daily fixes, feature requests, and UI/UX additions across the main newspaper site and 17 subsidiary papers. I also designed and developed special sections, including the University of Arkansas Athletics forums, Photo Section, and sitewide search. Search was powered by a Solr server indexing eight years of news articles, with third-party APIs integrated to expand the site's functionality.",
    thumb:
      "/work/images/multi-site-cms-platform-features-maintenance-thumb-light.jpg",
    thumbDark:
      "/work/images/multi-site-cms-platform-features-maintenance-thumb-dark.jpg",
  },
  {
    slug: "full-stack-real-time-news-election-app",
    title: "NWA Democrat-Gazette: Election App",
    headline: "Local races, live — NWA Democrat-Gazette Election App.",
    tags: [
      "Full-Stack Development",
      "Real-Time Data",
      "JavaScript",
      "Backend Development",
      "News Application",
      "Data Visualization",
      "Stakeholder Management",
    ],
    filterTags: ["Platform Build"],
    body: "The Northwest Arkansas Democrat-Gazette needed a full-stack app to track local election results and display them in the newspaper's UI in real time. I built the full application, UI through backend, working directly with the newsroom manager to fulfill their requirements for election night. Results were published directly to the newspaper's website, updating every minute throughout the night as local races developed.",
    thumb:
      "/work/images/full-stack-real-time-news-election-app-thumb-light.jpg",
    thumbDark:
      "/work/images/full-stack-real-time-news-election-app-thumb-dark.jpg",
  },
  {
    slug: "animated-gsap-banners-mercury",
    title: "Mercury: Repower",
    headline: "Big engine, subtle animations — Mercury Repower.",
    tags: [
      "HTML5 Banners",
      "GSAP",
      "SVG Animation",
      "JavaScript",
      "Animated Banners",
      "Brand Campaign",
      "Display Advertising",
    ],
    filterTags: ["Animation", "Brand Campaign"],
    body: "Mercury's campaign needed animated banners that called attention to their repower campaign without overshadowing the engine. I used GSAP animations to highlight each engine's features with intentional restraint, letting subtle motion carry the brand story without competing with it. The main technical challenge was maintaining consistent animation timing across every banner size, ensuring the experience felt unified regardless of placement.",
    thumb: "/work/images/animated-gsap-banners-mercury-thumb-light.jpg",
    thumbDark: "/work/images/animated-gsap-banners-mercury-thumb-dark.jpg",
    videos: [
      "/work/video/animated-gsap-banners-mercury.mp4",
      "/work/video/animated-gsap-banners-mercury-2.mp4",
      "/work/video/animated-gsap-banners-mercury-3.mp4",
    ],
  },
  {
    slug: "santa-margherita-uncork-extraordinary-animation",
    title: "Santa Margherita: Uncork Extraordinary",
    headline:
      "Making randomness feel alive — Santa Margherita Uncork Extraordinary.",
    tags: [
      "HTML5 Banners",
      "GSAP",
      "JavaScript",
      "Animated Banners",
      "Brand Campaign",
      "Display Advertising",
    ],
    filterTags: ["Animation", "Brand Campaign"],
    body: "Santa Margherita's Uncork Extraordinary campaign needed animated banners that felt as alive as the campaign imagery. I used a pseudo-random number generator in JavaScript to simulate realistic bubble behavior, each bubble moving with enough variation to feel natural rather than mechanical. GSAP drove the animations, keeping the motion in sync with the campaign's visual language across every banner size.",
    thumb:
      "/work/images/santa-margherita-uncork-extraordinary-animation-thumb-light.jpg",
    thumbDark:
      "/work/images/santa-margherita-uncork-extraordinary-animation-thumb-dark.jpg",
    videos: [
      "/work/video/santa-margherita-uncork-extraordinary-animation.mp4",
      "/work/video/santa-margherita-uncork-extraordinary-animation-2.mp4",
    ],
  },
  {
    slug: "virgin-voyages-launch-campaign-animation-banners",
    title: "Virgin Voyages: Launch Campaign",
    headline: "A ship reveal, frame by frame — Virgin Voyages Launch Campaign.",
    tags: [
      "HTML5 Banners",
      "GSAP",
      "JavaScript",
      "Animated Banners",
      "Brand Campaign",
      "Display Advertising",
      "Performance Optimization",
    ],
    filterTags: ["Animation", "Brand Campaign"],
    body: "Virgin Voyages needed launch campaign banners that introduced their ship before it hit the water. A flipbook animation effect brought the reveal to life, sequencing frames to build anticipation for the debut. The main technical challenge was keeping file sizes within ad network limits while preserving the quality of the animation, requiring careful optimization of every frame.",
    thumb:
      "/work/images/virgin-voyages-launch-campaign-animation-banners-thumb-light.jpg",
    thumbDark:
      "/work/images/virgin-voyages-launch-campaign-animation-banners-thumb-dark.jpg",
    videos: [
      "/work/video/virgin-voyages-launch-campaign-animation-banners.mp4",
      "/work/video/virgin-voyages-launch-campaign-animation-banners-2.mp4",
    ],
  },
  {
    slug: "porsche-social-augmented-reality-filter",
    title: "Porsche: Instagram AR Filter",
    headline: "Social activation, built in AR — Porsche Jamaica.",
    tags: [
      "AR Filter",
      "Meta Spark",
      "Augmented Reality",
      "Instagram",
      "Social Media",
      "Brand Activation",
    ],
    filterTags: ["Brand Campaign", "Mobile"],
    body: "Porsche needed a social activation for the Jamaican market that went beyond a traditional ad. Built as an extension of an existing brand campaign, the filter was developed in Meta Spark Studio and deployed on Instagram, bringing the campaign directly into users' hands. The execution gave the Jamaica market a shareable, brand-native touchpoint designed to drive organic social engagement.",
    thumb:
      "/work/images/porsche-social-augmented-reality-filter-ar-thumb-light.jpg",
    thumbDark:
      "/work/images/porsche-social-augmented-reality-filter-ar-thumb-dark.jpg",
    videos: ["/work/video/porsche-social-augmented-reality-filter.mp4"],
  },

  {
    slug: "florida-tourism-landing-page-brand-repositioning",
    title: "Visit Florida: Treasure Coast",
    headline: "The Treasure Coast, don't come here — Visit Florida.",
    tags: [
      "Branded Landing Page",
      "API Integration",
      "Instagram Integration",
      "User Generated Content",
      "Tourism",
      "Real-Time Data",
    ],
    filterTags: ["Brand Campaign", "Platform Build"],
    body: "Visit Florida needed a tourism landing page to support a brand repositioning for the Treasure Coast. An Instagram integration showed user-generated content, letting real visitors tell the destination's story through their own photos. A real-time weather API gave tourists live conditions on the page, with comparisons to other tourist regions reinforcing what makes the Treasure Coast distinct.",
    thumb:
      "/work/images/florida-tourism-landing-page-brand-repositioning-thumb-light.jpg",
    thumbDark:
      "/work/images/florida-tourism-landing-page-brand-repositioning-thumb-dark.jpg",
    images: [
      "/work/images/florida-tourism-landing-page-brand-repositioning.png",
    ],
  },
  {
    slug: "event-landing-page-brand-repositioning",
    title: "Miami Boating Week",
    headline: "On the water and on the map — Miami Boating Week.",
    tags: [
      "Google Maps API",
      "Branded Landing Page",
      "API Integration",
      "Event Website",
    ],
    filterTags: ["Brand Campaign", "Platform Build"],
    body: "Miami Boating Week needed a landing page to support a brand repositioning alongside an informational site for their annual boat convention. Google Maps API was integrated to surface the convention location, parking, and available docks, accounting for attendees arriving by both car and water.",
    thumb:
      "/work/images/event-landing-page-brand-repositioning-thumb-light.jpg",
    thumbDark:
      "/work/images/event-landing-page-brand-repositioning-thumb-dark.jpg",
  },

  {
    slug: "html-email-templates-crm-marketing-integration",
    title: "Email Template Development",
    headline: "Brand email, built to scale — Email Template Development.",
    tags: [
      "HTML Email",
      "Email Templates",
      "CRM Integration",
      "Salesforce",
      "Modular Templates",
      "Direct Marketing",
      "Cross-Client Compatibility",
    ],
    filterTags: ["CRM & Data"],
    body: "Building email templates across Mercury Marine, Porsche Latin America, Liebherr, University of Miami, Children's Hospital of Richmond, and O2 Investments required a disciplined approach to technical standards and design fidelity. I developed hand-coded HTML email templates compatible with all major mail clients, adapting each to the brand's visual identity while maintaining consistency across campaigns. For Porsche Latin America and the University of Miami Graduate School, templates were integrated directly with each organization's CRM, ensuring every send carried personalized, customer-relevant data rather than generic messaging.",
    thumb:
      "/work/images/html-email-templates-crm-marketing-integration-thumb-light.jpg",
    thumbDark:
      "/work/images/html-email-templates-crm-marketing-integration-thumb-dark.jpg",
  },
  {
    slug: "full-lifecycle-wordpress-cms-management",
    title: "CMS Management",
    headline: "Full-lifecycle CMS management across major brands.",
    tags: [
      "WordPress",
      "CMS Management",
      "Content Management",
      "WordPress Development",
      "Website Maintenance",
      "Feature Development",
    ],
    filterTags: ["WordPress", "CRM & Data"],
    body: "Managing CMS platforms for Invincible Boats, Yellowfin, Boyne Capital, O2 Investments, Porsche Latin America, Captains for Clean Water, and Herman Lucerne Memorial meant owning the full lifecycle of each site beyond launch. I handled content updates, bug fixes, and feature requests, keeping each platform current and functioning without disrupting ongoing business operations. The work required adapting quickly across different CMS architectures and brand requirements, maintaining consistency and performance across a diverse client portfolio.",
    thumb:
      "/work/images/full-lifecycle-wordpress-cms-management-thumb-light.jpg",
    thumbDark:
      "/work/images/full-lifecycle-wordpress-cms-management-thumb-dark.jpg",
  },
  {
    slug: "devops-architecture-aws-cloudflare-security",
    title: "DevOps Architecture & Operations",
    headline:
      "The infrastructure behind the work — DevOps Architecture & Operations.",
    tags: [
      "DevOps",
      "CI/CD",
      "Git",
      "Webpack",
      "Vite",
      "AWS",
      "Vercel",
      "Cloudflare",
      "Security",
      "Infrastructure",
    ],
    filterTags: ["DevOps"],
    body: "I was responsible for the full agency DevOps tools and infrastructure, setting up and maintaining the toolchain across AWS EC2, Lightsail, RDS, Vercel, and GitHub. Working closely with clients, I helped assess their security and traffic demands to recommend the right infrastructure for their needs. Security was an active part of the role, using Cloudflare to protect sites against consistent DDoS attacks and WordPress exploits.",
    thumb:
      "/work/images/devops-architecture-aws-cloudflare-security-thumb-light.jpg",
    thumbDark:
      "/work/images/devops-architecture-aws-cloudflare-security-thumb-dark.jpg",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  next: Project;
  prev: Project;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  return { next, prev };
}
