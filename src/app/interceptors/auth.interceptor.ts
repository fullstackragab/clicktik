import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: any, next: any) => {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    const authTokenObj = sessionStorage.getItem('USER');
    const router = inject(Router);
    const authService = inject(AuthService);
    if (authTokenObj) {
      const user = JSON.parse(authTokenObj);
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + user.token),
      });
      console.log('interceptor - auth headers: ', authReq.headers);
      return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            if (req.url.endsWith('/refresh')) {
              router.navigateByUrl('/login');
            } else {
              if (user.refreshToken) {
                return authService.refreshToken(user.refreshToken).pipe(
                  switchMap((result: any) => {
                    const newUser = {
                      ...user,
                      refreshToken: result.accessToken,
                    };
                    localStorage.setItem('USER', newUser);
                    authService.user.next(newUser);
                    const retriedReq = req.clone({
                      headers: req.headers.set(
                        'Authorization',
                        'Bearer ' + result.accessToken
                      ),
                    });
                    return next(retriedReq);
                  })
                );
              }
            }
          }
          return throwError(() => error);
        })
      );
    } else return next(req);
  } else {
    return next(req);
  }
};
