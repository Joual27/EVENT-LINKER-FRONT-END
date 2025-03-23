import { Component, Input, signal } from '@angular/core';
import { Review } from '../../models';
import { ProfileReviewsItemComponent } from '../profile-reviews-item/profile-reviews-item.component';

@Component({
  selector: 'app-profile-reviews-list',
  imports: [ProfileReviewsItemComponent],
  templateUrl: './profile-reviews-list.component.html',
  styleUrl: './profile-reviews-list.component.css'
})
export class ProfileReviewsListComponent {
  @Input() reviews !: Review[] ;
  cuurentPage = signal<number>(0);
}
