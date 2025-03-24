import { Component, Input, Output, EventEmitter, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { OrganizerEvent } from "../../models/organizer.models"

@Component({
  selector: "app-event-form-popup",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./event-form-popup.component.html",
})
export class EventFormPopupComponent implements OnInit {
  @Input() event: OrganizerEvent | null = null
  @Output() close = new EventEmitter<void>()
  @Output() save = new EventEmitter<OrganizerEvent>()
  private fb = inject(FormBuilder);

  eventForm!: FormGroup

 

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.eventForm = this.fb.group({
      title: [this.event?.title || "", [Validators.required]],
      description: [this.event?.description || "", [Validators.required]],
      date: [this.formatDateForInput(this.event?.date || ""), [Validators.required]],
      location: [this.event?.location || "", [Validators.required]],
    })
  }

  formatDateForInput(dateString: string): string {
    if (!dateString) return ""

    const date = new Date(dateString)
    return date.toISOString().slice(0, 16)
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value

      const savedEvent: OrganizerEvent = {
        id: this.event?.id || "",
        title: formValue.title,
        description: formValue.description,
        date: new Date(formValue.date).toISOString(),
        location: formValue.location,
        imageUrl:
          this.event?.imageUrl ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xS1PLfhCWab6K86S0jZBkZYYXr6MUV.png",
      }

      this.save.emit(savedEvent)
    } else {
      this.eventForm.markAllAsTouched()
    }
  }

  onClose(): void {
    this.close.emit()
  }
}

