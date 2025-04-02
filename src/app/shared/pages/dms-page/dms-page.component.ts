import { Component, inject, type OnInit, type OnDestroy, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DmsListComponent } from "../../components/dms-list/dms-list.component";
import { DmConversationComponent } from "../../components/dm-conversation/dm-conversation.component";
import type { DmWithLastMessage, Message } from "../../models";
import { PageTitleComponent } from "../../ui/page-title/page-title.component";
import { UserNavbarComponent } from "../../ui/user-navbar/user-navbar.component";
import type { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { fetchUserDMs } from "../../state/DMs/DMs.actions";
import { selectUserDMs } from "../../state/DMs/DMs.selectors";
import { selectSignedInUser } from "../../../modules/auth/state/auth.selectors";
import { WebSocketService } from "../../services/web-socket.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-dms-page",
  standalone: true,
  imports: [CommonModule, DmsListComponent, DmConversationComponent, PageTitleComponent, UserNavbarComponent],
  templateUrl: "./dms-page.component.html",
  styleUrls: ["./dms-page.component.css"],
})
export class DmsPageComponent implements OnInit, OnDestroy {
  dms$!: Observable<DmWithLastMessage[] | null>
  dms: DmWithLastMessage[] = []
  private store = inject(Store)
  private activatedRoute = inject(ActivatedRoute);
  private webSocketService = inject(WebSocketService)
  activeDm: DmWithLastMessage | null = null
  isLoading = true
  currentUserId!: number
  isMobileView = window.innerWidth < 768

  private userSubscription?: Subscription
  private dmsSubscription?: Subscription
  private messageSubscription?: Subscription

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.isMobileView = window.innerWidth < 768
  }

  ngOnInit(): void {
    let pendingActiveDmId: number | null = null

    this.activatedRoute.queryParams.subscribe((params) => {
      const activeDmIdParam = params["activeDmId"]
      if (activeDmIdParam) {
        pendingActiveDmId = Number(activeDmIdParam)

        if (this.dms.length > 0) {
          const dmToActivate = this.dms.find((dm) => dm.dm.id === pendingActiveDmId)
          if (dmToActivate) {
            this.setActiveDm(dmToActivate)
            pendingActiveDmId = null 
          }
        }
      }
    })

    this.webSocketService.connect()

    this.userSubscription = this.store.select(selectSignedInUser).subscribe({
      next: (res) => {
        if (res) {
          this.currentUserId = res.id
          this.store.dispatch(fetchUserDMs())
        }
      },
    })

    this.dms$ = this.store.select(selectUserDMs)
    this.dmsSubscription = this.dms$.subscribe({
      next: (res) => {
        if (res) {
          this.dms = res

          if (pendingActiveDmId && res.length > 0) {
            const dmToActivate = res.find((dm) => dm.dm.id === pendingActiveDmId)
            if (dmToActivate) {
              this.setActiveDm(dmToActivate)
              pendingActiveDmId = null 
            }
          }
          else if (res.length > 0 && !this.activeDm) {
            this.setActiveDm(res[0])
          }
        }
        this.isLoading = false
      },
    })
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe()
    this.dmsSubscription?.unsubscribe()
    this.messageSubscription?.unsubscribe()
    this.webSocketService.disconnect()
  }

  setActiveDm(dm: DmWithLastMessage): void {
    if (this.activeDm?.dm.id === dm.dm.id) return

    if (this.activeDm) {
      this.webSocketService.unsubscribeFromDM(this.activeDm.dm.id)
      this.messageSubscription?.unsubscribe()
    }

    this.activeDm = dm
    this.subscribeToMessages(dm.dm.id)

    this.dms = this.dms.map((d) => ({
      ...d,
      unreadCount: d.dm.id === dm.dm.id ? 0 : d.unreadCount,
    }))
  }

  private subscribeToMessages(dmId: number): void {
    this.messageSubscription?.unsubscribe()

    this.messageSubscription = this.webSocketService.subscribeToDM(dmId).subscribe({
      next: (message) => {
        if (!message) return

        try {
          const messageData = this.parseIncomingMessage(message)

          if (this.activeDm?.dm.id === dmId) {
            if (!this.activeDm.dm.messages) {
              this.activeDm.dm.messages = []
            }

            const messageExists = this.activeDm.dm.messages.some(
              (m) =>
                (m.id && messageData.id && m.id === messageData.id) ||
                (m.sentAt === messageData.sentAt &&
                  m.content === messageData.content &&
                  m.userId === messageData.userId),
            )

            if (!messageExists) {
              this.activeDm = {
                ...this.activeDm,
                lastMessage: messageData,
                dm: {
                  ...this.activeDm.dm,
                  messages: [...this.activeDm.dm.messages, messageData],
                },
              }
            }
          }

          this.dms = this.dms.map((d) => {
            if (d.dm.id === dmId) {
              return {
                ...d,
                lastMessage: messageData,
              }
            }
            return d
          })
        } catch (err) {
          console.error("Error processing message:", err)
        }
      },
      error: (err) => console.error("Message subscription error:", err),
    })
  }

  private parseIncomingMessage(message: any): Message {
    if (message.body) {
      try {
        const body = JSON.parse(message.body)
        return {
          id: body.id || Number.parseInt(message.headers?.["message-id"]),
          dmId: body.dmId || Number.parseInt(message.headers?.["dm-id"]),
          userId: body.userId || Number.parseInt(message.headers?.["user-id"]),
          sentAt: body.sentAt || message.headers?.["sent-at"] || new Date().toISOString(),
          delivered: body.delivered || message.headers?.["delivered"] === "true",
          deliveredAt: body.deliveredAt || message.headers?.["delivered-at"],
          seenAt: body.seenAt || message.headers?.["seen-at"],
          content: body.content || message.body,
        }
      } catch (e) {
        console.error("Failed to parse message body:", e)
        throw e
      }
    }

    return {
      id: Number(message.id),
      dmId: Number(message.dmId),
      userId: typeof message.userId === "string" ? Number.parseInt(message.userId) : message.userId,
      sentAt: message.sentAt,
      delivered: message.delivered,
      deliveredAt: message.deliveredAt,
      seenAt: message.seenAt,
      content: message.content,
    }
  }

  handleSendMessage(data: { dmId: number; content: string }): void {
    this.webSocketService.sendMessage(data.dmId, data.content)
  }
}
