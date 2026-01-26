import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useCookies} from "react-cookie";
import {getApiUrl} from "@/config/api.ts";

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({onLogin}) => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const clearMessages = () => {
        setLoginError(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        clearMessages();
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        clearMessages();
        setLoading(true);

        const loginData = {
            email: formData.email,
            password: formData.password
        };

        try {
            const response = await fetch(getApiUrl(`/auth/login`), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData)
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
                setLoginError(data.message || "Invalid email or password");
            }
        } catch (err) {
            setLoginError("Connection error. Please try again.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
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
                    className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-md opacity-30 -z-10 animate-pulse"></div>

                <div className="text-center mb-8">
                    <div
                        className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-accent items-center justify-center text-white shadow-neon mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-500 group">
                        <span
                            className="material-icons-round text-3xl group-hover:scale-110 transition-transform">lock_open</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-display tracking-tight">Welcome
                        Back</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Enter your credentials to
                        flow.</p>
                </div>

                {/* Error Message */}
                {loginError && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm">
                        {loginError}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
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
                            className="w-full px-5 py-3.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm hover:bg-slate-200 dark:hover:bg-black/30"
                            placeholder="name@company.com"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2 ml-1">
                            <label
                                className="block text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest">Password</label>
                            <a href="#"
                               className="text-xs text-primary font-bold hover:text-accent hover:underline uppercase tracking-wide">Forgot?</a>
                        </div>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm hover:bg-slate-200 dark:hover:bg-black/30"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold hover:shadow-neon transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center tracking-wide text-lg"
                    >
                        {loading ? (
                            <span
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : 'SIGN IN'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        New here?{' '}
                        <Link to="/register"
                              className="text-slate-900 dark:text-white font-bold hover:text-primary transition-colors">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;