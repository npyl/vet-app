"use client";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { useExaminations } from "../hook";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import ExaminationDialog from "../../../_shared/Examination";
import ExaminationItem from "./Item";
import ExaminationItemSkeleton from "./Skeleton";

const ExaminationsList = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const { examinations, isLoading } = useExaminations(+id);

    const [clickedExamination, setClickedExamination] = useState(-1);

    return (
        <>
            <Paper>
                <Stack p={2} position="relative">
                    <Typography variant="h5">Examinations</Typography>
                </Stack>

                <Divider />

                {/* Skeleton */}
                {isLoading ? <ExaminationItemSkeleton /> : null}

                {/* Items */}
                {examinations?.map((e) =>
                    e ? (
                        <ExaminationItem
                            key={e?.id}
                            e={e}
                            isVet={user?.type === "VET"}
                            onEditClick={setClickedExamination}
                        />
                    ) : null,
                )}
            </Paper>

            {/* Examination Record */}
            {clickedExamination !== -1 ? (
                <ExaminationDialog
                    open={clickedExamination !== -1}
                    eventId={clickedExamination}
                    onClose={() => setClickedExamination(-1)}
                />
            ) : null}
        </>
    );
};

export default ExaminationsList;
