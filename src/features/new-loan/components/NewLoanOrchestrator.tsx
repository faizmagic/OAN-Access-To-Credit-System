'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoanCurrentStep, setStep, resetForm } from '@/features/new-loan/store/newLoanFormSlice';
import { NewLoanProgressBar } from './NewLoanProgressBar';
import { Step1ConsentDocs } from './Step1ConsentDocs';
import { Step2FarmerDetails } from './Step2FarmerDetails';
import { Step3ReviewSubmit } from './Step3ReviewSubmit';
import { Step4Success } from './Step4Success';
import { ArrowLeft } from 'lucide-react';

const STEP_META = [
  { title: 'Consent & Supporting Documents', subtitle: "Obtain farmer's consent and upload required documents" },
  { title: 'Farmer Details', subtitle: "Capture information about the requested loan and farming activities." },
  { title: 'Review Application', subtitle: "Please review all information before final submission. Resolve any warnings or missing infomation." },
  { title: 'Success', subtitle: "" },
];

export function NewLoanOrchestrator() {
  const currentStep = useSelector(selectLoanCurrentStep);
  const dispatch = useDispatch();
  const meta = STEP_META[currentStep - 1] || STEP_META[0];

  useEffect(() => {
    return () => {
      // dispatch(resetForm());
    };
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-full space-y-5">
      {currentStep > 1 && currentStep < 4 && (
        <div className="flex items-center">
          <button onClick={() => dispatch(setStep(currentStep - 1))} className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      )}

      {currentStep < 4 && (
        <div className="rounded-2xl bg-white px-6 py-5 shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#374151] text-white text-lg font-bold shadow-sm">
              {currentStep}
            </div>
            <div className="flex flex-col gap-0.5">
              <h1 className="text-xl font-bold text-gray-900">{meta.title}</h1>
              <p className="text-sm text-gray-500">{meta.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all">Cancel</button>
            <button className="rounded-lg border border-gray-400 bg-white px-5 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all">Save Draft</button>
          </div>
        </div>
      )}

      {currentStep < 4 && (
        <NewLoanProgressBar currentStep={currentStep} onStepClick={(step) => dispatch(setStep(step))} />
      )}

      <div className="relative min-h-[400px]">
        {currentStep === 1 && <Step1ConsentDocs />}
        {currentStep === 2 && <Step2FarmerDetails />}
        {currentStep === 3 && <Step3ReviewSubmit />}
        {currentStep === 4 && <Step4Success />}
      </div>
    </div>
  );
}
