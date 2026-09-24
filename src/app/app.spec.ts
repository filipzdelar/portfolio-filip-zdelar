import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { App } from './app';
import { PortfolioDataService } from './core/portfolio-data.service';
import { PortfolioData } from './core/portfolio.models';

const portfolio: PortfolioData = {
  meta: { title: 'Test Portfolio', description: 'Test description' },
  ui: {
    loading: 'Loading',
    error: 'Error',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    visitWebsite: 'Visit website',
    viewProject: 'View project',
    previousImage: 'Previous image',
    nextImage: 'Next image',
    viewProjects: 'View projects',
    hideProjects: 'Hide projects',
    imageFallback: 'Image placeholder',
  },
  navigation: [
    { label: 'About', target: 'about' },
    { label: 'Experience', target: 'experience' },
  ],
  profile: {
    eyebrow: 'Portfolio',
    name: 'Test Name',
    role: 'Software Engineer',
    intro: 'Introduction',
    location: 'Location',
    availability: 'Available',
    portrait: 'assets/images/placeholder-portrait.svg',
    portraitAlt: 'Portrait',
    primaryAction: { label: 'Work', target: 'experience' },
    secondaryAction: { label: 'Contact', target: 'contact' },
    cvUrl: null,
    cvLabel: 'CV soon',
    stats: [{ value: '1', label: 'Project' }],
  },
  sections: {
    about: { eyebrow: 'About', title: 'About title', paragraphs: ['About copy'] },
    education: { eyebrow: 'Education', title: 'Education title' },
    experience: { eyebrow: 'Experience', title: 'Experience title' },
    sideProjects: { eyebrow: 'Projects', title: 'Side projects' },
    skills: { eyebrow: 'Skills', title: 'Skills title' },
    courses: { eyebrow: 'Learning', title: 'Courses' },
    contact: {
      eyebrow: 'Contact',
      title: 'Contact title',
      description: 'Contact description',
    },
  },
  education: [],
  courses: [],
  experience: [
    {
      name: 'Test Company',
      role: 'Engineer',
      period: '2025',
      image: 'assets/images/placeholder-organization.svg',
      imageAlt: 'Company',
      link: 'https://example.com',
      projects: [
        {
          name: 'Test Project',
          description: 'Project description',
          image: 'assets/images/placeholder-project.svg',
          imageAlt: 'Project',
          technologies: ['Angular'],
        },
      ],
      expanded: false,
    },
  ],
  sideProjects: [],
  skills: [],
  contact: {
    email: 'test@example.com',
    emailLabel: 'test@example.com',
    phone: '+381691234567',
    phoneLabel: '069 123 4567',
    location: 'Location',
    socialLinks: [],
  },
  footer: { note: 'Footer', backToTopLabel: 'Top' },
};

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: PortfolioDataService,
          useValue: { getPortfolio: () => of(portfolio) },
        },
      ],
    }).compileComponents();
  });

  it('loads and renders portfolio content', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Software Engineer');
    expect(compiled.querySelector('.brand')?.textContent).toContain('Test Name');
  });

  it('expands a company project list', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const company = compiled.querySelector('.company');
    const toggle = compiled.querySelector<HTMLButtonElement>('.expand-button');

    expect(company?.classList.contains('is-expanded')).toBe(false);
    toggle?.click();
    fixture.detectChanges();

    expect(company?.classList.contains('is-expanded')).toBe(true);
    expect(toggle?.getAttribute('aria-expanded')).toBe('true');
  });
});
