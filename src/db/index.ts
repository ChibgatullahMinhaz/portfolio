import experience from "./experience.json";
import roles from "./roles.json";
import philosophy from "./philosophy.json";
import ecosystem from "./ecosystem.json";
import skills from "./skills.json";
import services from "./services.json";
import servicesOverview from "./services-overview.json";
import about from "./about.json";
import journey from "./journey.json";
import education from "./education.json";
import process from "./process.json";
import nav from "./nav.json";
import resume from "./resume.json";
import whyWork from "./why-work.json";
import projectsDb from "./projects.json";
import { Bot, Database, Workflow, Cloud, Smartphone, Globe, Code2, type LucideIcon } from "lucide-react";

// ---- Experience ----
export interface ExperienceData {
  period: string;
  location: string;
  current: boolean;
  title: string;
  role: string;
  description: string;
  highlights: string[];
}
export const experienceData = experience as ExperienceData[];

// ---- What I Do (scroll-driven roles) ----
export interface RoleData {
  num: string;
  title: string;
  tag: string | null;
  description: string;
  builds: string[];
  technologies: string[];
  responsibilities: string[];
  problem: string;
}
export const rolesData = roles as RoleData[];

// ---- Philosophy ----
export interface PrincipleData {
  num: string;
  title: string;
  description: string;
}
export const principlesData = philosophy as PrincipleData[];

// ---- Ecosystem ----
export interface EcosystemMarqueeRow {
  reverse: boolean;
  items: string[];
}
export interface EcosystemArea {
  title: string;
  description: string;
  stack: string[];
  tag?: string;
}
export const ecosystemMarqueeRows = ecosystem.marqueeRows as EcosystemMarqueeRow[];
export const ecosystemAreas = ecosystem.areas as EcosystemArea[];

// ---- Skills ----
export const marqueeSkills = skills.marquee as string[];
export interface SkillGroupData {
  num: string;
  title: string;
  tagline: string;
  items: string[];
  unlocks: string;
  proof: string;
}
export const skillGroupsData = skills.groups as SkillGroupData[];

// ---- Services page ----
export interface ServiceData {
  num: string;
  title: string;
  summary: string;
  stack: string[];
  fits: string[];
  deliverables: string[];
  related: { id: string; name: string; kind: string }[];
}
export const servicesPageData = services as ServiceData[];

// ---- Services overview (legacy section component) ----
export interface ServiceOverviewData {
  icon: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  highlight?: boolean;
}
export const servicesOverviewData = servicesOverview as ServiceOverviewData[];

// ---- About ----
export interface StatData {
  value: number;
  suffix: string;
  decimals: number;
  label: string;
}
export const aboutStats = about.stats as StatData[];
export const approachPoints = about.approachPoints as string[];

// ---- Journey / Education ----
export interface JourneyStep {
  period: string;
  title: string;
  note: string;
}
export const journeyData = journey as JourneyStep[];

export interface EducationEntry {
  period: string;
  title: string;
  note: string;
  ongoing: boolean;
}
export const educationData = education as EducationEntry[];

// ---- Process ----
export interface ProcessStep {
  title: string;
  description: string;
}
export const processSteps = process as ProcessStep[];

// ---- Navigation ----
export interface NavLinkData {
  href: string;
  label: string;
  num: string;
}
export interface FooterLink {
  href: string;
  label: string;
}
export interface SpySection {
  id: string;
  label: string;
}
export const navLinks = nav.navLinks as NavLinkData[];
export const footerExploreLinks = nav.footerExplore as FooterLink[];
export const elsewhereLinks = nav.elsewhere as FooterLink[];
export const spySections = nav.spySections as SpySection[];

// ---- Resume ----
export const resumeSnapshot = resume.snapshot as { label: string; value: string }[];

// ---- Why Work With Me ----
export interface WhyWorkReason {
  icon: string;
  title: string;
  description: string;
}
export const whyWorkReasons = whyWork as WhyWorkReason[];

// ---- Projects ----
export type ProjectCategory = "web" | "android" | "ai" | "backend";

export interface ProjectMeta {
  role: string;
  type: string;
  status: "Delivered" | "Ongoing" | "Internal";
  availability: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  icon: LucideIcon;
  gradient: string;
  github: string;
  live: string;
  category: ProjectCategory;
  techStack: string[];
  features: string[];
  challenges: string[];
  images?: string[];
  subtitle?: string;
  meta?: ProjectMeta;
  overview?: string;
  myRole?: string;
  problem?: string;
  built?: string[];
  implementation?: string[];
  outcome?: string;
  related?: string[];
}

const projectIconMap: Record<string, LucideIcon> = {
  Bot,
  Database,
  Workflow,
  Cloud,
  Smartphone,
  Globe,
  Code2,
};

interface ProjectJson extends Omit<Project, "icon" | "category"> {
  icon: string;
  category: string;
}

export const projects: Project[] = (projectsDb.projects as ProjectJson[]).map((p) => ({
  ...p,
  category: p.category as ProjectCategory,
  icon: projectIconMap[p.icon] ?? Code2,
}));

export const categories = projectsDb.categories as { value: string; label: string }[];
export const techFilters = projectsDb.techFilters as string[];
