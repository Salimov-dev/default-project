import { FC, useEffect } from "react";

interface IProps {
  children: React.ReactElement;
}

const AppLoader: FC<IProps> = ({ children }) => {
  useEffect(() => {}, []);

  return children;
};

export default AppLoader;
