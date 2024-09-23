export const errorMessagesEnum = {
  auth: {
    email: "Email введен неверно",
    password:
      "Пароль должен содержать цифры, заглавные и строчные буквы, а также специальные символы",
    passwordRepeat:
      "Повторный пароль должен содержать цифры, заглавные и строчные буквы, а также специальные символы",
    passwordMinLength: "Минимальная длина пароля не менее 8 символов",
    passwordRepeatMinLength:
      "Минимальная длина повторного пароля не менее 8 символов",
    IsPasswordsMatching: "Пароли не совпадают",
    login: "Не верный логин или пароль",
    register: "Регистрация завершилась ошибкой!",
    emailAlreadyRegistered: "Пользователь с таким email уже зарегистрирован"
  },
  user: {
    create: "Ошибка при создании пользователя"
  }
};
