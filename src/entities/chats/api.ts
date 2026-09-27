import api from '../../shared/api/config';
import { type Chat, type CheckAccount } from './types';

const getChats = (apiTokenInstance?: string) =>
  api.get<Array<Chat>>(`getChats/${apiTokenInstance}`).then((response) => response.data);

const chechAccount = (phoneNumber: number, apiTokenInstance?: string) =>
  api
    .post<CheckAccount>(`checkAccount/${apiTokenInstance}`, { phoneNumber: Number(phoneNumber) })
    .then((response) => response.data);

export { getChats, chechAccount };
