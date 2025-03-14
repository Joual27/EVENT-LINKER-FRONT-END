import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { Store } from '@ngrx/store';
import * as uiActions from '../../../../shared/ui-state/ui.actions'
import * as authActions from "../../state/auth.actions"
import { AuthResponse, RegistrationData, RegistrationResponse } from '../../models';
import { AuthService } from '../../services/auth.service';
import { EncryptionService } from '../../services/encryption.service';
import { User } from '../../../../shared/models';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule , RouterLink , ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  registrationType = signal<string>("worker");
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private encryptionService = inject(EncryptionService);
  private router = inject(Router);
  formGroup : FormGroup;

  constructor(){
    this.formGroup = this.fb.group({
      username : ['' , [Validators.required]],
      email : ['' , [Validators.required , Validators.email]],
      password : ['' , [Validators.required,FormValidationService.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]]
    } , {
      validators : [FormValidationService.passwordMatchValidator]
    })
    this.updateFormControls();
  }

  private updateFormControls(): void {
    if (this.registrationType() === 'worker') {
      this.formGroup.addControl('isOrganization', this.fb.control('no', [Validators.required]));
      if (this.formGroup.contains('organizationName')) {
        this.formGroup.removeControl('organizationName');
      }
    } else {
      this.formGroup.addControl('organizationName', this.fb.control('', [Validators.required]));
      if (this.formGroup.contains('isOrganization')) {
        this.formGroup.removeControl('isOrganization');
      }
    }
  }

  switchToOrganizerForm() : void {
    this.registrationType.set("organizer");
    this.updateFormControls();
  }

  switchToWorkerForm() : void {
    this.registrationType.set("worker");
    this.updateFormControls();
  }

 onSubmit(): void {
  let errors: string[] = [];
  if (this.formGroup.valid) {
    let registrationData = this.convertToRegistrationData();
    this.authService.register(this.registrationType(), registrationData).subscribe({
      next: (response: RegistrationResponse) => {
        const authResponse = response as AuthResponse;
        this.store.dispatch(uiActions.showSuccessPopup({ message: `${this.registrationType()} created successfully! Redirecting ... !` }));
        let user : User = {
          id: authResponse.data.id,
          token: authResponse.data.tokens.accessToken,
          role: authResponse.data.role
        }
        this.store.dispatch(authActions.loginSuccess({user: user}))
        this.store.dispatch(uiActions.appIsLoading());
        this.encryptionService.setLoggedInUser(user);
        setTimeout(() => {
          this.hideSuccessPopup();
          this.store.dispatch(uiActions.stopLoading());
          this.redirectBasedOnRole(authResponse.data.role);
        } , 3000)
      },
      error: (error) => {
        if (error.type === 'validation') {
          this.store.dispatch(uiActions.showFailurePopup({ errors: error.errors }));
        } else if (error.type === 'server') {
          this.store.dispatch(uiActions.showFailurePopup({ errors: [error.message] }));
        } else if (error.type === 'network') {
          this.store.dispatch(uiActions.showFailurePopup({ errors: ['Network error. Please try again later.'] }));
        } else {
          this.store.dispatch(uiActions.showFailurePopup({ errors: ['An unexpected error occurred.'] }));
        }
        setTimeout(() => {
          this.hideFailurePopup();
        } , 5000)
      }
    });
  } else {
    errors = FormValidationService.getFormErrors(this.formGroup);
    this.store.dispatch(uiActions.showFailurePopup({ errors }));
  }
}

  convertToRegistrationData() : RegistrationData{
    const formData = this.formGroup.value;
    let res : RegistrationData = {
      username : formData.username,
      email : formData.email,
      password : formData.password,
      ...(this.registrationType() == 'worker' && {isOrganization : formData.isOrganization == 'yes'}),
      ...(this.registrationType() == 'organizer' && {organizationName : formData.organizationName})
    }
    return res;
  }

  redirectBasedOnRole(role : string) :void {
    switch(role.toLowerCase()){
      case 'worker' :
        this.router.navigate(['/worker/profile']);
        break;
      case 'organizer':
        this.router.navigate(['/organizer/profile']);
        break;
      case 'admin' :
        this.router.navigate(['/admin/dashboard']);
        break;
      default :
       console.log("This Role is not available !");
       
    }
  }

  hideFailurePopup() : void{
    this.store.dispatch(uiActions.hideFailurePopup());
  }

  hideSuccessPopup() : void {
    this.store.dispatch(uiActions.hideSuccessPopup());
  }

 }
