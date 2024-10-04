import { Spin } from "antd";
import { FC } from "react";

interface IProps {
  spinning: boolean;
  children: React.ReactNode;
}

const SpinStyled: FC<IProps> = ({ spinning, children }): JSX.Element => {
  return <Spin spinning={spinning}>{children}</Spin>;
};

export default SpinStyled;
