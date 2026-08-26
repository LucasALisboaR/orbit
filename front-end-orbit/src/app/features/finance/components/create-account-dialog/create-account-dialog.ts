import { Component, output, viewChild } from '@angular/core';
import { Account } from '../../../../models/finance/account.model';
import { HlmDialog, HlmDialogImports } from '@spartan-ng/helm/dialog';
import { AccountForm } from '../account-form/account-form';

@Component({
  selector: 'app-create-account-dialog',
  imports: [HlmDialogImports, AccountForm],
  template: `
    <hlm-dialog #dialog>
      <hlm-dialog-content *hlmDialogPortal class="sm:max-w-md">
        <hlm-dialog-header>
          <h3 hlmDialogTitle>Nova conta</h3>
          <p hlmDialogDescription>
            Cadastre uma conta bancária, carteira ou investimento.
          </p>
        </hlm-dialog-header>
        <app-account-form
          #form
          (accountCreated)="onCreated($event)"
          (cancelled)="close()"
        />
      </hlm-dialog-content>
    </hlm-dialog>
  `,
})
export class CreateAccountDialog {
  readonly accountCreated = output<Account>();

  private readonly dialog = viewChild<HlmDialog>('dialog');
  private readonly form = viewChild<AccountForm>('form');

  open(): void {
    this.form()?.resetForm();
    this.dialog()?.open();
  }

  close(): void {
    this.dialog()?.close();
  }

  protected onCreated(account: Account): void {
    this.accountCreated.emit(account);
    this.close();
  }
}
