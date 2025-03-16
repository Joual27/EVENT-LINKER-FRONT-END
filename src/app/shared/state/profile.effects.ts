import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as profileACtions from './profile.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { ProfileService } from "../services/profile.service";
import { ApiResponse, UserProfile } from "../models";
import { showFailurePopup } from "../ui-state/ui.actions";


export class ProfileEffect{
    private actions$ = inject(Actions);
    private profileService = inject(ProfileService);

    fetchProfileData$ = createEffect(() => 
        this.actions$.pipe(
            ofType(profileACtions.fetchProfileData),
            mergeMap(({id}) => 
                this.profileService.getUserProfileData(id).pipe(
                    map((res : ApiResponse<UserProfile>) => 
                        profileACtions.profileDataFetchedSuccess({data : res.data})
                    ),
                    catchError((err) => of(showFailurePopup({errors : [err.message]})))
                )
            )
        )
    )
}