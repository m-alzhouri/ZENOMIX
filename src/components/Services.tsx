import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { ServiceItem } from '../types';
import { Zap, Truck, Globe, Shield, ArrowRight, CheckCircle2, ChevronRight, X, Box } from 'lucide-react';

export default function Services() {
  const { services, t, isRtl, language } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (!selectedService) return;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [selectedService]);

  // Helper function to render matching icon dynamically
  const renderIcon = (iconName: string, className: string = "h-6 w-6") => {
    switch (iconName) {
      case 'Zap':
        return <Zap className={className} />;
      case 'Truck':
        return <Truck className={className} />;
      case 'Globe':
        return <Globe className={className} />;
      case 'Shield':
        return <Shield className={className} />;
      default:
        return <Box className={className} />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
      
      {/* Background visual accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-50/40 dark:bg-blue-950/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-50/30 dark:bg-indigo-950/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 px-4 py-1 rounded-full mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
              {t('services_badge')}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {language === 'ar' ? 'عمليات لوجستية متطورة مصممة من أجل' : 'Comprehensive logistics built for'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300">
              {language === 'ar' ? 'سلاسل إمداد انسيابية وموثوقة' : 'uncompromised supply chains'}
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base sm:text-lg font-normal">
            {t('services_subtitle')}
          </p>
        </div>

        {/* Services marquee */}
        <div className="relative">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute left-[-10%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-100/70 blur-[120px] dark:bg-blue-950/30" />
            <div className="absolute right-[-8%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-indigo-100/70 blur-[120px] dark:bg-indigo-950/30" />
          </div>

          <div className="relative rounded-[2rem] border border-slate-200/70 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/60 backdrop-blur-md shadow-[0_12px_50px_-18px_rgba(37,99,235,0.45)] dark:shadow-[0_20px_80px_-25px_rgba(59,130,246,0.35)] py-4 sm:py-5 px-4 sm:px-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {services.map((service, index) => (
                <div
                  key={`${service.id}-${index}`}
                  id={`service-card-${service.id}`}
                  className="group relative bg-white dark:bg-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 rounded-3xl p-6 sm:p-7 transition-all duration-500 flex flex-col justify-between cursor-pointer shadow-[0_10px_30px_-18px_rgba(15,23,42,0.45)] hover:shadow-[0_16px_40px_-18px_rgba(37,99,235,0.45)] dark:shadow-none"
                  onClick={() => setSelectedService(service)}
                >
                      <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div>
                        <div className={`flex items-center justify-between mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100/50 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                            {renderIcon(service.iconName, "h-7 w-7")}
                          </div>
                          <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200/30 dark:border-slate-700 px-4 py-1.5 rounded-full text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">
                            {service.specs.transitTime}
                          </div>
                        </div>

                        <h3 className={`text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 ${isRtl ? 'text-right' : 'text-left'}`}>
                          {service.title}
                        </h3>

                        <p className={`text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                          {service.shortDesc}
                        </p>

                        {/* <ul className="mt-5 space-y-2">
                          {service.features.slice(0, 2).map((feat, idx) => (
                            <li key={idx} className={`flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                              <span className="truncate font-medium">{feat}</span>
                            </li>
                          ))}
                        </ul> */}
                      </div>

                      <div className={`mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex gap-4 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                          <div>
                            <div className="text-[10px] font-mono text-slate-400 uppercase">{isRtl ? 'التغطية' : 'Coverage'}</div>
                            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{service.specs.globalCoverage}</div>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 ${isRtl ? 'flex-row-reverse group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5'} transition-transform duration-300`}>
                          <span>{isRtl ? 'استكمل التفاصيل' : 'Explore Details'}</span>
                          <ChevronRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Extended Detail Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in overflow-hidden" onClick={() => setSelectedService(null)}>
            <div 
              className={`bg-white dark:bg-slate-900 border border-slate-200
                 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[82vh]
                  overflow-y-auto overscroll-contain relative p-5 pt-12 mt-20 pb-10 sm:p-8
                   sm:pt-8 shadow-2xl dark:shadow-none animate-scale-up
                    ${isRtl ? 'text-right' : 'text-left'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} sm:top-6 ${isRtl ? 'sm:left-6' : 'sm:right-6'} p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-900 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer z-20 shadow-sm`}
                id="close-service-modal"
                aria-label={isRtl ? 'إغلاق تفاصيل الخدمة' : 'Close service details'}
              >
                <X className="h-5 w-5" />
              </button>

              {/* Service Title */}
              <div className={`flex flex-col items-start gap-4 mb-6 sm:flex-row sm:items-center ${isRtl ? 'sm:flex-row-reverse text-right pl-10 sm:pl-0' : 'text-left pr-10 sm:pr-0'}`}>
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                  {renderIcon(selectedService.iconName, "h-8 w-8")}
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {selectedService.title}
                  </h3>
                  <p className="text-xs font-mono text-blue-600 dark:text-blue-400 mt-1 font-semibold">
                    {isRtl ? 'فئة الخدمة: ممتازة وعالية الدقة' : 'SERVICE CLASS: PREMIUM'}
                  </p>
                </div>
              </div>

              {/* Extended Description */}
              <div className={`space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal ${isRtl ? 'text-right' : 'text-left'}`}>
                <p>{selectedService.longDesc}</p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-900 rounded-2xl p-4">
                  <div className="text-[10px] font-mono text-slate-400 uppercase mb-1">{t('services_transit_time')}</div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedService.specs.transitTime}</div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-900 rounded-2xl p-4">
                  <div className="text-[10px] font-mono text-slate-400 uppercase mb-1">{t('services_capacity')}</div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedService.specs.capacity}</div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-900 rounded-2xl p-4">
                  <div className="text-[10px] font-mono text-slate-400 uppercase mb-1">{t('services_coverage')}</div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedService.specs.globalCoverage}</div>
                </div>
              </div>

              {/* Complete Features List */}
              <div className="mt-8">
                <h4 className={`text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {isRtl ? 'أنظمة القياس المتكاملة والميزات التشغيلية' : 'Integrated Telemetry & Operational Features'}
                </h4>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {selectedService.features.map((feat, idx) => (
                    <div key={idx} className={`flex items-start gap-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-xl p-3 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                      <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className={`mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                  {isRtl ? 'تتضمن جميع العقود تأميناً برياً وبحرياً قياسياً (بحد مسؤولية ٢٥٠ ألف دولار).' : 'All contracts include standard transit insurance ($250k liability limit).'}
                </span>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    // scroll to calculator
                    const element = document.getElementById('calculator');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-md shadow-blue-500/10 cursor-pointer whitespace-nowrap"
                >
                  <span>{isRtl ? 'احسب تسعيرة الشحن الفورية' : 'Generate Custom Quote'}</span>
                  <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
