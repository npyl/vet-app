// routes
// components

// ----------------------------------------------------------------------

const navConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        items: [
            {
                title: "Home",
                path: "/",
            },
            {
                title: "Employees",
                path: "/employees",
                // icon: ICONS.ecommerce,
            },
            {
                title: "Clients",
                path: "/clients",
                // icon: ICONS.ecommerce,
            },
            {
                title: "Projects",
                path: "/projects",
                // icon: ICONS.analytics,
            },
            {
                title: "Roles",
                path: "/roles",
                // icon: ICONS.analytics,
            },
        ],
    },
    {
        items: [
            {
                title: "Financials",
                path: "/financials",
                // icon: ICONS.user,
                children: [
                    { title: "Expenses", path: "/financials/expenses" },
                    { title: "Revenues", path: "/financials/revenues" },
                ],
            },
        ],
    },
];

export default navConfig;
