// Working Hours

import CustomTimePicker from "@/components/WorkingHoursPicker";

const getNames = (day: string) => ({
    day: `${day[0].toUpperCase()}${day.slice(1)}`,
    name1: `workingHours.${day}.0`,
    name2: `workingHours.${day}.1`,
});

const Page3 = () => (
    <>
        <CustomTimePicker {...getNames("monday")} />
        <CustomTimePicker {...getNames("tuesday")} />
        <CustomTimePicker {...getNames("wednesday")} />
        <CustomTimePicker {...getNames("thursday")} />
        <CustomTimePicker {...getNames("friday")} />
    </>
);

export default Page3;
