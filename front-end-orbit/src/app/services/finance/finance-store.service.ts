import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Account } from '../../models/finance/account.model';
import { Category, CategoryType } from '../../models/finance/category.model';
import { AccountService } from './account.service';
import { CategoryService } from './category.service';

const ACCOUNTS_KEY = 'orbit.finance.accounts';
const CATEGORIES_KEY = 'orbit.finance.categories';

@Injectable({ providedIn: 'root' })
export class FinanceStoreService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly accountService = inject(AccountService);
  private readonly categoryService = inject(CategoryService);

  private readonly accountsSignal = signal<Account[]>(this.readList<Account>(ACCOUNTS_KEY));
  private readonly categoriesSignal = signal<Category[]>(this.readList<Category>(CATEGORIES_KEY));

  readonly accounts = this.accountsSignal.asReadonly();
  readonly categories = this.categoriesSignal.asReadonly();

  categoriesByType(type?: CategoryType): Category[] {
    return this.categoriesSignal().filter((category) => {
      if (!category.isActive) return false;
      if (type && category.type !== type) return false;
      return true;
    });
  }

  addAccount(account: Account): void {
    this.accountsSignal.update((items) => [...items, account]);
    this.persist(ACCOUNTS_KEY, this.accountsSignal());
  }

  updateAccount(account: Account): void {
    this.accountsSignal.update((items) =>
      items.map((item) => (item.id === account.id ? account : item))
    );
    this.persist(ACCOUNTS_KEY, this.accountsSignal());
  }

  removeAccount(accountId: string): void {
    this.accountsSignal.update((items) => items.filter((item) => item.id !== accountId));
    this.persist(ACCOUNTS_KEY, this.accountsSignal());
  }

  setAccounts(accounts: Account[]): void {
    this.accountsSignal.set(accounts);
    this.persist(ACCOUNTS_KEY, accounts);
  }

  loadAccounts(): Observable<Account[]> {
    return this.accountService.list().pipe(tap((accounts) => this.setAccounts(accounts)));
  }

  addCategory(category: Category): void {
    this.categoriesSignal.update((items) => [...items, category]);
    this.persist(CATEGORIES_KEY, this.categoriesSignal());
  }

  setCategories(categories: Category[]): void {
    this.categoriesSignal.set(categories);
    this.persist(CATEGORIES_KEY, categories);
  }

  loadCategories(): Observable<Category[]> {
    return this.categoryService
      .listAvailableToUser()
      .pipe(tap((categories) => this.setCategories(categories)));
  }

  private readList<T>(key: string): T[] {
    if (!isPlatformBrowser(this.platformId)) return [];
    const raw = sessionStorage.getItem(key);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as T[];
    } catch {
      return [];
    }
  }

  private persist(key: string, value: unknown): void {
    if (!isPlatformBrowser(this.platformId)) return;
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
