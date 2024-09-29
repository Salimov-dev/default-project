import axios from "axios";
import config from "@config/config.json";
import { IUserRegistration } from "@interfaces/user.interface";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "auth/",
  params: {}
});

const authService = {
  register: async (newUser: IUserRegistration) => {
    const { data } = await httpAuth.post(`register`, newUser);
    return data;
  }
};

export default authService;
