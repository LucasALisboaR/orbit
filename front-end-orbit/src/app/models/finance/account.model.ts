export enum AccountType {
  CORRENTE = 'CORRENTE',
  POUPANCA = 'POUPANCA',
  INVESTIMENTO = 'INVESTIMENTO',
  CARTEIRA = 'CARTEIRA',
}

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  [AccountType.CORRENTE]: 'Conta corrente',
  [AccountType.POUPANCA]: 'Poupança',
  [AccountType.INVESTIMENTO]: 'Investimento',
  [AccountType.CARTEIRA]: 'Carteira',
};

export interface CreateAccountRequest {
  name: string;
  type: AccountType;
  balance: number;
}

export interface EditAccountRequest {
  name: string;
  type: AccountType;
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountFormData {
  name: string;
  type: AccountType;
  balance: number;
}
