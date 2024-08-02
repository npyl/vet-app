"use client";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useParams } from "next/navigation";
import { useExaminations } from "@/hooks/pets";
import useAuth from "@/hooks/useAuth";
import { useCallback, useState } from "react";
import ExaminationDialog from "../../../../../components/Examination";
import ExaminationItem from "./Item";
import ExaminationItemSkeleton from "./Skeleton";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 3;

interface ExaminationsListProps {
    onOpenDiagrams: VoidFunction;
}

const ExaminationsList = ({ onOpenDiagrams }: ExaminationsListProps) => {
    const { user } = useAuth();
    const { id } = useParams();
    const { examinations, isLoading, mutate } = useExaminations(+id);

    // INFO: comes from examination
    const [clickedAppointment, setClickedAppointment] = useState(-1);

    const [page, setPage] = useState(1);
    const handlePageChange = useCallback((_: any, p: number) => setPage(p), []);

    return (
        <>
            <Paper
                sx={{
                    border: "1px solid #ddd",
                    pb: 2,
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
                <Pagination
                    page={page}
                    pageSize={PAGE_SIZE}
                    onChange={handlePageChange}
                >
                    {examinations.map((e, i) => (
                        <ExaminationItem
                            key={e?.id}
                            e={e}
                            isVet={user?.type === "VET"}
                            expanded={i === 0}
                            onEditClick={setClickedAppointment}
                        />
                    ))}
                </Pagination>
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
