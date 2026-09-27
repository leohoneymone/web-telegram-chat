import type { FC } from 'react';
import styles from './ChatItem.module.scss';

import type { Chat } from '../types';
import { Avatar, Tooltip } from 'antd';
import useChatStore from '../store';

interface ChatItemProps {
  chatInfo: Chat;
  collapsed?: boolean;
}

export const ChatItem: FC<ChatItemProps> = ({ chatInfo, collapsed }) => {
  const { currentChatId, selectChat } = useChatStore();

  const avatarHue: number =
    [...chatInfo.name].reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 360;

  return collapsed ? (
    <Tooltip placement="right" title={chatInfo.name}>
      <div
        className={`${styles.collapsed} ${chatInfo.chatId == currentChatId && styles.selected}`}
        onClick={() => selectChat(chatInfo.chatId)}
      >
        <Avatar style={{ background: `hsl(${avatarHue}, 55%, 55%)` }}>
          {chatInfo.name[0].toUpperCase()}
        </Avatar>
      </div>
    </Tooltip>
  ) : (
    <div
      className={`${styles.chat} ${chatInfo.chatId == currentChatId && styles.selected}`}
      onClick={() => selectChat(chatInfo.chatId)}
    >
      <Avatar style={{ background: `hsl(${avatarHue}, 55%, 55%)` }}>
        {chatInfo.name[0].toUpperCase()}
      </Avatar>
      <span>{chatInfo.name}</span>
    </div>
  );
};
