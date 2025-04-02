import {Component,type ElementRef,EventEmitter,inject,Input,type OnChanges,OnDestroy,OnInit,Output,type SimpleChanges,ViewChild} from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { MessageItemComponent } from "../message-item/message-item.component"
import type { DmWithLastMessage, EmbeddedUser, Message } from "../../models"

import type { Subscription } from "rxjs"
import { WebSocketService } from "../../services/web-socket.service"

@Component({
  selector: "app-dm-conversation",
  standalone: true,
  imports: [CommonModule, FormsModule, MessageItemComponent],
  templateUrl: "./dm-conversation.component.html",
  styleUrls: ["./dm-conversation.component.css"],
})
export class DmConversationComponent implements OnChanges, OnInit, OnDestroy {
  @Input() dm!: DmWithLastMessage
  @Input() currentUserId!: number
  @Output() sendMessage = new EventEmitter<{ dmId: number; content: string }>()

  @ViewChild("messagesContainer") messagesContainer!: ElementRef
  @ViewChild("messageInput") messageInput!: ElementRef

  messages: Message[] = []
  newMessage = ""
  isLoading = false
  processedMessageIds = new Set<string>() 

  private webSocketService = inject(WebSocketService)
  private messageSubscription?: Subscription

  ngOnInit(): void {
    this.webSocketService.connect()
    console.log("DmConversationComponent initialized with currentUserId:", this.currentUserId)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dm"] && changes["dm"].currentValue) {
      this.messages = []
      this.processedMessageIds.clear()
      this.isLoading = true

      if (this.dm.dm.messages && this.dm.dm.messages.length > 0) {
        console.log("Loading messages from DM:", this.dm.dm.messages)

        const uniqueMessages = new Map()

        this.dm.dm.messages.forEach((msg) => {
          const normalizedMsg = this.normalizeMessage(msg)

          const key = `${normalizedMsg.content}-${normalizedMsg.sentAt}-${normalizedMsg.user?.id || normalizedMsg.userId}`

          if (!uniqueMessages.has(key)) {
            uniqueMessages.set(key, normalizedMsg)
          }
        })

        this.messages = Array.from(uniqueMessages.values()).sort(
          (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
        )

        console.log("Loaded normalized messages:", this.messages)
        this.isLoading = false
        setTimeout(() => this.scrollToBottom(), 100)
      } else {
        this.isLoading = false
      }

      this.subscribeToMessages()
    }
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe()
    }
  }

  private normalizeMessage(msg: any): Message {
    return {
      id: msg.id,
      dmId: msg.dmId || this.dm.dm.id,
      userId: msg.userId || msg.user?.id,
      user: msg.user, 
      sentAt: msg.sentAt || new Date().toISOString(),
      delivered: msg.delivered || false,
      deliveredAt: msg.deliveredAt,
      seenAt: msg.seenAt,
      content: msg.content,
    }
  }

  private getMessageIdentifier(msg: Message): string {
    if (msg.id) return `id-${msg.id}`
    return `${msg.userId}-${msg.content}-${new Date(msg.sentAt).getTime()}`
  }

  private subscribeToMessages(): void {
    this.messageSubscription?.unsubscribe()

    this.messageSubscription = this.webSocketService.subscribeToDM(this.dm.dm.id).subscribe({
      next: (message) => {
        if (!message) return

        try {
          const normalizedMsg = this.normalizeMessage(typeof message === "string" ? JSON.parse(message) : message)

          const msgId = this.getMessageIdentifier(normalizedMsg)

          if (!this.processedMessageIds.has(msgId)) {
            console.log("Adding new message to conversation:", normalizedMsg)
            this.processedMessageIds.add(msgId)
            this.messages = [...this.messages, normalizedMsg]
            setTimeout(() => this.scrollToBottom(), 100)
          } else {
            console.log("Duplicate message detected, not adding:", normalizedMsg)
          }
        } catch (err) {
          console.error("Error processing message:", err, message)
        }
      },
      error: (err) => console.error("Error receiving message:", err),
    })
  }

  get otherUser(): EmbeddedUser {
    if (!this.dm?.dm?.users || this.dm.dm.users.length < 2) {
      throw new Error("Invalid DM conversation: Must have exactly 2 participants")
    }

    const otherUser = this.dm.dm.users.find((u) => u.id !== this.currentUserId)

    if (!otherUser) {
      throw new Error("Could not find other participant in DM")
    }

    return otherUser
  }

  onSendMessage(): void {
    if (!this.newMessage.trim()) return

    const tempMessage: Message = {
      dmId: this.dm.dm.id,
      userId: this.currentUserId, 
      sentAt: new Date().toISOString(),
      delivered: false,
      content: this.newMessage.trim(),
    }

    const msgId = this.getMessageIdentifier(tempMessage)
    this.processedMessageIds.add(msgId)

    this.messages = [...this.messages, tempMessage]

    this.sendMessage.emit({
      dmId: this.dm.dm.id,
      content: this.newMessage.trim(),
    })

    this.newMessage = ""

    setTimeout(() => {
      if (this.messageInput) {
        this.messageInput.nativeElement.focus()
      }
      this.scrollToBottom()
    }, 0)
  }

  scrollToBottom(): void {
    if (this.messagesContainer) {
      const container = this.messagesContainer.nativeElement
      container.scrollTop = container.scrollHeight
    }
  }
}