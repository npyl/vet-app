import { Theme, alpha } from "@mui/material/styles";

export const paper = (color: string) => ({
    ...bgBlur({
        blur: 20,
        opacity: 0.9,
        color,
        // ...(!!bgcolor && {
        //     color: bgcolor,
        // }),
    }),
    backgroundImage: "url(/assets/cyan-blur.png), url(/assets/red-blur.png)",
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundPosition: "top right, left bottom",
    backgroundSize: "50%, 50%",
    // ...(dropdown && {
    //     padding: theme.spacing(0.5),
    //     boxShadow: theme.shadows[15],
    //     borderRadius: theme.shape.borderRadius * 1.25,
    // }),
});

// ----------------------------------------------------------------------

type BgBlurProps = {
    blur?: number;
    opacity?: number;
    color?: string;
    imgUrl?: string;
};

export function bgBlur(props?: BgBlurProps) {
    const color = props?.color || "#000000";
    const blur = props?.blur || 6;
    const opacity = props?.opacity || 0.8;
    const imgUrl = props?.imgUrl;

    if (imgUrl) {
        return {
            position: "relative",
            backgroundImage: `url(${imgUrl})`,
            "&:before": {
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 9,
                content: '""',
                width: "100%",
                height: "100%",
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                backgroundColor: alpha(color, opacity),
            },
        } as const;
    }

    return {
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
    };
}
