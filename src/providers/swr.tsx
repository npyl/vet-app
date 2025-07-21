import useApiContext from "@/contexts/api";
import { SWRConfig, SWRConfiguration } from "swr";

export interface SWRProviderProps extends React.PropsWithChildren {
    value?: SWRConfiguration;
}
export const SWRProvider: React.FC<
    React.PropsWithChildren<SWRProviderProps>
> = ({ value, ...props }) => {
    const { fetcher } = useApiContext();
    return (
        <SWRConfig
            {...props}
            value={{
                ...value,
                fetcher,
                revalidateIfStale: false,
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
            }}
        />
    );
};
