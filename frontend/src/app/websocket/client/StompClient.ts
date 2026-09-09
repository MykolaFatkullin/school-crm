import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { logger } from '../../api/logger/logger';

type StompClientConfig = {
  url: string;
  token: string;
};

type MessageHandler = (message: IMessage) => void;

export class StompClient {
  private readonly client: Client;
  private readonly subscriptions = new Map<string, StompSubscription>();
  private readonly handlers = new Map<string, MessageHandler>();

  constructor({ url, token }: StompClientConfig) {
    this.client = new Client({
      webSocketFactory: () => new SockJS(url),

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      reconnectDelay: 5000,

      onConnect: () => {
        logger.info('STOMP connection established');
        this.restoreSubscriptions();
      },

      onDisconnect: () => {
        logger.info('STOMP connection closed');
        this.clearSubscriptions();
      },

      onStompError: frame => {
        logger.error('STOMP error', frame.body, {
          message: frame.headers.message,
          code: frame.headers.code,
        });
      },

      onWebSocketError: error => {
        logger.error('WebSocket error', error);
      },
    });
  }

  connect() {
    this.client.activate();
  }

  async disconnect() {
    this.handlers.clear();
    this.clearSubscriptions();

    await this.client.deactivate();
  }

  subscribe(destination: string, handler: (message: IMessage) => void) {
    this.handlers.set(destination, handler);

    if (this.client.connected) {
      this.createSubscription(destination, handler);
    }
  }

  unsubscribe(destination: string): void {
    this.handlers.delete(destination);

    const subscription = this.subscriptions.get(destination);

    if (!subscription) {
      return;
    }

    subscription.unsubscribe();
    this.subscriptions.delete(destination);
  }

  private restoreSubscriptions(): void {
    this.handlers.forEach((handler, destination) => {
      this.createSubscription(destination, handler);
    });
  }

  private createSubscription(
    destination: string,
    handler: MessageHandler,
  ): void {
    if (this.subscriptions.has(destination)) {
      return;
    }

    const subscription = this.client.subscribe(destination, handler);

    this.subscriptions.set(destination, subscription);
  }

  private clearSubscriptions(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });

    this.subscriptions.clear();
  }
}
