import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginData, User } from '../../src/app/models/user/user.model';
import { HttpService } from '../services/http.service';
import { AuthResponse } from './auth.model';

const TOKEN_KEY = 'orbit_access_token';
const USER_KEY = 'orbit_user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

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
    void this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return this.tokenSignal();
  }

  private persistSession(response: AuthResponse): void {
    this.tokenSignal.set(response.accessToken);
    this.userSignal.set(response.user);

    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.setItem(TOKEN_KEY, response.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
  }

  private clearSession(): void {
    this.tokenSignal.set(null);
    this.userSignal.set(null);

    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.clear();
  }

  private readToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  private readUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }
}
