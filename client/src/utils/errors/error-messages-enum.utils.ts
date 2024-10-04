/**
 * Коллекция различных ошибок
 */

export const errorMessagesEnum = {
  REQUEST_ERROR: {
    UNKNOWN: "Неизвестная ошибка"
  },
  AUTH: {
    EMAIL: {
      REQUIRED: "Введите почту",
      VALIDATE: "Email введен некорректно"
    },
    PASSWORD: {
      REQUIRED: "Введите пароль",
      REQUIRED_REPEAT: "Введите пароль",
      VALIDATE:
        "Пароль должен содержать не менее 8 символов, 1 заглавную букву, 1 цифру и 1 спецсимвол",
      MISMATCH: "Введенные пароли не совпадают"
    },
    LOGIN: {
      REQUIRED: "Введите логин",
      ACCESS_TOKEN_NOT_FOUND: "Access token не найден",
      LOGIN_ERROR: "Ошибка входа"
    },
    REGISTER: {
      REGISTER_ERROR: "Ошибка при регистрации"
    },
    FIRST_NAME: {
      REQUIRED: "Введите имя"
    },
    LAST_NAME: {
      REQUIRED: "Введите фамилию"
    },
    TOKEN: {
      REFRESH_TOKEN: "Ошибка при запросе refresh токена"
    }
  },
  USER: {
    FIND_ALL: "Список пользователей не получен",
    FIND_BY_ID: "Пользователь по указанному ID не найден"
  }
};
