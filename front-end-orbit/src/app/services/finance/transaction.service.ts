import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services/http.service';
import { CreateTransactionRequest, Transaction } from '../../models/finance/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly http = inject(HttpService);

  create(request: CreateTransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>('/transactions', request);
  }
}
