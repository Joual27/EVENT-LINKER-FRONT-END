import { Component, inject, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute, Router, RouterModule } from "@angular/router"
import { HttpClient } from "@angular/common/http"
import { ConfirmationModalComponent } from "../../../../shared/ui/confirmation-modal/confirmation-modal.component"
import { Announcement, AnnouncementStatus } from "../../models/organizer.models"

@Component({
  selector: "app-announcement-detail",
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmationModalComponent],
  templateUrl: "./announcement-detail.component.html",
})
export class AnnouncementDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  announcement: Announcement | null = null
  isLoading = true
  error: string | null = null
  showConfirmationModal = false
  


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id")
      if (id) {
        this.fetchAnnouncement(Number(id))
      }
    })
  }

  fetchAnnouncement(id: number): void {
    this.isLoading = true
    this.http.get<Announcement>(`/api/announcements/${id}`).subscribe({
      next: (data) => {
        this.announcement = data
        this.isLoading = false
      },
      error: (err) => {
        console.error("Error fetching announcement:", err)
        this.error = "Failed to load announcement. It may have been deleted or you don't have permission to view it."
        this.isLoading = false
      },
    })
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
          // Handle error (show message to user)
          this.showConfirmationModal = false
        },
      })
    }
  }

  getStatusClass(): string {
    if (!this.announcement) return ""

    switch (this.announcement.status) {
      case AnnouncementStatus.ACTIVE:
        return "bg-green-900/30 text-green-400 border-green-700"
      case AnnouncementStatus.PENDING:
        return "bg-gray-900/30 text-gray-400 border-gray-700"
      case AnnouncementStatus.EXPIRED:
        return "bg-blue-900/30 text-blue-400 border-blue-700"
      case AnnouncementStatus.REFUSED:
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

