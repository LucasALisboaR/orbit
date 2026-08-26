export enum CategoryType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export const CATEGORY_TYPE_LABELS: Record<CategoryType, string> = {
  [CategoryType.INCOME]: 'Receita',
  [CategoryType.EXPENSE]: 'Despesa',
};

export interface CreateCategoryRequest {
  name: string;
  type: CategoryType;
}

export interface Category {
  id: string;
  userId: string | null;
  name: string;
  type: CategoryType;
  isSystem: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryFormData {
  name: string;
  type: CategoryType;
}
