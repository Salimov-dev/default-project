import { FC } from "react";
import styled from "styled-components";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { errorMessagesEnum } from "@utils/errors/error-messages.enum";
import { useForm } from "antd/es/form/Form";
import { useAuthStore } from "@store";
import { shallow } from "zustand/shallow";
import { ILoginData } from "@interfaces/auth.interface";

type FieldType = {
  email?: string;
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
  const [form] = useForm();

  const login = useAuthStore((state) => state.login, shallow);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    login(values as ILoginData);
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
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
          { required: true, message: errorMessagesEnum.AUTH.PASSWORD.VALIDATE }
        ]}
      >
        <Input.Password
          placeholder="Введите пароль"
          autoComplete="new-password"
        />
      </Form.Item>

      <Footer>
        {/* <Form.Item<FieldType> name="remember" valuePropName="checked">
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item> */}

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
