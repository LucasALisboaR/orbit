import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  applyWhenValue,
  email,
  form,
  FormField,
  maxLength,
  minLength,
  required,
} from '@angular/forms/signals';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideLock,
  lucideMail,
  lucideShieldPlus,
  lucideTrash2,
  lucideUser,
  lucideEye,
  lucideEyeOff,
} from '@ng-icons/lucide';
import { toast } from '@spartan-ng/brain/sonner';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialog, HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { HlmSwitchImports } from '@spartan-ng/helm/switch';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../../core/auth/auth.service';
import { ThemeService } from '../../../theme.service';
import {
  fromApiTheme,
  isAdminRole,
  toApiTheme,
  UpdateUserData,
  User,
  UserTheme,
} from '../../../models/user/user.model';
import { UserService } from '../../../services/user/login.service';

interface EditUserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  theme: UserTheme;
}

@Component({
  selector: 'app-edit-user',
  providers: [
    provideIcons({
      lucideUser,
      lucideMail,
      lucideLock,
      lucideTrash2,
      lucideShieldPlus,
      lucideEye,
      lucideEyeOff,
    }),
  ],
  imports: [
    CommonModule,
    FormField,
    NgIcon,
    HlmInputGroupImports,
    HlmButtonImports,
    HlmSpinnerImports,
    HlmTableImports,
    HlmBadgeImports,
    HlmDialogImports,
    HlmSwitchImports,
  ],
  templateUrl: './edit-user.html',
})
export class EditUser implements OnInit {
  private readonly userService = inject(UserService);
  private readonly auth = inject(AuthService);
  private readonly themeService = inject(ThemeService);

  protected readonly loadingProfile = signal(true);
  protected readonly saving = signal(false);
  protected readonly loadingUsers = signal(false);
  protected readonly actingUserId = signal<string | null>(null);
  protected readonly users = signal<User[]>([]);
  protected readonly usersLoadFailed = signal(false);
  protected readonly pendingDelete = signal<User | null>(null);
  protected readonly pendingPromote = signal<User | null>(null);
  private readonly deleteDialog = viewChild<HlmDialog>('deleteDialog');
  private readonly selfDeleteDialog = viewChild<HlmDialog>('selfDeleteDialog');
  private readonly promoteDialog = viewChild<HlmDialog>('promoteDialog');

  protected readonly sessionUser = this.auth.user;
  protected readonly isAdmin = computed(() => isAdminRole(this.sessionUser()?.role));

  protected readonly firstNamePlaceholder = signal('Digite seu nome');
  protected readonly lastNamePlaceholder = signal('Digite seu sobrenome');
  protected readonly emailPlaceholder = signal('Digite seu email');
  protected readonly passwordPlaceholder = signal('Deixe em branco para manter a senha atual');
  protected readonly showPassword = signal(false);

  editModel = signal<EditUserForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    theme: UserTheme.LIGHT,
  });

  protected readonly isDarkTheme = computed(() => this.editModel().theme === UserTheme.DARK);

  editForm = form(this.editModel, (schemaPath) => {
    required(schemaPath.firstName, { message: 'Nome é obrigatório' });
    minLength(schemaPath.firstName, 3, { message: 'Nome deve ter no mínimo 3 caracteres' });
    maxLength(schemaPath.firstName, 50, { message: 'Nome deve ter no máximo 50 caracteres' });

    required(schemaPath.lastName, { message: 'Sobrenome é obrigatório' });
    minLength(schemaPath.lastName, 3, { message: 'Sobrenome deve ter no mínimo 3 caracteres' });

    email(schemaPath.email, { message: 'Email inválido' });
    required(schemaPath.email, { message: 'Email obrigatorio!' });

    applyWhenValue(schemaPath.password, (value) => value.length > 0, (passwordPath) => {
      minLength(passwordPath, 8, { message: 'Senha deve ter no mínimo 8 caracteres' });
    });
  });

  ngOnInit(): void {
    const current = this.sessionUser();
    if (!current?.id) {
      this.loadingProfile.set(false);
      toast.error('Não foi possível identificar o usuário autenticado.');
      return;
    }

    this.userService
      .getUserById(current.id)
      .pipe(finalize(() => this.loadingProfile.set(false)))
      .subscribe({
        next: (user) => {
          this.auth.setSessionUser(user);
          this.editModel.set({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: '',
            theme: fromApiTheme(user.theme),
          });
          if (isAdminRole(user.role)) {
            this.loadUsers();
          }
        },
        error: (error: HttpErrorResponse) => {
          toast.error(this.resolveErrorMessage(error, 'Não foi possível carregar seus dados.'));
        },
      });
  }

  onSubmit(): void {
    if (!this.editForm().valid() || this.saving()) return;

    const current = this.sessionUser();
    if (!current?.id) return;

    const { firstName, lastName, email, password, theme } = this.editModel();
    const payload: UpdateUserData = {
      firstName,
      lastName,
      email,
      theme: toApiTheme(theme),
    };
    if (password.trim()) {
      payload.password = password;
    }

    this.saving.set(true);
    this.userService
      .updateUser(current.id, payload)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (user) => {
          this.auth.setSessionUser(user);
          this.editModel.update((model) => ({
            ...model,
            password: '',
            theme: fromApiTheme(user.theme),
          }));
          toast.success('Dados atualizados com sucesso!');
        },
        error: (error: HttpErrorResponse) => {
          toast.error(this.resolveErrorMessage(error, 'Não foi possível salvar os dados.'));
        },
      });
  }

  confirmDelete(user: User): void {
    this.pendingDelete.set(user);
    this.deleteDialog()?.open();
  }

  confirmPromote(user: User): void {
    this.pendingPromote.set(user);
    this.promoteDialog()?.open();
  }

  onThemeToggle(dark: boolean): void {
    const theme = dark ? UserTheme.DARK : UserTheme.LIGHT;
    this.editModel.update((model) => ({ ...model, theme }));
    this.themeService.setTheme(theme);
  }

  deletePendingUser(): void {
    const user = this.pendingDelete();
    if (!user || this.actingUserId()) return;

    this.actingUserId.set(user.id);
    this.userService
      .deleteUser(user.id)
      .pipe(
        finalize(() => {
          this.actingUserId.set(null);
          this.deleteDialog()?.close();
        }),
      )
      .subscribe({
        next: () => {
          this.users.update((list) => list.filter((item) => item.id !== user.id));
          toast.success('Usuário excluído com sucesso.');
          if (user.id === this.sessionUser()?.id) {
            this.auth.logout();
          }
        },
        error: (error: HttpErrorResponse) => {
          toast.error(this.resolveErrorMessage(error, 'Não foi possível excluir o usuário.'));
        },
      });
  }

  deleteOwnAccount(): void {
    const current = this.sessionUser();
    if (!current?.id || this.actingUserId()) return;

    this.actingUserId.set(current.id);
    this.userService
      .deleteUser(current.id)
      .pipe(
        finalize(() => {
          this.actingUserId.set(null);
          this.selfDeleteDialog()?.close();
        }),
      )
      .subscribe({
        next: () => {
          toast.success('Sua conta foi excluída.');
          this.auth.logout();
        },
        error: (error: HttpErrorResponse) => {
          toast.error(this.resolveErrorMessage(error, 'Não foi possível excluir sua conta.'));
        },
      });
  }

  promotePendingUser(): void {
    const user = this.pendingPromote();
    if (!user || this.actingUserId()) return;

    this.actingUserId.set(user.id);
    this.userService
      .promoteToAdmin(user.id)
      .pipe(
        finalize(() => {
          this.actingUserId.set(null);
          this.promoteDialog()?.close();
        }),
      )
      .subscribe({
        next: (updated) => {
          this.users.update((list) =>
            list.map((item) => (item.id === updated.id ? updated : item)),
          );
          toast.success(`${updated.firstName} agora é administrador.`);
        },
        error: (error: HttpErrorResponse) => {
          toast.error(this.resolveErrorMessage(error, 'Não foi possível promover o usuário.'));
        },
      });
  }

  protected isAdminUser(user: User): boolean {
    return isAdminRole(user.role);
  }

  protected roleLabel(role: string): string {
    return isAdminRole(role) ? 'Admin' : 'Básico';
  }

  private loadUsers(): void {
    this.loadingUsers.set(true);
    this.usersLoadFailed.set(false);
    this.userService
      .listUsers()
      .pipe(finalize(() => this.loadingUsers.set(false)))
      .subscribe({
        next: (users) => this.users.set(users),
        error: () => {
          this.users.set([]);
          this.usersLoadFailed.set(true);
        },
      });
  }

  private resolveErrorMessage(error: HttpErrorResponse, fallback: string): string {
    const backendMessage = error.error?.message;
    if (typeof backendMessage === 'string' && backendMessage.trim()) {
      return backendMessage;
    }
    return fallback;
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.update((visible) => !visible);
  }
}
