import api from '../../shared/api/config';
import type { MessageResponse, MessagePayload } from './types';

const sendMessage = (payload: MessagePayload, apiTokenInstance?: string) =>
  api
    .post<MessageResponse>(`sendMessage/${apiTokenInstance}`, payload)
    .then((response) => response.data);

export { sendMessage };
