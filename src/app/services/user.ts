import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://restaurantapi.stepacademy.ge/api/users';

  constructor(private http: HttpClient) {}

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile`);
  }

  editProfile(data: Partial<User>): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit`, data);
  }

  changePassword(data: { oldPassword: string; newPassword: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/change-password`, data);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete`);
  }
}