import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal, viewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucidePencil,
  lucidePlus,
  lucideReceipt,
  lucideTrash2,
  lucideWallet,
} from '@ng-icons/lucide';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import {
  HlmCard,
  HlmCardContent,
  HlmCardDescription,
  HlmCardHeader,
  HlmCardTitle,
} from '@spartan-ng/helm/card';
import { HlmDialog, HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { toast } from '@spartan-ng/brain/sonner';
import { finalize } from 'rxjs';
import { Account, ACCOUNT_TYPE_LABELS } from '../../../models/finance/account.model';
import { AccountService } from '../../../services/finance/account.service';
import { FinanceStoreService } from '../../../services/finance/finance-store.service';
import { CreateAccountDialog } from '../components/create-account-dialog/create-account-dialog';
import { CreateTransactionDialog } from '../components/create-transaction-dialog/create-transaction-dialog';
import { EditAccountDialog } from '../components/edit-account-dialog/edit-account-dialog';

@Component({
  selector: 'app-finance',
  providers: [
    provideIcons({
      lucideWallet,
      lucideReceipt,
      lucidePlus,
      lucidePencil,
      lucideTrash2,
    }),
  ],
  imports: [
    CurrencyPipe,
    NgIcon,
    HlmBadge,
    HlmButtonImports,
    HlmCard,
    HlmCardHeader,
    HlmCardTitle,
    HlmCardDescription,
    HlmCardContent,
    HlmSpinnerImports,
    HlmDialogImports,
    CreateAccountDialog,
    CreateTransactionDialog,
    EditAccountDialog,
  ],
  templateUrl: './finance.html',
})
export class Finance implements OnInit {
  private readonly financeStore = inject(FinanceStoreService);
  private readonly accountService = inject(AccountService);

  protected readonly loadingAccounts = signal(true);
  protected readonly accounts = signal<Account[]>([]);
  protected readonly accountTypeLabels = ACCOUNT_TYPE_LABELS;
  protected readonly pendingDelete = signal<Account | null>(null);
  protected readonly actingAccountId = signal<string | null>(null);

  protected readonly totalBalance = computed(() =>
    this.accounts().reduce((sum, account) => sum + account.balance, 0)
  );

  private readonly deleteDialog = viewChild<HlmDialog>('deleteDialog');
  private readonly accountDialog = viewChild(CreateAccountDialog);
  private readonly editAccountDialog = viewChild(EditAccountDialog);
  private readonly transactionDialog = viewChild(CreateTransactionDialog);

  ngOnInit(): void {
    this.loadAccounts();
  }

  protected openAccountDialog(): void {
    this.accountDialog()?.open();
  }

  protected openTransactionDialog(): void {
    this.transactionDialog()?.open();
  }

  protected openEditAccountDialog(account: Account): void {
    this.editAccountDialog()?.open(account);
  }

  protected onAccountCreated(account: Account): void {
    this.accounts.update((items) => [...items, account]);
  }

  protected onAccountUpdated(account: Account): void {
    this.accounts.update((items) =>
      items.map((item) => (item.id === account.id ? account : item))
    );
  }

  protected onTransactionCreated(): void {
    this.loadAccounts();
  }

  protected confirmDelete(account: Account): void {
    this.pendingDelete.set(account);
    this.deleteDialog()?.open();
  }

  protected deletePendingAccount(): void {
    const account = this.pendingDelete();
    if (!account || this.actingAccountId()) return;

    this.actingAccountId.set(account.id);
    this.accountService
      .delete(account.id)
      .pipe(
        finalize(() => {
          this.actingAccountId.set(null);
          this.deleteDialog()?.close();
        })
      )
      .subscribe({
        next: (response) => {
          this.financeStore.removeAccount(account.id);
          this.accounts.update((items) => items.filter((item) => item.id !== account.id));
          toast.success(response.message || 'Conta excluída com sucesso.');
        },
        error: (error: HttpErrorResponse) => {
          toast.error(this.resolveErrorMessage(error, 'excluir a conta'));
        },
      });
  }

  private loadAccounts(): void {
    this.loadingAccounts.set(true);
    this.financeStore
      .loadAccounts()
      .pipe(finalize(() => this.loadingAccounts.set(false)))
      .subscribe({
        next: (accounts) => this.accounts.set(accounts),
        error: (error: HttpErrorResponse) => {
          toast.error(this.resolveErrorMessage(error, 'carregar suas contas'));
        },
      });
  }

  private resolveErrorMessage(error: HttpErrorResponse, action: string): string {
    const backendMessage = error.error?.message;
    if (typeof backendMessage === 'string' && backendMessage.trim()) {
      return backendMessage;
    }
    return `Não foi possível ${action}.`;
  }
}
