import type { FC } from 'react';

import { ConfigProvider, Layout } from 'antd';
import { themeConfig } from './themeConfig';
import locale from 'antd/locale/ru_RU';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ChatHeader } from '../widgets/ChatHeader/ChatHeader';
import { UserList } from '../widgets/UserList/UserList';
import { MessageContainer } from '../widgets/MessageContainer/MessageContainer';

export const App: FC = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ConfigProvider locale={locale} theme={themeConfig}>
        <Layout className="app">
          <ChatHeader />
          <Layout>
            <UserList />
            <MessageContainer />
          </Layout>
        </Layout>
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
