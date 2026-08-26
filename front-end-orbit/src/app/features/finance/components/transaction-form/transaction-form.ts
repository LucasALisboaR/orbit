import { Component, computed, inject, output, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { form, FormField, maxLength, minLength, required } from '@angular/forms/signals';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFolderPlus, lucideReceipt } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { toast } from '@spartan-ng/brain/sonner';
import { forkJoin, finalize, map, switchMap } from 'rxjs';
import { AuthService } from '../../../../../../core/auth/auth.service';
import { Account } from '../../../../models/finance/account.model';
import { Category, CategoryType } from '../../../../models/finance/category.model';
import {
  CreateTransactionFormData,
  TRANSACTION_TYPE_LABELS,
  TransactionType,
  transactionTypeMatchesCategory,
} from '../../../../models/finance/transaction.model';
import { FinanceStoreService } from '../../../../services/finance/finance-store.service';
import { TransactionService } from '../../../../services/finance/transaction.service';
import { CategoryService } from '../../../../services/finance/category.service';
import { formatCurrencyInput, parseCurrencyInput } from '../../../../utils/currency-input.util';

@Component({
  selector: 'app-transaction-form',
  providers: [provideIcons({ lucideReceipt, lucideFolderPlus })],
  imports: [FormField, NgIcon, HlmInputGroupImports, HlmButtonImports, HlmSpinnerImports],
  templateUrl: './transaction-form.html',
})
export class TransactionForm {
  protected readonly NEW_CATEGORY_VALUE = '__new__';

  private readonly transactionService = inject(TransactionService);
  private readonly categoryService = inject(CategoryService);
  private readonly financeStore = inject(FinanceStoreService);
  private readonly authService = inject(AuthService);

  readonly transactionCreated = output<void>();
  readonly cancelled = output<void>();

  protected readonly loading = signal(false);
  protected readonly loadingData = signal(false);
  protected readonly dataLoaded = signal(false);
  protected readonly amountDisplay = signal('');
  protected readonly showNewCategoryForm = signal(false);
  protected readonly newCategoryName = signal('');
  protected readonly creatingCategory = signal(false);
  protected readonly accounts = signal<Account[]>([]);
  protected readonly allCategories = signal<Category[]>([]);
  protected readonly transactionTypes = Object.values(TransactionType);
  protected readonly transactionTypeLabels = TRANSACTION_TYPE_LABELS;

  protected readonly formModel = signal<CreateTransactionFormData>({
    accountId: '',
    categoryId: '',
    description: '',
    amount: 0,
    type: TransactionType.EXPENSE,
    transactionDate: new Date().toISOString().slice(0, 10),
  });

  protected readonly transactionForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.accountId, { message: 'Conta é obrigatória' });
    required(schemaPath.categoryId, { message: 'Categoria é obrigatória' });
    required(schemaPath.description, { message: 'Descrição é obrigatória' });
    minLength(schemaPath.description, 2, { message: 'Descrição deve ter no mínimo 2 caracteres' });
    maxLength(schemaPath.description, 255, { message: 'Descrição deve ter no máximo 255 caracteres' });
    required(schemaPath.amount, { message: 'Valor é obrigatório' });
    required(schemaPath.type, { message: 'Tipo é obrigatório' });
    required(schemaPath.transactionDate, { message: 'Data é obrigatória' });
  });

  protected readonly categories = computed(() =>
    this.allCategories().filter((category) =>
      transactionTypeMatchesCategory(this.formModel().type, category.type)
    )
  );

  protected readonly canSubmit = computed(() => {
    const model = this.formModel();
    return (
      !this.loadingData() &&
      !this.showNewCategoryForm() &&
      this.accounts().length > 0 &&
      this.allCategories().length > 0 &&
      !!model.accountId &&
      !!model.categoryId &&
      model.description.trim().length >= 2 &&
      model.amount > 0 &&
      !!model.transactionDate
    );
  });

  loadData(): void {
    const cachedAccounts = this.financeStore.accounts();
    const cachedCategories = this.financeStore.categories();
    if (cachedAccounts.length) {
      this.accounts.set(cachedAccounts);
    }
    if (cachedCategories.length) {
      this.allCategories.set(cachedCategories);
    }

    this.loadingData.set(true);
    forkJoin({
      accounts: this.financeStore.loadAccounts(),
      categories: this.financeStore.loadCategories(),
    })
      .pipe(finalize(() => {
        this.loadingData.set(false);
        this.dataLoaded.set(true);
      }))
      .subscribe({
        next: ({ accounts, categories }) => {
          this.accounts.set(accounts);
          this.allCategories.set(categories);
        },
        error: (error: HttpErrorResponse) =>
          toast.error(this.resolveErrorMessage(error, 'carregar contas e categorias')),
      });
  }

  resetForm(): void {
    this.dataLoaded.set(false);
    this.amountDisplay.set('');
    this.showNewCategoryForm.set(false);
    this.newCategoryName.set('');
    this.formModel.set({
      accountId: '',
      categoryId: '',
      description: '',
      amount: 0,
      type: TransactionType.EXPENSE,
      transactionDate: new Date().toISOString().slice(0, 10),
    });
  }

  onTypeChange(type: TransactionType): void {
    this.showNewCategoryForm.set(false);
    this.newCategoryName.set('');
    this.formModel.update((current) => ({
      ...current,
      type,
      categoryId: '',
    }));
  }

  protected categorySelectValue(): string {
    if (this.showNewCategoryForm()) {
      return this.NEW_CATEGORY_VALUE;
    }
    return this.formModel().categoryId;
  }

  protected categoryLabel(category: Category): string {
    return category.isSystem ? category.name : `${category.name} · minha`;
  }

  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    if (value === this.NEW_CATEGORY_VALUE) {
      this.showNewCategoryForm.set(true);
      this.newCategoryName.set('');
      this.formModel.update((current) => ({ ...current, categoryId: '' }));
      return;
    }

    this.showNewCategoryForm.set(false);
    this.newCategoryName.set('');
    this.formModel.update((current) => ({ ...current, categoryId: value }));
  }

  onNewCategoryNameInput(event: Event): void {
    this.newCategoryName.set((event.target as HTMLInputElement).value);
  }

  cancelNewCategory(): void {
    this.showNewCategoryForm.set(false);
    this.newCategoryName.set('');
    this.formModel.update((current) => ({ ...current, categoryId: '' }));
  }

  createQuickCategory(): void {
    const name = this.newCategoryName().trim();
    if (name.length < 2) {
      toast.error('Informe um nome com pelo menos 2 caracteres.');
      return;
    }

    if (this.creatingCategory()) return;

    const categoryType = this.formModel().type as unknown as CategoryType;

    this.creatingCategory.set(true);
    this.categoryService
      .create({ name, type: categoryType })
      .pipe(
        switchMap((created) =>
          this.financeStore.loadCategories().pipe(map((categories) => ({ created, categories })))
        ),
        finalize(() => this.creatingCategory.set(false))
      )
      .subscribe({
        next: ({ created, categories }) => {
          this.allCategories.set(categories);
          this.showNewCategoryForm.set(false);
          this.newCategoryName.set('');
          this.formModel.update((current) => ({ ...current, categoryId: created.id }));
          toast.success('Categoria criada!');
        },
        error: (error: HttpErrorResponse) =>
          toast.error(this.resolveErrorMessage(error, 'criar a categoria')),
      });
  }

  onAmountInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const amount = parseCurrencyInput(input.value);
    const formatted = formatCurrencyInput(amount);

    this.formModel.update((current) => ({ ...current, amount }));
    this.amountDisplay.set(formatted);
    input.value = formatted;
  }

  onSubmit(): void {
    if (!this.canSubmit() || this.loading()) return;

    if (!this.authService.user()) {
      toast.error('Sessão expirada. Faça login novamente.');
      return;
    }

    const payload = this.formModel();
    if (payload.amount <= 0) {
      toast.error('O valor deve ser maior que zero.');
      return;
    }

    if (!payload.accountId || !payload.categoryId) {
      toast.error('Selecione conta e categoria.');
      return;
    }

    this.loading.set(true);

    this.transactionService
      .create({
        accountId: payload.accountId,
        categoryId: payload.categoryId,
        description: payload.description.trim(),
        amount: payload.amount,
        type: payload.type,
        transactionDate: payload.transactionDate,
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          toast.success('Transação registrada com sucesso!');
          this.transactionCreated.emit();
          this.resetForm();
        },
        error: (error: HttpErrorResponse) =>
          toast.error(this.resolveErrorMessage(error, 'registrar a transação')),
      });
  }

  private resolveErrorMessage(error: HttpErrorResponse, action: string): string {
    const backendMessage = error.error?.message;
    if (typeof backendMessage === 'string' && backendMessage.trim()) {
      return backendMessage;
    }
    return `Não foi possível ${action}.`;
  }
}
