import { notification } from "antd";

/**
 * Функция выводит полученное сообщение на экран пользователя с помощью Notification
 *
 * @param {NotificationType | unknown} type - тип уведомления ("success", "info", "warning", "error")
 * @param {string} message - передаваемое сообщение
 * @param {string} description - описание подробностей сообщения
 * @returns {void} - ничего не возвращает
 */

type NotificationType = "success" | "info" | "warning" | "error";

interface IProps {
  type: NotificationType;
  message: string;
  description: string;
}

export const showNotification = ({ type, message, description }: IProps) => {
  notification[type]({
    message: message,
    description: description,
    showProgress: true,
    pauseOnHover: true
  });
};
