import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services/http.service';
import {
  CreateTransactionRequest,
  ListTransactionsFilter,
  Transaction,
  TransactionsPage,
} from '../../models/finance/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly http = inject(HttpService);

  create(request: CreateTransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>('/transactions', request);
  }

  list(filter: ListTransactionsFilter = {}): Observable<TransactionsPage> {
    return this.http.get<TransactionsPage>('/transactions', {
      accountId: filter.accountId,
      type: filter.type,
      from: filter.from,
      to: filter.to,
      page: filter.page ?? 0,
      size: filter.size ?? 20,
    });
  }
}
