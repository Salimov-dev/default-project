import { FC, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import styled from "styled-components";
import { Segmented } from "antd";
import ModalStyled from "@common/modal-styled/modal-styled.common";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { LoginForm, RegisterForm } from "@forms/auth";
import { useAuthStore } from "@store";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const SegmentedStyled = styled(Segmented)`
  margin: 0 0 10px 0;
`;

const Content = styled.div`
  width: 100%;
  padding: 30px 0 0 0;
  display: flex;
  flex-direction: column;
`;

const options = [
  { label: "ВОЙТИ", value: "login", icon: <LoginOutlined /> },
  {
    label: "РЕГИСТРАЦИЯ",
    value: "register",
    icon: <UserAddOutlined />
  }
];

const AuthPage: FC<IProps> = ({ isModalOpen, setIsModalOpen }): JSX.Element => {
  const [segment, setSegment] = useState("login");
  const isAuth = useAuthStore((state) => state.isAuth, shallow);

  const handleSegmentChange = (value: unknown) => {
    setSegment(value as string);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isAuth) {
      setIsModalOpen(false);
    }
  }, [isAuth, setIsModalOpen]);

  return (
    <ModalStyled open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Content>
        <SegmentedStyled
          options={options}
          block
          onChange={handleSegmentChange}
        />
        {segment === "login" ? <LoginForm /> : <RegisterForm />}
      </Content>
    </ModalStyled>
  );
};

export default AuthPage;
