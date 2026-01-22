import React, {useEffect, useState} from 'react';
import {HashRouter, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import SavingsGoals from './pages/SavingsGoals';
import Budgets from './pages/Budgets';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Protected Layout Wrapper
const ProtectedLayout: React.FC<{ children: React.ReactNode; onLogout: () => void }> = ({children, onLogout}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Overview';
            case '/transactions':
                return 'Transactions';
            case '/savings':
                return 'Savings Goals';
            case '/budgets':
                return 'Budgets';
            case '/analytics':
                return 'Analytics';
            case '/settings':
                return 'Settings';
            default:
                return 'Finance Flow';
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                currentPath={location.pathname}
                onLogout={onLogout}
            />

            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <Header
                    title={getPageTitle()}
                    onMenuClick={() => setSidebarOpen(true)}
                />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth no-scrollbar">
                    <div className="max-w-7xl mx-auto space-y-8 pb-12">
                        {children}
                    </div>
                    <footer className="mt-12 text-center text-slate-500/60 text-sm py-4">
                        <p>© 2026 Finance Flow. Stay Freaky.</p>
                    </footer>
                </main>

                {/* Mobile sidebar overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 z-20 md:hidden backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('authToken') === 'true';
    });

    useEffect(() => {
        // Default to dark mode for the freaky vibe if not set
        if (!('theme' in localStorage)) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else if (localStorage.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const handleLogin = () => {
        localStorage.setItem('authToken', 'true');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    return (
        <HashRouter>
            <Routes>
                {/* Public Routes */}
                {!isAuthenticated ? (
                    <>
                        <Route path="/welcome" element={<Landing/>}/>
                        <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
                        <Route path="/register" element={<Register onLogin={handleLogin}/>}/>
                        <Route path="*" element={<Navigate to="/welcome" replace/>}/>
                    </>
                ) : (
                    /* Protected Routes */
                    <>
                        <Route path="/" element={
                            <ProtectedLayout onLogout={handleLogout}>
                                <Dashboard/>
                            </ProtectedLayout>
                        }/>
                        <Route path="/transactions" element={
                            <ProtectedLayout onLogout={handleLogout}>
                                <Transactions/>
                            </ProtectedLayout>
                        }/>
                        <Route path="/budgets" element={
                            <ProtectedLayout onLogout={handleLogout}>
                                <Budgets/>
                            </ProtectedLayout>
                        }/>
                        <Route path="/analytics" element={
                            <ProtectedLayout onLogout={handleLogout}>
                                <Analytics/>
                            </ProtectedLayout>
                        }/>
                        <Route path="/savings" element={
                            <ProtectedLayout onLogout={handleLogout}>
                                <SavingsGoals/>
                            </ProtectedLayout>
                        }/>
                        <Route path="/settings" element={
                            <ProtectedLayout onLogout={handleLogout}>
                                <Settings/>
                            </ProtectedLayout>
                        }/>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </>
                )}
            </Routes>
        </HashRouter>
    );
};

export default App;