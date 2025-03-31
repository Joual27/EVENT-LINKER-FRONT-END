import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as workerActions from "./worker.actions";
import { WorkerService } from "../services/worker.service";
import { catchError, concatMap, map, of, switchMap } from "rxjs";
import { showFailurePopup, showSuccessPopup, stopLoading } from "../../../shared/ui-state/ui.actions";




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

    filterAnnouncements$ = createEffect(() => 
        this.actions$.pipe(
          ofType(workerActions.filterAnnouncements),
          switchMap(({ page , term }) => 
            this.workerService.filterAnnouncements(page , term).pipe(
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

    apply$ = createEffect(() => 
        this.actions$.pipe(
          ofType(workerActions.submitApplication),
          switchMap(({ data }) => {
            return this.workerService.apply(data).pipe(
              concatMap((res) => [
                showSuccessPopup({ message: `Application ${res.data.id} Submitted Successfully!` })
              ]),
              catchError((err) => of(showFailurePopup({ errors: [err] }), stopLoading()))
            );
          })
        )
      );
  
}