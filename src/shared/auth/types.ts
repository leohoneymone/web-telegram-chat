// Поля / значения для авторизации
export interface AuthorizationProperties {
  idInstance: number | undefined;
  apiTokenInstance: string | undefined;
}

// Информация о пользователе
export interface AccountSettings {
  avatar: string;
  phone: string;
  stateInterface: 'authorized';
  chatId: number;
  username: string;
  historySyncProgress: number;
  logoutProgress: boolean;
}
