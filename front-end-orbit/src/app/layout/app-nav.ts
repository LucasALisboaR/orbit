import { signal } from '@angular/core';

export interface AppNavItem {
  title: string;
  url: string;
  icon: string;
}

export const APP_NAV_ITEMS = signal<readonly AppNavItem[]>([
  {
    title: 'Início',
    url: '/home',
    icon: 'lucideHouse',
  },
  {
    title: 'Finanças',
    url: '/finance',
    icon: 'lucideWallet',
  },
]);
