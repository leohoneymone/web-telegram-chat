import type { FC } from 'react';
import { ConfigProvider, Layout } from 'antd';
import { themeConfig } from './themeConfig';
import { ChatHeader } from '../widgets/ChatHeader/ChatHeader';
import { UserList } from '../widgets/UserList/UserList';
import { MessageContainer } from '../widgets/MessageContainer/MessageContainer';

export const App: FC = () => {
  return (
    <ConfigProvider theme={themeConfig}>
      <Layout className="app">
        <ChatHeader />
        <Layout>
          <UserList />
          <MessageContainer />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
