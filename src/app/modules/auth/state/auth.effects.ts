import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as authActions from './auth.actions'
import { catchError, forkJoin, map, mergeMap, of } from "rxjs";
import { inject } from "@angular/core";
import { UserProfile } from "../../../shared/models";
import { appIsLoading, showFailurePopup, stopLoading } from "../../../shared/ui-state/ui.actions";
import { AuthService } from "../services/auth.service";
import { EncryptionService } from "../services/encryption.service";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { ProfileService } from "../../../shared/services/profile.service";

export class AuthEffect{
    private actions$ = inject(Actions);
    private profileService = inject(ProfileService);
    private authService = inject(AuthService);
    private encryprionService = inject(EncryptionService);
    private router = inject(Router);
    private store = inject(Store);
    
    fetchUserProfileData$ = createEffect(() => 
        this.actions$.pipe(
            ofType(authActions.loginSuccess),
            mergeMap(({ user }) => 
                forkJoin({
                    profile: this.profileService.getUserProfileData(user.id),
                    stats: this.profileService.getUserStats(user.id),
                }).pipe(
                    map(({ profile, stats }) => {
                        const updatedProfile: UserProfile = {
                            ...profile.data, 
                            stats: stats.data, 
                        };
    
                        return authActions.loggedInUserProfileDataFetchedSuccessfully({
                            data: updatedProfile
                        });
                    }),
                    catchError((err) => of(showFailurePopup({ errors: [err.message] })))
                )
            )
        )
    )

    logout$ = createEffect(() => 
        this.actions$.pipe(
            ofType(authActions.logout),
            mergeMap(() =>
                this.authService.logout().pipe(
                    map((res) => {
                        this.encryprionService.removeLoggedInUser();
                        this.store.dispatch(appIsLoading());
                        setTimeout(() => {
                            this.router.navigate(['/'])
                            this.store.dispatch(stopLoading())
                        } , 2500)
                        return authActions.loggedOutSuccess();
                    } 
                  ),
                  catchError((err) => of(showFailurePopup({errors : [err.message]})))
                )
            )
        )
    )
}