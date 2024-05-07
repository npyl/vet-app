import { ChangeEvent, useCallback, useState } from "react";

const useTextField = (
    v: string = "",
): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
    const [value, setValue] = useState(v);

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
        [],
    );

    return [value, onChange];
};

export default useTextField;
