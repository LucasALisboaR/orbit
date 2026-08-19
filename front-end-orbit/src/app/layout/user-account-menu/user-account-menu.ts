import { Component, computed, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronsUpDown,
  lucideLogOut,
  lucideMoon,
  lucideSun,
} from '@ng-icons/lucide';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { AuthService } from '../../../../core/auth/auth.service';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-user-account-menu',
  providers: [
    provideIcons({
      lucideChevronsUpDown,
      lucideLogOut,
      lucideMoon,
      lucideSun,
    }),
  ],
  imports: [NgIcon, HlmDropdownMenuImports, HlmSidebarImports],
  templateUrl: './user-account-menu.html',
  host: {
    '[class.flex]': 'variant() === "bottom"',
    '[class.flex-1]': 'variant() === "bottom"',
  },
})
export class UserAccountMenu {
  private readonly auth = inject(AuthService);
  private readonly themeService = inject(ThemeService);

  readonly variant = input<'sidebar' | 'bottom'>('sidebar');
  readonly side = input<'top' | 'bottom' | 'left' | 'right'>('top');
  readonly align = input<'start' | 'center' | 'end'>('start');

  protected readonly user = this.auth.user;
  protected readonly userInitials = computed(() => {
    const current = this.user();
    if (!current) return 'O';
    const first = current.firstName?.charAt(0) ?? '';
    const last = current.lastName?.charAt(0) ?? '';
    return `${first}${last}`.toUpperCase() || 'O';
  });

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  protected logout(): void {
    this.auth.logout();
  }
}
