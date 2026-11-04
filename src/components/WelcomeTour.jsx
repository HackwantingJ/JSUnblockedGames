import React, { useState } from 'react';
import { Sparkles, X, Gamepad2, Calculator, ShieldAlert, Zap, ArrowRight, Check, Cookie } from 'lucide-react';

export const WelcomeTour = ({ isOpen, onClose, onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      badgeIcon: Sparkles,
      title: 'Welcome to C00K13',
      subtitle:
        'A high-speed game vault, stealth calculator cloak, emergency panic shield, and unblocked arcade all in one tab. Take 30 seconds to get comfortable.',
      highlight: 'Curated 23+ Games',
    },
    {
      badgeIcon: Gamepad2,
      title: '23+ Curated Unblocked Games',
      subtitle:
        'Play 3D hits like Minecraft, Cuphead, Skate 3, Ultrakill, FNAF, Subway Surfers, DOOM, plus retro offline HTML arcade classics with full pointer-lock mouse controls.',
      highlight: '3D & Offline Classics',
    },
    {
      badgeIcon: Calculator,
      title: 'Secret Calculator Disguise',
      subtitle:
        'C00K13 opens disguised as a fully functional standard and scientific calculator. Enter your secret PIN 1865 and click = anytime to unlock your games vault.',
      highlight: 'Secret PIN: 1865',
    },
    {
      badgeIcon: ShieldAlert,
      title: 'Panic Shield & Tab Cloaking',
      subtitle:
        'Hit the ` (Tilde) key at any instant to display AP Biology study notes. Use Tab Cloak to disguise your tab as Google Classroom, Google Docs, or Drive.',
      highlight: 'Key: ` (Tilde)',
    },
    {
      badgeIcon: Cookie,
      title: 'Meet CRUM3L AI',
      subtitle:
        'Your built-in gaming and homework AI companion powered by Gemini. Click the CRUM3L icon in the sidebar anytime for Minecraft walkthroughs, 2048 strategy, Skate 3 tricks, or step-by-step math help.',
      highlight: 'Built-in Gemini AI',
    },
  ];

  const step = steps[currentStep];
  const IconComponent = step.badgeIcon;
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      if (onFinish) onFinish();
      onClose();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    if (onFinish) onFinish();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#130b10] border border-[#2b1722] rounded-3xl p-6 sm:p-7 shadow-2xl relative text-slate-100 transition-all">
        {/* Top Progress bar and close button (matching Screenshot 2) */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`transition-all duration-300 rounded-full ${
                  i === currentStep
                    ? 'w-8 h-1.5 bg-[#ff5b79]'
                    : i < currentStep
                    ? 'w-2 h-1.5 bg-[#ff5b79]/60'
                    : 'w-2 h-1.5 bg-slate-800'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleSkip}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors focus:outline-none"
            title="Close tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Icon Badge container (matching Screenshot 2) */}
        <div className="mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#23121d] border border-[#3d1e31] flex items-center justify-center shadow-inner">
            <IconComponent className="w-7 h-7 text-[#ff5b79]" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2.5 mb-7">
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#ff5b79]/15 border border-[#ff5b79]/30 text-[#ff5b79] text-xs font-semibold tracking-wide">
            {step.highlight}
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {step.title}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            {step.subtitle}
          </p>
        </div>

        {/* Footer actions (matching Screenshot 2) */}
        <div className="pt-4 border-t border-[#23121d] flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
          >
            Skip tour
          </button>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff5b79] hover:bg-[#ff4365] text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-[#ff5b79]/25 hover:shadow-[#ff5b79]/40 active:scale-95 focus:outline-none"
          >
            <span>{isLast ? 'Get started' : 'Next'}</span>
            {isLast ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
