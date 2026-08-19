import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { AuthServiceStub } from '../testing/layout-testing';
import { DesktopSidebar } from './desktop-sidebar';

describe('DesktopSidebar', () => {
  let fixture: ComponentFixture<DesktopSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopSidebar],
      providers: [
        provideRouter([{ path: 'home', children: [] }]),
        provideHttpClient(),
        { provide: AuthService, useClass: AuthServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopSidebar);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render nav items from the signal', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Início');
    expect(compiled.textContent).toContain('Orbit');
  });

  it('should apply primary classes on the selected nav item', () => {
    const link = fixture.nativeElement.querySelector('a[hlmSidebarMenuButton]') as HTMLAnchorElement;
    expect(link.className).toContain('data-active:bg-primary');
    expect(link.className).toContain('data-active:text-primary-foreground');
  });
});
