// ----------------------------------------------------------------------

import { NavListProps } from "./types";
import NavList from "./NavList";

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

export default NavSubList;
