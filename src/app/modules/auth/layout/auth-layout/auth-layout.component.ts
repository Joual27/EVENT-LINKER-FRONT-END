import { Component, signal } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RegisterFormComponent } from "../../components/register-form/register-form.component";

@Component({
  selector: 'app-auth-layout',
  imports: [LoginFormComponent, RegisterFormComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {
  activeForm = signal<string>("login");


  switchToLoginForm():void{
    this.activeForm.set("login")
  }

  switchToRegisterForm():void{
    this.activeForm.set("register")
  }
}
