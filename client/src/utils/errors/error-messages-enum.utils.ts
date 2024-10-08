/**
 * Коллекция различных ошибок
 */

export const ErrorMessagesEnum = {
  REQUEST_ERROR: {
    UNKNOWN: "Неизвестная ошибка"
  },
  REGISTER: {
    EMAIL: {
      REQUIRED: "Введите почту",
      VALIDATE: "Email введен некорректно",
      LENGTH: "Почта должна быть от 3 до 30 символов"
    }
  },
  FORM: {
    LOGIN: {
      MESSAGE: "Заполните форму",
      DESCRIPTION: "Введите email и пароль для доступа"
    },
    REGISTER: {
      REGISTER_ERROR: "Заполните форму",
      DESCRIPTION: "Введите значения во все поля формы"
    }
  },
  AUTH: {
    EMAIL: {
      REQUIRED: "Введите почту",
      EMPTY: "Email пустым быть не может",
      LENGTH: "Почта должна быть от 8 до 30 символов",
      VALIDATE: "Email введен некорректно"
    },
    PASSWORD: {
      REQUIRED: "Введите пароль",
      EMPTY: "Email пустым быть не может",
      REQUIRED_REPEAT: "Введите пароль",
      VALIDATE:
        "Пароль должен содержать не менее 8 символов, 1 заглавную букву, 1 цифру и 1 спецсимвол",
      MISMATCH: "Введенные пароли не совпадают"
    },
    LOGIN: {
      ACCESS_TOKEN_NOT_FOUND: "Access token не найден",
      LOGIN_ERROR: "Ошибка входа"
    },
    REGISTER: {
      REGISTER_ERROR: "Ошибка при регистрации"
    },
    FIRST_NAME: {
      REQUIRED: "Введите имя",
      LENGTH: "Имя должно быть от 3 до 20 символов"
    },
    LAST_NAME: {
      REQUIRED: "Введите фамилию",
      LENGTH: "Фамилия должна быть от 3 до 20 символов"
    },
    USER_NAME: {
      REQUIRED: "Введите псевдоним",
      LENGTH: "Псевдоним пользователя должен быть от 3 до 20 символов"
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
