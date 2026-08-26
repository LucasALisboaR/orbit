import { Component, output, signal, viewChild } from '@angular/core';
import { HlmDialog, HlmDialogImports } from '@spartan-ng/helm/dialog';
import { TransactionForm } from '../transaction-form/transaction-form';

@Component({
  selector: 'app-create-transaction-dialog',
  imports: [HlmDialogImports, TransactionForm],
  template: `
    <hlm-dialog #dialog>
      <hlm-dialog-content *hlmDialogPortal class="sm:max-w-lg">
        <hlm-dialog-header>
          <h3 hlmDialogTitle>Nova transação</h3>
          <p hlmDialogDescription>
            @if (accountName()) {
            Registre um lançamento em <strong>{{ accountName() }}</strong>.
            } @else {
            Registre uma receita ou despesa rapidamente.
            }
          </p>
        </hlm-dialog-header>
        <app-transaction-form
          #form
          (transactionCreated)="onCreated()"
          (cancelled)="close()"
        />
      </hlm-dialog-content>
    </hlm-dialog>
  `,
})
export class CreateTransactionDialog {
  readonly transactionCreated = output<void>();

  protected readonly accountName = signal<string | null>(null);

  private readonly dialog = viewChild<HlmDialog>('dialog');
  private readonly form = viewChild<TransactionForm>('form');

  open(options?: { accountId?: string; accountName?: string }): void {
    this.accountName.set(options?.accountName ?? null);
    this.dialog()?.open();
    queueMicrotask(() => {
      this.form()?.resetForm(options?.accountId);
      this.form()?.loadData();
    });
  }

  close(): void {
    this.accountName.set(null);
    this.dialog()?.close();
  }

  protected onCreated(): void {
    this.transactionCreated.emit();
    this.close();
  }
}
