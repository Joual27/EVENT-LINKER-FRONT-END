import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { WorkerAnnouncementListComponent } from "../../components/worker-announcement-list/worker-announcement-list.component"
import { Announcement } from "../../../organizer/models/organizer.models"
import { ApplicationPopupComponent } from "../../components/application-popup/application-popup.component"
import { ApplicationRequest } from "../../models/worker.models"
import { PageTitleComponent } from "../../../../shared/ui/page-title/page-title.component";

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "Senior Web Developer Needed for Conference Website",
    description:
      "We are looking for an experienced web developer to build and maintain our conference website. The ideal candidate should have experience with React, Node.js, and database management.",
    createdAt: "2025-03-15T10:30:00",
    status: "ACTIVE",
    event: {
      id: "1",
      description : ",dklf",
      title: "GITEX Global",
      location: "Dubai World Trade Centre",
      date: "2025-04-17T19:30:00",
      imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xS1PLfhCWab6K86S0jZBkZYYXr6MUV.png",
    },
    announcementSkills: [
      {
        skill: {
          id: 1,
          name: "React",
        },
        acceptsNonOrganizations: true,
      },
      {
        skill: {
          id: 2,
          name: "Node.js",
        },
        acceptsNonOrganizations: true,
      },
      {
        skill: {
          id: 3,
          name: "Database Management",
        },
        acceptsNonOrganizations: true,
      },
    ],
  },
  {
    id: 2,
    title: "Event Photographer for Tech Summit",
    description:
      "We need a professional photographer to capture our upcoming tech summit. The photographer will be responsible for taking high-quality photos of speakers, attendees, and the venue.",
    createdAt: "2025-03-10T14:45:00",
    status: "ACTIVE",
    event: {
      id: "1",
      description : ",dklf",
      title: "Web Summit",
      location: "Lisbon, Portugal",
      date: "2025-05-22T10:00:00",
      imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xS1PLfhCWab6K86S0jZBkZYYXr6MUV.png",
    },
    announcementSkills: [
      {
        skill: {
          id: 4,
          name: "Photography",
        },
        acceptsNonOrganizations: true,
      },
      {
        skill: {
          id: 5,
          name: "Photo Editing",
        },
        acceptsNonOrganizations: true,
      },
    ],
  },
  {
    id: 3,
    title: "Social Media Manager for CES",
    description:
      "We are seeking a social media manager to handle our social media accounts during CES. The manager will be responsible for creating and posting content, engaging with followers, and analyzing performance.",
    createdAt: "2025-03-05T09:15:00",
    status: "ACTIVE",
    event: {
      id: "1",
      title : "foper",
      description : ",dklf",
      location: "Las Vegas, USA",
      date: "2026-01-05T09:00:00",
      imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xS1PLfhCWab6K86S0jZBkZYYXr6MUV.png",
    },
    announcementSkills: [
      {
        skill: {
          id: 6,
          name: "Social Media Marketing",
        },
        acceptsNonOrganizations: true,
      },
      {
        skill: {
          id: 7,
          name: "Content Creation",
        },
        acceptsNonOrganizations: true,
      },
      {
        skill: {
          id: 8,
          name: "Analytics",
        },
        acceptsNonOrganizations: false,
      },
    ],
  },
  {
    id: 4,
    title: "Graphic Designer for Event Materials",
    description:
      "We need a graphic designer to create promotional materials for our upcoming event. This includes posters, banners, social media graphics, and digital assets.",
    createdAt: "2025-03-01T16:20:00",
    status: "ACTIVE",
    event: {
      id: "1",
      description : ",dklf",
      title: "GITEX Global",
      location: "Dubai World Trade Centre",
      date: "2025-04-17T19:30:00",
      imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xS1PLfhCWab6K86S0jZBkZYYXr6MUV.png",
    },
    announcementSkills: [
      {
        skill: {
          id: 9,
          name: "Graphic Design",
        },
        acceptsNonOrganizations: true,
      },
      {
        skill: {
          id: 10,
          name: "Adobe Creative Suite",
        },
        acceptsNonOrganizations: true,
      },
    ],
  },
  {
    id: 5,
    title: "Mobile App Developer for Event App",
    description:
      "We are looking for a mobile app developer to create an app for our event. The app should include features like schedule viewing, speaker information, and networking capabilities.",
    createdAt: "2025-02-28T11:30:00",
    status: "ACTIVE",
    event: {
      id: "1",
      description : ",dklf",
      title: "Web Summit",
      location: "Lisbon, Portugal",
      date: "2025-05-22T10:00:00",
      imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xS1PLfhCWab6K86S0jZBkZYYXr6MUV.png",
    },
    announcementSkills: [
      {
        skill: {
          id: 11,
          name: "iOS Development",
        },
        acceptsNonOrganizations: true,
      },
      {
        skill: {
          id: 12,
          name: "Android Development",
        },
        acceptsNonOrganizations: true,
      },
      {
        skill: {
          id: 13,
          name: "UI/UX Design",
        },
        acceptsNonOrganizations: true,
      },
    ],
  },
  {
    id: 6,
    title: "Content Writer for Tech Blog",
    description:
      "We need a content writer to create blog posts about our upcoming tech conference. The writer should have knowledge of technology trends and be able to write engaging content.",
    createdAt: "2025-02-25T14:00:00",
    status: "ACTIVE",
    event: {
      id: "1",
      description : ",dklf",
      title: "CES",
      location: "Las Vegas, USA",
      date: "2026-01-05T09:00:00",
      imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xS1PLfhCWab6K86S0jZBkZYYXr6MUV.png",
    },
    announcementSkills: [
      {
        skill: {
          id: 14,
          name: "Content Writing",
        },
        acceptsNonOrganizations: true,
      },
      {
        skill: {
          id: 15,
          name: "SEO",
        },
        acceptsNonOrganizations: false,
      },
      {
        skill: {
          id: 16,
          name: "Technology Knowledge",
        },
        acceptsNonOrganizations: true,
      },
    ],
  },
  {
    id: 7,
    title: "Video Editor for Conference Highlights",
    description:
      "We are seeking a video editor to create highlight reels of our conference. The editor will be responsible for editing footage, adding effects, and creating engaging videos.",
    createdAt: "2025-02-20T09:45:00",
    status: "ACTIVE",
    event: {
      id: "1",
      description : ",dklf",
      title: "GITEX Global",
      location: "Dubai World Trade Centre",
      date: "2025-04-17T19:30:00",
      imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xS1PLfhCWab6K86S0jZBkZYYXr6MUV.png",
    },
    announcementSkills: [
      {
        skill: {
          id: 17,
          name: "Video Editing",
        },
        acceptsNonOrganizations: true,
      },
      {
        skill: {
          id: 18,
          name: "Adobe Premiere Pro",
        },
        acceptsNonOrganizations: true,
      },
      {
        skill: {
          id: 19,
          name: "After Effects",
        },
        acceptsNonOrganizations: true,
      },
    ],
  },
  {
    id: 8,
    title: "Event Coordinator Assistant",
    description:
      "We need an assistant to help our event coordinator with planning and executing our tech conference. Responsibilities include vendor coordination, schedule management, and general administrative tasks.",
    createdAt: "2025-02-15T13:20:00",
    status: "ACTIVE",
    event: {
      id: "1",
      description : ",dklf",
      title: "Web Summit",
      location: "Lisbon, Portugal",
      date: "2025-05-22T10:00:00",
      imgUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xS1PLfhCWab6K86S0jZBkZYYXr6MUV.png",
    },
    announcementSkills: [
      {
        skill: {
          id: 20,
          name: "Event Planning",
        },
        acceptsNonOrganizations: true,
      },
      {
        skill: {
          id: 21,
          name: "Organization",
        },
        acceptsNonOrganizations: true,
      },
      {
        skill: {
          id: 22,
          name: "Communication",
        },
        acceptsNonOrganizations: true,
      },
    ],
  },
]

@Component({
  selector: "app-worker-announcements-page",
  standalone: true,
  imports: [CommonModule, FormsModule, WorkerAnnouncementListComponent, ApplicationPopupComponent, PageTitleComponent],
  templateUrl: "./worker-announcements-page.component.html",
  styleUrls: ["./worker-announcements-page.component.css"],
})
export class WorkerAnnouncementsPageComponent {
  announcements: Announcement[] = MOCK_ANNOUNCEMENTS
  filteredAnnouncements: Announcement[] = []
  searchTerm = ""
  isLoading = false
  currentPage = 1
  itemsPerPage = 5
  totalPages = 0
  showApplicationPopup = false
  selectedAnnouncement: Announcement | null = null

  constructor() {
    this.applyFilters()
  }

  applyFilters(): void {
    this.isLoading = true

    // Simulate API call delay
    setTimeout(() => {
      // Filter by search term
      let filtered = this.announcements
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase()
        filtered = filtered.filter(
          (a) =>
            a.title.toLowerCase().includes(term) ||
            a.description.toLowerCase().includes(term) ||
            a.event.title.toLowerCase().includes(term) ||
            a.announcementSkills.some((s) => s.skill.name.toLowerCase().includes(term)),
        )
      }

      // Calculate total pages
      this.totalPages = Math.ceil(filtered.length / this.itemsPerPage)

      // Paginate results
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      this.filteredAnnouncements = filtered.slice(startIndex, startIndex + this.itemsPerPage)

      this.isLoading = false
    }, 500)
  }

  onSearch(): void {
    this.currentPage = 1
    this.applyFilters()
  }

  onPageChange(page: number): void {
    this.currentPage = page
    this.applyFilters()
  }

  onApply(announcement: Announcement): void {
    this.selectedAnnouncement = announcement
    this.showApplicationPopup = true
  }

  onClosePopup(): void {
    this.showApplicationPopup = false
    this.selectedAnnouncement = null
  }

  onSubmitApplication(application: ApplicationRequest): void {
    console.log("Application submitted:", application)

    // Here you would normally send the application to your API
    // For demo purposes, we'll just close the popup
    this.showApplicationPopup = false
    this.selectedAnnouncement = null

    // Show success message (in a real app, you'd use a toast or notification service)
    alert("Your application has been submitted successfully!")
  }
}

