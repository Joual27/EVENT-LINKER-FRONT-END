import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UserProfile } from '../../models';
import { selectProfileData, selectSignedInUser } from '../../../modules/auth/state/auth.selectors';
import { appIsLoading, stopLoading } from '../../ui-state/ui.actions';
import { ActivatedRoute } from '@angular/router';
import { UserNavbarComponent } from "../../ui/user-navbar/user-navbar.component";
import * as profileActions from "../../state/profile.actions"
import { selectActiveProfileData } from '../../state/profile.selectors';
import { BioComponent } from "../../components/bio/bio.component";
import { FileUploadComponent } from "../../ui/file-upload/file-upload.component";
import { UpdateBioPopupComponent } from '../../components/update-bio-popup/update-bio-popup.component';
import { ProfileReviewsListComponent } from "../../components/profile-reviews-list/profile-reviews-list.component";

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, AsyncPipe, UserNavbarComponent, BioComponent, FileUploadComponent, UpdateBioPopupComponent, ProfileReviewsListComponent ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  signedInUser$ : Observable<User | null>;
  shownUpdateProfileOverlay = signal<boolean>(false); 
  shownUpdateProfilePopup = signal<boolean>(false);
  shownUpdateBioPopup = signal<boolean>(false);
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
    this.signedInUser$ = this.store.select(selectSignedInUser);
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

  showUpdateProfilePopup() : void{
    this.shownUpdateProfilePopup.set(true);
  }

  showUpdateBioPopup() : void{
    this.shownUpdateBioPopup.set(true);
  }

  hideUpdateBioPopup() : void{
    this.shownUpdateBioPopup.set(false);
  }

  hideUpdateProfileOverlay() : void{
    this.shownUpdateProfileOverlay.set(false);
  }

  hideUpdateProfilePopup() : void{
    this.shownUpdateProfilePopup.set(false);
  }
}
