import { Component, EventEmitter, inject, Input, type OnInit, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Announcement } from "../../../organizer/models/organizer.models";
import { ApplicationRequest } from "../../models/worker.models";
import { Store } from "@ngrx/store";
import { submitApplication } from "../../state/worker.actions";
import { appIsLoading, stopLoading } from "../../../../shared/ui-state/ui.actions";

@Component({
  selector: "app-application-popup",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./application-popup.component.html",
  styleUrls: ["./application-popup.component.css"],
})
export class ApplicationPopupComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  @Input() announcement!: Announcement
  @Output() close = new EventEmitter<void>()
  @Output() hidePopup = new EventEmitter<void>()

  applicationForm!: FormGroup


  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      price: ["", [Validators.required, Validators.min(1)]],
      letter: ["", [Validators.required, Validators.minLength(50)]],
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
        letter: this.applicationForm.value.letter,
      }
      this.store.dispatch(appIsLoading());
      this.store.dispatch(submitApplication({data : application}));
      this.hidePopup.emit();
      setTimeout(() => {
        this.store.dispatch(stopLoading());
      } , 900)
      
    } else {
      this.applicationForm.markAllAsTouched()
    }
  }

  get coverLetterLength(): number {
    return this.applicationForm.value.letter?.length || 0
  }
}

