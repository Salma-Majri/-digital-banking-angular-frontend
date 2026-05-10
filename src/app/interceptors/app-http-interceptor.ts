import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.accessToken) {
    const cloneReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authService.accessToken)
    });
    return next(cloneReq);
  }

  return next(req);
};
