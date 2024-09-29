import { notification } from "antd";
import { AxiosError } from "axios";
import { errorMessagesEnum } from "./error-messages.enum";

export const handleErrorNotification = (
  error: AxiosError | unknown,
  set: ({ error }: { error: string }) => void
) => {
  if (error instanceof AxiosError && error.response) {
    const errorMessage = error.response.data.message;

    if (!errorMessage) {
      set({ error: errorMessagesEnum.REQUEST_ERROR.UNKNOWN });
    }

    if (Array.isArray(errorMessage)) {
      errorMessage.forEach((msg: string, index: number) => {
        setTimeout(() => {
          notification.error({
            message: "Ошибка регистрации",
            description: msg
          });
        }, index * 300);
      });
    } else {
      notification.error({
        message: "Ошибка регистрации",
        description: errorMessage
      });
    }

    set({ error: errorMessage });
  } else {
    set({ error: errorMessagesEnum.REQUEST_ERROR.UNKNOWN });
  }
};
