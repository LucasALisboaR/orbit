import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { authGuard } from '../../core/auth/auth.guard';
import { guestGuard } from '../../core/auth/guest.guard';

describe('auth redirect guards', () => {
  const state = { url: '/user/edit' } as RouterStateSnapshot;

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('authGuard allows the URL on the server even without a token', () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: AuthService, useValue: { isAuthenticated: () => false } },
      ],
    });

    const result = TestBed.runInInjectionContext(() =>
      authGuard(new ActivatedRouteSnapshot(), state),
    );
    expect(result).toBe(true);
  });

  it('authGuard sends the browser to login with returnUrl when there is no token', () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: AuthService, useValue: { isAuthenticated: () => false } },
      ],
    });

    const result = TestBed.runInInjectionContext(() =>
      authGuard(new ActivatedRouteSnapshot(), state),
    );
    const tree = TestBed.inject(Router).createUrlTree(['/login'], {
      queryParams: { returnUrl: '/user/edit' },
    });
    expect(result.toString()).toBe(tree.toString());
  });

  it('guestGuard returns an authenticated browser to returnUrl', () => {
    const route = new ActivatedRouteSnapshot();
    route.queryParams = { returnUrl: '/user/edit' };

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: AuthService, useValue: { isAuthenticated: () => true } },
      ],
    });

    const result = TestBed.runInInjectionContext(() => guestGuard(route, state));
    expect(result.toString()).toBe('/user/edit');
  });
});
