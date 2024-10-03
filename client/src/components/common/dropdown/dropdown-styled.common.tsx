import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { FC, memo, useState } from "react";

interface IProps {
  items: MenuProps["items"];
  title: string;
}

const DropdownStyled: FC<IProps> = memo(({ items, title }): JSX.Element => {
  const [hovered, setHovered] = useState(false);

  return (
    <Dropdown menu={{ items }} onOpenChange={() => setHovered(!hovered)}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {title}
          <DownOutlined
            style={{
              transform: `rotate(${hovered ? "180deg" : "0deg"})`,
              transition: "transform 0.2s ease-in"
            }}
          />
        </Space>
      </a>
    </Dropdown>
  );
});

export default DropdownStyled;
