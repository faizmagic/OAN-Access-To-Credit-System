import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { prevStep, nextStep } from '@/features/new-loan/store/newLoanFormSlice';
import { ArrowLeft, Send, Check, ChevronDown, User, Folder } from 'lucide-react';
import type { AppDispatch } from '@/store';
import { useRouter } from 'next/navigation';

export function Step3ReviewSubmit() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [acknowledged, setAcknowledged] = useState(false);

  function handleSubmit() {
    if (!acknowledged) {
      alert("Please acknowledge the information is correct.");
      return;
    }
    // Proceed to Step 4 Success screen instead of redirecting directly
    dispatch(nextStep());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-5">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Review Application</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-[#f8fafc] p-4 transition-colors hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
                 <User size={20} />
              </div>
              <div>
                 <h3 className="text-sm font-bold text-gray-900">Consent & Supporting Documents</h3>
                 <p className="text-xs text-gray-500">Obtain farmer's consent and upload required documents</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 rounded bg-[#dcfce7] px-2 py-1 text-[11px] font-bold text-[#16a34a]">
                <Check size={12} strokeWidth={3} /> Complete
              </span>
              <ChevronDown size={20} className="text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-[#f8fafc] p-4 transition-colors hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
                 <Folder size={20} />
              </div>
              <div>
                 <h3 className="text-sm font-bold text-gray-900">Farmer Details</h3>
                 <p className="text-xs text-gray-500">Review the farmer profile information</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 rounded bg-[#dcfce7] px-2 py-1 text-[11px] font-bold text-[#16a34a]">
                <Check size={12} strokeWidth={3} /> Complete
              </span>
              <ChevronDown size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <label className="flex cursor-pointer items-start gap-3" onClick={() => setAcknowledged(v => !v)}>
            <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${acknowledged ? 'border-[#16A34A] bg-[#16A34A]' : 'border-gray-400 bg-white'}`}>
              {acknowledged && <Check size={14} className="text-white" strokeWidth={3} />}
            </div>
            <span className={`text-sm transition-colors ${acknowledged ? 'text-gray-900' : 'text-gray-600'}`}>
              I acknowledge that the information provided is true and correct to the best of my knowledge.
            </span>
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <button type="button" className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all">Save Draft</button>
          <span className="flex items-center gap-1.5 text-sm font-medium text-[#16335A]">
            <Check size={16} /> Auto-saved
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => dispatch(prevStep())} className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all">
            <ArrowLeft size={16} /> Previous Step
          </button>
          <button type="button" onClick={handleSubmit} className="flex items-center gap-2 rounded-lg bg-[#16A34A] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#15803d] transition-all">
            Submit Application <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
