import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse, RefreshTokenResponse, RegistrationData, RegistrationResponse } from '../models';
import { catchError, Observable, throwError } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient); 
  private apiUrl = environments.apiUrl;
  constructor() {}

  register(registrationType: string, data: RegistrationData): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`/api/public/auth/register/${registrationType}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Registration error:', error);
        if (error.status === 400 && error.error) {
          const errorResponse = error.error;
          if (errorResponse.message === 'Validations Error' && errorResponse.validationErrors) {
            const validationErrors = this.extractValidationErrors(errorResponse.validationErrors);
            return throwError(() => ({ type: 'validation', errors: validationErrors }));
          } else {
            return throwError(() => ({ type: 'server', message: errorResponse.message || 'Registration failed. Please try again.' }));
          }
        } else {
          return throwError(() => ({ type: 'network', message: 'Network error. Please try again later.' }));
        }
      })
    );
  }

  login(credentials: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`/api/public/auth/login`, credentials).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400 && error.error) {
          const errorResponse = error.error;
          if (errorResponse.message === 'Validations Error' && errorResponse.validationErrors) {
            const validationErrors = this.extractValidationErrors(errorResponse.validationErrors);
            return throwError(() => ({ type: 'validation', errors: validationErrors }));
          } else {
            return throwError(() => ({ type: 'server', message: errorResponse.message || 'Login failed. Please check your credentials.' }));
          }
        } else if (error.status === 401) {
          return throwError(() => ({ type: 'auth', message: 'Bad Credentials' }));
        } else {
          return throwError(() => ({ type: 'network', message: 'Network error. Please try again later.' }));
        }
      })
    );
  } 

  refreshToken() : Observable<RefreshTokenResponse>{
    return this.http.get<RefreshTokenResponse>('/api/refresh-token' , {withCredentials : true});
  }

  private extractValidationErrors(errors: { [key: string]: string }): string[] {
    return Object.keys(errors).map((field) => `${field}: ${errors[field]}`);
  }


}
