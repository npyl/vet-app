import { paper } from "@/theme/css";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
    ...paper(theme.palette.background.paper),
    paddingBottom: theme.spacing(2),
}));

export { StyledPaper };
