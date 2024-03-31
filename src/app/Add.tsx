import Dialog from "@/components/Dialog";
import { Button, Typography } from "@mui/material";

interface Props {
    open: boolean;
    onClose: () => void;
}

const AddPetDialog = (props: Props) => {
    return (
        <Dialog
            {...props}
            title={<Typography variant="h6">Add Pet</Typography>}
            content={<></>}
            actions={<Button variant="contained">Add</Button>}
            // ....
            submit
            onSubmit={() => {}}
        />
    );
};

export default AddPetDialog;
