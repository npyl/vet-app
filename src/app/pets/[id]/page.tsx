import { Box } from "@mui/material";
import Examinations from "./Examinationts";
import Overview from "./Overview";

const PetPage = () => (
    <>
        <Overview />

        <Box my={2} />

        {/* Examinations */}
        <Examinations />
    </>
);

export default PetPage;
