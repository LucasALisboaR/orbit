import { signal } from '@angular/core';
import { User, UserRole, UserTheme } from '../../models/user/user.model';

export const MOCK_USER: User = {
  id: 'user-1',
  firstName: 'Lucas',
  lastName: 'Lisboa',
  email: 'lucas@orbit.com',
  role: UserRole.USER,
  theme: UserTheme.LIGHT,
  isActive: true,
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
};

export class AuthServiceStub {
  readonly user = signal(MOCK_USER).asReadonly();
  logout(): void {}
}

export class ThemeServiceStub {
  toggleTheme(): void {}
}
