export interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  skills: string[];
  position: [number, number, number];
  color: string;
  glowColor: string;
  details: string[];
}

export const milestones: Milestone[] = [
  {
    id: "first-project",
    title: "First Project",
    subtitle: "The Spark of Creation",
    date: "Aug 2021",
    description: "Built the first web application that automated student records management. This project ignited a passion for creating interactive, accessible, and high-performance digital tools.",
    skills: ["HTML", "CSS", "Vanilla JS", "DOM Manipulation"],
    position: [-6, 3, -4],
    color: "#06b6d4", // Cyan
    glowColor: "rgba(6, 182, 212, 0.8)",
    details: [
      "Automated record handling for over 200 users.",
      "Achieved a 95% reduction in manual tracking errors.",
      "Learned the fundamentals of responsive design and browser rendering loops."
    ]
  },
  {
    id: "internship",
    title: "Software Internship",
    subtitle: "Stepping into the Industry",
    date: "Jan 2022 - Jun 2022",
    description: "Joined a dynamic software house to collaborate on full-stack web applications. Learned Agile development methodologies, code reviews, and robust system architectures.",
    skills: ["React", "Node.js", "Express", "MongoDB", "Git"],
    position: [-2, -2.5, 4],
    color: "#3b82f6", // Blue
    glowColor: "rgba(59, 130, 246, 0.8)",
    details: [
      "Assisted in refactoring legacy codebases, speeding up load times by 20%.",
      "Collaborated on designing RESTful APIs that handle 5,000+ daily requests.",
      "Authored 30+ unit tests, reducing shipping bugs by 15%."
    ]
  },
  {
    id: "techwale",
    title: "TechWale Professional Experience",
    subtitle: "Crafting High-End Web Services",
    date: "Jul 2022 - Oct 2023",
    description: "Served as a Frontend Engineer leading the design and implementation of modern corporate web portals. Specialized in smooth, high-fidelity UI components and server-side optimization.",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion"],
    position: [3, 4, -2],
    color: "#8b5cf6", // Purple
    glowColor: "rgba(139, 92, 246, 0.8)",
    details: [
      "Developed an interactive dashboard leading to a 35% growth in user retention.",
      "Built a highly reusable UI component library used across 4 sister projects.",
      "Optimized Next.js page generation, scoring 98/100 on Lighthouse Performance benchmarks."
    ]
  },
  {
    id: "certifications",
    title: "Advanced Certifications",
    subtitle: "Fortifying the Tech Stack",
    date: "Ongoing",
    description: "Earned professional credentials in modern cloud systems, advanced React patterns, and security principles. Committed to continuous self-improvement and staying at the cutting edge.",
    skills: ["AWS Cloud Practitioner", "Advanced React Patterns", "Docker", "CI/CD"],
    position: [6, -3, -5],
    color: "#eab308", // Yellow / Amber
    glowColor: "rgba(234, 179, 8, 0.8)",
    details: [
      "Certified AWS Cloud Practitioner.",
      "Completed comprehensive training on microservices and containerized workflows.",
      "Engineered automated deployment pipelines that cut release cycles in half."
    ]
  },
  {
    id: "ai-projects",
    title: "AI & Deep Tech Projects",
    subtitle: "The Frontier of Agentic Dev",
    date: "Nov 2023 - Present",
    description: "Pioneered interactive integrations with Large Language Models and computer vision architectures. Built AI-assisted productivity pipelines, custom RAG systems, and neural network simulations.",
    skills: ["Python", "TensorFlow", "OpenAI API", "Vector Databases", "WebSockets"],
    position: [1.5, -1, 5],
    color: "#ec4899", // Pink
    glowColor: "rgba(236, 72, 153, 0.8)",
    details: [
      "Architected an autonomous agent pipeline, increasing team code velocity by 40%.",
      "Created a real-time Semantic Search assistant using vectorized embeddings.",
      "Implemented localized training loops for specialized text classification models."
    ]
  },
  {
    id: "achievements",
    title: "Key Achievements",
    subtitle: "Celebrating Milestones",
    date: "2024 - 2025",
    description: "Won regional hackathons, contributed to major open-source systems, and spoke at developer meetups about the intersection of creative coding and 3D graphics on the web.",
    skills: ["Three.js", "WebGL", "Open Source", "Public Speaking"],
    position: [5, 1.5, 3],
    color: "#f97316", // Orange / Gold
    glowColor: "rgba(249, 115, 22, 0.8)",
    details: [
      "Awarded 1st place in the City Hackathon for building an emergency logistics portal.",
      "Contributed several performance optimization patches to open-source WebGL libraries.",
      "Delivered a technical keynote to 150+ developers on React Three Fiber animations."
    ]
  }
];
