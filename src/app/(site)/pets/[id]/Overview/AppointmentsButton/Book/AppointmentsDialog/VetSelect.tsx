import { RHFSelect } from "@/components/hook-form";
import IUser from "@/types/user";
import prisma from "@/util/db";
import MenuItem from "@mui/material/MenuItem";

// ----------------------------------------------------------------------

const getVets = async () => {
    return (await prisma.user.findMany({
        where: {
            type: {
                equals: "VET",
            },
        },
    })) as unknown as IUser[];
};

// ----------------------------------------------------------------------

const VetSelect = async () => {
    const vets = await getVets();

    return (
        <RHFSelect label="Available vets" name="vetId">
            {vets.map(({ firstName, lastName, id }, i) => (
                <MenuItem key={i} value={id}>
                    {`${firstName || ""} ${lastName || ""}`}
                </MenuItem>
            ))}
        </RHFSelect>
    );
};

export default VetSelect;
