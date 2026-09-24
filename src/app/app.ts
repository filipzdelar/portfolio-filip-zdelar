import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PortfolioDataService } from './core/portfolio-data.service';
import { PortfolioData } from './core/portfolio.models';
import { RevealDirective } from './shared/reveal.directive';

@Component({
  imports: [RevealDirective],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly dataService = inject(PortfolioDataService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly documentTitle = inject(Title);
  private readonly meta = inject(Meta);

  protected readonly portfolio = signal<PortfolioData | null>(null);
  protected readonly loadFailed = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly activeSection = signal('about');
  protected readonly expandedCompanies = signal<ReadonlySet<string>>(new Set());
  protected readonly sideProjectSlides = signal<ReadonlyMap<string, number>>(new Map());

  constructor() {
    this.dataService
      .getPortfolio()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (portfolio) => {
          this.portfolio.set(portfolio);
          this.documentTitle.setTitle(portfolio.meta.title);
          this.meta.updateTag({
            name: 'description',
            content: portfolio.meta.description,
          });
          this.expandedCompanies.set(
            new Set(
              portfolio.experience
                .filter((company) => company.expanded)
                .map((company) => company.name),
            ),
          );
        },
        error: () => this.loadFailed.set(true),
      });
  }

  protected scrollTo(target: string, event?: Event): void {
    event?.preventDefault();
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    this.activeSection.set(target);
    this.menuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  protected toggleCompany(name: string): void {
    this.expandedCompanies.update((current) => {
      const updated = new Set(current);
      updated.has(name) ? updated.delete(name) : updated.add(name);
      return updated;
    });
  }

  protected isExpanded(name: string): boolean {
    return this.expandedCompanies().has(name);
  }

  protected activeProjectSlide(name: string): number {
    return this.sideProjectSlides().get(name) ?? 0;
  }

  protected moveProjectSlide(name: string, imageCount: number, direction: -1 | 1): void {
    this.sideProjectSlides.update((current) => {
      const updated = new Map(current);
      const nextIndex = (this.activeProjectSlide(name) + direction + imageCount) % imageCount;
      updated.set(name, nextIndex);
      return updated;
    });
  }

  protected useImageFallback(event: Event): void {
    const image = event.currentTarget as HTMLImageElement;
    const fallback = image.dataset['fallback'];

    if (fallback && image.src !== new URL(fallback, document.baseURI).href) {
      image.src = fallback;
    }
  }

  @HostListener('window:scroll')
  protected updateActiveSection(): void {
    const targets = this.portfolio()?.navigation.map((item) => item.target) ?? [];
    let closest = targets[0] ?? 'about';
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const target of targets) {
      const section = document.getElementById(target);
      if (!section) {
        continue;
      }

      const distance = Math.abs(section.getBoundingClientRect().top - 150);
      if (distance < closestDistance) {
        closest = target;
        closestDistance = distance;
      }
    }

    this.activeSection.set(closest);
  }

  @HostListener('document:keydown.escape')
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
