import { notification } from "antd";
import { AxiosError } from "axios";
import { errorMessagesEnum } from "./error-messages-enum.utils";

/**
 * Функция выводит полученную с сервера ошибку на экран пользователя с помощью Notification
 *
 * @param {AxiosError | unknown} error - ошибка с сервера
 * @param {Function} set - метод Zustand, который устанавливает ошибку в store сущности
 * @param {string} message - сообщение из ошибки
 * @returns {void} - ничего не возвращает
 */

export const handleFetchErrorNotification = (
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
