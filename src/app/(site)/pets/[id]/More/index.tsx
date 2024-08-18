"use client";

import useDialog from "@/hooks/useDialog";
import ExaminationsDiagrams from "./Diagrams";
import Examinations from "./Examinations";

const More = () => {
    const [isDiagramsOpen, openDiagrams, closeDiagrams] = useDialog();

    return (
        <>
            {/* Examinations */}
            {isDiagramsOpen ? (
                <ExaminationsDiagrams onOpenExaminations={closeDiagrams} />
            ) : (
                <Examinations onOpenDiagrams={openDiagrams} />
            )}
        </>
    );
};

export default More;
