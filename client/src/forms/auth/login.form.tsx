import { FC } from "react";
import type { FormInstance, FormProps } from "antd";
import { shallow } from "zustand/shallow";
import { Button, Flex, Form } from "antd";
import { useAuthStore } from "@store";
import { ErrorMessagesEnum } from "@utils/errors/error-messages-enum.utils";
import { ILoginData } from "@interfaces/auth.interface";
import { InputStyled, SpinStyled } from "@common";
import { showNotification } from "@utils/show-notification/show-notification.utils";
import { regexPatterns } from "@utils/regex/regex.utils";

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

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    login(values as ILoginData);
    form.resetFields();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {
    showNotification({
      type: "error",
      message: ErrorMessagesEnum.FORM.LOGIN.MESSAGE,
      description: ErrorMessagesEnum.FORM.LOGIN.DESCRIPTION
    });
  };

  return (
    <SpinStyled spinning={isLoading} height="50%">
      <Form
        name="login"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          hasFeedback
          rules={[
            { required: true, message: ErrorMessagesEnum.AUTH.EMAIL.REQUIRED },
            {
              whitespace: true,
              message: ErrorMessagesEnum.AUTH.EMAIL.EMPTY
            },
            {
              pattern: regexPatterns.EMAIL,
              message: ErrorMessagesEnum.AUTH.EMAIL.VALIDATE
            },
            {
              min: 8,
              max: 30,
              message: ErrorMessagesEnum.AUTH.EMAIL.LENGTH
            }
          ]}
        >
          <InputStyled
            placeholder="Введите email"
            autoComplete="email"
            value={form.getFieldValue("email")}
            onChange={(e) => form.setFieldsValue({ email: e.target.value })}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: ErrorMessagesEnum.AUTH.PASSWORD.VALIDATE
            },
            {
              whitespace: true,
              message: ErrorMessagesEnum.AUTH.PASSWORD.EMPTY
            }
          ]}
        >
          <InputStyled
            isPassword
            value={form.getFieldValue("password")}
            onChange={(e) => form.setFieldsValue({ password: e.target.value })}
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
