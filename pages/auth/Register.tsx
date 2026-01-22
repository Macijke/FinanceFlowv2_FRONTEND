import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

interface RegisterProps {
    onLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({onLogin}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            onLogin();
            navigate('/');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-y-auto">
            {/* Back Button */}
            <Link to="/welcome"
                  className="absolute top-8 left-8 p-3 glass-freak rounded-full text-slate-800 dark:text-white hover:bg-white/20 transition-all z-20 group">
                <span className="material-icons-round group-hover:-translate-x-1 transition-transform">arrow_back</span>
            </Link>

            <div
                className="w-full max-w-md glass-freak rounded-3xl shadow-2xl border border-white/10 p-8 relative z-10 animate-float my-12">
                {/* Glow effect behind card */}
                <div
                    className="absolute -inset-1 bg-gradient-to-r from-secondary to-orange-500 rounded-3xl blur-md opacity-30 -z-10 animate-pulse"></div>

                <div className="text-center mb-8">
                    <div
                        className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-tr from-secondary to-orange-500 items-center justify-center text-white shadow-glow-pink mb-6 transform -rotate-3 hover:-rotate-6 transition-transform duration-500 group">
                        <span
                            className="material-icons-round text-3xl group-hover:scale-110 transition-transform">rocket_launch</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-display tracking-tight">Join
                        the Flow</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Start your journey to financial
                        freedom.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">Full
                            Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-5 py-3.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm hover:bg-slate-200 dark:hover:bg-black/30"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">Email
                            Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-5 py-3.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm hover:bg-slate-200 dark:hover:bg-black/30"
                            placeholder="name@company.com"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-5 py-3.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm hover:bg-slate-200 dark:hover:bg-black/30"
                            placeholder="Create a strong password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-secondary to-orange-500 text-white py-4 rounded-xl font-bold hover:shadow-glow-pink transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center tracking-wide text-lg"
                    >
                        {loading ? (
                            <span
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : 'CREATE ACCOUNT'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Already have an account?{' '}
                        <Link to="/login"
                              className="text-slate-900 dark:text-white font-bold hover:text-secondary transition-colors">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;