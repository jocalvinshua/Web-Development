import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FilePenLine, PencilIcon, PlusIcon, TrashIcon, UploadIcon } from "lucide-react"
import { AppContext } from "../context/AppContext"

export default function Dashboard() {
  const { getUserResumes, renameResume, deleteResume, token } = useContext(AppContext)
  const [allResumes, setAllResumes] = useState([])
  const [showResume, setShowResume] = useState(false)
  const [showEditTitle, setShowEditTitle] = useState(false)
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  
  const navigate = useNavigate()
  const colors = ["#ef4444", "#22c55e", "#3b82f6", "#eab308"]

  // Load data dari API saat pertama kali buka atau token berubah
  const loadResumes = async () => {
    if (token) {
      const data = await getUserResumes()
      setAllResumes(data)
    }
  }

  useEffect(() => {
    loadResumes()
  }, [token])

  const handleUpdateTitle = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const success = await renameResume(editingId, title);
    if (success) {
      await loadResumes(); // Refresh data
      setShowEditTitle(false);
      setTitle('');
    }
  }

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this resume?")) {
      const success = await deleteResume(id);
      if (success) await loadResumes();
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 text-slate-700">Welcome to Your Dashboard</p>
        
        <div className="flex gap-4 mb-8">
          <button onClick={() => setShowResume(true)} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border border-dashed border-slate-300 hover:border-purple-500 transition-all cursor-pointer">
            <PlusIcon className="size-11 p-2.5 bg-purple-600 text-white rounded-full" />
            <p className="text-sm font-medium">Create New</p>
          </button>
        </div>

        <h2 className="text-lg font-bold text-slate-700 mb-4">Recent Resumes</h2>

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-6">
          {allResumes.map((resume, index) => (
            <div 
              key={resume._id} 
              onClick={() => navigate(`/app/builder/${resume._id}`)} 
              className="relative w-full bg-white sm:max-w-44 h-56 flex flex-col items-center justify-center rounded-xl gap-3 border border-slate-200 group hover:border-purple-500 hover:shadow-xl transition-all cursor-pointer p-4"
            >
              <div className="p-4 rounded-full" style={{ background: `${colors[index % colors.length]}15` }}>
                <FilePenLine className="size-8" style={{ color: colors[index % colors.length] }} />
              </div>
              <p className="text-sm font-bold text-slate-800 text-center line-clamp-2">{resume.title}</p>
              
              <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(resume._id);
                    setTitle(resume.title);
                    setShowEditTitle(true);
                  }}
                  className="p-1.5 bg-white shadow-md border rounded-lg text-blue-600 hover:bg-blue-50"
                >
                  <PencilIcon size={16} />
                </button>
                <button 
                  onClick={(e) => handleDelete(e, resume._id)} 
                  className="p-1.5 bg-white shadow-md border rounded-lg text-red-500 hover:bg-red-50"
                >
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Rename */}
      {showEditTitle && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowEditTitle(false)}>
          <form onSubmit={handleUpdateTitle} onClick={e => e.stopPropagation()} className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Rename Resume</h2>
            <input autoFocus type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 mb-4" />
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowEditTitle(false)} className="flex-1 py-2 text-slate-600">Cancel</button>
              <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-xl">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}