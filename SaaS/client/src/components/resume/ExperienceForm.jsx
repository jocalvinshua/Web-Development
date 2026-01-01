import React from 'react';
import { Plus, Trash2, Briefcase } from 'lucide-react';

const ExperienceForm = ({ data = [], onChange }) => {
  
  // Fungsi untuk menambah entry baru
  const addExperience = () => {
    const newExp = { 
      position: '', 
      company: '', 
      start_date: '', 
      end_date: '', 
      is_current: false, 
      description: '' 
    };
    onChange([...data, newExp]);
  };

  // Fungsi untuk menangani perubahan input secara dinamis
  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newExpList = [...data];
    
    newExpList[index] = {
      ...newExpList[index],
      [name]: type === 'checkbox' ? checked : value
    };
    
    onChange(newExpList);
  };

  // Fungsi untuk menghapus entry
  const removeExperience = (index) => {
    const newExpList = data.filter((_, i) => i !== index);
    onChange(newExpList);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Professional Experience</h2>
        <p className="text-sm text-gray-600">Add your previous job roles and responsibilities.</p>
      </div>

      {data.map((exp, index) => (
        <div key={index} className="p-5 border border-gray-200 rounded-xl space-y-4 relative bg-white shadow-sm hover:border-blue-200 transition-all">
          {/* Tombol Hapus */}
          <button 
            onClick={() => removeExperience(index)} 
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            title="Remove Experience"
          >
            <Trash2 size={20}/>
          </button>

          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Briefcase size={18} />
            <span className="font-bold text-sm uppercase tracking-wider">Experience #{index + 1}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Job Title</label>
              <input 
                type="text" 
                name="position" 
                value={exp.position} 
                onChange={(e) => handleChange(index, e)} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Company</label>
              <input 
                type="text" 
                name="company" 
                value={exp.company} 
                onChange={(e) => handleChange(index, e)} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Start Date</label>
              <input 
                type="month" 
                name="start_date" 
                value={exp.start_date} 
                onChange={(e) => handleChange(index, e)} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">End Date</label>
              <input 
                type="month" 
                name="end_date" 
                value={exp.end_date} 
                onChange={(e) => handleChange(index, e)} 
                disabled={exp.is_current} 
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm ${exp.is_current ? 'bg-gray-100 cursor-not-allowed' : ''}`} 
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer w-fit">
            <input 
              type="checkbox" 
              name="is_current" 
              checked={exp.is_current} 
              onChange={(e) => handleChange(index, e)} 
              className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            /> 
            Currently Working Here
          </label>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Description / Key Achievements</label>
            <textarea 
              name="description" 
              placeholder="Describe your responsibilities, tools used, and key achievements..." 
              value={exp.description} 
              onChange={(e) => handleChange(index, e)} 
              className="w-full px-3 py-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none leading-relaxed" 
            />
          </div>
        </div>
      ))}

      <button 
        onClick={addExperience} 
        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-blue-200 rounded-xl text-blue-600 font-bold hover:bg-blue-50 hover:border-blue-300 transition-all active:scale-[0.98]"
      >
        <Plus size={20}/> Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;