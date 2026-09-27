import type { FC } from 'react';
import styles from './MessageInputForm.module.scss';

import { SendOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';

export const MessageInputForm: FC = () => {
  return (
    <Space.Compact>
      <TextArea
        placeholder="Введите сообщение"
        className={styles.input}
        autoSize={{ minRows: 1 }}
      />
      <Tooltip placement="topRight" title="Отправить сообщение">
        <Button type="primary" icon={<SendOutlined />} className={styles.submit} />
      </Tooltip>
    </Space.Compact>
  );
};
