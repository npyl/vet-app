"use client";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AnalyticsWebsiteVisits from "./analytics-website-visits";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useExaminations } from "@/hooks/pets";
import { useParams } from "next/navigation";

type TMode = "ALL" | "WEIGHT" | "TEMPERATURE";

interface DiagramsProps {
    onOpenExaminations: VoidFunction;
}

const Diagrams = ({ onOpenExaminations }: DiagramsProps) => {
    const [mode, setMode] = useState<TMode>("ALL");
    const handleModeChange = useCallback(
        (e: SelectChangeEvent<TMode>) => setMode(e.target.value as TMode),
        [],
    );

    const { id } = useParams();
    const { examinations } = useExaminations(+id);

    const { labels, weights, temperatures } = useMemo(
        () => ({
            labels:
                examinations.map(({ date }) => new Date(date).toDateString()) ||
                [],
            weights: examinations.map(({ weight }) => weight) || [],
            temperatures:
                examinations.map(({ temperature }) => temperature) || [],
        }),
        [examinations],
    );

    const series = useMemo(() => {
        return [
            ...(mode === "ALL" || mode === "WEIGHT"
                ? [
                      {
                          name: "Weight",
                          type: "line",
                          fill: "solid",
                          data: weights,
                      },
                  ]
                : []),
            ...(mode === "ALL" || mode === "TEMPERATURE"
                ? [
                      {
                          name: "Temperature",
                          type: "area",
                          fill: "gradient",
                          data: temperatures,
                      },
                  ]
                : []),
        ];
    }, [mode, weights, temperatures]);

    return (
        <Paper
            sx={{
                border: "1px solid #ddd",
            }}
        >
            <Stack p={2} direction="row" spacing={1} position="relative">
                <Typography variant="h5">Examinations</Typography>

                <Button variant="contained" onClick={onOpenExaminations}>
                    Normal
                </Button>

                <Select value={mode} onChange={handleModeChange}>
                    <MenuItem value="ALL">All</MenuItem>
                    <MenuItem value="WEIGHT">Weight</MenuItem>
                    <MenuItem value="TEMPERATURE">Temperature</MenuItem>
                </Select>
            </Stack>

            <AnalyticsWebsiteVisits
                title="Examination Statistics"
                subheader="Normal growth"
                chart={{
                    labels,
                    series,
                }}
            />
        </Paper>
    );
};

export default Diagrams;
