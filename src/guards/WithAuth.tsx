import { auth } from "@/Auth";
import { redirect } from "next/navigation";
import { ComponentType, PropsWithChildren } from "react";

type ContentProps = PropsWithChildren & any;
type AnyContent = ComponentType<ContentProps>;

const WithAuth = (Cell: AnyContent) => {
    const WrappedComponent = async (props: ContentProps) => {
        const { user } = (await auth()) || {};
        if (!user) redirect("/login");
        return <Cell {...props} />;
    };

    WrappedComponent.displayName = `WithAuth(View)`;

    return WrappedComponent;
};

export default WithAuth;
