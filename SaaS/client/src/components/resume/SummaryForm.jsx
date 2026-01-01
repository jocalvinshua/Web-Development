import React from 'react';
import { Save, Sparkles } from 'lucide-react';

const SummaryForm = ({ data, onChange, }) => {
  
  // Fungsi untuk menghitung jumlah kata
  const wordCount = data ? data.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Professional Summary</h2>
          <p className="text-sm text-gray-600 mt-1">
            Summarize your career and key achievements in 2-3 sentences.
          </p>
        </div>
      </div>

      <div className="relative">
        <textarea 
          className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all text-sm leading-relaxed"
          placeholder="e.g. Passionate Software Engineer with 5+ years of experience in building scalable web applications..."
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
        />
        
        {/* Dekorasi AI Hint (Opsional) */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
          <Sparkles size={12} />
          Keep it impactful
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-[11px] text-gray-400 italic">
          Tip: Mention your years of experience and top 2 skills.
        </p>
      </div>
    </div>
  );
};

export default SummaryForm;