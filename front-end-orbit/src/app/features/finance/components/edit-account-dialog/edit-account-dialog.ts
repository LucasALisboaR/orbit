import { Component, output, viewChild } from '@angular/core';
import { Account } from '../../../../models/finance/account.model';
import { HlmDialog, HlmDialogImports } from '@spartan-ng/helm/dialog';
import { EditAccountForm } from '../edit-account-form/edit-account-form';

@Component({
  selector: 'app-edit-account-dialog',
  imports: [HlmDialogImports, EditAccountForm],
  template: `
    <hlm-dialog #dialog>
      <hlm-dialog-content *hlmDialogPortal class="sm:max-w-md">
        <hlm-dialog-header>
          <h3 hlmDialogTitle>Editar conta</h3>
          <p hlmDialogDescription>Altere o nome ou o tipo da conta.</p>
        </hlm-dialog-header>
        <app-edit-account-form
          #form
          (accountUpdated)="onUpdated($event)"
          (cancelled)="close()"
        />
      </hlm-dialog-content>
    </hlm-dialog>
  `,
})
export class EditAccountDialog {
  readonly accountUpdated = output<Account>();

  private readonly dialog = viewChild<HlmDialog>('dialog');
  private readonly form = viewChild<EditAccountForm>('form');

  open(account: Account): void {
    this.dialog()?.open();
    queueMicrotask(() => this.form()?.loadAccount(account));
  }

  close(): void {
    this.dialog()?.close();
    this.form()?.resetForm();
  }

  protected onUpdated(account: Account): void {
    this.accountUpdated.emit(account);
    this.close();
  }
}
