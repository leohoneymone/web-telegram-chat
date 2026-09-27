import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { AuthorizationProperties } from './types';

interface AuthorizationActions {
  setInstanceId: (idInstance?: number) => void;
  setInstanceApiToken: (apiTokenInstance?: string) => void;
}

interface AuthorizationStore extends AuthorizationProperties, AuthorizationActions {}

const initialState: AuthorizationProperties = {
  idInstance: undefined,
  apiTokenInstance: undefined,
};

const useAuthorizationStore = create<AuthorizationStore>()(
  persist(
    immer((set) => ({
      ...initialState,

      setInstanceId: (idInstance) =>
        set((state) => {
          state.idInstance = idInstance;
        }),

      setInstanceApiToken: (apiTokenInstance) =>
        set((state) => {
          state.apiTokenInstance = apiTokenInstance;
        }),
    })),
    {
      name: 'authorization-data',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthorizationStore;
