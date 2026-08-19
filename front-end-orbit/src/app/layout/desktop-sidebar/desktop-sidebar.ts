import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHouse } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { APP_NAV_ITEMS } from '../app-nav';
import { UserAccountMenu } from '../user-account-menu/user-account-menu';

@Component({
  selector: 'app-desktop-sidebar',
  providers: [provideIcons({ lucideHouse })],
  imports: [RouterLink, RouterLinkActive, NgIcon, HlmSidebarImports, UserAccountMenu],
  templateUrl: './desktop-sidebar.html',
})
export class DesktopSidebar {
  protected readonly navItems = APP_NAV_ITEMS;
}
