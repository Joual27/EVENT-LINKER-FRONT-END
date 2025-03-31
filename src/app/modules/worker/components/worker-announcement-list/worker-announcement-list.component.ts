import { Component, EventEmitter, Input, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { WorkerAnnouncementItemComponent } from "../worker-announcement-item/worker-announcement-item.component"
import { Announcement } from "../../../organizer/models/organizer.models"

@Component({
  selector: "app-worker-announcement-list",
  standalone: true,
  imports: [CommonModule, WorkerAnnouncementItemComponent],
  templateUrl: "./worker-announcement-list.component.html",
  styleUrls: ["./worker-announcement-list.component.css"],
})
export class WorkerAnnouncementListComponent {
  @Input() announcements: Announcement[] = []
  @Input() isLoading = false
  @Output() apply = new EventEmitter<Announcement>()

  onApply(announcement: Announcement): void {
    this.apply.emit(announcement)
  }
}

