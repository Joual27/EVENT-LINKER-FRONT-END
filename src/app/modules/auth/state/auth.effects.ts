import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as authActions from './auth.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { inject } from "@angular/core";
import { UserService } from "../../../shared/services/user.service";
import { ApiResponse, UserProfile } from "../../../shared/models";
import { appIsLoading, showFailurePopup, stopLoading } from "../../../shared/ui-state/ui.actions";
import { AuthService } from "../services/auth.service";
import { EncryptionService } from "../services/encryption.service";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";

export class AuthEffect{
    private actions$ = inject(Actions);
    private userService = inject(UserService);
    private authService = inject(AuthService);
    private encryprionService = inject(EncryptionService);
    private router = inject(Router);
    private store = inject(Store);
    
    fetchUserProfileData$ = createEffect(() => 
        this.actions$.pipe(
            ofType(authActions.loginSuccess),
            mergeMap(({user}) => 
                this.userService.getUserProfileData(user.id).pipe(
                    map((res : ApiResponse<UserProfile>) => 
                        authActions.loggedInUserProfileDataFetchedSuccessfully({data : res.data})  
                    ),
                    catchError((err) => of(showFailurePopup({errors : [err.message]})))
                )
            )
    ))

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