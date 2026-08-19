import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgetData, NewUserData, User } from '../../models/user/user.model';
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
}
