import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserProfile } from '../../models';
import { selectProfileData } from '../../../modules/auth/state/auth.selectors';
import { appIsLoading, stopLoading } from '../../ui-state/ui.actions';
import { ActivatedRoute } from '@angular/router';
import { UserNavbarComponent } from "../../ui/user-navbar/user-navbar.component";

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, AsyncPipe, UserNavbarComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent{
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  profileData$ : Observable<UserProfile | null>;
  activeTab = "work"
  tabs = [
    { id: "work", label: "Work" },
    { id: "moodboards", label: "Moodboards" },
    { id: "likes", label: "Likes" },
    { id: "about", label: "About" },
  ]

  constructor(){
    this.store.dispatch(appIsLoading());
    this.profileData$ = this.store.select(selectProfileData);
    this.store.dispatch(stopLoading());
  }

  

  setActiveTab(tabId: string): void {
    this.activeTab = tabId
  }
}
