import { errorMessagesEnum } from "./enum/error-messages.enum";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ErrorService {
  static getErrorMessage(
    arg0: string
  ):
    | string
    | ((
        validationArguments: import("class-validator").ValidationArguments
      ) => string) {
    throw new Error("Method not implemented.");
  }
  getErrorMessage(id: string) {
    const keys = id.split(".");
    let message = errorMessagesEnum;

    for (const key of keys) {
      if (message[key] !== undefined) {
        message = message[key];
      } else {
        return "Неизвестная ошибка";
      }
    }

    return message;
  }
}
