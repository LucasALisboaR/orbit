import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronsUpDown,
  lucideHouse,
  lucideLogOut,
  lucideMoon,
  lucideSun,
} from '@ng-icons/lucide';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmSidebarImports, HlmSidebarService } from '@spartan-ng/helm/sidebar';
import { AuthService } from '../../../core/auth/auth.service';
import { ThemeService } from '../theme.service';
import { APP_NAV_ITEMS } from './app-nav';

@Component({
  selector: 'app-shell',
  providers: [
    provideIcons({
      lucideHouse,
      lucideChevronsUpDown,
      lucideLogOut,
      lucideMoon,
      lucideSun,
    }),
  ],
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIcon,
    HlmSidebarImports,
    HlmDropdownMenuImports,
  ],
  templateUrl: './app-shell.html',
})
export class AppShell {
  protected readonly auth = inject(AuthService);
  protected readonly theme = inject(ThemeService);
  protected readonly sidebar = inject(HlmSidebarService);
  protected readonly navItems = APP_NAV_ITEMS;

  protected readonly userInitials = computed(() => {
    const user = this.auth.user();
    if (!user) return 'O';
    const first = user.firstName?.charAt(0) ?? '';
    const last = user.lastName?.charAt(0) ?? '';
    return `${first}${last}`.toUpperCase() || 'O';
  });
}
