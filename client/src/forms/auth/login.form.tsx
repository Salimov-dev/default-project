import { FC } from "react";
import styled from "styled-components";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { errorMessagesEnum } from "@utils/errors/error-messages.enum";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginForm: FC = (): JSX.Element => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Логин"
        name="username"
        rules={[
          { required: true, message: errorMessagesEnum.AUTH.LOGIN.REQUIRED }
        ]}
      >
        <Input placeholder="Введите логин" autoComplete="username" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Пароль"
        name="password"
        rules={[
          { required: true, message: errorMessagesEnum.AUTH.PASSWORD.VALIDATE }
        ]}
      >
        <Input.Password
          placeholder="Введите пароль"
          autoComplete="new-password"
        />
      </Form.Item>

      <Footer>
        <Form.Item<FieldType> name="remember" valuePropName="checked">
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Footer>
    </Form>
  );
};

export default LoginForm;
