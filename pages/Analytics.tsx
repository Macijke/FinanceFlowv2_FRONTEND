import React from 'react';
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

const monthlyData = [
    {name: 'Jan', income: 4000, expense: 2400, savings: 1600},
    {name: 'Feb', income: 3000, expense: 1398, savings: 1602},
    {name: 'Mar', income: 2000, expense: 9800, savings: -7800},
    {name: 'Apr', income: 2780, expense: 3908, savings: -1128},
    {name: 'May', income: 1890, expense: 4800, savings: -2910},
    {name: 'Jun', income: 2390, expense: 3800, savings: -1410},
    {name: 'Jul', income: 3490, expense: 4300, savings: -810},
    {name: 'Aug', income: 4200, expense: 2100, savings: 2100},
    {name: 'Sep', income: 5100, expense: 2300, savings: 2800},
    {name: 'Oct', income: 4800, expense: 2500, savings: 2300},
    {name: 'Nov', income: 5300, expense: 2100, savings: 3200},
    {name: 'Dec', income: 6100, expense: 3200, savings: 2900},
];

const categoryData = [
    {name: 'Housing', value: 1200, color: '#5c7cf9'},
    {name: 'Food', value: 850, color: '#10b981'},
    {name: 'Transport', value: 300, color: '#f59e0b'},
    {name: 'Entertainment', value: 250, color: '#8b5cf6'},
    {name: 'Shopping', value: 450, color: '#ec4899'},
    {name: 'Utilities', value: 180, color: '#6366f1'},
    {name: 'Health', value: 120, color: '#ef4444'},
];

const Analytics: React.FC = () => {
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
                        className="px-4 py-1.5 text-sm font-bold rounded-lg bg-primary text-white shadow-neon">Yearly
                    </button>
                    <button
                        className="px-4 py-1.5 text-sm font-medium rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors">Monthly
                    </button>
                    <button
                        className="px-4 py-1.5 text-sm font-medium rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors">Weekly
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div
                    className="glass-freak p-5 rounded-3xl border border-slate-200 dark:border-white/5 hover:-translate-y-1 transition-transform">
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Avg.
                        Income</p>
                    <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">$4,120</h3>
                    <span
                        className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center mt-2 bg-green-500/10 w-fit px-2 py-0.5 rounded">
                  <span className="material-icons-round text-sm mr-1">trending_up</span> +12%
              </span>
                </div>
                <div
                    className="glass-freak p-5 rounded-3xl border border-slate-200 dark:border-white/5 hover:-translate-y-1 transition-transform">
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Avg.
                        Spend</p>
                    <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">$2,850</h3>
                    <span
                        className="text-xs text-red-600 dark:text-red-400 font-bold flex items-center mt-2 bg-red-500/10 w-fit px-2 py-0.5 rounded">
                  <span className="material-icons-round text-sm mr-1">trending_up</span> +5%
              </span>
                </div>
                <div
                    className="glass-freak p-5 rounded-3xl border border-slate-200 dark:border-white/5 hover:-translate-y-1 transition-transform">
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Savings
                        Rate</p>
                    <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">31%</h3>
                    <span
                        className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center mt-2 bg-green-500/10 w-fit px-2 py-0.5 rounded">
                  <span className="material-icons-round text-sm mr-1">trending_up</span> +2%
              </span>
                </div>
                <div
                    className="glass-freak p-5 rounded-3xl border border-slate-200 dark:border-white/5 hover:-translate-y-1 transition-transform">
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Top
                        Category</p>
                    <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">Housing</h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-2 block">35% of total spend</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Income vs Expenses Chart */}
                <div className="glass-freak p-6 rounded-3xl border border-slate-200 dark:border-white/10 lg:col-span-2">
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-6">Income vs
                        Expenses Analysis</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={monthlyData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
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
                                <YAxis tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false}
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
                                <Area type="monotone" dataKey="income" fill="url(#colorIncome)" stroke="#10b981"
                                      strokeWidth={3} name="Income"/>
                                <Area type="monotone" dataKey="expense" fill="url(#colorExpense)" stroke="#ef4444"
                                      strokeWidth={3} name="Expenses"/>
                                <Line type="monotone" dataKey="savings" stroke="#5c7cf9" strokeWidth={3}
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
                            <BarChart data={categoryData} layout="vertical"
                                      margin={{top: 5, right: 30, left: 40, bottom: 5}}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}
                                               stroke="rgba(148, 163, 184, 0.2)"/>
                                <XAxis type="number" hide/>
                                <YAxis type="category" dataKey="name" tick={{fill: '#94a3b8', fontSize: 12}} width={100}
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
                                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color}
                                              style={{filter: `drop-shadow(0 0 4px ${entry.color})`}}/>
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
                        <span
                            className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-500/20 px-2.5 py-1 rounded-lg border border-green-500/20">+12.5% YTD</span>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}
                                               stroke="rgba(148, 163, 184, 0.2)"/>
                                <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false}
                                       tickLine={false} dy={10}/>
                                <YAxis tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false}/>
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
                                <Line type="stepAfter" dataKey="savings" stroke="#8b5cf6" strokeWidth={4} dot={false}
                                      activeDot={{r: 8, fill: '#fff', stroke: '#8b5cf6'}}
                                      style={{filter: 'drop-shadow(0 0 8px #8b5cf6)'}}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Analytics;