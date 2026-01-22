import React from 'react';
import {Link} from 'react-router-dom';

const Landing: React.FC = () => {
    return (
        <div
            className="min-h-screen text-slate-900 dark:text-white font-sans selection:bg-primary selection:text-white flex flex-col overflow-x-hidden">
            {/* Navigation */}
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-20">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-neon animate-float">
                        <span className="material-icons-round text-2xl">bolt</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight font-display drop-shadow-md">Finance<span
                        className="text-primary">Flow</span></span>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/login"
                          className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors font-display tracking-wide">
                        LOG IN
                    </Link>
                    <Link to="/register"
                          className="hidden sm:block bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-white/20 transition-all shadow-lg hover:shadow-neon hover:scale-105">
                        GET STARTED
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                className="relative pt-20 pb-16 md:pt-32 md:pb-32 flex-1 flex flex-col justify-center min-h-[85vh]">
                {/* Decorative elements */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div
                        className="inline-flex items-center gap-2 glass-freak px-4 py-1.5 mb-8 rounded-full border border-white/20 animate-[float_4s_ease-in-out_infinite]">
            <span className="relative flex h-2 w-2">
              <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
                        <span
                            className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">V2.0 Is Live</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 font-display leading-[1.1] drop-shadow-xl">
                        Money Moves <br/>
                        <span
                            className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x">For The Bold</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed font-medium mix-blend-plus-lighter">
                        Stop tracking pennies. Start building an empire. The financial dashboard that looks as good as
                        your future.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <Link to="/register"
                              className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-2xl font-bold hover:shadow-neon transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg group">
                            Start for Free
                            <span
                                className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                        <Link to="/login"
                              className="w-full sm:w-auto glass-freak border border-white/20 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-lg group">
                            <span
                                className="material-icons-round text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">play_circle</span>
                            Live Demo
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
                    <span className="material-icons-round text-white/50 text-3xl">keyboard_arrow_down</span>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 relative z-10 bg-black/10 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">Why be normal?</h2>
                        <p className="text-slate-400 text-lg">Features designed for the next generation of wealth.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Smart Tracking',
                                desc: 'Transactions categorized by AI, so you dont have to.',
                                icon: 'auto_awesome',
                                color: 'blue'
                            },
                            {
                                title: 'Neon Analytics',
                                desc: 'Charts that actually look cool. Visualize your net worth.',
                                icon: 'ssid_chart',
                                color: 'emerald'
                            },
                            {
                                title: 'Dream Manifest',
                                desc: 'Set goals and watch them fill up with satisfying animations.',
                                icon: 'rocket_launch',
                                color: 'purple'
                            },
                        ].map((feature, i) => (
                            <div key={i}
                                 className="glass-freak p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 group">
                                <div
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-600/10 text-${feature.color}-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,0,0,0.2)]`}>
                                    <span className="material-icons-round text-3xl drop-shadow-md">{feature.icon}</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 font-display text-slate-900 dark:text-white">{feature.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="py-8 relative z-10">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">© 2026 Finance Flow. Crafted
                        for the weird ones.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;