import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHouse } from '@ng-icons/lucide';
import { APP_NAV_ITEMS } from '../app-nav';
import { UserAccountMenu } from '../user-account-menu/user-account-menu';

@Component({
  selector: 'app-mobile-nav',
  providers: [provideIcons({ lucideHouse })],
  imports: [RouterLink, RouterLinkActive, NgIcon, UserAccountMenu],
  templateUrl: './mobile-nav.html',
})
export class MobileNav {
  protected readonly navItems = APP_NAV_ITEMS;
}
