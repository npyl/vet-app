"use client";

import { usePathname } from "next/navigation";
import { StyledDotIcon, StyledIcon } from "./styles";

interface Props {
    path: string;
}

const ActiveIndicator: React.FC<Props> = ({ path }) => {
    const pathname = usePathname();
    const active = path === pathname;

    return (
        <StyledIcon>
            <StyledDotIcon active={active} />
        </StyledIcon>
    );
};

export default ActiveIndicator;
