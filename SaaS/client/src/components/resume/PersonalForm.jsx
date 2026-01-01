import React from 'react';
import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User2, User2Icon } from 'lucide-react';

const PersonalForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {
  
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User2Icon, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel", required: true },
    { key: "location", label: "Location", icon: MapPin, type: "text", required: true },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>
        <p className="text-sm text-gray-600">Get Started With the Personal Information</p>
      </div>

      {/* Image Upload Section */}
      <div className="flex items-center gap-4 mb-8">
        <label className="cursor-pointer group relative">
          {data.image ? (
            <img 
              src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} 
              alt="user-img" 
              className='w-20 h-20 rounded-full object-cover ring-2 ring-slate-200 group-hover:opacity-80 transition-opacity'
            />
          ) : (
            <div className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-full text-slate-400 group-hover:border-blue-400 group-hover:text-blue-500 transition-all">
              <User2 size={24} />
              <span className="text-[10px] mt-1 font-medium">Upload</span>
            </div>
          )}
          <input 
            type="file" 
            accept="image/jpeg, image/png" 
            className="hidden" 
            onChange={(e) => handleChange("image", e.target.files[0])} 
          />
        </label>

        {typeof data.image === 'object' && data.image !== null && (
          <div className="flex flex-col gap-1.5 pl-4 border-l border-slate-200">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Background Removal</p>
            <label className='relative inline-flex items-center cursor-pointer gap-3'>
              <input 
                type="checkbox" 
                className="sr-only peer" 
                onChange={() => setRemoveBackground(prev => !prev)}
                checked={removeBackground}
              />
              <div className="w-10 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></span>
              <span className="text-sm font-medium text-gray-700">{removeBackground ? 'Active' : 'Off'}</span>
            </label>
          </div>
        )}
      </div>

      {/* Input Fields Mapping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="space-y-1.5">
              <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                <Icon size={14} className="text-slate-500" />
                {field.label}
                {field.required && <span className='text-red-500'>*</span>}
              </label>
              <input 
                type={field.type} 
                value={data[field.key] || ""} 
                onChange={(e) => handleChange(field.key, e.target.value)} 
                className='w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm shadow-sm'
                placeholder={`Enter ${field.label.toLowerCase()}`}
                required={field.required}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalForm;