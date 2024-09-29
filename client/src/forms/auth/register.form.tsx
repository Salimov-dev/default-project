import { FC } from "react";
import styled from "styled-components";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { errorMessagesEnum } from "@utils/errors/error-messages.enum";
import { regexPatterns } from "@utils/regex/regex";
import useAuthStore from "@store/use-auth.store";
import { IUserRegistration } from "@interfaces/user.interface";
import { shallow } from "zustand/shallow";

type FieldType = {
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  passwordRepeat?: string;
  remember?: string;
};

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const RegisterForm: FC = (): JSX.Element => {
  const [form] = useForm();

  const register = useAuthStore((state) => state.register, shallow);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    register(values as IUserRegistration);
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="register"
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item<FieldType> // TODO сделать ограничения по мин и макс символам, только латиница
        label="Логин"
        name="userName"
        validateTrigger="onSubmit"
        hasFeedback
        rules={[
          {
            required: true,
            message: errorMessagesEnum.AUTH.LOGIN.REQUIRED
          }
        ]}
      >
        <Input placeholder="Введите логин" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Имя"
        name="firstName"
        validateTrigger="onSubmit"
        hasFeedback
        rules={[
          {
            required: true,
            message: errorMessagesEnum.AUTH.FIRST_NAME.REQUIRED
          }
        ]}
      >
        <Input placeholder="Введите имя" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Фамилия"
        name="lastName"
        validateTrigger="onSubmit"
        hasFeedback
        rules={[
          {
            required: true,
            message: errorMessagesEnum.AUTH.LAST_NAME.REQUIRED
          }
        ]}
      >
        <Input placeholder="Введите фамилию" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Почта"
        name="email"
        validateTrigger="onSubmit"
        hasFeedback
        rules={[
          {
            required: true,
            message: errorMessagesEnum.AUTH.EMAIL.REQUIRED
          },
          {
            pattern: regexPatterns.EMAIL,
            message: errorMessagesEnum.AUTH.EMAIL.VALIDATE
          }
        ]}
      >
        <Input placeholder="Введите email" autoComplete="email" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Пароль"
        name="password"
        validateTrigger="onSubmit"
        hasFeedback
        rules={[
          {
            required: true,
            message: errorMessagesEnum.AUTH.PASSWORD.REQUIRED
          },
          {
            min: 8,
            pattern: regexPatterns.PASSWORD,
            message: errorMessagesEnum.AUTH.PASSWORD.VALIDATE
          }
        ]}
      >
        <Input.Password
          placeholder="Введите пароль"
          autoComplete="new-password"
        />
      </Form.Item>
      <Form.Item<FieldType>
        label="Повторите пароль"
        name="passwordRepeat"
        validateTrigger="onSubmit"
        hasFeedback
        rules={[
          {
            required: true,
            message: errorMessagesEnum.AUTH.PASSWORD.REQUIRED_REPEAT
          },
          {
            min: 8,
            pattern: regexPatterns.PASSWORD,
            message: errorMessagesEnum.AUTH.PASSWORD.VALIDATE
          },
          {
            validator(_, value) {
              const password = form.getFieldValue("password");

              if (!value || password !== value) {
                return Promise.reject(
                  new Error(errorMessagesEnum.AUTH.PASSWORD.MISMATCH)
                );
              }

              return Promise.resolve();
            }
          }
        ]}
      >
        <Input.Password
          placeholder="Повторите пароль"
          autoComplete="new-password"
        />
      </Form.Item>

      <Footer>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Регистрация
          </Button>
        </Form.Item>
      </Footer>
    </Form>
  );
};

export default RegisterForm;
