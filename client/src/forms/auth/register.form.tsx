import { FC } from "react";
import type { FormInstance, FormProps } from "antd";
import { Button, Flex, Form, Input } from "antd";
import { shallow } from "zustand/shallow";
import { regexPatterns } from "@utils/regex/regex";
import { errorMessagesEnum } from "@utils/errors/error-messages.enum";
import { useAuthStore } from "@store";
import { IRegistrationUser } from "@interfaces/auth.interface";
import { showNotification } from "@utils/show-notification/show-notification";
import SpinStyled from "@common/spin-styled/spin-styled";

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
  const error = useAuthStore((state) => state.error, shallow);
  const hasError = !!error?.length;

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    register(values as IRegistrationUser);

    if (!hasError) {
      form.resetFields();
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    showNotification({
      type: "error",
      message: errorMessagesEnum.AUTH.REGISTER.REGISTER_ERROR,
      description: errorInfo.errorFields
        .map((error) => `${error.name.join(", ")}: ${error.errors.join(", ")}`)
        .join("; ")
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
              message: errorMessagesEnum.AUTH.LOGIN.REQUIRED
            },
            {
              min: 3,
              max: 30,
              message: "Псевдоним пользователя должен быть от 3 до 30 символов"
            }
          ]}
        >
          <Input placeholder="Введите псевдоним пользователя" />
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
            },
            {
              min: 3,
              max: 20,
              message: "Имя должно быть от 3 до 20 символов"
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
            },
            {
              min: 3,
              max: 30,
              message: "Фамилия должна быть от 3 до 20 символов"
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
            },
            {
              min: 3,
              max: 30,
              message: "Почта должна быть от 3 до 30 символов"
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
