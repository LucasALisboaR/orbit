import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl tracking-tight">Início</h1>
      @if (auth.user(); as user) {
      <p class="text-muted-foreground">
        Olá, {{ user.firstName }} {{ user.lastName }}.
      </p>
      }
    </div>
  `,
})
export class Home {
  protected readonly auth = inject(AuthService);
}
