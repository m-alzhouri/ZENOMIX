import React, { createContext, useContext, useState, useEffect } from 'react';
import { enTranslations, arTranslations, deTranslations, servicesData_ar, servicesData_de, fleetData_ar, fleetData_de, testimonialsData_ar, testimonialsData_de } from './translations';
import { servicesData, fleetData, testimonialsData } from './data';
import { ServiceItem, FleetVehicle, Testimonial } from './types';

type Language = 'en' | 'ar' | 'de';

interface LanguageContextProps {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: keyof typeof enTranslations) => string;
  isRtl: boolean;
  services: ServiceItem[];
  fleet: FleetVehicle[];
  testimonials: Testimonial[];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      if (saved === 'ar' || saved === 'en' || saved === 'de') return saved;
      // First visit: default to German
      return 'de';
    }
    return 'de';
  });

  const isRtl = language === 'ar';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    }
  }, [language, isRtl]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: keyof typeof enTranslations): string => {
    const dictMap: Record<Language, typeof enTranslations> = {
      en: enTranslations,
      ar: arTranslations,
      de: deTranslations,
    };
    const dict = dictMap[language];
    return dict[key] || enTranslations[key] || '';
  };

  // Select appropriate collections based on language
  const dataMap = {
    en: { services: servicesData, fleet: fleetData, testimonials: testimonialsData },
    ar: { services: servicesData_ar, fleet: fleetData_ar, testimonials: testimonialsData_ar },
    de: { services: servicesData_de, fleet: fleetData_de, testimonials: testimonialsData_de },
  };

  const { services, fleet, testimonials } = dataMap[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
        isRtl,
        services,
        fleet,
        testimonials,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
