import { FC, memo } from "react";
import { Modal } from "antd";

interface IProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  width?: string;
  children: React.ReactNode;
}

const ModalStyled: FC<IProps> = memo(
  ({ open, onOk, onCancel, width = "400px", children }): JSX.Element => {
    return (
      <Modal
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        okText="Подтвердить"
        cancelText="Отменить"
        footer={false}
        width={width}
      >
        {children}
      </Modal>
    );
  }
);

export default ModalStyled;
