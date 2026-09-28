import type { ChatType, InstanceType, NotificationWebhook } from '../../shared/types';

// Интерфейс получаемых уведомлений
export interface NotificationData {
  receiptId: number;
  body: {
    typeWebhook: NotificationWebhook;
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: InstanceType;
    };
    timestamp: number;
    idMessage: number;
    senderData: {
      chatId: string;
      chatType: ChatType;
      sender: string;
      chatName: string;
      senderName: string;
      senderType: ChatType;
      senderContactName: string | undefined;
      senderPhoneNumber: number | undefined;
    };
    messageData: {
      typeMessage: 'textMessage';
      textMessageData: {
        textMessage: string;
        forwardingScore: number;
        isForwarded: boolean;
      };
    };
  };
}

export type ReceiveNotificationResponse = NotificationData | null;

// Интерфейсы для удаления сообщений
export interface DeleteNotificationResponse {
  result: boolean;
  reason: string;
}
