import { useState } from 'react';
import { MapPin, Mail, Phone, Eye, EyeOff, ShieldCheck, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Kontakt = () => {
    const { t } = useTranslation();
    const [isRevealed, setIsRevealed] = useState(false);

    // Obfuscated contact parts
    const contacts = {
        info: ['info', 'jckb.cz'],
        sekretariat: ['info', 'jckb.cz'], // Obě směřují na info@jckb.cz dle požadavku
        phone: ['+420', '383', '579', '151'] // Aktualizované číslo dle translation.json
    };

    const getEmail = (parts: string[]) => `${parts[0]}@${parts[1]}`;
    const getPhone = (parts: string[]) => parts.join(' ');

    return (
        <div className="py-24 min-h-screen relative overflow-hidden bg-white dark:bg-cyber-darker transition-colors" id="kontakt">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 dark:bg-cyber-blue/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-secondary/5 dark:bg-cyber-purple/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-black text-brand-primary dark:text-cyber-neon uppercase tracking-[0.3em] mb-4">
                        {t('nav.kontakt')}
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                        {t('contact.title')}
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Information Column */}
                    <div className="space-y-8">
                        {/* Address Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-2 h-full bg-brand-primary dark:bg-cyber-blue opacity-50" />
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider">{t('footer.addressTitle')}</h3>
                            
                            <div className="flex items-start gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 transition-all group-hover:bg-white dark:group-hover:bg-slate-800/80">
                                <div className="p-4 rounded-xl bg-brand-primary/10 dark:bg-cyber-blue/20 text-brand-primary dark:text-cyber-blue">
                                    <MapPin size={28} />
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <strong className="block text-xl font-bold text-slate-900 dark:text-white">{t('footer.company')}</strong>
                                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-snug">
                                            {t('footer.addressLine1')}<br />
                                            {t('footer.addressLine2')}
                                        </p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 block mb-1">{t('contact.idLabel')}</span>
                                            <span className="text-slate-900 dark:text-white font-mono font-bold">{t('legal.mandatory.idValue')}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 block mb-1">{t('contact.taxIdLabel')}</span>
                                            <span className="text-slate-900 dark:text-white font-mono font-bold">{t('legal.mandatory.taxIdValue')}</span>
                                        </div>
                                        <div className="col-span-1 sm:col-span-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 block mb-1">{t('contact.dataBoxLabel')}</span>
                                            <span className="text-slate-900 dark:text-white font-mono bg-brand-primary/10 dark:bg-cyber-blue/5 px-3 py-1 rounded-lg border border-brand-primary/20 dark:border-cyber-blue/10">{t('legal.mandatory.dataBoxValue')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Obfuscated Contact Selection */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl relative"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-3">
                                    <Mail className="text-brand-primary dark:text-cyber-neon" size={24} /> 
                                    {t('nav.kontakt')}
                                </h3>
                                {!isRevealed && (
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-brand-primary/10 dark:bg-cyber-blue/10 text-brand-primary dark:text-cyber-neon border border-brand-primary/30 animate-pulse">
                                        Protected by AI
                                    </span>
                                )}
                            </div>

                            <div className="space-y-8 relative">
                                {/* The Revelation Button Layer */}
                                {!isRevealed && (
                                    <div className="absolute inset-x-[-10px] inset-y-[-10px] z-20 backdrop-blur-[6px] bg-white/10 dark:bg-slate-900/20 rounded-2xl flex items-center justify-center group/reveal cursor-pointer transition-all duration-500"
                                         onClick={() => setIsRevealed(true)}>
                                        <div className="bg-slate-900 dark:bg-cyber-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl scale-100 group-hover/reveal:scale-105 transition-transform duration-300 border border-white/10">
                                            <Eye size={20} />
                                            {t('contact.showContacts') || 'Odhalit kontakty'}
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="group/item">
                                        <strong className="block text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 mb-2 group-hover/item:text-brand-primary dark:group-hover/item:text-cyber-neon transition-colors">
                                            {t('contact.generalInquiries')}
                                        </strong>
                                        <a href={isRevealed ? `mailto:${getEmail(contacts.info)}` : '#'} 
                                           className="text-xl font-bold text-slate-900 dark:text-white hover:text-brand-primary dark:hover:text-cyber-neon transition-all underline decoration-brand-primary/30 underline-offset-8">
                                            {isRevealed ? getEmail(contacts.info) : '••••••••@••••••'}
                                        </a>
                                    </div>

                                    <div className="group/item">
                                        <strong className="block text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 mb-2 group-hover/item:text-brand-primary dark:group-hover/item:text-cyber-neon transition-colors">
                                            {t('contact.recruitment')}
                                        </strong>
                                        <a href={isRevealed ? `mailto:${getEmail(contacts.sekretariat)}` : '#'} 
                                           className="text-xl font-bold text-slate-900 dark:text-white hover:text-brand-primary dark:hover:text-cyber-neon transition-all underline decoration-brand-primary/30 underline-offset-8">
                                            {isRevealed ? getEmail(contacts.sekretariat) : '••••••••••••@••••••'}
                                        </a>
                                    </div>

                                    <div className="col-span-full group/item p-6 rounded-2xl bg-brand-primary/5 dark:bg-cyber-blue/5 border border-brand-primary/20 dark:border-white/5">
                                        <strong className="block text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 mb-3">
                                            {t('career.contact')}
                                        </strong>
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm text-brand-primary dark:text-cyber-neon">
                                                <Phone size={24} />
                                            </div>
                                            <a href={isRevealed ? `tel:${contacts.phone.join('')}` : '#'} 
                                               className="text-2xl font-black text-slate-900 dark:text-white hover:text-brand-primary dark:hover:text-cyber-neon transition-colors tracking-tight">
                                                {isRevealed ? getPhone(contacts.phone) : '+420 ••• ••• •••'}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                                {isRevealed && (
                                    <button 
                                        onClick={() => setIsRevealed(false)}
                                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary transition-colors flex items-center gap-2 mt-4"
                                    >
                                        <EyeOff size={14} /> Skrýt kontakty
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form Column */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-10 rounded-[32px] relative overflow-hidden h-fit border border-slate-200 dark:border-white/5 shadow-2xl"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-brand-primary/10 dark:bg-cyber-neon opacity-20 blur-[100px] rounded-full pointer-events-none" />
                        
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 rounded-lg bg-brand-primary/10 dark:bg-cyber-blue/10 text-brand-primary dark:text-cyber-neon">
                                <ShieldCheck size={28} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t('contact.title')}</h2>
                        </div>

                        <form className="space-y-6 relative z-10">
                            {/* Honeypot Field (Hidden for humans) */}
                            <div className="hidden" aria-hidden="true">
                                <label htmlFor="website">Website</label>
                                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 mb-2">{t('contact.formName')}</label>
                                    <input type="text" id="name" placeholder="John Doe" className="w-full bg-slate-100/50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary dark:focus:border-cyber-neon focus:ring-4 focus:ring-brand-primary/10 dark:focus:ring-cyber-neon/10 transition-all font-medium" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 mb-2">{t('contact.formEmail')}</label>
                                    <input type="email" id="email" placeholder="john@example.com" className="w-full bg-slate-100/50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary dark:focus:border-cyber-neon focus:ring-4 focus:ring-brand-primary/10 dark:focus:ring-cyber-neon/10 transition-all font-medium" />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 mb-2">{t('contact.formMessage')}</label>
                                <textarea id="message" rows={5} className="w-full bg-slate-100/50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary dark:focus:border-cyber-neon focus:ring-4 focus:ring-brand-primary/10 dark:focus:ring-cyber-neon/10 transition-all font-medium resize-none shadow-inner" placeholder={t('contact.formSummary')}></textarea>
                            </div>

                            <button type="button" className="group w-full bg-slate-900 dark:bg-cyber-blue hover:bg-black dark:hover:bg-blue-600 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-brand-primary/20 dark:shadow-cyber-blue/30 flex items-center justify-center gap-3 active:scale-[0.98]">
                                {t('contact.formSubmit')}
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <Zap size={14} className="text-white" />
                                </div>
                            </button>

                            <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 leading-relaxed max-w-xs mx-auto">
                                Odesláním souhlasíte se zpracováním osobních údajů v rámci vaší žádosti.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Kontakt;
