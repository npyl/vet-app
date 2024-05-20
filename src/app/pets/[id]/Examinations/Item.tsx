import { List, ListItem } from "@/components/List";
import { Edit } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IExaminationHistory } from "@/types/examination";
import { alpha } from "@mui/material/styles";
import Iconify from "@/components/iconify/iconify";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useToggle from "@/hooks/useToggle";
import MedicationListItem from "./MedicationListItem";

interface ExaminationItemProps {
    e: IExaminationHistory;
    isVet: boolean;
    expanded: boolean;
    onEditClick: (id: number) => void;
}

const ExaminationItem = ({
    e,
    isVet,
    expanded: initialExpanded,
    onEditClick,
}: ExaminationItemProps) => {
    const handleEditClick = () => onEditClick(e?.appointment?.id);

    const [expanded, toggleExpanded] = useToggle(initialExpanded);

    return (
        <>
            <Stack
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

                <Stack
                    direction="row"
                    spacing={1}
                    position="absolute"
                    top="50%"
                    right={0}
                    px={2}
                    sx={{
                        transform: "translateY(-50%)",
                    }}
                >
                    {/* Only for Vets: Edit Mode */}
                    {isVet ? (
                        <IconButton
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleEditClick}
                        >
                            <Edit />
                        </IconButton>
                    ) : null}

                    <IconButton
                        onClick={toggleExpanded}
                        sx={{
                            transform: expanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 0.3s ease-in-out",
                        }}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Stack>
            </Stack>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Grid container>
                    <Grid item xs={6}>
                        <List>
                            <ListItem label="Weight" value={e?.weight} />
                            <ListItem
                                label="Temperature"
                                value={e?.temperature}
                            />
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
                            <ListItem
                                label="Lymph Nodes"
                                value={e?.lymphNodes}
                            />
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
                            <ListItem label="Notes" value={e?.notes} />
                            <ListItem label="Therapy" value={e?.therapy} />
                        </List>
                    </Grid>

                    <Grid item xs={6}>
                        <List>
                            <MedicationListItem
                                label="Medication"
                                medication={e?.medication}
                            />
                        </List>
                    </Grid>
                </Grid>
            </Collapse>
        </>
    );
};

export default ExaminationItem;
