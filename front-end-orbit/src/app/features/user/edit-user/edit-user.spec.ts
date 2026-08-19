import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../../../../core/auth/auth.service';
import { AuthServiceStub, MOCK_USER } from '../../../layout/testing/layout-testing';
import { UserService } from '../../../services/user/login.service';
import { EditUser } from './edit-user';

describe('EditUser', () => {
  let fixture: ComponentFixture<EditUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUser],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: AuthService, useClass: AuthServiceStub },
        {
          provide: UserService,
          useValue: {
            getUserById: () => of(MOCK_USER),
            listUsers: () => of([]),
            updateUser: () => of(MOCK_USER),
            deleteUser: () => of({ message: 'ok' }),
            promoteToAdmin: () => of(MOCK_USER),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUser);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the profile heading', () => {
    expect(fixture.nativeElement.textContent).toContain('Editar perfil');
  });

  it('should offer theme and self-delete on the profile form', () => {
    expect(fixture.nativeElement.textContent).toContain('Tema');
    expect(fixture.nativeElement.textContent).toContain('Excluir minha conta');
  });
});
