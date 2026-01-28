import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';

interface HeaderProps {
    title: string;
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({title, onMenuClick}) => {
    const location = useLocation();
    const [showNotifications, setShowNotifications] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);

    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
    };

    // Close notifications when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const renderBreadcrumbs = () => {
        const path = location.pathname;
        let pageName = '';

        if (path === '/savings') pageName = 'Savings Goals';
        else if (path === '/budgets') pageName = 'Budgets';
        else if (path === '/analytics') pageName = 'Analytics';
        else if (path === '/transactions') pageName = 'Transactions';
        else if (path === '/settings') pageName = 'Settings';
        else return <h1
                className="hidden md:block text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">{title}</h1>;

        return (
            <div className="text-sm font-display tracking-wide text-slate-500 dark:text-slate-400 hidden sm:block">
                <span className="opacity-60">Finance Flow</span> <span className="mx-2 text-primary">/</span> <span
                className="text-slate-900 dark:text-white font-bold">{pageName}</span>
            </div>
        );
    };

    const notifications = [
        {
            title: 'Budget Exceeded',
            msg: 'You exceeded your Dining budget by $20.',
            time: '2m ago',
            icon: 'warning',
            color: 'text-red-500',
            bg: 'bg-red-500/10'
        },
        {
            title: 'Goal Reached',
            msg: 'You hit 25% of your Vacation goal!',
            time: '1h ago',
            icon: 'emoji_events',
            color: 'text-yellow-500',
            bg: 'bg-yellow-500/10'
        },
        {
            title: 'Subscription',
            msg: 'Spotify Premium payment upcoming.',
            time: '5h ago',
            icon: 'payments',
            color: 'text-blue-500',
            bg: 'bg-blue-500/10'
        },
    ];

    return (
        <header className="h-24 flex-shrink-0 flex items-center justify-between px-8 z-20 relative">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-3 rounded-xl glass-freak text-slate-500 hover:text-primary transition-colors"
                >
                    <span className="material-icons-round">menu</span>
                </button>
                {renderBreadcrumbs()}
            </div>

            <div className="flex items-center gap-4">
                <div className="glass-freak rounded-full p-1 flex items-center gap-1 relative" ref={notifRef}>
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
                    >
                        <span className="material-icons-round dark:hidden">dark_mode</span>
                        <span
                            className="material-icons-round hidden dark:block text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">light_mode</span>
                    </button>

                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-white/10 relative transition-colors"
                    >
                        <span className="material-icons-round">notifications</span>
                        <span
                            className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-secondary border-2 border-transparent shadow-[0_0_8px_rgba(236,72,153,0.6)] animate-pulse"></span>
                    </button>

                    {/* Notifications Popup */}
                    {showNotifications && (
                        <div
                            className="absolute top-14 right-0 w-[480px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-enter z-50">
                            <div
                                className="px-5 py-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-white/5">
                                <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                                <button
                                    className="text-[10px] text-primary hover:text-accent uppercase font-bold tracking-wider transition-colors">Mark
                                    all read
                                </button>
                            </div>
                            <div className="max-h-[500px] overflow-y-auto">
                                {notifications.map((n, i) => (
                                    <div key={i}
                                         className="px-5 py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer border-b border-slate-100 dark:border-white/5 last:border-0 group">
                                        <div className="flex gap-4">
                                            <div
                                                className={`w-10 h-10 rounded-full ${n.bg} ${n.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                <span className="material-icons-round text-lg">{n.icon}</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white text-sm">{n.title}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-medium">{n.msg}</p>
                                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">{n.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div
                                className="p-3 text-center border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5">
                                <button
                                    className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors uppercase tracking-wider">View
                                    All Activity
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className="w-10 h-10 md:hidden rounded-full bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center text-xs font-bold shadow-lg">JK
                </div>
            </div>
        </header>
    );
};

export default Header;