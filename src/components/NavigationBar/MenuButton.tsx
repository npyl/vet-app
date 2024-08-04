import IconButton from "@mui/material/IconButton";
import MenuOutlined from "@mui/icons-material/MenuOutlined";

const MenuButton = () => (
    <IconButton
        sx={{
            display: {
                xs: "block",
                lg: "none",
            },
        }}
    >
        <MenuOutlined />
    </IconButton>
);

export default MenuButton;
