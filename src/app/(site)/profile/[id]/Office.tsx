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
            icon="material-symbols-light:work-outline"
            endNode={
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    color="primary.main"
                >
                    <Stack direction="row" spacing={1}>
                        <Typography fontWeight={700}>ΑΦΜ:</Typography>
                        <Typography fontWeight={550}>{d?.afm}</Typography>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <Iconify
                            icon="mdi:telephone-outline"
                            width={23}
                            height={23}
                        />
                        <Typography fontWeight={550}>
                            (+30) {d?.telephone}
                        </Typography>
                    </Stack>
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
