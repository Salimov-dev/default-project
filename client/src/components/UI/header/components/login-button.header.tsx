import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import { useAuthStore } from "@store";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { FC, memo, useState } from "react";
import useFindUserById from "@hooks/user/use-find-user-by-id.hook";
import { shallow } from "zustand/shallow";

interface IProps {
  setIsModalOpen: (value: boolean) => void;
}

const items: MenuProps["items"] = [
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

const HeaderLoginButton: FC<IProps> = memo(
  ({ setIsModalOpen }): JSX.Element => {
    const [hovered, setHovered] = useState(false);

    const isAuth = useAuthStore((state) => state.isAuth, shallow);
    const authUser = useAuthStore((state) => state.authUser, shallow);
    const user = useFindUserById(authUser?.id);

    const showModal = () => {
      setIsModalOpen(true);
    };

    return isAuth ? (
      <Dropdown menu={{ items }} onOpenChange={() => setHovered(!hovered)}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {user ? `${user?.firstName} ${user?.lastName}` : "Аноним"}
            <DownOutlined
              style={{
                transform: `rotate(${hovered ? "180deg" : "0deg"})`,
                transition: "transform 0.2s ease-in"
              }}
            />
          </Space>
        </a>
      </Dropdown>
    ) : (
      <Button type="primary" danger onClick={showModal}>
        Войти
      </Button>
    );
  }
);

export default HeaderLoginButton;
