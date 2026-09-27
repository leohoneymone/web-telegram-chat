// Интерфейс чата
export interface Chat {
  chatId: string;
  name: string;
  type: 'user' | 'channel' | 'bot' | 'supergroup';
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
