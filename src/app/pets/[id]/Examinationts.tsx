"use client";

import { List, ListDateItem, ListItem } from "@/components/List";
import { Edit } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { usePetById } from "./hook";

const Examinations = () => {
    const { id } = useParams();
    const { pet } = usePetById(+id);

    return (
        <Paper>
            <Stack p={2} position="relative">
                <Typography variant="h5">Examinations</Typography>
                <IconButton
                    sx={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                    }}
                >
                    <Edit />
                </IconButton>
            </Stack>
            <Divider />
            <Grid container>
                <Grid item xs={6}>
                    <List>
                        <ListItem label={"Age"} value={pet?.age} />
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <ListItem label={"Weight"} value={pet?.weight} />
                        <ListDateItem
                            label={"Birthday"}
                            value={pet?.birthday}
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Examinations;
