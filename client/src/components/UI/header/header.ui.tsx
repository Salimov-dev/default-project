import { FC, useState } from "react";
import { Layout, theme } from "antd";
import styled from "styled-components";
import AuthPage from "@pages/auth/auth.page";
import HeaderLoginButton from "./components/login-button.header";
import HeaderCollapseButton from "./components/collapse-button.header";

const Component = styled(Layout.Header)`
  padding: 0 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface IProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Header: FC<IProps> = ({ collapsed, setCollapsed }): JSX.Element => {
  const [isAuthPageOpen, setIsAuthPageOpen] = useState(false);

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Component
      style={{
        background: colorBgContainer
      }}
    >
      <HeaderCollapseButton collapsed={collapsed} setCollapsed={setCollapsed} />
      <HeaderLoginButton setIsAuthPageOpen={setIsAuthPageOpen} />

      <AuthPage
        isAuthPageOpen={isAuthPageOpen}
        setIsAuthPageOpen={setIsAuthPageOpen}
      />
    </Component>
  );
};

export default Header;
