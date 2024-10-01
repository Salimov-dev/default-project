import { createWithEqualityFn } from "zustand/traditional";
import authService from "@services/auth-service";
import { jwtDecode } from "jwt-decode";
import { handleErrorNotification } from "@utils/errors/handle-error-notification";
import { ILoginData, IRegistrationUser } from "@interfaces/auth";
import { IUser, UserRoleEnum } from "@interfaces/user.interface";
import { errorMessagesEnum } from "@utils/errors/error-messages.enum";

interface IAuthState {
  authUser: IUser | null;
  users: IUser[];
  isLoading: boolean;
  isAuth: boolean;
  error: string | null;
  register: (newUser: IRegistrationUser) => void;
  login: (loginData: ILoginData) => void;
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
  users: [],
  isLoading: false,
  isAuth: false,
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
      const { accessToken } = await authService.login(loginData);

      if (!accessToken) {
        throw new Error(errorMessagesEnum.AUTH.LOGIN.ACCESS_TOKEN_NOT_FOUND);
      }

      localStorage.setItem("token", accessToken);
      set({ isAuth: true });

      const decodedToken: IDecodedToken = jwtDecode(accessToken);
      const authUserId = decodedToken.id;
      console.log("decodedToken", decodedToken);

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
      handleErrorNotification(error, set, "Ошибка входа");
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useAuthStore;
