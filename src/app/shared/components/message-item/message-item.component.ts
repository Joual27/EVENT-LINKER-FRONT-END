import { Component, Input, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Message } from "../../models"

@Component({
  selector: "app-message-item",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./message-item.component.html",
  styleUrls: ["./message-item.component.css"],
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message
  @Input() isCurrentUser = false
  @Input() showAvatar = true
  @Input() otherUserImg = ""
  @Input() currentUserId!: number

  ngOnInit() {
    // If the message has a user object with an id, use that for comparison
    if (this.message.user && this.message.user.id) {
      this.isCurrentUser = this.message.user.id === this.currentUserId
    }
    // Otherwise fall back to the userId property
    else if (this.message.userId) {
      // Normalize userId to a number if it's a string
      const userId =
        typeof this.message.userId === "string" ? Number.parseInt(this.message.userId) : this.message.userId

      this.isCurrentUser = userId === this.currentUserId
    }

    console.log(
      `Message: "${this.message.content}", from: ${this.message.user?.id || this.message.userId}, currentUser: ${this.currentUserId}, isCurrentUser: ${this.isCurrentUser}`,
    )
  }

  get formattedTime(): string {
    const date = new Date(this.message.sentAt)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }
}

