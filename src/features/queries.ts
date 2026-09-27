import { useQuery } from '@tanstack/react-query';
import useAuthorizationStore from '../shared/auth/store';
import { getAccountSettings } from '../shared/auth/api';

export const useGetAccountSettings = () => {
  const { idInstance, apiTokenInstance } = useAuthorizationStore();

  return useQuery({
    queryKey: ['tg-account-settings', idInstance, apiTokenInstance],
    queryFn: () => getAccountSettings(apiTokenInstance),
    enabled: !!idInstance && !!apiTokenInstance,
  });
};
