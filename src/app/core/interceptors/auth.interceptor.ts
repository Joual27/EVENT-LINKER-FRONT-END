import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { AuthResponse } from '../../modules/auth/models';
import { EncryptionService } from '../../modules/auth/services/encryption.service';
import { JwtService } from '../../modules/auth/services/jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private authService = inject(AuthService);
  private jwtService = inject(JwtService);
  private router = inject(Router);
  private encryptionService = inject(EncryptionService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.encryptionService.getLoggedInUser();

    if (user) {
      request = this.addTokenHeader(request, user.token);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response: AuthResponse) => {
          this.isRefreshing = false;
          console.log("assigning new access token ...");
          this.jwtService.updateToken(response.data.tokens.accessToken);
          this.refreshTokenSubject.next(response.data.tokens.accessToken);
          return next.handle(this.addTokenHeader(request, response.data.tokens.accessToken));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.router.navigate(['/auth/login']); 
          return throwError(err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((token) => {
          return next.handle(this.addTokenHeader(request, token));
        })
      );
    }
  }
}