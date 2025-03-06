import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  static getFormErrors(form: FormGroup): string[] {
    const errors: string[] = [];
    this.collectErrors(form, errors);
    return errors;
  }

  private static collectErrors(control: AbstractControl, errors: string[]): void {
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach((key) => {
        this.collectErrors(control.get(key)!, errors);
      });
    } else {
      const controlErrors: ValidationErrors | null = control.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach((errorKey) => {
          switch (errorKey) {
            case 'required':
              errors.push(`${this.getControlName(control)} is required.`);
              break;
            case 'email':
              errors.push(`${this.getControlName(control)} must be a valid email address.`);
              break;
            case 'minlength':
              errors.push(
                `${this.getControlName(control)} must be at least ${controlErrors['minlength'].requiredLength} characters long.`
              );
              break;
            case 'maxlength':
              errors.push(
                `${this.getControlName(control)} cannot exceed ${controlErrors['maxlength'].requiredLength} characters.`
              );
              break;
            case 'passwordStrength':
              errors.push(
                `${this.getControlName(control)} must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.`
              );
              break;
            default:
              errors.push(`${this.getControlName(control)} has an error: ${errorKey}.`);
              break;
          }
        });
      }
    }
  }

  static passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value)) {
      return { passwordStrength: true };
    }
    return null;
  }

  static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  private static getControlName(control: AbstractControl): string {
    const group = control.parent as FormGroup;
    if (!group) {
      return 'Field';
    }
    return Object.keys(group.controls).find((key) => group.get(key) === control) || 'Field';
  }
}
