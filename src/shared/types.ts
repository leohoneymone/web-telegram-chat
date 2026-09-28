// Типы уведомлений (вебхуков)
export type NotificationWebhook =
  | 'incomingMessageReceived'
  | 'outgoingMessageReceived'
  | 'outgoingAPIMessageReceived'
  | 'outgoingMessageStatus'
  | 'stateInstanceChanged'
  | 'quotaExceeded';

// Типы инстансов (мессенджеров)
export type InstanceType = 'telegram' | 'whatsapp' | 'v3';

// Типы чатов
export type ChatType = 'user' | 'group' | 'supergroup' | 'channel' | 'bot';
