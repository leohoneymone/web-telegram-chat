import type { FC } from 'react';
import styles from './MessageItem.module.scss';

import type { Message } from '../types';

interface MessageProps {
  message: Message;
}

export const MessageItem: FC<MessageProps> = ({ message }) => {
  return (
    <div className={`${styles.message} ${styles[message.type]}`}>
      <div className={styles.blob}>
        <span className={styles.username}>{message.senderName}</span>
        <p className={styles.text}>{message.textMessage}</p>
        <div className={styles.tail} />
      </div>
    </div>
  );
};
