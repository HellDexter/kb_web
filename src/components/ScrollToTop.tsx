import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ 
                        scale: 1.1,
                        boxShadow: "0 0 20px rgba(0, 163, 255, 0.5)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[60] group p-4 rounded-2xl bg-white/10 dark:bg-cyber-dark/40 backdrop-blur-xl border border-brand-primary/30 dark:border-cyber-blue/30 text-brand-primary dark:text-cyber-blue shadow-2xl transition-all"
                    aria-label="Scroll to top"
                >
                    {/* Pulsing ring effect */}
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 rounded-2xl border border-brand-primary/20 dark:border-cyber-blue/20 -z-10"
                    />
                    
                    <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
                    
                    {/* Decorative tech dots */}
                    <div className="absolute top-1 right-1 w-1 h-1 bg-brand-primary dark:bg-cyber-neon rounded-full" />
                    <div className="absolute bottom-1 left-1 w-1 h-1 bg-brand-primary dark:bg-cyber-neon rounded-full" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
