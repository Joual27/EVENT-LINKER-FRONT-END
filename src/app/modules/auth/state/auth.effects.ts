import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as authActions from './auth.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { inject } from "@angular/core";
import { UserService } from "../../../shared/services/user.service";
import { ApiResponse, UserProfile } from "../../../shared/models";
import { showFailurePopup } from "../../../shared/ui-state/ui.actions";

export class AuthEffect{
    private actions$ = inject(Actions);
    private userService = inject(UserService);
    
    fetchUserProfileData$ = createEffect(() => 
        this.actions$.pipe(
            ofType(authActions.fetchUserProfileData),
            mergeMap(({id}) => 
                this.userService.getUserProfileData(id).pipe(
                    map((res : ApiResponse<UserProfile>) => 
                        authActions.ProfileDataFetchedSuccess({data : res.data})  
                    ),
                    catchError((err) => of(showFailurePopup({errors : [err.message]})))
                )
            )
        ))
}