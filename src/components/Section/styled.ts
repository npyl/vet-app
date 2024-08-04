"use client";

import { alpha, styled } from "@mui/material/styles";
import { SpaceBetween } from "@/components/styled";
import { StackProps, Theme } from "@mui/material";

interface Props extends Omit<StackProps, "color"> {
    color: keyof Theme["palette"];
}

const StyledSpaceBetween = styled(SpaceBetween)<Props>(({ theme, color }) => ({
    padding: theme.spacing(2),
    alignItems: "center",
    // @ts-ignore
    backgroundColor: alpha(theme.palette[color].main, 0.1),
}));

export default StyledSpaceBetween;
