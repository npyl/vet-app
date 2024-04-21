"use client";

import { useCallback, useMemo, useState, MouseEvent } from "react";
import useWorkingHours from "./hook";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Popper from "./Popper";
import Button from "@mui/material/Button";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const WorkingHours = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement>();
    const isOpen = useMemo(() => Boolean(anchorEl), [anchorEl]);
    const openPopper = useCallback(
        (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget),
        [],
    );
    const closePopper = useCallback(() => setAnchorEl(undefined), []);

    const { workingHours, isLoading } = useWorkingHours();

    const notSet = useMemo(
        () => !workingHours && !isLoading,
        [workingHours, isLoading],
    );

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={1}
                mt={1}
            >
                <Button
                    variant="outlined"
                    endIcon={<CalendarTodayIcon />}
                    onClick={openPopper}
                >
                    Working Hours
                    {notSet ? (
                        <Typography ml={1} color="error.main">
                            (Not yet set!)
                        </Typography>
                    ) : (
                        ""
                    )}
                </Button>
            </Stack>

            {isOpen ? (
                <Popper
                    open={isOpen}
                    anchorEl={anchorEl}
                    onClose={closePopper}
                />
            ) : null}
        </>
    );
};

export default WorkingHours;
