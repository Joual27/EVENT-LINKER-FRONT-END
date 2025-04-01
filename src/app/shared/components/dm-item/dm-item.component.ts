import { Component, inject, Input, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { DmWithLastMessage, EmbeddedUser } from "../../models"
import { Store } from "@ngrx/store"
import { selectSignedInUser } from "../../../modules/auth/state/auth.selectors"

@Component({
  selector: "app-dm-item",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dm-item.component.html",
  styleUrls: ["./dm-item.component.css"],
})
export class DmItemComponent implements OnInit{
  @Input() dm!: DmWithLastMessage
  private store = inject(Store);
  @Input() isActive = false
  userId !: number


  ngOnInit(): void {
    this.store.select(selectSignedInUser).subscribe({
      next : (res) => {
        if(res){
          this.userId = res?.id
        }
      }
    })
  }

  get otherUser(): EmbeddedUser {
    return this.dm.dm.users.find((u) => u.id != this.userId ) || this.dm.dm.users[0]
  }

  get lastMessageTime(): string {
    if (!this.dm.lastMessage) return ""

    const date = new Date(this.dm.lastMessage.sentAt)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffDay > 0) {
      if (diffDay === 1) return "Yesterday"
      if (diffDay < 7) return `${diffDay}d`

      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }

    if (diffHour > 0) return `${diffHour}h`
    if (diffMin > 0) return `${diffMin}m`
    return "Just now"
  }

  get isLastMessageFromCurrentUser(): boolean {
    if (!this.dm.lastMessage) return false

    return this.dm.lastMessage.userId === 1
  }

  get truncatedLastMessage(): string {
    if (!this.dm.lastMessage) return ""

    const prefix = this.isLastMessageFromCurrentUser ? "You: " : ""
    const content = this.dm.lastMessage.content

    if (content.length <= 30) return prefix + content
    return prefix + content.substring(0, 27) + "..."
  }
}

