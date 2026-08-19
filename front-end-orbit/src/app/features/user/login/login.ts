import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMail,
  lucideLock,
  lucideEye,
  lucideEyeOff,
  lucideLoader,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { CommonModule } from '@angular/common';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginData } from '../../../models/user/user.model';
import { AuthService } from '../../../../../core/auth/auth.service';
import { safeInternalUrl } from '../../../../../core/auth/safe-internal-url';
import { finalize } from 'rxjs';
import { toast } from '@spartan-ng/brain/sonner';

@Component({
  selector: 'app-login',
  providers: [provideIcons({ lucideMail, lucideLock, lucideEye, lucideEyeOff, lucideLoader })],
  imports: [CommonModule, FormField, NgIcon, HlmInputGroupImports, HlmButtonImports, RouterModule],
  templateUrl: './login.html'
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly loginText = signal('Faça o login na sua conta');
  protected readonly emailPlaceholder = signal('Digite seu email');
  protected readonly passwordPlaceholder = signal('Digite sua senha');
  protected readonly forgetText = signal('Esqueceu sua senha?');
  protected readonly submitText = signal('Entrar');
  protected readonly noAccountText = signal('Não tem uma conta?');
  protected readonly noAccountSubmitText = signal('Cadastre-se');
  protected readonly loading = signal(false);
  protected readonly showPassword = signal(false);

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (shemaPath) => {
    email(shemaPath.email, { message: 'Email inválido' });
    required(shemaPath.email, { message: 'Email obrigatorio!' });

    required(shemaPath.password, { message: 'Senha é obrigatória' });
    minLength(shemaPath.password, 8, { message: 'Senha deve ter no mínimo 8 caracteres' });
  });

  onSubmitLogin(): void {
    if (!this.loginForm().valid() || this.loading()) return;

    this.loading.set(true);
    this.authService
      .login(this.loginModel())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          toast.success('Login realizado com sucesso!');
          void this.router.navigateByUrl(
            safeInternalUrl(this.route.snapshot.queryParamMap.get('returnUrl')),
          );
        },
        error: (error: HttpErrorResponse) => {
          const message =
            typeof error.error?.message === 'string'
              ? error.error.message
              : 'Não foi possível entrar. Verifique email e senha.';
          toast.error(message);
        },
      });
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.update((visible) => !visible);
  }
}
