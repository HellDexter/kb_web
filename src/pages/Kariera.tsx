import { useState } from 'react';
import { BriefcaseBusiness, ChevronDown, MapPin, SearchCheck, PiggyBank, GraduationCap, ChevronRight, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import imgManazerKb from '../assets/jobs/manazer-kb.png';
import imgItSpecialistaSenior from '../assets/jobs/it-specialista-senior.png';
import imgVedouciSoc from '../assets/jobs/vedouci-soc.png';
import imgItSitar from '../assets/jobs/it-sitar.png';
import imgItM365 from '../assets/jobs/it-m365.png';

const jobImages: Record<string, string> = {
    'manazer-kb': imgManazerKb,
    'it-specialista-senior': imgItSpecialistaSenior,
    'vedouci-soc': imgVedouciSoc,
    'it-sitar': imgItSitar,
    'it-m365': imgItM365,
};

export interface Job {
    id: string;
    title: string;
    salary: string;
    tasks: string[];
    expected: string[];
    bonus?: string[];
    offer: string[];
    benefits: string[];
    location: string;
    start: string;
    contact: string;
    email: string;
}

const Kariera = () => {
    const { t } = useTranslation();
    const [openJobId, setOpenJobId] = useState<string | null>(null);

    const displayJobs = t('career.items', { returnObjects: true }) as Job[];

    const toggleJob = (id: string) => {
        setOpenJobId(openJobId === id ? null : id);
    };

    return (
        <div className="py-16 min-h-screen relative overflow-hidden">
            {/* Background decoration - Advanced Cyber Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800fa_1px,transparent_1px),linear-gradient(to_bottom,#8080800fa_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:opacity-50 -z-10" />
            <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-brand-primary/10 dark:bg-cyber-blue/15 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="absolute bottom-[10%] left-[-5%] w-[25%] h-[25%] bg-brand-secondary/10 dark:bg-cyber-neon/10 blur-[100px] rounded-full -z-10" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/5 dark:bg-cyber-blue/10 border border-brand-primary/10 dark:border-cyber-blue/20 text-brand-primary dark:text-cyber-blue text-xs font-bold uppercase tracking-wider mb-4">
                        <ShieldCheck size={14} />
                        <span>Work with the best</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white tracking-tight leading-tight">
                        {t('career.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary dark:from-cyber-blue dark:to-cyber-neon">JCKB</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                        {t('career.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {displayJobs.map((job: Job) => (
                        <div
                            key={job.id}
                            className={`group relative bg-white dark:bg-slate-900/40 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 border border-slate-300 dark:border-slate-800/60 hover:border-brand-primary/40 dark:hover:border-cyber-blue/50 hover:shadow-2xl hover:shadow-brand-primary/10 dark:hover:shadow-cyber-blue/10 hover:scale-[1.015] active:scale-[0.99]
                                ${openJobId === job.id ? 'ring-1 ring-brand-primary/20 dark:ring-cyber-blue/30 shadow-xl !scale-100' : ''}`}
                        >
                            {/* Accent Vertical Line */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-500
                                ${openJobId === job.id ? 'bg-brand-primary dark:bg-cyber-blue h-full' : 'bg-slate-300 dark:bg-slate-800 h-8 group-hover:h-full group-hover:bg-brand-secondary dark:group-hover:bg-cyber-neon'}`}
                            />

                            {/* Accordion Header */}
                            <div
                                onClick={() => toggleJob(job.id)}
                                className="pl-6 pr-5 py-4 sm:py-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 relative"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden shrink-0 transition-all duration-300 shadow-md
                                        ${openJobId === job.id
                                            ? 'scale-110 shadow-lg shadow-brand-primary/30 ring-2 ring-brand-primary/50'
                                            : 'grayscale-[30%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100'}`}>
                                        <img src={jobImages[job.id]} alt={job.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/40 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-primary dark:group-hover:text-cyber-neon transition-colors">
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-cyber-accent text-[10px] font-bold uppercase tracking-tight">
                                                <PiggyBank size={12} /> {job.salary}
                                            </div>
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-700 dark:text-cyber-blue text-[10px] font-bold uppercase tracking-tight">
                                                <MapPin size={12} /> {job.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-4 self-end md:self-center w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[9px] uppercase font-black tracking-[0.2em] text-slate-500 dark:text-slate-500">
                                            {openJobId === job.id ? 'HIDE' : 'EXPLORE'}
                                        </span>
                                        <span className="text-xs font-bold text-brand-primary dark:text-cyber-neon">
                                            {openJobId === job.id ? t('career.hideDetails') : t('career.showDetails')}
                                        </span>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 
                                        ${openJobId === job.id
                                            ? 'bg-brand-primary border-brand-primary text-white rotate-180 shadow-lg shadow-brand-primary/30'
                                            : 'border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-500 group-hover:border-brand-primary group-hover:text-brand-primary dark:group-hover:border-cyber-neon dark:group-hover:text-cyber-neon'}`}>
                                        <ChevronDown size={16} />
                                    </div>
                                </div>
                            </div>

                            {/* Accordion Body */}
                            <div
                                className={`overflow-hidden transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${openJobId === job.id ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-6 pb-8 pt-0 relative">
                                    {/* Image Banner */}
                                    <div className="w-full h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden mb-8 relative group/banner border border-slate-200 dark:border-slate-800 shadow-inner">
                                        <img src={jobImages[job.id]} alt={job.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover/banner:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold shadow-xl">
                                                <BriefcaseBusiness size={16} className="text-brand-primary dark:text-cyber-neon" />
                                                <span>{job.title}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-gradient-to-r from-brand-primary/30 via-slate-200 dark:via-slate-800 to-transparent mb-8" />

                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                        {/* Levý blok - Description & Tasks */}
                                        <div className="lg:col-span-7 space-y-10">
                                            <div className="relative">
                                                <div className="absolute -left-6 top-1 bottom-1 w-[2px] bg-brand-primary/20 dark:bg-cyber-blue/20" />
                                                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-5 flex items-center gap-3 uppercase tracking-tight">
                                                    <span className="w-8 h-px bg-brand-primary dark:bg-cyber-blue" />
                                                    {t('career.tasks')}
                                                </h4>
                                                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                                    {job.tasks.map((t, i) => (
                                                        <li key={i} className="group/item flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50">
                                                            <div className="w-6 h-6 rounded bg-brand-primary/10 dark:bg-cyber-blue/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-brand-primary group-hover/item:text-white transition-all">
                                                                <SearchCheck size={14} />
                                                            </div>
                                                            <span className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{t}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="relative">
                                                <div className="absolute -left-6 top-1 bottom-1 w-[2px] bg-brand-secondary/20 dark:bg-cyber-neon/20" />
                                                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-5 flex items-center gap-3 uppercase tracking-tight">
                                                    <span className="w-8 h-px bg-brand-secondary dark:bg-cyber-neon" />
                                                    {t('career.expected')}
                                                </h4>
                                                <ul className="grid grid-cols-1 gap-3">
                                                    {job.expected.map((e, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-secondary dark:bg-cyber-neon shrink-0 shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
                                                            <span className="leading-relaxed">{e}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Pravý blok - Bonus & Offer */}
                                        <div className="lg:col-span-5 space-y-10">
                                            {(job.bonus && job.bonus.length > 0) && (
                                                <div className="p-6 rounded-xl bg-slate-900 dark:bg-black/40 border border-slate-800 shadow-inner relative overflow-hidden group/bonus">
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/10 blur-[40px] rounded-full -mr-16 -mt-16 group-hover/bonus:bg-brand-secondary/20 transition-all duration-700" />
                                                    <h4 className="font-black text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                                                        <GraduationCap size={16} className="text-brand-secondary dark:text-cyber-neon" />
                                                        {t('career.bonus')}
                                                    </h4>
                                                    <ul className="space-y-2 text-slate-400 text-sm">
                                                        {job.bonus.map((b, i) => (
                                                            <li key={i} className="flex items-start gap-2">
                                                                <span className="text-brand-secondary dark:text-cyber-neon mt-0.5">•</span>
                                                                <span>{b}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            <div>
                                                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-5 flex items-center gap-3 uppercase tracking-tight">
                                                    <span className="w-8 h-px bg-emerald-500 dark:bg-cyber-accent" />
                                                    {t('career.offer')}
                                                </h4>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {job.offer.map((o, i) => (
                                                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 hover:border-emerald-200 dark:hover:border-emerald-500/30 transition-all">
                                                            <div className="p-1.5 rounded-md bg-white dark:bg-slate-900 shadow-sm text-emerald-600 dark:text-cyber-accent">
                                                                <ShieldCheck size={14} />
                                                            </div>
                                                            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{o}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-500 mb-4 uppercase tracking-[0.2em]">Benefit Package</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {job.benefits.map((b, i) => (
                                                        <span key={i} className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-100 rounded-md text-[10px] font-black uppercase tracking-wider hover:border-brand-primary dark:hover:border-cyber-blue transition-colors cursor-default">
                                                            {b}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Box - CTA */}
                                    <div className="mt-12 p-8 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-black border border-slate-700/50 flex flex-col lg:flex-row justify-between items-center gap-8 relative overflow-hidden group/cta">
                                        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
                                        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-brand-primary/20 blur-[80px] rounded-full pointer-events-none group-hover/cta:bg-brand-primary/30 transition-all duration-700" />

                                        <div className="relative z-10 text-center lg:text-left">
                                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                                <div className="p-4 rounded-full bg-white/5 border border-white/10 text-brand-secondary dark:text-cyber-neon">
                                                    <Phone size={28} />
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">Hiring Manager</p>
                                                    <h5 className="text-xl font-bold text-white mb-2">{job.contact}</h5>
                                                    <p className="text-slate-300 text-sm flex items-center justify-center lg:justify-start gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                        Ready to start: <span className="text-white font-bold">{job.start.replace(':', '')}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                                            <a
                                                href={`mailto:${job.email}?subject=${t('career.emailSubject')} ${job.title}`}
                                                className="group/btn px-8 py-5 bg-white dark:bg-cyber-blue text-slate-900 dark:text-white font-black rounded-lg transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-105 active:scale-95"
                                            >
                                                <Mail size={20} className="group-hover/btn:animate-bounce" />
                                                <span className="uppercase tracking-widest text-sm">{t('career.sendCV')}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-10 rounded-2xl">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Nenašli jste vhodnou pozici?</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                        I tak nám napište! Neustále hledáme talentované nadšence do kyberbezpečnosti a moderních technologií.
                    </p>
                    <a href="mailto:info@jckb.cz" className="text-brand-primary dark:text-cyber-blue font-bold px-6 py-3 border-2 border-brand-primary/20 dark:border-cyber-blue/20 rounded-lg hover:bg-brand-primary/5 dark:hover:bg-cyber-blue/5 transition-all inline-flex items-center gap-2 group">
                        Napište nám na info@jckb.cz
                        <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Kariera;
