import { MenuProps } from "antd";
import { SettingOutlined } from "@ant-design/icons";

export const menuItems: MenuProps["items"] = [
  {
    key: "1",
    label: "My Account"
  },
  {
    type: "divider"
  },
  {
    key: "2",
    label: "Profile"
  },
  {
    key: "3",
    label: "Billing"
  },
  {
    key: "4",
    label: "Settings",
    icon: <SettingOutlined />
  }
];
