import { Shield, ChevronRight, ChevronLeft, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useTheme } from '../useTheme';
import type { Job } from './Kariera';

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [lastWheelTime, setLastWheelTime] = useState(0);
    const { theme } = useTheme();
    const { t } = useTranslation();
    const jobs = t('career.items', { returnObjects: true }) as Job[];

    // Auto-advance carousel
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % jobs.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [jobs.length, isPaused]);

    const handleWheel = (e: React.WheelEvent) => {
        const now = Date.now();
        if (now - lastWheelTime < 500) return; // Throttling (0.5s)

        if (Math.abs(e.deltaY) > 20) {
            setIsPaused(true);
            setLastWheelTime(now);
            if (e.deltaY > 0) {
                setActiveIndex((current) => (current + 1) % jobs.length);
            } else {
                setActiveIndex((current) => (current - 1 + jobs.length) % jobs.length);
            }
        }
    };

    // Helper to calculate 3D positioning
    const calculatePosition = (index: number) => {
        const total = jobs.length;
        let offset = index - activeIndex;

        // Ensure negative/positive wrap correctly for infinite visual loop
        if (offset > Math.floor(total / 2)) offset -= total;
        if (offset < -Math.floor(total / 2)) offset += total;

        const absOffset = Math.abs(offset);
        const zIndex = 10 - absOffset;
        let scale = 1 - absOffset * 0.15;
        const x = offset * 250; // pixel distance
        let opacity = 1 - absOffset * 0.4;
        const rotateY = -offset * 12;

        // Hide items that are too far away
        if (absOffset > 2) {
            opacity = 0;
            scale = 0.5;
        }

        return { x, scale, zIndex, opacity, rotateY, isCenter: offset === 0 };
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative z-0 min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
                {/* Wallpaper background */}
                <div className="absolute inset-0 -z-10">
                    <img 
                        src="/img/brand/jckbherozone.webp" 
                        alt="" 
                        className="w-full h-full object-cover opacity-80 dark:opacity-75"
                    />
                    {/* Overlay VRSTVA pro čitelnost textu */}
                    <div className="absolute inset-0 bg-white/30 dark:bg-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-white dark:from-cyber-darker dark:via-transparent dark:to-cyber-darker" />
                </div>

                {/* Abstract background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 dark:bg-brand-primary/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 dark:bg-cyber-neon/20 blur-[120px] rounded-full" />
                    <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-brand-primary/5 dark:bg-brand-primary/10 blur-[80px] rounded-full" />
                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>

                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="flex justify-center mb-8">
                            <motion.img
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                src={theme === 'dark' ? "/img/brand/jckb-logo-bila.png" : "/img/brand/logo-color.png"}
                                alt="JCKB Logo"
                                className="h-20 md:h-32 w-auto object-contain drop-shadow-2xl"
                            />
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900/50 border border-blue-200 dark:border-cyber-neon/30 text-blue-700 dark:text-cyber-neon text-sm font-semibold mb-6 shadow-sm">
                            <Shield size={16} />
                            <span>{t('hero.shield')}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-white">
                            {t('hero.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary dark:from-cyber-blue dark:to-cyber-neon drop-shadow-sm">{t('hero.title2')}</span> {t('hero.title3')}
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                            {t('hero.subtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="#aktuality" className="px-8 py-4 rounded-lg bg-brand-primary dark:bg-cyber-blue hover:bg-blue-800 dark:hover:bg-blue-600 text-white font-bold transition-all shadow-md dark:shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2 group">
                                {t('hero.buttonNews')}
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="#kontakt" className="px-8 py-4 rounded-lg bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-white font-bold transition-all border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-sm">
                                {t('hero.buttonContact')}
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Dynamická animovaná šipka pro scroll dolů */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group"
                    onClick={() => {
                        const target = document.getElementById('aktuality');
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    <span className="text-slate-500 dark:text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-2 group-hover:text-brand-primary dark:group-hover:text-cyber-neon transition-colors">
                        Pokračovat
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        <ChevronDown className="text-slate-500 dark:text-white/60 w-8 h-8 drop-shadow-md group-hover:text-brand-primary dark:group-hover:text-cyber-neon transition-colors" />
                    </motion.div>
                </motion.div>
            </section>

            {/* CTA Section - Jobs 3D Carousel */}
            <section className="py-16 relative overflow-hidden bg-slate-100/50 dark:bg-slate-900/20 perspective-[1000px]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-secondary/5 dark:to-cyber-blue/10 pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">{t('jobs.title')}</h2>
                    <p className="text-xl text-slate-700 dark:text-slate-300">{t('jobs.subtitle')}</p>
                </div>

                {/* 3D Carousel Container Wrapper */}
                <div className="relative max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
                    {/* Left Navigation Arrow */}
                    <button
                        onClick={() => {
                            setActiveIndex((curr) => (curr - 1 + jobs.length) % jobs.length);
                            setIsPaused(true); // Pro jistotu pozastavit při kliku
                        }}
                        className="hidden md:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-xl text-slate-500 dark:text-slate-500 hover:text-brand-primary dark:hover:text-cyber-neon hover:scale-110 transition-all border border-slate-300 dark:border-slate-700"
                        aria-label="Previous position"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    {/* 3D Carousel Container */}
                    <div
                        className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center px-4 py-4"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onWheel={handleWheel}
                    >
                        {jobs.map((job: Job, idx: number) => {
                            const { x, scale, zIndex, opacity, rotateY, isCenter } = calculatePosition(idx);

                            return (
                                <motion.div
                                    key={job.id}
                                    animate={{ x, scale, zIndex, opacity, rotateY }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
                                    className={`absolute w-[320px] md:w-[380px] h-[320px] md:h-[350px] flex-shrink-0 cursor-pointer group pointer-events-auto
                                        ${isCenter ? 'z-50' : 'z-0'}`}
                                    style={{ transformStyle: 'preserve-3d' }}
                                    onClick={(e) => {
                                        if (isCenter) {
                                            window.location.href = '#kariera';
                                        } else {
                                            e.preventDefault();
                                            setActiveIndex(idx);
                                        }
                                    }}
                                >
                                    {/* Expanding Interactive Container */}
                                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-2xl overflow-hidden shadow-xl
                                        ${isCenter ? 'group-hover:w-[360px] md:group-hover:w-[460px] group-hover:h-[480px] md:group-hover:h-[550px] group-hover:shadow-[0_0_40px_rgba(30,58,138,0.2)] dark:group-hover:shadow-[0_0_40px_rgba(56,189,248,0.2)]' : ''}`}>

                                        {/* Background Revealed Layer (Specs) */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-blue-900 dark:from-slate-800 dark:to-[#080d19] p-6 pt-8 pb-0 text-white flex flex-col justify-start border border-brand-primary/20 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                                            <div className="text-cyber-neon font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2 shrink-0">
                                                <Shield size={16} /> {t('jobs.expectations')}
                                            </div>

                                            {/* Scrollable Content Area */}
                                            <div className="flex-1 overflow-y-auto pr-2 pb-6 space-y-3 
                                                [&::-webkit-scrollbar]:w-1.5 
                                                [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-track]:rounded-full
                                                [&::-webkit-scrollbar-thumb]:bg-white/30 hover:[&::-webkit-scrollbar-thumb]:bg-white/50 
                                                [&::-webkit-scrollbar-thumb]:rounded-full transition-colors"
                                            >
                                                {(job.expected || []).map((req, i) => (
                                                    <div key={i} className="text-sm text-slate-100 flex items-start gap-3">
                                                        <ChevronRight size={14} className="mt-0.5 shrink-0 text-cyber-neon" />
                                                        <span className="leading-relaxed">{req}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Fixed Footer with Salary */}
                                            <div className="h-[6rem] shrink-0 border-t border-white/10 mt-4 flex justify-start items-center relative z-10 bg-gradient-to-t from-[#080d19]/80 to-transparent">
                                                <span className="text-sm font-semibold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm border border-white/10 uppercase tracking-widest text-cyber-neon">
                                                    {job.salary}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Sliding Foreground Layer */}
                                        <div className={`absolute inset-0 bg-white dark:bg-slate-800 flex flex-col p-6 border transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] w-full h-full z-10
                                            ${isCenter ? 'group-hover:translate-y-[calc(100%-6.5rem)] border-slate-300 dark:border-slate-700 shadow-lg shadow-brand-primary/5' : 'border-slate-200 dark:border-slate-700/50'}`}>

                                            {/* Top Header - Stays visible as footer when slid down */}
                                            <div className="flex items-start justify-between min-h-[4rem] z-20 shrink-0 bg-white dark:bg-slate-800">
                                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white line-clamp-2 pr-4 transition-colors group-hover:text-brand-primary dark:group-hover:text-cyber-neon">{job.title}</h3>
                                                <span className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white dark:group-hover:text-white dark:group-hover:bg-cyber-blue text-brand-primary dark:text-cyber-blue transition-colors shadow-sm">
                                                    <ChevronRight size={20} className="group-hover:rotate-90 transition-transform" />
                                                </span>
                                            </div>

                                            {/* Body (Photo) - Hides when scrolled down */}
                                            <div className="flex-1 flex flex-col pb-0 transition-opacity duration-300 group-hover:opacity-0 w-full h-full relative mt-4 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/50">
                                                <img src={`/img/jobs/${job.id}.png`} alt={job.title} className="absolute inset-0 w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                                                <div className="absolute bottom-0 inset-x-0 p-4 flex justify-end">
                                                    <div className="font-semibold tracking-wide flex items-center gap-1.5 text-xs text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/10">
                                                        <MapPin size={14} /> {job.location}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right Navigation Arrow */}
                    <button
                        onClick={() => {
                            setActiveIndex((curr) => (curr + 1) % jobs.length);
                            setIsPaused(true);
                        }}
                        className="hidden md:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-xl dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] text-slate-500 dark:text-slate-500 hover:text-brand-primary dark:hover:text-cyber-neon hover:scale-110 transition-all border border-slate-300 dark:border-slate-700"
                        aria-label="Next position"
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center flex-wrap gap-3 mt-4 relative z-10">
                    {jobs.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveIndex(idx);
                            }}
                            className={`w-3 h-3 rounded-full transition-all ${idx === activeIndex
                                ? 'bg-brand-primary dark:bg-cyber-neon w-8'
                                : 'bg-slate-400 dark:bg-slate-600 hover:bg-slate-500'
                                }`}
                            aria-label={`${t('jobs.ariaGoToJob')} ${idx + 1}`}
                        />
                    ))}
                </div>

                <div className="mt-6 text-center relative z-10">
                    <a href="#kariera" className="inline-block px-8 py-3 rounded-lg bg-transparent text-slate-600 dark:text-slate-400 font-semibold hover:text-brand-primary dark:hover:text-white transition-all underline decoration-brand-secondary/30 dark:decoration-cyber-blue/30 underline-offset-4 pointer-events-auto">
                        {t('jobs.allJobsBtn')}
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;
