import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../useTheme';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { t, i18n } = useTranslation();
    const [activeSection, setActiveSection] = useState('domu');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sections = ['domu', 'aktuality', 'o-nas', 'kariera', 'kontakt'];
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-0' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-16' : 'h-24'}`}>
                    <div className="flex-shrink-0">
                        <img
                            src={theme === 'dark' ? "/img/brand/logo-short-white.png" : "/img/brand/logo-short-color.png"}
                            alt="JCKB Logo"
                            className={`transition-all duration-500 object-contain ${isScrolled ? 'h-10' : 'h-14'}`}
                        />
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <div className="ml-10 flex items-center space-x-6">
                            {[
                                { id: 'domu', label: 'Home' },
                                { id: 'aktuality', label: t('nav.aktuality') },
                                { id: 'o-nas', label: t('nav.oAplikaci') },
                                { id: 'kariera', label: t('nav.kariera') },
                                { id: 'kontakt', label: t('nav.kontakt') }
                            ].map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`relative py-2 text-sm font-semibold transition-all duration-300
                                        ${activeSection === item.id
                                            ? 'text-brand-primary dark:text-cyber-neon'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-brand-primary dark:hover:text-cyber-neon'}`}
                                >
                                    {item.label}
                                    {activeSection === item.id && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary dark:bg-cyber-neon rounded-full" />
                                    )}
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                            {/* Language Switcher */}
                            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700">
                                <button
                                    onClick={() => i18n.changeLanguage('cs')}
                                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${i18n.language === 'cs' ? 'bg-brand-primary text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-brand-primary dark:hover:text-cyber-neon'}`}
                                >
                                    CZ
                                </button>
                                <button
                                    onClick={() => i18n.changeLanguage('en')}
                                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${i18n.language === 'en' || i18n.language?.startsWith('en') ? 'bg-brand-primary text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-brand-primary dark:hover:text-cyber-neon'}`}
                                >
                                    EN
                                </button>
                            </div>

                            <button
                                onClick={toggleTheme}
                                className="p-2 ml-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
