import { useSession } from "next-auth/react";

const useAuth = () => {
    const { data } = useSession();
    const { user } = data || {};
    return { user };
};

export default useAuth;
