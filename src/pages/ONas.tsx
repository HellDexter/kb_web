import { 
    Building2, 
    ShieldCheck, 
    Users, 
    Zap, 
    Target,
    Activity,
    Lock,
    ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const ONas = () => {
    const { t } = useTranslation();

    const stats = [
        { icon: ShieldCheck, value: '100%', label: t('onas.stats1'), color: 'text-cyber-neon' },
        { icon: Users, value: '24/7', label: t('onas.stats2'), color: 'text-cyber-blue' },
        { icon: Activity, value: 'NIS2', label: t('onas.stats3'), color: 'text-cyber-purple' },
        { icon: Lock, value: 'ZERO', label: t('onas.stats4'), color: 'text-brand-primary' }
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="o-nas" className="py-24 relative overflow-hidden bg-white dark:bg-cyber-dark transition-colors">
            {/* Advanced Cyber Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,163,255,0.05),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(0,163,255,0.03),transparent)]">
                <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-brand-primary/10 dark:bg-cyber-blue/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-secondary/10 dark:bg-cyber-purple/5 blur-[100px] rounded-full animate-pulse delay-700" />
                
                {/* Circuit Grid Decoration */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M 10 10 H 90 V 90 H 10 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            <circle cx="10" cy="10" r="2" fill="currentColor" />
                            <circle cx="90" cy="90" r="2" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 1. Header & Genesis */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 space-y-6"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className="h-px w-12 bg-brand-primary dark:bg-cyber-neon" />
                            <span className="text-sm font-black text-brand-primary dark:text-cyber-neon uppercase tracking-[0.4em]">
                                {t('nav.oAplikaci')}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                            {t('onas.title')}
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            {t('onas.subtitle')}
                        </p>
                        <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                            <div className="flex gap-6 items-start">
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shrink-0">
                                    <Building2 className="text-brand-primary dark:text-cyber-blue" size={32} />
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                    {t('onas.aboutText1')}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 relative group"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-brand-primary/20 to-brand-secondary/20 dark:from-cyber-blue/20 dark:to-cyber-purple/20 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                        <div className="relative glass-card p-1 rounded-[40px] border border-white/20 shadow-2xl overflow-hidden aspect-[16/10] flex items-center justify-center">
                            <img 
                                src="/img/content/jvtp-budova.jpg" 
                                alt="JVTP Budova - JCKB Sidlo" 
                                className="absolute inset-0 w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-slate-900/10 dark:bg-black/30" />
                            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg">
                                <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest text-center">
                                    Trusted Security Ecosystem
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* 2. Cyber Metrics Dashboard */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-24"
                >
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={index}
                            variants={cardVariants}
                            className="relative group p-[1px] rounded-[32px] bg-gradient-to-b from-slate-300 to-transparent dark:from-white/10 dark:to-transparent"
                        >
                            <div className="relative bg-white dark:bg-cyber-darker p-6 md:p-8 rounded-[31px] flex flex-col items-center text-center transition-all hover:translate-y-[-4px] overflow-hidden shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-brand-primary/5 transition-all">
                                <div className="absolute -top-4 -right-4 w-16 h-16 bg-brand-primary/5 dark:bg-cyber-blue/5 rounded-full blur-xl group-hover:bg-brand-primary/10 transition-colors" />
                                <stat.icon className={`w-8 h-8 mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                                <span className="text-4xl font-black text-slate-900 dark:text-white mb-2 tabular-nums">{stat.value}</span>
                                <span className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.2em] leading-tight">
                                    {stat.label}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 3. The Digital Shift & NIS2 (Story Flow) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Left Side: Challenge */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="p-8 rounded-[40px] bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-white/5 relative">
                            <div className="absolute -top-4 -left-4 p-4 rounded-2xl bg-white dark:bg-cyber-dark shadow-xl border border-slate-100 dark:border-white/10 text-brand-primary dark:text-cyber-neon">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-brand-primary dark:bg-cyber-neon rounded-full" />
                                Digital Frontier
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg italic">
                                {t('onas.aboutText2')}
                            </p>
                        </div>

                        <div className="flex gap-6 p-2">
                             <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                    <ChevronRight size={14} className="text-brand-primary dark:text-cyber-neon" />
                                    {t('onas.visionTitle')}
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 font-medium">
                                    {t('onas.visionText')}
                                </p>
                             </div>
                             <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                    <ChevronRight size={14} className="text-brand-primary dark:text-cyber-neon" />
                                    {t('onas.teamTitle')}
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 font-medium">
                                    {t('onas.teamText')}
                                </p>
                             </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Compliance & Action */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* NIS2 Master Card */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-cyber-blue/20 dark:from-cyber-blue/20 dark:to-cyber-purple/20 rounded-[40px] blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
                            <div className="relative glass-card p-10 rounded-[40px] border border-slate-200 dark:border-white/10 shadow-2xl bg-white/80 dark:bg-cyber-darker/80 backdrop-blur-xl">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-4 rounded-2xl bg-brand-primary dark:bg-cyber-blue text-white shadow-lg shadow-brand-primary/20 dark:shadow-cyber-blue/30">
                                        <ShieldCheck size={32} />
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary dark:text-cyber-neon block">Priority Compliance</span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-500 block">Status: Critical</span>
                                    </div>
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                                    NIS2 Directive Support
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                                    {t('onas.aboutText3')}
                                </p>
                                <div className="p-6 rounded-2xl bg-brand-primary/5 dark:bg-cyber-blue/10 border border-brand-primary/10 dark:border-cyber-blue/20">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Target size={18} className="text-brand-primary dark:text-cyber-neon" />
                                        <span className="text-xs font-black uppercase tracking-tight text-slate-800 dark:text-slate-200">Our Strategic Role</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                        {t('onas.aboutText4')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ONas;
