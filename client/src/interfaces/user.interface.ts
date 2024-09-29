export interface IUser {
  id: string;
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: UserRoleEnum[];
  banned: boolean;
  banReason: BanReasonEnum[];
  updatedAt: Date;
}

export interface IUserRegistration
  extends Omit<IUser, "id" | "roles" | "banned" | "banReason" | "updatedAt"> {
  passwordRepeat: string;
  id?: string;
  roles?: UserRoleEnum[];
  banned?: boolean;
  banReason?: BanReasonEnum[];
  updatedAt?: Date;
}

export enum UserRoleEnum {
  ADMIN,
  USER,
  GUEST
}

export enum BanReasonEnum {
  SPAM = "SPAM", // За спам
  HARASSMENT = "HARASSMENT", // За оскорбления или преследования
  CHEATING = "CHEATING", // За мошенничество или использование читов
  TOXICITY = "TOXICITY", // За токсичное поведение
  INAPPROPRIATE_CONTENT = "INAPPROPRIATE_CONTENT", // За размещение неприемлемого контента
  IMPERSONATION = "IMPERSONATION", // За попытку выдать себя за другого человека
  HATE_SPEECH = "HATE_SPEECH", // За разжигание ненависти
  MULTI_ACCOUNTING = "MULTI_ACCOUNTING", // За многократные учетные записи
  VIOLATION_OF_TERMS = "VIOLATION_OF_TERMS", // За нарушение условий использования
  FRAUD = "FRAUD" // За мошеннические действия
}
