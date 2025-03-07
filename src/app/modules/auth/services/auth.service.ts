import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { registrationData } from '../models';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/'; 
  constructor() {}

  register(registrationType : string , data : registrationData) {
    return this.http.post(`${this.apiUrl}/public/auth/register/${registrationType}` , data).pipe(
      catchError((error : HttpErrorResponse) => {
        console.error(error);
        if(error.status == 400 && error.error ){
          const errorResponse = error.error;
          if (errorResponse.message === 'Validations Error' && errorResponse.errors) {
            const validationErrors = this.extractValidationErrors(errorResponse.errors);
            return throwError(() => validationErrors);
          } else {
            return throwError(() => errorResponse.message || 'Registration failed. Please try again.');
          }
        } else {
          return throwError(() => 'Registration failed. Please try again.');
        }
      })
    )
  }

  private extractValidationErrors(errors: { [key: string]: string }): string[] {
    return Object.keys(errors).map((field) => `${field}: ${errors[field]}`);
  }

}
