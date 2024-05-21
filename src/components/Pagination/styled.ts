import MuiPagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";

const StyledPagination = styled(MuiPagination)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing(2),
}));

export default StyledPagination;
