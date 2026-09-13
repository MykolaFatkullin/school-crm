/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../../entities/notifications';

type NotificationsState = {
  unreadCount: number;
  notifications: Notification[];
};

const initialState: NotificationsState = {
  unreadCount: 0,
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
    addNewNotification: (state, action: PayloadAction<Notification>) => {
      const notification = action.payload;

      if (state.notifications.some(item => item.id === notification.id)) {
        return;
      }

      state.notifications.unshift(notification);
      state.unreadCount += 1;
    },
    readNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        n => n.id === action.payload,
      );

      if (!notification || notification.read) {
        return;
      }

      notification.read = true;
      state.unreadCount = Math.max(0, state.unreadCount - 1);
    },
    readAllNotifications: state => {
      state.notifications.forEach(n => (n.read = true));
      state.unreadCount = 0;
    },
    removeNotifications: state => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    appendNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = [...state.notifications, ...action.payload];
    },
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
  },
});

export const {
  setUnreadCount,
  readNotification,
  setNotifications,
  readAllNotifications,
  removeNotifications,
  appendNotifications,
  addNewNotification,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
