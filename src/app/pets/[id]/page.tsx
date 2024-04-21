"use client";

import Box from "@mui/material/Box";
import Examinations from "./Examinations";
import Overview from "./Overview";
import ExaminationsDiagrams from "./Diagrams";
import useDialog from "@/hooks/useDialog";

const PetPage = () => {
    const [isDiagramsOpen, openDiagrams, closeDiagrams] = useDialog();

    return (
        <>
            <Overview />

            <Box my={2} />

            {/* Examinations */}
            {isDiagramsOpen ? (
                <ExaminationsDiagrams onOpenExaminations={closeDiagrams} />
            ) : (
                <Examinations onOpenDiagrams={openDiagrams} />
            )}
        </>
    );
};

export default PetPage;
