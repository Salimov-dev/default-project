import { FC, useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { shallow } from "zustand/shallow";
import { useAuthStore } from "@store";
import ModalStyled from "@common/modal-styled/modal-styled.common";
import ContentAuthPage from "./components/content.auth-page";

interface IProps {
  isAuthPageOpen: boolean;
  setIsAuthPageOpen: (value: boolean) => void;
}

const AuthPage: FC<IProps> = ({
  isAuthPageOpen,
  setIsAuthPageOpen
}): JSX.Element => {
  const [form] = useForm();

  const isAuth = useAuthStore((state) => state.isAuth, shallow);

  const handleOk = () => {
    setIsAuthPageOpen(false);
  };

  const handleCancel = () => {
    setIsAuthPageOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    if (isAuth) {
      setIsAuthPageOpen(false);
    }
  }, [isAuth, setIsAuthPageOpen]);

  return (
    <ModalStyled open={isAuthPageOpen} onOk={handleOk} onCancel={handleCancel}>
      <ContentAuthPage form={form} />
    </ModalStyled>
  );
};

export default AuthPage;
