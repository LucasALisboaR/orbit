import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { AuthServiceStub } from '../../layout/testing/layout-testing';
import { Home } from './home';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: AuthService, useClass: AuthServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render dashboard sections with mock data', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Estudos de hoje');
    expect(text).toContain('Hábitos');
    expect(text).toContain('Próximas tarefas');
    expect(text).toContain('Metas em andamento');
    expect(text).toContain('Java + Spring');
  });
});
