import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import {getApiUrl} from "@/config/api.ts";
import NewSavingGoalsDialog from "@/components/savingsgoal/NewSavingGoalsDialog.tsx";
import ContributeSavingsGoalDialog from "@/components/savingsgoal/ContributeSavingsGoalDialog.tsx";
import {useNotification} from "@/context/NotificationContext.tsx";

const SavingsGoals: React.FC = () => {
    const [isContributionOpen, setIsContributionOpen] = useState(false);
    const [isNewGoalOpen, setIsNewGoalOpen] = useState(false);
    const [goals, setGoals] = useState([]);
    const [cookies] = useCookies(['user']);
    const {showNotification} = useNotification();
    const [editingGoal, setEditingGoal] = useState<any>(null);
    const [contributingGoal, setContributingGoal] = useState<{ id: number, name: string } | null>(null);

    const getTimeRemaining = (deadline: string) => {
        const total = Date.parse(deadline) - Date.parse(new Date().toString());
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (days < 0) return {text: 'Overdue', color: 'text-red-500', icon: 'error'};
        if (days === 0) return {text: 'Due today', color: 'text-orange-500', icon: 'warning'};
        if (years > 0) return {
            text: `${years} year${years > 1 ? 's' : ''} left`,
            color: 'text-slate-500 dark:text-slate-400',
            icon: 'schedule'
        };
        if (months > 0) return {
            text: `${months} month${months > 1 ? 's' : ''} left`,
            color: 'text-slate-500 dark:text-slate-400',
            icon: 'schedule'
        };
        return {text: `${days} day${days > 1 ? 's' : ''} left`, color: 'text-orange-500', icon: 'schedule'};
    };

    const sortedGoals = [...goals].sort((a: any, b: any) => {
        const timeA = Date.parse(a.targetDate) - Date.now();
        const timeB = Date.parse(b.targetDate) - Date.now();
        return timeA - timeB;
    });

    const fetchSavingsGoals = async () => {
        try {
            const response = await fetch(getApiUrl(`/savings-goals`), {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${cookies.user}`,
                },
            });

            const data = await response.json();
            const gls = data.data || [];
            setGoals(gls);
            return data;
        } catch (err) {
            console.error('Error:', err);
        } finally {
            //setLoading(false);
        }
    };

    useEffect(() => {
        fetchSavingsGoals();
    }, [cookies.user]);

    const onGoalAdded = () => {
        fetchSavingsGoals();
        setEditingGoal(null);
        showNotification("Goal saved successfully", "Your savings goal has been created/updated.", "success");
    }

    const onContribution = () => {
        fetchSavingsGoals();
        setContributingGoal(null);
        showNotification("Contribution added", "Your contribution has been added to the savings goal.", "success");
    }

    const handleEditGoal = (goal: any) => {
        setEditingGoal(goal);
        setIsNewGoalOpen(true);
    };

    const handleDeleteGoal = async (goalId: number) => {
        if (!confirm("Are you sure you want to delete this goal?")) return;

        try {
            const response = await fetch(getApiUrl(`/savings-goals/${goalId}`), {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${cookies.user}`,
                },
            });

            if (response.ok) {
                fetchSavingsGoals();
            }
        } catch (err) {
            console.error('Error deleting goal:', err);
        }
    };

    const handleContributeClick = (goal: any) => {
        setContributingGoal({
            id: goal.id,
            name: goal.name
        });
        setIsContributionOpen(true);
    };

    const handleCloseNewGoal = () => {
        setIsNewGoalOpen(false);
        setEditingGoal(null);
    };

    const handleCloseContribution = () => {
        setIsContributionOpen(false);
        setContributingGoal(null);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-2">Savings
                        Goals</h2>
                    <p className="text-slate-500 dark:text-slate-300">Manifest your dreams into reality.</p>
                </div>
                <button
                    onClick={() => setIsNewGoalOpen(true)}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-primary text-white px-6 py-3 rounded-xl font-bold shadow-neon flex items-center transition-all transform hover:scale-105 hover:shadow-glow"
                >
                    <span className="material-icons mr-2">add</span>
                    New Dream
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">

                {sortedGoals.map((goal: any, idx) => {
                    const timeLeft = getTimeRemaining(goal.targetDate);
                    return (<div
                        key={idx}
                        className="glass-freak p-6 rounded-3xl flex flex-col group hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                        <div
                            className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-500/20 transition-colors"></div>

                        <div className="flex justify-between items-start mb-6 z-10">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-3xl shadow-inner border border-white/5">&nbsp;&nbsp;{goal.icon}&nbsp;&nbsp;</div>
                                <div>
                                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-orange-400 transition-colors">{goal.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{goal.description}</p>
                                    <div
                                        className="flex items-center gap-1 mt-1 text-xs text-slate-400 dark:text-slate-500">
                                        <span className="material-icons-round text-[12px]">event</span>
                                        <span>Due {goal.targetDate}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEditGoal(goal)}
                                    className="w-10 h-10 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                    <span className="material-icons text-sm">edit</span>
                                </button>
                                <button
                                    onClick={() => handleDeleteGoal(goal.id)}
                                    className="w-10 h-10 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                    <span className="material-icons text-sm">delete</span>
                                </button>
                            </div>
                        </div>

                        <div className="mb-8 z-10">
                            <div className="flex justify-between text-sm font-bold font-display mb-2">
                                <span className="text-orange-400">{goal.percentageCompleted}%</span>
                                <span className="text-slate-500 dark:text-slate-400">${goal.remainingAmount} left</span>
                            </div>
                            <div
                                className="h-4 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/5 p-0.5">
                                <div
                                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)] relative transition-all duration-500"
                                    style={{width: `${goal.percentageCompleted}%`}}>
                                    <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]"></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                                <div
                                    className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md">
                                    <span className="material-icons-round text-[12px]">flag</span>
                                    <span>Target: {goal.targetDate}</span>
                                </div>

                                <div className={`text-xs font-bold flex items-center gap-1.5 ${timeLeft.color}`}>
                                    <span className="material-icons-round text-[14px]">{timeLeft.icon}</span>
                                    {timeLeft.text}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-8 z-10">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Target</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white font-display">${goal.targetAmount}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Current</p>
                                <p className="text-xl font-bold text-orange-400 font-display">${goal.currentAmount}</p>
                            </div>

                        </div>
                        <div className="mt-auto z-10">
                            <button
                                onClick={() => handleContributeClick(goal)}
                                className="w-full py-3 rounded-xl border border-white/10 font-bold text-slate-300 hover:bg-orange-500 hover:text-white hover:border-transparent transition-all flex justify-center items-center gap-2 group/btn"
                            >
                            <span
                                className="material-icons text-sm group-hover/btn:rotate-90 transition-transform">add</span>
                                Add Contribution
                            </button>
                        </div>
                    </div>);
                })}

                {/* Create New Goal Card */}
                <div
                    onClick={() => setIsNewGoalOpen(true)}
                    className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center p-12 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group min-h-[400px]"
                >
                    <div
                        className="w-20 h-20 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                        <span className="material-icons text-4xl text-slate-500 group-hover:text-primary">add</span>
                    </div>
                    <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">Create
                        New Goal</h3>
                    <p className="text-center text-slate-500 dark:text-slate-400 max-w-xs">Start saving for something
                        wild.</p>
                </div>
            </div>

            {/* New Dream Modal */}
            <NewSavingGoalsDialog
                isOpen={isNewGoalOpen}
                onClose={handleCloseNewGoal}
                onGoalAdded={onGoalAdded}
                editGoal={editingGoal}
            />

            {/* Add Contribution Modal */}
            <ContributeSavingsGoalDialog
                isOpen={isContributionOpen}
                onClose={handleCloseContribution}
                onContribution={onContribution}
                goalInfo={contributingGoal}
            />

        </>
    );
};

export default SavingsGoals;
