import React from 'react';
import { X, ShieldAlert, Check, Sparkles } from 'lucide-react';

export interface CloakPreset {
  id: string;
  name: string;
  title: string;
  iconUrl: string;
}

export const CLOAK_PRESETS: CloakPreset[] = [
  {
    id: 'default',
    name: 'Normal (Vault Arcade)',
    title: 'Vault Arcade - Unblocked Games Hub',
    iconUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2338bdf8"><path d="M6 11h4V7H6v4zm8-4v4h4V7h-4zm-8 6h4v4H6v-4zm8 0h4v4h-4v-4z"/></svg>',
  },
  {
    id: 'classroom',
    name: 'Google Classroom',
    title: 'Classes',
    iconUrl: 'https://ssl.gstatic.com/classroom/favicon.png',
  },
  {
    id: 'drive',
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    iconUrl: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png',
  },
  {
    id: 'docs',
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    iconUrl: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    title: 'Wikipedia, the free encyclopedia',
    iconUrl: 'https://en.wikipedia.org/static/favicon/wikipedia.ico',
  },
  {
    id: 'canvas',
    name: 'Canvas LMS',
    title: 'Dashboard - Canvas',
    iconUrl: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico',
  },
];

interface TabCloakModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCloak: string;
  onSelectCloak: (preset: CloakPreset) => void;
  onTriggerPanic: () => void;
}

export const TabCloakModal: React.FC<TabCloakModalProps> = ({
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
              <h3 className="text-base font-bold text-white">Tab Cloaking & Stealth</h3>
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
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 object-contain"
                      onError={(e) => {
                        // Fallback icon if image doesn't load
                        (e.target as HTMLElement).style.display = 'none';
                      }}
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
