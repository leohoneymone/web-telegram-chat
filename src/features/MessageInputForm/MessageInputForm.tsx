import React, { useState, type FC } from 'react';
import styles from './MessageInputForm.module.scss';

import { SendOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import useMessage from 'antd/es/message/useMessage';

import useChatStore from '../../entities/chats/store';
import { useSendMessage } from '../queries';

export const MessageInputForm: FC = () => {
  const [text, setText] = useState<string>('');
  const [msg, ctx] = useMessage();

  const logError = () => {
    msg.error('Не удалось отправить сообщение');
  };

  const { currentChatId } = useChatStore();
  const { mutateAsync } = useSendMessage(logError);

  const handleMessageSend = async () => {
    await mutateAsync({ chatId: currentChatId as string, message: text, typingTime: 1000 });
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      handleMessageSend();
    }
  };

  return (
    <>
      {ctx}
      <Space.Compact>
        <TextArea
          placeholder="Введите сообщение"
          className={styles.input}
          autoSize={{ minRows: 1 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Tooltip placement="topRight" title="Отправить сообщение">
          <Button
            type="primary"
            icon={<SendOutlined />}
            className={styles.submit}
            onClick={handleMessageSend}
          />
        </Tooltip>
      </Space.Compact>
    </>
  );
};
