import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
//
import { defaultSettings } from "./config";
import { SettingsContextProps, ThemeLayoutValue } from "./types";

// ----------------------------------------------------------------------

const initialState: SettingsContextProps = {
    ...defaultSettings,

    // Layout
    onChangeLayout: () => {},
};

// ----------------------------------------------------------------------

export const SettingsContext = createContext(initialState);

export const useSettingsContext = () => {
    const context = useContext(SettingsContext);

    if (!context)
        throw new Error(
            "useSettingsContext must be use inside SettingsProvider",
        );

    return context;
};

// ----------------------------------------------------------------------

type SettingsProviderProps = {
    children: ReactNode;
};

export function SettingsProvider({ children }: SettingsProviderProps) {
    const [themeLayout, setThemeLayout] = useState(defaultSettings.themeLayout);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const layout =
                getCookie("themeLayout") || defaultSettings.themeLayout;
            setThemeLayout(layout as ThemeLayoutValue);
        }
    }, []);

    // Layout
    const onChangeLayout = useCallback(
        (event: React.ChangeEvent<HTMLInputElement> | string) => {
            let value;
            if (typeof event === "string") {
                value = event as ThemeLayoutValue;
            } else {
                value = event.target.value as ThemeLayoutValue;
            }

            setThemeLayout(value);
            setCookie("themeLayout", value);
        },
        [],
    );

    const value = useMemo(
        () => ({
            // Layout
            themeLayout,
            onChangeLayout,
        }),
        [onChangeLayout, themeLayout],
    );

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}

// ----------------------------------------------------------------------

function getCookie(name: string) {
    if (typeof document === "undefined") {
        throw new Error(
            "getCookie() is not supported on the server. Fallback to a different value when rendering on the server.",
        );
    }

    const value = `; ${document.cookie}`;

    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts[1].split(";").shift();
    }

    return undefined;
}

function setCookie(name: string, value: string, exdays = 3) {
    const date = new Date();
    date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function removeCookie(name: string) {
    document.cookie = `${name}=;path=/;max-age=0`;
}
export const SettingsConsumer = SettingsContext.Consumer;
