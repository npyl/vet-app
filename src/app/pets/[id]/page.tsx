"use client";
import {
    List,
    ListBooleanItem,
    ListDateItem,
    ListItem,
} from "@/components/List";
import useDialog from "@/hooks/useDialog";
import { Avatar, Button, Skeleton, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import EditDialog from "../Dialogs/AddOrEdit";
import BookDialog from "./Book";
import { useAppointments, usePetById } from "./hook";
import Iconify from "@/components/iconify";

const PetPage = () => {
    const { id } = useParams();

    const { appointments, isLoading: isAppointmentsLoading } =
        useAppointments(+id);
    const { pet } = usePetById(+id);

    const [isEditOpen, openEdit, closeEdit] = useDialog();
    const [isBookOpen, openBook, closeBook] = useDialog();

    return (
        <>
            <Paper
                elevation={10}
                sx={{
                    mt: 2,
                    position: "relative",
                }}
            >
                <Stack
                    sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                    }}
                    direction="row"
                    spacing={0.5}
                >
                    <Button
                        variant="outlined"
                        onClick={openBook}
                        startIcon={<Iconify icon="tabler:sthetoscope" />}
                    >
                        Appointments
                        {isAppointmentsLoading ? (
                            <Skeleton
                                sx={{
                                    width: "100px",
                                }}
                                animation="wave"
                            />
                        ) : (
                            ` (${appointments.length})`
                        )}
                    </Button>

                    <Button variant="contained" onClick={openEdit}>
                        Edit
                    </Button>
                </Stack>

                <Stack p={2} alignItems="center">
                    <Avatar
                        src={pet?.photo || ""}
                        sx={{
                            height: "150px",
                            width: "150px",
                        }}
                    />

                    <Typography variant="h6" flex={1} mt={1}>
                        {pet?.name}
                    </Typography>
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
                <Divider />
                <Grid container>
                    <Grid item xs={6}>
                        <List>
                            <ListItem label={"Type"} value={pet?.type} />
                            <ListItem label={"Gender"} value={pet?.gender} />
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <List>
                            <ListItem
                                label={"Blood Type"}
                                value={pet?.blood_type}
                            />
                            <ListItem label={"Race"} value={pet?.race} />
                        </List>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container>
                    <Grid item xs={6}>
                        <List>
                            <ListItem label={"Color"} value={pet?.color} />
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <List>
                            <ListItem
                                label={"Secondary Color"}
                                value={pet?.secondary_color}
                            />
                        </List>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container>
                    <Grid item xs={6}>
                        <List>
                            <ListBooleanItem
                                label="Passport"
                                status={!!pet?.passport}
                            />
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <List>
                            <ListBooleanItem
                                label={"Chipped"}
                                status={!!pet?.microchip_date}
                            />
                            {pet?.microchip_date ? (
                                <>
                                    <ListDateItem
                                        label="Microchip Date"
                                        value={pet?.microchip_date}
                                    />
                                    <ListItem
                                        label="Microchip Code"
                                        value={pet?.microchip_code}
                                    />
                                </>
                            ) : null}
                        </List>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container>
                    <Grid item xs={6}>
                        <List>
                            <ListBooleanItem
                                label={"Neutered"}
                                status={!!pet?.neutered}
                            />
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <List>
                            <ListBooleanItem
                                label="Dead"
                                status={!!pet?.dead}
                            />
                        </List>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container>
                    <Grid item xs={6}>
                        <List>
                            <ListItem label={"Notes"} value={pet?.notes} />
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <List>
                            <ListItem
                                label={"Therapy Notes"}
                                value={pet?.therapy_notes}
                            />
                        </List>
                    </Grid>
                </Grid>
            </Paper>

            {/* Dialogs */}

            {isEditOpen ? (
                <EditDialog open={isEditOpen} pet={pet} onClose={closeEdit} />
            ) : null}

            {isBookOpen ? (
                <BookDialog
                    open={isBookOpen}
                    petId={id ? +id : -1}
                    onClose={closeBook}
                />
            ) : null}
        </>
    );
};

export default PetPage;
