import axios, { AxiosResponse } from "axios";
import config from "@config/config.json";
import { IUser } from "@interfaces/user.interface";
import {
  IAuthResponse,
  ILoginData,
  IRegistrationUser
} from "@interfaces/auth.interface";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "auth/",
  params: {},
  withCredentials: true
});

const authService = {
  register: async (newUser: IRegistrationUser): Promise<IUser> => {
    const { data } = await httpAuth.post("register", newUser);
    return data;
  },

  login: async (loginData: ILoginData): Promise<IAuthResponse> => {
    const { data }: AxiosResponse<IAuthResponse> = await httpAuth.post(
      "login",
      loginData
    );
    return data;
  },

  logout: async (): Promise<void> => {
    await httpAuth.get("logout");
    return;
  },

  refreshTokens: async (): Promise<IAuthResponse> => {
    const { data } = await httpAuth.get<IAuthResponse>("refresh-tokens");
    return data;
  }
};

export default authService;
