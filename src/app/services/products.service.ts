import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(limit: number, skip: number) {
    return this.http.get(environment.apiUrl + 'products', {
      params: {
        limit,
        skip,
      },
    });
  }

  searchProducts(q: string) {
    return this.http.get(environment.apiUrl + 'products/search', {
      params: {
        q,
      },
    });
  }

  getProductsByCategory(category: string) {
    return this.http.get(environment.apiUrl + 'products/category/' + category);
  }
}
