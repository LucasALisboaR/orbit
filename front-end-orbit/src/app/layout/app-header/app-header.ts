import { Component, inject } from '@angular/core';
import { HlmSidebarImports, HlmSidebarService } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'app-header',
  imports: [HlmSidebarImports],
  templateUrl: './app-header.html',
  host: {
    class: 'bg-background sticky top-0 z-20 block shrink-0',
  },
})
export class AppHeader {
  private readonly sidebar = inject(HlmSidebarService);
  protected readonly isMobile = this.sidebar.isMobile;
}
