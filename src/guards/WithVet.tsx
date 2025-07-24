import { auth } from "@/Auth";
import { redirect } from "next/navigation";
import { ComponentType, PropsWithChildren } from "react";

type ContentProps = PropsWithChildren & any;
type AnyContent = ComponentType<ContentProps>;

const WithVet = (Cell: AnyContent) => {
    const WrappedComponent = async (props: ContentProps) => {
        const { user } = (await auth()) || {};
        if (user?.type !== "VET") redirect("/login");
        return <Cell {...props} />;
    };

    WrappedComponent.displayName = `WithVet(View)`;

    return WrappedComponent;
};

export default WithVet;
