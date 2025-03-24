import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

import { OrganizerEvent } from "../../models/organizer.models"
import { EventListComponent } from "../../components/event-list/event-list.component"
import { EventFormPopupComponent } from "../../components/event-form-popup/event-form-popup.component"
import { PageTitleComponent } from "../../../../shared/ui/page-title/page-title.component";

@Component({
  selector: "app-events-page",
  standalone: true,
  imports: [CommonModule, EventListComponent, EventFormPopupComponent, PageTitleComponent],
  templateUrl: "./events-page.component.html",
})
export class EventsPageComponent {
  events: OrganizerEvent[] = [
    {
      id: "1",
      title: "GITEX Global",
      description:
        "GITEX GLOBAL is one of the world's largest tech & startup events, connecting technology leaders, enterprises, and startups.",
      date: "2025-04-17T19:30:00",
      location: "Dubai World Trade Centre",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xS1PLfhCWab6K86S0jZBkZYYXr6MUV.png",
      organizer: "Dubai World Trade Centre",
    },
    {
      id: "2",
      title: "Web Summit",
      description: "Web Summit brings together the people and companies redefining the global tech industry.",
      date: "2025-05-22T10:00:00",
      location: "Lisbon, Portugal",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xS1PLfhCWab6K86S0jZBkZYYXr6MUV.png",
      organizer: "Web Summit",
    },
    {
      id: "3",
      title: "CES",
      description:
        "CES is the most influential tech event in the world — the proving ground for breakthrough technologies and global innovators.",
      date: "2026-01-05T09:00:00",
      location: "Las Vegas, USA",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xS1PLfhCWab6K86S0jZBkZYYXr6MUV.png",
      organizer: "Consumer Technology Association",
    },
  ]
  showPopup = false
  currentEvent: OrganizerEvent | null = null

  openCreatePopup(): void {
    this.currentEvent = null
    this.showPopup = true
  }

  openEditPopup(event: OrganizerEvent): void {
    this.currentEvent = { ...event }
    this.showPopup = true
  }

  closePopup(): void {
    this.showPopup = false
  }

  saveEvent(event: OrganizerEvent): void {
    if (this.currentEvent) {
      // Update existing event
      const index = this.events.findIndex((e) => e.id === this.currentEvent!.id)
      if (index !== -1) {
        this.events[index] = { ...event, id: this.currentEvent.id }
      }
    } else {
      // Create new event
      const newEvent = {
        ...event,
        id: (this.events.length + 1).toString(),
      }
      this.events = [...this.events, newEvent]
    }
    this.closePopup()
  }

  deleteEvent(id: string): void {
    this.events = this.events.filter((event) => event.id !== id)
  }
}

