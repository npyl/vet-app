import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const VetBadge = (props: BoxProps) => (
    <Box
        px={1}
        border="1px solid"
        borderColor="success.dark"
        borderRadius="10px"
        bgcolor="success.light"
        {...props}
    >
        <Typography color="success.dark">VET</Typography>
    </Box>
);

export default VetBadge;
