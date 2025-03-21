import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserProfile } from '../../models';
import { CommonModule } from '@angular/common';
import { UpdateBioPopupComponent } from "../update-bio-popup/update-bio-popup.component";

@Component({
  selector: 'app-bio',
  imports: [CommonModule],
  templateUrl: './bio.component.html',
  styleUrl: './bio.component.css'
})
export class BioComponent {
  @Input() bio !: string | undefined;
  @Input() signedInUser$ !: Observable<User | null>;
  @Input() profileData$ !: Observable<UserProfile | null>;
  @Output() showUpdateBioPopup = new EventEmitter<void>();


  onShowPopup() : void {
    this.showUpdateBioPopup.emit();
  }
}
