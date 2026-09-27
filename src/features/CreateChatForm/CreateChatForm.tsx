import { useState, type FC } from 'react';
import styles from './CreateChatForm.module.scss';

import { chechAccount } from '../../entities/chats/api';
import { useGetChats } from '../queries';
import { useQueryClient } from '@tanstack/react-query';
import useChatStore from '../../entities/chats/store';
import useAuthorizationStore from '../../shared/auth/store';

import useMessage from 'antd/es/message/useMessage';
import { Button, Form, Input, Modal, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

interface CreateChatFormProps {
  collapsed?: boolean;
}

interface CreateChatFormValue {
  phoneNumber: number;
}

export const CreateChatForm: FC<CreateChatFormProps> = ({ collapsed }) => {
  const [msg, ctx] = useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const { apiTokenInstance } = useAuthorizationStore();

  const { selectChat } = useChatStore();
  const chats = useGetChats();
  const queryClient = useQueryClient();

  const handleCreateChat = async (values: CreateChatFormValue) => {
    setLoading(true);
    const check = await queryClient.query({
      queryKey: ['tg-check-account', values.phoneNumber],
      queryFn: () => chechAccount(values.phoneNumber, apiTokenInstance),
    });

    // Проверка начличия пользователя в Telegram
    if (!check.exist) {
      msg.error(
        `Пользователь с номером ${values.phoneNumber} не найден. Пожалуйста, убедитеcь в правильности набранного номера`,
      );
      setLoading(false);
      return;
    }

    if (check.exist) {
      // Проверка существования чата
      const alreadyExistingChat = chats.data?.find((chat) => chat.chatId == check.chatId);
      if (alreadyExistingChat) {
        msg.info(
          `У вас уже есть чат с пользователем с номером ${values.phoneNumber}. Перенаправляю в чат c ${alreadyExistingChat.name}`,
        );
        selectChat(alreadyExistingChat.chatId);
        setLoading(false);
        setOpened(false);
        return;
      }

      // Cоздание чата
      msg.success(`Чат с пользователем с номером ${values.phoneNumber} успешно создан`);
      selectChat(check.chatId);
      setLoading(false);
      setOpened(false);
    }
  };

  return (
    <>
      {ctx}
      {collapsed ? (
        <Tooltip placement="right" title="Создать чат">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            className={styles.button}
            onClick={() => setOpened(true)}
          />
        </Tooltip>
      ) : (
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          className={styles.button}
          onClick={() => setOpened(true)}
        >
          Создать чат
        </Button>
      )}

      <Modal open={opened} onCancel={() => setOpened(false)} footer={false}>
        <h2>Создать чат</h2>
        <Form<CreateChatFormValue>
          layout="vertical"
          className={styles.form}
          onFinish={handleCreateChat}
        >
          <Form.Item
            label={`Номер телефона (Только цифры, без знака "+")`}
            name="phoneNumber"
            rules={[{ required: true, message: 'Поажлуйста укажите номер телефона' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submit} loading={loading}>
              {!loading && 'Ввод'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
