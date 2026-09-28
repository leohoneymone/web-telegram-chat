import api from '../../shared/api/config';
import type { DeleteNotificationResponse, ReceiveNotificationResponse } from './types';

const receiveNotification = (apiTokenInstance?: string) =>
  api.get<ReceiveNotificationResponse>(`receiveNotification/${apiTokenInstance}`).then();

const deleteNotification = (notificationId: number, apiTokenInstance?: string) =>
  api
    .delete<DeleteNotificationResponse>(`deleteNotification/${apiTokenInstance}/${notificationId}`)
    .then((response) => response.data);

export { receiveNotification, deleteNotification };
