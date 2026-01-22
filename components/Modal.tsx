import React, {useEffect} from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, title, children}) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>
            <div
                className="relative w-full max-w-2xl glass-modal rounded-3xl p-6 md:p-8 animate-enter overflow-hidden max-h-[90vh] overflow-y-auto">
                {/* Top Accent Line */}
                <div
                    className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-accent"></div>

                <div className="flex justify-between items-center mb-6 mt-1">
                    <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white tracking-tight">{title}</h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-danger hover:bg-red-50 dark:hover:bg-red-900/20 transition-all border border-transparent hover:border-red-200 dark:hover:border-red-800"
                    >
                        <span className="material-icons-round text-xl">close</span>
                    </button>
                </div>

                <div className="space-y-5">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;