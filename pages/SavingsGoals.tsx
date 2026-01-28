import React, {useState} from 'react';
import Modal from '../components/menu/Modal.tsx';

const SavingsGoals: React.FC = () => {
    const [isNewGoalOpen, setIsNewGoalOpen] = useState(false);
    const [isContributionOpen, setIsContributionOpen] = useState(false);

    // State for forms
    const [selectedColor, setSelectedColor] = useState('#3b82f6'); // Default blue
    const [selectedEmoji, setSelectedEmoji] = useState('✈️'); // Default emoji

    // Preset colors for quick selection
    const presetColors = [
        '#3b82f6', // blue
        '#a855f7', // purple
        '#ec4899', // pink
        '#f97316', // orange
        '#10b981', // green
        '#14b8a6', // teal
        '#ef4444', // red
    ];

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

                {/* Goal Card 1 */}
                <div
                    className="glass-freak p-6 rounded-3xl flex flex-col group hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                    <div
                        className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-500/20 transition-colors"></div>

                    <div className="flex justify-between items-start mb-6 z-10">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-3xl shadow-inner border border-white/5">
                                🏖️
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-orange-400 transition-colors">Vacation</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Greece 2026</p>
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                <span className="material-icons text-sm">edit</span>
                            </button>
                        </div>
                    </div>
                    <div className="mb-8 z-10">
                        <div className="flex justify-between text-sm font-bold font-display mb-2">
                            <span className="text-orange-400">31%</span>
                            <span className="text-slate-500 dark:text-slate-400">$5,500 left</span>
                        </div>
                        <div
                            className="h-4 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/5 p-0.5">
                            <div
                                className="h-full bg-gradient-to-r from-orange-500 to-red-500 w-[31%] rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)] relative">
                                <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8 z-10">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Target</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white font-display">$8,000</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Current</p>
                            <p className="text-xl font-bold text-orange-400 font-display">$2,500</p>
                        </div>
                    </div>
                    <div className="mt-auto z-10">
                        <button
                            onClick={() => setIsContributionOpen(true)}
                            className="w-full py-3 rounded-xl border border-white/10 font-bold text-slate-300 hover:bg-orange-500 hover:text-white hover:border-transparent transition-all flex justify-center items-center gap-2 group/btn"
                        >
                            <span
                                className="material-icons text-sm group-hover/btn:rotate-90 transition-transform">add</span>
                            Add Contribution
                        </button>
                    </div>
                </div>

                {/* Goal Card 2 */}
                <div
                    className="glass-freak p-6 rounded-3xl flex flex-col group hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                    <div
                        className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors"></div>

                    <div className="flex justify-between items-start mb-6 z-10">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-3xl shadow-inner border border-white/5">
                                💻
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">Tech
                                    Upgrade</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">M4 Macbook Pro</p>
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                <span className="material-icons text-sm">edit</span>
                            </button>
                        </div>
                    </div>
                    <div className="mb-8 z-10">
                        <div className="flex justify-between text-sm font-bold font-display mb-2">
                            <span className="text-cyan-400">24%</span>
                            <span className="text-slate-500 dark:text-slate-400">$3,800 left</span>
                        </div>
                        <div
                            className="h-4 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/5 p-0.5">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[24%] rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] relative">
                                <div className="absolute inset-0 bg-white/20 animate-[pulse_3s_infinite]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8 z-10">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Target</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white font-display">$5,000</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Current</p>
                            <p className="text-xl font-bold text-cyan-400 font-display">$1,200</p>
                        </div>
                    </div>
                    <div className="mt-auto z-10">
                        <button
                            onClick={() => setIsContributionOpen(true)}
                            className="w-full py-3 rounded-xl border border-white/10 font-bold text-slate-300 hover:bg-cyan-500 hover:text-white hover:border-transparent transition-all flex justify-center items-center gap-2 group/btn"
                        >
                            <span
                                className="material-icons text-sm group-hover/btn:rotate-90 transition-transform">add</span>
                            Add Contribution
                        </button>
                    </div>
                </div>

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
            <Modal
                isOpen={isNewGoalOpen}
                onClose={() => setIsNewGoalOpen(false)}
                title="Manifest a New Dream"
            >
                <div className="space-y-6">
                    <div className="flex gap-6">
                        {/* Emoji Picker Input */}
                        <div className="flex-shrink-0">
                            <label
                                className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">Icon</label>
                            <div
                                className="relative w-20 h-20 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-4xl shadow-sm overflow-hidden group">
                                <span
                                    className="pointer-events-none group-focus-within:opacity-50 transition-opacity">{selectedEmoji}</span>
                                <input
                                    type="text"
                                    value={selectedEmoji}
                                    onChange={(e) => setSelectedEmoji(e.target.value)}
                                    maxLength={2}
                                    className="absolute inset-0 w-full h-full text-center opacity-0 cursor-pointer focus:opacity-100 bg-transparent outline-none text-slate-900 dark:text-white text-4xl caret-primary"
                                />
                                <div className="absolute bottom-1 right-1 pointer-events-none">
                                    <span className="material-icons text-[10px] text-slate-400">edit</span>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1.5 text-center">Win + .</p>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <label
                                    className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Goal
                                    Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Tesla Model 3"
                                    className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Target
                                    Amount</label>
                                <div className="relative">
                                    <span
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full pl-8 pr-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 font-display text-lg font-bold shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Description</label>
                        <input
                            type="text"
                            placeholder="Why do you want this?"
                            className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 shadow-sm"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Deadline</label>
                        <input
                            type="date"
                            className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm"
                        />
                    </div>

                    {/* Custom Color Picker */}
                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">Theme
                            Color</label>
                        <div className="flex flex-wrap gap-3 items-center">
                            {presetColors.map((color) => (
                                <div
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-10 h-10 rounded-full cursor-pointer transition-all transform hover:scale-110 shadow-sm ${selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : ''}`}
                                    style={{backgroundColor: color}}
                                ></div>
                            ))}

                            {/* Native HEX Input */}
                            <div className="relative group">
                                <div
                                    className={`w-10 h-10 rounded-full cursor-pointer transition-all transform hover:scale-110 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center ${!presetColors.includes(selectedColor) ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : ''}`}
                                >
                                    <span className="material-icons text-white text-sm drop-shadow-md">colorize</span>
                                </div>
                                <input
                                    type="color"
                                    value={selectedColor}
                                    onChange={(e) => setSelectedColor(e.target.value)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            className="w-full py-4 rounded-xl text-white font-bold shadow-neon hover:shadow-glow transition-all transform hover:scale-[1.02] tracking-wide text-lg"
                            style={{background: selectedColor, boxShadow: `0 0 20px -5px ${selectedColor}80`}}
                        >
                            Launch Goal
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Add Contribution Modal */}
            <Modal
                isOpen={isContributionOpen}
                onClose={() => setIsContributionOpen(false)}
                title="Add Contribution"
            >
                <div className="space-y-6">
                    <div className="text-center py-2">
                        <p className="text-slate-500 dark:text-slate-400 mb-2">You are getting closer!</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Vacation Fund</h3>
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Deposit
                            Amount</label>
                        <div className="relative">
                            <span
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-success font-bold text-xl">$</span>
                            <input
                                type="number"
                                placeholder="0.00"
                                className="w-full pl-8 pr-4 py-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-success focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 font-display text-3xl font-bold shadow-sm text-center"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Note
                            (Optional)</label>
                        <input
                            type="text"
                            placeholder="Monthly savings..."
                            className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-success focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 shadow-sm"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-success to-emerald-600 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-all transform hover:scale-[1.02] tracking-wide text-lg flex items-center justify-center gap-2">
                            <span className="material-icons-round">payments</span>
                            Deposit Funds
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default SavingsGoals;