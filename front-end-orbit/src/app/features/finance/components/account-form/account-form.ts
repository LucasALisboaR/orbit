import { Component, inject, output, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { form, FormField, maxLength, minLength, required } from '@angular/forms/signals';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideWallet } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { toast } from '@spartan-ng/brain/sonner';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../../../core/auth/auth.service';
import {
  ACCOUNT_TYPE_LABELS,
  Account,
  AccountType,
  CreateAccountFormData,
} from '../../../../models/finance/account.model';
import { AccountService } from '../../../../services/finance/account.service';
import { FinanceStoreService } from '../../../../services/finance/finance-store.service';

@Component({
  selector: 'app-account-form',
  providers: [provideIcons({ lucideWallet })],
  imports: [FormField, NgIcon, HlmInputGroupImports, HlmButtonImports, HlmSpinnerImports],
  templateUrl: './account-form.html',
})
export class AccountForm {
  private readonly accountService = inject(AccountService);
  private readonly financeStore = inject(FinanceStoreService);
  private readonly authService = inject(AuthService);

  readonly accountCreated = output<Account>();
  readonly cancelled = output<void>();

  protected readonly loading = signal(false);
  protected readonly accountTypes = Object.values(AccountType);
  protected readonly accountTypeLabels = ACCOUNT_TYPE_LABELS;

  protected readonly formModel = signal<CreateAccountFormData>({
    name: '',
    type: AccountType.CORRENTE,
    balance: 0,
  });

  protected readonly accountForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Nome é obrigatório' });
    minLength(schemaPath.name, 2, { message: 'Nome deve ter no mínimo 2 caracteres' });
    maxLength(schemaPath.name, 100, { message: 'Nome deve ter no máximo 100 caracteres' });
    required(schemaPath.type, { message: 'Tipo é obrigatório' });
  });

  resetForm(): void {
    this.formModel.set({
      name: '',
      type: AccountType.CORRENTE,
      balance: 0,
    });
  }

  onSubmit(): void {
    if (!this.accountForm().valid() || this.loading()) return;

    if (!this.authService.user()) {
      toast.error('Sessão expirada. Faça login novamente.');
      return;
    }

    this.loading.set(true);
    const payload = this.formModel();

    this.accountService
      .create({
        name: payload.name.trim(),
        type: payload.type,
        balance: payload.balance ?? 0,
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (account) => {
          this.financeStore.addAccount(account);
          toast.success('Conta criada com sucesso!');
          this.accountCreated.emit(account);
          this.resetForm();
        },
        error: (error: HttpErrorResponse) => toast.error(this.resolveErrorMessage(error)),
      });
  }

  private resolveErrorMessage(error: HttpErrorResponse): string {
    const backendMessage = error.error?.message;
    if (typeof backendMessage === 'string' && backendMessage.trim()) {
      return backendMessage;
    }
    return 'Não foi possível criar a conta. Tente novamente.';
  }
}
