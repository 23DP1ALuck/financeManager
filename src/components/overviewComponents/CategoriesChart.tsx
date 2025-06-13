"use client"

import * as React from "react"
import {TrendingUp} from "lucide-react"
import {Label, Pie, PieChart} from "recharts"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import {useEffect, useState} from "react";


// type for category spendings
type CategoriesSpendingWithName = {
    categoryId: number,
    name: string,
    category_spent : number,
    fill: string
}

const chartConfig = {
    visitors: {
        label: "Money",
    },
    chrome: {
        label: "Food",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Transport",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Entertainment",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Subscriptions",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

// pie chart colors
const CHART_COLORS = [
    "#111",
    "#222",
    "#333",
    "#444",
    "#555",
    "#666",
    "#777"
];

export function Component() {
    // set categoryInformation
    const [categoriesSpendings, setCategoriesSpendings] = useState<CategoriesSpendingWithName[]>()
    // calculate month data
    const monthNames : string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const currentDate : Date = new Date;
    const currentMonthNumber : number = currentDate.getMonth();

    const currentMonthName : string = monthNames[currentMonthNumber];
    const nextMonthName : string = monthNames[currentMonthNumber + 1];
    // fetch data with category-based spendings and set it to categoriesSpendings
    useEffect(() => {
        fetch("/api/transactions/categories")
            .then((res) => res.json())
            .then((res) => setCategoriesSpendings(res.fullCategorySpendingsLastMonth))
            .catch(err => console.error("Fetch error:", err));;
    }, []);


    // go through array with category spendings data and assing pie color to each element
    const mapped : CategoriesSpendingWithName[] | undefined  = categoriesSpendings?.map((item, index) => {
        return {
            categoryId: item.categoryId,
            name: item.name,
            category_spent: item.category_spent,
            fill: CHART_COLORS[index % CHART_COLORS.length],
        };
    });
    // final chart data
    const chartData = mapped?.map((item) => {
        return {
            category: item.name,
            money: item.category_spent,
            fill: item.fill
        }
    })
    console.log(chartData);
    const totalVisitors = React.useMemo(() => {
        return chartData?.reduce((acc, curr) => acc + curr.money, 0)
    }, [chartData])
    console.log(totalVisitors)

    return (
        <Card className="flex flex-col border border-black/10">
            <CardHeader className="items-center pb-0">
                <CardTitle>Your spending by category</CardTitle>
                <CardDescription>{currentMonthName} {currentDate.getFullYear()} - {nextMonthName} {currentDate.getFullYear()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="money"
                            nameKey="category"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors?.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    EUR
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Category-based spending analysis
                </div>
            </CardFooter>
        </Card>
    )
}
