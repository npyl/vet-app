import { useCallback, useState } from "react";

const useDialog = (): [boolean, VoidFunction, VoidFunction] => {
    const [isOpen, setOpen] = useState(false);

    const open = useCallback(() => setOpen(true), []);
    const close = useCallback(() => setOpen(false), []);

    return [isOpen, open, close];
};

export default useDialog;
