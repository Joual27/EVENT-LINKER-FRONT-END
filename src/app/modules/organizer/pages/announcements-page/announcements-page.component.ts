import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnnouncementListComponent } from "../../components/announcement-list/announcement-list.component";
import { AnnouncementFormPopupComponent } from "../../components/announcement-form-popup/announcement-form-popup.component";
import { PageTitleComponent } from "../../../../shared/ui/page-title/page-title.component";
import { Store } from "@ngrx/store";
import { createAnnouncement, deleteAnnouncement, fetchAnnouncements, updateAnnouncement } from "../../state/organizer.actions";
import { Observable } from "rxjs";
import { PaginationResponse } from "../../../../shared/models";
import { Announcement, CreateAndUpdateAnnouncementDTO } from "../../models/organizer.models";
import { selectOrganizerAnnouncements } from "../../state/organizer.selectors";
import { appIsLoading, stopLoading } from "../../../../shared/ui-state/ui.actions";
import { ConfirmationModalComponent } from "../../../../shared/ui/confirmation-modal/confirmation-modal.component";

@Component({
  selector: "app-announcements-page",
  standalone: true,
  imports: [CommonModule, AnnouncementListComponent, AnnouncementFormPopupComponent, PageTitleComponent, ConfirmationModalComponent],
  templateUrl: "./announcements-page.component.html",
})
export class AnnouncementsPageComponent implements OnInit {
  private store = inject(Store);
  announcements$: Observable<PaginationResponse<Announcement[]> | null>;
  showFormPopup = false;
  currentAnnouncement: Announcement | null = null;
  currentPage = signal<number>(0);
  shownConfirmationModal = signal<boolean>(false);
  announcementToDelete = signal<number | null>(null);

  constructor() {
    this.announcements$ = this.store.select(selectOrganizerAnnouncements);
  }

  ngOnInit(): void {
    this.store.dispatch(appIsLoading());
    this.store.dispatch(fetchAnnouncements({ page: 0 }));
    setTimeout(() => {
      this.store.dispatch(stopLoading());
    }, 900);
  }

  deleteAnnouncement(id: number): void {
    this.store.dispatch(deleteAnnouncement({ id }));
    this.hideConfirmationModal();
  }

  confirmDeletion(id: number): void {
    this.announcementToDelete.set(id);
    this.showConfirmationModal();
  }

  openCreatePopup(): void {
    this.currentAnnouncement = null;
    this.showFormPopup = true;
  }

  openEditPopup(announcement: Announcement): void {
    this.currentAnnouncement = { ...announcement };
    this.showFormPopup = true;
  }

  closePopup(): void {
    this.showFormPopup = false;
  }

  onNext(): void {
    this.currentPage.set(this.currentPage() + 1);
    this.store.dispatch(fetchAnnouncements({ page: this.currentPage() }));
  }

  onPrevious(): void {
    this.currentPage.set(this.currentPage() - 1);
    this.store.dispatch(fetchAnnouncements({ page: this.currentPage() }));
  }

  showConfirmationModal(): void {
    this.shownConfirmationModal.set(true);
  }

  hideConfirmationModal(): void {
    this.shownConfirmationModal.set(false);
    this.announcementToDelete.set(null);
  }

  saveAnnouncement(data: CreateAndUpdateAnnouncementDTO): void {
    this.store.dispatch(appIsLoading())
    if (this.currentAnnouncement) {
      data.id = this.currentAnnouncement.id;
      this.store.dispatch(updateAnnouncement({ data }));
    } else {
      this.store.dispatch(createAnnouncement({ data }));
    }
    setTimeout(() => {
      this.store.dispatch(stopLoading())
      this.closePopup();
    } , 3000)
  }
}