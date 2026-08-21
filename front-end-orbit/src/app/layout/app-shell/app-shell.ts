import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSidebarImports, HlmSidebarService } from '@spartan-ng/helm/sidebar';
import { AppHeader } from '../app-header/app-header';
import { DesktopSidebar } from '../desktop-sidebar/desktop-sidebar';
import { MobileNav } from '../mobile-nav/mobile-nav';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, HlmSidebarImports, HlmCardImports, AppHeader, DesktopSidebar, MobileNav],
  templateUrl: './app-shell.html',
})
export class AppShell {
  private readonly sidebar = inject(HlmSidebarService);
  protected readonly isMobile = this.sidebar.isMobile;
}
