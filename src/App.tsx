import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ONas from './pages/ONas';
import Aktuality from './pages/Aktuality';
import Kariera from './pages/Kariera';
import Kontakt from './pages/Kontakt';
import CookieConsent from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';
import { useTheme } from './useTheme';


function App() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-cyber-dark text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar />
      <main className="flex-grow relative">
        <section id="domu">
          <Home />
        </section>
        <section id="aktuality" className="bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800/50">
          <Aktuality />
        </section>
        <section id="o-nas">
          <ONas />
        </section>
        <section id="kariera" className="bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800/50">
          <Kariera />
        </section>
        <section id="kontakt">
          <Kontakt />
        </section>
      </main>
      <Footer />
      <CookieConsent />
      <ScrollToTop />
    </div>
  );
}

export default App;
