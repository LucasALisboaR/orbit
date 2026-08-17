import { Component, inject, signal } from '@angular/core';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMail,
  lucideLock,
  lucideArrowLeft,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { CommonModule } from '@angular/common';
import { email, form, FormField, required } from '@angular/forms/signals';
import { RouterModule } from '@angular/router';

interface ForgetData {
  email: string;
}

@Component({
  selector: 'app-forget-password',
  providers: [provideIcons({ lucideMail, lucideArrowLeft })],
  imports: [CommonModule, FormField, NgIcon, HlmInputGroupImports, HlmButtonImports, RouterModule],
  templateUrl: './forget-password.html'
})
export class ForgetPassword {
  protected readonly forgetText = signal('Infome seu email para recuperar sua senha');
  protected readonly emailPlaceholder = signal('Digite seu email');
  protected readonly submitText = signal('Enviar');
  protected readonly noAccountText = signal('Não tem uma conta?');
  protected readonly goBackText = signal('Voltar para o login');
  protected readonly noAccountSubmitText = signal('Cadastre-se');

  forgetModel = signal<ForgetData>({
    email: ''
  });

  forgetForm = form(this.forgetModel, (shemaPath) => {
    email(shemaPath.email, { message: 'Email inválido!' })
    required(shemaPath.email, { message: 'Email obrigatorio!'})
  });

  onSubmitForget(): void {
    console.log(this.forgetModel())
  }

}
