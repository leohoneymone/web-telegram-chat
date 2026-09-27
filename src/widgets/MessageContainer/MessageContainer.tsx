import type { FC } from 'react';
import styles from './MessageContainer.module.scss';

import { Content } from 'antd/es/layout/layout';
import { MessageInputForm } from '../../features/MessageInputForm/MessageInputForm';

export const MessageContainer: FC = () => {
  return (
    <Content className={styles.messages}>
      <MessageInputForm />
    </Content>
  );
};
