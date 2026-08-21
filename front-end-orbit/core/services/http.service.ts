import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${url}`);
  }

  post<T, B = unknown>(url: string, body: B): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${url}`, body);
  }

  put<T, B = unknown>(url: string, body: B): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${url}`, body);
  }

  patch<T, B = unknown>(url: string, body: B): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}${url}`, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${url}`);
  }
}
