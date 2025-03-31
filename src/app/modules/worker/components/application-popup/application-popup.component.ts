import { Component, EventEmitter, inject, Input, type OnInit, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Announcement } from "../../../organizer/models/organizer.models";
import { ApplicationRequest } from "../../models/worker.models";

@Component({
  selector: "app-application-popup",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./application-popup.component.html",
  styleUrls: ["./application-popup.component.css"],
})
export class ApplicationPopupComponent implements OnInit {
  private fb = inject(FormBuilder);
  @Input() announcement!: Announcement
  @Output() close = new EventEmitter<void>()
  @Output() submit = new EventEmitter<ApplicationRequest>()

  applicationForm!: FormGroup


  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      price: ["", [Validators.required, Validators.min(1)]],
      coverLetter: ["", [Validators.required, Validators.minLength(50)]],
    })
  }

  onClose(): void {
    this.close.emit()
  }

  onSubmit(): void {
    if (this.applicationForm.valid) {
      const application: ApplicationRequest = {
        announcementId: this.announcement.id,
        price: this.applicationForm.value.price,
        coverLetter: this.applicationForm.value.coverLetter,
      }

      this.submit.emit(application)
    } else {
      this.applicationForm.markAllAsTouched()
    }
  }

  get coverLetterLength(): number {
    return this.applicationForm.value.coverLetter?.length || 0
  }
}

