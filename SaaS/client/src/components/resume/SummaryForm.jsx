import React, { useState } from 'react';
import { Loader2, Sparkle, Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import api from '../../config/api.js'

const SummaryForm = ({ data, onChange }) => {
  const { token } = useSelector(state => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);

      const prompt = `enhance my professional summary: ${data || ''}`;

      const response = await api.post(
        '/api/ai/enhance-sum',
        { userContent: prompt },
        { headers: { Authorization: token } }
      );

      onChange(response.data.enhancedContent);

    } catch (error) {
      toast.error(error.message || 'Failed to enhance summary');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Professional Summary</h3>
          <p className="text-sm text-gray-600 mt-1">
            Summarize your career and key achievements.
          </p>
        </div>

        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkle className="size-4" />
          )}
          {isGenerating ? 'Enhancing...' : 'AI Enhance'}
        </button>
      </div>

      <div className="relative">
        <textarea
          className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all text-sm leading-relaxed"
          placeholder="e.g. Passionate Software Engineer with 5+ years of experience..."
          value={data || ''}
          onChange={(e) => onChange(e.target.value)}
        />

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
