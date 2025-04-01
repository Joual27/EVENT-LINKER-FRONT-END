import { Component, inject, type OnInit, type OnDestroy } from "@angular/core";
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

@Component({
  selector: "app-dms-page",
  standalone: true,
  imports: [CommonModule, DmsListComponent, DmConversationComponent, PageTitleComponent, UserNavbarComponent],
  templateUrl: "./dms-page.component.html",
  styleUrls: ["./dms-page.component.css"],
})
export class DmsPageComponent implements OnInit, OnDestroy {
  dms$!: Observable<DmWithLastMessage[] | null>;
  dms: DmWithLastMessage[] = [];
  private store = inject(Store);
  private webSocketService = inject(WebSocketService);
  activeDm: DmWithLastMessage | null = null;
  isLoading = true;
  currentUserId!: number;

  private userSubscription?: Subscription;
  private dmsSubscription?: Subscription;
  private messageSubscription?: Subscription;

  ngOnInit(): void {
    this.webSocketService.connect();

    this.userSubscription = this.store.select(selectSignedInUser).subscribe({
      next: (res) => {
        if (res) {
          this.currentUserId = res.id;
        }
      },
    });

    this.store.dispatch(fetchUserDMs());

    this.dms$ = this.store.select(selectUserDMs);
    this.dmsSubscription = this.dms$.subscribe({
      next: (res) => {
        if (res) {
          this.dms = res;
          if (res.length > 0 && !this.activeDm) {
            this.setActiveDm(res[0]);
          }
        }
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.dmsSubscription?.unsubscribe();
    this.messageSubscription?.unsubscribe();
    this.webSocketService.disconnect();
  }

  setActiveDm(dm: DmWithLastMessage): void {
    if (this.activeDm?.dm.id === dm.dm.id) return;

    if (this.activeDm) {
      this.webSocketService.unsubscribeFromDM(this.activeDm.dm.id);
      this.messageSubscription?.unsubscribe();
    }

    this.activeDm = dm;
    this.subscribeToMessages(dm.dm.id);

    this.dms = this.dms.map((d) => ({
      ...d,
      unreadCount: d.dm.id === dm.dm.id ? 0 : d.unreadCount
    }));
  }

  private subscribeToMessages(dmId: number): void {
    this.messageSubscription = this.webSocketService.subscribeToDM(dmId).subscribe({
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

            if (this.activeDm?.dm.id === dmId) {
                this.activeDm = {
                    ...this.activeDm,
                    lastMessage: message,
                    messages: [...(this.activeDm.messages || []), message]
                };
            }

            this.dms = this.dms.map(d => ({
                ...d,
                lastMessage: d.dm.id === dmId ? message : d.lastMessage,
            }));
        },
        error: (err) => console.error('Message subscription error:', err)
    });
}

  handleSendMessage(data: { dmId: number; content: string }): void {
    this.webSocketService.sendMessage(data.dmId, data.content);
  }
}