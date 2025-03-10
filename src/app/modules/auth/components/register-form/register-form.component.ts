import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { Store } from '@ngrx/store';
import * as uiActions from '../../../../shared/ui-state/ui.actions'
import { AuthResponse, RegistrationData } from '../../models';
import { AuthService } from '../../services/auth.service';

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

  onSubmit() : void {
    let errors : string[] = [];
    if(this.formGroup.valid){
      let registrationData = this.convertToRegistrationData(this.formGroup);
      this.authService.register(this.registrationType() , registrationData).subscribe(() => {
        next : (response : AuthResponse) => {
          console.log(response);
          this.store.dispatch(uiActions.showSuccessPopup({message : "Account Created Successfully ! Redirecting ..."}))
        }
      })
    }else{
      errors = FormValidationService.getFormErrors(this.formGroup);
      this.store.dispatch(uiActions.showFailurePopup({errors :errors}))
    }
  }

  
  convertToRegistrationData(FormGroup : FormGroup) : RegistrationData{
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
}
