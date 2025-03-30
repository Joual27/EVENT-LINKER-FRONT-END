import { Component, EventEmitter, inject, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Announcement, CreateAndUpdateAnnouncementDTO, OrganizerEvent, Skill } from "../../models/organizer.models";
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
  
  events: OrganizerEvent[] = [];
  skills: Skill[] = [];
  @Input() announcement: Announcement | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<CreateAndUpdateAnnouncementDTO>();
  
  announcementForm!: FormGroup;

  get skillsArray(): FormArray {
    return this.announcementForm.get('skills') as FormArray;
  }

  getSkillControl(index: number): FormControl {
    return this.skillsArray.at(index).get('id') as FormControl;
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.organizerAnnouncementService.getAllEvents().subscribe({
      next: (res) => {
        this.events = res.data;
        this.organizerAnnouncementService.getAllSkills().subscribe({
          next: (skillsRes) => {
            this.skills = skillsRes.data;
            this.initForm();
          },
          error: (err) => console.error('Error loading skills:', err)
        });
      },
      error: (err) => console.error('Error loading events:', err)
    });
  }

  initForm(): void {
    const initialSkills = this.announcement?.announcementSkills || [];
    this.announcementForm = this.fb.group({ 
      title: [this.announcement?.title || "", Validators.required],
      description: [this.announcement?.description || "", Validators.required],
      eventId: [this.announcement?.event.id || "", Validators.required],
      skills: this.fb.array(
        initialSkills.map(skill => this.createSkillGroup(skill.skill.id)),
        Validators.required
      )
    });
  }

  private createSkillGroup(skillId: number): FormGroup {
    return this.fb.group({
      id: [skillId, Validators.required]
    });
  }

  addSkill(skillId: number = 0): void {
    this.skillsArray.push(this.createSkillGroup(skillId));
  }

  removeSkill(index: number): void {
    this.skillsArray.removeAt(index);
  }

  isSkillSelected(skillId: number): boolean {
    return this.skillsArray.controls.some(control => 
      (control as FormGroup).get('id')?.value === skillId
    );
  }

  onSubmit(): void {
    if (this.announcementForm.valid) {
      const formValue = this.announcementForm.value;
      const data: CreateAndUpdateAnnouncementDTO = {
        title: formValue.title,
        description: formValue.description,
        skills: formValue.skills.map((skill: { id: number }) => ({
          id: skill.id,
          acceptsNonOrganizations: true
        })),
        ...(formValue.eventId && { eventId: formValue.eventId }),
        ...(this.announcement && { id: this.announcement.id })
      };
      this.save.emit(data);
    } else {
      this.announcementForm.markAllAsTouched();
    }
  }

  onClose(): void {
    this.close.emit();
  }
}