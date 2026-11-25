import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Braces,
  Check,
  Cloud,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  capabilities,
  certifications,
  contact,
  education,
  experience,
  heroStats,
  heroTech,
  navigation,
  projectFilters,
  projects,
  research,
  services,
  skillGroups,
  type ProjectFilter,
} from "@/lib/portfolio-data";
import { Route } from "@/routes/index";

const projectTypeOptions = ["Web application", "API or backend", "Azure or DevOps", "AI or machine learning", "Other"];
const budgetOptions = ["Not sure yet", "Under $1,000", "$1,000–$5,000", "$5,000+"];

const PythonLogo = () => (
  <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
    <path fill="#3776AB" d="M11.9 2C7.4 2 7.700 4 7.700 4v2.100h4.300v.6H5.900S3 6.400 3 11c0 4.600 2.500 4.400 2.500 4.400H7v-2.200s-.1-2.500 2.400-2.500h4.200s2.300.1 2.300-2.200V4.400S16.300 2 11.900 2Zm-2.400 1.300a.8.800 0 1 1 0 1.500.8.8 0 0 1 0-1.500Z" />
    <path fill="#FFC331" d="M12.100 22c4.500 0 4.200-2 4.200-2v-2.100H12v-.6h6.100S21 17.600 21 13c0-4.600-2.500-4.400-2.500-4.400H17v2.200s.1 2.500-2.400 2.500h-4.200s-2.300-.1-2.300 2.200v3.700S7.700 22 12.100 22Zm2.400-1.300a.8.800 0 1 1 0-1.500.8.8 0 0 1 0 1.500Z" />
  </svg>
);
const DotNetLogo = () => (
  <span className="inline-flex size-5 items-center justify-center rounded-md bg-[#512BD4] text-[7px] font-extrabold leading-none text-white" aria-hidden="true">.NET</span>
);
const ReactLogo = () => (
  <svg viewBox="-11.5 -10.2 23 20.4" className="size-5" aria-hidden="true">
    <circle r="2.05" fill="#00D8FF" />
    <g stroke="#00D8FF" fill="none" strokeWidth="1">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);
const AzureLogo = () => (
  <svg viewBox="0 0 96 96" className="size-5" aria-hidden="true">
    <path fill="#0078D4" d="M33.3 6h28.500L32.200 90.500a4.500 4.500 0 0 1-4.200 3H6.800a4.500 4.500 0 0 1-4.300-5.900L29.100 9A4.500 4.500 0 0 1 33.300 6Z" />
    <path fill="#0078D4" d="M71.200 60.300H29.500a2.100 2.100 0 0 0-1.400 3.700l26.800 25.100a4.500 4.500 0 0 0 3.100 1.200h23.600Z" opacity=".75" />
    <path fill="#2FA3EA" d="M66.600 9a4.500 4.500 0 0 0-4.200-3H33.700a4.500 4.500 0 0 1 4.200 3l26.600 78.800a4.500 4.500 0 0 1-4.300 5.900h28.700a4.500 4.500 0 0 0 4.300-5.900Z" />
  </svg>
);
const BrainLogo = () => <BrainCircuit className="size-5 text-[#2563EB]" aria-hidden="true" />;

const heroTechIcon = {
  Python: PythonLogo,
  ".NET": DotNetLogo,
  React: ReactLogo,
  Azure: AzureLogo,
  "Machine Learning": BrainLogo,
} as const;

const statIcon = {
  briefcase: Briefcase,
  rocket: Rocket,
  book: BookOpen,
} as const;

const serviceIcon = {
  code: Code2,
  server: Server,
  cloud: Cloud,
  brain: BrainCircuit,
} as const;

const projectIcon = {
  platform: Database,
  orders: Briefcase,
  voice: BrainCircuit,
  services: Server,
  patterns: Braces,
} as const;

export function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const projectFilter = Route.useSearch().projectType;
  const navigate = Route.useNavigate();

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const sectionElements = navigation
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -36px 0px" },
    );
    revealElements.forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    sectionElements.forEach((element) => sectionObserver.observe(element));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const filteredProjects =
    projectFilter === "All" ? projects : projects.filter((project) => project.category === projectFilter);

  const handleProjectFilter = (filter: ProjectFilter) => {
    void navigate({
      to: "/",
      search: (previous) => ({ ...previous, projectType: filter }),
      replace: true,
    });
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = `Portfolio inquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${projectType || "Not specified"}`,
      `Budget: ${budget || "Not specified"}`,
      "",
      message,
    ].join("\n");
    const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const draftLink = document.createElement("a");
    draftLink.href = mailto;
    draftLink.click();
    toast.success("Email draft prepared", {
      description: "Review the details in your email app, then press send.",
    });
    event.currentTarget.reset();
    setProjectType("");
    setBudget("");
  };

  const handleResumeClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/resume.pdf", { method: "HEAD" });
      if (response.ok) {
        window.location.assign("/resume.pdf");
        return;
      }
    } catch {
      // The placeholder message below is the expected result while the file is absent.
    }
    toast.info("Resume coming soon", {
      description: "Email Kushal to request a copy in the meantime.",
    });
  };

  return (
    <main className="portfolio-page min-h-screen">
      <Navbar activeSection={activeSection} menuOpen={mobileMenuOpen} onMenuToggle={() => setMobileMenuOpen((open) => !open)} onNavigate={() => setMobileMenuOpen(false)} />
      <Hero onResumeClick={handleResumeClick} />
      <About />
      <Services />
      <Projects activeFilter={projectFilter} filteredProjects={filteredProjects} onFilterChange={handleProjectFilter} />
      <Experience />
      <Research />
      <Certifications />
      <ContactForm
        projectType={projectType}
        budget={budget}
        onProjectTypeChange={setProjectType}
        onBudgetChange={setBudget}
        onSubmit={handleContactSubmit}
      />
      <Footer />
    </main>
  );
}

function Navbar({
  activeSection,
  menuOpen,
  onMenuToggle,
  onNavigate,
}: {
  activeSection: string;
  menuOpen: boolean;
  onMenuToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <header className="portfolio-nav sticky top-0 z-50 border-b border-border/70">
      <div className="portfolio-wrap relative flex min-h-18 items-center justify-between gap-4 py-3">
        <Link to="/" hash="home" onClick={onNavigate} className="flex shrink-0 items-center gap-3 text-foreground" aria-label="Kushal Sathe home">
          <span className="text-3xl font-extrabold leading-none"><span>K</span><span className="text-accent">S</span></span>
          <span className="hidden h-8 w-px bg-border sm:block" aria-hidden="true" />
          <span className="hidden text-sm font-bold sm:inline">Kushal Sathe</span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.id}
              to="/"
              hash={item.id}
              onClick={onNavigate}
              aria-current={activeSection === item.id ? "page" : undefined}
              className={`relative py-2 text-sm transition-colors hover:text-accent ${activeSection === item.id ? "font-bold text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-accent" : "text-muted-foreground"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="hidden rounded-full border-accent px-5 text-foreground hover:bg-accent hover:text-accent-foreground xl:inline-flex">
            <Link to="/" hash="contact">Let&apos;s Talk <ArrowRight aria-hidden="true" /></Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={onMenuToggle}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" className="absolute inset-x-0 top-full border-b border-border bg-background px-4 py-4 shadow-lg xl:hidden" aria-label="Mobile navigation">
            <div className="grid gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  to="/"
                  hash={item.id}
                  onClick={onNavigate}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  className={`rounded-sm px-3 py-2.5 text-sm ${activeSection === item.id ? "bg-accent-soft font-bold text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function Hero({ onResumeClick }: { onResumeClick: (event: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <section id="home" className="hero-stage" aria-labelledby="hero-title">
      {/* decorative layers (behind everything) */}
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-blob" aria-hidden="true" />
      <div className="hero-wedge" aria-hidden="true" />

      <div className="portfolio-wrap hero-grid">
        {/* LEFT: copy + stats */}
        <div className="hero-copy reveal">
          <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold text-foreground shadow-sm sm:text-sm">
            <span className="status-pulse size-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Available for Freelance Opportunities
          </div>

          <h1 id="hero-title" className="hero-title font-extrabold text-foreground">
            Hi, I&apos;m<br />Kushal <span className="text-accent">Sathe</span>
          </h1>

          <p className="mt-3 text-lg font-bold text-ink-soft sm:text-2xl">AI/ML Engineer &amp; Full-Stack Developer</p>

          <p className="mt-3 text-xl leading-snug text-foreground sm:text-[1.8rem]">
            Turning Ideas into<br />
            <span className="accent-swoosh font-bold">Intelligent</span> Digital Solutions.
          </p>

          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            I build scalable applications, leverage AI/ML, and create impactful solutions that solve real-world problems.
          </p>

          <div className="mt-4 flex flex-wrap gap-2.5" aria-label="Core technologies">
            {heroTech.map((technology) => {
              const Icon = heroTechIcon[technology];
              return (
                <span key={technology} className="skill-chip inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.85rem] font-semibold text-foreground">
                  <Icon />
                  {technology}
                </span>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Button asChild className="rounded-full px-6 py-5 text-sm shadow-md transition-transform hover:-translate-y-0.5">
              <Link to="/" hash="projects">Explore My Work <ArrowRight aria-hidden="true" /></Link>
            </Button>
            <Button asChild variant="link" className="h-auto gap-2 rounded-none px-0 py-2 text-sm font-semibold text-foreground">
              <a href="/resume.pdf" onClick={onResumeClick}>Download Resume <Download aria-hidden="true" /></a>
            </Button>
          </div>

          {/* stats live in the left column only, so they never touch the photo */}
          <div className="hero-stats mt-5 flex max-w-[46rem] flex-wrap items-center gap-y-3 border-t border-border/80 pt-4">
            {heroStats.map((stat) => {
              const Icon = statIcon[stat.icon];
              return (
                <div key={stat.label} className="hero-stat flex items-center gap-3 pr-6 sm:px-6 sm:first:pl-0">
                  <Icon className="size-7 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <div className="text-2xl font-extrabold leading-none text-foreground">{stat.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: portrait */}
        <div className="hero-art" aria-hidden="true">
          <svg className="hero-arc" viewBox="100 0 510 700" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroArcGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#FFD24D" />
                <stop offset="0.55" stopColor="#F7A81B" />
                <stop offset="1" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            <path
              d="M 1500 30 L 700 36 C 390 70 160 240 60 700 L 125 700 C 205 350 410 150 600 96 L 1500 96 Z"
              fill="url(#heroArcGold)"
            />
          </svg>
          <div className="hero-dots" />
          <img src="Kushal_sathe.png" alt="" className="hero-portrait" />
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
      <h2 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}{accent && <> <span className="text-accent">{accent}</span></>}
      </h2>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section-tone py-20 sm:py-24" aria-labelledby="about-title">
      <div className="portfolio-wrap">
        <div className="reveal grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">A little about me</p>
            <h2 id="about-title" className="max-w-2xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Building useful things, from <span className="text-accent">idea to impact.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I&apos;m a Pune-based AI/ML Engineer and Full-Stack Developer with a B.E. in AI &amp; Data Science. I build production-grade web apps with .NET, React/Angular, and Azure—and apply machine learning, speech synthesis, and deep learning to real problems. I&apos;m currently freelancing and open to thoughtful collaborations.
            </p>
            <div className="mt-7 flex flex-wrap gap-2" aria-label="Quick facts">
              {["Pune, India", "Open to freelance", "Remote-friendly", "GATE 2026 Qualified"].map((fact) => (
                <span key={fact} className="rounded-full bg-card px-3.5 py-2 text-xs font-semibold text-ink-soft shadow-sm sm:text-sm">{fact}</span>
              ))}
            </div>
          </div>

          <aside className="relative grid gap-4 sm:grid-cols-[0.8fr_1.2fr] sm:items-center" aria-labelledby="capabilities-title">
            <div className="about-photo relative mx-auto aspect-[4/5] w-full max-w-56 overflow-hidden rounded-sm bg-accent-soft sm:mx-0">
              <span className="absolute inset-x-4 bottom-4 top-4 rounded-[48%_48%_0_0] bg-accent/70" aria-hidden="true" />
              <img src="Kushal_sathe.png" alt="Kushal Sathe" className="relative z-10 h-full w-full object-contain object-bottom" />
            </div>
            <div className="min-w-0 border-l-2 border-accent pl-5 sm:pl-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-accent">What I can do for you</p>
              <h3 id="capabilities-title" className="mb-4 text-xl font-bold text-foreground">From first sketch to launch.</h3>
              <ul className="grid gap-3">
                {capabilities.map((capability) => (
                  <li key={capability} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />{capability}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="reveal mt-16 border-t border-border pt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">My toolkit</p>
              <h3 className="mt-2 text-2xl font-extrabold text-foreground">Skills &amp; technologies</h3>
            </div>
            <span className="hidden text-sm text-muted-foreground sm:block">A practical mix of engineering and applied ML</span>
          </div>
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h4 className="mb-3 text-sm font-bold text-foreground">{group.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => <span key={skill} className="skill-chip rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground">{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="services-title">
      <div className="portfolio-wrap">
        <div className="reveal mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">How I can help</p>
            <h2 id="services-title" className="text-3xl font-extrabold text-foreground sm:text-4xl">Services built around outcomes.</h2>
          </div>
          <Link to="/" hash="contact" className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-accent">
            Start a project <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = serviceIcon[service.icon];
            return (
              <article key={service.number} className="service-card reveal flex min-h-56 flex-col p-5 sm:p-6">
                <div className="mb-6 flex items-center justify-between">
                  <Icon className="size-7 text-accent" aria-hidden="true" />
                  <span className="text-xs font-bold text-muted-foreground">{service.number}</span>
                </div>
                <h3 className="text-lg font-bold leading-snug text-foreground">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <Link to="/" hash="contact" className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-bold text-foreground hover:text-accent">
                  Start a project <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects({
  activeFilter,
  filteredProjects,
  onFilterChange,
}: {
  activeFilter: ProjectFilter;
  filteredProjects: typeof projects;
  onFilterChange: (filter: ProjectFilter) => void;
}) {
  return (
    <section id="projects" className="section-tone py-20 sm:py-24" aria-labelledby="projects-title">
      <div className="portfolio-wrap">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">Selected work</p>
            <h2 id="projects-title" className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">Work that solves <span className="text-accent">real problems.</span></h2>
            <p className="mt-4 text-muted-foreground">A selection of products, platforms, and applied research.</p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {projectFilters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                aria-pressed={activeFilter === filter}
                onClick={() => onFilterChange(filter)}
                className="rounded-full px-4"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => {
            const Icon = projectIcon[project.icon];
            return (
              <article key={project.title} className="project-card reveal flex min-h-[26rem] flex-col p-5 sm:p-6" style={{ transitionDelay: `${Math.min(index, 3) * 60}ms` }}>
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent-foreground"><Icon className="size-5" aria-hidden="true" /></span>
                  <span className="rounded-full border border-border px-3 py-1 text-[0.68rem] font-bold text-muted-foreground">{project.category}</span>
                </div>
                <h3 className="text-xl font-bold leading-snug text-foreground">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
                <p className="mt-5 border-l-2 border-accent pl-3 text-sm font-semibold leading-relaxed text-foreground">{project.impact}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.technologies.map((technology) => <span key={technology} className="rounded-full bg-muted px-2.5 py-1 text-[0.68rem] font-medium text-muted-foreground">{technology}</span>)}
                </div>
                <div className="mt-auto flex items-center gap-2 pt-6">
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <a href={contact.github} target="_blank" rel="noreferrer" aria-label={`Open Kushal's GitHub profile for ${project.title}`}><Github aria-hidden="true" /> GitHub</a>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="rounded-full">
                    <Link to="/" hash="contact">Live <ExternalLink aria-hidden="true" /></Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-24" aria-labelledby="experience-title">
      <div className="portfolio-wrap">
        <div className="reveal mb-11 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">Where I&apos;ve made a difference</p>
          <h2 id="experience-title" className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">Experience, grounded in <span className="text-accent">delivery.</span></h2>
        </div>
        <div className="timeline-rail relative ml-1 grid gap-9 pl-7 sm:gap-11">
          {experience.map((position) => (
            <article key={position.company} className="reveal relative">
              <span className="absolute -left-[1.95rem] top-1.5 size-3 rounded-full border-2 border-background bg-accent ring-4 ring-accent-soft" aria-hidden="true" />
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-foreground">{position.role}</h3>
                  <p className="mt-1 text-sm font-semibold text-ink-soft">{position.company}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="size-3.5" aria-hidden="true" />{position.location}</p>
                </div>
                <span className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-bold text-foreground">{position.dates}</span>
              </div>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {position.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />{highlight}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Research() {
  return (
    <section id="research" className="section-tone py-20 sm:py-24" aria-labelledby="research-title">
      <div className="portfolio-wrap">
        <div className="reveal grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">Research &amp; publication</p>
            <h2 id="research-title" className="text-3xl font-extrabold text-foreground sm:text-4xl">Curiosity with <span className="text-accent">real-world reach.</span></h2>
          </div>
          <article className="relative overflow-hidden rounded-sm border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-accent-soft" aria-hidden="true" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-foreground"><BookOpen className="size-5" aria-hidden="true" /></span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">{research.publication}</p>
                  <h3 className="mt-3 max-w-2xl text-xl font-bold leading-snug text-foreground sm:text-2xl">{research.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{research.date}</p>
                  <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{research.summary}</p>
                </div>
              </div>
              <Button asChild variant="outline" className="shrink-0 rounded-full border-accent">
                <a href="https://link.springer.com/" target="_blank" rel="noreferrer">Read Paper <ArrowUpRight aria-hidden="true" /></a>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="py-20 sm:py-24" aria-labelledby="certifications-title">
      <div className="portfolio-wrap">
        <div className="reveal mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">Learning &amp; milestones</p>
          <h2 id="certifications-title" className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">A foundation for <span className="text-accent">what&apos;s next.</span></h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((certification, index) => (
            <article key={certification} className="credential-card reveal flex min-h-24 items-start gap-3 p-4">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-foreground">
                {index === 0 ? <Award className="size-4" aria-hidden="true" /> : <BadgeCheck className="size-4" aria-hidden="true" />}
              </span>
              <h3 className="text-sm font-semibold leading-relaxed text-foreground">{certification}</h3>
            </article>
          ))}
        </div>

        <article className="reveal mt-8 grid gap-5 border-t border-border pt-8 sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent-foreground"><GraduationCap className="size-6" aria-hidden="true" /></span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Education</p>
            <h3 className="mt-1 text-lg font-bold text-foreground">{education.degree}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{education.institution} · {education.dates}</p>
          </div>
          <span className="text-sm font-bold text-foreground">{education.result}</span>
        </article>
      </div>
    </section>
  );
}

function ContactForm({
  projectType,
  budget,
  onProjectTypeChange,
  onBudgetChange,
  onSubmit,
}: {
  projectType: string;
  budget: string;
  onProjectTypeChange: (value: string) => void;
  onBudgetChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section id="contact" className="contact-panel py-20 sm:py-24" aria-labelledby="contact-title">
      <div className="portfolio-wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="reveal">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">Have a good challenge?</p>
          <h2 id="contact-title" className="max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">Let&apos;s build something <span className="text-accent">intelligent</span> together.</h2>
          <p className="mt-5 max-w-md leading-relaxed text-primary-foreground/75">Tell me what you&apos;re working on. I&apos;m available for freelance projects and remote collaboration.</p>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-3.5 py-2 text-xs font-semibold">
            <span className="status-pulse size-2 rounded-full bg-emerald-500" aria-hidden="true" />Available for freelance
          </div>
          <div className="mt-8 grid gap-4 text-sm">
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-primary-foreground hover:text-accent"><Mail className="size-4 text-accent" aria-hidden="true" />{contact.email}</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary-foreground hover:text-accent"><Linkedin className="size-4 text-accent" aria-hidden="true" />LinkedIn <ArrowUpRight className="size-3.5" aria-hidden="true" /></a>
            <a href={contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary-foreground hover:text-accent"><Github className="size-4 text-accent" aria-hidden="true" />GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" /></a>
            <p className="flex items-center gap-3 text-primary-foreground/75"><MapPin className="size-4 text-accent" aria-hidden="true" />{contact.location}</p>
          </div>
        </div>

        <form className="reveal grid gap-4 rounded-sm bg-card p-5 text-card-foreground shadow-xl sm:grid-cols-2 sm:p-7" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <label htmlFor="contact-name" className="text-xs font-bold text-foreground">Name</label>
            <Input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required className="h-11 rounded-sm bg-background" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="contact-email" className="text-xs font-bold text-foreground">Email</label>
            <Input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required className="h-11 rounded-sm bg-background" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="project-type" className="text-xs font-bold text-foreground">Project type</label>
            <Select value={projectType} onValueChange={onProjectTypeChange}>
              <SelectTrigger id="project-type" aria-label="Project type" className="h-11 rounded-sm bg-background"><SelectValue placeholder="Choose a project type" /></SelectTrigger>
              <SelectContent>{projectTypeOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="budget-range" className="text-xs font-bold text-foreground">Budget range</label>
            <Select value={budget} onValueChange={onBudgetChange}>
              <SelectTrigger id="budget-range" aria-label="Budget range" className="h-11 rounded-sm bg-background"><SelectValue placeholder="Choose a range" /></SelectTrigger>
              <SelectContent>{budgetOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <label htmlFor="contact-message" className="text-xs font-bold text-foreground">Message</label>
            <Textarea id="contact-message" name="message" placeholder="A little about your project..." required rows={5} className="resize-y rounded-sm bg-background" />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="w-full rounded-full py-6 sm:w-auto sm:px-7">Prepare email <Send aria-hidden="true" /></Button>
            <p className="mt-3 text-xs text-muted-foreground">Your email app opens with a ready-to-review draft; nothing is sent automatically.</p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary py-8 text-primary-foreground">
      <div className="portfolio-wrap flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold"><span>K</span><span className="text-accent">S</span></span>
          <span className="h-7 w-px bg-primary-foreground/25" aria-hidden="true" />
          <div>
            <p className="text-sm font-bold">Kushal Sathe</p>
            <p className="text-xs text-primary-foreground/65">Turning ideas into intelligent digital solutions.</p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-primary-foreground/75" aria-label="Footer navigation">
          {[navigation[1], navigation[2], navigation[4], navigation[6]].map((item) => (
            <Link key={item.id} to="/" hash={item.id} className="hover:text-accent">{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:text-accent" aria-label="Kushal on LinkedIn">
            <a href={contact.linkedin} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /></a>
          </Button>
          <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:text-accent" aria-label="Kushal on GitHub">
            <a href={contact.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" /></a>
          </Button>
          <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:text-accent" aria-label="Email Kushal">
            <a href={`mailto:${contact.email}`}><Mail aria-hidden="true" /></a>
          </Button>
        </div>
        <p className="text-xs text-primary-foreground/60">© 2026 Kushal Sathe</p>
      </div>
    </footer>
  );
}