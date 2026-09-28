import type { FC } from 'react';

import { ConfigProvider, Layout } from 'antd';
import { themeConfig } from './themeConfig';
import locale from 'antd/locale/ru_RU';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ChatHeader } from '../widgets/ChatHeader/ChatHeader';
import { ChatList } from '../widgets/ChatList/ChatList';
import { MessageContainer } from '../widgets/MessageContainer/MessageContainer';
import { NotificationList } from '../widgets/NotificationList/NotificationList';

export const App: FC = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ConfigProvider locale={locale} theme={themeConfig}>
        <Layout className="app">
          <ChatHeader />
          <Layout>
            <ChatList />
            <MessageContainer />
          </Layout>
        </Layout>
        <NotificationList />
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
