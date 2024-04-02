import { useSWRConfig } from "swr";

const useMutateTable = () => {
    const { mutate } = useSWRConfig();
    const mutateTable = (url: string) => {
        mutate((key) => typeof key === "string" && key.startsWith(`${url}`));
    };
    return {
        mutateTable,
    };
};

export default useMutateTable;
