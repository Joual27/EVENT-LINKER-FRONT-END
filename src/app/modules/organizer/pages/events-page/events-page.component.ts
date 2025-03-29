import { Component, inject, OnInit, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { OrganizerEvent } from "../../models/organizer.models"
import { EventListComponent } from "../../components/event-list/event-list.component"
import { EventFormPopupComponent } from "../../components/event-form-popup/event-form-popup.component"
import { PageTitleComponent } from "../../../../shared/ui/page-title/page-title.component";
import { Store } from "@ngrx/store"
import { deleteEvent, fetchEvents } from "../../state/organizer.actions"
import { Observable } from "rxjs"
import { PaginationResponse } from "../../../../shared/models"
import { selectOrganizerEvents } from "../../state/organizer.selectors"
import { appIsLoading, stopLoading } from "../../../../shared/ui-state/ui.actions"
import { ConfirmationModalComponent } from "../../../../shared/ui/confirmation-modal/confirmation-modal.component";


@Component({
  selector: "app-events-page",
  standalone: true,
  imports: [CommonModule, EventListComponent, EventFormPopupComponent, PageTitleComponent, ConfirmationModalComponent],
  templateUrl: "./events-page.component.html",
})
export class EventsPageComponent implements OnInit{
  private store = inject(Store);
  events$ : Observable<PaginationResponse<OrganizerEvent[]> | null>;
  showPopup = false
  currentEvent: OrganizerEvent | null = null
  currentPage = signal<number>(0);
  shownConfirmationModal = signal<boolean>(false);
  eventToDelete !: string 

  constructor(){
    this.events$ = this.store.select(selectOrganizerEvents);
  }
  
  ngOnInit(): void {
    this.store.dispatch(appIsLoading());
    this.store.dispatch(fetchEvents({page : 0}));
    setTimeout(() => {
      this.store.dispatch(stopLoading());
    }, 900);
  }

  deleteEvent(id: string): void {
    this.store.dispatch(deleteEvent({ id }));
    this.hideConfirmationModal();
  }

  confirmDeletion(id: string): void {
    this.eventToDelete = id;
    this.showConfirmationModal();
  }

  openCreatePopup(): void {
    this.currentEvent = null
    this.showPopup = true
  }

  openEditPopup(event: OrganizerEvent): void {
    this.currentEvent = { ...event }
    this.showPopup = true
  }

  closePopup(): void {
    this.showPopup = false
  }

  onNext() : void { 
    this.currentPage.set(this.currentPage() +1 );
    this.store.dispatch(fetchEvents({page : this.currentPage()}));
  }

  onPrevious() : void {
    this.currentPage.set(this.currentPage() - 1 );
    this.store.dispatch(fetchEvents({page : this.currentPage()}));
  }

  showConfirmationModal() : void{
    this.shownConfirmationModal.set(true);
  } 

  hideConfirmationModal() : void {
    this.shownConfirmationModal.set(false);
  }

}

