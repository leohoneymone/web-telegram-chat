import { useQuery } from '@tanstack/react-query';
import useAuthorizationStore from '../shared/auth/store';
import { getAccountSettings } from '../shared/auth/api';
import { getChats } from '../entities/chats/api';

/**
 *
 * @see https://console.green-api.com/app/api/getSettings
 */
export const useGetAccountSettings = () => {
  const { idInstance, apiTokenInstance } = useAuthorizationStore();

  return useQuery({
    queryKey: ['tg-account-settings', idInstance, apiTokenInstance],
    queryFn: () => getAccountSettings(apiTokenInstance),
    enabled: !!idInstance && !!apiTokenInstance,
  });
};

/**
 *
 * @see https://console.green-api.com/app/api/getChats
 */
export const useGetChats = () => {
  const { idInstance, apiTokenInstance } = useAuthorizationStore();

  return useQuery({
    queryKey: ['tg-chats', idInstance, apiTokenInstance],
    queryFn: () => getChats(apiTokenInstance),
    enabled: !!idInstance && !!apiTokenInstance,
  });
};
