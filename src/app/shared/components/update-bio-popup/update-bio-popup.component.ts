import { Component, EventEmitter, inject, Input, Output } from "@angular/core"
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { Store } from "@ngrx/store";
import * as profileActions from "../../state/profile/profile.actions"
import { appIsLoading, showSuccessPopup, stopLoading } from "../../ui-state/ui.actions";

@Component({
  selector: "app-update-bio-popup",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./update-bio-popup.component.html",
  styleUrls: ["./update-bio-popup.component.css"],
})
export class UpdateBioPopupComponent {
  @Input() currentBio : string | undefined = undefined;
  @Output() close = new EventEmitter<void>()
  @Output() save = new EventEmitter<void>()
  private store = inject(Store);
  private fb = inject(FormBuilder);
  bioForm: FormGroup;

  constructor() {
    this.bioForm = this.fb.group({
      bio: ["", [Validators.required, Validators.maxLength(500)]],
    })
  }

  ngOnChanges(): void {
    if (this.currentBio) {
      this.bioForm.patchValue({ bio: this.currentBio })
    }
  }

  onClose(): void {
    this.close.emit()
  }

  onSubmit(): void {
    if (this.bioForm.valid) {
      const bioValue = this.bioControlValue();
    if (bioValue !== null && bioValue !== undefined) {
      const formData = new FormData();
      formData.append("bio", bioValue);
      this.store.dispatch(profileActions.updateProfile({ data: formData }));
    
      this.store.dispatch(appIsLoading());

      setTimeout(() => {
        this.store.dispatch(stopLoading());
        this.store.dispatch(showSuccessPopup({message : "Bio updated Successfully !"}));
        this.save.emit(); 
        this.onClose(); 
      } , 800);
    }
    } else {
      this.bioForm.markAllAsTouched();
    }
  }

  get bioControl() {
    return this.bioForm.get("bio")
  }
  bioControlValue(): string {
    return this.bioForm.get('bio')?.value ?? '';
  }

  get remainingChars() {
    const currentLength = this.bioControl?.value?.length || 0
    return 500 - currentLength
  }
}
