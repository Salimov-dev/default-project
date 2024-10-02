import { IUser } from "@interfaces/user.interface";
import userService from "@services/user.service";

import { errorMessagesEnum } from "@utils/errors/error-messages.enum";
import { handleErrorNotification } from "@utils/errors/handle-error-notification";
import { createWithEqualityFn } from "zustand/traditional";

interface IUserState {
  users: IUser[] | null;
  isLoading: boolean;
  error: string | null;
  findAll: () => void;
}

const useUserStore = createWithEqualityFn<IUserState>((set, get) => ({
  users: null,
  isLoading: false,
  error: null,

  findAll: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await userService.findAll();

      set({ users: data });
    } catch (error) {
      handleErrorNotification(error, set, errorMessagesEnum.USER.FIND_ALL);
    } finally {
      set({ isLoading: true });
    }
  }
}));

export default useUserStore;
