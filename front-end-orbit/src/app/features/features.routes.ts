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
    loadComponent: () => import('../layout/app-shell').then((m) => m.AppShell),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home').then((m) => m.Home),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
