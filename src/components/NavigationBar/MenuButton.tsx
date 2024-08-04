import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MenuOutlined from "@mui/icons-material/MenuOutlined";

const MenuButton: React.FC<IconButtonProps> = ({ children, ...props }) => (
    <IconButton {...props}>
        <MenuOutlined />
        {children}
    </IconButton>
);

export default MenuButton;
