import React from 'react';
import { useLanguage } from '../LanguageContext';
import { ArrowLeft, Building2, Mail, Phone, Scale } from 'lucide-react';

interface ImpressumProps {
  onBack: () => void;
}

export default function Impressum({ onBack }: ImpressumProps) {
  const { language, isRtl } = useLanguage();

  const content = {
    en: {
      title: 'Imprint',
      subtitle: 'Legal disclosures and company credentials.',
      tmg: 'Information according to § 5 TMG (German Telemedia Act)',
      operator: 'Operator of the website:',
      company: 'Zenomix Services UG (haftungsbeschränkt)',
      address: '[Street and number], [Postcode and town], Germany',
      represented: 'Represented by:',
      directors: '[Name of the managing director]',
      contact: 'Contact:',
      phone: 'Phone: [telephone number]',
      email: 'Email: Zenomix.de',
      registry: 'Register entry:',
      registryDesc: 'Registry Court: [competent local court]\nRegister number: [HRB number]',
      vat: 'VAT ID:',
      vatDesc: 'Sales tax identification number according to § 27 a Umsatzsteuergesetz:\n[USt-IdNr. / VAT ID]',
      disclaimer: 'Disclaimer / Legal Notice',
      disclaimerDesc: 'The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr. We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.',
      back: 'Back to Home'
    },
    ar: {
      title: 'بيانات الشركة (Impressum)',
      subtitle: 'الإفصاحات القانونية والمستندات الرسمية للشركة.',
      tmg: 'معلومات بموجب الفقرة 5 من قانون وسائل الإعلام الألماني (TMG)',
      operator: 'الجهة المشغلة للموقع الإلكتروني:',
      company: 'Zenomix Services UG (haftungsbeschränkt)',
      address: '[الشارع ورقم المبنى]، [الرمز البريدي والمدينة]، ألمانيا',
      represented: 'يمثلها قانونياً:',
      directors: '[اسم المدير المفوّض]',
      contact: 'الاتصال والاتصالات:',
      phone: 'الهاتف: [رقم الهاتف]',
      email: 'البريد الإلكتروني: Zenomix.de',
      registry: 'بيانات السجل التجاري:',
      registryDesc: 'محكمة السجل: [المحكمة المختصة]\nرقم السجل: [رقم السجل التجاري]',
      vat: 'الرقم الضريبي المضاف:',
      vatDesc: 'الرقم التعريفي لضريبة القيمة المضافة بموجب المادة 27 أ من قانون ضريبة المبيعات الألماني:\n[USt-IdNr. / VAT ID]',
      disclaimer: 'تسوية النزاعات وإشعار إخلاء المسؤولية',
      disclaimerDesc: 'توفر المفوضية الأوروبية منصة لتسوية النزاعات عبر الإنترنت (ODR): https://ec.europa.eu/consumers/odr. نحن لسنا مستعدين ولا ملزمين بالمشاركة في إجراءات تسوية المنازعات أمام هيئة تحكيم المستهلك.',
      back: 'العودة للرئيسية'
    },
    de: {
      title: 'Impressum',
      subtitle: 'Gesetzliche Pflichtangaben und Unternehmensdaten.',
      tmg: 'Angaben gemäß § 5 TMG',
      operator: 'Betreiber der Website:',
      company: 'Zenomix Services UG (haftungsbeschränkt)',
      address: '[Straße und Hausnummer], [PLZ und Ort], Deutschland',
      represented: 'Vertreten durch:',
      directors: '[Name der Geschäftsführung]',
      contact: 'Kontakt:',
      phone: 'Telefon: [Telefonnummer]',
      email: 'E-Mail: Zenomix.de',
      registry: 'Registereintrag:',
      registryDesc: 'Registergericht: [zuständiges Amtsgericht]\nRegisternummer: [HRB-Nummer]',
      vat: 'Umsatzsteuer-ID:',
      vatDesc: 'Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:\n[USt-IdNr. / VAT ID]',
      disclaimer: 'Streitschlichtung',
      disclaimerDesc: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr. Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.',
      back: 'Zurück zur Startseite'
    }
  };

  const tLocal = content[language] || content.en;

  return (
    <section className="py-32 relative overflow-hidden bg-slate-50 dark:bg-slate-950 min-h-[60vh] flex items-center">
      {/* Background visual highlights */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-50/40 dark:bg-blue-950/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-indigo-50/30 dark:bg-indigo-950/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Back Button */}
        <div className={`flex ${isRtl ? 'justify-end' : 'justify-start'}`}>
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-350 transition-all cursor-pointer hover:scale-105 active:scale-95 mb-8 ${
              isRtl ? 'flex-row-reverse' : ''
            }`}
          >
            <ArrowLeft className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
            <span>{tLocal.back}</span>
          </button>
        </div>

        {/* Card Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm dark:shadow-none">
          {/* Header */}
          <div className={`border-b border-slate-100 dark:border-slate-850 pb-8 mb-8 ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 px-4 py-1 rounded-full mb-4">
              <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
                ZENOMIX LEGAL
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {tLocal.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-base font-normal">
              {tLocal.subtitle}
            </p>
          </div>

          {/* Legal Content Grid */}
          <div className={`space-y-8 ${isRtl ? 'text-right' : 'text-left'}`}>
            
            {/* TMG Disclaimer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-2xl">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-550 uppercase tracking-wider font-mono">
                {tLocal.tmg}
              </p>
            </div>

            {/* Operator and Address */}
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                  {tLocal.operator}
                </h3>
                <p className="text-base font-extrabold text-slate-800 dark:text-slate-200">
                  {tLocal.company}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed whitespace-pre-line">
                  {tLocal.address}
                </p>
              </div>

              {/* Directors */}
              <div>
                <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                  {tLocal.represented}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  {tLocal.directors}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60">
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
                {tLocal.contact}
              </h3>
              <div className={`flex flex-col sm:flex-row gap-6 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="text-sm font-medium">{tLocal.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="text-sm font-medium">{tLocal.email}</span>
                </div>
              </div>
            </div>

            {/* Registry and Tax */}
            <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t border-slate-100 dark:border-slate-800/60">
              <div>
                <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                  {tLocal.registry}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                  {tLocal.registryDesc}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                  {tLocal.vat}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line font-medium">
                  {tLocal.vatDesc}
                </p>
              </div>
            </div>

            {/* Dispute Resolution */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {tLocal.disclaimer}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-450 leading-relaxed font-normal">
                {tLocal.disclaimerDesc}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
