import { FC, useState } from "react";
import { Layout, theme } from "antd";
import styled from "styled-components";
import AuthPage from "@pages/auth/auth.page";
import HeaderLoginButton from "./components/login-button.header";
import HeaderCollapseButton from "./components/collapse-button.header";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <HeaderLoginButton setIsModalOpen={setIsModalOpen} />

      <AuthPage isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Component>
  );
};

export default Header;
