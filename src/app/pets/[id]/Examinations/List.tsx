"use client";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { useExaminations } from "@/hooks/pets";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import ExaminationDialog from "../../../_shared/Examination";
import ExaminationItem from "./Item";
import ExaminationItemSkeleton from "./Skeleton";
import { Button } from "@mui/material";

interface ExaminationsListProps {
    onOpenDiagrams: VoidFunction;
}

const ExaminationsList = ({ onOpenDiagrams }: ExaminationsListProps) => {
    const { user } = useAuth();
    const { id } = useParams();
    const { examinations, isLoading, mutate } = useExaminations(+id);

    // INFO: comes from examination
    const [clickedAppointment, setClickedAppointment] = useState(-1);

    return (
        <>
            <Paper
                sx={{
                    border: "1px solid #ddd",
                }}
            >
                <Stack p={2} direction="row" spacing={1} position="relative">
                    <Typography variant="h5">Examinations</Typography>
                    <Button variant="outlined" onClick={onOpenDiagrams}>
                        Diagrams
                    </Button>
                </Stack>

                <Divider />

                {/* Skeleton */}
                {isLoading ? <ExaminationItemSkeleton /> : null}

                {/* Items */}
                {examinations.map((e) =>
                    e ? (
                        <ExaminationItem
                            key={e?.id}
                            e={e}
                            isVet={user?.type === "VET"}
                            onEditClick={setClickedAppointment}
                        />
                    ) : null,
                )}
            </Paper>

            {/* Examination Record */}
            {clickedAppointment !== -1 ? (
                <ExaminationDialog
                    open={clickedAppointment !== -1}
                    appointmentId={clickedAppointment}
                    onMutate={mutate}
                    onClose={() => setClickedAppointment(-1)}
                />
            ) : null}
        </>
    );
};

export default ExaminationsList;
