import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ForgetData, fromApiTheme, NewUserData, UpdateUserData, User, UserRole } from '../../models/user/user.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpService);

  register(user: NewUserData): Observable<unknown> {
    return this.http.post('/users', user);
  }

  forgetPassword(forgetData: ForgetData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('/auth/forgot-password', forgetData);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`/users/${userId}`).pipe(map((user) => this.normalizeUser(user)));
  }

  deleteUser(userId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`/users/${userId}`);
  }

  listUsers(): Observable<User[]> {
    return this.http
      .get<User[]>('/users')
      .pipe(map((users) => users.map((user) => this.normalizeUser(user))));
  }

  updateUser(userId: string, data: UpdateUserData): Observable<User> {
    return this.http
      .put<User>(`/users/${userId}`, data)
      .pipe(map((user) => this.normalizeUser(user)));
  }

  updateUserRole(userId: string, role: UserRole): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`/users/${userId}/role`, { role });
  }

  promoteToAdmin(userId: string): Observable<{ message: string }> {
    return this.updateUserRole(userId, UserRole.ADMIN);
  }

  demoteToBasic(userId: string): Observable<{ message: string }> {
    return this.updateUserRole(userId, UserRole.BASIC);
  }

  private normalizeUser(user: User): User {
    return {
      ...user,
      theme: fromApiTheme(user.theme),
      role: String(user.role ?? '').toUpperCase() as UserRole,
    };
  }
}
