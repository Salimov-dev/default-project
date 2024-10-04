import { useCallback, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { useUserStore } from "@store";
import { IUser } from "@interfaces/user.interface";

const useFindUserById = (userId: string | undefined): IUser | null => {
  const [user, setUser] = useState<IUser | null | undefined>(null);

  const findUserById = useUserStore((state) => state.findById, shallow);

  const getUser = useCallback(
    async (userId: string) => {
      if (!userId) {
        return null;
      }

      const userData = await findUserById(userId);
      setUser(userData);
    },
    [findUserById]
  );

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId, getUser]);

  if (!user) {
    return null;
  }

  return user;
};

export default useFindUserById;
