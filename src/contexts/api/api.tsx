import { createContext, useCallback, useContext, useMemo } from "react";

import { FetcherType, basicFetcher } from "./fetcher";

export type ApiActions = {
    get: FetcherType;
    head: FetcherType;
    post: FetcherType;
    put: FetcherType;
    remove: FetcherType;
};
export type ApiState = ApiActions & {
    fetcher: FetcherType;
};

export const ApiContext = createContext<ApiState | undefined>(undefined);

export const useApiContext = () => {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error(
            "ApiContext value is undefined. Make sure you use the ApiProvider before using the context.",
        );
    }
    return context;
};

export type ApiContextConfig = {
    fetcher?: FetcherType;
};
const useApiState = ({
    fetcher = basicFetcher,
}: ApiContextConfig): ApiState => {
    const get: FetcherType = useCallback(
        (input, init = {}) => fetcher(input, { ...init, method: "GET" }),
        [fetcher],
    );
    const head: FetcherType = useCallback(
        (input, init = {}) => fetcher(input, { ...init, method: "HEAD" }),
        [fetcher],
    );
    const post: FetcherType = useCallback(
        (input, init = {}) => fetcher(input, { ...init, method: "POST" }),
        [fetcher],
    );
    const put: FetcherType = useCallback(
        (input, init = {}) => fetcher(input, { ...init, method: "PUT" }),
        [fetcher],
    );
    const remove: FetcherType = useCallback(
        (input, init = {}) => fetcher(input, { ...init, method: "DELETE" }),
        [fetcher],
    );
    const state = useMemo(
        () => ({ fetcher, get, head, post, put, remove }),
        [fetcher, get, head, post, put, remove],
    );
    return state;
};

export interface ApiProviderProps {
    config?: ApiContextConfig;
}
export const ApiProvider: React.FC<
    React.PropsWithChildren<ApiProviderProps>
> = ({ config = {}, ...props }) => {
    const state = useApiState(config);
    return <ApiContext.Provider {...props} value={state} />;
};

export interface WithApiProps {
    apiConfig?: ApiContextConfig;
}
