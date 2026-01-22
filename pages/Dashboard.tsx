import React, {useState} from 'react';
import Modal from '../components/Modal';
import {MonthlyTrends} from "@/components/dashboard/MonthlyTrends.tsx";
import {SpendingChart} from "@/components/dashboard/SpendingChart.tsx";
import {getApiUrl} from "@/config/api.ts";
import {useCookies} from "react-cookie";

const pieData = [
    {name: 'Groceries', value: 400},
    {name: 'Entertainment', value: 300},
    {name: 'Utilities', value: 300},
    {name: 'Rent', value: 200},
];

const Dashboard: React.FC = () => {
    const [isTxModalOpen, setIsTxModalOpen] = useState(false);
    const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
    const [summary, setSummary] = useState(null);
    const [cookies] = useCookies(["user"]);

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

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-float">
                <div>
                    <h2 className="text-4xl font-bold font-display text-slate-900 dark:text-white drop-shadow-sm">
                        Hello, <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Jan!</span> 👋
                    </h2>
                    <p className="text-slate-500 dark:text-slate-300 mt-1 font-medium">Let's make some money moves.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        className="glass-freak text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-200/50 dark:hover:bg-white/20 transition-all flex items-center gap-2 border border-white/10">
                        <span className="material-icons-round text-sm">cloud_download</span> Export
                    </button>
                    <button
                        onClick={() => setIsTxModalOpen(true)}
                        className="bg-gradient-to-r from-primary to-accent text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-neon hover:shadow-glow transition-all hover:scale-105 flex items-center gap-2"
                    >
                        <span className="material-icons-round text-sm">add</span> Add Transaction
                    </button>
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
                            <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 backdrop-blur-md">
                                <span className="material-icons-round text-primary dark:text-white">wallet</span>
                            </div>
                        </div>
                        <div className="mt-6 z-10">
                            <h3 className="text-4xl font-bold font-display text-slate-900 dark:text-white">{summary?.totalBalance ? `$${summary.totalBalance.toFixed(2)}` : "$0.00"}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <span
                                    className="bg-success/20 text-success px-2 py-0.5 rounded-md text-xs font-bold">+2.4%</span>
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
                                className="p-2.5 rounded-xl bg-success/10 text-success shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                                <span className="material-icons-round">trending_up</span>
                            </div>
                            <span
                                className="text-slate-500 dark:text-slate-300 font-display text-sm uppercase tracking-wide">Income</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold font-display text-slate-900 dark:text-white mt-2 group-hover:text-success transition-colors">$8,250.00</h3>
                    <p className="text-sm text-slate-400 mt-1">12 Transactions</p>
                </div>

                <div
                    className="glass-freak rounded-3xl p-6 group hover:-translate-y-1 transition-transform duration-300 border-l-4 border-l-secondary">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="p-2.5 rounded-xl bg-secondary/10 text-secondary shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                                <span className="material-icons-round">trending_down</span>
                            </div>
                            <span
                                className="text-slate-500 dark:text-slate-300 font-display text-sm uppercase tracking-wide">Spent</span>
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold font-display text-slate-900 dark:text-white mt-2 group-hover:text-secondary transition-colors">$3,420.50</h3>
                    <p className="text-sm text-slate-400 mt-1">45 Transactions</p>
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
                            className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs rounded-lg px-3 py-1.5 text-slate-500 dark:text-slate-400 focus:ring-0 cursor-pointer outline-none hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                            <option>Last 6 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="w-full h-[300px]">
                        {/* Monthly Trends Component
                            TODO: Implement Time Range Selection
                         */}
                        <MonthlyTrends/>
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
                <div className="divide-y divide-slate-200 dark:divide-white/5">
                    {[
                        {
                            name: 'Cyberpunk Game',
                            type: 'Entertainment',
                            date: 'Just now',
                            amount: '-$59.99',
                            icon: 'sports_esports',
                            color: 'purple',
                            isIncome: false
                        },
                        {
                            name: 'Freelance Gig',
                            type: 'Work',
                            date: '2h ago',
                            amount: '+$1,200.00',
                            icon: 'work',
                            color: 'blue',
                            isIncome: true
                        },
                        {
                            name: 'Grocery Run',
                            type: 'Food',
                            date: '5h ago',
                            amount: '-$142.50',
                            icon: 'shopping_cart',
                            color: 'pink',
                            isIncome: false
                        },
                    ].map((tx, i) => (
                        <div key={i}
                             className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors gap-4 group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-${tx.color}-500/20 to-${tx.color}-600/10 text-${tx.color}-500 dark:text-${tx.color}-400 flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="material-icons-round">{tx.icon}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{tx.name}</h4>
                                    <div
                                        className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                                        <span
                                            className="bg-slate-200 dark:bg-white/5 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide">{tx.type}</span>
                                        <span>•</span>
                                        <span>{tx.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 self-start sm:self-center">
                <span
                    className={`text-lg font-bold font-display ${tx.isIncome ? 'text-success drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'text-slate-400 dark:text-slate-300'}`}>
                  {tx.amount}
                </span>
                                <div
                                    className={`p-1.5 rounded-full ${tx.isIncome ? 'bg-success/10 text-success' : 'bg-slate-200 dark:bg-white/5 text-slate-400'}`}>
                                    <span
                                        className="material-icons-round text-sm">{tx.isIncome ? 'north_east' : 'south_west'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Transaction Modal */}
            <Modal
                isOpen={isTxModalOpen}
                onClose={() => setIsTxModalOpen(false)}
                title="Add Transaction"
            >
                <div className="space-y-4">
                    <div
                        className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                        <button
                            onClick={() => setTransactionType('expense')}
                            className={`flex-1 py-2.5 rounded-lg font-bold shadow-sm transition-all text-sm border ${transactionType === 'expense' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700' : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white'}`}
                        >
                            Expense
                        </button>
                        <button
                            onClick={() => setTransactionType('income')}
                            className={`flex-1 py-2.5 rounded-lg font-bold shadow-sm transition-all text-sm border ${transactionType === 'income' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700' : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white'}`}
                        >
                            Income
                        </button>
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Amount</label>
                        <div className="relative">
                            <span
                                className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold ${transactionType === 'income' ? 'text-success' : 'text-slate-400'}`}>$</span>
                            <input
                                type="number"
                                placeholder="0.00"
                                className={`w-full pl-8 pr-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 font-display text-lg font-bold shadow-sm ${transactionType === 'income' ? 'focus:ring-success' : 'focus:ring-primary'}`}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Category</label>
                            <select
                                className={`w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white cursor-pointer appearance-none shadow-sm ${transactionType === 'income' ? 'focus:ring-success' : 'focus:ring-primary'}`}>
                                <option>Select...</option>
                                <option>Groceries</option>
                                <option>Entertainment</option>
                                <option>Rent</option>
                                <option>Salary</option>
                            </select>
                        </div>
                        <div>
                            <label
                                className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Date</label>
                            <input
                                type="date"
                                className={`w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm ${transactionType === 'income' ? 'focus:ring-success' : 'focus:ring-primary'}`}
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Description</label>
                        <textarea
                            rows={3}
                            placeholder="What was this for?"
                            className={`w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 resize-none shadow-sm ${transactionType === 'income' ? 'focus:ring-success' : 'focus:ring-primary'}`}
                        ></textarea>
                    </div>

                    <div className="pt-2">
                        <button
                            className={`w-full py-4 rounded-xl text-white font-bold shadow-neon hover:shadow-glow transition-all transform hover:scale-[1.02] tracking-wide text-lg ${transactionType === 'income' ? 'bg-gradient-to-r from-success to-emerald-600 shadow-green-900/20' : 'bg-gradient-to-r from-primary to-accent'}`}>
                            {transactionType === 'income' ? 'Add Income' : 'Add Expense'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Dashboard;