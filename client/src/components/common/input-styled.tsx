import { FC } from "react";
import { Input } from "antd";

interface IProps {
  value?: string;
  placeholder?: string;
  autoComplete?: string;
  placeholderPassword?: string;
  disabled?: boolean;
  isPassword?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputStyled: FC<IProps> = ({
  value,
  placeholder,
  disabled = false,
  autoComplete,
  isPassword = false,
  onChange,
  placeholderPassword = "Введите пароль"
}) => {
  return !isPassword ? (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoComplete={autoComplete}
    />
  ) : (
    <Input.Password
      placeholder={placeholderPassword}
      value={value}
      onChange={onChange}
      autoComplete="new-password"
    />
  );
};

export default InputStyled;
