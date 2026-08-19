import React, { useState } from 'react';
import { Calculator as CalcIcon, RefreshCw, Check, ArrowRight, Calendar, Truck, Trees } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Calculator() {
  const { t, isRtl, language } = useLanguage();
  const numberLocale = language === 'de' ? 'de-DE' : language === 'ar' ? 'ar-EG' : 'en-US';

  const [weight, setWeight] = useState<number>(25);
  const [distance, setDistance] = useState<number>(120);
  const [serviceType, setServiceType] = useState<string>('standard');
  const [isColdChain, setIsColdChain] = useState<boolean>(false);
  const [isHighSecurity, setIsHighSecurity] = useState<boolean>(false);
  const [isCarbonOffset, setIsCarbonOffset] = useState<boolean>(true);

  const [calculating, setCalculating] = useState<boolean>(false);
  const [results, setResults] = useState<any | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);

    setTimeout(() => {
      // Logic for cost calculations — light-commercial segment, metric units, EUR
      let baseRatePerKg = 0.35;
      let multiplier = 1.0;
      let durationDays = t('calc_dur_standard');
      let carbonOutputKg = 0;

      switch (serviceType) {
        case 'direct':
          baseRatePerKg = 1.2;
          multiplier = 1.4;
          durationDays = t('calc_dur_direct');
          carbonOutputKg = Math.round(distance * 0.18);
          break;
        case 'standard':
          baseRatePerKg = 0.35;
          multiplier = 1.0;
          durationDays = t('calc_dur_standard');
          carbonOutputKg = Math.round(distance * 0.15);
          break;
        case 'overnight':
          baseRatePerKg = 0.75;
          multiplier = 1.25;
          durationDays = t('calc_dur_overnight');
          carbonOutputKg = Math.round(distance * 0.2);
          break;
        case 'pool':
          baseRatePerKg = 0.2;
          multiplier = 0.7;
          durationDays = t('calc_dur_pool');
          carbonOutputKg = Math.round(distance * 0.09);
          break;
      }

      // Calculations
      let baseCost = weight * baseRatePerKg + distance * 0.55 * multiplier;
      let coldChainCost = isColdChain ? baseCost * 0.25 : 0;
      let highSecurityCost = isHighSecurity ? baseCost * 0.15 : 0;
      let carbonOffsetCost = isCarbonOffset ? 12.50 : 0;

      let subtotal = baseCost + coldChainCost + highSecurityCost + carbonOffsetCost;
      let totalDiscount = isCarbonOffset ? 5.00 : 0; // standard environmental discount incentive
      let total = subtotal - totalDiscount;

      // Zenomix green savings (due to hybrid/EV fleet specs)
      let standardFleetCarbonKg = Math.round(carbonOutputKg * 1.65);
      let carbonSavedKg = Math.max(0, standardFleetCarbonKg - carbonOutputKg);

      setResults({
        baseCost: Math.round(baseCost * 100) / 100,
        coldChainCost: Math.round(coldChainCost * 100) / 100,
        highSecurityCost: Math.round(highSecurityCost * 100) / 100,
        carbonOffsetCost: Math.round(carbonOffsetCost * 100) / 100,
        subtotal: Math.round(subtotal * 100) / 100,
        discount: totalDiscount,
        total: Math.round(Math.max(25, total) * 100) / 100, // minimum dispatch rate is €25
        durationDays,
        carbonSavedKg,
        referenceId: `ZN-EST-${Math.floor(100000 + Math.random() * 900000)}`
      });

      setCalculating(false);
    }, 750);
  };

  const handleReset = () => {
    setWeight(25);
    setDistance(120);
    setServiceType('standard');
    setIsColdChain(false);
    setIsHighSecurity(false);
    setIsCarbonOffset(true);
    setResults(null);
  };

  return (
    <section id="calculator" className="py-24 relative bg-slate-50 dark:bg-slate-950 overflow-hidden border-t border-slate-100 dark:border-slate-900">
      
      {/* Background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/50 dark:bg-blue-950/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-50/30 dark:bg-indigo-950/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 px-4 py-1 rounded-full mb-4">
            <CalcIcon className="h-[18px] w-[18px] text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
              {t('calc_badge')}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('calc_title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base font-normal">
            {t('calc_subtitle')}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form Controls */}
          <div className={`lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-none ${isRtl ? 'text-right' : 'text-left'}`}>
            
            <form onSubmit={handleCalculate} className="space-y-6">
              
              {/* Service Level Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                  {t('calc_step_tier')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'direct', name: t('calc_tier_direct'), desc: t('calc_tier_direct_desc') },
                    { id: 'standard', name: t('calc_tier_standard'), desc: t('calc_tier_standard_desc') },
                    { id: 'overnight', name: t('calc_tier_overnight'), desc: t('calc_tier_overnight_desc') },
                    { id: 'pool', name: t('calc_tier_pool'), desc: t('calc_tier_pool_desc') },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setServiceType(tier.id)}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                        serviceType === tier.id
                          ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-400 shadow-md shadow-blue-500/5 font-semibold'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
                      }`}
                    >
                      <span className={`text-xs font-bold uppercase tracking-wide truncate block ${isRtl ? 'text-right w-full' : ''}`}>{tier.name}</span>
                      <span className={`text-[10px] font-mono mt-1 text-slate-400 dark:text-slate-500 font-semibold block ${isRtl ? 'text-right w-full' : ''}`}>{tier.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Slider */}
              <div>
                <div className={`flex justify-between items-center mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {t('calc_weight')}
                  </label>
                  <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                    {`${weight.toLocaleString(numberLocale)} kg`}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="1200"
                  step="1"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
                />
                <div className={`flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold mt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span>{t('calc_weight_hint_min')}</span>
                  <span>{t('calc_weight_hint_mid')}</span>
                  <span>{t('calc_weight_hint_max')}</span>
                </div>
              </div>

              {/* Distance Slider */}
              <div>
                <div className={`flex justify-between items-center mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {t('calc_distance')}
                  </label>
                  <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                    {`${distance.toLocaleString(numberLocale)} km`}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="800"
                  step="5"
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
                />
                <div className={`flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold mt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span>{t('calc_dist_hint_min')}</span>
                  <span>{t('calc_dist_hint_mid')}</span>
                  <span>{t('calc_dist_hint_max')}</span>
                </div>
              </div>

              {/* Addons / Special Handling toggles */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                  {t('calc_addons')}
                </label>
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Cold chain */}
                  <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    isColdChain 
                      ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-400 dark:border-blue-900/50 text-slate-950 dark:text-slate-200' 
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
                  } ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <input
                      type="checkbox"
                      checked={isColdChain}
                      onChange={(e) => setIsColdChain(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 dark:border-slate-800 text-blue-600 focus:ring-blue-500 bg-white dark:bg-slate-900 animate-none"
                    />
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wide">{t('calc_addon_temp')}</span>
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{t('calc_addon_temp_desc')}</span>
                    </div>
                  </label>

                  {/* High security */}
                  <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    isHighSecurity 
                      ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-400 dark:border-blue-900/50 text-slate-950 dark:text-slate-200' 
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
                  } ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <input
                      type="checkbox"
                      checked={isHighSecurity}
                      onChange={(e) => setIsHighSecurity(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 dark:border-slate-800 text-blue-600 focus:ring-blue-500 bg-white dark:bg-slate-900 animate-none"
                    />
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wide">{t('calc_addon_secure')}</span>
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{t('calc_addon_secure_desc')}</span>
                    </div>
                  </label>

                  {/* Carbon Offset */}
                  <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    isCarbonOffset 
                      ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-400 dark:border-blue-900/50 text-slate-950 dark:text-slate-200' 
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
                  } ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <input
                      type="checkbox"
                      checked={isCarbonOffset}
                      onChange={(e) => setIsCarbonOffset(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 dark:border-slate-800 text-blue-600 focus:ring-blue-500 bg-white dark:bg-slate-900 animate-none"
                    />
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wide">{t('calc_addon_carbon')}</span>
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{t('calc_addon_carbon_desc')}</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit / Reset Row */}
              <div className={`flex gap-4 pt-5 border-t border-slate-100 dark:border-slate-800 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer font-sans"
                >
                  <RefreshCw className="h-4 w-4" />
                  {t('calc_btn_reset')}
                </button>

                <button
                  type="submit"
                  disabled={calculating}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-md shadow-blue-500/10 transition-all duration-300 disabled:opacity-50 cursor-pointer animate-none"
                  id="calculate-submit"
                >
                  {calculating ? (
                    <span className={`flex items-center gap-2 animate-pulse ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <RefreshCw className="h-[18px] w-[18px] animate-spin" />
                      {t('calc_btn_calculating')}
                    </span>
                  ) : (
                    <span className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      {t('calc_btn_submit')}
                      <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                    </span>
                  )}
                </button>
              </div>

            </form>

          </div>

          {/* Right Column: Invoice / Results Panel */}
          <div className="lg:col-span-5 h-full">
            {!results && !calculating && (
              <div className="bg-slate-100/40 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[350px]">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 mb-4 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <CalcIcon className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('calc_empty_title')}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed font-normal">
                  {t('calc_empty_desc')}
                </p>
              </div>
            )}

            {calculating && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center h-full flex flex-col items-center justify-center min-h-[350px] animate-pulse shadow-sm">
                <RefreshCw className="h-10 w-10 text-blue-600 dark:text-blue-400 animate-spin mb-4" />
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  {t('calc_loading_title')}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-relaxed font-normal">
                  {t('calc_loading_desc')}
                </p>
              </div>
            )}

            {results && !calculating && (
              <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg dark:shadow-none relative overflow-hidden animate-scale-up ${isRtl ? 'text-right' : 'text-left'}`}>
                
                {/* Visual Glow Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 dark:bg-blue-900/10 rounded-full filter blur-2xl animate-pulse" />

                {/* Receipt Header */}
                <div className={`flex justify-between items-start pb-5 border-b border-slate-100 dark:border-slate-800 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest font-mono">
                      {t('calc_matrix_title')}
                    </h3>
                    <p className="text-[10px] font-mono text-blue-600 dark:text-blue-400 mt-1 font-semibold">
                      EST-ID: {results.referenceId}
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-[10px] font-mono font-bold">
                    {t('calc_result_status')}
                  </div>
                </div>

                {/* Core Pricing Itemized List */}
                <div className="space-y-4 mb-6">
                  
                  <div className={`flex justify-between items-center text-sm ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className={`text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <Truck className="h-4 w-4 text-slate-400" />
                      {t('calc_line_base')}
                    </span>
                    <span className="font-mono text-slate-950 dark:text-slate-100 font-bold">€{results.baseCost.toFixed(2)}</span>
                  </div>

                  {isColdChain && (
                    <div className={`flex justify-between items-center text-sm ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        {t('calc_line_temp')}
                      </span>
                      <span className="font-mono text-slate-950 dark:text-slate-100 font-bold">+€{results.coldChainCost.toFixed(2)}</span>
                    </div>
                  )}

                  {isHighSecurity && (
                    <div className={`flex justify-between items-center text-sm ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        {t('calc_line_secure')}
                      </span>
                      <span className="font-mono text-slate-950 dark:text-slate-100 font-bold">+€{results.highSecurityCost.toFixed(2)}</span>
                    </div>
                  )}

                  {isCarbonOffset && (
                    <div className={`flex justify-between items-center text-sm ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        {t('calc_line_carbon')}
                      </span>
                      <span className="font-mono text-slate-950 dark:text-slate-100 font-bold">+€{results.carbonOffsetCost.toFixed(2)}</span>
                    </div>
                  )}

                  {isCarbonOffset && (
                    <div className={`flex justify-between items-center text-sm border-t border-dashed border-slate-100 dark:border-slate-800 pt-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        {t('calc_line_discount')}
                      </span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">-€{results.discount.toFixed(2)}</span>
                    </div>
                  )}

                </div>

                {/* Carbon Offset Visual Highlight Badge */}
                {isCarbonOffset && (
                  <div className={`bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-4 mb-6 flex items-start gap-3 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                    <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 shrink-0">
                      <Trees className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider font-sans">
                        {t('calc_carbon_verified')}
                      </h4>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 font-medium leading-relaxed font-sans">
                        <span>
                          {t('calc_carbon_desc_1')}{' '}
                          <strong className="text-slate-950 dark:text-slate-100 font-bold">{results.carbonSavedKg} kg</strong>{' '}
                          {t('calc_carbon_desc_2')}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Timing Specs Box */}
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-900 rounded-2xl p-4 mb-6 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase font-semibold">
                      {t('calc_est_dur')}
                    </div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 flex items-center justify-center gap-1.5">
                      <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      {results.durationDays}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase font-semibold">
                      {t('calc_validity_title')}
                    </div>
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1.5">
                      {t('calc_validity_val')}
                    </div>
                  </div>
                </div>

                {/* Absolute Total */}
                <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-4 flex items-center justify-between mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <span className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold">
                      {t('calc_total_rate')}
                    </span>
                    <span className="block text-[11px] text-blue-600 dark:text-blue-400 mt-0.5 font-bold">
                      {t('calc_total_note')}
                    </span>
                  </div>
                  <div className={`flex items-baseline gap-0.5 text-slate-900 dark:text-slate-100 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="text-lg font-bold font-mono text-slate-700 dark:text-slate-400">€</span>
                    <span className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight">
                      {results.total.toLocaleString(numberLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Footer CTA */}
                <button
                  type="button"
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all cursor-pointer shadow-md ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  <span>{t('calc_btn_book')}</span>
                  <ArrowRight className={`h-[18px] w-[18px] ${isRtl ? 'rotate-180' : ''}`} />
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
