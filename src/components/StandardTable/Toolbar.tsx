// @mui
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// components

// ----------------------------------------------------------------------

type Props = {
    filterName: string;
    onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TableToolbar({ filterName, onFilterName }: Props) {
    return (
        <TextField
            fullWidth
            value={filterName}
            onChange={onFilterName}
            placeholder="Search..."
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
}
