import { createWithEqualityFn } from "zustand/traditional";
import authService from "@services/auth/auth-service";

import { handleErrorNotification } from "@utils/errors/handle-error-notification";
import { ILoginData, IRegistrationUser } from "@interfaces/auth";
import { IUser } from "@interfaces/user.interface";

interface IAuthState {
  authUser: IUser | null;
  users: IUser[];
  isLoading: boolean;
  error: string | null;
  register: (newUser: IRegistrationUser) => void;
  login: (loginData: ILoginData) => void;
}

const useAuthStore = createWithEqualityFn<IAuthState>((set, get) => ({
  authUser: null,
  users: [],
  isLoading: false,
  error: null,

  register: async (newUser: IRegistrationUser) => {
    set({ isLoading: true, error: null });

    try {
      const data = await authService.register(newUser);
      return data;
    } catch (error) {
      handleErrorNotification(error, set, "Ошибка регистрации");
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (loginData: ILoginData) => {
    set({ isLoading: true, error: null });

    try {
      const data = await authService.login(loginData);
      console.log("data");

      return data;
    } catch (error) {
      handleErrorNotification(error, set, "Ошибка входа");
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useAuthStore;
