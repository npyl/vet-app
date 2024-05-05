// fullcalendar
import { EventContentArg } from "@fullcalendar/common";

import Iconify from "@/components/iconify";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";

import Image from "next/image";

// import { fDateTime } from "src/utils/format-time";
// import { fCurrency } from "src/utils/format-number";
// import { shortDateLabel } from "src/components/custom-date-range-picker";

// ----------------------------------------------------------------------

const fDateTime = (s: string) => s;
const fCurrency = (b: number | boolean) => (b ? "yes" : "no");

export default function RenderEvent(e: EventContentArg) {
    const { avatar, completed, petId } = e?.event?.extendedProps || {};

    const available = { startDate: "", endDate: "" };
    const ratingNumber = 5;
    const priceSale = true;
    const price = 100;
    const createdAt = "";
    const destination = "";
    const bookers: any[] = [];
    const name = "";

    // const {
    //     id,
    //     name,
    //     price,
    //     images,
    //     bookers,
    //     createdAt,
    //     available,
    //     priceSale,
    //     destination,
    //     ratingNumber,
    // } = tour;

    const shortLabel = available.startDate + " - " + available.endDate;

    const renderRating = (
        <Stack
            direction="row"
            alignItems="center"
            sx={{
                top: 8,
                right: 8,
                zIndex: 9,
                borderRadius: 1,
                position: "absolute",
                p: "2px 6px 2px 4px",
                typography: "subtitle2",
                bgcolor: "warning.lighter",
            }}
        >
            <Iconify
                icon="eva:star-fill"
                sx={{ color: "warning.main", mr: 0.25 }}
            />{" "}
            {ratingNumber}
        </Stack>
    );

    const renderPrice = (
        <Stack
            direction="row"
            alignItems="center"
            sx={{
                top: 8,
                left: 8,
                zIndex: 9,
                borderRadius: 1,
                bgcolor: "grey.800",
                position: "absolute",
                p: "2px 6px 2px 4px",
                color: "common.white",
                typography: "subtitle2",
            }}
        >
            {!!priceSale && (
                <Box
                    component="span"
                    sx={{
                        color: "grey.500",
                        mr: 0.25,
                        textDecoration: "line-through",
                    }}
                >
                    {fCurrency(priceSale)}
                </Box>
            )}
            {fCurrency(price)}
        </Stack>
    );

    const renderImages = (
        <Stack
            spacing={0.5}
            direction="row"
            sx={{
                p: (theme) => theme.spacing(1, 1, 0, 1),
            }}
        >
            <Stack flexGrow={1} sx={{ position: "relative" }}>
                {renderPrice}
                {renderRating}
                <Image
                    alt={avatar}
                    src={avatar}
                    // sx={{ borderRadius: 1, height: 164, width: 1 }}
                />
            </Stack>
        </Stack>
    );

    const renderTexts = (
        <ListItemText
            sx={{
                p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
            }}
            primary={`Posted date: ${fDateTime(createdAt)}`}
            secondary={
                <Link
                    // href={paths.dashboard.tour.details(id)}
                    color="inherit"
                >
                    {name}
                </Link>
            }
            primaryTypographyProps={{
                typography: "caption",
                color: "text.disabled",
            }}
            secondaryTypographyProps={{
                mt: 1,
                noWrap: true,
                component: "span",
                color: "text.primary",
                typography: "subtitle1",
            }}
        />
    );

    const renderInfo = (
        <Stack
            spacing={1.5}
            sx={{
                position: "relative",
                p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
            }}
        >
            {[
                {
                    label: destination,
                    icon: (
                        <Iconify
                            icon="mingcute:location-fill"
                            sx={{ color: "error.main" }}
                        />
                    ),
                },
                {
                    label: shortLabel,
                    icon: (
                        <Iconify
                            icon="solar:clock-circle-bold"
                            sx={{ color: "info.main" }}
                        />
                    ),
                },
                {
                    label: `${bookers.length} Booked`,
                    icon: (
                        <Iconify
                            icon="solar:users-group-rounded-bold"
                            sx={{ color: "primary.main" }}
                        />
                    ),
                },
            ].map((item) => (
                <Stack
                    key={item.label}
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    sx={{ typography: "body2" }}
                >
                    {item.icon}
                    {item.label}
                </Stack>
            ))}
        </Stack>
    );

    return (
        <>
            <Card>
                {renderImages}

                {renderTexts}

                {renderInfo}
            </Card>
        </>
    );
}
