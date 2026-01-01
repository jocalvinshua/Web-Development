import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

const EducationForm = ({ data = [], onChange }) => {
  
  // Fungsi menambah pendidikan baru
  const addEducation = () => {
    const newEdu = { 
      institution: '', 
      degree: '', 
      field: '', 
      graduation_date: '', 
      gpa: '' 
    };
    onChange([...data, newEdu]);
  };

  // Fungsi menangani perubahan input
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newList = [...data];
    
    // Menggunakan spread untuk menghindari mutasi langsung pada objek di dalam array
    newList[index] = {
      ...newList[index],
      [name]: value
    };
    
    onChange(newList);
  };

  // Fungsi menghapus baris pendidikan
  const removeEducation = (index) => {
    const newList = data.filter((_, i) => i !== index);
    onChange(newList);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
        <p className="text-sm text-gray-600">Add your academic background and qualifications.</p>
      </div>

      {data.map((edu, index) => (
        <div 
          key={index} 
          className="p-5 border border-gray-200 rounded-xl space-y-4 relative bg-white shadow-sm hover:border-blue-200 transition-all"
        >
          {/* Tombol Hapus */}
          <button 
            onClick={() => removeEducation(index)} 
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20}/>
          </button>

          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <GraduationCap size={18} />
            <span className="font-bold text-sm uppercase tracking-wider">Education #{index + 1}</span>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight">School / University</label>
            <input 
              type="text" 
              name="institution" 
              value={edu.institution} 
              onChange={(e) => handleChange(index, e)} 
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight">Degree</label>
              <input 
                type="text" 
                name="degree" 
                value={edu.degree} 
                onChange={(e) => handleChange(index, e)} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight">Field of Study</label>
              <input 
                type="text" 
                name="field" 
                value={edu.field} 
                onChange={(e) => handleChange(index, e)} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight">Graduation Date</label>
              <input 
                type="month" 
                name="graduation_date" 
                value={edu.graduation_date} 
                onChange={(e) => handleChange(index, e)} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight">GPA (Optional)</label>
              <input 
                type="text" 
                name="gpa" 
                value={edu.gpa} 
                onChange={(e) => handleChange(index, e)} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
              />
            </div>
          </div>
        </div>
      ))}

      <button 
        onClick={addEducation} 
        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-blue-200 rounded-xl text-blue-600 font-bold hover:bg-blue-50 hover:border-blue-300 transition-all active:scale-[0.98]"
      >
        <Plus size={20}/> Add Education
      </button>
    </div>
  );
};

export default EducationForm;