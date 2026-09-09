import { Notification } from '../../../entities/notifications';
import { StompClient } from '../client';

type NotificationsSocketConfig = {
  url: string;
  token: string;
  onNotification: (notification: Notification) => void;
};

export class NotificationSocket {
  private readonly stompClient: StompClient;

  constructor({ url, token, onNotification }: NotificationsSocketConfig) {
    this.stompClient = new StompClient({ url, token });

    this.stompClient.subscribe('/user/queue/notifications', message => {
      const notification = JSON.parse(message.body) as Notification;

      onNotification(notification);
    });
  }

  connect() {
    this.stompClient.connect();
  }

  disconnect() {
    return this.stompClient.disconnect();
  }
}
