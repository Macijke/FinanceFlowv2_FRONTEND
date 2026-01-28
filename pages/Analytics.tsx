import React, {useEffect, useMemo, useState} from 'react';
import {
    Area,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ComposedChart,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import {useCookies} from "react-cookie";
import {getApiUrl} from "@/config/api.ts";

enum TimeRange {
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly'
}

const Analytics: React.FC = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.YEARLY);
    const [cookies] = useCookies(["user"]);
    const [analytics, setAnalytics] = useState(null);
    const [monthlyTrends, setMonthlyTrends] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAnalytics = async () => {
        const todayDate = new Date().toISOString().split('T')[0];
        let args = `endDate=${todayDate}&startDate=`;

        switch (timeRange) {
            case TimeRange.WEEKLY:
                args += getDateNDaysAgo(7);
                break;
            case TimeRange.MONTHLY:
                args += getDateNMonthsAgo(1);
                break;
            case TimeRange.YEARLY:
                args += getDateNYearsAgo(1);
                break;
        }

        console.log(args)

        try {
            setLoading(true);
            const response = await fetch(getApiUrl(`/analytics?${args}`), {
                headers: {
                    "Authorization": `Bearer ${cookies.user}`,
                },
            });
            const data = await response.json();
            setAnalytics(data.data);
            console.log(timeRange, data.data);
        } catch (error) {
            console.error("Error fetching analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    const getDateNDaysAgo = (n: number) => {
        const date = new Date();
        date.setDate(date.getDate() - n);
        return date.toISOString().split('T')[0];
    }

    const getDateNMonthsAgo = (n: number) => {
        const date = new Date();
        date.setMonth(date.getMonth() - n);
        return date.toISOString().split('T')[0];
    }

    const getDateNYearsAgo = (n: number) => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - n);
        return date.toISOString().split('T')[0];
    }

    const fetchMonthlyTrends = async () => {
        try {
            const response = await fetch(getApiUrl(`/analytics/monthly-trends`), {
                headers: {
                    "Authorization": `Bearer ${cookies.user}`,
                },
            });
            const data = await response.json();
            setMonthlyTrends(data.data);
            console.log("Monthly Trends:", data.data);
        } catch (error) {
            console.error("Error fetching monthly trends:", error);
        }
    }

    useEffect(() => {
        if (cookies.user) {
            fetchAnalytics();
            fetchMonthlyTrends();
        }
    }, [cookies.user, timeRange]); // Dodany timeRange jako dependency

    const chartData = useMemo(() =>
        monthlyTrends?.map(item => ({
            name: item.month,
            income: item.income,
            expenses: item.expenses,
            balance: item.balance
        })) || [], [monthlyTrends]);

    const categoryBreakdowns = analytics?.categoryBreakdowns;

    const handleTimeRangeChange = (range: TimeRange) => {
        setTimeRange(range);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-2">Financial
                        Analytics</h2>
                    <p className="text-slate-500 dark:text-slate-300">Deep dive into your data.</p>
                </div>
                <div className="flex glass-freak border border-slate-200 dark:border-white/10 rounded-xl p-1">
                    <button
                        onClick={() => handleTimeRangeChange(TimeRange.YEARLY)}
                        className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-colors ${
                            timeRange === TimeRange.YEARLY
                                ? 'bg-primary text-white shadow-neon'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                        }`}>
                        Yearly
                    </button>
                    <button
                        onClick={() => handleTimeRangeChange(TimeRange.MONTHLY)}
                        className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-colors ${
                            timeRange === TimeRange.MONTHLY
                                ? 'bg-primary text-white shadow-neon'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                        }`}>
                        Monthly
                    </button>
                    <button
                        onClick={() => handleTimeRangeChange(TimeRange.WEEKLY)}
                        className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-colors ${
                            timeRange === TimeRange.WEEKLY
                                ? 'bg-primary text-white shadow-neon'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                        }`}>
                        Weekly
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center h-64">
                    <div className="text-slate-500 dark:text-slate-400">Loading analytics...</div>
                </div>
            )}

            {/* Content - tylko gdy nie loading */}
            {!loading && analytics && (
                <>
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div
                            className="glass-freak p-5 rounded-3xl border border-slate-200 dark:border-white/5 hover:-translate-y-1 transition-transform">
                            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Avg.
                                Income</p>
                            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">${analytics?.summary.averageIncome}</h3>
                            <span
                                className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center mt-2 bg-green-500/10 w-fit px-2 py-0.5 rounded">
                  <span className="material-icons-round text-sm mr-1">trending_up</span> +0%
              </span>
                        </div>
                        <div
                            className="glass-freak p-5 rounded-3xl border border-slate-200 dark:border-white/5 hover:-translate-y-1 transition-transform">
                            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Avg.
                                Spend</p>
                            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">${analytics?.summary.averageExpenses}</h3>
                            <span
                                className="text-xs text-red-600 dark:text-red-400 font-bold flex items-center mt-2 bg-red-500/10 w-fit px-2 py-0.5 rounded">
                  <span className="material-icons-round text-sm mr-1">trending_up</span> +0%
              </span>
                        </div>
                        <div
                            className="glass-freak p-5 rounded-3xl border border-slate-200 dark:border-white/5 hover:-translate-y-1 transition-transform">
                            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Savings
                                Rate</p>
                            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">{analytics?.summary.savingsRate}%</h3>
                            <span
                                className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center mt-2 bg-green-500/10 w-fit px-2 py-0.5 rounded">
                  <span
                      className="material-icons-round text-sm mr-1">trending_up</span> +{analytics?.summary.differenceFromPreviousPeriod}%
              </span>
                        </div>
                        <div
                            className="glass-freak p-5 rounded-3xl border border-slate-200 dark:border-white/5 hover:-translate-y-1 transition-transform">
                            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Top
                                Category</p>
                            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">{analytics?.insights?.[0]?.metadata?.categoryName || 'N/A'}</h3>
                            <span
                                className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-2 block">{analytics?.insights?.[0]?.metadata?.percentage || 0}% of total spend</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Income vs Expenses Chart */}
                        <div
                            className="glass-freak p-6 rounded-3xl border border-slate-200 dark:border-white/10 lg:col-span-2">
                            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-6">Income
                                vs
                                Expenses Analysis</h3>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={chartData}
                                                   margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                        <defs>
                                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false}
                                                       stroke="rgba(148, 163, 184, 0.2)"/>
                                        <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false}
                                               tickLine={false} dy={10}/>
                                        <YAxis tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false}
                                               tickLine={false}
                                               tickFormatter={(val) => `$${val / 1000}k`}/>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                                                backdropFilter: 'blur(10px)',
                                                borderColor: 'rgba(255,255,255,0.1)',
                                                borderRadius: '12px',
                                                color: '#fff'
                                            }}
                                            itemStyle={{color: '#fff'}}
                                        />
                                        <Legend iconType="circle"/>
                                        <Area type="monotone" dataKey="income" fill="url(#colorIncome)"
                                              stroke="#10b981"
                                              strokeWidth={3} name="Income"/>
                                        <Area type="monotone" dataKey="expenses" fill="url(#colorExpense)"
                                              stroke="#ef4444"
                                              strokeWidth={3} name="Expenses"/>
                                        <Line type="monotone" dataKey="balance" stroke="#5c7cf9" strokeWidth={3}
                                              dot={{r: 4, strokeWidth: 0, fill: '#5c7cf9'}} name="Net Savings"/>
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Expenses Breakdown */}
                        <div className="glass-freak p-6 rounded-3xl border border-slate-200 dark:border-white/10">
                            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-6">Spending
                                Breakdown</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={categoryBreakdowns} layout="vertical"
                                              margin={{top: 5, right: 30, left: 40, bottom: 5}}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}
                                                       stroke="rgba(148, 163, 184, 0.2)"/>
                                        <XAxis type="number" hide/>
                                        <YAxis type="category" dataKey="categoryName"
                                               tick={{fill: '#94a3b8', fontSize: 12}}
                                               width={100}
                                               axisLine={false} tickLine={false}/>
                                        <Tooltip
                                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                            contentStyle={{
                                                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                                                backdropFilter: 'blur(10px)',
                                                borderColor: 'rgba(255,255,255,0.1)',
                                                borderRadius: '12px',
                                                color: '#fff'
                                            }}
                                            itemStyle={{color: '#fff'}}
                                        />
                                        <Bar dataKey="amount" radius={[0, 6, 6, 0]} barSize={24}>
                                            {categoryBreakdowns?.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.categoryColor}
                                                      style={{filter: `drop-shadow(0 0 4px ${entry.categoryColor})`}}/>
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Savings Trend */}
                        <div className="glass-freak p-6 rounded-3xl border border-slate-200 dark:border-white/10">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">Savings
                                    Growth</h3>
                                {/*TODO: IMPLEMENT SAVING PERCENTAGE DUE TO DATE x*/}
                                {/*<span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-500/20 px-2.5 py-1 rounded-lg border border-green-500/20">+12.5% YTD</span>*/}
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false}
                                                       stroke="rgba(148, 163, 184, 0.2)"/>
                                        <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false}
                                               tickLine={false} dy={10}/>
                                        <YAxis tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false}
                                               tickLine={false}/>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                                                backdropFilter: 'blur(10px)',
                                                borderColor: 'rgba(255,255,255,0.1)',
                                                borderRadius: '12px',
                                                color: '#fff'
                                            }}
                                            itemStyle={{color: '#fff'}}
                                        />
                                        <Line type="monotone" dataKey="income" stroke="none"/>
                                        <Line type="stepAfter" dataKey="balance" stroke="#8b5cf6" strokeWidth={4}
                                              dot={false}
                                              activeDot={{r: 8, fill: '#fff', stroke: '#8b5cf6'}}
                                              style={{filter: 'drop-shadow(0 0 8px #8b5cf6)'}}/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </>
    );
};

export default Analytics;
