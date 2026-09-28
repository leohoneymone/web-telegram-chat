import { useMutation, useQuery } from '@tanstack/react-query';

import useAuthorizationStore from '../shared/auth/store';
import { getAccountSettings } from '../shared/auth/api';
import { getChatHistory, getChats } from '../entities/chats/api';
import { sendMessage } from '../entities/messages/api';

import type { MessagePayload } from '../entities/messages/types';
import type { ChatHistoryPayload } from '../entities/chats/types';

/**
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

/**
 * @see https://console.green-api.com/app/api/sendMessage
 */
export const useSendMessage = (onError?: () => void) => {
  const { apiTokenInstance } = useAuthorizationStore();

  return useMutation({
    mutationFn: (payload: MessagePayload) => sendMessage(payload, apiTokenInstance),
    onError: onError,
  });
};

export const useGetChatHistory = (payload: ChatHistoryPayload) => {
  const { idInstance, apiTokenInstance } = useAuthorizationStore();

  return useQuery({
    queryKey: ['tg-chat-history', idInstance, apiTokenInstance, payload.chatId],
    queryFn: () => getChatHistory(payload, apiTokenInstance),
    enabled: !!idInstance && !!apiTokenInstance && !!payload.chatId,
  });
};
