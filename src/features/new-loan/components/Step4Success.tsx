import React, { useState } from 'react';
import { Check, Download, ArrowRight, User, FileText, X, Lock, Building } from 'lucide-react';
import { useRouter } from 'next/navigation';

function SummaryModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-start justify-between bg-[#4a5568] px-6 py-4 text-white">
          <div>
            <h2 className="text-xl font-bold">Application Summary</h2>
            <p className="text-sm text-gray-300">ID: APP-2026-6579 · Submitted May 14, 2026 at 08:03 PM</p>
          </div>
          <button onClick={onClose} className="rounded-lg bg-white/10 p-2 hover:bg-white/20 transition-colors">
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="flex items-center gap-3 border-b border-gray-100 bg-green-50 px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16A34A] text-white">
            <Check size={16} strokeWidth={3} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#16A34A]">Submitted & Pending Review</p>
            <p className="text-xs text-green-700">Transmitted to Cooperative Bank of Oromia via SFTP</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-8">
          
          {/* Farmer Information */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
              <User size={20} className="text-blue-500" /> Farmer Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</p><p className="text-sm font-semibold text-gray-800">Abebe Bekele Tadesse</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Father's Name</p><p className="text-sm font-semibold text-gray-800">—</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Farmer ID</p><p className="text-sm font-semibold text-gray-800">FR - 1234567890</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date of Birth</p><p className="text-sm font-semibold text-gray-800">—</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Gender</p><p className="text-sm font-semibold text-gray-800">—</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Marital Status</p><p className="text-sm font-semibold text-gray-800">—</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Mobile Phone</p><p className="text-sm font-semibold text-gray-800">—</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Education Level</p><p className="text-sm font-semibold text-gray-800">—</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">National ID</p><p className="text-sm font-semibold text-gray-800">—</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Region</p><p className="text-sm font-semibold text-gray-800">Oromia</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Woreda</p><p className="text-sm font-semibold text-gray-800">Bishoftu</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Kebele</p><p className="text-sm font-semibold text-gray-800">—</p></div>
            </div>
          </div>

          {/* Loan Details */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
              <Lock size={20} className="text-yellow-600" /> Loan Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Loan Type</p><p className="text-sm font-semibold text-gray-800">Input</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Purpose</p><p className="text-sm font-semibold text-gray-800">Agro-processing (e.g., milling grain)</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Requested Amount</p><p className="text-sm font-semibold text-gray-800">—</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Duration</p><p className="text-sm font-semibold text-gray-800">12 Months (1 Year)</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Primary Crops</p><p className="text-sm font-semibold text-gray-800">Teff</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Crop Variety</p><p className="text-sm font-semibold text-gray-800">Seed + S-Hela/Acherr + Stellar Star</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Land Size</p><p className="text-sm font-semibold text-gray-800">—</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Expected Yield</p><p className="text-sm font-semibold text-gray-800">—</p></div>
            </div>
          </div>

          {/* Banking Information */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
              <Building size={20} className="text-gray-500" /> Banking Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Bank Account No.</p><p className="text-sm font-semibold text-gray-800">—</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">IFSC / FSC Code</p><p className="text-sm font-semibold text-gray-800">—</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Bank Name</p><p className="text-sm font-semibold text-gray-800">—</p></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Account Holder</p><p className="text-sm font-semibold text-gray-800">—</p></div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
          <p className="text-xs text-gray-500">Generated on May 14, 2026 · 08:03 PM</p>
          <button onClick={onClose} className="rounded-lg bg-[#374151] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1f2937] transition-all">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


export function Step4Success() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 mt-4">
      {showModal && <SummaryModal onClose={() => setShowModal(false)} />}
      
      {/* Big Green Banner */}
      <div className="relative overflow-hidden rounded-t-3xl bg-[#16A34A] px-6 py-16 text-center shadow-sm">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-40 w-40 translate-x-1/4 translate-y-1/4 rounded-full bg-black/10 blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm shadow-inner ring-4 ring-white/30">
            <Check size={40} className="text-white" strokeWidth={3} />
          </div>
          <h2 className="mb-3 text-3xl font-bold text-white">Application Submitted Successfully!</h2>
          <p className="mb-6 text-green-100 max-w-lg">
            The loan application for <span className="font-semibold text-white">Abebe Bekele Tadesse</span> has been securely transmitted to Coop Bank.
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10883c] px-4 py-1.5 text-xs font-bold text-white shadow-sm border border-green-700/50">
            <Check size={14} /> Verified & Submitted
          </span>
        </div>
      </div>

      {/* Info Card underneath banner */}
      <div className="relative mx-auto -mt-6 max-w-4xl rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 border border-gray-200 text-gray-500">
               <User size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Abebe Bekele Tadesse</h3>
              <p className="text-sm text-gray-500">Input Loan - Seed Loan</p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 min-w-[140px]">
               <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1">
                 <FileText size={14} className="text-green-600" /> APPLICATION ID
               </div>
               <p className="font-bold text-gray-900">APP-2026-2676</p>
             </div>
             <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 min-w-[140px]">
               <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1">
                 <Check size={14} className="text-green-600" /> SUBMITTED ON
               </div>
               <p className="font-bold text-gray-900">Jun 2, 2026 05:27 PM</p>
             </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all hover:shadow">
          <Download size={16} /> Download PDF
        </button>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all hover:shadow">
          View Summary
        </button>
        <button onClick={() => router.push('/loan-application-dashboard')} className="flex items-center gap-2 rounded-lg bg-[#16A34A] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#15803d] transition-all hover:shadow-lg">
           Return to Dashboard <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
