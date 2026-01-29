import Modal from "@/components/menu/Modal.tsx";
import {useState} from "react";
import {useCookies} from "react-cookie";
import {z} from "zod";
import {getApiUrl} from "@/config/api.ts";
import {useNotification} from "@/context/NotificationContext.tsx";

const contributeSchema = z.object({
    amount: z
        .string()
        .min(1, "Amount is required")
        .refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Please enter a valid positive amount"),
    note: z.string().optional(),
});

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onContribution: () => void;
    goalInfo?: {
        id: number;
        name: string;
    };
}

const ContributeSavingsGoalDialog = ({isOpen, onClose, onContribution, goalInfo}: IProps) => {
    const [cookies] = useCookies(['user']);
    const {showNotification} = useNotification();
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ amount?: string; note?: string }>({});

    const resetForm = () => {
        setAmount("");
        setNote("");
        setErrors({});
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const validateForm = () => {
        try {
            contributeSchema.parse({ amount, note });
            setErrors({});
            return true;
        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors: { amount?: string; note?: string } = {};
                err.issues.forEach((error) => {
                    const field = error.path[0] as "amount" | "note";
                    fieldErrors[field] = error.message;
                });
                setErrors(fieldErrors);
            }
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!goalInfo?.id) {
            showNotification("Goal information is missing", 'Unable to contribute without goal information.', 'error');
            return;
        }

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(getApiUrl(`/savings-goals/${goalInfo.id}/contribute`), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies.user}`,
                },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    note: note || null,
                }),
            });

            const resJson = await response.json();

            if (response.ok && !resJson.error) {
                showNotification(`Contribution succeed!`,`✅ Successfully added $${amount} to "${goalInfo.name}"!`);
                resetForm();
                onClose();
                onContribution();
            } else {
                showNotification('Contribution failed',`${resJson?.message || "Could not contribute to the goal. Please try again."}`, 'error');
            }
        } catch (err) {
            console.error(err);
            showNotification('Network Error',"An error occurred while trying to contribute. Please try again later.", 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={handleClose}
                title="Add Contribution"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center py-2">
                        <p className="text-slate-500 dark:text-slate-400 mb-2">You are getting closer!</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {goalInfo?.name || "Your Goal"}
                        </h3>
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                            Deposit Amount
                        </label>
                        <div className="relative">
                            <span
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-success font-bold text-xl">$</span>
                            <input
                                type="number"
                                placeholder="0.00"
                                step="0.01"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className={`w-full pl-8 pr-4 py-5 bg-white dark:bg-slate-950 border ${
                                    errors.amount ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                                } rounded-xl focus:ring-2 focus:ring-success focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 font-display text-3xl font-bold shadow-sm text-center`}
                                autoFocus
                                disabled={loading}
                            />
                        </div>
                        {errors.amount && (
                            <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.amount}</p>
                        )}
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                            Note (Optional)
                        </label>
                        <input
                            type="text"
                            placeholder="Monthly savings..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-success focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 shadow-sm"
                            disabled={loading}
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-success to-emerald-600 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-all transform hover:scale-[1.02] tracking-wide text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                            <span className="material-icons-round">payments</span>
                            {loading ? "Processing..." : "Deposit Funds"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default ContributeSavingsGoalDialog;
