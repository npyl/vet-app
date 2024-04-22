import { SectionHeader } from "@/components/Section";
import Chart, { useChart } from "@/components/chart";
import { IVetWorkingHours } from "@/types/workingHours";
import { useMemo } from "react";

interface WorkingHoursProps {
    d?: IVetWorkingHours;
}

const WorkingHours = ({ d }: WorkingHoursProps) => {
    const chartOptions = useChart({
        colors: ["#EC7D31", "#36BDCB"],
        plotOptions: {
            bar: {
                horizontal: true,
                isDumbbell: true,
                dumbbellColors: [["#EC7D31", "#36BDCB"]],
            },
        },
        legend: {
            show: false,
        },
        fill: {
            type: "gradient",
            gradient: {
                gradientToColors: ["#36BDCB"],
                inverseColors: false,
                stops: [0, 100],
            },
        },
        grid: {
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (value: number) => {
                    if (typeof value !== "undefined") {
                        if (value > 12) {
                            return `${value.toFixed(0)}pm`;
                        }

                        return `${value.toFixed(0)}am`;
                    }

                    return value;
                },
            },
        },
    });

    const series = useMemo(
        () => [
            {
                data: [
                    {
                        x: "Monday",
                        y: d?.monday || [9, 17],
                    },
                    {
                        x: "Tuesday",
                        y: d?.tuesday || [9, 17],
                    },
                    {
                        x: "Wednesday",
                        y: d?.wednesday || [9, 17],
                    },
                    {
                        x: "Thursday",
                        y: d?.thursday || [9, 17],
                    },
                    {
                        x: "Friday",
                        y: d?.friday || [9, 17],
                    },
                ],
            },
        ],
        [d],
    );

    return (
        <>
            <SectionHeader title="Working Hours" icon="guidance:24-hours" />
            <Chart
                type="rangeBar"
                series={series}
                options={chartOptions}
                width="100%"
                height={364}
            />
        </>
    );
};

export default WorkingHours;
