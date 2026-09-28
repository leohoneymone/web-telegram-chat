import type { FC } from 'react';
import styles from './MessageContainer.module.scss';

import { Content } from 'antd/es/layout/layout';
import { MessageInputForm } from '../../features/MessageInputForm/MessageInputForm';
import useChatStore from '../../entities/chats/store';
import { MessageOutlined } from '@ant-design/icons';
import { useGetChatHistory } from '../../features/queries';
import { MessageItem } from '../../entities/messages/MessageItem/MessageItem';

export const MessageContainer: FC = () => {
  const { currentChatId } = useChatStore();

  const messages = useGetChatHistory({ chatId: currentChatId as string, count: 100 });

  return (
    <Content className={styles.messages}>
      {currentChatId ? (
        <>
          <MessageInputForm />
          <div className={styles.blobs}>
            {messages.data?.map((item) => (
              <MessageItem key={item.idMessage} message={item} />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.placeholder}>
          <MessageOutlined />
          <h2>Выберите или создайте чат</h2>
        </div>
      )}
    </Content>
  );
};
