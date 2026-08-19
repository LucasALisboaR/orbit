import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgetData, LoginData, NewUserData, User } from '../../models/user/user.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpService);

  login(loginData: LoginData): Observable<User> {
    return this.http.post<User>('/auth/login', loginData);
  }

  setUser(user: User): void {
    localStorage.setItem('theme', user.theme.toLowerCase());
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    localStorage.clear();
  }

  register(user: NewUserData): Observable<unknown> {
    return this.http.post('/users', user);
  }

  forgetPassword(forgetData: ForgetData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('/auth/forgot-password', forgetData);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`/users/${userId}`);
  }
}
