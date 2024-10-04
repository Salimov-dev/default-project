import { FC, useState } from "react";
import styled from "styled-components";
import { Flex, FormInstance, Segmented } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { LoginForm, RegisterForm } from "@forms/auth";

interface IProps {
  form: FormInstance;
}

const SegmentedStyled = styled(Segmented)`
  margin: 0 0 30px 0;
`;

const Component = styled(Flex)`
  margin: 30px 0 -20px 0;
`;

const options = [
  { label: "ВОЙТИ", value: "login", icon: <LoginOutlined /> },
  {
    label: "РЕГИСТРАЦИЯ",
    value: "register",
    icon: <UserAddOutlined />
  }
];

const ContentAuthPage: FC<IProps> = ({ form }): JSX.Element => {
  const [segment, setSegment] = useState("login");

  const handleSegmentChange = (value: unknown) => {
    setSegment(value as string);
  };

  return (
    <Component vertical>
      <SegmentedStyled options={options} block onChange={handleSegmentChange} />
      {segment === "login" ? (
        <LoginForm form={form} />
      ) : (
        <RegisterForm form={form} />
      )}
    </Component>
  );
};

export default ContentAuthPage;
