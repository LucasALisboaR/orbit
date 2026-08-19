import { provideHttpClient } from '@angular/common/http';
import { computed, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HlmSidebarService } from '@spartan-ng/helm/sidebar';
import { AuthService } from '../../../../core/auth/auth.service';
import { AuthServiceStub } from '../testing/layout-testing';
import { AppShell } from './app-shell';

function sidebarStub(isMobile: ReturnType<typeof signal<boolean>>) {
  return {
    isMobile: isMobile.asReadonly(),
    open: signal(true).asReadonly(),
    openMobile: signal(false).asReadonly(),
    variant: signal('sidebar' as const).asReadonly(),
    state: computed(() => (true ? 'expanded' : 'collapsed') as 'expanded' | 'collapsed'),
    setOpen: vi.fn(),
    setOpenMobile: vi.fn(),
    setVariant: vi.fn(),
    toggleSidebar: vi.fn(),
  };
}

describe('AppShell', () => {
  let fixture: ComponentFixture<AppShell>;
  const isMobile = signal(false);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppShell],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: HlmSidebarService, useValue: sidebarStub(isMobile) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppShell);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the desktop sidebar when not mobile', () => {
    isMobile.set(false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-desktop-sidebar')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-mobile-nav')).toBeNull();
  });

  it('should render the mobile nav when mobile', () => {
    isMobile.set(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-mobile-nav')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-desktop-sidebar')).toBeNull();
  });

  it('should keep page content in a scroll area outside the header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const scrollArea = compiled.querySelector('main .overflow-y-auto');

    expect(scrollArea).toBeTruthy();
    expect(scrollArea?.querySelector('app-header')).toBeNull();
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });
});
