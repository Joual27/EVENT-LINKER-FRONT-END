import { Component, EventEmitter, Input, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { DmItemComponent } from "../dm-item/dm-item.component"
import { DmWithLastMessage } from "../../models"

@Component({
  selector: "app-dms-list",
  standalone: true,
  imports: [CommonModule, DmItemComponent],
  templateUrl: "./dms-list.component.html",
  styleUrls: ["./dms-list.component.css"],
})
export class DmsListComponent {
  @Input() dms: DmWithLastMessage[] = []
  @Input() activeDmId: number | undefined
  @Output() dmSelected = new EventEmitter<DmWithLastMessage>()

  searchTerm = ""

  get filteredDms(): DmWithLastMessage[] {
    if (!this.searchTerm) return this.dms

    const term = this.searchTerm.toLowerCase()
    return this.dms.filter((dm) => {
      const otherUser = dm.dm.users.find((u) => u.username !== "currentUser")
      if (!otherUser) return false

      return otherUser.username.toLowerCase().includes(term) || dm.lastMessage?.content.toLowerCase().includes(term)
    })
  }

  onDmSelected(dm: DmWithLastMessage): void {
    this.dmSelected.emit(dm)
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value
  }

  clearSearch(): void {
    this.searchTerm = ""
  }
}

