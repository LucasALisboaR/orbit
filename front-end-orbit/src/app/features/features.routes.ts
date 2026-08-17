import { Routes } from '@angular/router';

export const featuresRoutes: Routes = [
  { path: 'login', loadComponent: ()=> import('./login/login').then(m => m.Login)},
  { path: 'forget-password', loadComponent: ()=> import('./forget-password/forget-password').then(m => m.ForgetPassword)},
  { path: 'forget-password', loadComponent: ()=> import('./new-user/new-user').then(m => m.NewUser)},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
