import { IUser } from "@interfaces/user.interface";
import userService from "@services/user.service";
import { errorMessagesEnum } from "@utils/errors/error-messages-enum.utils";
import { handleFetchErrorNotification } from "@utils/errors/handle-fetch-error-notification.utils";
import { createWithEqualityFn } from "zustand/traditional";

interface IUserState {
  users: IUser[] | null;
  isLoading: boolean;
  error: string | null;
  findAll: () => void;
  findById: (userId: string) => Promise<IUser | undefined>;
}

const useUserStore = createWithEqualityFn<IUserState>((set) => ({
  users: null,
  isLoading: false,
  error: null,

  findAll: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await userService.findAll();
      set({ users: data });
    } catch (error) {
      handleFetchErrorNotification(error, set, errorMessagesEnum.USER.FIND_ALL);
    } finally {
      set({ isLoading: false });
    }
  },

  findById: async (userId: string) => {
    set({ isLoading: true, error: null });

    try {
      const data = await userService.findById(userId);

      return data;
    } catch (error) {
      handleFetchErrorNotification(
        error,
        set,
        errorMessagesEnum.USER.FIND_BY_ID
      );
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useUserStore;
