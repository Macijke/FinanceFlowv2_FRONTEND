import React, {useEffect, useMemo, useState} from 'react';
import {useCookies} from "react-cookie";
import {getApiUrl} from "@/config/api.ts";
import BudgetsDialog from "@/components/budgets/BudgetsDialog.tsx";

const Budgets: React.FC = () => {
    const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
    const [isEditLimitsOpen, setIsEditLimitsOpen] = useState(false);

    const [cookies] = useCookies(["user"]);
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [editingBudget, setEditingBudget] = useState(null);

    const fetchBudgets = async () => {
        try {
            setLoading(true);
            const response = await fetch(getApiUrl(`/budgets`), {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${cookies.user}`,
                },
            });

            const data = await response.json();
            const bgts = data.data || [];
            setBudgets(bgts);
            return data;
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, [cookies.user]);

    const onBudgetAdded = () => {
        fetchBudgets();
        setEditingBudget(null);
    };

    const handleDeleteBudget = async (budgetId: number) => {
        if (!confirm("Are you sure you want to delete this budget?")) return;

        try {
            const response = await fetch(getApiUrl(`/budgets/${budgetId}`), {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${cookies.user}`,
                },
            });

            if (response.ok) {
                fetchBudgets();
            }
        } catch (err) {
            console.error('Error deleting budget:', err);
        }
    };

    const [currentDate, setCurrentDate] = useState(new Date());

    const goToPrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const formattedDate = currentDate.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});

    const monthBudgets = useMemo(() => {
        const y = currentDate.getFullYear();
        const m = currentDate.getMonth();
        return budgets.filter((b) => {
            const d = new Date(b.month);
            return d.getUTCFullYear() === y && d.getUTCMonth() === m;
        });
    }, [budgets, currentDate]);

    const totalBudget = useMemo(
        () => monthBudgets.reduce((acc, curr) => acc + curr.limitAmount, 0),
        [monthBudgets]
    );
    const totalSpent = useMemo(
        () => monthBudgets.reduce((acc, curr) => acc + curr.spentAmount, 0),
        [monthBudgets]
    );
    const totalRemaining = totalBudget - totalSpent;
    const percentageUsed = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

    return (
        <>
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-2">Monthly
                        Budget</h2>
                    <p className="text-slate-500 dark:text-slate-300">Keep your spending in check.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {/* Month Navigator */}
                    <div
                        className="flex items-center bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-xl p-1 shadow-sm">
                        <button
                            onClick={goToPrevMonth}
                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-colors"
                        >
                            <span className="material-icons-round">chevron_left</span>
                        </button>
                        <div
                            className="px-6 font-bold font-display text-slate-900 dark:text-white min-w-[160px] text-center select-none">
                            {formattedDate}
                        </div>
                        <button
                            onClick={goToNextMonth}
                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-colors"
                        >
                            <span className="material-icons-round">chevron_right</span>
                        </button>
                    </div>

                    <div className="h-8 w-px bg-slate-200 dark:bg-white/10 hidden sm:block"></div>

                    <div className="flex gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => setIsEditLimitsOpen(true)}
                            className="flex-1 sm:flex-none glass-freak text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10"
                        >
                            <span className="material-icons-round text-sm">edit</span> Edit Limits
                        </button>
                        <button
                            onClick={() => setIsAddBudgetOpen(true)}
                            className="flex-1 sm:flex-none bg-primary hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-soft flex items-center justify-center gap-2 transition-all hover:scale-105"
                        >
                            <span className="material-icons-round text-sm">add</span> New Category
                        </button>
                    </div>
                </div>
            </div>

            {/* Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div
                    className="glass-freak p-6 rounded-3xl relative overflow-hidden border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-slate-900/50">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full"></div>
                    <div className="flex items-center gap-3 mb-2 relative z-10">
                        <div
                            className="w-10 h-10 p-2 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                            <span className="material-icons-round">account_balance_wallet</span>
                        </div>
                        <span
                            className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">Total Budget</span>
                    </div>
                    <p className="text-3xl font-bold font-display text-slate-900 dark:text-white relative z-10">${totalBudget.toLocaleString()}</p>
                </div>

                <div
                    className="glass-freak p-6 rounded-3xl relative overflow-hidden border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-slate-900/50">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-pink-500/10 blur-2xl rounded-full"></div>
                    <div className="flex items-center gap-3 mb-2 relative z-10">
                        <div
                            className="w-10 h-10 p-2 rounded-lg bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400">
                            <span className="material-icons-round">payments</span>
                        </div>
                        <span
                            className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">Total Spent</span>
                    </div>
                    <p className="text-3xl font-bold font-display text-slate-900 dark:text-white relative z-10">${totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-pink-500 dark:text-pink-400 mt-1 font-medium">{percentageUsed}%
                        utilized</p>
                </div>

                <div
                    className="glass-freak p-6 rounded-3xl relative overflow-hidden border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-slate-900/50">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full"></div>
                    <div className="flex items-center gap-3 mb-2 relative z-10">
                        <div
                            className="w-10 h-10 p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                            <span className="material-icons-round">savings</span>
                        </div>
                        <span
                            className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">Remaining</span>
                    </div>
                    <p className="text-3xl font-bold font-display text-emerald-600 dark:text-emerald-400 relative z-10">${totalRemaining.toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {monthBudgets.map((cat, idx) => {
                    const budgetDate = new Date(cat.month);
                    const budgetMonth = budgetDate.getMonth() + 1;

                    if (budgetMonth === currentDate.getMonth() + 1 && budgetDate.getFullYear() === currentDate.getFullYear()) {
                        const percentage = cat.percentageUsed;
                        let statusColor = 'bg-primary';
                        let glow = 'shadow-[0_0_10px_rgba(99,102,241,0.5)]';

                        if (percentage >= 100) {
                            statusColor = 'bg-red-500';
                            glow = 'shadow-[0_0_10px_rgba(239,68,68,0.5)]';
                        } else if (percentage >= 80) {
                            statusColor = 'bg-orange-400';
                            glow = 'shadow-[0_0_10px_rgba(251,146,60,0.5)]';
                        } else {
                            statusColor = `bg-emerald-500`;
                            glow = 'shadow-[0_0_10px_rgba(251,146,60,0.5)]';
                        }

                        return (
                            <div key={idx}
                                 className="glass-freak p-6 rounded-3xl border border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group bg-white/40 dark:bg-slate-900/40">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-4">
                                        <div
                                            style={{backgroundColor: cat.categoryColor}}
                                            className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-white/5 group-hover:scale-110 transition-transform`}>
                                            <span className="material-icons-round text-2xl">{cat.categoryIcon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">{cat.categoryName}</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                    <span
                                        className={percentage > 100 ? 'text-red-500 dark:text-red-400 font-bold' : ''}>
                                        ${cat.spentAmount}
                                    </span>
                                                {' '} / ${cat.limitAmount}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 ${percentage > 100 ? 'text-red-500 dark:text-red-400' : 'text-slate-500 dark:text-slate-300'}`}>
                                        {percentage}%
                                    </div>
                                </div>

                                <div className="relative pt-2">
                                    <div
                                        className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-white/5 p-0.5">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${statusColor} ease-out ${percentage > 0 ? glow : ''}`}
                                            style={{
                                                width: `${Math.min(percentage, 100)}%`,
                                            }}
                                        ></div>
                                    </div>
                                    {percentage > 100 ? (
                                        <p className="mt-3 text-xs text-red-500 dark:text-red-400 font-bold flex items-center gap-1 animate-pulse">
                                            <span className="material-icons-round text-sm">warning</span>
                                            Over budget by ${cat.spentAmount - cat.limitAmount}
                                        </p>
                                    ) : (
                                        <div className="mt-3 flex justify-between text-xs text-slate-400">
                                            <span>${cat.remainingAmount} left</span>
                                            {percentage === 0 &&
                                                <span className="text-emerald-500 font-bold">Plan this budget</span>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }
                })}
            </div>

            {/* New Budget Modal */}
            <BudgetsDialog onClick={() => setIsAddBudgetOpen(true)} isOpen={isAddBudgetOpen} onClose={() => setIsAddBudgetOpen(false)}/>

            {/* Edit Limits Modal */}
            <BudgetsDialog isOpen={isAddBudgetOpen} onClose={() => setIsEditLimitsOpen(false)}/>
        </>
    );
};

export default Budgets;