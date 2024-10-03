import { Button, ButtonProps } from "antd";
import { FC } from "react";

interface IProps extends ButtonProps {
  onClick: () => void;
  text: string;
}

const ButtonStyled: FC<IProps> = ({ onClick, text, ...rest }): JSX.Element => {
  return (
    <Button type="primary" onClick={onClick} {...rest}>
      {text}
    </Button>
  );
};

export default ButtonStyled;
