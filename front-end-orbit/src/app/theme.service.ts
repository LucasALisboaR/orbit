import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { USER_STORAGE_KEY } from '../../core/auth/auth.constants';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly themeSignal = signal<Theme>(this.readInitialTheme());

  readonly theme = this.themeSignal.asReadonly();
  readonly isDark = computed(() => this.themeSignal() === 'dark');

  constructor() {
    this.applyClass(this.themeSignal());
  }

  toggleTheme(): void {
    this.setTheme(this.themeSignal() === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    this.applyClass(theme);
    this.persistOnUser(theme);
  }

  applyFromUserTheme(value: unknown): void {
    const theme = ThemeService.normalize(value);
    if (theme) {
      this.setTheme(theme);
    }
  }

  useSystemPreference(): void {
    this.setTheme(this.prefersDark() ? 'dark' : 'light');
  }

  static normalize(value: unknown): Theme | null {
    const normalized = String(value ?? '').toLowerCase();
    if (normalized === 'dark' || normalized === 'light') {
      return normalized;
    }
    return null;
  }

  private readInitialTheme(): Theme {
    const stored = this.readUserTheme();
    if (stored) return stored;
    return this.prefersDark() ? 'dark' : 'light';
  }

  private readUserTheme(): Theme | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    try {
      const raw = localStorage.getItem(USER_STORAGE_KEY);
      if (!raw) return null;
      return ThemeService.normalize(JSON.parse(raw)?.theme);
    } catch {
      return null;
    }
  }

  private persistOnUser(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const raw = localStorage.getItem(USER_STORAGE_KEY);
      if (!raw) return;
      const user = JSON.parse(raw) as Record<string, unknown>;
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ ...user, theme }));
    } catch {
      // Visual theme still works without persistence.
    }
  }

  private applyClass(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  private prefersDark(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }
}
