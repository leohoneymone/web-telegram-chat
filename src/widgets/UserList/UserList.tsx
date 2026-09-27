import type { FC, ReactNode } from 'react';
import styles from './UserList.module.scss';

import Sider from 'antd/es/layout/Sider';
import { Listy } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export const UserList: FC = () => {
  type Item = {
    id: string;
    content: ReactNode;
  };

  const testUserList: Item[] = [
    {
      id: 'Ivan',
      content: (
        <>
          <UserOutlined /> Ivan
        </>
      ),
    },
    {
      id: 'Grisha',
      content: (
        <>
          <UserOutlined /> Grisha
        </>
      ),
    },
  ];

  return (
    <Sider collapsible className={styles.list} width={600}>
      <Listy<Item> items={testUserList} itemRender={(item) => item.content} rowKey="id" />
    </Sider>
  );
};
