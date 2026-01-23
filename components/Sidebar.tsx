import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getApiUrl} from "@/config/api.ts";
import {useCookies} from "react-cookie";
import Avatar from "react-avatar";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    currentPath: string;
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({isOpen, setIsOpen, currentPath, onLogout}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [userProfile, setUserProfile] = useState(null);

    const navItems = [
        {name: 'Dashboard', icon: 'dashboard', path: '/'},
        {name: 'Transactions', icon: 'receipt_long', path: '/transactions'},
        {name: 'Budgets', icon: 'account_balance', path: '/budgets'},
        {name: 'Analytics', icon: 'analytics', path: '/analytics'},
        {name: 'Savings', icon: 'savings', path: '/savings'},
        {name: 'Settings', icon: 'settings', path: '/settings'},
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(getApiUrl(`/users/profile`), {
                    headers: {
                        'Authorization': `Bearer ${cookies.user}`,
                    },
                });
                const data = await response.json();
                setUserProfile(data.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        };

        if (cookies.user) {
            fetchProfile();
        }
    }, [cookies.user]);

    const isActive = (path: string) => currentPath === path;

    return (
        <aside
            className={`
        fixed inset-y-0 left-0 z-30 w-72 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] md:translate-x-0 md:static md:flex flex-col p-4
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
        >
            <div
                className="h-full glass-freak rounded-3xl flex flex-col shadow-2xl overflow-hidden relative border border-white/10">
                {/* Noise overlay */}
                <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>

                <div className="h-24 flex items-center px-8 relative z-10">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
                            <span className="material-icons-round text-2xl">bolt</span>
                        </div>
                        <div>
                            <span
                                className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display">Finance</span>
                            <span
                                className="block text-xs font-medium text-primary tracking-[0.2em] uppercase">Flow</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto relative z-10">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`
                flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group font-display tracking-wide relative overflow-hidden
                ${isActive(item.path)
                                ? 'text-white shadow-neon'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-white/5 hover:text-primary dark:hover:text-white hover:translate-x-1'}
              `}
                        >
                            {/* Active Background Gradient */}
                            {isActive(item.path) && (
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90 rounded-2xl -z-10"></div>
                            )}

                            <span
                                className={`material-icons-round text-xl transition-transform duration-300 group-hover:scale-110 ${isActive(item.path) ? 'animate-pulse' : ''}`}>
                {item.icon}
              </span>
                            <span className="font-medium">{item.name}</span>

                            {isActive(item.path) && (
                                <span
                                    className="absolute right-4 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 relative z-10">
                    <div
                        className="glass-freak rounded-2xl p-4 mb-4 border border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className="w-10 h-10 rounded-full bg-gradient-to-tr from-secondary to-orange-400 p-[2px] shadow-glow-pink">
                                <div
                                    className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                                    <span className="text-sm font-bold text-white">
                                        <Avatar>
                                            src={userProfile?.profilePictureUrl}
                                            alt={`${userProfile?.firstName} ${userProfile?.lastName}`}
                                        </Avatar>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900 dark:text-white font-display">{userProfile?.firstName} {userProfile?.lastName}</span>
                                <span
                                    className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{userProfile?.role}</span>
                            </div>
                        </div>

                        <button
                            onClick={onLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-slate-600 dark:text-slate-300 hover:text-red-500 transition-all text-xs font-bold uppercase tracking-wider"
                        >
                            <span className="material-icons-round text-sm">power_settings_new</span>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;