import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UserProfile } from '../../models';
import { selectProfileData, selectSignedInUser } from '../../../modules/auth/state/auth.selectors';
import { CommonModule } from '@angular/common';
import { logout } from '../../../modules/auth/state/auth.actions';


@Component({
  selector: 'app-user-navbar',
  imports: [RouterLink , CommonModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
  private store = inject(Store);
  private router = inject(Router)
  user$: Observable<User | null>;
  profileData$ : Observable<UserProfile | null>;
  showPopup = false;

  constructor() {
    this.user$ = this.store.select(selectSignedInUser);
    this.profileData$ = this.store.select(selectProfileData);
   
  }

  ngOnInit(): void {}

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

  hidePopup() : void {
    this.showPopup = false;
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
