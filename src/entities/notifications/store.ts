import { create } from 'zustand';
import type { NotificationData } from './types';
import { immer } from 'zustand/middleware/immer';

interface NotificationsProperties {
  notificationList: NotificationData[];
}

interface NotificationsActions {
  addNotificaton: (data: NotificationData) => void;
  removeNotification: (id: number) => void;
  clearNotifications: () => void;
}

interface NotificationStore extends NotificationsProperties, NotificationsActions {}

const initialState: NotificationsProperties = {
  notificationList: [],
};

const useNotificationStore = create<NotificationStore>()(
  immer((set) => ({
    ...initialState,

    addNotificaton: (data: NotificationData) =>
      set((state) => {
        state.notificationList = [...state.notificationList, data];
      }),

    removeNotification: (id: number) =>
      set((state) => {
        state.notificationList = state.notificationList.filter((n) => n.receiptId !== id);
      }),

    clearNotifications: () =>
      set((state) => {
        state.notificationList = initialState.notificationList;
      }),
  })),
);

export default useNotificationStore;
