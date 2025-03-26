import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Announcement } from '../../models/organizer.models';
import { AnnouncementItemComponent } from '../announcement-item/announcement-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-announcement-list',
  imports: [AnnouncementItemComponent , CommonModule],
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.css'
})
export class AnnouncementListComponent {
  @Input() announcements: Announcement[] = []
  @Output() edit = new EventEmitter<Announcement>()
  @Output() delete = new EventEmitter<number>()

  sortField: keyof Announcement = "createdAt"
  sortDirection: "asc" | "desc" = "desc"
  searchTerm = ""

  get sortedAnnouncements(): Announcement[] {
    let filtered = this.announcements

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.description.toLowerCase().includes(term) ||
          a.event.title.toLowerCase().includes(term),
      )
    }

    // Apply sorting
    return [...filtered].sort((a, b) => {
      let comparison = 0

      if (this.sortField === "createdAt") {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (this.sortField === "title" || this.sortField === "status") {
        comparison = String(a[this.sortField]).localeCompare(String(b[this.sortField]))
      } else if (this.sortField === "event") {
        comparison = a.event.title.localeCompare(b.event.title)
      }

      return this.sortDirection === "asc" ? comparison : -comparison
    })
  }

  onSort(field: keyof Announcement): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc"
    } else {
      this.sortField = field
      this.sortDirection = "asc"
    }
  }

  onEdit(announcement: Announcement): void {
    this.edit.emit(announcement)
  }

  onDelete(id: number): void {
    this.delete.emit(id)
  }
}

