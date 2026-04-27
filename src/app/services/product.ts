import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductFilter, ProductResponse } from '../models/product';
import { Category, CategoryResponse } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://restaurantapi.stepacademy.ge/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  filterProducts(filter: ProductFilter): Observable<ProductResponse> {
    let params = new HttpParams();

    if (filter.query) params = params.set('Query', filter.query);
    if (filter.vegetarian !== undefined) params = params.set('Vegetarian', filter.vegetarian);
    if (filter.spiciness !== undefined) params = params.set('Spiciness', filter.spiciness);
    if (filter.minPrice !== undefined) params = params.set('MinPrice', filter.minPrice);
    if (filter.maxPrice !== undefined) params = params.set('MaxPrice', filter.maxPrice);
    if (filter.categoryId !== undefined) params = params.set('CategoryId', filter.categoryId);
    if (filter.page !== undefined) params = params.set('Page', filter.page);
    if (filter.take !== undefined) params = params.set('Take', filter.take);

    return this.http.get<ProductResponse>(`${this.baseUrl}/products/filter`, { params });
  }

  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.baseUrl}/categories`);
  }
}