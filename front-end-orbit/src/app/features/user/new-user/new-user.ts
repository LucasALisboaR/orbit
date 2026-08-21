import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMail,
  lucideLock,
  lucideUser,
  lucideArrowLeft,
  lucideEye,
  lucideEyeOff,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { CommonModule } from '@angular/common';
import { email, form, FormField, maxLength, minLength, required } from '@angular/forms/signals';
import { Router, RouterModule } from '@angular/router';
import { toast } from '@spartan-ng/brain/sonner';
import { finalize } from 'rxjs';
import { NewUserData } from '../../../models/user/user.model';
import { UserService } from '../../../services/user/login.service';

@Component({
  selector: 'app-new-user',
  providers: [provideIcons({ lucideMail, lucideLock, lucideUser, lucideArrowLeft, lucideEye, lucideEyeOff })],
  imports: [
    CommonModule,
    FormField,
    NgIcon,
    HlmInputGroupImports,
    HlmButtonImports,
    HlmSpinnerImports,
    RouterModule,
  ],
  templateUrl: './new-user.html'
})
export class NewUser {
  private userService = inject(UserService);
  private router = inject(Router);

  protected readonly newUserText = signal('Crie sua conta');
  protected readonly firstNamePlaceholder = signal('Digite seu nome');
  protected readonly lastNamePlaceholder = signal('Digite seu sobrenome');
  protected readonly emailPlaceholder = signal('Digite seu email');
  protected readonly passwordPlaceholder = signal('Digite sua senha');
  protected readonly submitText = signal('Criar conta');
  protected readonly goBackText = signal('Voltar para o login');
  protected readonly loading = signal(false);
  protected readonly showPassword = signal(false);

  newUserModel = signal<NewUserData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  newUserForm = form(this.newUserModel, (shemaPath) => {
    required(shemaPath.firstName, { message: 'Nome é obrigatório' });
    minLength(shemaPath.firstName, 3, { message: 'Nome deve ter no mínimo 3 caracteres' });
    maxLength(shemaPath.firstName, 50, { message: 'Nome deve ter no máximo 50 caracteres' });

    required(shemaPath.lastName, { message: 'Sobrenome é obrigatório' });
    minLength(shemaPath.lastName, 3, { message: 'Sobrenome deve ter no mínimo 3 caracteres' });

    email(shemaPath.email, { message: 'Email inválido' });
    required(shemaPath.email, { message: 'Email obrigatorio!' });

    required(shemaPath.password, { message: 'Senha é obrigatória' });
    minLength(shemaPath.password, 8, { message: 'Senha deve ter no mínimo 8 caracteres' });
  });

  onSubmitNewUser(): void {
    if (!this.newUserForm().valid() || this.loading()) return;

    this.loading.set(true);

    this.userService
      .register(this.newUserModel())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          toast.success('Conta criada com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          toast.error(this.resolveErrorMessage(error));
        },
      });
  }

  private resolveErrorMessage(error: HttpErrorResponse): string {
    const backendMessage = error.error?.message;
    if (typeof backendMessage === 'string' && backendMessage.trim()) {
      return backendMessage;
    }
    return 'Não foi possível criar a conta. Tente novamente.';
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.update((visible) => !visible);
  }
}
