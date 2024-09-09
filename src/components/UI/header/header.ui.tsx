import { FC } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";

const { Header: Component } = Layout;

interface IProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Header: FC<IProps> = ({ collapsed, setCollapsed }): JSX.Element => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Component style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64
        }}
      />
    </Component>
  );
};

export default Header;
