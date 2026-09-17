import type {
  ExperienceItem,
  ProjectItem,
  SkillGroup,
} from "../types/portfolio";

export const PERSONAL_INFO = {
  name: "Yusuf Nurfaizi Putra",
  shortName: "YUSUF",
  role: "Frontend Engineer",
  experienceYears: 4,
  location: "Indonesia",
  heroTitle: ["Turning", "Ideas Into", "Interfaces."],
  heroSubtitle:
    "Crafting responsive, accessible, and visually engaging websites with a focus on clean code and seamless user experience.",
  aboutGreeting: "Hello, I'm",
  aboutBio:
    "Front-end developer passionate about creating fast, functional, and beautiful interfaces through thoughtful design and modern web technologies.",
  contactHeading: "LET'S WORK TOGETHER! 🚀",
  contactSubtitle:
    "Transforming ideas into seamless digital products — one pixel at a time.",
  email: "yusufnurfaizip05@gmail.com",
  github: "https://github.com/faiz1405",
  linkedin: "https://www.linkedin.com/in/yusuf-nurfaizi-putra-3292b8215/",
  whatsapp:
    "https://wa.me/6281234567890?text=Halo%20Yusuf,%20saya%20tertarik%20bekerja%20sama%20dengan%20Anda!",
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Main Software",
    items: [
      "VS Code",
      "Figma",
      "Claude",
      "Chrome DevTools",
      "Git & GitHub",
      "Postman",
      "Vercel",
      "Terminal / Bash",
    ],
  },
  {
    title: "Services",
    items: [
      "Front-End Web Development",
      "Responsive Web Applications",
      "UI/UX Design Systems",
      "Interactive Prototypes",
      "Performance Optimization",
      "Web Accessibility (a11y)",
    ],
  },
  {
    title: "Main Skills",
    items: [
      "ReactJS & Next.js",
      "Vue & Nuxt.js",
      "Laravel",
      "React Router 7",
      "TypeScript & JavaScript (ES6+)",
      "Tailwind",
      "Bootstrap",
      "HTML5 & Semantic Markup",
      "State Management (Zustand/Pinia)",
      "GSAP & Micro-animations",
    ],
  },
  {
    title: "Methodologies",
    items: [
      "Component-Driven Development",
      "Clean Code & DRY Principles",
      "Mobile-First Architecture",
      "RESTful API Integration",
      "Cross-Browser Compatibility",
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-floothink",
    period: "Mar 2023 - Present",
    role: "FRONTEND DEVELOPER",
    company: "Floothink 360° Digital Agency",
    location: "Jakarta Selatan, Indonesia",
    description:
      "Developing and maintaining modern web applications with a focus on scalable frontend architectures. Responsible for translating high-fidelity designs into pixel-perfect, responsive interfaces, ensuring robust cross-browser compatibility, and seamlessly integrating complex RESTful APIs for real-time functionality.",
    technologies: [
      "Vue.js",
      "React.js",
      "Next.js",
      "Nuxt.js",
      "Tailwind CSS",
      "Laravel",
      "GSAP",
    ],
  },
  {
    id: "exp-add-to-cart",
    period: "Jul 2022 - Oct 2022",
    role: "FRONTEND WEB DEVELOPER",
    company: "Add to Cart",
    location: "Indonesia",
    description:
      "Kickstarted professional frontend career by developing and managing e-commerce websites using the Prestashop web builder. Customized and enhanced web interfaces using HTML, CSS, and JavaScript to meet specific business needs and provide a smooth, reliable online shopping experience.",
    technologies: ["Prestashop", "HTML", "JavaScript", "CSS"],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "proj-suzuki",
    title: "Suzuki Indonesia",
    category: "Corporate Website & Event Pages",
    year: "2023 - Present",
    description:
      "Core frontend development for Suzuki Indonesia's official website. Re-architected purchasing flows, modernized UI/UX consistency, and built high-performance event landing pages handling massive traffic for major automotive exhibitions like IIMS, GIIAS, and GJAW.",
    highlights: [
      "Developed high-traffic landing pages for IIMS, GIIAS, and GJAW",
      "Optimized page load speeds and cross-browser visual stability",
      "Improved UI/UX consistency and mobile responsiveness",
    ],
    technologies: [
      "PHP (CodeIgniter 3)",
      "Bootstrap",
      "JavaScript",
      "UI/UX Design",
    ],
    liveUrl: "https://www.suzuki.co.id/",
    imageTheme: {
      background: "#ffffff",
      accentColor: "#003296",
      deviceType: "desktop",
      imageUrl: "/projects/suzuki.jpg",
    },
  },
  {
    id: "proj-icar",
    title: "ICAR",
    category: "Corporate Website",
    year: "2025 - Present",
    description:
      "Pixel-perfect, responsive company profile website for ICAR. Handles complex information architecture with seamless RESTful API integration, ensuring zero-error functionality and platform stability.",
    highlights: [
      "Pixel-perfect responsive interface for high-profile corporate site",
      "Seamless RESTful API integration for dynamic content management",
      "Real-time bug monitoring and platform stability maintenance",
    ],
    technologies: ["Vue", "Nuxt.js", "Tailwind CSS", "GSAP", "REST API"],
    liveUrl: "https://icar.co.id/",
    imageTheme: {
      background: "#f8f9fa",
      accentColor: "#dc2626",
      deviceType: "desktop",
      imageUrl: "/projects/icar.jpg",
    },
  },
  {
    id: "proj-izumi",
    title: "Federal Izumi Manufacturing (FIM)",
    category: "Corporate Website & CMS",
    year: "2026 - Present",
    description:
      "Company profile website and custom Content Management System (CMS) designed for non-technical users to effortlessly manage website content. Features a complete end-to-end fullstack architecture with dynamic frontend rendering bridged seamlessly by integrated APIs.",
    highlights: [
      "Custom CMS architecture empowering non-technical users",
      "Seamless API integration bridging backend CMS with frontend interfaces",
      "End-to-end fullstack lifecycle management including complex interactive components",
    ],
    technologies: ["Laravel", "Filament", "Inertia", "Vue.js", "MySQL"],
    imageTheme: {
      background: "#2B263F",
      accentColor: "#f9322c",
      deviceType: "desktop",
    },
  },
  {
    id: "proj-hyperlocal",
    title: "Suzuki Hyperlocal",
    category: "Web Application",
    year: "2024 - Present",
    description:
      "Frontend modernization for Suzuki Hyperlocal web modules. Focused on responsive design, performance optimization, and seamless integration of complex RESTful APIs to deliver real-time data functionality and a smooth user journey.",
    highlights: [
      "Redesigned and modernized existing web modules for a fully responsive experience",
      "Integrated complex RESTful APIs for real-time dynamic data rendering",
      "Refined components to improve data handling efficiency and site loading speed",
    ],
    technologies: ["Laravel", "JavaScript", "Tailwind CSS", "Frontend"],
    liveUrl: "https://suzukinjs.co.id/suzuki-cimahi",
    imageTheme: {
      background: "#1e293b",
      accentColor: "#38bdf8",
      deviceType: "desktop",
      imageUrl: "/projects/suzuki-hyperlocal.jpg",
    },
  },
  {
    id: "proj-mamasuka",
    title: "Mamasuka",
    category: "Web Platform",
    year: "2025 - 2026",
    description:
      "A high-performing property-seeking web platform designed to enhance user engagement. Features iterative feature engineering, robust frontend architecture, and continuous performance tuning.",
    highlights: [
      "Designed and implemented new functional features for an enhanced property-seeking experience",
      "Iterative development and deployment in a highly dynamic environment",
      "Long-term performance tuning and robust frontend code refactoring",
    ],
    technologies: ["Laravel", "Livewire", "Tailwind CSS"],
    liveUrl: "https://mamasuka.com/",
    imageTheme: {
      background: "#f3f4f6",
      accentColor: "#ef4444",
      deviceType: "desktop",
      imageUrl: "/projects/mamasuka.jpg",
    },
  },
  {
    id: "proj-star-industri",
    title: "Star Industri Perkasa",
    category: "Corporate Website",
    year: "2024 - Present",
    description:
      "A highly responsive, mobile-first corporate website for Star Industri Perkasa. Built with high-fidelity designs, fluid animations, and robust dynamic data integration for a modern digital presence.",
    highlights: [
      "Fluid mobile-first experience with 100% cross-device compatibility",
      "High-fidelity design implementation with modern GSAP animations",
      "Dynamic real-time content delivery via RESTful API integration",
    ],
    technologies: ["Vue", "Nuxt.js", "Tailwind CSS", "GSAP", "REST API"],
    liveUrl: "https://starindustriesperkasa.co.id/",
    imageTheme: {
      background: "#e5e7eb",
      accentColor: "#10b981",
      deviceType: "desktop",
      imageUrl: "/projects/star-industri.jpg",
    },
  },
  {
    id: "proj-djabesmen",
    title: "Djabesmen",
    category: "Corporate Website",
    year: "2023",
    description:
      "Official corporate website for Djabesmen, featuring pixel-perfect design translation and engaging interactive animations. Built with a focus on seamless browsing experience, responsiveness, and robust layout consistency.",
    highlights: [
      "Pixel-perfect, high-fidelity responsive design translation",
      "Custom CSS and JavaScript animations for enhanced brand interactivity",
      "Robust layout consistency with cross-device compatibility",
    ],
    technologies: ["Laravel", "Bootstrap", "JavaScript", "REST API"],
    liveUrl: "https://www.djabesmen.co.id/id",
    imageTheme: {
      background: "#f8fafc",
      accentColor: "#0284c7",
      deviceType: "desktop",
      imageUrl: "/projects/djabesmen.jpg",
    },
  },
  {
    id: "proj-astra",
    title: "ASTRA Microsite (2024 & 2025)",
    category: "Event Microsites",
    year: "2024 - 2025",
    description:
      "High-profile workshop registration microsites developed for ASTRA events. Built with pixel-perfect responsive interfaces, complex RESTful API integration for registration flows, and rigorous quality assurance.",
    highlights: [
      "Pixel-perfect responsive design implementation for registration microsites",
      "Complex RESTful API integration ensuring seamless data synchronization",
      "Rigorous cross-browser testing and real-time bug resolution",
    ],
    technologies: ["Vue", "Nuxt.js", "Tailwind CSS", "REST API"],
    imageTheme: {
      background: "#e0e7ff",
      accentColor: "#4f46e5",
      deviceType: "desktop",
    },
  },
  {
    id: "proj-bni",
    title: "BNI WONDR Landing Pages",
    category: "Landing Page & Promotional",
    year: "2024",
    description:
      "High-performance, pixel-perfect landing pages for BNI WONDR. Developed to align with the brand's premium digital experience through smooth interactive animations and full mobile-to-desktop responsiveness.",
    highlights: [
      "Pixel-perfect translation from high-fidelity design mockups",
      "Smooth interactive CSS and JavaScript animations for premium user engagement",
      "Fully responsive UI layout precision optimized for all devices",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "REST API"],
    imageTheme: {
      background: "#fff1f2",
      accentColor: "#be123c",
      deviceType: "desktop",
    },
  },
  {
    id: "proj-klhk",
    title: "KLHK Official Web Interface",
    category: "Government Web Portal",
    year: "2023",
    description:
      "Official web interface implementation for the Ministry of Environment and Forestry (KLHK). Focused on clean UI, high accessibility standards, and reliable institutional data delivery through REST API integration.",
    highlights: [
      "Governmental web implementation with a strict focus on accessibility and clean UI",
      "Seamless API data handling to accurately display institutional and public information",
      "Robust frontend architecture ensuring high reliability for high-volume public access",
    ],
    technologies: ["Vue", "Nuxt.js", "Bootstrap", "REST API"],
    liveUrl: "https://mandara.id/",
    imageTheme: {
      background: "#f0fdf4",
      accentColor: "#16a34a",
      deviceType: "desktop",
      imageUrl: "/projects/klhk.jpg",
    },
  },
  {
    id: "proj-indonesia-go-id",
    title: "Indonesia.go.id National Portal",
    category: "Government Web Portal",
    year: "2023",
    description:
      "The official national portal of Indonesia (Indonesia.go.id), developed to provide a clean and accessible user interface for the general public. Features robust real-time public information delivery through RESTful API integration and high-volume traffic stability.",
    highlights: [
      "High-fidelity design translation for Indonesia's official national portal",
      "Seamless RESTful API integration for real-time public information delivery",
      "Extensive cross-browser debugging ensuring stability for high-volume national traffic",
    ],
    technologies: ["Laravel", "JavaScript", "Bootstrap", "REST API"],
    liveUrl: "https://indonesia.go.id/",
    imageTheme: {
      background: "#fef2f2",
      accentColor: "#ef4444",
      deviceType: "desktop",
      imageUrl: "/projects/indonesia-go-id.jpg",
    },
  },
  {
    id: "proj-masterumah",
    title: "Masterumah Property Platform",
    category: "Web Platform",
    year: "2023 - 2024",
    description:
      "A property-seeking web platform built to enhance user engagement through interactive feature engineering. Developed with a focus on long-term maintainability, code refactoring, and continuous performance tuning.",
    highlights: [
      "Iterative feature engineering to improve the property-seeking experience",
      "Long-term performance tuning and secure platform maintenance",
      "Resolved frontend bottlenecks in a highly dynamic development environment",
    ],
    technologies: ["Vue", "Nuxt.js", "Bootstrap", "REST API"],
    imageTheme: {
      background: "#fdf4ff",
      accentColor: "#d946ef",
      deviceType: "desktop",
    },
  },
  {
    id: "proj-star-wagen",
    title: "Star Wagen Indonesia",
    category: "Corporate Website",
    year: "2023 - Present",
    description:
      "A professional and modern corporate website for Star Wagen Indonesia, featuring high-fidelity design implementation. Built with a fluid mobile-first approach, dynamic RESTful API integrations, and robust cross-browser stability.",
    highlights: [
      "High-fidelity design slicing for a modern digital presence",
      "Fluid mobile-first experience with full cross-device compatibility",
      "Dynamic real-time data delivery via RESTful API integration",
    ],
    technologies: ["Laravel", "Tailwind CSS", "JavaScript", "REST API"],
    liveUrl: "https://www.starwagen.co.id/",
    imageTheme: {
      background: "#fef3c7",
      accentColor: "#d97706",
      deviceType: "desktop",
      imageUrl: "/projects/star-wagen.jpg",
    },
  },
];
