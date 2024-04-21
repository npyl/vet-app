import { List, ListItem } from "@/components/List";
import { Edit } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IExaminationHistory } from "@/types/examination";
import { alpha } from "@mui/material/styles";
import Iconify from "@/components/iconify/iconify";

interface ExaminationItemProps {
    e: IExaminationHistory;
    isVet: boolean;
    onEditClick: (id: number) => void;
}

const ExaminationItem = ({ e, isVet, onEditClick }: ExaminationItemProps) => {
    const handleEditClick = () => onEditClick(e.id);

    return (
        <Grid container>
            <Grid
                item
                xs={12}
                px={2}
                py={2}
                position="relative"
                sx={{
                    backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.1),
                }}
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <Iconify
                        icon="carbon:report"
                        width={30}
                        height={30}
                        color="primary.main"
                    />
                    <Typography color="primary.main" variant="h6">
                        {new Date(e?.date).toDateString()}
                    </Typography>
                </Stack>

                {/* Only for Vets: Edit Mode */}
                {isVet ? (
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: 2,
                            right: 2,
                            color: "primary.main",
                        }}
                        onClick={handleEditClick}
                    >
                        <Edit />
                    </IconButton>
                ) : null}
            </Grid>

            <Grid item xs={6}>
                <List>
                    <ListItem label="Weight" value={e?.weight} />
                    <ListItem label="Temperature" value={e?.temperature} />
                    <ListItem label="Heart Rate" value={e?.heartrate} />
                </List>
            </Grid>
            <Grid item xs={6}>
                <List>
                    <ListItem label="C.R.T." value={e?.CRT} />
                    <ListItem label="Tummy" value={e?.tummy} />
                    <ListItem label="Thorax" value={e?.thorax} />
                </List>
            </Grid>
            <Grid item xs={6}>
                <List>
                    <ListItem
                        label="Ears / Eyes / Mouth"
                        value={e?.ears_eyes_mouth}
                    />
                    <ListItem label="Lymph Nodes" value={e?.lymphNodes} />
                    <ListItem
                        label="Penis / Vulva / Breast"
                        value={e?.penis_vulva_breast}
                    />
                </List>
            </Grid>

            <Grid item xs={6}>
                <List>
                    <ListItem label="Findings" value={e?.findings} />
                    <ListItem label="Diagnosis" value={e?.diagnosis} />
                    <ListItem label="Procedure" value={e?.procedure} />

                    <ListItem label="Therapy" value={e?.therapy} />
                    <ListItem label="Notes" value={e?.notes} />
                </List>
            </Grid>
        </Grid>
    );
};

export default ExaminationItem;
