import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly renderer = inject(RendererFactory2).createRenderer(null, null);
  private readonly themeSubject = new ReplaySubject<Theme>(1);

  readonly theme$ = this.themeSubject.asObservable();

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.setTheme(this.getInitialTheme());
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const currentTheme = this.document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';

    this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  private getInitialTheme(): Theme {
    try {
      const savedTheme = localStorage.getItem('theme');

      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch {
      // localStorage can be unavailable in restricted browser contexts.
    }

    const prefersDark =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    return prefersDark ? 'dark' : 'light';
  }

  private setTheme(theme: Theme): void {
    if (theme === 'dark') {
      this.renderer.addClass(this.document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark');
    }

    try {
      localStorage.setItem('theme', theme);
    } catch {
      // The in-memory and visual theme still work without persistence.
    }

    this.themeSubject.next(theme);
  }
}
