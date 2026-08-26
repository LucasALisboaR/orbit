import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import {
  TRANSACTION_TYPE_LABELS,
  Transaction,
  TransactionType,
} from '../../../../models/finance/transaction.model';

@Component({
  selector: 'app-transaction-list',
  imports: [CurrencyPipe, DatePipe, HlmBadge],
  templateUrl: './transaction-list.html',
})
export class TransactionList {
  readonly transactions = input.required<Transaction[]>();
  readonly categoryNames = input<Record<string, string>>({});
  readonly compact = input(false);

  protected readonly transactionTypeLabels = TRANSACTION_TYPE_LABELS;
  protected readonly TransactionType = TransactionType;

  protected categoryName(categoryId: string): string {
    return this.categoryNames()[categoryId] ?? '—';
  }
}
