import { inject, Injectable } from "@angular/core"
import { Client, Message, type IMessage, type StompSubscription } from "@stomp/stompjs"
import { BehaviorSubject, filter, Subject, take, type Observable } from "rxjs"
import { EncryptionService } from "../../modules/auth/services/encryption.service"

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private client: Client;
  private connected$ = new BehaviorSubject<boolean>(false);
  private messageSubjects = new Map<number, Subject<Message>>();
  private subscriptions = new Map<string, StompSubscription>();

  constructor(private encryptionService: EncryptionService) {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {
        Authorization: `Bearer ${this.encryptionService.getLoggedInUser()?.token}`
      },
      debug: (str) => console.log('STOMP: ' + str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = (frame) => {
      console.log('Connected: ' + frame.headers['server']);
      this.connected$.next(true);
      this.resubscribeAll();
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
    };

    this.client.onWebSocketClose = () => {
      console.log('WebSocket connection closed');
      this.connected$.next(false);
    };
  }

  connect(): void {
    if (!this.client.active) {
      this.client.activate();
    }
  }

  disconnect(): void {
    if (this.client.active) {
      this.client.deactivate();
      this.subscriptions.clear();
    }
  }

  subscribeToDM(dmId: number): Observable<Message> {
    if (!this.messageSubjects.has(dmId)) {
      this.messageSubjects.set(dmId, new Subject<Message>());
    }

    const subject = this.messageSubjects.get(dmId)!;
    
    if (this.client.connected) {
      this.doSubscribe(dmId);
    }
    
    this.connected$.pipe(
      filter(connected => connected),
      take(1)
    ).subscribe(() => {
      this.doSubscribe(dmId);
    });

    return subject.asObservable();
  }

  private doSubscribe(dmId: number): void {
    const subKey = `dm-${dmId}`;
    if (this.subscriptions.has(subKey)) return;

    const subscription = this.client.subscribe(
      `/topic/dm/${dmId}`,
      (message: IMessage) => {
        try {
          const msg = JSON.parse(message.body) as Message;
          this.messageSubjects.get(dmId)?.next(msg);
        } catch (err) {
          console.error('Error parsing message:', err);
        }
      },
      { 
        Authorization: `Bearer ${this.encryptionService.getLoggedInUser()?.token}` 
      }
    );

    this.subscriptions.set(subKey, subscription);
  }

  private resubscribeAll(): void {
    this.messageSubjects.forEach((_, dmId) => {
      this.doSubscribe(dmId);
    });
  }

  sendMessage(dmId: number, content: string): void {
    if (!this.client.connected) {
      console.error('WebSocket not connected');
      return;
    }

    this.client.publish({
      destination: '/app/send',
      body: JSON.stringify({ dmId, content }),
      headers: { 
        Authorization: `Bearer ${this.encryptionService.getLoggedInUser()?.token}`,
        receipt: `receipt-${Date.now()}`
      }
    });
  }
}