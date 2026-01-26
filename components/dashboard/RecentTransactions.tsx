import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {getApiUrl} from "@/config/api.ts";

export function RecentTransactions() {
    const [cookies] = useCookies(["user"]);
    const [recentTransactions, setRecentTransactions] = useState([]);

    const getRecentTransactions = async (maxLimit: number) => {
        const response = await fetch(getApiUrl(`/transactions/recent?limit=${maxLimit}`), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.user}`,
            },
        });
        const data = await response.json();
        setRecentTransactions(data.data);
    }

    useEffect(() => {
        getRecentTransactions(5);
    }, [cookies.user]);

    return (
        <>
            <div className="divide-y divide-slate-200 dark:divide-white/5">
                {recentTransactions.map((tx, i) => (
                    <div key={i}
                         className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors gap-4 group cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div
                                className={`w-12 h-12 rounded-2xl bg-gradient-to-br text-${tx.categoryColor}} flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-white/5 group-hover:scale-110 transition-transform duration-300 overflow-hidden`}>
                                <span className="material-icons-round text-2xl leading-none">{tx.categoryIcon}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{tx.description}</h4>
                                <div
                                    className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                                        <span
                                            className="bg-slate-200 dark:bg-white/5 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide">{tx.categoryName}</span>
                                    <span>•</span>
                                    <span>{tx.transactionDate}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 self-start sm:self-center">
                            <span
                                className={`text-lg font-bold font-display ${tx.type === 'INCOME' ? 'text-success drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'text-secondary transition-colors drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]'}`}>
                                ${tx.amount.toFixed(2)}
                            </span>

                            <div
                                className={`p-1.5 rounded-full ${tx.type === 'INCOME' ? 'bg-success/10 text-success' : 'bg-slate-200 dark:bg-white/5 text-slate-400'}`}>
                                <span className="material-icons-round text-sm">
                                    {tx.type === 'INCOME' ? 'north_east' : 'south_west'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}