import { shallow } from "zustand/shallow";
import { FC, memo } from "react";
import { useAuthStore } from "@store";
import useFindUserById from "@hooks/user/use-find-user-by-id.hook";
import DropdownStyled from "@common/dropdown/dropdown-styled.common";
import ButtonStyled from "@common/buttons-styled/buttons-styled.common";
import { menuItems } from "./menu-items.header";

interface IProps {
  setIsModalOpen: (value: boolean) => void;
}

const HeaderLoginButton: FC<IProps> = memo(
  ({ setIsModalOpen }): JSX.Element => {
    const isAuth = useAuthStore((state) => state.isAuth, shallow);
    const authUser = useAuthStore((state) => state.authUser, shallow);
    const user = useFindUserById(authUser?.id);

    const showModal = () => {
      setIsModalOpen(true);
    };

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
