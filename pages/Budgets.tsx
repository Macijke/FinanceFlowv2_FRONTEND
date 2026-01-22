import React, {useState} from 'react';
import Modal from '../components/Modal';

const Budgets: React.FC = () => {
    const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
    const [isEditLimitsOpen, setIsEditLimitsOpen] = useState(false);

    const budgetCategories = [
        {name: 'Groceries', limit: 500, spent: 342, icon: 'shopping_cart', color: 'emerald'},
        {name: 'Housing', limit: 1200, spent: 1150, icon: 'home', color: 'blue'},
        {name: 'Entertainment', limit: 200, spent: 225, icon: 'movie', color: 'purple'},
        {name: 'Transport', limit: 150, spent: 45, icon: 'directions_car', color: 'orange'},
        {name: 'Dining', limit: 300, spent: 120, icon: 'restaurant', color: 'pink'},
        {name: 'Shopping', limit: 400, spent: 85, icon: 'shopping_bag', color: 'cyan'},
    ];

    const totalBudget = budgetCategories.reduce((acc, curr) => acc + curr.limit, 0);
    const totalSpent = budgetCategories.reduce((acc, curr) => acc + curr.spent, 0);
    const totalRemaining = totalBudget - totalSpent;
    const percentageUsed = Math.round((totalSpent / totalBudget) * 100);

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-2">Monthly
                        Budget</h2>
                    <p className="text-slate-500 dark:text-slate-300">Keep your spending in check.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsEditLimitsOpen(true)}
                        className="glass-freak text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                        <span className="material-icons-round text-sm">edit</span> Edit Limits
                    </button>
                    <button
                        onClick={() => setIsAddBudgetOpen(true)}
                        className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-xl text-sm font-bold shadow-neon flex items-center gap-2 transition-all hover:scale-105"
                    >
                        <span className="material-icons-round text-sm">add</span> New Category
                    </button>
                </div>
            </div>

            {/* Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-freak p-6 rounded-3xl relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/20 blur-2xl rounded-full"></div>
                    <div className="flex items-center gap-3 mb-2 relative z-10">
                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-500 dark:text-blue-400">
                            <span className="material-icons-round">account_balance_wallet</span>
                        </div>
                        <span
                            className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">Total Budget</span>
                    </div>
                    <p className="text-3xl font-bold font-display text-slate-900 dark:text-white relative z-10">${totalBudget.toLocaleString()}</p>
                </div>

                <div className="glass-freak p-6 rounded-3xl relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-pink-500/20 blur-2xl rounded-full"></div>
                    <div className="flex items-center gap-3 mb-2 relative z-10">
                        <div className="p-2 rounded-lg bg-pink-500/20 text-pink-500 dark:text-pink-400">
                            <span className="material-icons-round">payments</span>
                        </div>
                        <span
                            className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">Total Spent</span>
                    </div>
                    <p className="text-3xl font-bold font-display text-slate-900 dark:text-white relative z-10">${totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-pink-500 dark:text-pink-400 mt-1 font-medium">{percentageUsed}%
                        utilized</p>
                </div>

                <div className="glass-freak p-6 rounded-3xl relative overflow-hidden border-emerald-500/30">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full"></div>
                    <div className="flex items-center gap-3 mb-2 relative z-10">
                        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-500 dark:text-emerald-400">
                            <span className="material-icons-round">savings</span>
                        </div>
                        <span
                            className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">Remaining</span>
                    </div>
                    <p className="text-3xl font-bold font-display text-emerald-600 dark:text-emerald-400 relative z-10">${totalRemaining.toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {budgetCategories.map((cat, idx) => {
                    const percentage = Math.round((cat.spent / cat.limit) * 100);
                    let statusColor = 'bg-primary';
                    let glow = 'shadow-[0_0_10px_rgba(99,102,241,0.5)]';

                    if (percentage >= 100) {
                        statusColor = 'bg-red-500';
                        glow = 'shadow-[0_0_10px_rgba(239,68,68,0.5)]';
                    } else if (percentage >= 80) {
                        statusColor = 'bg-orange-400';
                        glow = 'shadow-[0_0_10px_rgba(251,146,60,0.5)]';
                    } else {
                        statusColor = `bg-${cat.color}-500`;
                        glow = `shadow-[0_0_10px_rgba(var(--color-${cat.color}-500),0.5)]`;
                    }

                    return (
                        <div key={idx}
                             className="glass-freak p-6 rounded-3xl hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-14 h-14 rounded-2xl bg-${cat.color}-100 dark:bg-${cat.color}-500/20 text-${cat.color}-600 dark:text-${cat.color}-400 flex items-center justify-center border border-slate-200 dark:border-white/5 group-hover:scale-110 transition-transform`}>
                                        <span className="material-icons-round text-2xl">{cat.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">{cat.name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                    <span
                                        className={percentage > 100 ? 'text-red-500 dark:text-red-400 font-bold' : ''}>
                                        ${cat.spent}
                                    </span>
                                            {' '} / ${cat.limit}
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
                                    className="h-3 w-full bg-slate-200 dark:bg-slate-900/50 rounded-full overflow-hidden border border-slate-200 dark:border-white/5 p-0.5">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ease-out ${statusColor} ${glow}`}
                                        style={{width: `${Math.min(percentage, 100)}%`}}
                                    ></div>
                                </div>
                                {percentage > 100 && (
                                    <p className="mt-3 text-xs text-red-500 dark:text-red-400 font-bold flex items-center gap-1 animate-pulse">
                                        <span className="material-icons-round text-sm">warning</span>
                                        Over budget by ${cat.spent - cat.limit}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* New Budget Modal */}
            <Modal
                isOpen={isAddBudgetOpen}
                onClose={() => setIsAddBudgetOpen(false)}
                title="New Budget"
            >
                <div className="space-y-4">
                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Category</label>
                        <select
                            className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white cursor-pointer appearance-none shadow-sm">
                            <option>Select...</option>
                            <option>Travel</option>
                            <option>Education</option>
                            <option>Health</option>
                        </select>
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Amount
                            Limit</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                            <input
                                type="number"
                                placeholder="0"
                                className="w-full pl-8 pr-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 font-display text-lg font-bold shadow-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Month</label>
                        <input
                            type="month"
                            className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-neon hover:shadow-glow transition-all transform hover:scale-[1.02] tracking-wide text-lg">
                            Set Budget
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit Limits Modal (Simplified) */}
            <Modal
                isOpen={isEditLimitsOpen}
                onClose={() => setIsEditLimitsOpen(false)}
                title="Edit Limits"
            >
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                    {budgetCategories.map((cat, i) => (
                        <div key={i}
                             className="flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-8 h-8 rounded-full bg-${cat.color}-100 dark:bg-${cat.color}-500/20 text-${cat.color}-600 dark:text-${cat.color}-400 flex items-center justify-center`}>
                                    <span className="material-icons-round text-sm">{cat.icon}</span>
                                </div>
                                <span className="font-bold text-slate-900 dark:text-white text-sm">{cat.name}</span>
                            </div>
                            <input
                                type="number"
                                defaultValue={cat.limit}
                                className="w-24 px-2 py-1 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-700 text-right text-sm text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>
                    ))}
                    <div className="pt-2">
                        <button
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-neon hover:shadow-glow transition-all tracking-wide">
                            Update All Limits
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Budgets;