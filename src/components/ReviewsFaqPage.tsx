import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Star, ChevronLeft, ChevronRight, MessageCircleQuestion } from 'lucide-react';
import Faq from './Faq';

export default function ReviewsFaqPage() {
  const { isRtl, testimonials } = useLanguage();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handlePrevTest = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTest = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 px-4 py-1 rounded-full mb-4">
            <MessageCircleQuestion className="h-[18px] w-[18px] text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
              {isRtl ? 'التقييمات والأسئلة الشائعة' : 'Testimonials & FAQ'}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {isRtl ? 'آراء شركائنا وأجوبة سريعة' : 'Client voices and quick answers'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base sm:text-lg font-normal">
            {isRtl
              ? 'استعرض تجارب عملائنا وتعرف على إجابات أكثر الأسئلة شيوعاً حول خدماتنا.'
              : 'Explore what our clients say and find clear answers to the most common questions about our services.'}
          </p>
        </div>

        {testimonials && testimonials.length > 0 && (
          <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-sm mb-12">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 dark:bg-blue-900/10 rounded-full filter blur-2xl" />

            <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
              <div className="flex items-center gap-1.5 text-amber-500 mb-6 justify-center">
                {[...Array(testimonials[activeTestimonial]?.rating || 5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>

              <blockquote className="text-lg sm:text-xl md:text-2xl font-medium italic text-slate-800 dark:text-slate-300 leading-relaxed mb-8">
                “{testimonials[activeTestimonial]?.quote}”
              </blockquote>

              <div className="mb-8">
                <div className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                  {testimonials[activeTestimonial]?.name}
                </div>
                <div className="text-xs font-mono text-blue-600 dark:text-blue-400 mt-1 uppercase tracking-wider font-bold">
                  {testimonials[activeTestimonial]?.role} — {testimonials[activeTestimonial]?.company}
                </div>
              </div>

              <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={isRtl ? handleNextTest : handlePrevTest}
                  className="p-3.5 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all hover:scale-105 shadow-sm cursor-pointer"
                  aria-label={isRtl ? 'التقييم السابق' : 'Previous testimonial'}
                >
                  <ChevronLeft className={`h-5 w-5 ${isRtl ? 'rotate-180' : ''}`} />
                </button>

                <div className="flex items-center gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeTestimonial === idx ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200 dark:bg-slate-700'
                      }`}
                      aria-label={`${isRtl ? 'الانتقال إلى الشريحة' : 'Go to slide'} ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={isRtl ? handlePrevTest : handleNextTest}
                  className="p-3.5 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all hover:scale-105 shadow-sm cursor-pointer"
                  aria-label={isRtl ? 'التقييم التالي' : 'Next testimonial'}
                >
                  <ChevronRight className={`h-5 w-5 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <Faq />
        </div>
      </div>
    </div>
  );
}
