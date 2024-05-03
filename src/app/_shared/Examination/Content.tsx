import { RHFOnlyNumbers } from "@/components/hook-form";
import RHFMultilineTextField, {
    RHFMultilineTextFieldProps,
} from "@/components/hook-form/RHFMultiline";
import { Grid, Tab } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import React, { SyntheticEvent, useCallback, useState } from "react";
import TabPanel from "./TabPanel";
import RHFMedicationMultiline from "./RHFMedicationMultiline";

interface ITab {
    label: string;
    name: string;
    Component: React.FC<RHFMultilineTextFieldProps>;
}

const FIELDS = [
    { label: "C.R.T.", name: "CRT" },
    { label: "Tummy", name: "tummy" },
    { label: "Thorax", name: "thorax" },
    { label: "Ears / Eyes / Mouth", name: "ears_eyes_mouth" },
    { label: "Lymph Nodes", name: "lymphNodes" },
    { label: "Penis / Vulva / Breast", name: "penis_vulva_breast" },
];

const TABS: ITab[] = [
    {
        label: "Findings",
        name: "findings",
        Component: RHFMultilineTextField,
    },
    {
        label: "Diagnosis",
        name: "diagnosis",
        Component: RHFMultilineTextField,
    },
    {
        label: "Procedure",
        name: "procedure",
        Component: RHFMultilineTextField,
    },
    {
        label: "Therapy",
        name: "therapy",
        Component: RHFMedicationMultiline,
    },
    {
        label: "Notes",
        name: "notes",
        Component: RHFMultilineTextField,
    },
];

const Content = () => {
    const [tab, setTab] = useState(0);

    const handleTabChange = useCallback(
        (_: SyntheticEvent, t: number) => setTab(t),
        [],
    );

    return (
        <Grid container py={1} spacing={1}>
            {/* Basic Details */}
            <Grid item xs={12} sm={4}>
                <RHFOnlyNumbers label="Weight" name="weight" />
            </Grid>
            <Grid item xs={12} sm={4}>
                <RHFOnlyNumbers label="Temperature" name="temperature" />
            </Grid>
            <Grid item xs={12} sm={4}>
                <RHFOnlyNumbers label="Heart Rate" name="heartrate" />
            </Grid>

            {/* Examination Specific */}
            {FIELDS.map(({ label, name }, i) => (
                <Grid item xs={12} md={6} lg={4} key={i}>
                    <RHFMultilineTextField
                        label={label}
                        name={name}
                        multiline
                        fullWidth
                        rows={5}
                    />
                </Grid>
            ))}

            {/* Note-related tabs */}
            <Grid item xs={12}>
                <Tabs value={tab} onChange={handleTabChange}>
                    {TABS.map(({ label }, i) => (
                        <Tab label={label} key={i} />
                    ))}
                </Tabs>

                {TABS.map(({ label, name, Component }, i) => (
                    <TabPanel value={tab} index={i} key={i} mt={1}>
                        <Component
                            multiline
                            rows={10}
                            label={label}
                            name={name}
                            fullWidth
                        />
                    </TabPanel>
                ))}
            </Grid>
        </Grid>
    );
};

export default Content;
