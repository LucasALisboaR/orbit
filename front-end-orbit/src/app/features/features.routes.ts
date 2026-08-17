import { Routes } from '@angular/router';

export const featuresRoutes: Routes = [
  { path: 'login', loadComponent: ()=> import('./login/login').then(m => m.Login)},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
