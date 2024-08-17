import { getProfile as authGetProfile } from "@/Auth";
import IUser from "@/types/user";

declare global {
    // eslint-disable-next-line no-var
    var profile: IUser;
}

const getProfile = async () => {
    if (globalThis.profile) return globalThis.profile;

    let profile = await authGetProfile({});
    if (!profile) return null;

    globalThis.profile = profile as unknown as IUser;
    return profile;
};

export default getProfile;
