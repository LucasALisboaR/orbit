import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { form, FormField, maxLength, minLength, required } from '@angular/forms/signals';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideFolderPlus } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { toast } from '@spartan-ng/brain/sonner';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../../core/auth/auth.service';
import {
  CATEGORY_TYPE_LABELS,
  CategoryType,
  CreateCategoryFormData,
} from '../../../models/finance/category.model';
import { CategoryService } from '../../../services/finance/category.service';
import { FinanceStoreService } from '../../../services/finance/finance-store.service';

@Component({
  selector: 'app-create-category',
  providers: [provideIcons({ lucideFolderPlus, lucideArrowLeft })],
  imports: [RouterLink, FormField, NgIcon, HlmInputGroupImports, HlmButtonImports, HlmSpinnerImports],
  templateUrl: './create-category.html',
})
export class CreateCategory {
  private readonly categoryService = inject(CategoryService);
  private readonly financeStore = inject(FinanceStoreService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly categoryTypes = Object.values(CategoryType);
  protected readonly categoryTypeLabels = CATEGORY_TYPE_LABELS;

  protected readonly formModel = signal<CreateCategoryFormData>({
    name: '',
    type: CategoryType.EXPENSE,
  });

  protected readonly categoryForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Nome é obrigatório' });
    minLength(schemaPath.name, 2, { message: 'Nome deve ter no mínimo 2 caracteres' });
    maxLength(schemaPath.name, 100, { message: 'Nome deve ter no máximo 100 caracteres' });
    required(schemaPath.type, { message: 'Tipo é obrigatório' });
  });

  onSubmit(): void {
    if (!this.categoryForm().valid() || this.loading()) return;

    const user = this.authService.user();
    if (!user) {
      toast.error('Sessão expirada. Faça login novamente.');
      void this.router.navigate(['/login']);
      return;
    }

    this.loading.set(true);
    const payload = this.formModel();

    this.categoryService
      .create({
        name: payload.name.trim(),
        type: payload.type,
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (category) => {
          this.financeStore.addCategory(category);
          toast.success('Categoria criada com sucesso!');
          void this.router.navigate(['/finance']);
        },
        error: (error: HttpErrorResponse) => toast.error(this.resolveErrorMessage(error)),
      });
  }

  private resolveErrorMessage(error: HttpErrorResponse): string {
    const backendMessage = error.error?.message;
    if (typeof backendMessage === 'string' && backendMessage.trim()) {
      return backendMessage;
    }
    return 'Não foi possível criar a categoria. Tente novamente.';
  }
}
