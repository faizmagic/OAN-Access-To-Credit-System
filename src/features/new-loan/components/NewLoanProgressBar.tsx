import React, { useRef, useEffect } from 'react';
import { Check } from 'lucide-react';

export const STEPS = [
  { number: 1, label: 'Consent & Supporting Documents' },
  { number: 2, label: 'Farmer Details' },
  { number: 3, label: 'Review Application' },
];

export function NewLoanProgressBar({ currentStep, onStepClick }: { currentStep: number; onStepClick?: (step: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const inner = container.children[0] as HTMLElement;
      if (inner && inner.children[currentStep - 1]) {
        const activeStepEl = inner.children[currentStep - 1] as HTMLElement;
        const scrollLeft = activeStepEl.offsetLeft - (container.clientWidth / 2) + (activeStepEl.clientWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentStep]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-8 py-5 shadow-sm sm:px-12 overflow-x-auto" ref={containerRef}>
      <div className="flex items-start justify-between min-w-[500px] md:min-w-0 relative">
        {/* Connecting line background */}
        <div className="absolute top-4 left-[10%] right-[10%] h-[1px] bg-gray-200" />
        
        {STEPS.map(step => {
          const isDone = step.number < currentStep;
          const isActive = step.number === currentStep;
          return (
            <div key={step.number} onClick={() => isDone && onStepClick && onStepClick(step.number)} className={`relative flex flex-col items-center gap-2 ${isDone ? 'cursor-pointer hover:opacity-80' : 'cursor-default'} w-1/3`}>
              <div className="flex justify-center w-full z-10 bg-white px-2">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300
                  ${isDone ? 'bg-[#55a674] text-white' : isActive ? 'bg-[#5b6471] text-white' : 'bg-[#e5e7eb] text-gray-500'}`}>
                  {isDone ? <Check size={16} strokeWidth={3} /> : step.number}
                </span>
              </div>
              <div className="text-center mt-2 flex flex-col items-center">
                <p className={`text-sm font-bold ${isActive ? 'text-[#1e3a8a]' : 'text-[#2a4365]'}`}>Step {step.number}</p>
                <p className="text-xs text-gray-500 mt-1 max-w-[150px]">{step.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
