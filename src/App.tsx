import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Calculator from './components/Calculator';
import Tracker from './components/Tracker';
import Fleet from './components/Fleet';
import About from './components/About';
import Contact from './components/Contact';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import ReviewsFaqPage from './components/ReviewsFaqPage';
import Footer from './components/Footer';
import { ChevronUp, ArrowRight, Shield } from 'lucide-react';

type AppPage = 'home' | 'tracking-tech' | 'impressum' | 'datenschutz' | 'reviews-faq';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navigatePage = (page: AppPage) => {
    setCurrentPage(page);
    window.history.pushState({ page }, '', window.location.href);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    if (currentPage !== 'home') {
      if (currentPage === 'tracking-tech') {
        setActiveSection('tracking-tech');
      } else {
        setActiveSection('');
      }
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = ['home', 'about', 'services', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.history.replaceState({ page: 'home' }, '', window.location.href);

    const handlePopState = () => {
      const nextPage = (window.history.state?.page as AppPage) || 'home';
      setCurrentPage(nextPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'reviews-faq') {
      if (currentPage !== 'reviews-faq') {
        navigatePage('reviews-faq');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const trackingTechSections = ['tracking-tech', 'calculator', 'tracker', 'fleet'];
    const isTrackingTechTarget = trackingTechSections.includes(sectionId);

    if (isTrackingTechTarget) {
      if (currentPage !== 'tracking-tech') {
        navigatePage('tracking-tech');
        setTimeout(() => {
          if (sectionId === 'tracking-tech') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('tracking-tech');
          } else {
            const element = document.getElementById(sectionId);
            if (element) {
              const offset = 70;
              const bodyRect = document.body.getBoundingClientRect().top;
              const elementRect = element.getBoundingClientRect().top;
              const elementPosition = elementRect - bodyRect;
              const offsetPosition = elementPosition - offset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              setActiveSection('tracking-tech');
            }
          }
        }, 100);
      } else {
        if (sectionId === 'tracking-tech') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveSection('tracking-tech');
        } else {
          const element = document.getElementById(sectionId);
          if (element) {
            const offset = 70;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            setActiveSection('tracking-tech');
          }
        }
      }
    } else {
      if (currentPage !== 'home') {
        navigatePage('home');
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const offset = 70;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            setActiveSection(sectionId);
          }
        }, 100);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 70;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          setActiveSection(sectionId);
        }
      }
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans select-text selection:bg-blue-100 dark:selection:bg-blue-900/50 selection:text-blue-900 dark:selection:text-blue-100"> 
      <Navbar 
        onNavigate={handleNavigate} 
        activeSection={activeSection} 
        isDark={isDark} 
        onToggleDark={() => setIsDark(!isDark)} 
      />

      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <About />
            <Services />
            <Contact />
          </>
        )}

        {currentPage === 'tracking-tech' && (
          <div className="pt-16">
            <Calculator />

            <Tracker />

            <Fleet />
          </div>
        )}

        {currentPage === 'impressum' && (
          <Impressum onBack={() => navigatePage('home')} />
        )}

        {currentPage === 'datenschutz' && (
          <Datenschutz onBack={() => navigatePage('home')} />
        )}

        {currentPage === 'reviews-faq' && (
          <ReviewsFaqPage />
        )}
      </main>

      <Footer 
        onNavigate={handleNavigate} 
        onNavigatePage={navigatePage} 
        isDark={isDark} 
      />

      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white shadow-lg shadow-slate-900/10 dark:shadow-blue-500/10 border border-slate-800 dark:border-blue-500 transition-all duration-300 hover:scale-110 active:scale-95 animate-fade-in cursor-pointer"
          aria-label="Scroll back to top"
          id="back-to-top-btn"
        >
          <ChevronUp className="h-5 w-5 stroke-[2.5]" />
        </button>
      )}

    </div>
  );
}
