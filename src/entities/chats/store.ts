import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ChatStore {
  currentChatId: string | undefined;
  selectChat: (id?: string) => void;
}

const initialState: ChatStore['currentChatId'] = undefined;

const useChatStore = create<ChatStore>()(
  immer((set) => ({
    currentChatId: initialState,

    selectChat: (id) =>
      set((state) => {
        state.currentChatId = id;
      }),
  })),
);

export default useChatStore;
