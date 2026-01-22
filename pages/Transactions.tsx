import React, {useState} from 'react';
import Modal from '../components/Modal';

const Transactions: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');

    const transactions = [
        {
            name: 'Nadgodziny',
            category: 'Salary',
            date: 'Nov 6, 2025',
            amount: '+$2,881.92',
            icon: 'payments',
            color: 'green',
            type: 'income'
        },
        {
            name: 'Bonus Payment',
            category: 'Work',
            date: 'Nov 5, 2025',
            amount: '+$4,978.67',
            icon: 'emoji_events',
            color: 'yellow',
            type: 'income'
        },
        {
            name: 'Spotify Premium',
            category: 'Entertainment',
            date: 'Nov 3, 2025',
            amount: '-$15.99',
            icon: 'movie',
            color: 'cyan',
            type: 'expense'
        },
        {
            name: 'Żabka Market',
            category: 'Groceries',
            date: 'Oct 26, 2025',
            amount: '-$380.89',
            icon: 'shopping_cart',
            color: 'red',
            type: 'expense'
        },
        {
            name: 'Freelance Project',
            category: 'Design',
            date: 'Oct 23, 2025',
            amount: '+$5,309.35',
            icon: 'laptop_mac',
            color: 'blue',
            type: 'income'
        },
        {
            name: 'Carrefour',
            category: 'Groceries',
            date: 'Oct 20, 2025',
            amount: '-$36.30',
            icon: 'shopping_bag',
            color: 'red',
            type: 'expense'
        },
        {
            name: 'Woda (Water Bill)',
            category: 'Utilities',
            date: 'Oct 07, 2025',
            amount: '-$222.48',
            icon: 'lightbulb',
            color: 'orange',
            type: 'expense'
        },
    ];

    return (
        <>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-2">Transactions
                        History</h2>
                    <p className="text-slate-500 dark:text-slate-300">View and manage your financial records.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="hidden md:flex bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl text-sm font-bold shadow-neon hover:shadow-glow transition-all hover:scale-105 items-center gap-2"
                >
                    <span className="material-icons-round text-lg">add</span> Add Transaction
                </button>
            </div>

            {/* Improved Search & Filter Section */}
            <div className="glass-freak rounded-3xl p-6 mb-8 border border-white/20">
                <div className="flex flex-col gap-4">
                    {/* Search Bar */}
                    <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
               <span className="material-icons-round text-xl">search</span>
            </span>
                        <input
                            className="w-full pl-14 pr-4 py-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm font-medium"
                            placeholder="Search by name, category, or amount..."
                            type="text"
                        />
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            {/* Type Select */}
                            <div className="relative min-w-[160px]">
                                <select
                                    className="w-full appearance-none bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm font-bold cursor-pointer shadow-sm">
                                    <option>All Types</option>
                                    <option>Income</option>
                                    <option>Expense</option>
                                </select>
                                <span
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <span className="material-icons-round">expand_more</span>
                    </span>
                            </div>

                            {/* Date Range */}
                            <div
                                className="flex items-center gap-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 shadow-sm flex-1 sm:flex-none">
                                <span
                                    className="text-xs font-bold text-slate-400 uppercase tracking-widest">FROM:</span>
                                <input type="date"
                                       className="bg-transparent border-none text-slate-700 dark:text-slate-200 text-sm font-medium focus:ring-0 p-0 outline-none w-full sm:w-auto"
                                       defaultValue="2026-01-01"/>
                            </div>

                            <div
                                className="flex items-center gap-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 shadow-sm flex-1 sm:flex-none">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">TO:</span>
                                <input type="date"
                                       className="bg-transparent border-none text-slate-700 dark:text-slate-200 text-sm font-medium focus:ring-0 p-0 outline-none w-full sm:w-auto"
                                       defaultValue="2026-01-31"/>
                            </div>
                        </div>

                        {/* Show Count */}
                        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Show:</span>
                            <div className="relative">
                                <select
                                    className="appearance-none bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 py-2 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm font-bold cursor-pointer shadow-sm">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>50</option>
                                </select>
                                <span
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <span className="material-icons-round text-sm">expand_more</span>
                    </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="glass-freak rounded-3xl overflow-hidden shadow-xl border border-white/20 transition-colors duration-300">
                <div
                    className="px-6 py-5 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50/50 dark:bg-white/5 backdrop-blur-md">
                    <h2 className="text-lg font-bold font-display text-slate-800 dark:text-white">Recent
                        Transactions</h2>
                    <span
                        className="text-xs font-bold px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300 rounded-lg shadow-sm">67 Total</span>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-white/5">
                    {transactions.map((tx, idx) => (
                        <div key={idx}
                             className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
                            <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                <div
                                    className={`w-12 h-12 rounded-2xl bg-${tx.color}-100 dark:bg-${tx.color}-500/20 flex items-center justify-center text-${tx.color}-600 dark:text-${tx.color}-400 shadow-sm`}>
                                    <span className="material-icons-round">{tx.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors text-base">{tx.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                                        <span className="font-medium">{tx.category}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                        <span>{tx.date}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                                {/* Fixed Color Logic: Income is now Green (success), Expense is Red (danger) */}
                                <div
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${tx.type === 'income' ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' : 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10'}`}>
                                    <span
                                        className={`material-icons-round text-sm transform ${tx.type === 'income' ? 'rotate-45' : 'rotate-180'}`}>arrow_outward</span>
                                    <span className="font-bold text-base whitespace-nowrap">{tx.amount}</span>
                                </div>

                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                    <button
                                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-primary hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                                        <span className="material-icons-round text-lg">edit</span></button>
                                    <button
                                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                                        <span className="material-icons-round text-lg">delete</span></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="px-6 py-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5 backdrop-blur-md">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Showing 1 to 7 of 67 entries</span>
                    <div className="flex gap-2">
                        <button
                            className="px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 transition-colors">Previous
                        </button>
                        <button
                            className="px-3 py-1.5 text-sm font-bold bg-primary text-white rounded-lg shadow-neon hover:bg-accent transition-colors">1
                        </button>
                        <button
                            className="px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors">2
                        </button>
                        <button
                            className="px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors">3
                        </button>
                        <button
                            className="px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors">Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Floating Action Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center z-50 hover:scale-110 transition-transform"
            >
                <span className="material-icons-round text-2xl">add</span>
            </button>

            {/* Add Transaction Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
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

export default Transactions;