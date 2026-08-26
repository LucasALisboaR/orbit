import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';

export type HttpQueryParams = Record<string, string | number | boolean | undefined | null>;

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  get<T>(url: string, params?: HttpQueryParams): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${url}`, { params: this.toHttpParams(params) });
  }

  private toHttpParams(params?: HttpQueryParams): HttpParams | undefined {
    if (!params) return undefined;

    let httpParams = new HttpParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }
    return httpParams;
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
