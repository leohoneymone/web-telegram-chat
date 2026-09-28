import useNotification from 'antd/es/notification/useNotification';
import { useEffect, type FC } from 'react';
import useNotificationStore from '../../entities/notifications/store';
import useNotificationPolling from '../../features/useNotificationPolling';

export const NotificationList: FC = () => {
  const [api, ctx] = useNotification();
  const { notificationList } = useNotificationStore();

  useNotificationPolling();

  useEffect(() => {
    notificationList.forEach((item) => {
      api.open({
        key: item.receiptId,
        placement: 'bottomRight',
        title: item.body.senderData.senderName,
        description: item.body.messageData.textMessageData.textMessage,
        icon: false,
      });
    });

    return () => {
      notificationList.forEach((item) => {
        api.destroy(item.receiptId);
      });
    };
  }, [notificationList, api]);

  return ctx;
};
