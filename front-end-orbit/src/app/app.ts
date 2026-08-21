import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxMeteorsComponent } from '@omnedia/ngx-meteors';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmToasterImports, NgxMeteorsComponent],
  template: `
    <om-meteors
      styleClass="orbit-meteors"
      [meteorColor]="meteorColor()"
      meteorRotation="215deg"
    >
      <div class="relative z-10 min-h-svh">
        <router-outlet />
      </div>
    </om-meteors>
    <hlm-toaster />
  `,
})
export class App {
  private readonly theme = inject(ThemeService);

  /** Primary no dark; secondary no light para melhor contraste no fundo claro */
  protected readonly meteorColor = computed(() =>
    this.theme.isDark() ? 'var(--primary)' : 'var(--secondary)',
  );
}
