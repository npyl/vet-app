import { List, ListItem } from "@/components/List";
import { SectionHeader } from "@/components/Section";
import Grid from "@mui/material/Grid";

interface PersonalInfoProps {
    firstName: string;
    lastName: string;
}

const PersonalInfo = ({ firstName, lastName }: PersonalInfoProps) => (
    <>
        <SectionHeader title="Personal Info" icon="clarity:form-line" />
        <Grid container mb={2}>
            <Grid item xs={6}>
                <List>
                    <ListItem label="First name" value={firstName} />
                </List>
            </Grid>
            <Grid item xs={6}>
                <List>
                    <ListItem label="Last name" value={lastName} />
                </List>
            </Grid>
        </Grid>
    </>
);

export default PersonalInfo;
