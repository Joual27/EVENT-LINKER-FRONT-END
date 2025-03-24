import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as profileActions from './profile.actions'
import { catchError, forkJoin, map, mergeMap, of } from "rxjs";
import { ProfileService } from "../services/profile.service";
import { ApiResponse, PaginationResponse, Review, UserProfile } from "../models";
import { showFailurePopup, showSuccessPopup } from "../ui-state/ui.actions";


export class ProfileEffect{
    private actions$ = inject(Actions);
    private profileService = inject(ProfileService);

    fetchProfileData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(profileActions.fetchProfileData),
        mergeMap(({ id }) =>
          forkJoin({
            profile: this.profileService.getUserProfileData(id),
            stats: this.profileService.getUserStats(id),
            reviews: this.profileService.getUserReviews(id, 0),
          }).pipe(
            mergeMap(({ profile, stats, reviews }) => {
              const updatedProfile: UserProfile = {
                ...profile.data,
                stats: stats.data,
              };
    
              return [
                profileActions.profileDataFetchedSuccess({ data: updatedProfile }),
                profileActions.ReviewsDataFetchedSuccessfully({ data: reviews.data }),
              ];
            }),
            catchError((err) => of(showFailurePopup({ errors: [err.message] })))
          )
        )
      )
    );
  
    
    fetchReviewsData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(profileActions.fetchReviewsData),
        mergeMap(({ id, page }) =>
          this.profileService.getUserReviews(id, page).pipe(
            map((response: ApiResponse<PaginationResponse<Review[]>>) =>
              profileActions.ReviewsDataFetchedSuccessfully({ data: response.data })
            ),
            catchError((err) => of(showFailurePopup({ errors: [err.message] })))
          )
        )
      ) 
    );

      updateProfile$ = createEffect(() =>
        this.actions$.pipe(
          ofType(profileActions.updateProfile),
          mergeMap(({ data }) =>
            this.profileService.updateProfile(data).pipe(
              mergeMap((profileResponse) => {
                const userId = profileResponse.data.id;
                return forkJoin({
                  profile: of(profileResponse), 
                  stats: this.profileService.getUserStats(userId)
                });
              }),
              map(({ profile, stats }) => {
                const updatedProfile: UserProfile = {
                  ...profile.data,
                  stats: stats.data
                };
                showSuccessPopup({ message: "Profile updated successfully!" });
                return profileActions.profileDataFetchedSuccess({ data: updatedProfile });
              }),
              catchError((error) => {
                showFailurePopup({ errors: [error.message] });
                return of(showFailurePopup({ errors: [error.message] }));
              })
            )
          )
        )
      );
}