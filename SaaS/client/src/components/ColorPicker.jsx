import React, { useState } from 'react'; // Tambahkan import useState
import { Check, Palette } from "lucide-react";

export default function ColorPicker({ selectedColor, onChange }) {
  const colors = [
    { name: 'Blue', value: "#3b82f6" },
    { name: 'Red', value: "#ef4444" }, 
    { name: "Orange", value: "#f97316" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Purple", value: "#a855f7" },
    { name: "Black", value: "#1f2937" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-1 text-sm text-purple-600 bg-purple-50 hover:bg-purple-100 transition-all px-3 py-2 rounded-lg border border-purple-200"
      >
        <Palette size={16} /> <span className="max-sm:hidden">Accent</span>
      </button>

      {isOpen && (
        <>
          {/* Overlay untuk menutup saat klik di luar */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          
          <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-gray-200 shadow-xl rounded-xl z-20 w-48">
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <div 
                  key={color.value} 
                  className="relative cursor-pointer group flex flex-col items-center" 
                  onClick={() => {
                    onChange(color.value);
                    setIsOpen(false);
                  }}
                >
                  <div 
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.value ? "border-gray-900 scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    {selectedColor === color.value && (
                      <div className="flex items-center justify-center h-full">
                        <Check className="size-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}