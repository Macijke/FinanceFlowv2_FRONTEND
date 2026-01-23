import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import {getApiUrl} from "@/config/api.ts";
import {TransactionDialog} from "@/components/transaction/TransactionDialog.tsx";

const Transactions: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cookies] = useCookies(['user']);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("ALL");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleTransactions = async (page = 0, size = pageSize) => {
        try {
            setLoading(true);

            const params = new URLSearchParams({
                page: page.toString(),
                size: size.toString(),
            });

            const response = await fetch(getApiUrl(`/transactions?${params}`), {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${cookies.user}`,
                },
            });

            const data = await response.json();
            const pageData = data.data;

            setTransactions(pageData.content || []);
            setCurrentPage(pageData.number || 0);
            setTotalPages(pageData.totalPages || 0);
            setTotalElements(pageData.totalElements || 0);

            return data;
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (cookies.user) {
            handleTransactions(0, pageSize);
        }
    }, [cookies.user, pageSize]);

    const filteredTransactions = transactions.filter(transaction => {
        if (filterType !== "ALL" && transaction.type !== filterType) {
            return false;
        }

        if (startDate && new Date(transaction.transactionDate) < new Date(startDate)) {
            return false;
        }
        if (endDate && new Date(transaction.transactionDate) > new Date(endDate)) {
            return false;
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const description = transaction.description?.toLowerCase() || "";
            const categoryName = transaction.categoryName?.toLowerCase() || "";
            const amount = transaction.amount?.toString() || "";

            return (
                description.includes(query) ||
                categoryName.includes(query) ||
                amount.includes(query)
            );
        }

        return true;
    });

    const onTransactionAdded = () => {
        handleTransactions(currentPage, pageSize);
        setIsModalOpen(false);
    };

    const resetFilters = () => {
        setSearchQuery("");
        setFilterType("ALL");
        setStartDate("");
        setEndDate("");
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
            handleTransactions(newPage, pageSize);
        }
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(0);
        handleTransactions(0, newSize);
    };

    const hasActiveFilters = searchQuery || filterType !== "ALL" || startDate || endDate;

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
                            value={searchQuery}
                            className="w-full pl-14 pr-4 py-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm font-medium"
                            placeholder="Search by name, category, or amount..."
                            type="text"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            {/* Type Select */}
                            <div className="relative min-w-[160px]">
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="w-full appearance-none bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm font-bold cursor-pointer shadow-sm">
                                    <option value="ALL">All Types</option>
                                    <option value="INCOME">Income</option>
                                    <option value="EXPENSE">Expense</option>
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
                                       value={startDate}
                                       onChange={(e) => setStartDate(e.target.value)}
                                       className="bg-transparent border-none text-slate-700 dark:text-slate-200 text-sm font-medium focus:ring-0 p-0 outline-none w-full sm:w-auto"
                                />
                            </div>

                            <div
                                className="flex items-center gap-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 shadow-sm flex-1 sm:flex-none">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">TO:</span>
                                <input type="date"
                                       value={endDate}
                                       onChange={(e) => setEndDate(e.target.value)}
                                       className="bg-transparent border-none text-slate-700 dark:text-slate-200 text-sm font-medium focus:ring-0 p-0 outline-none w-full sm:w-auto"
                                />
                            </div>
                        </div>

                        {/* Show Count */}
                        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Show:</span>
                            <div className="relative">
                                <select
                                    value={pageSize}
                                    onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
                                    className="appearance-none bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 py-2 pl-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm font-bold cursor-pointer shadow-sm">
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
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
                        className="text-xs font-bold px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300 rounded-lg shadow-sm">
                        {hasActiveFilters && (
                            <> {filteredTransactions.length} filtered / </>
                        )}
                        {totalElements} total
                    </span>
                </div>

                <div className="flex flex-col">
                    {filteredTransactions.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-slate-500 dark:text-slate-400">No transactions found</p>
                        </div>
                    ) : (
                        filteredTransactions.map((tx, idx) => (
                            <div key={idx}
                                 className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer border-b border-slate-200 dark:border-white/5 last:border-0">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                    <div
                                        style={{backgroundColor: tx.categoryColor }}
                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm`}
                                    >
                                        <span className="material-icons-round">{tx.categoryIcon}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors text-base">{tx.description}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                                            <span className="font-medium">{tx.categoryName}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                            <span>{tx.transactionDate}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                                    <div
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${tx.type === 'INCOME' ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' : 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10'}`}>
                                        <span
                                            className={`material-icons-round text-sm transform ${tx.type === 'INCOME' ? 'rotate-45' : 'rotate-180'}`}>arrow_outward</span>
                                        <span className="font-bold text-base whitespace-nowrap">${Number.parseFloat(tx.amount).toFixed(2)}</span>
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
                        ))
                    )}
                </div>

                {!hasActiveFilters && totalPages > 1 && (
                    <div
                        className="px-6 py-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5 backdrop-blur-md">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Showing {currentPage + 1} to {totalPages} of {totalElements} entries</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(0)}
                                disabled={currentPage === 0}
                                className="px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 transition-colors">First
                            </button>

                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                                className="px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 transition-colors">
                                <span className={`material-icons-round text-sm transform rotate-180`}>arrow_forward</span>
                            </button>

                            {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i;
                                } else if (currentPage < 3) {
                                    pageNum = i;
                                } else if (currentPage > totalPages - 3) {
                                    pageNum = totalPages - 5 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`px-3 py-1.5 text-sm font-medium border rounded-lg transition-colors ${
                                            currentPage === pageNum
                                                ? 'bg-primary text-white border-primary'
                                                : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
                                        }`}>
                                        {pageNum + 1}
                                    </button>
                                );
                            })}

                            <button
                                className="px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages - 1}>
                                <span className={`material-icons-round text-sm transform`}>arrow_forward</span>
                            </button>
                            <button
                                onClick={() => handlePageChange(totalPages - 1)}
                                disabled={currentPage >= totalPages - 1}
                                className="px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 transition-colors">Last
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Floating Action Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center z-50 hover:scale-110 transition-transform"
            >
                <span className="material-icons-round text-2xl">add</span>
            </button>

            {/* Add Transaction Modal */}
            <TransactionDialog
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTransactionAdded={onTransactionAdded}
            />
        </>
    );
};

export default Transactions;
