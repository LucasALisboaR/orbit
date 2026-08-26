import { Routes } from '@angular/router';
import { authGuard } from '../../../core/auth/auth.guard';
import { guestGuard } from '../../../core/auth/guest.guard';

export const featuresRoutes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./user/login/login').then((m) => m.Login),
  },
  {
    path: 'forget-password',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./user/forget-password/forget-password').then((m) => m.ForgetPassword),
  },
  {
    path: 'new-user',
    canActivate: [guestGuard],
    loadComponent: () => import('./user/new-user/new-user').then((m) => m.NewUser),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('../layout/app-shell/app-shell').then((m) => m.AppShell),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home').then((m) => m.Home),
      },
      {
        path: 'finance',
        loadComponent: () => import('./finance/finance/finance').then((m) => m.Finance),
      },
      {
        path: 'finance/account',
        loadComponent: () =>
          import('./finance/create-account/create-account').then((m) => m.CreateAccount),
      },
      {
        path: 'finance/account/:id/edit',
        loadComponent: () =>
          import('./finance/edit-account/edit-account').then((m) => m.EditAccount),
      },
      {
        path: 'finance/category',
        loadComponent: () =>
          import('./finance/create-category/create-category').then((m) => m.CreateCategory),
      },
      {
        path: 'finance/transaction',
        loadComponent: () =>
          import('./finance/create-transaction/create-transaction').then((m) => m.CreateTransaction),
      },
      {
        path: 'user/edit',
        loadComponent: () => import('./user/edit-user/edit-user').then((m) => m.EditUser),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
