import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Info, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'gdpr' | 'cookies' | 'mandatory' | null;
}

const LegalModal = ({ isOpen, onClose, type }: LegalModalProps) => {
    const { t } = useTranslation();

    if (!type) return null;

    const getIcon = () => {
        switch (type) {
            case 'gdpr': return <Shield className="text-brand-primary dark:text-cyber-neon" size={32} />;
            case 'cookies': return <Info className="text-brand-secondary dark:text-cyber-blue" size={32} />;
            case 'mandatory': return <Database className="text-brand-primary dark:text-cyber-purple" size={32} />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-white dark:bg-cyber-dark border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header Decoration */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary dark:from-cyber-blue dark:via-cyber-purple dark:to-cyber-blue" />

                        <div className="p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 shadow-inner">
                                        {getIcon()}
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                        {t(`legal.${type}.title`)}
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all group"
                                >
                                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                            </div>

                            <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
                                {type === 'gdpr' && (
                                    <>
                                        <p>{t('legal.gdpr.p1')}</p>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t('legal.gdpr.purposeTitle')}</h4>
                                            <p>{t('legal.gdpr.purposeText')}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t('legal.gdpr.rightsTitle')}</h4>
                                            <p>{t('legal.gdpr.rightsText')}</p>
                                        </div>
                                        <p className="p-4 rounded-xl bg-brand-primary/5 dark:bg-cyber-blue/10 border border-brand-primary/10 dark:border-cyber-blue/20 italic">
                                            {t('legal.gdpr.contactText')}
                                        </p>
                                    </>
                                )}

                                {type === 'cookies' && (
                                    <>
                                        <p>{t('legal.cookies.p1')}</p>
                                        <p>{t('legal.cookies.p2')}</p>
                                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5">
                                            <h4 className="font-bold text-brand-secondary dark:text-cyber-blue mb-2">{t('legal.cookies.settingsTitle')}</h4>
                                            <p className="text-sm">{t('legal.cookies.settingsText')}</p>
                                        </div>
                                    </>
                                )}

                                {type === 'mandatory' && (
                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { label: t('legal.mandatory.nameLabel'), value: t('legal.mandatory.nameValue') },
                                            { label: t('legal.mandatory.idLabel'), value: t('legal.mandatory.idValue') },
                                            { label: t('legal.mandatory.regLabel'), value: t('legal.mandatory.regValue'), full: true },
                                            { label: t('legal.mandatory.addressLabel'), value: t('legal.mandatory.addressValue'), full: true },
                                            { label: t('legal.mandatory.dataBoxLabel'), value: t('legal.mandatory.dataBoxValue') }
                                        ].map((item, idx) => (
                                            <div key={idx} className={`p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 ${item.full ? 'col-span-1' : ''}`}>
                                                <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">{item.label}</span>
                                                <span className="font-bold text-slate-900 dark:text-white">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LegalModal;
