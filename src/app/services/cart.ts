import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart, AddToCartRequest, EditQuantityRequest } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'https://restaurantapi.stepacademy.ge/api/cart';

  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}`);
  }

  addToCart(data: AddToCartRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-to-cart`, data);
  }

  editQuantity(data: EditQuantityRequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit-quantity`, data);
  }

  removeFromCart(itemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove-from-cart/${itemId}`);
  }

  checkout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkout`, {});
  }
}