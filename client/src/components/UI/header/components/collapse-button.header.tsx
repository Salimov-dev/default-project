import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";

interface IProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const HeaderCollapseButton: FC<IProps> = ({
  collapsed,
  setCollapsed
}): JSX.Element => {
  return (
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
  );
};

export default HeaderCollapseButton;
