export interface PortfolioData {
  readonly meta: PortfolioMeta;
  readonly ui: UiCopy;
  readonly navigation: readonly NavigationItem[];
  readonly profile: Profile;
  readonly sections: SectionCopy;
  readonly education: readonly EducationItem[];
  readonly courses: readonly string[];
  readonly experience: readonly ExperienceItem[];
  readonly sideProjects: readonly SideProjectItem[];
  readonly skills: readonly SkillGroup[];
  readonly contact: Contact;
  readonly footer: Footer;
}

export interface UiCopy {
  readonly loading: string;
  readonly error: string;
  readonly menuOpen: string;
  readonly menuClose: string;
  readonly visitWebsite: string;
  readonly viewProject: string;
  readonly previousImage: string;
  readonly nextImage: string;
  readonly viewProjects: string;
  readonly hideProjects: string;
  readonly imageFallback: string;
}

export interface PortfolioMeta {
  readonly title: string;
  readonly description: string;
}

export interface NavigationItem {
  readonly label: string;
  readonly target: string;
}

export interface Profile {
  readonly eyebrow: string;
  readonly name: string;
  readonly role: string;
  readonly intro: string;
  readonly location: string;
  readonly availability: string;
  readonly portrait: string;
  readonly portraitAlt: string;
  readonly primaryAction: ActionLink;
  readonly secondaryAction: ActionLink;
  readonly cvUrl: string | null;
  readonly cvLabel: string;
  readonly stats: readonly StatItem[];
}

export interface ActionLink {
  readonly label: string;
  readonly target: string;
}

export interface StatItem {
  readonly value: string;
  readonly label: string;
}

export interface SectionCopy {
  readonly about: SectionHeading & {
    readonly paragraphs: readonly string[];
  };
  readonly education: SectionHeading;
  readonly experience: SectionHeading;
  readonly sideProjects: SectionHeading;
  readonly skills: SectionHeading;
  readonly courses: SectionHeading;
  readonly contact: SectionHeading & {
    readonly description: string;
  };
}

export interface SectionHeading {
  readonly eyebrow: string;
  readonly title: string;
}

export interface EducationItem {
  readonly name: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
  readonly imageCredit: string;
  readonly imageCreditUrl: string;
  readonly link: string;
}

export interface ExperienceItem {
  readonly name: string;
  readonly role: string;
  readonly period: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly link: string;
  readonly projects: readonly ProjectItem[];
  readonly expanded: boolean;
}

export interface ProjectItem {
  readonly name: string;
  readonly description: string;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly technologies: readonly string[];
}

export interface SideProjectItem {
  readonly name: string;
  readonly description: string;
  readonly logo: string;
  readonly logoAlt: string;
  readonly images: readonly ProjectImage[];
  readonly technologies: readonly string[];
  readonly link: string | null;
}

export interface ProjectImage {
  readonly src: string;
  readonly alt: string;
}

export interface SkillGroup {
  readonly category: string;
  readonly items: readonly string[];
}

export interface Contact {
  readonly email: string;
  readonly emailLabel: string;
  readonly phone: string;
  readonly phoneLabel: string;
  readonly location: string;
  readonly socialLinks: readonly SocialLink[];
}

export interface SocialLink {
  readonly label: string;
  readonly url: string;
}

export interface Footer {
  readonly note: string;
  readonly backToTopLabel: string;
}
