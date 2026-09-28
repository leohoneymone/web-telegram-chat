import { useState, type FC } from 'react';
import styles from './AuthorizationForm.module.scss';

import { Button, Form, Input, Modal } from 'antd';

import useAuthorizationStore from '../../shared/auth/store';
import { useGetAccountSettings } from '../queries';
import useMessage from 'antd/es/message/useMessage';
import type { AuthorizationProperties } from '../../shared/auth/types';
import { UserInfo } from '../UserInfo/UserInfo';

export const AuthorizationForm: FC = () => {
  const [msg, ctx] = useMessage();

  const { idInstance, apiTokenInstance, setInstanceId, setInstanceApiToken } =
    useAuthorizationStore();
  const [opened, setOpened] = useState<boolean>(false);

  const isAuthorized: boolean = !!idInstance && !!apiTokenInstance;

  const auth = useGetAccountSettings();

  const handleAuthorization = async (values: AuthorizationProperties) => {
    setOpened(true);

    if (values.idInstance && values.apiTokenInstance) {
      setInstanceId(values.idInstance);
      setInstanceApiToken(values.apiTokenInstance);
    }

    await auth;
    if (auth.isError) {
      msg.error(`Ошибка авторизации: ${auth.error.message}`);
      setInstanceId(undefined);
      setInstanceApiToken(undefined);
      return;
    }

    msg.success(`Добро пожаловать`);
    setOpened(false);
  };

  return (
    <>
      {ctx}
      <UserInfo onClick={() => setOpened(true)} />

      <Modal open={opened || !isAuthorized} onCancel={() => setOpened(false)} footer={false}>
        <div className={styles.modal}>
          {isAuthorized ? (
            <>
              <h2>Смена пользователя</h2>
              <p>
                Для смены пользователя укажите свои учётные данные для{' '}
                <a href="https://green-api.com/telegram">Green-API</a>
              </p>
            </>
          ) : (
            <>
              <h2>Авторизация</h2>
              <p>
                Похоже, вы не авторизованы в системе. Пожалуйста, используйте свои учётные данные
                для{' '}
                <a href="https://green-api.com/telegram" target="_blank">
                  Green-API
                </a>{' '}
                чтобы полyчать и отправлять сообщения в Telegram
              </p>
            </>
          )}

          <Form<AuthorizationProperties>
            layout="vertical"
            onFinish={handleAuthorization}
            initialValues={{
              idInstance: idInstance,
              apiTokenInstance: apiTokenInstance,
            }}
          >
            <Form.Item
              label="Instance ID"
              name="idInstance"
              rules={[{ required: true, message: 'Поажлуйста, ведите idInstance' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Instance API Token:"
              name="apiTokenInstance"
              rules={[{ required: true, message: 'Поажлуйста, ведите apiTokenInstance' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <div className={styles.inputs}>
                {!isAuthorized ? (
                  <Button type="primary" htmlType="submit">
                    Вход
                  </Button>
                ) : (
                  <>
                    <Button
                      type="primary"
                      danger
                      htmlType="button"
                      onClick={() => setOpened(false)}
                    >
                      Отмена
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Вход
                    </Button>
                  </>
                )}
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
