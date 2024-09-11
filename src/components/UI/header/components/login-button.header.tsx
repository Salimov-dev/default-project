import { Button } from "antd";
import { FC } from "react";

interface IProps {
  setIsModalOpen: (value: boolean) => void;
}
const HeaderLoginButton: FC<IProps> = ({ setIsModalOpen }): JSX.Element => {
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Button type="primary" danger onClick={showModal}>
      Войти
    </Button>
  );
};

export default HeaderLoginButton;
