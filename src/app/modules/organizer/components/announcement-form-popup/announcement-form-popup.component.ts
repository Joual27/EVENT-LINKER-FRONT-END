import { Component, EventEmitter, inject, Input, type OnInit, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { type FormArray, FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Announcement, AnnouncementSkill, CreateAnnouncementDTO, OrganizerEvent } from "../../models/organizer.models";

@Component({
  selector: "app-announcement-form-popup",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./announcement-form-popup.component.html",
})
export class AnnouncementFormPopupComponent implements OnInit {
  private fb = inject(FormBuilder);
  @Input() announcement: Announcement | null = null
  @Output() close = new EventEmitter<void>()
  @Output() save = new EventEmitter<CreateAnnouncementDTO>()

  announcementForm!: FormGroup
  events: OrganizerEvent[] = [
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

  availableSkills: AnnouncementSkill[] = [
    { id: 1, name: "Public Speaking" },
    { id: 2, name: "Technology" },
    { id: 3, name: "Customer Service" },
    { id: 4, name: "Communication" },
    { id: 5, name: "Artificial Intelligence" },
    { id: 6, name: "Project Management" },
    { id: 7, name: "Marketing" },
    { id: 8, name: "Design" },
  ]

  isLoadingEvents = false
  isLoadingSkills = false



  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.announcementForm = this.fb.group({
      title: [this.announcement?.title || "", [Validators.required]],
      description: [this.announcement?.description || "", [Validators.required]],
      eventId: [this.announcement?.event.id || "", [Validators.required]],
      skills: this.fb.array([], [Validators.required, Validators.minLength(1)]),
    })

    if (this.announcement) {
      this.announcement.announcementSkills.forEach((skill : any) => {
        this.addSkill(skill.id, skill.level || "BEGINNER")
      })
    }
  }

  get skillsArray(): FormArray {
    return this.announcementForm.get("skills") as FormArray
  }

  addSkill(skillId = 0, level = "BEGINNER"): void {
    this.skillsArray.push(
      this.fb.group({
        id: [skillId, Validators.required],
        level: [level, Validators.required],
      }),
    )
  }

  removeSkill(index: number): void {
    this.skillsArray.removeAt(index)
  }

  isSkillSelected(skillId: number): boolean {
    return this.skillsArray.controls.some((control) => control.get("id")?.value === skillId)
  }

  onSubmit(): void {
    if (this.announcementForm.valid) {
      const formValue = this.announcementForm.value

      const announcementData: CreateAnnouncementDTO = {
        title: formValue.title,
        description: formValue.description,
        eventId: formValue.eventId,
        skills: formValue.skills,
      }

      this.save.emit(announcementData)
    } else {
      this.announcementForm.markAllAsTouched()
    }
  }

  onClose(): void {
    this.close.emit()
  }
}

