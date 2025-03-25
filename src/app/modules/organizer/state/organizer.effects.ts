import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as organizerActions from "./organizer.actions"
import { catchError, map, of, switchMap } from "rxjs";
import { OrganizerEventService } from "../services/organizer-event.service";
import { showFailurePopup } from "../../../shared/ui-state/ui.actions";



export class OrganizerEffect {
    private actions$ = inject(Actions);
    
    private organizerEventsService = inject(OrganizerEventService);

    loadEvents$ = createEffect(() =>
        this.actions$.pipe(
          ofType(organizerActions.fetchEvents),
          switchMap(({ page }) => 
            this.organizerEventsService.getEvents(page).pipe(
              map((res) => organizerActions.EventsFetchedSuccessfully({events : res.data})),
              catchError((err) => of(showFailurePopup({ errors: [err.message] })))
            )
          )
        )
    );
}