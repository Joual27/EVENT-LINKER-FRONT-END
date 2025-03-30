import { Component, inject, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute, Router, RouterModule } from "@angular/router"
import { HttpClient } from "@angular/common/http"
import { ConfirmationModalComponent } from "../../../../shared/ui/confirmation-modal/confirmation-modal.component"
import { Announcement } from "../../models/organizer.models"
import { ApiResponse } from "../../../../shared/models"
import { Store } from "@ngrx/store"
import { appIsLoading, stopLoading } from "../../../../shared/ui-state/ui.actions"

@Component({
  selector: "app-announcement-detail",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./announcement-detail.component.html",
})
export class AnnouncementDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private router = inject(Router);
  private http = inject(HttpClient);
  announcement: Announcement | null = null
  isLoading = true
  error: string | null = null
  showConfirmationModal = false
  activeTab: "details" | "applications" = "details"

  

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id")
      if (id) {
        this.fetchAnnouncement(Number(id))
      }
    })

    this.store.dispatch(appIsLoading());
    setTimeout(() => {
      this.store.dispatch(stopLoading())
    } , 1000)
    
  }


  fetchAnnouncement(id: number): void {
    this.isLoading = true
    this.http.get<ApiResponse<Announcement>>(`/api/organizer/announcements/${id}`).subscribe({
      next: (res) => {
        this.announcement = res.data
        this.isLoading = false
      },
      error: (err) => {
        console.error("Error fetching announcement:", err)
        this.error = "Failed to load announcement. It may have been deleted or you don't have permission to view it."
        this.isLoading = false
      },
    })
  }

  setActiveTab(tab: "details" | "applications"): void {
    this.activeTab = tab
  }

  confirmDelete(): void {
    this.showConfirmationModal = true
  }

  cancelDelete(): void {
    this.showConfirmationModal = false
  }

  deleteAnnouncement(): void {
    if (this.announcement) {
      this.http.delete(`/api/announcements/${this.announcement.id}`).subscribe({
        next: () => {
          this.router.navigate(["/announcements"])
        },
        error: (err) => {
          console.error("Error deleting announcement:", err)
          this.showConfirmationModal = false
        },
      })
    }
  }

  getStatusClass(): string {
    if (!this.announcement) return ""

    switch (this.announcement.status) {
      case "ACTIVE":
        return "bg-green-900/30 text-green-400 border-green-700"
      case "PENDING":
        return "bg-gray-900/30 text-gray-400 border-gray-700"
      case "EXPIRED":
        return "bg-blue-900/30 text-blue-400 border-blue-700"
      case "REFUSED":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-700"
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
}

