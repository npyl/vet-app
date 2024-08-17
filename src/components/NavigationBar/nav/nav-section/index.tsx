// @mui
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
//
import { NavSectionProps } from "./types";
import NavList from "./NavList";
import { StyledSubheader } from "./styles";

// ----------------------------------------------------------------------

export default function NavSectionVertical({
    data,
    ...other
}: NavSectionProps) {
    return (
        <Stack {...other}>
            {data.map((group) => {
                const key = group.subheader || group.items[0].title;

                return (
                    <List key={key} disablePadding sx={{ px: 2 }}>
                        {group.subheader && (
                            <StyledSubheader disableSticky>
                                {group.subheader}
                            </StyledSubheader>
                        )}

                        {group.items.map((list) => (
                            <NavList
                                key={list.title + list.path}
                                data={list}
                                depth={1}
                            />
                        ))}
                    </List>
                );
            })}
        </Stack>
    );
}
