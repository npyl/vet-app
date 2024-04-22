import { List, ListItem } from "@/components/List";
import { SectionHeader } from "@/components/Section";
import Iconify from "@/components/iconify";
import { IUserWorkplace } from "@/types/user";
import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

interface OfficeProps {
    d?: IUserWorkplace;
}

const Office = ({ d }: OfficeProps) => (
    <>
        <SectionHeader
            title="Workplace"
            icon="material-symbols:work-outline"
            endNode={
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    color="primary.main"
                >
                    <Iconify
                        icon="mdi:telephone-outline"
                        width={23}
                        height={23}
                    />
                    <Typography fontWeight={550}>
                        (+30) {d?.telephone}
                    </Typography>
                </Stack>
            }
        />
        <Grid container mb={2}>
            <Grid item xs={6}>
                <List>
                    <ListItem label="Region" value={d?.region} />
                    <ListItem label="City" value={d?.city} />
                </List>
            </Grid>
            <Grid item xs={6}>
                <List>
                    <ListItem label="Neighbourhood" value={d?.complex} />
                </List>
            </Grid>
        </Grid>
    </>
);

export default Office;
