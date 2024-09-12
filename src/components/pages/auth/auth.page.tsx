import { FC, useState } from "react";
import styled from "styled-components";
import { Modal, Segmented } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
// forms
import LoginForm from "@forms/auth/login.form";
import RegisterForm from "@forms/auth/register.form";

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

  const handleSegmentChange = (value: unknown) => {
    setSegment(value as string);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Подтвердить"
      cancelText="Отменить"
      footer={false}
      width="400px"
    >
      <Content>
        <SegmentedStyled
          options={options}
          block
          onChange={handleSegmentChange}
        />
        {segment === "login" ? <LoginForm /> : <RegisterForm />}
      </Content>
    </Modal>
  );
};

export default AuthPage;
