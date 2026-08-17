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
import { Router } from '@angular/router';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  providers: [provideIcons({ lucideMail, lucideLock })],
  imports: [CommonModule, FormField, NgIcon, HlmInputGroupImports, HlmButtonImports],
  templateUrl: './login.html'
})
export class Login {
  private readonly route = inject(Router);

  protected readonly loginText = signal('Faça o login na sua conta');
  protected readonly emailPlaceholder = signal('Digite seu email');
  protected readonly passwordPlaceholder = signal('Digite sua senha');
  protected readonly forgetText = signal('Esqueceu sua senha?');
  protected readonly submitText = signal('Entrar');
  protected readonly noAccountText = signal('Não tem uma conta?');
  protected readonly noAccountSubmitText = signal('Cadastre-se');

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (shemaPath) => {
    email(shemaPath.email, { message: 'Email inválido' })

    required(shemaPath.password, { message: 'Senha é obrigatória' });
    minLength(shemaPath.password, 8, { message: 'Senha deve ter no mínimo 8 caracteres' });
  });

  onSubmitLogin(): void {
    console.log(this.loginModel())
  }

  goToForget(){
    this.route.navigate(['/forget-password'])
  }

}
