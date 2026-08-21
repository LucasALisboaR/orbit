import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { safeInternalUrl } from './safe-internal-url';

/**
 * Evita abrir login/cadastro quando já autenticado.
 * No SSR não redireciona: o token só existe no browser após o F5.
 */
export const guestGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (!auth.isAuthenticated()) {
    return true;
  }

  return router.parseUrl(safeInternalUrl(route.queryParamMap.get('returnUrl')));
};
