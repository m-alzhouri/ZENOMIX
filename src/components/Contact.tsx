import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, RefreshCw, AlertCircle, History, X } from 'lucide-react';
import { ContactSubmission } from '../types';

// Formspree Form ID
const FORMSPREE_FORM_ID = 'mdaqypry';

export default function Contact() {
  const { t, isRtl } = useLanguage();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Operations Inquiry');
  const [message, setMessage] = useState('');

  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subjectOptions = [
    { value: 'General Operations Inquiry', label: t('contact_topic_general') },
    { value: 'Bespoke High-Value Cargo Transport', label: t('contact_topic_highval') },
    { value: 'Interstate Fleet Relay Contracts', label: t('contact_topic_relay') },
    { value: 'Carbon Neutral Consultation', label: t('contact_topic_carbon') },
    { value: 'Other', label: isRtl ? 'غير ذلك' : 'Other' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(
        isRtl
          ? 'يرجى تقديم قيم لكل من الاسم، البريد الإلكتروني، والرسالة.'
          : 'Please provide values for Name, Email, and Message.'
      );
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('subject', subjectOptions.find(opt => opt.value === subject)?.label || subject);
      formData.append('message', message);

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const newSubmission: ContactSubmission = {
        id: `ZN-SUB-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        email,
        subject: subjectOptions.find(opt => opt.value === subject)?.label || subject,
        message,
        timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      setSubmissions((prev) => [newSubmission, ...prev]);
      setSuccess(true);

      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(
        isRtl
          ? 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.'
          : 'Failed to send message. Please try again.'
      );
      console.error('Formspree error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const removeSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter(sub => sub.id !== id));
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
      
      {/* Background accents */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-blue-50/40 dark:bg-blue-950/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-50/20 dark:bg-indigo-950/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 px-4 py-1 rounded-full mb-4">
            <Mail className="h-[18px] w-[18px] text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
              {t('contact_badge')}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('contact_title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base font-normal">
            {t('contact_subtitle')}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Corporate details & Contact card */}
          <div className={`lg:col-span-5 space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-none">
              <h3 className="text-lg font-extrabold font-display text-slate-900 dark:text-white mb-6">
                {t('contact_hq')}
              </h3>

              <div className="space-y-6">
                
                <div className={`flex items-start gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 text-blue-600 dark:text-blue-400 rounded-2xl shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <h4 className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">
                      {t('contact_office_loc')}
                    </h4>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 leading-relaxed whitespace-pre-line">
                      {t('contact_office_val')}
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 text-blue-600 dark:text-blue-400 rounded-2xl shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <h4 className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">
                      {t('contact_inquiries')}
                    </h4>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                      Zenomix.de
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                      {t('contact_reply_time')}
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 text-blue-600 dark:text-blue-400 rounded-2xl shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <h4 className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">
                      {t('contact_hotline')}
                    </h4>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 font-mono font-bold">
                      {t('contact_hotline_val')}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium font-sans">
                      {t('contact_hotline_hours')}
                    </p>
                  </div>
                </div>

              </div>

              {/* Verified ISO stamps mock */}
              <div className={`mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                    {t('contact_iso_rating')}
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">ISO 9001:2015</div>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                    {t('contact_eco_license')}
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">SCS-GREEN-902</div>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                    {t('contact_fleet_status')}
                  </div>
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {t('contact_fleet_status_val')}
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Form Panel */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-none relative">
              
              {/* Form header */}
              <h3 className={`text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                {t('contact_form_title')}
              </h3>

              <form onSubmit={handleSubmit} className={`space-y-5 ${isRtl ? 'text-right' : 'text-left'}`}>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      {t('contact_fullname')}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('contact_placeholder_name')}
                      className={`w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950/50 transition-all font-medium ${isRtl ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      {t('contact_email')}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('contact_placeholder_email')}
                      className={`w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950/50 transition-all font-medium ${isRtl ? 'text-right font-mono' : 'text-left'}`}
                    />
                  </div>
                </div>

                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    {t('contact_topic')}
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950/50 transition-all font-medium cursor-pointer ${isRtl ? 'text-right' : 'text-left'}`}
                  >
                    {subjectOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    {t('contact_msg')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('contact_placeholder_msg')}
                    className={`w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950/50 transition-all font-medium resize-none ${isRtl ? 'text-right' : 'text-left'}`}
                  />
                </div>

                {error && (
                  <div className={`p-3 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30 text-red-700 dark:text-red-400 rounded-xl text-xs flex items-center gap-2 font-semibold font-sans ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <AlertCircle className="h-[18px] w-[18px] shrink-0 text-red-600 dark:text-red-400" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-md transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  id="contact-submit"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2 animate-pulse">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      {t('contact_btn_submitting')}
                    </span>
                  ) : (
                    <span className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span>{t('contact_btn_transmit')}</span>
                      <Send className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                    </span>
                  )}
                </button>

              </form>

              {/* Success Modal Overlay */}
              {success && (
                <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-3xl p-8 flex flex-col items-center justify-center text-center z-20 animate-fade-in border border-slate-200 dark:border-slate-800">
                  <div className="p-4 rounded-full bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 mb-4 border border-green-100 dark:border-green-900/30 animate-bounce">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-display">
                    {t('contact_success_title')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-6 font-medium">
                    {t('contact_success_desc')}
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white border border-slate-800 dark:border-slate-700 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all cursor-pointer"
                    id="dismiss-success-modal"
                  >
                    {t('contact_success_btn')}
                  </button>
                </div>
              )}

            </div>

            {/* Local ledger tracking history for this session */}
            {submissions.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm dark:shadow-none text-left animate-slide-up">
                <div className={`flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <History className="h-[18px] w-[18px] text-blue-600 dark:text-blue-400" />
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-300 uppercase tracking-widest font-sans">
                    {t('contact_ledger_title')} ({submissions.length})
                  </h4>
                </div>

                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2">
                  {submissions.map((sub) => (
                    <div 
                      key={sub.id} 
                      className={`bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-900 rounded-xl p-4 flex justify-between items-start ${isRtl ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`space-y-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                        <div className={`flex items-center gap-2 font-sans ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{sub.name}</span>
                          <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold">
                            {sub.id}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold">{sub.subject}</div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mt-1">{sub.message}</p>
                      </div>

                      <div className={`flex flex-col items-end gap-2 shrink-0 font-sans ${isRtl ? 'pr-4' : 'pl-4'}`}>
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-bold">{sub.timestamp}</span>
                        <button
                          onClick={() => removeSubmission(sub.id)}
                          className="p-1 rounded bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                          title={t('contact_ledger_remove')}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
