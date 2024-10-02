import { createWithEqualityFn } from "zustand/traditional";
import authService from "@services/auth-service";
import { jwtDecode } from "jwt-decode";
import { handleErrorNotification } from "@utils/errors/handle-error-notification";
import { ILoginData, IRegistrationUser } from "@interfaces/auth.interface";
import { UserRoleEnum } from "@interfaces/user.interface";
import { errorMessagesEnum } from "@utils/errors/error-messages.enum";
import { IAuthUser } from "@interfaces/auth.interface";

interface IAuthState {
  authUser: IAuthUser | null;
  isLoading: boolean;
  isAuth: boolean;
  error: string | null;
  register: (newUser: IRegistrationUser) => void;
  login: (loginData: ILoginData) => void;
  refreshTokens: () => void;
}

interface IDecodedToken {
  email: string;
  exp: number;
  iat: number;
  id: string;
  roles: UserRoleEnum[];
}

const useAuthStore = createWithEqualityFn<IAuthState>((set, get) => ({
  authUser: null,
  isLoading: false,
  isAuth: false,
  error: null,

  register: async (newUser: IRegistrationUser) => {
    set({ isLoading: true, error: null });

    try {
      const data = await authService.register(newUser);
      return data;
    } catch (error) {
      handleErrorNotification(
        error,
        set,
        errorMessagesEnum.AUTH.REGISTER.REGISTER_ERROR
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
        throw new Error(errorMessagesEnum.AUTH.LOGIN.ACCESS_TOKEN_NOT_FOUND);
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
      handleErrorNotification(
        error,
        set,
        errorMessagesEnum.AUTH.LOGIN.LOGIN_ERROR
      );
    } finally {
      set({ isLoading: false });
    }
  },

  refreshTokens: async () => {
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
      handleErrorNotification(
        error,
        set,
        errorMessagesEnum.AUTH.TOKEN.REFRESH_TOKEN
      );
    }
  }
}));

export default useAuthStore;
