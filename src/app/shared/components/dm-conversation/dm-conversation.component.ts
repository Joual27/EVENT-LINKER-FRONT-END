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

  private webSocketService = inject(WebSocketService)
  private messageSubscription?: Subscription

  ngOnInit(): void {
    this.webSocketService.connect()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dm"] && changes["dm"].currentValue) {
      if (this.dm.messages) {
        this.messages = this.dm.messages
        setTimeout(() => this.scrollToBottom(), 100)
      } else {
        this.messages = []
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

  private subscribeToMessages(): void {
    this.messageSubscription?.unsubscribe();

    this.messageSubscription = this.webSocketService.subscribeToDM(this.dm.dm.id).subscribe({
      next: (stompMessage) => {
        if (!stompMessage) return;

        const message: Message = {
          id: stompMessage.headers['message-id'] ? parseInt(stompMessage.headers['message-id']) : undefined,
          dmId: parseInt(stompMessage.headers['dm-id']),
          userId: parseInt(stompMessage.headers['user-id']),
          sentAt: stompMessage.headers['sent-at'],
          delivered: stompMessage.headers['delivered'] === 'true',
          deliveredAt: stompMessage.headers['delivered-at'] || undefined,
          seenAt: stompMessage.headers['seen-at'] || undefined,
          content: stompMessage.body
        };

        if (!this.messages.some(m => m.id === message.id || (m.sentAt === message.sentAt && m.content === message.content))) {
          this.messages.push(message);
          setTimeout(() => this.scrollToBottom(), 100);
        }
      },
      error: (err) => console.error('Error receiving message:', err)
    });
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

    this.sendMessage.emit({
      dmId: this.dm.dm.id,
      content: this.newMessage.trim(),
    })

    const tempMessage: Message = {
      dmId: this.dm.dm.id,
      userId: this.currentUserId,
      sentAt: new Date().toISOString(),
      delivered: false,
      content: this.newMessage.trim(),
    }

    this.messages.push(tempMessage)

    this.newMessage = ""

    setTimeout(() => {
      if (this.messageInput) {
        this.messageInput.nativeElement.focus()
      }
    }, 0)

    setTimeout(() => this.scrollToBottom(), 100)
  }

  scrollToBottom(): void {
    if (this.messagesContainer) {
      const container = this.messagesContainer.nativeElement
      container.scrollTop = container.scrollHeight
    }
  }
}