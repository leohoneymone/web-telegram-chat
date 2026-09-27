// Интерфейс чата
export interface Chat {
  chatId: number;
  name: string;
  type: 'user' | 'channel' | 'bot' | 'supergroup';
  phoneNumber: number;
  username: string;
}
