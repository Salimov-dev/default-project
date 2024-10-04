import { shallow } from "zustand/shallow";
import { FC, memo } from "react";
import { useAuthStore } from "@store";
import useFindUserById from "@hooks/user/use-find-user-by-id.hook";
import DropdownStyled from "@common/dropdown/dropdown-styled.common";
import ButtonStyled from "@common/buttons-styled/buttons-styled.common";
import { MenuProps } from "antd";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";

interface IProps {
  setIsAuthPageOpen: (value: boolean) => void;
}

const HeaderLoginButton: FC<IProps> = memo(
  ({ setIsAuthPageOpen }): JSX.Element => {
    const isAuth = useAuthStore((state) => state.isAuth);
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
          console.log("click");
          logout();
        }
      }
    ];

    return isAuth ? (
      <DropdownStyled
        items={menuItems}
        title={user ? `${user?.firstName} ${user?.lastName}` : "Аноним"}
      />
    ) : (
      <ButtonStyled onClick={showModal} text="Войти" danger />
    );
  }
);

export default HeaderLoginButton;
