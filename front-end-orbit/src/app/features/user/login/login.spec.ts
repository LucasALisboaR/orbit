import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reveal the password when the eye button is clicked', () => {
    const password = fixture.nativeElement.querySelector('input[placeholder="Digite sua senha"]') as HTMLInputElement;
    const toggle = fixture.nativeElement.querySelector('button[aria-label="Mostrar senha"]') as HTMLButtonElement;

    expect(password.type).toBe('password');
    toggle.click();
    fixture.detectChanges();

    expect(password.type).toBe('text');
    expect(fixture.nativeElement.querySelector('button[aria-label="Ocultar senha"]')).toBeTruthy();
  });
});
