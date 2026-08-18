import { Component, signal } from '@angular/core';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMail,
  lucideLock,
  lucideUser,
  lucideArrowLeft,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { CommonModule } from '@angular/common';
import { email, form, FormField, maxLength, minLength, required } from '@angular/forms/signals';
import { RouterModule } from '@angular/router';

interface NewUserData {
  nome: string;
  sobrenome: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-new-user',
  providers: [provideIcons({ lucideMail, lucideLock, lucideUser, lucideArrowLeft })],
  imports: [CommonModule, FormField, NgIcon, HlmInputGroupImports, HlmButtonImports, RouterModule],
  templateUrl: './new-user.html'
})
export class NewUser {
  protected readonly newUserText = signal('Crie sua conta');
  protected readonly nomePlaceholder = signal('Digite seu nome');
  protected readonly sobrenomePlaceholder = signal('Digite seu sobrenome');
  protected readonly emailPlaceholder = signal('Digite seu email');
  protected readonly passwordPlaceholder = signal('Digite sua senha');
  protected readonly submitText = signal('Criar conta');
  protected readonly goBackText = signal('Voltar para o login');

  newUserModel = signal<NewUserData>({
    nome: '',
    sobrenome: '',
    email: '',
    password: '',
  });

  newUserForm = form(this.newUserModel, (shemaPath) => {
    required(shemaPath.nome, { message: 'Nome é obrigatório' });
    minLength(shemaPath.nome, 3, { message: 'Nome deve ter no mínimo 3 caracteres' });
    maxLength(shemaPath.nome, 50, { message: 'Nome deve ter no máximo 50 caracteres' });
    
    required(shemaPath.sobrenome, { message: 'Sobrenome é obrigatório' });
    minLength(shemaPath.sobrenome, 3, { message: 'Sobrenome deve ter no mínimo 3 caracteres' });

    email(shemaPath.email, { message: 'Email inválido' })
    required(shemaPath.email, { message: 'Email obrigatorio!'})

    required(shemaPath.password, { message: 'Senha é obrigatória' });
    minLength(shemaPath.password, 8, { message: 'Senha deve ter no mínimo 8 caracteres' });
  });

  onSubmitNewUser(): void {
    console.log(this.newUserModel())
  }


}
