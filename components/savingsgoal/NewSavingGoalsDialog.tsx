import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "@/components/menu/Modal.tsx";
import { getApiUrl } from "@/config/api.ts";

interface EditGoal {
    id?: number;
    name?: string;
    description?: string;
    targetAmount?: number | string;
    targetDate?: string | Date;
    icon?: string;
    color?: string;
}

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onGoalAdded?: () => void;
    editGoal?: EditGoal | null;
}

const NewSavingGoalsDialog = ({ isOpen, onClose, onGoalAdded, editGoal }: IProps) => {
    const [cookies] = useCookies(['user']);
    const isEditMode = !!editGoal;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState("🎯");
    const [selectedColor, setSelectedColor] = useState("#3b82f6");

    const presetColors = [
        "#3b82f6", // Blue
        "#10b981", // Green
        "#f59e0b", // Yellow
        "#ef4444", // Red
        "#8b5cf6", // Purple
        "#f97316", // Orange
        "#ec4899", // Pink
        "#14b8a6"  // Teal
    ];

    useEffect(() => {
        if (isOpen) {
            if (editGoal) {
                let dateStr = "";
                if (editGoal.targetDate) {
                    const d = new Date(editGoal.targetDate);
                    if (!isNaN(d.getTime())) {
                        dateStr = d.toISOString().split('T')[0];
                    }
                }

                setName(editGoal.name || "");
                setDescription(editGoal.description || "");
                setTargetAmount(editGoal.targetAmount ? String(editGoal.targetAmount) : "");
                setTargetDate(dateStr);
                setSelectedEmoji(editGoal.icon || "🎯");
                setSelectedColor(editGoal.color || "#3b82f6");

            } else {
                resetForm();
            }
        }
    }, [isOpen, editGoal]);

    const resetForm = () => {
        setName("");
        setDescription("");
        setTargetAmount("");
        setTargetDate("");
        setSelectedEmoji("🎯");
        setSelectedColor("#3b82f6");
    };

    const getPayload = () => ({
        name,
        description,
        targetAmount,
        targetDate: targetDate || null,
        icon: selectedEmoji,
        color: selectedColor,
    });

    const createGoal = async () => {
        try {
            const response = await fetch(getApiUrl(`/savings-goals`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.user}`,
                },
                body: JSON.stringify(getPayload()),
            });
            return await response.json();
        } catch (err) {
            console.error('Error:', err);
            return { error: true, message: "Network error" };
        }
    }

    const updateGoal = async () => {
        if (!editGoal?.id) return;
        try {
            const response = await fetch(getApiUrl(`/savings-goals/${editGoal.id}`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.user}`,
                },
                body: JSON.stringify(getPayload()),
            });
            return await response.json();
        } catch (err) {
            console.error('Error:', err);
            return { error: true, message: "Network error" };
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !targetAmount || !description) {
            alert("Please fill in all required fields (Name, Amount, Description).");
            return;
        }

        const response = isEditMode ? await updateGoal() : await createGoal();

        if (response && !response.error) {
            onClose();
            resetForm();
            if (onGoalAdded) {
                onGoalAdded();
            }
        } else {
            alert(response?.message || "Error occurred. Please try again.");
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={isEditMode ? "Edit Goal" : "Manifest a New Dream"}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex gap-6">
                        {/* Emoji Picker Input */}
                        <div className="flex-shrink-0">
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">Icon</label>
                            <div className="relative w-20 h-20 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-4xl shadow-sm overflow-hidden group">
                                <span className="pointer-events-none group-focus-within:opacity-50 transition-opacity">{selectedEmoji}</span>
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
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Goal Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Tesla Model 3"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Target Amount</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01"
                                        value={targetAmount}
                                        onChange={(e) => setTargetAmount(e.target.value)}
                                        required
                                        className="w-full pl-8 pr-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 font-display text-lg font-bold shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Description</label>
                        <input
                            type="text"
                            placeholder="Why do you want this?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Deadline</label>
                        <input
                            type="date"
                            value={targetDate}
                            onChange={(e) => setTargetDate(e.target.value)}
                            className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm"
                        />
                    </div>

                    {/* Custom Color Picker */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">Theme Color</label>
                        <div className="flex flex-wrap gap-3 items-center">
                            {presetColors.map((color) => (
                                <div
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-10 h-10 rounded-full cursor-pointer transition-all transform hover:scale-110 shadow-sm ${selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : ''}`}
                                    style={{ backgroundColor: color }}
                                ></div>
                            ))}

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
                            type="submit"
                            className="w-full py-4 rounded-xl text-white font-bold shadow-neon hover:shadow-glow transition-all transform hover:scale-[1.02] tracking-wide text-lg"
                            style={{ background: selectedColor, boxShadow: `0 0 20px -5px ${selectedColor}80` }}
                        >
                            {isEditMode ? "Update Goal" : "Launch Goal"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default NewSavingGoalsDialog;
