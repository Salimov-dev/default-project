import { Button } from "antd";
import { FC } from "react";

interface IProps {
  onClick: () => void;
  text: string;
}

const ButtonStyled: FC<IProps> = ({ onClick, text }): JSX.Element => {
  return (
    <Button type="primary" danger onClick={onClick}>
      {text}
    </Button>
  );
};

export default ButtonStyled;
