import api from '../../shared/api/config';
import { type Chat } from './types';

const getChats = (apiTokenInstance?: string) =>
  api.get<Array<Chat>>(`getChats/${apiTokenInstance}`).then((response) => response.data);

export { getChats };
