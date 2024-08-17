import { NavListProps } from "./types";
import NavItem from "./NavItem";
import NavSubList from "./NavSubList";
import getProfile from "@/util/getProfile";

// ----------------------------------------------------------------------

type NavListRootProps = {
    data: NavListProps;
    depth: number;
};

export default async function NavList({ data, depth }: NavListRootProps) {
    const user = await getProfile();

    const hasChildren = !!data.children;

    // show different sections for VET and USER
    if (user?.type === "USER" && !!data.vetOnly) return null;

    return (
        <>
            <NavItem item={data} depth={depth} />

            {hasChildren ? (
                <NavSubList data={data.children} depth={depth} />
            ) : null}
        </>
    );
}
