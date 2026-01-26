import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useCookies} from "react-cookie";
import {getApiUrl} from "@/config/api.ts";

interface RegisterProps {
    onLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({onLogin}) => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const clearMessages = () => {
        setRegisterError(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        clearMessages();
    };

    const validateForm = (): boolean => {
        if (!formData.firstName.trim()) {
            setRegisterError("First name is required");
            return false;
        }

        if (!formData.lastName.trim()) {
            setRegisterError("Last name is required");
            return false;
        }

        if (!formData.email.trim()) {
            setRegisterError("Email is required");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setRegisterError("Please enter a valid email address");
            return false;
        }

        if (formData.password.length < 8) {
            setRegisterError("Password must be at least 8 characters long");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setRegisterError("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearMessages();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        const registerData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await fetch(getApiUrl(`/auth/register`), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setCookie("user", data.data.token, {
                    path: '/',
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                });
                onLogin();
                navigate("/dashboard");
            } else {
                setRegisterError(data.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            setRegisterError("Connection error. Please try again.");
            console.error("Registration error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-y-auto">
            <Link to="/welcome"
                  className="absolute top-8 left-8 p-3 glass-freak rounded-full text-slate-800 dark:text-white hover:bg-white/20 transition-all z-20 group">
                <span className="material-icons-round group-hover:-translate-x-1 transition-transform">arrow_back</span>
            </Link>

            <div
                className="w-full max-w-md glass-freak rounded-3xl shadow-2xl border border-white/10 p-8 relative z-10 animate-float my-12">
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

                {registerError && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm">
                        {registerError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                className="block text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">First
                                Name</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm hover:bg-slate-200 dark:hover:bg-black/30"
                                placeholder="John"
                            />
                        </div>
                        <div>
                            <label
                                className="block text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">Last
                                Name</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm hover:bg-slate-200 dark:hover:bg-black/30"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">Email
                            Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm hover:bg-slate-200 dark:hover:bg-black/30"
                            placeholder="name@company.com"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm hover:bg-slate-200 dark:hover:bg-black/30"
                            placeholder="Create a strong password"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">Confirm
                            Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm hover:bg-slate-200 dark:hover:bg-black/30"
                            placeholder="Re-enter your password"
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