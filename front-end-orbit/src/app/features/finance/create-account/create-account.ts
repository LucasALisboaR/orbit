import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';
import { Account } from '../../../models/finance/account.model';
import { AccountForm } from '../components/account-form/account-form';

@Component({
  selector: 'app-create-account',
  providers: [provideIcons({ lucideArrowLeft })],
  imports: [RouterLink, NgIcon, AccountForm],
  template: `
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl tracking-tight">Nova conta</h1>
        <p class="text-muted-foreground text-sm">Cadastre uma conta financeira vinculada ao seu usuário.</p>
      </div>
      <app-account-form
        class="max-w-xl"
        (accountCreated)="onCreated($event)"
        (cancelled)="navigateBack()"
      />
      <a routerLink="/finance" class="text-primary inline-flex items-center gap-1 text-sm font-medium hover:opacity-80">
        <ng-icon name="lucideArrowLeft" />
        Voltar para finanças
      </a>
    </div>
  `,
})
export class CreateAccount {
  private readonly router = inject(Router);

  protected onCreated(_account: Account): void {
    void this.router.navigate(['/finance']);
  }

  protected navigateBack(): void {
    void this.router.navigate(['/finance']);
  }
}
