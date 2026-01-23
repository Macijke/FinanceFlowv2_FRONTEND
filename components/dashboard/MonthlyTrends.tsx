import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {getApiUrl} from "@/config/api.ts";

interface MonthlyTrend {
    month: string;
    income: number;
    expenses: number;
}

export function MonthlyTrends({dateRange}) {

    const [cookies] = useCookies(["user"]);
    const [monthlyTrends, setmonthlyTrends] = useState<MonthlyTrend[]>([]);

    const getMonthlyTrends = async () => {
        const response = await fetch(getApiUrl(`/analytics/monthly-trends?startDate=${getDateRange().startDate}&endDate=${getDateRange().endDate}`), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.user}`,
            },
        });
        const json = await response.json();
        const chartData: MonthlyTrend[] = json?.data ?? json;
        setmonthlyTrends(chartData);
    }

    const formatDateToYYYYMMDD = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getDateRange = () => {
        const today = new Date();
        const monthsToSubtract = dateRange === '6months' ? 6 : 12;

        const startDate = new Date(
            today.getFullYear(),
            today.getMonth() - monthsToSubtract,
            1
        );

        const endDate = new Date();

        return {
            startDate: formatDateToYYYYMMDD(startDate),
            endDate: formatDateToYYYYMMDD(endDate)
        };
    };

    useEffect(() => {
        getDateRange();
        getMonthlyTrends();
    }, [cookies.user, dateRange]);

    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends}>
                    <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false}
                                   stroke="rgba(148, 163, 184, 0.2)"/>
                    <XAxis dataKey="month" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false}
                           tickLine={false} dy={10}/>
                    <YAxis tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false}
                           tickFormatter={(value) => `$${value}`}/>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(30, 41, 59, 0.9)',
                            backdropFilter: 'blur(8px)',
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        }}
                        itemStyle={{color: '#e2e8f0'}}
                        cursor={{stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2}}
                    />
                    <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} fillOpacity={1}
                          fill="url(#colorIncome)"/>
                    <Area type="monotone" dataKey="expenses" stroke="#ec4899" strokeWidth={3}
                          fillOpacity={1} fill="url(#colorExpenses)"/>
                </AreaChart>
            </ResponsiveContainer>
        </>
    )
}
