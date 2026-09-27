// Интерфейс тела сообщения для POST запроса
export interface MessagePayload {
  chatId: string;
  message: string;
  typingTime: number;
}

// Ответ
export interface MessageResponse {
  idMessage: number;
}
