import { Component, inject, Input, signal } from '@angular/core';
import { PaginationResponse, Review, UserProfile } from '../../models';
import { ProfileReviewsItemComponent } from '../profile-reviews-item/profile-reviews-item.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { fetchReviewsData } from '../../state/profile.actions';
import { selectActiveProfileData } from '../../state/profile.selectors';

@Component({
  selector: 'app-profile-reviews-list',
  imports: [ProfileReviewsItemComponent , CommonModule],
  templateUrl: './profile-reviews-list.component.html',
  styleUrl: './profile-reviews-list.component.css'
})
export class ProfileReviewsListComponent {
  private store = inject(Store);
  profileData !: UserProfile ;
  @Input() reviews$ !: Observable<PaginationResponse<Review[] > | null> ;
  currentPage = signal<number>(0);
  

  constructor() {
    this.store.select(selectActiveProfileData).subscribe({
      next : (res) => {
        if(res){
           this.profileData = res
        }
      }  
    })  
  }

  onNext() : void {
    this.currentPage.set(this.currentPage()+1);
    this.store.dispatch(fetchReviewsData({id : this.profileData.id , page : this.currentPage()}))
  }

  onPrevious() : void{
    this.currentPage.set(this.currentPage()-1);
    this.store.dispatch(fetchReviewsData({id : this.profileData.id , page : this.currentPage()}))
  }
}
