import { useState } from "react";
import { Check, Layout, ChevronDown } from "lucide-react";

export default function TemplateSelector({ selectedTemplate, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview: "A clean Traditional Resume Format with clear sections and professional typography"
    },
    {
      id: "modern",
      name: "Modern",
      preview: "A contemporary layout with bold headings and a modern feel"
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Focus on essential content with plenty of white space"
    },
    {
      id: "minimalImage",
      name: "Minimal Image",
      preview: "Minimalist layout featuring a profile photo section"
    }
  ];

  return (
    <div className="relative">
      {/* Tombol Utama */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all px-4 py-2 rounded-lg shadow-sm"
      >
        <Layout size={16} />
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay untuk menutup dropdown saat klik di luar */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          
          <div className="absolute top-full left-0 w-64 p-2 mt-2 z-20 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Select Style</p>
            
            <div className="space-y-1">
              {templates.map((template) => (
                <div 
                  key={template.id} 
                  onClick={() => {
                    onChange(template.id);
                    setIsOpen(false);
                  }} 
                  className={`group relative p-3 rounded-lg cursor-pointer transition-all border ${
                    selectedTemplate === template.id 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-transparent hover:bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-sm font-bold ${selectedTemplate === template.id ? "text-blue-700" : "text-gray-700"}`}>
                      {template.name}
                    </span>
                    <p className="text-[10px] text-gray-500 leading-tight">
                      {template.preview}
                    </p>
                  </div>

                  {selectedTemplate === template.id && (
                    <div className="absolute top-3 right-3">
                      <div className="size-5 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}