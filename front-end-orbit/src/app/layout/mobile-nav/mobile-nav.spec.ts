import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { AuthServiceStub } from '../testing/layout-testing';
import { MobileNav } from './mobile-nav';

describe('MobileNav', () => {
  let fixture: ComponentFixture<MobileNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNav],
      providers: [
        provideRouter([{ path: 'home', children: [] }]),
        provideHttpClient(),
        { provide: AuthService, useClass: AuthServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileNav);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render nav items and the account action', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Início');
    expect(compiled.textContent).toContain('Conta');
  });

  it('should apply primary color on the selected nav item', () => {
    const link = fixture.nativeElement.querySelector('a[routerlink="/home"]') as HTMLAnchorElement
      ?? fixture.nativeElement.querySelector('nav a');

    expect(link.className).toContain('aria-[current=page]:text-primary');
  });
});
