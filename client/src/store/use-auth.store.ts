import { createWithEqualityFn } from "zustand/traditional";
import authService from "@services/auth-service";
import { jwtDecode } from "jwt-decode";
import { handleFetchErrorNotification } from "@utils/errors/handle-fetch-error-notification.utils";
import { ILoginData, IRegistrationUser } from "@interfaces/auth.interface";
import { UserRoleEnum } from "@interfaces/user.interface";
import { ErrorMessagesEnum } from "@utils/errors/error-messages-enum.utils";
import { IAuthUser } from "@interfaces/auth.interface";

interface IAuthState {
  authUser: IAuthUser | null;
  isLoading: boolean;
  isAuth: boolean;
  error: string | null;
  register: (newUser: IRegistrationUser) => void;
  login: (loginData: ILoginData) => void;
  logout: () => void;
  refreshTokens: () => void;
}

interface IDecodedToken {
  email: string;
  exp: number;
  iat: number;
  id: string;
  roles: UserRoleEnum[];
}

const useAuthStore = createWithEqualityFn<IAuthState>((set) => ({
  authUser: null,
  isLoading: false,
  isAuth: false,
  error: null,

  register: async (newUser: IRegistrationUser) => {
    set({ isLoading: true, error: null });

    try {
      const data = await authService.register(newUser);

      const loginData: ILoginData = {
        email: newUser.email,
        password: newUser.password
      };

      await useAuthStore.getState().login(loginData);

      return data;
    } catch (error) {
      handleFetchErrorNotification(
        error,
        set,
        ErrorMessagesEnum.AUTH.REGISTER.REGISTER_ERROR
      );
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (loginData: ILoginData) => {
    set({ isLoading: true, error: null });

    try {
      const { accessToken } = await authService.login(loginData);

      if (!accessToken) {
        throw new Error(ErrorMessagesEnum.AUTH.LOGIN.ACCESS_TOKEN_NOT_FOUND);
      }

      localStorage.setItem("token", accessToken);
      set({ isAuth: true });

      const decodedToken: IDecodedToken = jwtDecode(accessToken);
      const { email, id, roles } = decodedToken;

      set({
        authUser: {
          id: id,
          email,
          roles
        }
      });

      return;
    } catch (error) {
      handleFetchErrorNotification(
        error,
        set,
        ErrorMessagesEnum.AUTH.LOGIN.LOGIN_ERROR
      );
    } finally {
      set({ isLoading: false });
    }
  },

  refreshTokens: async () => {
    set({ isLoading: true, error: null });

    try {
      const { accessToken } = await authService.refreshTokens();

      localStorage.setItem("token", accessToken);
      set({ isAuth: true });

      const decodedToken: IDecodedToken = jwtDecode(accessToken);

      const { email, id, roles } = decodedToken;

      set({
        authUser: {
          id: id,
          email,
          roles
        }
      });
    } catch (error) {
      handleFetchErrorNotification(
        error,
        set,
        ErrorMessagesEnum.AUTH.TOKEN.REFRESH_TOKEN
      );
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await authService.logout();
      localStorage.removeItem("token");
      set({ isAuth: false, authUser: null });
    } catch (error) {
      handleFetchErrorNotification(
        error,
        set,
        ErrorMessagesEnum.AUTH.TOKEN.REFRESH_TOKEN
      );
    }
  }
}));

export default useAuthStore;
