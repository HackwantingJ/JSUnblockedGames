import React from 'react';
import { X, ShieldAlert, Check } from 'lucide-react';

export const CLOAK_PRESETS = [
  {
    id: 'default',
    name: 'Normal (Vault Arcade)',
    title: 'Vault Arcade - Unblocked Games Hub',
    iconUrl: '/favicon.svg',
  },
  {
    id: 'classroom',
    name: 'Google Classroom',
    title: 'Classes',
    iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="%232e7d32"/><path d="M24 14c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 20c-5.33 0-16 2.67-16 8v2h32v-2c0-5.33-10.67-8-16-8z" fill="%23fff"/></svg>',
  },
  {
    id: 'drive',
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%23FFC107" d="M17 6L31 6 45 30 31 30z"/><path fill="%231E88E5" d="M9.5 43L3.5 32.5 17 6 24 18z"/><path fill="%234CAF50" d="M31 30L45 30 38.5 43 14 43z"/></svg>',
  },
  {
    id: 'docs',
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="%234285f4"/><path d="M14 12h14l8 8v16H14z" fill="%23fff"/><path d="M28 12v8h8z" fill="%23c6dafc"/><path d="M18 24h12v2H18zm0 4h12v2H18zm0 4h8v2H18z" fill="%234285f4"/></svg>',
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    title: 'Wikipedia, the free encyclopedia',
    iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="%23ffffff"/><text x="24" y="34" font-family="serif" font-size="30" font-weight="bold" text-anchor="middle" fill="%23000000">W</text></svg>',
  },
  {
    id: 'canvas',
    name: 'Canvas LMS',
    title: 'Dashboard - Canvas',
    iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="%23e63946"/><circle cx="24" cy="24" r="8" fill="%23fff"/></svg>',
  },
];

export const TabCloakModal = ({
  isOpen,
  onClose,
  activeCloak,
  onSelectCloak,
  onTriggerPanic,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Tab Cloaking &amp; Stealth</h3>
              <p className="text-xs text-slate-400">Disguise browser tab title and favicon</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Choose a disguise so your browser tab header looks like an educational or productivity website:
          </p>

          <div className="space-y-2">
            {CLOAK_PRESETS.map((preset) => {
              const isSelected = activeCloak === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => onSelectCloak(preset)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-sky-500/10 border-sky-500/40 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={preset.iconUrl}
                      alt={preset.name}
                      className="w-5 h-5 object-contain rounded"
                    />
                    <div>
                      <div className="text-xs font-semibold">{preset.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono line-clamp-1">
                        Title: &quot;{preset.title}&quot;
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Panic trigger box */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-rose-300">Panic Shield (` key)</div>
                <div className="text-[11px] text-slate-400">Instantly displays a fake study document</div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onTriggerPanic();
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                Test Panic Now
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
