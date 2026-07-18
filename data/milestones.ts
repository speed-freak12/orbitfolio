export interface CareerEntity {
  id: string;
  type: "star" | "planet" | "station" | "satellite" | "orbs" | "constellation";
  title: string;
  subtitle: string;
  date: string;
  description: string;
  skills: string[];
  position: [number, number, number];
  color: string;
  glowColor: string;
  details: string[];
  // For planets
  radius?: number;
  hasRings?: boolean;
}

export const careerEntities: CareerEntity[] = [
  {
    id: "about",
    type: "star", // Central energy core
    title: "Stellar Core",
    subtitle: "About Me // Origin Node",
    date: "Year 2050",
    description: "Explore the core details of my career, creative engineering philosophy, and stack parameters. Bridging high-fidelity design with scalable codebase performance.",
    skills: ["Creative Tech", "3D UI/UX", "WebGL Shaders", "Architecture"],
    position: [0, 0, 0],
    color: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.95)",
    details: [
      "Creative Technologist specializing in visual code aesthetics.",
      "Committed to building unforgettable immersive WebGL user interfaces.",
      "Expertise in Next.js, React Three Fiber, Three.js, and GLSL shading."
    ]
  },
  {
    id: "project-alpha",
    type: "planet",
    title: "Planet: WebGL Engine",
    subtitle: "Projects // Node 01",
    date: "2024",
    description: "Procedural terrain rendering engine built using custom vertex and fragment shaders. Generates 3D planetary surfaces dynamically using fractional Brownian motion noise.",
    skills: ["Three.js", "GLSL Shaders", "R3F", "Math"],
    position: [-3.2, -1.8, 2.5],
    color: "#06b6d4", // Cyan
    glowColor: "rgba(6, 182, 212, 0.8)",
    details: [
      "Generated procedural 3D terrain grids on the fly.",
      "Implemented custom lighting calculations inside raw WebGL shaders.",
      "Optimized animation frame loops to maintain a consistent 60fps on mobile."
    ],
    radius: 0.35,
    hasRings: true
  },
  {
    id: "project-beta",
    type: "planet",
    title: "Planet: AI Agent Pipeline",
    subtitle: "Projects // Node 02",
    date: "2025",
    description: "An autonomous agent ecosystem that reads code repositories, identifies security vulnerabilities, and schedules automated pull request hotfixes.",
    skills: ["Python", "OpenAI API", "Vector DBs", "Docker"],
    position: [2.5, -2.5, -3.2],
    color: "#ec4899", // Pink
    glowColor: "rgba(236, 72, 153, 0.8)",
    details: [
      "Designed RAG schemas to scan and vectorize 1,000+ files instantly.",
      "Engineered secure sandboxed environments for safe code compilations.",
      "Automated up to 80% of routine server configuration tasks."
    ],
    radius: 0.28,
    hasRings: false
  },
  {
    id: "project-gamma",
    type: "planet",
    title: "Planet: Encrypted Consensus",
    subtitle: "Projects // Node 03",
    date: "2023",
    description: "A decentralized consensus ledger designed to catalog scientific research experiments securely, preventing data manipulation.",
    skills: ["Rust", "WASM", "WebSockets", "Cryptography"],
    position: [-4.2, 1.5, -3.5],
    color: "#eab308", // Yellow / Amber
    glowColor: "rgba(234, 179, 8, 0.8)",
    details: [
      "Reduced system consensus latencies to under 5 milliseconds.",
      "Wrote highly optimized WebAssembly compiles to speed up client processing.",
      "Successfully handles 10,000+ consensus blocks per second in test rigs."
    ],
    radius: 0.3,
    hasRings: true
  },
  {
    id: "experience",
    type: "station",
    title: "Orbital Space Station",
    subtitle: "Professional History // Log Port",
    date: "2021 - Present",
    description: "Stepping from junior frontend builder to creative engineering lead. Coordinating features, high-performance systems, and UI benchmarks inside team pipelines.",
    skills: ["Frontend Lead", "Agile", "Lighthouse Benchmarks", "Next.js"],
    position: [-2.2, 3.2, -1.8],
    color: "#8b5cf6", // Purple
    glowColor: "rgba(139, 92, 246, 0.8)",
    details: [
      "Led frontend redesign leading to a 35% growth in user retention benchmarks.",
      "Refactored legacy codebases, cutting startup load speeds in half.",
      "Delivered key products for over 1M monthly active users globally."
    ]
  },
  {
    id: "skills",
    type: "orbs",
    title: "Tech Energy Cells",
    subtitle: "Skills // Energy Grid",
    date: "Constant Sync",
    description: "Shorthand catalog of visual, logic, and infrastructure technologies powering my development pipeline. Represented as floating orbital energy cells.",
    skills: ["React", "TypeScript", "Next.js", "Three.js", "GLSL Shaders", "Rust", "Python", "Docker", "AWS", "Git"],
    position: [4.2, 2.5, 2.8],
    color: "#3b82f6", // Blue
    glowColor: "rgba(59, 130, 246, 0.8)",
    details: [
      "Advanced state coordination and rendering loops.",
      "Full Stack backend infrastructure integrations.",
      "Physics engines, coordinate transformations, and matrix computations."
    ]
  },
  {
    id: "achievements",
    type: "constellation",
    title: "Stellar Constellation",
    subtitle: "Achievements // Lock Patterns",
    date: "Milestones",
    description: "Recognitions and wins celebrating technical milestones, community updates, and open-source contributions. Represented as a locked coordinate constellation.",
    skills: ["Hackathon Winner", "Open Source Patches", "WebGL Speaker"],
    position: [3.2, -1.2, -5.2],
    color: "#f97316", // Orange
    glowColor: "rgba(249, 115, 22, 0.8)",
    details: [
      "Awarded 1st place in the City Hackathon for building an emergency logistics portal.",
      "Contributed several performance optimization patches to open-source WebGL libraries.",
      "Delivered a technical keynote to 150+ developers on React Three Fiber animations."
    ]
  },
  {
    id: "contact",
    type: "satellite",
    title: "Comms Satellite",
    subtitle: "Contact // Signal Beam",
    date: "Direct Transmission",
    description: "Establish contact by beaming a signal directly to my communication receiver. Encrypted broadcasts are cataloged and processed immediately.",
    skills: ["Signal Transmissions", "Mail Broadcast", "Quantum Mail"],
    position: [5.5, -3.2, 1.2],
    color: "#22d3ee", // Cyan
    glowColor: "rgba(34, 211, 238, 0.8)",
    details: [
      "Beam encrypted transmission form to direct coordinate interface.",
      "Response signal beamed back to your coordinates within 24 hours.",
      "Ready for collaborations, freelance, or remote positions."
    ]
  }
];

// Backwards compatibility mappings for Dashboard/SaaS contexts
export type Milestone = CareerEntity;
export const milestones = careerEntities;
