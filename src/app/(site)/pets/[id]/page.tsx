import Box from "@mui/material/Box";
import Overview from "./Overview";
import More from "./More";

interface PetPageParams {
    params: { id: string };
}

const PetPage = ({ params: { id } }: PetPageParams) => (
    <>
        <Overview id={+id} />

        <Box my={2} />

        <More />
    </>
);

export default PetPage;
