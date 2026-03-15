import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../useTheme';
import LegalModal from './LegalModal';

const Footer = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [modalType, setModalType] = useState<'gdpr' | 'cookies' | 'mandatory' | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openLegal = (type: 'gdpr' | 'cookies' | 'mandatory') => {
        setModalType(type);
        setIsModalOpen(true);
    };

    return (
        <footer className="bg-slate-50 dark:bg-cyber-darker border-t border-slate-200 dark:border-white/5 py-12 mt-auto transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Logo & Info */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <img
                            src={theme === 'dark' ? "/img/brand/logo-white.png" : "/img/brand/logo-color.png"}
                            alt="JCKB Logo"
                            className="h-12 w-auto object-contain opacity-90"
                        />
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium text-center md:text-left transition-colors">
                            {t('footer.company')}
                        </p>
                    </div>

                    {/* Partners */}
                    <div className="flex flex-col items-center space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-500">
                            {t('footer.partnersTitle')}
                        </h4>
                        <div className="flex items-center gap-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                            <a href="https://www.kraj-jihocesky.cz/" target="_blank" rel="noopener noreferrer">
                                <img src="https://www.kraj-jihocesky.cz/sites/default/files/logo_jik_0.png" alt="Jihočeský kraj" className="h-10 w-auto dark:invert" />
                            </a>
                            <a href="https://www.nukib.cz/" target="_blank" rel="noopener noreferrer">
                                <img src="https://www.nukib.cz/img/logo-nukib-cs.png" alt="NÚKIB" className="h-8 w-auto dark:invert" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col items-center md:items-end space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-500">
                            {t('footer.linksTitle')}
                        </h4>
                        <div className="flex flex-col items-center md:items-end gap-2 text-sm text-center md:text-right">
                            <button
                                onClick={() => openLegal('gdpr')}
                                className="text-slate-600 dark:text-slate-400 hover:text-brand-primary dark:hover:text-cyber-neon transition-colors font-medium cursor-pointer"
                            >
                                {t('footer.privacyPolicy')}
                            </button>
                            <button
                                onClick={() => openLegal('cookies')}
                                className="text-slate-600 dark:text-slate-400 hover:text-brand-primary dark:hover:text-cyber-neon transition-colors font-medium cursor-pointer"
                            >
                                {t('footer.cookieProcessing')}
                            </button>
                            <button
                                onClick={() => openLegal('mandatory')}
                                className="text-slate-600 dark:text-slate-400 hover:text-brand-primary dark:hover:text-cyber-neon transition-colors font-medium cursor-pointer"
                            >
                                {t('footer.mandatoryInfo')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Glowing Separator Line */}
                <div className="relative h-px w-full max-w-4xl mx-auto mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-primary/40 dark:via-cyber-blue/50 to-transparent" />
                    <div className="absolute inset-x-1/4 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary dark:via-cyber-blue to-transparent shadow-[0_0_15px_rgba(0,163,255,0.8)] dark:shadow-[0_0_20px_rgba(0,163,255,1)]" />
                </div>

                <div className="flex flex-col items-center space-y-2">
                    <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
                        {t('footer.copyright', { year: new Date().getFullYear() })}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-500 text-center uppercase tracking-widest font-bold">
                        Design & Development: <span className="text-brand-primary dark:text-cyber-neon">Pavel Bertelmann</span>
                    </p>
                </div>
            </div>

            <LegalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={modalType}
            />
        </footer>
    );
};

export default Footer;
