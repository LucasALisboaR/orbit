import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services/http.service';
import { Category, CreateCategoryRequest } from '../../models/finance/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpService);

  create(request: CreateCategoryRequest): Observable<Category> {
    return this.http.post<Category>('/categories', request);
  }

  listAvailableToUser(): Observable<Category[]> {
    return this.http.get<Category[]>('/categories/avaliable-to-user');
  }
}
