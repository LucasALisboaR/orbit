import { afterNextRender, Component, inject, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';
import { TransactionForm } from '../components/transaction-form/transaction-form';

@Component({
  selector: 'app-create-transaction',
  providers: [provideIcons({ lucideArrowLeft })],
  imports: [RouterLink, NgIcon, TransactionForm],
  template: `
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl tracking-tight">Nova transação</h1>
        <p class="text-muted-foreground text-sm">
          Registre um lançamento usando suas contas e categorias.
        </p>
      </div>
      <app-transaction-form
        #form
        class="max-w-xl"
        (transactionCreated)="onCreated()"
        (cancelled)="navigateBack()"
      />
      <a routerLink="/finance" class="text-primary inline-flex items-center gap-1 text-sm font-medium hover:opacity-80">
        <ng-icon name="lucideArrowLeft" />
        Voltar para finanças
      </a>
    </div>
  `,
})
export class CreateTransaction {
  private readonly router = inject(Router);
  private readonly form = viewChild<TransactionForm>('form');

  constructor() {
    afterNextRender(() => this.form()?.loadData());
  }

  protected onCreated(): void {
    void this.router.navigate(['/finance']);
  }

  protected navigateBack(): void {
    void this.router.navigate(['/finance']);
  }
}
