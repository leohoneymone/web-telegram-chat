import api from '../../shared/api/config';
import { type Message } from '../messages/types';
import type { Chat, ChatHistoryPayload, CheckAccount } from './types';

const getChats = (apiTokenInstance?: string) =>
  api.get<Array<Chat>>(`getChats/${apiTokenInstance}`).then((response) => response.data);

const chechAccount = (phoneNumber: number, apiTokenInstance?: string) =>
  api
    .post<CheckAccount>(`checkAccount/${apiTokenInstance}`, { phoneNumber: Number(phoneNumber) })
    .then((response) => response.data);

const getChatHistory = (payload: ChatHistoryPayload, apiTokenInstance?: string) =>
  api
    .post<Array<Message>>(`getChatHistory/${apiTokenInstance}`, payload)
    .then((response) => response.data.filter((item) => item.typeMessage === 'textMessage'));

export { getChats, chechAccount, getChatHistory };
