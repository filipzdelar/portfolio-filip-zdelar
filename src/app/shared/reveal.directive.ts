import { AfterViewInit, Directive, ElementRef, inject, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const host = this.element.nativeElement;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      host.classList.add('is-visible');
      return;
    }

    host.classList.add('reveal-ready');
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        host.classList.add('is-visible');
        this.observer?.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
