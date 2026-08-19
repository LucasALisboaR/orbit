import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgetData, NewUserData, UpdateUserData, User, UserRole } from '../../models/user/user.model';
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
    return this.http.get<User>(`/users/${userId}`);
  }

  deleteUser(userId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`/users/${userId}`);
  }

  /** Contrato ainda não existe no back: GET /users */
  listUsers(): Observable<User[]> {
    return this.http.get<User[]>('/users');
  }

  /** Contrato ainda não existe no back: PUT /users/{id} */
  updateUser(userId: string, data: UpdateUserData): Observable<User> {
    return this.http.put<User>(`/users/${userId}`, data);
  }

  /** Contrato ainda não existe no back: PATCH /users/{id}/role */
  promoteToAdmin(userId: string): Observable<User> {
    return this.http.patch<User>(`/users/${userId}/role`, { role: UserRole.ADMIN });
  }
}
