import { Component, inject, signal, viewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { toast } from '@spartan-ng/brain/sonner';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialog, HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { Account } from '../../../../models/finance/account.model';
import { Category } from '../../../../models/finance/category.model';
import { Transaction } from '../../../../models/finance/transaction.model';
import { TransactionService } from '../../../../services/finance/transaction.service';
import { TransactionList } from '../transaction-list/transaction-list';

@Component({
  selector: 'app-account-transactions-dialog',
  imports: [HlmDialogImports, HlmButtonImports, HlmSpinnerImports, TransactionList],
  templateUrl: './account-transactions-dialog.html',
})
export class AccountTransactionsDialog {
  private readonly transactionService = inject(TransactionService);

  protected readonly account = signal<Account | null>(null);
  protected readonly transactions = signal<Transaction[]>([]);
  protected readonly categoryNames = signal<Record<string, string>>({});
  protected readonly loading = signal(false);
  protected readonly page = signal(0);
  protected readonly totalPages = signal(0);
  protected readonly totalElements = signal(0);

  private readonly dialog = viewChild<HlmDialog>('dialog');

  open(account: Account, categories: Category[]): void {
    this.account.set(account);
    this.categoryNames.set(Object.fromEntries(categories.map((c) => [c.id, c.name])));
    this.page.set(0);
    this.dialog()?.open();
    queueMicrotask(() => this.loadPage(0));
  }

  close(): void {
    this.dialog()?.close();
  }

  protected loadPage(page: number): void {
    const account = this.account();
    if (!account || this.loading()) return;

    this.loading.set(true);
    this.transactionService
      .list({ accountId: account.id, page, size: 20 })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (result) => {
          this.transactions.set(result.content);
          this.page.set(result.page);
          this.totalPages.set(result.totalPages);
          this.totalElements.set(result.totalElements);
        },
        error: (error: HttpErrorResponse) =>
          toast.error(this.resolveErrorMessage(error)),
      });
  }

  protected previousPage(): void {
    if (this.page() > 0) {
      this.loadPage(this.page() - 1);
    }
  }

  protected nextPage(): void {
    if (this.page() < this.totalPages() - 1) {
      this.loadPage(this.page() + 1);
    }
  }

  private resolveErrorMessage(error: HttpErrorResponse): string {
    const backendMessage = error.error?.message;
    if (typeof backendMessage === 'string' && backendMessage.trim()) {
      return backendMessage;
    }
    return 'Não foi possível carregar as transações.';
  }
}
