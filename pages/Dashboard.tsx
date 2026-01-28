import React, {useEffect, useState} from 'react';
import {MonthlyTrends} from "@/components/dashboard/MonthlyTrends.tsx";
import {SpendingChart} from "@/components/dashboard/SpendingChart.tsx";
import {getApiUrl} from "@/config/api.ts";
import {useCookies} from "react-cookie";
import {RecentTransactions} from "@/components/dashboard/RecentTransactions.tsx";
import {useUser} from "@/context/UserContext.tsx";

const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const {userProfile, logout: contextLogout} = useUser();
    const [summary, setSummary] = useState(null);
    const [cookies] = useCookies(["user"]);
    const [dateRange, setDateRange] = useState<string>('6months');

    const getDashboardSummary = async () => {
        try {
            const response = await fetch(getApiUrl(`/analytics/summary`), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies.user}`,
                },
            });
            const data = await response.json();
            setSummary(data.data);
        } catch (error) {
            console.error("Error fetching summary:", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([
                getDashboardSummary(),
            ]);
            setLoading(false);
        };

        if (cookies.user) {
            fetchData();
        }
    }, [cookies.user]);

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-float">
                <div>
                    <h2 className="text-5xl font-bold font-display text-slate-900 dark:text-white drop-shadow-sm">
                        Hello,
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"> {userProfile?.firstName || "User"}!</span> 👋
                    </h2>
                    <p className="text-slate-500 dark:text-slate-300 mt-1 font-medium text-xl">Let's make some money moves.</p>
                </div>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative group col-span-1 md:col-span-1">
                    <div
                        className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                    <div
                        className="relative glass-freak rounded-3xl p-6 h-full flex flex-col justify-between overflow-hidden">
                        {/* Abstract shape */}
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>

                        <div className="flex justify-between items-start z-10">
                            <span
                                className="text-slate-500 dark:text-slate-300 font-display text-sm tracking-wider uppercase">Total Balance</span>
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/10 backdrop-blur-md">
                                <span className="material-icons-round text-primary dark:text-white">wallet</span>
                            </div>
                        </div>
                        <div className="mt-6 z-10">
                            <h3 className="text-4xl font-bold font-display text-slate-900 dark:text-white">{summary?.totalBalance ? `$${summary.totalBalance.toFixed(2)}` : "$0.00"}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                {summary?.differenceFromPreviousPeriod >= 0 ? (
                                    <span
                                        className="bg-sucess/20 text-sucess px-2 py-0.5 rounded-md text-xs font-bold">{summary?.differenceFromPreviousPeriod}%</span>) : (
                                    <span
                                        className="bg-red-400/20 text-red-800 px-2 py-0.5 rounded-md text-xs font-bold">{summary?.differenceFromPreviousPeriod}%</span>
                                )}

                                <span className="text-slate-500 dark:text-slate-400 text-xs">vs last month</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="glass-freak rounded-3xl p-6 group hover:-translate-y-1 transition-transform duration-300 border-l-4 border-l-success">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-success/10 text-success shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                                <span className="material-icons-round text-2xl">trending_up</span>
                            </div>
                            <span
                                className="text-slate-500 dark:text-slate-300 font-display text-sm uppercase tracking-wide">Income</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold font-display text-slate-900 dark:text-white mt-2 group-hover:text-success transition-colors">{summary?.totalIncome ? `$${summary.totalIncome.toFixed(2)}` : "$0.00"}</h3>
                    <p className="text-sm text-slate-400 mt-1">{summary?.incomeTransactionsCount ? `${summary.incomeTransactionsCount}` : "0"} Transactions</p>
                </div>

                <div
                    className="glass-freak rounded-3xl p-6 group hover:-translate-y-1 transition-transform duration-300 border-l-4 border-l-secondary">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-secondary/10 text-secondary shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                                <span className="material-icons-round text-2xl">trending_down</span>
                            </div>
                            <span
                                className="text-slate-500 dark:text-slate-300 font-display text-sm uppercase tracking-wide">Spent</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold font-display text-slate-900 dark:text-white mt-2 group-hover:text-secondary transition-colors">{summary?.totalExpenses ? `$${summary.totalExpenses.toFixed(2)}` : "$0.00"}</h3>
                    <p className="text-sm text-slate-400 mt-1">{summary?.expansiveTransactionsCount ? `${summary.expansiveTransactionsCount}` : "0"} Transactions</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div
                    className="glass-freak rounded-3xl p-6 lg:col-span-1 flex flex-col h-full min-h-[400px] relative overflow-hidden">
                    <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white mb-6 z-10">Categories</h3>
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>

                    {/* Pie Chart for Categories */}
                    <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                        <SpendingChart/>
                    </div>
                </div>

                {/* Trends Chart */}
                <div className="glass-freak rounded-3xl p-6 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white">Trends</h3>
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs rounded-lg px-3 py-1.5 text-slate-500 dark:text-slate-400 focus:ring-0 cursor-pointer outline-none hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                            <option value="6months">Last 6 Months</option>
                            <option value="year">Last Year</option>
                        </select>
                    </div>
                    <div className="w-full h-[300px]">
                        <MonthlyTrends dateRange={dateRange}/>
                    </div>
                </div>
            </div>

            <div className="glass-freak rounded-3xl overflow-hidden">
                <div
                    className="px-6 py-5 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50/50 dark:bg-white/5">
                    <h3 className="text-lg font-bold font-display text-slate-800 dark:text-white">Recent
                        Transactions</h3>
                    <a className="text-xs font-bold text-primary hover:text-accent uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors">
                        View All <span className="material-icons-round text-sm">arrow_forward</span>
                    </a>
                </div>

                <RecentTransactions/>
            </div>

        </>
    );
};

export default Dashboard;