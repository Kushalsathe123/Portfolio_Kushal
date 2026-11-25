import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/components/portfolio";
import { isProjectFilter } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    const value = search["projectType"];
    return { projectType: isProjectFilter(value) ? value : "All" };
  },
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: "Kushal Sathe | AI/ML Engineer & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Kushal Sathe is a Pune-based AI/ML Engineer and Full-Stack Developer building production-grade apps, APIs, and practical machine-learning solutions.",
      },
      { property: "og:title", content: "Kushal Sathe | AI/ML Engineer & Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Explore the projects, experience, research, and services of Kushal Sathe, an AI/ML Engineer and Full-Stack Developer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
