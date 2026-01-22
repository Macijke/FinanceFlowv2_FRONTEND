// typescript
import React, {useEffect, useMemo, useState} from "react";
import {getApiUrl} from "@/config/api.ts";
import {useCookies} from "react-cookie";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

interface ChartData {
    categoryName: string;
    categoryColor: string;
    amount: number;
    percentage: number;
    categoryIcon: string;
}

export function SpendingChart() {
    const [cookies] = useCookies(["user"]);
    const [categoryBreakdown, setCategoryBreakdown] = useState<ChartData[]>([]);
    const DEFAULT_COLOR = '#60A5FA';

    const getCategoryBreakdown = async () => {
        const response = await fetch(getApiUrl(`/analytics/category-breakdown?startDate=2025-01-01&endDate=2026-01-01`), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.user}`,
            },
        });
        const data = await response.json();
        const chartData: ChartData[] = data.data;
        setCategoryBreakdown(chartData);
    }

    useEffect(() => {
        getCategoryBreakdown();
    }, [cookies.user]);

    const totalSpent = useMemo(
        () => categoryBreakdown.reduce((sum, item) => sum + (Number(item?.amount) || 0), 0),
        [categoryBreakdown]
    );

    const formattedTotal = useMemo(
        () =>
            new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
            }).format(totalSpent),
        [totalSpent]
    );


    return (
        <>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={categoryBreakdown}
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={6}
                        dataKey="amount"
                        nameKey="categoryName"
                        stroke="none"
                    >
                        {categoryBreakdown.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.categoryColor ?? DEFAULT_COLOR}
                                style={{filter: `drop-shadow(0 0 4px ${entry.categoryColor ?? DEFAULT_COLOR})`}}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number) => `$${value.toLocaleString()}`}
                        labelFormatter={(name: string) => String(name)}
                        contentStyle={{
                            backgroundColor: 'rgba(30, 41, 59, 0.8)',
                            backdropFilter: 'blur(10px)',
                            borderColor: 'rgba(255,255,255,0.1)',
                            color: '#fff',
                            borderRadius: '12px'
                        }}
                        itemStyle={{color: '#fff'}}
                    />
                </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{formattedTotal}</p>
                <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Total Spent</p>
            </div>
        </>
    )
}
