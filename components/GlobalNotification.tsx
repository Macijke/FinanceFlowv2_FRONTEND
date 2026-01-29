import React, {useEffect, useState} from 'react';

interface GlobalNotificationProps {
    title: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    onClose: () => void;
}

const GlobalNotification: React.FC<GlobalNotificationProps> = ({title, message, type, onClose}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return 'check_circle';
            case 'error':
                return 'error';
            case 'warning':
                return 'warning';
            case 'info':
                return 'info';
        }
    };

    const getColors = () => {
        switch (type) {
            case 'success':
                return 'border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
            case 'error':
                return 'border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400';
            case 'warning':
                return 'border-orange-500/50 bg-orange-500/10 text-orange-600 dark:text-orange-400';
            default:
                return 'border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400';
        }
    };

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
            <div
                className={`
          pointer-events-auto flex items-start gap-4 p-4 rounded-2xl glass-modal shadow-2xl border min-w-[320px] max-w-md
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-12 opacity-0 scale-95'}
          ${type === 'error' ? 'shadow-[0_10px_40px_-10px_rgba(239,68,68,0.5)]' : 'shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)]'}
        `}
            >
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border ${getColors()}`}>
                    <span className="material-icons-round text-xl">{getIcon()}</span>
                </div>

                <div className="flex-1 pt-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{title}</h4>
                    <p className="text-slate-500 dark:text-slate-300 text-sm mt-0.5 leading-relaxed">{message}</p>
                </div>

                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300); // Wait for animation
                    }}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-1"
                >
                    <span className="material-icons-round text-lg">close</span>
                </button>
            </div>
        </div>
    );
};

export default GlobalNotification;