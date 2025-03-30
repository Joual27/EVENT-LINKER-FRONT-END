import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Announcement } from '../../models/organizer.models';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-announcement-item',
  imports: [RouterLink , CommonModule],
  templateUrl: './announcement-item.component.html',
  styleUrl: './announcement-item.component.css'
})
export class AnnouncementItemComponent {
  @Input() announcement!: Announcement;
  @Output() edit = new EventEmitter<void>()
  @Output() delete = new EventEmitter<void>()

  get statusClass(): string {
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
      month: "short",
      day: "numeric",
    })
  }

  onEdit(): void {
    this.edit.emit()
  }

  onDelete(): void {
    this.delete.emit()
  }
}
