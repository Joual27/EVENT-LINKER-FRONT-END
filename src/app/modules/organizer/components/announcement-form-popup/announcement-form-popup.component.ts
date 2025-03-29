import { Component, EventEmitter, inject, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Announcement, CreateAndUpdateAnnouncementDTO, OrganizerEvent, Skill } from "../../models/organizer.models";
import { Store } from "@ngrx/store";

import { OrganizerAnnouncementsService } from "../../services/organizer-announcements.service";

@Component({
  selector: "app-announcement-form-popup",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./announcement-form-popup.component.html",
})
export class AnnouncementFormPopupComponent implements OnInit {
  private organizerAnnouncementService = inject(OrganizerAnnouncementsService);
  private fb = inject(FormBuilder);
  events !: OrganizerEvent[];
  skills !: Skill[];
  @Input() announcement: Announcement | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<CreateAndUpdateAnnouncementDTO>();
  announcementForm!: FormGroup;

  
  ngOnInit(): void {
    this.initForm();
    this.organizerAnnouncementService.getAllEvents().subscribe({
      next : (res) =>
        this.events = res.data
    });
    this.organizerAnnouncementService.getAllSkills().subscribe({
      next : (res) =>
        this.skills = res.data
    });
  }

  initForm(): void {
    this.announcementForm = this.fb.group({
      title: [this.announcement?.title || "", [Validators.required]],
      description: [this.announcement?.description || "", [Validators.required]],
      eventId: [this.announcement?.event.id || "", [Validators.required]],
      skills: this.fb.array([], [Validators.required, Validators.minLength(1)]),
    });
  }

  get skillsArray(): FormArray {
    return this.announcementForm.get("skills") as FormArray;
  }

  addSkill(skillId = 0, level = "BEGINNER"): void {
    this.skillsArray.push(
      this.fb.group({
        id: [skillId, Validators.required],
        level: [level, Validators.required],
      }),
    );
  }

  removeSkill(index: number): void {
    this.skillsArray.removeAt(index);
  }

  isSkillSelected(skillId: number): boolean {
    return this.skillsArray.controls.some((control) => control.get("id")?.value === skillId);
  }

  onSubmit(): void {
    if (this.announcementForm.valid) {
      const formValue = this.announcementForm.value;
      const data = this.populateDTO(formValue);
      this.save.emit(data);
    } else {
      this.announcementForm.markAllAsTouched();
    }
  }

  populateDTO(formValue : any) : CreateAndUpdateAnnouncementDTO {
    const data: CreateAndUpdateAnnouncementDTO = {
      title: formValue.title,
      description: formValue.description,
      skills: formValue.skills.map((skill: any) => ({
        id: skill.id,
        acceptsNonOrganizations: false
      })),
      ...(formValue.eventId && { eventId: formValue.eventId }),
      ...(this.announcement && { id: this.announcement.id })
    };
    return data;
  }

  onClose(): void {
    this.close.emit();
  }
}