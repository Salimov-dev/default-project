import { createWithEqualityFn } from "zustand/traditional";
import authService from "@services/auth/auth-service";
import { IUser, IUserRegistration } from "@interfaces/user.interface";
import { handleErrorNotification } from "@utils/errors/get-error-notification";

interface IAuthState {
  authUser: IUser | null;
  users: IUser[];
  isLoading: boolean;
  error: string | null;
  register: (newUser: IUserRegistration) => void;
}

const useAuthStore = createWithEqualityFn<IAuthState>((set, get) => ({
  authUser: null,
  users: [],
  isLoading: false,
  error: null,

  register: async (newUser: IUserRegistration) => {
    set({ isLoading: true, error: null });

    try {
      const data = await authService.register(newUser);
      return data;
    } catch (error) {
      handleErrorNotification(error, set);
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useAuthStore;
