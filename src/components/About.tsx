import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function About() {
  const { t, isRtl } = useLanguage();

  const values = [
    {
      title: t('about_pillar1_title'),
      desc: t('about_pillar1_desc'),
      icon: <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    },
    {
      title: t('about_pillar2_title'),
      desc: t('about_pillar2_desc'),
      icon: <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    },
    {
      title: t('about_pillar3_title'),
      desc: t('about_pillar3_desc'),
      icon: <HeartHandshake className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
      
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-50/40 dark:bg-blue-950/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-indigo-50/30 dark:bg-indigo-950/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Profile Narrative Grid */}
        <div className={`grid lg:grid-cols-12 gap-12 items-center mb-24 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Left/Right Column: Mission text */}
          <div className={`lg:col-span-7 space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 px-4 py-1 rounded-full">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
                {t('about_badge')}
              </span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {t('about_title_1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                {t('about_title_2')}
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-400 font-normal text-base sm:text-lg leading-relaxed">
              {t('about_subtitle_1')}
            </p>

            <p className="text-slate-500 dark:text-slate-400 font-normal text-sm sm:text-base leading-relaxed">
              {t('about_subtitle_2')}
            </p>

            <div className={`grid grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">100&nbsp;%</div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1 font-bold">
                  {t('about_stat_assets')}
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold font-display text-blue-600 dark:text-blue-400">24/7</div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1 font-bold">
                  {t('about_stat_offset')}
                </div>
              </div>
            </div>
          </div>

          {/* Right/Left Column: Key pillars card list */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className={`text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
              {t('about_standards_title')}
            </h4>
            
            {values.map((val, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 rounded-2xl p-5 transition-all duration-300 shadow-sm"
              >
                <div className={`flex items-start gap-4 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-blue-600 dark:text-blue-400 shrink-0 shadow-sm">
                    {val.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">{val.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">{val.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
