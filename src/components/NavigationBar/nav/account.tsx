import VetBadge from "@/components/VetBadge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getProfile } from "@/Auth";
import SignOutButton from "./SignOutButton";
import NextLink from "next/link";
import { AccountContainer, ProfileButton } from "./styled";

const NavAccount = async () => {
    const user = await getProfile({});

    return (
        <AccountContainer>
            <ProfileButton
                component={NextLink}
                href={`/profile/${user?.id || -1}`}
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar src={user?.avatar || ""} />
                    {user?.type === "VET" ? <VetBadge /> : null}
                </Stack>
                <Typography variant="button">{user?.email}</Typography>
            </ProfileButton>

            <SignOutButton />
        </AccountContainer>
    );
};

export default NavAccount;
