import { Component, inject, Input } from '@angular/core';
import { Application } from '../../../worker/models/worker.models';
import { DmsService } from '../../../../shared/services/dms.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSignedInUser } from '../../../auth/state/auth.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-announcement-applications-item',
  imports: [],
  templateUrl: './announcement-applications-item.component.html',
  styleUrl: './announcement-applications-item.component.css'
})
export class AnnouncementApplicationsItemComponent {
  @Input() application !: Application;
  private dmService = inject(DmsService);
  private router = inject(Router);
  private store = inject(Store);
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

  contactApplicant(): void {
    if (!this.application.applicant?.id) {
      console.error("Cannot contact: No applicant ID found")
      return
    }

    this.store
      .select(selectSignedInUser)
      .pipe(take(1))
      .subscribe((currentUser) => {
        if (!currentUser) {
          console.error("Cannot contact: No current user found")
          return
        }

        if (currentUser && this.application.applicant?.id) {
          const userIds = [currentUser.id, this.application.applicant!.id]

          this.dmService.createOrFindDM(userIds).subscribe({
            next: (response) => {
              console.log("DM created or found:", response)

              setTimeout(() => {
                this.router.navigate(["/dms"], {
                  queryParams: { activeDmId: response.data.id },
                })
              }, 200)
            },
            error: (error) => {
              console.error("Error creating DM:", error)
            },
          })
        }
      })
  }
}
