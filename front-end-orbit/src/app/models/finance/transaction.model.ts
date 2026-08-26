import { CategoryType } from './category.model';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  [TransactionType.INCOME]: 'Receita',
  [TransactionType.EXPENSE]: 'Despesa',
};

export interface CreateTransactionRequest {
  accountId: string;
  categoryId: string;
  description: string;
  amount: number;
  type: TransactionType;
  transactionDate: string;
}

export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  categoryId: string;
  description: string;
  amount: number;
  type: TransactionType;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListTransactionsFilter {
  accountId?: string;
  type?: TransactionType;
  from?: string;
  to?: string;
  page?: number;
  size?: number;
}

export interface TransactionsPage {
  content: Transaction[];
  totalElements: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface CreateTransactionFormData {
  accountId: string;
  categoryId: string;
  description: string;
  amount: number;
  type: TransactionType;
  transactionDate: string;
}

export function transactionTypeMatchesCategory(
  transactionType: TransactionType,
  categoryType: CategoryType
): boolean {
  return transactionType.valueOf() === categoryType.valueOf();
}
