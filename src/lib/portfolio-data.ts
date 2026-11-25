export type ProjectFilter = "All" | "Full-Stack" | "AI/ML" | "Architecture";
export type ProjectCategory = Exclude<ProjectFilter, "All">;

export const projectFilters: ProjectFilter[] = ["All", "Full-Stack", "AI/ML", "Architecture"];

export function isProjectFilter(value: unknown): value is ProjectFilter {
  return projectFilters.some((filter) => filter === value);
}

export const navigation = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Research", id: "research" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
] as const;

export const heroTech = ["Python", ".NET", "React", "Azure", "Machine Learning"] as const;

export const heroStats = [
  { value: "3+", label: "Years Experience", icon: "briefcase" },
  { value: "10+", label: "Projects Delivered", icon: "rocket" },
  { value: "1", label: "Research Publication", icon: "book" },
] as const;

export const services = [
  {
    number: "01",
    title: "Full-Stack Web Development",
    description: "Production-ready web apps with thoughtful interfaces and dependable foundations.",
    icon: "code",
  },
  {
    number: "02",
    title: "API & Backend Engineering",
    description: "Secure REST APIs, data models, integrations, and maintainable service design.",
    icon: "server",
  },
  {
    number: "03",
    title: "Cloud & DevOps",
    description: "Azure deployments, automated delivery pipelines, and reliable cloud operations.",
    icon: "cloud",
  },
  {
    number: "04",
    title: "AI/ML Solutions",
    description: "Practical machine-learning systems, deep learning, and text-to-speech research.",
    icon: "brain",
  },
] as const;

export const projects: Array<{
  title: string;
  category: ProjectCategory;
  summary: string;
  impact: string;
  technologies: string[];
  icon: "platform" | "orders" | "voice" | "services" | "patterns";
}> = [
  {
    title: "Gramin Seva Sangh Platform",
    category: "Full-Stack",
    summary:
      "A full-stack platform for a community organization, built from direct field sessions with coordinators.",
    impact:
      "51 REST endpoints across 6 domains; replaced paper-based records and shipped in 3 months.",
    technologies: [".NET 8", "ASP.NET Core", "React", "TypeScript", "Azure SQL", "JWT"],
    icon: "platform",
  },
  {
    title: "Krishivatika Order Management",
    category: "Full-Stack",
    summary:
      "Order tracking and reporting tools for a gardening accessories business.",
    impact: "Lookups under 5 seconds across 100+ monthly orders; reporting effort reduced by ~80%.",
    technologies: ["ASP.NET Core", "SQL Server", "Dashboards", "Automation"],
    icon: "orders",
  },
  {
    title: "Bangla Text-to-Speech",
    category: "AI/ML",
    summary:
      "A Bangla speech synthesis system using a custom dataset and the VITS architecture.",
    impact: "Evaluated against benchmark models and published in Springer Nature.",
    technologies: ["Python", "VITS", "Deep Learning", "Speech Synthesis"],
    icon: "voice",
  },
  {
    title: "Recipe Platform · Microservices",
    category: "Architecture",
    summary:
      "A recipe platform restructured from a monolith into independently managed services.",
    impact: "Decomposed the application into 3 REST microservices with independent databases.",
    technologies: [".NET 6", "Angular 14", "EF Core", "MySQL", "JWT"],
    icon: "services",
  },
  {
    title: "LLD Educational Platform",
    category: "Architecture",
    summary:
      "An interactive learning experience for low-level design and GoF design patterns.",
    impact: "Makes 10+ patterns easier to explore with TypeScript examples and UML diagrams.",
    technologies: ["React", "TypeScript", "Tailwind", "Vite", "UML"],
    icon: "patterns",
  },
];

export const skillGroups = [
  { title: "Languages", items: ["C#", "TypeScript", "Python", "SQL"] },
  {
    title: "Frameworks",
    items: [".NET 8", "ASP.NET Core", "React.js", "Angular", "Entity Framework Core"],
  },
  { title: "Web & API", items: ["REST API", "JWT Auth", "SignalR", "Azure Service Bus"] },
  {
    title: "Cloud & DevOps",
    items: ["Azure App Service", "Azure SQL", "GitHub Actions", "CI/CD", "SonarQube"],
  },
  {
    title: "Practices",
    items: ["SOLID", "Design Patterns", "OOP", "Agile/Scrum", "Microservices"],
  },
] as const;

export const capabilities = [
  "Full-stack web applications",
  "REST API design",
  "Cloud deployment & CI/CD on Azure",
  "Dashboards & automation",
  "AI/ML & text-to-speech solutions",
] as const;

export const experience = [
  {
    role: "Freelance Software Developer",
    company: "Krishivatika Gardening Accessories Pvt. Ltd.",
    location: "Ranchi · Remote",
    dates: "Nov 2025 – May 2026",
    highlights: [
      "Built a custom order tracking and management system with ASP.NET Core and SQL.",
      "Delivered order lookups under 5 seconds across 100+ monthly orders.",
      "Automated reporting dashboards, cutting reporting effort by around 80%.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Gramin Seva Sangh (GSS)",
    location: "Ramgarh, Jharkhand · Remote",
    dates: "Mar 2025 – Oct 2025",
    highlights: [
      "Built a full-stack platform with .NET 8, React, TypeScript, Azure SQL, 51 REST endpoints, and JWT authentication.",
      "Modelled 11 SQL entities across 6 domains; replaced paper-based record-keeping.",
      "Set up a role-based admin dashboard and GitHub Actions delivery with 0 broken deployments.",
    ],
  },
  {
    role: "Junior Software Engineer",
    company: "EPAM Systems",
    location: "Hyderabad",
    dates: "Aug 2024 – Jan 2025",
    highlights: [
      "Designed a .NET 6 claims API layer and contracts with the Angular team; 0 post-release regressions.",
      "Built an Azure Service Bus notification service adopted as the team standard.",
      "Refactored SQL Server procedures from around 3 seconds to under 800 milliseconds.",
      "Owned Angular form state and validation, removing form-related QA reports across two sprints.",
    ],
  },
];

export const research = {
  title: "Advancing Bangla Text-to-Speech Synthesis Using a VITS-Based Model",
  publication: "Discover Computing · Springer Nature",
  date: "August 2025",
  summary:
    "Developed a Bangla text-to-speech system with a custom dataset and VITS architecture, then evaluated it against benchmark models.",
};

export const certifications = [
  "GATE 2026 Qualified",
  "Microsoft Certified: Azure Data Fundamentals (DP-900)",
  "Securing ASP.NET Core Apps: Web Application Security",
  "C# Design Patterns (Part 1 & 2)",
  ".NET 6 SDK Advanced Exploration: Attributes",
  "Microsoft SQL Server 2022 Essential Training",
  "Introduction to Identity and Access Management",
  "Deep Learning (NPTEL)",
] as const;

export const education = {
  degree: "B.E. in AI & Data Science",
  institution: "Ajeenkya D Y Patil School of Engineering",
  dates: "2020 – 2024",
  result: "CGPA 8.64 / 10",
};

export const contact = {
  email: "kushalsathe1@gmail.com",
  linkedin: "https://linkedin.com/in/kushal-sathe-4640b1204",
  github: "https://github.com/Kushalsathe123",
  location: "Pune, Maharashtra, India",
};