const navConfig = [
    {
        items: [
            {
                title: "Pets",
                path: "/pets",
                icon: "streamline:pet-paw",
            },
            {
                title: "Appointments",
                path: "/appointments",
                icon: "teenyicons:appointments-outline",
                vetOnly: true,
            },
            {
                title: "Logistics",
                path: "/logistics",
                icon: "material-symbols-light:order-approve-outline-sharp",
                vetOnly: true,
            },
        ],
    },
];

export const HEADER = {
    H_MOBILE: 60,
    H_MAIN_DESKTOP: 88,
    H_DASHBOARD_DESKTOP: 60,
    H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
    W_BASE: 260,
    W_DASHBOARD: 280,
    W_DASHBOARD_MINI: 100,
    //
    H_DASHBOARD_ITEM: 48,
    H_DASHBOARD_ITEM_SUB: 36,
    //
    H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
    NAV_ITEM: 24,
    NAV_ITEM_HORIZONTAL: 22,
    NAV_ITEM_MINI: 22,
};

export default navConfig;
