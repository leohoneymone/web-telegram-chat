import { useState, type FC } from 'react';
import styles from './ChatList.module.scss';

import Sider from 'antd/es/layout/Sider';
import { Listy } from 'antd';

import type { Chat } from '../../entities/chats/types';
import { ChatItem } from '../../entities/chats/ChatItem/ChatItem';
import { useGetChats } from '../../features/queries';
import { CreateChatForm } from '../../features/CreateChatForm/CreateChatForm';

export const ChatList: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const { data, isSuccess } = useGetChats();

  return (
    <Sider
      collapsible
      className={styles.list}
      width={400}
      collapsed={collapsed}
      onCollapse={(collapsed) => setCollapsed(collapsed)}
    >
      {isSuccess && (
        <>
          <CreateChatForm collapsed={collapsed} />
          <Listy<Chat>
            items={data.filter((item) => item.type !== 'channel')}
            itemRender={(item) => <ChatItem chatInfo={item} collapsed={collapsed} />}
            rowKey="chatId"
          />
        </>
      )}
    </Sider>
  );
};
