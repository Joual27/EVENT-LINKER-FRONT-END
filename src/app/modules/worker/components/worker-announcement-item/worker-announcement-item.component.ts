import { Component, EventEmitter, Input, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { Announcement } from "../../../organizer/models/organizer.models"

@Component({
  selector: "app-worker-announcement-item",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./worker-announcement-item.component.html",
  styleUrls: ["./worker-announcement-item.component.css"],
})
export class WorkerAnnouncementItemComponent {
  @Input() announcement!: Announcement
  @Output() apply = new EventEmitter<void>()


  onApply(): void {
    this.apply.emit()
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      return "Posted yesterday"
    } else if (diffDays < 7) {
      return `Posted ${diffDays} days ago`
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return `Posted ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
    } else {
      return `Posted on ${date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`
    }
  }
}
