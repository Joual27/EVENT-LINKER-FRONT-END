import { Component, Input, Output, EventEmitter, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { OrganizerEvent } from "../../models/organizer.models"
import { Store } from "@ngrx/store"

@Component({
  selector: "app-event-item",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./event-item.component.html",
})
export class EventItemComponent {
  @Input() event!: OrganizerEvent
  @Output() edit = new EventEmitter<void>()
  @Output() delete = new EventEmitter<string>()
  

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

  onEdit(): void {
    this.edit.emit()
  }

  onDelete(): void {
    this.delete.emit(this.event.id);
  }
}

