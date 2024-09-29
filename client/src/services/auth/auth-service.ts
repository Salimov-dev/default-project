import axios from "axios";
import config from "@config/config.json";
import { ILoginData, IRegistrationUser } from "@interfaces/auth";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "auth/",
  params: {}
});

const authService = {
  register: async (newUser: IRegistrationUser) => {
    const { data } = await httpAuth.post("register", newUser);
    return data;
  },
  login: async (loginData: ILoginData) => {
    const { data } = await httpAuth.post("login", loginData);
    console.log("data", data);

    return data;
  }
};

export default authService;
