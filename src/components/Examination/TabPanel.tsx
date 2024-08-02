import Box, { BoxProps } from "@mui/material/Box";

interface TabPanelProps extends BoxProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => (
    <div role="tabpanel" hidden={value !== index}>
        {value === index ? <Box {...other}>{children}</Box> : null}
    </div>
);

export default TabPanel;
