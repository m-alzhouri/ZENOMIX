import React from 'react';
import { useLanguage } from '../LanguageContext';
import { ArrowLeft, Shield, Eye, Lock, FileText, Server } from 'lucide-react';

interface DatenschutzProps {
  onBack: () => void;
}

export default function Datenschutz({ onBack }: DatenschutzProps) {
  const { language, isRtl } = useLanguage();

  const content = {
    en: {
      title: 'Privacy Policy',
      subtitle: 'Information on how we handle and protect your personal data.',
      back: 'Back to Home',
      introTitle: '1. Data Protection at a Glance',
      introDesc: 'We take the protection of your personal data very seriously. Personal data is any data with which you can be personally identified. The following policy provides a detailed overview of what happens to your data when you visit our website.',
      collectionTitle: '2. Data Collection on Our Website',
      collectionSubtitle: 'How do we collect your data?',
      collectionDesc1: 'On one hand, your data is collected when you communicate it to us. This can, for example, be data that you enter in our contact form or our shipment calculator.',
      collectionDesc2: 'Other data is collected automatically by our IT systems when you visit the website. This is primarily technical data (e.g. internet browser, operating system, or page load times). This data is collected automatically as soon as you enter our website.',
      purposeTitle: 'Wofür nutzen wir Ihre Daten? / What do we use your data for?',
      purposeDesc: 'Part of the data is collected to ensure the error-free provision of the website. Other data can be used to analyse your user behaviour or to simulate transport quotes in our calculator.',
      telemetryTitle: '3. Telemetry & Live Mock Tracking Disclosures',
      telemetryDesc: 'The route and shift overview shown on this site is a demonstration and runs entirely client-side. The route numbers and assignment logs in that panel are generated locally in your browser. No real assignment data, driver records or movement profiles are uploaded to external servers.',
      rightsTitle: '4. Your Rights Regarding Your Data',
      rightsDesc: 'You always have the right to receive information about the origin, recipient, and purpose of your stored personal data free of charge. You also have a right to request the correction, blocking, or deletion of this data. You can contact us at any time at the address given in the imprint for this and other questions on the subject of data protection.',
      cookiesTitle: '5. Cookies and Session State Logs',
      cookiesDesc: 'Our website uses cookies and browser local storage to save your language preference and your active session ledger logs (e.g. submitted ticket history). You can clear these logs at any time in the contact ticket ledger panel or by clearing your browser cache.'
    },
    ar: {
      title: 'سياسة الخصوصية (Datenschutz)',
      subtitle: 'معلومات حول كيفية تعاملنا مع بياناتك الشخصية وحمايتها.',
      back: 'العودة للرئيسية',
      introTitle: '1. لمحة عامة عن حماية البيانات',
      introDesc: 'نحن نأخذ حماية بياناتك الشخصية على محمل الجد. البيانات الشخصية هي أي بيانات يمكن من خلالها تحديد هويتك الشخصية. توفر السياسة التالية نظرة عامة مفصلة حول ما يحدث لبياناتك عند زيارتك لموقعنا الإلكتروني.',
      collectionTitle: '2. جمع البيانات على موقعنا الإلكتروني',
      collectionSubtitle: 'كيف نقوم بجمع بياناتك؟',
      collectionDesc1: 'من ناحية، يتم جمع بياناتك عندما تقدمها لنا بنفسك. يمكن أن يكون هذا، على سبيل المثال، البيانات التي تدخلها في نموذج الاتصال أو حاسبة الشحن الخاصة بنا.',
      collectionDesc2: 'يتم جمع البيانات الأخرى تلقائياً بواسطة أنظمة تكنولوجيا المعلومات لدينا عند زيارتك للموقع. هذه في الغالب بيانات تقنية (مثل متصفح الإنترنت، أو نظام التشغيل، أو أوقات تحميل الصفحة). يتم جمع هذه البيانات تلقائياً بمجرد دخولك إلى موقعنا.',
      purposeTitle: 'فيمَ نستخدم بياناتك؟',
      purposeDesc: 'يتم جمع جزء من البيانات لضمان توفير الموقع الإلكتروني خالي من الأخطاء. ويمكن استخدام البيانات الأخرى لتحليل سلوك المستخدم أو لمحاكاة عروض أسعار النقل في الحاسبة الخاصة بنا.',
      telemetryTitle: '3. إفصاحات التتبع والقياس عن بعد والمحاكاة الحية',
      telemetryDesc: 'إن عرض المهام والورديات على هذا الموقع هو عرض توضيحي يعمل بالكامل على جانب العميل (Client-Side). تُنشأ أرقام المهام وسجلات التنفيذ في تلك اللوحة محلياً داخل متصفحك. ولا يتم رفع أي بيانات مهام حقيقية أو سجلات سائقين أو ملفات حركة إلى خوادم خارجية.',
      rightsTitle: '4. حقوقك المتعلقة ببياناتك الشخصية',
      rightsDesc: 'لديك دائماً الحق في الحصول على معلومات مجانية حول مصدر بياناتك الشخصية المخزنة ومستلمها والغرض منها. لديك أيضاً الحق في طلب تصحيح هذه البيانات أو حظرها أو حذفها. يمكنك الاتصال بنا في أي وقت على العنوان المذكور في بيانات الشركة (Impressum) لطرح هذا السؤال وغيره من الأسئلة المتعلقة بحماية البيانات.',
      cookiesTitle: '5. ملفات تعريف الارتباط وسجلات الجلسة المحلية',
      cookiesDesc: 'يستخدم موقعنا ملفات تعريف الارتباط والتخزين المحلي للمتصفح لحفظ اللغة المفضلة لديك وسجلات الجلسة النشطة (مثل سجل التذاكر المرسلة). يمكنك حذف هذه السجلات في أي وقت من لوحة التحكم بـ سجل التذاكر أو عبر مسح ذاكرة التخزين المؤقت لمتصفحك.'
    },
    de: {
      title: 'Datenschutzerklärung',
      subtitle: 'Informationen darüber, wie wir Ihre personenbezogenen Daten behandeln und schützen.',
      back: 'Zurück zur Startseite',
      introTitle: '1. Datenschutz auf einen Blick',
      introDesc: 'Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Die folgende Erklärung gibt einen detaillierten Überblick darüber, was mit Ihren Daten geschieht, wenn Sie unsere Website besuchen.',
      collectionTitle: '2. Datenerfassung auf unserer Website',
      collectionSubtitle: 'Wie erfassen wir Ihre Daten?',
      collectionDesc1: 'Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in unser Kontaktformular oder unseren Kostenrechner eingeben.',
      collectionDesc2: 'Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.',
      purposeTitle: 'Wofür nutzen wir Ihre Daten?',
      purposeDesc: 'Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens oder zur Simulation von Transportangeboten in unserem Kostenrechner verwendet werden.',
      telemetryTitle: '3. Telemetrie & Simulationsdaten-Hinweis',
      telemetryDesc: 'Die auf dieser Website gezeigte Touren- und Schichtübersicht ist eine Demonstration und läuft vollständig clientseitig ab. Die dort angezeigten Tour-Nummern und Einsatzprotokolle werden lokal in Ihrem Browser erzeugt. Es werden keine echten Auftragsdaten, Fahrerdaten oder Bewegungsprofile auf externe Server übertragen.',
      rightsTitle: '4. Ihre Rechte bezüglich Ihrer Daten',
      rightsDesc: 'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.',
      cookiesTitle: '5. Cookies und Session-Verlaufsprotokolle',
      cookiesDesc: 'Unsere Website verwendet Cookies und das LocalStorage des Browsers, um Ihre Sprachauswahl und den Verlauf Ihrer Session-Einträge (z. B. das lokale Ticketprotokoll) zu speichern. Sie können diese Einträge jederzeit im Verlaufspanel des Kontaktformulars löschen oder Ihren Browser-Cache leeren.'
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
              <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
                DATA SECURITY
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {tLocal.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-base font-normal">
              {tLocal.subtitle}
            </p>
          </div>

          {/* Legal Content List */}
          <div className={`space-y-8 ${isRtl ? 'text-right' : 'text-left'}`}>
            
            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2.5">
                <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                {tLocal.introTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {tLocal.introDesc}
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800/60">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2.5">
                <Server className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                {tLocal.collectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-655 font-bold text-slate-700 dark:text-slate-355">
                {tLocal.collectionSubtitle}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {tLocal.collectionDesc1}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {tLocal.collectionDesc2}
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {tLocal.purposeDesc}
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800/60">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2.5">
                <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                {tLocal.telemetryTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {tLocal.telemetryDesc}
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800/60">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                {tLocal.rightsTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {tLocal.rightsDesc}
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800/60">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2.5">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                {tLocal.cookiesTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {tLocal.cookiesDesc}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
