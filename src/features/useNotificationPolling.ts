import { useQuery, useQueryClient } from '@tanstack/react-query';

import useAuthorizationStore from '../shared/auth/store';
import useNotificationStore from '../entities/notifications/store';
import { deleteNotification, receiveNotification } from '../entities/notifications/api';

const useNotificationPolling = () => {
  const queryClient = useQueryClient();

  const { idInstance, apiTokenInstance } = useAuthorizationStore();
  const { addNotificaton } = useNotificationStore();

  return useQuery({
    queryKey: ['tg-notification-polling'],
    queryFn: async () => {
      const { data } = await receiveNotification(apiTokenInstance);

      // Если уведомлений нет
      if (!data) {
        return null;
      }

      // Если уведомление не текстовое
      if (data && data.body.messageData.typeMessage !== 'textMessage') {
        console.log(
          `Удаление уведомления ${data.receiptId} - тип сообщения: ${data.body.messageData.typeMessage}`,
        );
        await deleteNotification(data.receiptId, apiTokenInstance);
        return null;
      }

      // Не читает уведомления из каналов
      if (data && data.body.senderData.chatType === 'channel') {
        console.log(`Удаление уведомления ${data.receiptId} - сообщение из канала`);
        await deleteNotification(data.receiptId, apiTokenInstance);
        return null;
      }

      queryClient.invalidateQueries({ queryKey: ['tg-chat-history'] });

      // Не ВЫВОДИТ уведомление неполученных сообщений - просто обновляет чат
      if (data && data.body.typeWebhook !== 'incomingMessageReceived') {
        console.log(
          `Удаление уведомления ${data.receiptId} - тип сообщения: ${data.body.messageData.typeMessage}`,
        );
        await deleteNotification(data.receiptId, apiTokenInstance);
        return null;
      }

      // Обработка текстового уведомления
      if (data) {
        addNotificaton(data);
        await deleteNotification(data.receiptId, apiTokenInstance);
      }

      return data;
    },
    enabled: !!idInstance && !!apiTokenInstance,
    refetchInterval: 500,
    refetchIntervalInBackground: true,
    retry: 0,
    staleTime: 0,
    gcTime: 0,
  });
};

export default useNotificationPolling;
