import type { FC } from 'react';
import styles from './UserInfo.module.scss';

import { useGetAccountSettings } from '../queries';
import { Avatar, Skeleton } from 'antd';

interface UserInfoProps {
  onClick?: () => void;
}

export const UserInfo: FC<UserInfoProps> = ({ onClick }) => {
  const { data, isFetching, isError } = useGetAccountSettings();

  return (
    <div className={`${styles.userinfo} ${!!onClick && styles.clickable}`} onClick={onClick}>
      {isFetching || isError ? (
        <>
          <Skeleton.Avatar size={32} shape="circle" active className={styles.placeholder} />
          <Skeleton active title={false} paragraph={{ rows: 1, width: 100 }} />
        </>
      ) : (
        <>
          <Avatar src={data?.avatar} shape="circle">
            {data?.username[1]}
          </Avatar>
          <span>{data?.username.slice(1)}</span>
        </>
      )}
    </div>
  );
};
