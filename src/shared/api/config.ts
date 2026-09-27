import axios, { type AxiosInstance } from 'axios';
import useAuthorizationStore from '../auth/store';

const api: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Интерцепторы
api.interceptors.request.use(
  (request) => {
    // Установка idInstance в URL
    const { idInstance } = useAuthorizationStore.getState();
    if (!idInstance) {
      throw new Error(`Unable to send a request: idInstance is ${idInstance}`);
    }

    request.baseURL = `https://4100.api.green-api.com/waInstance${idInstance}/`;

    if (import.meta.env.DEV) {
      console.log(
        `[${new Date().toUTCString()}] Отправлен: ${request.method} ${request.baseURL || '' + request.url}`,
      );
    }

    return request;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error(`Ошибка отправки запроса: ${error}`);
    }

    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(
        `[${new Date().toUTCString()}] Получен: ${response.config.method} ${response.config.baseURL || '' + response.config.url}`,
      );
    }

    return response;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error(`Ошибка получения запроса: ${error}`);
    }

    return Promise.reject(error);
  },
);

export default api;
