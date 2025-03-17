import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as profileActions from './profile.actions'
import { catchError, forkJoin, map, mergeMap, of } from "rxjs";
import { ProfileService } from "../services/profile.service";
import { ApiResponse, UserProfile } from "../models";
import { showFailurePopup } from "../ui-state/ui.actions";


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
}