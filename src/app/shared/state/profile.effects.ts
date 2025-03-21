import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as profileActions from './profile.actions'
import { catchError, forkJoin, map, mergeMap, of } from "rxjs";
import { ProfileService } from "../services/profile.service";
import { ApiResponse, UserProfile } from "../models";
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
              stats: this.profileService.getUserStats(id)
            }).pipe(
              map(({ profile, stats }) => {
                const updatedProfile: UserProfile = {
                  ...profile.data, 
                  stats: stats.data, 
                };
                return profileActions.profileDataFetchedSuccess({ data: updatedProfile });
              }),
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