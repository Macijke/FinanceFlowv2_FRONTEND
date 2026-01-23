import Modal from "@/components/Modal.tsx";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {getApiUrl} from "@/config/api.ts";

type TransactionType = "INCOME" | "EXPENSE";

interface TransactionFormData {
    categoryId: string;
    amount: string;
    type: TransactionType;
    description: string;
    transactionDate: string;
}

interface TransactionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    onTransactionAdded?: () => void;
}

export function TransactionDialog({isOpen, onClose, children, onTransactionAdded }: TransactionDialogProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
    const [cookies] = useCookies(['user']);

    const [formData, setFormData] = useState<TransactionFormData>({
        categoryId: "",
        amount: "",
        type: "EXPENSE",
        description: "",
        transactionDate: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof TransactionFormData, string>>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof TransactionFormData, string>> = {};

        if (!formData.categoryId || formData.categoryId.trim().length === 0) {
            newErrors.categoryId = "Category is required";
        }

        if (!formData.amount || formData.amount.trim().length === 0) {
            newErrors.amount = "Amount is required";
        } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
            newErrors.amount = "Amount must be a valid positive number";
        }

        if (!formData.type) {
            newErrors.type = "Transaction type is required";
        }

        if (!formData.description || formData.description.trim().length === 0) {
            newErrors.description = "Description is required";
        }

        if (!formData.transactionDate) {
            newErrors.transactionDate = "Date is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof TransactionFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    };

    const handleTransactionTypeChange = (type: 'income' | 'expense') => {
        setTransactionType(type);
        setFormData(prev => ({
            ...prev,
            type: type === 'income' ? 'INCOME' : 'EXPENSE'
        }));
    };

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
            return data;
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const createTransaction = async (transactionData: TransactionFormData) => {
        try {
            const response = await fetch(getApiUrl(`/transactions`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.user}`,
                },
                body: JSON.stringify({
                    categoryId: parseInt(transactionData.categoryId),
                    amount: parseFloat(transactionData.amount),
                    type: transactionData.type,
                    description: transactionData.description,
                    transactionDate: transactionData.transactionDate,
                }),
            });

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const response = await createTransaction(formData);

        if (response && !response.error) {
            console.log('Transaction added successfully');
            setIsModalOpen(false);
            setFormData({
                categoryId: "",
                amount: "",
                type: "EXPENSE",
                description: "",
                transactionDate: "",
            });
            setTransactionType('expense');
            if (onTransactionAdded) {
                onTransactionAdded();
            }
        } else {
            console.error('Transaction failed:', response?.message);
        }
    };

    useEffect(() => {
            fetchCategories();
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add Transaction"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div
                    className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                    <button
                        type="button"
                        onClick={() => handleTransactionTypeChange('expense')}
                        className={`flex-1 py-2.5 rounded-lg font-bold shadow-sm transition-all text-sm border ${transactionType === 'expense' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700' : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white'}`}
                    >
                        Expense
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTransactionTypeChange('income')}
                        className={`flex-1 py-2.5 rounded-lg font-bold shadow-sm transition-all text-sm border ${transactionType === 'income' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700' : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white'}`}
                    >
                        Income
                    </button>
                </div>

                <div>
                    <label
                        className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Amount</label>
                    <div className="relative">
                        <span
                            className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold ${transactionType === 'income' ? 'text-success' : 'text-slate-400'}`}>$</span>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => handleInputChange('amount', e.target.value)}
                            className={`w-full pl-8 pr-4 py-3.5 bg-white dark:bg-slate-950 border ${errors.amount ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 font-display text-lg font-bold shadow-sm ${transactionType === 'income' ? 'focus:ring-success' : 'focus:ring-primary'}`}
                        />
                    </div>
                    {errors.amount && <p className="text-red-500 text-xs mt-1 ml-1">{errors.amount}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Category</label>
                        <select
                            value={formData.categoryId}
                            onChange={(e) => handleInputChange('categoryId', e.target.value)}
                            className={`w-full px-4 py-3.5 bg-white dark:bg-slate-950 border ${errors.categoryId ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white cursor-pointer appearance-none shadow-sm ${transactionType === 'income' ? 'focus:ring-success' : 'focus:ring-primary'}`}>
                            <option value="">Select...</option>
                            {categories.map((cat: any) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.categoryId && <p className="text-red-500 text-xs mt-1 ml-1">{errors.categoryId}</p>}
                    </div>
                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Date</label>
                        <input
                            type="date"
                            value={formData.transactionDate}
                            onChange={(e) => handleInputChange('transactionDate', e.target.value)}
                            className={`w-full px-4 py-3.5 bg-white dark:bg-slate-950 border ${errors.transactionDate ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white shadow-sm ${transactionType === 'income' ? 'focus:ring-success' : 'focus:ring-primary'}`}
                        />
                        {errors.transactionDate && <p className="text-red-500 text-xs mt-1 ml-1">{errors.transactionDate}</p>}
                    </div>
                </div>

                <div>
                    <label
                        className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Description</label>
                    <textarea
                        rows={3}
                        placeholder="What was this for?"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className={`w-full px-4 py-3.5 bg-white dark:bg-slate-950 border ${errors.description ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 resize-none shadow-sm ${transactionType === 'income' ? 'focus:ring-success' : 'focus:ring-primary'}`}
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs mt-1 ml-1">{errors.description}</p>}
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className={`w-full py-4 rounded-xl text-white font-bold shadow-neon hover:shadow-glow transition-all transform hover:scale-[1.02] tracking-wide text-lg ${transactionType === 'income' ? 'bg-gradient-to-r from-success to-emerald-600 shadow-green-900/20' : 'bg-gradient-to-r from-primary to-accent'}`}>
                        {transactionType === 'income' ? 'Add Income' : 'Add Expense'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
