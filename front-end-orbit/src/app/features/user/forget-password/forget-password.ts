import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMail,
  lucideArrowLeft,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { CommonModule } from '@angular/common';
import { email, form, FormField, required } from '@angular/forms/signals';
import { Router, RouterModule } from '@angular/router';
import { toast } from '@spartan-ng/brain/sonner';
import { finalize } from 'rxjs';
import { ForgetData } from '../../../models/user/user.model';
import { UserService } from '../../../services/user/login.service';

@Component({
  selector: 'app-forget-password',
  providers: [provideIcons({ lucideMail, lucideArrowLeft })],
  imports: [
    CommonModule,
    FormField,
    NgIcon,
    HlmInputGroupImports,
    HlmButtonImports,
    HlmSpinnerImports,
    RouterModule,
  ],
  templateUrl: './forget-password.html'
})
export class ForgetPassword {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  protected readonly forgetText = signal('Informe seu email para recuperar sua senha');
  protected readonly emailPlaceholder = signal('Digite seu email');
  protected readonly submitText = signal('Enviar');
  protected readonly noAccountText = signal('Não tem uma conta?');
  protected readonly goBackText = signal('Voltar para o login');
  protected readonly noAccountSubmitText = signal('Cadastre-se');
  protected readonly loading = signal(false);

  forgetModel = signal<ForgetData>({
    email: ''
  });

  forgetForm = form(this.forgetModel, (shemaPath) => {
    email(shemaPath.email, { message: 'Email inválido!' });
    required(shemaPath.email, { message: 'Email obrigatorio!' });
  });

  onSubmitForget(): void {
    if (!this.forgetForm().valid() || this.loading()) return;

    this.loading.set(true);

    this.userService
      .forgetPassword(this.forgetModel())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          toast.success(response.message);
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
    return 'Não foi possível enviar a solicitação. Tente novamente.';
  }
}
