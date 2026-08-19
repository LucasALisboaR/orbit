import { Component, inject } from '@angular/core';
import { HlmSidebarImports, HlmSidebarService } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'app-header',
  imports: [HlmSidebarImports],
  templateUrl: './app-header.html',
})
export class AppHeader {
  private readonly sidebar = inject(HlmSidebarService);
  protected readonly isMobile = this.sidebar.isMobile;
}
