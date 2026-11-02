import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const PanicScreen = ({ onDismiss }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white text-slate-800 font-serif overflow-y-auto p-8 sm:p-14 select-text">
      {/* Discreet top-right resume bar */}
      <div className="max-w-4xl mx-auto flex justify-between items-center pb-6 mb-8 border-b border-slate-200">
        <div className="font-sans text-xs text-slate-500 uppercase tracking-widest">
          AP Biology &amp; Biochemistry · Unit 4 Notes
        </div>
        <button
          onClick={onDismiss}
          className="font-sans text-xs text-slate-400 hover:text-slate-800 flex items-center gap-1.5 px-2.5 py-1 rounded border border-transparent hover:border-slate-300 transition-colors"
          title="Return to Vault Arcade (or press `)"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Resume (Press `)</span>
        </button>
      </div>

      <main className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
          Cellular Respiration and ATP Synthesis: Glycolysis to Oxidative Phosphorylation
        </h1>

        <p className="text-base leading-relaxed text-slate-700">
          Cellular respiration is a collection of metabolic pathways that convert biochemical energy from nutrients into adenosine triphosphate (ATP), releasing waste products. Catabolic reactions include glycolysis, pyruvate oxidation, the tricarboxylic acid (Krebs) cycle, and oxidative phosphorylation.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 font-sans text-sm my-6">
          <div className="font-bold text-slate-900 mb-2">Equation for Aerobic Cellular Respiration:</div>
          <div className="font-mono text-slate-700 bg-white p-3 rounded border border-slate-200">
            C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ~30-32 ATP (ΔG = -2870 kJ/mol)
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 pt-4 font-sans">
          Phase 1: Glycolytic Cleavage in the Cytosol
        </h2>
        <p className="text-base leading-relaxed text-slate-700">
          Glycolysis is an anaerobic metabolic pathway operating in the cytoplasm of virtually all living organisms. A single 6-carbon molecule of glucose is enzymatically cleaved into two 3-carbon pyruvate molecules through a sequence of ten phosphorylation and isomerisation reactions.
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li><strong>Energy Investment Phase:</strong> 2 ATP molecules are hydrolyzed to phosphorylate intermediate hexoses.</li>
          <li><strong>Energy Payoff Phase:</strong> Substrate-level phosphorylation synthesizes 4 ATP molecules and reduces 2 NAD⁺ to NADH.</li>
          <li><strong>Net Yield:</strong> 2 Pyruvate, 2 net ATP, and 2 NADH per glucose substrate.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 pt-4 font-sans">
          Phase 2: Mitochondrial Proton Gradients and Chemiosmosis
        </h2>
        <p className="text-base leading-relaxed text-slate-700">
          Electrons derived from NADH and FADH₂ cascade through Complexes I-IV in the inner mitochondrial cristae. This movement couples electron transfer with active proton translocation into the intermembrane space, generating an electrochemical proton motive force harnessed by ATP Synthase.
        </p>
      </main>
    </div>
  );
};
