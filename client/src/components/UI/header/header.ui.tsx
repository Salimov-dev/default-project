import { FC, useState } from "react";
import { Button, Layout, theme } from "antd";
import styled from "styled-components";
import { shallow } from "zustand/shallow";
import AuthPage from "@pages/auth/auth.page";
import HeaderLoginButton from "./components/login-button.header";
import HeaderCollapseButton from "./components/collapse-button.header";
import { useAuthStore } from "@store";

const Component = styled(Layout.Header)`
  padding: 0 14px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface IProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Header: FC<IProps> = ({ collapsed, setCollapsed }): JSX.Element => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuth = useAuthStore((state) => state.isAuth, shallow);
  const logout = useAuthStore((state) => state.logout);
  return (
    <Component
      style={{
        background: colorBgContainer
      }}
    >
      <HeaderCollapseButton collapsed={collapsed} setCollapsed={setCollapsed} />
      <HeaderLoginButton setIsModalOpen={setIsModalOpen} />
      {isAuth && <Button onClick={logout}>Выйти</Button>}
      {isAuth ? "Авторизован" : "Залогинься!"}
      <AuthPage isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Component>
  );
};

export default Header;
