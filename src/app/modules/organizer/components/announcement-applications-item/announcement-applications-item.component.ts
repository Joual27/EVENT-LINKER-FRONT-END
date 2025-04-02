import { Component, Input } from '@angular/core';
import { Application } from '../../../worker/models/worker.models';

@Component({
  selector: 'app-announcement-applications-item',
  imports: [],
  templateUrl: './announcement-applications-item.component.html',
  styleUrl: './announcement-applications-item.component.css'
})
export class AnnouncementApplicationsItemComponent {
  @Input() application !: Application;
  formatDate(date: Date): string {
    if (!date) return ""

    const dateObj = new Date(date)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - dateObj.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      return "Applied yesterday"
    } else if (diffDays < 7) {
      return `Applied ${diffDays} days ago`
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return `Applied ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
    } else {
      return `Applied on ${dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`
    }
  }
}
