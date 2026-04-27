import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://restaurantapi.stepacademy.ge/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.isLoggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  refreshToken(): Observable<AuthResponse> {
    const token = localStorage.getItem('refreshToken');
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/refresh-access-token/${token}`, {}
    ).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.accessToken);
      })
    );
  }

verifyEmail(data: { email: string; code: string }): Observable<any> {
  return this.http.put(`${this.baseUrl}/verify-email`, data);
}
}

