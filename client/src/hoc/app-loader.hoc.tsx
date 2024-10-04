import { useAuthStore, useUserStore } from "@store";
import { FC, useEffect } from "react";
import { shallow } from "zustand/shallow";

interface IProps {
  children: React.ReactElement;
}

const AppLoader: FC<IProps> = ({ children }) => {
  // const allUsers = useUserStore((state) => state.users);
  // console.log("allUsers", allUsers);

  const findAllUsers = useUserStore((state) => state.findAll);

  const refreshTokens = useAuthStore((state) => state.refreshTokens, shallow);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refreshTokens();
      findAllUsers();
    }
  }, [findAllUsers, refreshTokens]);

  return children;
};

export default AppLoader;
