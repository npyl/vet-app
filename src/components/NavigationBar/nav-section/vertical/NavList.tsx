import { useEffect, useState } from "react";
// next
import { usePathname } from "next/navigation";
// @mui
import { Collapse } from "@mui/material";
// hooks
import useActiveLink from "@/hooks/useActiveLink";
//
import { NavListProps } from "../types";
import NavItem from "./NavItem";
import useAuth from "@/hooks/useAuth";

// ----------------------------------------------------------------------

type NavListRootProps = {
    data: NavListProps;
    depth: number;
    hasChild: boolean;
};

export default function NavList({ data, depth, hasChild }: NavListRootProps) {
    const pathname = usePathname();
    const { user } = useAuth();

    const { active, isExternalLink } = useActiveLink(
        data.path,
        data.children?.length > 0,
    );

    const [open, setOpen] = useState(active);

    useEffect(() => {
        if (!active) {
            handleClose();
        }
    }, [pathname]);

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // show different sections for VET and USER
    if (user?.type === "USER" && !!data.vetOnly) return null;
    if (user?.type === "VET" && !data.vetOnly) return null;

    return (
        <>
            <NavItem
                item={data}
                depth={depth}
                open={open}
                active={active}
                isExternalLink={isExternalLink}
                onClick={handleToggle}
            />

            {hasChild && (
                <Collapse in={open} unmountOnExit>
                    <NavSubList data={data.children} depth={depth} />
                </Collapse>
            )}
        </>
    );
}

// ----------------------------------------------------------------------

type NavListSubProps = {
    data: NavListProps[];
    depth: number;
};

function NavSubList({ data, depth }: NavListSubProps) {
    return (
        <>
            {data.map((list) => (
                <NavList
                    key={list.title + list.path}
                    data={list}
                    depth={depth + 1}
                    hasChild={!!list.children}
                />
            ))}
        </>
    );
}
