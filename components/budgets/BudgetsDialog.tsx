import Modal from "@/components/menu/Modal.tsx";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {getApiUrl} from "@/config/api.ts";

interface EditBudget {
    id: number;
    categoryId: number;
    limitAmount: number;
    month: string;
}

interface BudgetsDialogProps {
    isOpen: boolean,
    formattedDate?: string,
    onClose: () => void,
    onBudgetAdded?: () => void,
    editBudget?: EditBudget,
    onClick?: () => void
}

interface Category {
    id: number;
    name: string;
}

const BudgetsDialog = ({isOpen, onClose, onBudgetAdded, formattedDate, editBudget}: BudgetsDialogProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [cookies] = useCookies(['user']);

    const [categoryId, setCategoryId] = useState("");
    const [limitAmount, setLimitAmount] = useState("");
    const [month, setMonth] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`);

    const [errors, setErrors] = useState({
        categoryId: "",
        limitAmount: "",
        month: ""
    });

    const isEditMode = !!editBudget;

    const fetchCategories = async () => {
        try {
            const response = await fetch(getApiUrl(`/categories`), {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${cookies.user}`,
                },
            });

            const data = await response.json();
            setCategories(data.data || []);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const validateForm = () => {
        const newErrors = {
            categoryId: "",
            limitAmount: "",
            month: ""
        };

        if (!categoryId) {
            newErrors.categoryId = "Category is required";
        }
        if (!limitAmount) {
            newErrors.limitAmount = "Amount is required";
        }
        if (!month) {
            newErrors.month = "Date is required";
        }

        setErrors(newErrors);
        return !newErrors.categoryId && !newErrors.limitAmount && !newErrors.month;
    };

    const createBudget = async () => {
        try {
            const response = await fetch(getApiUrl(`/budgets`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.user}`,
                },
                body: JSON.stringify({
                    categoryId: parseInt(categoryId),
                    limitAmount: parseFloat(limitAmount),
                    month: month + '-01',
                }),
            });

            return await response.json();
        } catch (err) {
            console.error('Error creating budget:', err);
            return {error: true};
        }
    };

    const updateBudget = async () => {
        try {
            const response = await fetch(getApiUrl(`/budgets/${editBudget.id}`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.user}`,
                },
                body: JSON.stringify({
                    categoryId: parseInt(categoryId),
                    limitAmount: parseFloat(limitAmount),
                    month: month + '-01',
                }),
            });

            return await response.json();
        } catch (err) {
            console.error('Error updating budget:', err);
            return {error: true};
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        const response = isEditMode
            ? await updateBudget()
            : await createBudget();

        setLoading(false);

        if (response && !response.error) {
            onClose();
            resetForm();
            if (onBudgetAdded) {
                onBudgetAdded();
            }
        }
    };

    const resetForm = () => {
        setCategoryId("");
        setLimitAmount("");
        setMonth(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`);
        setErrors({
            categoryId: "",
            limitAmount: "",
            month: ""
        });
    };

    useEffect(() => {
        if (isOpen) {
            fetchCategories();

            if (editBudget) {
                const monthDate = new Date(editBudget.month);
                setCategoryId(String(editBudget.categoryId || ""));
                setLimitAmount(String(editBudget.limitAmount || ""));
                setMonth(`${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`);
            } else {
                resetForm();
            }
        }
    }, [isOpen, editBudget]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? `Edit Budget` : `New Budget for ${formattedDate || 'Current Month'}`}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                        Category
                    </label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        disabled={isEditMode}
                        className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white cursor-pointer appearance-none shadow-sm">
                        <option value="">Select...</option>
                        {categories && categories.length > 0 ? (
                            categories.map((category) => (
                                <option key={category.id} value={String(category.id)}>
                                    {category.name || `Category ${category.id}`}
                                </option>
                            ))
                        ) : (
                            <option disabled>No categories available</option>
                        )}
                    </select>
                    {errors.categoryId && (
                        <p className="text-red-500 text-sm mt-1 ml-1">{errors.categoryId}</p>
                    )}
                </div>

                <div>
                    <label
                        className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                        Amount Limit
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="0"
                            value={limitAmount}
                            onChange={(e) => setLimitAmount(e.target.value)}
                            className="w-full pl-8 pr-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 font-display text-lg font-bold shadow-sm"
                        />
                    </div>
                    {errors.limitAmount && (
                        <p className="text-red-500 text-sm mt-1 ml-1">{errors.limitAmount}</p>
                    )}
                </div>

                <div>
                    <label
                        className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                        Effective Month
                    </label>
                    <input
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm"
                    />
                    {errors.month && (
                        <p className="text-red-500 text-sm mt-1 ml-1">{errors.month}</p>
                    )}
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-neon hover:shadow-glow transition-all transform hover:scale-[1.02] tracking-wide text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? "Saving..." : isEditMode ? "Update Budget" : "Set Budget"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default BudgetsDialog;
