import type { FC } from 'react';
import styles from './MessageContainer.module.scss';

import { Content } from 'antd/es/layout/layout';
import { MessageInputForm } from '../../features/MessageInputForm/MessageInputForm';
import useChatStore from '../../entities/chats/store';
import { MessageOutlined } from '@ant-design/icons';

export const MessageContainer: FC = () => {
  const { currentChatId } = useChatStore();

  return (
    <Content className={styles.messages}>
      {currentChatId ? (
        <MessageInputForm />
      ) : (
        <div className={styles.placeholder}>
          <MessageOutlined />
          <h2>Выберите или создайте чат</h2>
        </div>
      )}
    </Content>
  );
};
