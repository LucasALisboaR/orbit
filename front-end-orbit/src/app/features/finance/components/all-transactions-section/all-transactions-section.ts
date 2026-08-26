import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { toast } from '@spartan-ng/brain/sonner';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import {
  HlmCard,
  HlmCardContent,
  HlmCardDescription,
  HlmCardHeader,
  HlmCardTitle,
} from '@spartan-ng/helm/card';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { Account } from '../../../../models/finance/account.model';
import { Category } from '../../../../models/finance/category.model';
import {
  TRANSACTION_TYPE_LABELS,
  Transaction,
  TransactionType,
} from '../../../../models/finance/transaction.model';
import { TransactionService } from '../../../../services/finance/transaction.service';
import { TransactionList } from '../transaction-list/transaction-list';

@Component({
  selector: 'app-all-transactions-section',
  imports: [
    HlmButtonImports,
    HlmCard,
    HlmCardHeader,
    HlmCardTitle,
    HlmCardDescription,
    HlmCardContent,
    HlmSpinnerImports,
    TransactionList,
  ],
  templateUrl: './all-transactions-section.html',
})
export class AllTransactionsSection implements OnInit {
  private readonly transactionService = inject(TransactionService);

  readonly accounts = input<Account[]>([]);
  readonly categories = input<Category[]>([]);

  protected readonly loading = signal(false);
  protected readonly transactions = signal<Transaction[]>([]);
  protected readonly page = signal(0);
  protected readonly totalPages = signal(0);
  protected readonly totalElements = signal(0);

  protected readonly filterAccountId = signal('');
  protected readonly filterType = signal<TransactionType | ''>('');
  protected readonly filterFrom = signal('');
  protected readonly filterTo = signal('');

  protected readonly transactionTypes = Object.values(TransactionType);
  protected readonly transactionTypeLabels = TRANSACTION_TYPE_LABELS;

  protected readonly categoryNames = computed(() =>
    Object.fromEntries(this.categories().map((c) => [c.id, c.name]))
  );

  ngOnInit(): void {
    this.loadPage(0);
  }

  protected applyFilters(): void {
    this.loadPage(0);
  }

  protected clearFilters(): void {
    this.filterAccountId.set('');
    this.filterType.set('');
    this.filterFrom.set('');
    this.filterTo.set('');
    this.loadPage(0);
  }

  protected loadPage(page: number): void {
    if (this.loading()) return;

    this.loading.set(true);
    this.transactionService
      .list({
        accountId: this.filterAccountId() || undefined,
        type: this.filterType() || undefined,
        from: this.filterFrom() || undefined,
        to: this.filterTo() || undefined,
        page,
        size: 20,
      })
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

  protected onFilterAccountChange(event: Event): void {
    this.filterAccountId.set((event.target as HTMLSelectElement).value);
  }

  protected onFilterTypeChange(event: Event): void {
    this.filterType.set((event.target as HTMLSelectElement).value as TransactionType | '');
  }

  protected onFilterFromChange(event: Event): void {
    this.filterFrom.set((event.target as HTMLInputElement).value);
  }

  protected onFilterToChange(event: Event): void {
    this.filterTo.set((event.target as HTMLInputElement).value);
  }

  reload(): void {
    this.loadPage(this.page());
  }

  private resolveErrorMessage(error: HttpErrorResponse): string {
    const backendMessage = error.error?.message;
    if (typeof backendMessage === 'string' && backendMessage.trim()) {
      return backendMessage;
    }
    return 'Não foi possível carregar as transações.';
  }
}
