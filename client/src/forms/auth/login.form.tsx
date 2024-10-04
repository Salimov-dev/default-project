import { FC, useEffect, useState } from "react";
import type { FormInstance, FormProps } from "antd";
import { Button, Flex, Form, Input } from "antd";
import { errorMessagesEnum } from "@utils/errors/error-messages-enum.utils";
import { useAuthStore } from "@store";
import { shallow } from "zustand/shallow";
import { ILoginData } from "@interfaces/auth.interface";

import SpinStyled from "@common/spin-styled/spin-styled";
import { showNotification } from "@utils/show-notification/show-notification.utils";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

interface IProps {
  form: FormInstance;
}

const LoginForm: FC<IProps> = ({ form }): JSX.Element => {
  const login = useAuthStore((state) => state.login, shallow);
  const isLoading = useAuthStore((state) => state.isLoading, shallow);
  const errorAuth = useAuthStore((state) => state.error, shallow);
  const [error, setError] = useState(errorAuth);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    login(values as ILoginData);

    if (!error) {
      form.resetFields();
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    showNotification({
      type: "error",
      message: errorMessagesEnum.AUTH.LOGIN.LOGIN_ERROR,
      description: errorInfo.errorFields
        .map((error) => `${error.name.join(", ")}: ${error.errors.join(", ")}`)
        .join("; ")
    });
  };

  useEffect(() => {
    setError(errorAuth);
  }, []);

  return (
    <SpinStyled spinning={isLoading}>
      <Form
        name="login"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: errorMessagesEnum.AUTH.LOGIN.REQUIRED }
          ]}
        >
          <Input placeholder="Введите email" autoComplete="email" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: errorMessagesEnum.AUTH.PASSWORD.VALIDATE
            },
            {
              min: 8,
              max: 30,
              message: "Почта должна быть от 8 до 30 символов"
            }
          ]}
        >
          <Input.Password
            placeholder="Введите пароль"
            autoComplete="new-password"
          />
        </Form.Item>

        <Flex justify="center" align="center">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </SpinStyled>
  );
};

export default LoginForm;
