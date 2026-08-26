import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services/http.service';
import { Account, CreateAccountRequest, EditAccountRequest } from '../../models/finance/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly http = inject(HttpService);

  create(request: CreateAccountRequest): Observable<Account> {
    return this.http.post<Account>('/accounts', request);
  }

  list(): Observable<Account[]> {
    return this.http.get<Account[]>('/accounts');
  }

  update(id: string, request: EditAccountRequest): Observable<Account> {
    return this.http.put<Account>(`/accounts/${id}`, request);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`/accounts/${id}`);
  }
}
