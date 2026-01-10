import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FilePenLine, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadIcon } from "lucide-react"
import { useSelector } from "react-redux"
import {toast} from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

import api from '../config/api.js'

export default function Dashboard() {
  const { user, token } = useSelector(state => state.auth)
  const [showResume, setShowResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [showEditTitle, setShowEditTitle] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [userResume, setUserResume] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [allResumes, setAllResumes] = useState([]);


  const navigate = useNavigate()
  const colors = ["#ef4444", "#22c55e", "#3b82f6", "#eab308"]

  const loadResume = async()=>{
    try {
      const {data} = await api.get('/api/user/resumes', {headers: {Authorization:token}})
      if(data.success){
        setUserResume(data.data)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCreateSubmit = async(event)=>{
    try {
      event.preventDefault()
      const {data} = await api.post('/api/resume/create', {title}, 
        { headers : { Authorization:token }})
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error.message)
    }
  }
  const handleDeleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm('Are you sure want to delete this resume?')
    if(confirm){
      const {data} = await api.delete(`/api/resume/delete${resumeId}`, {headers:{Authorization: token}})
      setAllResumes(allResumes.filter(resume => resume_id !== resumeId))
      toast.success(data.message)
    }
    } catch (error) {
     toast.error(error.message) 
    }
  }
  const handleUpdateResume = async (event) => {
    event.preventDefault()
    setLoading(true);
    try {
      const {resume} = await pdfToText(resume)
      const {data} = await api.post('/api/ai/upload-resume', {title, resumeText}, {headers:{Authorization:{token}}})
      setTitle('')
      setUserResume(null)
      setShowResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleEditTitle = async(event)=>{
    try {
      event.preventDefault()
      const {data} = await api.put('/api/resume/update', {resumeId: editResumeId, resumeData: { title}}, {headers: {Authorization: token}})
      setAllResumes(allResumes.map(resume=> resume._id === editResumeId ? {...resume, title}: resume))
      setTitle('')
      setEditTitle('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }
  

  useEffect(() => {
    loadResume()
  }, [])


  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure?")) {
      await handleDeleteResume(id);
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent">
          Welcome to Your Dashboard
        </p>
        
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setShowResume(true)} 
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full" />
            <p className="text-sm font-medium">Create New</p>
          </button>

          <button 
            onClick={() => setShowUploadResume(true)} 
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadIcon className="size-11 p-2.5 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full" />
            <p className="text-sm font-medium">Upload PDF</p>
          </button>
        </div>

        <h2 className="text-lg font-bold text-slate-700 mb-4">Recent Resumes</h2>

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-6">
          {userResume && userResume.map((resume, index) => {
            const baseColor = colors[index % colors.length]
            return (
              <div 
                key={resume._id} 
                onClick={() => navigate(`/app/builder/${resume._id}`)} 
                className="relative w-full bg-white sm:max-w-44 h-56 flex flex-col items-center justify-center rounded-xl gap-3 text-slate-600 border border-slate-200 group hover:border-purple-500 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden p-4"
              >
                <div className="p-4 rounded-full" style={{ background: `${baseColor}15` }}>
                  <FilePenLine className="size-8" style={{ color: baseColor }} />
                </div>
                <p className="text-sm font-bold text-slate-800 text-center line-clamp-2">{resume.title}</p>
                
                <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingId(resume._id);
                      setTitle(resume.title);
                      setShowEditTitle(true);
                    }}
                    className="p-1.5 bg-white shadow-md border border-slate-100 rounded-lg text-blue-600 hover:bg-blue-50"
                  >
                    <PencilIcon size={16} />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, resume._id)} 
                    className="p-1.5 bg-white shadow-md border border-slate-100 rounded-lg text-red-500 hover:bg-red-50"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Modal Rename */}
        {showEditTitle && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowEditTitle(false)}>
            <form onSubmit={handleUpdateTitle} onClick={e => e.stopPropagation()} className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border-t-4 border-blue-500">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <PencilIcon size={20} className="text-blue-500" /> Rename Resume
              </h2>
              <input autoFocus type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 mb-4" />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowEditTitle(false)} className="flex-1 px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100">Save</button>
              </div>
            </form>
          </div>
        )}

        {/* Modal Create */}
        {showResume && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowResume(false)}>
            <form onSubmit={handleCreateSubmit} onClick={e => e.stopPropagation()} className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">New Resume</h2>
              <input 
                autoFocus 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Enter resume title..." 
                className="w-full px-4 py-3 border rounded-xl mb-6 outline-none focus:ring-2 focus:ring-purple-500" 
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowResume(false)} className="flex-1 py-3 text-slate-600 font-medium">Cancel</button>
                <button type="submit" className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700">Create</button>
              </div>
            </form>
          </div>
        )}

        {/* Placeholder untuk Upload PDF */}
        {showUploadResume && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowUploadResume(false)}>
            <div onClick={e => e.stopPropagation()} className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl text-center">
              <UploadIcon className="mx-auto size-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">
                {loading && <LoaderCircleIcon className="animate-spin sizw-4 text-whote"/>}
                {loading ? "Uploading..." : 'Upload Resume'}
                </h2>
              <p className="text-slate-500 mb-6">Our AI will extract data from your PDF</p>
              <button onClick={() => setShowUploadResume(false)} className="w-full bg-slate-100 py-3 rounded-xl font-bold">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}