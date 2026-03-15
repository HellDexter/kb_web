import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    AlertTriangle, 
    ExternalLink, 
    Clock, 
    Loader2,
    X,
    ChevronRight,
    ChevronDown
} from 'lucide-react';
import { newsService } from '../services/NewsService';
import type { NewsItem } from '../services/NewsService';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../useTheme';

const Aktuality = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [news, setNews] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSource, setSelectedSource] = useState<string>('ALL');
    const [visibleCount, setVisibleCount] = useState(6);
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const sources = ['ALL', 'NÚKIB', 'CSIRT.cz', 'CISA'];

    const formatContent = (content: string) => {
        if (!content) return null;
        
        return content.split('\n').map((line, i) => {
            if (!line.trim()) return <br key={i} />;
            
            const unifiedRegex = /\b(CVE-\d{4}-\d{4,7}|CWE-\d{1,5}|HIGH|CRITICAL|MEDIUM|LOW|MODERATE)\b/gi;
            const parts = line.split(unifiedRegex);
            
            const processedLine = parts.map((part, index) => {
                if (!part) return null;
                const upperPart = part.toUpperCase();
                
                if (/\bCVE-\d{4}-\d{4,7}\b/i.test(part) || /\bCWE-\d{1,5}\b/i.test(part)) {
                    return <span key={index} className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-cyber-blue font-bold text-sm mx-0.5 shadow-sm">{part}</span>;
                }
                if (['HIGH', 'CRITICAL'].includes(upperPart)) {
                    return <span key={index} className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 font-black text-sm mx-0.5 shadow-sm border border-red-500/20">{part}</span>;
                }
                if (['MEDIUM', 'MODERATE', 'LOW'].includes(upperPart)) {
                    return <span key={index} className="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 font-bold text-sm mx-0.5 shadow-sm border border-orange-500/10">{part}</span>;
                }
                return part;
            });

            return <p key={i} className="mb-6 leading-relaxed tracking-wide text-slate-700 dark:text-slate-300">{processedLine}</p>;
        });
    };

    const filteredNews = news.filter(item => selectedSource === 'ALL' || item.source === selectedSource);

    useEffect(() => {
        const loadNews = async () => {
            setIsLoading(true);
            const allNews = await newsService.fetchAllNews();

            // If we have dynamic news, use them, otherwise fallback to static for safety
            if (allNews.length > 0) {
                setNews(allNews);
            } else {
                const staticItems = t('news.items', { returnObjects: true }) as Array<{ title: string, desc: string, date: string }>;
                setNews(staticItems.map((item, index) => ({
                    ...item,
                    id: `static-${index}`,
                    type: index === 0 ? 'warning' : 'info',
                    source: 'OTHER',
                    link: '#',
                    fullDesc: item.desc
                })));
            }
            setIsLoading(false);
        };
        loadNews();
    }, [t]);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    const handleOpenDetail = (item: NewsItem) => {
        setSelectedNews(item);
        setIsExpanded(false);
    };

    return (
        <div id="news-content" className="py-24 min-h-screen relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                            {t('news.title')}
                            <span className="text-brand-primary dark:text-cyber-blue">.</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            {t('news.subtitle')}
                        </p>
                    </motion.div>
                </div>

                {/* Filters */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
                    {sources.map(source => (
                        <button
                            key={source}
                            onClick={() => {
                                setSelectedSource(source);
                                setVisibleCount(6);
                            }}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${
                                selectedSource === source 
                                ? 'bg-brand-primary dark:bg-cyber-blue text-white border-brand-primary dark:border-cyber-blue shadow-xl shadow-brand-primary/20' 
                                : 'bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-brand-primary dark:hover:border-cyber-blue'
                            }`}
                        >
                            {source === 'ALL' ? t('news.allSources') : source}
                        </button>
                    ))}
                </motion.div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-6">
                        <div className="relative">
                            <Loader2 className="animate-spin text-brand-primary dark:text-cyber-blue" size={64} />
                            <div className="absolute inset-0 animate-ping bg-brand-primary/20 dark:bg-cyber-blue/20 rounded-full -z-10" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-lg animate-pulse tracking-wide">
                            Zabezpečuji spojení a stahuji data...
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredNews.slice(0, visibleCount).map((item, index) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: index % 6 * 0.1 }}
                                        layoutId={item.id}
                                        key={item.id}
                                        onClick={() => handleOpenDetail(item)}
                                        className={`glass-card p-8 rounded-3xl flex flex-col gap-5 border-t border-white/10 transition-all hover:-translate-y-2 group cursor-pointer relative overflow-hidden ${
                                            item.type === 'warning' 
                                            ? 'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-red-500 shadow-red-500/5' 
                                            : 'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-cyber-blue shadow-brand-primary/5'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className={`p-3 rounded-2xl ${item.type === 'warning' ? 'bg-red-500/10 text-red-500' : 'bg-brand-primary/10 dark:bg-cyber-blue/10 text-brand-primary dark:text-cyber-blue'}`}>
                                                <AlertTriangle size={28} className={item.type === 'warning' ? 'animate-pulse' : ''} />
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                    item.type === 'warning' 
                                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                                }`}>
                                                    {item.type === 'warning' ? 'Kritické' : 'Aktualita'}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.source}</span>
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3 font-semibold">
                                                <Clock size={14} className="text-brand-primary dark:text-cyber-blue" /> {item.date}
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white leading-tight group-hover:text-brand-primary dark:group-hover:text-cyber-blue transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm line-clamp-4 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                                {item.desc}
                                            </p>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                            <span className="text-brand-primary dark:text-cyber-blue text-sm font-black flex items-center gap-2 group-hover:gap-3 transition-all">
                                                {t('news.readMore')} <ChevronRight size={18} />
                                            </span>
                                            {item.fullDesc && item.fullDesc.length > 500 && (
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Dlouhá zpráva</span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {filteredNews.length > 6 && (
                            <div className="mt-20 text-center relative">
                                <div className="absolute inset-0 flex items-center -z-10 opacity-10">
                                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary dark:via-cyber-blue to-transparent" />
                                </div>
                                
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        if (visibleCount >= filteredNews.length) {
                                            setVisibleCount(6);
                                            window.scrollTo({ top: document.getElementById('news-content')?.offsetTop || 0, behavior: 'smooth' });
                                        } else {
                                            handleLoadMore();
                                        }
                                    }}
                                    className={`group relative inline-flex items-center gap-4 px-8 py-3.5 rounded-xl font-bold text-base transition-all overflow-hidden mx-auto border
                                        ${theme === 'dark' 
                                            ? 'bg-slate-900 border-white/10 text-white shadow-xl shadow-black/20' 
                                            : 'bg-white/60 backdrop-blur-md border-brand-primary/20 text-brand-primary shadow-xl shadow-brand-primary/10 hover:shadow-brand-primary/20'
                                        }`}
                                >
                                    {/* Text content */}
                                    <span className="relative z-10 tracking-wide uppercase text-sm font-black">
                                        {visibleCount >= filteredNews.length ? 'Zobrazit méně' : 'Načíst další incidenty'}
                                    </span>

                                    {/* Square Icon Box */}
                                    <div className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                                        ${theme === 'dark'
                                            ? 'bg-cyber-blue text-white shadow-[0_0_10px_rgba(0,156,193,0.3)]'
                                            : 'bg-brand-primary text-white shadow-[0_0_10px_rgba(0,156,193,0.2)]'
                                        }`}
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={visibleCount >= filteredNews.length ? 'up' : 'down'}
                                                initial={{ opacity: 0, rotate: -90 }}
                                                animate={{ opacity: 1, rotate: visibleCount >= filteredNews.length ? 180 : 0 }}
                                                exit={{ opacity: 0, rotate: 90 }}
                                            >
                                                <ChevronDown size={18} />
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* Subtle Neon Strip */}
                                    <div className={`absolute bottom-0 left-0 right-0 h-[3px] shadow-sm
                                        ${theme === 'dark'
                                            ? 'bg-cyber-blue shadow-cyber-blue/60'
                                            : 'bg-brand-primary shadow-brand-primary/40'
                                        }`} 
                                    />
                                    
                                    {/* Reflection effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.button>
                                
                                <div className="mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] opacity-50">
                                    Zobrazeno {Math.min(visibleCount, filteredNews.length)} z {filteredNews.length} incidentů
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* News Detail Modal */}
            <AnimatePresence>
                {selectedNews && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedNews(null)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        />
                        <motion.div 
                            layoutId={selectedNews.id}
                            className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-white/10"
                        >
                            <div className={`h-2 w-full ${selectedNews.type === 'warning' ? 'bg-red-500' : 'bg-cyber-blue'}`} />
                            
                            <button 
                                onClick={() => setSelectedNews(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${selectedNews.type === 'warning' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-cyber-blue text-white shadow-lg shadow-cyber-blue/20'}`}>
                                        {selectedNews.type === 'warning' ? t('news.types.kr') : t('news.types.ar')}
                                    </span>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                                        <Clock size={16} /> {selectedNews.date}
                                        <span className="text-brand-primary dark:text-cyber-blue font-bold">
                                            #{selectedNews.source}
                                        </span>
                                    </div>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
                                    {selectedNews.title}
                                </h2>

                                <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-10">
                                    {(() => {
                                        const fullText = selectedNews.fullDesc || selectedNews.desc;
                                        const shouldTruncate = fullText.length > 1000 && !isExpanded;
                                        const displayedText = shouldTruncate ? fullText.slice(0, 1000) + '...' : fullText;
                                        
                                        return (
                                            <>
                                                {formatContent(displayedText)}
                                                {fullText.length > 1000 && (
                                                    <button 
                                                        onClick={() => setIsExpanded(!isExpanded)}
                                                        className="mt-4 flex items-center gap-2 text-brand-primary dark:text-cyber-blue font-black hover:underline group"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            {isExpanded ? 'Zkrátit text' : 'Zobrazit celou zprávu'}
                                                            <motion.div
                                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                            >
                                                                <ChevronRight size={18} className="rotate-90 sm:rotate-0" />
                                                            </motion.div>
                                                        </span>
                                                    </button>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                    <a 
                                        href={selectedNews.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black text-lg transition-all shadow-xl ${
                                            selectedNews.type === 'warning'
                                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20'
                                            : 'bg-brand-primary dark:bg-cyber-blue hover:bg-brand-secondary dark:hover:bg-cyber-blue/80 text-white shadow-brand-primary/20'
                                        }`}
                                    >
                                        Originální zpráva <ExternalLink size={20} />
                                    </a>
                                    <button 
                                        onClick={() => setSelectedNews(null)}
                                        className="flex-1 py-4 px-6 rounded-2xl font-bold text-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                                    >
                                        Zavřít detail
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Aktuality;
