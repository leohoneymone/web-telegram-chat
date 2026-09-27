import type { FC } from 'react';
import styles from './ChatHeader.module.scss';

import { Header } from 'antd/es/layout/layout';

export const ChatHeader: FC = () => (
  <Header className={styles.header}>
    <h1 className={styles.title}>Web Telegram Chat</h1>
  </Header>
);
