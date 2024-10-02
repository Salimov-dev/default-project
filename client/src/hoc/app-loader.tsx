import { useAuthStore } from "@store";
import useUserStore from "@store/use-user.store";
import { FC, useEffect } from "react";
import { shallow } from "zustand/shallow";

interface IProps {
  children: React.ReactElement;
}

const AppLoader: FC<IProps> = ({ children }) => {
  const refreshTokens = useAuthStore((state) => state.refreshTokens, shallow);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refreshTokens();
    }
    // findAllUsers();
  }, [refreshTokens]);

  return children;
};

export default AppLoader;
