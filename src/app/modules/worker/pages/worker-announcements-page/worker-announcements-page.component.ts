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
import { fetchAllAnnouncements } from "../../state/worker.actions"
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

  // applyFilters(): void {
  //   this.isLoading = true


  //   setTimeout(() => {
    
  //     let filtered = this.announcements
  //     if (this.searchTerm) {
  //       const term = this.searchTerm.toLowerCase()
  //       filtered = filtered.filter(
  //         (a) =>
  //           a.title.toLowerCase().includes(term) ||
  //           a.description.toLowerCase().includes(term) ||
  //           a.event.title.toLowerCase().includes(term) ||
  //           a.announcementSkills.some((s) => s.skill.name.toLowerCase().includes(term)),
  //       )
  //     }

  //     // Calculate total pages
  //     this.totalPages = Math.ceil(filtered.length / this.itemsPerPage)

  //     // Paginate results
  //     const startIndex = (this.currentPage - 1) * this.itemsPerPage
  //     this.filteredAnnouncements = filtered.slice(startIndex, startIndex + this.itemsPerPage)

  //     this.isLoading = false
  //   }, 500)
  // }

  onSearch(): void {
    this.currentPage = 1
  }

  
  onPrevious() : void {
    this.currentPage = this.currentPage - 1;
    this.store.dispatch(appIsLoading());
    this.store.dispatch(fetchAllAnnouncements({page : this.currentPage}))
    setTimeout(() => {
      this.store.dispatch(stopLoading());
    } , 900)
  }

  onNext() : void {
    this.currentPage = this.currentPage + 1;
    this.store.dispatch(appIsLoading());
    this.store.dispatch(fetchAllAnnouncements({page : this.currentPage}))
    setTimeout(() => {
      this.store.dispatch(stopLoading());
    } , 900)
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
    console.log("Application submitted:", application)

    // Here you would normally send the application to your API
    // For demo purposes, we'll just close the popup
    this.showApplicationPopup = false
    this.selectedAnnouncement = null

    // Show success message (in a real app, you'd use a toast or notification service)
    alert("Your application has been submitted successfully!")
  }
}

