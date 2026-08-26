import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal, viewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideList,
  lucidePencil,
  lucidePlus,
  lucideReceipt,
  lucideTable,
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
import { forkJoin, finalize } from 'rxjs';
import { Account, ACCOUNT_TYPE_LABELS } from '../../../models/finance/account.model';
import { Category } from '../../../models/finance/category.model';
import { Transaction } from '../../../models/finance/transaction.model';
import { AccountService } from '../../../services/finance/account.service';
import { FinanceStoreService } from '../../../services/finance/finance-store.service';
import { TransactionService } from '../../../services/finance/transaction.service';
import { AccountTransactionsDialog } from '../components/account-transactions-dialog/account-transactions-dialog';
import { AllTransactionsSection } from '../components/all-transactions-section/all-transactions-section';
import { CreateAccountDialog } from '../components/create-account-dialog/create-account-dialog';
import { CreateTransactionDialog } from '../components/create-transaction-dialog/create-transaction-dialog';
import { EditAccountDialog } from '../components/edit-account-dialog/edit-account-dialog';
import { TransactionList } from '../components/transaction-list/transaction-list';

type FinanceView = 'accounts' | 'statement';

@Component({
  selector: 'app-finance',
  providers: [
    provideIcons({
      lucideWallet,
      lucideReceipt,
      lucidePlus,
      lucidePencil,
      lucideTrash2,
      lucideList,
      lucideTable,
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
    AccountTransactionsDialog,
    AllTransactionsSection,
    TransactionList,
  ],
  templateUrl: './finance.html',
})
export class Finance implements OnInit {
  private readonly financeStore = inject(FinanceStoreService);
  private readonly accountService = inject(AccountService);
  private readonly transactionService = inject(TransactionService);

  protected readonly loadingAccounts = signal(true);
  protected readonly loadingRecent = signal(false);
  protected readonly accounts = signal<Account[]>([]);
  protected readonly categories = signal<Category[]>([]);
  protected readonly recentByAccount = signal<Record<string, Transaction[]>>({});
  protected readonly accountTypeLabels = ACCOUNT_TYPE_LABELS;
  protected readonly pendingDelete = signal<Account | null>(null);
  protected readonly actingAccountId = signal<string | null>(null);
  protected readonly activeView = signal<FinanceView>('accounts');

  protected readonly totalBalance = computed(() =>
    this.accounts().reduce((sum, account) => sum + account.balance, 0)
  );

  protected readonly categoryNames = computed(() =>
    Object.fromEntries(this.categories().map((c) => [c.id, c.name]))
  );

  private readonly deleteDialog = viewChild<HlmDialog>('deleteDialog');
  private readonly accountDialog = viewChild(CreateAccountDialog);
  private readonly editAccountDialog = viewChild(EditAccountDialog);
  private readonly transactionDialog = viewChild(CreateTransactionDialog);
  private readonly accountTransactionsDialog = viewChild(AccountTransactionsDialog);
  private readonly allTransactionsSection = viewChild(AllTransactionsSection);

  ngOnInit(): void {
    this.loadCategories();
    this.loadAccounts();
  }

  protected recentTransactions(accountId: string): Transaction[] {
    return this.recentByAccount()[accountId] ?? [];
  }

  protected setView(view: FinanceView): void {
    this.activeView.set(view);
  }

  protected openAccountDialog(): void {
    this.accountDialog()?.open();
  }

  protected openTransactionDialog(account?: Account): void {
    this.transactionDialog()?.open(
      account ? { accountId: account.id, accountName: account.name } : undefined
    );
  }

  protected openEditAccountDialog(account: Account): void {
    this.editAccountDialog()?.open(account);
  }

  protected openAccountTransactions(account: Account): void {
    this.accountTransactionsDialog()?.open(account, this.categories());
  }

  protected onAccountCreated(account: Account): void {
    this.accounts.update((items) => [...items, account]);
    this.loadRecentTransactions([...this.accounts()]);
  }

  protected onAccountUpdated(account: Account): void {
    this.accounts.update((items) =>
      items.map((item) => (item.id === account.id ? account : item))
    );
  }

  protected onTransactionCreated(): void {
    this.loadAccounts();
    this.allTransactionsSection()?.reload();
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
          this.recentByAccount.update((map) => {
            const next = { ...map };
            delete next[account.id];
            return next;
          });
          toast.success(response.message || 'Conta excluída com sucesso.');
        },
        error: (error: HttpErrorResponse) => {
          toast.error(this.resolveErrorMessage(error, 'excluir a conta'));
        },
      });
  }

  private loadCategories(): void {
    this.financeStore.loadCategories().subscribe({
      next: (categories) => this.categories.set(categories),
      error: (error: HttpErrorResponse) => {
        toast.error(this.resolveErrorMessage(error, 'carregar categorias'));
      },
    });
  }

  private loadAccounts(): void {
    this.loadingAccounts.set(true);
    this.financeStore
      .loadAccounts()
      .pipe(finalize(() => this.loadingAccounts.set(false)))
      .subscribe({
        next: (accounts) => {
          this.accounts.set(accounts);
          this.loadRecentTransactions(accounts);
        },
        error: (error: HttpErrorResponse) => {
          toast.error(this.resolveErrorMessage(error, 'carregar suas contas'));
        },
      });
  }

  private loadRecentTransactions(accounts: Account[]): void {
    if (!accounts.length) {
      this.recentByAccount.set({});
      return;
    }

    this.loadingRecent.set(true);
    forkJoin(
      accounts.map((account) =>
        this.transactionService.list({ accountId: account.id, page: 0, size: 5 })
      )
    )
      .pipe(finalize(() => this.loadingRecent.set(false)))
      .subscribe({
        next: (results) => {
          const map: Record<string, Transaction[]> = {};
          accounts.forEach((account, index) => {
            map[account.id] = results[index].content;
          });
          this.recentByAccount.set(map);
        },
        error: (error: HttpErrorResponse) => {
          toast.error(this.resolveErrorMessage(error, 'carregar transações recentes'));
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
