import {
    List,
    ListBooleanItem,
    ListDateItem,
    ListItem,
} from "@/components/List";
import { Avatar, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import getPetById from "./getPetById";

interface Props {
    petId: number;
}

const PetProfile = async ({ petId }: Props) => {
    const pet = await getPetById(petId);

    return (
        <>
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
                        <ListBooleanItem
                            label="Passport"
                            status={!!pet?.passport}
                        />
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
                            label={"Chipped"}
                            status={!!pet?.microchip_date}
                        />
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List>
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
                        <ListBooleanItem label="Dead" status={!!pet?.dead} />
                    </List>
                </Grid>
            </Grid>
        </>
    );
};

export default PetProfile;
