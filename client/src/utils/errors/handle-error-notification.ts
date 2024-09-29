import { notification } from "antd";
import { AxiosError } from "axios";
import { errorMessagesEnum } from "./error-messages.enum";

export const handleErrorNotification = (
  error: AxiosError | unknown,
  set: ({ error }: { error: string }) => void,
  message: string
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
            message: message,
            description: msg,
            showProgress: true,
            pauseOnHover: true
          });
        }, index * 300);
      });
    } else {
      notification.error({
        message: message,
        description: errorMessage,
        showProgress: true,
        pauseOnHover: true
      });
    }

    set({ error: errorMessage });
  } else {
    set({ error: errorMessagesEnum.REQUEST_ERROR.UNKNOWN });
  }
};
