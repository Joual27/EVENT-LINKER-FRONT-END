import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DmsService } from "../../services/dms.service";
import * as dmsActions from "./DMs.actions"
import { catchError, map, mergeMap, of } from "rxjs";
import { ApiResponse, DmResponseDTO, DmWithLastMessage } from "../../models";
import { showFailurePopup } from "../../ui-state/ui.actions";



export class DmsEffect {
    private actions$ = inject(Actions);
    private dmsService = inject(DmsService);

    fetchReviewsData$ = createEffect(() =>
        this.actions$.pipe(
          ofType(dmsActions.fetchUserDMs),
          mergeMap(() =>
            this.dmsService.fetchUserDMs().pipe(
              map((response: ApiResponse<DmWithLastMessage[]>) =>
                dmsActions.userDMsFetchedSuccessfully({dms : response.data })
              ),
              catchError((err) => of(showFailurePopup({ errors: [err.message] })))
            )
          )
        ) 
      );
}