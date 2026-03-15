import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Settings, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieSettings {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
}

const COOKIE_STORAGE_KEY = 'jckb_cookie_consent';

const CookieConsent = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState<CookieSettings>(() => {
        const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
        return saved ? JSON.parse(saved) : {
            essential: true,
            analytics: false,
            marketing: false,
        };
    });

    useEffect(() => {
        const savedConsent = localStorage.getItem(COOKIE_STORAGE_KEY);
        if (!savedConsent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const allAccepted = { essential: true, analytics: true, marketing: true };
        saveConsent(allAccepted);
    };

    const handleRejectAll = () => {
        const allRejected = { essential: true, analytics: false, marketing: false };
        saveConsent(allRejected);
    };

    const handleSaveSettings = () => {
        saveConsent(settings);
    };

    const saveConsent = (newSettings: CookieSettings) => {
        localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(newSettings));
        setSettings(newSettings);
        setIsVisible(false);
        setShowSettings(false);
        // Here you would typically trigger tracking script initialization
    };

    const toggleSetting = (key: keyof CookieSettings) => {
        if (key === 'essential') return;
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            {/* Minimalist Trigger Icon (Oval Expand on Hover) */}
            <button
                onClick={() => setIsVisible(true)}
                className="fixed bottom-6 left-6 z-40 h-14 w-14 hover:w-auto p-4 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-brand-primary/20 dark:hover:shadow-cyber-neon/30 transition-all duration-500 ease-in-out group flex items-center justify-center hover:px-6 overflow-hidden"
                title={t('cookies.privacyTrigger')}
            >
                <div className="flex items-center justify-center shrink-0">
                    <Shield size={24} className="text-brand-primary dark:text-cyber-neon" />
                </div>
                <span className="max-w-0 opacity-0 group-hover:max-w-[400px] group-hover:opacity-100 transition-all duration-700 ease-in-out whitespace-nowrap ml-0 group-hover:ml-3 text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-100">
                    {t('cookies.privacyTrigger') || 'Nastavení soukromí a cookies'}
                </span>
            </button>

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-lg z-50 overflow-hidden"
                    >
                        <div className="glass-card p-6 md:p-8 rounded-3xl border-2 border-brand-primary/10 dark:border-cyber-blue/20 relative shadow-2xl">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-brand-primary/10 dark:bg-cyber-blue/10 text-brand-primary dark:text-cyber-neon">
                                        <Shield size={24} />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('cookies.title')}</h2>
                                </div>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {!showSettings ? (
                                <>
                                    <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                                        {t('cookies.description')}
                                    </p>

                                    <div className="flex flex-col gap-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={handleRejectAll}
                                                className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm"
                                            >
                                                {t('cookies.rejectAll')}
                                            </button>
                                            <button
                                                onClick={handleAcceptAll}
                                                className="px-6 py-3 rounded-xl bg-brand-primary dark:bg-cyber-blue text-white font-bold hover:opacity-90 transition-all text-sm shadow-lg shadow-brand-primary/20 dark:shadow-cyber-blue/20"
                                            >
                                                {t('cookies.acceptAll')}
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => setShowSettings(true)}
                                            className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-primary dark:hover:text-cyber-neon transition-colors py-2"
                                        >
                                            <Settings size={16} />
                                            {t('cookies.settings')}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-6">
                                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                        {/* Essential */}
                                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-slate-900 dark:text-white">{t('cookies.essential')}</span>
                                                <div className="text-brand-primary dark:text-cyber-accent">
                                                    <Check size={20} />
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">{t('cookies.essentialDesc')}</p>
                                        </div>

                                        {/* Analytics */}
                                        <button
                                            onClick={() => toggleSetting('analytics')}
                                            className={`w-full text-left p-4 rounded-2xl border transition-all ${settings.analytics ? 'bg-brand-primary/5 dark:bg-cyber-blue/5 border-brand-primary/20 dark:border-cyber-blue/30' : 'bg-transparent border-slate-100 dark:border-slate-700/50'}`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-slate-900 dark:text-white">{t('cookies.analytics')}</span>
                                                <div className={`w-12 h-6 rounded-full relative transition-colors ${settings.analytics ? 'bg-brand-primary dark:bg-cyber-blue' : 'bg-slate-300 dark:bg-slate-600'}`}>
                                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.analytics ? 'left-7' : 'left-1'}`} />
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">{t('cookies.analyticsDesc')}</p>
                                        </button>

                                        {/* Marketing */}
                                        <button
                                            onClick={() => toggleSetting('marketing')}
                                            className={`w-full text-left p-4 rounded-2xl border transition-all ${settings.marketing ? 'bg-brand-primary/5 dark:bg-cyber-blue/5 border-brand-primary/20 dark:border-cyber-blue/30' : 'bg-transparent border-slate-100 dark:border-slate-700/50'}`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-slate-900 dark:text-white">{t('cookies.marketing')}</span>
                                                <div className={`w-12 h-6 rounded-full relative transition-colors ${settings.marketing ? 'bg-brand-primary dark:bg-cyber-blue' : 'bg-slate-300 dark:bg-slate-600'}`}>
                                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.marketing ? 'left-7' : 'left-1'}`} />
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">{t('cookies.marketingDesc')}</p>
                                        </button>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => setShowSettings(false)}
                                            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm"
                                        >
                                            {t('hero.buttonContact')}
                                        </button>
                                        <button
                                            onClick={handleSaveSettings}
                                            className="flex-[1.5] px-4 py-3 rounded-xl bg-brand-primary dark:bg-cyber-blue text-white font-bold text-sm"
                                        >
                                            {t('cookies.save')}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CookieConsent;
