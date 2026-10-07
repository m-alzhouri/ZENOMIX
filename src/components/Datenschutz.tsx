import React from 'react';
import { useLanguage } from '../LanguageContext';
import {
  ArrowLeft, Shield, Building2, Eye, Server, Lock, HardDrive, Type, Mail, MessageCircle,
  Route, UserCheck, ShieldAlert, Scale, Info, LucideIcon
} from 'lucide-react';

interface DatenschutzProps {
  onBack: () => void;
}

interface PrivacySection {
  icon: LucideIcon;
  title: string;
  paragraphs: string[];
  // Art. 21 GDPR requires the right to object to be presented separately and prominently
  highlight?: boolean;
}

interface PrivacyContent {
  title: string;
  subtitle: string;
  back: string;
  updated: string;
  translationNote?: string;
  sections: PrivacySection[];
}

// Renders URLs and e-mail addresses inside the legal text as links
const LINK_PATTERN = /(https?:\/\/[^\s)]*[^\s).,]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

function linkify(text: string) {
  return text.split(LINK_PATTERN).map((part, i) => {
    if (i % 2 === 0) return part;
    const href = part.includes('@') && !part.startsWith('http') ? `mailto:${part}` : part;
    return (
      <a
        key={i}
        href={href}
        dir="ltr"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-blue-600 dark:text-blue-400 underline underline-offset-2 break-all hover:text-blue-700 dark:hover:text-blue-300"
      >
        {part}
      </a>
    );
  });
}

export default function Datenschutz({ onBack }: DatenschutzProps) {
  const { language, isRtl } = useLanguage();

  const content: Record<'en' | 'ar' | 'de', PrivacyContent> = {
    de: {
      title: 'Datenschutzerklärung',
      subtitle: 'Informationen nach Art. 13 DSGVO darüber, welche personenbezogenen Daten wir auf dieser Website verarbeiten.',
      back: 'Zurück zur Startseite',
      updated: 'Stand: Oktober 2026',
      sections: [
        {
          icon: Building2,
          title: '1. Verantwortlicher',
          paragraphs: [
            'Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:',
            'Zenomix GbR\nvertreten durch die Gesellschafter Alan Abbas und Mounzer Annouz\nDithmarscher Straße 19\n26723 Emden\nDeutschland',
            'Telefon: +49 1577 7268389\nE-Mail: info@zenomix.de'
          ]
        },
        {
          icon: Eye,
          title: '2. Datenschutz auf einen Blick',
          paragraphs: [
            'Wir verarbeiten personenbezogene Daten nur, soweit dies für die Bereitstellung dieser Website und die Bearbeitung Ihrer Anfragen erforderlich ist.',
            'Diese Website setzt keine Cookies. Sie verwendet keine Analyse- oder Tracking-Werkzeuge (z. B. Google Analytics), keine Werbe- oder Social-Media-Pixel und bindet keine Inhalte von Drittanbietern wie Google Fonts, Google Maps oder YouTube ein. Ein Cookie-Banner ist deshalb nicht erforderlich.'
          ]
        },
        {
          icon: Server,
          title: '3. Hosting und Server-Logfiles',
          paragraphs: [
            'Diese Website wird bei GitHub Pages gehostet, einem Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.',
            'Beim Aufruf der Website verarbeitet GitHub Daten, die Ihr Browser automatisch übermittelt (Server-Logfiles): IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite bzw. Datei, Referrer-URL, Browsertyp und -version sowie Betriebssystem. Nach Angaben von GitHub wird die IP-Adresse dabei zu Sicherheitszwecken protokolliert. Ohne diese Verarbeitung kann die Website nicht ausgeliefert werden.',
            'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in einer sicheren, stabilen und effizienten Bereitstellung der Website.',
            'Dabei können Daten in die USA übermittelt werden. GitHub, Inc. ist nach dem EU-US Data Privacy Framework zertifiziert, sodass für die Übermittlung ein Angemessenheitsbeschluss der EU-Kommission besteht (Art. 45 DSGVO). Weitere Informationen: https://docs.github.com/privacy'
          ]
        },
        {
          icon: Lock,
          title: '4. SSL-/TLS-Verschlüsselung',
          paragraphs: [
            'Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an „https://“ und dem Schloss-Symbol in der Adresszeile Ihres Browsers. Daten, die Sie an uns übermitteln, etwa über das Kontaktformular, können so nicht von Dritten mitgelesen werden.'
          ]
        },
        {
          icon: HardDrive,
          title: '5. Lokale Speicherung im Browser (keine Cookies)',
          paragraphs: [
            'Damit die Website Ihre Einstellungen behält, speichert sie im lokalen Speicher Ihres Browsers (LocalStorage) ausschließlich zwei Werte: die gewählte Sprache (Schlüssel „language“) und die helle bzw. dunkle Darstellung (Schlüssel „theme“). Diese Werte verlassen Ihr Gerät nicht, werden weder an uns noch an Dritte übertragen und lassen keinen Rückschluss auf Ihre Person zu.',
            'Die Speicherung ist für die von Ihnen gewünschte Funktion unbedingt erforderlich und daher nach § 25 Abs. 2 Nr. 2 TDDDG ohne Einwilligung zulässig. Sie können die Werte jederzeit löschen, indem Sie die Websitedaten in Ihrem Browser entfernen.'
          ]
        },
        {
          icon: Type,
          title: '6. Schriftarten',
          paragraphs: [
            'Die verwendeten Schriftarten (Cairo, Inter, Space Grotesk, JetBrains Mono) werden lokal von unserem eigenen Webspace geladen. Beim Aufruf der Website wird keine Verbindung zu Servern von Google oder anderen Schriftanbietern hergestellt.'
          ]
        },
        {
          icon: Mail,
          title: '7. Kontaktformular',
          paragraphs: [
            'Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir Ihre Angaben (Name, E-Mail-Adresse, gewähltes Thema, Nachricht), um Ihre Anfrage zu bearbeiten und Rückfragen zu beantworten.',
            'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit einem Vertrag zusammenhängt oder der Durchführung vorvertraglicher Maßnahmen dient. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).',
            'Für den Versand des Formulars nutzen wir den Dienst Formspree der Formspree, Inc. (USA). Beim Absenden werden Ihre Eingaben sowie Ihre IP-Adresse und technische Verbindungsdaten direkt an Formspree übertragen und von dort per E-Mail an uns weitergeleitet. Formspree verarbeitet die Daten in unserem Auftrag (Art. 28 DSGVO). Die Übermittlung in die USA erfolgt auf Grundlage der Standardvertragsklauseln der EU-Kommission (Art. 46 Abs. 2 lit. c DSGVO). Weitere Informationen: https://formspree.io/legal/privacy-policy/',
            'Die Liste „Lokales Sitzungsprotokoll“, die nach dem Absenden unter dem Formular erscheint, existiert nur im Arbeitsspeicher Ihres Browsers und wird beim Neuladen oder Schließen der Seite automatisch gelöscht.',
            'Wir löschen Ihre Anfrage, sobald sie abschließend bearbeitet ist, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen (z. B. handels- und steuerrechtliche Fristen von bis zu zehn Jahren für Geschäftskorrespondenz).'
          ]
        },
        {
          icon: MessageCircle,
          title: '8. Kontakt per E-Mail, Telefon oder WhatsApp',
          paragraphs: [
            'Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir Ihre Angaben (z. B. Name, Telefonnummer, E-Mail-Adresse und Inhalt Ihres Anliegens) zur Bearbeitung Ihrer Anfrage. Rechtsgrundlagen und Speicherdauer richten sich nach Abschnitt 7.',
            'Diese Website enthält Links zu WhatsApp. Solange Sie einen solchen Link nicht anklicken, werden keine Daten an WhatsApp übertragen. Wenn Sie uns über WhatsApp schreiben, nutzen Sie den Dienst der WhatsApp Ireland Limited (Meta-Konzern); dabei können Daten auch in die USA übermittelt werden. Es gelten die Datenschutzbestimmungen von WhatsApp: https://www.whatsapp.com/legal/privacy-policy-eea',
            'Wenn Sie das nicht möchten, erreichen Sie uns jederzeit per E-Mail oder Telefon.'
          ]
        },
        {
          icon: Route,
          title: '9. Touren-Demo',
          paragraphs: [
            'Die Touren- und Schichtübersicht läuft vollständig in Ihrem Browser. Ihre Eingaben werden weder an uns noch an Dritte übertragen und nicht gespeichert. Die angezeigten Tour-Nummern und Einsatzprotokolle sind lokal erzeugte Beispieldaten; echte Auftrags-, Fahrer- oder Bewegungsdaten werden nicht verarbeitet.'
          ]
        },
        {
          icon: UserCheck,
          title: '10. Ihre Rechte',
          paragraphs: [
            'Sie haben im Rahmen der gesetzlichen Bestimmungen jederzeit das Recht auf:\n• Auskunft über Ihre bei uns gespeicherten Daten (Art. 15 DSGVO)\n• Berichtigung unrichtiger Daten (Art. 16 DSGVO)\n• Löschung (Art. 17 DSGVO)\n• Einschränkung der Verarbeitung (Art. 18 DSGVO)\n• Datenübertragbarkeit (Art. 20 DSGVO)\n• Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)',
            'Dafür genügt eine formlose Nachricht an info@zenomix.de oder an unsere oben genannte Anschrift.'
          ]
        },
        {
          icon: ShieldAlert,
          title: '11. Widerspruchsrecht (Art. 21 DSGVO)',
          highlight: true,
          paragraphs: [
            'Soweit wir Ihre Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeiten, haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch gegen diese Verarbeitung einzulegen. Wir verarbeiten die Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.'
          ]
        },
        {
          icon: Scale,
          title: '12. Beschwerderecht bei der Aufsichtsbehörde',
          paragraphs: [
            'Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Für uns zuständig ist:',
            'Landesbeauftragte für den Datenschutz Niedersachsen\nPrinzenstraße 5\n30159 Hannover\nhttps://www.lfd.niedersachsen.de'
          ]
        },
        {
          icon: Info,
          title: '13. Weitere Hinweise',
          paragraphs: [
            'Sie sind weder gesetzlich noch vertraglich verpflichtet, uns personenbezogene Daten bereitzustellen. Ohne Name, E-Mail-Adresse und Nachricht können wir eine Anfrage über das Kontaktformular jedoch nicht bearbeiten.',
            'Eine automatisierte Entscheidungsfindung einschließlich Profiling (Art. 22 DSGVO) findet nicht statt.',
            'Wir passen diese Datenschutzerklärung an, sobald sich die Website oder die Rechtslage ändert.'
          ]
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'Information pursuant to Art. 13 GDPR on which personal data we process on this website.',
      back: 'Back to Home',
      updated: 'Last updated: October 2026',
      translationNote: 'This translation is provided for convenience only. The German version is legally binding.',
      sections: [
        {
          icon: Building2,
          title: '1. Controller',
          paragraphs: [
            'The controller responsible for data processing on this website within the meaning of the General Data Protection Regulation (GDPR) is:',
            'Zenomix GbR\nrepresented by the partners Alan Abbas and Mounzer Annouz\nDithmarscher Straße 19\n26723 Emden\nGermany',
            'Phone: +49 1577 7268389\nEmail: info@zenomix.de'
          ]
        },
        {
          icon: Eye,
          title: '2. Data protection at a glance',
          paragraphs: [
            'We only process personal data to the extent necessary to provide this website and to handle your enquiries.',
            'This website does not set any cookies. It does not use analytics or tracking tools (e.g. Google Analytics), advertising or social media pixels, and does not embed third-party content such as Google Fonts, Google Maps or YouTube. A cookie banner is therefore not required.'
          ]
        },
        {
          icon: Server,
          title: '3. Hosting and server log files',
          paragraphs: [
            'This website is hosted on GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.',
            'When you visit the website, GitHub processes data that your browser transmits automatically (server log files): IP address, date and time of access, requested page or file, referrer URL, browser type and version, and operating system. According to GitHub, the IP address is logged for security purposes. The website cannot be delivered without this processing.',
            'The legal basis is Art. 6(1)(f) GDPR. Our legitimate interest lies in the secure, stable and efficient provision of the website.',
            'Data may be transferred to the USA in this context. GitHub, Inc. is certified under the EU-U.S. Data Privacy Framework, so the transfer is covered by an adequacy decision of the European Commission (Art. 45 GDPR). More information: https://docs.github.com/privacy'
          ]
        },
        {
          icon: Lock,
          title: '4. SSL/TLS encryption',
          paragraphs: [
            'For security reasons, this website uses SSL/TLS encryption. You can recognise an encrypted connection by "https://" and the padlock icon in your browser\'s address bar. Data you send to us, for example via the contact form, cannot be read by third parties.'
          ]
        },
        {
          icon: HardDrive,
          title: '5. Local storage in your browser (no cookies)',
          paragraphs: [
            'So that the website remembers your settings, it stores exactly two values in your browser\'s local storage: the selected language (key "language") and the light or dark display mode (key "theme"). These values never leave your device, are not transmitted to us or to third parties and do not identify you.',
            'This storage is strictly necessary for the function you requested and is therefore permitted without consent under Section 25(2) no. 2 TDDDG (German Telecommunications Digital Services Data Protection Act). You can delete the values at any time by clearing the site data in your browser.'
          ]
        },
        {
          icon: Type,
          title: '6. Fonts',
          paragraphs: [
            'The fonts used (Cairo, Inter, Space Grotesk, JetBrains Mono) are loaded locally from our own web space. No connection is made to servers of Google or other font providers when you visit the website.'
          ]
        },
        {
          icon: Mail,
          title: '7. Contact form',
          paragraphs: [
            'If you send us an enquiry via the contact form, we process the details you provide (name, email address, selected topic, message) in order to handle your enquiry and answer follow-up questions.',
            'The legal basis is Art. 6(1)(b) GDPR where your enquiry relates to a contract or to pre-contractual measures. In all other cases, the processing is based on our legitimate interest in handling enquiries addressed to us (Art. 6(1)(f) GDPR).',
            'To send the form we use the service Formspree, provided by Formspree, Inc. (USA). On submission, your input as well as your IP address and technical connection data are transmitted directly to Formspree and forwarded to us by email. Formspree processes the data on our behalf (Art. 28 GDPR). The transfer to the USA is based on the European Commission\'s Standard Contractual Clauses (Art. 46(2)(c) GDPR). More information: https://formspree.io/legal/privacy-policy/',
            'The "Local Session Log" list that appears below the form after submission exists only in your browser\'s memory and is deleted automatically when you reload or close the page.',
            'We delete your enquiry once it has been fully dealt with, unless statutory retention obligations apply (e.g. commercial and tax retention periods of up to ten years for business correspondence).'
          ]
        },
        {
          icon: MessageCircle,
          title: '8. Contact by email, phone or WhatsApp',
          paragraphs: [
            'If you contact us by email or phone, we process your details (e.g. name, phone number, email address and the content of your request) to handle your enquiry. Legal bases and retention periods are as described in section 7.',
            'This website contains links to WhatsApp. No data is transmitted to WhatsApp unless you click such a link. If you message us via WhatsApp, you use the service of WhatsApp Ireland Limited (Meta group); data may also be transferred to the USA. WhatsApp\'s privacy policy applies: https://www.whatsapp.com/legal/privacy-policy-eea',
            'If you prefer not to use WhatsApp, you can reach us by email or phone at any time.'
          ]
        },
        {
          icon: Route,
          title: '9. Route demo',
          paragraphs: [
            'The route and shift overview runs entirely in your browser. Your input is not transmitted to us or to third parties and is not stored. The route numbers and dispatch logs shown are sample data generated locally; no real order, driver or movement data is processed.'
          ]
        },
        {
          icon: UserCheck,
          title: '10. Your rights',
          paragraphs: [
            'Within the scope of the statutory provisions, you have the right at any time to:\n• access the data we hold about you (Art. 15 GDPR)\n• rectification of inaccurate data (Art. 16 GDPR)\n• erasure (Art. 17 GDPR)\n• restriction of processing (Art. 18 GDPR)\n• data portability (Art. 20 GDPR)\n• withdraw any consent given, with effect for the future (Art. 7(3) GDPR)',
            'An informal message to info@zenomix.de or to our postal address above is sufficient.'
          ]
        },
        {
          icon: ShieldAlert,
          title: '11. Right to object (Art. 21 GDPR)',
          highlight: true,
          paragraphs: [
            'Where we process your data on the basis of Art. 6(1)(f) GDPR, you have the right to object to this processing at any time on grounds relating to your particular situation. We will then no longer process the data unless we can demonstrate compelling legitimate grounds that override your interests, rights and freedoms, or the processing serves the establishment, exercise or defence of legal claims.'
          ]
        },
        {
          icon: Scale,
          title: '12. Right to lodge a complaint',
          paragraphs: [
            'You have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR). The authority responsible for us is:',
            'Landesbeauftragte für den Datenschutz Niedersachsen\nPrinzenstraße 5\n30159 Hannover, Germany\nhttps://www.lfd.niedersachsen.de'
          ]
        },
        {
          icon: Info,
          title: '13. Further information',
          paragraphs: [
            'You are not legally or contractually obliged to provide personal data. However, without your name, email address and message we cannot process an enquiry submitted via the contact form.',
            'No automated decision-making, including profiling (Art. 22 GDPR), takes place.',
            'We will update this privacy policy whenever the website or the legal situation changes.'
          ]
        }
      ]
    },
    ar: {
      title: 'سياسة الخصوصية (Datenschutz)',
      subtitle: 'معلومات وفقاً للمادة 13 من اللائحة العامة لحماية البيانات (GDPR) حول البيانات الشخصية التي نعالجها على هذا الموقع.',
      back: 'العودة للرئيسية',
      updated: 'آخر تحديث: أكتوبر 2026',
      translationNote: 'هذه الترجمة مقدَّمة للتيسير فقط، والنسخة الألمانية هي الملزمة قانونياً.',
      sections: [
        {
          icon: Building2,
          title: '1. الجهة المسؤولة',
          paragraphs: [
            'الجهة المسؤولة عن معالجة البيانات على هذا الموقع بالمعنى الوارد في اللائحة العامة لحماية البيانات (GDPR) هي:',
            '⁦Zenomix GbR⁩\nيمثلها الشريكان ⁦Alan Abbas⁩ و⁦Mounzer Annouz⁩\n⁦Dithmarscher Straße 19⁩\n⁦26723 Emden⁩، ألمانيا',
            'الهاتف: ⁦+49 1577 7268389⁩\nالبريد الإلكتروني: info@zenomix.de'
          ]
        },
        {
          icon: Eye,
          title: '2. لمحة عامة عن حماية البيانات',
          paragraphs: [
            'نعالج البيانات الشخصية فقط بالقدر اللازم لتشغيل هذا الموقع والرد على استفساراتكم.',
            'لا يستخدم هذا الموقع ملفات تعريف الارتباط (Cookies)، ولا أدوات تحليل أو تتبع (مثل Google Analytics)، ولا بكسلات إعلانية أو بكسلات وسائل التواصل الاجتماعي، ولا يدمج محتوى من جهات خارجية مثل Google Fonts أو Google Maps أو YouTube. لذلك لا حاجة إلى لافتة موافقة على ملفات تعريف الارتباط.'
          ]
        },
        {
          icon: Server,
          title: '3. الاستضافة وسجلات الخادم',
          paragraphs: [
            'يُستضاف هذا الموقع على GitHub Pages، وهي خدمة تابعة لشركة ⁦GitHub, Inc.⁩، ⁦88 Colin P. Kelly Jr. Street, San Francisco, CA 94107⁩، الولايات المتحدة الأمريكية.',
            'عند زيارة الموقع تعالج GitHub البيانات التي يرسلها متصفحك تلقائياً (سجلات الخادم): عنوان IP، وتاريخ ووقت الوصول، والصفحة أو الملف المطلوب، والرابط المُحيل، ونوع المتصفح وإصداره، ونظام التشغيل. ووفقاً لـ GitHub يُسجَّل عنوان IP لأغراض أمنية. ولا يمكن عرض الموقع دون هذه المعالجة.',
            'الأساس القانوني هو المادة 6 (1) (و) من اللائحة العامة لحماية البيانات. وتتمثل مصلحتنا المشروعة في توفير الموقع بشكل آمن ومستقر وفعّال.',
            'قد تُنقل البيانات في هذا السياق إلى الولايات المتحدة. وشركة ⁦GitHub, Inc.⁩ معتمدة وفق إطار خصوصية البيانات بين الاتحاد الأوروبي والولايات المتحدة (EU-U.S. Data Privacy Framework)، وبالتالي يغطي النقلَ قرارُ الكفاية الصادر عن المفوضية الأوروبية (المادة 45). لمزيد من المعلومات: https://docs.github.com/privacy'
          ]
        },
        {
          icon: Lock,
          title: '4. تشفير SSL/TLS',
          paragraphs: [
            'يستخدم هذا الموقع لأسباب أمنية تشفير SSL/TLS. يمكنك التعرف على الاتصال المشفَّر من خلال „https://“ ورمز القفل في شريط العنوان. وبذلك لا يمكن لأطراف ثالثة الاطلاع على البيانات التي ترسلها إلينا، مثل بيانات نموذج الاتصال.'
          ]
        },
        {
          icon: HardDrive,
          title: '5. التخزين المحلي في المتصفح (بدون ملفات تعريف الارتباط)',
          paragraphs: [
            'لكي يتذكر الموقع إعداداتك، يحفظ في التخزين المحلي لمتصفحك (LocalStorage) قيمتين فقط: اللغة المختارة (المفتاح „language“) ووضع العرض الفاتح أو الداكن (المفتاح „theme“). لا تغادر هذه القيم جهازك، ولا تُرسَل إلينا أو إلى أي طرف ثالث، ولا يمكن من خلالها التعرف على هويتك.',
            'هذا التخزين ضروري تماماً للوظيفة التي طلبتها، ولذلك فهو مسموح به دون موافقة وفقاً للمادة 25 (2) رقم 2 من القانون الألماني TDDDG. يمكنك حذف هذه القيم في أي وقت عبر مسح بيانات الموقع في متصفحك.'
          ]
        },
        {
          icon: Type,
          title: '6. الخطوط',
          paragraphs: [
            'يتم تحميل الخطوط المستخدمة (Cairo وInter وSpace Grotesk وJetBrains Mono) محلياً من مساحة الاستضافة الخاصة بنا. ولا يتم أي اتصال بخوادم Google أو غيرها من مزودي الخطوط عند زيارة الموقع.'
          ]
        },
        {
          icon: Mail,
          title: '7. نموذج الاتصال',
          paragraphs: [
            'عند إرسال استفسار عبر نموذج الاتصال، نعالج البيانات التي تقدمها (الاسم، والبريد الإلكتروني، والموضوع المختار، والرسالة) للرد على استفسارك والإجابة عن الأسئلة اللاحقة.',
            'الأساس القانوني هو المادة 6 (1) (ب) من اللائحة إذا كان استفسارك متعلقاً بعقد أو بإجراءات سابقة للتعاقد. وفي جميع الحالات الأخرى تستند المعالجة إلى مصلحتنا المشروعة في معالجة الاستفسارات الموجهة إلينا (المادة 6 (1) (و)).',
            'لإرسال النموذج نستخدم خدمة Formspree المقدَّمة من شركة ⁦Formspree, Inc.⁩ (الولايات المتحدة). عند الإرسال تُنقل مدخلاتك وعنوان IP وبيانات الاتصال التقنية مباشرة إلى Formspree، ثم تُحوَّل إلينا عبر البريد الإلكتروني. تعالج Formspree البيانات نيابةً عنا (المادة 28). ويستند النقل إلى الولايات المتحدة إلى البنود التعاقدية القياسية الصادرة عن المفوضية الأوروبية (المادة 46 (2) (ج)). لمزيد من المعلومات: https://formspree.io/legal/privacy-policy/',
            'قائمة „سجل الجلسة المحلي“ التي تظهر أسفل النموذج بعد الإرسال موجودة فقط في ذاكرة متصفحك، وتُحذف تلقائياً عند إعادة تحميل الصفحة أو إغلاقها.',
            'نحذف استفسارك بعد الانتهاء من معالجته، ما لم تمنع ذلك التزامات قانونية بالحفظ (مثل فترات الحفظ التجارية والضريبية التي تصل إلى عشر سنوات للمراسلات التجارية).'
          ]
        },
        {
          icon: MessageCircle,
          title: '8. التواصل عبر البريد الإلكتروني أو الهاتف أو واتساب',
          paragraphs: [
            'عند تواصلك معنا عبر البريد الإلكتروني أو الهاتف، نعالج بياناتك (مثل الاسم ورقم الهاتف والبريد الإلكتروني ومضمون طلبك) للرد على استفسارك. وتنطبق الأسس القانونية ومدد الحفظ الواردة في القسم 7.',
            'يحتوي هذا الموقع على روابط إلى واتساب. لا تُنقل أي بيانات إلى واتساب ما لم تنقر على أحد هذه الروابط. وعند مراسلتنا عبر واتساب فإنك تستخدم خدمة شركة ⁦WhatsApp Ireland Limited⁩ (مجموعة Meta)، وقد تُنقل البيانات أيضاً إلى الولايات المتحدة. وتسري سياسة الخصوصية الخاصة بواتساب: https://www.whatsapp.com/legal/privacy-policy-eea',
            'إذا كنت لا ترغب في ذلك، يمكنك التواصل معنا في أي وقت عبر البريد الإلكتروني أو الهاتف.'
          ]
        },
        {
          icon: Route,
          title: '9. العرض التوضيحي للجولات',
          paragraphs: [
            'تعمل نظرة الجولات والورديات بالكامل داخل متصفحك. لا تُرسَل مدخلاتك إلينا أو إلى أي طرف ثالث ولا تُحفظ. أرقام الجولات وسجلات التشغيل المعروضة هي بيانات نموذجية تُنشأ محلياً، ولا تتم معالجة أي بيانات حقيقية للطلبات أو السائقين أو التنقلات.'
          ]
        },
        {
          icon: UserCheck,
          title: '10. حقوقك',
          paragraphs: [
            'يحق لك في أي وقت وفي حدود الأحكام القانونية:\n• الاطلاع على بياناتك المخزنة لدينا (المادة 15)\n• تصحيح البيانات غير الصحيحة (المادة 16)\n• الحذف (المادة 17)\n• تقييد المعالجة (المادة 18)\n• نقل البيانات (المادة 20)\n• سحب الموافقة الممنوحة بأثر مستقبلي (المادة 7 (3))',
            'يكفي لذلك إرسال رسالة غير رسمية إلى info@zenomix.de أو إلى عنواننا البريدي المذكور أعلاه.'
          ]
        },
        {
          icon: ShieldAlert,
          title: '11. حق الاعتراض (المادة 21 من اللائحة)',
          highlight: true,
          paragraphs: [
            'إذا كنا نعالج بياناتك استناداً إلى المادة 6 (1) (و)، فيحق لك في أي وقت الاعتراض على هذه المعالجة لأسباب تتعلق بوضعك الخاص. وعندها نتوقف عن معالجة البيانات، ما لم نتمكن من إثبات أسباب مشروعة وقاهرة تفوق مصالحك وحقوقك وحرياتك، أو كانت المعالجة لازمة لإثبات حقوق قانونية أو ممارستها أو الدفاع عنها.'
          ]
        },
        {
          icon: Scale,
          title: '12. حق تقديم شكوى',
          paragraphs: [
            'يحق لك تقديم شكوى إلى سلطة رقابية لحماية البيانات (المادة 77). والجهة المختصة بنا هي:',
            '⁦Landesbeauftragte für den Datenschutz Niedersachsen⁩\n⁦Prinzenstraße 5⁩\n⁦30159 Hannover⁩، ألمانيا\nhttps://www.lfd.niedersachsen.de'
          ]
        },
        {
          icon: Info,
          title: '13. معلومات إضافية',
          paragraphs: [
            'أنت غير ملزم قانونياً أو تعاقدياً بتقديم بيانات شخصية. لكن بدون الاسم والبريد الإلكتروني والرسالة لا يمكننا معالجة استفسار مرسل عبر نموذج الاتصال.',
            'لا يتم اتخاذ أي قرارات آلية، بما في ذلك التنميط (المادة 22).',
            'نقوم بتحديث سياسة الخصوصية هذه كلما تغيّر الموقع أو الوضع القانوني.'
          ]
        }
      ]
    }
  };

  const tLocal = content[language] || content.de;

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
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 font-mono">
              {tLocal.updated}
            </p>
            {tLocal.translationNote && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
                {tLocal.translationNote}
              </p>
            )}
          </div>

          {/* Legal Content List */}
          <div className={`space-y-8 ${isRtl ? 'text-right' : 'text-left'}`}>
            {tLocal.sections.map(({ icon: Icon, title, paragraphs, highlight }, idx) => (
              <div
                key={title}
                className={`space-y-3 ${
                  highlight
                    ? 'bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-5 sm:p-6'
                    : idx > 0 ? 'pt-6 border-t border-slate-100 dark:border-slate-800/60' : ''
                }`}
              >
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2.5">
                  <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  {title}
                </h2>
                {paragraphs.map((text, i) => (
                  <p
                    key={i}
                    className={`text-sm sm:text-base leading-relaxed whitespace-pre-line ${
                      highlight ? 'text-slate-800 dark:text-slate-200 font-semibold' : 'text-slate-600 dark:text-slate-400 font-normal'
                    }`}
                  >
                    {linkify(text)}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
