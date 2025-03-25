import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { EventItemComponent } from "../event-item/event-item.component"
import { OrganizerEvent } from "../../models/organizer.models"

@Component({
  selector: "app-event-list",
  standalone: true,
  imports: [CommonModule, EventItemComponent],
  templateUrl: "./event-list.component.html",
})
export class EventListComponent {
  @Input() events : OrganizerEvent[] = [];
  @Output() editEvent = new EventEmitter<OrganizerEvent>()
  @Output() deleteEvent = new EventEmitter<string>()

  onEditEvent(event: OrganizerEvent): void {
    this.editEvent.emit(event)
  }

  onDeleteEvent(id: string): void {
    this.deleteEvent.emit(id)
  }
}
  