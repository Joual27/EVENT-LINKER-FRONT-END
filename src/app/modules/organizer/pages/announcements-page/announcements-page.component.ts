import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { AnnouncementListComponent } from "../../components/announcement-list/announcement-list.component"
import { AnnouncementFormPopupComponent } from "../../components/announcement-form-popup/announcement-form-popup.component"
import { ConfirmationModalComponent } from "../../../../shared/ui/confirmation-modal/confirmation-modal.component"
import { Announcement, AnnouncementStatus, CreateAnnouncementDTO, OrganizerEvent } from "../../models/organizer.models"
import { PageTitleComponent } from "../../../../shared/ui/page-title/page-title.component";

@Component({
  selector: "app-announcements-page",
  standalone: true,
  imports: [CommonModule, AnnouncementListComponent, AnnouncementFormPopupComponent, ConfirmationModalComponent, PageTitleComponent],
  templateUrl: "./announcements-page.component.html",
})
export class AnnouncementsPageComponent {
  announcements: Announcement[] = [
    {
      id: 1,
      title: "Call for Speakers",
      description:
        "We are looking for experienced speakers for our upcoming tech conference. Submit your proposals now!",
      createdAt: "2025-03-15T10:30:00",
      status: AnnouncementStatus.ACTIVE,
      event: {
        id: "1",
        title: "GITEX Global",
        location: "Dubai World Trade Centre",
        date: "2025-04-17T19:30:00",
        description : "kdjd" ,
      imgUrl : "djio"
      },
      announcementSkills: [
        { id: 1, name: "Public Speaking", level: "ADVANCED" },
        { id: 2, name: "Technology", level: "EXPERT" },
      ],
    },
    {
      id: 2,
      title: "Volunteer Registration Open",
      description:
        "We need volunteers to help with our upcoming event. Register now to be part of this amazing experience!",
      createdAt: "2025-03-10T14:45:00",
      status: AnnouncementStatus.ACTIVE,
      event: {
        id: "2",
        title: "Web Summit",
        location: "Lisbon, Portugal",
        date: "2025-05-22T10:00:00",
        description : "kdjd" ,
      imgUrl : "djio"
      },
      announcementSkills: [
        { id: 3, name: "Customer Service", level: "BEGINNER" },
        { id: 4, name: "Communication", level: "INTERMEDIATE" },
      ],
    },
    {
      id: 3,
      title: "Early Bird Tickets Available",
      description: "Get your early bird tickets now at a discounted price. Limited availability!",
      createdAt: "2025-03-05T09:15:00",
      status: AnnouncementStatus.PENDING,
      event: {
        id: "1",
        title: "GITEX Global",
        location: "Dubai World Trade Centre",
        date: "2025-04-17T19:30:00",
        description : "kdjd" ,
      imgUrl : "djio"
      },
      announcementSkills: [],
    },
    {
      id: 4,
      title: "New Workshop Added",
      description: "We have added a new AI workshop to our schedule. Limited seats available!",
      createdAt: "2025-03-01T16:20:00",
      status: AnnouncementStatus.REFUSED,
      event: {
        id: "3",
        title: "CES",
        location: "Las Vegas, USA",
        date: "2026-01-05T09:00:00",
        description : "kdjd" ,
      imgUrl : "djio"
      },
      announcementSkills: [{ id: 5, name: "Artificial Intelligence", level: "INTERMEDIATE" }],
    },
  ]

  showFormPopup = false
  showConfirmationModal = false
  currentAnnouncement: Announcement | null = null
  announcementToDelete: number | null = null
  isLoading = false
  error: string | null = null

  openCreatePopup(): void {
    this.currentAnnouncement = null
    this.showFormPopup = true
  }

  openEditPopup(announcement: Announcement): void {
    this.currentAnnouncement = { ...announcement }
    this.showFormPopup = true
  }

  closePopup(): void {
    this.showFormPopup = false
  }

  confirmDelete(id: number): void {
    this.announcementToDelete = id
    this.showConfirmationModal = true
  }

  cancelDelete(): void {
    this.announcementToDelete = null
    this.showConfirmationModal = false
  }

  saveAnnouncement(data: CreateAnnouncementDTO): void {
    if (this.currentAnnouncement) {
      const updatedAnnouncement: Announcement = {
        ...this.currentAnnouncement,
        title: data.title,
        description: data.description,
        event: {
          ...this.currentAnnouncement.event,
          id: data.eventId,
        },
        announcementSkills: data.skills.map((skill) => {
          return {
            id: skill.id,
            name: this.getSkillNameById(skill.id),
            level: skill.level,
          }
        }),
      }

      const index = this.announcements.findIndex((a) => a.id === this.currentAnnouncement!.id)
      if (index !== -1) {
        this.announcements[index] = updatedAnnouncement
      }
    } else {
      // Create new announcement
      const newId = Math.max(...this.announcements.map((a) => a.id)) + 1
      const eventObj = this.getEventById(data.eventId)

      const newAnnouncement: Announcement = {
        id: newId,
        title: data.title,
        description: data.description,
        createdAt: new Date().toISOString(),
        status: AnnouncementStatus.ACTIVE,
        event: eventObj,
        announcementSkills: data.skills.map((skill) => {
          return {
            id: skill.id,
            name: this.getSkillNameById(skill.id),
            level: skill.level,
          }
        }),
      }

      this.announcements = [...this.announcements, newAnnouncement]
    }

    this.closePopup()
  }

  deleteAnnouncement(): void {
    if (this.announcementToDelete) {
      this.announcements = this.announcements.filter((a) => a.id !== this.announcementToDelete)
      this.cancelDelete()
    }
  }


  private getEventById(id: string): OrganizerEvent {
    const events = [
      {
        id: "1",
        title: "GITEX Global",
        location: "Dubai World Trade Centre",
        date: "2025-04-17T19:30:00",
        description : "kdjd" ,
        imgUrl : "djio"
      },
      {
        id: "2",
        title: "Web Summit",
        location: "Lisbon, Portugal",
        date: "2025-05-22T10:00:00",
        description : "kdjd" ,
      imgUrl : "djio"
      },
      {
        id: "3",
        title: "CES",
        location: "Las Vegas, USA",
        date: "2026-01-05T09:00:00",
        description : "kdjd" ,
        imgUrl : "djio"
      },
    ]

    return events.find((e) => e.id === id) || events[0]
  }

  private getSkillNameById(id: number): string {
    const skills = [
      { id: 1, name: "Public Speaking" },
      { id: 2, name: "Technology" },
      { id: 3, name: "Customer Service" },
      { id: 4, name: "Communication" },
      { id: 5, name: "Artificial Intelligence" },
      { id: 6, name: "Project Management" },
      { id: 7, name: "Marketing" },
      { id: 8, name: "Design" },
    ]

    const skill = skills.find((s) => s.id === id)
    return skill ? skill.name : "Unknown Skill"
  }
}


