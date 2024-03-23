// ----------------------------------------------------------------------

export type ThemeLayoutValue = "vertical" | "mini";

export type SettingsValueProps = {
    themeLayout: ThemeLayoutValue;
};

export type SettingsContextProps = SettingsValueProps & {
    // Layout
    onChangeLayout: (
        event: React.ChangeEvent<HTMLInputElement> | string,
    ) => void;
};
