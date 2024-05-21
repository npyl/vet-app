import Iconify from "@/components/iconify";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

const NoMedication = () => (
    <Stack
        width={1}
        height="400px"
        borderRadius="0 0 15px 15px"
        bgcolor="primary.main"
        alignItems="center"
        justifyContent="center"
        spacing={5}
    >
        <Iconify
            icon="game-icons:medicines"
            width={100}
            height={100}
            color="white"
        />
        <Typography variant="h6" color="white">
            No medication
        </Typography>
    </Stack>
);

export default NoMedication;
