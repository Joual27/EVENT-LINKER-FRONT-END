import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserProfile } from '../../models';
import { selectProfileData } from '../../../modules/auth/state/auth.selectors';
import { appIsLoading, stopLoading } from '../../ui-state/ui.actions';
import { ActivatedRoute } from '@angular/router';
import { UserNavbarComponent } from "../../ui/user-navbar/user-navbar.component";
import * as profileActions from "../../state/profile.actions"
import { selectActiveProfileData } from '../../state/profile.selectors';
import { BioComponent } from "../../components/bio/bio.component";

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, AsyncPipe, UserNavbarComponent, BioComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  shownUpdateProfileOverlay = signal<boolean>(false);
  profileData$ : Observable<UserProfile | null>;
  activeTab = "bio"
  tabs = [
    { id: "bio", label: "Bio" },
    { id: "reviews", label: "Reviews"},
    { id: "likes", label: "Likes" },
    { id: "about", label: "About" },
  ]

  constructor() {
    this.store.dispatch(appIsLoading());
    this.profileData$ = this.store.select(selectActiveProfileData);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['userId'];
      if (userId) {
        this.store.dispatch(profileActions.fetchProfileData({ id: Number(userId) }));
      } else {
        this.store.select(selectProfileData).subscribe({
          next: (res) => {
            if (res) {
              this.store.dispatch(profileActions.profileDataFetchedSuccess({data : res}));
            }
          },
        });
      }
    });

    this.profileData$.subscribe(() => {
      setTimeout(() => {
        this.store.dispatch(stopLoading());
      } , 700)
    });
  }

  
  setActiveTab(tabId: string): void {
    this.activeTab = tabId
  }


  showUpdateProfileOverlay() : void{
    this.shownUpdateProfileOverlay.set(true);
  }


  hideUpdateProfileOverlay() : void{
    this.shownUpdateProfileOverlay.set(false);
  }
}
