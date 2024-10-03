import { MenuProps } from "antd";
import { SettingOutlined } from "@ant-design/icons";

export const menuItems: MenuProps["items"] = [
  {
    key: "1",
    label: "My Account",
    disabled: true
  },
  {
    type: "divider"
  },
  {
    key: "2",
    label: "Profile",
    extra: "P⌘"
  },
  {
    key: "3",
    label: "Billing",
    extra: "⌘B"
  },
  {
    key: "4",
    label: "Settings",
    icon: <SettingOutlined />,
    extra: "⌘S"
  }
];
