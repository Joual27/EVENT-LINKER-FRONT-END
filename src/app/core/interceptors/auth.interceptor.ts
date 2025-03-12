import { HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { AuthResponse } from '../../modules/auth/models';
import { EncryptionService } from '../../modules/auth/services/encryption.service';
import { JwtService } from '../../modules/auth/services/jwt.service';


const isRefreshing = new BehaviorSubject<boolean>(false);
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const jwtService = inject(JwtService);
  const router = inject(Router);
  const encryptionService = inject(EncryptionService);


  if (isPublicEndpoint(request.url)) {
    return next(request);
  }


  const user = encryptionService.getLoggedInUser();

  if (user) {
    request = addTokenHeader(request, user.token);
  }

  return next(request).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.log('401 error detected, attempting to refresh token...');
        return handle401Error(request, next, authService, jwtService, router);
      } else {
        return throwError(() => error);
      }
    })
  );
};

function addTokenHeader(request: HttpRequest<any>, token: string) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}

function handle401Error(request: HttpRequest<any> ,next: HttpHandlerFn ,authService: AuthService ,jwtService: JwtService , router: Router): Observable<HttpEvent<any>> {
  if (!isRefreshing.value) {
    isRefreshing.next(true);
    refreshTokenSubject.next(null);
    return authService.refreshToken().pipe(
      switchMap((response: AuthResponse) => {
         isRefreshing.next(false);
        console.log('New access token received:', response.data.tokens.accessToken);
        jwtService.updateToken(response.data.tokens.accessToken);
        refreshTokenSubject.next(response.data.tokens.accessToken);
        return next(addTokenHeader(request, response.data.tokens.accessToken));
      }),
      catchError(err => {
        isRefreshing.next(false);
        console.error('Token refresh failed, navigating to login page...', err);
        return throwError(() => err);
      })  
    );
  } else {  
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => {
        console.log('Using refreshed token for the request...');
        return next(addTokenHeader(request, token as string))
      }
      )
    );
  }
  
}


function isPublicEndpoint(url: string): boolean {
  const publicEndpoints = [
    '/api/v1/public/auth/register',
    '/api/v1/public/auth/login',
    '/api/v1/refresh-token'
  ];
  return publicEndpoints.some(endpoint => url.includes(endpoint));
}
