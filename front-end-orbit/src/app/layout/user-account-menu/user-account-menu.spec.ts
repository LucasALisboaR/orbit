import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../../../core/auth/auth.service';
import { ThemeService } from '../../theme.service';
import { AuthServiceStub, ThemeServiceStub } from '../testing/layout-testing';
import { UserAccountMenu } from './user-account-menu';

describe('UserAccountMenu', () => {
  let fixture: ComponentFixture<UserAccountMenu>;
  let theme: ThemeServiceStub;
  let auth: AuthServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccountMenu],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ThemeService, useClass: ThemeServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAccountMenu);
    auth = TestBed.inject(AuthService) as unknown as AuthServiceStub;
    theme = TestBed.inject(ThemeService) as unknown as ThemeServiceStub;
    fixture.componentRef.setInput('variant', 'sidebar');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show user initials from the auth signal', () => {
    expect(fixture.nativeElement.textContent).toContain('LL');
    expect(auth.user().firstName).toBe('Lucas');
  });

  it('should render the bottom variant as Conta', async () => {
    fixture.componentRef.setInput('variant', 'bottom');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Conta');
  });

  it('should call theme toggle and logout from the component API', () => {
    const toggleSpy = vi.spyOn(theme, 'toggleTheme');
    const logoutSpy = vi.spyOn(auth, 'logout');

    fixture.componentInstance['toggleTheme']();
    fixture.componentInstance['logout']();

    expect(toggleSpy).toHaveBeenCalled();
    expect(logoutSpy).toHaveBeenCalled();
  });
});
