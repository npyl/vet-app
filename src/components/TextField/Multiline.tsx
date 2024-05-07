import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const MultilineTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-root": {
        height: "auto!important",
    },
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
        padding: theme.spacing(1),
        paddingLeft: "13px",
        paddingRight: "13px",
    },
}));

export default MultilineTextField;
