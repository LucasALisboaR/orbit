import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HlmSidebarService } from '@spartan-ng/helm/sidebar';
import { AppHeader } from './app-header';

describe('AppHeader', () => {
  let fixture: ComponentFixture<AppHeader>;
  const isMobile = signal(false);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHeader],
      providers: [
        {
          provide: HlmSidebarService,
          useValue: {
            isMobile: isMobile.asReadonly(),
            toggleSidebar: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppHeader);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show the sidebar trigger on desktop', () => {
    isMobile.set(false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-sidebar="trigger"]')).toBeTruthy();
  });

  it('should show the project name on mobile', () => {
    isMobile.set(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Orbit');
    expect(fixture.nativeElement.querySelector('[data-sidebar="trigger"]')).toBeNull();
  });
});
