import { FilePenLine, PencilIcon, PlusIcon, TrashIcon, UploadIcon, XIcon, UploadCloud, FileText, CheckIcon } from "lucide-react"
import { dummyResumeData } from '../assets/assets.js'
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const colors = ["#ef4444", "#22c55e", "#3b82f6", "#eab308"]
  const [allResumes, setAllResumes] = useState([])
  const [showResume, setShowResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [showEditTitle, setShowEditTitle] = useState(false) // State modal edit
  
  const [title, setTitle] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [editingId, setEditingId] = useState(null) // Menyimpan ID resume yang diedit
  
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    setAllResumes(dummyResumeData)
  }, [])

  // Fungsi untuk membuka modal edit
  const openEditModal = (e, resume) => {
    e.stopPropagation(); // Mencegah navigasi ke builder
    setEditingId(resume._id || resume.id);
    setTitle(resume.title);
    setShowEditTitle(true);
  }

  // Fungsi update judul di state (Local Update)
  const handleUpdateTitle = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title cannot be empty");

    const updatedResumes = allResumes.map(res => 
      (res._id === editingId || res.id === editingId) ? { ...res, title: title } : res
    );
    
    setAllResumes(updatedResumes);
    setShowEditTitle(false);
    setTitle('');
    setEditingId(null);
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a title");
    navigate(`/app/builder/res-${Math.random().toString(36).substr(2, 5)}`);
    setTitle('');
    setShowResume(false);
  }

  return (
    <div className="relative min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent">
          Welcome to Your Dashboard
        </p>
        
        {/* Button Create and Upload Resume */}
        <div className="flex gap-4 mb-8" onClick={(event)=>{event.stopPropagation}}>
          <button onClick={() => setShowResume(true)} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full" />
            <p className="text-sm font-medium">Create New</p>
          </button>

          <button onClick={() => setShowUploadResume(true)} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <UploadIcon className="size-11 p-2.5 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full" />
            <p className="text-sm font-medium">Upload PDF</p>
          </button>
        </div>

        <h2 className="text-lg font-bold text-slate-700 mb-4">Recent Resumes</h2>

        {/* List Resumes */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-6">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length]
            return (
              <div 
                key={resume._id || index} 
                onClick={() => navigate(`/app/builder/${resume._id || 'res123'}`)} 
                className="relative w-full bg-white sm:max-w-44 h-56 flex flex-col items-center justify-center rounded-xl gap-3 text-slate-600 border border-slate-200 group hover:border-purple-500 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden p-4"
              >
                <div className="p-4 rounded-full" style={{ background: `${baseColor}15` }}>
                  <FilePenLine className="size-8" style={{ color: baseColor }} />
                </div>
                <p className="text-sm font-bold text-slate-800 text-center line-clamp-2">{resume.title}</p>
                
                {/* Action Buttons (Pencil & Trash) */}
                <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                  <button 
                    onClick={(e) => openEditModal(e, resume)}
                    className="p-1.5 bg-white shadow-md border border-slate-100 rounded-lg text-blue-600 hover:bg-blue-50"
                  >
                    <PencilIcon size={16} />
                  </button>
                  <button 
                    onClick={(e) => e.stopPropagation()} 
                    className="p-1.5 bg-white shadow-md border border-slate-100 rounded-lg text-red-500 hover:bg-red-50"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* MODAL EDIT TITLE */}
        {showEditTitle && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowEditTitle(false)}>
            <form onSubmit={handleUpdateTitle} onClick={e => e.stopPropagation()} className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border-t-4 border-blue-500">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <PencilIcon size={20} className="text-blue-500" /> Rename Resume
              </h2>
              <input 
                autoFocus 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowEditTitle(false)} className="flex-1 px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">Save Changes</button>
              </div>
            </form>
          </div>
        )}

        {/* MODAL CREATE & UPLOAD */}
        {showResume && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowResume(false)}>
            <form onSubmit={handleCreateSubmit} onClick={e => e.stopPropagation()} className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold mb-4">New Resume</h2>
                <input autoFocus type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title..." className="w-full px-4 py-3 border rounded-xl mb-4 outline-none focus:ring-2 focus:ring-purple-500" />
                <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold">Create</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}