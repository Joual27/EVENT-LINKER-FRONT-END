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


  onEdit(announcement: Announcement): void {
    this.edit.emit(announcement)
  }

  onDelete(id: number): void {
    this.delete.emit(id)
  }
}

