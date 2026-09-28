import type { ChatType } from '../../shared/types';

// Интерфейс чата
export interface Chat {
  chatId: string;
  name: string;
  type: ChatType;
  phoneNumber: number;
  username: string;
}

// Интерфейс ответа проверки существования аккаунта
export interface CheckAccount {
  exist: boolean;
  chatId: string;
  username: string;
  phoneNumber: number;
  fromCache: boolean;
}

// Сообщение
export interface ChatHistoryPayload {
  chatId: string;
  count: number;
}
