import { IUser } from "@interfaces/user.interface";
import httpService from "./http.service";

const userEndPoint = "/user";

const userService = {
  findAll: async (): Promise<IUser[]> => {
    const { data } = await httpService.get(userEndPoint);
    return data;
  }
};

export default userService;
