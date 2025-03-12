import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse, RegistrationData, RegistrationResponse } from '../models';
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
    return this.http.post<RegistrationResponse>(`${this.apiUrl}/public/auth/register/${registrationType}`, data).pipe(
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


  refreshToken() : Observable<AuthResponse>{
    return this.http.get<AuthResponse>(`${this.apiUrl}/refresh-token` , {withCredentials : true});
  }

  private extractValidationErrors(errors: { [key: string]: string }): string[] {
    return Object.keys(errors).map((field) => `${field}: ${errors[field]}`);
  }


}
