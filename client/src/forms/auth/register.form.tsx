import { FC } from "react";
import type { FormInstance, FormProps } from "antd";
import { Button, Flex, Form, Input } from "antd";
import { shallow } from "zustand/shallow";
import { useAuthStore } from "@store";
import { IRegistrationUser } from "@interfaces/auth.interface";
import { InputStyled, SpinStyled } from "@common";
import { regexPatterns } from "@utils/regex/regex.utils";
import { ErrorMessagesEnum } from "@utils/errors/error-messages-enum.utils";
import { showNotification } from "@utils/show-notification/show-notification.utils";

type FieldType = {
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  passwordRepeat?: string;
  remember?: string;
};

interface IProps {
  form: FormInstance;
}

const RegisterForm: FC<IProps> = ({ form }): JSX.Element => {
  const register = useAuthStore((state) => state.register, shallow);
  const isLoading = useAuthStore((state) => state.isLoading, shallow);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    register(values as IRegistrationUser);
    form.resetFields();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {
    showNotification({
      type: "error",
      message: ErrorMessagesEnum.FORM.REGISTER.REGISTER_ERROR,
      description: ErrorMessagesEnum.FORM.REGISTER.DESCRIPTION
    });
  };

  return (
    <SpinStyled spinning={isLoading}>
      <Form
        name="register"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<FieldType>
          label="Псевдоним"
          name="userName"
          validateTrigger="onSubmit"
          hasFeedback
          rules={[
            {
              required: true,
              message: ErrorMessagesEnum.AUTH.USER_NAME.REQUIRED
            },
            {
              min: 3,
              max: 20,
              message: ErrorMessagesEnum.AUTH.USER_NAME.LENGTH
            }
          ]}
        >
          <InputStyled
            placeholder="Введите псевдоним пользователя"
            value={form.getFieldValue("userName")}
            onChange={(e) => form.setFieldsValue({ userName: e.target.value })}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Имя"
          name="firstName"
          validateTrigger="onSubmit"
          hasFeedback
          rules={[
            {
              required: true,
              message: ErrorMessagesEnum.AUTH.FIRST_NAME.REQUIRED
            },
            {
              min: 3,
              max: 20,
              message: ErrorMessagesEnum.AUTH.FIRST_NAME.LENGTH
            }
          ]}
        >
          <InputStyled
            placeholder="Введите имя"
            value={form.getFieldValue("firstName")}
            onChange={(e) => form.setFieldsValue({ firstName: e.target.value })}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Фамилия"
          name="lastName"
          validateTrigger="onSubmit"
          hasFeedback
          rules={[
            {
              required: true,
              message: ErrorMessagesEnum.AUTH.LAST_NAME.REQUIRED
            },
            {
              min: 3,
              max: 30,
              message: ErrorMessagesEnum.AUTH.LAST_NAME.LENGTH
            }
          ]}
        >
          <InputStyled
            placeholder="Введите фамилию"
            value={form.getFieldValue("lastName")}
            onChange={(e) => form.setFieldsValue({ lastName: e.target.value })}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Почта"
          name="email"
          validateTrigger="onSubmit"
          hasFeedback
          rules={[
            {
              required: true,
              message: ErrorMessagesEnum.REGISTER.EMAIL.REQUIRED
            },
            {
              pattern: regexPatterns.EMAIL,
              message: ErrorMessagesEnum.REGISTER.EMAIL.VALIDATE
            },
            {
              min: 3,
              max: 30,
              message: ErrorMessagesEnum.REGISTER.EMAIL.LENGTH
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
          validateTrigger="onSubmit"
          hasFeedback
          rules={[
            {
              required: true,
              message: ErrorMessagesEnum.AUTH.PASSWORD.REQUIRED
            },
            {
              min: 8,
              pattern: regexPatterns.PASSWORD,
              message: ErrorMessagesEnum.AUTH.PASSWORD.VALIDATE
            }
          ]}
        >
          <InputStyled
            isPassword
            value={form.getFieldValue("password")}
            onChange={(e) => form.setFieldsValue({ password: e.target.value })}
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
              message: ErrorMessagesEnum.AUTH.PASSWORD.REQUIRED_REPEAT
            },
            {
              min: 8,
              pattern: regexPatterns.PASSWORD,
              message: ErrorMessagesEnum.AUTH.PASSWORD.VALIDATE
            },
            {
              validator(_, value) {
                const password = form.getFieldValue("password");

                if (!value || password !== value) {
                  return Promise.reject(
                    new Error(ErrorMessagesEnum.AUTH.PASSWORD.MISMATCH)
                  );
                }

                return Promise.resolve();
              }
            }
          ]}
        >
          <InputStyled
            isPassword
            placeholderPassword="Повторите пароль"
            value={form.getFieldValue("passwordRepeat")}
            onChange={(e) =>
              form.setFieldsValue({ passwordRepeat: e.target.value })
            }
          />
        </Form.Item>

        <Flex justify="center" align="center">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Регистрация
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </SpinStyled>
  );
};

export default RegisterForm;
