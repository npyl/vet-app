import MenuButton from "./MenuButton";
import Nav from "./nav";

const NavMobile = () => (
    <MenuButton
        sx={{
            display: { xs: "block", lg: "none" },
            position: "fixed",
            top: 10,
            left: 2,
            zIndex: 500,

            "&:focus": {
                ".SidebarDrawer": {
                    display: "flex",
                    position: "fixed",
                    top: 0,
                    zIndex: 1000,
                },
            },
        }}
    >
        <Nav />
    </MenuButton>
);

export default NavMobile;
