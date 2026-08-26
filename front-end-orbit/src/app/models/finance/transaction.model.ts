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
