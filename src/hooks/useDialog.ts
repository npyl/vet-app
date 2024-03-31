import { useCallback, useState } from "react";

const useDialog = (
    v: boolean | undefined = false,
): [boolean, VoidFunction, VoidFunction] => {
    const [isOpen, setOpen] = useState(v);

    const open = useCallback(() => setOpen(true), []);
    const close = useCallback(() => setOpen(false), []);

    return [isOpen, open, close];
};

export default useDialog;
