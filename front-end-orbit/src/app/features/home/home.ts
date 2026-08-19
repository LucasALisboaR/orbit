import { Component, inject } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [HlmButtonImports],
  template: `
    <div class="flex min-h-full flex-col items-center justify-center gap-4 p-6">
      <h1 class="text-2xl tracking-tight">Orbit</h1>
      @if (auth.user(); as user) {
        <p class="text-muted-foreground">
          Olá, {{ user.firstName }} {{ user.lastName }}
        </p>
      }
      <button type="button" hlmBtn variant="outline" (click)="auth.logout()">
        Sair
      </button>
    </div>
  `,
})
export class Home {
  protected readonly auth = inject(AuthService);
}
