import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { Store } from '@ngrx/store';
import * as uiActions from '../../../../shared/ui-state/ui.actions';
import * as authActions from '../../state/auth.actions';
import { User } from '../../../../shared/models';
import { AuthService } from '../../services/auth.service';
import { EncryptionService } from '../../services/encryption.service';
import { AuthResponse } from '../../models';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private encryptionService = inject(EncryptionService);
  private router = inject(Router);

  formGroup: FormGroup;

  constructor() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    let errors: string[] = [];
    if (this.formGroup.valid) {
      const loginData = this.formGroup.value;
      this.authService.login(loginData).subscribe({
        next: (response: AuthResponse) => {
          this.store.dispatch(uiActions.showSuccessPopup({ message: `Login successful! Redirecting...` }));
          let user: User = {
            id: response.data.id,
            token: response.data.tokens.accessToken,
            role: response.data.role
          };
          this.store.dispatch(uiActions.hideFailurePopup());
          this.store.dispatch(authActions.loginSuccess({ user: user }));
          this.store.dispatch(uiActions.appIsLoading());
          this.encryptionService.setLoggedInUser(user);
          setTimeout(() => {
            this.hideSuccessPopup();
            this.store.dispatch(uiActions.stopLoading());
            this.redirectBasedOnRole(response.data.role);
          }, 3000);
        },
        error: (error) => {
          if (error.type === 'validation') {
            this.store.dispatch(uiActions.showFailurePopup({ errors: error.errors }));
          } else if (error.type === 'server') {
            this.store.dispatch(uiActions.showFailurePopup({ errors: [error.message] }));
          } else if (error.type === 'auth') {
            this.store.dispatch(uiActions.showFailurePopup({ errors: [error.message] }));
          } else if (error.type === 'network') {
            this.store.dispatch(uiActions.showFailurePopup({ errors: ['Network error. Please try again later.'] }));
          } else {
            this.store.dispatch(uiActions.showFailurePopup({ errors: ['An unexpected error occurred.'] }));
          }
          setTimeout(() => {
            this.hideFailurePopup();
          }, 5000);
        }
      });
    } else {
      errors = FormValidationService.getFormErrors(this.formGroup);
      this.store.dispatch(uiActions.showFailurePopup({ errors }));
    }
  }



  private redirectBasedOnRole(role: string): void {
    switch(role.toLowerCase()){
      case 'worker' :
        this.router.navigate(['/profile']);
        break;
      case 'organizer':
        this.router.navigate(['/profile']);
        break;
      case 'admin' :
        this.router.navigate(['/admin/dashboard']);
        break;
      default :
       console.log("This Role is not available !");
       
    }
  }

  hideFailurePopup(): void {
    this.store.dispatch(uiActions.hideFailurePopup());
  }

  hideSuccessPopup(): void {
    this.store.dispatch(uiActions.hideSuccessPopup());
  }
}