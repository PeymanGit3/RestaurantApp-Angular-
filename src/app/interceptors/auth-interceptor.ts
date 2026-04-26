import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

const publicEndpoints = [
  '/api/auth/register',
  '/api/auth/login',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/refresh-access-token',
  '/api/auth/resend-email-verification'
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const apiKey = '4ce7a47f-db13-40fb-86ec-49cb41471f00';

  const isPublic = publicEndpoints.some(endpoint => req.url.includes(endpoint));

  let headers = req.headers.set('X-API-KEY', apiKey);

  if (token && !isPublic) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const clonedReq = req.clone({ headers });
  return next(clonedReq);
};