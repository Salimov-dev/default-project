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
        "Пароль должен содержать не менее 8 символов, 1 заглавную букву и 1 цифру",
      MISMATCH: "Введенные пароли не совпадают"
    },
    LOGIN: {
      REQUIRED: "Введите логин"
    },
    FIRST_NAME: {
      REQUIRED: "Введите имя"
    },
    LAST_NAME: {
      REQUIRED: "Введите фамилию"
    }
  }
};
