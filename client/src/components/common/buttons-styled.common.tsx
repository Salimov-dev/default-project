import { Button, ButtonProps } from "antd";
import { FC } from "react";

type ButtonTypes = "primary" | "dashed" | "text" | "link";

interface IProps extends ButtonProps {
  onClick: () => void;
  text: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  type?: ButtonTypes;
}

const ButtonStyled: FC<IProps> = ({
  onClick,
  text,
  isLoading = false,
  icon,
  type = "primary",
  ...rest
}): JSX.Element => {
  return (
    <Button
      type={type}
      onClick={onClick}
      loading={isLoading}
      icon={icon}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default ButtonStyled;
