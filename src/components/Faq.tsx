import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Faq() {
  const { t, isRtl } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    { question: 'faq_q1', answer: 'faq_a1' },
    { question: 'faq_q2', answer: 'faq_a2' },
    { question: 'faq_q3', answer: 'faq_a3' },
    { question: 'faq_q4', answer: 'faq_a4' },
    { question: 'faq_q5', answer: 'faq_a5' },
  ] as const;

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-slate-50
     dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
      
      {/* Background decoration circles (style parity with Fleet, About, Contact) */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-50/40 dark:bg-blue-950/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-indigo-50/20 dark:bg-indigo-950/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 px-4 py-1 rounded-full mb-4">
            <HelpCircle className="h-[18px] w-[18px] text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
              {t('faq_badge')}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('faq_title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base sm:text-lg font-normal">
            {t('faq_subtitle')}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${
                  isOpen 
                    ? 'border-blue-500 dark:border-blue-500 shadow-md shadow-blue-500/5' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => handleToggle(index)}
                  className={`w-full flex items-center justify-between p-5 text-base sm:text-lg font-bold transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer ${
                    isOpen 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-slate-800 dark:text-slate-200'
                  } ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 pr-4 pl-4">{t(item.question)}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="shrink-0 text-slate-400 dark:text-slate-500"
                  >
                    <ChevronDown className="h-5 w-5 stroke-[2.5]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className={`px-5 pb-5 pt-0 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-normal border-t border-slate-100 dark:border-slate-800/50 pt-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {t(item.answer)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
