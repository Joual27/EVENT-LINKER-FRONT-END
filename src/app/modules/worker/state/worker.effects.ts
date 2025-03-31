import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as workerActions from "./worker.actions";
import { WorkerService } from "../services/worker.service";
import { catchError, map, of, switchMap } from "rxjs";
import { showFailurePopup } from "../../../shared/ui-state/ui.actions";




export class WorkerEffect {

    private actions$ = inject(Actions);

    private workerService = inject(WorkerService);

    loadAnnouncements$ = createEffect(() => 
        this.actions$.pipe(
          ofType(workerActions.fetchAllAnnouncements),
          switchMap(({ page }) => 
            this.workerService.getAllAnnouncements(page).pipe(
              map(response => 
                workerActions.AnnouncementsFetchedSuccessfully({ 
                  announcements: response.data 
                })
              ),
              catchError((err) => 
                of(showFailurePopup({ 
                  errors: [err.message || 'Failed to load announcements'] 
                }))
            )
          )
        )
    ));
  
}