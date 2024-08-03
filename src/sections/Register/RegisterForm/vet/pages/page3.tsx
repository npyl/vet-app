// Working Hours

import CustomTimePicker from "@/components/WorkingHoursPicker";
import Typography from "@mui/material/Typography";

const getNames = (day: string) => ({
    day: `${day[0].toUpperCase()}${day.slice(1)}`,
    name1: `workingHours.${day}.0`,
    name2: `workingHours.${day}.1`,
});

const Page3 = () => (
    <>
        <Typography
            variant="h5"
            color="text.secondary"
            textAlign="center"
            mb={2}
        >
            Working Hours
        </Typography>

        <CustomTimePicker {...getNames("monday")} />
        <CustomTimePicker {...getNames("tuesday")} />
        <CustomTimePicker {...getNames("wednesday")} />
        <CustomTimePicker {...getNames("thursday")} />
        <CustomTimePicker {...getNames("friday")} />
    </>
);

export default Page3;
