import type { FC } from 'react';
import styles from './ChatItem.module.scss';

import type { Chat } from '../types';
import { Avatar, Badge, Tooltip } from 'antd';
import useChatStore from '../store';
import useNotificationStore from '../../notifications/store';

interface ChatItemProps {
  chatInfo: Chat;
  collapsed?: boolean;
}

export const ChatItem: FC<ChatItemProps> = ({ chatInfo, collapsed }) => {
  const { currentChatId, selectChat } = useChatStore();
  const { notificationList } = useNotificationStore();

  const avatarHue: number =
    [...chatInfo.name].reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 360;

  const messagesCount: number = notificationList.filter(
    (item) => item.body.senderData.chatId === chatInfo.chatId,
  ).length;

  return collapsed ? (
    <Tooltip placement="right" title={chatInfo.name}>
      <div
        className={`${styles.collapsed} ${chatInfo.chatId == currentChatId && styles.selected}`}
        onClick={() => selectChat(chatInfo.chatId)}
      >
        <Badge count={messagesCount} overflowCount={99}>
          <Avatar style={{ background: `hsl(${avatarHue}, 55%, 55%)` }}>
            {chatInfo.name[0].toUpperCase()}
          </Avatar>
        </Badge>
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
      <span className={styles.username}>{chatInfo.name}</span>
      {messagesCount !== 0 && (
        <span className={styles.notification}>{messagesCount > 99 ? '99+' : messagesCount}</span>
      )}
    </div>
  );
};
