"use client";

// mui
import { Button, ButtonGroup, ButtonGroupProps } from "@mui/material";
import { useCallback } from "react";
import { UserType } from "@prisma/client";

interface Props extends ButtonGroupProps {
    type: UserType;
    setType: (t: UserType) => void;
}

const UserTypeSelect = ({ type, setType, ...props }: Props) => {
    const selectUser = useCallback(() => setType("USER"), []);
    const selectVet = useCallback(() => setType("VET"), []);

    return (
        <ButtonGroup {...props}>
            <Button
                variant={type === "USER" ? "contained" : "outlined"}
                onClick={selectUser}
            >
                User
            </Button>
            <Button
                variant={type === "VET" ? "contained" : "outlined"}
                onClick={selectVet}
            >
                Vet
            </Button>
        </ButtonGroup>
    );
};

export default UserTypeSelect;
