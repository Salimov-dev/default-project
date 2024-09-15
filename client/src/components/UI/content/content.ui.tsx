import { Layout, theme } from "antd";
import { FC } from "react";

const { Content: Component } = Layout;

interface IProps {
  children: React.ReactNode;
}

const Content: FC<IProps> = ({ children }): JSX.Element => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  return (
    <Component
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG
      }}
    >
      {children}
    </Component>
  );
};

export default Content;
