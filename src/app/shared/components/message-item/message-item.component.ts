import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Message } from "../../models"

@Component({
  selector: "app-message-item",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./message-item.component.html",
  styleUrls: ["./message-item.component.css"],
})
export class MessageItemComponent {
  @Input() message!: Message
  @Input() isCurrentUser = false
  @Input() showAvatar = true
  @Input() otherUserImg = ""

  get formattedTime(): string {
    const date = new Date(this.message.sentAt)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  get messageStatus(): string {
    if (this.message.seenAt) return "Seen"
    if (this.message.deliveredAt) return "Delivered"
    return "Sent"
  }
}