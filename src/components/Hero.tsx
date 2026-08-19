import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface HeroProps {
  onNavigate: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { t, isRtl } = useLanguage();
  const heroVideoSrc = `${import.meta.env.BASE_URL}videos/hero-background.mp4`;

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-16 flex items-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background video layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"  src={heroVideoSrc}  autoPlay  muted  loop  playsInline  aria-hidden="true"/>
        <div className="absolute inset-0 bg-slate-950/35 dark:bg-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-900/20 to-slate-950/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className={`lg:col-span-7 flex flex-col space-y-8 ${isRtl ? 'text-right items-start' : 'text-left items-start'}`}>

            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 
            border border-blue-100 dark:border-blue-900/40 px-4 py-1.5 rounded-full w-fit">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                {t('hero_badge')}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900
             dark:text-white leading-[1.1]">
              {t('hero_title_1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-300">
                {t('hero_title_2')}
              </span>
            </h1>

            <p className="text-white/95 dark:text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed font-normal">
              {t('hero_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('tracking-tech')}
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-md shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                {t('hero_btn_calc')}
                <ArrowRight className={`h-[18px] w-[18px] ${isRtl ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => onNavigate('tracking-tech')}
                className="flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                {t('hero_btn_track')}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800 w-full">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mt-0.5">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white dark:text-slate-200">{t('hero_feat1_title')}</h4>
                  <p className="text-xs text-white/80 dark:text-slate-400">{t('hero_feat1_desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mt-0.5">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white dark:text-slate-200">{t('hero_feat2_title')}</h4>
                  <p className="text-xs text-white/80 dark:text-slate-400">{t('hero_feat2_desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mt-0.5">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white dark:text-slate-200">{t('hero_feat3_title')}</h4>
                  <p className="text-xs text-white/80 dark:text-slate-400">{t('hero_feat3_desc')}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
