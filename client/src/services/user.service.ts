import { IUser } from "@interfaces/user.interface";
import httpService from "./http.service";

const userEndPoint = "/user";

const userService = {
  findAll: async (): Promise<IUser[]> => {
    const { data } = await httpService.get(userEndPoint);
    return data;
  },
  findById: async (userId: string): Promise<IUser> => {
    const path = "find-by-id";
    const { data } = await httpService.get(`${userEndPoint}/${path}/${userId}`);
    return data;
  }
};

export default userService;
