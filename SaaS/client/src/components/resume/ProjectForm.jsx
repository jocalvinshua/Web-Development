import React from 'react';
import { Plus, Trash2, FolderCode } from 'lucide-react';

const ProjectForm = ({ data = [], onChange }) => {
  
  const addProject = () => {
    // DISESUAIKAN: Menggunakan 'name' (bukan title) agar sesuai dengan {project.name} di template
    const newProject = { 
      name: '', 
      type: '', 
      description: '', 
    };
    onChange([...data, newProject]);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newList = [...data];
    newList[index] = { ...newList[index], [name]: value };
    onChange(newList);
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <p className="text-sm text-gray-600">Highlight your best work and personal projects.</p>
      </div>

      {data.map((proj, index) => (
        <div key={index} className="p-5 border border-gray-200 rounded-xl space-y-4 relative bg-white shadow-sm hover:border-blue-200 transition-all">
          <button 
            type="button"
            onClick={() => removeProject(index)} 
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20}/>
          </button>

          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <FolderCode size={18} />
            <span className="font-bold text-sm uppercase tracking-wider">Project #{index + 1}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Project Title</label>
              <input 
                type="text" 
                name="name" // DISESUAIKAN: Key adalah 'name' sesuai template
                value={proj.name || ""} 
                onChange={(e) => handleChange(index, e)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                placeholder="e.g. Portfolio Website"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Project Type</label>
              <input 
                type="text" 
                name="type" // DISESUAIKAN: Key adalah 'type' sesuai template
                value={proj.type || ""} 
                onChange={(e) => handleChange(index, e)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                placeholder="e.g. Web Development"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
            <textarea 
              name="description" 
              value={proj.description || ""} 
              onChange={(e) => handleChange(index, e)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none" 
              placeholder="Tip: Use Enter for bullet points"
            />
          </div>
        </div>
      ))}

      <button 
        type="button"
        onClick={addProject} 
        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-blue-200 rounded-xl text-blue-600 font-bold hover:bg-blue-50 hover:border-blue-300 transition-all"
      >
        <Plus size={20}/> Add Project
      </button>
    </div>
  );
};

export default ProjectForm;