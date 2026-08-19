import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { FleetVehicle } from '../types';
import { Truck, Zap, Activity, ShieldCheck, Fuel, ArrowRight, Gauge, Layers, Eye } from 'lucide-react';

export default function Fleet() {
  const { t, isRtl, fleet } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Use vehicle ID as source of truth so switching language retains selection and translates instantly!
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');

  useEffect(() => {
    if (fleet && fleet.length > 0 && !selectedVehicleId) {
      setSelectedVehicleId(fleet[0].id);
    }
  }, [fleet, selectedVehicleId]);

  const selectedVehicle = fleet.find(v => v.id === selectedVehicleId) || fleet[0];

  const categories = [
    { label: t('fleet_tab_all'), id: 'all' },
    { label: t('fleet_tab_heavy'), id: 'heavy' },
    { label: t('fleet_tab_medium'), id: 'medium' },
    { label: t('fleet_tab_light'), id: 'light' },
  ];

  const filteredVehicles = activeCategory === 'all'
    ? fleet
    : activeCategory === 'light'
    ? fleet.filter(v => v.type === 'light' || v.type === 'electric')
    : fleet.filter(v => v.type === activeCategory);

  const handleSelectVehicle = (vehicle: FleetVehicle) => {
    setSelectedVehicleId(vehicle.id);
  };

  if (!selectedVehicle) {
    return null;
  }

  return (
    <section id="fleet" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
      
      {/* Background design elements */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-50/40 dark:bg-blue-950/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-indigo-50/20 dark:bg-indigo-950/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 px-4 py-1 rounded-full mb-4">
            <Activity className="h-[18px] w-[18px] text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
              {t('fleet_badge')}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('fleet_title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base font-normal">
            {t('fleet_subtitle')}
          </p>
        </div>

        {/* Fleet Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full p-1.5 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  const list = cat.id === 'all'
                    ? fleet
                    : cat.id === 'light'
                    ? fleet.filter(v => v.type === 'light' || v.type === 'electric')
                    : fleet.filter(v => v.type === cat.id);
                  if (list.length > 0) {
                    setSelectedVehicleId(list[0].id);
                  }
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Master Catalog Display */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Asset Selection List */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <h4 className={`text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest px-1 ${isRtl ? 'text-right' : 'text-left'}`}>
              {t('fleet_active_assets')} ({filteredVehicles.length})
            </h4>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {filteredVehicles.map((vehicle) => {
                const isSelected = selectedVehicle.id === vehicle.id;
                return (
                  <div
                    key={vehicle.id}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                      isSelected
                        ? 'bg-white dark:bg-slate-900 border-blue-600 dark:border-blue-500 text-slate-950 dark:text-white shadow-md dark:shadow-none shadow-blue-500/5'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900'
                    } ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                    onClick={() => handleSelectVehicle(vehicle)}
                  >
                    <div>
                      <div className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase font-bold">{vehicle.typeName}</div>
                      <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mt-1">
                        {vehicle.name}
                      </h3>
                      <div className={`flex gap-4 mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono font-semibold ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span>{isRtl ? `الحمولة: ${vehicle.payload}` : `PL: ${vehicle.payload}`}</span>
                        <span>•</span>
                        <span>{isRtl ? `المدى: ${vehicle.range}` : `RG: ${vehicle.range}`}</span>
                      </div>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${
                      isSelected 
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30' 
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-900 text-slate-400 dark:text-slate-500'
                    }`}>
                      <Eye className="h-[18px] w-[18px]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Spec Detail Terminal */}
          <div className="lg:col-span-7">
            <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-none h-full flex flex-col justify-between relative overflow-hidden animate-scale-up ${isRtl ? 'text-right' : 'text-left'}`}>
              
              {/* Graphic Backdrop representation */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-blue-50/40 dark:bg-blue-950/10 rounded-full filter blur-3xl pointer-events-none" />

              <div>
                
                {/* Header */}
                <div className={`flex justify-between items-start pb-5 border-b border-slate-100 dark:border-slate-800 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider block font-bold">
                      {t('fleet_diag_console')}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
                      {selectedVehicle.name}
                    </h3>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-1.5 rounded-full text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
                    {t('fleet_class')}: {selectedVehicle.typeName.toUpperCase()}
                  </div>
                </div>

                {/* Conceptual Vector Fleet Drawing Representation */}
                <div className="relative h-48 sm:h-56 bg-slate-900 rounded-2xl border border-slate-800 mb-6 flex items-center justify-center overflow-hidden">
                  
                  {/* Grid lines overlay */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'linear-gradient(rgba(0,224,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,224,255,0.15) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }} />

                  {/* Abstract Custom SVG silhouette representing the vehicle class with brand guidelines stripes */}
                  <svg className={`w-56 h-36 relative z-10 opacity-90 ${isRtl ? 'scale-x-[-1]' : ''}`} viewBox="0 0 200 120" fill="none">
                    <defs>
                      <linearGradient id="vectorGrad" x1="0" y1="0" x2="200" y2="120" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>

                    {selectedVehicle.type === 'heavy' && (
                      <g>
                        {/* High-roof panel van body (3.5 t class) */}
                        <path d="M 20,28 H 150 L 182,58 V 85 H 20 Z" fill="url(#vectorGrad)" />
                        {/* Cab windows */}
                        <rect x="152" y="40" width="24" height="17" fill="#0f172a" opacity="0.9" />
                        <rect x="128" y="36" width="18" height="20" fill="#0f172a" opacity="0.9" />
                        {/* Brand graphic wave */}
                        <path d="M 22,70 Q 62,52 105,74 T 150,58" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                        {/* Wheels — single rear axle, under 3.5 t */}
                        <circle cx="55" cy="92" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                        <circle cx="150" cy="92" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      </g>
                    )}

                    {selectedVehicle.type === 'medium' && (
                      <g>
                        {/* Delivery Van Body */}
                        <path d="M 30,35 H 155 L 180,60 V 85 H 30 Z" fill="url(#vectorGrad)" />
                        <rect x="140" y="42" width="22" height="18" fill="#0f172a" opacity="0.9" />
                        {/* Brand wave stripe */}
                        <path d="M 30,70 Q 75,55 120,75 T 155,60" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                        {/* Wheels */}
                        <circle cx="60" cy="92" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                        <circle cx="140" cy="92" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      </g>
                    )}

                    {selectedVehicle.type === 'light' && (
                      <g>
                        {/* Passenger / patient transport minibus body */}
                        <path d="M 32,34 H 148 L 176,58 V 84 H 32 Z" fill="url(#vectorGrad)" />
                        {/* Passenger windows */}
                        <rect x="44" y="42" width="24" height="16" fill="#0f172a" opacity="0.9" />
                        <rect x="74" y="42" width="24" height="16" fill="#0f172a" opacity="0.9" />
                        <rect x="104" y="42" width="24" height="16" fill="#0f172a" opacity="0.9" />
                        <rect x="150" y="44" width="22" height="14" fill="#0f172a" opacity="0.9" />
                        {/* Boarding ramp at the rear */}
                        <path d="M 32,84 L 12,96 H 40" stroke="#38bdf8" strokeWidth="3" fill="none" strokeLinejoin="round" />
                        {/* Wheelchair symbol on the flank */}
                        <circle cx="66" cy="72" r="5.5" stroke="#38bdf8" strokeWidth="2" fill="none" />
                        <path d="M 66,63 v 5" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                        {/* Wheels */}
                        <circle cx="62" cy="90" r="11" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                        <circle cx="146" cy="90" r="11" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      </g>
                    )}

                    {selectedVehicle.type === 'electric' && (
                      <g>
                        {/* Sleek sedan */}
                        <path d="M 25,75 Q 40,68 60,68 Q 80,48 115,48 Q 145,48 160,68 Q 185,72 192,82 V 90 H 25 Z" fill="url(#vectorGrad)" />
                        <path d="M 82,53 Q 110,53 118,68 H 68 Z" fill="#0f172a" opacity="0.9" />
                        <path d="M 122,53 Q 140,53 148,68 H 122 Z" fill="#0f172a" opacity="0.9" />
                        {/* Blue graphics */}
                        <path d="M 35,80 Q 90,70 145,85" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                        {/* Wheels */}
                        <circle cx="58" cy="90" r="11" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                        <circle cx="148" cy="90" r="11" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      </g>
                    )}
                  </svg>

                  {/* Telemetry markers */}
                  <div className={`absolute top-3 bg-slate-950/90 border border-slate-800 rounded-lg px-2 py-1 text-[9px] font-mono text-cyan-400 tracking-wider font-bold ${isRtl ? 'right-4' : 'left-4'}`}>
                    TX-PWR: 100% NOMINAL
                  </div>

                  <div className={`absolute bottom-3 bg-slate-950/90 border border-slate-800 rounded-lg px-2 py-1 text-[9px] font-mono text-slate-400 font-semibold ${isRtl ? 'left-4' : 'right-4'}`}>
                    DIAGNOSTIC-REF: {selectedVehicle.id.toUpperCase()}
                  </div>
                </div>

                {/* Primary Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-900 rounded-2xl p-4">
                    <div className={`flex items-center gap-1 text-slate-400 dark:text-slate-500 mb-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <Layers className="h-3.5 w-3.5" />
                      <span className="text-[9px] font-mono uppercase font-semibold">{t('fleet_max_payload')}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedVehicle.payload}</div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-900 rounded-2xl p-4">
                    <div className={`flex items-center gap-1 text-slate-400 dark:text-slate-500 mb-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <Gauge className="h-3.5 w-3.5" />
                      <span className="text-[9px] font-mono uppercase font-semibold">{t('fleet_cargo_vol')}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedVehicle.volume}</div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-900 rounded-2xl p-4">
                    <div className={`flex items-center gap-1 text-slate-400 dark:text-slate-500 mb-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <Fuel className="h-3.5 w-3.5" />
                      <span className="text-[9px] font-mono uppercase font-semibold">{t('fleet_propulsion')}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate" title={selectedVehicle.propulsion}>
                      {selectedVehicle.propulsion.split(' ')[0]}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-900 rounded-2xl p-4">
                    <div className={`flex items-center gap-1 text-slate-400 dark:text-slate-500 mb-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <Zap className="h-3.5 w-3.5" />
                      <span className="text-[9px] font-mono uppercase font-semibold">{t('fleet_max_range')}</span>
                    </div>
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{selectedVehicle.range}</div>
                  </div>
                </div>

                {/* Features Checklist */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300 mb-3">
                    {t('fleet_telemetry_title')}
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {selectedVehicle.features.map((feat, idx) => (
                      <div key={idx} className={`flex items-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-900 rounded-xl px-3.5 py-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                        <ShieldCheck className="h-[18px] w-[18px] text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Specs disclaimer / Footer */}
              <div className={`mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 text-center sm:text-left font-semibold">
                  {t('fleet_satellite_disclaimer')}
                </span>
                <button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 group cursor-pointer ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  <span>{t('fleet_btn_request')}</span>
                  <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
