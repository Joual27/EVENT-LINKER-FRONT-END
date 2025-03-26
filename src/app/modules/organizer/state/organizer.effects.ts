import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as organizerActions from "./organizer.actions"
import { catchError, concatMap, map, of, switchMap } from "rxjs";
import { OrganizerEventService } from "../services/organizer-event.service";
import { appIsLoading, showFailurePopup, showSuccessPopup, stopLoading } from "../../../shared/ui-state/ui.actions";



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



    createEvent$ = createEffect(() => 
      this.actions$.pipe(
        ofType(organizerActions.createEvent),
        switchMap(({ data }) => {
          return this.organizerEventsService.createEvent(data).pipe(
            concatMap((res) => [
              showSuccessPopup({ message: `Event ${res.data.id} Created Successfully!` })
            ]),
            catchError((err) => of(showFailurePopup({ errors: [err] }), stopLoading()))
          );
        })
      )
    );

    updateEvent$ = createEffect(() => 
      this.actions$.pipe(
        ofType(organizerActions.updateEvent),
        switchMap(({ data }) => {
          return this.organizerEventsService.updateEvent(data).pipe(
            concatMap((res) => [
              organizerActions.fetchEvents({page : 0}),
              showSuccessPopup({ message: `Event ${res.data.id} Updated Successfully!` })
            ]),
            catchError((err) => of(showFailurePopup({ errors: [err] }), stopLoading()))
          );
        })
      )
    );

    deleteEvent$ = createEffect(() => 
      this.actions$.pipe(
        ofType(organizerActions.deleteEvent),
        switchMap(({ id }) => {
          return this.organizerEventsService.deleteEvent(id).pipe(
            concatMap((res) => [
              organizerActions.fetchEvents({page : 0}),
              showSuccessPopup({ message: `Event ${res.data.id} Deleted Successfully!` })
            ]),
            catchError((err) => of(showFailurePopup({ errors: [err] }), stopLoading()))
          );
        })
      )
    );
}