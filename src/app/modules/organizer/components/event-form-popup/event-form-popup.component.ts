import { Component, Input, Output, EventEmitter, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { OrganizerEvent } from "../../models/organizer.models"
import { Store } from "@ngrx/store"
import { createEvent, fetchEvents, updateEvent } from "../../state/organizer.actions"
import { appIsLoading, stopLoading } from "../../../../shared/ui-state/ui.actions"

@Component({
  selector: "app-event-form-popup",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./event-form-popup.component.html",
})
export class EventFormPopupComponent implements OnInit {
  @Input() event: OrganizerEvent | null = null
  @Output() close = new EventEmitter<void>()
  private fb = inject(FormBuilder)
  private store = inject(Store);

  eventForm!: FormGroup
  imagePreview: string | null = null
  imageFile: File | null = null
  imageRequired = true

  ngOnInit(): void {
    this.initForm()
    if (this.event?.imgUrl) {
      this.imagePreview = this.event.imgUrl
      this.imageRequired = false
    }
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

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.imagePreview = reader.result as string
      }
      reader.readAsDataURL(this.imageFile)
      this.imageRequired = false
    }
  }

  removeImage(): void {
    this.imagePreview = null
    this.imageFile = null
    const fileInput = document.getElementById("image-upload") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
    this.imageRequired = true
  }

  isFormValid(): boolean {
    if (!this.event && !this.imageFile) return false;
    return this.eventForm.valid;
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      if (this.imageRequired && !this.imageFile && !this.event?.imgUrl) {
        return
      }
      const formValue = this.eventForm.value
      const formData = this.populateFormData(formValue);
      this.store.dispatch(appIsLoading())
      if(this.event){
        this.store.dispatch(updateEvent({data : formData}));
      }else{
        this.store.dispatch(createEvent({data : formData}));
      }
      setTimeout(() => {
        this.store.dispatch(fetchEvents({page:0}))
        this.store.dispatch(stopLoading())
        this.onClose()
      } , 3000)   
    } else {
      this.eventForm.markAllAsTouched()
    }
  }

  onClose(): void {
    this.close.emit()
  }


  populateFormData(formValue : any ) : FormData{
    const formData = new FormData();
    if (!this.event && this.imageFile) {
      formData.append("img", this.imageFile);
    }
    formData.append("title", formValue.title)
    formData.append("description", formValue.description)
    const dateObj = new Date(formValue.date)
    const formattedDate = dateObj.toISOString().replace("Z", "") 
    formData.append("date", formattedDate)
    formData.append("location", formValue.location)
  
    if (this.event?.id) {
      formData.append("id", this.event.id)
    }
    return formData;
  }
}

