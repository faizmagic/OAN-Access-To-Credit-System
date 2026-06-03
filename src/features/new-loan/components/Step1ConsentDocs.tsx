import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep } from '@/features/new-loan/store/newLoanFormSlice';
import { ArrowRight, Check, X, FileText, Clock, Eye, Upload, Info, Send, Smartphone, Image, Download, Folder } from 'lucide-react';
import type { AppDispatch } from '@/store';

function formatFileSize(bytes: number) {
  if (!bytes) return '0 KB';
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / 1024).toFixed(1) + ' KB';
}

function formatUploadTime(date: Date) {
  if (!date) return '';
  return date.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function ViewFileModal({ entry, label, onClose }: { entry: any, label: string, onClose: () => void }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!entry?.file) return;
    const objectUrl = URL.createObjectURL(entry.file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [entry]);

  if (!entry) return null;
  const isImage = entry.file.type.startsWith('image/');
  const isPdf = entry.file.type === 'application/pdf';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800">{label}</p>
            <p className="max-w-sm truncate text-xs text-gray-500">{entry.file.name} · {formatFileSize(entry.file.size)}</p>
          </div>
          <div className="flex items-center gap-3">
            {url && (
              <a href={url} download={entry.file.name} className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Download size={12} /> Download
              </a>
            )}
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-100 transition-colors">
              <X size={15} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center overflow-auto bg-gray-50 p-6 min-h-[200px]">
          {!url ? (
            <div className="flex flex-col items-center gap-2">
              <span className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#4a7c59] border-t-transparent" />
            </div>
          ) : isImage ? (
            <img src={url} alt={entry.file.name} className="max-h-[65vh] max-w-full rounded-xl object-contain shadow" />
          ) : isPdf ? (
            <iframe src={url} title={entry.file.name} className="h-[65vh] w-full rounded-xl border border-gray-200" />
          ) : (
            <div className="flex flex-col items-center gap-4 py-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100"><FileText size={32} className="text-gray-400" /></div>
              <p className="text-sm font-medium text-gray-700">{entry.file.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DocUploadCard({ doc, entry, onUpload, onRemove, uploadProgress, showCamera = true }: { doc: any, entry: any, onUpload: (file: File) => void, onRemove: () => void, uploadProgress: number, showCamera?: boolean }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [viewing, setViewing] = useState(false);
  const isUploaded = !!entry;
  const isUploading = uploadProgress != null && uploadProgress < 100;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) { onUpload(e.target.files[0]); e.target.value = ''; }
  }

  return (
    <>
      {viewing && <ViewFileModal entry={entry} label={doc.label} onClose={() => setViewing(false)} />}
      <div className={`relative flex flex-col rounded-xl border p-4 transition-all ${isUploaded ? 'border-[#4a7c59]/30 bg-white shadow-sm' : 'border-dashed border-gray-300 bg-gray-50'}`}>
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-gray-800">{doc.label} {doc.required && <span className="text-red-500">*</span>}</p>
            <p className="text-xs text-gray-500">{doc.sub}</p>
          </div>
          {isUploading ? (
            <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              <span className="inline-block h-3 w-3 animate-spin rounded-full border border-blue-500 border-t-transparent" /> Uploading
            </span>
          ) : isUploaded ? (
            <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              <Check size={10} strokeWidth={3} /> Uploaded
            </span>
          ) : null}
        </div>
        {isUploading && (
          <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full bg-[#16A34A] transition-all" style={{ width: `${uploadProgress}%` }} />
          </div>
        )}
        {isUploaded && !isUploading && entry && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              <Image size={13} className="shrink-0 text-gray-400" />
              <span className="flex-1 truncate text-xs font-medium text-gray-700">{entry.file.name}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setViewing(true)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#4a7c59]/40 bg-[#4a7c59]/5 px-3 py-2 text-xs font-semibold text-[#4a7c59] hover:bg-[#4a7c59]/10 transition-colors"><Eye size={12} /> View</button>
              <button onClick={() => onRemove()} className="flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-2.5 py-2 text-xs text-red-500 hover:bg-red-100 transition-colors"><X size={13} /></button>
            </div>
          </div>
        )}
        {!isUploaded && !isUploading && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-4">
            <button onClick={() => fileRef.current?.click()} className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm transition-all">Browse Files</button>
          </div>
        )}
        <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileChange} />
        <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
      </div>
    </>
  );
}

const INLINE_DOCS = [
  { id: 'identityDoc', label: 'Identity Document', sub: 'National ID, Passport, or Kebele ID', required: true, showCamera: false },
  { id: 'landOwnerProof', label: 'Land Ownership Proof', sub: 'Title deed or Kebele certificate', required: true, showCamera: true },
];

export function Step1ConsentDocs() {
  const dispatch = useDispatch<AppDispatch>();
  const [farmerIdSearch, setFarmerIdSearch] = useState('');
  const [isFarmerFound, setIsFarmerFound] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpStatus, setOtpStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [uploads, setUploads] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});
  const consentInputRef = useRef<HTMLInputElement>(null);

  function handleUpload(docId: string, file: File) {
    setProgress(p => ({ ...p, [docId]: 0 }));
    setUploads((prev: any) => ({ ...prev, [docId]: { file, uploadedAt: new Date() } }));
    let v = 0;
    const iv = setInterval(() => {
      v += Math.random() * 30 + 10;
      if (v >= 100) { clearInterval(iv); setProgress(p => { const n = { ...p }; delete n[docId]; return n; }); }
      else setProgress(p => ({ ...p, [docId]: Math.min(v, 99) }));
    }, 300);
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpInputRefs.current[index + 1]?.focus();
  }

  function handleVerifyOtp() {
    if (otp.join('') === '123456') {
      setOtpStatus('success');
      setTimeout(() => {
        dispatch(nextStep());
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000);
    } else {
      setOtpStatus('error');
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(nextStep());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-5">
      {/* Consent Management Box */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Consent Management</h2>
        </div>
        <div className="p-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Side: Farmer ID */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Farmer ID / Fayda ID</label>
            <input 
              type="password" 
              placeholder="***********" 
              value={farmerIdSearch} 
              onChange={e => setFarmerIdSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm bg-gray-50 focus:bg-white" 
            />
            <div className="flex items-center gap-1.5 mt-2">
              <Check className="text-white bg-green-500 rounded-full p-0.5" size={16} />
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-green-600 cursor-pointer">View Consent Details</span> provided on May 25, 2026
              </p>
            </div>
          </div>

          {/* Right Side: Upload Form */}
          <div className="rounded-xl border border-blue-50 bg-[#f8fbff] p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Signed Consent Form</h3>
                <p className="text-xs text-gray-500">Physical copy signed by farmer</p>
              </div>
              <span className="flex items-center gap-1.5 rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
                <span className="h-3 w-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span> Uploading
              </span>
            </div>
            {/* File progress bar card */}
            <div className="rounded-lg border border-gray-200 bg-white p-3 flex items-center gap-4 shadow-sm">
              <div className="p-2 bg-red-50 rounded-lg text-red-500">
                <FileText size={24} />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-gray-800">consent_signed_2024.pdf</span>
                  <span className="text-gray-500 font-medium">45%</span>
                </div>
                <div className="text-[10px] text-gray-500">1.2 MB / 4.5 MB</div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[45%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Documents Box */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-1.5">
          <span className="text-red-500 font-bold">*</span>
          <h2 className="text-base font-bold text-gray-900">Supporting Documents</h2>
        </div>
        <div className="p-6 flex flex-col gap-6">
          {/* Drag Drop Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/50">
             <Folder size={32} className="text-gray-400 mb-3" />
             <p className="text-sm font-semibold text-gray-700">Drag and drop files here</p>
             <p className="text-sm text-gray-500 my-1">Or</p>
             <p className="text-sm text-gray-700">Click Browse files to select a file</p>
             <button type="button" className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-green-600">
               + Browse Files
             </button>
          </div>

          {/* Documents Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-500">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-500">Description</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                       <div className="p-2 border border-gray-200 rounded-lg bg-white">
                         <FileText size={18} className="text-gray-400" />
                       </div>
                       <div>
                         <p className="font-semibold text-gray-800">ID Proof</p>
                         <p className="text-xs text-gray-500">householdID.png</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-500">Household ID added for 2 members</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button type="button" className="flex items-center gap-1.5 rounded-full border border-green-200 bg-white px-3 py-1.5 text-xs font-semibold text-green-600 hover:bg-green-50">
                          <Eye size={14} /> View
                       </button>
                       <button type="button" className="flex items-center justify-center rounded-full border border-red-200 bg-white p-1.5 text-red-500 hover:bg-red-50">
                          <X size={14} />
                       </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                       <div className="p-2 border border-gray-200 rounded-lg bg-white">
                         <FileText size={18} className="text-gray-400" />
                       </div>
                       <div>
                         <p className="font-semibold text-gray-800">ID Proof</p>
                         <p className="text-xs text-gray-500">householdID.png</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-500">Household ID added for 2 members</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button type="button" className="flex items-center gap-1.5 rounded-full border border-green-200 bg-white px-3 py-1.5 text-xs font-semibold text-green-600 hover:bg-green-50">
                          <Eye size={14} /> View
                       </button>
                       <button type="button" className="flex items-center justify-center rounded-full border border-red-200 bg-white p-1.5 text-red-500 hover:bg-red-50">
                          <X size={14} />
                       </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <button type="button" className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all">Save Draft</button>
          <span className="flex items-center gap-1.5 text-sm font-medium text-[#16335A]">
            <Check size={16} /> Auto-saved
          </span>
        </div>
        <button type="submit" className="flex items-center gap-2 rounded-lg bg-[#16A34A] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#15803d] transition-all">
          Confirm & Next <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}
