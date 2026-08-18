import { Component, inject, signal } from '@angular/core';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMail,
  lucideLock,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { CommonModule } from '@angular/common';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { RouterModule } from '@angular/router';
import { LoginData } from '../../../models/user/user.model';
import { UserService } from '../../../services/user/login.service';
import { finalize } from 'rxjs';
import { toast } from '@spartan-ng/brain/sonner';

@Component({
  selector: 'app-login',
  providers: [provideIcons({ lucideMail, lucideLock })],
  imports: [CommonModule, FormField, NgIcon, HlmInputGroupImports, HlmButtonImports, RouterModule],
  templateUrl: './login.html'
})
export class Login {
  private readonly userService = inject(UserService);
  protected readonly loginText = signal('Faça o login na sua conta');
  protected readonly emailPlaceholder = signal('Digite seu email');
  protected readonly passwordPlaceholder = signal('Digite sua senha');
  protected readonly forgetText = signal('Esqueceu sua senha?');
  protected readonly submitText = signal('Entrar');
  protected readonly noAccountText = signal('Não tem uma conta?');
  protected readonly noAccountSubmitText = signal('Cadastre-se');

  protected readonly loading = signal(false);

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (shemaPath) => {
    email(shemaPath.email, { message: 'Email inválido' })
    required(shemaPath.email, { message: 'Email obrigatorio!'})

    required(shemaPath.password, { message: 'Senha é obrigatória' });
    minLength(shemaPath.password, 8, { message: 'Senha deve ter no mínimo 8 caracteres' });
  });

  onSubmitLogin(): void {
    this.loading.set(true);
    this.userService.login(this.loginModel()).pipe(
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: (user) => {
        this.userService.setUser(user);
        toast.success('Login realizado com sucesso!');
      },
      error: (error) => {
        toast.error(error.error.message);
        console.error(error);
      }
    })
  }


}
