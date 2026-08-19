import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideSpartanHlm } from '@spartan-ng/helm/utils';
import { provideHlmSidebarConfig } from '@spartan-ng/helm/sidebar';

import { routes } from './app.routes';
import { authInterceptor } from '../../core/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideSpartanHlm(),
    provideHlmSidebarConfig({
      mobileBreakpoint: '1023px',
    }),
  ]
};
