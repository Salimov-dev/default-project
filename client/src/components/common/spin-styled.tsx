import { Spin } from "antd";
import { FC, memo } from "react";

interface IProps {
  spinning: boolean;
  children: React.ReactNode;
  height?: string;
}

const SpinStyled: FC<IProps> = memo(
  ({ spinning, height = "100%", children }): JSX.Element => {
    return (
      <Spin spinning={spinning} style={{ height: height }}>
        {children}
      </Spin>
    );
  }
);

export default SpinStyled;
