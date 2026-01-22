import React, {useState} from 'react';

const Settings: React.FC = () => {
    // Simple "form" state for categories (visual only for this demo)
    const [catName, setCatName] = useState('');
    const [catType, setCatType] = useState('expense');
    const [catColor, setCatColor] = useState('#3b82f6');
    const [catEmoji, setCatEmoji] = useState('🏠');

    const presetColors = ['#3b82f6', '#10b981', '#ef4444', '#a855f7', '#f97316', '#ec4899'];

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Settings</h2>

                <div
                    className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden mb-8">
                    <div className="p-6 border-b border-border-light dark:border-border-dark">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Profile Information</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Update your account's profile
                            information and email address.</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="flex items-center gap-6">
                            <div
                                className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                JK
                            </div>
                            <div>
                                <button
                                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    Change Avatar
                                </button>
                                <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First
                                    Name</label>
                                <input
                                    type="text"
                                    defaultValue="Jan"
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last
                                    Name</label>
                                <input
                                    type="text"
                                    defaultValue="Kowalski"
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email
                                    Address</label>
                                <input
                                    type="email"
                                    defaultValue="jan.kowalski@example.com"
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 flex justify-end">
                        <button
                            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm">
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Manage Categories Section */}
                <div
                    className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden mb-8">
                    <div className="p-6 border-b border-border-light dark:border-border-dark">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Manage Categories</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Create custom categories for your
                            transactions.</p>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-5">
                            <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">New
                                Category</h4>

                            <div className="flex gap-4">
                                {/* Emoji Input */}
                                <div className="flex-shrink-0">
                                    <label className="block text-xs text-slate-500 mb-1">Icon (Win+.)</label>
                                    <div
                                        className="relative w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl shadow-sm overflow-hidden group">
                                        <span className="pointer-events-none">{catEmoji}</span>
                                        <input
                                            type="text"
                                            value={catEmoji}
                                            onChange={(e) => setCatEmoji(e.target.value)}
                                            maxLength={2}
                                            className="absolute inset-0 w-full h-full text-center opacity-0 cursor-pointer text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <label className="block text-xs text-slate-500 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={catName}
                                        onChange={(e) => setCatName(e.target.value)}
                                        placeholder="e.g. Gym"
                                        className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Type</label>
                                <div
                                    className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <button
                                        onClick={() => setCatType('expense')}
                                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${catType === 'expense' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500'}`}
                                    >Expense
                                    </button>
                                    <button
                                        onClick={() => setCatType('income')}
                                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${catType === 'income' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500'}`}
                                    >Income
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 mb-2">Color</label>
                                <div className="flex flex-wrap gap-2 items-center">
                                    {presetColors.map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setCatColor(c)}
                                            className={`w-8 h-8 rounded-full ${catColor === c ? 'ring-2 ring-offset-2 ring-primary dark:ring-offset-slate-800 scale-110' : ''}`}
                                            style={{backgroundColor: c}}
                                        ></button>
                                    ))}
                                    {/* Native HEX Input */}
                                    <div className="relative group">
                                        <div
                                            className={`w-8 h-8 rounded-full cursor-pointer transition-all bg-gradient-to-tr from-gray-200 to-gray-400 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center ${!presetColors.includes(catColor) ? 'ring-2 ring-offset-2 ring-primary dark:ring-offset-slate-800' : ''}`}
                                        >
                                            <span
                                                className="material-icons text-slate-600 dark:text-slate-300 text-xs">add</span>
                                        </div>
                                        <input
                                            type="color"
                                            value={catColor}
                                            onChange={(e) => setCatColor(e.target.value)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                className="w-full py-3 rounded-lg text-white font-bold hover:opacity-90 transition-opacity mt-2"
                                style={{backgroundColor: catColor, boxShadow: `0 4px 14px 0 ${catColor}66`}}
                            >
                                Add Category
                            </button>
                        </div>

                        {/* Existing Categories List (Mock) */}
                        <div>
                            <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Existing</h4>
                            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                                {[
                                    {name: 'Groceries', icon: '🛒', color: '#10b981'},
                                    {name: 'Housing', icon: '🏠', color: '#3b82f6'},
                                    {name: 'Entertainment', icon: '🎬', color: '#a855f7'},
                                    {name: 'Transport', icon: '🚗', color: '#f97316'},
                                ].map(c => (
                                    <div key={c.name}
                                         className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                                                style={{backgroundColor: `${c.color}20`}}>
                                                {c.icon}
                                            </div>
                                            <span
                                                className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</span>
                                        </div>
                                        <button
                                            className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                            <span className="material-icons-round text-sm">delete</span></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden mb-8">
                    <div className="p-6 border-b border-border-light dark:border-border-dark">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Preferences</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your display and currency
                            settings.</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-slate-900 dark:text-white">Dark Mode</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Use system preference by
                                    default</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer"/>
                                <div
                                    className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </label>
                        </div>

                        <hr className="border-slate-200 dark:border-slate-800"/>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Currency</label>
                                <select
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white">
                                    <option>USD ($)</option>
                                    <option>EUR (€)</option>
                                    <option>PLN (zł)</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Language</label>
                                <select
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white">
                                    <option>English</option>
                                    <option>Polish</option>
                                    <option>Spanish</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 flex justify-end">
                        <button
                            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm">
                            Save Preferences
                        </button>
                    </div>
                </div>

                <div
                    className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden">
                    <div className="p-6 border-b border-border-light dark:border-border-dark">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Security</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Update your password and security
                            settings.</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <button className="text-primary font-medium hover:text-blue-600 flex items-center gap-2">
                                <span className="material-icons-round text-sm">lock_reset</span>
                                Change Password
                            </button>
                        </div>
                        <div>
                            <button className="text-red-600 font-medium hover:text-red-700 flex items-center gap-2">
                                <span className="material-icons-round text-sm">no_accounts</span>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;