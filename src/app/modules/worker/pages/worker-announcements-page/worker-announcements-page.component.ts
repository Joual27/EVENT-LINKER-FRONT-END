import { Component, inject, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { WorkerAnnouncementListComponent } from "../../components/worker-announcement-list/worker-announcement-list.component"
import { Announcement } from "../../../organizer/models/organizer.models"
import { ApplicationPopupComponent } from "../../components/application-popup/application-popup.component"
import { ApplicationRequest } from "../../models/worker.models"
import { PageTitleComponent } from "../../../../shared/ui/page-title/page-title.component";
import { PaginationResponse } from "../../../../shared/models"
import { Observable } from "rxjs"
import { Store } from "@ngrx/store"
import { selectAllAnnouncements } from "../../state/worker.selectors"
import { fetchAllAnnouncements, filterAnnouncements } from "../../state/worker.actions"
import { appIsLoading, stopLoading } from "../../../../shared/ui-state/ui.actions"



@Component({
  selector: "app-worker-announcements-page",
  standalone: true,
  imports: [CommonModule, FormsModule, WorkerAnnouncementListComponent, ApplicationPopupComponent, PageTitleComponent],
  templateUrl: "./worker-announcements-page.component.html",
  styleUrls: ["./worker-announcements-page.component.css"],
})
export class WorkerAnnouncementsPageComponent implements OnInit{
  announcements$ !: Observable<PaginationResponse<Announcement[]> | null>;
  private store = inject(Store);
  searchTerm = ""
  isLoading = false
  currentPage = 0
  showApplicationPopup = false
  selectedAnnouncement: Announcement | null = null

  constructor() {
    this.announcements$ = this.store.select(selectAllAnnouncements);
  }

  ngOnInit(): void {
      this.store.dispatch(fetchAllAnnouncements({page : 0}))
  }


  onSearch(term : string): void {
    this.currentPage = 0;
    this.store.dispatch(appIsLoading());
    this.store.dispatch(filterAnnouncements({page : this.currentPage , term : term}));
    this.stopLoadingPage()
  }

  private stopLoadingPage() : void {
    setTimeout(() => {
      this.store.dispatch(stopLoading());
    } , 900)
  }

  
  onPrevious() : void {
    this.currentPage = this.currentPage - 1;
    this.store.dispatch(appIsLoading());
    this.store.dispatch(fetchAllAnnouncements({page : this.currentPage}))
    this.stopLoadingPage()
  }

  onNext() : void {
    this.currentPage = this.currentPage + 1;
    this.store.dispatch(appIsLoading());
    this.store.dispatch(fetchAllAnnouncements({page : this.currentPage}))
    this.stopLoadingPage()
  }


  onApply(announcement: Announcement): void {
    this.selectedAnnouncement = announcement
    this.showApplicationPopup = true
  }

  onClosePopup(): void {
    this.showApplicationPopup = false
    this.selectedAnnouncement = null
  }

  onSubmitApplication(application: ApplicationRequest): void {
    
    this.showApplicationPopup = false
    this.selectedAnnouncement = null
  }
}

