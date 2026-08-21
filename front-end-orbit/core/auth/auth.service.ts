import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { fromApiTheme, LoginData, User } from '../../src/app/models/user/user.model';
import { ThemeService } from '../../src/app/theme.service';
import { HttpService } from '../services/http.service';
import { AuthResponse } from './auth.model';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from './auth.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly themeService = inject(ThemeService);

  private readonly tokenSignal = signal<string | null>(this.readToken());
  private readonly userSignal = signal<User | null>(this.readUser());

  readonly token = this.tokenSignal.asReadonly();
  readonly user = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.tokenSignal());

  login(credentials: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/auth/login', credentials).pipe(
      tap((response) => this.persistSession(response))
    );
  }

  logout(): void {
    this.clearSession();
    this.themeService.useSystemPreference();
    void this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return this.tokenSignal();
  }

  setSessionUser(user: User): void {
    const sessionUser = this.normalizeUser(user);
    this.userSignal.set(sessionUser);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sessionUser));
    }

    this.themeService.applyFromUserTheme(sessionUser.theme);
  }

  private persistSession(response: AuthResponse): void {
    const sessionUser = this.normalizeUser(response.user);
    this.tokenSignal.set(response.accessToken);
    this.userSignal.set(sessionUser);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(TOKEN_STORAGE_KEY, response.accessToken);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sessionUser));
    }

    this.themeService.applyFromUserTheme(sessionUser.theme);
  }

  private normalizeUser(user: User): User {
    return { ...user, theme: fromApiTheme(user.theme) };
  }

  private clearSession(): void {
    this.tokenSignal.set(null);
    this.userSignal.set(null);

    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  }

  private readToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  private readUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    try {
      return this.normalizeUser(JSON.parse(raw) as User);
    } catch {
      return null;
    }
  }
}
