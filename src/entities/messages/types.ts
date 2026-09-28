import type { ChatType } from '../../shared/types';

// Интерфейс тела сообщения для POST запроса
export interface MessagePayload {
  chatId: string;
  message: string;
  typingTime: number;
}

// Ответ на успешную отправку сообщения
export interface MessageResponse {
  idMessage: number;
}

// Сообщение
export interface Message {
  type: 'incoming' | 'outgoing';
  idMessage: string;
  timestamp: number;
  typeMessage: 'textMessage';
  chatId: string;
  chatType: ChatType;
  textMessage: string;
  isForwarded: boolean;
  forwardingScore: number;
  senderId: string;
  senderName: string;
  senderType: ChatType;
  senderContactName: string;
  deletedMessageId: string;
  editedMessageId: string;
  isEdited: boolean;
  isDeleted: boolean;
}
