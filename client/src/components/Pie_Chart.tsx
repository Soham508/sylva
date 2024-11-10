import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

type ChartData = {
    browser: string;
    visitors: number;
    fill: string;
};

type SectorData = {
    sector: string;
    percentage: number;
    fill: string;
};

const chartData = [
    { sector: "FMCG", value: 33.33, fill: "var(--color-fmcg)" },
    { sector: "Energy", value: 33.33, fill: "var(--color-energy)" },
    { sector: "Healthcare", value: 33.33, fill: "var(--color-healthcare)" },
]

const mobileData = [
    { month: "january", mobile: 20, fill: "var(--color-january)" },
    { month: "february", mobile: 40, fill: "var(--color-february)" },
    { month: "march", mobile: 30, fill: "var(--color-march)" },
    { month: "april", mobile: 30, fill: "var(--color-april)" },
    { month: "may", mobile: 40, fill: "var(--color-may)" },
    { month: "mays", mobile: 20, fill: "var(--color-april)" }
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    desktop: {
        label: "Desktop",
    },
    mobile: {
        label: "Mobile",
    },
    january: {
        label: "January",
        color: "hsl(var(--chart-1))",
    },
    february: {
        label: "February",
        color: "hsl(var(--chart-2))",
    },
    march: {
        label: "March",
        color: "hsl(var(--chart-3))",
    },
    april: {
        label: "April",
        color: "hsl(var(--chart-4))",
    },
    may: {
        label: "May",
        color: "hsl(var(--chart-5))",
    },
    value: {
        label: "Sector",
    },
    fmcg: {
        label: "FMCG",
        color: "hsl(var(--chart-1))",
    },
    energy: {
        label: "Energy",
        color: "hsl(var(--chart-2))",
    },
    healthcare: {
        label: "Healthcare",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig


export function Pie_Chart() {

    return (
        <Card className="flex flex-col bg-transparent">
            <CardHeader className="items-center pb-0">
                <CardTitle>Your portfolio</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full min-h-[450px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    labelKey="visitors"
                                    nameKey="month"
                                    indicator="line"
                                    labelFormatter={(_, payload) => {
                                        return chartConfig[
                                            payload?.[0].dataKey as keyof typeof chartConfig
                                        ].label
                                    }}
                                />
                            }
                        />
                        <Pie data={chartData} dataKey="value" nameKey="sector" outerRadius={60} />
                        <Pie
                            data={mobileData}
                            dataKey="mobile"
                            innerRadius={70}
                            outerRadius={90}
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="month" />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}

