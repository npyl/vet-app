"use client";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface DiagramsProps {
    onOpenExaminations: VoidFunction;
}

const Diagrams = ({ onOpenExaminations }: DiagramsProps) => {
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
            </Stack>
        </Paper>
    );
};

export default Diagrams;
