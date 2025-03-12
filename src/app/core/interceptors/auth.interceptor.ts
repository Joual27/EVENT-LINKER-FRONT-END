import { HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { RefreshTokenResponse } from '../../modules/auth/models';
import { EncryptionService } from '../../modules/auth/services/encryption.service';
import { JwtService } from '../../modules/auth/services/jwt.service';


const isRefreshing = new BehaviorSubject<boolean>(false);
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const encryptionService = inject(EncryptionService);
  const jwtService = inject(JwtService);
  const router = inject(Router);
  


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
      switchMap((response: RefreshTokenResponse) => {
        isRefreshing.next(false);
        console.log('New access token received:', response.tokens.accessToken);
        jwtService.updateToken(response.tokens.accessToken);
        refreshTokenSubject.next(response.tokens.accessToken);
        return next(addTokenHeader(request, response.tokens.accessToken));
      }),
      catchError(err => {
        isRefreshing.next(false);
      
        router.navigate(["/auth/login"])
        return throwError(() => err);
      })  
    );
  } else {  
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => {
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
