/**
 * Коллекция различных регулярных выражений для работы в приложении
 */

export const regexPatterns = {
  EMAIL: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  PASSWORD: /^(?=.*[A-Z])(?=.*\d)/
};
