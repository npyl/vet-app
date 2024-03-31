import { useState, useCallback } from "react";

// Custom hook for toggling boolean state
const useToggle = (initialValue = false): [boolean, () => void] => {
    const [value, setValue] = useState(initialValue);

    // Toggle function
    const toggle = useCallback(() => {
        setValue((v) => !v);
    }, []);

    return [value, toggle];
};

export default useToggle;
