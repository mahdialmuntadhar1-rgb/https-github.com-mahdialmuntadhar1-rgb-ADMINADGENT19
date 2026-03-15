import React, { useState } from 'react';
import Papa from 'papaparse';
import { Upload, FileText, CheckCircle2, AlertTriangle, ArrowRight, Loader2, Cpu, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CSVUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'upload' | 'preview' | 'processing' | 'complete'>('upload');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    Papa.parse(selectedFile, {
      header: true,
      preview: 20,
      complete: (results) => {
        setPreviewData(results.data);
        setHeaders(Object.keys(results.data[0] || {}));
        setStep('preview');
      }
    });
  };

  const startAIProcessing = () => {
    setIsProcessing(true);
    setStep('processing');
    
    // Simulate AI pipeline
    setTimeout(() => {
      setStep('complete');
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">CSV Import Pipeline</h2>
          <p className="text-slate-400 mt-1">Upload business data for AI-driven validation and cleaning</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {step === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-panel p-12 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center group hover:border-orange-500/30 transition-all cursor-pointer relative"
              >
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="w-20 h-20 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-6 group-hover:scale-110 transition-transform">
                  <Upload size={40} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Drop your CSV here</h3>
                <p className="text-slate-400 max-w-xs">
                  Upload your business records for automated cleaning, deduplication, and source verification.
                </p>
              </motion.div>
            )}

            {step === 'preview' && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-panel rounded-3xl overflow-hidden flex flex-col"
              >
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-3">
                    <FileText className="text-orange-400" />
                    <h3 className="font-bold text-white">{file?.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-orange-500/20 text-orange-400 uppercase">Previewing 20 rows</span>
                  </div>
                  <button 
                    onClick={() => setStep('upload')}
                    className="text-xs text-slate-500 hover:text-white transition-colors"
                  >
                    Change File
                  </button>
                </div>
                <div className="overflow-x-auto max-h-[400px] scrollbar-hide">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/5 sticky top-0">
                        {headers.map(h => (
                          <th key={h} className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-white/5">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {previewData.map((row, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          {headers.map(h => (
                            <td key={h} className="px-4 py-3 text-xs text-slate-400 truncate max-w-[150px]">{row[h]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-6 bg-orange-600/5 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-xs text-slate-400">Column Mapping Active</span>
                    </div>
                  </div>
                  <button 
                    onClick={startAIProcessing}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-500 transition-all shadow-lg shadow-orange-500/20"
                  >
                    Run AI Validation Pipeline <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-12 rounded-3xl flex flex-col items-center justify-center text-center"
              >
                <div className="relative mb-8">
                  <Loader2 size={80} className="text-orange-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu size={32} className="text-orange-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Agents at Work</h3>
                <div className="space-y-3 max-w-md w-full">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Deduplicating entries...</span>
                    <span className="text-orange-400 font-bold">85%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      className="h-full bg-orange-500"
                    />
                  </div>
                  <p className="text-sm text-slate-500 italic">
                    "Verifying source links and normalizing organization names across 18 governorates..."
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'complete' && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-12 rounded-3xl text-center"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Processing Complete</h3>
                <p className="text-slate-400 mb-8 max-w-sm mx-auto">
                  1,240 records processed. 982 verified, 258 flagged for manual review.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Verified</p>
                    <p className="text-2xl font-bold text-white">982</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                    <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1">Flagged</p>
                    <p className="text-2xl font-bold text-white">258</p>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => setStep('upload')}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all"
                  >
                    Upload Another
                  </button>
                  <button className="px-6 py-3 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-500 transition-all shadow-lg shadow-orange-500/20">
                    View Review Queue
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <div className="glass-orange p-6 rounded-3xl border border-orange-500/20">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-orange-400" />
              AI Pipeline Specs
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Deduplication', desc: 'Fuzzy matching on names & phones' },
                { label: 'Source Verification', desc: 'Live link accessibility checks' },
                { label: 'Normalization', desc: 'Standardizing org types & names' },
                { label: 'Geo-Tagging', desc: 'Automatic governorate assignment' },
                { label: 'QC Routing', desc: 'Flagging missing or invalid data' }
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-200">{item.label}</p>
                    <p className="text-[10px] text-slate-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/5">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-400" />
              Quality Control
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Records failing validation are automatically sent to the <strong>Quality Control Review Queue</strong>. 
              Admins must manually verify these before they enter the master database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
