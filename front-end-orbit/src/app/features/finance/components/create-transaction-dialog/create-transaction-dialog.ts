import { Component, output, viewChild } from '@angular/core';
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
            Registre uma receita ou despesa rapidamente.
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

  private readonly dialog = viewChild<HlmDialog>('dialog');
  private readonly form = viewChild<TransactionForm>('form');

  open(): void {
    this.dialog()?.open();
    // Form fica no portal do dialog — só existe após abrir
    queueMicrotask(() => {
      this.form()?.resetForm();
      this.form()?.loadData();
    });
  }

  close(): void {
    this.dialog()?.close();
  }

  protected onCreated(): void {
    this.transactionCreated.emit();
    this.close();
  }
}
