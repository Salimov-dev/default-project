import { FC, memo } from "react";
import { shallow } from "zustand/shallow";
import { MenuProps, Modal, Spin } from "antd";
import { useAuthStore } from "@store";
import useFindUserById from "@hooks/user/use-find-user-by-id.hook";
import DropdownStyled from "@common/dropdown/dropdown-styled.common";
import ButtonStyled from "@common/buttons-styled/buttons-styled.common";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined
} from "@ant-design/icons";

interface IProps {
  setIsAuthPageOpen: (value: boolean) => void;
}

const HeaderLoginButton: FC<IProps> = memo(
  ({ setIsAuthPageOpen }): JSX.Element => {
    const isAuth = useAuthStore((state) => state.isAuth);
    const isLoading = useAuthStore((state) => state.isLoading);
    const logout = useAuthStore((state) => state.logout);
    const authUser = useAuthStore((state) => state.authUser, shallow);
    const user = useFindUserById(authUser?.id);

    const showModal = () => {
      setIsAuthPageOpen(true);
    };

    const menuItems: MenuProps["items"] = [
      {
        key: "1",
        label: "Мой профиль"
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
      },
      {
        key: "5",
        label: "Выйти",
        icon: <LogoutOutlined />,
        onClick: () => {
          Modal.confirm({
            title: "Точно выйти из системы?",
            okText: "Выйти",
            okType: "danger",
            cancelText: "Остаться",
            onOk: () => {
              logout();
            }
          });
        }
      }
    ];

    if (isLoading) {
      return <Spin size="small" />;
    }

    return isAuth ? (
      <DropdownStyled
        items={menuItems}
        title={user ? `${user?.firstName} ${user?.lastName}` : "Аноним"}
      />
    ) : (
      <ButtonStyled
        onClick={showModal}
        text="Войти"
        danger
        isLoading={isLoading}
        icon={<UserOutlined />}
      />
    );
  }
);

export default HeaderLoginButton;
