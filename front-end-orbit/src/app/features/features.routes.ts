import { Routes } from '@angular/router';

export const featuresRoutes: Routes = [
  { path: 'login', loadComponent: ()=> import('./user/login/login').then(m => m.Login)},
  { path: 'forget-password', loadComponent: ()=> import('./user/forget-password/forget-password').then(m => m.ForgetPassword)},
  { path: 'new-user', loadComponent: ()=> import('./user/new-user/new-user').then(m => m.NewUser)},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
