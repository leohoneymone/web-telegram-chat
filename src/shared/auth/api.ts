import api from '../api/config';
import { type AccountSettings } from './types';

const getAccountSettings = (apiTokenInstance?: string) =>
  api
    .get<AccountSettings>(`getAccountSettings/${apiTokenInstance}`)
    .then((response) => response.data);

export { getAccountSettings };
