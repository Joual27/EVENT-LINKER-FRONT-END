import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  registrationType = signal<string>("worker");


  switchToOrganizerForm() : void {
    this.registrationType.set("organizer");
  }

  switchToWorkerForm() : void {
    this.registrationType.set("worker");
  }
}
