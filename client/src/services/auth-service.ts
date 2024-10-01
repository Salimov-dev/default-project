import axios, { AxiosResponse } from "axios";
import config from "@config/config.json";
import { IAuthResponse, ILoginData, IRegistrationUser } from "@interfaces/auth";
import { IUser } from "@interfaces/user.interface";

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
  }
};

export default authService;
