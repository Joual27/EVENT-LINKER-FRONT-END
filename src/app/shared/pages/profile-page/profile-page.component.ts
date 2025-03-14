import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserProfile } from '../../models';
import { selectProfileData } from '../../../modules/auth/state/auth.selectors';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  private store = inject(Store);
  profileData$ : Observable<UserProfile | null>;
  activeTab = "work"
  tabs = [
    { id: "work", label: "Work" },
    { id: "moodboards", label: "Moodboards" },
    { id: "likes", label: "Likes" },
    { id: "about", label: "About" },
  ]

  constructor(){
    this.profileData$ = this.store.select(selectProfileData);
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId
  }
}
