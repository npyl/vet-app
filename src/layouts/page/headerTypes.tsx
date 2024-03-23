// ----------------------------------------------------------------------

export interface HeaderProps {
    handleFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filterName: string;
    pageTitle: string;
    pageDescription: string; // must be optional
    showSearchBar: boolean;
    contentLeft?: React.ReactNode;
    contentRight?: React.ReactNode;
    contentBottom?: React.ReactNode;
}
